import { state, save, logSession } from '../store.js';
import { FLASHCARDS, CHAPTERS, CH, chLabel, chapterStats, orderDeck, rateCard, isMastered, isToReview, isDue, INTERVALS } from '../data.js';
import { esc, icon, $, plural, toast } from '../ui.js';
import { go } from '../main.js';

const byId = Object.fromEntries(FLASHCARDS.map((f) => [f.id, f]));

function deckIds(deck) {
  if (deck === 'all') return FLASHCARDS.map((f) => f.id);
  if (deck === 'revoir') return FLASHCARDS.filter((f) => isToReview(f.id)).map((f) => f.id);
  if (deck === 'echues') return FLASHCARDS.filter((f) => state.cards[f.id] && isDue(f.id) && !isToReview(f.id)).map((f) => f.id);
  if (deck === 'nouvelles') return FLASHCARDS.filter((f) => !state.cards[f.id]).map((f) => f.id);
  if (deck.startsWith('smart:')) return deck.slice(6).split('.').flatMap((ch) => FLASHCARDS.filter((f) => f.ch === ch).map((f) => f.id));
  return FLASHCARDS.filter((f) => f.ch === deck).map((f) => f.id);
}
function deckLabel(deck) {
  return deck === 'all' ? 'Toutes les cartes' : deck === 'revoir' ? 'Cartes à revoir' : deck === 'echues' ? 'Cartes à échéance' : deck === 'nouvelles' ? 'Cartes jamais vues'
    : deck.startsWith('smart:') ? 'Révision intelligente' : chLabel(deck);
}

export function startSession(deck, limit) {
  let ids = orderDeck(deckIds(deck));
  if (limit) ids = ids.slice(0, limit);
  state.cardSession = { deck, label: deckLabel(deck), queue: ids, index: 0, results: {}, startedAt: Date.now() };
  save();
}

function home() {
  const s = state.cardSession;
  const unfinished = s && s.index < s.queue.length;
  const total = FLASHCARDS.length;
  const mastered = FLASHCARDS.filter((f) => isMastered(f.id)).length;
  const toRev = FLASHCARDS.filter((f) => isToReview(f.id)).length;
  const fresh = FLASHCARDS.filter((f) => !state.cards[f.id]).length;
  const due = FLASHCARDS.filter((f) => state.cards[f.id] && isDue(f.id) && !isToReview(f.id)).length;
  const rows = CHAPTERS.map((c) => {
    const st = chapterStats(c.id);
    if (!st.cards) return '';
    return `<li><a href="#flashcards-${c.id}" data-deck="${c.id}"><span class="cn-n">${c.num}</span><span class="dk-t">${esc(c.short)}</span><span class="dk-m"><i style="width:${Math.round(100 * st.mastered / st.cards)}%"></i></span><span class="dk-n">${st.mastered}/${st.cards}${st.toReview ? ` <em>${st.toReview} à revoir</em>` : ''}</span></a></li>`;
  }).join('');
  return `
  <header class="page-h"><h1>Flashcards</h1><p class="lead">${total} cartes question-réponse. Les cartes que tu marques « À revoir » reviennent en priorité ; celles que tu connais reviennent de plus en plus tard (répétition espacée : ${INTERVALS.slice(1).join(', ')} jours).</p></header>
  ${unfinished ? `<a class="resume inline" href="#flashcards-session"><span class="resume-k">Session interrompue</span><span class="resume-t">${esc(s.label)} — carte ${s.index + 1} sur ${s.queue.length}</span><span class="resume-d">Reprendre</span></a>` : ''}
  <div class="deck-top">
    <button class="deck-b" data-deck="all"><b>${total}</b><span>Toutes les cartes</span></button>
    <button class="deck-b warn" data-deck="revoir" ${toRev ? '' : 'disabled'}><b>${toRev}</b><span>À revoir</span></button>
    <button class="deck-b" data-deck="echues" ${due ? '' : 'disabled'}><b>${due}</b><span>À échéance</span></button>
    <button class="deck-b" data-deck="nouvelles" ${fresh ? '' : 'disabled'}><b>${fresh}</b><span>Jamais vues</span></button>
    <div class="deck-m"><b>${mastered}</b><span>maîtrisées sur ${total}</span></div>
  </div>
  <h2 class="h2s">Par chapitre</h2>
  <ul class="decks">${rows}</ul>`;
}

