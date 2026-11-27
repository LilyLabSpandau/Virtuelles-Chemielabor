/* Station 4: Teilgleichungen selbst aufstellen (sauer, alkalisch) */
(function () {
  'use strict';
  Prog.add('m4', 7);
  Prog.onFinish('m4', function () { $('m4merke').hidden = false; });
  var box = $('m4g');
  function sec(t) { var h = document.createElement('h3'); h.innerHTML = t; box.appendChild(h); var d = document.createElement('div'); box.appendChild(d); return d; }
  gap(sec('Saure Lösung: Permanganat'), {
    parts: ['<p class="qt"><b>Aufgabe 1.</b> Permanganat-Ionen werden in saurer Lösung zu Mangan(II)-Ionen reduziert.</p><div class="gaptext">Oxidationszahl von Mangan in MnO₄⁻: ', { o: ['+7', '+6', '+4'], ok: 0 }, '. In Mn²⁺: ', { o: ['+2', '0', '+4'], ok: 0 }, '. Ein Mn-Atom nimmt dabei ', { o: ['5', '2', '7'], ok: 0 }, ' Elektronen auf.</div>'],
    mod: 'm4', why: 'Mn geht von +7 auf +2, das sind 5 aufgenommene Elektronen pro Atom.'
  });
  build(box.lastChild, { lead: '<b>Aufgabe 2.</b> Stelle die Teilgleichung auf: Elektronen links ergänzen, die Ladung mit H₃O⁺ ausgleichen, die Atome mit H₂O.', sp: [{ f: 'MnO4^-', side: 0, fix: 1 }, { f: 'H3O^+', side: 0 }, { f: 'e^-', side: 0 }, { f: 'Mn^2+', side: 1, fix: 1 }, { f: 'H2O', side: 1 }], sol: [1, 8, 5, 1, 12], mod: 'm4', why: 'MnO₄⁻ + 8 H₃O⁺ + 5 e⁻ → Mn²⁺ + 12 H₂O. Links −1 −5 + 8 = +2 passt zur Ladung rechts.' });
  var s2 = sec('Alkalische Lösung: Permanganat und Sulfit');
  mc(s2, {
    q: '<b>Aufgabe 3.</b> In alkalischer Lösung gibt es kaum H₃O⁺-Ionen. Wie gleichst du dort Ladung und Atome aus?',
    opts: ['Zuerst die Ladung mit OH⁻ ausgleichen, danach die Atome mit H₂O', 'Zuerst die Ladung mit H₃O⁺ ausgleichen, danach die Atome mit H₂O', 'Zuerst die Atome mit H₂O ausgleichen, danach die Ladung mit Elektronen', 'Die Ladung mit H₂O ausgleichen, die Atome mit OH⁻ und H₃O⁺'], ok: 0, mod: 'm4',
    why: 'In Basen steht OH⁻ zur Verfügung. Mit OH⁻ wird die Ladung ausgeglichen, mit H₂O werden die Atome ausgeglichen.',
    hints: { 1: 'H₃O⁺ ist in alkalischer Lösung praktisch nicht vorhanden.', 2: 'Elektronen werden schon vorher aus den Oxidationszahlen bestimmt.', 3: 'Wasser ist ungeladen und kann die Ladung nicht ausgleichen.' }
  });
  build(box.appendChild(document.createElement('div')), { lead: '<b>Aufgabe 4.</b> Reduktion in alkalischer Lösung: MnO₄⁻ wird zu Braunstein MnO₂ (Mn: +7 → +4). Stelle die Teilgleichung auf.', sp: [{ f: 'MnO4^-', side: 0, fix: 1 }, { f: 'H2O', side: 0 }, { f: 'e^-', side: 0 }, { f: 'MnO2', side: 1, fix: 1 }, { f: 'OH^-', side: 1 }], sol: [1, 2, 3, 1, 4], mod: 'm4', why: 'MnO₄⁻ + 2 H₂O + 3 e⁻ → MnO₂ + 4 OH⁻. Links −1 −3 = −4, rechts 4 × (−1) = −4.' });
  build(box.appendChild(document.createElement('div')), { lead: '<b>Aufgabe 5.</b> Oxidation in alkalischer Lösung: Sulfit SO₃²⁻ wird zu Sulfat SO₄²⁻ (S: +4 → +6). Links steht OH⁻, rechts entstehen H₂O und Elektronen.', sp: [{ f: 'SO3^2-', side: 0, fix: 1 }, { f: 'OH^-', side: 0 }, { f: 'SO4^2-', side: 1, fix: 1 }, { f: 'H2O', side: 1 }, { f: 'e^-', side: 1 }], sol: [1, 2, 1, 1, 2], mod: 'm4', why: 'SO₃²⁻ + 2 OH⁻ → SO₄²⁻ + H₂O + 2 e⁻. Links −2 −2 = −4, rechts −2 −2 = −4.' });
  build(box.appendChild(document.createElement('div')), { lead: '<b>Aufgabe 6.</b> Gesamtgleichung: Die Reduktion nimmt 3, die Oxidation gibt 2 Elektronen ab, das kgV ist 6. Addiere 3 × Oxidation und 2 × Reduktion, kürze die Elektronen und fasse H₂O und OH⁻ zusammen (Zwischenstand: 3 SO₃²⁻ + 6 OH⁻ + 2 MnO₄⁻ + 4 H₂O → 3 SO₄²⁻ + 3 H₂O + 2 MnO₂ + 8 OH⁻).', sp: [{ f: 'SO3^2-', side: 0 }, { f: 'MnO4^-', side: 0 }, { f: 'H2O', side: 0 }, { f: 'SO4^2-', side: 1 }, { f: 'MnO2', side: 1 }, { f: 'OH^-', side: 1 }], sol: [3, 2, 1, 3, 2, 2], mod: 'm4', why: '3 SO₃²⁻ + 2 MnO₄⁻ + H₂O → 3 SO₄²⁻ + 2 MnO₂ + 2 OH⁻. Von 4 H₂O links und 3 rechts bleibt 1 H₂O, von 8 OH⁻ rechts und 6 links bleiben 2 OH⁻.' });
  mc(box.appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 7.</b> Was passiert mit dem pH-Wert, wenn Sulfit-Lösung in alkalischer Lösung mit Permanganat oxidiert wird?',
    opts: ['Er steigt leicht, weil bei der Reaktion OH⁻-Ionen entstehen', 'Er sinkt leicht, weil bei der Reaktion H₃O⁺-Ionen entstehen', 'Er bleibt gleich, weil Wasser verbraucht und gebildet wird', 'Er sinkt stark, weil Sulfat eine starke Säure bildet'], ok: 0, mod: 'm4',
    why: 'In der Gesamtgleichung stehen 2 OH⁻ auf der Produktseite, es werden mehr Hydroxid-Ionen gebildet als verbraucht.',
    hints: { 1: 'In alkalischer Lösung entstehen keine H₃O⁺-Ionen, sondern OH⁻.', 2: 'Das Wasser ist nicht die einzige Spezies, die sich ändert. Schau auf die OH⁻-Ionen.', 3: 'Sulfat-Ionen sind kaum basisch oder sauer. Entscheidend ist die Bilanz der OH⁻-Ionen.' }
  });
})();
