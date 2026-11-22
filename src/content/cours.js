// Cours consolidé — Droit des sûretés
// Sources : C1 = Cours partie 1, C2 = Cours partie 2, C3 = Cours partie 3 (révision), C4 = Cours partie 4.
// Format des blocs :
//  ['p', html] paragraphe · ['ul', [..]] · ['ol', [..]] · ['table', [entêtes], [[ligne]...], légende?]
//  ['def', titre, html] définition à mémoriser · ['ex', titre, html] exemple pratique
//  ['dist', titre, html] distinction importante · ['prof', html] remarque de la professeure
//  ['nx', html] non exigible à l'examen · ['key', [..]] à retenir · ['warn', html] point à vérifier (ajout de la plateforme)

export const PARTS = [
  { id: 'intro', title: 'Introduction générale' },
  { id: 'p1', title: 'Partie I — Les sûretés personnelles : le cautionnement' },
  { id: 'p2', title: 'Partie II — Les sûretés réelles' },
  { id: 'synth', title: 'Synthèse' },
];

export const CHAPTERS = [
  // ───────────────────────────────────────── CHAPITRE 0
  {
    id: 'c0', num: 0, part: 'intro', short: 'La notion de sûreté',
    title: 'La notion de sûreté',
    lead: "Pourquoi un créancier a besoin de garanties, quelles grandes familles de sûretés existent et comment elles se constituent.",
    src: [1, 2, 3],
    sections: [
      {
        id: 's1', title: 'Définition et finalité des sûretés',
        blocks: [
          ['p', "Lorsqu'un créancier accorde un crédit ou consent un délai de paiement à un débiteur, il s'expose au <strong>risque de ne pas être remboursé à l'échéance</strong>. Pour se prémunir contre ce risque d'impayé, il met en place des garanties juridiques appelées <strong>sûretés</strong>."],
          ['def', 'La sûreté', "Une sûreté est un <strong>mécanisme juridique</strong> (une garantie accordée au créancier) qui permet de <strong>sécuriser le paiement des créances</strong> et d'<strong>assurer leur recouvrement</strong>."],
          ['p', "La sûreté renforce considérablement la position du créancier vis-à-vis de son débiteur, particulièrement dans deux situations :"],
          ['ol', [
            "<strong>En cas d'insolvabilité du débiteur</strong> : la sûreté offre au créancier un moyen alternatif ou privilégié d'obtenir le paiement.",
            "<strong>En cas de concurrence avec d'autres créanciers</strong> : lorsqu'un débiteur a plusieurs créanciers, celui qui est le seul à bénéficier d'une sûreté est, en principe, remboursé <strong>en priorité</strong> par rapport aux autres.",
          ]],
        ],
      },
      {
        id: 's2', title: 'Classification : sûretés personnelles et sûretés réelles',
        blocks: [
          ['p', "On distingue deux grandes catégories de sûretés :"],
          ['table', ['', 'Sûretés personnelles', 'Sûretés réelles'], [
            ['Sur quoi repose la garantie ?', "Sur l'<strong>engagement d'une personne</strong> aux côtés du débiteur principal pour garantir le paiement de la dette.", "Sur l'<strong>affectation d'un ou plusieurs biens</strong> au paiement de la dette."],
            ['Exemples du cours', "Le <strong>cautionnement</strong> (se porter caution pour une autre personne).", "L'<strong>hypothèque</strong> (ex. : hypothéquer sa maison), le <strong>nantissement</strong> (ex. : nantir les titres de sa société afin de pouvoir contracter un emprunt), le <strong>gage</strong>."],
          ]],
          ['dist', 'Personne ou bien ?', "Dans une sûreté personnelle, le créancier gagne un <strong>second débiteur</strong> (une personne). Dans une sûreté réelle, il obtient un <strong>droit sur un bien</strong> (une chose). Astuce mémo : « réel » → une chose."],
        ],
      },
      {
        id: 's3', title: 'Modes de constitution des sûretés',
        blocks: [
          ['p', "Les sûretés peuvent être mises en place selon deux modalités :"],
          ['ol', [
            "<strong>Par la volonté des parties</strong> : lorsque la loi prévoit la possibilité de constituer <strong>conventionnellement</strong> une garantie entre le créancier et le constituant.",
            "<strong>Sur décision de justice</strong> : une sûreté peut également être imposée ou constituée à la suite d'une <strong>décision judiciaire</strong>.",
          ]],
          ['p', "Tu retrouveras cette distinction tout au long du programme : le <strong>nantissement</strong> peut être conventionnel ou judiciaire, et l'<strong>hypothèque</strong> peut être conventionnelle, judiciaire… ou légale (voir chapitres 7 et 8)."],
          ['key', [
            "Sûreté = garantie qui sécurise le paiement et le recouvrement d'une créance.",
            "Deux intérêts : se protéger de l'insolvabilité du débiteur et passer avant les autres créanciers.",
            "Personnelles (une personne s'engage) ≠ réelles (un bien est affecté).",
            "Constitution par la volonté des parties ou par décision de justice.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 1
  {
    id: 'c1', num: 1, part: 'p1', short: 'Notion de cautionnement',
    title: 'Le cautionnement : notion et mécanisme',
    lead: "Ce qu'est le cautionnement, pourquoi le créancier l'exige et comment fonctionne la relation entre les trois acteurs.",
    src: [1, 3],
    sections: [
      {
        id: 's1', title: 'Définition et mécanisme général',
        blocks: [
          ['def', 'Le cautionnement', "Le cautionnement est le <strong>contrat</strong> par lequel une personne, appelée <strong>caution</strong>, s'oblige <strong>envers le créancier</strong> à payer la dette <strong>en cas de défaillance du débiteur principal</strong>."],
          ['nx', "La référence à l'<strong>article 2288 du Code civil</strong> (définition du cautionnement) est donnée pour la culture juridique personnelle : la professeure a précisé qu'elle <strong>ne sera pas exigée lors des examens</strong>."],
          ['p', "Le principe du cautionnement consiste à <strong>adjoindre au débiteur principal un second débiteur</strong> (ou plusieurs) destiné à le <strong>suppléer</strong> s'il ne s'exécute pas."],
          ['ul', [
            "<strong>Intérêt pratique pour le créancier</strong> : il augmente significativement ses chances de recouvrer sa créance. Sans caution, si le débiteur principal devient insolvable, le recouvrement de la dette devient très difficile.",
          ]],
          ['ex', 'La location étudiante', "Lorsqu'un étudiant loue un appartement, le bailleur exige généralement un <strong>garant</strong> (une caution). Si l'étudiant ne parvient plus à payer son loyer, le propriétaire se retourne vers ce garant pour obtenir le règlement des sommes dues."],
        ],
      },
      {
        id: 's2', title: 'Une opération tripartite',
        blocks: [
          ['p', "Le contrat de cautionnement est conclu <strong>entre le créancier et la caution</strong>. Mais sa mise en œuvre instaure une relation <strong>tripartite</strong> entre trois acteurs :"],
          ['ol', [
            "Le <strong>créancier</strong> ;",
            "Le <strong>débiteur principal</strong> ;",
            "La <strong>caution</strong> (débiteur accessoire).",
          ]],
          ['p', "<strong>Fonctionnement en cas d'impayé :</strong>"],
          ['ol', [
            "Si le débiteur principal ne paie pas à l'échéance, le créancier <strong>commence par se retourner contre lui</strong> (notamment en le mettant en demeure de payer).",
            "Si le débiteur principal ne s'exécute toujours pas, le créancier <strong>actionne alors la caution</strong> pour obtenir le paiement.",
            "Par ailleurs, un lien existe aussi entre le débiteur principal et la caution, puisque cette dernière <strong>ne s'engage pas sans accord avec le débiteur principal</strong>.",
          ]],
          ['dist', 'Qui sont les parties au contrat ?', "Les <strong>parties au contrat</strong> de cautionnement sont le <strong>créancier</strong> et la <strong>caution</strong>. Le débiteur principal n'est pas partie à ce contrat, mais il est l'un des trois acteurs de l'opération, lié à la caution."],
          ['key', [
            "Cautionnement = contrat par lequel la caution s'oblige envers le créancier à payer si le débiteur principal fait défaut.",
            "Trois acteurs : créancier, débiteur principal, caution (débiteur accessoire).",
            "Le contrat est conclu entre le créancier et la caution.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 2
  {
    id: 'c2', num: 2, part: 'p1', short: 'Formes du cautionnement',
    title: 'Les formes du cautionnement',
    lead: "Trois paires de distinctions : simple / solidaire, civil / commercial, défini / indéfini.",
    src: [1, 2, 3],
    sections: [
      {
        id: 's0', title: 'Vue d\'ensemble',
        blocks: [
          ['p', "Le cautionnement se décline selon <strong>trois paires de distinctions</strong>, en fonction : de l'étendue des protections accordées à la caution, de sa nature civile ou commerciale, et du caractère déterminé ou non des dettes garanties."],
        ],
      },
      {
        id: 's1', title: 'Cautionnement simple et cautionnement solidaire',
        blocks: [
          ['table', ['Critères', 'Cautionnement simple', 'Cautionnement solidaire'], [
            ['Protections de la caution', "La caution bénéficie de <strong>deux protections</strong> : le bénéfice de discussion et le bénéfice de division.", "La caution ne bénéficie d'<strong>aucune</strong> de ces protections."],
            ['Ordre des poursuites', "Le créancier doit <strong>d'abord poursuivre le débiteur principal</strong> sur ses biens.", "Le créancier peut <strong>poursuivre directement la caution</strong>, sans poursuivre au préalable le débiteur principal."],
            ['Pluralité de cautions', "Le créancier doit <strong>diviser ses poursuites</strong> entre les cautions à hauteur de leur part respective.", "Le créancier peut réclamer <strong>l'intégralité de la dette à une seule caution</strong>, sans diviser ses poursuites."],
          ]],
          ['h', 'Les deux protections du cautionnement simple'],
          ['def', 'Le bénéfice de discussion', "Il permet à la caution d'<strong>exiger du créancier qu'il poursuive d'abord le débiteur principal sur ses biens</strong> avant de venir lui réclamer le paiement. Concrètement, la caution indique au créancier qu'il doit d'abord rechercher et saisir les biens du débiteur principal ; elle ne sera sollicitée que pour régler <strong>ce qu'il reste à solder</strong> après cette première démarche."],
          ['p', "Références citées dans le cours : <strong>articles 2305 et 2305-1 du Code civil</strong>."],
          ['def', 'Le bénéfice de division', "Il joue en cas de <strong>pluralité de cautions</strong> (plusieurs personnes se sont portées caution aux côtés du débiteur principal). Il permet à chaque caution d'<strong>exiger du créancier qu'il divise ses poursuites</strong> et ne lui réclame le paiement qu'<strong>à hauteur de sa quote-part</strong> dans la dette."],
          ['ex', 'La caution à 20 %', "Plusieurs cautions garantissent une dette et l'une d'elles s'est engagée à hauteur de <strong>20 %</strong>. En cautionnement simple, elle n'a pas à payer pour les autres : le créancier ne peut la poursuivre que pour ces 20 % et doit s'adresser aux autres cautions pour le solde."],
          ['h', "L'absence de protection dans le cautionnement solidaire"],
          ['p', "Le cautionnement solidaire est <strong>l'inverse</strong> du cautionnement simple. La caution solidaire ne peut invoquer <strong>ni le bénéfice de discussion, ni le bénéfice de division</strong>. En cas d'impayé, le créancier peut donc :"],
          ['ul', [
            "demander <strong>immédiatement</strong> le paiement à la caution, sans poursuivre d'abord le débiteur principal ;",
            "lui réclamer <strong>la totalité</strong> de la somme, même s'il existe d'autres cautions et même si elle ne s'était engagée que pour une partie de la dette.",
          ]],
          ['prof', "Le cautionnement solidaire constitue une garantie <strong>plus efficace pour le créancier</strong> et <strong>plus contraignante pour la caution</strong>."],
          ['warn', "<strong>Nuance entre les cours.</strong> Le cours 1 indique que le créancier peut réclamer à la caution solidaire « la totalité de la somme garantie », tandis que le cours 3 précise « l'intégralité de la dette, même si elle ne s'était engagée que pour une partie de la dette » (exemple de la caution à 20 %). Le cours 1 pose par ailleurs que la caution ne peut jamais être tenue au-delà de la dette du débiteur principal (chapitre 3). La plateforme reprend les deux formulations telles quelles ; si la question tombe, n'hésite pas à faire préciser ce point à ta professeure."],
        ],
      },
      {
        id: 's2', title: 'Cautionnement civil et cautionnement commercial',
        blocks: [
          ['h', 'Le cautionnement civil : le principe'],
          ['ul', [
            "<strong>Principe</strong> : par principe, <strong>tout cautionnement est civil</strong> (exemple : se porter caution pour le bail d'habitation de son enfant).",
            "<strong>Régime</strong> : lorsqu'il est civil, le cautionnement est <strong>en principe simple</strong>. La caution bénéficie donc automatiquement du bénéfice de discussion et du bénéfice de division.",
            "<strong>Juridiction compétente</strong> : le <strong>tribunal judiciaire</strong> (juridiction de droit commun en matière civile, composée de <strong>magistrats professionnels</strong> issus des écoles de la magistrature).",
          ]],
          ['h', "Le cautionnement commercial : l'exception"],
          ['p', "Le cautionnement devient commercial lorsqu'il est accompli dans un <strong>contexte commercial</strong>. C'est notamment le cas dans trois hypothèses :"],
          ['ol', [
            "Lorsqu'il est consenti par un <strong>établissement de crédit</strong> (ex. : une banque) ;",
            "Lorsqu'il est donné par un <strong>commerçant pour les besoins de son activité</strong> ;",
            "Lorsque la caution possède un <strong>intérêt patrimonial dans l'opération commerciale garantie</strong>.",
          ]],
          ['ul', [
            "<strong>Régime</strong> : à l'inverse du cautionnement civil, le cautionnement commercial est <strong>en principe solidaire</strong>. La caution ne peut donc opposer ni le bénéfice de discussion, ni le bénéfice de division.",
            "<strong>Juridiction compétente</strong> : le <strong>tribunal de commerce</strong>, composé de juges et présidents <strong>issus de la vie active et du monde économique</strong> (et non de magistrats issus de l'école de la magistrature), à l'image du fonctionnement des conseils de prud'hommes.",
          ]],
          ['table', ['', 'Cautionnement civil', 'Cautionnement commercial'], [
            ['Statut', 'Principe', 'Exception'],
            ['Quand ?', 'Par défaut (ex. : caution du bail de son enfant)', 'Établissement de crédit ; commerçant pour les besoins de son activité ; caution ayant un intérêt patrimonial dans l\'opération'],
            ['Forme par principe', '<strong>Simple</strong> (discussion + division)', '<strong>Solidaire</strong> (ni discussion, ni division)'],
            ['Tribunal', '<strong>Tribunal judiciaire</strong> (magistrats professionnels)', '<strong>Tribunal de commerce</strong> (juges issus du monde économique)'],
          ]],
        ],
      },
      {
        id: 's3', title: 'Cautionnement défini et cautionnement indéfini',
        blocks: [
          ['p', "Le cautionnement peut porter sur des dettes <strong>déterminées</strong> dès la conclusion de l'acte ou simplement <strong>déterminables</strong>. Il peut couvrir des dettes <strong>présentes</strong> (contractées au moment de l'acte) ou des dettes <strong>futures</strong> (non encore nées)."],
          ['def', 'Le cautionnement défini (déterminé)', "La caution garantit une <strong>dette déterminée</strong> ou un <strong>montant fixé à l'avance</strong>."],
          ['prof', "C'est le cas <strong>le plus courant en pratique</strong>, car la caution maîtrise précisément l'étendue de son engagement."],
          ['def', 'Le cautionnement indéfini (indéterminable)', "Il porte sur des <strong>dettes futures indéterminées</strong> (engagement à durée indéterminée) : le montant garanti est <strong>indéterminable au moment de l'engagement</strong>, notamment lorsqu'il couvre des dettes futures ou des dettes accessoires rattachées à la dette principale (intérêts, majorations)."],
          ['p', "<strong>Protection de la caution dans le cautionnement indéfini :</strong>"],
          ['ul', [
            "<strong>Faculté de résiliation unilatérale</strong> : la loi permet à la caution de mettre fin (résilier) au cautionnement <strong>à tout moment</strong>, car on ne peut pas obliger une personne à demeurer caution à l'infini.",
            "<strong>Condition de forme</strong> : la caution doit respecter le <strong>préavis contractuel</strong> prévu dans le contrat.",
            "<strong>Effets de la résiliation</strong> : elle <strong>libère la caution pour les dettes futures</strong> qui naîtraient postérieurement, mais la caution <strong>reste tenue des dettes nées avant la résiliation</strong>.",
          ]],
          ['warn', "<strong>Deux angles dans les cours.</strong> Le cours 1 définit le cautionnement indéfini par les <em>dettes futures indéterminées (engagement à durée indéterminée)</em> ; le cours 3 (révision) met l'accent sur le <em>montant indéterminable</em> au moment de l'engagement (dettes futures ou accessoires : intérêts, majorations). Les deux idées sont réunies ci-dessus."],
          ['key', [
            "Simple = discussion + division ; solidaire = ni l'un ni l'autre.",
            "Civil = principe, simple, tribunal judiciaire. Commercial = exception, solidaire, tribunal de commerce.",
            "Commercial : banque / commerçant pour son activité / intérêt patrimonial dans l'opération.",
            "Indéfini : résiliable à tout moment avec préavis ; libère pour l'avenir seulement.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 3
  {
    id: 'c3', num: 3, part: 'p1', short: 'Conditions de validité',
    title: 'Les conditions de validité du cautionnement',
    lead: "Conditions de fond (capacité, consentement, contenu licite et certain) et formalisme strict (écrit, mentions obligatoires).",
    src: [1, 2, 3],
    sections: [
      {
        id: 's0', title: 'Principe',
        blocks: [
          ['p', "Parce que le cautionnement est un <strong>contrat</strong>, sa validité est subordonnée au respect des <strong>conditions de droit commun des contrats</strong> (capacité, consentement, contenu licite et certain), adaptées aux spécificités du cautionnement, ainsi qu'à un <strong>formalisme strict</strong>."],
        ],
      },
      {
        id: 's1', title: 'La capacité et le pouvoir de s\'engager',
        blocks: [
          ['ul', [
            "<strong>Capacité juridique</strong> : la caution doit être <strong>majeure</strong> et <strong>ne pas être placée sous un régime de protection</strong> (tutelle, curatelle).",
            "<strong>Capacité financière (solvabilité)</strong> : comme elle engage <strong>l'intégralité de son patrimoine</strong>, la caution doit avoir la capacité financière de rembourser la dette garantie, c'est-à-dire disposer d'un patrimoine lui permettant de solder la dette si le créancier la poursuit.",
          ]],
          ['ex', 'Le dossier de location', "Lors de la constitution d'un dossier de location d'appartement, le garant doit fournir <strong>les mêmes justificatifs financiers que le locataire</strong>, afin que le bailleur puisse vérifier sa solvabilité."],
          ['h', 'Règles restrictives spécifiques'],
          ['ul', [
            "<strong>Le tuteur</strong> : un tuteur <strong>ne peut pas, même avec une autorisation</strong>, constituer une sûreté (se porter caution) au nom du majeur protégé pour garantir la dette d'un tiers.",
            "<strong>Les époux</strong> : lorsqu'une personne mariée contracte <strong>seule</strong> un cautionnement ou un emprunt, elle ne peut engager que <strong>ses biens propres et ses revenus</strong>. Elle ne peut pas engager les biens propres de son conjoint, <strong>sauf consentement exprès</strong> de ce dernier ou si l'engagement est <strong>souscrit conjointement</strong> par les deux époux.",
          ]],
        ],
      },
      {
        id: 's2', title: 'Le consentement et la protection face au créancier professionnel',
        blocks: [
          ['p', "Le consentement de la caution doit être <strong>exprès</strong>, <strong>libre</strong> et <strong>éclairé</strong>. La caution doit être parfaitement informée du risque qu'elle encourt : être tenue au remboursement de la dette <strong>à la place du débiteur principal</strong> si celui-ci devient insolvable ou ne paie pas ses échéances."],
          ['def', 'Le créancier professionnel', "Le créancier dont la <strong>créance est née dans l'exercice de sa profession</strong> (par exemple une banque, un établissement de crédit)."],
          ['p', "Des règles protectrices spécifiques s'appliquent lorsqu'une <strong>caution personne physique</strong> s'engage envers un <strong>créancier professionnel</strong> :"],
          ['h', '1. Le devoir de mise en garde'],
          ['ul', [
            "Le créancier professionnel doit <strong>alerter la caution personne physique sur tous les risques</strong> liés à l'opération de cautionnement.",
            "Il doit particulièrement l'alerter lorsque <strong>l'engagement du débiteur principal est inadapté aux capacités financières de ce dernier</strong>.",
            "<strong>Sanction</strong> : s'il manque à son devoir de mise en garde, le créancier professionnel <strong>peut être déchu de son droit contre la caution à hauteur du préjudice subi</strong> par celle-ci.",
          ]],
          ['ex', 'Le prêt disproportionné', "Un débiteur perçoit <strong>1 SMIC par mois</strong> et emprunte pour acquérir une maison à <strong>600 000 €</strong>. L'emprunt est manifestement disproportionné par rapport à ses capacités de remboursement, ce qui accroît fortement le risque que la caution soit appelée en paiement. Le créancier professionnel a l'obligation d'en informer la caution."],
          ['h', '2. Le cautionnement manifestement disproportionné'],
          ['ul', [
            "Si le créancier fait souscrire à la caution un engagement <strong>manifestement disproportionné à ses propres capacités</strong> (biens et revenus de la caution), le cautionnement est <strong>réduit au montant que la caution pouvait raisonnablement garantir</strong> au regard de ses moyens, de ses revenus et de son patrimoine.",
          ]],
          ['dist', 'Ne pas confondre les deux protections', "La <strong>mise en garde</strong> porte sur le risque lié à la situation du <strong>débiteur principal</strong> (son emprunt est-il adapté à ses capacités ?) ; sanction : <strong>déchéance à hauteur du préjudice</strong> de la caution. La <strong>disproportion</strong> porte sur l'engagement de la <strong>caution</strong> au regard de <strong>ses propres</strong> biens et revenus ; sanction : <strong>réduction</strong> du cautionnement à ce qu'elle pouvait raisonnablement garantir."],
        ],
      },
      {
        id: 's3', title: 'Un contenu licite et certain : le caractère accessoire',
        blocks: [
          ['p', "Le cautionnement est un <strong>contrat accessoire</strong> qui dépend nécessairement d'un <strong>contrat principal</strong> dont découle la dette garantie. Pour que le cautionnement existe et soit valable, il doit garantir une <strong>obligation principale valable</strong> (une dette <strong>certaine et existante</strong>, valable et légale)."],
          ['key', ["Pas d'obligation principale à garantir → pas de cautionnement."]],
          ['ex', 'Prêt bancaire', "L'<strong>emprunt</strong> est le contrat principal ; le <strong>cautionnement</strong> est le contrat accessoire qui garantit le remboursement du prêt."],
          ['ex', "Bail d'habitation", "Le <strong>contrat de location</strong> est le contrat principal (l'obligation principale du locataire est de payer son loyer) ; l'<strong>acte de cautionnement</strong> est le contrat accessoire qui garantit le paiement des loyers impayés."],
        ],
      },
      {
        id: 's4', title: 'Les conditions de forme : écrit et mentions obligatoires',
        blocks: [
          ['p', "Le formalisme du cautionnement est <strong>strictement encadré pour protéger la caution</strong>."],
          ['h', "1. L'exigence d'un écrit"],
          ['p', "Le contrat de cautionnement doit être établi <strong>par écrit, à peine de nullité</strong>. En l'absence d'écrit, le cautionnement est nul : un engagement oral n'a aucune valeur juridique."],
          ['h', "2. Les mentions obligatoires générales (à peine de nullité)"],
          ['ul', [
            "L'<strong>identité du débiteur principal</strong> ;",
            "La <strong>dette garantie</strong>, qui doit être <strong>déterminée ou au moins déterminable</strong> (son montant).",
          ]],
          ['h', '3. La mention propre à la caution personne physique'],
          ['p', "Pour s'assurer que la caution mesure la portée de son engagement, le Code civil (article 2291, selon le cours) impose une mention obligatoire pour <strong>toute caution personne physique</strong> :"],
          ['ul', [
            "La caution doit <strong>apposer elle-même</strong> sur l'acte une mention indiquant qu'elle s'engage à payer la dette du débiteur en cas de défaillance de celui-ci, <strong>dans la limite d'un montant exprimé en toutes lettres et en chiffres</strong>.",
            "<strong>En cas de divergence</strong> entre la somme en lettres et la somme en chiffres, <strong>c'est la somme en lettres qui prévaut</strong>.",
            "<strong>Sanction</strong> : l'absence de cette mention entraîne la <strong>nullité du cautionnement</strong>.",
          ]],
          ['ex', '« Bon pour caution de… »', "Dans un contrat de location, les parents (ou garants) rédigent de manière manuscrite la formule « Bon pour caution de… » suivie de la somme en lettres et en chiffres, avant de signer l'acte."],
          ['warn', "<strong>Référence à vérifier.</strong> Le numéro d'article (2291) provient de la reconstruction de l'enregistrement audio. Les numéros d'articles du Code civil relatifs au cautionnement ont été renumérotés lors de la réforme du droit des sûretés : vérifie ce numéro dans ton Code ou auprès de ta professeure avant de le citer. Le contenu de la règle, lui, est celui du cours."],
          ['h', '4. La mention spécifique au cautionnement solidaire'],
          ['p', "En cas de cautionnement solidaire, la caution personne physique doit <strong>également</strong> apposer une mention spécifique indiquant qu'elle reconnaît :"],
          ['ol', [
            "qu'elle <strong>ne peut pas exiger du créancier qu'il poursuive d'abord le débiteur principal</strong> (renonciation au bénéfice de discussion) ;",
            "qu'il <strong>ne divise pas ses poursuites</strong> entre les différentes cautions (renonciation au bénéfice de division).",
          ]],
          ['dist', 'Sanction : pas de nullité, mais une requalification', "L'absence de cette mention <strong>n'entraîne pas la nullité</strong> de l'acte. Le cautionnement reste valable, mais il est <strong>requalifié en cautionnement simple</strong> : le créancier doit alors poursuivre d'abord le débiteur principal (et la caution retrouve ses deux bénéfices)."],
          ['prof', "Le créancier a donc <strong>tout intérêt à s'assurer que la caution appose bien cette mention</strong>."],
        ],
      },
      {
        id: 's5', title: "L'étendue et le plafond de l'engagement",
        blocks: [
          ['ul', [
            "<strong>Extension aux intérêts et accessoires</strong> : sauf clause contraire prévue dans le contrat, le cautionnement s'étend <strong>de plein droit</strong> aux intérêts et accessoires de la dette (ex. : intérêts de l'emprunt, intérêts de retard, assurance souscrite sur le prêt).",
            "<strong>Plafonnement légal</strong> : le cautionnement <strong>ne peut excéder le montant de la dette du débiteur principal</strong>, ni être contracté à des <strong>conditions plus onéreuses</strong>. La caution ne peut jamais être tenue de payer plus que ce que doit le débiteur principal.",
          ]],
        ],
      },
      {
        id: 's6', title: 'Synthèse des conditions de validité',
        blocks: [
          ['table', ['Condition', 'Contenu', 'Sanction en cas de manquement'], [
            ['Capacité', 'Caution majeure, non protégée ; tuteur interdit ; époux : biens propres et revenus seulement (sauf accord exprès / engagement conjoint)', '—'],
            ['Solvabilité', 'Capacité financière de rembourser la dette garantie', '—'],
            ['Consentement', 'Exprès, libre et éclairé', '—'],
            ['Mise en garde (créancier pro → caution personne physique)', 'Alerter sur tous les risques, notamment si l\'engagement du débiteur est inadapté à ses capacités', 'Déchéance du créancier à hauteur du préjudice de la caution'],
            ['Proportionnalité (créancier pro → caution personne physique)', 'Engagement non manifestement disproportionné aux biens et revenus de la caution', 'Réduction au montant que la caution pouvait raisonnablement garantir'],
            ['Contenu licite et certain', 'Obligation principale valable, certaine et existante (caractère accessoire)', 'Pas d\'obligation principale → pas de cautionnement'],
            ['Écrit', 'Acte écrit', '<strong>Nullité</strong>'],
            ['Mentions générales', 'Identité du débiteur principal ; dette garantie déterminée ou déterminable', '<strong>Nullité</strong>'],
            ['Mention de la caution personne physique', 'Engagement de payer + plafond en lettres et en chiffres (lettres prévalent)', '<strong>Nullité</strong>'],
            ['Mention du cautionnement solidaire', 'Renonciation aux bénéfices de discussion et de division', '<strong>Requalification en cautionnement simple</strong> (pas de nullité)'],
          ]],
          ['key', [
            "Écrit + identité du débiteur + dette garantie + mention en lettres et en chiffres → sinon nullité.",
            "Mention solidaire manquante → cautionnement simple, pas nul.",
            "Lettres ≠ chiffres → les lettres l'emportent.",
            "Jamais plus que la dette principale ; intérêts et accessoires inclus sauf clause contraire.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 4
  {
    id: 'c4', num: 4, part: 'p1', short: 'Effets et extinction',
    title: 'Les effets et l\'extinction du cautionnement',
    lead: "Obligations d'information du créancier, mise en jeu, défenses de la caution, recours après paiement et fin du cautionnement.",
    src: [2, 3],
    sections: [
      {
        id: 's1', title: "Les obligations d'information du créancier",
        blocks: [
          ['p', "Pour protéger la caution, le <strong>créancier professionnel</strong> (celui dont la créance est née dans l'exercice de sa profession, tel qu'un établissement de crédit ou une banque) est soumis à <strong>deux obligations d'information</strong> :"],
          ['table', ['', 'Information annuelle', "Information en cas d'incident de paiement"], [
            ['Contenu', "Informer la caution <strong>chaque année, avant le 31 mars</strong>, du <strong>montant de la dette restante due</strong> par le débiteur <strong>au 31 décembre de l'année précédente</strong>.", "Informer la caution personne physique <strong>dès le premier incident de paiement</strong> du débiteur <strong>non régularisé dans le mois</strong> suivant son exigibilité."],
            ['Sanction', "Déchéance du droit de réclamer à la caution les <strong>intérêts et pénalités échus entre la dernière information et la communication de la nouvelle information</strong>.", "Le créancier ne peut pas réclamer à la caution les <strong>intérêts et pénalités échus entre la date de l'incident et celle de l'information</strong>."],
          ]],
          ['dist', 'La sanction ne touche pas le capital', "Dans les deux cas, le créancier perd le droit de réclamer à la caution les <strong>intérêts et pénalités</strong> de la période concernée — le cours ne prévoit pas la perte du droit de réclamer la dette elle-même."],
          ['warn', "Le cours 3 (révision) résume l'information en cas d'incident par « prévenir la caution dès la défaillance du débiteur ». La formulation précise retenue ici (premier incident <strong>non régularisé dans le mois</strong> suivant son exigibilité) est celle du cours 2."],
        ],
      },
      {
        id: 's2', title: 'La mise en jeu du cautionnement',
        blocks: [
          ['p', "En raison du <strong>caractère accessoire</strong> du cautionnement, la caution ne peut être poursuivie que lorsque <strong>la dette du débiteur principal est devenue exigible</strong> et que <strong>celui-ci n'a pas payé</strong>. Les modalités dépendent ensuite de la forme du cautionnement :"],
          ['ul', [
            "<strong>Cautionnement simple</strong> : le créancier doit <strong>d'abord poursuivre le débiteur principal</strong>, et justifier auprès de la caution des démarches engagées et de l'insolvabilité du débiteur avant de pouvoir la poursuivre.",
            "<strong>Cautionnement solidaire</strong> : le créancier peut <strong>agir directement contre la caution</strong> et demander à <strong>une seule caution</strong> le paiement de <strong>l'intégralité de la dette</strong>, même s'il existe plusieurs cautions.",
          ]],
        ],
      },
      {
        id: 's3', title: 'Les moyens de défense de la caution',
        blocks: [
          ['h', 'Selon la nature du cautionnement'],
          ['ul', [
            "<strong>Cautionnement simple</strong> : <strong>bénéfice de discussion</strong> (le créancier doit poursuivre d'abord le débiteur principal et démontrer que ces poursuites n'ont pas permis d'obtenir le règlement : insolvabilité) et <strong>bénéfice de division</strong> (en cas de pluralité de cautions, n'être poursuivie que pour sa part).",
            "<strong>Cautionnement solidaire</strong> : la caution <strong>ne peut pas se prévaloir</strong> des bénéfices de discussion et de division.",
          ]],
          ['h', 'Les exceptions opposables au paiement'],
          ['p', "Pour s'opposer au paiement, la caution peut invoquer contre le créancier <strong>toutes les exceptions au paiement dont dispose le débiteur</strong> :"],
          ['ul', [
            "<strong>Exceptions liées à la dette</strong> : par exemple, l'<strong>inexécution du contrat par le créancier</strong>.",
            "<strong>Exceptions personnelles liées au débiteur</strong> : par exemple, la <strong>nullité du contrat pour dol</strong>.",
          ]],
          ['dist', 'Limite : les mesures liées à la défaillance du débiteur', "La caution <strong>ne peut pas se prévaloir des mesures accordées au débiteur en raison de sa défaillance</strong>. Par exemple, si le débiteur fait l'objet d'une <strong>procédure collective</strong>, la caution ne peut pas invoquer cette situation pour refuser de payer le créancier. C'est logique : c'est précisément contre la défaillance du débiteur que la caution garantit le créancier."],
          ['h', 'La protection minimale de la caution personne physique'],
          ['p', "L'action du créancier ne peut <strong>priver la caution personne physique d'un minimum de ressources</strong>, qui correspond au montant du <strong>Revenu de Solidarité Active (RSA)</strong>."],
        ],
      },
      {
        id: 's4', title: 'Les recours de la caution après paiement',
        blocks: [
          ['p', "Une fois qu'elle a payé le créancier, la caution dispose de recours afin de récupérer les sommes versées :"],
          ['ul', [
            "<strong>Recours contre le débiteur principal</strong> : la caution peut se retourner contre lui (y compris devant les tribunaux) pour obtenir le remboursement des <strong>sommes payées au créancier</strong> ainsi que des <strong>frais engagés</strong>.",
            "<strong>Recours contre les autres cautions</strong> (cautionnement solidaire) : la caution qui a payé l'intégralité de la dette peut obtenir des autres cautions le remboursement de <strong>leur quote-part</strong>, <strong>à proportion de leurs engagements respectifs</strong> (article 2312 du Code civil, cité par le cours).",
          ]],
          ['ex', 'La caution solidaire qui paie tout', "Une caution solidaire qui n'avait garanti que 20 % de la dette en a réglé l'intégralité. Elle dispose d'un recours en remboursement contre le débiteur principal, ainsi que contre chacune des autres cautions pour récupérer leur quote-part respective."],
        ],
      },
      {
        id: 's5', title: "L'extinction du cautionnement",
        blocks: [
          ['p', "Le cautionnement s'éteint principalement dans deux situations :"],
          ['ol', [
            "<strong>Lorsque l'obligation principale disparaît</strong> : par exemple, lorsque le débiteur a payé sa dette. L'obligation principale s'éteint, ce qui entraîne l'extinction du contrat accessoire : la garantie n'a plus d'objet.",
            "<strong>Lorsque la caution paie la dette à la place du débiteur</strong> : ce paiement entraîne également l'extinction de l'obligation principale qui était garantie.",
          ]],
          ['p', "Rappel (chapitre 2) : dans un cautionnement <strong>indéfini</strong>, la caution peut aussi <strong>résilier</strong> son engagement pour l'avenir, en respectant le préavis ; elle reste tenue des dettes nées avant la résiliation."],
          ['key', [
            "Information annuelle avant le 31 mars (dette au 31/12) ; incident non régularisé dans le mois → informer.",
            "Manquement → perte des intérêts et pénalités de la période.",
            "Simple : discussion + division. Solidaire : action directe pour le tout.",
            "La caution oppose les exceptions du débiteur (inexécution, dol) mais pas la procédure collective.",
            "Minimum RSA préservé pour la caution personne physique.",
            "Recours contre le débiteur (sommes + frais) et contre les autres cautions (quote-part).",
            "Extinction : paiement par le débiteur ou par la caution.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 5
  {
    id: 'c5', num: 5, part: 'p2', short: 'Sûretés réelles : généralités',
    title: 'Les sûretés réelles : notions générales',
    lead: "Définition, constituant, classification selon la nature du bien et droit préférentiel du créancier.",
    src: [2, 3],
    sections: [
      {
        id: 's1', title: 'Définition et parties',
        blocks: [
          ['def', 'La sûreté réelle', "La sûreté réelle consiste à <strong>affecter un bien ou un ensemble de biens, présents ou futurs, au paiement d'une dette</strong>. Contrairement aux sûretés personnelles qui reposent sur une personne, elle porte sur des <strong>biens</strong> (corporels ou incorporels)."],
          ['def', 'Le constituant', "La personne qui accorde au créancier une garantie sur un bien. Il peut s'agir du <strong>débiteur lui-même</strong> ou d'un <strong>tiers</strong>."],
          ['dist', 'Condition de propriété', "Pour pouvoir consentir une sûreté réelle, le constituant doit <strong>impérativement être propriétaire</strong> du bien donné en garantie. Exemple : <strong>un locataire ne peut pas hypothéquer l'appartement qu'il loue</strong>."],
        ],
      },
      {
        id: 's2', title: 'Classification selon la nature du bien',
        blocks: [
          ['table', ['Nature du bien', 'Sûreté', 'Exemples du cours'], [
            ['Meuble <strong>corporel</strong>', '<strong>Gage</strong>', 'Voiture, bijoux (bagues, montres), meubles d\'une maison (un lit), matériel d\'exploitation d\'entreprise'],
            ['Meuble <strong>incorporel</strong>', '<strong>Nantissement</strong>', 'Actions de société, parts sociales, fonds de commerce, créance'],
            ['<strong>Immeuble</strong> (bâtiments, terrains, maisons, appartements)', '<strong>Hypothèque</strong>', 'Maison, résidence principale'],
          ]],
        ],
      },
      {
        id: 's3', title: 'Effet principal : le droit préférentiel',
        blocks: [
          ['def', 'Le créancier chirographaire', "Créancier <strong>ordinaire</strong> qui ne détient <strong>pas de sûreté</strong>."],
          ['p', "Les sûretés réelles confèrent au créancier une position <strong>privilégiée</strong> par rapport aux créanciers chirographaires : en cas de défaillance du débiteur, le créancier titulaire d'une sûreté réelle bénéficie d'un <strong>droit préférentiel, voire exclusif</strong>, pour être <strong>payé en priorité sur le prix de vente du bien affecté</strong> en garantie."],
          ['ex', 'Exemple chiffré', "Un immeuble vaut <strong>200 000 €</strong>. Le créancier titulaire de la sûreté détient une créance de <strong>198 000 €</strong> : il passe en premier et perçoit 198 000 €. Les créanciers chirographaires ne se partagent que les <strong>2 000 €</strong> restants."],
          ['key', [
            "Sûreté réelle = un bien (présent ou futur) affecté au paiement d'une dette.",
            "Constituant = débiteur ou tiers, obligatoirement propriétaire du bien.",
            "Meuble corporel → gage ; meuble incorporel → nantissement ; immeuble → hypothèque.",
            "Droit de préférence : payé en priorité sur le prix de vente, avant les chirographaires.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 6
  {
    id: 'c6', num: 6, part: 'p2', short: 'Le gage',
    title: 'Le gage',
    lead: "Sûreté réelle sur des meubles corporels : conditions, formes avec ou sans dépossession, effets avant et à l'échéance.",
    src: [2, 3],
    sections: [
      {
        id: 's1', title: 'Définition et parties',
        blocks: [
          ['def', 'Le gage', "Sûreté réelle portant <strong>exclusivement sur des biens meubles corporels</strong>. C'est le contrat par lequel une personne (le <strong>constituant</strong>) accorde à un créancier le <strong>droit d'être payé par préférence</strong> (en priorité) sur un bien mobilier ou un ensemble de biens mobiliers corporels, <strong>présents ou futurs</strong> (article 2333 du Code civil, cité par le cours)."],
          ['ul', [
            "<strong>Exemples de biens gageables</strong> : un véhicule, un meuble tel qu'un lit, des bijoux (bagues, montres), du matériel d'exploitation d'entreprise.",
            "<strong>Exclu</strong> : un immeuble comme une maison (→ hypothèque).",
            "<strong>Les parties</strong> : le <strong>constituant</strong> (celui qui remet le bien en garantie) et le <strong>créancier gagiste</strong> (le créancier bénéficiaire du gage).",
          ]],
        ],
      },
      {
        id: 's2', title: 'Conditions de validité',
        blocks: [
          ['p', "Pour être valide, l'acte de gage doit être <strong>constaté par écrit</strong> et mentionner, <strong>à peine de nullité</strong> :"],
          ['ol', [
            "<strong>La dette garantie</strong> : son <strong>montant</strong> et sa <strong>date d'exigibilité</strong> ;",
            "<strong>Le bien donné en gage</strong> : sa <strong>nature</strong> et sa <strong>quantité</strong>.",
          ]],
        ],
      },
      {
        id: 's3', title: 'Les deux formes de gage et leur opposabilité aux tiers',
        blocks: [
          ['table', ['', 'Gage avec dépossession', 'Gage sans dépossession'], [
            ['Fonctionnement', "Le constituant <strong>remet matériellement le bien</strong> au créancier gagiste pendant la durée du contrat.", "Le bien <strong>reste entre les mains du constituant</strong>, qui peut continuer à l'utiliser, tout en ayant l'<strong>interdiction de le vendre ou de s'en défaire</strong>."],
            ['Opposabilité aux tiers', "La <strong>remise matérielle du bien suffit</strong> à rendre le gage opposable aux tiers.", "<strong>Publicité</strong> : inscription sur le <strong>registre spécial des sûretés mobilières</strong>, tenu au <strong>greffe du tribunal de commerce</strong>."],
            ['Exemple', "Dépôt d'un bijou chez un <strong>prêteur sur gage</strong> en échange d'une somme d'argent, puis restitution une fois la somme remboursée.", "Gage d'un <strong>véhicule</strong> (de fonction) ou de <strong>matériel professionnel</strong> par une société ; tout tiers peut consulter un extrait des sûretés et vérifier si un bien est gagé (ex. : un acheteur potentiel de véhicule)."],
          ]],
          ['def', "L'opposabilité aux tiers", "Le fait que le gage « existe aux yeux des tiers » et puisse leur être imposé. Selon la forme du gage, elle résulte de la remise du bien ou de la publicité au registre."],
        ],
      },
      {
        id: 's4', title: "Les effets avant l'échéance : l'obligation de conservation",
        blocks: [
          ['p', "Quelle que soit la forme du gage, <strong>celui qui détient le bien</strong> est tenu d'une <strong>obligation de conservation</strong> :"],
          ['ul', [
            "<strong>Gage avec dépossession</strong> : le bien étant remis au créancier, c'est le <strong>créancier gagiste</strong> qui doit en assurer la conservation et l'entretien.",
            "<strong>Gage sans dépossession</strong> : le bien restant chez le débiteur, c'est le <strong>constituant</strong> qui doit le conserver et en préserver la valeur (par exemple pour du matériel d'exploitation), en s'abstenant de tout acte susceptible de diminuer cette valeur.",
          ]],
        ],
      },
      {
        id: 's5', title: "Les effets à l'échéance",
        blocks: [
          ['h', 'Première hypothèse : la dette est intégralement payée'],
          ['p', "Le gage prend fin :"],
          ['ul', [
            "<strong>Avec dépossession</strong> : le créancier gagiste doit <strong>restituer le bien</strong> au constituant.",
            "<strong>Sans dépossession</strong> : le constituant demande la <strong>radiation de l'inscription</strong> au registre spécial des sûretés, au greffe du tribunal de commerce, afin de matérialiser la fin du gage.",
          ]],
          ['h', "Seconde hypothèse : la dette n'est pas payée à l'échéance"],
          ['p', "Le gage <strong>ne s'éteint pas</strong> et le créancier gagiste dispose de <strong>quatre droits</strong> :"],
          ['ol', [
            "<strong>Le droit de rétention</strong> (gage avec dépossession) : conserver le bien gagé entre ses mains <strong>tant que la dette n'est pas intégralement payée</strong>.",
            "<strong>Le droit de préférence</strong> : faire vendre le bien (généralement aux enchères publiques) et être <strong>payé en priorité sur le prix de vente</strong>. <strong>Restitution du surplus</strong> : si le prix dépasse la dette, le créancier doit restituer l'excédent au constituant.",
            "<strong>L'attribution judiciaire du bien en paiement</strong> : demander au juge que la <strong>propriété</strong> du bien lui soit attribuée en paiement. Devenu propriétaire, le créancier n'est pas tenu de vendre : il peut conserver le bien et en disposer librement, ce qui solde la dette.",
            "<strong>Le droit de suite</strong> (notamment en cas de gage sans dépossession) : si le constituant a vendu le bien à un tiers sans avoir remboursé, le créancier peut aller <strong>rechercher le bien entre les mains du tiers acquéreur</strong>.",
          ]],
          ['ex', 'Le surplus du bijou en or', "Un bijou en or garantit une dette de <strong>1 000 €</strong> et est vendu <strong>1 800 €</strong> : le créancier gagiste se paie 1 000 € et doit restituer le surplus de <strong>800 €</strong> au constituant."],
          ['ex', 'La voiture gagée revendue', "Une voiture gagée est revendue à un acheteur qui n'a pas consulté le registre des gages au greffe. Le créancier gagiste peut récupérer la voiture entre ses mains ; à charge ensuite pour l'acheteur négligent de se retourner contre le débiteur vendeur."],
          ['key', [
            "Gage = meubles corporels ; écrit + dette (montant, exigibilité) + bien (nature, quantité) à peine de nullité.",
            "Avec dépossession : opposable par la remise. Sans dépossession : opposable par l'inscription au registre (greffe du tribunal de commerce).",
            "Conservation : par celui qui détient le bien.",
            "Payé → restitution ou radiation. Impayé → rétention, préférence (+ surplus), attribution judiciaire, suite.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 7
  {
    id: 'c7', num: 7, part: 'p2', short: 'Le nantissement',
    title: 'Le nantissement',
    lead: "Sûreté réelle sur des meubles incorporels : objet, formes, formalités, opposabilité et droits du créancier nanti.",
    src: [1, 2, 4],
    sections: [
      {
        id: 's1', title: 'Définition et objet',
        blocks: [
          ['def', 'Le nantissement', "Sûreté réelle qui consiste à affecter, en garantie d'une obligation, <strong>un bien meuble incorporel ou un ensemble de biens meubles incorporels, présents ou futurs</strong> (article 2355 du Code civil, cité par le cours)."],
          ['def', 'Le bien meuble incorporel', "Bien <strong>immatériel</strong>, que l'on ne peut ni toucher ni palper — contrairement aux immeubles (une maison) ou aux meubles corporels concernés par le gage."],
          ['p', "<strong>Exemples de biens susceptibles d'être nantis :</strong>"],
          ['ul', [
            "un <strong>fonds de commerce</strong> ;",
            "des <strong>parts sociales</strong> (dans les sociétés civiles et les SARL) ;",
            "des <strong>actions</strong> (dans les sociétés par actions : SAS, SA) ;",
            "une <strong>créance de somme d'argent</strong> détenue par le constituant envers un tiers débiteur (ex. : un créancier auquel un débiteur doit 50 000 € peut donner cette créance en garantie à son propre créancier).",
          ]],
          ['ex', "Le prêt d'1 M€ à une SAS", "Un dirigeant contracte un emprunt bancaire de <strong>1 000 000 €</strong> pour sa SAS valorisée <strong>2 000 000 €</strong>. La banque peut exiger, <strong>en plus d'une caution personnelle du dirigeant</strong>, le nantissement de <strong>50 % des actions</strong>. En cas de non-remboursement, la banque peut récupérer ces 50 % des actions."],
          ['prof', "Le nantissement porte généralement sur des <strong>dettes de montant élevé</strong> et engage des <strong>actifs essentiels</strong> (fonds de commerce, titres de société), ce qui incite fortement le débiteur à solder sa dette pour éviter de perdre son entreprise ou son outil professionnel."],
        ],
      },
      {
        id: 's2', title: 'Les deux formes de nantissement',
        blocks: [
          ['ol', [
            "<strong>Le nantissement conventionnel</strong> : consenti <strong>volontairement par un contrat</strong> conclu entre les parties au profit du créancier.",
            "<strong>Le nantissement judiciaire</strong> : <strong>ordonné par un juge</strong> à la demande du créancier lorsque le débiteur ne règle pas sa dette (ex. : un créancier auquel un commerçant doit de l'argent obtient du juge un nantissement sur son fonds de commerce).",
          ]],
        ],
      },
      {
        id: 's3', title: 'Conditions de forme et mentions obligatoires',
        blocks: [
          ['ul', [
            "<strong>Écrit obligatoire</strong> : qu'il résulte d'un contrat (nantissement conventionnel) ou d'une décision de justice (nantissement judiciaire).",
            "<strong>Mentions obligatoires</strong> : la <strong>désignation précise de la dette garantie</strong> et la <strong>désignation précise du bien nanti</strong> (sa nature et, le cas échéant, sa quantité).",
          ]],
          ['ex', '2 000 actions sur 10 000', "Le nantissement de <strong>2 000 actions</strong> sur les <strong>10 000</strong> actions composant le capital d'une société, soit <strong>20 % du capital</strong>."],
        ],
      },
      {
        id: 's4', title: "L'opposabilité aux tiers : publicité et notification",
        blocks: [
          ['table', ['Bien nanti', 'Formalité d\'opposabilité', 'Effet'], [
            ['Fonds de commerce, parts sociales, actions', "<strong>Publicité</strong> : inscription sur le <strong>registre spécial des sûretés</strong> tenu au <strong>greffe du tribunal de commerce</strong>.", "Le nantissement devient visible et opposable aux tiers : un acquéreur potentiel qui lève un <strong>état des nantissements</strong> lors d'un audit constatera que les titres sont inscrits sur un compte nanti et sont donc <strong>figés et incessibles</strong> tant que la dette n'est pas soldée."],
            ['Créance', "<strong>Notification</strong> au débiteur de la créance nantie (le tiers qui doit la somme). À défaut, ce débiteur doit <strong>intervenir directement à l'acte</strong> pour accepter que sa dette soit nantie.", "Le nantissement devient opposable au débiteur de la créance nantie."],
          ]],
        ],
      },
      {
        id: 's5', title: 'Les effets du nantissement',
        blocks: [
          ['dist', 'Toujours sans dépossession, donc pas de droit de rétention', "Contrairement au gage (avec ou sans dépossession), le nantissement s'opère <strong>toujours sans dépossession</strong> : le bien reste entre les mains du constituant (le commerçant conserve son fonds, l'associé ses actions ou parts). Le bien n'étant pas remis au créancier, le créancier nanti <strong>ne dispose pas d'un droit de rétention</strong>."],
          ['p', "<strong>Droits du créancier nanti en cas de non-paiement à l'échéance :</strong>"],
          ['ol', [
            "<strong>La vente du bien et le droit de préférence</strong> : demander au juge d'ordonner la vente du bien nanti et être payé <strong>en priorité sur le prix</strong>.",
            "<strong>L'attribution judiciaire</strong> : demander au juge la propriété du bien en paiement ; il peut le conserver sans obligation de le revendre.",
            "<strong>Le droit de suite</strong> : si le constituant a cédé le bien à un tiers sans solder sa dette, saisir le bien entre les mains du tiers acquéreur pour le faire vendre et être payé sur le prix.",
            "<strong>Cas du nantissement de créance</strong> : le créancier nanti détient <strong>seul le droit de recevoir le paiement directement auprès du débiteur de la créance nantie</strong> ; le créancier intermédiaire (constituant) est écarté.",
          ]],
          ['ul', [
            "<strong>Restitution du surplus</strong> : comme pour le gage, si le prix de vente ou les sommes perçues excèdent la dette, le surplus est restitué au constituant.",
            "<strong>Extinction</strong> : le nantissement prend fin lorsque la dette garantie est <strong>intégralement payée</strong>.",
          ]],
          ['key', [
            "Nantissement = meubles incorporels (fonds de commerce, parts, actions, créance).",
            "Conventionnel ou judiciaire ; toujours par écrit ; dette et bien précisément désignés.",
            "Fonds / parts / actions → inscription au greffe du tribunal de commerce. Créance → notification (ou intervention à l'acte).",
            "Toujours sans dépossession → pas de droit de rétention.",
            "Vente + préférence, attribution judiciaire, droit de suite, paiement direct (créance), surplus restitué.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 8
  {
    id: 'c8', num: 8, part: 'p2', short: "L'hypothèque",
    title: "L'hypothèque",
    lead: "Sûreté réelle immobilière sans dépossession : origines, acte notarié, publicité foncière, règle du rang et saisie immobilière.",
    src: [1, 2, 4],
    sections: [
      {
        id: 's1', title: 'Définition et caractère sans dépossession',
        blocks: [
          ['def', "L'hypothèque", "Sûreté réelle qui consiste à <strong>affecter un bien immobilier dont on est propriétaire</strong> en garantie d'une obligation, <strong>sans dépossession</strong> (article 2385 du Code civil, cité par le cours)."],
          ['p', "<strong>Maintien de la jouissance</strong> : le constituant conserve l'usage et la possession de son bien. Un propriétaire qui hypothèque sa résidence principale continue d'y habiter sans avoir à déménager."],
        ],
      },
      {
        id: 's2', title: "Les trois origines de l'hypothèque",
        blocks: [
          ['table', ['Origine', 'Source', 'Précisions du cours'], [
            ['<strong>Légale</strong>', 'La <strong>loi</strong>', 'La loi l\'impose obligatoirement pour certaines opérations déterminées.'],
            ['<strong>Judiciaire</strong>', 'Un <strong>juge</strong>', 'Autorisée par un juge à la demande d\'un créancier qui craint de ne pas être remboursé ; son inscription nécessite obligatoirement l\'autorisation préalable du juge.'],
            ['<strong>Conventionnelle</strong>', 'Un <strong>accord contractuel</strong> entre les parties', 'Doit être constatée par un acte notarié.'],
          ]],
          ['ex', "L'hypothèque exigée par l'administration fiscale", "Un cédant vend ses parts sociales avec un <strong>crédit-vendeur échelonné</strong> sur plusieurs années, mais doit acquitter immédiatement l'impôt sur la plus-value. L'administration fiscale peut lui accorder un échelonnement de sa dette fiscale (par exemple sur 5 ans) en exigeant en garantie une <strong>hypothèque conventionnelle sur sa maison</strong>."],
          ['warn', "Le cours ne donne <strong>pas d'exemple</strong> d'opération pour laquelle la loi impose une hypothèque légale : retiens la définition (« elle résulte directement de la loi ») sans inventer d'exemple."],
        ],
      },
      {
        id: 's3', title: 'Les conditions de forme',
        blocks: [
          ['ul', [
            "<strong>Hypothèque conventionnelle</strong> : portant sur un bien immobilier, elle doit obligatoirement être constatée par un <strong>acte notarié</strong> établi devant notaire.",
            "<strong>Mentions obligatoires</strong> : désignation précise du <strong>bien immobilier hypothéqué</strong> et désignation de la <strong>créance garantie</strong>.",
            "<strong>Hypothèque judiciaire</strong> : son inscription nécessite obligatoirement l'<strong>autorisation préalable d'un juge</strong>.",
          ]],
        ],
      },
      {
        id: 's4', title: "L'opposabilité aux tiers et la règle du rang",
        blocks: [
          ['p', "L'acte notarié n'engage initialement que le débiteur et le créancier. L'hypothèque doit donc être <strong>inscrite (publiée) auprès du Service de la Publicité Foncière (SPF)</strong> — qui relève de l'administration fiscale / service des impôts — afin d'être <strong>visible et opposable aux tiers</strong>."],
          ['def', 'La règle du rang', "Un même bien immobilier peut être hypothéqué au profit de <strong>plusieurs créanciers</strong>. En cas de vente, la <strong>date d'inscription au SPF</strong> détermine l'ordre de paiement : le créancier <strong>inscrit en premier est payé en priorité</strong>, les suivants selon l'<strong>ordre chronologique</strong> de leurs inscriptions."],
        ],
      },
      {
        id: 's5', title: "Les effets en cas de non-paiement à l'échéance",
        blocks: [
          ['h', 'La procédure de saisie immobilière : trois conditions'],
          ['ol', [
            "<strong>Détenir un titre exécutoire</strong> : l'acte notarié constatant l'hypothèque, ou une décision de justice.",
            "<strong>Délivrer un commandement de payer</strong> au débiteur, par l'intermédiaire d'un <strong>commissaire de justice</strong> (anciennement huissier de justice).",
            "<strong>Publier ce commandement au Service de la Publicité Foncière</strong>.",
          ]],
          ['h', 'Les prérogatives du créancier hypothécaire'],
          ['p', "Elles sont similaires à celles du créancier gagiste et du créancier nanti :"],
          ['ol', [
            "<strong>Vente du bien et droit de préférence (selon le rang)</strong> : faire vendre l'immeuble saisi et être payé en priorité sur le prix, dans le respect de la règle du rang.",
            "<strong>Attribution judiciaire</strong> : devenir propriétaire du bien en paiement de sa créance.",
            "<strong>Restitution du surplus</strong> : si la valeur du bien attribué ou son prix de vente excède la dette, le surplus est restitué au débiteur (ou affecté au remboursement des autres créanciers inscrits).",
            "<strong>Droit de suite</strong> : si le débiteur a vendu l'immeuble à un tiers sans rembourser, le créancier peut le saisir entre les mains du tiers acquéreur pour le faire vendre et être payé sur le prix.",
          ]],
          ['key', [
            "Hypothèque = immeuble dont on est propriétaire, sans dépossession.",
            "Légale (loi), judiciaire (juge), conventionnelle (contrat, acte notarié).",
            "Opposabilité : inscription au Service de la Publicité Foncière ; rang = date d'inscription.",
            "Saisie : titre exécutoire + commandement de payer (commissaire de justice) + publication au SPF.",
            "Prérogatives : vente + préférence selon le rang, attribution, surplus, droit de suite.",
          ]],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── CHAPITRE 9
  {
    id: 'c9', num: 9, part: 'synth', short: 'Synthèse comparative',
    title: 'Synthèse comparative des sûretés',
    lead: "Les tableaux qui relient tout le programme — idéal la veille de l'examen. Aucune règle nouvelle : uniquement des rapprochements entre les chapitres.",
    src: [1, 2, 3, 4],
    sections: [
      {
        id: 's1', title: 'Les trois sûretés réelles côte à côte',
        blocks: [
          ['table', ['', 'Gage', 'Nantissement', 'Hypothèque'], [
            ['Bien', 'Meuble corporel', 'Meuble incorporel', 'Immeuble'],
            ['Forme de l\'acte', 'Écrit', 'Écrit (contrat ou décision de justice)', 'Acte notarié (conventionnelle) ; autorisation du juge (judiciaire)'],
            ['Mentions', 'Dette (montant, exigibilité) ; bien (nature, quantité) — à peine de nullité', 'Dette et bien précisément désignés (nature, quantité)', 'Bien immobilier et créance garantie'],
            ['Dépossession ?', 'Avec <strong>ou</strong> sans', '<strong>Toujours sans</strong>', '<strong>Sans</strong>'],
            ['Opposabilité', 'Remise du bien (avec) ; registre des sûretés mobilières au greffe du tribunal de commerce (sans)', 'Registre au greffe du tribunal de commerce (fonds, parts, actions) ; notification (créance)', 'Service de la Publicité Foncière'],
            ['Droit de rétention', 'Oui (avec dépossession)', 'Non', '—'],
            ['Préférence', 'Oui', 'Oui', 'Oui, selon le rang'],
            ['Attribution judiciaire', 'Oui', 'Oui', 'Oui'],
            ['Droit de suite', 'Oui (notamment sans dépossession)', 'Oui', 'Oui'],
            ['Surplus', 'Restitué au constituant', 'Restitué au constituant', 'Restitué au débiteur (ou aux autres créanciers inscrits)'],
            ['Origines', '—', 'Conventionnel ou judiciaire', 'Légale, judiciaire ou conventionnelle'],
          ]],
        ],
      },
      {
        id: 's2', title: 'Les sanctions à ne pas confondre (cautionnement)',
        blocks: [
          ['table', ['Manquement', 'Sanction'], [
            ['Pas d\'écrit', 'Nullité'],
            ['Pas d\'identité du débiteur / de dette garantie', 'Nullité'],
            ['Pas de mention manuscrite (montant en lettres et en chiffres) — caution personne physique', 'Nullité'],
            ['Pas de mention solidaire', 'Requalification en cautionnement simple'],
            ['Manquement au devoir de mise en garde', 'Déchéance à hauteur du préjudice subi par la caution'],
            ['Engagement manifestement disproportionné', 'Réduction au montant que la caution pouvait raisonnablement garantir'],
            ['Défaut d\'information annuelle', 'Perte des intérêts et pénalités échus entre la dernière et la nouvelle information'],
            ['Défaut d\'information sur l\'incident de paiement', 'Perte des intérêts et pénalités échus entre l\'incident et l\'information'],
          ]],
        ],
      },
      {
        id: 's3', title: 'Qui fait quoi ? Les acteurs et les lieux',
        blocks: [
          ['table', ['Acteur / lieu', 'Rôle dans le cours'], [
            ['Tribunal judiciaire', 'Litiges sur un cautionnement civil (magistrats professionnels)'],
            ['Tribunal de commerce', 'Litiges sur un cautionnement commercial (juges issus du monde économique)'],
            ['Greffe du tribunal de commerce', 'Registre des sûretés : gage sans dépossession, nantissement de fonds, parts et actions ; radiation du gage'],
            ['Service de la Publicité Foncière', 'Inscription de l\'hypothèque (rang) ; publication du commandement de payer'],
            ['Notaire', 'Acte notarié de l\'hypothèque conventionnelle (qui vaut titre exécutoire)'],
            ['Commissaire de justice', 'Délivre le commandement de payer (saisie immobilière)'],
            ['Juge', 'Nantissement judiciaire, hypothèque judiciaire, vente du bien nanti, attribution judiciaire'],
          ]],
        ],
      },
      {
        id: 's4', title: 'Les rapprochements utiles',
        blocks: [
          ['dist', 'Le bénéfice de discussion et la saisie du débiteur', "En cautionnement simple, le créancier doit d'abord rechercher et saisir les biens du débiteur principal. Le cautionnement solidaire supprime cette étape — sauf si la mention solidaire manque, auquel cas on revient au cautionnement simple."],
          ['dist', 'Caractère accessoire partout', "Le cautionnement s'éteint avec l'obligation principale ; le gage prend fin quand la dette est payée (restitution ou radiation) ; le nantissement prend fin quand la dette est intégralement payée."],
          ['dist', 'Le cumul des sûretés', "Dans l'exemple du prêt d'1 M€ à une SAS, la banque cumule une <strong>sûreté personnelle</strong> (caution du dirigeant) et une <strong>sûreté réelle</strong> (nantissement de 50 % des actions)."],
        ],
      },
    ],
  },
];

// Points à vérifier / incohérences relevées dans les sources (affichés dans une page dédiée)
export const CHECKS = [
  { ch: 'c2', s: 's1', title: 'Étendue de l\'engagement de la caution solidaire', text: "Cours 1 : « la totalité de la somme garantie ». Cours 3 : « l'intégralité de la dette, même si elle ne s'était engagée que pour une partie de la dette ». À rapprocher du plafond légal (cours 1 : jamais plus que la dette du débiteur principal). Les deux formulations sont conservées." },
  { ch: 'c2', s: 's3', title: 'Définition du cautionnement indéfini', text: "Cours 1 : dettes futures indéterminées (engagement à durée indéterminée). Cours 3 : montant indéterminable au moment de l'engagement (dettes futures ou accessoires). Présentées ensemble." },
  { ch: 'c3', s: 's4', title: 'Numéro d\'article de la mention manuscrite', text: "Le cours 2 cite l'article 2291 du Code civil. Ce numéro provient de la reconstruction audio ; les articles du cautionnement ont été renumérotés par la réforme des sûretés. À vérifier avant de le citer." },
  { ch: 'c4', s: 's1', title: "Information en cas d'incident de paiement", text: "Cours 2 : dès le premier incident non régularisé dans le mois suivant l'exigibilité. Cours 3 : « dès la défaillance du débiteur ». La version détaillée du cours 2 est retenue." },
  { ch: 'c4', s: 's1', title: 'Débiteur de l\'obligation d\'information', text: "Cours 2 : le créancier professionnel. Cours 3 : « le créancier ». La précision du cours 2 est retenue." },
  { ch: 'c8', s: 's2', title: 'Hypothèque légale sans exemple', text: "Le cours définit l'hypothèque légale sans illustrer les opérations concernées. Aucun exemple n'a été ajouté." },
  { ch: 'c1', s: 's1', title: 'Références d\'articles et exigibilité', text: "Seul l'article 2288 a fait l'objet d'une remarque explicite (non exigé à l'examen). Pour les autres articles cités (2305, 2305-1, 2291, 2312, 2333, 2355, 2385), le cours ne précise pas s'ils sont exigibles." },
];
