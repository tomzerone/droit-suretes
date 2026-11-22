import { PARTS, CHAPTERS, CHECKS } from '../content/cours.js';
import { FICHES, FICHE_GENERALE } from '../content/fiches.js';
import { FLASHCARDS } from '../content/flashcards.js';
import { QCM } from '../content/qcm.js';
import { METHODE } from '../content/methode.js';
import { CAS } from '../content/cas.js';
import { PROBABLES, SIGNAUX } from '../content/probables.js';
import { EXAMS_CAS, EXAMS_QCM } from '../content/examens.js';
import { blockText, strip } from './ui.js';
import { state } from './store.js';

export { PARTS, CHAPTERS, CHECKS, FICHES, FICHE_GENERALE, FLASHCARDS, QCM, METHODE, CAS, PROBABLES, SIGNAUX, EXAMS_CAS, EXAMS_QCM };

export const CH = Object.fromEntries(CHAPTERS.map((c) => [c.id, c]));
export const chLabel = (id) => (CH[id] ? `${CH[id].num}. ${CH[id].short}` : id);
export const LEVELS = { 1: 'Facile', 2: 'Intermédiaire', 3: 'Difficile' };

// ───────── Recherche plein texte dans le cours, les fiches et les flashcards
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, ' ');
let INDEX = null;
function buildIndex() {
  INDEX = [];
  CHAPTERS.forEach((c) => c.sections.forEach((s) => s.blocks.forEach((b, i) => {
    const text = blockText(b);
    if (text) INDEX.push({ kind: 'Cours', ch: c.id, sec: s.id, anchor: `${c.id}-${s.id}-b${i}`, title: `${chLabel(c.id)} — ${s.title}`, text, n: norm(text + ' ' + s.title) });
  })));
  FLASHCARDS.forEach((f) => INDEX.push({ kind: 'Flashcard', ch: f.ch, title: f.q, text: f.a, n: norm(f.q + ' ' + f.a) }));
  PROBABLES.forEach((p, i) => INDEX.push({ kind: 'Question probable', ch: p.ch, idx: i, title: p.q, text: strip(p.answer), n: norm(p.q + ' ' + strip(p.answer)) }));
}
export function search(q) {
  if (!INDEX) buildIndex();
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return INDEX
    .map((e) => {
      let score = 0;
      for (const t of terms) { const k = e.n.split(t).length - 1; if (!k) return null; score += k; }
      if (e.kind === 'Cours') score += 2;
      if (norm(e.title).includes(terms[0])) score += 3;
      return { ...e, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 60);
}
export function snippet(text, q, len = 180) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  const n = norm(text);
  let pos = terms.length ? n.indexOf(terms[0]) : 0;
  if (pos < 0) pos = 0;
  const start = Math.max(0, pos - 60);
  let s = text.slice(start, start + len);
  if (start > 0) s = '…' + s;
  if (start + len < text.length) s += '…';
  return s;
}

// ───────── Répétition espacée (système de Leitner)
export const INTERVALS = [0, 1, 3, 7, 15, 30]; // jours
const DAY = 86400000;
export function cardState(id) { return state.cards[id] || null; }
export function rateCard(id, known) {
  const c = state.cards[id] || { box: 0, seen: 0, known: 0, wrong: 0 };
  c.seen++; c.lastAt = Date.now();
  if (known) { c.known++; c.box = Math.min((c.box || 0) + 1, 5); c.due = Date.now() + INTERVALS[c.box] * DAY; }
  else { c.wrong++; c.box = 0; c.due = Date.now(); }
  c.last = known;
  state.cards[id] = c;
}
export const isMastered = (id) => { const c = state.cards[id]; return !!(c && c.last && c.box >= 1); };
export const isToReview = (id) => { const c = state.cards[id]; return !!(c && !c.last); };
export const isDue = (id) => { const c = state.cards[id]; return !c || (c.due || 0) <= Date.now(); };

// Ordre de session : cartes à revoir, puis nouvelles, puis échues, puis le reste (les plus fragiles d'abord)
export function orderDeck(ids) {
  const rank = (id) => {
    const c = state.cards[id];
    if (!c) return 1;
    if (!c.last) return 0;
    if ((c.due || 0) <= Date.now()) return 2;
    return 3 + c.box;
  };
  const groups = {};
  ids.forEach((id) => { const r = rank(id); (groups[r] = groups[r] || []).push(id); });
  return Object.keys(groups).sort((a, b) => a - b).flatMap((k) => groups[k].sort(() => Math.random() - 0.5));
}

// ───────── Indicateurs de maîtrise par chapitre
export function chapterStats(chId) {
  const cards = FLASHCARDS.filter((f) => f.ch === chId);
  const mastered = cards.filter((f) => isMastered(f.id)).length;
  const toReview = cards.filter((f) => isToReview(f.id)).length;
  const qs = QCM.filter((q) => q.ch === chId);
  const answered = qs.filter((q) => state.qcm[q.id]);
  const qOk = answered.filter((q) => state.qcm[q.id].last).length;
  const caseScores = [];
  CAS.forEach((c) => c.questions.forEach((qq, i) => {
    const ev = state.cases[c.id] && state.cases[c.id].evals && state.cases[c.id].evals[i];
    if (ev && qq.ch.includes(chId)) caseScores.push(ev.score20 / 20);
  }));
  const parts = [];
  if (cards.length && (mastered + toReview)) parts.push(mastered / cards.length);
  if (answered.length) parts.push(qOk / answered.length);
  if (caseScores.length) parts.push(caseScores.reduce((a, b) => a + b, 0) / caseScores.length);
  const mastery = parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : null;
  return {
    studied: !!(state.chapters[chId] && state.chapters[chId].studied),
    cards: cards.length, mastered, toReview,
    qcmTotal: qs.length, qcmAnswered: answered.length, qcmOk: qOk,
    caseCount: caseScores.length,
    mastery, // 0..1 ou null si aucune donnée
  };
}

export function globalStats() {
  const studied = CHAPTERS.filter((c) => state.chapters[c.id] && state.chapters[c.id].studied).length;
  const mastered = FLASHCARDS.filter((f) => isMastered(f.id)).length;
  const toReview = FLASHCARDS.filter((f) => isToReview(f.id)).length;
  const due = FLASHCARDS.filter((f) => state.cards[f.id] && isDue(f.id)).length;
  const answered = QCM.filter((q) => state.qcm[q.id]);
  const qOk = answered.filter((q) => state.qcm[q.id].last).length;
  const evals = [];
  Object.values(state.cases).forEach((c) => Object.values(c.evals || {}).forEach((e) => evals.push(e.score20)));
  const caseAvg = evals.length ? evals.reduce((a, b) => a + b, 0) / evals.length : null;
  const progress = Math.round(100 * (0.35 * (studied / CHAPTERS.length) + 0.35 * (mastered / FLASHCARDS.length) + 0.3 * (answered.length ? (qOk / QCM.length) : 0)));
  return { studied, mastered, toReview, due, qcmAnswered: answered.length, qcmOk: qOk, caseAvg, caseCount: evals.length, progress };
}

// Chapitres prioritaires pour la révision intelligente
export function weakChapters(n = 3) {
  const rows = CHAPTERS.map((c) => ({ id: c.id, s: chapterStats(c.id) }));
  const score = (r) => {
    if (r.s.mastery == null) return r.s.studied ? 0.45 : 0.3; // pas de donnée : à travailler
    return r.s.mastery - (r.s.toReview ? 0.05 * r.s.toReview : 0);
  };
  return rows.sort((a, b) => score(a) - score(b)).slice(0, n).map((r) => ({ ...r, score: score(r) }));
}
