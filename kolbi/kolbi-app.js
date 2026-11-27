/*
  Kolbi in den Lern-Anwendungen (Simulationen, 3D-Labore, Lernmodule).
  Einbinden: <script src=".../kolbi/kolbi-app.js"></script> vor </body>.
  Pro Anwendung steht unten ein Satz, wozu sie dient. Kolbi sagt ihn beim ersten Öffnen pro Sitzung
  und bei jedem Antippen. Eine neue Anwendung bekommt hier einfach eine weitere Zeile (Schlüssel = Ordnername).
*/
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me || !me.src) return;
  var base = me.src.replace(/kolbi-app\.js.*$/, '');

  // Physikalische Chemie: Hier begleitet Hugo (statt Kolbi), wie in der Semestercheckliste. Neue Anwendung dieser Art: Ordnername hier ergänzen.
  var HUGO = { 'Orbitalmodell': 1, 'Elektronenkonfiguration': 1, 'd-und-f-Orbitale': 1, 'Doppelspaltexperiment': 1, 'Systeme-und-1-Hauptsatz': 1,
               'Redoxreihe-Metallgewinnung': 1, 'Disproportionierung': 1, 'Kupfer-Raffination': 1, 'Zusammenhang-von-Licht-und-Farbe': 1 };
  var isHugo = !!HUGO[(location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '').split('/').pop())];

  var TIP = 'Probiere die Bedienelemente einfach aus, hier geht nichts kaputt. Oben kommst du über „Zur Übersicht“ oder „Zurück“ wieder aus der Anwendung heraus.';
  var APPS = {
    'Brandbekämpfung': ['Hier lernst du, welches Löschmittel bei welchem Brand hilft und was die Lage sogar noch verschlimmert.'],
    'Brenner-entzuenden': ['Hier übst du in einem Spiel, einen Gasbrenner in der richtigen Reihenfolge sicher zu entzünden.'],
    'Laborgeräte': ['Hier lernst du die wichtigsten Laborgeräte kennen und kannst dich im Quizmodus selbst testen.'],
    'Laborregeln-und-Gefahrenstoffe': ['Das ist dein Chemie-Labor-Führerschein: Du lernst Laborregeln und Gefahrstoffe an mehreren Stationen kennen und holst dir am Ende ein PDF-Zertifikat.'],
    'simulation-pse': ['Das ist ein interaktives Periodensystem. Tippe ein Element an, dann siehst du seine Eigenschaften groß. Du kannst die Färbung wechseln, suchen oder ein Quiz machen.'],
    'Nachweise-von-Gasen': ['Im 3D-Labor weist du Gase nach: Wasserstoff, Sauerstoff, Stickstoff und Kohlenstoffdioxid, mit Glimmspan, Brenner und Kalkwasser.', 'Wähle eine Gasflasche und klicke dann das Reagenzglas an. Mit der Leiste unten wechselst du die Ansicht.'],
    '4-Hochofen-Eisen-und-Stahl': ['Hier beschickst du einen Hochofen selbst, beobachtest die Zonen im Inneren und stichst ihn am Ende an: vom Eisenerz zum Stahl.'],
    'Molekuelbau-und-Dipol': ['Hier bereitest du dich auf die SKK vor: Aufbau und Eigenschaften des Wassers, also Molekülbau, Polarität, Wasserstoffbrücken und Löslichkeit.'],
    'Ionen-Parkscheibe': ['Die Ionen-Parkscheibe ist eine Formelschablone: Stelle links ein Kation und rechts ein Anion ein und finde so die Formel des passenden Salzes.'],
    'Salze-identifizieren': ['Im 3D-Labor identifizierst du Salze: Anionen mit Silbernitrat und Kationen über die Flammenfarbe.', 'Wähle ein Gerät aus und klicke dann auf die Probe. Mit der Leiste unten wechselst du die Ansicht.'],
    'pH-Wert-und-Neutralisation': ['Diese Simulation zeigt, was bei der Neutralisation passiert: Du gibst Säuren und Laugen in 0,1-mol/L-Schritten zu und führst ein Labor-Tagebuch.'],
    'Ueberblick-Alkene-Alkine-Cycloalkane': ['Hier verschaffst du dir einen Überblick über Alkene, Alkine und Cycloalkane. Das Passwort steht auf deinem Arbeitsblatt unter dem QR-Code.'],
    'Ueberblick-Alkohole': ['Hier verschaffst du dir einen Überblick über die Alkohole. Das Passwort steht auf deinem Arbeitsblatt unter dem QR-Code.'],
    'Ueberblick-Alkanale-Alkanone-Alkansaeuren': ['Hier verschaffst du dir einen Überblick über Alkanale, Alkanone und Alkansäuren. Das Passwort steht auf deinem Arbeitsblatt unter dem QR-Code.'],
    'Ueberblick-Ester': ['Hier verschaffst du dir einen Überblick über die Ester. Das Passwort steht auf deinem Arbeitsblatt unter dem QR-Code.'],
    'Eigenschaften-des-Wassers': ['Diese Lern-App zeigt interaktive Modelle zu Struktur, Bindungen und Eigenschaften des Wassers. Du beginnst mit dem Aufbau des Moleküls.'],
    'Loeslichkeit': ['Hier untersuchst du die Löslichkeit in mehreren Modulen. Das erste, die Grundlagen, ist Pflicht.'],
    'Aminosaeuren': ['Hier erarbeitest du Aufbau, Eigenschaften und das Zwitterion der Aminosäuren, mit Versuchen zu Löslichkeit, pH-Wert und Elektrophorese. Es gibt Aufgaben für Grund- und Leistungskurs.'],
    'Biuretprobe': ['Im 3D-Labor führst du die Biuret-Probe durch, einen Nachweis für Proteine. Die Pipetten liegen in der Schublade.'],
    'Peptidbindung-EPA': ['Hier lernst du mit dem EPA-Modell, wie die Peptidbindung aufgebaut ist und wie es um ihre Drehbarkeit steht, mit 3D-Modellen und Spielen.'],
    'Proteinstrukturen': ['Hier erkundest du Struktur und Funktion der Proteine, von der Primär- bis zur Quartärstruktur, mit Lewis-Formeln und 3D-Modellen.'],
    'Systeme-und-1-Hauptsatz': ['Hier lernst du Systeme und den 1. Hauptsatz der Thermodynamik, mit Spielen und Versuchen zu Abkühlung, Innerer Energie und Kalorimeter.'],
    'Der-Kohlenstoffdioxid-Carbonat-Kreislauf': ['Diese Simulation führt dich in Stationen durch den Kohlenstoffdioxid-Carbonat-Kreislauf. Mit dem Zeitraffer siehst du, wie sich alles über lange Zeit verändert.'],
    'Gleichgewicht': ['Hier simulierst du das Gleichgewicht von Eisen(III)-thiocyanat und stellst Startwerte und Temperatur ein.'],
    'Haber-Bosch-Verfahren': ['Hier erlebst du das Optimierungs-Dilemma beim Haber-Bosch-Verfahren: Temperatur, Druck und Katalysator spielen dabei zusammen.'],
    'Konduktometrie': ['Hier führst du eine konduktometrische Titration durch: Ca²⁺-Lösung mit Oxalsäure, mit Leitfähigkeitsmessgerät.'],
    'Nukleophile-Substitution': ['Das Reaktionslabor zeigt Mechanismen wie SN2, SN1 und die Veresterung Schritt für Schritt. Wähle einen Mechanismus und schiebe den Regler.'],
    'Saeure-Base-Titration': ['Im 3D-Labor bestimmst du Konzentration und pH-Wert von Natronlauge durch Titration mit Salzsäure und Universalindikator.'],
    'Saeure-Basen-Konstanten': ['Dieses Lernmodul erklärt pH-Wert und Säurestärke. Wähle zuerst deinen Kurs, dann laden die passenden Aufgaben.'],
    'Säure-Base-Konzept-Brönsted': ['Hier lernst du das Brønsted-Konzept in drei Modulen: den Protonenübergang beobachten, den Fachtext lesen und das Konzept anwenden.'],
    'Chromatografie-Rf-Werte': ['Hier lernst du die Dünnschichtchromatografie kennen: im 3D-Labor, beim Messen von Rf-Werten, bei der Spurensuche und im Trennwettbewerb.'],
    'Indikatoren-Grundlagen': ['Hier lernst du, wie Indikatorfarbstoffe wirken und wie sie bei Titrationen helfen. Die Module schalten sich nacheinander frei.'],
    'Zusammenhang-von-Licht-und-Farbe': ['Im 3D-Labor erkundest du Dispersion, additive und subtraktive Farbmischung und die Farbe von Lösungen durch Absorption.'],
    'Disproportionierung': ['Hier übst du Disproportionierung und Synproportionierung: Oxidationszahlen-Leiter, Erkennen, Gleichungen bauen, Mischlabor und Quiz.'],
    'Redoxreihe-Metallgewinnung': ['Hier geht es darum, welches Metall Elektronen an wen abgibt: von der Abscheidung aus Salzlösungen bis zu Hochofen und Kupfergewinnung.'],
    'Sulfit-Titration': ['Im 3D-Labor bestimmst du iodometrisch freies SO₂ im Weißwein.'],
    'Doppelspaltexperiment': ['Hier schickst du Elektronen und Photonen durch einen Doppelspalt und findest heraus, was die Quantenobjekte so besonders macht.'],
    'Elektronenkonfiguration': ['Hier verteilst du Elektronen auf die Orbitale und schreibst die Elektronenkonfiguration auf.'],
    'Orbitalmodell': ['Hier gehst du vom Bohr-Modell zur Orbitalwolke und erkundest, wie Elektronen im Atom beschrieben werden.'],
    'd-und-f-Orbitale': ['Hier erkundest du die Gestalt der d- und f-Orbitale, Übergangsmetalle und die Farbe von Komplexen.'],
    'Kupfer-Raffination': ['Hier lernst du die Elektrolyse in der Technik kennen: Aus Rohkupfer wird hochreines Kupfer, und die Edelmetalle fallen nebenbei an.'],
    'Wasser-erforschen': ['Hier erforschst du, warum Wasser sich so besonders verhält. Beginne mit Modul 1, danach kannst du die anderen drei in beliebiger Reihenfolge bearbeiten.'],
    'Farbe-und-Konstitution': ['Hier erarbeitest du in vier Modulen, wie die Struktur eines Stoffes seine Farbe bestimmt: Konjugation, I- und M-Effekte, Auxochrome und Antiauxochrome und am Ende der Tintenkiller.'],
    'Blue-Bottle-Farbwechsel': ['Hier gehst du dem Blue-Bottle-Versuch mit Methylenblau und Indigocarmin auf den Grund: Elektronen auf Teilchenebene, der Farbstoff als Katalysator und der hypsochrome Effekt. Ich bin heute auch ein Kolben, mit eigenem Ansatz und Stopfen. Wenn du mich schnell hin und her ziehst, schüttelst du mich, und ich färbe mich um!'],
    'Gesamtgleichung-aus-Teilgleichungen': ['Hier baust du aus Oxidation und Reduktion die Gesamt-Redoxgleichung. An der Elektronen-Waage findest du die richtigen Faktoren, danach stellst du Teilgleichungen selbst auf und jagst Fehler. Ich bin dein Prüfstand.'],
    'Aldehyd-Nachweis-Fehling-Tollens': ['Hier weist du mit FEHLING- und TOLLENS-Probe nach, dass Aldehyde reduzierend wirken. Heute bin ich die Probe: Ich zeige dir immer, was im Reagenzglas passiert. Danach stellst du die Redoxgleichungen auf.'],
    'Phenolphthalein-Farbumschlag': ['Hier gehst du dem Farbumschlag von Phenolphthalein auf den Grund, in fünf Modulen vom Kolben bis zum Spektrum. Heute bin ich wieder ein Kolben: Ich enthalte denselben Ansatz wie der Kolben im Versuch und färbe mich mit. Tropfe Natronlauge oder Salzsäure zu und sieh mir zu!'],
    'Wasserhaerte-Titration': ['Hier bestimmst du die Wasserhärte durch Titration: erst eine Einführung, dann das 3D-Labor mit Tutorial und zum Schluss die Berechnung.'],
    'Trinkwasser-Detektiv': ['Hier gehst du dem Trinkwasser auf die Spur: Was ist gelöst, woher kommt es, welche Grenzwerte gelten und warum setzt sich Kalk ab? Das Modul ist für Wahlpflicht Chemie Klasse 10.'],
    'Kunststoffklassen': ['Hier untersuchst du Thermoplaste, Duromere und Elastomere im Teilchenmodell und von außen, prüfst ihr Verhalten in Wasser und Lösungsmitteln und baust Kunststoffe aus Monomeren.', 'Oben wählst du den Bereich. Tippe mich an, dann sage ich dir, was als Nächstes dran ist.']
  };


  // Themenbezogene Bemerkungen: Kolbi kommentiert zwischendurch passend zum Fach, nicht nur die Aufgabe
  var G = {
    sicher: ['Im Labor gilt: Schutzbrille auf, Haare zusammen, Ruhe bewahren. Dann macht Chemie am meisten Spaß.', 'Feuer braucht drei Dinge: Brennstoff, Sauerstoff und Zündtemperatur. Fehlt eines, ist es aus.', 'Gute Chemiker sind vorsichtig, nicht ängstlich. Das ist ein Unterschied!', 'Ich bin aus Borosilikatglas. Hitze macht mir wenig aus, Hektik schon.'],
    gas: ['Sauerstoff lässt den Glimmspan wieder aufflammen. Wasserstoff antwortet mit einem kleinen Knall.', 'Kalkwasser wird trüb, wenn Kohlenstoffdioxid im Spiel ist. Das ist ein klassischer Nachweis.', 'Stickstoff macht fast vier Fünftel der Luft aus, ist aber ein ziemlich träger Geselle.'],
    saeure: ['Der pH-Wert ist eine logarithmische Skala: Ein Schritt bedeutet den Faktor zehn.', 'Säuren geben Protonen ab, Basen nehmen sie auf. Das ist das Brønsted-Prinzip in einem Satz.', 'Beim Titrieren zählt der Äquivalenzpunkt. Langsam zutropfen lohnt sich!', 'Indikatoren sind kleine Farbdetektive: Sie verraten dir den pH-Wert durch ihre Farbe.'],
    organik: ['Kohlenstoff bindet vierfach. Deshalb gibt es so viele organische Verbindungen.', 'Funktionelle Gruppen entscheiden, wie sich ein Molekül verhält. Such sie zuerst!', 'Je länger die Kohlenstoffkette, desto höher der Siedepunkt. Meistens jedenfalls.'],
    protein: ['Proteine sind Ketten aus Aminosäuren. Die Reihenfolge entscheidet über die Form und damit über die Funktion.', 'Die Peptidbindung ist ziemlich starr. Das hat Folgen für die Form der Proteine.', 'Dein Körper baut aus nur etwa zwanzig Aminosäuren unzählige verschiedene Proteine.'],
    atom: ['Elektronen sind keine kleinen Kugeln auf Bahnen. Orbitale beschreiben nur, wo man sie wahrscheinlich findet.', 'Die Elektronenkonfiguration folgt Regeln: Aufbauprinzip, Pauli-Prinzip und Hundsche Regel.', 'Der Doppelspalt zeigt: Quantenobjekte lassen sich nicht in Wellen- oder Teilchenschublade stecken.'],
    energie: ['Energie geht nie verloren, sie wandelt sich nur um. Das ist der 1. Hauptsatz.', 'Das Prinzip von Le Chatelier: Das System weicht einem Zwang aus. Wie ein Schüler vor der Klassenarbeit.', 'Im Gleichgewicht passiert noch immer etwas: Hin- und Rückreaktion laufen gleich schnell.'],
    redox: ['Redox heißt: Elektronen wandern. Wer sie abgibt, wird oxidiert, wer sie aufnimmt, reduziert.', 'Je unedler ein Metall, desto lieber gibt es Elektronen ab.', 'Oxidationszahlen sind Buchführung für Elektronen. Mach die Rechnung immer vollständig.'],
    wasser: ['Wasser ist ein Dipol: Das macht es zum Lösungsmittel für so viele Stoffe.', 'Wasserstoffbrücken sind der Grund, warum Wasser erst bei 100 °C kocht. Ohne sie wäre es bei Raumtemperatur ein Gas!', 'Eis ist leichter als flüssiges Wasser. Gut für die Fische im Winter!'],
    farbe: ['Ein Stoff sieht grün aus, wenn er das rote Licht schluckt. Seine Farbe ist die Ergänzung zur absorbierten.', 'Im Prisma spaltet sich weißes Licht in alle Spektralfarben auf. Der Regenbogen macht das mit Wassertröpfchen.', 'Bei der Chromatografie wandern die Stoffe unterschiedlich weit. Der Rf-Wert hilft beim Vergleichen.'],
    kunststoff: ['Zwischen den Ketten der Thermoplaste wirken nur zwischenmolekulare Kräfte, keine Atombindungen. Deshalb kann man sie erwärmen und neu formen.', 'Duromere sind engmaschig vernetzt: hart und hitzebeständig, aber spröde.', 'Elastomere sind weitmaschig vernetzt. Dehnst du sie, federn sie zurück wie ein Gummiband.', 'Thermoplaste lassen sich wieder einschmelzen. Das ist ein Grund, warum sie sich gut recyceln lassen.', 'Je enger das Netz aus Querverbindungen, desto härter und unbeweglicher das Material.'],
    salz: ['Salze bestehen aus Ionen. Die starke Anziehung zwischen ihnen sorgt für hohe Schmelzpunkte.', 'Flammenfarben verraten Metalle: Natrium leuchtet gelb, Kupfer grünlich.', 'In der Ionen-Parkscheibe gehen Plus und Minus immer zu null auf.']
  };
  var MAP = {
    'Brandbekämpfung': 'sicher', 'Brenner-entzuenden': 'sicher', 'Laborgeräte': 'sicher', 'Laborregeln-und-Gefahrenstoffe': 'sicher', 'simulation-pse': 'atom',
    'Nachweise-von-Gasen': 'gas', '4-Hochofen-Eisen-und-Stahl': 'redox', 'Molekuelbau-und-Dipol': 'wasser', 'Ionen-Parkscheibe': 'salz', 'Salze-identifizieren': 'salz',
    'pH-Wert-und-Neutralisation': 'saeure', 'Ueberblick-Alkene-Alkine-Cycloalkane': 'organik', 'Ueberblick-Alkohole': 'organik', 'Ueberblick-Alkanale-Alkanone-Alkansaeuren': 'organik', 'Ueberblick-Ester': 'organik',
    'Eigenschaften-des-Wassers': 'wasser', 'Loeslichkeit': 'wasser', 'Aminosaeuren': 'protein', 'Biuretprobe': 'protein', 'Peptidbindung-EPA': 'protein', 'Proteinstrukturen': 'protein',
    'Systeme-und-1-Hauptsatz': 'energie', 'Der-Kohlenstoffdioxid-Carbonat-Kreislauf': 'energie', 'Gleichgewicht': 'energie', 'Haber-Bosch-Verfahren': 'energie', 'Konduktometrie': 'saeure', 'Nukleophile-Substitution': 'organik',
    'Saeure-Base-Titration': 'saeure', 'Saeure-Basen-Konstanten': 'saeure', 'Säure-Base-Konzept-Brönsted': 'saeure', 'Chromatografie-Rf-Werte': 'farbe', 'Phenolphthalein-Farbumschlag': 'farbe', 'Aldehyd-Nachweis-Fehling-Tollens': 'redox', 'Gesamtgleichung-aus-Teilgleichungen': 'redox', 'Indikatoren-Grundlagen': 'saeure', 'Zusammenhang-von-Licht-und-Farbe': 'farbe',
    'Disproportionierung': 'redox', 'Redoxreihe-Metallgewinnung': 'redox', 'Sulfit-Titration': 'saeure', 'Doppelspaltexperiment': 'atom', 'Elektronenkonfiguration': 'atom', 'Orbitalmodell': 'atom', 'd-und-f-Orbitale': 'atom', 'Kupfer-Raffination': 'redox', 'Trinkwasser-Detektiv': 'wasser', 'Wasserhaerte-Titration': 'wasser', 'Farbe-und-Konstitution': 'farbe', 'Blue-Bottle-Farbwechsel': 'farbe', 'Wasser-erforschen': 'wasser', 'Kunststoffklassen': 'kunststoff'
  };


  function expertMode() { var b = document.getElementById('badge-mode'); return !!b && /Expertenmodus/.test(b.textContent); }
  // Rückmeldung auf „Prüfen“: Kolbi liest die Ergebnis-Felder der Anwendung (CSS-Selektoren) und sagt, ob es stimmt.
  // Erkannt wird ✓/✅/„Richtig“ bzw. ✗/❌/„Leider“ im Text oder Klassen wie correct/wrong/success/error. Neue Anwendung: Zeile ergänzen.
  // sel = Selektor(en) der Ergebnis-Felder; tips = eigene Tipps (werden bei jedem Fehlversuch der Reihe nach angeboten, ohne die Lösung zu verraten);
  // tipBtn = Selektor eines vorhandenen Tipp-Knopfes der Anwendung: dann verweist Kolbi darauf, statt eigene Tipps zu geben.
  var CHECKS = {
    'Wasserhaerte-Titration': [
      { sel: '#fb-read, #tr-fb', when: function () { return !(window.Kolbi && Kolbi.guideActive && Kolbi.guideActive()); }, tips: ['Lies am tiefsten Punkt des Meniskus ab, auf Augenhöhe. Große Striche sind ganze mL, kleine 0,1 mL.', 'Die Skala wächst nach unten. Zähle von der Zahl über dem Flüssigkeitsspiegel nach unten weiter.', 'Schätze die Hundertstel zwischen zwei kleinen Strichen.'] },
      { sel: '.kfb', when: function () { return !(window.Kolbi && Kolbi.guideActive && Kolbi.guideActive()); }, tips: ['Rechne der Reihe nach: n = c · V, dann c = n ÷ V(Probe), dann mal 5,6.', 'Achte auf die Einheiten: Die Probe muss in Litern eingesetzt werden, 100 mL sind 0,100 L.', 'EDTA und die Härtebildner reagieren im Verhältnis 1 : 1.'] },
    ],
    // Expertenmodus: Kolbi verrät nichts über die Probe, er reagiert nur auf „Prüfen“ (Meldungen im Textfeld der Anwendung)
    'Nachweise-von-Gasen': [
      { sel: '#instruction-text', when: expertMode, tips: function () {
        var o = window.KolbiObs || {}, t = [];
        if (o.splint === 'plopp') t.push('Du hast ein „Plopp“ gehört. Welches Gas gibt bei der Knallgasprobe diesen Knall? Probiere im Lernmodus die Gase noch einmal aus und komm dann mit der Erfahrung zurück (die Probe wird dabei neu gewählt).');
        else if (o.splint === 'auf') t.push('Der Span ist aufgeflammt. Welches Gas fördert die Verbrennung und lässt einen Glimmspan hell aufleuchten? Du kannst im Lernmodus die Gase noch einmal ausprobieren.');
        else if (o.splint === 'aus') t.push('Der Span ist erloschen. Welche beiden Gase löschen ihn? Mit welcher Probe unterscheidest du sie? Im Lernmodus kannst du alles noch einmal testen.');
        else t.push('Hast du schon die Span-Probe gemacht? Ob es knallt, aufflammt oder erlischt, grenzt die Gase stark ein.');
        if (o.lime === 'trüb') t.push('Das Kalkwasser wurde trüb. Welches Gas weist man damit nach?');
        else if (o.lime === 'klar') t.push('Das Kalkwasser blieb klar. Welches Gas kannst du damit ausschließen?');
        else t.push('Hast du schon Kalkwasser in das Reagenzglas gegeben? Damit trennst du die Gase, die den Span löschen.');
        t.push('Eine Probe allein reicht nicht immer. Passen beide Beobachtungen zu demselben Gas?');
        return t;
      } }
    ],
    'Salze-identifizieren': [
      { sel: '#instruction-text', when: expertMode, tips: function () {
        var o = window.KolbiObs || {}, t = [], AG = { white: 'weißen', cream: 'cremefarbenen', yellow: 'gelben' };
        if (o.flame) t.push('Welches Kation färbt die Flamme nochmal ' + o.flame + '? Teste doch noch einmal ein bekanntes Salz und vergleiche die Flammenfarbe.');
        else t.push('Hast du schon die Flammenfarbe der Probe getestet? Sie verrät dir das Kation.');
        if (o.ag === 'arsenate') t.push('Der Niederschlag mit Silbernitrat wechselt nach und nach seine Farbe. Welches Anion macht das? Teste zum Vergleich ein bekanntes Salz.');
        else if (o.ag) t.push('Welches Anion gibt mit Silbernitrat einen ' + AG[o.ag] + ' Niederschlag? Teste zum Vergleich ein bekanntes Salz mit Silbernitrat.');
        else t.push('Hast du schon Silbernitrat zur gelösten Probe gegeben? Der Niederschlag verrät dir das Anion.');
        t.push('Setze Kation und Anion zum Salznamen zusammen und achte auf die genaue Schreibweise, zum Beispiel Natriumchlorid.');
        return t;
      } }
    ],
    'Saeure-Base-Titration': [
      { sel: '#fb-read', tips: ['Lies am tiefsten Punkt des Meniskus ab, in Augenhöhe. Die großen Striche sind volle mL, zwischen den kleinen schätzt du die Zehntel.', 'Die Skala läuft von oben (0) nach unten (50). Verbrauchtes Volumen = Wert am Ende minus Wert am Anfang.'] },
      { sel: '#fb-n', tips: ['Rechne in zwei Schritten: Volumen in Liter umrechnen, dann n = c · V. Mit mL und mol/L erhältst du die Stoffmenge direkt in mmol.', 'Die Reaktion läuft im Verhältnis 1 : 1. Am Äquivalenzpunkt ist n(NaOH) genauso groß wie n(HCl).', 'Wenn du nicht weiterkommst: Der Knopf „💡 Rechenweg“ zeigt dir die Rechenschritte.'] },
      { sel: '#fb-b', tips: ['Die Konzentration ist Stoffmenge geteilt durch Volumen: c = n / V. Welches Volumen hatte die Probe, nicht die Maßlösung?', 'Achte auf die Einheit: mmol geteilt durch mL ergibt mol/L.', 'Wenn du nicht weiterkommst: Der Knopf „💡 Rechenweg“ zeigt dir die Rechenschritte.'] },
      { sel: '#fb-p', tips: ['NaOH ist eine starke Base und zerfällt vollständig. Also gilt c(OH⁻) = c(NaOH).', 'Erst pOH = −lg c(OH⁻), dann pH = 14 − pOH. Auf dem Taschenrechner ist „log“ der Zehnerlogarithmus.', 'Eine Base hat einen pH-Wert über 7. Passt dein Ergebnis dazu?'] },
      { sel: '#fb-c', tips: ['Am Äquivalenzpunkt sind Säure und Base genau verbraucht. Welchen pH-Wert hat so eine Lösung? Schau auf die Farbskala.'] },
      { sel: '#fbl-n, #fbl-nc, #fbl-c, #fbl-r', tips: ['Schritt 1: n(NaOH) = c · V mit dem abgelesenen Volumen. Schritt 2: Welches Stoffmengenverhältnis sagt die Reaktionsgleichung zwischen NaOH und Citronensäure?', 'Citronensäure kann mehrere Protonen abgeben. Wie viele NaOH braucht ein Säure-Teilchen? Daraus folgt n(Citronensäure), danach c = n / V.', 'Wenn du nicht weiterkommst: Der Knopf „💡 Rechenweg“ zeigt dir die Rechenschritte.'] },
      { sel: '#fbl-col, #fbl-why', tips: ['Überlege, ob am Äquivalenzpunkt Säure oder Base im Überschuss ist, oder keins von beiden. Davon hängt der pH-Wert und damit die Farbe ab.'] }
    ],
    'Sulfit-Titration': [
      { sel: '#fb-read', tips: ['Lies am tiefsten Punkt des Meniskus ab. Die Skala läuft von oben (0) nach unten (50).'] },
      { sel: '#fb-n', tips: ['Rechne mit n = c · V. Mit c in mol/L und V in mL kommt die Stoffmenge in mmol heraus.', 'Iod und Sulfit reagieren im Verhältnis 1 : 1. Die Stoffmenge an SO₂ ist so groß wie die an verbrauchtem I₂.', 'Wenn du nicht weiterkommst: Der Knopf „💡 Rechenweg“ zeigt dir die Rechenschritte.'] },
      { sel: '#fb-b', tips: ['Die Massenkonzentration ist β = m / V. Die Masse bekommst du aus m = n · M mit der molaren Masse von SO₂.', 'Das Volumen ist das der Weinprobe, in Litern. Rechne mL erst in L um, sonst stimmt die Größenordnung nicht.', 'Wenn du nicht weiterkommst: Der Knopf „💡 Rechenweg“ zeigt dir die Rechenschritte.'] }
    ],
    'Konduktometrie': [
      { sel: '#feedback', tips: ['Den Äquivalenzpunkt liest du dort ab, wo die Leitfähigkeitskurve ihren Knick hat, am Schnittpunkt der beiden Geraden.', 'Rechne in zwei Schritten: erst n(Oxalsäure) = c · V(Äquivalenz), mit V in L. Bei einem 1 : 1-Verhältnis ist n(Ca²⁺) genauso groß.', 'Dann c(Ca²⁺) = n(Ca²⁺) / V(Ca²⁺-Probe). Beide Volumina müssen in der gleichen Einheit stehen.', 'Wenn du nicht weiterkommst: Der Knopf „Hilfe“ nennt dir den Äquivalenzpunkt.'] }
    ],
    'Indikatoren-Grundlagen': [
      { sel: '.mc-feedback', tips: ['Bei diesen Aufgaben können mehrere Aussagen stimmen. Prüfe jede Aussage einzeln und achte auf Wörter wie „immer“ und „nur“.', 'Ein Indikator wechselt die Farbe nicht bei jedem pH-Wert, sondern in einem bestimmten Umschlagsbereich. Denk bei jeder Aussage daran.', 'Die roten Rückmeldungen zeigen dir, bei welcher Aufgabe noch etwas nicht stimmt. Gehe diese noch einmal in Ruhe durch.'] },
      { sel: '#a1-feedback', tips: ['Beobachte im Becherglas, bei welchen pH-Bereichen sich die Farbe ändert. Zwei Indikatoren zusammen zeigen mehr Farbstufen als einer.', 'Schiebe den Regler langsam von pH 1 bis 14 und notiere dir, wo die Farbübergänge liegen. Dann vergleichst du mit den Beschreibungen.'] },
      { sel: '#a2-feedback', tips: ['Überlege, wo der Äquivalenzpunkt liegt und in welchem pH-Bereich die Kurve dort steil abfällt. Der Umschlagsbereich des Indikators muss in diesen steilen Bereich passen.', 'Wähle zuerst den Indikator und prüfe dann, ob deine Begründung wirklich zur Reaktion am Äquivalenzpunkt passt.'] }
    ],
    'Säure-Base-Konzept-Brönsted': [
      { sel: '#quiz-feedback', tips: ['Das Proton (H⁺) wandert von einem Teilchen zum anderen. Wer gibt es ab, und wer nimmt es auf?', 'Donator ist die Säure, Akzeptor ist die Base. Schau in der Simulation, in welche Richtung das gelbe Proton wandert.'] }
    ],
    'Brenner-entzuenden': [
      { sel: '#bubbleText', tips: ['Lies die Anweisung in der Sprechblase noch einmal in Ruhe. Beim Brenner kommt es auf die Reihenfolge an.', 'Überlege dir, warum die Reihenfolge so wichtig ist: Was darf nicht passieren, solange Gas ausströmt?', 'Fang den Schritt noch einmal an und achte darauf, was der Brenner dir als Nächstes sagt.'] }
    ],
    'Laborregeln-und-Gefahrenstoffe': [
      { sel: '#feedback-text', tips: ['Lies noch einmal den Namen und die Eigenschaften der Chemikalie. Welche Gefahr steckt dahinter?', 'Manche Stoffe brauchen mehr als ein Piktogramm. Prüfe, ob eines zu viel oder zu wenig im Kasten liegt.', 'Falsche Piktogramme kannst du im Kasten anklicken, dann verschwinden sie wieder.'] }
    ]
  };

  // Standard für Anwendungen mit Rückmeldefeldern (.fb, .feedback, *-fb, *feedback*): themenbezogene Tipps. Für gezielte Tipps pro Aufgabe oben in CHECKS eintragen.
  var AUTO_SEL = '.fb, .res, .feedback, [id$="-fb"], [id^="fb-"], [id$="fb"], [id*="feedback"], [id$="Fb"]';
  var AUTO = ['Trinkwasser-Detektiv', 'Wasser-erforschen', 'Farbe-und-Konstitution', 'Blue-Bottle-Farbwechsel', 'Phenolphthalein-Farbumschlag', 'Aldehyd-Nachweis-Fehling-Tollens', 'Gesamtgleichung-aus-Teilgleichungen', 'Elektronenkonfiguration', 'Zusammenhang-von-Licht-und-Farbe', 'Molekuelbau-und-Dipol', 'Ueberblick-Alkene-Alkine-Cycloalkane', 'Ueberblick-Alkohole', 'Ueberblick-Alkanale-Alkanone-Alkansaeuren', 'Ueberblick-Ester', 'Brandbekämpfung', 'Laborgeräte', 'simulation-pse', '4-Hochofen-Eisen-und-Stahl', 'Eigenschaften-des-Wassers', 'Loeslichkeit', 'Aminosaeuren', 'Peptidbindung-EPA', 'Proteinstrukturen', 'Systeme-und-1-Hauptsatz', 'Gleichgewicht', 'Saeure-Basen-Konstanten', 'Chromatografie-Rf-Werte', 'Disproportionierung', 'Redoxreihe-Metallgewinnung', 'Doppelspaltexperiment', 'Orbitalmodell', 'd-und-f-Orbitale', 'Kupfer-Raffination'];
  var TIPS = {
    sicher: ['Lies die Aufgabe noch einmal in Ruhe und denk an die Grundregeln im Labor: erst überlegen, dann handeln.', 'Gehe die Antwortmöglichkeiten der Reihe nach durch und streiche gedanklich aus, was sicher nicht passt.'],
    saeure: ['Lies die Aufgabe noch einmal genau und achte auf Einheiten, Vorzeichen und Größenordnungen.', 'Überlege dir zuerst, wer das Proton abgibt und wer es aufnimmt. Danach setzt du die Werte ein.', 'Schreibe die Reaktionsgleichung auf, bevor du rechnest. Sie zeigt dir die Stoffmengenverhältnisse.'],
    organik: ['Suche zuerst die funktionelle Gruppe. Sie bestimmt Namen und Eigenschaften.', 'Zähle die Kohlenstoffatome der Hauptkette noch einmal ab und achte auf Doppelbindungen.'],
    protein: ['Überlege, welche Gruppe des Moleküls sauer und welche basisch ist. Das hängt vom pH-Wert ab.', 'Gehe vom Aufbau aus: Wie hängen Struktur und Eigenschaft zusammen?', 'Schau dir das 3D-Modell noch einmal an und dreh es, bis du die gefragte Stelle findest.'],
    atom: ['Gehe Schritt für Schritt vor: erst die Schale oder das Orbital, dann die Elektronen.', 'Beachte die Regeln zur Besetzung: niedrigste Energie zuerst, höchstens zwei Elektronen pro Orbital.', 'Schau dir die Darstellung noch einmal genau an, die Antwort steckt oft in der Abbildung.'],
    energie: ['Überlege, in welche Richtung das System ausweicht, wenn du etwas veränderst.', 'Achte auf das Vorzeichen: Wird Energie aufgenommen oder abgegeben?', 'Vergleiche den Zustand vorher und nachher, die Änderung steckt in der Differenz.'],
    redox: ['Bestimme zuerst die Oxidationszahlen. Wer gibt Elektronen ab, wer nimmt sie auf?', 'Je unedler ein Metall, desto lieber gibt es Elektronen ab. Schau noch einmal in die Redoxreihe.', 'Prüfe, ob die Zahl der abgegebenen und aufgenommenen Elektronen gleich ist.'],
    wasser: ['Überlege, ob die beteiligten Teilchen polar oder unpolar sind. Gleiches löst sich in Gleichem.', 'Denk an den Bau des Moleküls: Winkel, Ladungsverteilung und Wasserstoffbrücken.'],
    farbe: ['Vergleiche die Messwerte noch einmal genau, gerade bei Farben und Wegstrecken sind kleine Unterschiede wichtig.', 'Überlege, welcher Stoff am weitesten wandert und warum.'],
    salz: ['Denk daran: Salze bestehen aus Kationen und Anionen, die sich zu einer neutralen Verbindung ergänzen.'],
    gas: ['Überlege, welcher Nachweis zu welchem Gas gehört, und gehe die Schritte in der richtigen Reihenfolge durch.']
  };
  var GENERIC_TIPS = ['Lies die Aufgabe und die Rückmeldung noch einmal in Ruhe. Oft steckt der Hinweis schon dort.', 'Gehe die Aufgabe Schritt für Schritt durch und prüfe, wo dein Gedankengang abweicht.'];
  var OKS = ['Richtig! Das hast du stark gelöst. 🎉', 'Genau so ist es! Mein Flüssigkeitsspiegel hüpft vor Freude.', 'Volltreffer! Weiter so.', 'Das stimmt! Du hast den Dreh raus.'];
  var BADS = ['Noch nicht ganz, aber das kriegst du hin. Lies die Rückmeldung in Ruhe durch und versuche es noch einmal.', 'Das war noch nicht richtig. Fehler gehören zum Lernen dazu, probier es gleich nochmal!', 'Hm, so noch nicht. Kopf hoch, der nächste Versuch klappt bestimmt!', 'Fast! Schau dir die Rückmeldung an und denk noch einmal in Ruhe nach. Du bist auf dem richtigen Weg.'];
  var EXPERT_APPS = { 'Nachweise-von-Gasen': 1, 'Salze-identifizieren': 1 };
  var NEUTRAL = ['Im Expertenmodus verrate ich nichts. Du schaffst das mit sauberem Beobachten.', 'Gute Detektive notieren jede Beobachtung. Das spart später Zeit.', 'Ruhig bleiben und der Reihe nach testen, dann klärt sich das Rätsel.', 'Ich halte mich zurück, die Lösung musst du selbst finden. 🧪'];
  function pickR(a) { return a[Math.floor(Math.random() * a.length)]; }
  function verdict(n) {
    if (!n.offsetParent && getComputedStyle(n).position !== 'fixed') return 0;           // unsichtbar
    var t = (n.textContent || '').trim(), c = n.className && n.className.baseVal === undefined ? String(n.className) : '';
    if (!t) return 0;
    if (/^(✗|✘|✕|❌|❎|✖|Leider|Falsch|Nicht ganz|Das stimmt (noch )?nicht)/i.test(t) || /\b(wrong|incorrect|error|danger|fail|no)\b/i.test(c)) return -1;
    if (/^(✓|✔|✅|🎉|Richtig|Vollkommen richtig|Glückwunsch|Genau)/i.test(t) || /\b(correct|success)\b/i.test(c)) return 1;   // „fb ok“ allein zählt nicht: kann auch eine reine Beobachtung sein
    return 0;
  }
  function watchChecks(entries) {
    var timer = null, touched = new Set(), fails = {};
    function entryOf(n) { for (var k = 0; k < entries.length; k++) if (n.matches && n.matches(entries[k].sel)) return k; return -1; }
    function flush() {
      timer = null; var ok = 0, bad = 0, badEntry = -1, okEntries = [];
      touched.forEach(function (n) { var k = entryOf(n); if (k >= 0 && entries[k].when && !entries[k].when()) return; var v = verdict(n); if (v > 0) { ok++; if (k >= 0) okEntries.push(k); } else if (v < 0) { bad++; if (badEntry < 0) badEntry = k; } });
      touched.clear();
      if (!ok && !bad) return;
      okEntries.forEach(function (k) { if (!bad) fails[k] = 0; });
      var nt = window.KolbiNote; window.KolbiNote = null;   // Module können eine inhaltliche Notiz zur richtigen Antwort mitgeben
      if (!bad) return void Kolbi.tell(ok > 1 ? 'Alle ' + ok + ' Aufgaben stimmen. Starke Arbeit! 🎉' : (nt ? pickR(['Richtig!', 'Genau!', 'Stark!', 'Volltreffer!']) + ' ' + nt : pickR(OKS)), 'excited');
      var head = ok ? ok + ' von ' + (ok + bad) + ' stimmen schon. Du bist nah dran! Schau dir die roten Rückmeldungen an.' : pickR(BADS);
      var e = badEntry >= 0 ? entries[badEntry] : null, n = e ? (fails[badEntry] = (fails[badEntry] || 0) + 1) : 0;
      if (e && e.tipBtn && document.querySelector(e.tipBtn)) return void Kolbi.tell(head + ' Der Tipp-Knopf bei der Aufgabe hilft dir weiter.', ok ? 'interested' : 'oops');
      var tl = e && (typeof e.tips === 'function' ? e.tips() : e.tips);
      if (tl && tl.length) return void Kolbi.tellTip(head, tl[(n - 1) % tl.length], ok ? 'interested' : 'oops');
      Kolbi.tell(head, ok ? 'interested' : 'oops');
    }
    var mo = new MutationObserver(function (list) {
      list.forEach(function (m) {
        var t = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        entries.forEach(function (en) {
          var h = t && t.closest && t.closest(en.sel); if (h) touched.add(h);
          if (m.addedNodes) m.addedNodes.forEach(function (an) {                       // neu eingefügte Rückmeldungen (innerHTML)
            if (an.nodeType !== 1) return;
            if (an.matches(en.sel)) touched.add(an); else an.querySelectorAll(en.sel).forEach(function (x) { touched.add(x); });
          });
        });
      });
      if (touched.size && !timer) timer = setTimeout(flush, 300);
    });
    mo.observe(document.body, { childList: true, characterData: true, subtree: true });   // nur Textänderungen, keine Animations-Attribute
  }

  // Anwendungsspezifische Begleitung (Tipps, Reaktionen auf Bedienung). Jede Funktion bekommt ctx.pick und kann Kolbi.init erneut aufrufen (ergänzt nur die Einstellungen).
  var HOOKS = {
    'Wasser-erforschen': function () {
      var tab = function () { var t = document.querySelector('.tab.on'); return t ? t.getAttribute('data-t') : 'h'; };
      var base = { text: app[0], tip: app[1] || TIP }, said = {};
      var TX = {
        h: ['Die Elektronegativität sagt, wie stark ein Atom an gemeinsamen Elektronen zieht. Sauerstoff zieht stärker als Wasserstoff.', 'Gleiche Teilladungen stoßen sich ab, ungleiche ziehen sich an. Probiere im Experiment verschiedene Lagen aus.', 'Die Regel: H an O, N oder F, und im anderen Molekül ein freies Elektronenpaar.'],
        d: ['Wasser ist bei 4 °C am dichtesten. Denke immer daran, wohin dichteres Wasser sich bewegt.', 'Im Eis halten Wasserstoffbrücken die Moleküle auf Abstand, es entstehen Hohlräume.'],
        l: ['Strom braucht frei bewegliche geladene Teilchen. Salz besteht aus solchen Teilchen.', 'Zucker löst sich als neutrale Moleküle, Salz in geladenen Teilchen. Das erklärt den Unterschied.'],
        o: ['Denke an die Teilchen an der Oberfläche: Welche Nachbarn fehlen ihnen?', 'Die Oberfläche verhält sich wie eine Haut. Spülmittel macht sie schwächer.']
      };
      function nextTip(t) { var a = TX[t] || []; return a.length ? a[Math.floor(Math.random() * a.length)] : base.tip; }
      Kolbi.init({
        tapHelp: function () { var t = tab(); return { text: TX[t] ? TX[t][0] : base.text, tip: nextTip(t) }; },
        idleHelp: function () { var t = tab(); return { text: ['Kommst du gut voran?', 'Hängst du irgendwo fest? Ich helfe gern.'][Math.floor(Math.random() * 2)], tip: nextTip(t) }; }
      });
      document.addEventListener('tabchange', function (e) {
        var t = e.detail; if (said[t]) return; said[t] = 1;
        var M = { d: 'Der See im Sommer und im Winter. Miss zuerst, wann Wasser am dichtesten ist.', l: 'Mal sehen, warum ein Föhn in der Badewanne so gefährlich ist, obwohl reines Wasser nicht leitet.', o: 'Hier erwartet dich eine Szene am Teich. Ich bin schon gespannt, wer dort wohnt.' };
        if (M[t]) setTimeout(function () { Kolbi.tell(M[t], 'interested'); }, 600);
      });
      document.addEventListener('unlocked', function (e) { if (e.detail === 'done') setTimeout(function () { Kolbi.tell('Modul 1 ist geschafft! Jetzt sind die anderen Module frei. Such dir aus, womit du anfangen willst.', 'excited'); }, 800); });
    },
    'Farbe-und-Konstitution': function () {
      var $ = function (id) { return document.getElementById(id); };
      var tab = function () { var t = document.querySelector('.tab.on'); return t ? t.getAttribute('data-t') : 'm1'; };
      var welcomed = false;
      function nextTip() {                                              // Tipp für Modul 2 (I- und M-Effekte), je nach Stand im Effekt-Detektiv
        var fin = document.querySelectorAll('#mesel button.fin').length;
        var iDone = !!document.querySelector('#mei button.on'), mDone = !!document.querySelector('#mem button.on');
        if (!iDone) return 'Frage 1: Schau auf die Atome der Gruppe. Sind sie elektronegativer als Kohlenstoff (EN 2,5)? Dann ziehen sie die Elektronen der Bindung zu sich: −I.';
        if (!mDone) return 'Frage 2: Schau nur auf das erste Atom der Gruppe. Hat es ein freies Elektronenpaar (+M) oder eine Mehrfachbindung zu einem elektronegativeren Atom (−M)?';
        if (fin < 8) return 'Wähle die nächste Gruppe. Vergleiche, woran du den M-Effekt jeweils erkennst: freies Paar oder Mehrfachbindung.';
        return 'Du hast alle Gruppen bestimmt. Löse noch die Aufgaben unten, dann geht es zu Modul 3.';
      }
      var base = { text: app[0], tip: app[1] || TIP };
      Kolbi.init({
        tapHelp: function () { return tab() === 'me' ? { text: 'Der I-Effekt wirkt über die σ-Bindung, der M-Effekt nur über das π-System. Frage dich immer: Was hängt direkt an der Kette?', tip: nextTip() } : base; },
        idleHelp: function () { return tab() === 'me' ? { text: ['Kommst du mit dem Detektiv zurecht?', 'Hängst du bei einer Gruppe fest? Ich helfe gern.'][Math.floor(Math.random() * 2)], tip: nextTip() } : { text: 'Alles klar bei dir? Ich helfe gern.', tip: base.tip }; }
      });
      document.addEventListener('tabchange', function (e) {
        if (e.detail === 'me' && !welcomed) { welcomed = true; setTimeout(function () { Kolbi.tell('Hier lernst du, I- und M-Effekte direkt an der Formel abzulesen. Zwei Fragen genügen: Was zieht an der σ-Bindung, und was passiert mit dem π-System?', 'interested'); }, 500); }
      });
      var fin = $('mefin');
      if (fin) new MutationObserver(function () {
        if (fin.hidden) return;
        var n = document.querySelectorAll('#mesel button.fin').length;
        if (n === 8) Kolbi.tell('Alle acht Gruppen sind bestimmt. Du erkennst jetzt, woran man Donatoren und Akzeptoren unterscheidet. Das brauchst du gleich in Modul 3!', 'excited');
      }).observe(fin, { attributes: true, attributeFilter: ['hidden'] });
    },
    'Kunststoffklassen': function () {
      var H = window.KSHelp; if (!H) return;
      Kolbi.init({ tapHelp: function () { return H.tap(); }, idleHelp: function () { return H.idle(); } });
    }
  };

  var parts = decodeURIComponent(location.pathname).split('/').filter(Boolean);
  var key = parts[parts.length - 1] || '';
  if (key === 'index.html') key = parts[parts.length - 2]; else if (/\.html?$/i.test(key)) key = key.replace(/\.html?$/i, '');
  var app = APPS[key];
  if (!app) return;

  function run() {
    var big = false; try { var c = document.querySelector('canvas'); big = !!c && c.clientWidth > innerWidth * 0.6 && c.clientHeight > innerHeight * 0.5; } catch (e) {}
    var help = { text: app[0], tip: app[1] || TIP };
    var ASKS = ['Kommst du gut voran?', 'Läuft alles rund oder hakt es irgendwo?', 'Alles klar bei dir? Ich helfe gern.', 'Hängst du irgendwo fest?'];
    var cm = (G[MAP[key]] || []).slice();
    var who = isHugo && window.KolbiSkins && window.KolbiSkins.hugo ? { skin: window.KolbiSkins.hugo, color: '#e0334f' } : { color: '#38bdf8' };
    Kolbi.init({
      id: 'app-' + key, intro: false, skin: who.skin, color: who.color, offsetBottom: big ? 130 : 64, tapHelp: function () { return help; },
      idleHelp: function () { return { text: ASKS[Math.floor(Math.random() * ASKS.length)], tip: help.tip }; },
      comments: cm,
      noFacts: EXPERT_APPS[key] ? expertMode : null
    });
    if (EXPERT_APPS[key]) setInterval(function () {                                    // im Expertenmodus nur neutrale Sprüche, damit nichts verraten wird
      var want = expertMode() ? NEUTRAL : (G[MAP[key]] || []);
      if (cm.length !== want.length || cm[0] !== want[0]) { cm.length = 0; want.forEach(function (x) { cm.push(x); }); }
    }, 800);
    if (HOOKS[key]) { try { HOOKS[key](); } catch (e) {} }
    var chk = CHECKS[key] || (AUTO.indexOf(key) >= 0 ? [{ sel: AUTO_SEL, tips: TIPS[MAP[key]] || GENERIC_TIPS }] : null);
    if (chk) watchChecks(chk);
    // Wer fleißig klickt, bekommt ab und zu ein Lob
    var clicks = 0, PRAISE = ['Du bist ja richtig fleißig am Ausprobieren! Weiter so.', 'Man merkt, dass du hier mit Neugier arbeitest. Das gefällt mir.', 'Wow, du legst dich ins Zeug. Ich schwappe vor Begeisterung!', 'So lernt man: ausprobieren, beobachten, nachdenken.'];
    document.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('#kolbi-root')) return;
      if (++clicks % 40 === 0) Kolbi.react('excited', PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    }, { passive: true, capture: true });
    var sk = 'kolbi-app-' + key, seen = false;
    try { seen = !!sessionStorage.getItem(sk); } catch (e) {}
    if (seen) return;
    var tries = 0;
    setTimeout(function go() {
      if (Kolbi.say(app[0], 'interested')) { try { sessionStorage.setItem(sk, '1'); } catch (e) {} }
      else if (++tries < 5) setTimeout(go, 6000);
    }, 2200);
  }
  function load(src, cb) { var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  function start() {
    var go = function () { if (isHugo && !(window.KolbiSkins && window.KolbiSkins.hugo)) load(base + 'skin-hugo.js?v=20261121', run); else run(); };
    if (window.Kolbi) return go();
    load(base + 'kolbi.js?v=20261119', go);
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
