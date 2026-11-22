# Sûretés — plateforme de révision

Plateforme personnelle de préparation à l'examen de droit des sûretés (cautionnement, gage, nantissement, hypothèque), construite **exclusivement** à partir des quatre cours reconstitués des enregistrements de la professeure.

## Accès

- **Site public pour partager (GitHub Pages)** : https://tomzerone.github.io/droit-suretes/ — une fois GitHub Pages activé (dépôt public, Settings → Pages → Deploy from a branch → `main` / `/docs`). Aucun compte nécessaire ; la progression de chacun est gardée dans son propre navigateur ; la correction par Claude est remplacée par l'auto-évaluation guidée.

- **En ligne (recommandé)** : https://claude.ai/artifact/Ffj3HiqKsNDfvnqUsTb7De — page privée hébergée sur claude.ai. Connecté à ton compte Claude, ta progression est synchronisée entre ordinateur et téléphone, et la correction des cas pratiques par Claude est disponible.
- **Hors ligne** : ouvre `dist/plateforme-suretes.html` dans un navigateur (un seul fichier, tout inclus). La progression est alors gardée dans ce navigateur, et la correction par Claude est remplacée par l'auto-évaluation guidée.
- **Serveur local** : `npm install && npm run build && npm run serve`, puis http://localhost:8080.

## Ce que contient la plateforme

| Espace | Contenu |
|---|---|
| Tableau de bord | Progression globale et par chapitre, flashcards maîtrisées / à revoir, derniers QCM, cas pratiques et examens, difficultés, sessions, bouton « Reprendre » |
| Cours | 10 chapitres consolidés, encadrés (définitions, exemples, distinctions, remarques de la professeure, non exigible, à retenir, points à vérifier), recherche, chapitres marqués comme étudiés |
| Fiches | Fiche complète et fiche express par chapitre, fiche générale du programme |
| Flashcards | 116 cartes, répétition espacée (Leitner : 1, 3, 7, 15, 30 jours), reprise de session |
| Méthode | Syllogisme juridique en 5 étapes, exemples tirés du cours, réponse descriptive vs argumentée |
| Cas pratiques | 9 cas (3 faciles, 3 intermédiaires, 3 difficiles), 28 questions, correction en 5 étapes, réponse modèle, erreurs fréquentes, auto-évaluation sur 5 critères ou correction par Claude |
| QCM | 84 questions (réponse unique, multiple, vrai/faux), chaque proposition expliquée |
| Questions probables | 28 pistes (définition, compréhension, comparaison, application, argumentation, situations) avec réponse structurée |
| Examens blancs | 3 cas pratiques chronométrés (grille sur 20) + 3 QCM chronométrés, résultats détaillés et recommandations |
| Révision intelligente | Séance construite sur les chapitres les plus fragiles |

## Organisation du dépôt

```
src/content/   contenu pédagogique (cours.js, fiches.js, flashcards.js, qcm.js, cas.js, methode.js, probables.js, examens.js)
src/app/       application (store.js = sauvegarde, data.js = indicateurs, ai.js = correction, views/ = écrans)
src/styles.css styles ; src/index.html page
scripts/       build.mjs (construction) ; test_e2e.py (tests navigateur)
dist/          site construit (index.html + app.js + styles.css, et version fichier unique)
```

## Maintenance

- **Corriger ou compléter le contenu** : modifier le fichier concerné dans `src/content/` (le format de chaque fichier est décrit en tête), puis `npm run build`.
- **Tester** : `python3 scripts/test_e2e.py` (Playwright + Chrome, ordinateur et mobile — 144 vérifications : navigation, recherche, flashcards, QCM, cas pratiques, examens, calcul des notes, sauvegarde, absence de débordement mobile).
- **Republier** la page en ligne : demander à Claude de republier `dist/` sur l'artefact existant.

## Règles de fidélité

Aucune notion juridique extérieure aux quatre cours n'a été ajoutée. Les différences entre cours et les points incertains (numéro d'article de la mention manuscrite, étendue de l'engagement de la caution solidaire, etc.) sont signalés dans la page « Points à vérifier » au lieu d'être corrigés. Les notes des examens reposent sur un barème d'entraînement, pas sur le barème réel du contrôle.
