import { state, sync, logSession, resetAll, exportJSON, importJSON } from '../store.js';
import { PROBABLES, SIGNAUX, CAS, CH, weakChapters, chLabel, chapterStats, FLASHCARDS } from '../data.js';
import { esc, icon, $, toast, confirmDialog, plural } from '../ui.js';
import { startSession } from './flashcards.js';
import { startRun, pickQuestions } from './qcm.js';
import { go, setTheme } from '../main.js';

// ───────── Questions probables
let filter = 'Toutes';
const probables = {
  render() {
    const types = ['Toutes', ...new Set(PROBABLES.map((p) => p.type))];
    const items = PROBABLES.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'Toutes' || p.type === filter);
    const html = `
    <header class="page-h"><h1>Questions probables du contrôle</h1><p class="lead">Des pistes de préparation déduites de tes quatre cours : notions les plus développées, distinctions, exemples, mécanismes. Ce ne sont <strong>pas</strong> des sujets connus à l'avance.</p></header>
    <details class="signals"><summary>Sur quoi repose cette sélection ?</summary><ul class="clean">${SIGNAUX.map((s) => `<li>${esc(s)}</li>`).join('')}</ul><p class="muted small">Ces indices sont une analyse de la plateforme, pas des indications de ta professeure (sauf mention contraire).</p></details>
    <div class="chips" role="tablist">${types.map((t) => `<button class="chip ${t === filter ? 'on' : ''}" data-f="${esc(t)}" role="tab" aria-selected="${t === filter}">${esc(t)}</button>`).join('')}</div>
    <ol class="prob">${items.map(({ p, i }) => `<li><details><summary><span class="pt">${esc(p.type)}</span><span class="pq">${esc(p.q)}</span><span class="pc">${esc(chLabel(p.ch))}</span></summary>
      <div class="pa"><p class="why">${icon('target')} Pourquoi elle est plausible : ${esc(p.why)}</p><h4>Réponse structurée</h4>${p.answer}<h4>Erreurs à éviter</h4><ul class="errs">${p.erreurs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a href="#cours-${p.ch}">Revoir le chapitre</a></div></details></li>`).join('')}</ol>`;
    return { html, title: 'Questions probables', resume: 'Questions probables du contrôle' };
  },
  mount(root) {
    logSession('probables', 'Questions probables');
    root.addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (!b) return; filter = b.dataset.f; const out = probables.render(); root.innerHTML = out.html; });
  },
};

// ───────── Révision intelligente
const revision = {
  render() {
    const weak = weakChapters(3);
    const ids = weak.map((w) => w.id);
    const cards = FLASHCARDS.filter((f) => ids.includes(f.ch)).length;
    const caseFor = CAS.find((c) => c.chapters.includes(ids[0]) && !(state.cases[c.id] && Object.keys(state.cases[c.id].evals || {}).length)) || CAS.find((c) => c.chapters.includes(ids[0]));
    const html = `
    <header class="page-h"><h1>Révision intelligente</h1><p class="lead">Une séance d'environ 30 minutes, construite sur les chapitres où tu as le plus de difficultés (d'après tes flashcards, tes QCM et tes cas pratiques ; un chapitre jamais travaillé est considéré comme fragile).</p></header>
    <section class="panel"><h2>Tes trois priorités du moment</h2>
      <ul class="rows diff">${weak.map((w) => `<li><a href="#cours-${w.id}">${esc(chLabel(w.id))}</a><span>${w.s.mastery == null ? (w.s.studied ? 'étudié, pas encore évalué' : 'pas encore travaillé') : Math.round(w.s.mastery * 100) + ' % de maîtrise'}${w.s.toReview ? ', ' + plural(w.s.toReview, 'carte à revoir', 'cartes à revoir') : ''}</span></li>`).join('')}</ul>
    </section>
    <ol class="steps plan">
      <li class="step"><div class="step-n">1</div><div class="step-b"><h2>Relire l'essentiel</h2><p>Parcours les fiches express de ces chapitres (5 minutes).</p><div class="row-btns">${ids.map((id) => `<a class="btn ghost" href="#fiches-${id}">Fiche ${CH[id].num}</a>`).join('')}</div></div></li>
      <li class="step"><div class="step-n">2</div><div class="step-b"><h2>Flashcards ciblées</h2><p>Jusqu'à 20 cartes parmi les ${cards} de ces chapitres, les plus fragiles d'abord.</p><button class="btn primary" id="go-cards">${icon('cards')} Lancer les flashcards</button></div></li>
      <li class="step"><div class="step-n">3</div><div class="step-b"><h2>QCM de contrôle</h2><p>10 questions sur ces chapitres, en commençant par celles que tu as ratées.</p><button class="btn primary" id="go-qcm">${icon('check')} Lancer le QCM</button></div></li>
      ${caseFor ? `<li class="step"><div class="step-n">4</div><div class="step-b"><h2>Un cas pratique pour ancrer</h2><p>${esc(caseFor.title)} — mobilise ${caseFor.chapters.map(chLabel).join(', ')}.</p><a class="btn ghost" href="#cas-${caseFor.id}">${icon('pen')} Ouvrir le cas</a></div></li>` : ''}
    </ol>`;
    return { html, title: 'Révision intelligente', resume: 'Révision intelligente' };
  },
  mount(root) {
    logSession('revision', 'Révision intelligente');
    const ids = weakChapters(3).map((w) => w.id);
    $('#go-cards', root).onclick = () => { startSession('smart:' + ids.join('.'), 20); go('flashcards-session'); };
    $('#go-qcm', root).onclick = () => { startRun(pickQuestions({ chapters: ids, count: 10, weakFirst: true }), 'Révision intelligente — QCM ciblé'); go('qcm-run'); };
  },
};

