/* Modul 2: Dichteanomalie. Wiegen, See im Jahreslauf, Eis-Gitter zählen, Anwenden. */
(function () {
  'use strict';
  Prog.add('d', 8);
  Prog.onFinish('d', function () { $('dmerke').hidden = false; });
  var reached = 1;
  function step(n) {
    Array.prototype.forEach.call(document.querySelectorAll('#dsteps .stp'), function (b) { b.classList.toggle('on', +b.getAttribute('data-s') === n); });
    for (var i = 1; i <= 4; i++) $('ds' + i).classList.toggle('on', i === n);
    document.dispatchEvent(new CustomEvent('dstep', { detail: n }));
  }
  function refresh() { Array.prototype.forEach.call(document.querySelectorAll('#dsteps .stp'), function (b) { b.disabled = +b.getAttribute('data-s') > reached; }); }
  function reach(n) { if (n > reached) { reached = n; refresh(); } }
  refresh();
  $('dsteps').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.stp') : null; if (b && !b.disabled) step(+b.getAttribute('data-s')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-dgo]'), function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-dgo'); reach(n); step(n); try { window.scrollTo({ top: 0 }); } catch (e) {} }); });

  // ---------------------------------------------------------- Schritt 1: Messen
  var TAB = [[0, 0.99984], [1, 0.99990], [2, 0.99994], [3, 0.99996], [4, 0.99997], [5, 0.99996], [6, 0.99994], [7, 0.99990], [8, 0.99985], [9, 0.99978], [10, 0.99970], [12, 0.99950], [14, 0.99924], [15, 0.99910], [16, 0.99894], [18, 0.99860], [20, 0.99821], [22, 0.99777], [24, 0.99730], [25, 0.99705], [26, 0.99679], [28, 0.99623], [30, 0.99565]];
  function rho(T) { for (var i = 0; i < TAB.length - 1; i++) if (T >= TAB[i][0] && T <= TAB[i + 1][0]) { var a = TAB[i], b = TAB[i + 1], k = (T - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * k; } return TAB[TAB.length - 1][1]; }
  function fmtM(T) { return (rho(T) * 1000).toFixed(2).replace('.', ',') + ' g'; }
  var scale = $('dscale');
  svgEl('rect', { x: 40, y: 118, width: 180, height: 14, rx: 6, fill: '#94a3b8' }, scale);
  svgEl('rect', { x: 100, y: 132, width: 60, height: 10, fill: '#64748b' }, scale);
  svgEl('rect', { x: 92, y: 36, width: 76, height: 82, rx: 6, fill: '#e0f2fe', stroke: '#0e7490', 'stroke-width': 2 }, scale);
  var wat = svgEl('rect', { x: 94, y: 52, width: 72, height: 64, fill: '#38bdf8', opacity: .85 }, scale);
  var lb = svgEl('text', { x: 130, y: 90, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 800, fill: '#075985' }, scale); lb.textContent = '1 Liter';
  var wd = svgEl('rect', { x: 188, y: 126, width: 0, height: 0 }, scale);
  var thm = svgEl('rect', { x: 20, y: 18, width: 8, height: 90, rx: 4, fill: '#e2e8f0', stroke: '#64748b' }, scale), thf = svgEl('rect', { x: 21.5, y: 60, width: 5, height: 46, rx: 2.5, fill: '#ef4444' }, scale);
  var rec = {}, sel = 20;
  function upd() {
    var T = +$('dtemp').value; sel = T; $('dT').textContent = T + ' °C'; $('dM').textContent = fmtM(T);
    var h = 14 + T / 30 * 70; thf.setAttribute('y', 106 - h); thf.setAttribute('height', h);
    wat.setAttribute('fill', T < 5 ? '#7dd3fc' : '#38bdf8');
  }
  $('dtemp').addEventListener('input', upd);
  // Diagramm
  var plot = $('dplot'), PX = 60, PY = 14, PW = 226, PH = 164, YMIN = 0.9955, YMAX = 1.0000;
  function X(T) { return PX + T / 30 * PW; } function Y(r) { return PY + (YMAX - r) / (YMAX - YMIN) * PH; }
  svgEl('rect', { x: PX, y: PY, width: PW, height: PH, fill: '#fff', stroke: '#cbd5e1' }, plot);
  [0, 5, 10, 15, 20, 25, 30].forEach(function (t) { svgEl('line', { x1: X(t), y1: PY + PH, x2: X(t), y2: PY + PH + 4, stroke: '#64748b' }, plot); var q = svgEl('text', { x: X(t), y: PY + PH + 16, 'text-anchor': 'middle', 'font-size': 11, fill: '#475569' }, plot); q.textContent = t; });
  [0.9960, 0.9970, 0.9980, 0.9990, 1.0000].forEach(function (r) { svgEl('line', { x1: PX, y1: Y(r), x2: PX + PW, y2: Y(r), stroke: '#e2e8f0' }, plot); var q = svgEl('text', { x: PX - 4, y: Y(r) + 4, 'text-anchor': 'end', 'font-size': 10, fill: '#475569' }, plot); q.textContent = r.toFixed(4).replace('.', ','); });
  var ax = svgEl('text', { x: PX + PW / 2, y: 216, 'text-anchor': 'middle', 'font-size': 12, fill: '#334155' }, plot); ax.textContent = 'Temperatur in °C';
  var ay = svgEl('text', { x: 11, y: PY + PH / 2, 'text-anchor': 'middle', 'font-size': 12, fill: '#334155', transform: 'rotate(-90 11 ' + (PY + PH / 2) + ')' }, plot); ay.textContent = 'Dichte in g/cm³';
  var dots = svgEl('g', {}, plot), curve = svgEl('polyline', { fill: 'none', stroke: '#0e7490', 'stroke-width': 2.5, opacity: 0 }, plot);
  function cnt() { return Object.keys(rec).length; }
  $('dadd').addEventListener('click', function () {
    if (rec[sel] === undefined) { rec[sel] = 1; svgEl('circle', { cx: X(sel), cy: Y(rho(sel)), r: 5, fill: '#0e7490', stroke: '#fff', 'stroke-width': 1.5 }, dots); }
    var n = cnt(); $('dcnt').textContent = n + (n === 1 ? ' Messwert' : ' Messwerte');
    if (n >= 7) { var low = Object.keys(rec).filter(function (t) { return +t <= 5; }).length; if (low >= 3) openQ1(); else $('dcnt').textContent += ' (miss auch bei 0 bis 5 °C)'; }
  });
  var q1 = false;
  function openQ1() { if (q1) return; q1 = true; var pts = []; for (var t = 0; t <= 30; t += 0.5) pts.push(X(t) + ',' + Y(rho(t))); curve.setAttribute('points', pts.join(' ')); curve.setAttribute('opacity', 1);
    mc($('dq1'), { mod: 'd', q: '<b>a)</b> Bei welcher Temperatur hat ein Liter Wasser die größte Masse, also die größte Dichte?', fix: true,
      opts: ['bei 0 °C', 'bei 4 °C', 'bei 10 °C', 'bei 30 °C'], ok: 1,
      why: 'Bei 4 °C ist die Dichte am größten (fast 1,0000 g/cm³). Zu höheren und zu tieferen Temperaturen nimmt sie ab. Das ist ungewöhnlich und heißt Dichteanomalie.',
      hints: { 0: 'Schau auf die Kurve: Bei 0 °C liegt der Punkt tiefer als bei einigen Grad darüber.', 2: 'Bei 10 °C ist die Masse schon wieder kleiner als bei niedrigeren Temperaturen.', 3: 'Wasser wird beim Erwärmen im Normalfall weniger dicht, aber der höchste Wert liegt weiter links.' }, after: function () { $('dgo2').hidden = false; reach(2); } }); }
  upd();

  // ---------------------------------------------------------- Schritt 2: See im Jahreslauf
  var S = [
    { id: 'so', lab: '☀️ Sommer', t: [22, 18, 12, 7, 4], ice: false, arrows: false, info: 'Das warme, leichtere Wasser schwimmt oben. Unten liegt das schwere, kalte Wasser (4 °C). Die Schichten vermischen sich kaum.' },
    { id: 'he', lab: '🍂 Herbst', t: [8, 8, 8, 7, 6], ice: false, arrows: true, info: 'Die Oberfläche kühlt ab. Das kältere Wasser ist dichter und sinkt. Warmes Wasser steigt von unten auf: Der See durchmischt sich, bis alles etwa 4 °C hat.' },
    { id: 'wi', lab: '❄️ Winter', t: [0, 1, 2, 3, 4], ice: true, arrows: false, info: 'Unter 4 °C wird Wasser wieder leichter. Das kälteste Wasser bleibt oben und gefriert zuerst. Das Eis schwimmt. Am Grund bleibt es bei etwa 4 °C, dort überleben die Fische.' },
    { id: 'fr', lab: '🌱 Frühling', t: [3, 4, 4, 4, 4], ice: false, arrows: true, info: 'Das Eis schmilzt und die Oberfläche erwärmt sich. Sobald sie 4 °C erreicht, ist sie am dichtesten und sinkt. Der See durchmischt sich noch einmal.' }
  ];
  var lake = $('dlake'), seen = { so: true }, cur = 'so';
  function tcol(T) { var k = Math.max(0, Math.min(1, T / 24)); var c0 = [88, 164, 232], c1 = [247, 152, 90]; return 'rgb(' + c0.map(function (v, i) { return Math.round(v + (c1[i] - v) * k); }).join(',') + ')'; }
  function drawLake(id) {
    cur = id; var s = S.filter(function (x) { return x.id === id; })[0];
    while (lake.firstChild) lake.removeChild(lake.firstChild);
    svgEl('rect', { x: 0, y: 0, width: 360, height: 250, fill: '#eaf6ff' }, lake);
    svgEl('path', { d: 'M20 40 L340 40 L340 205 Q340 230 315 230 L45 230 Q20 230 20 205 Z', fill: '#c9b99a' }, lake);
    var L0 = 52, LH = 32;
    s.t.forEach(function (T, i) {
      svgEl('rect', { x: 34, y: L0 + (i - (s.ice ? 0 : 0)) * LH, width: 292, height: LH - 1, fill: tcol(T) }, lake);
      var q = svgEl('text', { x: 300, y: L0 + i * LH + 21, 'text-anchor': 'end', 'font-size': 16, 'font-weight': 800, fill: T <= 8 ? '#0c4a6e' : '#7c2d12' }, lake); q.textContent = T + ' °C';
    });
    if (s.ice) { svgEl('rect', { x: 34, y: 36, width: 292, height: 16, fill: '#f0f9ff', stroke: '#bae6fd' }, lake); var e = svgEl('text', { x: 60, y: 49, 'font-size': 12, 'font-weight': 700, fill: '#0369a1' }, lake); e.textContent = 'Eis'; }
    // Fisch
    var f = svgEl('g', { transform: 'translate(70 ' + (L0 + 4 * LH + 8) + ')' }, lake);
    svgEl('ellipse', { cx: 0, cy: 0, rx: 18, ry: 9, fill: '#f59e0b' }, f); svgEl('polygon', { points: '16,0 30,-9 30,9', fill: '#f59e0b' }, f); svgEl('circle', { cx: -9, cy: -2, r: 2, fill: '#1e293b' }, f);
    if (s.arrows) [90, 170, 250].forEach(function (x, i) {
      var up = id === 'fr' ? (i % 2 === 0) : (i % 2 === 1);
      svgEl('path', { d: 'M' + x + ' ' + (up ? 178 : 70) + ' L' + x + ' ' + (up ? 78 : 170), stroke: '#0f172a', 'stroke-width': 3, 'marker-end': 'url(#dar)', fill: 'none', opacity: .75 }, lake);
    });
    var mk = svgEl('marker', { id: 'dar', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, lake); svgEl('path', { d: 'M0 0L10 5L0 10z', fill: '#0f172a' }, mk);
    var tt = svgEl('text', { x: 180, y: 22, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 800, fill: '#075985' }, lake); tt.textContent = s.lab.replace(/^\S+\s/, '') + ': Wassertemperatur der Schichten';
    $('dlakeinfo').innerHTML = '<b>' + s.lab + ':</b> ' + s.info;
    Array.prototype.forEach.call($('dseason').querySelectorAll('button'), function (b) { b.classList.toggle('on', b.getAttribute('data-id') === id); });
  }
  S.forEach(function (s, i) { var b = document.createElement('button'); b.textContent = s.lab; b.setAttribute('data-id', s.id); if (i) { b.disabled = true; } $('dseason').appendChild(b); });
  $('dseason').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (b && !b.disabled) drawLake(b.getAttribute('data-id')); });
  drawLake('so');
  function unlockSeason(id) { var b = $('dseason').querySelector('[data-id="' + id + '"]'); b.disabled = false; drawLake(id); }
  var sdone = 0;
  function sq(o) { o.mod = 'd'; o.fix = true; var a = o.after; o.after = function () { unlockSeason(o.show); if (++sdone === 3) { $('dgo3').hidden = false; reach(3); } }; mc($('dq2'), o); }
  sq({ show: 'he', q: '<b>a)</b> Im Herbst kühlt die Oberfläche des Sees auf 8 °C ab, darunter liegt 12 °C warmes Wasser. Was passiert?',
    opts: ['Das 8 °C kalte Wasser ist dichter und sinkt ab. Wärmeres Wasser steigt auf.', 'Das kalte Wasser bleibt oben, weil kaltes Wasser leichter ist als warmes.', 'Nichts, denn Wasser verschiebt sich nicht von selbst.'], ok: 0,
    why: 'Je näher die Temperatur an 4 °C liegt, desto dichter das Wasser. Das kältere Wasser sinkt, der See wird durchmischt.', hints: { 1: 'Zwischen 8 °C und 12 °C gilt: Je kälter, desto dichter. Schau noch einmal auf die Kurve.', 2: 'Unterschiede in der Dichte setzen das Wasser in Bewegung, so wie Öl oben auf Wasser schwimmt.' } });
  sq({ show: 'wi', q: '<b>b)</b> Der See hat überall 4 °C. Die Oberfläche kühlt weiter auf 2 °C ab. Wo bleibt dieses 2 °C kalte Wasser?',
    opts: ['Oben, denn Wasser mit 2 °C ist weniger dicht als Wasser mit 4 °C.', 'Es sinkt zum Grund, denn kaltes Wasser ist immer schwerer.', 'Es steigt in die Luft auf und verdunstet vollständig.'], ok: 0,
    why: 'Unter 4 °C nimmt die Dichte wieder ab. Das kalte Wasser bleibt oben und gefriert dort. Unten bleiben die 4 °C.', hints: { 1: 'Das gilt nur bis 4 °C. Darunter dreht sich die Kurve. Schau noch einmal auf das Diagramm.', 2: 'Verdunsten kann nur ein Teil des Wassers. Die Frage ist, wo das Wasser im See bleibt.' } });
  sq({ show: 'fr', q: '<b>c)</b> Im Frühling erwärmt sich die Oberfläche des Sees von 0 °C auf 4 °C. Was geschieht mit diesem Wasser?',
    opts: ['Es erreicht die größte Dichte und sinkt nach unten. Der See wird noch einmal durchmischt.', 'Es bleibt oben, weil wärmeres Wasser immer leichter ist.', 'Es gefriert wieder, weil es sich zuerst erwärmt.'], ok: 0,
    why: 'Zwischen 0 °C und 4 °C nimmt die Dichte beim Erwärmen zu. Das Wasser an der Oberfläche wird schwerer als das darunter und sinkt.', hints: { 1: 'Zwischen 0 °C und 4 °C stimmt das nicht. Die Dichte steigt hier mit der Temperatur.', 2: 'Beim Erwärmen gefriert Wasser nicht. Denke an die Kurve: Wie ändert sich die Dichte zwischen 0 °C und 4 °C?' } });

  // ---------------------------------------------------------- Schritt 3: Gitter zählen
  function build(svg, pts, bonds, counterId) {
    var n = 0; svgEl('rect', { x: 10, y: 10, width: 180, height: 160, rx: 8, fill: '#f8fbff', stroke: '#0e7490', 'stroke-width': 2 }, svg);
    bonds.forEach(function (b) { svgEl('line', { x1: pts[b[0]][0], y1: pts[b[0]][1], x2: pts[b[1]][0], y2: pts[b[1]][1], stroke: '#16a34a', 'stroke-width': 2.5, 'stroke-dasharray': '5 4' }, svg); });
    pts.forEach(function (p) {
      var g = svgEl('g', { style: 'cursor:pointer' }, svg), on = false;
      svgEl('circle', { cx: p[0] - 8, cy: p[1] + 6, r: 4, fill: '#e2e8f0', stroke: '#64748b' }, g); svgEl('circle', { cx: p[0] + 8, cy: p[1] + 6, r: 4, fill: '#e2e8f0', stroke: '#64748b' }, g);
      svgEl('circle', { cx: p[0], cy: p[1], r: 9, fill: '#ef4444', stroke: '#991b1b', 'stroke-width': 1.2 }, g);
      var mk = svgEl('circle', { cx: p[0], cy: p[1] + 2, r: 16, fill: 'rgba(37,99,235,.12)', stroke: '#2563eb', 'stroke-width': 3, opacity: 0 }, g);
      g.addEventListener('click', function () { on = !on; mk.setAttribute('opacity', on ? 1 : 0); n += on ? 1 : -1; $(counterId).textContent = n; check(); });
    });
  }
  // Eis: Sechsringe (Honigwabe) mit Hohlräumen, 12 Moleküle; Wasser: 13 Moleküle, dichter und unregelmäßig, weniger Brücken
  var ICE = [[68, 36], [131, 36], [37, 54], [37, 90], [100, 54], [100, 90], [162, 54], [162, 90], [68, 108], [68, 144], [131, 108], [131, 144]];
  var IB = [[0, 2], [0, 4], [1, 4], [1, 6], [2, 3], [3, 8], [4, 5], [5, 8], [5, 10], [6, 7], [7, 10], [8, 9], [10, 11]];
  var LIQ = [[86, 103], [52, 127], [148, 65], [49, 43], [166, 100], [41, 82], [96, 70], [112, 125], [92, 37], [158, 146], [143, 32], [81, 153], [127, 93]];
  var LB = []; LIQ.forEach(function (a, i) { LIQ.forEach(function (b, j) { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 44 && (i + j) % 2 === 0) LB.push([i, j]); }); });
  var cI = 0, cL = 0;
  build($('dice'), ICE, IB, 'dcI'); build($('dliq'), LIQ, LB, 'dcL');
  var q3 = false;
  function check() {
    if (q3 || +$('dcI').textContent !== 12 || +$('dcL').textContent !== 13) return; q3 = true;
    mc($('dq3'), { mod: 'd', q: '<b>a)</b> Im Eis sind es 12 Moleküle, im flüssigen Wasser 13, im gleichen Raum. Was folgt daraus?',
      opts: ['Flüssiges Wasser hat mehr Masse im gleichen Volumen, es ist dichter. Das Eis schwimmt deshalb auf dem Wasser.', 'Eis hat mehr Moleküle im gleichen Volumen, es ist dichter und müsste deshalb untergehen.', 'Beide haben die gleiche Dichte, die Moleküle sind nur anders gefärbt.', 'Eis besteht aus anderen Molekülen als flüssiges Wasser, deshalb unterscheiden sich die Dichten.'], ok: 0,
      why: 'Mehr Teilchen im gleichen Volumen bedeutet mehr Masse und damit eine größere Dichte. Das Wasser ist dichter, das Eis leichter und schwimmt.',
      hints: { 1: 'Zähle noch einmal: Im Kasten mit Eis sind es weniger Moleküle.', 2: 'Die Zahlen sind verschieden, also auch die Dichten.', 3: 'Eis ist nur eine andere Anordnung derselben H₂O-Moleküle.' }, after: function () { $('dgo4').hidden = false; reach(4); } });
  }

  // ---------------------------------------------------------- Schritt 4: Anwenden
  mc($('dq4'), { mod: 'd', q: '<b>a)</b> Eine voll gefüllte, fest verschlossene Glasflasche liegt im Gefrierfach. Was ist wahrscheinlich nach einigen Stunden?',
    opts: ['Die Flasche ist gesprungen, weil Eis etwa 9 % mehr Volumen braucht als flüssiges Wasser.', 'Die Flasche ist unverändert, weil sich Wasser beim Abkühlen immer zusammenzieht.', 'Die Flasche ist leichter geworden, weil Eis weniger Masse hat als flüssiges Wasser.', 'Die Flasche ist unverändert, weil Glas sich beim Gefrieren des Inhalts mit ausdehnt.'], ok: 0,
    why: 'Die Masse bleibt gleich, aber das Volumen wächst um etwa ein Zehntel. Das Eis drückt auf das Glas, das reißt.',
    hints: { 1: 'Bis 4 °C zieht sich Wasser zusammen, danach dehnt es sich beim Gefrieren aus.', 2: 'Die Masse bleibt beim Gefrieren gleich. Nur das Volumen ändert sich.', 3: 'Das Glas dehnt sich dabei kaum. Der Druck des Eises ist das Problem.' } });
  mc($('dq4'), { mod: 'd', q: '<b>b)</b> Ein Eisberg schwimmt im Meer, und nur etwa ein Zehntel ragt heraus. Was verrät das?',
    opts: ['Eis hat eine etwas kleinere Dichte als Wasser. Deshalb schwimmt der größte Teil unter der Oberfläche.', 'Eis hat eine viel kleinere Dichte als Wasser. Deshalb schwimmt es fast vollständig oben.', 'Eis und Wasser haben genau die gleiche Dichte, deshalb schwebt der Eisberg im Wasser.', 'Eis ist dichter als Wasser, wird aber vom Salz im Meer getragen.'], ok: 0,
    why: 'Eis (0,92 g/cm³) ist nur wenig leichter als Wasser. Deshalb liegt es tief im Wasser und nur etwa ein Zehntel ragt heraus.',
    hints: { 1: 'Der Unterschied ist klein (0,92 gegen 1,00 g/cm³). Schau, wie viel herausragt.', 2: 'Wären sie gleich, würde das Eis nicht aus dem Wasser ragen.', 3: 'Eis ist weniger dicht als Wasser. Das Salz macht das Meerwasser etwas dichter, aber das ist nicht der Hauptgrund.' } });
  gap($('dq4'), { mod: 'd', parts: ['<p class="qt"><b>c)</b> Ergänze den Merksatz.</p>Wasser hat bei ', { o: ['4 °C', '0 °C', '100 °C'], ok: 0 }, ' seine größte Dichte. Eis ist ', { o: ['weniger dicht', 'dichter'], ok: 0 }, ' als flüssiges Wasser, weil die Moleküle durch Wasserstoffbrücken in einem ', { o: ['Gitter mit Hohlräumen', 'dichten Haufen'], ok: 0 }, ' angeordnet sind. Deshalb friert ein See von ', { o: ['oben', 'unten'], ok: 0 }, ' zu.'],
    why: 'So bleibt am Grund Wasser mit etwa 4 °C, und Fische und Pflanzen überleben den Winter.' });
})();
