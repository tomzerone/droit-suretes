import { state, mutate, logSession, setLast, save } from '../store.js';
import { CHAPTERS, PARTS, CH, CHECKS, chapterStats, search, snippet, chLabel } from '../data.js';
import { esc, icon, renderBlocks, toast, $ } from '../ui.js';

let query = '';
export function setQuery(q) { query = q; }

const LEGEND = [
  ['def', 'Définition à mémoriser'], ['ex', 'Exemple pratique'], ['dist', 'Distinction importante'],
  ['prof', 'Remarque de la professeure'], ['nx', 'Non exigible à l\'examen'], ['key', 'À retenir'], ['warn', 'Point à vérifier (signalé par la plateforme)'],
];

function chapterNav(activeId) {
  return PARTS.map((p) => `<div class="cn-part">${esc(p.title)}</div>` + CHAPTERS.filter((c) => c.part === p.id).map((c) => {
    const st = state.chapters[c.id] && state.chapters[c.id].studied;
    return `<a href="#cours-${c.id}" class="cn-i ${c.id === activeId ? 'on' : ''} ${st ? 'done' : ''}"><span class="cn-n">${c.num}</span><span>${esc(c.short)}</span>${st ? icon('check', 'cn-ok') : ''}</a>`;
  }).join('')).join('');
}

function overview() {
  const html = `
  <header class="page-h"><h1>Le cours complet</h1>
  <p class="lead">Tes quatre cours fusionnés en un seul programme progressif : les notions expliquées plusieurs fois ont été regroupées en une explication unique, sans rien perdre des exemples, conditions, exceptions et références.</p></header>
  <div class="legend" aria-label="Légende des encadrés">${LEGEND.map(([c, l]) => `<span class="lg lg-${c}">${l}</span>`).join('')}</div>
  <div class="toc-parts">
  ${PARTS.map((p) => `<section class="toc-part"><h2>${esc(p.title)}</h2>${CHAPTERS.filter((c) => c.part === p.id).map((c) => {
    const s = chapterStats(c.id);
    return `<a class="toc-ch" href="#cours-${c.id}"><span class="toc-n">${c.num}</span><span class="toc-b"><strong>${esc(c.title)}</strong><span>${esc(c.lead)}</span><em>${c.sections.length} sections, sources : ${c.src.map((n) => 'cours ' + n).join(', ')}</em></span><span class="toc-s">${s.studied ? icon('check') + ' Étudié' : ''}</span></a>`;
  }).join('')}</section>`).join('')}
  </div>
  <p class="note">${icon('alert')} Quelques imprécisions ou différences entre tes cours ont été repérées : elles sont signalées dans le texte et regroupées dans <a href="#verifier">Points à vérifier</a>.</p>`;
  return { html, title: 'Cours', resume: 'Sommaire du cours' };
}

export function render(param) {
  if (!param) return overview();
  const [chId, secId] = param.split('-');
  const c = CH[chId];
  if (!c) return overview();
  const idx = CHAPTERS.indexOf(c);
  const prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
  const st = state.chapters[c.id] || {};
  const sections = c.sections.map((s, i) => `
    <section class="c-sec" id="${c.id}-${s.id}" data-sec="${s.id}">
      <h2><span class="sec-n">${c.num}.${i + 1}</span> ${esc(s.title)}</h2>
      ${renderBlocks(s.blocks, { prefix: `${c.id}-${s.id}` })}
    </section>`).join('');
  const html = `
  <div class="reader">
    <nav class="ch-nav" aria-label="Chapitres">${chapterNav(c.id)}</nav>
    <article class="ch">
      <details class="ch-pick"><summary>${icon('list')} Chapitre ${c.num} — changer de chapitre</summary><div>${chapterNav(c.id)}</div></details>
      <header class="ch-h">
        <span class="ch-num" aria-hidden="true">${c.num}</span>
        <div>
          <p class="ch-part">${esc(PARTS.find((p) => p.id === c.part).title)}</p>
          <h1>${esc(c.title)}</h1>
          <p class="lead">${esc(c.lead)}</p>
          <p class="src">Sources : ${c.src.map((n) => `<span>cours ${n}</span>`).join('')}</p>
        </div>
      </header>
      <nav class="sec-toc" aria-label="Sections du chapitre">${c.sections.map((s, i) => `<a href="#cours-${c.id}-${s.id}">${c.num}.${i + 1} ${esc(s.title)}</a>`).join('')}</nav>
      ${sections}
      <footer class="ch-f">
        <button class="btn ${st.studied ? 'ghost' : 'primary'}" id="mark">${st.studied ? icon('check') + ' Chapitre étudié — annuler' : 'Marquer ce chapitre comme étudié'}</button>
        <div class="train"><span>S'entraîner sur ce chapitre :</span>
          <a href="#fiches-${c.id}">Fiche</a><a href="#flashcards-${c.id}">Flashcards</a><a href="#qcm-${c.id}">QCM</a>
        </div>
        <div class="pn">
          ${prev ? `<a class="pn-a" href="#cours-${prev.id}">${icon('left')}<span><em>Précédent</em>${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="pn-a r" href="#cours-${next.id}"><span><em>Suivant</em>${esc(next.title)}</span>${icon('right')}</a>` : '<span></span>'}
        </div>
      </footer>
    </article>
  </div>`;
  const anchor = secId ? `${c.id}-${secId}` : null;
  return { html, title: `Chapitre ${c.num} — ${c.short}`, anchor, resume: `Cours — chapitre ${c.num} : ${c.title}`, noFocus: !!secId };
}

let obs = null;
export function mount(root, param) {
  const [chId] = (param || '').split('-');
  const c = CH[chId];
  if (!c) return;
  logSession('cours', `Lecture — ${chLabel(c.id)}`);
  mutate((s) => { s.chapters[c.id] = Object.assign({}, s.chapters[c.id], { visitedAt: Date.now() }); });
  $('#mark', root).onclick = () => {
    mutate((s) => {
      const cur = s.chapters[c.id] || {};
      cur.studied = !cur.studied; cur.studiedAt = Date.now();
      s.chapters[c.id] = cur;
    });
    toast(state.chapters[c.id].studied ? 'Chapitre marqué comme étudié' : 'Chapitre remis à étudier');
    const b = $('#mark', root); const on = state.chapters[c.id].studied;
    b.className = 'btn ' + (on ? 'ghost' : 'primary');
    b.innerHTML = on ? icon('check') + ' Chapitre étudié — annuler' : 'Marquer ce chapitre comme étudié';
    root.querySelectorAll(`.cn-i[href="#cours-${c.id}"]`).forEach((a) => a.classList.toggle('done', on));
  };
  // Mémorise la section en cours de lecture (pour « reprendre là où je me suis arrêté »)
  let lastSaved = '';
  if ('IntersectionObserver' in window) {
    obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!vis) return;
      const sec = vis.target.dataset.sec;
      if (sec === lastSaved) return;
      lastSaved = sec;
      const s = c.sections.find((x) => x.id === sec);
      state.chapters[c.id] = Object.assign({}, state.chapters[c.id], { lastSection: sec });
      state.last = { route: `cours-${c.id}-${sec}`, label: `Cours — ${c.num}. ${c.short} : ${s.title}`, at: Date.now() };
      save();
    }, { rootMargin: '-15% 0px -70% 0px' });
    root.querySelectorAll('.c-sec').forEach((el) => obs.observe(el));
  }
}
export function unmount() { if (obs) { obs.disconnect(); obs = null; } }

