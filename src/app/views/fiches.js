import { FICHES, FICHE_GENERALE, CH, CHAPTERS, chLabel } from '../data.js';
import { logSession } from '../store.js';
import { esc, icon, $ } from '../ui.js';

let mode = 'complete';
const RUB = [
  ['definitions', 'Définitions incontournables'], ['mecanismes', 'Mécanismes juridiques'], ['conditions', 'Conditions'],
  ['exceptions', 'Exceptions'], ['distinctions', 'Distinctions importantes'], ['references', 'Références citées dans le cours'], ['exemples', 'Exemples utiles'],
];

function tabs(active) {
  return `<div class="chips" role="tablist" aria-label="Choisir une fiche">
    <a href="#fiches-generale" class="chip ${active === 'generale' ? 'on' : ''}">Fiche générale</a>
    ${FICHES.map((f) => `<a href="#fiches-${f.ch}" class="chip ${active === f.ch ? 'on' : ''}">${esc(chLabel(f.ch))}</a>`).join('')}
    <a href="#cours-c9" class="chip">9. Synthèse comparative (tableaux)</a>
  </div>`;
}

function fiche(f) {
  const c = CH[f.ch];
  const body = mode === 'express'
    ? `<ol class="express">${f.express.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`
    : RUB.filter(([k]) => f.complete[k] && f.complete[k].length).map(([k, label]) => `
      <section class="f-rub"><h3>${label}</h3>${k === 'definitions'
        ? `<dl>${f.complete[k].map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('')}</dl>`
        : `<ul>${f.complete[k].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`}</section>`).join('');
  return `
  <article class="fiche ${mode}">
    <header class="fiche-h"><span class="ch-num sm">${c.num}</span><div><h2>${esc(c.title)}</h2>
    <div class="seg" role="group" aria-label="Niveau de synthèse"><button data-mode="complete" class="${mode === 'complete' ? 'on' : ''}" aria-pressed="${mode === 'complete'}">Fiche complète</button><button data-mode="express" class="${mode === 'express' ? 'on' : ''}" aria-pressed="${mode === 'express'}">Fiche express</button></div></div></header>
    ${body}
    <footer class="fiche-f"><a href="#cours-${c.id}">${icon('book')} Relire le chapitre</a><a href="#flashcards-${c.id}">${icon('cards')} Flashcards du chapitre</a><a href="#qcm-${c.id}">${icon('check')} QCM du chapitre</a></footer>
  </article>`;
}

export function render(param) {
  const sel = param || 'generale';
  let content;
  if (sel === 'generale') {
    content = `<article class="fiche gen"><header class="fiche-h"><div><h2>Vision globale du programme</h2><p class="muted">Tout le programme sur une page, pour te repérer et faire le point la veille du contrôle.</p></div></header>
    ${FICHE_GENERALE.map((s) => `<section class="f-rub"><h3>${esc(s.title)}</h3><ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`).join('')}
    <footer class="fiche-f"><a href="#cours-c9">${icon('book')} Tableaux de synthèse comparative</a></footer></article>`;
  } else {
    const f = FICHES.find((x) => x.ch === sel);
    content = f ? fiche(f) : '';
  }
  return {
    html: `<header class="page-h"><h1>Fiches de révision</h1><p class="lead">Trois niveaux : la fiche complète reprend toutes les notions importantes d'un chapitre, la fiche express l'essentiel à mémoriser, la fiche générale l'ensemble du programme.</p></header>${tabs(sel)}<div id="fiche">${content}</div>`,
    title: 'Fiches', resume: sel === 'generale' ? 'Fiche générale' : `Fiche — ${chLabel(sel)}`,
  };
}
export function mount(root, param) {
  logSession('fiches', param && param !== 'generale' ? `Fiche — ${chLabel(param)}` : 'Fiche générale');
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-mode]');
    if (!b) return;
    mode = b.dataset.mode;
    const f = FICHES.find((x) => x.ch === param);
    if (f) $('#fiche', root).innerHTML = fiche(f);
  });
}
