// Banque de cas pratiques. La réponse modèle rédigée est l'enchaînement des 5 étapes
// (qualification → problème → règle → application → conclusion), chacune rédigée en phrases complètes.
// indispensables : éléments qu'une bonne réponse doit contenir (servent aussi de grille d'auto-évaluation).

export const CAS = [
  // ═══════════════════════════ NIVEAU FACILE
  {
    id: 'cp1', level: 1, title: 'Le studio de Léna', chapters: ['c1', 'c2', 'c3'],
    enonce: `<p>Léna, 19 ans, étudiante en BUT à Rennes, loue un studio à M. Garnier, retraité qui possède trois appartements. Le loyer est de 520 € par mois. M. Garnier a exigé un garant : le père de Léna, Philippe, professeur des écoles, a signé un acte écrit de cautionnement. Sur l'acte, Philippe a écrit de sa main : « Bon pour caution de cinq mille euros (50 000 €) », avant de signer. L'acte mentionne bien l'identité de Léna et le bail garanti. Rien n'est précisé sur la solidarité.</p>
<p>Après quatre mois sans payer, Léna doit 2 080 € de loyers. M. Garnier, pressé, adresse directement une lettre à Philippe pour lui réclamer cette somme, sans avoir rien demandé à Léna. Philippe vous consulte.</p>`,
    questions: [
      {
        q: "Qualifiez l'opération et identifiez le rôle de chacun.", ch: ['c1', 'c0'],
        qualification: "Philippe s'est engagé, par un acte écrit, à payer la dette de loyers de Léna envers M. Garnier si elle ne paie pas. Il s'agit d'un cautionnement, c'est-à-dire d'une sûreté personnelle.",
        probleme: "Il s'agit de déterminer la nature de l'engagement de Philippe et la place de chacun dans l'opération.",
        regle: "Le cautionnement est le contrat par lequel une personne, la caution, s'oblige envers le créancier à payer la dette en cas de défaillance du débiteur principal. C'est une sûreté personnelle, qui repose sur l'engagement d'une personne aux côtés du débiteur. Le contrat est conclu entre le créancier et la caution, mais l'opération est tripartite : créancier, débiteur principal, caution (débiteur accessoire). Le cautionnement est un contrat accessoire : il garantit une obligation principale, ici celle née du bail.",
        application: "En l'espèce, M. Garnier, bailleur, est le créancier ; Léna, locataire tenue de payer son loyer, est le débiteur principal ; Philippe est la caution. Le bail d'habitation est le contrat principal ; l'acte de cautionnement est le contrat accessoire qui garantit le paiement des loyers impayés.",
        conclusion: "Par conséquent, Philippe est la caution de Léna dans un cautionnement conclu avec M. Garnier, garantissant la dette de loyers née du bail.",
        indispensables: ["Qualifier de cautionnement (sûreté personnelle)", "Identifier créancier / débiteur principal / caution", "Mentionner le caractère accessoire (bail = contrat principal)"],
        erreurs: ["Dire que Léna est partie au contrat de cautionnement (il est conclu entre le créancier et la caution).", "Parler de sûreté réelle : aucun bien n'est affecté."],
      },
      {
        q: "Philippe a écrit « cinq mille euros » en lettres mais « 50 000 € » en chiffres. Dans quelle limite est-il engagé ?", ch: ['c3'],
        qualification: "Philippe est une caution personne physique ; la mention qu'il a portée sur l'acte comporte une divergence entre le montant en lettres et le montant en chiffres.",
        probleme: "La question est de savoir quel montant retenir lorsque la mention manuscrite d'une caution personne physique comporte une différence entre la somme en lettres et la somme en chiffres.",
        regle: "La caution personne physique doit apposer elle-même sur l'acte une mention indiquant qu'elle s'engage à payer la dette du débiteur en cas de défaillance, dans la limite d'un montant exprimé en toutes lettres et en chiffres. En cas de différence entre les deux, c'est la somme en lettres qui prévaut.",
        application: "En l'espèce, la mention existe bien : le cautionnement n'est donc pas nul pour défaut de mention. La somme en lettres est « cinq mille euros », la somme en chiffres « 50 000 € ». C'est la somme en lettres qui l'emporte.",
        conclusion: "Philippe est engagé dans la limite de 5 000 €. La dette actuelle de 2 080 € est couverte par ce plafond.",
        indispensables: ["Rappeler l'exigence de la mention en lettres et en chiffres (caution personne physique)", "Règle : les lettres prévalent", "Conclure à 5 000 €", "Constater que 2 080 € est dans la limite"],
        erreurs: ["Retenir 50 000 € ou « la plus favorable au créancier ».", "Conclure à la nullité : la mention est présente, seule la divergence est à régler."],
      },
      {
        q: "M. Garnier peut-il réclamer directement les 2 080 € à Philippe ?", ch: ['c2', 'c4'],
        qualification: "Philippe est un particulier qui se porte caution du bail de sa fille ; il n'est ni un établissement de crédit, ni un commerçant agissant pour son activité, et n'a pas d'intérêt patrimonial dans l'opération. Aucune solidarité n'a été stipulée : le cautionnement est civil et simple.",
        probleme: "La question est de savoir si le créancier peut poursuivre directement une caution simple sans avoir poursuivi au préalable le débiteur principal.",
        regle: "Par principe, tout cautionnement est civil, et le cautionnement civil est en principe simple. La caution simple bénéficie du bénéfice de discussion : elle peut exiger du créancier qu'il poursuive d'abord le débiteur principal sur ses biens. Le créancier doit alors démontrer que les poursuites engagées contre le débiteur n'ont pas permis d'obtenir le règlement. La caution ne peut, en tout état de cause, être poursuivie que si la dette est exigible et impayée.",
        application: "En l'espèce, la dette de loyers est exigible et impayée, mais M. Garnier n'a rien demandé à Léna avant de se tourner vers son père. Philippe, caution simple, peut lui opposer le bénéfice de discussion.",
        conclusion: "Par conséquent, M. Garnier ne peut pas, en l'état, exiger le paiement de Philippe : il doit d'abord poursuivre Léna. Philippe ne sera sollicité que pour ce qui resterait impayé, dans la limite de 5 000 €. En cas de litige, le tribunal judiciaire serait compétent, s'agissant d'un cautionnement civil.",
        indispensables: ["Qualifier le cautionnement de civil (principe)", "En déduire qu'il est simple", "Bénéfice de discussion : poursuivre d'abord le débiteur principal", "Conclure que M. Garnier doit d'abord agir contre Léna"],
        erreurs: ["Invoquer le bénéfice de division : il n'y a qu'une seule caution.", "Dire que le cautionnement est solidaire « parce que c'est un bail »."],
      },
    ],
  },
  {
    id: 'cp2', level: 1, title: 'Le bracelet de Mme Ferrand', chapters: ['c5', 'c6'],
    enonce: `<p>Mme Ferrand a besoin de 1 000 € pour réparer sa chaudière. Elle se rend chez un prêteur sur gage et lui remet son bracelet en or. Un acte écrit est signé : il précise que le prêt est de 1 000 €, remboursable au plus tard le 30 juin, et que la garantie porte sur « un bracelet en or 18 carats ». Le prêteur range le bracelet dans son coffre.</p>
<p>Le 30 juin arrive : Mme Ferrand ne peut pas rembourser. Elle demande à récupérer son bracelet « parce qu'il a une valeur sentimentale ». Le bracelet est finalement vendu aux enchères publiques pour 1 800 €.</p>`,
    questions: [
      {
        q: "Quelle sûreté a été constituée ? Est-elle valable et opposable aux tiers ?", ch: ['c5', 'c6'],
        qualification: "Mme Ferrand a affecté un bijou, bien meuble corporel, au remboursement de son prêt, en le remettant au créancier. Il s'agit d'une sûreté réelle : un gage avec dépossession.",
        probleme: "Il s'agit de déterminer la nature de la sûreté, puis de vérifier ses conditions de validité et d'opposabilité.",
        regle: "Le gage est une sûreté réelle portant exclusivement sur des biens meubles corporels ; il donne au créancier le droit d'être payé par préférence. L'acte doit être constaté par écrit et mentionner, à peine de nullité, la dette garantie (montant et date d'exigibilité) et le bien gagé (nature et quantité). Dans le gage avec dépossession, la remise matérielle du bien au créancier suffit à le rendre opposable aux tiers.",
        application: "En l'espèce, un bracelet est un meuble corporel. L'acte est écrit, mentionne le montant (1 000 €), la date d'exigibilité (30 juin) et le bien (un bracelet en or 18 carats, soit sa nature et sa quantité). Le bracelet a été remis au prêteur.",
        conclusion: "Il s'agit d'un gage avec dépossession, valable et opposable aux tiers par la remise du bracelet au créancier gagiste.",
        indispensables: ["Qualifier de gage (meuble corporel, sûreté réelle)", "Avec dépossession", "Vérifier écrit + dette (montant, exigibilité) + bien (nature, quantité)", "Opposabilité par la remise"],
        erreurs: ["Parler de nantissement (bien incorporel) ou d'hypothèque.", "Exiger une inscription au registre : elle concerne le gage sans dépossession."],
      },
      {
        q: "Mme Ferrand peut-elle récupérer son bracelet sans payer ? Quels droits a le prêteur ?", ch: ['c6'],
        qualification: "Le prêteur est créancier gagiste ; la dette n'a pas été payée à l'échéance du 30 juin.",
        probleme: "La question est de savoir quels droits le créancier gagiste peut exercer lorsque la dette n'est pas payée à l'échéance.",
        regle: "Si le débiteur ne paie pas à l'échéance, le gage ne s'éteint pas. Le créancier gagiste dispose d'un droit de rétention (gage avec dépossession) : il peut conserver le bien tant que la dette n'est pas intégralement payée. Il dispose aussi d'un droit de préférence (faire vendre le bien, généralement aux enchères publiques, et être payé en priorité sur le prix), de l'attribution judiciaire du bien en paiement et d'un droit de suite. La restitution du bien n'intervient qu'en cas de paiement intégral.",
        application: "En l'espèce, Mme Ferrand n'a pas payé. La valeur sentimentale du bracelet est sans incidence juridique. Le prêteur peut retenir le bracelet ; il a choisi de le faire vendre aux enchères publiques pour être payé en priorité.",
        conclusion: "Mme Ferrand ne peut pas exiger la restitution sans payer intégralement sa dette. Le prêteur peut retenir le bracelet, le faire vendre et se payer par préférence, ou demander au juge l'attribution judiciaire du bracelet.",
        indispensables: ["Le gage ne s'éteint pas en cas de non-paiement", "Droit de rétention (avec dépossession)", "Droit de préférence par la vente", "Mentionner l'attribution judiciaire (et le droit de suite)"],
        erreurs: ["Faire jouer la valeur sentimentale.", "Oublier le droit de rétention, propre au gage avec dépossession."],
      },
      {
        q: "Comment répartir les 1 800 € obtenus lors de la vente ?", ch: ['c6'],
        qualification: "Le bien gagé a été vendu pour un prix supérieur à la dette garantie.",
        probleme: "Il s'agit de savoir ce que devient le surplus lorsque le prix de vente du bien gagé excède la dette garantie.",
        regle: "Le créancier gagiste est payé en priorité sur le prix de vente. Si ce prix dépasse le montant de la dette, il a l'obligation de restituer le surplus au constituant.",
        application: "En l'espèce, la dette est de 1 000 € et le prix de vente de 1 800 €. Le prêteur se paie 1 000 € ; il reste 800 €.",
        conclusion: "Le prêteur conserve 1 000 € et doit restituer 800 € à Mme Ferrand.",
        indispensables: ["Paiement prioritaire de 1 000 €", "Obligation de restituer le surplus", "Calcul : 800 € à Mme Ferrand"],
        erreurs: ["Laisser le surplus au créancier.", "Oublier de faire le calcul."],
      },
    ],
  },
  {
    id: 'cp3', level: 1, title: 'La maison des Morel', chapters: ['c5', 'c8'],
    enonce: `<p>M. et Mme Morel sont propriétaires de leur maison à Chartres, estimée à 300 000 €. Pour financer l'agrandissement de leur entreprise artisanale, ils empruntent 120 000 € à la banque Alpha. La banque exige une hypothèque sur la maison. Les époux s'inquiètent : « Allons-nous devoir déménager ? » et proposent de « signer simplement un papier entre nous ».</p>
<p>Deux ans plus tard, ils empruntent 60 000 € à la banque Bêta, qui prend elle aussi une hypothèque sur la maison. Bêta a fait inscrire son hypothèque au Service de la Publicité Foncière le 3 mars 2025 ; Alpha, négligente, n'a fait inscrire la sienne que le 15 septembre 2025.</p>`,
    questions: [
      {
        q: "Les Morel devront-ils quitter leur maison ? Sous quelle forme l'hypothèque doit-elle être constituée ?", ch: ['c8'],
        qualification: "Les époux affectent leur maison, immeuble dont ils sont propriétaires, au remboursement d'un prêt, par accord avec la banque : c'est une hypothèque conventionnelle.",
        probleme: "La question est de savoir si l'hypothèque prive le constituant de la jouissance de son bien, et quelles formes doivent être respectées.",
        regle: "L'hypothèque est une sûreté réelle qui affecte un bien immobilier dont on est propriétaire en garantie d'une obligation, sans dépossession : le constituant conserve l'usage et la possession du bien. L'hypothèque conventionnelle doit obligatoirement être constatée par un acte notarié, qui désigne précisément le bien hypothéqué et la créance garantie.",
        application: "En l'espèce, les Morel sont propriétaires de la maison : ils peuvent l'hypothéquer. L'hypothèque étant sans dépossession, ils continueront à y habiter. En revanche, un simple « papier entre nous » ne suffit pas : l'acte doit être établi devant notaire et désigner la maison et la créance de 120 000 €.",
        conclusion: "Les Morel n'auront pas à déménager, mais l'hypothèque conventionnelle devra être constatée par un acte notarié désignant la maison et la créance garantie.",
        indispensables: ["Qualifier d'hypothèque conventionnelle", "Sans dépossession → ils gardent la maison", "Acte notarié obligatoire", "Mentions : bien + créance"],
        erreurs: ["Dire qu'un écrit simple suffit.", "Confondre avec le gage avec dépossession."],
      },
      {
        q: "La maison est vendue 150 000 € à la suite d'une saisie. Dans quel ordre Alpha et Bêta seront-elles payées ?", ch: ['c8'],
        qualification: "Deux créanciers hypothécaires sont inscrits sur le même immeuble à des dates différentes.",
        probleme: "La question est de savoir comment se règle le paiement entre plusieurs créanciers hypothécaires inscrits sur un même bien.",
        regle: "L'hypothèque doit être inscrite au Service de la Publicité Foncière pour être opposable aux tiers. Un même bien peut être hypothéqué au profit de plusieurs créanciers ; la date d'inscription détermine l'ordre de paiement : le créancier inscrit en premier est payé en priorité, les suivants selon l'ordre chronologique (règle du rang).",
        application: "En l'espèce, Bêta a été inscrite le 3 mars 2025 et Alpha le 15 septembre 2025. Peu importe qu'Alpha ait prêté en premier : seule la date d'inscription compte. Sur les 150 000 €, Bêta est payée en premier de ses 60 000 € (en supposant la créance intégralement due) ; il reste 90 000 € pour Alpha, dont la créance est de 120 000 € (montant initial, sous réserve des remboursements déjà effectués).",
        conclusion: "Bêta est payée en premier, Alpha ensuite. Alpha risque de ne pas être intégralement remboursée : sa négligence dans l'inscription lui fait perdre le premier rang.",
        indispensables: ["Inscription au SPF = opposabilité", "Règle du rang : date d'inscription", "Bêta avant Alpha malgré l'antériorité du prêt", "Calcul avec les chiffres"],
        erreurs: ["Classer selon la date du prêt.", "Répartir au prorata."],
      },
    ],
  },

  // ═══════════════════════════ NIVEAU INTERMÉDIAIRE
  {
    id: 'cp4', level: 2, title: 'La boulangerie de Karim', chapters: ['c2', 'c3', 'c4'],
    enonce: `<p>En janvier 2023, Karim, artisan boulanger, emprunte 80 000 € à la banque Crédit Rive pour acheter un four. Sa sœur Nadia, infirmière, se porte caution. L'acte écrit indique l'identité de Karim, la dette garantie et comporte la mention manuscrite de Nadia : « je m'engage à payer la dette de Karim en cas de défaillance de sa part, dans la limite de quatre-vingt mille euros (80 000 €) ». L'acte stipule que le cautionnement est « solidaire », mais ne contient aucune autre mention.</p>
<p>Depuis la signature, la banque n'a jamais envoyé la moindre information à Nadia. En février 2025, Karim cesse de payer. Une procédure collective est ouverte contre lui en avril 2025. En mai 2025, la banque réclame directement à Nadia 72 000 € de capital, plus les intérêts et pénalités depuis 2023.</p>
<p>Nadia vous demande : 1) si son cautionnement est valable ; 2) si la banque peut s'adresser directement à elle ; 3) si elle doit tous les intérêts ; 4) si la procédure collective de son frère la protège.</p>`,
    questions: [
      {
        q: "Le cautionnement de Nadia est-il valable ? Est-il simple ou solidaire ?", ch: ['c2', 'c3'],
        qualification: "Nadia, personne physique, s'est portée caution envers une banque, créancier professionnel. Elle n'est ni établissement de crédit ni commerçante pour son activité, et n'a pas d'intérêt patrimonial dans l'opération : le cautionnement est civil. L'acte stipule la solidarité, sans la mention spécifique.",
        probleme: "La question est de savoir si un cautionnement stipulé solidaire, mais dépourvu de la mention de renonciation aux bénéfices de discussion et de division, est valable, et sous quelle forme.",
        regle: "Le cautionnement doit être écrit et préciser, à peine de nullité, l'identité du débiteur principal et la dette garantie ; la caution personne physique doit apposer une mention de son engagement dans la limite d'un montant en lettres et en chiffres. En cas de cautionnement solidaire, elle doit en outre apposer une mention reconnaissant qu'elle ne peut exiger ni la poursuite préalable du débiteur, ni la division des poursuites. L'absence de cette mention spécifique n'entraîne pas la nullité : le cautionnement est requalifié en cautionnement simple.",
        application: "En l'espèce, l'acte est écrit, identifie Karim, précise la dette, et Nadia a porté la mention d'engagement avec un montant identique en lettres et en chiffres : les conditions de forme dont dépend la validité sont remplies. En revanche, la mention spécifique à la solidarité manque.",
        conclusion: "Le cautionnement de Nadia est valable, mais il est requalifié en cautionnement simple. Ce résultat est d'ailleurs conforme au principe selon lequel un cautionnement civil est simple.",
        indispensables: ["Vérifier les conditions de forme (écrit, identité, dette, mention lettres/chiffres)", "Constater l'absence de mention solidaire", "Sanction : requalification en cautionnement simple, pas nullité", "Qualifier le cautionnement de civil"],
        erreurs: ["Conclure à la nullité totale.", "Dire que le cautionnement est commercial parce que le créancier est une banque."],
      },
      {
        q: "La banque peut-elle réclamer le paiement directement à Nadia ?", ch: ['c2', 'c4'],
        qualification: "Nadia est caution simple (requalification).",
        probleme: "La question est de savoir si le créancier peut agir directement contre une caution simple.",
        regle: "La caution simple bénéficie du bénéfice de discussion : elle peut exiger que le créancier poursuive d'abord le débiteur principal sur ses biens ; le créancier doit démontrer que ces poursuites n'ont pas permis d'obtenir le règlement (insolvabilité). Elle ne paie alors que ce qui reste à solder.",
        application: "En l'espèce, la banque s'est adressée directement à Nadia. Celle-ci peut lui opposer le bénéfice de discussion. Comme il n'y a qu'une seule caution, le bénéfice de division est sans objet.",
        conclusion: "La banque ne peut pas exiger immédiatement le paiement de Nadia : elle doit d'abord poursuivre Karim et justifier que ces poursuites n'ont pas permis d'obtenir le paiement.",
        indispensables: ["Bénéfice de discussion", "Charge pour le créancier de prouver les poursuites infructueuses / l'insolvabilité", "Division sans objet (une seule caution)"],
        erreurs: ["Raisonner comme si le cautionnement était solidaire.", "Invoquer le bénéfice de division."],
      },
      {
        q: "Nadia doit-elle les intérêts et pénalités réclamés depuis 2023 ?", ch: ['c4'],
        qualification: "La banque, créancier professionnel, n'a jamais informé la caution personne physique, ni chaque année ni lors de l'incident de paiement de février 2025.",
        probleme: "La question est de savoir quelles sont les conséquences du manquement du créancier professionnel à ses obligations d'information envers la caution.",
        regle: "Le créancier professionnel doit informer la caution chaque année, avant le 31 mars, du montant de la dette restant due au 31 décembre précédent ; à défaut, il est déchu du droit de réclamer les intérêts et pénalités échus entre la dernière information et la communication de la nouvelle. Il doit aussi informer la caution personne physique dès le premier incident de paiement non régularisé dans le mois suivant son exigibilité ; à défaut, il ne peut réclamer les intérêts et pénalités échus entre l'incident et l'information.",
        application: "En l'espèce, aucune information annuelle n'a été donnée (ni avant le 31 mars 2024, ni avant le 31 mars 2025), et l'incident de février 2025 n'a pas été signalé. La banque est donc déchue des intérêts et pénalités échus depuis la conclusion du contrat jusqu'à ce qu'elle informe Nadia. La sanction ne porte que sur les intérêts et pénalités : le capital de 72 000 € reste garanti.",
        conclusion: "Nadia ne doit pas les intérêts et pénalités réclamés pour la période sans information ; elle reste tenue du capital, dans les limites de son engagement et sous réserve du bénéfice de discussion.",
        indispensables: ["Information annuelle (31 mars / 31 décembre)", "Information en cas d'incident", "Sanction limitée aux intérêts et pénalités", "Le capital reste dû"],
        erreurs: ["Annoncer la libération totale de la caution.", "Oublier l'une des deux obligations."],
      },
      {
        q: "Nadia peut-elle invoquer la procédure collective de Karim pour refuser de payer ?", ch: ['c4'],
        qualification: "Le débiteur principal fait l'objet d'une procédure collective ; la caution veut s'en prévaloir.",
        probleme: "La question est de savoir si la caution peut invoquer les mesures dont bénéficie le débiteur en raison de sa défaillance.",
        regle: "La caution peut opposer au créancier toutes les exceptions au paiement dont dispose le débiteur, qu'elles soient liées à la dette (inexécution du contrat par le créancier) ou personnelles au débiteur (nullité pour dol). En revanche, elle ne peut pas se prévaloir des mesures accordées au débiteur en raison de sa défaillance, telle une procédure collective. La caution personne physique conserve un minimum de ressources égal au RSA.",
        application: "En l'espèce, la procédure collective ouverte contre Karim est une mesure liée à sa défaillance : c'est précisément le risque que Nadia a accepté de garantir. Elle ne peut donc pas l'invoquer. Aucun fait ne révèle d'exception liée à la dette (le four semble avoir été financé).",
        conclusion: "Nadia ne peut pas invoquer la procédure collective de son frère. Elle pourra toutefois conserver un minimum de ressources égal au RSA et, si elle paie, exercer un recours contre Karim pour les sommes versées et les frais.",
        indispensables: ["Exceptions opposables (liées à la dette / personnelles au débiteur)", "Limite : pas les mesures liées à la défaillance (procédure collective)", "Conclusion négative", "Bonus : minimum RSA, recours contre Karim"],
        erreurs: ["Penser que la procédure collective libère la caution."],
      },
    ],
  },
  {
    id: 'cp5', level: 2, title: 'Le food truck de Chloé', chapters: ['c6', 'c5'],
    enonce: `<p>Chloé exploite un food truck sous la forme d'une petite société. Pour obtenir un crédit de 30 000 €, sa société consent à la banque un gage sur le camion, que Chloé continue évidemment à utiliser chaque jour. L'acte écrit précise le montant de la dette, sa date d'exigibilité et désigne le camion. Le gage est inscrit sur le registre des sûretés au greffe du tribunal de commerce.</p>
<p>Six mois plus tard, la société consent à un fournisseur un second gage sur sa friteuse professionnelle et sa plancha. L'acte écrit indique les deux appareils et le montant de la dette (8 000 €), mais rien sur la date d'exigibilité.</p>
<p>Chloé, en difficulté, cesse d'entretenir le camion, qui rouille sous la pluie, puis le vend 18 000 € à Hugo, qui n'a consulté aucun registre. La dette envers la banque n'est pas payée à l'échéance.</p>`,
    questions: [
      {
        q: "Qualifiez les deux sûretés. Le gage consenti au fournisseur est-il valable ?", ch: ['c6'],
        qualification: "Le camion, la friteuse et la plancha sont des biens meubles corporels affectés au paiement de dettes : ce sont des gages. Le constituant (la société) conserve les biens : ce sont des gages sans dépossession.",
        probleme: "La question est de savoir si un gage dont l'acte ne précise pas la date d'exigibilité de la dette garantie est valable.",
        regle: "Le gage est une sûreté réelle sur des meubles corporels. L'acte doit être constaté par écrit et mentionner, à peine de nullité, la dette garantie (son montant et sa date d'exigibilité) et le bien gagé (sa nature et sa quantité).",
        application: "En l'espèce, le gage du camion comporte toutes les mentions. Celui du fournisseur indique les biens et le montant, mais pas la date d'exigibilité.",
        conclusion: "Les deux sûretés sont des gages sans dépossession. Celui de la banque est valable ; celui du fournisseur encourt la nullité faute de mention de la date d'exigibilité.",
        indispensables: ["Gages sans dépossession sur meubles corporels", "Mentions à peine de nullité : montant + date d'exigibilité + nature + quantité", "Nullité du second gage"],
        erreurs: ["Qualifier de nantissement.", "Oublier la date d'exigibilité dans les mentions."],
      },
      {
        q: "La société a laissé le camion se dégrader. Avait-elle une obligation à cet égard ?", ch: ['c6'],
        qualification: "Dans un gage sans dépossession, le bien reste chez le constituant.",
        probleme: "La question est de savoir sur qui pèse l'obligation de conservation du bien gagé avant l'échéance.",
        regle: "Quelle que soit la forme du gage, celui qui détient le bien a une obligation de conservation. Dans le gage sans dépossession, c'est le constituant qui doit conserver le bien et en préserver la valeur, en s'abstenant de tout acte susceptible de la diminuer.",
        application: "En l'espèce, la société a conservé le camion ; en cessant de l'entretenir et en le laissant rouiller, elle a diminué sa valeur, alors qu'elle devait la préserver.",
        conclusion: "Oui : la société, constituant d'un gage sans dépossession, manquait à son obligation de conservation et de préservation de la valeur du camion.",
        indispensables: ["Obligation de conservation pèse sur le détenteur", "Sans dépossession → constituant", "Préserver la valeur, s'abstenir d'actes qui la diminuent"],
        erreurs: ["Mettre l'obligation à la charge de la banque."],
      },
      {
        q: "La banque peut-elle agir contre Hugo, qui a acheté le camion ?", ch: ['c6'],
        qualification: "Le bien gagé sans dépossession, inscrit au registre, a été vendu à un tiers sans que la dette soit payée.",
        probleme: "La question est de savoir si le créancier gagiste peut exercer ses droits sur le bien gagé entre les mains d'un tiers acquéreur.",
        regle: "Le gage sans dépossession est opposable aux tiers lorsqu'il est inscrit sur le registre spécial des sûretés au greffe du tribunal de commerce ; ce registre permet à tout acheteur potentiel de vérifier si un véhicule est gagé. Le constituant a l'interdiction de vendre le bien. En cas de non-paiement, le créancier gagiste dispose d'un droit de suite : il peut rechercher le bien entre les mains du tiers acquéreur.",
        application: "En l'espèce, le gage a été inscrit : il est opposable à Hugo, qui aurait pu le découvrir en consultant le registre. La société n'avait pas le droit de vendre le camion. La dette n'est pas payée à l'échéance.",
        conclusion: "La banque peut récupérer le camion entre les mains d'Hugo grâce à son droit de suite, puis le faire vendre pour être payée par préférence (en restituant un éventuel surplus) ou en demander l'attribution judiciaire. Hugo, acheteur négligent, devra se retourner contre la société venderesse.",
        indispensables: ["Opposabilité par inscription au greffe", "Interdiction de vendre", "Droit de suite contre le tiers acquéreur", "Recours d'Hugo contre le vendeur"],
        erreurs: ["Dire qu'Hugo est protégé parce qu'il ignorait le gage.", "Invoquer un droit de rétention : la banque ne détient pas le camion."],
      },
    ],
  },
  {
    id: 'cp6', level: 2, title: 'Les parts de la SARL Vigne & Co', chapters: ['c7'],
    enonce: `<p>Bastien détient 600 des 1 000 parts sociales de la SARL Vigne & Co, caviste à Bordeaux. Pour financer un achat de stock, il emprunte personnellement 150 000 € à la banque Ouest Crédit, qui exige un nantissement sur 300 de ses parts. L'acte écrit désigne la dette garantie et « des parts sociales de la SARL Vigne & Co ».</p>
<p>Par ailleurs, Bastien est créancier de son ami Yanis, qui lui doit 20 000 €. Pour garantir une autre dette envers son fournisseur, Bastien lui nantit cette créance, sans en informer Yanis.</p>
<p>Un an plus tard, Bastien souhaite vendre ses parts à un investisseur, qui demande un audit. Bastien ne rembourse pas Ouest Crédit à l'échéance ; la banque déclare vouloir « garder les parts dans son coffre jusqu'au paiement ».</p>`,
    questions: [
      {
        q: "Qualifiez la sûreté consentie à Ouest Crédit et vérifiez sa validité.", ch: ['c7'],
        qualification: "Des parts sociales de SARL sont des biens meubles incorporels ; leur affectation en garantie d'une dette est un nantissement conventionnel.",
        probleme: "La question est de savoir si un acte de nantissement qui ne précise pas la quantité de parts nanties respecte les conditions de forme.",
        regle: "Le nantissement est une sûreté réelle qui affecte en garantie un bien meuble incorporel (fonds de commerce, parts sociales, actions, créance). Il doit être établi par écrit et contenir la désignation précise de la dette garantie et la désignation précise du bien nanti, indiquant sa nature et, le cas échéant, sa quantité.",
        application: "En l'espèce, l'acte est écrit et désigne la dette. Il indique la nature du bien (parts sociales de la SARL Vigne & Co) mais pas la quantité, alors que seules 300 parts sur les 600 de Bastien devaient être nanties.",
        conclusion: "Il s'agit d'un nantissement conventionnel de parts sociales. La désignation du bien est insuffisante faute de quantité : l'acte ne respecte pas l'exigence de désignation précise, ce qui compromet la validité du nantissement ; la banque aurait dû faire préciser « 300 parts sociales sur les 1 000 composant le capital (30 % du capital) ».",
        indispensables: ["Parts sociales = meubles incorporels → nantissement", "Conventionnel", "Écrit + désignation précise de la dette et du bien (nature et quantité)", "Relever l'absence de quantité"],
        erreurs: ["Parler de gage.", "Ne pas exploiter l'absence de quantité."],
      },
      {
        q: "Comment rendre ces nantissements opposables ? Quelle conséquence pour la vente des parts ?", ch: ['c7'],
        qualification: "Deux nantissements : l'un sur des parts sociales, l'autre sur une créance de somme d'argent.",
        probleme: "La question est de savoir quelles formalités rendent opposables aux tiers un nantissement de parts sociales et un nantissement de créance.",
        regle: "Le nantissement de fonds de commerce, de parts sociales ou d'actions doit faire l'objet d'une inscription sur le registre spécial des sûretés au greffe du tribunal de commerce, qui le rend visible et opposable aux tiers ; un acquéreur qui lève un état des nantissements constatera que les titres sont figés et incessibles tant que la dette n'est pas soldée. Le nantissement de créance doit être notifié au débiteur de la créance nantie ; à défaut, celui-ci doit intervenir à l'acte pour l'accepter.",
        application: "En l'espèce, la banque doit faire inscrire son nantissement au greffe. L'investisseur, lors de l'audit, découvrira alors que les parts nanties sont figées et incessibles tant que Bastien n'a pas remboursé. Quant à la créance sur Yanis, Bastien ne l'a pas informé : faute de notification, et Yanis n'étant pas intervenu à l'acte, le nantissement ne lui est pas opposable.",
        conclusion: "Inscription au greffe du tribunal de commerce pour les parts (qui bloque leur cession tant que la dette n'est pas soldée) ; notification à Yanis pour la créance, sans quoi le nantissement ne lui est pas opposable.",
        indispensables: ["Parts : inscription au registre du greffe", "Effet : titres figés et incessibles, découverts par l'état des nantissements", "Créance : notification ou intervention du débiteur à l'acte", "Conséquence de l'absence de notification"],
        erreurs: ["Renvoyer au Service de la Publicité Foncière.", "Oublier le cas de la créance."],
      },
      {
        q: "La banque peut-elle « garder les parts dans son coffre » ? Quels sont ses droits à défaut de paiement ?", ch: ['c7'],
        qualification: "Bastien ne paie pas à l'échéance ; le créancier nanti revendique une forme de rétention.",
        probleme: "La question est de savoir si le créancier nanti dispose d'un droit de rétention et quelles prérogatives il peut exercer à défaut de paiement.",
        regle: "Le nantissement s'opère toujours sans dépossession : le bien reste entre les mains du constituant, et le créancier nanti ne dispose donc pas de droit de rétention. À défaut de paiement, il peut demander au juge d'ordonner la vente du bien et exercer son droit de préférence, demander l'attribution judiciaire du bien, et exercer un droit de suite si le bien a été cédé. Il doit restituer le surplus éventuel.",
        application: "En l'espèce, les parts restent à Bastien ; la banque ne peut prétendre les « garder dans son coffre ». Elle peut en revanche demander au juge la vente des parts nanties et se payer en priorité sur le prix, ou en demander l'attribution judiciaire, en restituant à Bastien tout ce qui excède les 150 000 € dus.",
        conclusion: "Non, la banque n'a pas de droit de rétention. Elle peut faire ordonner la vente des parts (préférence) ou s'en faire attribuer la propriété par le juge, avec restitution du surplus ; et si Bastien cédait les parts, elle pourrait exercer son droit de suite.",
        indispensables: ["Nantissement toujours sans dépossession", "Pas de droit de rétention", "Vente ordonnée par le juge + préférence", "Attribution judiciaire, droit de suite, surplus"],
        erreurs: ["Reconnaître un droit de rétention au créancier nanti."],
      },
    ],
  },

  // ═══════════════════════════ NIVEAU DIFFICILE
  {
    id: 'cp7', level: 3, title: 'Le prêt de la SAS Novatek', chapters: ['c2', 'c3', 'c4', 'c7', 'c9'],
    enonce: `<p>La SAS Novatek, start-up valorisée 2 000 000 €, emprunte 1 000 000 € à la Banque Nationale du Commerce (BNC). La BNC exige trois garanties :</p>
<ul>
<li>la caution solidaire de Julien, président et actionnaire majoritaire de Novatek, dans la limite de 1 000 000 € ; l'acte comporte toutes les mentions requises, y compris celle relative à la solidarité ;</li>
<li>la caution solidaire de Marine, amie d'enfance de Julien, aide-soignante payée au SMIC, locataire de son appartement et sans épargne, dans la limite de 300 000 € ; la banque ne lui a donné aucune explication sur les risques, alors qu'elle savait que la société n'avait encore aucun chiffre d'affaires ;</li>
<li>le nantissement de 50 % des actions de Novatek détenues par Julien, inscrit au greffe du tribunal de commerce.</li>
</ul>
<p>Julien est marié ; son épouse Claire est seule propriétaire d'un appartement qu'elle a reçu de ses parents. Claire n'a rien signé.</p>
<p>Novatek ne rembourse plus. La BNC assigne Julien et Marine devant le tribunal judiciaire et annonce qu'elle fera saisir l'appartement de Claire.</p>`,
    questions: [
      {
        q: "Quelle est la nature du cautionnement de Julien ? Le tribunal saisi est-il le bon ?", ch: ['c2'],
        qualification: "Julien, président et actionnaire majoritaire, se porte caution de la dette de sa société : il a un intérêt patrimonial dans l'opération garantie.",
        probleme: "La question est de savoir si le cautionnement donné par le dirigeant actionnaire de la société débitrice est civil ou commercial, et quelle juridiction est compétente.",
        regle: "Par principe, le cautionnement est civil, simple, et relève du tribunal judiciaire. Il devient commercial lorsqu'il est accompli dans un contexte commercial, notamment lorsque la caution possède un intérêt patrimonial dans l'opération commerciale garantie ; il est alors en principe solidaire et relève du tribunal de commerce.",
        application: "En l'espèce, Julien est actionnaire majoritaire de Novatek : le financement de la société sert son propre patrimoine. Son cautionnement est donc commercial ; il est d'ailleurs stipulé solidaire, avec la mention requise. Le litige le concernant relève du tribunal de commerce, et non du tribunal judiciaire.",
        conclusion: "Le cautionnement de Julien est commercial et solidaire. La BNC aurait dû saisir le tribunal de commerce pour l'action dirigée contre lui. Julien ne peut opposer ni le bénéfice de discussion ni celui de division.",
        indispensables: ["Critère : intérêt patrimonial dans l'opération", "Cautionnement commercial → solidaire par principe", "Tribunal de commerce compétent", "Absence des bénéfices de discussion et de division"],
        erreurs: ["Conclure au cautionnement civil par principe sans examiner l'exception.", "Valider la saisine du tribunal judiciaire pour Julien."],
      },
      {
        q: "La BNC peut-elle faire saisir l'appartement de Claire ?", ch: ['c3'],
        qualification: "Julien, époux, s'est engagé seul comme caution ; l'appartement est un bien propre de son épouse, qui n'a pas consenti.",
        probleme: "La question est de savoir si l'époux qui se porte seul caution engage les biens propres de son conjoint.",
        regle: "Lorsqu'une personne mariée contracte seule un cautionnement, elle n'engage que ses biens propres et ses revenus ; elle ne peut pas engager les biens propres de son conjoint, sauf consentement exprès de celui-ci ou engagement souscrit conjointement par les deux époux.",
        application: "En l'espèce, l'appartement appartient en propre à Claire, qui n'a rien signé : il n'y a ni consentement exprès, ni engagement conjoint.",
        conclusion: "La BNC ne peut pas saisir l'appartement de Claire. Elle ne peut poursuivre que les biens propres et les revenus de Julien.",
        indispensables: ["Règle des époux", "Biens propres + revenus de l'époux engagé seulement", "Exceptions : consentement exprès / engagement conjoint", "Application : Claire n'a rien signé"],
        erreurs: ["Dire que le mariage engage automatiquement le conjoint."],
      },
      {
        q: "Marine peut-elle contester son engagement ?", ch: ['c3'],
        qualification: "Marine, caution personne physique, s'est engagée envers une banque, créancier professionnel. Son engagement (300 000 €) est sans rapport avec ses revenus (SMIC) et son patrimoine (aucun), et la banque ne l'a pas alertée alors que la société n'avait aucun chiffre d'affaires. Marine n'a aucun intérêt dans la société : son cautionnement est civil, bien que stipulé solidaire.",
        probleme: "La question est de savoir quelles protections bénéficient à une caution personne physique engagée envers un créancier professionnel, lorsque son engagement est disproportionné et qu'elle n'a pas été mise en garde.",
        regle: "Le créancier professionnel doit mettre en garde la caution personne physique sur tous les risques, notamment lorsque l'engagement du débiteur principal est inadapté à ses capacités financières ; à défaut, il peut être déchu de son droit contre la caution à hauteur du préjudice subi par celle-ci. Par ailleurs, si le créancier fait souscrire un engagement manifestement disproportionné aux biens et revenus de la caution, le cautionnement est réduit au montant que la caution pouvait raisonnablement garantir. Enfin, la caution personne physique conserve un minimum de ressources égal au RSA.",
        application: "En l'espèce, la BNC, qui savait que Novatek n'avait aucun chiffre d'affaires, n'a donné aucune explication à Marine : elle a manqué à son devoir de mise en garde, ce qui l'expose à une déchéance à hauteur du préjudice de Marine. En outre, un engagement de 300 000 € pour une personne au SMIC, locataire et sans épargne, est manifestement disproportionné : il doit être réduit au montant qu'elle pouvait raisonnablement garantir. En toute hypothèse, Marine conservera le minimum RSA.",
        conclusion: "Oui. Marine peut invoquer le manquement au devoir de mise en garde (déchéance de la banque à hauteur de son préjudice) et la disproportion manifeste (réduction de son engagement), et elle bénéficie du minimum RSA.",
        indispensables: ["Conditions : caution personne physique + créancier professionnel", "Mise en garde → déchéance à hauteur du préjudice", "Disproportion → réduction au montant raisonnable", "Application précise aux faits (SMIC, locataire, sans épargne, société sans CA)", "Bonus : minimum RSA"],
        erreurs: ["Conclure à la nullité du cautionnement.", "Confondre les deux sanctions."],
      },
      {
        q: "Que peut faire la BNC sur les actions nanties ? Peut-elle cumuler ces garanties ?", ch: ['c7', 'c9'],
        qualification: "Les actions de SAS sont des biens meubles incorporels ; leur nantissement, inscrit au greffe, est opposable aux tiers.",
        probleme: "La question est de savoir quelles prérogatives a le créancier nanti en cas de non-paiement, et si sûreté personnelle et sûreté réelle peuvent se cumuler.",
        regle: "Le nantissement d'actions est rendu opposable par inscription au registre des sûretés au greffe du tribunal de commerce. Il est toujours sans dépossession (pas de droit de rétention). À défaut de paiement, le créancier nanti peut demander au juge la vente des titres et être payé par préférence, ou l'attribution judiciaire ; il dispose d'un droit de suite et doit restituer le surplus. Le cours illustre précisément le cas d'une banque prêtant 1 000 000 € à une SAS valorisée 2 000 000 € et exigeant, en plus d'une caution personnelle du dirigeant, le nantissement de 50 % des actions.",
        application: "En l'espèce, le nantissement est inscrit, donc opposable. Novatek ne paie plus : la BNC peut demander la vente des actions nanties ou leur attribution judiciaire, ce qui lui permettrait de récupérer 50 % des actions. Elle cumule ainsi des sûretés personnelles (les cautions de Julien et Marine) et une sûreté réelle (le nantissement).",
        conclusion: "La BNC peut faire vendre les actions nanties ou se les faire attribuer, en restituant tout surplus ; le cumul d'une caution et d'un nantissement est possible, comme dans l'exemple du cours.",
        indispensables: ["Actions = incorporels, nantissement inscrit au greffe", "Pas de rétention", "Vente + préférence / attribution judiciaire / surplus", "Cumul sûreté personnelle + réelle"],
        erreurs: ["Parler de gage des actions.", "Accorder un droit de rétention."],
      },
    ],
  },
  {
    id: 'cp8', level: 3, title: 'Trois cautions pour le garage Lemoine', chapters: ['c2', 'c3', 'c4'],
    enonce: `<p>Le garage Lemoine emprunte 100 000 € à la banque Sud Finance. Trois personnes se portent caution, chacune dans un acte écrit régulier, avec mention manuscrite de son engagement et du montant :</p>
<ul>
<li>Alain, oncle du gérant, pour 50 % de la dette ; son acte stipule la solidarité et contient la mention de renonciation aux bénéfices de discussion et de division ;</li>
<li>Bérénice, voisine, pour 30 % ; son acte stipule la solidarité et contient la même mention ;</li>
<li>Cyril, ami d'enfance, pour 20 % ; son acte stipule la solidarité mais ne contient pas cette mention.</li>
</ul>
<p>Le contrat de prêt avait été obtenu par le garage grâce à des manœuvres de la banque (le prêt a été présenté comme sans intérêts alors qu'il comportait un taux élevé) : selon l'avocat du garage, celui-ci pourrait obtenir la nullité du prêt pour dol, mais le garage n'a jamais agi contre la banque. Le garage cesse de payer en mars. La banque n'informe les cautions de l'incident qu'en octobre.</p>
<p>La banque réclame l'intégralité des 100 000 € à Bérénice, ainsi qu'à Cyril. Bérénice paie finalement 100 000 €.</p>`,
    questions: [
      {
        q: "La banque pouvait-elle réclamer 100 000 € à Bérénice ? Et à Cyril ?", ch: ['c2', 'c3'],
        qualification: "Trois cautions personnes physiques garantissent la même dette. Bérénice et Alain sont cautions solidaires (mention présente). Cyril a souscrit un cautionnement stipulé solidaire sans la mention spécifique.",
        probleme: "La question est de savoir si le créancier peut réclamer l'intégralité de la dette à chacune des cautions, selon que la mention de solidarité figure ou non dans l'acte.",
        regle: "La caution solidaire ne bénéficie ni du bénéfice de discussion ni du bénéfice de division : le créancier peut agir directement contre elle et lui réclamer l'intégralité de la dette, même s'il existe d'autres cautions et même si elle ne s'était engagée que pour une partie. L'absence de la mention spécifique au cautionnement solidaire entraîne la requalification en cautionnement simple : la caution retrouve les bénéfices de discussion et de division.",
        application: "En l'espèce, Bérénice est caution solidaire, avec mention : la banque pouvait lui réclamer l'intégralité de la dette, sans poursuivre d'abord le garage. Cyril, faute de mention, est caution simple : il peut exiger que la banque poursuive d'abord le garage (discussion) et, en présence de plusieurs cautions, qu'elle divise ses poursuites et ne lui réclame que sa quote-part de 20 % (division).",
        conclusion: "La banque pouvait réclamer 100 000 € à Bérénice, mais pas à Cyril, qui, requalifié caution simple, ne peut être poursuivi qu'après le garage et pour sa seule part.",
        indispensables: ["Bérénice solidaire → tout, directement", "Cyril : mention absente → requalification en simple", "Cyril : discussion + division (20 %)", "Pas de nullité pour Cyril"],
        erreurs: ["Annuler l'engagement de Cyril.", "Limiter Bérénice à 30 %."],
      },
      {
        q: "Les cautions pouvaient-elles invoquer les manœuvres de la banque lors de la conclusion du prêt ?", ch: ['c4'],
        qualification: "Le contrat principal a été obtenu par des manœuvres trompeuses du créancier (présentation mensongère du taux) : il s'agit d'un dol, cause de nullité du contrat, que le débiteur n'a pas invoquée.",
        probleme: "La question est de savoir si la caution peut opposer au créancier les exceptions dont dispose le débiteur principal, comme la nullité du contrat pour dol.",
        regle: "Pour s'opposer au paiement, la caution peut invoquer contre le créancier toutes les exceptions au paiement dont dispose le débiteur : exceptions liées à la dette (inexécution du contrat par le créancier) et exceptions personnelles au débiteur (nullité du contrat pour dol). Le cautionnement étant accessoire, il suppose une obligation principale valable. Seules les mesures accordées au débiteur en raison de sa défaillance ne peuvent être invoquées.",
        application: "En l'espèce, les manœuvres de la banque constituent un dol permettant d'obtenir la nullité du prêt. Même si le garage n'a pas agi, les cautions peuvent invoquer cette exception, qui n'est pas une mesure liée à la défaillance du débiteur.",
        conclusion: "Oui : chaque caution pouvait opposer à la banque la nullité du prêt pour dol. Si l'obligation principale est annulée, le cautionnement, accessoire, ne peut plus être mis en jeu.",
        indispensables: ["Exceptions opposables : liées à la dette et personnelles au débiteur", "Exemple du dol", "Caractère accessoire", "Distinguer des mesures liées à la défaillance"],
        erreurs: ["Dire que seule la caution victime d'un dol peut l'invoquer.", "Confondre avec la procédure collective."],
      },
      {
        q: "Bérénice a payé 100 000 €. Quels recours a-t-elle ? Devait-elle les intérêts de mars à octobre ?", ch: ['c4'],
        qualification: "Une caution solidaire a payé l'intégralité de la dette alors qu'elle n'en garantissait que 30 % ; la banque a informé les cautions de l'incident de mars avec sept mois de retard.",
        probleme: "Il s'agit de déterminer les recours de la caution qui a payé, et la sanction du retard d'information en cas d'incident de paiement.",
        regle: "La caution qui a payé dispose d'un recours contre le débiteur principal pour les sommes versées et les frais engagés, et, en cas de cautionnement solidaire, d'un recours contre les autres cautions pour obtenir le remboursement de leur part, à proportion de leurs engagements respectifs (article 2312 du Code civil cité par le cours). Le créancier professionnel doit informer la caution personne physique dès le premier incident de paiement non régularisé dans le mois suivant son exigibilité ; à défaut, il ne peut réclamer les intérêts et pénalités échus entre l'incident et l'information. Le paiement par la caution éteint le cautionnement.",
        application: "En l'espèce, Bérénice peut se retourner contre le garage pour 100 000 € et ses frais. Contre les autres cautions, elle peut réclamer leur quote-part : 50 000 € à Alain (50 %) et 20 000 € à Cyril (20 %), en conservant sa propre part de 30 000 €. Par ailleurs, l'incident de mars n'a été signalé qu'en octobre : la banque ne pouvait réclamer les intérêts et pénalités échus entre mars et octobre.",
        conclusion: "Bérénice a un recours contre le garage (sommes et frais) et contre Alain (50 000 €) et Cyril (20 000 €). Les intérêts et pénalités de mars à octobre n'étaient pas dus en raison du retard d'information.",
        indispensables: ["Recours contre le débiteur : sommes + frais", "Recours contre les autres cautions à proportion des engagements", "Calcul : 50 000 € (Alain), 20 000 € (Cyril)", "Sanction du retard d'information : intérêts et pénalités mars → octobre"],
        erreurs: ["Faire supporter toute la dette à Bérénice.", "Oublier la sanction du défaut d'information."],
      },
    ],
  },
  {
    id: 'cp9', level: 3, title: 'Les garanties de M. Dupuis', chapters: ['c2', 'c5', 'c8'],
    enonce: `<p>M. Dupuis, commerçant, doit 90 000 € à son fournisseur Métalux, qui craint de ne jamais être payé. Métalux obtient l'autorisation d'un juge et inscrit une hypothèque sur l'entrepôt de M. Dupuis. Le Crédit Mutuel des Artisans avait inscrit avant elle une hypothèque conventionnelle sur le même entrepôt, pour une créance de 150 000 €.</p>
<p>M. Dupuis loue aussi un local commercial à Lyon ; il propose à un autre créancier de « l'hypothéquer pour le rassurer ».</p>
<p>Par ailleurs, depuis 2020, sa mère, Mme Dupuis, s'est portée caution, sans limitation de durée, de toutes les dettes futures de son fils envers Métalux. Elle a résilié son engagement par lettre du 1er février 2025, en respectant le préavis contractuel d'un mois.</p>
<p>M. Dupuis ne paie pas. L'entrepôt, vendu par lui à la société Logistik sans remboursement préalable, est saisi entre les mains de celle-ci et adjugé 280 000 €.</p>`,
    questions: [
      {
        q: "Qualifiez les deux hypothèques sur l'entrepôt. Peut-on hypothéquer le local de Lyon ?", ch: ['c5', 'c8'],
        qualification: "Deux hypothèques grèvent l'entrepôt : celle du Crédit Mutuel, conventionnelle (accord contractuel), et celle de Métalux, judiciaire (autorisée par un juge). Le local de Lyon n'appartient pas à M. Dupuis, qui en est locataire.",
        probleme: "Il s'agit de qualifier les hypothèques selon leur origine et de déterminer si un locataire peut hypothéquer le bien qu'il loue.",
        regle: "L'hypothèque peut être légale (imposée par la loi), judiciaire (autorisée par un juge à la demande d'un créancier qui craint de ne pas être remboursé, son inscription nécessitant l'autorisation préalable du juge) ou conventionnelle (accord contractuel, constaté par acte notarié). Pour consentir une sûreté réelle, le constituant doit impérativement être propriétaire du bien ; l'hypothèque affecte un immeuble dont on est propriétaire.",
        application: "En l'espèce, Métalux a obtenu l'autorisation du juge car elle craignait de ne pas être payée : son hypothèque est judiciaire. Celle du Crédit Mutuel résulte d'un contrat : elle est conventionnelle et a dû être constatée par acte notarié. M. Dupuis, simple locataire du local de Lyon, n'en est pas propriétaire.",
        conclusion: "L'entrepôt est grevé d'une hypothèque conventionnelle (Crédit Mutuel) et d'une hypothèque judiciaire (Métalux). Le local de Lyon ne peut pas être hypothéqué par M. Dupuis.",
        indispensables: ["Hypothèque judiciaire : autorisation du juge", "Hypothèque conventionnelle : contrat + acte notarié", "Condition de propriété", "Le locataire ne peut pas hypothéquer"],
        erreurs: ["Qualifier l'hypothèque de Métalux de légale.", "Admettre l'hypothèque du local loué."],
      },
      {
        q: "La saisie entre les mains de Logistik était-elle possible ? Comment répartir les 280 000 € ?", ch: ['c8'],
        qualification: "L'immeuble hypothéqué a été vendu à un tiers sans paiement des créanciers ; deux créanciers hypothécaires sont inscrits à des dates différentes.",
        probleme: "La question est de savoir si le créancier hypothécaire peut saisir l'immeuble entre les mains du tiers acquéreur, et dans quel ordre les créanciers sont payés sur le prix.",
        regle: "La saisie immobilière suppose un titre exécutoire (acte notarié ou décision de justice), un commandement de payer délivré par un commissaire de justice, et la publication de ce commandement au Service de la Publicité Foncière. Le créancier hypothécaire dispose d'un droit de suite lui permettant de saisir le bien entre les mains du tiers acquéreur. Il est payé en priorité sur le prix selon la règle du rang (date d'inscription au SPF). Le surplus est restitué au débiteur (ou affecté aux autres créanciers inscrits).",
        application: "En l'espèce, l'entrepôt a été vendu à Logistik sans remboursement : les créanciers hypothécaires peuvent exercer leur droit de suite, sous réserve d'avoir respecté les trois conditions de la saisie. Sur les 280 000 €, le Crédit Mutuel, inscrit en premier, est payé de 150 000 € ; Métalux reçoit ensuite 90 000 € ; il reste 40 000 €, restitués au débiteur ou affectés aux autres créanciers inscrits.",
        conclusion: "La saisie chez Logistik est possible grâce au droit de suite. Répartition : 150 000 € au Crédit Mutuel, 90 000 € à Métalux, 40 000 € de surplus.",
        indispensables: ["Trois conditions de la saisie immobilière", "Droit de suite contre le tiers acquéreur", "Règle du rang", "Calcul complet et sort du surplus"],
        erreurs: ["Penser que la vente à Logistik fait disparaître l'hypothèque.", "Oublier le surplus."],
      },
      {
        q: "Mme Dupuis doit-elle garantir les dettes de son fils envers Métalux ?", ch: ['c2'],
        qualification: "Mme Dupuis s'est portée caution, sans limitation de durée, des dettes futures de son fils : c'est un cautionnement indéfini. Elle l'a résilié avec préavis.",
        probleme: "La question est de savoir quels sont les effets de la résiliation d'un cautionnement indéfini sur les dettes nées avant et après celle-ci.",
        regle: "Le cautionnement indéfini porte sur des dettes futures indéterminées. La loi permet à la caution de le résilier unilatéralement à tout moment, en respectant le préavis contractuel. La résiliation libère la caution pour les dettes futures nées postérieurement, mais elle reste tenue des dettes nées avant la résiliation.",
        application: "En l'espèce, Mme Dupuis a résilié le 1er février 2025 avec un préavis d'un mois respecté : la résiliation prend effet au 1er mars 2025. Elle reste tenue des dettes de son fils nées avant cette date, mais pas de celles nées après. L'énoncé ne précise pas la date de naissance de la dette de 90 000 € : si elle est antérieure, Mme Dupuis la garantit ; si elle est postérieure, elle est libérée.",
        conclusion: "Mme Dupuis reste caution des dettes nées avant la prise d'effet de sa résiliation, et seulement de celles-là. Il faut déterminer la date de naissance de la dette de 90 000 €.",
        indispensables: ["Qualifier de cautionnement indéfini", "Résiliation unilatérale à tout moment + préavis", "Effet pour l'avenir seulement", "Raisonnement par hypothèses sur la date de la dette"],
        erreurs: ["Dire que la résiliation libère de toutes les dettes.", "Dire qu'elle ne peut pas résilier."],
      },
    ],
  },
];
