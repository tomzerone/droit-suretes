// Correction assistée par Claude (capability `sample`), uniquement au regard du cours.
import { CH } from './data.js';
import { blockText } from './ui.js';

let samplePromise = null;
export function getSample() {
  const C = typeof window !== 'undefined' ? window.claude : null;
  if (!C || typeof C.use !== 'function') return Promise.resolve(null);
  if (!samplePromise) samplePromise = C.use('sample').catch(() => null);
  return samplePromise;
}

function courseExcerpt(chIds) {
  return chIds.map((id) => {
    const c = CH[id];
    if (!c) return '';
    return `## ${c.title}\n` + c.sections.map((s) => `### ${s.title}\n` + s.blocks.map(blockText).filter(Boolean).join('\n')).join('\n');
  }).join('\n\n');
}

const RULES = `Tu es correcteur d'un examen de droit des sûretés (niveau BUT, première approche du droit).
Règles impératives :
- Évalue UNIQUEMENT au regard du COURS fourni ci-dessous. N'exige aucune règle, aucun article ni aucune jurisprudence absents du cours.
- Une règle exacte formulée avec d'autres mots que le corrigé est juste. Ne note pas la simple présence de mots-clés : évalue le raisonnement (qualification des faits, problème, règle, application aux faits, conclusion).
- Une affirmation contraire au cours est une erreur, même si elle est accompagnée de bons mots-clés.
- Les articles de loi ne sont pas exigés (l'article 2288 est explicitement non exigible).
- Sois exigeant mais bienveillant, tutoie l'étudiant, écris en français, phrases courtes.
- Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour.`;

async function ask(prompt, signal) {
  const sample = await getSample();
  if (!sample) throw { code: 'unavailable', message: 'Correction automatique indisponible ici' };
  let value;
  if (typeof sample.json === 'function') {
    value = await sample.json(prompt, { modelTier: 'default', signal });
  } else {
    const r = await sample(prompt, { modelTier: 'default', signal });
    const m = r.text.match(/\{[\s\S]*\}/);
    value = JSON.parse(m ? m[0] : r.text);
  }
  if (typeof value === 'string') { const m = value.match(/\{[\s\S]*\}/); value = JSON.parse(m ? m[0] : value); }
  return value;
}

// Évaluation d'une réponse de cas pratique (5 critères sur 4 points → /20)
export async function evaluateCase(enonce, question, answer, signal) {
  const prompt = `${RULES}

# COURS (seule référence autorisée)
${courseExcerpt(question.ch)}

# ÉNONCÉ DU CAS PRATIQUE
${enonce.replace(/<[^>]+>/g, ' ')}

# QUESTION
${question.q}

# CORRIGÉ DE RÉFÉRENCE
Qualification : ${question.qualification}
Problème : ${question.probleme}
Règle : ${question.regle}
Application : ${question.application}
Conclusion : ${question.conclusion}
Éléments indispensables : ${question.indispensables.join(' ; ')}

# RÉPONSE DE L'ÉTUDIANT
"""${answer}"""

# FORMAT DE SORTIE (JSON)
{
 "criteres": {
   "exactitude": {"note": 0-4, "commentaire": "exactitude juridique par rapport au cours"},
   "probleme": {"note": 0-4, "commentaire": "identification du problème de droit"},
   "argumentation": {"note": 0-4, "commentaire": "qualité du raisonnement et de l'argumentation"},
   "application": {"note": 0-4, "commentaire": "application de la règle aux faits de l'énoncé"},
   "clarte": {"note": 0-4, "commentaire": "clarté et structure de la rédaction"}
 },
 "indispensables": [true/false pour chaque élément indispensable, dans l'ordre],
 "points_forts": ["..."],
 "a_ameliorer": ["..."],
 "erreurs": ["affirmations fausses au regard du cours, citées précisément ; [] si aucune"],
 "synthese": "2 phrases maximum"
}
Les notes sont des entiers ou demi-points entre 0 et 4.`;
  const v = await ask(prompt, signal);
  const keys = ['exactitude', 'probleme', 'argumentation', 'application', 'clarte'];
  const crit = {};
  let total = 0;
  keys.forEach((k) => {
    const c = (v.criteres && v.criteres[k]) || {};
    const n = Math.max(0, Math.min(4, Number(c.note) || 0));
    crit[k] = { note: n, commentaire: String(c.commentaire || '') };
    total += n;
  });
  return {
    score20: total, criteres: crit,
    indispensables: Array.isArray(v.indispensables) ? v.indispensables.map(Boolean) : [],
    points_forts: (v.points_forts || []).map(String), a_ameliorer: (v.a_ameliorer || []).map(String),
    erreurs: (v.erreurs || []).map(String), synthese: String(v.synthese || ''),
  };
}

// Évaluation d'une question d'examen blanc selon sa grille (points par élément attendu)
export async function evaluateExamQuestion(enonce, question, answer, signal) {
  const prompt = `${RULES}

# COURS (seule référence autorisée)
${courseExcerpt(question.ch)}

# ÉNONCÉ
${enonce.replace(/<[^>]+>/g, ' ')}

# QUESTION (sur ${question.points} points)
${question.q}

# CORRIGÉ DE RÉFÉRENCE
${question.qualification} ${question.probleme} ${question.regle} ${question.application} ${question.conclusion}

# GRILLE (élément attendu → points maximum)
${question.criteria.map((c, i) => `${i + 1}. ${c[0]} → ${c[1]} pt`).join('\n')}

# RÉPONSE DE L'ÉTUDIANT
"""${answer}"""

Attribue pour chaque élément de la grille un nombre de points entre 0 et son maximum (demi-points autorisés), selon que le raisonnement de l'étudiant le traite correctement. Un élément évoqué mais faux ou mal appliqué vaut 0.
# FORMAT DE SORTIE (JSON)
{"grille": [{"points": nombre, "justification": "courte"}], "raisonnement": 0-4, "commentaire": "2 phrases maximum", "erreurs": ["..."]}`;
  const v = await ask(prompt, signal);
  const grille = question.criteria.map((c, i) => {
    const g = (v.grille && v.grille[i]) || {};
    return { points: Math.max(0, Math.min(c[1], Number(g.points) || 0)), justification: String(g.justification || '') };
  });
  return {
    grille, points: grille.reduce((a, g) => a + g.points, 0),
    raisonnement: Math.max(0, Math.min(4, Number(v.raisonnement) || 0)),
    commentaire: String(v.commentaire || ''), erreurs: (v.erreurs || []).map(String),
  };
}
