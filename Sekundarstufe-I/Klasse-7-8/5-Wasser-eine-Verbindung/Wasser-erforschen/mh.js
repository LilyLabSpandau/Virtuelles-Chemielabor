/* Modul 1: Wasserstoffbrücken. Beschriften, Ziehsimulation, Regel, Anwenden. */
(function () {
  'use strict';
  Prog.add('h', 8);   // 1 Beschriften + 1 mc Schritt 1, Simulation + 1 mc Schritt 2, 2 mc Schritt 3, sortq + 1 mc/gap Schritt 4
  Prog.onFinish('h', function () { $('hmerke').hidden = false; $('hdone').hidden = false; $('hnext').hidden = false; unlock('done'); });

  // ---------------------------------------------------------- Schritte
  var cur = 1;
  function step(n) {
    cur = n;
    Array.prototype.forEach.call(document.querySelectorAll('#hsteps .stp'), function (b) { b.classList.toggle('on', +b.getAttribute('data-s') === n); });
    for (var i = 1; i <= 4; i++) $('hs' + i).classList.toggle('on', i === n);
    document.dispatchEvent(new CustomEvent('hstep', { detail: n }));
  }
  var reached = 1;
  function reach(n) { if (n > reached) { reached = n; refresh(); } }
  function refresh() { Array.prototype.forEach.call(document.querySelectorAll('#hsteps .stp'), function (b) { b.disabled = +b.getAttribute('data-s') > reached; }); }
  refresh();
  $('hsteps').addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.stp') : null; if (b && !b.disabled) step(+b.getAttribute('data-s')); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-hgo]'), function (b) { b.addEventListener('click', function () { var n = +b.getAttribute('data-hgo'); reach(n); step(n); try { window.scrollTo({ top: 0 }); } catch (e) {} }); });
  function open(n, btn) { reach(n); $(btn).hidden = false; }

  // ---------------------------------------------------------- Zeichnen eines Wasser-Moleküls
  var L = 30, HALF = 52.25 * Math.PI / 180, K = '#1e293b', RED = '#dc2626', BLU = '#2563eb';
  function mol(g, o) {   // o: x,y,th,s (Maßstab), labels(bool), lp(bool)
    var s = o.s || 1, x = o.x, y = o.y, th = o.th, Lb = (o.L || L) * s, pts = [];
    [-1, 1].forEach(function (k) { pts.push({ x: x + Lb * Math.cos(th + k * HALF), y: y + Lb * Math.sin(th + k * HALF) }); });
    pts.forEach(function (p) { svgEl('line', { x1: x, y1: y, x2: p.x, y2: p.y, stroke: '#64748b', 'stroke-width': 5 * s, 'stroke-linecap': 'round' }, g); });
    if (o.lp) [-1, 1].forEach(function (k) {   // zwei freie Elektronenpaare auf der Rückseite
      var a = th + Math.PI + k * 0.62, cx = x + 20 * s * Math.cos(a), cy = y + 20 * s * Math.sin(a), px = -Math.sin(a), py = Math.cos(a);
      [-1, 1].forEach(function (j) { svgEl('circle', { cx: cx + j * 4 * s * px, cy: cy + j * 4 * s * py, r: 2.4 * s, fill: K }, g); });
    });
    var O = svgEl('circle', { cx: x, cy: y, r: 13 * s, fill: '#ef4444', stroke: '#991b1b', 'stroke-width': 1.5 }, g);
    var t = svgEl('text', { x: x, y: y + 5 * s, 'text-anchor': 'middle', 'font-size': 14 * s, 'font-weight': 800, fill: '#fff', 'pointer-events': 'none' }, g); t.textContent = 'O';
    var Hs = pts.map(function (p) {
      var c = svgEl('circle', { cx: p.x, cy: p.y, r: 8.5 * s, fill: '#e2e8f0', stroke: '#64748b', 'stroke-width': 1.5 }, g);
      var tt = svgEl('text', { x: p.x, y: p.y + 4 * s, 'text-anchor': 'middle', 'font-size': 11 * s, 'font-weight': 800, fill: K, 'pointer-events': 'none' }, g); tt.textContent = 'H'; return { c: c, p: p };
    });
    return { O: O, H: Hs, pts: pts };
  }
  function lab(g, x, y, txt, col, size) { var t = svgEl('text', { x: x, y: y, 'text-anchor': 'middle', 'font-size': size || 16, 'font-weight': 800, fill: col, 'pointer-events': 'none' }, g); t.textContent = txt; return t; }

  // ---------------------------------------------------------- Schritt 1: beschriften
  (function () {
    var g = $('hmol1'), st = { O: 0, H1: 0, H2: 0 }, M, labs = {};
    var ox = 130, oy = 72, th = Math.PI / 2;
    M = mol(g, { x: ox, y: oy, th: th, s: 1.7, L: 40, lp: true });
    function paint(k, c, p) {
      if (labs[k]) { labs[k].remove(); labs[k] = null; }
      c.setAttribute('stroke-width', st[k] ? 4 : 1.5); c.setAttribute('stroke', st[k] === 1 ? BLU : st[k] === 2 ? RED : (k === 'O' ? '#991b1b' : '#64748b'));
      if (st[k]) labs[k] = lab(g, p.x + (k === 'O' ? 38 : (p.x < ox ? -26 : 26)), p.y + (k === 'O' ? 2 : 8), st[k] === 1 ? 'δ+' : 'δ−', st[k] === 1 ? BLU : RED, 20);
    }
    [['O', M.O, { x: ox, y: oy }], ['H1', M.H[0].c, M.H[0].p], ['H2', M.H[1].c, M.H[1].p]].forEach(function (a) {
      a[1].style.cursor = 'pointer'; a[1].setAttribute('tabindex', 0);
      var fn = function () { st[a[0]] = (st[a[0]] + 1) % 3; paint(a[0], a[1], a[2]); $('hfb1').hidden = true; };
      a[1].addEventListener('click', fn); a[1].addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') fn(); });
    });
    var hint = svgEl('text', { x: 130, y: 178, 'text-anchor': 'middle', 'font-size': 12, fill: '#64748b' }, g); hint.textContent = 'Punkte am O: freie Elektronenpaare';
    var done1 = false, qok1 = false;
    function gate1() { if (done1 && qok1) { $('hgo2').hidden = false; reach(2); } }
    mc($('hq1'), { mod: 'h', q: '<b>a)</b> Welches Atom zieht stärker an den gemeinsamen Elektronen?',
      opts: ['Das Sauerstoff-Atom, weil seine Elektronegativität größer ist (3,5 gegen 2,2).', 'Das Wasserstoff-Atom, weil seine Elektronegativität kleiner ist (2,2 gegen 3,5).', 'Beide gleich stark, weil sie sich in einer Atombindung die Elektronen teilen.', 'Das Atom mit der größeren Masse, also das Wasserstoff-Atom.'], ok: 0,
      why: 'Das Elektronenpaar liegt näher beim O. Dadurch wird O leicht negativ (δ−) und jedes H leicht positiv (δ+).',
      hints: { 1: 'Je größer die EN, desto stärker der Zug. Vergleiche 2,2 mit 3,5.', 2: 'Teilen heißt nicht gleich verteilen. Der Unterschied der EN-Werte entscheidet.', 3: 'Wasserstoff ist das leichteste Atom. Die Masse entscheidet hier nicht.' }, after: function () { qok1 = true; gate1(); } });
    $('hchk1').addEventListener('click', function () {
      var fb = $('hfb1'); fb.hidden = false;
      if (st.O === 2 && st.H1 === 1 && st.H2 === 1) {
        fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. O hat δ−, beide H haben δ+. Das Molekül ist gewinkelt, die Ladungen sind ungleich verteilt: ein <b>Dipol</b>.'; note('Das Sauerstoff-Atom ist δ−, die Wasserstoff-Atome sind δ+. Das Molekül ist ein Dipol.');
        if (!done1) { done1 = true; Prog.done('h'); gate1(); }
      } else { fb.className = 'fb bad'; fb.innerHTML = '✗ Noch nicht ganz. Überlege mit den EN-Werten: Welches Atom zieht die Elektronen näher zu sich, und wird damit negativer?'; }
    });
  })();

  // ---------------------------------------------------------- Schritt 2: Ziehsimulation
  (function () {
    var svg = $('hmol2'), W = 230, H = 165, A = { x: 66, y: 84, th: Math.PI }, B = { x: 168, y: 76, th: 0.2 }, dragging = false, off = null;
    var MINR = 76, solved = false;
    function atoms(m) { return [{ q: -2, x: m.x, y: m.y, t: 'O' }].concat([-1, 1].map(function (k) { return { q: 1, x: m.x + L * Math.cos(m.th + k * HALF), y: m.y + L * Math.sin(m.th + k * HALF), t: 'H' }; })); }
    function energy() { var E = 0; atoms(A).forEach(function (a) { atoms(B).forEach(function (b) { E += a.q * b.q / Math.max(Math.hypot(a.x - b.x, a.y - b.y), 8) * 100; }); }); return E; }
    var EMIN = -0.697;
    function hbond() {   // beste H···O-Brücke (Abstand, Winkel am H)
      var best = null;
      [[A, B], [B, A]].forEach(function (pr) {
        var D = atoms(pr[0]), Ac = atoms(pr[1])[0];
        for (var i = 1; i < 3; i++) {
          var h = D[i], d = Math.hypot(h.x - Ac.x, h.y - Ac.y), v1 = { x: D[0].x - h.x, y: D[0].y - h.y }, v2 = { x: Ac.x - h.x, y: Ac.y - h.y };
          var ang = Math.acos((v1.x * v2.x + v1.y * v2.y) / (Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y))) * 180 / Math.PI;
          if (d <= 60 && ang >= 135 && (!best || d < best.d)) best = { d: d, h: h, o: Ac };
        }
      });
      return best;
    }
    var gL, gB, gOver, showCh = true;
    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svgEl('rect', { x: 0, y: 0, width: W, height: H, rx: 10, fill: '#f1f7ff' }, svg);
      var g = svgEl('g', {}, svg);
      mol(g, { x: A.x, y: A.y, th: A.th, s: 1, lp: true });
      var gb = svgEl('g', { style: 'cursor:grab' }, svg); gB = gb;
      mol(gb, { x: B.x, y: B.y, th: B.th, s: 1, lp: true });
      // Teilladungen
      [A, B].forEach(function (m) {
        if (!showCh) return; var at = atoms(m);
        lab(svg, at[0].x + (m === A ? 4 : 4) * 1, at[0].y - 20, 'δ−', RED, 15);
        at.slice(1).forEach(function (p) { var dx = p.x - m.x, dy = p.y - m.y, n = Math.hypot(dx, dy); lab(svg, p.x + dx / n * 18, p.y + dy / n * 18 + 5, 'δ+', BLU, 14); });
      });
      var hb = hbond();
      if (hb) {
        svgEl('line', { x1: hb.h.x, y1: hb.h.y, x2: hb.o.x, y2: hb.o.y, stroke: '#16a34a', 'stroke-width': 3.5, 'stroke-dasharray': '6 5', 'stroke-linecap': 'round' }, svg);
        var mx = (hb.h.x + hb.o.x) / 2, my = Math.min(hb.h.y, hb.o.y) - 40;
        var r = svgEl('rect', { x: mx - 56, y: my - 12, width: 112, height: 17, rx: 6, fill: '#e8f6ec', stroke: '#16a34a' }, svg); var t = lab(svg, mx, my + 1, 'Wasserstoffbrücke', '#166534', 11.5);
      }
      var E = energy(), sc = Math.max(0, Math.min(1, E / EMIN)), mt = $('hmtxt'), mi = $('hmeter');
      if (E > 0.02) { mi.style.width = Math.min(100, E / 0.6 * 100) + '%'; mi.style.background = '#ef4444'; mt.textContent = 'Abstoßung: die Moleküle schieben sich weg'; mt.style.color = '#b91c1c'; }
      else {
        var p = Math.pow(sc, 0.6); mi.style.width = Math.max(3, p * 100) + '%'; mi.style.background = p > 0.8 ? '#16a34a' : p > 0.45 ? '#84cc16' : '#eab308';
        mt.textContent = p < 0.08 ? 'kaum Anziehung (weit entfernt)' : p < 0.45 ? 'schwache Anziehung' : p < 0.8 ? 'mittlere Anziehung' : 'starke Anziehung'; mt.style.color = '';
      }
      if (hb && !solved) { solved = true; $('hfound').hidden = false; $('hfound').innerHTML = '<b>Gefunden!</b> Ein H-Atom (δ+) zeigt auf das O-Atom (δ−) des anderen Moleküls, auf einer geraden Linie. Das ist die Wasserstoffbrücke (gestrichelt).'; note('Ein H-Atom mit δ+ zeigt auf das O-Atom mit δ− des anderen Moleküls. Das ist die Wasserstoffbrücke.'); Prog.done('h'); }
      if (solved) $('hgo3').hidden = false;
      gb.addEventListener('pointerdown', down);
    }
    function pt(e) { var r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
    function down(e) { dragging = true; var p = pt(e); off = { x: B.x - p.x, y: B.y - p.y }; try { svg.setPointerCapture(e.pointerId); } catch (x) {} e.preventDefault(); }
    svg.addEventListener('pointermove', function (e) {
      if (!dragging) return; var p = pt(e); B.x = Math.max(20, Math.min(W - 20, p.x + off.x)); B.y = Math.max(20, Math.min(H - 20, p.y + off.y));
      var dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy); if (d < MINR) { B.x = A.x + dx / d * MINR; B.y = A.y + dy / d * MINR; }
      draw(); e.preventDefault();
    });
    var up = function () { dragging = false; }; svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    function rot(d) { B.th += d * Math.PI / 12; draw(); }
    $('hrotL').addEventListener('click', function () { rot(-1); }); $('hrotR').addEventListener('click', function () { rot(1); });
    $('hreset').addEventListener('click', function () { B = { x: 168, y: 76, th: 0.2 }; draw(); });
    $('hcharge').addEventListener('change', function () { showCh = this.checked; draw(); });
    draw();
    mc($('hq2'), { mod: 'h', q: '<b>a)</b> Was hast du beobachtet, wenn zwei H-Atome aufeinander zeigen?',
      opts: ['Die Moleküle stoßen sich ab, weil beide δ+ tragen und gleiche Ladungen sich abstoßen.', 'Die Moleküle ziehen sich stark an, weil H-Atome immer eine Brücke bilden.', 'Nichts passiert, weil die Moleküle insgesamt neutral sind und deshalb keine Kraft wirkt.', 'Die Moleküle ziehen sich an, weil das H-Atom das kleinste Atom ist.'], ok: 0,
      why: 'Gleiche Teilladungen stoßen sich ab, ungleiche ziehen sich an. Nur δ+ gegen δ− führt zu einer Anziehung.',
      hints: { 1: 'Probiere es im Experiment aus: Stelle zwei H-Seiten gegenüber und lies die Anzeige.', 2: 'Das Molekül ist zwar insgesamt neutral, aber seine Seiten sind es nicht. Deshalb gibt es Kräfte.', 3: 'Die Größe der Atome entscheidet nicht, sondern die Teilladungen.' } });
  })();

  // ---------------------------------------------------------- Schritt 3: Fragen
  var n3 = 0; function after3() { if (++n3 === 2) { $('hgo4').hidden = false; reach(4); } }
  mc($('hq3'), { mod: 'h', q: '<b>a)</b> Warum bildet ein H-Atom in Methan (CH₄) keine Wasserstoffbrücken?',
    opts: ['Kohlenstoff ist kaum elektronegativer als Wasserstoff. Das H-Atom bekommt deshalb kein deutliches δ+.', 'Methan hat zu viele H-Atome, deshalb kann sich keines von ihnen mit einem anderen Molekül verbinden.', 'Kohlenstoff-Atome sind größer als Sauerstoff-Atome, deshalb verdecken sie die H-Atome.', 'Methan ist ein Gas, und Gase können grundsätzlich keine Anziehung zwischen ihren Molekülen haben.'], ok: 0,
    why: 'Die EN von C (2,5) liegt nahe bei H (2,2). Erst bei O (3,5), N (3,0) oder F (4,0) wird das H-Atom deutlich positiv.',
    hints: { 1: 'Es kommt nicht auf die Zahl der H-Atome an, sondern auf das Atom, an dem sie hängen.', 2: 'Entscheidend ist die Elektronegativität des Partners, nicht die Größe.', 3: 'Auch Gase haben Anziehungskräfte zwischen den Teilchen, nur sind sie schwach.' }, after: after3 });
  mc($('hq3'), { mod: 'h', q: '<b>b)</b> Warum siedet Wasser erst bei 100 °C, obwohl H₂S schon bei −60 °C siedet?',
    opts: ['Zwischen Wasser-Molekülen wirken Wasserstoffbrücken. Man braucht viel Energie, um sie beim Sieden zu lösen.', 'Wasser-Moleküle sind schwerer als H₂S-Moleküle und brauchen deshalb mehr Energie zum Verdampfen.', 'Im Wasser-Molekül sind die Atombindungen zwischen O und H stärker, deshalb siedet es später.', 'Wasser enthält mehr Sauerstoff als H₂S, und Sauerstoff erhöht grundsätzlich die Siedetemperatur.'], ok: 0,
    why: 'Beim Sieden werden die Moleküle voneinander getrennt, nicht zerlegt. Die Wasserstoffbrücken zwischen den Molekülen müssen dafür gelöst werden.',
    hints: { 1: 'H₂S-Moleküle sind sogar schwerer als H₂O-Moleküle. Das erklärt es also nicht.', 2: 'Beim Sieden bleiben die Moleküle ganz. Die Atombindungen im Molekül werden nicht gelöst.', 3: 'Nicht der Sauerstoff als Stoff, sondern die Kräfte zwischen den Molekülen erklären den Unterschied.' }, after: after3 });

  // ---------------------------------------------------------- Schritt 4: Anwenden
  sortq($('hq4'), { mod: 'h', intro: '<b>a)</b> Können sich zwischen den Molekülen des Stoffes Wasserstoffbrücken bilden? Entscheide für jeden Stoff.', btn: ['Ja', 'Nein'],
    items: [
      { lab: 'Wasser H₂O', sub: 'H–O–H', ok: 0, why: 'Die H-Atome hängen am O-Atom.', hint: 'Schau, woran die H-Atome gebunden sind.' },
      { lab: 'Methan CH₄', sub: 'vier H-Atome an einem C-Atom', ok: 1, why: 'Die H-Atome hängen an C, das kaum elektronegativer ist als H.', hint: 'Woran hängen die H-Atome? Ist das Atom O, N oder F?' },
      { lab: 'Ammoniak NH₃', sub: 'drei H-Atome an einem N-Atom, N hat ein freies Elektronenpaar', ok: 0, why: 'H an N (EN 3,0) und ein freies Elektronenpaar am N: Brücken sind möglich.', hint: 'Prüfe die Regel: H an O, N oder F und ein freies Elektronenpaar im anderen Molekül.' },
      { lab: 'Wasserstoff H₂', sub: 'H–H', ok: 1, why: 'Beide Atome sind gleich. Es gibt keine Teilladungen.', hint: 'Zwei gleiche Atome ziehen gleich stark. Gibt es dann Teilladungen?' },
      { lab: 'Methanol CH₃OH', sub: 'ein H-Atom hängt am O-Atom (O–H-Gruppe)', ok: 0, why: 'Das H-Atom an O hat δ+, das O hat freie Elektronenpaare. Die OH-Gruppe bildet Brücken.', hint: 'Nicht alle H-Atome zählen. Eines hängt am O-Atom.' }
    ] });
  gap($('hq4'), { mod: 'h', parts: ['<p class="qt"><b>b)</b> Ergänze den Merksatz.</p>Eine Wasserstoffbrücke entsteht zwischen dem ', { o: ['H-Atom mit δ+', 'O-Atom mit δ+', 'H-Atom mit δ−'], ok: 0 }, ' eines Moleküls und dem Atom mit ', { o: ['freiem Elektronenpaar', 'positiver Ladung', 'Doppelbindung'], ok: 0 },
    ' eines anderen Moleküls. Sie ist eine Anziehung ', { o: ['zwischen', 'in'], ok: 0 }, ' den Molekülen und ', { o: ['schwächer', 'stärker'], ok: 0 }, ' als eine Atombindung.'],
    why: 'Genau so läuft es in Wasser ab: Jedes Molekül ist mit mehreren Nachbarn verbunden.' });
})();
