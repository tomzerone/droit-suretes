import { state, save, logSession } from '../store.js';
import { EPISODES, SPEAKERS } from '../../content/podcast.js';
import { chLabel } from '../data.js';
import { esc, icon, $, $$, toast } from '../ui.js';

const WPM = 150;
const words = (ep) => ep.lines.reduce((a, l) => a + l[1].split(/\s+/).length, 0);
const minutes = (ep) => Math.max(1, Math.round(words(ep) / WPM + ep.lines.filter((l) => l[0] === 'P').length * 5 / 60));
const prog = (id) => (state.podcast && state.podcast[id]) || null;

// ───────── Moteurs de voix : voix Claude (claude.ai) sinon synthèse vocale du navigateur
const CLAUDE_VOICE = { C: 'airy', S: 'buttery', P: 'airy' };
let ttsPromise = null;
function getClaudeTTS() {
  const C = typeof window !== 'undefined' ? window.claude : null;
  if (!C || typeof C.use !== 'function') return Promise.resolve(null);
  if (!ttsPromise) ttsPromise = C.use('tts').catch(() => null);
  return ttsPromise;
}
function browserVoices() {
  const synth = window.speechSynthesis;
  if (!synth) return [];
  return synth.getVoices().filter((v) => /^fr/i.test(v.lang));
}
function pickBrowserVoices() {
  const fr = browserVoices();
  if (!fr.length) return null;
  const pref = (re) => fr.find((v) => re.test(v.name));
  const female = pref(/amélie|amelie|audrey|aurélie|denise|julie|marie|hortense|léa|lea|google français/i) || fr[0];
  const male = pref(/thomas|henri|paul|daniel|nicolas|claude|jacques|mathieu/i) || fr.find((v) => v !== female) || fr[0];
  return { C: female, P: female, S: male, same: female === male };
}
const sentences = (t) => t.match(/[^.!?…]+[.!?…»]*\s*/g) || [t];

let engine = null; // { kind: 'claude'|'browser'|null, label }
async function detectEngine() {
  const t = await getClaudeTTS();
  if (t) return { kind: 'claude', t, label: 'Voix Claude' };
  if (window.speechSynthesis) {
    // les voix se chargent parfois de façon asynchrone
    if (!browserVoices().length) await new Promise((r) => { const to = setTimeout(r, 1200); window.speechSynthesis.onvoiceschanged = () => { clearTimeout(to); r(); }; });
    const v = pickBrowserVoices();
    if (v) return { kind: 'browser', v, label: 'Voix de ton appareil' };
  }
  return { kind: null, label: 'Lecture audio indisponible sur cet appareil' };
}

// ───────── Lecteur
let player = null;
function stopAll() {
  if (!player) return;
  player.token++;
  player.playing = false;
  try { if (engine && engine.kind === 'claude') engine.t.stop(); } catch {}
  try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
  clearTimeout(player.wait);
}
function speakBrowser(text, who, rate, token) {
  return new Promise((resolve, reject) => {
    const parts = sentences(text);
    let i = 0;
    const next = () => {
      if (!player || player.token !== token) return reject({ code: 'stopped' });
      if (i >= parts.length) return resolve();
      const u = new SpeechSynthesisUtterance(parts[i++].trim());
      const v = engine.v[who];
      u.voice = v; u.lang = v.lang || 'fr-FR'; u.rate = rate;
      if (engine.v.same) u.pitch = who === 'S' ? 0.85 : 1.1;
      u.onend = next; u.onerror = (e) => (e.error === 'interrupted' || e.error === 'canceled' ? reject({ code: 'stopped' }) : next());
      window.speechSynthesis.speak(u);
    };
    next();
  });
}
async function speakLine(line, token) {
  const [who, text] = line;
  if (engine.kind === 'claude') return engine.t.speak(text, { voice: CLAUDE_VOICE[who], language: 'fr', rate: player.rate });
  return speakBrowser(text, who, player.rate, token);
}

