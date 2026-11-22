import { state, save, logSession } from '../store.js';
import { CAS, METHODE, LEVELS, chLabel } from '../data.js';
import { esc, icon, $, $$, note20, toast, confirmDialog } from '../ui.js';
import { getSample, evaluateCase } from '../ai.js';

const CRIT = [
  ['exactitude', 'Exactitude juridique par rapport au cours'],
  ['probleme', 'Identification du problème'],
  ['argumentation', 'Qualité de l\'argumentation'],
  ['application', 'Application aux faits'],
  ['clarte', 'Clarté de la rédaction'],
];
const STEPS = [['qualification', 'Qualification des faits'], ['probleme', 'Problème de droit'], ['regle', 'Règle applicable'], ['application', 'Application aux faits'], ['conclusion', 'Conclusion']];

// ───────── Méthodologie
const methode = {
  render() {
    const M = METHODE;
    const html = `
    <header class="page-h"><h1>Résoudre un cas pratique</h1><p class="lead">${M.intro}</p></header>
    <ol class="steps">${M.steps.map((s) => `
      <li class="step"><div class="step-n">${s.n}</div><div class="step-b">
        <h2>${esc(s.title)}</h2><p>${s.what}</p>
        <ul class="how">${s.how.map((x) => `<li>${x}</li>`).join('')}</ul>
        <div class="step-ex"><span>Avec une notion du cours</span><p>${s.example}</p></div>
      </div></li>`).join('')}</ol>
    <section class="upgrade"><h2>${esc(M.upgrade.title)}</h2><p>${M.upgrade.intro}</p>
      <div class="levels">${M.upgrade.levels.map((l, i) => `<article class="lvl lvl-${i}"><header><h3>${esc(l.label)}</h3><span class="score">${l.score}</span></header><blockquote>${l.text}</blockquote><p class="why">${esc(l.why)}</p></article>`).join('')}</div>
      <p class="muted small">Ces notes illustrent l'écart entre les niveaux de réponse ; elles ne correspondent pas à un barème officiel.</p>
    </section>
    <div class="two">
      <section class="panel"><h2>Rédiger des réponses structurées</h2><ul class="clean">${M.writing.map((x) => `<li>${x}</li>`).join('')}</ul></section>
      <section class="panel"><h2>Erreurs fréquentes</h2><dl class="mist">${M.mistakes.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl></section>
    </div>
    <div class="cta-row"><a class="btn primary" href="#cas">S'entraîner sur les cas pratiques</a><a class="btn ghost" href="#examens">Passer un examen blanc</a></div>`;
    return { html, title: 'Méthode du cas pratique', resume: 'Méthode du cas pratique' };
  },
  mount() { logSession('methode', 'Méthode du cas pratique'); },
};

// ───────── Liste des cas
function list() {
  const by = [1, 2, 3].map((lv) => `
    <section class="cas-lv"><h2><span class="lv lv${lv}">${LEVELS[lv]}</span> ${lv === 1 ? 'Application d\'une notion' : lv === 2 ? 'Combinaison de plusieurs notions' : 'Plusieurs problèmes et distinctions fines'}</h2>
    <div class="cas-list">${CAS.filter((c) => c.level === lv).map((c) => {
      const ev = (state.cases[c.id] && state.cases[c.id].evals) || {};
      const done = Object.keys(ev).length;
      const avg = done ? Object.values(ev).reduce((a, e) => a + e.score20, 0) / done : null;
      return `<a class="cas-i" href="#cas-${c.id}"><strong>${esc(c.title)}</strong><span>${c.questions.length} questions — ${c.chapters.map(chLabel).join(', ')}</span><em>${done ? `${done}/${c.questions.length} corrigées, moyenne ${note20(avg)}/20` : 'Pas encore traité'}</em></a>`;
    }).join('')}</div></section>`).join('');
  return `<header class="page-h"><h1>Cas pratiques</h1><p class="lead">Neuf situations sur trois niveaux, qui couvrent tout le programme. Rédige ta réponse, puis découvre la correction détaillée et évalue ton raisonnement.</p></header>
  <p class="note">${icon('scale')} Nouveau dans l'exercice ? Commence par <a href="#methode">la méthode du cas pratique</a>.</p>${by}`;
}

