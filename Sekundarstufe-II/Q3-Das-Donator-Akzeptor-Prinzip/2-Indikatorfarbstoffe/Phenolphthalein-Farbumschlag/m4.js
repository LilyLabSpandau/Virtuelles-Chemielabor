/* Modul 4: Absorptionsspektrum der Lösung (pH-abhängig), Übergänge zwischen den Formen, bathochromer und hypsochromer Effekt */
(function () {
  'use strict';
  var fmt = PP.fmt;
  PP.flask($('m4flask'));
  Prog.add('m4', 4);
  Prog.onFinish('m4', function () { $('m4merke').hidden = false; });

  // ------------------------------------------------------------ Teil A: Lösung bei aktuellem pH
  function argmax(A) { var best = 0, bl = 0; for (var l = 150; l <= 750; l += 1) { var a = A(l); if (a > best) { best = a; bl = l; } } return bl; }
  var sl = $('m4slider'), drag = false;
  sl.addEventListener('input', function () { drag = true; PP.setPH(+sl.value); });
  sl.addEventListener('change', function () { drag = false; });
  PP.on(function (f) {
    f = f || PP.frac(); var A = PP.A(f), pH = PP.pH(), lm = argmax(A);
    Farbe.plot($('m4plot'), lm, A, { amax: 3.2 });
    $('m4phv').textContent = fmt(pH, 1); if (!drag) sl.value = Math.max(0, Math.min(14, pH));
    var vis = f.p * 2.6, uv = lm < 400;
    $('m4lmax').textContent = '≈ ' + lm + ' nm' + (lm < 400 ? ' (UV)' : '');
    $('m4abs').textContent = vis < 0.08 ? 'kein sichtbares Licht' : (vis < 0.9 ? 'schwach ' : '') + Farbe.absorbedName(553);
    $('m4farbe').textContent = PP.word(f);
  });

  // ------------------------------------------------------------ Teil B: Übergänge
  var NATOMS = { c: 6, p: 15, x: 6 }, NLEV = { c: 3, p: 7, x: 3 };
  var TRANS = [{ from: 'c', to: 'p', t: 'Form ① → Form ②', sub: 'beim Erhöhen von pH 6 auf pH 11' }, { from: 'p', to: 'x', t: 'Form ② → Form ③', sub: 'beim Erhöhen von pH 11 auf pH 14' }], tc = 0, tb = $('m4trans');
  TRANS.forEach(function (t, i) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = t.t + '<small>' + t.sub + '</small>'; b.addEventListener('click', function () { tc = i; showTrans(); }); tb.appendChild(b); });
  function showTrans() {
    Array.prototype.forEach.call(tb.children, function (b, i) { b.classList.toggle('on', i === tc); });
    var t = TRANS[tc], a0 = PP.BANDS[t.from], a1 = PP.BANDS[t.to];
    Farbe.plot($('m4tplot'), a1.lmax, a1.A, { amax: 3.2, ref: a0.A });
    $('m4l0').textContent = '≈ ' + a0.lmax + ' nm'; $('m4l1').textContent = '≈ ' + a1.lmax + ' nm';
    var d0 = Farbe.levels($('m4lev0'), NLEV[t.from]), d1 = Farbe.levels($('m4lev1'), NLEV[t.to]);
    $('m4d0').textContent = fmt(d0, 2); $('m4d1').textContent = fmt(d1, 2);
    $('m4lc0').textContent = 'vorher: größtes π-System ' + (t.from === 'p' ? '≈ 15' : '6') + ' Atome'; $('m4lc1').textContent = 'nachher: größtes π-System ' + (t.to === 'p' ? '≈ 15' : '6') + ' Atome';
  }
  showTrans();

  // ------------------------------------------------------------ Aufgaben
  var box = $('m4qs');
  mc(box, {
    mod: 'm4', q: '<b>1.</b> Die Lösung bei pH 11 erscheint magenta. Welches Licht wird dort hauptsächlich absorbiert?',
    opts: ['grünes Licht', 'magentafarbenes Licht', 'rotes Licht', 'blaues Licht'], ok: 0,
    why: 'Absorbiert wird das Licht, das im Farbkreis gegenüber liegt: Bei etwa 553 nm wird grünes Licht verschluckt, der Rest (Rot und Blau gemischt) erscheint als Magenta.',
    hints: { 1: 'Das Licht, das man sieht, ist gerade das, das nicht absorbiert wird.', 2: 'Rotes Licht wird durchgelassen und trägt zur Farbe bei. Prüfe, wo im Spektrum das Maximum liegt.', 3: 'Blaues Licht wird durchgelassen und trägt zur Farbe bei. Prüfe, wo im Spektrum das Maximum liegt.' }
  });
  gap(box, {
    mod: 'm4', why: 'Das Maximum wandert vom UV (≈ 275 nm) ins Sichtbare (≈ 553 nm). Das ist ein bathochromer Effekt. Die Energielücke ΔE wird kleiner, weil das π-System wächst.',
    parts: ['<p class="qt"><b>2.</b> Wähle oben den Übergang „Form ① → Form ②“ und vergleiche. </p>Das Absorptionsmaximum verschiebt sich zu ', { o: ['größeren', 'kleineren'], ok: 0 }, ' Wellenlängen. Das ist ein ', { o: ['bathochromer', 'hypsochromer'], ok: 0 }, ' Effekt. Der Abstand ΔE wird dabei ', { o: ['kleiner', 'größer'], ok: 0 }, '.']
  });
  gap(box, {
    mod: 'm4', why: 'Das Maximum wandert vom Sichtbaren (≈ 553 nm) zurück ins UV (≈ 292 nm). Das ist ein hypsochromer Effekt. Das große π-System zerfällt, ΔE wird größer.',
    parts: ['<p class="qt"><b>3.</b> Jetzt der Übergang „Form ② → Form ③“. </p>Das Absorptionsmaximum verschiebt sich zu ', { o: ['kleineren', 'größeren'], ok: 0 }, ' Wellenlängen. Das ist ein ', { o: ['hypsochromer', 'bathochromer'], ok: 0 }, ' Effekt. Der Abstand ΔE wird dabei ', { o: ['größer', 'kleiner'], ok: 0 }, '.']
  });
  mc(box, {
    mod: 'm4', q: '<b>4.</b> Warum verschiebt sich das Absorptionsmaximum zu größeren Wellenlängen, wenn das π-System wächst?',
    opts: ['Der Abstand zwischen HOMO und LUMO sinkt, energieärmeres Licht genügt zur Anregung.', 'Die Elektronen werden schwerer und brauchen deshalb längerwelliges Licht zur Anregung.', 'Größere Moleküle streuen kurzwelliges Licht stärker, daher fehlt es im Spektrum.', 'Mehr Atome absorbieren mehr Licht, also wandert das Maximum nach rechts.'], ok: 0,
    why: 'Je größer das π-System, desto näher liegen HOMO und LUMO beieinander. Licht mit größerer Wellenlänge hat weniger Energie, und diese reicht dann für die Anregung aus.',
    hints: { 1: 'Die Masse der Elektronen ändert sich nicht. Es geht um die Energieniveaus.', 2: 'Streuung bestimmt hier nicht die Farbe. Entscheidend ist die Absorption durch Anregung.', 3: 'Mehr Absorption heißt höhere Bande, nicht eine andere Lage. Die Lage bestimmt ΔE.' }
  });
})();