function card() {
  const s = state.cardSession;
  if (!s || !s.queue.length) return `<header class="page-h"><h1>Flashcards</h1></header><p class="empty-big">Aucune carte dans cette sélection. <a href="#flashcards">Choisir un autre paquet</a></p>`;
  if (s.index >= s.queue.length) {
    const vals = Object.values(s.results);
    const known = vals.filter(Boolean).length;
    return `<header class="page-h"><h1>Session terminée</h1><p class="lead">${esc(s.label)}</p></header>
    <div class="done-box"><b>${known}<small>/${vals.length}</small></b><span>cartes connues</span></div>
    <div class="row-btns">${vals.length - known ? `<button class="btn primary" id="again">Revoir les ${plural(vals.length - known, 'carte ratée', 'cartes ratées')}</button>` : ''}<a class="btn ghost" href="#flashcards">Retour aux paquets</a></div>`;
  }
  const f = byId[s.queue[s.index]];
  const cs = state.cards[f.id];
  const rated = f.id in s.results;
  return `
  <div class="fc-top"><a href="#flashcards" class="back">${icon('left')} Paquets</a><span>${esc(s.label)}</span><span class="fc-count" aria-live="polite">Carte ${s.index + 1} sur ${s.queue.length}</span></div>
  <div class="fc-prog" aria-hidden="true"><i style="width:${Math.round(100 * s.index / s.queue.length)}%"></i></div>
  <h1 class="sr">Flashcards — ${esc(s.label)}</h1>
  <div class="fc-stage">
    <button class="fc" id="fc" aria-label="Retourner la carte" aria-pressed="false">
      <span class="fc-in">
        <span class="fc-face fc-q"><span class="fc-k">${esc(chLabel(f.ch))}${cs ? (cs.last ? ' — connue' : ' — à revoir') : ' — nouvelle'}</span><span class="fc-t">${esc(f.q)}</span><span class="fc-hint">${icon('flip')} Touche ou espace pour retourner</span></span>
        <span class="fc-face fc-a"><span class="fc-k">Réponse</span><span class="fc-t">${esc(f.a)}</span><a class="fc-link" href="#cours-${f.ch}" tabindex="-1">Voir dans le cours</a></span>
      </span>
    </button>
  </div>
  <div class="fc-actions" id="fc-actions" ${rated ? '' : 'hidden'}>
    <button class="btn rev" data-rate="0"><kbd>1</kbd> À revoir</button>
    <button class="btn ok" data-rate="1"><kbd>2</kbd> Je connais</button>
  </div>
  <div class="fc-nav">
    <button class="icon-btn" id="prev" ${s.index ? '' : 'disabled'} aria-label="Carte précédente">${icon('left')}</button>
    <span class="muted small">← → pour naviguer</span>
    <button class="icon-btn" id="next" aria-label="Carte suivante">${icon('right')}</button>
  </div>`;
}

export function render(param) {
  if (!param) return { html: home(), title: 'Flashcards', resume: 'Flashcards' };
  if (param !== 'session') {
    const s = state.cardSession;
    if (!(s && s.deck === param && s.index < s.queue.length)) startSession(param);
  }
  const s = state.cardSession;
  return { html: card(), title: 'Flashcards', resume: s ? `Flashcards — ${s.label}` : 'Flashcards', noFocus: true };
}

let keyHandler = null;
export function mount(root, param) {
  if (!param) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-deck]');
      if (!b) return;
      e.preventDefault();
      startSession(b.dataset.deck);
      go('flashcards-session');
    });
    return;
  }
  const s = state.cardSession;
  if (s) logSession('flashcards', `Flashcards — ${s.label}`);
  const rerender = () => { root.innerHTML = card(); bind(); };
  function flip() {
    const fc = $('#fc', root); if (!fc) return;
    const on = fc.classList.toggle('flipped');
    fc.setAttribute('aria-pressed', on);
    if (on) $('#fc-actions', root).hidden = false;
  }
  function rate(known) {
    const st = state.cardSession; const id = st.queue[st.index];
    rateCard(id, known);
    st.results[id] = known;
    // carte ratée : elle reviendra en fin de session
    if (!known && st.queue.indexOf(id, st.index + 1) < 0 && st.queue.filter((x) => x === id).length < 3) st.queue.push(id);
    st.index++;
    save(); rerender();
  }
  function bind() {
    const fc = $('#fc', root);
    if (fc) fc.onclick = (e) => { if (e.target.closest('.fc-link')) return; flip(); };
    root.querySelectorAll('[data-rate]').forEach((b) => (b.onclick = () => rate(b.dataset.rate === '1')));
    const p = $('#prev', root), n = $('#next', root);
    if (p) p.onclick = () => { state.cardSession.index = Math.max(0, state.cardSession.index - 1); save(); rerender(); };
    if (n) n.onclick = () => { state.cardSession.index++; save(); rerender(); };
    const again = $('#again', root);
    if (again) again.onclick = () => {
      const st = state.cardSession;
      const missed = [...new Set(Object.entries(st.results).filter(([, v]) => !v).map(([k]) => k))];
      state.cardSession = { deck: st.deck, label: st.label + ' (cartes ratées)', queue: missed, index: 0, results: {}, startedAt: Date.now() };
      save(); rerender();
      toast('Nouvelle session avec les cartes ratées');
    };
  }
  bind();
  keyHandler = (e) => {
    if (e.target.matches('input, textarea')) return;
    const st = state.cardSession; if (!st || st.index >= st.queue.length) return;
    if (e.key === ' ' || e.key === 'Enter') { if (e.target.id !== 'fc') { e.preventDefault(); flip(); } }
    else if (e.key === 'ArrowRight') $('#next', root)?.click();
    else if (e.key === 'ArrowLeft') $('#prev', root)?.click();
    else if ((e.key === '1' || e.key === '2') && !$('#fc-actions', root).hidden) rate(e.key === '2');
  };
  document.addEventListener('keydown', keyHandler);
}
export function unmount() { if (keyHandler) document.removeEventListener('keydown', keyHandler); keyHandler = null; }
