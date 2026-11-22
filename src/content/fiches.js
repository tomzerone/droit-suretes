// Fiches de révision — strictement issues du cours consolidé.
// Chaque fiche : complete (rubriques) + express (essentiel à mémoriser).
export const FICHES = [
  {
    ch: 'c0',
    complete: {
      definitions: [
        ['Sûreté', "Mécanisme juridique (garantie accordée au créancier) qui sécurise le paiement des créances et assure leur recouvrement."],
        ['Sûreté personnelle', "Repose sur l'engagement d'une personne aux côtés du débiteur principal (ex. : cautionnement)."],
        ['Sûreté réelle', "Repose sur l'affectation d'un ou plusieurs biens au paiement de la dette (ex. : hypothèque, nantissement, gage)."],
      ],
      mecanismes: [
        "Le créancier qui accorde un crédit ou un délai s'expose au risque d'impayé ; la sûreté l'en protège.",
        "Deux intérêts : face à l'insolvabilité du débiteur (moyen alternatif ou privilégié d'être payé) et face aux autres créanciers (paiement en priorité, en principe).",
      ],
      conditions: [
        "Constitution par la volonté des parties (quand la loi le prévoit) ou sur décision de justice.",
      ],
      distinctions: [
        "Personnelle (une personne) ≠ réelle (un bien).",
        "Conventionnelle (volonté des parties) ≠ judiciaire (décision de justice).",
      ],
      exemples: [
        "Se porter caution pour une autre personne (sûreté personnelle).",
        "Hypothéquer sa maison ; nantir les titres de sa société pour contracter un emprunt (sûretés réelles).",
      ],
    },
    express: [
      "Sûreté = garantie du paiement et du recouvrement d'une créance.",
      "Utile contre l'insolvabilité du débiteur et contre la concurrence des autres créanciers.",
      "Personnelle (caution) / réelle (bien affecté).",
      "Constituée par les parties ou par le juge.",
    ],
  },
  {
    ch: 'c1',
    complete: {
      definitions: [
        ['Cautionnement', "Contrat par lequel la caution s'oblige envers le créancier à payer la dette en cas de défaillance du débiteur principal."],
        ['Caution', "Débiteur accessoire, adjoint au débiteur principal pour le suppléer s'il ne s'exécute pas."],
      ],
      mecanismes: [
        "Opération tripartite : créancier, débiteur principal, caution.",
        "Contrat conclu entre le créancier et la caution ; la caution ne s'engage pas sans accord avec le débiteur principal.",
        "Impayé : le créancier se retourne d'abord contre le débiteur (mise en demeure), puis actionne la caution.",
      ],
      references: [
        "Art. 2288 C. civ. (définition) — non exigé à l'examen (remarque de la professeure).",
      ],
      exemples: [
        "Le bailleur exige un garant pour la location d'un étudiant ; en cas d'impayé de loyer, il se retourne vers le garant.",
      ],
    },
    express: [
      "Caution = s'oblige envers le créancier à payer si le débiteur fait défaut.",
      "3 acteurs ; contrat entre créancier et caution.",
      "Intérêt : augmenter les chances de recouvrement face à l'insolvabilité du débiteur.",
      "Art. 2288 : culture générale, non exigé.",
    ],
  },
  {
    ch: 'c2',
    complete: {
      definitions: [
        ['Bénéfice de discussion', "Droit de la caution d'exiger que le créancier poursuive d'abord le débiteur principal sur ses biens ; elle ne paie que le reliquat."],
        ['Bénéfice de division', "En cas de pluralité de cautions, droit d'exiger que le créancier divise ses poursuites et ne réclame que la quote-part de chacune."],
        ['Cautionnement défini', "Garantit une dette déterminée ou un montant fixé à l'avance (cas le plus courant)."],
        ['Cautionnement indéfini', "Porte sur des dettes futures indéterminées ; montant indéterminable lors de l'engagement (dettes futures, intérêts, majorations)."],
      ],
      mecanismes: [
        "Simple : discussion + division. Solidaire : ni l'un ni l'autre → action directe pour le tout contre une seule caution.",
        "Civil = principe → simple. Commercial = exception → solidaire.",
        "Indéfini : résiliation unilatérale à tout moment, avec préavis contractuel.",
      ],
      conditions: [
        "Commercialité : cautionnement d'un établissement de crédit ; d'un commerçant pour les besoins de son activité ; d'une caution ayant un intérêt patrimonial dans l'opération.",
      ],
      exceptions: [
        "Le cautionnement commercial est l'exception au principe du cautionnement civil.",
        "Résiliation de l'indéfini : libère pour les dettes futures seulement ; les dettes nées avant restent dues.",
      ],
      distinctions: [
        "Tribunal judiciaire (civil, magistrats professionnels) ≠ tribunal de commerce (commercial, juges issus du monde économique, comme les prud'hommes).",
      ],
      references: ["Art. 2305 et 2305-1 C. civ. (bénéfice de discussion)."],
      exemples: [
        "Caution à 20 % : en simple, poursuivie pour 20 % seulement ; en solidaire, peut se voir réclamer le tout.",
        "Caution du bail d'habitation de son enfant : cautionnement civil.",
      ],
    },
    express: [
      "Simple = discussion + division ; solidaire = aucune protection.",
      "Civil (principe) → simple → tribunal judiciaire.",
      "Commercial (banque, commerçant, intérêt patrimonial) → solidaire → tribunal de commerce.",
      "Indéfini → résiliable à tout moment (préavis), reste tenue des dettes antérieures.",
    ],
  },
  {
    ch: 'c3',
    complete: {
      definitions: [
        ['Créancier professionnel', "Créancier dont la créance est née dans l'exercice de sa profession (ex. : banque)."],
        ['Caractère accessoire', "Le cautionnement dépend d'un contrat principal et suppose une obligation principale valable, certaine et existante."],
      ],
      mecanismes: [
        "Conditions de droit commun des contrats adaptées + formalisme strict.",
        "Le cautionnement s'étend de plein droit aux intérêts et accessoires, sauf clause contraire.",
        "Plafond : jamais plus que la dette principale, ni à des conditions plus onéreuses.",
      ],
      conditions: [
        "Capacité : majeure, non protégée ; solvabilité (capacité financière de payer).",
        "Consentement exprès, libre et éclairé.",
        "Obligation principale valable.",
        "Écrit ; identité du débiteur principal ; dette garantie déterminée ou déterminable.",
        "Caution personne physique : mention de l'engagement et du plafond en lettres et en chiffres.",
        "Cautionnement solidaire : mention de renonciation aux bénéfices de discussion et de division.",
      ],
      exceptions: [
        "Tuteur : ne peut jamais, même autorisé, porter caution au nom du majeur protégé pour la dette d'un tiers.",
        "Époux seul : biens propres et revenus seulement ; biens propres du conjoint seulement avec son consentement exprès ou en cas d'engagement conjoint.",
        "Mention solidaire absente : pas de nullité, requalification en simple.",
      ],
      distinctions: [
        "Mise en garde (risque lié au débiteur) → déchéance à hauteur du préjudice ≠ disproportion (biens et revenus de la caution) → réduction.",
        "Lettres ≠ chiffres : les lettres prévalent.",
      ],
      references: ["Art. 2291 C. civ. selon le cours (mention) — numéro à vérifier."],
      exemples: [
        "Débiteur au SMIC empruntant 600 000 € : la banque doit mettre en garde la caution.",
        "« Bon pour caution de… » en lettres et en chiffres.",
        "Prêt (principal) / cautionnement (accessoire) ; bail (principal) / cautionnement (accessoire).",
        "Garant fournissant les mêmes justificatifs que le locataire.",
      ],
    },
    express: [
      "Fond : capacité + solvabilité, consentement éclairé, obligation principale valable.",
      "Forme : écrit + identité du débiteur + dette + mention lettres/chiffres → sinon nullité.",
      "Mention solidaire manquante → simple, pas nul.",
      "Créancier pro : mise en garde (déchéance à hauteur du préjudice) ; disproportion (réduction).",
      "Plafond : jamais plus que la dette ; intérêts et accessoires inclus sauf clause contraire.",
    ],
  },
  {
    ch: 'c4',
    complete: {
      definitions: [
        ['Exceptions opposables', "Moyens du débiteur que la caution peut invoquer contre le créancier : liés à la dette (inexécution) ou personnels au débiteur (nullité pour dol)."],
      ],
      mecanismes: [
        "Information annuelle : avant le 31 mars, montant restant dû au 31 décembre précédent.",
        "Information incident : dès le premier incident non régularisé dans le mois suivant l'exigibilité (caution personne physique).",
        "Mise en jeu : dette exigible et impayée ; simple → débiteur d'abord ; solidaire → directement la caution, pour le tout.",
        "Recours : contre le débiteur (sommes + frais) ; contre les autres cautions (quote-part, à proportion des engagements).",
        "Extinction : paiement par le débiteur ou par la caution.",
      ],
      conditions: [
        "Obligations d'information à la charge du créancier professionnel.",
        "Minimum de ressources = montant du RSA (caution personne physique).",
      ],
      exceptions: [
        "La caution ne peut pas invoquer les mesures accordées au débiteur en raison de sa défaillance (procédure collective).",
      ],
      distinctions: [
        "Sanction information annuelle : intérêts et pénalités entre la dernière et la nouvelle information ≠ sanction incident : entre l'incident et l'information.",
      ],
      references: ["Art. 2312 C. civ. (recours entre cautions)."],
      exemples: [
        "Caution solidaire à 20 % qui paie tout : recours contre le débiteur et contre chaque autre caution.",
      ],
    },
    express: [
      "Info annuelle avant 31/03 (dette au 31/12) ; info incident (non régularisé sous 1 mois).",
      "Manquement → perte des intérêts et pénalités de la période.",
      "Exceptions opposables : inexécution, dol. Pas la procédure collective.",
      "Minimum RSA.",
      "Recours : débiteur (sommes + frais), autres cautions (quote-part).",
      "Fin : paiement par le débiteur ou par la caution.",
    ],
  },
  {
    ch: 'c5',
    complete: {
      definitions: [
        ['Sûreté réelle', "Affectation d'un bien ou d'un ensemble de biens, présents ou futurs, au paiement d'une dette."],
        ['Constituant', "Celui qui accorde la garantie sur un bien : le débiteur ou un tiers."],
        ['Créancier chirographaire', "Créancier ordinaire, sans sûreté."],
      ],
      mecanismes: [
        "Droit préférentiel, voire exclusif : payé en priorité sur le prix de vente du bien.",
      ],
      conditions: ["Le constituant doit être propriétaire du bien."],
      distinctions: [
        "Meuble corporel → gage ; meuble incorporel → nantissement ; immeuble → hypothèque.",
      ],
      exemples: [
        "Un locataire ne peut pas hypothéquer l'appartement qu'il loue.",
        "Immeuble de 200 000 €, créance garantie de 198 000 € : les chirographaires se partagent 2 000 €.",
      ],
    },
    express: [
      "Bien affecté au paiement ; constituant = débiteur ou tiers, propriétaire.",
      "Gage (corporel) / nantissement (incorporel) / hypothèque (immeuble).",
      "Préférence sur le prix de vente, avant les chirographaires.",
    ],
  },
  {
    ch: 'c6',
    complete: {
      definitions: [
        ['Gage', "Sûreté réelle sur des biens meubles corporels, présents ou futurs, conférant un droit d'être payé par préférence."],
        ['Créancier gagiste', "Créancier bénéficiaire du gage."],
        ['Droit de rétention', "Conserver le bien gagé tant que la dette n'est pas intégralement payée (avec dépossession)."],
        ['Attribution judiciaire', "Le juge attribue la propriété du bien au créancier en paiement ; il peut le garder."],
        ['Droit de suite', "Rechercher le bien entre les mains du tiers acquéreur."],
      ],
      mecanismes: [
        "Avec dépossession : bien remis au créancier → opposable par la remise.",
        "Sans dépossession : bien conservé (interdiction de le vendre) → opposable par inscription au registre des sûretés mobilières, greffe du tribunal de commerce.",
        "Conservation du bien par celui qui le détient.",
        "Dette payée → restitution (avec) ou radiation (sans).",
      ],
      conditions: [
        "Écrit mentionnant, à peine de nullité : la dette (montant, date d'exigibilité) et le bien (nature, quantité).",
      ],
      exceptions: ["Un immeuble ne peut pas être gagé."],
      distinctions: [
        "Rétention (avec dépossession) ; droit de suite (notamment sans dépossession).",
      ],
      references: ["Art. 2333 C. civ."],
      exemples: [
        "Bijou chez un prêteur sur gage (avec dépossession).",
        "Véhicule ou matériel d'une société (sans dépossession).",
        "Bijou garantissant 1 000 € vendu 1 800 € → 800 € restitués.",
        "Voiture gagée revendue : le créancier la récupère chez l'acheteur négligent.",
      ],
    },
    express: [
      "Gage = meubles corporels ; écrit + dette + bien, à peine de nullité.",
      "Avec dépossession (remise) / sans (inscription au greffe du tribunal de commerce).",
      "Impayé : rétention, préférence (+ surplus), attribution judiciaire, suite.",
      "Payé : restitution ou radiation.",
    ],
  },
  {
    ch: 'c7',
    complete: {
      definitions: [
        ['Nantissement', "Affectation en garantie d'un bien meuble incorporel ou d'un ensemble de tels biens, présents ou futurs."],
        ['Bien meuble incorporel', "Bien immatériel qu'on ne peut ni toucher ni palper."],
      ],
      mecanismes: [
        "Conventionnel (contrat) ou judiciaire (ordonné par le juge à la demande du créancier impayé).",
        "Toujours sans dépossession → pas de droit de rétention.",
        "Impayé : vente ordonnée par le juge + préférence ; attribution judiciaire ; droit de suite ; paiement direct par le débiteur de la créance nantie.",
        "Surplus restitué ; fin quand la dette est intégralement payée.",
      ],
      conditions: [
        "Écrit (contrat ou décision de justice) ; désignation précise de la dette et du bien (nature, quantité).",
        "Fonds, parts, actions : inscription au registre spécial des sûretés, greffe du tribunal de commerce.",
        "Créance : notification au débiteur de la créance, ou intervention de celui-ci à l'acte.",
      ],
      distinctions: [
        "Gage (corporel, avec ou sans dépossession) ≠ nantissement (incorporel, toujours sans).",
        "Parts sociales (sociétés civiles, SARL) ≠ actions (SAS, SA).",
      ],
      references: ["Art. 2355 C. civ."],
      exemples: [
        "SAS valorisée 2 M€, prêt d'1 M€ : caution du dirigeant + nantissement de 50 % des actions.",
        "2 000 actions sur 10 000 = 20 % du capital.",
        "Créance de 50 000 € donnée en garantie à son propre créancier.",
        "Nantissement judiciaire du fonds de commerce d'un commerçant débiteur.",
      ],
    },
    express: [
      "Nantissement = incorporels : fonds de commerce, parts, actions, créance.",
      "Conventionnel ou judiciaire ; écrit ; dette et bien désignés.",
      "Opposabilité : greffe du tribunal de commerce ; créance → notification.",
      "Toujours sans dépossession, pas de rétention.",
      "Vente + préférence, attribution, suite, paiement direct (créance), surplus restitué.",
    ],
  },
  {
    ch: 'c8',
    complete: {
      definitions: [
        ['Hypothèque', "Affectation d'un bien immobilier dont on est propriétaire en garantie d'une obligation, sans dépossession."],
        ['Règle du rang', "Entre créanciers hypothécaires, l'ordre de paiement suit la date d'inscription au Service de la Publicité Foncière."],
      ],
      mecanismes: [
        "Le constituant garde l'usage et la possession de son bien.",
        "Opposabilité : inscription au Service de la Publicité Foncière (administration fiscale).",
        "Impayé : vente + préférence selon le rang ; attribution judiciaire ; surplus restitué au débiteur (ou aux autres créanciers inscrits) ; droit de suite.",
      ],
      conditions: [
        "Conventionnelle : acte notarié ; désignation du bien et de la créance.",
        "Judiciaire : autorisation préalable du juge.",
        "Saisie immobilière : titre exécutoire + commandement de payer par commissaire de justice + publication au SPF.",
      ],
      distinctions: [
        "Hypothèque légale (loi) / judiciaire (juge) / conventionnelle (contrat).",
      ],
      references: ["Art. 2385 C. civ."],
      exemples: [
        "Propriétaire qui continue d'habiter sa résidence principale hypothéquée.",
        "Administration fiscale exigeant une hypothèque sur la maison du cédant en échange d'un étalement de l'impôt sur la plus-value.",
      ],
    },
    express: [
      "Hypothèque = immeuble, sans dépossession.",
      "Légale / judiciaire / conventionnelle (acte notarié).",
      "SPF : opposabilité + rang chronologique.",
      "Saisie : titre exécutoire + commandement (commissaire de justice) + publication SPF.",
      "Préférence selon le rang, attribution, surplus, suite.",
    ],
  },
];

