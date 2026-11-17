/* Szenen: Kolbi (Moderator, nicht bedienbar) trifft Wally am Teich, Neumo im See und Bernd im Bad. Weiter geht es durch Tippen, es gibt keine feste Zeit.
   Szene.play(zeilen, ende) spielt eine Abfolge. Jede Zeile hat w:'K' (Kolbi) oder w:'W' (der andere), Text t, Stimmung m und optional act. Das Thema steht in zeilen.theme. */
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
  var INTRO = [
    { w: 'K', m: 'happy', icon: '👋', t: 'Hallo und herzlich willkommen im Labor! Ich bin Kolbi.' },
    { w: 'K', m: 'interested', icon: '💧', t: 'Über Wasser habt ihr schon viel gelernt. Aber bei dieser spannenden Chemikalie sind wir noch lange nicht am Ende!' },
    { w: 'K', m: 'surprised', icon: '🧊', t: 'Warum schwimmt Eis oben, obwohl es fest ist? Warum ist ein Föhn in der Badewanne so gefährlich, obwohl reines Wasser keinen Strom leitet? Und wie kann ein Insekt über das Wasser laufen?' },
    { w: 'K', m: 'excited', icon: '🔬', t: 'Hinter allem steckt eine kleine Kraft zwischen den Wasser-Molekülen: die <b>Wasserstoffbrückenbindung</b>. Mit ihr fangen wir an. Dieses Modul ist Pflicht.' },
    { w: 'K', m: 'happy', icon: '🧭', t: 'Danach suchst du dir selbst aus, ob du als Nächstes die Dichte, die Leitfähigkeit oder die Oberflächenspannung erforschst. Du findest alles selbst heraus.' },
    { w: 'K', m: 'love', icon: '', t: 'Wenn die Einführung vorbei ist, bin ich wieder dein Helfer. Tippe mich einfach an, wenn du nicht weiterkommst. Los geht’s!' }
  ];

  var DICHTE = [
    { w: 'K', m: 'excited', t: 'Was für ein Sommertag! Ich tauche im See ab. Damit mir kein Wasser in den Hals läuft, habe ich meinen Stopfen aufgesetzt.' },
    { w: 'W', act: 'enter' },
    { w: 'K', m: 'surprised', t: 'Huch! Ein Fisch! Hallo, wer bist du denn?' },
    { w: 'W', m: 'happy', t: 'Ich bin Neumo. Im Sommer schwimme ich meistens im oberen Wasser. Dort ist es schön warm.' },
    { w: 'K', m: 'happy', t: 'Das merke ich auch. Ich komme im Winter wieder vorbei und besuche dich.' },
    { w: 'K', m: 'oops', act: 'winter', t: 'Brr, ist das kalt! Gut, dass ich meine Schutzjacke anhabe. Der See ist zugefroren, und Neumo ist nirgends zu sehen. Ob er weiter unten ist?' },
    { w: 'W', m: 'happy', act: 'fishdown', t: 'Hallo Kolbi! Hier unten bin ich!' },
    { w: 'K', m: 'surprised', act: 'dive', t: 'Du bist ja ganz unten am Grund! Im Sommer warst du doch oben. Und warum ist der See nicht bis zum Grund zugefroren?' },
    { w: 'W', m: 'interested', t: 'Das liegt an einer Besonderheit des Wassers. Hier unten ist es im Winter am wärmsten, nämlich 4 °C. Es hat mit der Dichte des Wassers zu tun.' },
    { w: 'K', m: 'excited', t: 'Die Dichte des Wassers! Das sehen wir uns jetzt genauer an. Kommst du mit, Neumo?' },
    { w: 'W', m: 'wink', act: 'leave', t: 'Ich schwimme lieber noch eine Runde. Viel Erfolg beim Forschen!' }
  ];
  DICHTE.theme = 'lake';
  var BAD = [
    { w: 'K', m: 'surprised', t: 'Huch! Ich dachte, hier geht es zum Labor. Aber das ist ein Badezimmer, und da sitzt jemand in der Wanne!' },
    { w: 'K', m: 'oops', act: 'shy', t: 'Oje, das ist mir jetzt furchtbar peinlich. Ich gehe lieber gleich wieder hinaus.' },
    { w: 'W', m: 'happy', act: 'call', t: 'Halt, warte mal, kleiner Kolben! Ich bin der Bernd. Ich bade jeden Samstag, das mache ich schon seit vierzig Jahren so.' },
    { w: 'W', m: 'happy', act: 'wish', t: 'Sei so gut und reich mir mal den Föhn rüber. Meine Haare werden sonst nie trocken. Früher haben wir das auch immer so gemacht.' },
    { w: 'K', m: 'surprised', t: 'Den Föhn?! In die Badewanne?! Bernd, bitte nicht!' },
    { w: 'W', m: 'happy', t: 'Ach was, mein Junge. In vierzig Jahren ist mir nie etwas passiert. Ihr jungen Leute macht euch immer so viele Sorgen.' },
    { w: 'K', m: 'interested', act: 'sink', t: 'Dann zeige ich dir mal, was passieren kann. Schau her, hier am Waschbecken.' },
    { w: 'K', m: 'oops', act: 'drop', t: 'Siehst du? Fällt ein eingeschalteter Föhn ins Wasser, kann Strom durch das Wasser fließen. Und das ist lebensgefährlich!' },
    { w: 'W', m: 'surprised', t: 'Hoppla! Aber in der Schule hieß es doch immer, Wasser leitet gar keinen Strom …' },
    { w: 'K', m: 'interested', act: 'back', t: 'Das stimmt nur bei reinem Wasser. Warum, das finden wir jetzt heraus. Und du, Bernd, lässt den Föhn bitte liegen!' },
    { w: 'W', m: 'wink', t: 'Na gut, na gut. Aber nur, weil du es bist.' }
  ];
  BAD.theme = 'bath';

  var veil, svgR, actor, flip, icon, bub, hint, dots, lines, idx, busy, running, cb, gen = 0, ax = 0, ay = 0, wdir = -1, T = null, S = {};
  function hasK() { return !!(window.Kolbi && Kolbi.lock && Kolbi.line); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function tween(ms, fn) { return new Promise(function (res) { var t0 = performance.now(); (function s(n) { var k = Math.min(1, (n - t0) / ms); fn(k * k * (3 - 2 * k)); if (k < 1) requestAnimationFrame(s); else res(); })(t0); }); }
  var NS = 'http://www.w3.org/2000/svg';
  function E(t, a, p) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); (p || svgR).appendChild(e); return e; }
  function grad(df, id, c1, c2) { var g = E('linearGradient', { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, df); E('stop', { offset: 0, 'stop-color': c1 }, g); E('stop', { offset: 1, 'stop-color': c2 }, g); }
  function place(x, y) { ax = x; ay = y; actor.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')'); }
  function setDir(d) { wdir = d; flip.setAttribute('transform', 'scale(' + d + ' 1)'); }
  function bob(on) { var b = svgR.querySelector('#sWb'); if (b) b.style.animation = on ? (T.id === 'lake' ? 'sfish 1.6s ease-in-out infinite' : 'sbob 2.2s ease-in-out infinite') : 'none'; }
  var css = document.createElement('style'); css.textContent = '@keyframes sbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}@keyframes sfish{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes stail{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(14deg)}}@keyframes spulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}'; document.head.appendChild(css);

  // ------------------------------------------------------------------ Themen
  function drawPond(df, VY, VH) {
    grad(df, 'sKy', '#9fd3f7', '#e3f4ff'); grad(df, 'sWa', '#5bb7e6', '#1d78b5');
    E('rect', { x: -1500, y: -1200, width: 3400, height: 1500, fill: 'url(#sKy)' });
    E('circle', { cx: 330, cy: 90, r: 34, fill: '#ffe27a' });
    [[80, 80], [250, 140]].forEach(function (c) { var g = E('g', { opacity: .9 }); E('ellipse', { cx: c[0], cy: c[1], rx: 42, ry: 13, fill: '#fff' }, g); E('ellipse', { cx: c[0] + 20, cy: c[1] - 9, rx: 26, ry: 12, fill: '#fff' }, g); });
    E('rect', { x: -1500, y: 300, width: 3400, height: 1500, fill: 'url(#sWa)' });
    E('path', { d: 'M-1500 300 L0 300 Q50 296 100 300 T200 300 T300 300 T400 300 L1900 300', fill: 'none', stroke: '#c7ecff', 'stroke-width': 3 });
    [[60, 380], [200, 430], [330, 400]].forEach(function (p) { E('ellipse', { cx: p[0], cy: p[1], rx: 30, ry: 4, fill: '#fff', opacity: .12 }); });
    E('path', { d: 'M-1500 262 L120 262 Q140 262 150 300 L150 1500 L-1500 1500 Z', fill: '#7cc16a' }); E('path', { d: 'M-1500 290 L135 290 Q146 300 150 320 L150 1500 L-1500 1500 Z', fill: '#a9805a' });
    E('rect', { id: 'sKrect', x: 18, y: 258, width: 70, height: 4, fill: 'none' });
    [[352, 300, 60], [366, 300, 80], [380, 300, 52]].forEach(function (r) { E('line', { x1: r[0], y1: r[1], x2: r[0] + 4, y2: r[1] - r[2], stroke: '#5a8a3a', 'stroke-width': 4, 'stroke-linecap': 'round' }); E('ellipse', { cx: r[0] + 4, cy: r[1] - r[2] - 8, rx: 5, ry: 12, fill: '#7a4a2a' }); });
    icon = E('text', { x: 335, y: 175, 'text-anchor': 'middle', 'font-size': 60, opacity: 0 });
    actor = E('g', { id: 'sWally' }); flip = E('g', {}, actor); var b = E('g', { id: 'sWb' }, flip);
    [[-40, 0], [-2, 0], [36, 0]].forEach(function (p) { E('path', { d: 'M' + (p[0] - 9) + ' -1 Q' + p[0] + ' 11 ' + (p[0] + 9) + ' -1', fill: '#2d8cc4', stroke: '#c7ecff', 'stroke-width': 2 }, b); });
    [['M16 -26 L38 -4', 1], ['M4 -26 L-2 -4', 1], ['M-14 -26 L-40 -4', 1]].forEach(function (l) { E('path', { d: l[0], fill: 'none', stroke: '#3f2a14', 'stroke-width': 2.6, 'stroke-linecap': 'round' }, b); });
    [['M22 -26 L44 -8', 0], ['M10 -26 L16 -8', 0], ['M-8 -26 L-30 -8', 0]].forEach(function (l) { E('path', { d: l[0], fill: 'none', stroke: '#6b4a25', 'stroke-width': 2.2, 'stroke-linecap': 'round', opacity: .7 }, b); });
    E('ellipse', { cx: 0, cy: -29, rx: 27, ry: 8.5, fill: '#4b3621' }, b);
    E('circle', { cx: 26, cy: -31, r: 8, fill: '#5b4228' }, b); E('circle', { cx: 29, cy: -33, r: 3.3, fill: '#fff' }, b); E('circle', { cx: 30, cy: -33, r: 1.6, fill: '#111' }, b);
    E('path', { d: 'M27 -27 q5 4 9 0', fill: 'none', stroke: '#111', 'stroke-width': 1.5, 'stroke-linecap': 'round' }, b);
    E('line', { x1: 33, y1: -38, x2: 42, y2: -46, stroke: '#3f2a14', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, b);
    return { stopX: 290, offX: 470, ay: function () { return 300; }, dir: -1 };
  }

  function drawLake(df, VY, VH) {
    var Sf = VY + VH * 0.24, Bd = VY + VH * 0.86; S.Sf = Sf; S.Bd = Bd;
    grad(df, 'lKy', '#9fd3f7', '#e3f4ff'); grad(df, 'lWa', '#7fd0f5', '#1d78b5'); grad(df, 'lKyW', '#aebdca', '#e9eff4'); grad(df, 'lWaW', '#5aa9d6', '#164f7d');
    // Sommer
    E('rect', { x: -1500, y: -1500, width: 3400, height: Sf + 1500, fill: 'url(#lKy)' });
    E('circle', { cx: 330, cy: Sf - 74, r: 30, fill: '#ffe27a' });
    [[70, Sf - 80], [240, Sf - 50]].forEach(function (c) { var g = E('g', { opacity: .9 }); E('ellipse', { cx: c[0], cy: c[1], rx: 38, ry: 11, fill: '#fff' }, g); E('ellipse', { cx: c[0] + 18, cy: c[1] - 8, rx: 24, ry: 10, fill: '#fff' }, g); });
    E('rect', { x: -1500, y: Sf, width: 3400, height: Bd - Sf, fill: 'url(#lWa)' });
    E('path', { d: 'M-1500 ' + Sf + ' L0 ' + Sf + ' Q50 ' + (Sf - 4) + ' 100 ' + Sf + ' T200 ' + Sf + ' T300 ' + Sf + ' T400 ' + Sf + ' L1900 ' + Sf, fill: 'none', stroke: '#c7ecff', 'stroke-width': 3 });
    E('rect', { x: -1500, y: Bd, width: 3400, height: 1500, fill: '#a98a5a' });
    var plants = function (g, col) { [[30, 60], [52, 44], [340, 70], [366, 50], [190, 36]].forEach(function (p) { E('path', { d: 'M' + p[0] + ' ' + Bd + ' q-6 -' + p[1] / 2 + ' 4 -' + p[1], fill: 'none', stroke: col, 'stroke-width': 4, 'stroke-linecap': 'round' }, g); }); };
    plants(svgR, '#4c9a43'); [[120, 6], [300, 8]].forEach(function (p) { E('ellipse', { cx: p[0], cy: Bd + 4, rx: 18, ry: p[1], fill: '#8c6f45' }); });
    // Winter (liegt darüber, zunächst unsichtbar)
    var W = E('g', { id: 'lkW', opacity: 0 });
    E('rect', { x: -1500, y: -1500, width: 3400, height: Sf + 1500, fill: 'url(#lKyW)' }, W);
    for (var i = 0; i < 26; i++) E('circle', { cx: (i * 53) % 400, cy: Sf - 260 + ((i * 97) % 250), r: 1.6 + (i % 3), fill: '#fff', opacity: .85 }, W);
    E('rect', { x: -1500, y: Sf, width: 3400, height: Bd - Sf, fill: 'url(#lWaW)' }, W);
    E('rect', { x: -1500, y: Bd, width: 3400, height: 1500, fill: '#8a7a5c' }, W); plants(W, '#5f8a58');
    E('rect', { x: -1500, y: Sf - 6, width: 3400, height: 26, fill: '#e6f6ff', stroke: '#b9dcf0', 'stroke-width': 2 }, W);
    E('rect', { x: -1500, y: Sf - 14, width: 3400, height: 9, rx: 4, fill: '#fff' }, W);
    [[60, 8], [170, 12], [290, 8]].forEach(function (c) { E('path', { d: 'M' + c[0] + ' ' + (Sf - 4) + ' l' + c[1] + ' 10 l-4 8', fill: 'none', stroke: '#a9cfe6', 'stroke-width': 1.6 }, W); });
    S.W = W;
    E('rect', { id: 'sKrect', x: 26, y: 0, width: 60, height: 4, fill: 'none' });
    icon = E('text', { x: 335, y: Sf - 90, 'text-anchor': 'middle', 'font-size': 50, opacity: 0 });
    actor = E('g', { id: 'sWally' }); flip = E('g', {}, actor); var b = E('g', { id: 'sWb' }, flip);
    var tail = E('g', {}, b); tail.style.transformBox = 'fill-box'; tail.style.transformOrigin = '100% 50%'; tail.style.animation = 'stail .7s ease-in-out infinite';
    E('path', { d: 'M-24 0 L-48 -17 Q-42 0 -48 17 Z', fill: '#f97316', stroke: '#c2410c', 'stroke-width': 2, 'stroke-linejoin': 'round' }, tail);
    E('path', { d: 'M-6 -19 Q4 -34 18 -17 Z', fill: '#fb923c', stroke: '#c2410c', 'stroke-width': 2, 'stroke-linejoin': 'round' }, b);
    E('ellipse', { cx: 0, cy: 0, rx: 30, ry: 19, fill: '#fb923c', stroke: '#c2410c', 'stroke-width': 2.4 }, b);
    E('path', { d: 'M-8 -12 Q-2 0 -8 12 M2 -14 Q8 0 2 14', fill: 'none', stroke: '#f97316', 'stroke-width': 2, 'stroke-linecap': 'round' }, b);
    E('ellipse', { cx: -2, cy: 10, rx: 14, ry: 5, fill: '#fed7aa', opacity: .8 }, b);
    E('circle', { cx: 18, cy: -5, r: 6, fill: '#fff' }, b); E('circle', { cx: 20, cy: -5, r: 3, fill: '#111' }, b); E('circle', { cx: 21, cy: -6, r: 1, fill: '#fff' }, b);
    E('path', { d: 'M26 5 q4 3 7 0', fill: 'none', stroke: '#7c2d12', 'stroke-width': 2, 'stroke-linecap': 'round' }, b);
    return { stopX: 250, offX: 470, ay: function () { return S.season === 'w' ? S.fishW : S.fishS; }, dir: -1 };
  }

  function drawBath(df, VY, VH) {
    var F = VY + VH * 0.80; S.F = F;
    var pat = E('pattern', { id: 'bTile', width: 44, height: 44, patternUnits: 'userSpaceOnUse' }, df); E('rect', { width: 44, height: 44, fill: '#e3f3f0' }, pat); E('path', { d: 'M0 0 H44 M0 0 V44', stroke: '#c5e2dc', 'stroke-width': 2, fill: 'none' }, pat);
    E('rect', { x: -1500, y: -1500, width: 3400, height: F + 1500, fill: 'url(#bTile)' });
    E('rect', { x: -1500, y: F - 8, width: 3400, height: 10, fill: '#b7d7d0' });
    E('rect', { x: -1500, y: F, width: 3400, height: 1500, fill: '#cdb892' });
    E('path', { d: 'M-1500 ' + (F + 30) + ' H1900 M-1500 ' + (F + 70) + ' H1900', stroke: '#b9a27a', 'stroke-width': 2 });
    // Fenster
    E('rect', { x: 150, y: F - 300, width: 70, height: 70, rx: 6, fill: '#bfe3f7', stroke: '#fff', 'stroke-width': 6 }); E('path', { d: 'M185 ' + (F - 300) + ' V' + (F - 230) + ' M150 ' + (F - 265) + ' H220', stroke: '#fff', 'stroke-width': 4 });
    // Waschbecken (links)
    E('rect', { x: 46, y: F - 64, width: 28, height: 64, fill: '#fff', stroke: '#c7d2dc', 'stroke-width': 2.5 });
    E('path', { d: 'M8 ' + (F - 104) + ' H112 Q112 ' + (F - 72) + ' 60 ' + (F - 64) + ' Q8 ' + (F - 72) + ' 8 ' + (F - 104) + ' Z', fill: '#fff', stroke: '#c7d2dc', 'stroke-width': 2.5 });
    E('rect', { x: 15, y: F - 98, width: 90, height: 18, rx: 6, fill: '#8fd3f4', opacity: .9 });
    E('path', { d: 'M60 ' + (F - 104) + ' V' + (F - 128) + ' q0 -10 14 -10 h8', fill: 'none', stroke: '#94a3b8', 'stroke-width': 5, 'stroke-linecap': 'round' });
    E('rect', { id: 'sKrect', x: 118, y: F, width: 60, height: 4, fill: 'none' });
    // Badewanne mit Bernd (rechts)
    var bx = 176;
    E('path', { d: 'M' + bx + ' ' + (F - 108) + ' H394 V' + (F - 44) + ' Q394 ' + (F - 12) + ' 362 ' + (F - 12) + ' H' + (bx + 32) + ' Q' + bx + ' ' + (F - 12) + ' ' + bx + ' ' + (F - 44) + ' Z', fill: '#fff', stroke: '#c7d2dc', 'stroke-width': 3 });
    E('rect', { x: bx + 28, y: F - 12, width: 14, height: 12, fill: '#9aa8b5' }); E('rect', { x: 330, y: F - 12, width: 14, height: 12, fill: '#9aa8b5' });
    actor = E('g', { id: 'sWally' }); flip = E('g', {}, actor); var b = E('g', { id: 'sWb' }, flip);
    place(0, 0); var cx = 292, cy = F - 152;
    E('ellipse', { cx: cx, cy: cy + 50, rx: 48, ry: 22, fill: '#f0bf98' }, b);                       // Schultern
    E('circle', { cx: cx, cy: cy, r: 27, fill: '#f3c9a4', stroke: '#d9a679', 'stroke-width': 2 }, b);  // Kopf
    E('ellipse', { cx: cx - 26, cy: cy + 2, rx: 6, ry: 12, fill: '#c9c9c9' }, b); E('ellipse', { cx: cx + 26, cy: cy + 2, rx: 6, ry: 12, fill: '#c9c9c9' }, b);
    E('path', { d: 'M' + (cx - 20) + ' ' + (cy - 14) + ' q20 -16 40 0', fill: 'none', stroke: '#c9c9c9', 'stroke-width': 3, 'stroke-linecap': 'round' }, b);
    E('circle', { cx: cx - 10, cy: cy - 4, r: 7, fill: '#fff', stroke: '#475569', 'stroke-width': 2.2 }, b); E('circle', { cx: cx + 10, cy: cy - 4, r: 7, fill: '#fff', stroke: '#475569', 'stroke-width': 2.2 }, b);
    E('path', { d: 'M' + (cx - 3) + ' ' + (cy - 4) + ' h6', stroke: '#475569', 'stroke-width': 2 }, b);
    E('circle', { cx: cx - 10, cy: cy - 4, r: 2.4, fill: '#111' }, b); E('circle', { cx: cx + 10, cy: cy - 4, r: 2.4, fill: '#111' }, b);
    E('ellipse', { cx: cx, cy: cy + 8, rx: 14, ry: 5, fill: '#b8b8b8' }, b);                           // Schnauzer
    E('path', { d: 'M' + (cx - 7) + ' ' + (cy + 15) + ' q7 6 14 0', fill: 'none', stroke: '#7f3b2a', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, b);
    E('circle', { cx: cx - 17, cy: cy + 8, r: 4, fill: '#f29b8b', opacity: .6 }, b); E('circle', { cx: cx + 17, cy: cy + 8, r: 4, fill: '#f29b8b', opacity: .6 }, b);
    E('rect', { x: bx + 6, y: F - 82, width: 206, height: 58, rx: 8, fill: '#8fd3f4', opacity: .72 });
    [[218, F - 84, 9], [236, F - 88, 7], [330, F - 86, 10], [348, F - 90, 8], [250, F - 82, 6], [312, F - 82, 7]].forEach(function (c) { E('circle', { cx: c[0], cy: c[1], r: c[2], fill: '#fff', opacity: .92 }); });
    var du = E('g', {}); E('ellipse', { cx: 372, cy: F - 88, rx: 12, ry: 8, fill: '#facc15' }, du); E('circle', { cx: 380, cy: F - 98, r: 6.5, fill: '#facc15' }, du); E('path', { d: 'M385 ' + (F - 98) + ' l7 2 l-7 3 Z', fill: '#f97316' }, du); E('circle', { cx: 382, cy: F - 99, r: 1.3, fill: '#111' }, du);
    // Der Föhn: nur eine Darstellung, er liegt von Anfang an auf dem Boden vor der Badewanne
    function foehn(g) { E('path', { d: 'M-4 18 Q-4 40 -2 48', fill: 'none', stroke: '#1f2937', 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g); E('rect', { x: -2, y: 8, width: 12, height: 28, rx: 5, fill: '#7e22ce' }, g); E('rect', { x: -26, y: -6, width: 50, height: 24, rx: 11, fill: '#a855f7', stroke: '#6b21a8', 'stroke-width': 2 }, g); E('rect', { x: -34, y: -3, width: 12, height: 18, rx: 4, fill: '#d8b4fe', stroke: '#6b21a8', 'stroke-width': 2 }, g); E('circle', { cx: 14, cy: 6, r: 3, fill: '#fde047' }, g); }
    var dm = E('g', { id: 'sFd', transform: 'translate(290 ' + (F + 16) + ') rotate(-4)' }); var fi = E('g', { id: 'sFdi' }, dm); foehn(fi); S.fd = dm; S.fdHome = { x: 290, y: F + 16, r: -4 };
    var fl = E('g', { id: 'sFl', opacity: 0 }); E('text', { x: 60, y: F - 78, 'text-anchor': 'middle', 'font-size': 72 }, fl).textContent = '⚡'; var zt = E('text', { x: 60, y: F - 138, 'text-anchor': 'middle', 'font-size': 28, 'font-weight': 800, fill: '#dc2626' }, fl); zt.textContent = 'ZZZAP!'; S.fl = fl;
    S.flash = E('rect', { x: -1500, y: -1500, width: 3400, height: 3000, fill: '#fff', opacity: 0 });
    return { stopX: 0, offX: 0, ay: function () { return 0; }, dir: 1, still: true };
  }
  var THEMES = {
    pond: { id: 'pond', draw: drawPond, aria: 'Teich mit Wasserläufer' },
    lake: { id: 'lake', draw: drawLake, aria: 'See im Querschnitt mit Fisch', init: function () { if (hasK()) Kolbi.deco(['stopper']); }, done: function () { if (hasK()) Kolbi.deco(null); } },
    bath: { id: 'bath', draw: drawBath, aria: 'Badezimmer mit Badewanne und Waschbecken' }
  };

  function build(theme) {
    T = THEMES[theme] || THEMES.pond; S = {};
    veil = document.createElement('div'); veil.id = 'sceneVeil'; veil.style.display = 'flex';
    veil.innerHTML = '<div class="dots" id="sDots"></div><button id="sceneSkip">Überspringen ⏭</button>' +
      '<svg id="sceneSvg" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + T.aria + '"></svg><div id="sceneBub"></div><div id="sceneHint">Tippe, um weiterzulesen ▸</div>';
    document.body.appendChild(veil);
    svgR = veil.querySelector('svg'); bub = veil.querySelector('#sceneBub'); hint = veil.querySelector('#sceneHint'); dots = veil.querySelector('#sDots');
    var ratio = Math.max(0.8, Math.min(2.4, innerHeight / innerWidth)), VH = 400 * ratio, VY = 300 - VH * 0.52;
    svgR.setAttribute('viewBox', '0 ' + VY.toFixed(1) + ' 400 ' + VH.toFixed(1));
    var df = E('defs', {});
    var g = T.draw(df, VY, VH); T.g = g; S.VH = VH; S.VY = VY;
    if (T.id === 'lake') {
      var u = Math.min(svgR.getBoundingClientRect().width / 400, svgR.getBoundingClientRect().height / VH) || 1, kh = innerWidth <= 700 ? 77 : 96, hU = kh / u;
      S.hU = hU; S.feetS = Math.min(S.Bd - 20, S.Sf + hU + 26); S.feetW = S.Bd - 6; S.fishS = S.feetS - hU * 0.5; S.fishW = S.Bd - hU * 0.5 - 6; S.season = 's';
      svgR.querySelector('#sKrect').setAttribute('y', S.feetS);
    }
    flip.setAttribute('transform', 'scale(' + g.dir + ' 1)'); wdir = g.dir;
    if (T.id !== 'bath') place(g.offX, g.ay());
  }
  function placeK() {
    if (!hasK()) return; var el = svgR.querySelector('#sKrect'), sh = el.getBoundingClientRect(), kh = innerWidth <= 700 ? 77 : 96;
    Kolbi.moveTo(Math.max(0.01, (sh.left + 4) / innerWidth), Math.max(0.05, (sh.top - kh + 6) / innerHeight));
  }
  function moveKrect(x, y) { var el = svgR.querySelector('#sKrect'); el.setAttribute('x', x); if (y !== undefined) el.setAttribute('y', y); placeK(); }
  function showBub(text) {
    bub.innerHTML = text; bub.style.display = 'block';
    var r = actor.getBoundingClientRect(), w = bub.offsetWidth, h = bub.offsetHeight, L = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    bub.style.left = L + 'px'; bub.style.top = Math.max(50, r.top - h - 14) + 'px';
  }
  function setDots() { dots.innerHTML = lines.map(function (_, i) { return '<i' + (i === idx ? ' class="on"' : '') + '></i>'; }).join(''); }
  async function actorTo(x, y, ms) { var x0 = ax, y0 = ay; bob(false); await tween(ms, function (k) { place(x0 + (x - x0) * k, y0 + (y - y0) * k); }); bob(true); }
  function turn(to) { var from = wdir; bob(false); return tween(550, function (k) { var v = from + (to - from) * k; flip.setAttribute('transform', 'scale(' + (Math.abs(v) < 0.04 ? 0.04 * (v < 0 ? -1 : 1) : v).toFixed(3) + ' 1)'); }).then(function () { wdir = to; flip.setAttribute('transform', 'scale(' + to + ' 1)'); bob(true); }); }

  // Eigene Abläufe der Szenen (laufen vor dem Text der Zeile)
  var ACTS = {
    winter: async function () {           // Neumo schwimmt weg, der See friert zu, Kolbi zieht die Jacke an
      await turn(1); await actorTo(470, ay, 1500);
      S.season = 'w'; await tween(1800, function (k) { S.W.setAttribute('opacity', k); });
      if (hasK()) { Kolbi.deco(['stopper', 'jacket']); Kolbi.mood('oops', 3000); }
    },
    fishdown: async function () {         // Neumo schwimmt unten am Grund herein, Kolbi bleibt oben
      place(470, S.fishW); await turn(-1); await actorTo(250, S.fishW, 2000);
    },
    dive: async function () {             // erst jetzt taucht Kolbi zum Grund
      moveKrect(26, S.feetW); await wait(2000);
    },
    shy: async function () { moveKrect(-30, undefined); await wait(1400); },
    call: async function () { moveKrect(118, undefined); await wait(1300); },
    wish: async function () { var f = svgR.querySelector('#sFdi'); f.style.transformBox = 'fill-box'; f.style.transformOrigin = 'center'; f.style.animation = 'spulse .9s ease-in-out 4'; await wait(300); },
    sink: async function () { moveKrect(64, undefined); await wait(1500); },
    drop: async function () {             // derselbe Föhn: vom Boden über das Waschbecken, dann hinein
      var d = S.fd, F = S.F, H = S.fdHome; svgR.querySelector('#sFdi').style.animation = 'none';
      await tween(900, function (k) { d.setAttribute('transform', 'translate(' + (H.x + (60 - H.x) * k).toFixed(1) + ' ' + (H.y + (F - 214 - H.y) * k - Math.sin(k * Math.PI) * 30).toFixed(1) + ') rotate(' + (H.r - 8 * k) + ')'); });
      await tween(520, function (k) { d.setAttribute('transform', 'translate(60 ' + (F - 214 + k * 116) + ') rotate(' + (-12 + 50 * k) + ')'); });
      S.fl.setAttribute('opacity', 1); if (hasK()) Kolbi.mood('dizzy', 1800);
      await tween(300, function (k) { S.flash.setAttribute('opacity', 0.85 * (1 - k)); }); await wait(900); S.fl.setAttribute('opacity', 0);
    },
    back: async function () {             // Kolbi legt den Föhn wieder auf den Boden
      var d = S.fd, H = S.fdHome, F = S.F; moveKrect(118, undefined);
      await tween(1000, function (k) { d.setAttribute('transform', 'translate(' + (60 + (H.x - 60) * k).toFixed(1) + ' ' + ((F - 98) + (H.y - (F - 98)) * k - Math.sin(k * Math.PI) * 40).toFixed(1) + ') rotate(' + (38 + (H.r - 38) * k) + ')'); });
    }
  };

  async function show(i) {
    var l = lines[i], g = gen; busy = true; idx = i; setDots();
    if (l.icon !== undefined && icon) { icon.textContent = l.icon; icon.setAttribute('opacity', l.icon ? 1 : 0); }
    bub.style.display = 'none'; if (hasK()) Kolbi.hush();
    if (l.act === 'enter') { var G = T.g; place(G.offX, G.ay()); await actorTo(G.stopX, G.ay(), 2200); if (g !== gen) return; if (!l.t) { busy = false; return next(); } }
    else if (l.act && ACTS[l.act]) { await ACTS[l.act](); if (g !== gen) return; }
    if (g !== gen) return;
    if (l.t) {
      if (l.w === 'K') { if (hasK()) { Kolbi.line(l.t, 600000, l.m || 'happy'); if (i === 0) setTimeout(function () { if (g === gen && running && idx === 0) Kolbi.line(l.t, 600000, l.m || 'happy'); }, 2300); } else showBub('<b>Kolbi:</b> ' + l.t); }
      else showBub('<b>' + (T.id === 'lake' ? 'Neumo' : T.id === 'bath' ? 'Bernd' : 'Wally') + ':</b> ' + l.t);
    }
    if (l.act === 'leave') { busy = false; hint.textContent = 'Tippe, um die Szene zu beenden ▸'; leaving = true; return; }
    busy = false;
  }
  var leaving = false;
  async function next() {
    if (busy || !running) return;
    if (leaving) { leaving = false; var g = gen; bub.style.display = 'none'; if (hasK()) Kolbi.hush(); busy = true; await turn(1); if (g !== gen) return; await actorTo(470, ay, 1600); if (g === gen) end(); return; }
    if (idx + 1 >= lines.length) return end();
    show(idx + 1);
  }
  function end() {
    if (!running) return; running = false; gen++;
    if (hasK()) { if (T && T.done) T.done(); if (Kolbi.motion) Kolbi.motion(false); Kolbi.hush(); Kolbi.lock(false); Kolbi._idle(0); Kolbi.mood('happy', 1500); }
    if (veil && veil.parentNode) veil.parentNode.removeChild(veil); veil = null; busy = false; leaving = false;
    var f = cb; cb = null; if (f) f();
  }
  async function play(arr, onEnd) {
    if (running) return; running = true; lines = arr; idx = -1; busy = true; leaving = false; gen++; cb = onEnd;
    for (var w = 0; w < 20 && !hasK(); w++) await wait(150);
    build(arr.theme || 'pond');
    veil.addEventListener('click', function (e) { if (e.target.id === 'sceneSkip') return; next(); });
    veil.querySelector('#sceneSkip').addEventListener('click', function (e) { e.stopPropagation(); end(); });
    if (hasK()) { Kolbi.show(); Kolbi.hush(); if (Kolbi.motion) Kolbi.motion(true); Kolbi.lock(true); if (T.init) T.init(); placeK(); }
    var solo = !arr.some(function (l) { return l.w === 'W'; });
    if (solo) { var a0 = svgR.querySelector('#sWally'); if (a0) a0.setAttribute('opacity', 0); }
    bob(!solo && T.id === 'bath' ? false : !solo); await wait(solo ? 700 : 1300); busy = false; show(0);
  }

  // Menü von Kolbi: Szene des aktuellen Moduls noch einmal ansehen
  var reg = {};
  function register(tab, label, fn) { reg[tab] = { label: label, fn: fn }; }
  function applyMenu(tab) { if (!(window.Kolbi && Kolbi.setExtra)) return false; var r = reg[tab]; Kolbi.setExtra(r ? [{ label: r.label, fn: function () { if (!running) r.fn(); } }] : null); return true; }
  document.addEventListener('tabchange', function (e) { var t = e.detail; if (!applyMenu(t)) { var n = 0, tm = setInterval(function () { if (applyMenu(t) || ++n > 30) clearInterval(tm); }, 300); } });

  window.Szene = { play: play, PRO: PRO, EPI: EPI, INTRO: INTRO, DICHTE: DICHTE, BAD: BAD, register: register, running: function () { return running; } };
})();
