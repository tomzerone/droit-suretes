"""Tests du podcast avec une synthèse vocale simulée (Playwright + Chrome)."""
import http.server, socketserver, threading, functools, os, sys
from playwright.sync_api import sync_playwright
ROOT = os.path.join(os.path.dirname(__file__), '..', 'dist')
PORT = int(os.environ.get('PORT', '8790'))
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(('127.0.0.1', PORT), functools.partial(Q, directory=ROOT))
threading.Thread(target=httpd.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{PORT}/index.html'
MOCK = """
window.__spoken = [];
class FakeU { constructor(t){ this.text=t; } }
window.SpeechSynthesisUtterance = FakeU;
const voices=[{name:'Amélie',lang:'fr-FR'},{name:'Thomas',lang:'fr-FR'}];
Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{ _t:null, getVoices(){return voices;}, speak(u){ window.__spoken.push([u.voice&&u.voice.name,u.text]); this._t=setTimeout(()=>u.onend&&u.onend(),5); }, cancel(){ clearTimeout(this._t); }, onvoiceschanged:null }});
"""
fails=[]; ok=0
def check(c,m):
    global ok
    if c: ok+=1
    else: fails.append(m); print('ÉCHEC :', m)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for name,vp in [('desktop',{'width':1440,'height':900}),('mobile',{'width':390,'height':844})]:
        c=b.new_context(viewport=vp); c.route('**/fonts.g*/**',lambda r:r.abort()); c.add_init_script(MOCK)
        pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto(URL+'#podcast'); pg.wait_for_selector('.eps')
        check(len(pg.query_selector_all('.ep-i'))==7, f'[{name}] 7 épisodes')
        pg.screenshot(path=f'shots/{name}-podcast-liste.png', full_page=True)
        pg.goto(URL+'#podcast-ep5'); pg.wait_for_selector('#tr')
        pg.wait_for_function("document.querySelector('#eng').textContent.includes('Voix de ton appareil')")
        check(not pg.is_disabled('#pp'), f'[{name}] bouton lecture actif')
        pg.uncheck('#thinkp')
        pg.click('#pp'); pg.wait_for_timeout(300)
        n=pg.evaluate('window.__spoken.length')
        check(n>5, f'[{name}] lecture en cours ({n} phrases)')
        voices=set(v for v,_ in pg.evaluate('window.__spoken'))
        check(voices=={'Amélie','Thomas'}, f'[{name}] deux voix ({voices})')
        pg.wait_for_function("document.querySelector('#now').textContent.includes('terminé')", timeout=15000)
        st=pg.evaluate("window.__ds.state.podcast.ep5")
        check(st and st['done'] is True, f'[{name}] épisode marqué écouté')
        # reprise à une réplique précise
        pg.click('[data-go="10"]'); pg.wait_for_timeout(30); pg.click('#pp')
        line=pg.evaluate("window.__ds.state.podcast.ep5.line")
        check(line>=10, f'[{name}] lecture depuis une réplique choisie ({line})')
        pg.screenshot(path=f'shots/{name}-podcast-episode.png')
        # pause de réflexion
        pg.goto(URL+'#podcast-ep1'); pg.wait_for_selector('#tr'); pg.wait_for_timeout(300)
        pg.check('#thinkp'); pg.click('[data-go="11"]'); pg.wait_for_timeout(1500)
        check(pg.evaluate("window.__ds.state.podcast.ep1.line")==11, f'[{name}] pause de 5 s après une question')
        pg.goto(URL+'#podcast'); pg.wait_for_timeout(200)
        check('Écouté' in pg.inner_text('.eps'), f'[{name}] statut écouté dans la liste')
        ow=pg.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth')
        check(ow<=1, f'[{name}] pas de débordement')
        check(not errs, f'[{name}] erreurs : {errs[:2]}')
        c.close()
    # Sans aucune voix : lecture désactivée, transcription disponible
    c=b.new_context(); c.route('**/fonts.g*/**',lambda r:r.abort())
    c.add_init_script("Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices(){return []},speak(){},cancel(){},onvoiceschanged:null}});")
    pg=c.new_page(); pg.goto(URL+'#podcast-ep2'); pg.wait_for_timeout(1800)
    check(pg.is_disabled('#pp') and 'indisponible' in pg.inner_text('#eng'), 'sans voix : lecture désactivée avec message')
    b.close()
httpd.shutdown()
print(f'\n{ok} vérifications réussies, {len(fails)} échec(s).'); sys.exit(1 if fails else 0)
