/* Station 4: Bindungsstärke und Schmelztemperatur */
(function () {
  'use strict';
  Prog.add('m4', 3);
  Prog.onFinish('m4', function () { $('m4merke').hidden = false; });
  var DS = {
    a: { t: 'Schmelztemperatur in °C', n: ['Na', 'Mg', 'Al'], v: [98, 650, 660], rows: [['Valenzelektronen', [1, 2, 3]], ['Radius der Ionen in pm', [102, 72, 54]]] },
    b: { t: 'Schmelztemperatur in °C', n: ['Li', 'Na', 'K', 'Rb', 'Cs'], v: [181, 98, 63, 39, 28], rows: [['Valenzelektronen', [1, 1, 1, 1, 1]], ['Atomradius in pm', [152, 186, 227, 248, 265]]] }
  };
  function show(k) {
    var D = DS[k], max = Math.max.apply(null, D.v) * 1.12, w = 520, hgt = 190, bw = Math.min(70, (w - 40) / D.n.length - 14), s = '<svg viewBox="0 0 ' + w + ' ' + (hgt + 40) + '" role="img" aria-label="' + D.t + '">';
    s += '<text x="10" y="16" font-size="13" font-weight="700" fill="#334155">' + D.t + '</text><line x1="30" y1="' + (hgt + 4) + '" x2="' + (w - 10) + '" y2="' + (hgt + 4) + '" stroke="#94a3b8"/>';
    D.n.forEach(function (n, i) {
      var x = 50 + i * ((w - 70) / D.n.length), bh = D.v[i] / max * (hgt - 30);
      s += '<rect x="' + x + '" y="' + (hgt + 4 - bh) + '" width="' + bw + '" height="' + bh + '" rx="4" fill="#14b8a6" stroke="#0f766e"/><text x="' + (x + bw / 2) + '" y="' + (hgt - bh - 2) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">' + D.v[i] + '</text><text x="' + (x + bw / 2) + '" y="' + (hgt + 22) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#334155">' + n + '</text>';
    });
    $('m4ch').innerHTML = s + '</svg>';
    var t = '<table class="dat"><tr><th></th>' + D.n.map(function (n) { return '<th>' + n + '</th>'; }).join('') + '</tr>';
    D.rows.forEach(function (r) { t += '<tr><td>' + r[0] + '</td>' + r[1].map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>'; });
    $('m4t').innerHTML = t + '</table>';
    $('m4a').classList.toggle('on', k === 'a'); $('m4b').classList.toggle('on', k === 'b');
  }
  $('m4a').onclick = function () { show('a'); }; $('m4b').onclick = function () { show('b'); }; show('a');
  gap($('m4q1'), {
    parts: ['<p class="qt"><b>Aufgabe 1.</b> Von Natrium zu Aluminium.</p><div class="gaptext">Die Schmelztemperatur steigt, weil die Atomrümpfe ', { o: ['stärker geladen und kleiner werden', 'schwächer geladen und größer werden', 'neutral werden'], ok: 0 }, ' und mehr Valenzelektronen im Elektronengas vorliegen. Die Anziehung zwischen Rümpfen und Elektronengas ', { o: ['nimmt zu', 'nimmt ab', 'bleibt gleich'], ok: 0 }, '.</div>'],
    mod: 'm4', why: 'Al³⁺-Rümpfe sind höher geladen und kleiner als Na⁺-Rümpfe, außerdem gibt jedes Atom drei statt einem Elektron ab. Die Metallbindung ist stärker.'
  });
  gap($('m4q2'), {
    parts: ['<p class="qt"><b>Aufgabe 2.</b> Von Lithium zu Cäsium.</p><div class="gaptext">Der Atomradius nimmt ', { o: ['zu', 'ab'], ok: 0 }, ', der Abstand zwischen Rümpfen und Elektronengas wird ', { o: ['größer', 'kleiner'], ok: 0 }, ' und die Anziehung ', { o: ['schwächer', 'stärker'], ok: 0 }, '. Die Schmelztemperatur ', { o: ['sinkt', 'steigt'], ok: 0 }, '.</div>'],
    mod: 'm4', why: 'Bei gleicher Ladung (1+) nimmt die Metallbindung mit wachsender Größe der Rümpfe ab. Cäsium schmilzt schon knapp unter 30 °C.'
  });
  mc($('m4q3'), {
    q: '<b>Aufgabe 3.</b> Kalium und Calcium stehen beide in der vierten Periode. Welches Metall hat die höhere Schmelztemperatur und warum?',
    opts: ['Calcium: zwei Valenzelektronen und kleinere Rümpfe, daher stärkere Anziehung', 'Kalium: das größere Atom hat mehr Elektronen im Gas und bindet daher stärker', 'Beide gleich, weil beide Metalle der vierten Periode sind und sich ähneln', 'Kalium: die Rümpfe sind größer, und größere Teilchen halten besser zusammen'], ok: 0, mod: 'm4',
    why: 'Calcium (842 °C) gibt zwei Elektronen ab, die Ca²⁺-Rümpfe sind höher geladen und kleiner. Kalium schmilzt schon bei 63 °C.',
    hints: { 1: 'Kalium gibt nur ein Elektron ab, es sind nicht mehr.', 2: 'In einer Periode ändert sich die Bindungsstärke mit der Zahl der Valenzelektronen.', 3: 'Größere Rümpfe bedeuten größeren Abstand und schwächere Anziehung.' }
  });
})();
