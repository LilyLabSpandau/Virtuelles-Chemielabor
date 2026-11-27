/* Station 1: Das Rezept */
(function () {
  'use strict';
  Prog.add('m1', 3);
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });
  order($('m1a'), {
    q: '<b>Aufgabe 1.</b> Tippe die Arbeitsschritte in der richtigen Reihenfolge an.',
    steps: ['Teilgleichungen für Oxidation und Reduktion getrennt aufstellen', 'Elektronenzahlen durch passende Faktoren angleichen', 'Beide Teilgleichungen addieren', 'Elektronen und gleiche Teilchen beider Seiten kürzen', 'Probe: Atom- und Ladungsbilanz prüfen'],
    mod: 'm1', why: 'So entsteht die Gesamtgleichung. Zur Kontrolle siehst du unten ein durchgerechnetes Beispiel.',
    after: function () { var b = $('m1rez'); b.hidden = false; show(0); }
  });
  var STEPS = [
    ['1 · Teilgleichungen', [['Oxidation', 'Zn → Zn^2+ + 2 e^-'], ['Reduktion', 'Ag^+ + e^- → Ag']], 'Zink gibt zwei Elektronen ab, ein Silber-Ion nimmt nur eines auf.'],
    ['2 · Angleichen', [['Oxidation (× 1)', 'Zn → Zn^2+ + 2 e^-'], ['Reduktion (× 2)', '2 Ag^+ + 2 e^- → 2 Ag']], 'Das kgV von 2 und 1 ist 2: Die Reduktion wird mit 2 multipliziert.'],
    ['3 · Addieren', [['Summe', 'Zn + 2 Ag^+ + 2 e^- → Zn^2+ + 2 e^- + 2 Ag']], 'Links steht alles, was reagiert, rechts alles, was entsteht.'],
    ['4 · Kürzen', [['Gesamtgleichung', 'Zn + 2 Ag^+ → Zn^2+ + 2 Ag']], 'Die Elektronen stehen links und rechts und fallen heraus.'],
    ['5 · Probe', [['Atome', 'Zn: 1 = 1 · Ag: 2 = 2'], ['Ladung', 'links 2 × ( +1 ) = +2 , rechts +2 ✔']], 'Beide Bilanzen stimmen.']
  ];
  function eqLine(t) { return E(t).replace(/(\d+ )?e<sup>−<\/sup>/g, function (m) { return '<span class="e">' + m + '</span>'; }); }
  var cur = 0;
  function show(i) {
    cur = i; var h = '<div class="rez"><h4>Beispiel: Zink in Silbernitrat-Lösung</h4>';
    for (var k = 0; k <= i; k++) {
      h += '<h4>' + STEPS[k][0] + '</h4>';
      STEPS[k][1].forEach(function (l) { h += '<div class="ln"><i>' + l[0] + '</i>' + eqLine(l[1]) + '</div>'; });
      if (k === i) h += '<div class="tip">' + STEPS[k][2] + '</div>';
    }
    h += '<div class="row" style="margin-top:8px">' + (i > 0 ? '<button class="btn sec" id="rzb">← Zurück</button>' : '') + (i < STEPS.length - 1 ? '<button class="btn" id="rzn">Weiter →</button>' : '') + '</div></div>';
    $('m1rez').innerHTML = h;
    var n = $('rzn'), b = $('rzb'); if (n) n.onclick = function () { show(cur + 1); }; if (b) b.onclick = function () { show(cur - 1); };
  }
  gap($('m1b'), {
    parts: ['<p class="qt"><b>Aufgabe 2.</b> Zink reagiert mit Silber-Ionen.</p><div class="gaptext">Zink gibt Elektronen ab und wird ', { o: ['oxidiert', 'reduziert'], ok: 0 }, '. Die Oxidationszahl von Zink ändert sich von ', { o: ['0 auf +2', '+2 auf 0', '0 auf +1'], ok: 0 }, '. Zink ist das ', { o: ['Reduktionsmittel', 'Oxidationsmittel'], ok: 0 }, ', die Silber-Ionen sind das ', { o: ['Oxidationsmittel', 'Reduktionsmittel'], ok: 0 }, '. Ein Silber-Ion nimmt ', { o: ['1', '2'], ok: 0 }, ' Elektron auf, deshalb braucht man pro Zink-Atom ', { o: ['2', '1', '3'], ok: 0 }, ' Silber-Ionen.</div>'],
    mod: 'm1', why: 'Zn gibt 2 e⁻ ab (0 → +2), jedes Ag⁺ nimmt 1 e⁻ auf (+1 → 0), also reagieren 2 Ag⁺ mit 1 Zn.'
  });
  mc($('m1c'), {
    q: '<b>Aufgabe 3.</b> Warum müssen beide Teilgleichungen gleich viele Elektronen enthalten, bevor man sie addiert?',
    opts: ['Alle abgegebenen Elektronen müssen aufgenommen werden, sonst blieben welche übrig', 'Nur dann stehen auf beiden Seiten der Gleichung gleich viele Atome der Metalle', 'Elektronen sind Reaktionsprodukte und müssen deshalb in der Gesamtgleichung stehen bleiben', 'Dann haben beide Stoffe nach der Reaktion dieselbe Oxidationszahl und sind neutral'], ok: 0, mod: 'm1',
    why: 'Freie Elektronen gibt es in der Lösung nicht: Was das Reduktionsmittel abgibt, nimmt das Oxidationsmittel auf.',
    hints: { 1: 'Die Elektronenzahl sagt nichts über die Zahl der Metallatome.', 2: 'Elektronen kommen in der fertigen Gesamtgleichung nicht mehr vor.', 3: 'Die Oxidationszahlen ändern sich in verschiedene Richtungen.' }
  });
})();
