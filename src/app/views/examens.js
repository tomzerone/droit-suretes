import { state, save, logSession } from '../store.js';
import { EXAMS_CAS, EXAMS_QCM, QCM, CHAPTERS, chLabel } from '../data.js';
import { esc, icon, $, $$, note20, shuffle, toast, confirmDialog, fmtDate } from '../ui.js';
import { getSample, evaluateExamQuestion } from '../ai.js';
import { optionsHTML, isCorrect, correctionHTML, recordAnswer, typeHint } from './qcm.js';

const STEPS = [['qualification', 'Qualification'], ['probleme', 'Problème de droit'], ['regle', 'Règle applicable'], ['application', 'Application aux faits'], ['conclusion', 'Conclusion']];
let ex = null; // examen en cours
let tick = null;

function history(id) {
  const h = state.exams.filter((e) => e.id === id);
  return h.length ? `Dernière note : <strong>${note20(h[0].score20)}/20</strong> (${fmtDate(h[0].at)})${h.length > 1 ? `, meilleure : ${note20(Math.max(...h.map((x) => x.score20)))}/20` : ''}` : 'Jamais passé';
}

function list() {
  return `
  <header class="page-h"><h1>Examens blancs</h1><p class="lead">Des simulations en conditions réelles : un énoncé, un temps limité, puis une note sur 20 avec correction complète et recommandations.</p></header>
  <p class="note">${icon('alert')} Le barème réel de ton contrôle n'est pas connu. Les notes données ici reposent sur un <strong>barème d'entraînement</strong> conçu par la plateforme.</p>
  <h2 class="h2s">Cas pratiques — la priorité</h2>
  <div class="ex-list">${EXAMS_CAS.map((e) => `<a class="ex-i" href="#examen-${e.id}"><span class="ex-d">${icon('timer')} ${e.duration} min</span><strong>${esc(e.title)}</strong><span>${e.questions.length} questions — dominante : ${esc(e.focus)}</span><em>${history(e.id)}</em></a>`).join('')}</div>
  <h2 class="h2s">QCM</h2>
  <div class="ex-list">${EXAMS_QCM.map((e) => `<a class="ex-i" href="#examen-${e.id}"><span class="ex-d">${icon('timer')} ${e.duration} min</span><strong>${esc(e.title)}</strong><span>${e.count} questions tirées de la banque</span><em>${history(e.id)}</em></a>`).join('')}</div>`;
}

function fmtTime(ms) {
  const neg = ms < 0; ms = Math.abs(ms);
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
  return (neg ? '+' : '') + m + ':' + String(s).padStart(2, '0');
}

// ───────── Cas pratique
function casIntro(e) {
  const draft = state.examDrafts[e.id];
  return `<a href="#examens" class="back">${icon('left')} Examens blancs</a>
  <header class="page-h"><h1>${esc(e.title)}</h1></header>
  <div class="ex-intro">
    <ul class="clean">
      <li>Durée conseillée : <strong>${e.duration} minutes</strong>. Le chronomètre continue après la fin du temps, pour que tu saches où tu en es.</li>
      <li>${e.questions.length} questions, notées sur 20 au total (${e.questions.map((q) => q.points).join(' + ')} points).</li>
      <li>Rédige chaque réponse en suivant la méthode : qualification, problème, règle, application, conclusion.</li>
      <li>Ta copie est enregistrée au fur et à mesure : tu peux interrompre et reprendre.</li>
      <li>Une fois la copie rendue : note, correction complète, notions maîtrisées et à revoir.</li>
    </ul>
    <button class="btn primary big" id="start">${draft ? 'Reprendre ma copie' : 'Commencer l\'examen'}</button>
    ${draft ? '<button class="btn ghost" id="restart">Recommencer à zéro</button>' : ''}
  </div>`;
}
function casPaper(e) {
  const a = state.examDrafts[e.id].answers;
  return `<div class="ex-bar"><span>${esc(e.title)}</span><span class="timer" id="timer" aria-live="off">—</span><button class="btn primary" id="submit">Rendre ma copie</button></div>
  <h1 class="sr">${esc(e.title)}</h1>
  <div class="case">
    <details class="enonce" open><summary>Énoncé</summary><div class="enonce-b">${e.enonce}</div></details>
    <div class="qs">${e.questions.map((q, i) => `<section class="q"><h2><span class="qn">Question ${i + 1} — ${note20(q.points)} pts</span>${esc(q.q)}</h2>
      <label class="sr" for="ea-${i}">Réponse ${i + 1}</label><textarea id="ea-${i}" data-ans="${i}" rows="9">${esc(a[i] || '')}</textarea></section>`).join('')}</div>
  </div>`;
}
function selfGrade(e) {
  const a = state.examDrafts[e.id].answers;
  return `<header class="page-h"><h1>Correction de ta copie</h1><p class="lead">La correction automatique n'est pas disponible ici : compare ta copie au corrigé et coche honnêtement chaque élément que ta réponse traite <strong>correctement</strong>.</p></header>
  <form id="sg">${e.questions.map((q, i) => `<section class="q graded"><h2><span class="qn">Question ${i + 1} — ${note20(q.points)} pts</span>${esc(q.q)}</h2>
    <div class="two tight"><div><h4>Ta réponse</h4><div class="copy">${esc(a[i] || '(pas de réponse)')}</div></div>
    <div><h4>Corrigé</h4><dl class="syl">${STEPS.map(([k, l]) => `<dt>${l}</dt><dd>${esc(q[k])}</dd>`).join('')}</dl></div></div>
    <h4>Grille</h4><ul class="grid-l">${q.criteria.map((c, j) => `<li><label><input type="checkbox" name="g${i}" value="${j}"> ${esc(c[0])} <em>${note20(c[1])} pt</em></label></li>`).join('')}</ul></section>`).join('')}
  <button class="btn primary big">Calculer ma note</button></form>`;
}

