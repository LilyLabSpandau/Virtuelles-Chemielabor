/* Modul 4: Oberflächenspannung. Szene mit Kolbi und Wally, Kräfte im Wasser, Büroklammer-Versuch, Anwenden. */
(function () {
  'use strict';
  Prog.add('o', 8);
  Prog.onFinish('o', function () { $('omerke').hidden = false; $('oepi').hidden = false; });
  var reached = 1;
  function step(n) {
    Array.prototype.forEach.call(document.querySelectorAll('#osteps .stp'), function (b) { b.classList.toggle('on', +b.getAttribute('data-s') === n); });
    for (var i = 1; i <= 4; i++) $('os' + i).classList.toggle('on', i === n);
    document.dispatchEvent(new CustomEvent('ostep', { detail: n }));
  }
  function refresh() { Array.prototype.forEach.call(document.querySelectorAll('#osteps .stp'), function (b) { b.disabled = +b.getAttribute('data-s') > reached; }); }
  function reach(n) { if (n > reached) { reached = n; refresh(); } }
  refresh();
  $('osteps').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.stp') : null; if (b && !b.disabled) step(+b.getAttribute('data-s')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-ogo]'), function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-ogo'); reach(n); step(n); try { window.scrollTo({ top: 0 }); } catch (e) {} }); });

  // ---------------------------------------------------------- Schritt 1: Szene
  var seen = false;
  function playPro() {
    $('ostart').disabled = true; $('ohint').textContent = 'Die Szene läuft …';
    Szene.play(Szene.PRO, function () {
      $('ostart').disabled = false; $('ostart').textContent = '▶ Szene noch einmal'; $('ohint').textContent = 'Du kannst die Szene auch über Kolbis Menü noch einmal ansehen.';
      if (!seen) { seen = true; Prog.done('o'); $('ogo2').hidden = false; reach(2); }
      Kolbi && Kolbi.hush && Kolbi.hush();
    });
  }
  $('ostart').addEventListener('click', playPro);
  $('oepibtn').addEventListener('click', function () { Szene.play(Szene.EPI); });
  var wantExtra = false;
  function applyExtra() { if (!(window.Kolbi && Kolbi.setExtra)) return false; Kolbi.setExtra(wantExtra ? [{ label: 'Szene mit Wally noch einmal ansehen', fn: function () { if (!Szene.running()) { showTab('o'); step(1); playPro(); } } }] : null); return true; }
  document.addEventListener('tabchange', function (e) { wantExtra = e.detail === 'o'; if (!applyExtra()) { var n = 0, t = setInterval(function () { if (applyExtra() || ++n > 30) clearInterval(t); }, 300); } });

  // ---------------------------------------------------------- Schritt 2: Kräfte
  (function () {
    var svg = $('ofrc'), pts = [], R = 5, C = 6, dx = 46, dy = 40, X0 = 38, Y0 = 52, sel = null, tried = { inner: false, top: false }, arr = svgEl('g', {}, svg), q = false;
    svgEl('rect', { x: 0, y: 0, width: 300, height: 250, rx: 8, fill: '#d6efff' }, svg);
    svgEl('rect', { x: 0, y: 0, width: 300, height: 36, rx: 8, fill: '#f3fbff' }, svg); svgEl('line', { x1: 0, y1: 36, x2: 300, y2: 36, stroke: '#38bdf8', 'stroke-width': 3 }, svg);
    var ta = svgEl('text', { x: 8, y: 24, 'font-size': 13, fill: '#64748b' }, svg); ta.textContent = 'Luft';
    for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) pts.push({ r: r, c: c, x: X0 + c * dx + (r % 2 ? dx / 2 : 0) - (r % 2 ? 0 : 0), y: Y0 + r * dy });
    pts.forEach(function (p) {
      if (p.x > 285) { p.skip = true; return; }
      var g = svgEl('g', { style: 'cursor:pointer' }, svg); p.g = g;
      svgEl('circle', { cx: p.x, cy: p.y, r: 13, fill: '#ef4444', stroke: '#991b1b', 'stroke-width': 1.5 }, g);
      svgEl('circle', { cx: p.x - 10, cy: p.y + 8, r: 6, fill: '#e2e8f0', stroke: '#64748b' }, g); svgEl('circle', { cx: p.x + 10, cy: p.y + 8, r: 6, fill: '#e2e8f0', stroke: '#64748b' }, g);
      g.addEventListener('click', function () { pick(p); });
    });
    svg.appendChild(arr);
    var mk = svgEl('defs', {}, svg); var m1 = svgEl('marker', { id: 'ofA', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto' }, mk); svgEl('path', { d: 'M0 0L10 5L0 10z', fill: '#16a34a' }, m1);
    var m2 = svgEl('marker', { id: 'ofB', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 4, markerHeight: 4, orient: 'auto' }, mk); svgEl('path', { d: 'M0 0L10 5L0 10z', fill: '#dc2626' }, m2);
    function neigh(p) { return pts.filter(function (o) { return !o.skip && o !== p && Math.hypot(o.x - p.x, o.y - p.y) < dx * 1.1; }); }
    function pick(p) {
      sel = p; while (arr.firstChild) arr.removeChild(arr.firstChild);
      pts.forEach(function (o) { if (o.g) o.g.firstChild.setAttribute('stroke-width', o === p ? 4 : 1.5); if (o.g) o.g.firstChild.setAttribute('stroke', o === p ? '#1d4ed8' : '#991b1b'); });
      var nb = neigh(p), sx = 0, sy = 0;
      nb.forEach(function (o) { var d = Math.hypot(o.x - p.x, o.y - p.y), ux = (o.x - p.x) / d, uy = (o.y - p.y) / d; sx += ux; sy += uy; svgEl('line', { x1: p.x + ux * 15, y1: p.y + uy * 15, x2: p.x + ux * 33, y2: p.y + uy * 33, stroke: '#16a34a', 'stroke-width': 3, 'marker-end': 'url(#ofA)' }, arr); });
      var mag = Math.hypot(sx, sy), inner = mag < 0.3;
      if (!inner) svgEl('line', { x1: p.x, y1: p.y, x2: p.x + sx / mag * Math.min(46, 16 + mag * 14), y2: p.y + sy / mag * Math.min(46, 16 + mag * 14), stroke: '#dc2626', 'stroke-width': 6, 'stroke-linecap': 'round', 'marker-end': 'url(#ofB)' }, arr);
      $('osel').textContent = p.r === 0 ? 'ein Teilchen an der Oberfläche' : p.r === R - 1 ? 'ein Teilchen am unteren Rand (hier nicht aussagekräftig)' : 'ein Teilchen im Inneren';
      $('onet').innerHTML = inner ? '<span style="color:#166534">≈ 0: Die Kräfte heben sich auf.</span>' : '<span style="color:#b91c1c">Es bleibt ein Zug nach innen (roter Pfeil).</span>';
      if (p.r === 0) tried.top = true; else if (p.r > 0 && p.r < R - 1) tried.inner = true;
      $('otry').textContent = tried.top && tried.inner ? 'Du hast beide Fälle untersucht.' : 'Teste noch ' + (!tried.top ? 'ein Teilchen an der Oberfläche (oberste Reihe).' : 'ein Teilchen im Inneren.');
      if (tried.top && tried.inner && !q) { q = true; question(); }
    }
    function question() {
      mc($('oq2'), { mod: 'o', q: '<b>a)</b> Was ist der Unterschied zwischen einem Teilchen im Inneren und einem an der Oberfläche?',
        opts: ['Im Inneren heben sich die Anziehungskräfte auf. An der Oberfläche bleibt ein Zug nach innen, weil oben Nachbarn fehlen.', 'Im Inneren ziehen die Nachbarn nach unten. An der Oberfläche ziehen sie nach oben in die Luft.', 'Im Inneren gibt es keine Wasserstoffbrücken. Nur an der Oberfläche entstehen welche.', 'Beide werden gleich gezogen. Der Unterschied liegt nur in der Temperatur.'], ok: 0,
        why: 'Ohne Nachbarn von oben bleibt an der Oberfläche eine Kraft nach innen übrig. Dadurch wird die Oberfläche gespannt wie eine Haut.',
        hints: { 1: 'Die Luft zieht kaum. Schau noch einmal, in welche Richtung der rote Pfeil zeigt.', 2: 'Im Wasser entstehen Brücken überall zwischen den Molekülen, auch im Inneren.', 3: 'Ihr Zug ist nicht gleich. Vergleiche die Pfeile.' }, after: function () { $('ogo3').hidden = false; reach(3); } });
    }
  })();

  // ---------------------------------------------------------- Schritt 3: Büroklammer
  (function () {
    var svg = $('oexp'), liq = 'water', st = 'idle', clip, dent, surf, soapG, tw = false;
    var Y = 100;   // Wasserlinie
    svgEl('rect', { x: 0, y: 0, width: 300, height: 220, rx: 8, fill: '#f4faff' }, svg);
    svgEl('path', { d: 'M60 40 L60 196 Q60 206 70 206 L230 206 Q240 206 240 196 L240 40', fill: 'none', stroke: '#0e7490', 'stroke-width': 3 }, svg);
    var wat = svgEl('path', { fill: '#7dd3fc', opacity: .85 }, svg);
    soapG = svgEl('g', { opacity: 0 }, svg);
    for (var i = 0; i < 9; i++) { svgEl('rect', { x: 70 + i * 20, y: Y - 4, width: 7, height: 4, rx: 2, fill: '#f97316' }, soapG); }
    clip = svgEl('g', {}, svg); svgEl('rect', { x: -24, y: -5, width: 48, height: 8, rx: 4, fill: '#9ca3af', stroke: '#4b5563', 'stroke-width': 1.5 }, clip); var ct = svgEl('text', { x: 0, y: 2, 'text-anchor': 'middle', 'font-size': 7, 'font-weight': 700, fill: '#1f2937' }, clip); ct.textContent = 'Stahl';
    var info = svgEl('text', { x: 150, y: 24, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#0c4a6e' }, svg);
    var dep = 0, cy = 20, soap = 0;
    function surface() {   // Wasserlinie mit Delle unter der Klammer
      var d = 'M62 ' + Y; for (var x = 62; x <= 238; x += 4) { var k = Math.exp(-Math.pow((x - 150) / 26, 2)); d += ' L' + x + ' ' + (Y + dep * k); }
      d += ' L238 204 L62 204 Z'; wat.setAttribute('d', d);
    }
    function pos() { clip.setAttribute('transform', 'translate(150 ' + cy + ')'); soapG.setAttribute('opacity', soap); }
    function lab(t) { info.textContent = t; }
    surface(); pos(); lab('Wasser');
    var gate = false;
    function fb(msg, ok) { var f = $('ofb3'); f.hidden = false; f.className = 'fb ' + (ok ? 'ok' : 'bad'); f.innerHTML = msg; }
    var placed = false, soaped = false;
    $('oclip').addEventListener('click', async function () {
      if (st !== 'idle') return; st = 'busy'; this.disabled = true;
      await tw8(900, function (k) { cy = 20 + (Y - 3 - 20) * k; pos(); });
      await tw8(700, function (k) { dep = 14 * k; cy = Y - 3 + dep; surface(); pos(); });
      lab('Die Klammer schwimmt auf der gedellten Oberfläche'); st = 'float';
      fb('✔ Die Büroklammer schwimmt, obwohl Stahl viel dichter ist als Wasser. Die Oberfläche ist unter ihr eingedellt, aber sie reißt nicht: Die Wasserstoffbrücken halten die „Haut“ zusammen.', true); note('Die Büroklammer schwimmt, weil die Oberfläche des Wassers wie eine Haut trägt. Die Wasserstoffbrücken halten sie zusammen.');
      if (!placed) { placed = true; Prog.done('o'); }
      $('osoap').disabled = false;
    });
    $('osoap').addEventListener('click', async function () {
      if (st !== 'float') return; st = 'busy'; this.disabled = true;
      await tw8(900, function (k) { soap = k; pos(); });
      lab('Spülmittel schwächt die Haut');
      await tw8(500, function (k) { dep = 14 + 6 * k; cy = Y - 3 + dep; surface(); pos(); });
      await tw8(1200, function (k) { cy = Y - 3 + 20 + k * 80; dep = 20 * (1 - k); surface(); pos(); });
      st = 'sunk'; wat.setAttribute('fill', '#a5e0f5');
      fb('✔ Die Büroklammer ist gesunken. Das Spülmittel verringert die Oberflächenspannung, die „Haut“ trägt die Klammer nicht mehr. Ihr Gewicht ist größer als die Kraft, die die Oberfläche halten kann.', true); note('Spülmittel verringert die Oberflächenspannung des Wassers. Die Haut trägt die Büroklammer nicht mehr, sie sinkt.');
      if (!soaped) { soaped = true; Prog.done('o'); $('ogo4').hidden = false; reach(4); }
      $('oreset').disabled = false;
    });
    $('oreset').addEventListener('click', function () { st = 'idle'; cy = 20; dep = 0; soap = 0; surface(); pos(); wat.setAttribute('fill', '#7dd3fc'); lab('Wasser'); $('ofb3').hidden = true; $('oclip').disabled = false; this.disabled = true; $('osoap').disabled = true; });
    function tw8(ms, fn) { return new Promise(function (res) { var t0 = performance.now(); (function s(n) { var k = Math.min(1, (n - t0) / ms); fn(k); if (k < 1) requestAnimationFrame(s); else res(); })(t0); }); }
    mc($('oq3a'), { mod: 'o', q: '<b>Vermutung:</b> Eine Büroklammer aus Stahl (Dichte 7,8 g/cm³) wird vorsichtig auf Wasser gelegt. Was erwartest du?', fix: true,
      opts: ['Sie sinkt sofort, weil Stahl viel dichter ist als Wasser.', 'Sie schwimmt, weil die Oberfläche des Wassers sie trägt.', 'Sie schwimmt, weil Stahl leichter ist als Wasser.'], ok: 1,
      why: 'Stahl ist dichter als Wasser, trotzdem trägt die Oberfläche eine leichte Klammer. Probiere es aus!',
      hints: { 0: 'Das wäre der Normalfall bei einem Körper, der dichter ist. Probiere es trotzdem aus: Du kannst die Klammer auflegen.', 2: 'Stahl ist dichter, nicht leichter als Wasser. Er schwimmt aus einem anderen Grund.' }, after: function () { $('oclip').disabled = false; } });
    // Bei falscher Vermutung: Experiment trotzdem freigeben
    $('oq3a').addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.opt')) $('oclip').disabled = (st !== 'idle'); });
  })();

  // ---------------------------------------------------------- Schritt 4: Anwenden
  mc($('oq4'), { mod: 'o', q: '<b>a)</b> Warum sind frei fallende Wassertropfen und Tropfen auf einem Blatt fast kugelrund?',
    opts: ['Die Oberfläche möchte möglichst klein sein. Die Kugel hat bei gleichem Volumen die kleinste Oberfläche.', 'Luft drückt von allen Seiten gleich stark auf den Tropfen und formt ihn zur Kugel.', 'Wasser-Moleküle sind selbst kugelförmig und ordnen sich deshalb zur Kugel an.', 'Die Schwerkraft zieht die Mitte des Tropfens nach unten und macht ihn so rund.'], ok: 0,
    why: 'Die Wasserstoffbrücken ziehen die Oberflächenteilchen nach innen. Dadurch schrumpft die Oberfläche auf das Kleinste, und das ist bei gleichem Volumen die Kugel.',
    hints: { 1: 'Der Luftdruck ist zwar überall gleich, aber er formt keinen Tropfen. Es sind die Kräfte im Wasser selbst.', 2: 'Wasser-Moleküle sind gewinkelt, nicht kugelförmig. Die Form entsteht aus den Anziehungskräften.', 3: 'Dann wären Tropfen oben eher flach. Die Form kommt aus der Oberflächenspannung.' } });
  mc($('oq4'), { mod: 'o', q: '<b>b)</b> Was passiert, wenn ein Wasserläufer in Wasser mit Spülmittel gesetzt wird?',
    opts: ['Er sinkt ein, weil die Oberflächenspannung kleiner ist und die „Haut“ sein Gewicht nicht mehr trägt.', 'Nichts, denn seine Beine sind wasserabweisend und schwimmen auf jeder Flüssigkeit.', 'Er schwimmt besser, weil Spülmittel das Wasser dichter macht.', 'Er läuft schneller, weil das Wasser glatter wird.'], ok: 0,
    why: 'Das Spülmittel schwächt die Wasserstoffbrücken an der Oberfläche. Wie bei der Büroklammer trägt die Haut dann nicht mehr.',
    hints: { 1: 'Die Härchen helfen nur, solange die Oberfläche eine starke Haut hat. Denke an die Büroklammer mit Spülmittel.', 2: 'Spülmittel verringert die Oberflächenspannung. Das Wasser trägt weniger, nicht mehr.', 3: 'Es geht nicht um Gleiten, sondern darum, ob die Oberfläche trägt.' } });
  gap($('oq4'), { mod: 'o', parts: ['<p class="qt"><b>c)</b> Ergänze die Erklärung.</p>Die Wasser-Moleküle ziehen sich über ', { o: ['Wasserstoffbrücken', 'Atombindungen'], ok: 0 }, ' an. An der Oberfläche fehlen die Nachbarn ', { o: ['oben', 'unten'], ok: 0 }, ', darum wirkt eine Kraft nach ', { o: ['innen', 'außen'], ok: 0 }, '. Die Oberfläche verhält sich wie eine ', { o: ['Haut', 'Flüssigkeit ohne Spannung'], ok: 0 }, ' (', { o: ['Oberflächenspannung', 'Dichteanomalie'], ok: 0 }, '), die leichte Dinge tragen kann.'],
    why: 'So kann ein Wasserläufer über das Wasser laufen, und eine Büroklammer schwimmt.' });
})();
