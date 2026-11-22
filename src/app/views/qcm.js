import { state, save, logSession } from '../store.js';
import { QCM, CHAPTERS, CH, LEVELS, chLabel } from '../data.js';
import { esc, icon, $, $$, shuffle, plural, toast } from '../ui.js';
import { go } from '../main.js';

export function typeHint(q) {
  const n = q.opts.filter((o) => o[1]).length;
  if (q.type === 'tf') return 'Vrai ou faux';
  if (q.type === 'multi') return `Plusieurs réponses possibles : ${n} bonne${n > 1 ? 's' : ''} réponse${n > 1 ? 's' : ''} à trouver`;
  return 'Une seule bonne réponse';
}
export function optionsHTML(q, name, order) {
  const input = q.type === 'multi' ? 'checkbox' : 'radio';
  return `<div class="opts" role="${q.type === 'multi' ? 'group' : 'radiogroup'}">${order.map((oi) => `
    <label class="opt" data-oi="${oi}"><input type="${input}" name="${name}" value="${oi}"><span class="opt-m" aria-hidden="true"></span><span class="opt-t">${esc(q.opts[oi][0])}</span></label>`).join('')}</div>`;
}
export function isCorrect(q, picked) {
  const good = q.opts.map((o, i) => (o[1] ? i : -1)).filter((i) => i >= 0);
  return picked.length === good.length && good.every((g) => picked.includes(g));
}
export function correctionHTML(q, picked, order) {
  return `<ul class="opt-corr">${order.map((oi) => {
    const [t, ok, why] = q.opts[oi];
    const chosen = picked.includes(oi);
    return `<li class="${ok ? 'good' : 'bad'} ${chosen ? 'chosen' : ''}"><span class="oc-s">${ok ? 'Vrai' : 'Faux'}${chosen ? ' — ton choix' : ''}</span><strong>${esc(t)}</strong><span>${esc(why)}</span></li>`;
  }).join('')}</ul><p class="notion"><span>Notion</span>${esc(q.notion)} <a href="#cours-${q.ch}">Revoir : ${esc(chLabel(q.ch))}</a></p>`;
}
export function recordAnswer(q, ok) {
  const s = state.qcm[q.id] || { ok: 0, ko: 0 };
  if (ok) s.ok++; else s.ko++;
  s.last = ok; s.at = Date.now();
  state.qcm[q.id] = s;
}

// Sélection : chapitres, niveau, priorité aux questions ratées puis jamais vues
export function pickQuestions({ chapters = null, level = 0, count = 10, weakFirst = true }) {
  let pool = QCM.filter((q) => (!chapters || chapters.includes(q.ch)) && (!level || q.level === level));
  pool = shuffle(pool);
  if (weakFirst) {
    const rank = (q) => { const s = state.qcm[q.id]; return !s ? 1 : s.last ? 2 : 0; };
    pool.sort((a, b) => rank(a) - rank(b));
  }
  return count ? pool.slice(0, count) : pool;
}

let cfg = { chapters: [], level: 0, count: 10, weakFirst: true };
let run = null;

export function startRun(questions, label) {
  run = { label, items: questions.map((q) => ({ id: q.id, order: q.type === 'tf' ? [0, 1] : shuffle(q.opts.map((_, i) => i)), picked: null })), i: 0, startedAt: Date.now() };
}