function listView() {
  const done = EPISODES.filter((e) => prog(e.id) && prog(e.id).done).length;
  return `
  <header class="page-h"><h1>Podcast</h1><p class="lead">Sept épisodes à écouter dans les transports ou en marchant : Camille explique, Sacha révise avec toi et pose les questions que tu te poses. Tout vient de ton cours, et chaque épisode se termine par l'essentiel à retenir.</p></header>
  <p class="muted">${done ? `${done} épisode${done > 1 ? 's' : ''} écouté${done > 1 ? 's' : ''} sur ${EPISODES.length}` : `${EPISODES.length} épisodes, environ ${EPISODES.reduce((a, e) => a + minutes(e), 0)} minutes au total`}</p>
  <ol class="eps">${EPISODES.map((e) => {
    const p = prog(e.id);
    const st = p && p.done ? 'Écouté' : p && p.line ? `En cours, réplique ${p.line + 1} sur ${e.lines.length}` : '';
    return `<li><a class="ep-i ${p && p.done ? 'done' : ''}" href="#podcast-${e.id}"><span class="ep-n">${e.num}</span><span class="ep-b"><strong>${esc(e.title)}</strong><span>${esc(e.summary)}</span><em>${minutes(e)} min — ${e.ch.map(chLabel).join(', ')}${st ? ` — <b>${st}</b>` : ''}</em></span><span class="ep-play" aria-hidden="true">${icon('right')}</span></a></li>`;
  }).join('')}</ol>`;
}

function epView(ep) {
  const p = prog(ep.id) || {};
  const idx = EPISODES.indexOf(ep);
  const next = EPISODES[idx + 1];
  return `
  <a href="#podcast" class="back">${icon('left')} Tous les épisodes</a>
  <header class="page-h ep-h"><span class="ep-n big">${ep.num}</span><div><h1>${esc(ep.title)}</h1><p class="lead">${esc(ep.summary)}</p><p class="muted small">${minutes(ep)} min — ${ep.ch.map((c) => `<a href="#cours-${c}">${esc(chLabel(c))}</a>`).join(', ')}</p></div></header>
  <div class="player" id="player">
    <button class="play" id="pp" aria-label="Lecture">${playIcon(false)}</button>
    <div class="pl-mid">
      <div class="pl-now" id="now">${p.line ? `Reprendre à la réplique ${p.line + 1}` : 'Prêt à écouter'}</div>
      <div class="pl-bar" aria-hidden="true"><i id="bar" style="width:${Math.round(100 * (p.line || 0) / ep.lines.length)}%"></i></div>
      <div class="pl-eng muted small" id="eng">Recherche des voix disponibles…</div>
    </div>
    <div class="pl-ctrl">
      <button class="icon-btn" id="prevl" aria-label="Réplique précédente">${icon('left')}</button>
      <button class="icon-btn" id="nextl" aria-label="Réplique suivante">${icon('right')}</button>
      <label class="sr" for="rate">Vitesse</label>
      <select id="rate" class="rate">${[0.8, 0.9, 1, 1.15, 1.3, 1.5].map((r) => `<option value="${r}" ${r === (state.podcastRate || 1) ? 'selected' : ''}>${String(r).replace('.', ',')}×</option>`).join('')}</select>
    </div>
  </div>
  <label class="switch small"><input type="checkbox" id="thinkp" ${state.podcastThink === false ? '' : 'checked'}><span>Marquer une pause de 5 secondes après chaque question qui t'est posée</span></label>
  <ol class="tr" id="tr">${ep.lines.map(([who, text], i) => `<li data-l="${i}" class="tr-${who} ${i === p.line ? 'cur' : ''}"><button class="tr-b" data-go="${i}"><span class="tr-w">${who === 'P' ? 'À toi' : SPEAKERS[who].name}</span><span class="tr-t">${esc(text)}</span></button></li>`).join('')}</ol>
  ${next ? `<a class="pn-a r solo" href="#podcast-${next.id}"><span><em>Épisode suivant</em>${esc(next.title)}</span>${icon('right')}</a>` : ''}`;
}
function playIcon(on) {
  return on
    ? '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>'
    : '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
}

export function render(param) {
  const ep = EPISODES.find((e) => e.id === param);
  if (!ep) return { html: listView(), title: 'Podcast', resume: 'Podcast' };
  return { html: epView(ep), title: ep.title, resume: `Podcast — épisode ${ep.num} : ${ep.title}` };
}