// Fiche générale : vision globale du programme
export const FICHE_GENERALE = [
  {
    title: 'Le plan du programme',
    items: [
      "Introduction : la sûreté sécurise le paiement d'une créance ; personnelles (une personne) / réelles (un bien) ; constitution conventionnelle ou judiciaire.",
      "Partie I — Le cautionnement : notion (3 acteurs) → formes (simple/solidaire, civil/commercial, défini/indéfini) → validité (fond et forme) → effets (information, mise en jeu, défenses, recours) → extinction.",
      "Partie II — Sûretés réelles : généralités (constituant propriétaire, droit de préférence) → gage (meubles corporels) → nantissement (meubles incorporels) → hypothèque (immeubles).",
    ],
  },
  {
    title: 'Le cautionnement en 8 réflexes',
    items: [
      "Qualifier : simple ou solidaire ? civil ou commercial ? défini ou indéfini ? caution personne physique ? créancier professionnel ?",
      "Vérifier la forme : écrit, identité du débiteur, dette garantie, mention en lettres et en chiffres → sinon nullité.",
      "Mention solidaire absente → cautionnement simple.",
      "Créancier professionnel : mise en garde (déchéance à hauteur du préjudice) et proportionnalité (réduction).",
      "Plafond : pas plus que la dette principale ; intérêts et accessoires inclus sauf clause contraire.",
      "Informations : annuelle (avant le 31 mars) et en cas d'incident (non régularisé dans le mois) → sinon perte des intérêts et pénalités.",
      "Défenses : discussion et division (simple) ; exceptions du débiteur (inexécution, dol), mais pas la procédure collective ; minimum RSA.",
      "Après paiement : recours contre le débiteur et contre les autres cautions ; le cautionnement s'éteint.",
    ],
  },
  {
    title: 'Les sûretés réelles en 6 réflexes',
    items: [
      "Identifier le bien : corporel (gage), incorporel (nantissement), immeuble (hypothèque).",
      "Le constituant est-il propriétaire ? Sinon, pas de sûreté réelle.",
      "Forme : écrit (gage, nantissement), acte notarié (hypothèque conventionnelle), juge (nantissement et hypothèque judiciaires).",
      "Opposabilité : remise du bien ou registre du greffe du tribunal de commerce (gage) ; greffe ou notification (nantissement) ; Service de la Publicité Foncière (hypothèque, rang).",
      "Impayé : préférence sur le prix (surplus restitué), attribution judiciaire, droit de suite ; rétention seulement pour le gage avec dépossession.",
      "Hypothèque : saisie immobilière = titre exécutoire + commandement de payer + publication au SPF.",
    ],
  },
];
