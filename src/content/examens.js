// Examens blancs. Barème d'ENTRAÎNEMENT (le barème réel du contrôle est inconnu).
// Cas pratiques : chaque question a des points et une grille de critères [élément attendu, points].
export const EXAMS_CAS = [
  {
    id: 'ex1', title: 'Examen blanc n° 1 — La librairie de Sofia', duration: 60, focus: 'Cautionnement',
    enonce: `<p>Sofia exploite une librairie à Nantes. En mars 2024, elle emprunte 60 000 € à la banque Atlantique pour rénover sa boutique. La banque obtient deux cautions :</p>
<ul>
<li><strong>Victor</strong>, père de Sofia, retraité, propriétaire d'une maison estimée à 400 000 €. Il signe un acte écrit qui identifie Sofia et la dette, et rédige : « Je m'engage, en qualité de caution, à payer à la banque Atlantique ce que lui doit Sofia en cas de défaillance de sa part, dans la limite de trente mille euros (30 000 €). » L'acte précise que l'engagement est solidaire et comporte la mention par laquelle Victor reconnaît ne pouvoir exiger ni la poursuite préalable de Sofia, ni la division des poursuites.</li>
<li><strong>Inès</strong>, meilleure amie de Sofia, étudiante sans revenus ni patrimoine, s'engage verbalement au téléphone avec le conseiller bancaire à garantir 30 000 €. Le conseiller note l'appel dans son agenda.</li>
</ul>
<p>Sofia a également obtenu d'un éditeur, la société Pages & Cie, un délai de paiement pour ses commandes : son oncle Gaspard, sans rapport avec la librairie, s'est porté caution « de toutes les sommes que Sofia pourra devoir à Pages & Cie à l'avenir », sans limitation de durée. Gaspard a résilié son engagement le 10 janvier 2025, en respectant le préavis contractuel d'un mois.</p>
<p>Sofia ne rembourse plus la banque à partir de septembre 2025. La banque, qui n'a jamais envoyé d'information à Victor, lui écrit en décembre 2025 pour lui réclamer 30 000 € ainsi que les intérêts et pénalités depuis septembre. Elle écrit aussi à Inès. Victor répond que la banque doit « d'abord saisir la librairie de Sofia ». Pages & Cie réclame à Gaspard une facture de mars 2025 et une facture de décembre 2024.</p>`,
    questions: [
      { q: "Le cautionnement de Victor est-il valable ? Quelle est sa nature ?", points: 5, ch: ['c2', 'c3'],
        criteria: [["Vérifier l'écrit, l'identité du débiteur et la dette garantie", 1], ["Vérifier la mention en lettres et en chiffres (identiques)", 1], ["Qualifier : cautionnement civil par principe (Victor n'est ni banque, ni commerçant, sans intérêt patrimonial)", 1], ["Solidarité valablement stipulée grâce à la mention spécifique", 1], ["Conclusion : valable, solidaire, dans la limite de 30 000 €", 1]],
        qualification: "Victor, personne physique, se porte caution envers une banque (créancier professionnel) de la dette de sa fille. Il n'est ni établissement de crédit, ni commerçant agissant pour son activité, et n'a pas d'intérêt patrimonial dans l'opération : le cautionnement est civil. Il est stipulé solidaire.",
        probleme: "La question est de savoir si le cautionnement respecte les conditions de forme et s'il peut être solidaire.",
        regle: "Le cautionnement doit être écrit et préciser, à peine de nullité, l'identité du débiteur et la dette garantie ; la caution personne physique doit apposer la mention de son engagement dans la limite d'un montant en lettres et en chiffres. Par principe, le cautionnement civil est simple ; il peut être solidaire si la caution personne physique appose la mention reconnaissant qu'elle renonce aux bénéfices de discussion et de division, faute de quoi il est requalifié en simple.",
        application: "En l'espèce, l'acte est écrit, identifie Sofia et la dette ; la mention de Victor est complète et le montant est identique en lettres et en chiffres (30 000 €). L'acte comporte également la mention spécifique à la solidarité.",
        conclusion: "Le cautionnement de Victor est valable ; c'est un cautionnement civil, valablement stipulé solidaire, plafonné à 30 000 €.",
        erreurs: ["Dire qu'un cautionnement civil ne peut jamais être solidaire.", "Qualifier de commercial parce que le créancier est une banque."] },
      { q: "Victor peut-il exiger que la banque saisisse d'abord la librairie ? Que doit-il exactement ?", points: 5, ch: ['c2', 'c4'],
        criteria: [["Solidaire : pas de bénéfice de discussion → action directe", 1.5], ["Obligation d'information annuelle (avant le 31 mars, dette au 31 décembre)", 1], ["Information en cas d'incident non régularisé dans le mois", 1], ["Sanction : perte des intérêts et pénalités de la période, le capital reste dû", 1], ["Conclusion chiffrée : 30 000 € sans les intérêts et pénalités concernés ; minimum RSA", 0.5]],
        qualification: "Victor est caution solidaire ; la banque, créancier professionnel, ne l'a jamais informé, ni annuellement, ni lors de l'incident de septembre 2025.",
        probleme: "Il s'agit de déterminer si la caution solidaire peut opposer le bénéfice de discussion, et quelles sont les conséquences du défaut d'information.",
        regle: "La caution solidaire ne peut se prévaloir du bénéfice de discussion : le créancier peut agir directement contre elle. Le créancier professionnel doit informer la caution chaque année avant le 31 mars de la dette restante au 31 décembre précédent, et informer la caution personne physique dès le premier incident non régularisé dans le mois suivant l'exigibilité. À défaut, il ne peut réclamer les intérêts et pénalités échus pendant la période concernée. La caution personne physique conserve un minimum égal au RSA.",
        application: "En l'espèce, Victor a renoncé au bénéfice de discussion : la banque peut s'adresser directement à lui. En revanche, aucune information annuelle n'a été donnée avant le 31 mars 2025, et l'incident de septembre 2025 n'a été signalé qu'en décembre. La banque ne peut donc réclamer les intérêts et pénalités échus pendant ces périodes. Le capital reste garanti dans la limite de 30 000 €.",
        conclusion: "Victor ne peut pas exiger que la banque poursuive d'abord Sofia. Il doit payer dans la limite de 30 000 €, mais pas les intérêts et pénalités échus pendant les périodes sans information ; il conserve le minimum RSA et aura un recours contre Sofia.",
        erreurs: ["Accorder le bénéfice de discussion à Victor.", "Libérer totalement Victor pour défaut d'information."] },
      { q: "La banque peut-elle poursuivre Inès ?", points: 4, ch: ['c3'],
        criteria: [["Exigence d'un écrit à peine de nullité", 1.5], ["Absence de mention en lettres et en chiffres", 1], ["Un engagement oral (note d'agenda) n'a aucune valeur juridique", 1], ["Conclusion : nullité, pas de poursuite possible", 0.5]],
        qualification: "Inès se serait engagée oralement comme caution, sans acte écrit ni mention.",
        probleme: "La question est de savoir si un cautionnement donné oralement est valable.",
        regle: "Le cautionnement doit être établi par écrit, à peine de nullité ; un engagement oral n'a aucune valeur juridique. La caution personne physique doit en outre apposer elle-même la mention de son engagement en lettres et en chiffres, à peine de nullité.",
        application: "En l'espèce, il n'existe aucun acte écrit signé par Inès ; la note du conseiller dans son agenda n'est pas un acte de cautionnement, et aucune mention n'a été apposée par Inès.",
        conclusion: "Le cautionnement d'Inès est nul : la banque ne peut pas la poursuivre. (Surabondamment, un engagement de 30 000 € pour une étudiante sans revenus ni patrimoine aurait posé la question de la disproportion.)",
        erreurs: ["Discuter longuement de la disproportion en oubliant la nullité, qui suffit."] },
      { q: "Gaspard doit-il payer les deux factures réclamées par Pages & Cie ?", points: 6, ch: ['c2', 'c4'],
        criteria: [["Qualifier de cautionnement indéfini (dettes futures, sans limitation de durée)", 1.5], ["Faculté de résiliation unilatérale à tout moment", 1], ["Respect du préavis contractuel", 1], ["Effet : libéré pour les dettes postérieures, tenu des dettes antérieures", 1.5], ["Application : facture de décembre 2024 due ; facture de mars 2025 non due", 1]],
        qualification: "Gaspard s'est engagé pour toutes les sommes futures, sans limitation de durée : c'est un cautionnement indéfini. Il l'a résilié le 10 janvier 2025 avec un préavis d'un mois.",
        probleme: "La question est de savoir quelles dettes reste tenue de garantir la caution qui a résilié un cautionnement indéfini.",
        regle: "Le cautionnement indéfini porte sur des dettes futures indéterminées. La loi permet à la caution de le résilier à tout moment, en respectant le préavis contractuel. La résiliation la libère pour les dettes futures nées postérieurement, mais elle reste tenue des dettes nées avant la résiliation.",
        application: "En l'espèce, la résiliation, notifiée le 10 janvier 2025 avec un préavis d'un mois respecté, produit ses effets au terme de ce préavis, soit vers le 10 février 2025. La facture de décembre 2024 est née avant la résiliation : Gaspard la garantit. La facture de mars 2025 est née après : il en est libéré.",
        conclusion: "Gaspard doit garantir la facture de décembre 2024, mais pas celle de mars 2025.",
        erreurs: ["Dire que la résiliation efface toutes les dettes.", "Oublier le préavis."] },
    ],
  },
  {
    id: 'ex2', title: 'Examen blanc n° 2 — L\'atelier Bouvier', duration: 60, focus: 'Sûretés réelles',
    enonce: `<p>M. Bouvier dirige la SARL Atelier Bouvier, ébénisterie à Tours. Il détient 800 des 1 000 parts sociales. Pour financer une machine-outil, la SARL emprunte 200 000 € à la banque Loire Crédit. Les garanties suivantes sont prises :</p>
<ul>
<li>un gage sur la machine-outil, que l'atelier continue d'utiliser ; l'acte écrit indique le montant de la dette, sa date d'exigibilité, la nature et la quantité du bien ; il n'a jamais été inscrit nulle part ;</li>
<li>un nantissement sur 400 parts sociales de M. Bouvier, constaté par écrit (dette et nombre de parts désignés) et inscrit au greffe du tribunal de commerce ;</li>
<li>une hypothèque conventionnelle sur la maison de M. Bouvier, constatée par acte notarié, inscrite au Service de la Publicité Foncière le 5 avril 2024. Une autre banque, Centre Finance, avait inscrit une hypothèque sur la même maison le 12 janvier 2023 pour une créance de 100 000 €.</li>
</ul>
<p>Par ailleurs, l'atelier a remis à un prêteur, en garantie d'un petit crédit de 5 000 €, un lot de dix fauteuils anciens qui sont entreposés chez ce prêteur.</p>
<p>En 2025, la SARL ne paie plus. M. Bouvier vend la machine-outil à un confrère, et cherche à céder ses parts à un investisseur. La maison est saisie et vendue 260 000 €. Loire Crédit annonce qu'elle « gardera les parts sociales jusqu'au paiement ».</p>`,
    questions: [
      { q: "Qualifiez les quatre sûretés consenties.", points: 4, ch: ['c5', 'c6', 'c7', 'c8'],
        criteria: [["Machine-outil : gage sans dépossession (meuble corporel)", 1], ["Parts sociales : nantissement conventionnel (meuble incorporel)", 1], ["Maison : hypothèque conventionnelle (immeuble, acte notarié)", 1], ["Fauteuils : gage avec dépossession", 1]],
        qualification: "Quatre biens sont affectés au paiement de dettes : une machine (meuble corporel conservé), des parts sociales (meubles incorporels), une maison (immeuble), des fauteuils (meubles corporels remis au prêteur).",
        probleme: "Il s'agit de qualifier chaque sûreté réelle selon la nature du bien et ses modalités.",
        regle: "Le gage porte sur des meubles corporels ; il est avec dépossession si le bien est remis au créancier, sans dépossession si le constituant le conserve. Le nantissement porte sur des meubles incorporels (fonds de commerce, parts sociales, actions, créance) ; il est conventionnel ou judiciaire. L'hypothèque porte sur un immeuble dont on est propriétaire ; conventionnelle, elle est constatée par acte notarié.",
        application: "En l'espèce : la machine-outil, conservée par l'atelier, fait l'objet d'un gage sans dépossession ; les parts sociales, d'un nantissement conventionnel ; la maison, d'une hypothèque conventionnelle ; les fauteuils, remis au prêteur, d'un gage avec dépossession.",
        conclusion: "Gage sans dépossession (machine), nantissement conventionnel (parts), hypothèque conventionnelle (maison), gage avec dépossession (fauteuils).",
        erreurs: ["Qualifier le nantissement de gage."] },
      { q: "Loire Crédit peut-elle récupérer la machine-outil chez le confrère ?", points: 5, ch: ['c6'],
        criteria: [["Opposabilité du gage sans dépossession : inscription au registre du greffe", 1.5], ["Constat : pas d'inscription → gage inopposable aux tiers", 1.5], ["Le droit de suite suppose un gage opposable au tiers acquéreur", 1], ["Conclusion argumentée + manquement de M. Bouvier à l'interdiction de vendre", 1]],
        qualification: "La machine fait l'objet d'un gage sans dépossession, valable entre les parties (mentions présentes) mais jamais inscrit ; elle a été vendue à un tiers.",
        probleme: "La question est de savoir si le créancier gagiste peut exercer son droit de suite contre un tiers acquéreur lorsque le gage sans dépossession n'a pas été publié.",
        regle: "Le gage sans dépossession, pour être opposable aux tiers, doit faire l'objet d'une inscription sur le registre spécial des sûretés mobilières au greffe du tribunal de commerce. Le constituant a l'interdiction de vendre le bien. Le droit de suite permet au créancier de rechercher le bien entre les mains du tiers acquéreur.",
        application: "En l'espèce, le gage n'a jamais été inscrit : il n'est pas opposable aux tiers, et le confrère ne pouvait pas le découvrir en consultant le registre. Loire Crédit ne peut donc pas le lui opposer pour exercer un droit de suite. M. Bouvier, en revanche, a violé l'interdiction de vendre.",
        conclusion: "Faute d'inscription, Loire Crédit ne peut pas, en principe, opposer son gage au confrère ni récupérer la machine entre ses mains. Elle ne peut se retourner que contre la SARL, qui a manqué à ses obligations.",
        erreurs: ["Accorder automatiquement le droit de suite sans vérifier l'inscription."] },
      { q: "Loire Crédit peut-elle « garder les parts » ? L'investisseur peut-il les acheter librement ?", points: 5, ch: ['c7'],
        criteria: [["Nantissement toujours sans dépossession", 1], ["Pas de droit de rétention", 1], ["Inscription au greffe → opposable ; état des nantissements → titres figés et incessibles", 1.5], ["Prérogatives : vente ordonnée par le juge + préférence, attribution judiciaire, droit de suite, surplus", 1.5]],
        qualification: "Les parts sociales font l'objet d'un nantissement conventionnel inscrit au greffe.",
        probleme: "La question est de savoir si le créancier nanti dispose d'un droit de rétention et quel est l'effet de l'inscription vis-à-vis d'un acquéreur des parts.",
        regle: "Le nantissement s'opère toujours sans dépossession ; le créancier nanti n'a donc pas de droit de rétention. L'inscription au registre spécial des sûretés au greffe du tribunal de commerce rend le nantissement opposable : l'acquéreur qui lève un état des nantissements constate que les titres nantis sont figés et incessibles tant que la dette n'est pas soldée. À défaut de paiement, le créancier nanti peut demander au juge la vente et être payé par préférence, ou l'attribution judiciaire ; il a un droit de suite et doit restituer le surplus.",
        application: "En l'espèce, les parts restent la propriété de M. Bouvier, qui les conserve : Loire Crédit ne peut pas les « garder ». Le nantissement étant inscrit, l'investisseur le découvrira lors de son audit : les 400 parts nanties sont incessibles tant que la dette n'est pas soldée. Loire Crédit peut demander au juge leur vente ou leur attribution.",
        conclusion: "Non, Loire Crédit n'a pas de droit de rétention ; mais l'investisseur ne peut pas acquérir librement les 400 parts nanties, figées tant que la dette n'est pas payée. Loire Crédit peut en faire ordonner la vente ou se les faire attribuer.",
        erreurs: ["Reconnaître un droit de rétention.", "Dire que l'investisseur ignore tout du nantissement."] },
      { q: "Comment répartir les 260 000 € issus de la vente de la maison ?", points: 6, ch: ['c8'],
        criteria: [["Conditions de la saisie (titre exécutoire, commandement de payer, publication au SPF)", 1.5], ["Règle du rang selon la date d'inscription au SPF", 1.5], ["Centre Finance (2023) avant Loire Crédit (2024)", 1], ["Calcul : 100 000 € puis 160 000 € à Loire Crédit (sur 200 000 € dus)", 1.5], ["Pas de surplus ; Loire Crédit reste créancière du solde", 0.5]],
        qualification: "Deux créanciers hypothécaires sont inscrits sur la même maison à des dates différentes ; la maison a été saisie et vendue.",
        probleme: "La question est de savoir dans quel ordre sont payés plusieurs créanciers hypothécaires sur le prix de vente de l'immeuble saisi.",
        regle: "La saisie immobilière suppose un titre exécutoire (l'acte notarié en tient lieu), un commandement de payer délivré par un commissaire de justice et sa publication au SPF. Le créancier hypothécaire est payé en priorité sur le prix ; entre créanciers hypothécaires, la date d'inscription au SPF détermine l'ordre (règle du rang). Le surplus éventuel est restitué au débiteur ou affecté aux autres créanciers inscrits.",
        application: "En l'espèce, Centre Finance a été inscrite le 12 janvier 2023, Loire Crédit le 5 avril 2024. Sur 260 000 €, Centre Finance reçoit d'abord 100 000 € ; il reste 160 000 € pour Loire Crédit, à qui 200 000 € sont dus. Il n'y a aucun surplus, et Loire Crédit reste créancière de 40 000 €, qu'elle pourra chercher à recouvrer grâce à ses autres garanties (nantissement des parts).",
        conclusion: "Centre Finance : 100 000 € ; Loire Crédit : 160 000 €. Aucun surplus ; Loire Crédit n'est pas intégralement payée par l'hypothèque.",
        erreurs: ["Payer Loire Crédit en premier.", "Oublier de mobiliser les autres garanties pour le solde."] },
    ],
  },
  {
    id: 'ex3', title: 'Examen blanc n° 3 — Synthèse : le restaurant de Thomas', duration: 75, focus: 'Programme complet',
    enonce: `<p>Thomas ouvre un restaurant exploité par sa SAS « Le Comptoir », dont il détient toutes les actions. Il emprunte au nom de la SAS 150 000 € à la banque Méridien. Les garanties sont les suivantes :</p>
<ul>
<li>Thomas se porte caution solidaire ; l'acte est écrit, identifie la SAS et la dette, et contient la mention manuscrite : « dans la limite de cent cinquante mille euros (150 000 €) » ainsi que la mention de renonciation aux bénéfices de discussion et de division ;</li>
<li>Juliette, sa compagne (ils ne sont pas mariés), infirmière gagnant 2 100 € par mois et propriétaire d'un studio valant 120 000 €, se porte caution solidaire avec les mêmes mentions dans la limite de 50 000 € ; la banque lui a présenté par écrit les risques de l'opération et le prévisionnel de la SAS ;</li>
<li>la SAS nantit au profit de Méridien une créance de 20 000 € qu'elle détient sur un traiteur, la société Festin ; Festin a signé l'acte de nantissement pour l'accepter.</li>
</ul>
<p>Le contrat de prêt prévoyait que la banque devait débloquer les fonds en deux fois ; elle n'a jamais versé la seconde tranche de 50 000 €. La SAS cesse de payer en juin 2025 ; une procédure collective est ouverte en septembre. Méridien, qui a informé les cautions en temps utile, poursuit Juliette pour 50 000 € et réclame directement à Festin les 20 000 €. Juliette répond : 1) que la banque n'a pas exécuté le contrat ; 2) que la procédure collective de la SAS l'empêche d'être poursuivie ; 3) qu'en tout cas, elle ne peut payer qu'après Thomas.</p>`,
    questions: [
      { q: "Le cautionnement de Thomas est-il civil ou commercial ? Conséquences ?", points: 4, ch: ['c2'],
        criteria: [["Critère de l'intérêt patrimonial (actionnaire unique)", 1.5], ["Cautionnement commercial → solidaire par principe", 1], ["Tribunal de commerce compétent", 1], ["Conclusion", 0.5]],
        qualification: "Thomas, associé unique de la SAS débitrice, se porte caution de sa dette : il a un intérêt patrimonial dans l'opération.",
        probleme: "La question est de savoir si le cautionnement du dirigeant-actionnaire est commercial et quelles en sont les conséquences.",
        regle: "Le cautionnement est par principe civil. Il devient commercial lorsqu'il est accompli dans un contexte commercial, notamment lorsque la caution possède un intérêt patrimonial dans l'opération commerciale garantie. Il est alors en principe solidaire, et le tribunal de commerce est compétent.",
        application: "En l'espèce, Thomas détient toutes les actions de la SAS : le prêt sert directement son patrimoine. Son cautionnement est commercial, et d'ailleurs valablement stipulé solidaire.",
        conclusion: "Le cautionnement de Thomas est commercial et solidaire ; un litige le concernant relèverait du tribunal de commerce.",
        erreurs: ["S'arrêter au principe du cautionnement civil."] },
      { q: "Examinez les trois arguments de Juliette.", points: 9, ch: ['c2', 'c3', 'c4'],
        criteria: [["Argument 1 : exception liée à la dette (inexécution par le créancier) opposable par la caution", 2], ["Application : seconde tranche jamais versée → la caution peut s'en prévaloir", 1], ["Argument 2 : procédure collective = mesure liée à la défaillance, non opposable", 2], ["Argument 3 : caution solidaire avec mention → pas de bénéfice de discussion ; action directe", 2], ["Vérifier l'absence de défaut de mise en garde / de disproportion (banque a présenté les risques ; revenus et patrimoine)", 1], ["Conclusion d'ensemble + minimum RSA", 1]],
        qualification: "Juliette, caution solidaire personne physique, non mariée à Thomas, sans intérêt dans la SAS, s'est engagée envers une banque. Elle invoque l'inexécution du prêt par la banque, la procédure collective et l'ordre des poursuites.",
        probleme: "Il s'agit de déterminer quelles exceptions et quels bénéfices la caution peut opposer au créancier.",
        regle: "La caution peut opposer toutes les exceptions dont dispose le débiteur, notamment celles liées à la dette, comme l'inexécution du contrat par le créancier. Elle ne peut pas se prévaloir des mesures accordées au débiteur en raison de sa défaillance, comme une procédure collective. La caution solidaire, ayant apposé la mention spécifique, ne bénéficie pas du bénéfice de discussion : le créancier peut agir directement contre elle. Le créancier professionnel doit mettre en garde la caution personne physique et ne pas lui faire souscrire un engagement manifestement disproportionné. La caution personne physique conserve le minimum RSA.",
        application: "1) La banque n'a pas versé la seconde tranche de 50 000 € : c'est une inexécution du contrat par le créancier, exception liée à la dette que Juliette peut invoquer. 2) La procédure collective de la SAS est une mesure liée à sa défaillance : Juliette ne peut pas s'en prévaloir. 3) Juliette a signé la mention de renonciation : elle ne peut exiger que la banque poursuive d'abord la SAS ou Thomas, ni qu'elle divise ses poursuites. Par ailleurs, la banque lui a présenté les risques par écrit, et un engagement de 50 000 € n'apparaît pas manifestement disproportionné au regard de 2 100 € de revenus mensuels et d'un studio de 120 000 €.",
        conclusion: "Seul le premier argument est pertinent : Juliette peut opposer l'inexécution par la banque. Les deux autres sont inopérants. Elle conserve en toute hypothèse le minimum RSA et, si elle paie, un recours contre la SAS et contre Thomas pour sa quote-part.",
        erreurs: ["Accepter l'argument de la procédure collective.", "Accorder le bénéfice de discussion à une caution solidaire ayant apposé la mention."] },
      { q: "Méridien peut-elle réclamer directement à Festin les 20 000 € ?", points: 4, ch: ['c7'],
        criteria: [["Qualifier : nantissement de créance (meuble incorporel)", 1], ["Opposabilité : notification ou intervention du débiteur à l'acte", 1], ["Application : Festin a signé l'acte → opposable", 1], ["Effet : le créancier nanti seul reçoit le paiement direct ; constituant écarté", 1]],
        qualification: "La SAS a nanti au profit de Méridien une créance de somme d'argent qu'elle détient sur Festin.",
        probleme: "La question est de savoir si le créancier nanti peut exiger le paiement directement du débiteur de la créance nantie.",
        regle: "Le nantissement de créance est une sûreté réelle sur un bien incorporel. Pour être opposable au débiteur de la créance nantie, il doit lui être notifié, ou ce débiteur doit intervenir à l'acte pour accepter que sa dette soit nantie. En cas de non-paiement par le constituant, le créancier nanti détient seul le droit de recevoir le paiement directement auprès du débiteur de la créance nantie.",
        application: "En l'espèce, Festin a signé l'acte : le nantissement lui est opposable. La SAS ne paie plus.",
        conclusion: "Oui, Méridien peut exiger de Festin le paiement direct des 20 000 € ; la SAS est écartée.",
        erreurs: ["Exiger une inscription au SPF."] },
      { q: "Si Juliette paie 50 000 €, contre qui pourra-t-elle se retourner ?", points: 3, ch: ['c4'],
        criteria: [["Recours contre le débiteur principal (sommes + frais)", 1.5], ["Recours contre l'autre caution, à proportion des engagements", 1], ["Extinction à hauteur du paiement", 0.5]],
        qualification: "Juliette serait une caution ayant payé ; il existe un débiteur principal (la SAS) et une autre caution (Thomas).",
        probleme: "Il s'agit de déterminer les recours de la caution qui a payé.",
        regle: "La caution qui a payé dispose d'un recours contre le débiteur principal pour les sommes payées et les frais engagés, et, en cas de cautionnement solidaire, d'un recours contre les autres cautions à proportion de leurs engagements respectifs. Le paiement par la caution éteint l'obligation garantie à due concurrence.",
        application: "En l'espèce, Juliette pourra agir contre la SAS (sommes versées et frais) — même si, en procédure collective, ce recours risque d'être peu efficace — et contre Thomas, caution solidaire, pour la part lui incombant à proportion des engagements respectifs.",
        conclusion: "Juliette disposera d'un recours contre la SAS et d'un recours contre Thomas, à proportion de leurs engagements.",
        erreurs: ["Oublier le recours contre Thomas."] },
    ],
  },
];

// Examens blancs QCM : 20 questions tirées de la banque, dans des proportions fixes.
export const EXAMS_QCM = [
  { id: 'eq1', title: 'Examen QCM n° 1 — Le cautionnement', duration: 25, chapters: ['c1', 'c2', 'c3', 'c4'], count: 20 },
  { id: 'eq2', title: 'Examen QCM n° 2 — Les sûretés réelles et la synthèse', duration: 25, chapters: ['c0', 'c5', 'c6', 'c7', 'c8', 'c9'], count: 20 },
  { id: 'eq3', title: 'Examen QCM n° 3 — Programme complet', duration: 30, chapters: null, count: 25 },
];