function recommend(weak) {
  if (!weak.length) return '<p>Très bon résultat : entretiens tes acquis avec les flashcards à échéance et passe un autre examen blanc dans quelques jours.</p>';
  return `<ul class="clean">${weak.map((ch) => `<li><strong>${esc(chLabel(ch))}</strong> : relis <a href="#cours-${ch}">le chapitre</a>, puis <a href="#fiches-${ch}">la fiche express</a>, et refais <a href="#flashcards-${ch}">les flashcards</a> et <a href="#qcm-${ch}">un QCM</a>.</li>`).join('')}<li>Refais ensuite un cas pratique du même niveau dans <a href="#cas">la banque de cas</a>, en soignant l'application aux faits.</li></ul>`;
}

function casResults(e, r) {
  return `<a href="#examens" class="back">${icon('left')} Examens blancs</a>
  <header class="page-h"><h1>Résultats — ${esc(e.title)}</h1></header>
  <div class="done-box"><b>${note20(r.score20)}<small>/20</small></b><span>${r.by === 'ai' ? 'Copie corrigée par Claude selon la grille' : 'Note issue de ton auto-correction'} — barème d'entraînement</span></div>
  ${r.reasoning != null ? `<p class="center">Qualité du raisonnement : <strong>${note20(r.reasoning)}/4</strong></p>` : ''}
  <div class="two">
    <section class="panel"><h2>Notions maîtrisées</h2>${r.good.length ? `<ul class="clean">${r.good.map((c) => `<li>${esc(chLabel(c))}</li>`).join('')}</ul>` : '<p class="muted">Aucune pour l\'instant.</p>'}</section>
    <section class="panel"><h2>Notions à revoir</h2>${r.weak.length ? `<ul class="clean">${r.weak.map((c) => `<li>${esc(chLabel(c))}</li>`).join('')}</ul>` : '<p class="muted">Aucune.</p>'}</section>
  </div>
  <section class="panel"><h2>Recommandations de travail</h2>${recommend(r.weak)}</section>
  <h2 class="h2s">Résultats détaillés et correction complète</h2>
  ${e.questions.map((q, i) => { const d = r.perQ[i]; return `<section class="q graded"><h3><span class="qn">Question ${i + 1} — ${note20(d.points)}/${note20(q.points)}</span>${esc(q.q)}</h3>
    ${d.commentaire ? `<p class="ai-com">${esc(d.commentaire)}</p>` : ''}
    <ul class="grid-l res">${q.criteria.map((c, j) => `<li class="${d.grille[j].points >= c[1] ? 'ok' : d.grille[j].points > 0 ? 'mid' : 'ko'}"><span>${esc(c[0])}</span><strong>${note20(d.grille[j].points)}/${note20(c[1])}</strong>${d.grille[j].justification ? `<em>${esc(d.grille[j].justification)}</em>` : ''}</li>`).join('')}</ul>
    ${d.erreurs && d.erreurs.length ? `<h4>Erreurs relevées</h4><ul class="errs">${d.erreurs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    <details><summary>Corrigé complet</summary><dl class="syl">${STEPS.map(([k, l]) => `<dt>${l}</dt><dd>${esc(q[k])}</dd>`).join('')}</dl><h4>Erreurs fréquentes</h4><ul class="errs">${q.erreurs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
  </section>`; }).join('')}
  <div class="row-btns"><button class="btn ghost" id="again">Repasser cet examen</button><a class="btn primary" href="#examens">Autres examens</a></div>`;
}

function finalizeCas(e, perQ, by) {
  const score20 = perQ.reduce((a, d) => a + d.points, 0);
  const chScore = {};
  e.questions.forEach((q, i) => q.ch.forEach((c) => { chScore[c] = chScore[c] || [0, 0]; chScore[c][0] += perQ[i].points; chScore[c][1] += q.points; }));
  const good = Object.keys(chScore).filter((c) => chScore[c][0] / chScore[c][1] >= 0.6);
  const weak = Object.keys(chScore).filter((c) => chScore[c][0] / chScore[c][1] < 0.6);
  const rs = perQ.map((d) => d.raisonnement).filter((x) => x != null);
  const r = { score20, perQ, by, good, weak, reasoning: rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null };
  state.exams.unshift({ at: Date.now(), id: e.id, title: e.title, kind: 'cas', score20, detail: r });
  delete state.examDrafts[e.id];
  save();
  return r;
}

// ───────── QCM
function qcmIntro(e) {
  return `<a href="#examens" class="back">${icon('left')} Examens blancs</a>
  <header class="page-h"><h1>${esc(e.title)}</h1></header>
  <div class="ex-intro"><ul class="clean"><li>${e.count} questions, ${e.duration} minutes conseillées.</li><li>Pour les questions à réponses multiples, le nombre de bonnes réponses est indiqué ; une question n'est juste que si toutes les bonnes propositions — et elles seules — sont cochées.</li><li>Note sur 20 proportionnelle au nombre de questions justes (barème d'entraînement), correction détaillée à la fin.</li></ul>
  <button class="btn primary big" id="start">Commencer l'examen</button></div>`;
}
function qcmPaper() {
  return `<div class="ex-bar"><span>${esc(ex.e.title)}</span><span class="timer" id="timer">—</span><button class="btn primary" id="submit">Rendre ma copie</button></div>
  <h1 class="sr">${esc(ex.e.title)}</h1>
  <ol class="ex-qcm">${ex.items.map((it, i) => { const q = QCM.find((x) => x.id === it.id); return `<li class="qcm-q" data-i="${i}"><p class="qmeta"><span>${esc(chLabel(q.ch))}</span></p><h2 class="qtitle">${esc(q.q)}</h2><p class="hint">${typeHint(q)}</p>${optionsHTML(q, 'x' + i, it.order)}</li>`; }).join('')}</ol>
  <button class="btn primary big" id="submit2">Rendre ma copie</button>`;
}
function qcmResults(e, r) {
  return `<a href="#examens" class="back">${icon('left')} Examens blancs</a>
  <header class="page-h"><h1>Résultats — ${esc(e.title)}</h1></header>
  <div class="done-box"><b>${note20(r.score20)}<small>/20</small></b><span>${r.ok} bonnes réponses sur ${r.total} — barème d'entraînement</span></div>
  <div class="two">
    <section class="panel"><h2>Notions maîtrisées</h2>${r.good.length ? `<ul class="clean">${r.good.map((c) => `<li>${esc(chLabel(c))}</li>`).join('')}</ul>` : '<p class="muted">Aucune pour l\'instant.</p>'}</section>
    <section class="panel"><h2>Notions à revoir</h2>${r.weak.length ? `<ul class="clean">${r.weak.map((c) => `<li>${esc(chLabel(c))}</li>`).join('')}</ul>` : '<p class="muted">Aucune.</p>'}</section>
  </div>
  <section class="panel"><h2>Recommandations de travail</h2>${recommend(r.weak)}</section>
  <h2 class="h2s">Correction complète</h2>
  <ol class="review">${r.items.map((it) => { const q = QCM.find((x) => x.id === it.id); const ok = isCorrect(q, it.picked); return `<li class="${ok ? 'ok' : 'ko'}"><details><summary><span>${ok ? 'Juste' : 'Faux'}</span>${esc(q.q)}</summary>${correctionHTML(q, it.picked, it.order)}</details></li>`; }).join('')}</ol>
  <div class="row-btns"><button class="btn ghost" id="again">Repasser (nouveau tirage)</button><a class="btn primary" href="#examens">Autres examens</a></div>`;
}
function buildQcm(e) {
  const chs = e.chapters || CHAPTERS.map((c) => c.id);
  // répartition équilibrée entre chapitres
  const pools = chs.map((c) => shuffle(QCM.filter((q) => q.ch === c)));
  const out = [];
  let k = 0;
  while (out.length < e.count && pools.some((p) => p.length)) { const p = pools[k % pools.length]; if (p.length) out.push(p.pop()); k++; }
  return shuffle(out).map((q) => ({ id: q.id, order: q.type === 'tf' ? [0, 1] : shuffle(q.opts.map((_, i) => i)), picked: [] }));
}