// ───────── Un cas
function correction(c, qi) {
  const q = c.questions[qi];
  const model = STEPS.map(([k]) => q[k]).join(' ');
  return `
  <div class="corr">
    <h4>Correction structurée</h4>
    <dl class="syl">${STEPS.map(([k, l]) => `<dt>${l}</dt><dd>${esc(q[k])}</dd>`).join('')}</dl>
    <details class="model-d"><summary>Lire la réponse modèle rédigée d'un seul tenant</summary><div class="model"><p>${esc(model)}</p></div></details>
    <div class="two tight">
      <div><h4>Éléments indispensables</h4><ul class="must">${q.indispensables.map((x, i) => `<li><label><input type="checkbox" data-must="${i}"> ${esc(x)}</label></li>`).join('')}</ul><p class="muted small">Coche ce que ta réponse contient vraiment.</p></div>
      <div><h4>Erreurs fréquentes</h4><ul class="errs">${q.erreurs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </div>
    <div class="self">
      <h4>Auto-évaluation de ton raisonnement</h4>
      <p class="muted small">Compare ta réponse à la réponse modèle, critère par critère (0 = absent, 4 = parfait).</p>
      ${CRIT.map(([k, l]) => `<div class="crit"><span>${l}</span><div class="pips" role="radiogroup" aria-label="${l}">${[0, 1, 2, 3, 4].map((n) => `<button type="button" role="radio" aria-checked="false" data-crit="${k}" data-v="${n}">${n}</button>`).join('')}</div></div>`).join('')}
      <button class="btn primary" data-selfsave="${qi}">Enregistrer mon auto-évaluation</button>
    </div>
  </div>`;
}

