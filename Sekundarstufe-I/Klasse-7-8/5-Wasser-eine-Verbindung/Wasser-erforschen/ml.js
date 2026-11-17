/* Modul 3: Leitfähigkeit. Prüfer, Teilchenmodell, Lösen von Salz, Badeunfall-Fall. */
(function () {
  'use strict';
  Prog.add('l', 9);
  Prog.onFinish('l', function () { $('lmerke').hidden = false; });
  var reached = 0;
  function step(n) {
    Array.prototype.forEach.call(document.querySelectorAll('#lsteps .stp'), function (b) { b.classList.toggle('on', +b.getAttribute('data-s') === n); });
    for (var i = 0; i <= 3; i++) $('ls' + i).classList.toggle('on', i === n);
    document.dispatchEvent(new CustomEvent('lstep', { detail: n }));
  }
  function refresh() { Array.prototype.forEach.call(document.querySelectorAll('#lsteps .stp'), function (b) { b.disabled = +b.getAttribute('data-s') > reached; }); }
  function reach(n) { if (n > reached) { reached = n; refresh(); } }
  refresh();
  $('lsteps').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.stp') : null; if (b && !b.disabled) step(+b.getAttribute('data-s')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-lgo]'), function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-lgo'); reach(n); step(n); try { window.scrollTo({ top: 0 }); } catch (e) {} }); });

  // ---------------------------------------------------------- Schritt 1: Szene mit Bernd
  var sceneSeen = false;
  function playScene() {
    $('lstart').disabled = true; $('lhint').textContent = 'Die Szene läuft …';
    Szene.play(Szene.BAD, function () {
      $('lstart').disabled = false; $('lstart').textContent = '▶ Szene noch einmal'; $('lhint').textContent = 'Du kannst die Szene auch über Kolbis Menü noch einmal ansehen.';
      if (!sceneSeen) { sceneSeen = true; Prog.done('l'); $('lgo1').hidden = false; reach(1); }
    });
  }
  $('lstart').addEventListener('click', playScene);
  Szene.register('l', 'Szene mit Bernd noch einmal ansehen', function () { showTab('l'); step(0); playScene(); });

  var LIQ = [
    { id: 'dest', lab: 'Destilliertes Wasser', lamp: 0, read: 'Lampe dunkel, praktisch kein Strom', ions: 0, mol: 0 },
    { id: 'zuck', lab: 'Zuckerwasser', lamp: 0, read: 'Lampe dunkel, kein Strom', ions: 0, mol: 8 },
    { id: 'leit', lab: 'Leitungswasser', lamp: 0.35, read: 'Lampe glimmt schwach, wenig Strom', ions: 6, mol: 0 },
    { id: 'bad', lab: 'Badewasser (Leitungswasser mit Seife)', lamp: 0.6, read: 'Lampe leuchtet, deutlich Strom', ions: 10, mol: 0 },
    { id: 'salz', lab: 'Salzwasser', lamp: 1, read: 'Lampe leuchtet hell, viel Strom', ions: 20, mol: 0 }
  ];
  var BODY = { dest: 'enthält praktisch keine geladenen Teilchen', zuck: 'enthält nur neutrale Zucker-Moleküle', leit: 'enthält wenige gelöste geladene Teilchen', bad: 'enthält mehr gelöste geladene Teilchen', salz: 'enthält sehr viele gelöste geladene Teilchen' };

  // ---------------------------------------------------------- Schritt 1: Prüfer
  var rig = $('lrig'), lampC, lampRays, liqRect, tested = {}, curL = null;
  svgEl('rect', { x: 0, y: 0, width: 280, height: 200, rx: 8, fill: '#fffaf3' }, rig);
  svgEl('path', { d: 'M96 92 L96 176 Q96 184 104 184 L176 184 Q184 184 184 176 L184 92', fill: '#eff8ff', stroke: '#0e7490', 'stroke-width': 3 }, rig);
  liqRect = svgEl('rect', { x: 98, y: 112, width: 84, height: 70, fill: '#7dd3fc', opacity: .8 }, rig);
  svgEl('rect', { x: 114, y: 60, width: 8, height: 100, fill: '#334155' }, rig); svgEl('rect', { x: 158, y: 60, width: 8, height: 100, fill: '#334155' }, rig);
  svgEl('polyline', { points: '118,60 118,26 40,26 40,52', fill: 'none', stroke: '#1e293b', 'stroke-width': 2.5 }, rig);
  svgEl('polyline', { points: '162,60 162,26 240,26 240,52', fill: 'none', stroke: '#1e293b', 'stroke-width': 2.5 }, rig);
  svgEl('rect', { x: 22, y: 52, width: 36, height: 26, rx: 4, fill: '#475569' }, rig); var bt = svgEl('text', { x: 40, y: 70, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 800, fill: '#fff' }, rig); bt.textContent = '9 V';
  lampRays = svgEl('g', { opacity: 0 }, rig); for (var a = 0; a < 8; a++) { var an = a * Math.PI / 4; svgEl('line', { x1: 240 + 18 * Math.cos(an), y1: 68 + 18 * Math.sin(an), x2: 240 + 30 * Math.cos(an), y2: 68 + 30 * Math.sin(an), stroke: '#f59e0b', 'stroke-width': 3, 'stroke-linecap': 'round' }, lampRays); }
  lampC = svgEl('circle', { cx: 240, cy: 68, r: 15, fill: '#e5e7eb', stroke: '#334155', 'stroke-width': 2.5 }, rig);
  var lt = svgEl('text', { x: 240, y: 108, 'text-anchor': 'middle', 'font-size': 11, fill: '#475569' }, rig); lt.textContent = 'Lampe'; var le = svgEl('text', { x: 140, y: 52, 'text-anchor': 'middle', 'font-size': 11, fill: '#475569' }, rig); le.textContent = 'Elektroden';
  function lamp(v) { lampC.setAttribute('fill', v === 0 ? '#e5e7eb' : 'rgb(255,' + Math.round(235 - 40 * v) + ',' + Math.round(150 - 120 * v) + ')'); lampRays.setAttribute('opacity', v); }
  var ltab = $('ltab'), lsel = $('lliq');
  LIQ.forEach(function (l) { var b = document.createElement('button'); b.textContent = l.lab; b.setAttribute('data-id', l.id); lsel.appendChild(b); var tr = document.createElement('tr'); tr.id = 'lt-' + l.id; tr.innerHTML = '<td>' + l.lab + '</td><td>?</td>'; ltab.appendChild(tr); });
  var q1 = false;
  lsel.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null; if (!b) return; var l = LIQ.filter(function (x) { return x.id === b.getAttribute('data-id'); })[0];
    curL = l; Array.prototype.forEach.call(lsel.querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); });
    lamp(l.lamp); $('lread').textContent = l.read; tested[l.id] = 1; b.classList.add('fin');
    $('lt-' + l.id).innerHTML = '<td>' + l.lab + '</td><td>' + (l.lamp === 0 ? '○ aus' : l.lamp < 0.5 ? '◐ schwach' : l.lamp < 0.9 ? '◕ leuchtet' : '● hell') + '</td>';
    note(l.lab + ': ' + l.read);
    if (!q1 && Object.keys(tested).length === LIQ.length) { q1 = true; Prog.done('l'); qOne(); }
  });
  function qOne() {
    mc($('lq1'), { mod: 'l', q: '<b>a)</b> Welche Aussage passt zu deinem Messprotokoll?',
      opts: ['Gelöstes Salz macht Wasser leitfähig. Zucker löst sich zwar auch, aber das Zuckerwasser leitet nicht.', 'Jede Flüssigkeit, in der sich ein Stoff löst, leitet den Strom besser als reines Wasser.', 'Nur Wasser mit Zucker leitet nicht, alle anderen Flüssigkeiten leiten gleich gut.', 'Destilliertes Wasser leitet gut, weil es besonders sauber ist.'], ok: 0,
      why: 'Salz im Wasser leitet, Zucker im Wasser nicht, und reines Wasser praktisch auch nicht. Es kommt also darauf an, <b>was</b> sich löst. Warum? Das siehst du in Schritt 2.',
      hints: { 1: 'Zuckerwasser ist ein Gegenbeispiel: Es ist gelöst, aber die Lampe bleibt dunkel.', 2: 'Die Lampe leuchtet unterschiedlich hell, je nach Flüssigkeit.', 3: 'Sauber heißt: ohne gelöste Stoffe. Schau auf die Lampe beim destillierten Wasser.' }, after: function () { $('lgo2').hidden = false; reach(2); } });
  }

  // ---------------------------------------------------------- Schritt 2: Teilchenmodell
  var P = $('lpart'), pg, parts = [], on = false, cp = LIQ[0], timer = null;
  function pbuild() {
    while (P.firstChild) P.removeChild(P.firstChild);
    svgEl('rect', { x: 0, y: 0, width: 300, height: 200, rx: 8, fill: '#eaf7ff' }, P);
    svgEl('rect', { x: 20, y: 16, width: 12, height: 168, fill: '#475569' }, P); svgEl('rect', { x: 268, y: 16, width: 12, height: 168, fill: '#475569' }, P);
    var m = svgEl('text', { x: 26, y: 12, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 800, fill: '#2563eb' }, P); m.textContent = '−'; var pl = svgEl('text', { x: 274, y: 12, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 800, fill: '#dc2626' }, P); pl.textContent = '+';
    pg = svgEl('g', {}, P); parts = [];
    function add(kind) {
      var o = { kind: kind, stop: Math.random() * 46, x: 54 + Math.random() * 192, y: 30 + Math.random() * 140, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2 };
      o.g = svgEl('g', {}, pg);
      if (kind === 'w') { svgEl('circle', { cx: 0, cy: 0, r: 4.5, fill: '#fca5a5', opacity: .9 }, o.g); }
      else if (kind === 's') { svgEl('polygon', { points: '0,-7 6,-3.5 6,3.5 0,7 -6,3.5 -6,-3.5', fill: '#fde68a', stroke: '#b45309', 'stroke-width': 1 }, o.g); }
      else { svgEl('circle', { cx: 0, cy: 0, r: 8, fill: kind === 'p' ? '#ef4444' : '#3b82f6', stroke: '#fff', 'stroke-width': 1.5 }, o.g); var t = svgEl('text', { x: 0, y: 4.5, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 800, fill: '#fff' }, o.g); t.textContent = kind === 'p' ? '+' : '−'; }
      parts.push(o); return o;
    }
    for (var i = 0; i < 22; i++) add('w');
    for (var j = 0; j < cp.mol; j++) add('s');
    for (var k = 0; k < cp.ions; k++) add(k % 2 ? 'p' : 'n');
    $('lpinfo').innerHTML = '<b>' + cp.lab + '</b> ' + BODY[cp.id] + '. Kleine rosa Punkte sind Wasser-Moleküle, Kreise mit + oder − sind geladene Teilchen.' + (cp.id === 'dest' ? ' Winzige Spuren geladener Teilchen gibt es immer, sie sind hier so wenige, dass der Strom praktisch nicht fließt.' : '');
    tick();
  }
  function tick() {
    parts.forEach(function (o) {
      var chg = o.kind === 'p' || o.kind === 'n', dir = o.kind === 'p' ? -1 : 1;   // + Teilchen zum Minuspol (links), − Teilchen zum Pluspol (rechts)
      o.x += o.vx + (on && chg ? dir * 1.6 : 0); o.y += o.vy;
      o.vx += (Math.random() - .5) * .25; o.vy += (Math.random() - .5) * .25; o.vx = Math.max(-1.4, Math.min(1.4, o.vx)); o.vy = Math.max(-1.4, Math.min(1.4, o.vy));
      if (o.y < 24 || o.y > 176) o.vy *= -1; if (o.x < 46 || o.x > 254) o.vx *= -1;
      var lo = 44, hi = 256;
      if (on && chg) { if (dir < 0) lo = 44 + o.stop; else hi = 256 - o.stop; }   // Mit Spannung sammeln sich die Teilchen vor dem Gegenpol, sie bleiben immer zwischen den Elektroden
      o.x = Math.max(lo, Math.min(hi, o.x)); o.y = Math.max(24, Math.min(176, o.y));
      o.g.setAttribute('transform', 'translate(' + o.x.toFixed(1) + ' ' + o.y.toFixed(1) + ')');
    });
  }
  timer = setInterval(function () { if ($('ls2').classList.contains('on') && $('l').classList.contains('on')) tick(); }, 50);
  LIQ.forEach(function (l, i) { var b = document.createElement('button'); b.textContent = l.lab.replace(' (Leitungswasser mit Seife)', ''); b.setAttribute('data-id', l.id); if (!i) b.classList.add('on'); $('lpsel').appendChild(b); });
  $('lpsel').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (!b) return; cp = LIQ.filter(function (x) { return x.id === b.getAttribute('data-id'); })[0]; Array.prototype.forEach.call($('lpsel').querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); }); pbuild(); });
  $('lvolt').addEventListener('click', function () { on = !on; this.textContent = on ? '⏹ Spannung ausschalten' : '⚡ Spannung einschalten'; $('lvstate').textContent = on ? 'Spannung an: Die + Teilchen wandern zum Minuspol, die − Teilchen zum Pluspol. So wird Ladung durch die Flüssigkeit transportiert.' : 'Spannung aus: Alle Teilchen bewegen sich ungeordnet.'; });
  pbuild();

  // Salz löst sich
  var D = $('ldis'), dis = false, ions = [], waters = [], dtw = null;
  function drawDis() {
    while (D.firstChild) D.removeChild(D.firstChild); ions = []; waters = [];
    svgEl('rect', { x: 0, y: 0, width: 300, height: 200, rx: 8, fill: '#f3f9ff' }, D);
    var wg = svgEl('g', {}, D), ig = svgEl('g', {}, D);
    var lx = 90, ly = 60, sp = 30;
    var tg = [[40, 40], [250, 42], [30, 150], [258, 150], [150, 30], [150, 172], [70, 100], [225, 100], [110, 160], [190, 150], [100, 40], [200, 45]];
    var n = 0;
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) {
      var kind = (r + c) % 2 ? 'n' : 'p', o = { kind: kind, x0: lx + c * sp, y0: ly + r * sp, x1: tg[n][0], y1: tg[n][1] };
      o.g = svgEl('g', {}, ig); svgEl('circle', { cx: 0, cy: 0, r: 11, fill: kind === 'p' ? '#ef4444' : '#3b82f6', stroke: '#fff', 'stroke-width': 1.5 }, o.g);
      var t = svgEl('text', { x: 0, y: 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 800, fill: '#fff' }, o.g); t.textContent = kind === 'p' ? '+' : '−';
      // Wasser-Hülle: 4 Moleküle, die mit dem passenden Ende zum Ion zeigen
      o.hull = svgEl('g', { opacity: 0 }, wg);
      for (var k = 0; k < 4; k++) { var ang = k * Math.PI / 2 + Math.PI / 4, hx = o.x1 + 24 * Math.cos(ang), hy = o.y1 + 24 * Math.sin(ang), toward = kind === 'p' ? 1 : 0;   // Kation zieht O (δ−), Anion zieht H (δ+)
        var u = { x: Math.cos(ang), y: Math.sin(ang) }; var Ox = toward ? hx - u.x * 3 : hx + u.x * 5, Hx = toward ? hx + u.x * 6 : hx - u.x * 5; 
        svgEl('circle', { cx: hx, cy: hy, r: 5, fill: '#fca5a5', stroke: '#b91c1c' }, o.hull); svgEl('circle', { cx: hx + (toward ? u.x * 7 : -u.x * 7) + -u.y * 3, cy: hy + (toward ? u.y * 7 : -u.y * 7) + u.x * 3, r: 2.8, fill: '#fff', stroke: '#64748b' }, o.hull); svgEl('circle', { cx: hx + (toward ? u.x * 7 : -u.x * 7) + u.y * 3, cy: hy + (toward ? u.y * 7 : -u.y * 7) + -u.x * 3, r: 2.8, fill: '#fff', stroke: '#64748b' }, o.hull); }
      o.g.setAttribute('transform', 'translate(' + o.x0 + ' ' + o.y0 + ')'); ions.push(o); n++;
    }
  }
  var dq = false;
  function setDis(k) { ions.forEach(function (o) { var e = k * k * (3 - 2 * k); o.g.setAttribute('transform', 'translate(' + (o.x0 + (o.x1 - o.x0) * e) + ' ' + (o.y0 + (o.y1 - o.y0) * e) + ')'); o.hull.setAttribute('opacity', Math.max(0, (k - .55) / .45)); }); }
  function runDis(to) { var t0 = performance.now(), from = to ? 0 : 1; (function st(now) { var k = Math.min(1, (now - t0) / 1800), v = to ? k : 1 - k; setDis(v); if (k < 1) requestAnimationFrame(st); })(t0); }
  $('ldisbtn').addEventListener('click', function () {
    if (dis) return; dis = true; this.disabled = true; $('ldisrst').hidden = false; runDis(true);
    $('ldistxt').innerHTML = 'Die Wasser-Moleküle sind Dipole: Mit ihrem <b>δ−</b>-Ende (O) umgeben sie die positiv geladenen Teilchen, mit ihrem <b>δ+</b>-Ende (H) die negativ geladenen. So lösen sie die Teilchen aus dem Kristall heraus. Die geladenen Teilchen sind jetzt <b>frei beweglich</b>.';
    if (!dq) { dq = true; Prog.done('l'); }
    note('Wasser-Moleküle lösen die geladenen Teilchen aus dem Salzkristall. Sie sind dann frei beweglich und können Strom leiten.');
  });
  $('ldisrst').addEventListener('click', function () { dis = false; $('ldisbtn').disabled = false; this.hidden = true; runDis(false); $('ldistxt').textContent = 'Ein Salzkristall besteht aus positiv und negativ geladenen Teilchen, die sich anziehen.'; });
  drawDis();
  mc($('lq2'), { mod: 'l', q: '<b>a)</b> Warum leitet Zuckerwasser den Strom nicht, Salzwasser aber schon?',
    opts: ['Salz besteht aus geladenen Teilchen, die sich im Wasser frei bewegen. Zucker bleibt als neutrale Moleküle und transportiert keine Ladung.', 'Zucker löst sich schlechter als Salz, deshalb sind im Zuckerwasser zu wenige Teilchen vorhanden.', 'Zucker-Moleküle sind zu groß, um sich zwischen den Wasser-Molekülen zu bewegen.', 'Salz ist ein Metall und leitet den Strom deshalb auch gelöst.'], ok: 0,
    why: 'Strom braucht frei bewegliche geladene Teilchen. Salz besteht aus solchen Teilchen, Zucker-Moleküle sind neutral. Deshalb leitet Salzwasser, Zuckerwasser nicht.',
    hints: { 1: 'Zucker löst sich sogar sehr gut. Es kommt auf die Ladung der gelösten Teilchen an.', 2: 'Die Größe spielt keine Rolle. Neutrale Teilchen transportieren keine Ladung, egal wie sie sich bewegen.', 3: 'Kochsalz besteht aus positiv und negativ geladenen Teilchen und ist kein Metall.' }, after: function () { $('lgo3').hidden = false; reach(3); } });

  // ---------------------------------------------------------- Schritt 3: Der Fall
  mc($('lq3'), { mod: 'l', q: '<b>a)</b> „Wasser leitet den Strom nicht.“ Warum ist dieser Satz im Badezimmer ein gefährlicher Irrtum?',
    opts: ['Gemeint ist reines Wasser. Badewasser enthält gelöste Salze, also frei bewegliche geladene Teilchen, und leitet deshalb.', 'Wasser leitet immer, auch das destillierte. Man kann es nur nicht an der Lampe sehen.', 'Der Satz stimmt, aber der Föhn erzeugt im Wasser selbst die Ionen.', 'Der Satz stimmt nur bei kaltem Wasser, warmes Badewasser leitet.'], ok: 0,
    why: 'Der Satz gilt nur für <b>reines</b> Wasser. Leitungs- und Badewasser sind Salzlösungen mit vielen geladenen Teilchen, und auch der Körper leitet.',
    hints: { 1: 'Destilliertes Wasser leitet praktisch nicht. Das hast du selbst gemessen.', 2: 'Die geladenen Teilchen sind schon vorher da: aus Leitungswasser, Seife und Hautsalz.', 3: 'Die Temperatur ist hier nicht entscheidend, sondern was im Wasser gelöst ist.' } });
  mc($('lq3'), { mod: 'l', q: '<b>b)</b> Wer oder was transportiert den Strom in der Badewanne durch das Wasser?',
    opts: ['Gelöste geladene Teilchen, die zu den Polen wandern.', 'Freie Elektronen, die durch das Wasser fließen wie in einem Kupferkabel.', 'Wasser-Moleküle, die vom Föhn weggeschleudert werden.', 'Die Wasserstoffbrücken, die elektrische Ladung weiterreichen.'], ok: 0,
    why: 'In Metallen fließen Elektronen, in Lösungen wandern <b>geladene Teilchen</b>. Genau das hast du im Teilchenmodell gesehen.',
    hints: { 1: 'Im Metalldraht fließen Elektronen. In einer Lösung sind es andere Teilchen.', 2: 'Wasser-Moleküle sind neutral und tragen keine Ladung weiter.', 3: 'Wasserstoffbrücken sind Anziehungskräfte zwischen Molekülen, keine Ladungsträger.' } });
  sortq($('lq3'), { mod: 'l', intro: '<b>c)</b> Sicher oder gefährlich? Entscheide für jede Situation.', btn: ['Sicher', 'Gefährlich'],
    items: [
      { lab: 'Föhn am Rand der gefüllten Badewanne benutzen', ok: 1, why: 'Ein Gerät, das ins Wasser fallen kann, ist zu nah.', hint: 'Was passiert, wenn der Föhn hineinfällt?' },
      { lab: 'Föhn nach Gebrauch ausstecken und weit weg vom Wasser ablegen', ok: 0, why: 'Ohne Strom und mit Abstand zum Wasser kann nichts passieren.', hint: 'Ohne Strom und ohne Wasser in der Nähe fließt keiner.' },
      { lab: 'In der Wanne mit dem Handy am Ladekabel spielen', ok: 1, why: 'Das Ladekabel hängt an der Steckdose. Fällt das Handy hinein, kann Strom durch das Wasser fließen.', hint: 'Das Kabel führt zur Steckdose.' },
      { lab: 'Ein Elektrogerät mit nassen Händen anfassen', ok: 1, why: 'Wasser mit gelösten Salzen auf der Haut leitet den Strom.', hint: 'Nasse Haut ist keine gute Isolierung.' },
      { lab: 'Ist ein Elektrogerät ins Wasser gefallen: erst die Sicherung ausschalten, dann das Gerät herausholen', ok: 0, why: 'Erst die Stromzufuhr unterbrechen, nie ins Wasser greifen, solange Strom fließen kann. Im Notfall 112 rufen.', hint: 'Zuerst muss der Strom weg.' }
    ] });
  gap($('lq3'), { mod: 'l', parts: ['<p class="qt"><b>d)</b> Ergänze die Erklärung.</p>Reines Wasser enthält praktisch keine ', { o: ['geladenen Teilchen', 'Moleküle', 'Atome'], ok: 0 }, ' und leitet deshalb ', { o: ['nicht', 'gut'], ok: 0 }, '. Badewasser enthält gelöste ', { o: ['Salze', 'Gase'], ok: 0 }, '. Deren ', { o: ['geladene Teilchen', 'Elektronen'], ok: 0 }, ' sind frei beweglich und transportieren den ', { o: ['Strom', 'Zucker'], ok: 0 }, '.'],
    why: 'So passt alles zusammen: Reines Wasser leitet nicht, Badewasser schon.' });
})();