// ───────── Réglages et sauvegarde
const reglages = {
  render() {
    let theme = 'auto'; try { theme = localStorage.getItem('ds-theme') || 'auto'; } catch {}
    const html = `
    <header class="page-h"><h1>Sauvegarde et réglages</h1></header>
    <section class="panel"><h2>Sauvegarde de ta progression</h2>
      <p>${icon(sync.mode === 'cloud' ? 'cloud' : 'device')} <strong>${esc(sync.status)}</strong></p>
      <p class="muted">${sync.mode === 'cloud' ? 'Ta progression est enregistrée dans ton espace personnel et privé : tu la retrouves sur ton ordinateur comme sur ton téléphone, connecté à ton compte Claude.' : 'Ta progression est enregistrée dans ce navigateur. Pour la transférer sur un autre appareil, utilise l\'export ci-dessous.'}</p>
      <div class="row-btns"><button class="btn ghost" id="export">Copier ma sauvegarde</button><button class="btn ghost" id="import">Importer une sauvegarde</button></div>
      <div id="imp" hidden><label for="imp-t">Colle ici le texte de ta sauvegarde :</label><textarea id="imp-t" rows="4"></textarea><button class="btn primary" id="imp-go">Importer</button></div>
    </section>
    <section class="panel"><h2>Affichage</h2><div class="seg" role="group" aria-label="Thème">${[['auto', 'Automatique'], ['light', 'Clair'], ['dark', 'Sombre']].map(([v, l]) => `<button data-theme="${v}" class="${theme === v ? 'on' : ''}" aria-pressed="${theme === v}">${l}</button>`).join('')}</div></section>
    <section class="panel"><h2>Repartir de zéro</h2><p class="muted">Efface chapitres étudiés, flashcards, QCM, cas pratiques et examens.</p><button class="btn danger" id="reset">Effacer toute ma progression</button></section>
    <section class="panel"><h2>À propos du contenu</h2><p class="muted">Tout le contenu juridique provient exclusivement de tes quatre cours (reconstitués à partir des enregistrements de ta professeure). Les ajouts de la plateforme (méthode, conseils, questions probables, points à vérifier) sont signalés comme tels.</p></section>`;
    return { html, title: 'Réglages' };
  },
  mount(root) {
    $('#export', root).onclick = async () => {
      try { await navigator.clipboard.writeText(exportJSON()); toast('Sauvegarde copiée dans le presse-papiers'); }
      catch { $('#imp', root).hidden = false; $('#imp-t', root).value = exportJSON(); $('#imp-t', root).select(); toast('Copie impossible : sélectionne le texte et copie-le'); }
    };
    $('#import', root).onclick = () => { $('#imp', root).hidden = false; $('#imp-t', root).value = ''; $('#imp-t', root).focus(); };
    $('#imp-go', root).onclick = () => { try { importJSON($('#imp-t', root).value); toast('Sauvegarde importée'); go('accueil'); } catch (e) { toast(e.message || 'Import impossible'); } };
    root.addEventListener('click', (e) => { const b = e.target.closest('[data-theme]'); if (!b) return; setTheme(b.dataset.theme); root.querySelectorAll('[data-theme]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); });
    $('#reset', root).onclick = async () => { if (await confirmDialog('Effacer toute ta progression ?', 'Cette action est définitive.', 'Tout effacer')) { resetAll(); toast('Progression effacée'); go('accueil'); } };
  },
};

export const views = { probables, revision, reglages };