function config() {
  const counts = Object.fromEntries(CHAPTERS.map((c) => [c.id, QCM.filter((q) => q.ch === c.id).length]));
  return `
  <header class="page-h"><h1>QCM</h1><p class="lead">${QCM.length} questions : réponse unique, réponses multiples et vrai/faux, sur trois niveaux. Chaque proposition est corrigée et expliquée.</p></header>
  <form id="qcfg" class="cfg">
    <fieldset><legend>Chapitres</legend><p class="muted small">Aucun chapitre coché = tout le programme (questions transversales comprises).</p>
      <div class="chips">${CHAPTERS.map((c) => `<label class="chip chk"><input type="checkbox" name="ch" value="${c.id}" ${cfg.chapters.includes(c.id) ? 'checked' : ''}><span>${esc(chLabel(c.id))} <em>${counts[c.id]}</em></span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Niveau</legend><div class="seg">${[[0, 'Tous'], [1, LEVELS[1]], [2, LEVELS[2]], [3, 'Exigeant']].map(([v, l]) => `<label><input type="radio" name="lv" value="${v}" ${cfg.level == v ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Nombre de questions</legend><div class="seg">${[[10, '10'], [20, '20'], [0, 'Toutes']].map(([v, l]) => `<label><input type="radio" name="n" value="${v}" ${cfg.count == v ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
    <label class="switch"><input type="checkbox" name="weak" ${cfg.weakFirst ? 'checked' : ''}><span>Proposer d'abord les questions ratées, puis celles jamais vues</span></label>
    <button class="btn primary big">Commencer le QCM</button>
  </form>
  ${state.qcmRuns.length ? `<h2 class="h2s">Derniers résultats</h2><ul class="rows res">${state.qcmRuns.slice(0, 5).map((r) => `<li><span>${esc(r.label)}</span><strong>${r.score}/${r.total}</strong></li>`).join('')}</ul>` : ''}`;
}

function question() {
  const it = run.items[run.i];
  const q = QCM.find((x) => x.id === it.id);
  const answered = it.picked !== null;
  return `
  <div class="fc-top"><a href="#qcm" class="back">${icon('left')} Quitter</a><span>${esc(run.label)}</span><span class="fc-count" aria-live="polite">Question ${run.i + 1} sur ${run.items.length}</span></div>
  <div class="fc-prog" aria-hidden="true"><i style="width:${Math.round(100 * run.i / run.items.length)}%"></i></div>
  <article class="qcm-q">
    <p class="qmeta"><span>${esc(chLabel(q.ch))}</span><span class="lv lv${q.level}">${LEVELS[q.level]}</span></p>
    <h1 class="qtitle">${esc(q.q)}</h1>
    <p class="hint">${typeHint(q)}</p>
    <form id="qform">${optionsHTML(q, 'o', it.order)}
      ${answered ? '' : '<button class="btn primary" id="validate">Valider ma réponse</button>'}
    </form>
    <div id="qcorr">${answered ? `<p class="verdict ${isCorrect(q, it.picked) ? 'ok' : 'ko'}">${isCorrect(q, it.picked) ? 'Bonne réponse' : 'Réponse incorrecte'}</p>` + correctionHTML(q, it.picked, it.order) : ''}</div>
    ${answered ? `<button class="btn primary" id="nextq">${run.i + 1 < run.items.length ? 'Question suivante' : 'Voir mon résultat'}</button>` : ''}
  </article>`;
}

function results() {
  const qs = run.items.map((it) => ({ it, q: QCM.find((x) => x.id === it.id) }));
  const ok = qs.filter(({ it, q }) => isCorrect(q, it.picked)).length;
  const byCh = {};
  qs.forEach(({ it, q }) => { byCh[q.ch] = byCh[q.ch] || [0, 0]; byCh[q.ch][1]++; if (isCorrect(q, it.picked)) byCh[q.ch][0]++; });
  return `
  <header class="page-h"><h1>Résultat</h1><p class="lead">${esc(run.label)}</p></header>
  <div class="done-box"><b>${ok}<small>/${qs.length}</small></b><span>bonnes réponses, soit ${Math.round(20 * ok / qs.length * 2) / 2} sur 20</span></div>
  <h2 class="h2s">Par chapitre</h2>
  <ul class="rows res">${Object.entries(byCh).map(([ch, [a, b]]) => `<li><a href="#cours-${ch}">${esc(chLabel(ch))}</a><strong>${a}/${b}</strong><em>${a === b ? 'maîtrisé' : 'à revoir'}</em></li>`).join('')}</ul>
  <h2 class="h2s">Revoir les questions</h2>
  <ol class="review">${qs.map(({ it, q }) => `<li class="${isCorrect(q, it.picked) ? 'ok' : 'ko'}"><details><summary><span>${isCorrect(q, it.picked) ? 'Juste' : 'Faux'}</span>${esc(q.q)}</summary>${correctionHTML(q, it.picked, it.order)}</details></li>`).join('')}</ol>
  <div class="row-btns"><button class="btn primary" id="retry-wrong" ${ok === qs.length ? 'hidden' : ''}>Refaire les questions ratées</button><a class="btn ghost" href="#qcm">Nouveau QCM</a></div>`;
}

export function render(param) {
  if (param && param !== 'run' && CH[param]) {
    startRun(pickQuestions({ chapters: [param], count: 10 }), `QCM — ${chLabel(param)}`);
  }
  if ((param === 'run' || CH[param]) && run) {
    const html = run.done ? results() : question();
    return { html, title: 'QCM', noFocus: !!run.i };
  }
  return { html: config(), title: 'QCM', resume: 'QCM' };
}

export function mount(root, param) {
  if (!(param && run)) {
    $('#qcfg', root).onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      cfg = { chapters: f.getAll('ch'), level: +f.get('lv'), count: +f.get('n'), weakFirst: !!f.get('weak') };
      const qs = pickQuestions({ chapters: cfg.chapters.length ? cfg.chapters : null, level: cfg.level, count: cfg.count, weakFirst: cfg.weakFirst });
      if (!qs.length) { toast('Aucune question ne correspond à ces critères'); return; }
      startRun(qs, `QCM — ${cfg.chapters.length ? cfg.chapters.map(chLabel).join(', ') : 'tout le programme'}${cfg.level ? ', niveau ' + LEVELS[cfg.level].toLowerCase() : ''}`);
      go('qcm-run');
    };
    return;
  }
  logSession('qcm', run.label);
  const rerender = () => { root.innerHTML = run.done ? results() : question(); bind(); window.scrollTo(0, 0); };
  function bind() {
    const form = $('#qform', root);
    if (form) form.onsubmit = (e) => {
      e.preventDefault();
      const picked = $$('input:checked', form).map((i) => +i.value);
      if (!picked.length) { toast('Choisis au moins une proposition'); return; }
      const it = run.items[run.i]; it.picked = picked;
      const q = QCM.find((x) => x.id === it.id);
      recordAnswer(q, isCorrect(q, picked)); save();
      const pos = window.scrollY;
      root.innerHTML = question(); bind(); window.scrollTo(0, pos);
      $('#qcorr', root).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    const it = run.items[run.i];
    if (it && it.picked) {
      $$('input', root).forEach((i) => { i.disabled = true; i.checked = it.picked.includes(+i.value); });
      const q = QCM.find((x) => x.id === it.id);
      $$('.opt', root).forEach((l) => { const oi = +l.dataset.oi; l.classList.add(q.opts[oi][1] ? 'is-good' : (it.picked.includes(oi) ? 'is-bad' : 'is-neutral')); });
    }
    const nx = $('#nextq', root);
    if (nx) nx.onclick = () => {
      if (run.i + 1 < run.items.length) run.i++;
      else {
        run.done = true;
        const ok = run.items.filter((x) => isCorrect(QCM.find((q) => q.id === x.id), x.picked)).length;
        state.qcmRuns.unshift({ at: Date.now(), label: run.label, score: ok, total: run.items.length });
        state.qcmRuns = state.qcmRuns.slice(0, 30); save();
      }
      rerender();
    };
    const rw = $('#retry-wrong', root);
    if (rw) rw.onclick = () => {
      const wrong = run.items.filter((x) => !isCorrect(QCM.find((q) => q.id === x.id), x.picked)).map((x) => QCM.find((q) => q.id === x.id));
      startRun(shuffle(wrong), run.label + ' (questions ratées)'); rerender();
    };
  }
  bind();
}
