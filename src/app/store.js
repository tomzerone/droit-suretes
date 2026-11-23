// État de progression : sauvegarde locale immédiate + synchronisation cloud (capability db) si disponible.
const KEY = 'ds-state-v1';
const listeners = new Set();

export function defaultState() {
  return {
    v: 1, updatedAt: 0,
    chapters: {},        // c3: { studied: true, studiedAt, lastSection, visitedAt }
    cards: {},           // f001: { box, due, seen, known, wrong, lastAt }
    cardSession: null,   // { deck, queue:[ids], index, startedAt }
    qcm: {},             // q001: { ok, ko, last, at }
    qcmRuns: [],         // { at, label, score, total, chapters }
    cases: {},           // cp4: { answers: {0:'..'}, evals: {0:{score20, by, at, detail}} }
    exams: [],           // { at, id, title, kind, score20, detail }
    examDrafts: {},      // ex1: { answers, startedAt }
    sessions: [],        // { at, kind, label }
    last: null,          // { route, label, at }
    name: '',
    podcast: {},         // ep1: { line, done, at }            // prénom affiché sur le tableau de bord
  };
}

function readLocal() {
  try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
function writeLocal(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* stockage indisponible */ }
}

export let state = Object.assign(defaultState(), readLocal() || {});
export const sync = { mode: 'local', status: 'Sauvegarde sur cet appareil', lastSync: 0 };

export function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function emit() { listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } }); }

export function save() {
  state.updatedAt = Date.now();
  writeLocal(state);
  scheduleRemote();
}
export function mutate(fn) { fn(state); save(); }

export function logSession(kind, label) {
  const now = Date.now();
  const prev = state.sessions[0];
  // fusionne les entrées identiques rapprochées (< 20 min)
  if (prev && prev.kind === kind && prev.label === label && now - prev.at < 20 * 60 * 1000) prev.at = now;
  else state.sessions.unshift({ at: now, kind, label });
  state.sessions = state.sessions.slice(0, 40);
  save();
}
export function setLast(route, label) {
  state.last = { route, label, at: Date.now() };
  save();
}

export function resetAll() {
  const fresh = defaultState();
  fresh.updatedAt = Date.now();
  Object.keys(state).forEach((k) => delete state[k]);
  Object.assign(state, fresh);
  writeLocal(state);
  scheduleRemote(true);
  emit();
}

export function exportJSON() { return JSON.stringify(state); }
export function importJSON(txt) {
  const data = JSON.parse(txt);
  if (!data || typeof data !== 'object' || !data.v) throw new Error('Fichier de sauvegarde invalide');
  Object.keys(state).forEach((k) => delete state[k]);
  Object.assign(state, defaultState(), data);
  save(); emit();
}

// ───────────────────────── Synchronisation cloud
let docRef = null;
let timer = null;
let writing = false;
let pending = false;

function scheduleRemote(now) {
  if (!docRef) return;
  clearTimeout(timer);
  timer = setTimeout(pushRemote, now ? 50 : 1500);
}
async function pushRemote() {
  if (!docRef) return;
  if (writing) { pending = true; return; }
  writing = true;
  try {
    await docRef.set({ json: JSON.stringify(state), updatedAt: state.updatedAt });
    sync.status = 'Synchronisé sur tous tes appareils';
    sync.lastSync = Date.now();
  } catch (e) {
    sync.status = 'Synchronisation en pause — sauvegarde locale active';
    if (e && (e.code === 'revoked' || e.code === 'invalid_argument' || e.code === 'not_granted')) docRef = null;
  } finally {
    writing = false;
    emitSync();
    if (pending) { pending = false; scheduleRemote(); }
  }
}
const syncListeners = new Set();
export function onSync(fn) { syncListeners.add(fn); }
function emitSync() { syncListeners.forEach((fn) => fn(sync)); }

export async function initRemote() {
  const C = typeof window !== 'undefined' ? window.claude : null;
  if (!C || typeof C.use !== 'function') return;
  try {
    const [db, user] = await Promise.all([C.use('db'), C.use('user')]);
    if (!db || !user) return;
    const uid = await user.id();
    if (!uid) return;
    const ref = db.doc('data/users/' + uid + '/progress');
    const snap = await Promise.race([ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
    docRef = ref;
    sync.mode = 'cloud';
    if (snap.exists) {
      const remote = snap.data();
      const rs = remote && remote.json ? JSON.parse(remote.json) : null;
      if (rs && (rs.updatedAt || 0) > (state.updatedAt || 0)) {
        Object.keys(state).forEach((k) => delete state[k]);
        Object.assign(state, defaultState(), rs);
        writeLocal(state);
        emit();
      } else if ((state.updatedAt || 0) > (remote.updatedAt || 0)) {
        scheduleRemote(true);
      }
    } else if (state.updatedAt) {
      scheduleRemote(true);
    }
    sync.status = 'Synchronisé sur tous tes appareils';
    sync.lastSync = Date.now();
    emitSync();
  } catch (e) {
    sync.status = 'Sauvegarde sur cet appareil';
    emitSync();
  }
}