export function mount(root, param) {
  const ep = EPISODES.find((e) => e.id === param);
  if (!ep) return;
  logSession('podcast', `Podcast — épisode ${ep.num}`);
  state.podcast = state.podcast || {};
  const saved = state.podcast[ep.id] || {};
  player = { ep, i: Math.min(saved.done ? 0 : saved.line || 0, ep.lines.length - 1), playing: false, token: 0, rate: state.podcastRate || 1 };
  const pp = $('#pp', root), now = $('#now', root), bar = $('#bar', root), eng = $('#eng', root);

  detectEngine().then((e) => {
    engine = e;
    if (!root.isConnected) return;
    eng.textContent = e.kind ? e.label + (e.kind === 'browser' && e.v.same ? ' (une seule voix française disponible)' : '') : e.label + ' : lis la transcription ci-dessous.';
    if (!e.kind) pp.disabled = true;
  });

  const mark = (i) => {
    $$('.tr li.cur', root).forEach((li) => li.classList.remove('cur'));
    const li = $(`.tr li[data-l="${i}"]`, root);
    if (li) { li.classList.add('cur'); if (player.playing) li.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    bar.style.width = Math.round(100 * i / ep.lines.length) + '%';
    const [who] = ep.lines[i];
    now.textContent = `${who === 'P' ? 'Question pour toi' : SPEAKERS[who].name} — réplique ${i + 1} sur ${ep.lines.length}`;
  };
  const persist = (done) => {
    state.podcast[ep.id] = { line: player.i, done: done || (state.podcast[ep.id] && state.podcast[ep.id].done) || false, at: Date.now() };
    save();
  };
  const setBtn = () => { pp.innerHTML = playIcon(player.playing); pp.setAttribute('aria-label', player.playing ? 'Pause' : 'Lecture'); };

  async function loop() {
    const token = ++player.token;
    player.playing = true; setBtn();
    while (player.playing && player.token === token && player.i < ep.lines.length) {
      mark(player.i); persist();
      try { await speakLine(ep.lines[player.i], token); }
      catch (err) {
        if (player.token !== token) return; // arrêt volontaire
        if (err && err.code === 'not_granted') { engine = await detectBrowserOnly(); eng.textContent = engine.kind ? engine.label : 'Lecture audio indisponible'; if (!engine.kind) break; continue; }
        if (err && err.code === 'rate_limited') { toast('Trop de lectures d\'un coup : réessaie dans un instant'); break; }
      }
      if (player.token !== token) return;
      if (ep.lines[player.i][0] === 'P' && $('#thinkp', root).checked) await new Promise((r) => (player.wait = setTimeout(r, 5000)));
      if (player.token !== token) return;
      player.i++;
    }
    if (player.token !== token) return;
    player.playing = false; setBtn();
    if (player.i >= ep.lines.length) { player.i = 0; persist(true); now.textContent = 'Épisode terminé'; bar.style.width = '100%'; toast('Épisode marqué comme écouté'); }
  }
  async function detectBrowserOnly() {
    const v = pickBrowserVoices();
    return v ? { kind: 'browser', v, label: 'Voix de ton appareil' } : { kind: null, label: '' };
  }
  const jump = (i) => { const was = player.playing; stopAll(); player.i = Math.max(0, Math.min(ep.lines.length - 1, i)); mark(player.i); persist(); if (was && engine && engine.kind) loop(); else setBtn(); };

  pp.onclick = () => {
    if (!engine) { toast('Chargement des voix…'); return; }
    if (player.playing) { stopAll(); setBtn(); persist(); } else loop();
  };
  $('#prevl', root).onclick = () => jump(player.i - 1);
  $('#nextl', root).onclick = () => jump(player.i + 1);
  $('#rate', root).onchange = (e) => { player.rate = +e.target.value; state.podcastRate = player.rate; save(); try { if (engine && engine.kind === 'claude') engine.t.setRate(player.rate); } catch {} };
  $('#thinkp', root).onchange = (e) => { state.podcastThink = e.target.checked; save(); };
  $('#tr', root).addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]'); if (!b) return;
    player.i = +b.dataset.go;
    if (engine && engine.kind) { stopAll(); loop(); } else mark(player.i);
  });
}
export function unmount() { stopAll(); player = null; }
