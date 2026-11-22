// Banque de QCM. type : 'single' (une seule bonne réponse), 'multi' (plusieurs), 'tf' (vrai/faux)
// level : 1 facile · 2 intermédiaire · 3 exigeant. opts : [texte, correct, explication]
const T = (q, correct, why) => ({ type: 'tf', q, opts: [['Vrai', correct, correct ? why : 'Non. ' + why], ['Faux', !correct, !correct ? why : 'Non. ' + why]] });
const S = (q, opts) => ({ type: 'single', q, opts });
const M = (q, opts) => ({ type: 'multi', q, opts });

const RAW = [
  // ─────────── c0
  ['c0', 1, S("Qu'est-ce qu'une sûreté ?", [
    ["Un mécanisme juridique qui sécurise le paiement d'une créance et assure son recouvrement", true, "C'est la définition du cours."],
    ["Une sanction infligée au débiteur qui ne paie pas", false, "La sûreté est une garantie mise en place à l'avance, pas une sanction."],
    ["Un délai de paiement accordé au débiteur", false, "Le délai de paiement est précisément ce qui crée le risque contre lequel la sûreté protège."],
    ["Une assurance obligatoire souscrite par le créancier", false, "Le cours ne définit pas la sûreté comme une assurance."],
  ]), "Une sûreté est une garantie accordée au créancier pour sécuriser le paiement et le recouvrement de sa créance."],
  ['c0', 1, M("Dans quelles situations la sûreté renforce-t-elle particulièrement la position du créancier ?", [
    ["L'insolvabilité du débiteur", true, "La sûreté offre un moyen alternatif ou privilégié d'être payé."],
    ["La concurrence avec d'autres créanciers", true, "Le seul créancier titulaire d'une sûreté est en principe payé en priorité."],
    ["Le paiement spontané du débiteur à l'échéance", false, "Si le débiteur paie, la sûreté n'a pas à jouer."],
    ["La renégociation amiable du taux d'intérêt", false, "Situation non visée par le cours."],
  ]), "Les deux situations du cours : insolvabilité du débiteur et concurrence entre créanciers."],
  ['c0', 1, S("Le cautionnement est :", [
    ["Une sûreté personnelle", true, "Il repose sur l'engagement d'une personne (la caution)."],
    ["Une sûreté réelle", false, "Les sûretés réelles reposent sur un bien."],
    ["Une sûreté judiciaire par nature", false, "Le cautionnement est un contrat."],
    ["Ni l'un ni l'autre", false, "C'est l'exemple type de sûreté personnelle."],
  ]), "Sûreté personnelle = engagement d'une personne ; sûreté réelle = affectation d'un bien."],
  ['c0', 1, M("Lesquelles sont des sûretés réelles ?", [
    ["L'hypothèque", true, "Elle affecte un immeuble."],
    ["Le nantissement", true, "Il affecte un bien meuble incorporel."],
    ["Le gage", true, "Il affecte un bien meuble corporel."],
    ["Le cautionnement", false, "C'est une sûreté personnelle."],
  ]), "Les trois sûretés réelles du programme : gage, nantissement, hypothèque."],
  ['c0', 2, T("Une sûreté ne peut être constituée que par la volonté des parties.", false, "Elle peut aussi être imposée ou constituée à la suite d'une décision de justice."), "Deux modes de constitution : conventionnel et judiciaire."],

  // ─────────── c1
  ['c1', 1, S("Le cautionnement est le contrat par lequel la caution s'oblige :", [
    ["Envers le créancier, à payer la dette en cas de défaillance du débiteur principal", true, "Définition du cours."],
    ["Envers le débiteur, à lui prêter de l'argent", false, "La caution s'engage envers le créancier."],
    ["Envers le créancier, à payer la dette à la place du débiteur dès sa conclusion", false, "La caution ne paie qu'en cas de défaillance du débiteur."],
    ["Envers le juge, à garantir l'exécution d'une décision", false, "Hors sujet."],
  ]), "Caution → s'oblige envers le créancier → paie si le débiteur principal fait défaut."],
  ['c1', 1, T("Le contrat de cautionnement est conclu entre le créancier et la caution.", true, "C'est exact, même si l'opération met en jeu trois acteurs."), "Le contrat lie créancier et caution ; l'opération est tripartite."],
  ['c1', 2, M("Quels sont les acteurs de l'opération de cautionnement ?", [
    ["Le créancier", true, "Bénéficiaire de la garantie."],
    ["Le débiteur principal", true, "Celui qui doit la dette."],
    ["La caution", true, "Le débiteur accessoire."],
    ["Le notaire", false, "Le notaire n'est pas un acteur du cautionnement dans le cours (il intervient pour l'hypothèque)."],
  ]), "Opération tripartite : créancier, débiteur principal, caution."],
  ['c1', 2, S("En cas d'impayé, selon le fonctionnement décrit par le cours, le créancier :", [
    ["Se retourne d'abord contre le débiteur principal (mise en demeure), puis actionne la caution s'il ne s'exécute pas", true, "Fonctionnement général décrit dans le cours 1."],
    ["Doit toujours saisir le juge avant de contacter le débiteur", false, "Non prévu par le cours."],
    ["Ne peut jamais agir contre la caution", false, "C'est tout l'intérêt du cautionnement."],
    ["Doit choisir définitivement entre le débiteur et la caution", false, "Non prévu par le cours."],
  ]), "Le cautionnement solidaire permet toutefois d'agir directement contre la caution (chapitre 2)."],
  ['c1', 1, T("La référence à l'article 2288 du Code civil sera exigée à l'examen.", false, "La professeure a précisé qu'elle est donnée pour la culture juridique et ne sera pas exigée."), "Remarque explicite de la professeure."],

  // ─────────── c2
  ['c2', 1, S("Le bénéfice de discussion permet à la caution :", [
    ["D'exiger que le créancier poursuive d'abord le débiteur principal sur ses biens", true, "Définition exacte."],
    ["D'exiger que le créancier divise ses poursuites entre les cautions", false, "C'est le bénéfice de division."],
    ["De discuter le montant de la dette devant le juge", false, "Piège sur le mot « discussion »."],
    ["De résilier son engagement à tout moment", false, "C'est la faculté propre au cautionnement indéfini."],
  ]), "Discussion = ordre des poursuites (débiteur d'abord)."],
  ['c2', 1, S("Le bénéfice de division :", [
    ["Suppose une pluralité de cautions et limite les poursuites à la quote-part de chacune", true, "Définition exacte."],
    ["Permet de diviser la dette en mensualités", false, "Ce n'est pas un échéancier."],
    ["Oblige le créancier à poursuivre d'abord le débiteur principal", false, "C'est le bénéfice de discussion."],
    ["Existe même s'il n'y a qu'une seule caution", false, "Il joue en cas de pluralité de cautions."],
  ]), "Division = répartition entre plusieurs cautions."],
  ['c2', 2, M("En cautionnement solidaire, le créancier peut :", [
    ["Poursuivre directement la caution sans poursuivre d'abord le débiteur", true, "Absence de bénéfice de discussion."],
    ["Réclamer l'intégralité de la dette à une seule caution même s'il y en a plusieurs", true, "Absence de bénéfice de division."],
    ["Réclamer à la caution plus que ce que doit le débiteur principal", false, "Le cautionnement ne peut excéder la dette principale."],
    ["Se dispenser de tout écrit", false, "L'écrit reste exigé à peine de nullité."],
  ]), "Solidaire = ni discussion, ni division ; le plafond légal et le formalisme demeurent."],
  ['c2', 1, T("Par principe, le cautionnement est commercial.", false, "Par principe, tout cautionnement est civil ; le commercial est l'exception."), "Civil = principe."],
  ['c2', 2, S("Un cautionnement civil est, par principe :", [
    ["Simple", true, "La caution bénéficie automatiquement de la discussion et de la division."],
    ["Solidaire", false, "C'est le principe du cautionnement commercial."],
    ["Indéfini", false, "La distinction défini/indéfini est indépendante."],
    ["Nul", false, "Aucun rapport."],
  ]), "Civil → simple ; commercial → solidaire."],
  ['c2', 2, M("Le cautionnement est commercial notamment lorsqu'il est :", [
    ["Consenti par un établissement de crédit", true, "Première hypothèse du cours."],
    ["Donné par un commerçant pour les besoins de son activité", true, "Deuxième hypothèse."],
    ["Donné par une caution ayant un intérêt patrimonial dans l'opération commerciale garantie", true, "Troisième hypothèse."],
    ["Donné par un parent pour le bail d'habitation de son enfant", false, "Exemple de cautionnement civil."],
  ]), "Trois hypothèses de commercialité."],
  ['c2', 2, S("Quel tribunal est compétent pour un litige relatif à un cautionnement commercial ?", [
    ["Le tribunal de commerce", true, "Juges issus de la vie active et du monde économique."],
    ["Le tribunal judiciaire", false, "Compétent pour le cautionnement civil."],
    ["Le conseil de prud'hommes", false, "Cité seulement comme comparaison sur la composition."],
    ["Le Service de la Publicité Foncière", false, "Ce n'est pas une juridiction."],
  ]), "Civil → tribunal judiciaire ; commercial → tribunal de commerce."],
  ['c2', 2, T("Le tribunal judiciaire est composé de juges issus du monde économique.", false, "Il est composé de magistrats professionnels issus des écoles de la magistrature ; ce sont les juges du tribunal de commerce qui viennent du monde économique."), "Composition des juridictions."],
  ['c2', 1, S("Le cautionnement le plus courant en pratique est :", [
    ["Le cautionnement défini", true, "La caution maîtrise précisément l'étendue de son engagement."],
    ["Le cautionnement indéfini", false, "Il porte sur des dettes futures indéterminées."],
    ["Le cautionnement commercial", false, "Le principe est le cautionnement civil."],
    ["Le cautionnement oral", false, "Un cautionnement oral est nul."],
  ]), "Défini = montant fixé à l'avance."],
  ['c2', 3, M("À propos du cautionnement indéfini, quelles affirmations sont exactes ?", [
    ["La caution peut le résilier unilatéralement à tout moment", true, "On ne peut obliger quelqu'un à rester caution à l'infini."],
    ["La caution doit respecter le préavis contractuel", true, "Condition de forme de la résiliation."],
    ["La résiliation libère la caution de toutes les dettes, y compris celles nées avant", false, "Elle reste tenue des dettes nées avant la résiliation."],
    ["La résiliation libère la caution pour les dettes futures", true, "Effet de la résiliation."],
  ]), "Résiliation = effet pour l'avenir seulement."],
  ['c2', 3, S("Une caution simple engagée à 20 % aux côtés d'autres cautions est poursuivie pour 100 % de la dette. Elle peut :", [
    ["Invoquer le bénéfice de division pour n'être poursuivie que pour 20 %", true, "Le créancier doit s'adresser aux autres cautions pour le solde."],
    ["Invoquer le bénéfice de discussion pour ne payer que 20 %", false, "La discussion concerne l'ordre des poursuites, pas la répartition entre cautions."],
    ["Refuser de payer quoi que ce soit", false, "Elle doit sa quote-part (après discussion le cas échéant)."],
    ["Demander la nullité du cautionnement", false, "Aucune cause de nullité dans l'énoncé."],
  ]), "Bien distinguer discussion (débiteur d'abord) et division (quote-part)."],

  // ─────────── c3
  ['c3', 1, T("Un cautionnement peut être valablement conclu oralement.", false, "Il doit être écrit, à peine de nullité."), "Exigence d'un écrit."],
  ['c3', 1, M("Quelles mentions générales l'acte de cautionnement doit-il préciser à peine de nullité ?", [
    ["L'identité du débiteur principal", true, "Mention obligatoire."],
    ["La dette garantie, déterminée ou déterminable", true, "Mention obligatoire."],
    ["La date de naissance du créancier", false, "Non prévu par le cours."],
    ["Le nom du tribunal compétent", false, "Non prévu par le cours."],
  ]), "Identité du débiteur + dette garantie."],
  ['c3', 2, S("La somme écrite en lettres (« dix mille euros ») diffère de celle écrite en chiffres (« 1 000 € »). Laquelle retenir ?", [
    ["La somme en lettres", true, "Règle du cours : la somme en lettres prévaut."],
    ["La somme en chiffres", false, "C'est l'inverse."],
    ["La plus faible des deux", false, "Le cours ne pose pas cette règle."],
    ["Aucune : l'acte est nul", false, "La divergence est réglée par la prévalence des lettres."],
  ]), "Lettres > chiffres."],
  ['c3', 2, S("La caution personne physique a omis la mention de son engagement et du montant en lettres et en chiffres. Sanction ?", [
    ["Nullité du cautionnement", true, "Sanction prévue par le cours."],
    ["Requalification en cautionnement simple", false, "C'est la sanction de l'omission de la mention solidaire."],
    ["Réduction du cautionnement", false, "C'est la sanction de la disproportion."],
    ["Aucune sanction", false, "La mention est obligatoire."],
  ]), "Mention manuscrite manquante → nullité."],
  ['c3', 2, S("La mention spécifique au cautionnement solidaire a été omise. Conséquence ?", [
    ["Le cautionnement reste valable mais devient un cautionnement simple", true, "Requalification, pas nullité."],
    ["Le cautionnement est nul", false, "Piège classique : pas de nullité ici."],
    ["Le cautionnement devient indéfini", false, "Aucun rapport."],
    ["Le créancier est déchu des intérêts", false, "C'est la sanction des défauts d'information."],
  ]), "Mention solidaire manquante → requalification en simple."],
  ['c3', 2, M("Quelles affirmations sur la capacité de la caution sont exactes ?", [
    ["Elle doit être majeure", true, "Capacité juridique."],
    ["Elle ne doit pas être sous tutelle ou curatelle", true, "Capacité juridique."],
    ["Elle doit avoir la capacité financière de rembourser la dette garantie", true, "Elle engage tout son patrimoine."],
    ["Un tuteur autorisé peut se porter caution au nom du majeur protégé pour la dette d'un tiers", false, "Interdit, même avec une autorisation."],
  ]), "Capacité juridique + capacité financière ; interdiction du tuteur."],
  ['c3', 3, S("Paul, marié, se porte seul caution. Le créancier peut-il saisir un bien propre de son épouse ?", [
    ["Non, sauf consentement exprès de l'épouse ou engagement souscrit conjointement", true, "Paul n'engage que ses biens propres et ses revenus."],
    ["Oui, le mariage engage automatiquement les deux époux", false, "Contraire au cours."],
    ["Oui, si la dette est inférieure à 600 000 €", false, "Seuil inventé."],
    ["Non, jamais, même avec son accord", false, "Le consentement exprès du conjoint le permet."],
  ]), "Époux : biens propres + revenus seulement, sauf accord exprès ou engagement conjoint."],
  ['c3', 2, S("Le devoir de mise en garde pèse sur :", [
    ["Le créancier professionnel, envers la caution personne physique", true, "Champ d'application du cours."],
    ["La caution, envers le débiteur", false, "Inverse."],
    ["Le débiteur principal, envers le créancier", false, "Non."],
    ["Le notaire, envers toutes les parties", false, "Non prévu."],
  ]), "Créancier professionnel → caution personne physique."],
  ['c3', 3, S("La banque n'a pas mis en garde la caution alors que le prêt du débiteur était inadapté à ses capacités. Sanction ?", [
    ["La banque peut être déchue de son droit contre la caution à hauteur du préjudice subi par celle-ci", true, "Sanction du manquement au devoir de mise en garde."],
    ["Nullité du cautionnement", false, "Ce n'est pas la sanction prévue."],
    ["Réduction au montant que la caution pouvait raisonnablement garantir", false, "C'est la sanction de la disproportion."],
    ["Perte des seuls intérêts de retard", false, "C'est la logique des obligations d'information."],
  ]), "Mise en garde → déchéance à hauteur du préjudice."],
  ['c3', 3, S("Une caution gagnant 1 500 € par mois, sans patrimoine, garantit 400 000 € envers une banque. Selon le cours :", [
    ["Le cautionnement est réduit au montant qu'elle pouvait raisonnablement garantir", true, "Sanction de l'engagement manifestement disproportionné."],
    ["Le cautionnement est nul", false, "Le cours prévoit une réduction."],
    ["La caution est libérée sans rien devoir", false, "Le cours prévoit une réduction, non une libération totale."],
    ["Aucune conséquence : la caution a signé", false, "La disproportion est sanctionnée."],
  ]), "Disproportion → réduction."],
  ['c3', 1, T("Le cautionnement peut exister sans obligation principale.", false, "C'est un contrat accessoire : sans obligation principale valable, pas de cautionnement."), "Caractère accessoire."],
  ['c3', 2, S("Sauf clause contraire, le cautionnement s'étend :", [
    ["De plein droit aux intérêts et accessoires de la dette", true, "Intérêts, intérêts de retard, assurance du prêt."],
    ["Uniquement au capital emprunté", false, "Seulement si une clause le prévoit."],
    ["À toutes les dettes futures du débiteur", false, "Ce n'est pas la règle."],
    ["Au double de la dette", false, "Le cautionnement ne peut excéder la dette."],
  ]), "Extension aux accessoires sauf clause contraire."],
  ['c3', 2, T("La caution peut s'engager à des conditions plus onéreuses que celles du débiteur principal.", false, "Le cautionnement ne peut excéder la dette du débiteur principal ni être contracté à des conditions plus onéreuses."), "Plafond légal."],
  ['c3', 3, M("Lesquelles sont des conditions de forme du cautionnement (à peine de nullité) ?", [
    ["Un écrit", true, "Exigence de forme."],
    ["L'identité du débiteur principal", true, "Mention obligatoire."],
    ["Le montant en lettres et en chiffres apposé par la caution personne physique", true, "Mention obligatoire."],
    ["La mention de renonciation aux bénéfices de discussion et de division", false, "Obligatoire pour la solidarité, mais son absence n'entraîne pas la nullité (requalification)."],
  ]), "Attention à la mention solidaire : obligatoire mais sanctionnée par requalification."],
  ['c3', 2, S("Le garant d'un locataire doit fournir les mêmes justificatifs financiers que le locataire. Quelle condition cela illustre-t-il ?", [
    ["La solvabilité (capacité financière) de la caution", true, "Le bailleur vérifie sa capacité à payer."],
    ["Le caractère accessoire", false, "Non."],
    ["La mention manuscrite", false, "Non."],
    ["Le bénéfice de division", false, "Non."],
  ]), "Illustration de la capacité financière."],

  // ─────────── c4
  ['c4', 1, S("L'information annuelle de la caution doit intervenir :", [
    ["Avant le 31 mars, sur le montant restant dû au 31 décembre de l'année précédente", true, "Règle du cours."],
    ["Avant le 31 décembre, sur la dette au 31 mars", false, "Dates inversées."],
    ["Uniquement à la conclusion du contrat", false, "Elle est annuelle."],
    ["Tous les mois", false, "Non."],
  ]), "31 mars / 31 décembre."],
  ['c4', 2, S("Sanction du défaut d'information annuelle :", [
    ["Perte des intérêts et pénalités échus entre la dernière information et la nouvelle", true, "Sanction du cours."],
    ["Nullité du cautionnement", false, "Non."],
    ["Perte de tout droit contre la caution", false, "La sanction ne vise que les intérêts et pénalités."],
    ["Requalification en cautionnement simple", false, "Sanction de la mention solidaire."],
  ]), "Défaut d'information → intérêts et pénalités."],
  ['c4', 2, S("L'information en cas d'incident de paiement est due :", [
    ["Dès le premier incident non régularisé dans le mois suivant son exigibilité", true, "Formulation du cours 2."],
    ["Après trois incidents successifs", false, "Non."],
    ["Seulement si le débiteur est en procédure collective", false, "Non."],
    ["Seulement à la demande de la caution", false, "C'est une obligation du créancier."],
  ]), "Premier incident non régularisé dans le mois."],
  ['c4', 3, S("Incident le 1er mars, information de la caution le 1er septembre. Que ne peut pas réclamer la banque ?", [
    ["Les intérêts et pénalités échus entre le 1er mars et le 1er septembre", true, "Période entre l'incident et l'information."],
    ["Le capital restant dû", false, "La sanction ne porte pas sur le capital."],
    ["Tous les intérêts depuis la signature", false, "Seule la période incident → information est visée."],
    ["Rien : l'information a bien été donnée", false, "Elle a été tardive."],
  ]), "Calcul de la période sanctionnée."],
  ['c4', 2, T("La caution peut être poursuivie avant que la dette du débiteur soit exigible.", false, "Caractère accessoire : la dette doit être exigible et impayée."), "Mise en jeu."],
  ['c4', 2, M("Quelles exceptions la caution peut-elle opposer au créancier ?", [
    ["L'inexécution du contrat par le créancier", true, "Exception liée à la dette."],
    ["La nullité du contrat principal pour dol", true, "Exception personnelle au débiteur."],
    ["La procédure collective ouverte contre le débiteur", false, "Mesure liée à la défaillance : non opposable."],
    ["Le simple fait que le débiteur soit insolvable", false, "C'est précisément le risque garanti."],
  ]), "Exceptions du débiteur oui ; mesures liées à sa défaillance non."],
  ['c4', 1, S("Quel minimum de ressources est préservé pour la caution personne physique ?", [
    ["Le montant du RSA", true, "Règle du cours."],
    ["Le SMIC", false, "Non."],
    ["La moitié de ses revenus", false, "Non."],
    ["Aucun", false, "Un minimum est garanti."],
  ]), "Minimum = RSA."],
  ['c4', 2, M("Après avoir payé, la caution peut obtenir du débiteur principal :", [
    ["Les sommes payées au créancier", true, "Recours contre le débiteur."],
    ["Les frais engagés", true, "Recours contre le débiteur."],
    ["Une indemnité forfaitaire du double de la dette", false, "Non prévu."],
    ["Rien, le paiement est définitif", false, "Elle dispose d'un recours."],
  ]), "Recours : sommes + frais."],
  ['c4', 3, S("Trois cautions solidaires (50 %, 30 %, 20 %). Celle à 20 % paie toute la dette de 10 000 €. Recours ?", [
    ["Contre le débiteur, et contre les autres cautions à proportion de leurs engagements (5 000 € et 3 000 €)", true, "Recours contre le débiteur et contre chaque autre caution pour sa quote-part."],
    ["Uniquement contre la caution à 50 % pour 8 000 €", false, "Chaque caution répond de sa quote-part."],
    ["Aucun recours : en solidaire, celui qui paie supporte tout", false, "Le recours existe (art. 2312)."],
    ["Uniquement contre le créancier pour trop-perçu", false, "Le créancier a été payé de ce qui lui était dû."],
  ]), "Recours entre cautions à proportion des engagements."],
  ['c4', 1, M("Le cautionnement s'éteint lorsque :", [
    ["Le débiteur paie sa dette", true, "L'obligation principale disparaît."],
    ["La caution paie la dette à la place du débiteur", true, "L'obligation principale garantie s'éteint."],
    ["Le débiteur est placé en procédure collective", false, "Pas une cause d'extinction ; c'est même là que la caution est utile."],
    ["Le créancier change d'adresse", false, "Non."],
  ]), "Extinction : paiement par le débiteur ou par la caution."],
  ['c4', 3, S("En cautionnement simple, le créancier poursuit directement la caution sans avoir agi contre le débiteur. La caution :", [
    ["Oppose le bénéfice de discussion : le créancier doit d'abord poursuivre le débiteur et prouver son insolvabilité", true, "Défense propre au cautionnement simple."],
    ["Doit payer immédiatement", false, "Ce serait le cas en solidaire."],
    ["Obtient la nullité du cautionnement", false, "Aucune cause de nullité."],
    ["Peut invoquer le minimum RSA pour ne rien payer", false, "Le minimum RSA limite les poursuites mais ne supprime pas la dette."],
  ]), "Discussion → le créancier doit justifier des démarches et de l'insolvabilité."],

  // ─────────── c5
  ['c5', 1, S("Le constituant d'une sûreté réelle est :", [
    ["Celui qui accorde au créancier une garantie sur un bien ; débiteur ou tiers", true, "Définition du cours."],
    ["Toujours le débiteur", false, "Ce peut être un tiers."],
    ["Le créancier", false, "Non."],
    ["Le juge", false, "Non."],
  ]), "Constituant = débiteur ou tiers, propriétaire du bien."],
  ['c5', 1, T("Un locataire peut hypothéquer l'appartement qu'il loue.", false, "Le constituant doit être propriétaire du bien."), "Condition de propriété."],
  ['c5', 1, S("Un créancier chirographaire est :", [
    ["Un créancier ordinaire, sans sûreté", true, "Définition du cours."],
    ["Un créancier hypothécaire de premier rang", false, "Il a une sûreté."],
    ["Un créancier qui a reçu une mention manuscrite", false, "Non."],
    ["La caution après paiement", false, "Non."],
  ]), "Chirographaire = sans sûreté."],
  ['c5', 2, S("Immeuble vendu 200 000 € ; créancier garanti : 198 000 € ; trois chirographaires. Combien se partagent les chirographaires ?", [
    ["2 000 €", true, "Le créancier garanti est payé en priorité."],
    ["200 000 €", false, "Ils passent après."],
    ["66 000 € chacun", false, "Le créancier garanti passe d'abord."],
    ["Rien", false, "Il reste 2 000 €."],
  ]), "Droit de préférence."],
  ['c5', 2, M("Associez correctement :", [
    ["Meuble corporel → gage", true, "Exact."],
    ["Meuble incorporel → nantissement", true, "Exact."],
    ["Immeuble → hypothèque", true, "Exact."],
    ["Meuble incorporel → hypothèque", false, "L'hypothèque porte sur un immeuble."],
  ]), "Classification par nature du bien."],

  // ─────────── c6
  ['c6', 1, S("Le gage porte sur :", [
    ["Des biens meubles corporels", true, "Exclusivement."],
    ["Des biens meubles incorporels", false, "C'est le nantissement."],
    ["Des immeubles", false, "C'est l'hypothèque."],
    ["Une personne", false, "C'est une sûreté personnelle."],
  ]), "Gage = meubles corporels."],
  ['c6', 2, M("L'acte de gage doit mentionner à peine de nullité :", [
    ["Le montant de la dette garantie", true, "Mention obligatoire."],
    ["La date d'exigibilité de la dette", true, "Mention obligatoire."],
    ["La nature et la quantité du bien gagé", true, "Mention obligatoire."],
    ["La valeur de revente estimée par un expert", false, "Non prévu."],
  ]), "Dette (montant, exigibilité) + bien (nature, quantité)."],
  ['c6', 2, S("Comment rendre opposable aux tiers un gage sans dépossession ?", [
    ["Inscription au registre spécial des sûretés mobilières, au greffe du tribunal de commerce", true, "Publicité."],
    ["Remise du bien au créancier", false, "C'est le gage avec dépossession."],
    ["Inscription au Service de la Publicité Foncière", false, "C'est pour l'hypothèque."],
    ["Notification au débiteur de la créance", false, "C'est pour le nantissement de créance."],
  ]), "Sans dépossession → registre au greffe."],
  ['c6', 1, T("Dans le gage avec dépossession, la remise du bien suffit à rendre le gage opposable aux tiers.", true, "La remise matérielle tient lieu de publicité."), "Avec dépossession → remise."],
  ['c6', 2, S("Avant l'échéance, dans un gage avec dépossession, qui doit conserver et entretenir le bien ?", [
    ["Le créancier gagiste", true, "Il détient le bien."],
    ["Le constituant", false, "C'est le cas sans dépossession."],
    ["Le greffe", false, "Non."],
    ["Personne", false, "Une obligation de conservation existe."],
  ]), "Conservation par celui qui détient le bien."],
  ['c6', 2, M("Le créancier gagiste impayé à l'échéance dispose :", [
    ["D'un droit de rétention (avec dépossession)", true, "Premier droit."],
    ["D'un droit de préférence sur le prix de vente", true, "Deuxième droit."],
    ["De l'attribution judiciaire du bien", true, "Troisième droit."],
    ["D'un droit de suite", true, "Quatrième droit."],
  ]), "Les quatre prérogatives du créancier gagiste."],
  ['c6', 2, S("Un bijou gagé pour 1 000 € est vendu 1 800 €. Que doit faire le créancier ?", [
    ["Restituer 800 € au constituant", true, "Restitution du surplus."],
    ["Conserver 1 800 €", false, "Il doit restituer le surplus."],
    ["Partager le surplus avec les chirographaires", false, "Le cours prévoit la restitution au constituant."],
    ["Rien, la vente annule la dette", false, "Non."],
  ]), "Surplus restitué."],
  ['c6', 3, S("Une société a gagé sans dépossession un camion inscrit au greffe, puis l'a revendu à Marc qui n'a pas consulté le registre. Le créancier impayé :", [
    ["Peut récupérer le camion entre les mains de Marc (droit de suite), Marc pouvant se retourner contre la société", true, "Droit de suite du créancier gagiste."],
    ["Ne peut rien faire : Marc est propriétaire", false, "Le gage inscrit lui est opposable."],
    ["Peut seulement exercer un droit de rétention", false, "Il ne détient pas le camion."],
    ["Doit demander la nullité de la vente pour dol", false, "Non prévu."],
  ]), "Droit de suite."],
  ['c6', 2, S("La dette garantie par un gage sans dépossession est payée. Que fait le constituant ?", [
    ["Il demande la radiation de l'inscription au greffe du tribunal de commerce", true, "Pour matérialiser la fin du gage."],
    ["Il récupère le bien chez le créancier", false, "C'est le cas avec dépossession."],
    ["Il saisit le Service de la Publicité Foncière", false, "Non."],
    ["Rien", false, "La radiation matérialise la fin du gage."],
  ]), "Fin du gage : restitution ou radiation."],
  ['c6', 3, T("Après attribution judiciaire, le créancier gagiste est obligé de revendre le bien.", false, "Devenu propriétaire, il peut le conserver et en disposer librement."), "Attribution judiciaire."],

  // ─────────── c7
  ['c7', 1, M("Lesquels peuvent faire l'objet d'un nantissement ?", [
    ["Un fonds de commerce", true, "Bien incorporel."],
    ["Des parts sociales", true, "Bien incorporel."],
    ["Des actions", true, "Bien incorporel."],
    ["Une créance de somme d'argent", true, "Bien incorporel."],
  ]), "Exemples du cours."],
  ['c7', 1, S("Les actions se rencontrent dans :", [
    ["Les sociétés par actions (SAS, SA)", true, "Exact."],
    ["Les SARL", false, "On y trouve des parts sociales."],
    ["Les sociétés civiles", false, "Parts sociales."],
    ["Toutes les sociétés indifféremment", false, "Le cours distingue."],
  ]), "Parts sociales (SC, SARL) ≠ actions (SAS, SA)."],
  ['c7', 2, S("Le nantissement judiciaire est :", [
    ["Ordonné par un juge à la demande du créancier impayé", true, "Définition."],
    ["Consenti par contrat", false, "C'est le conventionnel."],
    ["Imposé par la loi", false, "Le cours parle d'hypothèque légale, pas de nantissement légal."],
    ["Dispensé d'écrit", false, "Il résulte d'une décision écrite."],
  ]), "Conventionnel / judiciaire."],
  ['c7', 2, S("Le nantissement d'une créance devient opposable au débiteur de cette créance par :", [
    ["Notification (ou intervention du débiteur à l'acte)", true, "Règle du cours."],
    ["Inscription au SPF", false, "Hypothèque."],
    ["Remise d'un titre au créancier", false, "Non."],
    ["Publication au Journal officiel", false, "Non."],
  ]), "Créance → notification."],
  ['c7', 1, T("Le nantissement peut être avec ou sans dépossession, comme le gage.", false, "Le nantissement est toujours sans dépossession."), "Toujours sans dépossession."],
  ['c7', 2, T("Le créancier nanti dispose d'un droit de rétention.", false, "Le bien ne lui étant pas remis, il n'a pas de droit de rétention."), "Pas de rétention."],
  ['c7', 3, M("Le créancier nanti impayé peut :", [
    ["Demander au juge d'ordonner la vente et être payé par préférence", true, "Prérogative."],
    ["Demander l'attribution judiciaire du bien", true, "Prérogative."],
    ["Saisir le bien entre les mains d'un tiers acquéreur", true, "Droit de suite."],
    ["Retenir le fonds de commerce dans ses locaux", false, "Pas de dépossession ni de rétention."],
  ]), "Préférence, attribution, suite (+ paiement direct pour la créance)."],
  ['c7', 3, S("Léa a nanti au profit de sa banque la créance de 50 000 € que lui doit Tom. Léa ne rembourse pas. Qui Tom doit-il payer ?", [
    ["La banque, seule en droit de recevoir le paiement", true, "Le créancier intermédiaire (Léa) est écarté."],
    ["Léa", false, "Elle est écartée."],
    ["La banque et Léa à parts égales", false, "Non."],
    ["Personne tant que le juge n'a pas statué", false, "Non prévu."],
  ]), "Nantissement de créance : paiement direct."],
  ['c7', 2, S("2 000 actions nanties sur 10 000 : quelle part du capital ?", [
    ["20 %", true, "Exemple du cours."],
    ["2 %", false, "Erreur de calcul."],
    ["50 %", false, "Non."],
    ["80 %", false, "Non."],
  ]), "Désignation précise du bien (nature, quantité)."],

  // ─────────── c8
  ['c8', 1, S("L'hypothèque porte sur :", [
    ["Un bien immobilier dont on est propriétaire", true, "Définition."],
    ["Un bien meuble corporel", false, "Gage."],
    ["Des actions", false, "Nantissement."],
    ["Un bien loué", false, "Il faut être propriétaire."],
  ]), "Hypothèque = immeuble."],
  ['c8', 1, T("Le propriétaire qui hypothèque sa résidence principale doit déménager.", false, "L'hypothèque est sans dépossession : il continue d'y habiter."), "Sans dépossession."],
  ['c8', 2, M("Quelles sont les origines de l'hypothèque ?", [
    ["Légale", true, "Résulte de la loi."],
    ["Judiciaire", true, "Autorisée par un juge."],
    ["Conventionnelle", true, "Accord contractuel."],
    ["Coutumière", false, "Non prévu."],
  ]), "Trois origines."],
  ['c8', 2, S("L'hypothèque conventionnelle doit être constatée par :", [
    ["Un acte notarié", true, "Obligatoire."],
    ["Un simple écrit sous signature privée", false, "Insuffisant selon le cours."],
    ["Une mention manuscrite de la caution", false, "Confusion avec le cautionnement."],
    ["Une décision du tribunal de commerce", false, "Non."],
  ]), "Acte notarié."],
  ['c8', 2, S("Où inscrire l'hypothèque pour la rendre opposable ?", [
    ["Au Service de la Publicité Foncière", true, "Relevant de l'administration fiscale."],
    ["Au greffe du tribunal de commerce", false, "Gage sans dépossession / nantissement."],
    ["À la mairie", false, "Non."],
    ["Chez le commissaire de justice", false, "Non."],
  ]), "SPF."],
  ['c8', 3, S("Banque A inscrite le 10 mai, banque B le 2 février, banque C le 20 mars sur le même immeuble. Ordre de paiement ?", [
    ["B, puis C, puis A", true, "Ordre chronologique d'inscription (règle du rang)."],
    ["A, puis B, puis C", false, "Ordre alphabétique : sans pertinence."],
    ["Au prorata des créances", false, "Pas de règle du rang."],
    ["La plus grosse créance d'abord", false, "Seule la date d'inscription compte."],
  ]), "Règle du rang."],
  ['c8', 3, M("Conditions de la saisie immobilière :", [
    ["Un titre exécutoire (acte notarié ou décision de justice)", true, "Condition 1."],
    ["Un commandement de payer délivré par un commissaire de justice", true, "Condition 2."],
    ["La publication du commandement au SPF", true, "Condition 3."],
    ["L'accord écrit du débiteur", false, "Non requis."],
  ]), "Trois conditions."],
  ['c8', 2, S("Que devient le surplus après vente d'un immeuble hypothéqué ?", [
    ["Il est restitué au débiteur ou affecté aux autres créanciers inscrits", true, "Règle du cours."],
    ["Il reste au créancier hypothécaire", false, "Non."],
    ["Il est versé à l'administration fiscale", false, "Non."],
    ["Il est consigné chez le notaire sans bénéficiaire", false, "Non."],
  ]), "Restitution du surplus."],
  ['c8', 3, T("Si le débiteur vend l'immeuble hypothéqué sans rembourser, le créancier hypothécaire perd sa garantie.", false, "Il dispose d'un droit de suite : il peut saisir le bien chez le tiers acquéreur."), "Droit de suite."],

  // ─────────── c9 transversal
  ['c9', 2, S("Quelle sûreté réelle peut être avec dépossession ?", [
    ["Le gage", true, "Avec ou sans."],
    ["Le nantissement", false, "Toujours sans."],
    ["L'hypothèque", false, "Sans dépossession."],
    ["Aucune", false, "Le gage peut l'être."],
  ]), "Dépossession : seulement le gage."],
  ['c9', 3, M("Quelles prérogatives sont communes au créancier gagiste, nanti et hypothécaire ?", [
    ["Droit de préférence sur le prix", true, "Commun."],
    ["Attribution judiciaire", true, "Commun."],
    ["Droit de suite", true, "Commun."],
    ["Droit de rétention", false, "Seulement le gage avec dépossession."],
  ]), "Rétention = spécifique au gage avec dépossession."],
  ['c9', 3, S("Pour sécuriser un prêt d'1 M€ à une SAS, la banque prend la caution du dirigeant et le nantissement de 50 % des actions. Elle cumule :", [
    ["Une sûreté personnelle et une sûreté réelle", true, "Caution (personnelle) + nantissement (réelle)."],
    ["Deux sûretés réelles", false, "La caution est personnelle."],
    ["Deux sûretés personnelles", false, "Le nantissement est réel."],
    ["Un gage et une hypothèque", false, "Les actions sont incorporelles."],
  ]), "Cumul de sûretés."],
  ['c9', 2, M("Associez lieu et formalité :", [
    ["Greffe du tribunal de commerce → gage sans dépossession", true, "Exact."],
    ["Greffe du tribunal de commerce → nantissement d'actions", true, "Exact."],
    ["SPF → hypothèque", true, "Exact."],
    ["SPF → nantissement de fonds de commerce", false, "C'est au greffe."],
  ]), "Lieux de publicité."],
];

export const QCM = RAW.map(([ch, level, body, notion], i) => ({ id: 'q' + String(i + 1).padStart(3, '0'), ch, level, notion, ...body }));