// ─────────── Recherche
function renderSearch() {
  const res = query ? search(query) : [];
  const hl = (t) => {
    let out = esc(t);
    query.split(/\s+/).filter((w) => w.length > 1).forEach((w) => {
      const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  };
  const items = res.map((r) => {
    const href = r.kind === 'Cours' ? `#cours-${r.ch}-${r.sec}` : r.kind === 'Flashcard' ? `#flashcards-${r.ch}` : `#probables`;
    return `<li><a href="${href}" ${r.anchor ? `data-anchor="${r.anchor}"` : ''}><span class="sr-kind">${r.kind}</span><strong>${hl(r.title)}</strong><span>${hl(snippet(r.text, query))}</span></a></li>`;
  }).join('');
  return `
  <header class="page-h"><h1>Recherche</h1></header>
  <form id="sform" class="big-search" role="search">${icon('search')}<label class="sr" for="q-big">Rechercher</label><input id="q-big" type="search" value="${esc(query)}" placeholder="Ex. : bénéfice de discussion, radiation, rang…" autocomplete="off"><button class="btn primary">Rechercher</button></form>
  ${query ? `<p class="muted">${res.length ? res.length + ' résultat' + (res.length > 1 ? 's' : '') + ' pour « ' + esc(query) + ' »' : 'Aucun résultat pour « ' + esc(query) + ' ». Essaie un mot plus court ou sans accent.'}</p><ol class="results">${items}</ol>` : '<p class="muted">Tape une notion, un mot-clé ou un exemple : la recherche couvre le cours, les flashcards et les questions probables.</p>'}`;
}
const recherche = {
  render() { return { html: renderSearch(), title: 'Recherche', noFocus: true }; },
  mount(root) {
    const input = $('#q-big', root);
    input.focus();
    $('#sform', root).onsubmit = (e) => { e.preventDefault(); query = input.value.trim(); root.innerHTML = renderSearch(); recherche.mount(root); };
    root.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-anchor]');
      if (!a) return;
      // surligne le bloc trouvé après navigation
      setTimeout(() => { const el = document.getElementById(a.dataset.anchor); if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 2200); } }, 60);
    });
  },
};

const verifier = {
  render() {
    const html = `<header class="page-h"><h1>Points à vérifier</h1><p class="lead">En consolidant tes quatre cours, la plateforme a relevé ces imprécisions ou différences de formulation. Rien n'a été corrigé arbitrairement : les deux versions sont conservées dans le cours, et tu peux faire préciser ces points par ta professeure.</p></header>
    <ol class="checks">${CHECKS.map((k) => `<li><h2>${esc(k.title)}</h2><p>${esc(k.text)}</p><a href="#cours-${k.ch}-${k.s}">Voir dans le cours : ${esc(chLabel(k.ch))}</a></li>`).join('')}</ol>`;
    return { html, title: 'Points à vérifier' };
  },
};

export const views = { recherche, verifier };
