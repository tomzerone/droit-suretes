// Utilitaires d'affichage
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const strip = (html) => String(html ?? '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function plural(n, one, many) { return n + ' ' + (n > 1 ? many : one); }
export function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
export function fmtDate(ts) {
  if (!ts) return '';
  const d = new Date(ts), now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const y = new Date(now); y.setDate(now.getDate() - 1);
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return "Aujourd'hui, " + time;
  if (d.toDateString() === y.toDateString()) return 'Hier, ' + time;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + ', ' + time;
}
export function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
export function note20(x) { return (Math.round(x * 2) / 2).toLocaleString('fr-FR'); }

// Icônes (trait 1.6, 20px)
const P = {
  home: '<path d="M3 10.5 10 4l7 6.5V17a1 1 0 0 1-1 1h-3.5v-5h-5v5H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H16v12H5.5A1.5 1.5 0 0 0 4 16.5zM4 16.5A1.5 1.5 0 0 0 5.5 18H16v-3"/>',
  sheet: '<path d="M5 3h7l3 3v11H5z"/><path d="M12 3v3h3M8 10h4M8 13h4"/>',
  cards: '<rect x="3" y="6" width="11" height="11" rx="1.5"/><path d="M7 3.5h9.5V14"/>',
  scale: '<path d="M10 3v14M6 17h8M4 7h12M4 7l-2 5a2 2 0 0 0 4 0zM16 7l-2 5a2 2 0 0 0 4 0z"/>',
  check: '<path d="M4 10.5 8 14l8-8"/>',
  list: '<path d="M7 5h10M7 10h10M7 15h10M3.5 5h.01M3.5 10h.01M3.5 15h.01"/>',
  target: '<circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3"/>',
  timer: '<circle cx="10" cy="11" r="6.5"/><path d="M10 7.5V11l2 2M8 2.5h4"/>',
  spark: '<path d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M5 5l2.5 2.5M12.5 12.5 15 15M15 5l-2.5 2.5M7.5 12.5 5 15"/>',
  search: '<circle cx="9" cy="9" r="5.5"/><path d="m13.5 13.5 4 4"/>',
  menu: '<path d="M3 6h14M3 10h14M3 14h14"/>',
  x: '<path d="M5 5l10 10M15 5 5 15"/>',
  left: '<path d="M12 4 6 10l6 6"/>', right: '<path d="m8 4 6 6-6 6"/>',
  flip: '<path d="M4 8a6 6 0 0 1 11-2.5M16 12a6 6 0 0 1-11 2.5M15 2.5v3h-3M5 17.5v-3h3"/>',
  alert: '<path d="M10 3 2.5 16.5h15z"/><path d="M10 8v4M10 14.5v.01"/>',
  pen: '<path d="M4 16l1-4 8.5-8.5 3 3L8 15z"/>',
  moon: '<path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5z"/>',
  more: '<circle cx="5" cy="10" r=".8"/><circle cx="10" cy="10" r=".8"/><circle cx="15" cy="10" r=".8"/>',
  cloud: '<path d="M6 15.5h8.5a3.5 3.5 0 0 0 .3-7A5 5 0 0 0 5 9.5a3 3 0 0 0 1 6z"/>',
  headphones: '<path d="M3.5 14v-3a6.5 6.5 0 0 1 13 0v3"/><rect x="3" y="12.5" width="3.5" height="5" rx="1"/><rect x="13.5" y="12.5" width="3.5" height="5" rx="1"/>',
  device: '<rect x="5" y="2.5" width="10" height="15" rx="2"/><path d="M9 15h2"/>',
};
export function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;
}

// Rendu des blocs du cours
const BOX = {
  def: ['def', 'Définition à mémoriser'],
  ex: ['ex', 'Exemple pratique'],
  dist: ['dist', 'Distinction importante'],
  prof: ['prof', 'Remarque de la professeure'],
  nx: ['nx', 'Non exigible à l\'examen'],
  warn: ['warn', 'Point à vérifier — signalé par la plateforme'],
};
export function renderBlocks(blocks, ctx = {}) {
  return blocks.map((b, i) => {
    const [t] = b;
    const id = ctx.prefix ? `${ctx.prefix}-b${i}` : '';
    const idAttr = id ? ` id="${id}"` : '';
    switch (t) {
      case 'p': return `<p${idAttr}>${b[1]}</p>`;
      case 'h': return `<h4 class="subh"${idAttr}>${b[1]}</h4>`;
      case 'ul': return `<ul${idAttr}>${b[1].map((x) => `<li>${x}</li>`).join('')}</ul>`;
      case 'ol': return `<ol${idAttr}>${b[1].map((x) => `<li>${x}</li>`).join('')}</ol>`;
      case 'table': return `<div class="tbl-wrap"${idAttr}><table><thead><tr>${b[1].map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${b[2].map((r) => `<tr>${r.map((c, j) => j === 0 ? `<th scope="row">${c}</th>` : `<td data-label="${esc(strip(b[1][j]))}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'key': return `<aside class="box key"${idAttr}><div class="box-l">À retenir</div><ul>${b[1].map((x) => `<li>${x}</li>`).join('')}</ul></aside>`;
      case 'def': case 'ex': case 'dist': {
        const [cls, label] = BOX[t];
        return `<aside class="box ${cls}"${idAttr}><div class="box-l">${label}</div><div class="box-t">${b[1]}</div><div class="box-b">${b[2]}</div></aside>`;
      }
      case 'prof': case 'nx': case 'warn': {
        const [cls, label] = BOX[t];
        return `<aside class="box ${cls}"${idAttr}><div class="box-l">${label}</div><div class="box-b">${b[1]}</div></aside>`;
      }
      default: return '';
    }
  }).join('');
}
export function blockText(b) {
  const [t] = b;
  if (t === 'p' || t === 'h' || t === 'prof' || t === 'nx' || t === 'warn') return strip(b[1]);
  if (t === 'ul' || t === 'ol' || t === 'key') return b[1].map(strip).join(' ');
  if (t === 'def' || t === 'ex' || t === 'dist') return strip(b[1]) + ' — ' + strip(b[2]);
  if (t === 'table') return [b[1].map(strip).join(' | '), ...b[2].map((r) => r.map(strip).join(' | '))].join(' ');
  return '';
}

// Toast
let toastTimer;
export function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// Boîte de dialogue intégrée (alert/confirm sont bloqués dans le cadre)
export function confirmDialog(title, text, okLabel = 'Confirmer') {
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'dlg-wrap';
    wrap.innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-t"><h3 id="dlg-t">${esc(title)}</h3><p>${text}</p><div class="dlg-a"><button class="btn ghost" data-v="0">Annuler</button><button class="btn primary" data-v="1">${esc(okLabel)}</button></div></div>`;
    document.body.appendChild(wrap);
    const done = (v) => { wrap.remove(); resolve(v); };
    wrap.addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) done(b.dataset.v === '1'); else if (e.target === wrap) done(false); });
    wrap.addEventListener('keydown', (e) => { if (e.key === 'Escape') done(false); });
    wrap.querySelector('button[data-v="1"]').focus();
  });
}
