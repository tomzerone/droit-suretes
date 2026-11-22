import { state, initRemote, onSync, sync, setLast, onChange } from './store.js';
import { icon, esc, $ } from './ui.js';
import * as Home from './views/home.js';
import * as Cours from './views/cours.js';
import * as Fiches from './views/fiches.js';
import * as Cards from './views/flashcards.js';
import * as Cas from './views/cas.js';
import * as Qcm from './views/qcm.js';
import * as Exams from './views/examens.js';
import * as Misc from './views/misc.js';

export const NAV = [
  { id: 'accueil', label: 'Tableau de bord', short: 'Accueil', icon: 'home' },
  { id: 'cours', label: 'Cours', icon: 'book' },
  { id: 'fiches', label: 'Fiches', icon: 'sheet' },
  { id: 'flashcards', label: 'Flashcards', icon: 'cards' },
  { id: 'methode', label: 'Méthode du cas pratique', short: 'Méthode', icon: 'scale' },
  { id: 'cas', label: 'Cas pratiques', short: 'Cas', icon: 'pen' },
  { id: 'qcm', label: 'QCM', icon: 'check' },
  { id: 'probables', label: 'Questions probables', short: 'Probables', icon: 'target' },
  { id: 'examens', label: 'Examens blancs', short: 'Examens', icon: 'timer' },
  { id: 'revision', label: 'Révision intelligente', short: 'Révision', icon: 'spark' },
];
const TABS = ['accueil', 'cours', 'flashcards', 'cas'];

// Routes : #nom ou #nom-param (lettres, chiffres, tirets uniquement)
const ROUTES = {
  accueil: [Home], cours: [Cours], fiches: [Fiches], flashcards: [Cards], methode: [Cas, 'methode'], cas: [Cas],
  qcm: [Qcm], probables: [Misc, 'probables'], examens: [Exams], examen: [Exams, 'run'], revision: [Misc, 'revision'],
  verifier: [Cours, 'verifier'], recherche: [Cours, 'recherche'], reglages: [Misc, 'reglages'],
};

let current = null;
export function go(hash) {
  if (location.hash.slice(1) === hash) route(); else location.hash = hash;
}

function parse() {
  const h = decodeURIComponent(location.hash.slice(1)) || 'accueil';
  const i = h.indexOf('-');
  const name = i < 0 ? h : h.slice(0, i);
  const param = i < 0 ? '' : h.slice(i + 1);
  return ROUTES[name] ? { name, param, full: h } : { name: 'accueil', param: '', full: 'accueil' };
}

function route() {
  const r = parse();
  const [mod, sub] = ROUTES[r.name];
  if (current && current.unmount) { try { current.unmount(); } catch {} }
  const main = $('#main');
  const view = sub ? mod.views[sub] : mod;
  const out = view.render(r.param);
  main.innerHTML = `<div class="view view-${r.name}">${out.html ?? out}</div>`;
  current = view;
  if (view.mount) view.mount(main.firstElementChild, r.param);
  document.title = (out.title ? out.title + ' — ' : '') + 'Sûretés — Révision';
  // navigation active
  const navId = r.name === 'examen' ? 'examens' : (r.name === 'verifier' || r.name === 'recherche') ? 'cours' : r.name;
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === navId));
  closeDrawer();
  if (!out.keepScroll) {
    const anchor = out.anchor && document.getElementById(out.anchor);
    if (anchor) anchor.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
  }
  if (out.resume) setLast(r.full, out.resume);
  const firstH = main.querySelector('h1');
  if (firstH && !out.noFocus) { firstH.setAttribute('tabindex', '-1'); firstH.focus({ preventScroll: true }); }
}

function shell() {
  const nav = NAV.map((n) => `<a href="#${n.id}" data-nav="${n.id}" class="nav-i">${icon(n.icon)}<span>${n.label}</span></a>`).join('');
  const tabs = TABS.map((id) => { const n = NAV.find((x) => x.id === id); return `<a href="#${id}" data-nav="${id}" class="tab">${icon(n.icon)}<span>${n.short || n.label}</span></a>`; }).join('')
    + `<button class="tab" id="tab-more" aria-label="Plus de rubriques">${icon('more')}<span>Plus</span></button>`;
  document.getElementById('app').innerHTML = `
  <button class="skip" id="skip">Aller au contenu</button>
  <aside class="side" id="side" aria-label="Navigation">
    <div class="brand"><span class="spine" aria-hidden="true"></span><div><strong>Sûretés</strong><span>Plateforme de révision</span></div><button class="icon-btn close-side" id="close-side" aria-label="Fermer le menu">${icon('x')}</button></div>
    <form class="side-search" id="side-search" role="search"><label class="sr" for="q-side">Rechercher dans le cours</label>${icon('search')}<input id="q-side" type="search" placeholder="Rechercher…" autocomplete="off"></form>
    <nav class="nav">${nav}</nav>
    <div class="side-foot">
      <a href="#verifier" class="nav-i small" data-nav="verifier">${icon('alert')}<span>Points à vérifier</span></a>
      <a href="#reglages" class="nav-i small" data-nav="reglages">${icon('device')}<span>Sauvegarde et réglages</span></a>
      <div class="sync" id="sync">${icon('cloud')}<span>${esc(sync.status)}</span></div>
    </div>
  </aside>
  <div class="scrim" id="scrim"></div>
  <header class="topbar">
    <button class="icon-btn" id="open-side" aria-label="Ouvrir le menu">${icon('menu')}</button>
    <a href="#accueil" class="top-brand"><span class="spine sm" aria-hidden="true"></span>Sûretés</a>
    <a href="#recherche" class="icon-btn" aria-label="Rechercher">${icon('search')}</a>
  </header>
  <main id="main" tabindex="-1"></main>
  <nav class="tabbar" aria-label="Navigation principale">${tabs}</nav>`;

  $('#skip').onclick = () => $('#main').focus();
  $('#open-side').onclick = openDrawer;
  $('#tab-more').onclick = openDrawer;
  $('#close-side').onclick = closeDrawer;
  $('#scrim').onclick = closeDrawer;
  $('#side-search').onsubmit = (e) => { e.preventDefault(); const q = $('#q-side').value.trim(); if (q) { Cours.setQuery(q); go('recherche'); } };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
}
function openDrawer() { document.body.classList.add('drawer'); }
function closeDrawer() { document.body.classList.remove('drawer'); }

function applyTheme() {
  let t = null;
  try { t = localStorage.getItem('ds-theme'); } catch {}
  document.documentElement.dataset.theme = t || 'auto';
}
export function setTheme(t) { try { localStorage.setItem('ds-theme', t); } catch {} applyTheme(); }

function boot() {
  applyTheme();
  shell();
  window.addEventListener('hashchange', route);
  onSync((s) => { const el = $('#sync'); if (el) el.innerHTML = `${icon(s.mode === 'cloud' ? 'cloud' : 'device')}<span>${esc(s.status)}</span>`; });
  // si l'état arrive du cloud alors qu'on est sur l'accueil, on rafraîchit
  onChange(() => { const r = parse(); if (r.name === 'accueil') route(); });
  route();
  initRemote();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
window.__ds = { state, go };