function aiResult(r) {
  return `<div class="ai-res">
    <div class="ai-score"><b>${note20(r.score20)}<small>/20</small></b><span>${esc(r.synthese)}</span></div>
    <ul class="crit-bars">${CRIT.map(([k, l]) => { const c = r.criteres[k]; return `<li><div><span>${l}</span><strong>${note20(c.note)}/4</strong></div><i><b style="width:${c.note * 25}%"></b></i><p>${esc(c.commentaire)}</p></li>`; }).join('')}</ul>
    ${r.erreurs.length ? `<h5>Erreurs au regard du cours</h5><ul class="errs">${r.erreurs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${r.points_forts.length ? `<h5>Points forts</h5><ul>${r.points_forts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${r.a_ameliorer.length ? `<h5>À améliorer</h5><ul>${r.a_ameliorer.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    <p class="muted small">Correction générée par Claude à partir de ton cours et du corrigé : c'est un entraînement, pas la note de ta professeure.</p>
  </div>`;
}

function caseView(c) {
  const data = state.cases[c.id] || {};
  const ans = data.answers || {};
  const evals = data.evals || {};
  const idx = CAS.indexOf(c);
  const next = CAS[idx + 1];
  return `
  <a href="#cas" class="back">${icon('left')} Tous les cas</a>
  <header class="page-h"><span class="lv lv${c.level}">${LEVELS[c.level]}</span><h1>${esc(c.title)}</h1><p class="muted">Notions mobilisées : ${c.chapters.map((x) => `<a href="#cours-${x}">${esc(chLabel(x))}</a>`).join(', ')}</p></header>
  <div class="case">
    <details class="enonce" open><summary>Énoncé</summary><div class="enonce-b">${c.enonce}</div></details>
    <div class="qs">${c.questions.map((q, i) => `
      <section class="q" id="q${i}" data-qi="${i}">
        <h2><span class="qn">Question ${i + 1}</span>${esc(q.q)}</h2>
        <label class="sr" for="a-${i}">Ta réponse à la question ${i + 1}</label>
        <textarea id="a-${i}" data-ans="${i}" rows="8" placeholder="Rédige ta réponse : qualification, problème, règle, application, conclusion…">${esc(ans[i] || '')}</textarea>
        <div class="q-bar"><span class="saved muted small" data-saved="${i}">${ans[i] ? 'Brouillon enregistré' : ''}</span>
          <button class="btn ghost ai-btn" data-ai="${i}" hidden>${icon('spark')} Faire corriger par Claude</button>
          <button class="btn primary" data-show="${i}">Voir la correction</button></div>
        <div class="ai-out" data-aiout="${i}">${evals[i] && evals[i].by === 'ai' && evals[i].detail ? aiResult(evals[i].detail) : ''}</div>
        ${evals[i] ? `<p class="ev-line">Dernière évaluation : <strong>${note20(evals[i].score20)}/20</strong> (${evals[i].by === 'ai' ? 'correction par Claude' : 'auto-évaluation'})</p>` : ''}
        <div class="corr-slot" data-corr="${i}" hidden></div>
      </section>`).join('')}</div>
  </div>
  ${next ? `<a class="pn-a r solo" href="#cas-${next.id}"><span><em>Cas suivant</em>${esc(next.title)}</span>${icon('right')}</a>` : ''}`;
}

export function render(param) {
  if (!param) return { html: list(), title: 'Cas pratiques', resume: 'Cas pratiques' };
  const c = CAS.find((x) => x.id === param);
  if (!c) return { html: list(), title: 'Cas pratiques' };
  return { html: caseView(c), title: c.title, resume: `Cas pratique — ${c.title}` };
}

export function mount(root, param) {
  const c = CAS.find((x) => x.id === param);
  if (!c) return;
  logSession('cas', `Cas pratique — ${c.title}`);
  const d = (state.cases[c.id] = state.cases[c.id] || { answers: {}, evals: {} });
  d.answers = d.answers || {}; d.evals = d.evals || {};
  const timers = {};
  root.addEventListener('input', (e) => {
    const t = e.target.closest('[data-ans]'); if (!t) return;
    const i = t.dataset.ans;
    clearTimeout(timers[i]);
    timers[i] = setTimeout(() => { d.answers[i] = t.value; save(); const s = $(`[data-saved="${i}"]`, root); if (s) s.textContent = 'Brouillon enregistré'; }, 600);
  });
  getSample().then((s) => { if (s) $$('.ai-btn', root).forEach((b) => (b.hidden = false)); });
  const self = {};
  root.addEventListener('click', async (e) => {
    const show = e.target.closest('[data-show]');
    if (show) {
      const i = +show.dataset.show;
      const slot = $(`[data-corr="${i}"]`, root);
      const txt = $(`[data-ans="${i}"]`, root).value.trim();
      if (!txt && slot.hidden) {
        const ok = await confirmDialog('Voir la correction sans répondre ?', 'Tu progresseras davantage en rédigeant d\'abord ta propre réponse, même courte.', 'Voir quand même');
        if (!ok) return;
      }
      slot.innerHTML = correction(c, i); slot.hidden = false; show.remove();
      slot.querySelector('h4').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const pip = e.target.closest('[data-crit]');
    if (pip) {
      const qi = pip.closest('[data-qi]').dataset.qi;
      self[qi] = self[qi] || {};
      self[qi][pip.dataset.crit] = +pip.dataset.v;
      pip.parentElement.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', b === pip));
      return;
    }
    const ss = e.target.closest('[data-selfsave]');
    if (ss) {
      const qi = ss.dataset.selfsave;
      const v = self[qi] || {};
      if (Object.keys(v).length < CRIT.length) { toast('Note les cinq critères avant d\'enregistrer'); return; }
      const score = Object.values(v).reduce((a, b) => a + b, 0);
      d.evals[qi] = { score20: score, by: 'self', at: Date.now(), detail: v };
      save();
      ss.outerHTML = `<p class="ev-ok">${icon('check')} Auto-évaluation enregistrée : <strong>${note20(score)}/20</strong></p>`;
      return;
    }
    const ai = e.target.closest('[data-ai]');
    if (ai) {
      const i = +ai.dataset.ai;
      const txt = $(`[data-ans="${i}"]`, root).value.trim();
      if (txt.length < 40) { toast('Rédige une réponse plus développée avant de la faire corriger'); return; }
      d.answers[i] = txt; save();
      const out = $(`[data-aiout="${i}"]`, root);
      ai.disabled = true; out.innerHTML = '<p class="loading">Correction en cours au regard de ton cours…</p>';
      try {
        const r = await evaluateCase(c.enonce, c.questions[i], txt);
        d.evals[i] = { score20: r.score20, by: 'ai', at: Date.now(), detail: r };
        save();
        out.innerHTML = aiResult(r);
      } catch (err) {
        const code = err && err.code;
        out.innerHTML = `<p class="err-box">${code === 'not_granted' ? 'La correction par Claude n\'a pas été autorisée. Utilise l\'auto-évaluation guidée sous la correction.' : code === 'rate_limited' ? 'Trop de demandes de correction : réessaie dans quelques minutes, ou utilise l\'auto-évaluation.' : 'La correction automatique n\'a pas abouti. Réessaie, ou utilise l\'auto-évaluation guidée.'}</p>`;
        if (code === 'not_granted') ai.hidden = true;
      } finally { ai.disabled = false; }
    }
  });
}

export const views = { methode };
