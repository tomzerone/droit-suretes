import { state } from '../store.js';
import { CHAPTERS, PARTS, CAS, chapterStats, globalStats, weakChapters, chLabel, FLASHCARDS, QCM, CH } from '../data.js';
import { esc, icon, fmtDate, pct, note20, plural } from '../ui.js';

function greet() {
  const h = new Date().getHours();
  return h < 5 ? 'Bonne nuit' : h < 18 ? 'Bonjour' : 'Bonsoir';
}

export function render() {
  const g = globalStats();
  const last = state.last;
  const cs = state.cardSession;
  const resume = last && last.route !== 'accueil'
    ? `<a class="resume" href="#${esc(last.route)}"><span class="resume-k">Reprendre là où tu t'es arrêté</span><span class="resume-t">${esc(last.label)}</span><span class="resume-d">${fmtDate(last.at)}</span></a>`
    : `<a class="resume" href="#cours-c0"><span class="resume-k">Pour commencer</span><span class="resume-t">Chapitre 0 — La notion de sûreté</span><span class="resume-d">Lis le cours, puis passe aux flashcards</span></a>`;

  const spines = PARTS.map((p) => {
    const chs = CHAPTERS.filter((c) => c.part === p.id);
    return `<div class="shelf-part"><div class="shelf-l">${esc(p.title)}</div>${chs.map((c) => {
      const s = chapterStats(c.id);
      const m = s.mastery == null ? 0 : Math.round(s.mastery * 100);
      return `<a class="spine-row ${s.studied ? 'done' : ''}" href="#cours-${c.id}">
        <span class="sr-n">${c.num}</span>
        <span class="sr-t">${esc(c.short)}</span>
        <span class="sr-bar" aria-hidden="true"><i style="width:${m}%"></i></span>
        <span class="sr-m">${s.mastery == null ? (s.studied ? 'Étudié' : '—') : m + ' %'}</span>
        <span class="sr-s" title="${s.studied ? 'Chapitre étudié' : 'Pas encore étudié'}">${s.studied ? icon('check') : ''}</span>
      </a>`;
    }).join('')}</div>`;
  }).join('');

  const weak = weakChapters(3);
  const hasData = g.qcmAnswered || g.mastered || g.toReview || g.caseCount;
  const diff = hasData
    ? weak.map((w) => `<li><a href="#cours-${w.id}">${esc(chLabel(w.id))}</a><span>${w.s.mastery == null ? 'pas encore évalué' : Math.round(w.s.mastery * 100) + ' % de maîtrise'}${w.s.toReview ? ', ' + plural(w.s.toReview, 'carte à revoir', 'cartes à revoir') : ''}</span></li>`).join('')
    : `<li class="empty">Tes difficultés apparaîtront ici dès tes premières flashcards et tes premiers QCM.</li>`;

  const qRuns = state.qcmRuns.slice(0, 4).map((r) => `<li><span>${esc(r.label)}</span><strong>${r.score}/${r.total}</strong><em>${fmtDate(r.at)}</em></li>`).join('') || '<li class="empty">Aucun QCM terminé pour l\'instant.</li>';
  const caseRows = [];
  CAS.forEach((c) => { const e = state.cases[c.id]; if (e && e.evals) Object.entries(e.evals).forEach(([i, ev]) => caseRows.push({ c, i: +i, ev })); });
  caseRows.sort((a, b) => b.ev.at - a.ev.at);
  const cRuns = caseRows.slice(0, 4).map((r) => `<li><a href="#cas-${r.c.id}">${esc(r.c.title)}, question ${r.i + 1}</a><strong>${note20(r.ev.score20)}/20</strong><em>${r.ev.by === 'ai' ? 'corrigé par Claude' : 'auto-évalué'}</em></li>`).join('') || '<li class="empty">Aucun cas pratique corrigé pour l\'instant.</li>';
  const eRuns = state.exams.slice(0, 4).map((r) => `<li><span>${esc(r.title)}</span><strong>${note20(r.score20)}/20</strong><em>${fmtDate(r.at)}</em></li>`).join('') || '<li class="empty">Aucun examen blanc passé pour l\'instant.</li>';
  const sess = state.sessions.slice(0, 6).map((s) => `<li><span>${esc(s.label)}</span><em>${fmtDate(s.at)}</em></li>`).join('') || '<li class="empty">Ton historique de révision s\'affichera ici.</li>';
  const notStudied = CHAPTERS.filter((c) => !(state.chapters[c.id] && state.chapters[c.id].studied));

  const html = `
  <header class="home-h">
    <div>
      <h1>${greet()}${state.name ? ' ' + esc(state.name) : ''}</h1>
      <p class="lead">Droit des sûretés : cautionnement, gage, nantissement, hypothèque. ${g.progress ? `Tu as parcouru <strong>${g.progress} %</strong> de ton programme.` : 'Ton programme t\'attend : dix chapitres, tous tirés de tes quatre cours.'}</p>
    </div>
    ${resume}
  </header>

  <section class="figures" aria-label="Chiffres clés">
    <a href="#cours" class="fig"><b>${g.studied}<small>/${CHAPTERS.length}</small></b><span>chapitres étudiés</span></a>
    <a href="#flashcards" class="fig"><b>${g.mastered}<small>/${FLASHCARDS.length}</small></b><span>flashcards maîtrisées${g.toReview ? `, <em>${g.toReview} à revoir</em>` : ''}</span></a>
    <a href="#qcm" class="fig"><b>${g.qcmAnswered ? pct(g.qcmOk, g.qcmAnswered) + '<small> %</small>' : '—'}</b><span>de réussite aux QCM (${g.qcmAnswered}/${QCM.length} questions vues)</span></a>
    <a href="#cas" class="fig"><b>${g.caseAvg == null ? '—' : note20(g.caseAvg) + '<small>/20</small>'}</b><span>moyenne aux cas pratiques</span></a>
    <a href="#examens" class="fig"><b>${state.exams[0] ? note20(state.exams[0].score20) + '<small>/20</small>' : '—'}</b><span>dernier examen blanc</span></a>
  </section>

  <div class="home-grid">
    <section class="shelf" aria-labelledby="h-prog">
      <div class="sec-h"><h2 id="h-prog">Progression par chapitre</h2><span class="muted">${notStudied.length ? plural(notStudied.length, 'chapitre non étudié', 'chapitres non étudiés') : 'Tous les chapitres sont étudiés'}</span></div>
      ${spines}
    </section>
    <div class="home-side">
      <section class="panel smart">
        <h2>Révision intelligente</h2>
        <p>Une séance construite sur tes points faibles : relecture ciblée, cartes fragiles, QCM sur les chapitres les moins maîtrisés.</p>
        <a class="btn primary" href="#revision">${icon('spark')} Lancer une séance</a>
        ${g.due ? `<p class="muted small">${plural(g.due, 'carte arrive', 'cartes arrivent')} à échéance de révision.</p>` : ''}
      </section>
      <section class="panel"><h2>Mes principales difficultés</h2><ul class="rows diff">${diff}</ul></section>
    </div>
  </div>

  <div class="home-cols">
    <section class="panel"><h2>Derniers QCM</h2><ul class="rows res">${qRuns}</ul></section>
    <section class="panel"><h2>Cas pratiques</h2><ul class="rows res">${cRuns}</ul></section>
    <section class="panel"><h2>Examens blancs</h2><ul class="rows res">${eRuns}</ul></section>
    <section class="panel"><h2>Dernières sessions</h2><ul class="rows res">${sess}</ul></section>
  </div>`;
  return { html, title: 'Tableau de bord', noFocus: true };
}
