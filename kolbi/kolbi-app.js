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
    'Kupfer-Raffination': ['Hier lernst du die Elektrolyse in der Technik kennen: Aus Rohkupfer wird hochreines Kupfer, und die Edelmetalle fallen nebenbei an.']
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
    salz: ['Salze bestehen aus Ionen. Die starke Anziehung zwischen ihnen sorgt für hohe Schmelzpunkte.', 'Flammenfarben verraten Metalle: Natrium leuchtet gelb, Kupfer grünlich.', 'In der Ionen-Parkscheibe gehen Plus und Minus immer zu null auf.']
  };
  var MAP = {
    'Brandbekämpfung': 'sicher', 'Brenner-entzuenden': 'sicher', 'Laborgeräte': 'sicher', 'Laborregeln-und-Gefahrenstoffe': 'sicher', 'simulation-pse': 'atom',
    'Nachweise-von-Gasen': 'gas', '4-Hochofen-Eisen-und-Stahl': 'redox', 'Molekuelbau-und-Dipol': 'wasser', 'Ionen-Parkscheibe': 'salz', 'Salze-identifizieren': 'salz',
    'pH-Wert-und-Neutralisation': 'saeure', 'Ueberblick-Alkene-Alkine-Cycloalkane': 'organik', 'Ueberblick-Alkohole': 'organik', 'Ueberblick-Alkanale-Alkanone-Alkansaeuren': 'organik', 'Ueberblick-Ester': 'organik',
    'Eigenschaften-des-Wassers': 'wasser', 'Loeslichkeit': 'wasser', 'Aminosaeuren': 'protein', 'Biuretprobe': 'protein', 'Peptidbindung-EPA': 'protein', 'Proteinstrukturen': 'protein',
    'Systeme-und-1-Hauptsatz': 'energie', 'Der-Kohlenstoffdioxid-Carbonat-Kreislauf': 'energie', 'Gleichgewicht': 'energie', 'Haber-Bosch-Verfahren': 'energie', 'Konduktometrie': 'saeure', 'Nukleophile-Substitution': 'organik',
    'Saeure-Base-Titration': 'saeure', 'Saeure-Basen-Konstanten': 'saeure', 'Säure-Base-Konzept-Brönsted': 'saeure', 'Chromatografie-Rf-Werte': 'farbe', 'Indikatoren-Grundlagen': 'saeure', 'Zusammenhang-von-Licht-und-Farbe': 'farbe',
    'Disproportionierung': 'redox', 'Redoxreihe-Metallgewinnung': 'redox', 'Sulfit-Titration': 'saeure', 'Doppelspaltexperiment': 'atom', 'Elektronenkonfiguration': 'atom', 'Orbitalmodell': 'atom', 'd-und-f-Orbitale': 'atom', 'Kupfer-Raffination': 'redox'
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
    Kolbi.init({
      id: 'app-' + key, color: '#38bdf8', offsetBottom: big ? 130 : 64, tapHelp: function () { return help; },
      idleHelp: function () { return { text: ASKS[Math.floor(Math.random() * ASKS.length)], tip: help.tip }; },
      comments: G[MAP[key]] || []
    });
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
  function start() { if (window.Kolbi) return run(); var s = document.createElement('script'); s.src = base + 'kolbi.js'; s.onload = run; document.head.appendChild(s); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
