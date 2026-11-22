// Méthodologie du cas pratique — exemples exclusivement tirés des notions du cours.
export const METHODE = {
  intro: "Un cas pratique te présente une situation concrète et te demande de dire, en droit, ce qui va se passer. Le correcteur n'attend pas que tu récites ton cours : il attend que tu <strong>utilises</strong> la bonne règle sur les <strong>bons faits</strong>, dans un raisonnement visible. La méthode ci-dessous (le « syllogisme juridique ») est la colonne vertébrale de chaque réponse.",
  steps: [
    {
      n: 1, title: 'Qualifier juridiquement les faits',
      what: "Traduire l'histoire en catégories juridiques. Qui est créancier ? débiteur principal ? caution ? constituant ? Quel bien : meuble corporel, incorporel, immeuble ? Le cautionnement est-il civil ou commercial, simple ou solidaire, défini ou indéfini ? La caution est-elle une personne physique ? Le créancier est-il professionnel ?",
      how: [
        "Surligne les faits utiles : montants, dates, qualités des personnes (banque, commerçant, parent, époux…), nature des biens, ce qui a été écrit ou non.",
        "Écarte les faits « décoratifs » (prénoms, couleur de la voiture, anecdotes) mais méfie-toi : un détail anodin (« il est marié », « elle loue l'appartement ») est souvent la clé.",
        "Nomme chaque acteur avec le vocabulaire du cours.",
      ],
      example: "« La banque Crédit Rive a prêté 80 000 € à Karim ; sa sœur Nadia s'est portée caution. » → La banque est un <strong>créancier professionnel</strong> (créance née dans l'exercice de sa profession) ; Karim est le <strong>débiteur principal</strong> ; Nadia est une <strong>caution personne physique</strong>. Nadia n'est ni un établissement de crédit, ni une commerçante agissant pour son activité, et n'a pas d'intérêt patrimonial dans l'opération : le cautionnement est <strong>civil</strong>.",
    },
    {
      n: 2, title: 'Identifier le problème de droit',
      what: "Formuler la question juridique précise que pose la situation, de façon générale et abstraite (sans les prénoms).",
      how: [
        "Commence par « La question est de savoir si… » ou « Il s'agit de déterminer si… ».",
        "Une question = un problème. Si la question du sujet en cache plusieurs, découpe-la.",
        "Le problème doit appeler une règle précise du cours.",
      ],
      example: "Mauvais : « Nadia doit-elle payer ? » (trop vague). Bon : « La question est de savoir si une caution personne physique dont l'acte ne comporte pas la mention de renonciation aux bénéfices de discussion et de division peut être poursuivie directement par le créancier, sans poursuite préalable du débiteur principal. »",
    },
    {
      n: 3, title: 'Exposer la règle de droit applicable',
      what: "Énoncer la règle du cours qui répond au problème : principe, conditions, exceptions, sanction. C'est la « majeure » du raisonnement.",
      how: [
        "Énonce la règle de façon générale, avec le vocabulaire exact (bénéfice de discussion, requalification, nullité, droit de suite…).",
        "Donne le principe puis l'exception si elle est en jeu.",
        "Cite un article seulement si tu es sûr de toi ; le contenu de la règle compte plus que son numéro (l'article 2288 n'est pas exigé).",
      ],
      example: "« En cas de cautionnement solidaire, la caution personne physique doit apposer une mention par laquelle elle reconnaît ne pas pouvoir exiger que le créancier poursuive d'abord le débiteur principal, ni qu'il divise ses poursuites. L'absence de cette mention n'entraîne pas la nullité de l'acte : le cautionnement est requalifié en cautionnement simple. La caution simple bénéficie alors du bénéfice de discussion : le créancier doit d'abord poursuivre le débiteur principal. »",
    },
    {
      n: 4, title: 'Appliquer la règle aux faits',
      what: "Confronter chaque condition de la règle aux faits de l'espèce. C'est la partie la plus importante — et la plus souvent bâclée.",
      how: [
        "Commence par « En l'espèce… ».",
        "Reprends chaque condition une par une et montre, faits à l'appui, si elle est remplie ou non.",
        "Utilise les chiffres et les dates de l'énoncé : un calcul ou une période bien identifiée fait la différence.",
        "Si un fait manque, envisage les deux hypothèses (« Si… alors… ; à l'inverse, si… »).",
      ],
      example: "« En l'espèce, Nadia est une personne physique et l'acte stipule un engagement solidaire, mais il ne comporte pas la mention de renonciation aux bénéfices de discussion et de division. Le cautionnement n'est donc pas nul, mais il doit être requalifié en cautionnement simple. Nadia peut opposer le bénéfice de discussion à la banque, qui l'a poursuivie sans avoir agi au préalable contre Karim. »",
    },
    {
      n: 5, title: 'Conclure',
      what: "Répondre clairement à la question posée, en une ou deux phrases. Pas de conclusion ouverte ou hésitante.",
      how: [
        "Commence par « Par conséquent… » ou « En conclusion… ».",
        "Réponds exactement à la question du sujet (oui / non / combien / qui).",
        "Ajoute, si utile, la conséquence pratique (ce que le créancier doit faire maintenant).",
      ],
      example: "« Par conséquent, la banque ne peut pas, en l'état, exiger le paiement de Nadia : elle doit d'abord poursuivre Karim sur ses biens et démontrer que ces poursuites n'ont pas permis d'obtenir le règlement. »",
    },
  ],
  upgrade: {
    title: "De la réponse descriptive à l'argumentation juridique",
    intro: "Même question, trois niveaux de réponse. Question : « Marc a vendu une voiture qu'il avait gagée sans dépossession au profit de sa banque, sans rembourser. Que peut faire la banque ? »",
    levels: [
      { label: 'Réponse descriptive (insuffisante)', score: '4/20', text: "La banque peut récupérer la voiture car il y a un droit de suite.", why: "La conclusion est juste, mais il n'y a ni qualification, ni règle expliquée, ni application aux faits. Le correcteur ne sait pas si tu as compris." },
      { label: 'Réponse correcte mais plate', score: '11/20', text: "Le gage est une sûreté réelle sur les meubles corporels. Le créancier gagiste a un droit de suite. Ici Marc a vendu la voiture, donc la banque peut la récupérer chez l'acheteur.", why: "La règle est citée, mais l'opposabilité (inscription au registre) n'est pas vérifiée, et la situation de l'acheteur n'est pas expliquée." },
      { label: 'Réponse argumentée (attendue)', score: '18/20', text: "La voiture est un bien meuble corporel : la sûreté consentie est un <strong>gage</strong>, ici <strong>sans dépossession</strong>, puisque Marc a conservé le véhicule. La question est de savoir si le créancier gagiste peut agir contre le tiers qui a acquis le bien gagé. Le gage sans dépossession est opposable aux tiers lorsqu'il a fait l'objet d'une inscription sur le registre spécial des sûretés mobilières, tenu au greffe du tribunal de commerce ; le constituant a l'interdiction de vendre le bien. En cas de non-paiement à l'échéance, le créancier gagiste dispose d'un <strong>droit de suite</strong> : il peut rechercher le bien entre les mains du tiers acquéreur. En l'espèce, si le gage a bien été inscrit, il est opposable à l'acheteur, qui pouvait vérifier en consultant le registre que le véhicule était gagé. Marc a violé son interdiction de vendre. Par conséquent, la banque peut récupérer la voiture entre les mains de l'acheteur, à charge pour celui-ci de se retourner contre Marc.", why: "Qualification, problème, règle complète (opposabilité + prérogative), application précise, conclusion nette." },
    ],
  },
  writing: [
    "Une question = un paragraphe structuré (qualification → problème → règle → application → conclusion). Tu peux sauter une ligne entre chaque étape.",
    "Utilise des connecteurs logiques : « or », « en l'espèce », « dès lors », « par conséquent », « en revanche ».",
    "Le vocabulaire juridique exact rapporte des points : « requalifié en cautionnement simple » vaut mieux que « devient moins fort ».",
    "N'invente pas de faits. Si une information manque, raisonne par hypothèses.",
    "Ne recopie pas tout ton cours : seule la règle utile à la question.",
    "Gère ton temps : lis tout le sujet d'abord, repère les problèmes de chaque question, puis rédige.",
  ],
  mistakes: [
    ["Confondre bénéfice de discussion et bénéfice de division", "Discussion = ordre des poursuites (débiteur d'abord). Division = répartition entre plusieurs cautions."],
    ["Annoncer la nullité pour l'absence de mention solidaire", "La sanction est la requalification en cautionnement simple, pas la nullité."],
    ["Confondre mise en garde et disproportion", "Mise en garde → déchéance à hauteur du préjudice. Disproportion → réduction au montant raisonnable."],
    ["Croire que la banque créancière rend le cautionnement commercial", "C'est la caution qui doit être un établissement de crédit, un commerçant agissant pour son activité, ou avoir un intérêt patrimonial."],
    ["Oublier de vérifier l'opposabilité aux tiers", "Gage sans dépossession / nantissement : registre au greffe ; créance : notification ; hypothèque : SPF."],
    ["Attribuer un droit de rétention au créancier nanti", "Le nantissement est toujours sans dépossession : pas de rétention."],
    ["Faire payer à la caution plus que la dette", "Le cautionnement ne peut excéder la dette du débiteur principal."],
    ["Oublier le minimum RSA", "La caution personne physique ne peut être privée d'un minimum égal au RSA."],
    ["Ne pas utiliser les chiffres de l'énoncé", "Calcule le surplus, la quote-part, la période d'intérêts perdus : c'est de l'application."],
  ],
};
