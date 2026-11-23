"""Tests de bout en bout de la plateforme (Playwright + Chrome).
Usage : python3 scripts/test_e2e.py  (sert dist/ sur un port local)"""
import http.server, socketserver, threading, functools, os, sys, json
from playwright.sync_api import sync_playwright

ROOT = os.path.join(os.path.dirname(__file__), '..', 'dist')
PORT = int(os.environ.get("PORT", "8766"))
Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
Handler = functools.partial(Quiet, directory=ROOT)
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(('127.0.0.1', PORT), Handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{PORT}/index.html'
SHOTS = os.path.join(os.path.dirname(__file__), '..', 'shots'); os.makedirs(SHOTS, exist_ok=True)

fails, passes = [], 0
def check(cond, msg):
    global passes
    if cond: passes += 1
    else: fails.append(msg); print('ÉCHEC :', msg)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for vp_name, vp in [('desktop', {'width': 1440, 'height': 900}), ('mobile', {'width': 390, 'height': 844})]:
        ctx = b.new_context(viewport=vp, device_scale_factor=1)
        ctx.route('**/fonts.googleapis.com/**', lambda r: r.abort())
        ctx.route('**/fonts.gstatic.com/**', lambda r: r.abort())
        pg = ctx.new_page()
        errors = []
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.on('console', lambda m: errors.append(m.text) if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
        pg.goto(URL); pg.wait_for_selector('h1')
        check(pg.inner_text('h1').startswith(('Bonjour','Bonsoir','Bonne')), f'[{vp_name}] accueil : titre')
        pg.screenshot(path=f'{SHOTS}/{vp_name}-accueil.png', full_page=True)

        # Toutes les routes s'affichent
        routes = ['cours', 'cours-c0', 'cours-c3', 'cours-c9', 'fiches', 'fiches-c4', 'flashcards', 'methode', 'cas', 'cas-cp7',
                  'qcm', 'podcast', 'podcast-ep3', 'probables', 'examens', 'examen-ex1', 'examen-eq1', 'revision', 'verifier', 'recherche', 'reglages']
        for r in routes:
            pg.goto(URL + '#' + r); pg.wait_for_timeout(120)
            h = pg.query_selector('main h1')
            check(h is not None and len(h.inner_text().strip()) > 2, f'[{vp_name}] route {r} : h1')
            if r in ('cours-c3', 'cas-cp7', 'methode', 'qcm', 'flashcards', 'fiches-c4', 'examens', 'probables'):
                pg.screenshot(path=f'{SHOTS}/{vp_name}-{r}.png', full_page=(vp_name == 'mobile' and r in ('cours-c3',)) )

        # Cours : 10 chapitres, encadrés, marquer étudié
        pg.goto(URL + '#cours'); pg.wait_for_timeout(100)
        check(len(pg.query_selector_all('.toc-ch')) == 10, f'[{vp_name}] 10 chapitres au sommaire')
        pg.goto(URL + '#cours-c3'); pg.wait_for_timeout(100)
        check(len(pg.query_selector_all('.box.def')) >= 1 and len(pg.query_selector_all('.box.warn')) >= 1, f'[{vp_name}] encadrés c3')
        pg.click('#mark'); pg.wait_for_timeout(100)
        st = pg.evaluate('window.__ds.state.chapters.c3')
        check(st and st.get('studied') is True, f'[{vp_name}] chapitre marqué étudié')
        pg.goto(URL + '#cours-c1'); pg.wait_for_timeout(100)
        check(len(pg.query_selector_all('.box.nx')) == 1, f'[{vp_name}] encadré non exigible (art. 2288)')

        # Recherche
        pg.goto(URL + '#recherche'); pg.fill('#q-big', 'bénéfice de division'); pg.press('#q-big', 'Enter'); pg.wait_for_timeout(150)
        n = len(pg.query_selector_all('.results li'))
        check(n >= 3, f'[{vp_name}] recherche : {n} résultats')
        pg.fill('#q-big', 'radiation'); pg.press('#q-big', 'Enter'); pg.wait_for_timeout(100)
        check(len(pg.query_selector_all('.results li')) >= 1, f'[{vp_name}] recherche sans accent/radiation')

        # Flashcards : retourner, noter, naviguer, reprendre
        pg.goto(URL + '#flashcards-c2'); pg.wait_for_selector('#fc')
        check(pg.is_hidden('#fc-actions'), f'[{vp_name}] boutons masqués avant retournement')
        pg.click('#fc'); pg.wait_for_timeout(600)
        check('flipped' in pg.get_attribute('#fc', 'class'), f'[{vp_name}] carte retournée')
        if vp_name == 'desktop': pg.screenshot(path=f'{SHOTS}/{vp_name}-flashcard-verso.png')
        pg.click('[data-rate="1"]'); pg.wait_for_timeout(100)
        pg.click('#fc'); pg.click('[data-rate="0"]'); pg.wait_for_timeout(100)
        s = pg.evaluate('window.__ds.state.cardSession')
        check(s['index'] == 2 and len(s['results']) == 2, f'[{vp_name}] session : 2 cartes notées')
        check(len(s['queue']) == pg.evaluate("window.__ds.state.cardSession.results ? 18 : 0"), f'[{vp_name}] carte ratée remise en fin de file ({len(s["queue"])})')
        pg.click('#prev'); pg.wait_for_timeout(80)
        check(pg.evaluate('window.__ds.state.cardSession.index') == 1, f'[{vp_name}] carte précédente')
        cards = pg.evaluate('window.__ds.state.cards')
        check(sum(1 for c in cards.values() if c.get('last')) == 1 and sum(1 for c in cards.values() if not c.get('last')) == 1, f'[{vp_name}] mémorisation connue/à revoir')
        pg.goto(URL + '#flashcards'); pg.wait_for_timeout(100)
        check(pg.query_selector('a.resume[href="#flashcards-session"]') is not None, f'[{vp_name}] reprise de session proposée')
        pg.keyboard.press('Escape')

        # QCM : config → 10 questions → résultat
        pg.goto(URL + '#qcm'); pg.wait_for_selector('#qcfg')
        pg.click('label.chip:has(input[value="c6"])'); pg.click('#qcfg button.btn.primary'); pg.wait_for_selector('#qform')
        total = pg.evaluate('document.querySelector(".fc-count").textContent')
        check('sur' in total, f'[{vp_name}] QCM démarré ({total})')
        for i in range(30):
            if pg.query_selector('#qform button#validate') is None: break
            hint = pg.inner_text('.hint')
            pg.click('.opt >> nth=0')
            pg.click('#validate'); pg.wait_for_selector('#qcorr .opt-corr')
            check(len(pg.query_selector_all('.opt-corr li')) == len(pg.query_selector_all('.opt')), f'[{vp_name}] QCM : chaque proposition expliquée')
            if i == 0 and vp_name == 'desktop': pg.screenshot(path=f'{SHOTS}/{vp_name}-qcm-correction.png', full_page=True)
            pg.click('#nextq'); pg.wait_for_timeout(60)
        check(pg.query_selector('.done-box') is not None, f'[{vp_name}] QCM : écran de résultat')
        runs = pg.evaluate('window.__ds.state.qcmRuns')
        check(len(runs) >= 1 and runs[0]['total'] >= 1, f'[{vp_name}] QCM : résultat enregistré')

        # Cas pratique : saisie, sauvegarde, correction, auto-évaluation
        pg.goto(URL + '#cas-cp1'); pg.wait_for_selector('[data-ans="0"]')
        check(pg.is_hidden('[data-ai="0"]'), f'[{vp_name}] bouton IA masqué hors claude.ai')
        pg.fill('[data-ans="0"]', "Philippe est la caution : c'est un cautionnement, sûreté personnelle. Le bail est le contrat principal.")
        pg.wait_for_timeout(900)
        check('caution' in (pg.evaluate("window.__ds.state.cases.cp1.answers['0']") or ''), f'[{vp_name}] réponse enregistrée')
        pg.click('[data-show="0"]'); pg.wait_for_selector('.corr')
        check(len(pg.query_selector_all('.corr .syl dt')) == 5, f'[{vp_name}] correction en 5 étapes')
        for k in ['exactitude', 'probleme', 'argumentation', 'application', 'clarte']:
            pg.click(f'[data-qi="0"] [data-crit="{k}"][data-v="3"]')
        pg.click('[data-selfsave="0"]'); pg.wait_for_timeout(100)
        ev = pg.evaluate("window.__ds.state.cases.cp1.evals['0']")
        check(ev and ev['score20'] == 15, f'[{vp_name}] auto-évaluation 15/20 ({ev})')
        # correction sans réponse → dialogue intégré
        pg.click('[data-show="1"]'); pg.wait_for_selector('.dlg')
        check(pg.query_selector('.dlg') is not None, f'[{vp_name}] dialogue de confirmation')
        pg.click('.dlg button[data-v="0"]')
        if vp_name == 'desktop': pg.screenshot(path=f'{SHOTS}/{vp_name}-cas-correction.png', full_page=True)

        # Examen blanc QCM : tout répondre, rendre, note /20
        pg.goto(URL + '#examen-eq2'); pg.click('#start'); pg.wait_for_selector('.ex-qcm')
        qs = pg.query_selector_all('.ex-qcm > li')
        check(len(qs) == 20, f'[{vp_name}] examen QCM : 20 questions')
        for li in qs:
            li.query_selector('.opt').click()
        pg.click('#submit'); pg.wait_for_selector('.dlg'); pg.click('.dlg button[data-v="1"]'); pg.wait_for_selector('.done-box')
        txt = pg.inner_text('.done-box')
        check('/20' in txt, f'[{vp_name}] examen QCM noté : {txt[:40]!r}')
        ex = pg.evaluate('window.__ds.state.exams[0]')
        check(ex and ex['kind'] == 'qcm' and 0 <= ex['score20'] <= 20, f'[{vp_name}] examen QCM enregistré')

        # Examen blanc cas pratique : copie, rendre, auto-correction, note
        pg.goto(URL + '#examen-ex2'); pg.click('#start'); pg.wait_for_selector('[data-ans="0"]')
        check(pg.inner_text('#timer') != '—', f'[{vp_name}] chronomètre actif')
        pg.fill('[data-ans="0"]', 'Gage sans dépossession sur la machine, nantissement des parts, hypothèque conventionnelle, gage avec dépossession.')
        pg.wait_for_timeout(700)
        pg.click('#submit'); pg.wait_for_selector('.dlg'); pg.click('.dlg button[data-v="1"]'); pg.wait_for_selector('#sg')
        for cb in pg.query_selector_all('input[name="g0"]'): cb.check()
        pg.click('#sg button.btn.primary'); pg.wait_for_selector('.done-box')
        ex = pg.evaluate('window.__ds.state.exams[0]')
        check(ex['kind'] == 'cas' and ex['score20'] == 4, f'[{vp_name}] examen cas noté 4/20 ({ex["score20"]})')
        check(pg.query_selector('.grid-l.res') is not None, f'[{vp_name}] résultats détaillés')
        if vp_name == 'desktop': pg.screenshot(path=f'{SHOTS}/{vp_name}-examen-resultat.png', full_page=True)

        # Révision intelligente → QCM ciblé
        pg.goto(URL + '#revision'); pg.click('#go-qcm'); pg.wait_for_selector('#qform')
        check('Révision intelligente' in pg.inner_text('.fc-top'), f'[{vp_name}] révision intelligente : QCM ciblé')
        pg.goto(URL + '#revision'); pg.click('#go-cards'); pg.wait_for_selector('#fc')
        check(pg.evaluate('window.__ds.state.cardSession.queue.length') <= 20, f'[{vp_name}] révision intelligente : ≤ 20 cartes')

        # Persistance après rechargement
        before = pg.evaluate('JSON.stringify(window.__ds.state.exams.length)')
        pg.goto(URL + '#accueil'); pg.reload(); pg.wait_for_selector('h1')
        after = pg.evaluate('JSON.stringify(window.__ds.state.exams.length)')
        check(before == after and after != '0', f'[{vp_name}] progression conservée après rechargement')
        check(pg.evaluate('window.__ds.state.chapters.c3.studied') is True, f'[{vp_name}] chapitre étudié conservé')
        check('Tu as parcouru' in pg.inner_text('.home-h'), f'[{vp_name}] tableau de bord mis à jour')
        pg.screenshot(path=f'{SHOTS}/{vp_name}-accueil-progression.png', full_page=True)

        # Débordement horizontal (mobile)
        for r in ['accueil', 'cours-c2', 'cours-c9', 'cas-cp8', 'qcm', 'flashcards', 'probables', 'examens', 'fiches-c3']:
            pg.goto(URL + '#' + r); pg.wait_for_timeout(100)
            ow = pg.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
            check(ow <= 1, f'[{vp_name}] pas de débordement horizontal sur {r} ({ow}px)')

        check(not errors, f'[{vp_name}] erreurs console : {errors[:3]}')
        ctx.close()
    b.close()
httpd.shutdown()
print(f'\n{passes} vérifications réussies, {len(fails)} échec(s).')
sys.exit(1 if fails else 0)