// ───────── Vue « run »
function renderRun(id) {
  const e = EXAMS_CAS.find((x) => x.id === id) || EXAMS_QCM.find((x) => x.id === id);
  if (!e) return list();
  if (!ex || ex.e.id !== id) ex = { e, kind: EXAMS_CAS.includes(e) ? 'cas' : 'qcm', phase: 'intro' };
  if (ex.phase === 'intro') return ex.kind === 'cas' ? casIntro(e) : qcmIntro(e);
  if (ex.phase === 'running') return ex.kind === 'cas' ? casPaper(e) : qcmPaper();
  if (ex.phase === 'selfgrade') return selfGrade(e);
  if (ex.phase === 'grading') return `<header class="page-h"><h1>Correction en cours</h1></header><p class="loading" id="gprog">Claude corrige ta copie question par question, au regard de ton cours…</p>`;
  if (ex.phase === 'results') return ex.kind === 'cas' ? casResults(e, ex.result) : qcmResults(e, ex.result);
  return list();
}

const run = {
  render(id) { return { html: renderRun(id), title: 'Examen blanc', resume: ex ? `Examen blanc — ${ex.e.title}` : 'Examens blancs', noFocus: ex && ex.phase === 'running' }; },
  mount(root, id) {
    if (!ex) return;
    const e = ex.e;
    const rerender = () => { clearInterval(tick); root.innerHTML = renderRun(id); run.mount(root, id); window.scrollTo(0, 0); };
    if (ex.phase === 'intro') {
      $('#start', root).onclick = () => {
        if (ex.kind === 'cas') {
          state.examDrafts[e.id] = state.examDrafts[e.id] || { answers: {}, startedAt: Date.now() };
          ex.startedAt = state.examDrafts[e.id].startedAt; save();
        } else { ex.items = buildQcm(e); ex.startedAt = Date.now(); }
        logSession('examen', `Examen blanc — ${e.title}`);
        ex.phase = 'running'; rerender();
      };
      const rs = $('#restart', root);
      if (rs) rs.onclick = async () => { if (await confirmDialog('Recommencer à zéro ?', 'Ta copie en cours sera effacée.', 'Effacer et recommencer')) { delete state.examDrafts[e.id]; save(); rerender(); } };
      return;
    }
    if (ex.phase === 'running') {
      const end = ex.startedAt + e.duration * 60000;
      const t = $('#timer', root);
      const upd = () => { const left = end - Date.now(); t.textContent = left >= 0 ? fmtTime(left) + ' restantes' : 'Temps écoulé ' + fmtTime(left); t.classList.toggle('late', left < 0); t.classList.toggle('soon', left >= 0 && left < 5 * 60000); };
      upd(); tick = setInterval(upd, 1000);
      if (ex.kind === 'cas') {
        let tm;
        root.addEventListener('input', (ev) => { const ta = ev.target.closest('[data-ans]'); if (!ta) return; clearTimeout(tm); tm = setTimeout(() => { state.examDrafts[e.id].answers[ta.dataset.ans] = ta.value; save(); }, 500); });
      } else {
        root.addEventListener('change', (ev) => { const li = ev.target.closest('[data-i]'); if (!li) return; ex.items[+li.dataset.i].picked = $$('input:checked', li).map((i) => +i.value); });
      }
      const submit = async () => {
        if (ex.kind === 'cas') {
          $$('[data-ans]', root).forEach((ta) => (state.examDrafts[e.id].answers[ta.dataset.ans] = ta.value)); save();
          const empty = e.questions.filter((_, i) => !(state.examDrafts[e.id].answers[i] || '').trim()).length;
          if (!(await confirmDialog('Rendre ta copie ?', empty ? `${empty} question(s) sans réponse.` : 'Tu ne pourras plus modifier tes réponses.', 'Rendre ma copie'))) return;
          clearInterval(tick);
          const sample = await getSample();
          if (!sample) { ex.phase = 'selfgrade'; rerender(); return; }
          ex.phase = 'grading'; rerender();
          const perQ = [];
          try {
            for (let i = 0; i < e.questions.length; i++) {
              const p = $('#gprog', root); if (p) p.textContent = `Claude corrige la question ${i + 1} sur ${e.questions.length}…`;
              const ans = (state.examDrafts[e.id].answers[i] || '').trim();
              if (!ans) { perQ.push({ points: 0, grille: e.questions[i].criteria.map(() => ({ points: 0, justification: 'Pas de réponse' })), raisonnement: 0, commentaire: 'Question non traitée.', erreurs: [] }); continue; }
              perQ.push(await evaluateExamQuestion(e.enonce, e.questions[i], ans));
            }
            ex.result = finalizeCas(e, perQ, 'ai'); ex.phase = 'results'; rerender();
          } catch (err) {
            toast('La correction automatique a échoué : passe à l\'auto-correction');
            ex.phase = 'selfgrade'; rerender();
          }
        } else {
          const unanswered = ex.items.filter((it) => !it.picked.length).length;
          if (!(await confirmDialog('Rendre ta copie ?', unanswered ? `${unanswered} question(s) sans réponse (comptées fausses).` : 'Tu ne pourras plus modifier tes réponses.', 'Rendre ma copie'))) return;
          clearInterval(tick);
          const byCh = {};
          let ok = 0;
          ex.items.forEach((it) => { const q = QCM.find((x) => x.id === it.id); const good = isCorrect(q, it.picked); if (good) ok++; recordAnswer(q, good); byCh[q.ch] = byCh[q.ch] || [0, 0]; byCh[q.ch][1]++; if (good) byCh[q.ch][0]++; });
          const score20 = Math.round((20 * ok / ex.items.length) * 2) / 2;
          const good = Object.keys(byCh).filter((c) => byCh[c][0] / byCh[c][1] >= 0.6);
          const weak = Object.keys(byCh).filter((c) => byCh[c][0] / byCh[c][1] < 0.6);
          ex.result = { score20, ok, total: ex.items.length, good, weak, items: ex.items };
          state.exams.unshift({ at: Date.now(), id: e.id, title: e.title, kind: 'qcm', score20, detail: { ok, total: ex.items.length, good, weak } });
          state.qcmRuns.unshift({ at: Date.now(), label: e.title, score: ok, total: ex.items.length });
          save(); ex.phase = 'results'; rerender();
        }
      };
      $('#submit', root).onclick = submit;
      const s2 = $('#submit2', root); if (s2) s2.onclick = submit;
      return;
    }
    if (ex.phase === 'selfgrade') {
      $('#sg', root).onsubmit = (ev) => {
        ev.preventDefault();
        const f = new FormData(ev.target);
        const perQ = e.questions.map((q, i) => {
          const checked = f.getAll('g' + i).map(Number);
          const grille = q.criteria.map((c, j) => ({ points: checked.includes(j) ? c[1] : 0, justification: '' }));
          return { points: grille.reduce((a, g) => a + g.points, 0), grille, raisonnement: null, commentaire: '', erreurs: [] };
        });
        ex.result = finalizeCas(e, perQ, 'self'); ex.phase = 'results'; rerender();
      };
      return;
    }
    if (ex.phase === 'results') {
      const again = $('#again', root);
      if (again) again.onclick = () => { ex = { e, kind: ex.kind, phase: 'intro' }; rerender(); };
    }
  },
  unmount() { clearInterval(tick); },
};

export function render() { return { html: list(), title: 'Examens blancs', resume: 'Examens blancs' }; }
export const views = { run };
