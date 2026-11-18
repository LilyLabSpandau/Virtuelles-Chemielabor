/* Modul 5: Fazit und Transfer */
(function () {
  'use strict';
  BB.src.m5 = function () { var b = BB.bottle[BB.cur]; return BB.color(BB.cur, b.pop); };
  Prog.add('m5', 6);
  var box = $('m5q');
  mc(box, { mod: 'm5', q: '<b>a)</b> Du setzt den Versuch mit Methylenblau an, lässt aber die <b>Glucose</b> weg. Was beobachtest du?', opts: [
      'Die Lösung bleibt auch in Ruhe blau, denn es fehlt der Stoff, der Elektronen an den Farbstoff abgibt.', 'Die Lösung wird sofort farblos.', 'Die Lösung wird beim Schütteln farblos.', 'Die Lösung färbt sich rot.'], ok: 0,
    why: 'Ohne Glucose gibt es keinen Elektronenlieferanten. Der Farbstoff bleibt in seiner farbigen Form.', hints: { 1: 'Wer sollte dem Farbstoff die Elektronen liefern?', 2: 'Schütteln bringt Sauerstoff. Der nimmt Elektronen auf, er gibt keine ab.', 3: 'Rot gibt es nur beim Indigocarmin als Zwischenstufe.' } });
  mc(box, { mod: 'm5', q: '<b>b)</b> Du nimmst statt des verschlossenen einen <b>offenen</b> Kolben. Was erwartest du?', opts: [
      'Die Lösung entfärbt sich viel langsamer oder nur in der Tiefe, weil ständig Sauerstoff aus der Luft nachgeliefert wird.', 'Die Lösung entfärbt sich schneller, weil mehr Luft hineinkommt.', 'Nichts ändert sich, Luft spielt keine Rolle.', 'Die Glucose reagiert mit der Luft zu einem neuen Farbstoff.'], ok: 0,
    why: 'Sauerstoff färbt den Farbstoff wieder ein. Wird ständig neuer Sauerstoff nachgeliefert, kann sich der Farbstoff kaum dauerhaft entfärben.', hints: { 1: 'Sauerstoff bringt die Farbe zurück, er entfärbt nicht.', 2: 'In Modul 1 hat der Sauerstoff die Farbe zurückgebracht.', 3: 'Es entsteht kein neuer Farbstoff, die Menge bleibt gleich.' } });
  mc(box, { mod: 'm5', q: '<b>c)</b> Du ersetzt die Natronlauge durch neutrales Wasser. Was erwartest du?', opts: [
      'Die Entfärbung läuft nur sehr langsam oder gar nicht, weil Glucose nur in alkalischer Lösung ein guter Elektronengeber ist.', 'Nichts ändert sich.', 'Der Farbstoff reagiert jetzt mit Wasser zu einer roten Verbindung.', 'Die Lösung entfärbt sich schneller.'], ok: 0,
    why: 'In der Natronlauge liegt Glucose in ihrer reaktionsfreudigen, offenkettigen Form vor und gibt Elektronen leicht ab.', hints: { 1: 'Die Natronlauge steht in der Gleichung für die Elektronenabgabe der Glucose.', 2: 'Rot gibt es nur beim Indigocarmin als Zwischenstufe.', 3: 'Ohne Lauge fehlt der gute Elektronengeber.' } });
  mc(box, { mod: 'm5', q: '<b>d)</b> Du schüttelst die farblose Methylenblau-Lösung nur <b>eine Sekunde</b> lang. Was beobachtest du?', opts: [
      'Die Lösung wird nur kurz und schwach blau und entfärbt sich bald wieder, weil nur wenig Sauerstoff gelöst wurde.', 'Die Lösung wird dauerhaft tiefblau.', 'Die Lösung bleibt farblos.', 'Die Lösung wird rot.'], ok: 0,
    why: 'Kurzes Schütteln löst wenig Sauerstoff. Der ist schnell verbraucht, danach entfärbt sich die Lösung wieder.', hints: { 1: 'Probiere es in Modul 1 mit kurzem Schütteln aus und achte auf den O₂-Balken.', 2: 'Ein bisschen Sauerstoff kommt trotzdem hinein.', 3: 'Rot gibt es nur beim Indigocarmin.' } });
  mc(box, { mod: 'm5', q: '<b>e)</b> Du schüttelst die gelbe Indigocarmin-Lösung nur sehr kurz. Welche Farbe siehst du zuerst?', opts: [
      'Rot, die Zwischenstufe nach Abgabe des ersten Elektrons.', 'Sofort grün.', 'Sofort farblos.', 'Violett.'], ok: 0, fix: true,
    why: 'Der Rückweg verläuft in zwei Schritten mit je einem Elektron: gelb → rot → grün. Wer kurz schüttelt, bleibt in der Mitte stehen.', hints: { 1: 'Der Weg führt über die Zwischenstufe.', 2: 'Es ist ja Sauerstoff gekommen.', 3: 'Die Farben des Indigocarmins sind grün, rot und gelb.' } });
  gap($('m5gap'), { mod: 'm5', parts: ['Die Elektronen wandern von der ', { o: ['Glucose', 'Natronlauge', 'Luft'], ok: 0 }, ' über den ', { o: ['Farbstoff', 'Kolben', 'Stopfen'], ok: 0 }, ' zum ', { o: ['Sauerstoff', 'Wasser', 'Gluconat'], ok: 0 }, '. Der Farbstoff ist ein ', { o: ['Katalysator', 'Edukt', 'Produkt'], ok: 0 }, ', weil er die Reaktion ', { o: ['beschleunigt', 'verlangsamt', 'umkehrt'], ok: 0 }, ' und dabei ', { o: ['nicht verbraucht wird', 'vollständig verbraucht wird'], ok: 0 }, '. Nimmt er Elektronen auf, wird sein π-System ', { o: ['kleiner', 'größer'], ok: 0 }, ', der Abstand ΔE ', { o: ['größer', 'kleiner'], ok: 0 }, ', und die Absorption verschiebt sich ', { o: ['hypsochrom', 'bathochrom'], ok: 0 }, '. Beim Schütteln geschieht das Gegenteil: Das ist der ', { o: ['bathochrome', 'hypsochrome'], ok: 0 }, ' Effekt.'],
    why: 'Das ist die ganze Geschichte des Versuchs in einem Absatz.' });
  Prog.onFinish('m5', function () { });
  $('m5sample').addEventListener('click', function () {
    var b = $('m5box'); b.hidden = false;
    b.innerHTML = '<b class="t">Musterlösung:</b> Im ruhenden Kolben gibt die Glucose in der Natronlauge Elektronen an den Farbstoff ab. Der Farbstoff liegt dann in einer Form mit mehr Elektronen vor (Leuko-Form). Dabei wird sein π-System unterbrochen: Die Akzeptorseite verliert ihren Akzeptorcharakter, das große π-System zerfällt in kleinere. Der Abstand zwischen HOMO und LUMO wächst, das Absorptionsmaximum wandert zu kürzeren Wellenlängen (hypsochromer Effekt) und liegt beim Methylenblau im UV, sodass die Lösung farblos erscheint. Beim Schütteln löst sich Sauerstoff, der die Elektronen vom Farbstoff aufnimmt. Der Farbstoff ist wieder in der ursprünglichen Form, sein π-System ist wieder groß, und die Absorption wandert zu längeren Wellenlängen (bathochromer Effekt): Die Lösung ist wieder farbig. Der Farbstoff vermittelt also die Elektronen von der Glucose zum Sauerstoff, beschleunigt diese Reaktion und wird dabei nicht verbraucht: Er ist ein Katalysator. Verbraucht werden Glucose und Sauerstoff. Ist die Glucose aufgebraucht, bleibt die Lösung dauerhaft farbig.';
  });
})();
