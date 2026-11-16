/* Modul 3: Tintenkiller. Versuch mit Szene (Kolbi moderiert, Tinto hilft, Rolli holt ihn ab), Strukturformel, Mechanismus, Erklärung. */
(function () {
  'use strict';
  var INKA = Farbe.band(590, 3, 40, 58), INK = Farbe.colorOf(INKA), CLEAR = [234, 244, 251];
  var sceneDone = false, running = false;

  // =============================================================== Stationen
  var stps = Array.prototype.slice.call(document.querySelectorAll('#m3steps .stp'));
  function goStation(id) {
    stps.forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-s') === id); });
    Array.prototype.forEach.call(document.querySelectorAll('.stagepane'), function (p) { p.classList.toggle('on', p.id === id); });
    if (id === 's2') drawDye1(); if (id === 's3') mech(mstep);
  }
  stps.forEach(function (b) { b.addEventListener('click', function () { if (!b.disabled && !running) goStation(b.getAttribute('data-s')); }); });
  function unlock(id) { stps.forEach(function (b) { if (b.getAttribute('data-s') === id) b.disabled = false; }); }
  function mark(id) { stps.forEach(function (b) { if (b.getAttribute('data-s') === id) b.classList.add('ok'); }); }
  function counter(n, fn) { var c = 0; return function () { if (++c >= n) fn(); }; }
  Prog.add('m3', 11);
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
  function pd() { Prog.done('m3'); }

  // =============================================================== Labortisch (SVG)
  var bench = $('benchSvg');
  function buildBench() {
    bench.innerHTML =
      '<defs><clipPath id="bn-c"><path d="M135 66 V160 Q135 168 143 168 H217 Q225 168 225 160 V66 Z"/></clipPath></defs>' +
      '<rect x="0" y="168" width="360" height="32" fill="#a8b6c7"/><rect x="0" y="168" width="360" height="4" fill="#8394a8"/>' +
      // Tintenkiller-Flasche
      '<g><rect x="32" y="104" width="50" height="64" rx="8" fill="#e0f2fe" stroke="#64748b" stroke-width="2.4"/><rect x="47" y="88" width="20" height="18" rx="3" fill="#e0f2fe" stroke="#64748b" stroke-width="2.4"/><rect x="45" y="82" width="24" height="8" rx="3" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/><rect x="38" y="118" width="38" height="34" rx="3" fill="#fff" stroke="#94a3b8"/><text x="57" y="132" font-size="9.5" text-anchor="middle" font-weight="800" fill="#1e293b">Tinten-</text><text x="57" y="143" font-size="9.5" text-anchor="middle" font-weight="800" fill="#1e293b">killer</text><text x="57" y="151" font-size="7" text-anchor="middle" fill="#475569">Sulfit-Lsg.</text></g>' +
      // Säureflasche
      '<g><rect x="278" y="110" width="46" height="58" rx="8" fill="#fef3c7" stroke="#64748b" stroke-width="2.4"/><rect x="291" y="95" width="20" height="17" rx="3" fill="#fef3c7" stroke="#64748b" stroke-width="2.4"/><rect x="289" y="89" width="24" height="8" rx="3" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.6"/><rect x="283" y="124" width="36" height="30" rx="3" fill="#fff" stroke="#94a3b8"/><text x="301" y="137" font-size="9.5" text-anchor="middle" font-weight="800" fill="#1e293b">Säure</text><text x="301" y="148" font-size="7" text-anchor="middle" fill="#475569">verdünnt</text></g>' +
      // Becherglas
      '<g clip-path="url(#bn-c)"><rect id="bnLiq" x="130" y="98" width="100" height="74" fill="rgb(' + INK.join(',') + ')"/><path d="M135 98 H225" stroke="#fff" stroke-opacity=".6" stroke-width="2"/></g>' +
      '<path d="M135 66 V160 Q135 168 143 168 H217 Q225 168 225 160 V66" fill="none" stroke="#475569" stroke-width="3.4" stroke-linejoin="round"/><path d="M128 66 H232" stroke="#475569" stroke-width="3.4" stroke-linecap="round"/>' +
      '<path d="M135 90 h10 M135 112 h10 M135 134 h10" stroke="#64748b" stroke-width="1.8"/><path d="M143 74 V158" stroke="#fff" stroke-opacity=".5" stroke-width="3.4" stroke-linecap="round"/>' +
      '<text x="180" y="188" font-size="11" text-anchor="middle" font-weight="700" fill="#334155" id="bnLab">blaue Tinte (Farbstoff-Lösung)</text>' +
      // Pipette (wird für die Zugabe eingeblendet)
      '<g id="pip" opacity="0" transform="translate(0,-30)"><rect x="172" y="-4" width="16" height="16" rx="7" fill="#f87171" stroke="#7f1d1d" stroke-width="1.6"/><path d="M176 12 H184 V52 L180 62 L176 52 Z" fill="#e0f2fe" fill-opacity=".85" stroke="#64748b" stroke-width="1.8"/><circle id="pdrop" cx="180" cy="66" r="3.6" fill="#94a3b8" opacity="0"/><text id="pipLab" x="196" y="30" font-size="11" font-weight="800" fill="#1e293b"></text></g>';
  }
  function setLiq(t) {   // t = 1: Tinte, 0: farblos
    var c = [0, 1, 2].map(function (i) { return Math.round(CLEAR[i] + (INK[i] - CLEAR[i]) * t); });
    $('bnLiq').setAttribute('fill', 'rgb(' + c.join(',') + ')');
    $('bnLab').textContent = t > 0.7 ? 'blaue Tinte (Farbstoff-Lösung)' : t < 0.15 ? 'farblose Lösung' : 'die Farbe verschwindet …';
  }
  buildBench(); setLiq(1);

  // =============================================================== Szene
  var S = { abort: false, rej: [], gen: 0 };
  function bg(p) { p.catch(function () {}); return p; }
  function wait(ms) { return new Promise(function (res, rej) { if (S.abort) return rej('abort'); S.rej.push(rej); setTimeout(res, ms); }); }
  function tween(ms, fn) {
    var gen = S.gen;
    return new Promise(function (res, rej) {
      S.rej.push(rej); var t0 = performance.now();
      (function step(now) { if (S.abort || gen !== S.gen) return rej('abort'); var k = Math.min(1, (now - t0) / ms); fn(k * k * (3 - 2 * k)); if (k < 1) requestAnimationFrame(step); else res(); })(t0);
    });
  }
  function race(p) { return Promise.race([p, new Promise(function (res, rej) { S.rej.push(rej); })]); }
  var hasK = function () { return !!(window.Kolbi && Kolbi.lock && Kolbi.line); };
  function readMs(html) { return Math.max(2400, 1300 + html.replace(/<[^>]*>/g, '').length * 52); }
  function K(text, mood) {            // Kolbi spricht
    Gaeste.hush();
    var ms = readMs(text);
    if (hasK()) Kolbi.line(text, ms + 300, mood || 'happy');
    return wait(ms);
  }
  function Tt(a, text, mood) { if (hasK()) Kolbi.hush(); return race(a.say(text, readMs(text), mood)); }

  async function pipette(reagent) {
    var pip = $('pip'), col = reagent === 'kill' ? '#7dd3fc' : '#fcd34d';
    $('pipLab').textContent = reagent === 'kill' ? 'Tintenkiller' : 'Säure'; $('pdrop').setAttribute('fill', col);
    await tween(500, function (k) { pip.setAttribute('opacity', k); pip.setAttribute('transform', 'translate(0,' + (-30 + 30 * k) + ')'); });
    for (var i = 0; i < 3; i++) {
      var d = $('pdrop'); d.setAttribute('opacity', 1);
      await tween(380, function (k) { d.setAttribute('cy', 66 + 34 * k); });
      d.setAttribute('opacity', 0); d.setAttribute('cy', 66);
    }
    await tween(400, function (k) { pip.setAttribute('opacity', 1 - k); pip.setAttribute('transform', 'translate(0,' + (-30 * k) + ')'); });
  }
  function cleanup() {
    Gaeste.clear(); if (hasK()) { Kolbi.hush(); Kolbi.lock(false); Kolbi._idle(0); Kolbi.mood('happy', 1500); }
    var v = $('sceneVeil'); if (v) v.style.display = 'none';
    $('skipBtn').style.display = 'none'; $('m3start').disabled = false; running = false;
    var pip = $('pip'); pip.setAttribute('opacity', 0); setLiq(1);
    S.rej = [];
  }
  function veil() {
    var v = $('sceneVeil');
    if (!v) { v = document.createElement('div'); v.id = 'sceneVeil'; v.style.cssText = 'position:fixed;inset:0;z-index:8000;background:rgba(15,23,42,.18);touch-action:none;'; document.body.appendChild(v); ['touchmove', 'wheel'].forEach(function (e) { v.addEventListener(e, function (ev) { ev.preventDefault(); }, { passive: false }); }); }
    v.style.display = 'block';
  }
  async function scene() {
    if (running) return; running = true; S.abort = false; S.rej = []; S.gen++;
    $('m3start').disabled = true; $('m3hint').textContent = 'Die Szene läuft …';
    // Kolbi bereitstellen (wartet kurz, falls das Skript noch lädt)
    for (var w = 0; w < 20 && !hasK(); w++) await new Promise(function (r) { setTimeout(r, 150); });
    if (hasK()) { Kolbi.show(); Kolbi.hush(); }
    $('benchBox').scrollIntoView({ block: 'center' }); await new Promise(function (r) { setTimeout(r, 450); });
    veil(); $('skipBtn').style.display = 'inline-block';
    var fl = $('floor').getBoundingClientRect(), sz = Gaeste.size(), vw = innerWidth;
    var kh = vw <= 700 ? 77 : 96, kw = vw <= 700 ? 62 : 78;
    var yT = fl.bottom - sz.h - 2, xK = fl.left + fl.width * 0.08, xT = fl.left + fl.width * (vw <= 700 ? 0.42 : 0.46), xR = Math.min(vw - sz.w - 8, xT + sz.w + 12);
    var T = null, R = null;
    try {
      if (hasK()) { Kolbi.lock(true); Kolbi.moveTo(Math.max(0.01, xK / vw), Math.max(0.05, (fl.bottom - kh - 4) / innerHeight)); }
      await wait(1400);
      await K('Moderationsmodus an! Bei diesem Versuch führe ich dich selbst durch. Ich lasse mich dabei nicht antippen oder verschieben, schau einfach zu.', 'excited');
      T = Gaeste.actor('T'); T.place(vw + 20, yT); T.mood('surprised');
      T.walkTo(xT, yT, 2600); await wait(2700);
      T.hop(); await Tt(T, 'Hä? Wo bin ich denn jetzt gelandet? Eben war ich doch noch auf der Pinnwand! Und wo ist Rolli?!', 'surprised');
      await K('Willkommen, Tinto! Keine Panik, du bist in einem Chemielabor. Ich bin Kolbi. Rolli ist bestimmt nicht weit.', 'happy');
      await Tt(T, 'Ein Chemielabor? Mit Tinte kenne ich mich aus, aber mit Kolben und Bechergläsern … Was soll ich hier?', 'interested');
      await K('Du kommst wie gerufen: In deiner Tinte steckt ein Triphenylmethanfarbstoff. Wir zeigen jetzt, was ein Tintenkiller damit macht, und du darfst dabei sein.', 'interested');
      await Tt(T, 'Tintenkiller?! Das klingt gefährlich für ein Tintenfass …', 'oops');
      await K('Keine Sorge, es tut nicht weh. Du wirst nur kurz farblos, und danach bekommst du deine Farbe zurück. Hilfst du uns?', 'love');
      await Tt(T, 'Na gut … für die Wissenschaft!', 'excited');
      await K('Danke, Tinto, das ist wirklich mutig! Also los: ein paar Tropfen Tintenkiller ins Becherglas.', 'excited');
      if (hasK()) Kolbi.hush();
      await pipette('kill');
      var fade = bg(tween(3800, function (k) { setLiq(1 - k); }));
      await wait(900); T.mood('oops'); var tf = bg(race(T.fadeInk(0, 3200)));
      await fade; await tf;
      T.mood('dizzy');
      await Tt(T, 'Huch! Mir wird ganz anders … meine Farbe! Ich bin ja durchsichtig!', 'dizzy');
      await K('Ganz ruhig, Tinto, atme tief durch. Bei dir läuft dieselbe Reaktion ab wie im Becherglas: Der Farbstoff reagiert mit dem Sulfit zu einer farblosen Verbindung. Du bist nicht kaputt.', 'love');
      await Tt(T, 'Wirklich? Ich fühle mich so leer …', 'sad');
      await K('Wirklich. Und die Reaktion ist umkehrbar: Ein Spritzer Säure wandelt die Sulfit-Ionen um, und der Farbstoff kommt zurück. Warum, klären wir gleich genauer.', 'interested');
      if (hasK()) Kolbi.hush();
      await pipette('acid');
      var back = bg(tween(3600, function (k) { setLiq(k); }));
      await wait(700); T.mood('excited'); var tb = bg(race(T.fadeInk(1, 3000)));
      await back; await tb;
      await Tt(T, 'Ich bin wieder blau! Danke, Kolbi, ohne dich hätte ich mich richtig gefürchtet.', 'love');
      await K('Ich habe zu danken, Tinto. Ohne dich wäre der Versuch nur halb so anschaulich gewesen. Du wirst bestimmt schon vermisst … oh, da kommt jemand!', 'excited');
      R = Gaeste.actor('R'); R.place(vw + 20, yT); R.mood('excited'); R.walkTo(xR, yT, 2200); await wait(2300);
      await Tt(R, 'Tinto! Da bist du ja! Ich habe dich überall gesucht!', 'excited');
      await Tt(T, 'Rolli! Stell dir vor, ich war in einem Chemielabor! Und ich war kurz durchsichtig!', 'excited');
      await Tt(R, 'Du warst was? Das erzählst du mir auf dem Rückweg. Danke, dass du dich um ihn gekümmert hast, Kolbi!', 'wink');
      await K('Gern geschehen! Tschüss, ihr beiden!', 'happy');
      if (hasK()) Kolbi.hush(); Gaeste.hush();
      T.mood('happy'); R.mood('happy');
      var out = vw + 40;
      await race(Promise.all([T.walkTo(out, yT, 3000), wait(500).then(function () { return R.walkTo(out + sz.w, yT, 3000); })]));
      T.remove(); R.remove(); T = R = null;
      await K('So, jetzt bin ich wieder ganz für dich da. Tippe mich an, wenn du Hilfe brauchst. Die Szene kannst du über mein Menü jederzeit noch einmal ansehen.', 'happy');
    } catch (e) { if (e !== 'abort') { try { console.error(e); } catch (x) {} } }
    var first = !sceneDone; sceneDone = true; S.gen++;
    cleanup();
    $('m3hint').textContent = 'Fertig. Du kannst die Szene über Kolbis Menü noch einmal ansehen.';
    $('m3start').textContent = '▶ Szene noch einmal';
    $('m3obs').hidden = false;
    if (first) setTimeout(function () { $('m3obs').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
  }
  $('m3start').addEventListener('click', scene);
  $('skipBtn').addEventListener('click', function () { S.abort = true; S.rej.forEach(function (f) { try { f('abort'); } catch (e) {} }); });

  // ---- Beobachtung
  var q1 = counter(1, function () { mark('s1'); unlock('s2'); pd(); });
  mc($('m3q1'), { q: 'Was hast du im Versuch beobachtet?', opts: ['Die blaue Lösung wird farblos. Nach Zugabe von Säure kommt die Farbe zurück.', 'Die blaue Lösung wird dunkler und trübt sich.', 'Die blaue Lösung wird farblos und bleibt es auch nach Säurezugabe.', 'Die Lösung ändert ihre Farbe nicht, nur der Geruch ändert sich.'], ok: 0,
    why: 'Der Farbstoff ist nicht zerstört worden. Er liegt nach dem Tintenkiller in einer farblosen Form vor und lässt sich zurückgewinnen. Die entscheidende Frage lautet: Was passiert dabei im Molekül?', hints: { 1: 'Schau dir die Szene noch einmal an. Du kannst sie über „Szene noch einmal“ wiederholen.', 2: 'Nach dem Spritzer Säure war die Lösung wieder blau.', 3: 'Die Farbe hat sich sehr deutlich verändert.' }, after: q1 });

  // =============================================================== Strukturformel
  var KOL = 26, RR = 22, ARMS = [-90, 30, 150], INKC = '#1e293b';
  function P(x, y) { return x.toFixed(1) + ' ' + y.toFixed(1); }
  function ln(a, b, w, col, dash) { return '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + (col || INKC) + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round"' + (dash ? ' ' + dash : '') + '/>'; }
  function inner(a, b, c, off, sh) {   // parallele Linie innen am Ring
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = c[0] - mx, dy = c[1] - my, L = Math.sqrt(dx * dx + dy * dy), ox = dx / L * off, oy = dy / L * off;
    var vx = b[0] - a[0], vy = b[1] - a[1];
    return ln([a[0] + ox + vx * sh, a[1] + oy + vy * sh], [b[0] + ox - vx * sh, b[1] + oy - vy * sh]);
  }
  function para(a, b, off) {   // zwei parallele Linien (exocyclische Doppelbindung)
    var vx = b[0] - a[0], vy = b[1] - a[1], L = Math.sqrt(vx * vx + vy * vy), nx = -vy / L * off, ny = vx / L * off;
    return ln([a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny]) + ln([a[0] - nx, a[1] - ny], [b[0] - nx, b[1] - ny]);
  }
  function geo(th) {
    var a = th * Math.PI / 180, u = [Math.cos(a), Math.sin(a)], c = [u[0] * (KOL + RR), u[1] * (KOL + RR)], v = [], k, f;
    for (k = 0; k < 6; k++) { f = (th + 180 + 60 * k) * Math.PI / 180; v.push([c[0] + RR * Math.cos(f), c[1] + RR * Math.sin(f)]); }
    var N = [v[3][0] + u[0] * 24, v[3][1] + u[1] * 24], m1a = (th + 60) * Math.PI / 180, m2a = (th - 60) * Math.PI / 180;
    return { u: u, c: c, v: v, N: N, m1: [N[0] + 21 * Math.cos(m1a), N[1] + 21 * Math.sin(m1a)], m2: [N[0] + 21 * Math.cos(m2a), N[1] + 21 * Math.sin(m2a)] };
  }
  function mlab(N, m, bondEnd) {   // Methylgruppe: das C-Atom steht immer am Stickstoff
    var dx = m[0] - N[0], vert = Math.abs(dx) < 4, t, x = m[0], y = m[1] + 4, an;
    if (vert) { t = 'CH₃'; an = 'middle'; y = m[1] + (m[1] > N[1] ? 13 : -4); }
    else if (dx < 0) { t = 'H₃C'; an = 'end'; x = m[0] + 1; }
    else { t = 'CH₃'; an = 'start'; x = m[0] - 1; }
    return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" font-size="12" text-anchor="' + an + '" fill="' + INKC + '">' + t + '</text>';
  }
  function shorten(a, b, d) { var vx = b[0] - a[0], vy = b[1] - a[1], L = Math.sqrt(vx * vx + vy * vy); return [b[0] - vx / L * d, b[1] - vy / L * d]; }
  function armSVG(th, quin) {
    var g = geo(th), s = '', v = g.v, c = g.c, ctr = [0, 0];
    s += quin ? para(ctr, v[0], 2.3) : ln(ctr, v[0]);
    var dbls = quin ? [[1, 2], [4, 5]] : [[0, 1], [2, 3], [4, 5]];
    for (var k = 0; k < 6; k++) s += ln(v[k], v[(k + 1) % 6]);
    dbls.forEach(function (p) { s += inner(v[p[0]], v[p[1]], c, 4.6, 0.16); });
    s += quin ? para(v[3], g.N, 2.3) : ln(v[3], g.N);
    var e1 = Math.abs(g.m1[0] - g.N[0]) < 4 ? shorten(g.N, g.m1, 8) : shorten(g.N, g.m1, 4), e2 = Math.abs(g.m2[0] - g.N[0]) < 4 ? shorten(g.N, g.m2, 8) : shorten(g.N, g.m2, 4);
    s += ln(g.N, e1) + ln(g.N, e2) + mlab(g.N, g.m1) + mlab(g.N, g.m2);
    if (!quin) {   // freies Elektronenpaar am Stickstoff (zeigt in die Lücke zwischen den Methylgruppen)
      var px = -g.u[1], py = g.u[0], cx = g.N[0] + g.u[0] * 13, cy = g.N[1] + g.u[1] * 13;
      s += '<circle cx="' + (cx + px * 3.4).toFixed(1) + '" cy="' + (cy + py * 3.4).toFixed(1) + '" r="2" fill="#dc2626"/><circle cx="' + (cx - px * 3.4).toFixed(1) + '" cy="' + (cy - py * 3.4).toFixed(1) + '" r="2" fill="#dc2626"/>';
    }
    return s;
  }
  function atomLab(p, t) { return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="9" fill="#fff"/><text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 5).toFixed(1) + '" font-size="14" font-weight="700" text-anchor="middle" fill="' + INKC + '">' + t + '</text>'; }
  function plus(p, dx, dy, txt) {
    return '<circle cx="' + (p[0] + dx).toFixed(1) + '" cy="' + (p[1] + dy).toFixed(1) + '" r="9" fill="#fde68a" stroke="#ca8a04" stroke-width="1.6"/><text x="' + (p[0] + dx).toFixed(1) + '" y="' + (p[1] + dy + 5).toFixed(1) + '" font-size="15" font-weight="800" text-anchor="middle" fill="#92400e">' + (txt || '+') + '</text>';
  }
  function hex(g, col) { return '<polygon points="' + g.v.map(function (p) { return P(p[0], p[1]); }).join(' ') + '" fill="' + col + '" stroke="' + col + '" stroke-width="6" stroke-linejoin="round"/>'; }
  var SEPCOL = ['rgba(20,184,166,.33)', 'rgba(249,115,22,.33)', 'rgba(168,85,247,.33)'];
  // opts: pi ('all' | 'sep' | null), gf (0 = Kation, 1–3 = Grenzformel mit Ladung am N von Arm gf), state ('cation'|'attack'|'adduct')
  function dye(svg, o) {
    var s = '<defs><marker id="dm-' + svg.id + '" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#dc2626"/></marker></defs>', i, geos = ARMS.map(geo);
    // Hintergrund: Delokalisierung
    if (o.pi === 'all') {
      s += '<g>'; ARMS.forEach(function (th, k) { var g = geos[k]; s += hex(g, 'rgba(37,99,235,.26)'); s += '<line x1="0" y1="0" x2="' + g.N[0].toFixed(1) + '" y2="' + g.N[1].toFixed(1) + '" stroke="rgba(37,99,235,.26)" stroke-width="22" stroke-linecap="round"/>'; s += '<circle cx="' + g.N[0].toFixed(1) + '" cy="' + g.N[1].toFixed(1) + '" r="13" fill="rgba(37,99,235,.26)"/>'; }); s += '<circle cx="0" cy="0" r="15" fill="rgba(37,99,235,.26)"/></g>';
    } else if (o.pi === 'sep') {
      ARMS.forEach(function (th, k) { var g = geos[k]; s += hex(g, SEPCOL[k]); s += '<line x1="' + g.v[3][0].toFixed(1) + '" y1="' + g.v[3][1].toFixed(1) + '" x2="' + g.N[0].toFixed(1) + '" y2="' + g.N[1].toFixed(1) + '" stroke="' + SEPCOL[k] + '" stroke-width="20" stroke-linecap="round"/><circle cx="' + g.N[0].toFixed(1) + '" cy="' + g.N[1].toFixed(1) + '" r="13" fill="' + SEPCOL[k] + '"/>'; });
    }
    var gf = o.gf || 0;
    ARMS.forEach(function (th, k) { s += armSVG(th, gf === k + 1); });
    var adduct = o.state === 'adduct';
    if (adduct) {   // Keil nach unten zum Sulfonat
      s += '<polygon points="-4,2 4,2 6,40 -6,40" fill="' + INKC + '"/>';
    }
    s += atomLab([0, 0], 'C');
    geos.forEach(function (g) { s += atomLab(g.N, 'N'); });
    if (o.state !== 'adduct' && gf === 0) s += plus([0, 0], 15, -14);
    if (gf > 0) s += plus(geos[gf - 1].N, 14 * geos[gf - 1].u[0] + 2, 14 * geos[gf - 1].u[1] - 2);
    if (adduct) {
      s += '<rect x="-30" y="42" width="60" height="26" rx="8" fill="#fff" stroke="#0e7490" stroke-width="2"/><text x="0" y="60" font-size="14" font-weight="800" text-anchor="middle" fill="#0e7490">SO₃⁻</text>';
      s += '<text x="30" y="-12" font-size="13" font-weight="800" fill="#0e7490">sp³</text>';
    } else if (o.state === 'attack') {
      s += '<text x="0" y="83" font-size="10" text-anchor="middle" fill="#dc2626" font-weight="800">••</text><rect x="-32" y="86" width="64" height="26" rx="8" fill="#fff" stroke="#dc2626" stroke-width="2"/><text x="0" y="104" font-size="14" font-weight="800" text-anchor="middle" fill="#dc2626">SO₃²⁻</text>';
      s += '<path d="M10 82 C34 62 34 34 8 14" fill="none" stroke="#dc2626" stroke-width="2.6" marker-end="url(#dm-' + svg.id + ')"/>';
      s += '<text x="0" y="128" font-size="11" text-anchor="middle" fill="#dc2626" font-weight="700">Nucleophil</text><text x="26" y="-12" font-size="13" font-weight="800" fill="#92400e">sp²</text>';
    } else if (gf === 0) {
      s += '<text x="30" y="-12" font-size="13" font-weight="800" fill="#92400e">sp²</text>';
    }
    svg.innerHTML = s;
  }

  // ---- Station 2
  var piOn = false, gfK = 0;
  var GFTXT = ['Das Kation: Die positive Ladung steht formal am zentralen C-Atom. Es hat nur sechs Valenzelektronen und ein leeres p-Orbital.',
    'Grenzformel 1: Das freie Elektronenpaar des oberen N-Atoms rückt in das System. Die Ladung steht jetzt am N (N⁺=C) und der obere Ring ist chinoid.',
    'Grenzformel 2: Dieselbe Verschiebung beim N-Atom rechts unten. Die Ladung steht dort am N.',
    'Grenzformel 3: Dieselbe Verschiebung beim N-Atom links unten. Die drei Formeln sind gleichwertig: Die Ladung ist über das ganze Molekül verteilt.'];
  function drawDye1() { dye($('dye1'), { pi: piOn ? 'all' : null, gf: gfK, state: 'cation' }); $('dyeTxt').textContent = gfK ? GFTXT[gfK] : GFTXT[0] + (piOn ? ' Blau unterlegt: das delokalisierte π-System über 22 Atome.' : ''); $('dyePi').classList.toggle('on', piOn); }
  $('dyePi').addEventListener('click', function () { piOn = !piOn; drawDye1(); });
  $('dyeGf').addEventListener('click', function () { gfK = (gfK + 1) % 4; drawDye1(); });
  var q2 = counter(3, function () { mark('s2'); unlock('s3'); });
  mc($('m3q2'), { q: '<b>1.</b> Wie viele Atome gehören zum durchgehend konjugierten π-System des Kations? (zentrales C, die drei Ringe, die drei N-Atome)', opts: ['19', '22', '25', '10'], ok: 1, why: '1 (zentrales C) + 3 · 6 (Ring-C) + 3 (N) = 22 Atome.', hints: { 0: 'Vergiss die drei Stickstoff-Atome nicht, ihre freien Elektronenpaare gehören dazu.', 2: 'Zähle noch einmal: Die Methylgruppen sind nicht konjugiert.', 3: 'Das ist nur ein Ring plus Zentrum.' }, mod: 'm3', after: q2 });
  mc($('m3q2'), { q: '<b>2.</b> Welche Rolle spielen die drei –N(CH₃)₂-Gruppen im Sinne von Modul 2?', opts: ['Sie sind Auxochrome (+M). Ihre freien Elektronenpaare vergrößern die Delokalisierung und vertiefen die Farbe.', 'Sie sind Antiauxochrome (−M) und machen die Farbe heller.', 'Sie haben keinen Einfluss, nur die Ringe bestimmen die Farbe.', 'Sie sind das Chromophor und die Ringe sind Auxochrome.'], ok: 0, why: 'Genau wie die –N(CH₃)₂-Gruppe in der Kette aus Modul 2: Der Donator verlängert das delokalisierte System bis zum Stickstoff.', hints: { 1: 'Stickstoff mit freiem Elektronenpaar ist ein Donator, kein Akzeptor.', 2: 'Schau auf die Grenzformeln: Die Ladung wandert bis zu den N-Atomen, sie gehören also zum System.', 3: 'Das Chromophor ist hier das gesamte Triphenylmethan-Kation, die Donatoren sind die Auxochrome.' }, mod: 'm3', after: q2 });
  mc($('m3q2'), { q: '<b>3.</b> Warum ist das Kation farbig? (Modul 1)', opts: ['Das π-System ist sehr groß, ΔE ist klein, deshalb liegt das Absorptionsmaximum im sichtbaren Bereich (etwa 590 nm).', 'Das Kation ist positiv geladen. Alle Kationen sind farbig.', 'Die Methylgruppen absorbieren gelbes Licht.', 'Die Stickstoff-Atome sind farbig.'], ok: 0, why: 'Etwa 590 nm entspricht gelb-orangem Licht. Es wird absorbiert, die Tinte erscheint blau.', hints: { 1: 'Es gibt viele farblose Kationen, zum Beispiel Na⁺.', 2: 'Die Methylgruppen gehören nicht zum konjugierten System.', 3: 'Nicht die einzelnen Atome, sondern das gesamte delokalisierte System bestimmt die Farbe.' }, mod: 'm3', after: q2 });

  // ---- Station 3
  var mstep = 0, MH = ['Schritt 1: Ausgangslage', 'Schritt 2: Der Angriff', 'Schritt 3: Die neue Bindung', 'Schritt 4: Die Folge für die Farbe'];
  var MT = [
    'Das Farbstoff-Kation ist planar. Das zentrale C-Atom ist sp²-hybridisiert, sein leeres p-Orbital gehört zum π-System. Die Ladung ist über drei Ringe bis zu den N-Atomen delokalisiert. Das riesige System absorbiert gelb-oranges Licht bei etwa 590 nm: Die Tinte erscheint blau.',
    'Sulfit-Ionen sind Nucleophile: Das Schwefelatom trägt ein freies Elektronenpaar. Das zentrale C-Atom ist durch die positive Ladung ein Elektrophil. Das freie Elektronenpaar greift am zentralen C-Atom an (roter Pfeil).',
    'Es entsteht eine neue C–S-Bindung. Das zentrale C-Atom hat jetzt vier σ-Bindungen und ist sp³-hybridisiert (tetraedrisch). Es besitzt kein leeres p-Orbital mehr. Die positive Ladung ist verschwunden: Das Produkt ist ein Sulfonat-Anion.',
    'Das sp³-C-Atom unterbricht die Konjugation. Aus einem großen π-System werden drei kleine, voneinander getrennte (farbig unterlegt). Jedes für sich ähnelt einem Anilin. ΔE ist jetzt groß, das Absorptionsmaximum liegt im UV. Im sichtbaren Bereich wird kein Licht mehr absorbiert: Die Lösung ist farblos (extrem hypsochromer Effekt).'];
  function mech(i) {
    mstep = Math.max(0, Math.min(3, i));
    dye($('dye2'), mstep === 0 ? { pi: 'all', gf: 0, state: 'cation' } : mstep === 1 ? { pi: 'all', gf: 0, state: 'attack' } : mstep === 2 ? { pi: null, gf: 0, state: 'adduct' } : { pi: 'sep', gf: 0, state: 'adduct' });
    $('mHead').textContent = MH[mstep]; $('mTxt').textContent = MT[mstep]; $('mNo').textContent = (mstep + 1) + ' / 4';
    $('mPrev').disabled = mstep === 0; $('mNext').disabled = mstep === 3;
  }
  $('mPrev').addEventListener('click', function () { mech(mstep - 1); }); $('mNext').addEventListener('click', function () { mech(mstep + 1); });
  var q3 = counter(2, function () { mark('s3'); unlock('s4'); });
  mc($('m3q3'), { q: '<b>1.</b> Welches Teilchen ist beim Angriff das Nucleophil, und wo greift es an?', opts: ['Das Sulfit-Ion greift am zentralen C-Atom an.', 'Das Sulfit-Ion greift am Stickstoff-Atom an.', 'Der Farbstoff greift am Schwefel des Sulfit-Ions an.', 'Das Wasser greift am Methylkohlenstoff an.'], ok: 0, why: 'Nucleophile suchen positive Stellen. Die größte positive (Teil-)Ladung sitzt am zentralen C-Atom.', hints: { 1: 'Am Stickstoff sitzt zwar auch ein Teil der Ladung (Grenzformeln), das zentrale C-Atom ist aber das elektrophile Zentrum.', 2: 'Das Sulfit-Ion hat das freie Elektronenpaar, es ist das Nucleophil und greift an.', 3: 'Wasser spielt hier keine Rolle.' }, mod: 'm3', after: q3 });
  mc($('m3q3'), { q: '<b>2.</b> Was passiert mit dem zentralen C-Atom und dem π-System?', opts: ['Das C-Atom wird sp³-hybridisiert. Die Konjugation wird unterbrochen und das große π-System zerfällt in drei kleine.', 'Das C-Atom bleibt sp²-hybridisiert, das π-System wird noch größer.', 'Das C-Atom wird sp-hybridisiert und bildet eine Dreifachbindung.', 'Die Ringe brechen auf und es entstehen Alkene.'], ok: 0, why: 'Ohne p-Orbital am zentralen C-Atom gibt es keine Verbindung zwischen den drei Ringen mehr. Schau dir dazu Schritt 4 an: ΔE wird groß.', hints: { 1: 'Nach dem Angriff hat das zentrale C-Atom vier σ-Bindungen, das ist sp³.', 2: 'Vier Bindungspartner bedeuten sp³, nicht sp.', 3: 'Die aromatischen Ringe bleiben erhalten.' }, mod: 'm3', after: q3 });

  // ---- Station 4
  var q4 = counter(5, function () { mark('s4'); });   // 3 Lückentexte + 2 Transferfragen
  var gb = $('m3gap');
  function sub(t) { var d = document.createElement('div'); d.style.cssText = 'margin-bottom:12px'; gb.appendChild(d); return d; }
  gap(sub(), { mod: 'm3', after: q4, why: 'So sieht eine saubere Erklärung des Farbstoffs aus.', parts: ['<b>A (Der Farbstoff):</b> Im Farbstoff-Kation ist das zentrale C-Atom ', { o: ['sp³', 'sp²'], ok: 1 }, '-hybridisiert. Das π-Elektronensystem ist über ', { o: ['drei Ringe und die N-Atome', 'nur einen Ring'], ok: 0 }, ' ', { o: ['delokalisiert', 'lokalisiert'], ok: 0 }, '. ΔE ist ', { o: ['klein', 'groß'], ok: 0 }, ', deshalb wird sichtbares Licht absorbiert. Die drei –N(CH₃)₂-Gruppen sind ', { o: ['Auxochrome (+M)', 'Antiauxochrome (−M)'], ok: 0 }, ' und vertiefen die Farbe.'] });
  gap(sub(), { mod: 'm3', after: q4, why: 'Nucleophil gegen Elektrophil: Die Reaktion folgt der Ladung.', parts: ['<b>B (Der Angriff):</b> Das Sulfit-Ion ist ein ', { o: ['Elektrophil', 'Nucleophil'], ok: 1 }, ' und greift am ', { o: ['zentralen C-Atom', 'Stickstoff-Atom'], ok: 0 }, ' an, weil dort die ', { o: ['negative', 'positive'], ok: 1 }, ' (Teil-)Ladung sitzt.'] });
  gap(sub(), { mod: 'm3', after: q4, why: 'Eine sehr gute Erklärung: Die Struktur bestimmt die Farbe.', parts: ['<b>C (Die Folge):</b> Durch die neue Bindung wird das zentrale C-Atom ', { o: ['sp²', 'sp³'], ok: 1 }, '-hybridisiert. Die Konjugation ist ', { o: ['unterbrochen', 'erweitert'], ok: 0 }, ' und das große π-System zerfällt in ', { o: ['drei kleine', 'ein noch größeres'], ok: 0 }, '. ΔE wird ', { o: ['kleiner', 'größer'], ok: 1 }, ', das Absorptionsmaximum wandert ins ', { o: ['sichtbare Licht', 'UV'], ok: 1 }, '. Das ist ein ', { o: ['bathochromer', 'hypsochromer'], ok: 1 }, ' Effekt, die Lösung ist ', { o: ['farblos', 'tiefblau'], ok: 0 }, '.'] });
  $('m3sample').addEventListener('click', function () {
    var b = $('m3sampleBox'); b.hidden = false;
    b.innerHTML = '<b class="t">Musterlösung:</b> Im blauen Farbstoff-Kation sind die drei Ringe über das sp²-hybridisierte zentrale C-Atom konjugiert, und die freien Elektronenpaare der N-Atome (Auxochrome, +M) erweitern das System noch. Das große delokalisierte π-System hat ein kleines ΔE zwischen HOMO und LUMO und absorbiert deshalb gelb-oranges Licht, die Tinte erscheint blau. Das Sulfit-Ion des Tintenkillers greift als Nucleophil am elektrophilen zentralen C-Atom an. Es entsteht eine C–S-Bindung, das C-Atom wird sp³-hybridisiert und die Konjugation ist unterbrochen. Aus dem großen System werden drei kleine, ΔE steigt stark und die Absorption verschiebt sich ins UV (extrem hypsochromer Effekt). Im sichtbaren Bereich wird nichts mehr absorbiert, die Lösung ist farblos.';
  });
  mc($('m3q4'), { q: '<b>Transfer 1:</b> Kristallviolett wird auch von Natronlauge entfärbt. Welches Teilchen greift dort wohl am zentralen C-Atom an?', opts: ['Das Hydroxid-Ion OH⁻ als Nucleophil.', 'Das Natrium-Ion Na⁺, weil es positiv ist.', 'Das Wasserstoff-Ion H⁺ als Elektrophil.', 'Kein Teilchen, die Lauge zerstört den Farbstoff vollständig.'], ok: 0, why: 'Dasselbe Prinzip: Ein Nucleophil greift am elektrophilen C-Atom an, es entsteht ein sp³-Kohlenstoff (Carbinol), die Konjugation ist unterbrochen und die Lösung farblos.', hints: { 1: 'Das Zentrum ist positiv, ein weiteres Kation wird abgestoßen.', 2: 'Ein positives Teilchen greift keine positive Stelle an.', 3: 'Der Farbstoff wird nicht zerstört, es entsteht eine farblose Verbindung.' }, mod: 'm3', after: q4 });
  mc($('m3q4'), { q: '<b>Transfer 2:</b> Warum kommt die Farbe zurück, wenn man Säure zugibt?', opts: ['Die H⁺-Ionen der Säure lagern sich an die Sulfit-Ionen an (SO₃²⁻ + H⁺ → HSO₃⁻, schließlich SO₂ + H₂O). Es gibt weniger freie Nucleophile, das Gleichgewicht verschiebt sich zum farbigen Kation, die C–S-Bindung wird wieder gelöst.', 'Die Säure färbt die Lösung blau.', 'Die Säure baut das Sulfonat zu einem neuen Farbstoff auf.', 'Die Säure macht das Wasser zum Nucleophil.'], ok: 0, why: 'Die Addition des Sulfit-Ions ist umkehrbar. Sinkt die Konzentration der freien SO₃²⁻-Ionen, weicht das Gleichgewicht aus und bildet Kation und Sulfit nach (Prinzip von Le Chatelier).', hints: { 1: 'Säure selbst ist nicht blau. Die Farbe stammt vom Farbstoff-Kation.', 2: 'Es entsteht derselbe Farbstoff wie vorher, nichts Neues.', 3: 'Dann würde die Lösung nicht wieder farbig.' }, mod: 'm3', after: q4 });
  mech(0);

  // =============================================================== Kolbi-Zusatzoption (nur in diesem Modul)
  var wantExtra = false;
  function applyExtra() {
    if (!(window.Kolbi && Kolbi.setExtra)) return false;
    Kolbi.setExtra(wantExtra ? [{ label: 'Szene mit Tinto noch einmal ansehen', fn: replay }] : null); return true;
  }
  function replay() { if (running) return; goStation('s1'); scene(); }
  document.addEventListener('tabchange', function (e) { wantExtra = e.detail === 'm3'; applyExtra(); });
  var tries = 0, iv = setInterval(function () { if (applyExtra() || ++tries > 60) clearInterval(iv); }, 500);
})();
