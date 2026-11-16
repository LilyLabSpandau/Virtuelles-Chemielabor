/* Modul 1: Konjugierte Kette verlängern -> Farbe */
(function () {
  'use strict';
  var n = 1, visited = {}, base = null;
  var DE1 = null;
  Prog.add('m1', 5);
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });

  function drawChain() {
    var N = 2 * n, dx = n <= 4 ? 40 : n <= 8 ? 30 : 23, amp = 13, mar = 58;
    var W = (N - 1) * dx + 2 * mar, H = 86, scale = Math.min(1, 330 / W), fs = Math.min(22, 12.5 / scale);
    var pts = [], i;
    for (i = 0; i < N; i++) pts.push([mar + i * dx, 43 + (i % 2 ? -amp : amp)]);
    var s = '', cloud = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L');
    s += '<path d="' + cloud + '" fill="none" stroke="#14b8a6" stroke-opacity="' + Math.min(0.5, 0.16 + 0.03 * n).toFixed(2) + '" stroke-width="' + (30 / Math.max(0.8, scale * 1.2)).toFixed(0) + '" stroke-linecap="round" stroke-linejoin="round"/>';
    for (i = 0; i < N - 1; i++) {
      var a = pts[i], b = pts[i + 1], dbl = i % 2 === 0, newest = dbl && i === N - 2, col = newest ? '#ea580c' : '#1e293b', sw = (2.6 / Math.max(0.7, scale)).toFixed(1);
      s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + col + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
      if (dbl) {
        var vx = b[0] - a[0], vy = b[1] - a[1], L = Math.sqrt(vx * vx + vy * vy), nx = -vy / L * 5, ny = vx / L * 5, sg = (i / 2) % 2 ? -1 : 1; sg = a[1] > b[1] ? 1 : -1;
        s += '<line x1="' + (a[0] + nx * sg * 1) + '" y1="' + (a[1] + ny * sg) + '" x2="' + (b[0] + nx * sg) + '" y2="' + (b[1] + ny * sg) + '" stroke="' + col + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
      }
    }
    s += '<text x="' + (pts[0][0] - 8) + '" y="' + (pts[0][1] + (n === 1 ? 5 : 22)) + '" font-size="' + fs + '" text-anchor="end" fill="#1e293b">CH₂</text>';
    s += '<text x="' + (pts[N - 1][0] + 8) + '" y="' + (pts[N - 1][1] + (n === 1 ? 5 : (N % 2 ? 22 : -10))) + '" font-size="' + fs + '" fill="#1e293b">' + (n === 1 ? 'CH₂' : 'CH₂') + '</text>';
    var svg = $('chain'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.innerHTML = s;
  }

  function update() {
    var lmax = Farbe.LAM[n - 1], A = Farbe.band(lmax), col = Farbe.colorOf(A), cn = Farbe.colorName(col);
    drawChain();
    $('chainName').textContent = IUPAC.name(n) + (n === 1 ? '' : '  (' + n + ' konjugierte C=C)');
    $('chainFormel').innerHTML = 'Summenformel ' + IUPAC.formula(n) + (n === 11 ? ' (so viele konjugierte C=C hat zum Beispiel β-Carotin, auch wenn dort noch Ringe und Methylgruppen dazukommen)' : '');
    Farbe.setBeaker($('m1beaker'), cn === 'farblos' ? null : col);
    $('m1farbe').textContent = cn; $('m1abs').textContent = Farbe.absorbedName(lmax);
    Farbe.plot($('m1plot'), lmax, A);
    var gap = Farbe.levels($('m1lev'), n); if (DE1 === null) DE1 = gap;
    $('m1de').textContent = Math.round(gap / DE1 * 100) + ' %';
    $('m1lmax').textContent = lmax + ' nm'; $('m1n').textContent = n;
    $('m1range').value = n; $('m1minus').disabled = n <= 1; $('m1plus').disabled = n >= 14;
    visited[n] = { lmax: lmax, col: col, name: cn };
    var rows = '';
    Object.keys(visited).map(Number).sort(function (a, b) { return a - b; }).forEach(function (k) {
      var v = visited[k]; rows += '<tr' + (k === n ? ' style="background:#fff7e6"' : '') + '><td>' + k + '</td><td>' + IUPAC.name(k) + '</td><td>' + v.lmax + ' nm</td><td><span class="dot" style="background:' + Farbe.rgbCss(v.col) + '"></span>' + v.name + '</td></tr>';
    });
    $('m1tab').innerHTML = rows;
  }
  function set(v) { n = Math.max(1, Math.min(14, v)); update(); }
  $('m1plus').addEventListener('click', function () { set(n + 1); });
  $('m1minus').addEventListener('click', function () { set(n - 1); });
  $('m1range').addEventListener('input', function () { set(+this.value); });
  Farbe.beaker($('m1beaker'));

  // ----- Aufgaben
  var firstColored = 1;
  for (var k = 1; k <= 14; k++) { if (Farbe.colorName(Farbe.colorOf(Farbe.band(Farbe.LAM[k - 1]))) !== 'farblos') { firstColored = k; break; } }
  var box = $('m1q');
  var o1 = [firstColored - 3, firstColored - 2, firstColored, firstColored + 3].map(function (x) { return Math.max(1, x); });
  mc(box, { mod: 'm1', q: '<b>1.</b> Ab wie vielen konjugierten C=C-Doppelbindungen erscheint die Lösung erstmals schwach gefärbt? Prüfe es im Versuch (Messprotokoll).', opts: o1.map(function (x) { return x + ' Doppelbindungen'; }), ok: 2,
    why: 'Bei ' + firstColored + ' konjugierten C=C reicht die Bande bis in den violetten Bereich des sichtbaren Lichts. Die Lösung absorbiert etwas violettes Licht und wirkt hellgelb.', hints: { 0: 'So kurze Ketten absorbieren nur im UV, die Lösung bleibt farblos.', 1: 'Schau im Protokoll nach, ob das Becherglas bei dieser Kettenlänge schon gefärbt ist.', 3: 'So lang muss die Kette nicht sein, die Lösung ist schon früher gefärbt.' } });
  mc(box, { mod: 'm1', q: '<b>2.</b> Warum verschiebt sich das Absorptionsmaximum mit wachsender Kette zu größeren Wellenlängen?',
    opts: ['Die π-Elektronen sind über ein größeres System delokalisiert. Der Abstand zwischen HOMO und LUMO wird kleiner, deshalb genügt energieärmeres, langwelligeres Licht zur Anregung.', 'Die Kette wird schwerer und schwingt deshalb langsamer, also absorbiert sie langwelliges Licht.', 'Mit jeder Doppelbindung kommen mehr σ-Bindungen dazu, und diese absorbieren sichtbares Licht.', 'Die Doppelbindungen werden länger, deshalb brauchen die Elektronen mehr Energie zur Anregung.'], ok: 0,
    why: 'Ein größeres delokalisiertes System hat dichter liegende Energiestufen. Schau auf das Energiediagramm: ΔE schrumpft mit jeder weiteren C=C.', hints: { 1: 'Die Masse der Kette spielt für die Elektronenanregung keine Rolle.', 2: 'σ-Bindungen absorbieren erst im fernen UV. Entscheidend ist das π-System.', 3: 'Mehr Energie würde eine kürzere Wellenlänge bedeuten, im Versuch passiert aber das Gegenteil.' } });
  mc(box, { mod: 'm1', q: '<b>3.</b> Eine Lösung absorbiert blaues Licht (etwa 450 nm). Welche Farbe sieht man?', opts: ['Blau', 'Gelb bis Orange', 'Grün', 'Farblos'], ok: 1,
    why: 'Man sieht das Licht, das übrig bleibt: Fehlt Blau im weißen Licht, erscheint die Komplementärfarbe Gelb bis Orange. Dein Becherglas zeigt es bei n = 10 und 11.', hints: { 0: 'Blaues Licht wird ja gerade geschluckt. Wir sehen das Licht, das durchkommt.', 2: 'Grün entsteht, wenn rotes Licht fehlt.', 3: 'Farblos wäre die Lösung nur, wenn im sichtbaren Bereich nichts absorbiert würde.' } });
  mc(box, { mod: 'm1', q: '<b>4.</b> Tomaten sind rot, Karotten orange. Beide Farbstoffe (Lycopin und β-Carotin) bestehen aus langen Ketten mit etwa 11 konjugierten C=C. Was folgt aus dem Versuch?', opts: ['Sie absorbieren im sichtbaren Bereich, vor allem blaues bis blaugrünes Licht.', 'Sie absorbieren nur UV-Licht und reflektieren alles andere.', 'Sie enthalten Metallionen, die die Farbe verursachen.', 'Ihre Doppelbindungen sind nicht konjugiert.'], ok: 0,
    why: 'Mit etwa 11 konjugierten C=C liegt das Maximum bei etwa 450 bis 480 nm. Die Farbstoffe nehmen blaues und blaugrünes Licht auf, übrig bleiben Orange und Rot.', hints: { 1: 'Dann wären sie farblos. Schau dir n = 11 im Versuch an.', 2: 'Hier verursacht allein die lange Kette mit konjugierten Doppelbindungen die Farbe.', 3: 'Doch, genau diese Konjugation macht die Moleküle farbig.' } });

  var ch = document.createElement('div'); ch.className = 'q';
  ch.innerHTML = '<p class="qt"><b>5.</b> Stelle im Versuch oben eine Kettenlänge ein, bei der die Lösung <b>orange</b> aussieht, und drücke dann „Prüfen“.</p><button class="btn" id="m1chk">Prüfen</button><div class="fb" hidden></div>';
  box.appendChild(ch);
  var cdone = false;
  ch.querySelector('#m1chk').addEventListener('click', function () {
    var fb = ch.querySelector('.fb'), nm = visited[n] ? visited[n].name : '', lm = Farbe.LAM[n - 1]; fb.hidden = false;
    if (nm === 'orange') {
      if (!cdone) { cdone = true; ch.classList.add('done'); Prog.done('m1'); }
      fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. Bei ' + n + ' konjugierten C=C liegt das Maximum bei etwa ' + lm + ' nm. Die Lösung absorbiert blaues Licht und sieht orange aus.';
    } else {
      fb.className = 'fb bad'; var dir = Farbe.hsv(visited[n].col).h > 40 || nm === 'farblos' ? 'länger' : 'kürzer';
      fb.innerHTML = '✗ Im Moment ist die Lösung ' + nm + ', nicht orange. ' + (nm === 'farblos' || nm.indexOf('gelb') >= 0 || nm === 'gelb' ? 'Die Kette muss noch länger werden.' : 'Die Kette ist schon etwas zu lang geraten. Gehe einen Schritt zurück.');
    }
  });
  update();
})();
