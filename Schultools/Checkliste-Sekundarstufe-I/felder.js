/* Daten der Jahrgangs-Checkliste Sek I – nach Rahmenlehrplan Chemie Teil C (Berlin/Brandenburg), Jahrgangsstufen 7–10.
   Die Punkte geben die Inhalte des Rahmenlehrplans wieder, die Fachbegriffe, Experimente und Kontexte stehen dort wörtlich.
   Formeln: ⟦...⟧ wird zu \( ... \) */
const B1 = '../../Sekundarstufe-I/';
const K78 = B1 + 'Klasse-7-8/';
const K910 = B1 + 'Klasse-9-10/';
const LINKS = {
  fz:  ['Überblick Faszination Chemie', K78 + '1-Faszination-Chemie-Feuer-Schall-und-Rauch/index.html'],
  br:  ['Brenner sicher entzünden', K78 + '1-Faszination-Chemie-Feuer-Schall-und-Rauch/Brenner-entzuenden/index.html'],
  bk:  ['Brandbekämpfung', K78 + '1-Faszination-Chemie-Feuer-Schall-und-Rauch/Brandbekämpfung/index.html'],
  lg:  ['Laborgeräte', K78 + '1-Faszination-Chemie-Feuer-Schall-und-Rauch/Laborgeräte/index.html'],
  lr:  ['Laborregeln und Gefahrstoffe', K78 + '1-Faszination-Chemie-Feuer-Schall-und-Rauch/Laborregeln-und-Gefahrenstoffe/index.html'],
  pse: ['Überblick Periodensystem', K78 + '2-Das-Periodensystem-der-Elemente-Übersicht-und-Werkzeug/index.html'],
  aw:  ['Atomwerkstatt', K78 + '2-Das-Periodensystem-der-Elemente-Übersicht-und-Werkzeug/2-Atombau-und-Atommodelle/index.html'],
  lw:  ['Lewis-Werkstatt: Vorzeichner', '../../Lewis-Werkstatt/Vorzeichner/index.html'],
  lt:  ['Lewis-Werkstatt: Teilchenbuilder', '../../Lewis-Werkstatt/Teilchenbuilder/index.html'],
  gas: ['Überblick Gase', K78 + '3-Gase-zwischen-lebensnotwendig-und-gefährlich/index.html'],
  ng:  ['Nachweis von Gasen', K78 + '3-Gase-zwischen-lebensnotwendig-und-gefährlich/Nachweise-von-Gasen/index.html'],
  wa:  ['Überblick Wasser', K78 + '5-Wasser-eine-Verbindung/index.html'],
  we:  ['Wasser erforschen', K78 + '5-Wasser-eine-Verbindung/Wasser-erforschen/index.html'],
  ew:  ['Eigenschaften des Wassers', K910 + '8-Arbeitentraining-und-Wiederholung/Eigenschaften-des-Wassers/index.html'],
  md:  ['Wasser: Aufbau und Eigenschaften (Molekülbau, Dipol)', K78 + '6-Arbeitentraining-und-Wiederholung/Molekuelbau-und-Dipol/index.html'],
  lo:  ['Löslichkeit', K910 + '8-Arbeitentraining-und-Wiederholung/Loeslichkeit/index.html'],
  td:  ['Trinkwasser-Detektiv', K78 + '5-Wasser-eine-Verbindung/Trinkwasser-Detektiv/index.html'],
  wh:  ['Wasserhärte durch Titration', K78 + '5-Wasser-eine-Verbindung/Wasserhaerte-Titration/index.html'],
  sa:  ['Überblick Salze', K910 + '1-Salze-Gegensätze-ziehen-sich-an/index.html'],
  ip:  ['Ionen-Parkscheibe', K910 + '1-Salze-Gegensätze-ziehen-sich-an/Ionen-Parkscheibe/index.html'],
  si:  ['Salze identifizieren', K910 + '1-Salze-Gegensätze-ziehen-sich-an/Salze-identifizieren/index.html'],
  me:  ['Überblick Metalle', K78 + '4-Metalle-Schätze-der-Erde/index.html'],
  ho:  ['Hochofen-Werkstatt', K78 + '4-Metalle-Schätze-der-Erde/4-Hochofen-Eisen-und-Stahl/index.html'],
  qu:  ['Quantitative Betrachtungen', K910 + '2-Klare-Verhältnisse-Quantitative-Betrachtungen/index.html'],
  sl:  ['Überblick Säuren und Laugen', K910 + '3-Säuren-und-Laugen-echt-ätzend/index.html'],
  ph:  ['pH-Wert und Neutralisation', K910 + '3-Säuren-und-Laugen-echt-ätzend/pH-Wert-und-Neutralisation/index.html'],
  kw:  ['Überblick Kohlenwasserstoffe', K910 + '4-Kohlenwasserstoffe-vom-Campinggas-zum-Superbenzin/index.html'],
  ak:  ['Alkene, Alkine und Cycloalkane', K910 + '4-Kohlenwasserstoffe-vom-Campinggas-zum-Superbenzin/Ueberblick-Alkene-Alkine-Cycloalkane/index.html'],
  alk: ['Überblick Alkohole', K910 + '5-Alkohole-vom-Holzgeist-zum-Glycerin/index.html'],
  ao:  ['Alkohole im Überblick', K910 + '5-Alkohole-vom-Holzgeist-zum-Glycerin/Ueberblick-Alkohole/index.html'],
  os:  ['Überblick Organische Säuren', K910 + '6-Organische-Säuren-Salatsauce-Entkalker-&-Co/index.html'],
  as:  ['Alkanale, Alkanone und Alkansäuren', K910 + '6-Organische-Säuren-Salatsauce-Entkalker-&-Co/Ueberblick-Alkanale-Alkanone-Alkansaeuren/index.html'],
  es:  ['Überblick Ester', K910 + '7-Ester-Vielfalt-der-Produkte-aus-Alkoholen-und-Säuren/index.html'],
  eo:  ['Ester im Überblick', K910 + '7-Ester-Vielfalt-der-Produkte-aus-Alkoholen-und-Säuren/Ueberblick-Ester/index.html']
};
const QTAGS = { 1: 'Kl. 7/8', 2: '7–10', 3: 'Kl. 9/10' };
const QTITLES = {
  1: 'Doppeljahrgangsstufe 7/8',
  2: 'Themenfelder für 7/8 oder 9/10 (Schule entscheidet)',
  3: 'Doppeljahrgangsstufe 9/10'
};
const FIELDS = [
{ q: 1, id: 'a1', num: '3.1', title: 'Faszination Chemie – Feuer, Schall und Rauch',
  intro: 'Erste Orientierung in der Welt der Stoffe und ihrer Reaktionen. Du beschreibst chemische Reaktionen auf der Stoffebene und deutest sie auf der Teilchenebene: Atome werden umgruppiert, dabei wird Energie umgesetzt.',
  items: [
    ['s11','gk','Chemische Reaktion (stofflich und auf Teilchenebene)','Auf der Stoffebene siehst du, dass aus Stoffen neue Stoffe mit anderen Eigenschaften entstehen. Auf der Teilchenebene werden Teilchen umgruppiert.',['fz']],
    ['s12','gk','Energie bei chemischen Reaktionen','Reaktionsenergie, endotherm, exotherm, Aktivierungsenergie: Du erkennst, ob eine Reaktion Energie abgibt oder aufnimmt, und weißt, warum sie manchmal einen Anstoß braucht.',['br','lr']],
    ['s13','gk','Gesetz von der Erhaltung der Masse','Bei einer chemischen Reaktion bleibt die Gesamtmasse aller beteiligten Stoffe gleich.',[]],
    ['s14','gk','Reaktionen von Nichtmetallen und Metallen mit Sauerstoff, Oxidation, Wortgleichung','Du beschreibst die Verbrennung als Reaktion mit Sauerstoff (Oxidation) und schreibst sie als Wortgleichung auf.',['bk']],
    ['s15','gk','Verbindung, Metall- und Nichtmetalloxide, Edukt, Produkt','Du unterscheidest Elemente und Verbindungen, benennst Oxide und ordnest Edukte und Produkte in der Reaktion zu.',['lg']]
  ],
  terms: { gk: ['Reaktionsenergie','endotherm','exotherm','Aktivierungsenergie','Oxidation','Oxid, Verbindung','Edukt, Produkt'], lk: [] },
  exp:   { gk: ['Handhabung des Brenners','Verbrennung von Metallen und Nichtmetallen'], lk: [] },
  ctx: ['Feuer und Flamme – Brennen und Löschen','Müllverbrennung und Energie','Kerze und Wunderkerze']
},
{ q: 1, id: 'a2', num: '3.2', title: 'Das Periodensystem der Elemente – Übersicht und Werkzeug',
  intro: 'Vom einfachen Kern-Hülle-Modell zum strukturierten Modell der Atomhülle. Jedes Element hat über seine Protonen- und Elektronenzahl eine eindeutige Identität. Über das PSE verknüpfst du den Atombau mit chemischen Eigenschaften.',
  items: [
    ['s21','gk','Chemische Symbole','Du kennst die Symbole der wichtigsten Elemente und liest sie im PSE ab.',['pse']],
    ['s22','gk','Atombau: Kern-Hülle-Modell (Proton, Neutron, Elektron)','Der Atomkern besteht aus Protonen und Neutronen, die Hülle aus Elektronen. Du bestimmst Teilchenzahlen aus dem PSE.',['aw']],
    ['s23','gk','Modell der strukturierten Atomhülle, Elektronenschreibweise nach Lewis','Die Elektronen besetzen Schalen. Die Außenelektronen stellst du mit Punkten oder Strichen nach Lewis dar.',['aw','lw']],
    ['s24','gk','Stoffliche und teilchenbezogene Ordnungsprinzipien des PSE','Du erklärst, warum Elemente einer Hauptgruppe ähnliche Eigenschaften haben, und ordnest Metalle, Nichtmetalle und Edelgase.',['pse','aw']]
  ],
  terms: { gk: ['PSE','Element','Proton, Neutron, Elektron','Isotop','absolute und relative Atommasse','Periode, Hauptgruppe, Nebengruppe','Atommodell','Valenzelektronen/Außenelektronen','Edelgase'], lk: [] },
  exp:   { gk: ['Modellexperiment zum Kern-Hülle-Modell'], lk: [] },
  ctx: ['Ordnungsprinzipien chemischer Elemente – ein historischer Rückblick','Entwicklung der Atommodelle','Rutherfordscher Streuversuch – vom Experiment zum Modell']
},
{ q: 1, id: 'a3', num: '3.3', title: 'Gase – zwischen lebensnotwendig und gefährlich',
  intro: 'Du charakterisierst unsichtbare Bestandteile der Luft und weitere wichtige Gase und weist sie nach. Den Aufbau der Moleküle erklärst du mit der Elektronenpaarbindung. Eine Deutung der Gaseigenschaften auf Teilchenebene findet hier noch nicht statt.',
  items: [
    ['s31','gk','Eigenschaften, Verwendung und Nachweismethoden von Sauerstoff, Wasserstoff und Kohlenstoffdioxid','Du kennst die Eigenschaften der drei Gase und ihre Nachweise (Glimmspanprobe, Knallgasprobe, Kalkwasser).',['ng']],
    ['s32','gk','Bestandteile der Luft','Du nennst die wichtigsten Bestandteile der Luft mit ihren ungefähren Anteilen.',['gas']],
    ['s33','gk','Atombindung/Elektronenpaarbindung, Oktettregel','Atome teilen sich Elektronenpaare, bis jedes Atom Edelgaskonfiguration, also acht Außenelektronen, erreicht.',['lw','lt']],
    ['s34','gk','Moleküle, Lewis-Strukturformel','Du zeichnest die Lewis-Strukturformel einfacher Moleküle mit bindenden und freien Elektronenpaaren.',['lw','lt']]
  ],
  terms: { gk: ['Moleküle','unpolare Atom-/Elektronenpaarbindung','Oktettregel','Lewis-Strukturformel'], lk: [] },
  exp:   { gk: ['Nachweis von Wasserstoff, Sauerstoff und Kohlenstoffdioxid','Ermittlung des Sauerstoffgehaltes der Luft'], lk: [] },
  ctx: ['Dicke Luft – Luftverschmutzung','Die Hindenburg – fliegende Zigarre','Rauchgasvergiftung','Edelgase – edle Gase?']
},
{ q: 1, id: 'a4', num: '3.4', title: 'Wasser – eine Verbindung',
  intro: 'Über Nachweise und die Reaktionen von Wasserstoff und Sauerstoff kommst du zum Wasser. Die Elektronegativität erklärt das Wassermolekül als Dipol und damit viele Eigenschaften des Wassers.',
  items: [
    ['s41','gk','Eigenschaften von Wasser','Du nennst Besonderheiten des Wassers (z. B. Siedetemperatur, Dichteanomalie, Oberflächenspannung) und führst sie auf den Molekülbau zurück.',['ew','we']],
    ['s42','gk','Wasser als Lösungsmittel','Du erklärst, warum sich manche Stoffe in Wasser lösen und andere nicht.',['lo']],
    ['s43','gk','Quantitative Analyse von Wasser','Du untersuchst Wasser auf Inhaltsstoffe, z. B. die Wasserhärte.',['wh','td']],
    ['s44','gk','Bildung und Zerlegung von Wasser als Beispiel der Umkehrbarkeit chemischer Reaktionen','Wasser lässt sich aus den Elementen bilden und wieder in sie zerlegen (Elektrolyse).',['we']],
    ['s45','gk','Reaktionsgleichung','Du stellst die Reaktionsgleichung für Bildung und Zerlegung von Wasser auf.',['we']],
    ['s46','gk','Molekülbau','Du zeichnest das Wassermolekül mit Lewis-Strukturformel und erklärst seine gewinkelte Form.',['md','lw']],
    ['s47','gk','Elektronegativität, polare Elektronenpaarbindung, Dipol','Unterschiedliche Elektronegativität macht die O–H-Bindung polar. Das gewinkelte Molekül ist deshalb ein Dipol.',['md']]
  ],
  terms: { gk: ['Reaktionsgleichung','Elektronegativität','polare Elektronenpaarbindung','Dipol','Dipol-Dipol-Wechselwirkungen'], lk: [] },
  exp:   { gk: ['Wasser als Lösungsmittel','Wassernachweis','Ablenkung eines Wasserstrahls','elektrolytische Zerlegung von Wasser'], lk: [] },
  ctx: ['Wasserstoff – Energieträger der Zukunft?','Wasser – Transportmittel in der Natur','Wasserläufer ertrinken nicht','Salzwasser und Süßwasser – vom Überfluss zum Mangel']
},
{ q: 1, id: 'a5', num: '3.5', title: 'Salze – Gegensätze ziehen sich an',
  intro: 'Du beschreibst Eigenschaften von Salzen und erklärst sie mit Art, Anordnung und Wechselwirkung der Teilchen. Das Ion kommt als neue Teilchenart dazu: Starke Anziehungskräfte zwischen entgegengesetzt geladenen Teilchen bestimmen die Eigenschaften der Salze.',
  items: [
    ['s51','gk','Ion – Ionenbildung','Du erklärst, wie aus Atomen durch Abgabe oder Aufnahme von Elektronen positive und negative Ionen entstehen.',['ip']],
    ['s52','gk','Ionensubstanzen (Salze), Bildung, Vorkommen und Verwendung','Du kennst wichtige Salze, wie sie entstehen und wofür man sie nutzt.',['sa','si']],
    ['s53','gk','Bau und Eigenschaften (Ionenkristalle, Kristallgitter) – Ionenbindung','Die Ionen sind regelmäßig im Gitter angeordnet. Daraus erklärst du Sprödigkeit, hohe Schmelztemperatur und Leitfähigkeit.',['sa','ip']],
    ['s54','gk','Summenformel/Wertigkeit','Du stellst die Verhältnisformel eines Salzes aus den Ionenladungen auf.',['ip']]
  ],
  terms: { gk: ['Ion','Ionenbindung (chemische Bindung)','Ionensubstanz','Ionenkristall, Kristallgitter','Löslichkeit','Lösungsmittel'], lk: [] },
  exp:   { gk: ['Leitfähigkeitsuntersuchungen an Feststoffen und Lösungen','Löslichkeit von Salzen','Flammenfärbungen phänomenologisch'], lk: [] },
  ctx: ['Salz – kostbar und lebenswichtig','Streusalz – Pro und Kontra','Kochsalz – weißes Gold','Kochsalzlösung – ein Lebensretter?','Totes-Meer-Salz','Salz als Farbgeber im Feuerwerk']
},
{ q: 1, id: 'a6', num: '3.6', title: 'Metalle – Schätze der Erde',
  intro: 'Du stellst den Zusammenhang zwischen den Eigenschaften von Metallen und ihrem Bau auf Teilchenebene her. Neben Atom- und Ionenbindung lernst du die Metallbindung kennen. Bei der Gewinnung von Metallen begegnet dir die Redoxreaktion als neuer Reaktionstyp.',
  items: [
    ['s61','gk','Eigenschaften und Verwendung der Metalle und deren Legierungen','Du verbindest Eigenschaften wie Leitfähigkeit und Verformbarkeit mit der Verwendung und kennst wichtige Legierungen.',['me']],
    ['s62','gk','Gewinnung','Du beschreibst, wie man Metalle aus Erzen gewinnt, z. B. Eisen im Hochofen.',['ho']],
    ['s63','gk','Edle und unedle Metalle','Du ordnest Metalle danach, wie leicht sie mit Sauerstoff reagieren.',['me']],
    ['s64','gk','Bau der Metalle (Elektronengas-Modell)','Metallatom-Rümpfe im Gitter, dazwischen frei bewegliche Elektronen. Damit erklärst du Leitfähigkeit und Verformbarkeit.',['me']],
    ['s65','gk','Reaktionsgleichungen','Du formulierst Reaktionsgleichungen zur Gewinnung und Verbrennung von Metallen.',['ho']],
    ['s66','gk','Reduktion und Redoxreaktion','Reduktion ist die Abgabe von Sauerstoff. Oxidation und Reduktion laufen zusammen als Redoxreaktion ab.',['ho']],
    ['s67','gk','Affinität der Metalle gegenüber Sauerstoff','Du vergleichst, wie stark verschiedene Metalle Sauerstoff binden, und sagst voraus, welches Metall einem anderen den Sauerstoff entreißt.',['ho']]
  ],
  terms: { gk: ['Erz','Legierung','Reduktion','Affinität','Redoxreaktion','Metallbindung','Metallgitter','Elektronengas-Modell'], lk: [] },
  exp:   { gk: ['Versuche zur elektrischen Leitfähigkeit, Wärmeleitfähigkeit und Verformbarkeit','Verbrennung von Metallen unterschiedlichen Zerteilungsgrades','Reaktion von Metallen unterschiedlicher Affinität zu Sauerstoff','Gewinnung von Metallen aus Oxiden'], lk: [] },
  ctx: ['Aluminium – ein Metall wie jedes andere?','Historische Gewinnung von Metallen','Thermit-Verfahren – eine wichtige Redoxreaktion','Schrott als Rohstoff','Erz – Rohstoffe für die Gewinnung von Metallen','Münzmetalle – Woraus besteht ein Euro?']
},
{ q: 2, id: 'a7', num: '3.7', title: 'Klare Verhältnisse – Quantitative Betrachtungen',
  intro: 'Aufbauend auf den Gesetzen der konstanten Massen und Proportionen und dem Aufstellen von Reaktionsgleichungen rechnest du in diesem Themenfeld stöchiometrisch. Im Mittelpunkt steht das Mol als Zählmaß für die Stoffmenge.',
  items: [
    ['s71','gk','Stoffmenge','Die Stoffmenge n gibt in der Einheit Mol an, wie viele Teilchen vorliegen.',['qu']],
    ['s72','gk','Atommasse und molare Masse','Du liest Atommassen im PSE ab und bestimmst daraus die molare Masse von Elementen und Verbindungen.',['qu']],
    ['s73','gk','Stöchiometrisches Rechnen (Masse, Stoffmenge und molare Masse)','Du rechnest zwischen Masse m, Stoffmenge n und molarer Masse M um.',['qu']],
    ['s74','gk','Massenberechnungen bei chemischen Reaktionen','Mit der Reaktionsgleichung berechnest du, wie viel Masse eines Stoffes reagiert oder entsteht.',['qu']],
    ['s75','gk','Stoffmengenkonzentration wässriger Lösungen','Du berechnest die Konzentration c in mol/L und die Stoffmenge oder Masse in einer Lösung.',['qu','wh']]
  ],
  terms: { gk: ['Atommasse','Stoffmenge','Mol','Molare Masse','Stoffmengenkonzentration'], lk: [] },
  exp:   { gk: ['Vergleich der Massen verschiedener Stoffe gleicher Stoffmenge'], lk: [] },
  ctx: ['Historische und gegenwärtige Zählmaße','Isotonische Kochsalzlösung – Zusammensetzung nach Maß','Koch- und Backrezepte – Man nehme die richtige Menge']
},
{ q: 2, id: 'a8', num: '3.8', title: 'Säuren und Laugen – echt ätzend',
  intro: 'Mit Indikatoren untersuchst du Stoffe aus Alltag und Labor. Du erklärst saure und alkalische Lösungen über die Konzentration von Hydronium- und Hydroxid-Ionen und beschreibst die Neutralisation als Reaktion dieser Ionen zu Wasser.',
  items: [
    ['s81','gk','Indikatoren – Hilfsmittel zum Erkennen und Unterscheiden von sauren, neutralen und basischen (alkalischen) Lösungen','Du nutzt Indikatoren und ordnest ihre Farben dem sauren, neutralen oder basischen Bereich zu.',['sl','ph']],
    ['s82','gk','pH-Wert (Maß für den sauren, neutralen oder basischen Charakter einer Lösung)','Du liest pH-Werte ein und ordnest sie zu: sauer, neutral, basisch.',['ph']],
    ['s83','gk','Säure-Base-Begriff','Du erklärst Säuren und Basen über die Ionen, die sie in Wasser bilden.',['sl']],
    ['s84','gk','Bildung von sauren und alkalischen Lösungen','Nichtmetalloxide ergeben mit Wasser saure, Metalloxide alkalische Lösungen.',['sl']],
    ['s85','gk','Neutralisationsreaktion','Hydronium-Ionen und Hydroxid-Ionen reagieren zu Wassermolekülen. Du formulierst die Reaktionsgleichung.',['ph']]
  ],
  terms: { gk: ['Indikatoren','Säuren, saure Lösungen','Wasserstoff-/Hydronium- bzw. Oxonium-Ionen','Basen, basische/alkalische Lösungen (Laugen)','Hydroxid-Ion','Neutralisation'], lk: [] },
  exp:   { gk: ['Untersuchung von Haushalts- und Laborchemikalien mithilfe von Indikatoren','Reaktion von Nichtmetalloxiden und Metalloxiden mit Wasser','Reaktion von sauren Lösungen mit Metallen und mit Carbonaten','Neutralisationsreaktion'], lk: [] },
  ctx: ['Cola – ein säurehaltiges Getränk','Rohrreiniger – die Mischung macht es','Salmiak – ein bitter salziger Aromastoff','Natron – nicht nur zum Backen gut']
},
{ q: 3, id: 'a9', num: '3.9', title: 'Kohlenwasserstoffe – vom Campinggas zum Superbenzin',
  intro: 'Die Kohlenwasserstoffe sind deine erste Stoffgruppe der organischen Chemie: Verbindungen nur aus Kohlenstoff und Wasserstoff. Ihre technische Bedeutung liegt vor allem bei der Energienutzung.',
  items: [
    ['s91','gk','Vorkommen und Verwendung von Kohlenwasserstoffen','Du nennst Vorkommen (z. B. Erdöl, Erdgas) und Verwendung als Brennstoff und Rohstoff.',['kw']],
    ['s92','gk','Struktur und Eigenschaften gesättigter Kohlenwasserstoffe, homologe Reihe','Du zeichnest Alkane und erkennst die homologe Reihe mit der allgemeinen Formel.',['kw']],
    ['s93','gk','Isomerie','Gleiche Summenformel, verschiedene Struktur: Du zeichnest Isomere der Butane und Pentane.',['kw']],
    ['s94','gk','Zwischenmolekulare Wechselwirkungen: Van-der-Waals-Kräfte','Du erklärst, warum Siedetemperaturen mit der Kettenlänge steigen.',['kw']],
    ['s95','gk','Nomenklatur','Du benennst Alkane nach den Regeln der Nomenklatur.',['kw']],
    ['s96','gk','Chemische Reaktionen (Verbrennung)','Du formulierst die Reaktionsgleichung der vollständigen Verbrennung eines Alkans.',['kw']],
    ['s97','gk','Ungesättigte Kohlenwasserstoffe','Alkene und Alkine haben Doppel- bzw. Dreifachbindungen. Du erkennst sie an der Formel und am Nachweis.',['ak']]
  ],
  terms: { gk: ['gesättigte und ungesättigte Kohlenwasserstoffe','Alkane, Alkene, Alkine','homologe Reihe','Halbstrukturformel','Nomenklatur','Isomerie','Van-der-Waals-Kräfte','Doppel- und Dreifachbindung'], lk: [] },
  exp:   { gk: ['Verbrennung von Alkanen und Nachweis der Reaktionsprodukte','Alkane als Lösungsmittel'], lk: [] },
  ctx: ['Benzin – ein Kohlenwasserstoffgemisch','Vom Erdöl zum Benzin','Kohlenwasserstoffe als Energieträger','Acetylenschweißen – Autogenschweißen','Waschbenzin – der Fleck ist weg']
},
{ q: 3, id: 'a10', num: '3.10', title: 'Alkohole – vom Holzgeist zum Glycerin',
  intro: 'Im Vergleich zu den Kohlenwasserstoffen enthalten Alkohole zusätzlich Sauerstoff. Zum ersten Mal erklärst du Eigenschaften über eine funktionelle Gruppe. Über Alkanole und Alkanale lernst du auch die Aldehyd-Gruppe kennen.',
  items: [
    ['s101','gk','Herstellung von Methanol oder Ethanol','Du beschreibst, wie Ethanol durch Gärung oder Methanol technisch hergestellt wird.',['alk']],
    ['s102','gk','Struktur und Nomenklatur der Alkanole','Du zeichnest und benennst Alkanole, z. B. Methanol, Ethanol, Propan-1-ol.',['ao']],
    ['s103','gk','Bedeutung einer funktionellen Gruppe','Die Hydroxy-Gruppe bestimmt die Eigenschaften der Alkohole.',['ao']],
    ['s104','gk','Änderung von Eigenschaften innerhalb der homologen Reihe in Bezug zur Verwendung (Hydrophilie, Hydrophobie)','Mit langer Kohlenwasserstoffkette wird ein Alkohol wasserabweisender. Das bestimmt die Verwendung.',['ao']],
    ['s105','gk','Physiologische Wirkung von alkoholischen Getränken','Du diskutierst die Wirkung von Ethanol und die Gefahr von Methanol.',['alk']],
    ['s106','gk','Propan-1,2,3-triol','Glycerin hat drei OH-Gruppen. Du erklärst daraus seine Eigenschaften und Verwendung.',['ao']],
    ['s107','gk','Alkanale','Die Oxidation eines Alkanols führt zum Alkanal. Du kennst die Aldehyd-Gruppe und ihren Nachweis.',['ao','as']]
  ],
  terms: { gk: ['Alkanole, Alkohole','Hydroxy-Gruppe','funktionelle Gruppe','Hydrophilie, Hydrophobie','Alkanale','Aldehyd-Gruppe','einwertige und mehrwertige Alkohole'], lk: [] },
  exp:   { gk: ['enzymkatalytische Vergärung von Obst, Säften o. ä.','Alkohol als Lösungsmittel','Oxidation eines Alkanols','Nachweis der Aldehydgruppe'], lk: [] },
  ctx: ['Legale Drogen – Suchtmittel','Glycerin – Inhaltsstoff von Kosmetikartikeln und Lebensmittelzusatzstoff','Glykol als Frostschutzmittel oder Weinzusatzstoff?']
},
{ q: 3, id: 'a11', num: '3.11', title: 'Organische Säuren – Salatsauce, Entkalker & Co',
  intro: 'Du verstehst, wie die Carboxy-Gruppe die Eigenschaften sauerstoffhaltiger Kohlenwasserstoffverbindungen bestimmt, und vergleichst organische mit anorganischen Säuren. Das bereitet die Esterbildung vor.',
  items: [
    ['s111','gk','Herstellung der Alkansäuren','Du beschreibst, wie Alkansäuren durch Oxidation von Alkanalen entstehen, z. B. Essigsäure.',['os','as']],
    ['s112','gk','Struktur von Alkansäuren, Carboxy-Gruppe','Du zeichnest Alkansäuren mit ihrer Carboxy-Gruppe und benennst sie.',['as']],
    ['s113','gk','Eigenschaften und Verwendung von Alkansäuren','Du nennst Eigenschaften und Verwendung, z. B. von Essigsäure, Zitronensäure, Ameisensäure.',['os']],
    ['s114','gk','Änderung der Eigenschaften innerhalb der homologen Reihe in Bezug zur Verwendung','Mit der Kettenlänge ändern sich Löslichkeit und Eigenschaften. Das bestimmt die Verwendung.',['as']],
    ['s115','gk','Aminosäuren','Aminosäuren tragen zwei funktionelle Gruppen: Amino- und Carboxy-Gruppe.',['os']]
  ],
  terms: { gk: ['Carbonsäure – Alkansäure','Carboxy-Gruppe','Aminosäure','Aminogruppe'], lk: [] },
  exp:   { gk: ['Herstellung von Essig','Vergleichende Untersuchung zwischen organischen und anorganischen Säuren'], lk: [] },
  ctx: ['Sanitärreiniger und Entkalker im Haushalt','Haltbare Lebensmittel durch Konservierung','Organische Säuren – unverzichtbar bei der Lebensmittelherstellung','Organische Säuren – Alles Naturprodukte?','Weinsäure, Citronensäure und Oxalsäure']
},
{ q: 3, id: 'a12', num: '3.12', title: 'Ester – Vielfalt der Produkte aus Alkoholen und Säuren',
  intro: 'Du lernst die Synthese organischer Verbindungen aus Stoffen mit funktionellen Gruppen kennen. Ester begegnen dir als Duftstoffe, Lösungsmittel, Arzneimittel und in Seifen und Fetten.',
  items: [
    ['s121','gk','Eigenschaften und Verwendung von Alkansäurealkylestern und Fetten (lipophil, lipophob)','Du nennst Eigenschaften und Verwendung von Estern und Fetten und erklärst ihre Löslichkeit.',['es','eo']],
    ['s122','gk','Struktur von Estern, Estergruppe','Du erkennst die Estergruppe in Strukturformeln und benennst einfache Ester.',['eo']],
    ['s123','gk','Synthese und Analyse von Estern','Du stellst einen Ester her und prüfst ihn, z. B. am Geruch.',['eo']],
    ['s124','gk','Kondensationsreaktion und Hydrolyse als katalysierte, umkehrbare Reaktionen','Aus Säure und Alkohol entsteht Ester und Wasser (Kondensation). Mit Wasser kehrt sich das um (Hydrolyse). Eine Säure beschleunigt beides.',['eo']],
    ['s125','gk','Fettsäuren und deren Salze','Fettsäuren sind langkettige Alkansäuren. Ihre Salze sind Seifen.',['es','eo']]
  ],
  terms: { gk: ['Ester-Gruppe','lipophil, lipophob','Kondensationsreaktion','Hydrolyse','Fett und Fettsäure','Seife, Tensid'], lk: [] },
  exp:   { gk: ['Synthese und Hydrolyse eines organischen Esters','Seifenherstellung','Ester als Lösungsmittel'], lk: [] },
  ctx: ['Vom beißenden Geruch der Säure zum herrlichen Fruchtaroma','Lösungsmittel in Klebstoffen','Molekülegos – aus einfachen Bausteinen große Moleküle bauen','Sprengstoff oder medizinischer Bindfaden – Vielfalt der Ester','Vom Dreckfleck zur reinen Weste – Waschen im Alltag','ASS – ein Wirkstoff verändert die Welt','Nagellackentferner']
}
];
