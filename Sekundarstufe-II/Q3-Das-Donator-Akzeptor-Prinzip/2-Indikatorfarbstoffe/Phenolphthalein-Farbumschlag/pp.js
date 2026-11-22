/*
  Gemeinsamer Ansatz der Lerneinheit „Phenolphthalein-Farbumschlag“:
  ein Kolben (50 mL Wasser mit Indikator), in den man Natronlauge oder Salzsäure tropft.
  Rechenmodell (Modellwerte, gerundet): pH aus der Stoffmengenbilanz; drei Formen des Indikators
    H2In (farblose Lactonform)  <->  In2- (magenta, chinoid)  <->  In(OH)3- (farblos, Carbinol)
  Kolbi ist selbst Teil des Versuchs: Er zeigt immer die Farbe der Lösung im Kolben.
*/
(function () {
  'use strict';
  var PP = window.PP = {};
  var KW = 1e-14, V0 = 50, DROP = 0.05;           // mL Ausgangsvolumen, mL je Tropfen
  PP.PKA = 9.1;                                     // farblos -> magenta (Umschlag von etwa pH 8,2 bis 10)
  PP.PKF = 12.8;                                    // magenta -> farblos (Carbinolform, in stark alkalischer Lösung)
  PP.conc = 0.01;                                   // mol/L der Zugabelösungen
  PP.DROP = DROP;
  var S = PP.S = { net: 0, V: V0, drops: 0, nb: 0, na: 0, xc: 0, t: 0 };   // net: Säure-Überschuss in mol (negativ = Base-Überschuss)
  var listeners = [];

  function pHof(net, V) {
    var d = net / (V / 1000), h;
    if (d >= 0) h = (d + Math.sqrt(d * d + 4 * KW)) / 2; else { var oh = (-d + Math.sqrt(d * d + 4 * KW)) / 2; h = KW / oh; }
    return -Math.log10(h);
  }
  PP.pH = function () { return pHof(S.net, S.V); };
  PP.setConc = function (c) { PP.conc = c; };

  // Gleichgewichtsanteile bei gegebenem pH
  PP.eq = function (pH) {
    var w1 = Math.pow(10, pH - PP.PKA), w2 = w1 * Math.pow(10, pH - PP.PKF), s = 1 + w1 + w2;
    return { c: 1 / s, p: w1 / s, x: w2 / s };
  };
  // aktueller Zustand (Carbinolbildung braucht Zeit, Entfärben durch Säure und Färben gehen schnell)
  PP.frac = function () {
    var pH = PP.pH(), w1 = Math.pow(10, pH - PP.PKA), pf = w1 / (1 + w1), x = S.xc;
    return { c: (1 - x) * (1 - pf), p: (1 - x) * pf, x: x };
  };

  PP.add = function (kind, drops) {
    var n = drops * DROP / 1000 * PP.conc;            // mol
    if (kind === 'base') { S.net -= n; S.nb += n; } else { S.net += n; S.na += n; }
    S.V += drops * DROP; S.drops += drops; changed(kind);
  };
  PP.setPH = function (p) {                           // pH direkt einstellen (Regler): rechnet die Bilanz passend um
    var d = Math.pow(10, -p) - Math.pow(10, p - 14); S.net = d * S.V / 1000; S.xc = PP.eq(p).x; changed('set');
  };
  PP.reset = function () { S.net = 0; S.V = V0; S.drops = 0; S.nb = 0; S.na = 0; S.xc = 0; changed('reset'); };

  // ---------------------------------------------------------------- Spektren (Modellwerte)
  var B = function (l, a, wr, wb) { return Farbe.band(l, a, wr, wb); };
  PP.BANDS = {
    c: { lmax: 275, A: function (l) { return B(275, 1.9, 30, 24)(l); } },
    p: { lmax: 553, A: function (l) { return B(553, 2.6, 38, 75)(l) + B(300, 0.9, 30, 24)(l); } },
    x: { lmax: 292, A: function (l) { return B(292, 1.9, 30, 24)(l); } }
  };
  PP.A = function (f) { return function (l) { return f.c * PP.BANDS.c.A(l) + f.p * PP.BANDS.p.A(l) + f.x * PP.BANDS.x.A(l); }; };
  PP.rgb = function (f) { f = f || PP.frac(); return Farbe.colorOf(PP.A(f)); };
  PP.sat = function (f) { f = f || PP.frac(); return Math.min(1, f.p * 1.15); };
  PP.word = function (f) {
    f = f || PP.frac(); var p = f.p;
    return p < 0.04 ? 'farblos' : p < 0.2 ? 'ganz schwach rosa' : p < 0.45 ? 'rosa' : p < 0.8 ? 'kräftig rosa bis magenta' : 'magenta';
  };

  // ---------------------------------------------------------------- Zeitschritt, Rückmeldungen, Kolbi
  var last = Date.now(), lastSig = '', kLast = '', sinceR = 0, prevP = 0, prevX = 0, said = {};
  function changed(kind) { PP.lastKind = kind; lastSig = ''; }
  PP.on = function (fn) { listeners.push(fn); fn(); };
  function tick() {
    var now = Date.now(), dt = Math.min(0.5, (now - last) / 1000); last = now; S.t += dt;
    var eqx = PP.eq(PP.pH()).x;
    if (eqx > S.xc) S.xc += (eqx - S.xc) * (1 - Math.exp(-dt / 5)); else S.xc = eqx + (S.xc - eqx) * Math.exp(-dt / 0.4);
    if (Math.abs(S.xc - eqx) < 1e-4) S.xc = eqx;
    var f = PP.frac(), sig = [S.net.toExponential(3), S.V.toFixed(2), f.p.toFixed(3), f.x.toFixed(3)].join('|');
    if (sig !== lastSig) { lastSig = sig; listeners.forEach(function (fn) { try { fn(f); } catch (e) { } }); }
    syncKolbi(f, dt);
  }
  function syncKolbi(f, dt) {
    if (!window.Kolbi || !Kolbi.tint) return;
    var key = f.p.toFixed(3) + '|' + f.x.toFixed(3);
    if (key !== kLast) {
      kLast = key;
      var c = PP.rgb(f), sat = PP.sat(f);
      Kolbi.tint('rgb(' + c.join(',') + ')', 0.3 + 0.62 * sat);
    }
    sinceR += dt;
    if (sinceR > 9 && Kolbi.react) {                  // gelegentlich ein Kommentar, nie mitten im Gespräch
      if (f.p > 0.5 && prevP <= 0.5 && !said.up) { said.up = 1; sinceR = 0; Kolbi.react('surprised', 'Huch, ich werde magenta!'); }
      else if (f.p < 0.25 && prevP >= 0.5 && !said.down) { said.down = 1; sinceR = 0; Kolbi.react('happy', 'Und wieder klar wie Wasser.'); }
      else if (f.x > 0.5 && prevX <= 0.5 && !said.fade) { said.fade = 1; sinceR = 0; Kolbi.react('thinking', 'Moment … ich werde wieder blass?'); }
    }
    prevP = f.p; prevX = f.x;
  }
  setInterval(tick, 100);

  // ---------------------------------------------------------------- Kolben als SVG (für alle Module)
  // svg: leeres <svg>; opts.w: Breite. Rückgabe: Funktion zum Neuzeichnen der Farbe (wird automatisch bei Änderungen aufgerufen)
  PP.flask = function (svg, opts) {
    opts = opts || {}; var id = 'fl' + Math.random().toString(36).slice(2, 7);
    svg.setAttribute('viewBox', '0 0 160 190');
    svg.innerHTML =
      '<defs><clipPath id="' + id + '"><path d="M62 12 H98 V68 L140 150 Q148 172 128 174 H32 Q12 172 20 150 L62 68 Z"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')"><rect class="fl-liq" x="0" y="96" width="160" height="90" fill="#eaf4fb" fill-opacity=".55"/>' +
      '<path class="fl-surf" d="M0 96 H160" stroke="#fff" stroke-opacity=".75" stroke-width="2"/></g>' +
      '<path d="M62 12 H98 V68 L140 150 Q148 172 128 174 H32 Q12 172 20 150 L62 68 Z" fill="none" stroke="#475569" stroke-width="3.2" stroke-linejoin="round"/>' +
      '<path d="M56 12 H104" stroke="#475569" stroke-width="3.4" stroke-linecap="round"/>' +
      '<path d="M70 20 V66" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M30 148 L42 126" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>' +
      '<g class="fl-drops"></g>';
    var liq = svg.querySelector('.fl-liq'), surf = svg.querySelector('.fl-surf');
    function upd(f) {
      f = f || PP.frac(); var c = PP.rgb(f), sat = PP.sat(f), lvl = 100 - Math.min(14, (S.V - V0) * 0.5);
      liq.setAttribute('fill', 'rgb(' + c.join(',') + ')'); liq.setAttribute('fill-opacity', (0.5 + 0.45 * sat).toFixed(2));
      liq.setAttribute('y', lvl); surf.setAttribute('d', 'M0 ' + lvl + ' H160');
    }
    PP.on(upd); return upd;
  };

  // Tropfen, die in den Kolben fallen (SVG-Animation); kind: 'base' | 'acid'
  PP.dropAnim = function (svg, kind) {
    var g = svg.querySelector('.fl-drops'); if (!g) return;
    var d = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); d.setAttribute('cx', 80); d.setAttribute('cy', -6); d.setAttribute('r', 4.2);
    d.setAttribute('fill', kind === 'base' ? '#3b82f6' : '#f59e0b'); d.setAttribute('opacity', '.9'); g.appendChild(d);
    var t0 = performance.now(), T = 380;
    (function fr(t) { var k = Math.min(1, (t - t0) / T); d.setAttribute('cy', -6 + k * k * 110); if (k < 1) requestAnimationFrame(fr); else if (d.parentNode) d.parentNode.removeChild(d); })(t0);
  };

  PP.fmt = function (x, n) { return x.toFixed(n == null ? 1 : n).replace('.', ','); };
})();
