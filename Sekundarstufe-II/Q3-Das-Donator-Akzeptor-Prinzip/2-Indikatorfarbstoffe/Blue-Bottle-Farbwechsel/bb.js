/*
  Gemeinsame Bausteine der Lerneinheit „Blue Bottle und Indigocarmin“:
  - BB.DYE: Daten der beiden Farbstoffe (Zustände, Farben, Spektren)
  - BB.Bottle: Modell des Kolbens (makroskopisch, Geschwindigkeitsgleichungen als einfaches Modell)
  - BB.Sim: Teilchenmodell (Glucose, Farbstoff, Sauerstoff, Elektronen)
  - Kolbi: färbt sich wie die Lösung und trägt einen Stopfen
  Alle Zahlen sind Modellwerte: Es geht um die Zusammenhänge, nicht um Messgenauigkeit.
*/
(function () {
  'use strict';
  var BB = window.BB = {};
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

  // ---------------------------------------------------------------- Farbstoffe
  BB.DYE = {
    mb: {
      id: 'mb', name: 'Methylenblau', kurz: 'MB', last: 1, need: 2,           // last = höchster Zustand, need = Elektronen je Schritt
      st: [{ n: 'MB⁺', col: [20, 60, 190], word: 'blau', lmax: 664 }, { n: 'Leuko-MB', col: [255, 255, 255], word: 'farblos', lmax: 320 }],
      colors: ['#1c3cbe', '#ffffff']
    },
    ic: {
      id: 'ic', name: 'Indigocarmin', kurz: 'IC', last: 2, need: 1,
      st: [{ n: 'IC (grün)', col: [38, 160, 105], word: 'grün', lmax: 610 }, { n: 'IC (rot)', col: [214, 52, 44], word: 'rot', lmax: 510 }, { n: 'Leuko-IC', col: [236, 200, 40], word: 'gelb', lmax: 405 }],
      colors: ['#26a069', '#d6342c', '#ecc828']
    }
  };
  // Farbe der Lösung aus den Anteilen der Zustände; MB: Farbtiefe = Anteil MB⁺, IC: Mischfarbe
  BB.color = function (dye, pop) {
    if (dye === 'mb') { var x = clamp(pop[0], 0, 1); return { rgb: BB.DYE.mb.st[0].col, a: 0.03 + 0.97 * Math.pow(x, 0.85) }; }
    var c = [0, 0, 0], i, s = 0; for (i = 0; i < 3; i++) { s += pop[i]; }
    s = s || 1; for (i = 0; i < 3; i++) { var col = BB.DYE.ic.st[i].col; c[0] += col[0] * pop[i] / s; c[1] += col[1] * pop[i] / s; c[2] += col[2] * pop[i] / s; }
    return { rgb: [Math.round(c[0]), Math.round(c[1]), Math.round(c[2])], a: 0.92 };
  };
  BB.css = function (c) { return 'rgba(' + c.rgb.join(',') + ',' + c.a.toFixed(3) + ')'; };
  BB.word = function (dye, pop) {      // Farbwort für die Beobachtung
    if (dye === 'mb') return pop[0] > 0.75 ? 'tiefblau' : pop[0] > 0.45 ? 'blau' : pop[0] > 0.18 ? 'hellblau' : pop[0] > 0.06 ? 'fast farblos' : 'farblos';
    var m = pop.indexOf(Math.max.apply(null, pop)); if (m === 0) return pop[0] > 0.7 ? 'grün' : 'gelbgrün'; if (m === 1) return pop[1] > 0.6 ? 'rot' : (pop[0] > pop[2] ? 'braunrot' : 'orange'); return pop[2] > 0.7 ? 'gelb' : 'orange';
  };

  // ---------------------------------------------------------------- Modell des Kolbens
  function Bottle(dye) { this.dye = dye; this.reset(); }
  Bottle.prototype.reset = function () { this.G = 1; this.o = 0.3; this.pop = this.dye === 'mb' ? [1, 0] : [1, 0, 0]; this.t = 0; this.cycles = 0; this.clear = false; this.shook = 0; };
  Bottle.prototype.step = function (dt, shaking) {
    var n = Math.max(1, Math.ceil(dt / 0.04)), h = dt / n, k, G, o, p = this.pop;
    for (k = 0; k < n; k++) {
      G = this.G; o = this.o;
      var sup = shaking ? 7 : 0.03;
      if (this.dye === 'mb') {
        var r1 = 0.45 * G * p[0], r2 = 4.0 * o * p[1];
        p[0] = clamp(p[0] + (r2 - r1) * h, 0, 1); p[1] = 1 - p[0];
        this.G = Math.max(0, G - 0.045 * r1 * h); o += (sup * (1 - o) - 0.9 * r2) * h;
      } else {
        var a = 0.5 * G * p[0], b = 0.4 * G * p[1], c = 3.2 * o * p[2], d = 3.2 * o * p[1];
        p[0] = clamp(p[0] + (d - a) * h, 0, 1); p[1] = clamp(p[1] + (a - b + c - d) * h, 0, 1); p[2] = clamp(p[2] + (b - c) * h, 0, 1);
        var sm = p[0] + p[1] + p[2]; p[0] /= sm; p[1] /= sm; p[2] /= sm;
        this.G = Math.max(0, G - 0.0225 * (a + b) * h); o += (sup * (1 - o) - 0.45 * (c + d)) * h;
      }
      this.o = clamp(o, 0, 1); this.t += h;
    }
    var lowest = this.dye === 'mb' ? this.pop[0] < 0.12 : this.pop[2] > 0.8;
    if (lowest && !this.clear) { this.clear = true; this.cycles++; } else if (!lowest && (this.dye === 'mb' ? this.pop[0] > 0.6 : this.pop[0] > 0.6)) this.clear = false;
  };
  BB.Bottle = Bottle;

  // ---------------------------------------------------------------- Kolbi als Kolben
  var kolbiPick = null, kolbiOn = false;
  BB.kolbiSource = function (fn) { kolbiPick = fn; };
  function kolbiLoop() {
    if (window.Kolbi && Kolbi.tint && Kolbi.deco) {
      if (!kolbiOn) { kolbiOn = true; Kolbi.deco(['stopper']); }
      var c = kolbiPick ? kolbiPick() : null;
      Kolbi.tint(c ? 'rgb(' + c.rgb.join(',') + ')' : null, c ? c.a : 1);
    }
  }
  setInterval(kolbiLoop, 160);
  BB.shakeKolbi = function (ms) { if (window.Kolbi && Kolbi.shake) Kolbi.shake(ms || 1400); };

  // ---------------------------------------------------------------- Teilchenmodell
  var W = 640, H = 340, SURF = 56;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function Sim(cv, o) {
    this.cv = cv; this.o = o; this.ctx = cv.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr; this.dpr = dpr;
    this.dye = o.dye || 'mb'; this.dyeOn = o.dyeOn !== false; this.speed = 1; this.last = 0; this.running = false;
    this.reset();
    var self = this;
    this.loop = function (t) { if (!self.running) return; var dt = Math.min(0.05, (t - (self.last || t)) / 1000); self.last = t; if (self.cv.offsetParent !== null) { self.step(dt * self.speed); self.draw(); } requestAnimationFrame(self.loop); };
  }
  Sim.prototype.setDye = function (d) { this.dye = d; this.reset(); this.draw(); };
  Sim.prototype.reset = function () {
    var i, o = this.o; this.t = 0; this.shakeT = 0; this.glc = []; this.dyep = []; this.o2 = []; this.fx = []; this.ohs = [];
    this.stat = { gd: 0, dO: 0, gO: 0 };
    for (i = 0; i < (o.nG || 40); i++) this.glc.push(this.mk(8, 2));
    if (this.dyeOn) for (i = 0; i < (o.nD || 10); i++) { var p = this.mk(7, 0); this.dyep.push(p); }
    for (i = 0; i < (o.nO || 5); i++) { var q = this.mk(8, 4); this.o2.push(q); }
  };
  Sim.prototype.mk = function (r, e) { var a = rnd(0, 6.283); return { x: rnd(20, W - 20), y: rnd(SURF + 14, H - 16), a: a, r: r, e: e, s: 0, cd: 0 }; };
  Sim.prototype.shake = function () { this.shakeT = 1.5; BB.shakeKolbi(1500); };
  Sim.prototype.start = function () { if (this.running) return; this.running = true; this.last = 0; requestAnimationFrame(this.loop); };
  Sim.prototype.stop = function () { this.running = false; };
  Sim.prototype.pop = function () {
    var D = BB.DYE[this.dye], n = D.last + 1, p = [], i; for (i = 0; i < n; i++) p.push(0);
    this.dyep.forEach(function (d) { p[d.s]++; }); var s = this.dyep.length || 1; return p.map(function (x) { return x / s; });
  };
  Sim.prototype.used = function () { return this.glc.filter(function (g) { return g.e === 0; }).length; };
  Sim.prototype.free = function () { return this.glc.filter(function (g) { return g.e > 0; }).length; };
  Sim.prototype.step = function (dt) {
    var i, j, k = this.shakeT > 0 ? 3 : 1, self = this, D = BB.DYE[this.dye];
    this.t += dt; if (this.shakeT > 0) this.shakeT -= dt;
    // Sauerstoff nachliefern: beim Schütteln viel, sonst wenig von der Oberfläche
    var maxO = this.shakeT > 0 ? 14 : 6, rate = this.shakeT > 0 ? 9 : 0.18;
    if (this.o2.length < maxO && Math.random() < rate * dt) { var q = this.mk(8, 4); q.y = this.shakeT > 0 ? rnd(SURF + 14, H - 16) : SURF + 14; this.o2.push(q); }
    var all = this.glc.concat(this.dyep, this.o2);
    all.forEach(function (p) {
      p.a += rnd(-1, 1) * 6 * dt; var v = 30 * k; p.x += Math.cos(p.a) * v * dt; p.y += Math.sin(p.a) * v * dt;
      if (p.x < p.r) { p.x = p.r; p.a = Math.PI - p.a; } if (p.x > W - p.r) { p.x = W - p.r; p.a = Math.PI - p.a; }
      if (p.y < SURF + p.r) { p.y = SURF + p.r; p.a = -p.a; } if (p.y > H - p.r) { p.y = H - p.r; p.a = -p.a; }
      if (p.cd > 0) p.cd -= dt;
    });
    function hit(a, b) { var dx = a.x - b.x, dy = a.y - b.y, r = a.r + b.r + 3; return a.cd <= 0 && b.cd <= 0 && dx * dx + dy * dy < r * r; }
    function elec(a, b, n) { self.fx.push({ x0: a.x, y0: a.y, x1: b.x, y1: b.y, t: 0, n: n }); a.cd = 0.5; b.cd = 0.5; }
    // Glucose gibt Elektronen an den Farbstoff ab
    for (i = 0; i < this.glc.length; i++) { var g = this.glc[i]; if (g.e <= 0) continue;
      for (j = 0; j < this.dyep.length; j++) { var d = this.dyep[j];
        if (d.s < D.last && g.e >= D.need && hit(g, d) && Math.random() < 0.4) { g.e -= D.need; d.s++; this.stat.gd++; elec(g, d, D.need); break; } }
      if (g.e <= 0) continue;
      for (j = 0; j < this.o2.length; j++) { var o2 = this.o2[j];     // direkter Weg: nur sehr selten
        if (o2.e > 0 && hit(g, o2) && Math.random() < 0.012) { var m = Math.min(g.e, o2.e); g.e -= m; o2.e -= m; this.stat.gO++; elec(g, o2, m); if (o2.e <= 0) this.gone(o2); break; } } }
    // Farbstoff in der „aufgeladenen“ Form gibt Elektronen an Sauerstoff weiter
    for (i = 0; i < this.dyep.length; i++) { var dd = this.dyep[i]; if (dd.s === 0) continue;
      for (j = 0; j < this.o2.length; j++) { var oo = this.o2[j];
        if (oo.e > 0 && hit(dd, oo) && Math.random() < 0.4) { var take = Math.min(D.need, oo.e); dd.s -= (D.need === 2 ? 1 : 1); oo.e -= take; this.stat.dO++; elec(dd, oo, take); if (oo.e <= 0) this.gone(oo); break; } } }
    this.o2 = this.o2.filter(function (p) { return p.e > 0; });
    this.fx = this.fx.filter(function (f) { f.t += dt / 0.45; return f.t < 1; });
    this.ohs = this.ohs.filter(function (h) { h.t += dt / 1.6; return h.t < 1; });
  };
  Sim.prototype.gone = function (o2) { this.ohs.push({ x: o2.x, y: o2.y, t: 0 }); };
  Sim.prototype.draw = function () {
    var c = this.ctx, D = BB.DYE[this.dye], self = this;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); c.clearRect(0, 0, W, H);
    var col = BB.color(this.dye, this.pop().concat([0, 0]).slice(0, D.last + 1));
    c.fillStyle = '#f4f8fc'; c.fillRect(0, 0, W, SURF);
    c.fillStyle = '#7a8aa0'; c.font = '700 12px Segoe UI,system-ui,sans-serif'; c.fillText('Luft (enthält O₂)', 10, 22);
    c.fillStyle = '#e6eef7'; c.fillRect(0, 0, 0, 0);
    c.fillStyle = this.dyep.length ? BB.css({ rgb: col.rgb, a: Math.min(.55, col.a * .5) }) : '#eaf4fb'; c.fillRect(0, SURF, W, H - SURF);
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, SURF); c.lineTo(W, SURF); c.stroke();
    c.fillStyle = '#7a8aa0'; c.fillText('Lösung', 10, SURF + 16);
    function hex(x, y, r, fill, stroke, dash) { c.beginPath(); for (var i = 0; i < 6; i++) { var a = Math.PI / 3 * i + Math.PI / 6; c.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); } c.closePath(); c.fillStyle = fill; c.fill(); c.strokeStyle = stroke; c.lineWidth = 1.6; c.setLineDash(dash || []); c.stroke(); c.setLineDash([]); }
    this.glc.forEach(function (g) { var f = g.e === 2 ? '#f6a94e' : g.e === 1 ? '#f9d29a' : '#c8e0a0', s = g.e === 2 ? '#b45309' : g.e === 1 ? '#c58b45' : '#5b8c2a'; hex(g.x, g.y, g.r, f, s); });
    this.dyep.forEach(function (d) { var s = D.st[d.s], cc = D.colors[d.s];
      c.beginPath(); c.arc(d.x, d.y, d.r + 1, 0, 6.283);
      if (self.dye === 'mb' && d.s === 1) { c.fillStyle = '#ffffff'; c.fill(); c.strokeStyle = '#7aa6e0'; c.lineWidth = 1.6; c.setLineDash([3, 2]); c.stroke(); c.setLineDash([]); }
      else { c.fillStyle = cc; c.fill(); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 1; c.stroke(); } });
    this.o2.forEach(function (o) { c.fillStyle = '#e0364a'; c.strokeStyle = '#7f1d1d'; c.lineWidth = 1.2; c.beginPath(); c.arc(o.x - 5, o.y, 5, 0, 6.283); c.fill(); c.stroke(); c.beginPath(); c.arc(o.x + 5, o.y, 5, 0, 6.283); c.fill(); c.stroke();
      c.fillStyle = '#fff'; for (var i = 0; i < o.e; i++) { c.fillRect(o.x - 6 + i * 3.4, o.y - 1.4, 2.2, 2.8); } });
    this.ohs.forEach(function (h) { c.globalAlpha = 1 - h.t; c.fillStyle = '#e0364a'; c.font = '700 10px Segoe UI,sans-serif'; c.fillText('2 OH⁻', h.x - 14, h.y - 12 * h.t); c.globalAlpha = 1; });
    this.fx.forEach(function (f) { var x = f.x0 + (f.x1 - f.x0) * f.t, y = f.y0 + (f.y1 - f.y0) * f.t - Math.sin(f.t * Math.PI) * 16;
      c.fillStyle = '#facc15'; c.strokeStyle = '#a16207'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y, 6, 0, 6.283); c.fill(); c.stroke();
      c.fillStyle = '#713f12'; c.font = '800 8px Segoe UI,sans-serif'; c.textAlign = 'center'; c.fillText(f.n + 'e⁻', x, y + 2.8); c.textAlign = 'left'; });
    if (this.shakeT > 0) { c.fillStyle = 'rgba(30,41,59,.75)'; c.font = '800 14px Segoe UI,sans-serif'; c.fillText('Schütteln …', W - 110, 22); }
  };
  BB.Sim = Sim;

  // ---------------------------------------------------------------- Kolben-Zeichnung (SVG)
  BB.flaskSVG = function (svg, id) {
    var body = 'M80 20 V86 L28 190 Q18 214 44 214 H156 Q182 214 172 190 L120 86 V20 Z';
    svg.setAttribute('viewBox', '0 0 200 250');
    svg.innerHTML = '<defs><clipPath id="fc-' + id + '"><path d="' + body + '"/></clipPath></defs>' +
      '<g class="fl-body"><g clip-path="url(#fc-' + id + ')"><rect x="0" y="120" width="200" height="110" class="fl-liq" fill="rgba(255,255,255,0)"/>' +
      '<path class="fl-surf" d="M0 120 H200" stroke="#fff" stroke-opacity=".8" stroke-width="2.5"/><g class="fl-bubs"></g></g>' +
      '<path d="' + body + '" fill="rgba(255,255,255,.18)" stroke="#475569" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M44 190 L70 136" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M78 24 H122" stroke="#475569" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M82 6 L78 -10 H122 L118 6 Z" transform="translate(0 20)" fill="#c8883f" stroke="#7a4a1a" stroke-width="3" stroke-linejoin="round"/></g>' +
      '<ellipse cx="100" cy="228" rx="64" ry="7" fill="rgba(15,23,42,.14)"/>';
  };
  BB.flaskColor = function (svg, c) { var q = svg.querySelector('.fl-liq'); if (q) q.setAttribute('fill', BB.css(c)); };

  // ---------------------------------------------------------------- Auswahl des Farbstoffs (in allen Modulen gleich)
  BB.cur = 'mb'; BB.active = 'm1'; BB.src = {};
  BB.kolbiSource(function () { var f = BB.src[BB.active]; return f ? f() : null; });
  document.addEventListener('tabchange', function (e) { BB.active = e.detail; });
  var sw = [];
  BB.dyeSwitch = function (box) {
    box.innerHTML = '';
    ['mb', 'ic'].forEach(function (id) {
      var b = document.createElement('button'), D = BB.DYE[id];
      b.setAttribute('data-d', id); b.innerHTML = '<i style="background:' + D.colors[0] + '"></i>' + D.name + (id === 'mb' ? ' (Blue Bottle)' : ' (Ampel)');
      b.addEventListener('click', function () { BB.setDye(id); }); box.appendChild(b);
    });
    sw.push(box); BB.setDye(BB.cur, true);
  };
  BB.setDye = function (id, quiet) {
    BB.cur = id; sw.forEach(function (box) { Array.prototype.forEach.call(box.children, function (b) { var on = b.getAttribute('data-d') === id; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); });
    if (!quiet) document.dispatchEvent(new CustomEvent('dye', { detail: id }));
  };
})();
