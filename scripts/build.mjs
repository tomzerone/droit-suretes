// Construit le site dans dist/ : index.html + styles.css + app.js (un seul bundle, sans dépendance externe).
import { build } from 'esbuild';
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
await build({
  entryPoints: ['src/app/main.js'], bundle: true, format: 'iife', target: 'es2020',
  minify: true, outfile: 'dist/app.js', legalComments: 'none', charset: 'utf8',
});
copyFileSync('src/styles.css', 'dist/styles.css');
copyFileSync('src/index.html', 'dist/index.html');
// Variante « un seul fichier » (pratique pour ouvrir hors ligne ou héberger ailleurs)
const html = readFileSync('src/index.html', 'utf8')
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${readFileSync('dist/styles.css', 'utf8')}</style>`)
  .replace('<script src="app.js"></script>', () => `<script>${readFileSync('dist/app.js', 'utf8').replace(/<\/script/gi, '<\\/script')}</script>`);
writeFileSync('dist/plateforme-suretes.html', html);
// Copie pour GitHub Pages (Settings → Pages → branche main, dossier /docs)
mkdirSync('docs', { recursive: true });
for (const f of ['index.html', 'app.js', 'styles.css']) copyFileSync('dist/' + f, 'docs/' + f);
writeFileSync('docs/.nojekyll', '');
console.log('Build OK');
