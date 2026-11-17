/* Szene am Teich: Kolbi (Moderator, nicht bedienbar) trifft Wally, den Wasserläufer. Weiter geht es durch Tippen, es gibt keine feste Zeit.
   Szene.play(zeilen, ende) spielt eine Abfolge; Szene.PRO und Szene.EPI sind die beiden Texte. */
(function () {
  'use strict';
  var PRO = [
    { w: 'K', m: 'happy', t: 'Ein ruhiger Teich! Genau das Richtige für eine kleine Pause. Im Labor geht es ja immer so hektisch zu.' },
    { w: 'W', act: 'enter' },
    { w: 'K', m: 'surprised', t: 'Moment mal … Da läuft jemand <b>über</b> das Wasser! Das ist doch unmöglich. Ich würde sofort untergehen!' },
    { w: 'W', m: 'happy', t: 'Hallo Kolbi! Ich heiße Wally und bin ein Wasserläufer. Und nein, ich zaubere nicht.' },
    { w: 'K', m: 'interested', t: 'Du hast doch ein Gewicht, und trotzdem sinkt keines deiner sechs Beine ein. Wie machst du das?' },
    { w: 'W', m: 'happy', t: 'Das liegt am Wasser selbst. Seine Oberfläche ist wie eine dünne, dehnbare Haut. Schuld daran sind die <b>Wasserstoffbrückenbindungen</b>.' },
    { w: 'K', m: 'excited', t: 'Wasserstoffbrücken! Die kennen wir doch! Die haben wir uns gerade erst angesehen.' },
    { w: 'K', m: 'interested', t: 'Dann schauen wir uns jetzt einmal genauer an, was die Wasserstoffbrücken an der Oberfläche machen. Kommst du mit?' },
    { w: 'W', m: 'wink', act: 'leave', t: 'Viel Spaß beim Forschen! Ich drehe solange eine Runde.' }
  ];
  var EPI = [
    { w: 'W', act: 'enter' },
    { w: 'K', m: 'excited', t: 'Wally, wir haben es herausgefunden!' },
    { w: 'W', m: 'interested', t: 'Dann bin ich gespannt. Erzähl!' },
    { w: 'K', m: 'happy', t: 'An der Oberfläche fehlen den Wasser-Molekülen die Nachbarn von oben. Die Wasserstoffbrücken ziehen sie deshalb nach innen und zur Seite. So entsteht die „Haut“.' },
    { w: 'W', m: 'happy', t: 'Genau! Meine Beine sind außerdem mit wasserabweisenden Härchen bedeckt und verteilen mein Gewicht. Sie dellen die Haut nur ein und durchbrechen sie nicht.' },
    { w: 'K', m: 'interested', t: 'Und mit Spülmittel im Wasser wäre es vorbei, oder?' },
    { w: 'W', m: 'oops', t: 'Bitte nicht! Spülmittel schwächt die Haut, dann gehe ich unter.' },
    { w: 'K', m: 'love', t: 'Dann bleib am besten in einem sauberen Teich. Danke, Wally!' },
    { w: 'W', m: 'wink', act: 'leave', t: 'Tschüss, Kolbi! Und tschüss an dich!' }
  ];
  var veil, svgR, wally, bub, hint, dots, lines, idx, busy, running, cb, gen = 0, wx = 0;
  function hasK() { return !!(window.Kolbi && Kolbi.lock && Kolbi.line); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function tween(ms, fn) { return new Promise(function (res) { var t0 = performance.now(); (function s(n) { var k = Math.min(1, (n - t0) / ms); fn(k * k * (3 - 2 * k)); if (k < 1) requestAnimationFrame(s); else res(); })(t0); }); }

  function build() {
    veil = document.createElement('div'); veil.id = 'sceneVeil'; veil.style.display = 'flex';
    veil.innerHTML = '<div class="dots" id="sDots"></div><button id="sceneSkip">Überspringen ⏭</button>' +
      '<svg id="sceneSvg" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Teich mit Wasserläufer"></svg><div id="sceneBub"></div><div id="sceneHint">Tippe, um weiterzulesen ▸</div>';
    document.body.appendChild(veil);
    svgR = veil.querySelector('svg'); bub = veil.querySelector('#sceneBub'); hint = veil.querySelector('#sceneHint'); dots = veil.querySelector('#sDots');
    var N = svgR.namespaceURI, ratio = Math.max(0.8, Math.min(2.4, innerHeight / innerWidth)), VH = 400 * ratio, VY = 300 - VH * 0.52;
    svgR.setAttribute('viewBox', '0 ' + VY.toFixed(1) + ' 400 ' + VH.toFixed(1));
    function E(t, a, p) { var e = document.createElementNS(N, t); for (var k in a) e.setAttribute(k, a[k]); (p || svgR).appendChild(e); return e; }
    var df = E('defs', {}); var gr = E('linearGradient', { id: 'sKy', x1: 0, y1: 0, x2: 0, y2: 1 }, df); E('stop', { offset: 0, 'stop-color': '#9fd3f7' }, gr); E('stop', { offset: 1, 'stop-color': '#e3f4ff' }, gr);
    var gw = E('linearGradient', { id: 'sWa', x1: 0, y1: 0, x2: 0, y2: 1 }, df); E('stop', { offset: 0, 'stop-color': '#5bb7e6' }, gw); E('stop', { offset: 1, 'stop-color': '#1d78b5' }, gw);
    E('rect', { x: -1500, y: -1200, width: 3400, height: 1500, fill: 'url(#sKy)' });
    E('circle', { cx: 330, cy: 90, r: 34, fill: '#ffe27a' });
    [[80, 80], [250, 140]].forEach(function (c) { var g = E('g', { opacity: .9 }); E('ellipse', { cx: c[0], cy: c[1], rx: 42, ry: 13, fill: '#fff' }, g); E('ellipse', { cx: c[0] + 20, cy: c[1] - 9, rx: 26, ry: 12, fill: '#fff' }, g); });
    E('rect', { x: -1500, y: 300, width: 3400, height: 1500, fill: 'url(#sWa)' });
    E('path', { d: 'M-1500 300 L0 300 Q50 296 100 300 T200 300 T300 300 T400 300 L1900 300', fill: 'none', stroke: '#c7ecff', 'stroke-width': 3 });
    [[60, 380], [200, 430], [330, 400]].forEach(function (p) { E('ellipse', { cx: p[0], cy: p[1], rx: 30, ry: 4, fill: '#fff', opacity: .12 }); });
    // Ufer links (Kolbi steht dort), Schilf rechts
    E('path', { d: 'M-1500 262 L120 262 Q140 262 150 300 L150 1500 L-1500 1500 Z', fill: '#7cc16a' }); E('path', { d: 'M-1500 290 L135 290 Q146 300 150 320 L150 1500 L-1500 1500 Z', fill: '#a9805a' });
    E('rect', { id: 'sShore', x: 18, y: 258, width: 70, height: 4, fill: 'none' });
    [[352, 300, 60], [366, 300, 80], [380, 300, 52]].forEach(function (r) { E('line', { x1: r[0], y1: r[1], x2: r[0] + 4, y2: r[1] - r[2], stroke: '#5a8a3a', 'stroke-width': 4, 'stroke-linecap': 'round' }); E('ellipse', { cx: r[0] + 4, cy: r[1] - r[2] - 8, rx: 5, ry: 12, fill: '#7a4a2a' }); });
    // Wally (Füße auf Höhe der Wasserlinie y=300)
    wally = E('g', { id: 'sWally', transform: 'translate(470 300)' });
    var b = E('g', { id: 'sWb' }, wally);
    // Dellen unter den Füßen
    [[-40, 0], [-2, 0], [36, 0]].forEach(function (p) { E('path', { d: 'M' + (p[0] - 9) + ' -1 Q' + p[0] + ' 11 ' + (p[0] + 9) + ' -1', fill: '#2d8cc4', stroke: '#c7ecff', 'stroke-width': 2 }, b); });
    [['M16 -26 L38 -4', 1], ['M4 -26 L-2 -4', 1], ['M-14 -26 L-40 -4', 1]].forEach(function (l) { E('path', { d: l[0], fill: 'none', stroke: '#3f2a14', 'stroke-width': 2.6, 'stroke-linecap': 'round' }, b); });
    [['M22 -26 L44 -8', 0], ['M10 -26 L16 -8', 0], ['M-8 -26 L-30 -8', 0]].forEach(function (l) { E('path', { d: l[0], fill: 'none', stroke: '#6b4a25', 'stroke-width': 2.2, 'stroke-linecap': 'round', opacity: .7 }, b); });
    E('ellipse', { cx: 0, cy: -29, rx: 27, ry: 8.5, fill: '#4b3621' }, b);
    E('circle', { cx: 26, cy: -31, r: 8, fill: '#5b4228' }, b); E('circle', { cx: 29, cy: -33, r: 3.3, fill: '#fff' }, b); E('circle', { cx: 30, cy: -33, r: 1.6, fill: '#111' }, b);
    E('path', { d: 'M27 -27 q5 4 9 0', fill: 'none', stroke: '#111', 'stroke-width': 1.5, 'stroke-linecap': 'round' }, b);
    E('line', { x1: 33, y1: -38, x2: 42, y2: -46, stroke: '#3f2a14', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, b);
  }
  function wallyBob(on) { var b = svgR.querySelector('#sWb'); if (b) b.style.animation = on ? 'sbob 2.2s ease-in-out infinite' : 'none'; }
  var css = document.createElement('style'); css.textContent = '@keyframes sbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}'; document.head.appendChild(css);
  function showBub(text) {
    bub.innerHTML = text; bub.style.display = 'block';
    var r = wally.getBoundingClientRect(), w = bub.offsetWidth, h = bub.offsetHeight, L = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    bub.style.left = L + 'px'; bub.style.top = Math.max(50, r.top - h - 14) + 'px';
  }
  function setDots() { dots.innerHTML = lines.map(function (_, i) { return '<i' + (i === idx ? ' class="on"' : '') + '></i>'; }).join(''); }
  async function wallyTo(x, ms) { var x0 = wx; wallyBob(false); await tween(ms, function (k) { wx = x0 + (x - x0) * k; wally.setAttribute('transform', 'translate(' + wx + ' 300)'); }); wallyBob(true); }
  async function show(i) {
    var l = lines[i], g = gen; busy = true; idx = i; setDots(); bub.style.display = 'none'; if (hasK()) Kolbi.hush();
    if (l.act === 'enter') { await wallyTo(290, 2200); if (g !== gen) return; if (!l.t) { busy = false; return next(); } }
    if (g !== gen) return;
    if (l.t) {
      if (l.w === 'K') { if (hasK()) Kolbi.line(l.t, 600000, l.m || 'happy'); else showBub('<b>Kolbi:</b> ' + l.t); }
      else showBub('<b>Wally:</b> ' + l.t);
    }
    if (l.act === 'leave') { busy = false; hint.textContent = 'Tippe, um die Szene zu beenden ▸'; leaving = true; return; }
    busy = false;
  }
  var leaving = false;
  async function next() {
    if (busy || !running) return;
    if (leaving) { leaving = false; var g = gen; bub.style.display = 'none'; if (hasK()) Kolbi.hush(); busy = true; await wallyTo(470, 1600); if (g === gen) end(); return; }
    if (idx + 1 >= lines.length) return end();
    show(idx + 1);
  }
  function end() {
    if (!running) return; running = false; gen++;
    if (hasK()) { Kolbi.hush(); Kolbi.lock(false); Kolbi._idle(0); Kolbi.mood('happy', 1500); }
    if (veil && veil.parentNode) veil.parentNode.removeChild(veil); veil = null; busy = false; leaving = false;
    var f = cb; cb = null; if (f) f();
  }
  async function play(arr, onEnd) {
    if (running) return; running = true; lines = arr; idx = -1; busy = true; leaving = false; gen++; cb = onEnd; wx = 470;
    for (var w = 0; w < 20 && !hasK(); w++) await wait(150);
    build();
    veil.addEventListener('click', function (e) { if (e.target.id === 'sceneSkip') return; next(); });
    veil.querySelector('#sceneSkip').addEventListener('click', function (e) { e.stopPropagation(); end(); });
    if (hasK()) { Kolbi.show(); Kolbi.hush(); Kolbi.lock(true);
      var sh = svgR.querySelector('#sShore').getBoundingClientRect(), kh = innerWidth <= 700 ? 77 : 96;
      Kolbi.moveTo(Math.max(0.01, (sh.left + 4) / innerWidth), Math.max(0.05, (sh.top - kh + 6) / innerHeight)); }
    wallyBob(true); await wait(1300); busy = false; show(0);
  }
  window.Szene = { play: play, PRO: PRO, EPI: EPI, running: function () { return running; } };
})();
