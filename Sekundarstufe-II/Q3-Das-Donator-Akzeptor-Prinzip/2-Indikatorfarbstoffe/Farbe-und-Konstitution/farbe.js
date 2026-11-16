/*
  Gemeinsame Werkzeuge der Lerneinheit „Farbe und Konstitution“:
  Absorptionsspektrum -> wahrgenommene Farbe, Spektrum-Diagramm, Becherglas, Energiestufen.
  Alle Zahlen sind gerundete Modellwerte: Es geht um die Tendenz, nicht um Messgenauigkeit.
*/
(function () {
  'use strict';
  function g(l, mu, s1, s2) { var t = (l - mu) / (l < mu ? s1 : s2); return Math.exp(-0.5 * t * t); }
  function cmf(l) {
    return [1.056 * g(l, 599.8, 37.9, 31) + 0.362 * g(l, 442, 16, 26.7) - 0.065 * g(l, 501.1, 20.4, 26.2),
      0.821 * g(l, 568.8, 46.9, 40.5) + 0.286 * g(l, 530.9, 16.3, 31.1),
      1.217 * g(l, 437, 11.8, 36) + 0.681 * g(l, 459, 26, 13.8)];
  }
  var L = [], C = [];
  for (var l = 380; l <= 730; l += 5) { L.push(l); C.push(cmf(l)); }
  function toRGB(X, Y, Z) { return [3.2406 * X - 1.5372 * Y - 0.4986 * Z, -0.9689 * X + 1.8758 * Y + 0.0415 * Z, 0.0557 * X - 0.204 * Y + 1.057 * Z]; }
  function sums(fn) {
    var X = 0, Y = 0, Z = 0;
    for (var i = 0; i < L.length; i++) { var t = fn(L[i]); X += t * C[i][0]; Y += t * C[i][1]; Z += t * C[i][2]; }
    return toRGB(X, Y, Z);
  }
  var W = sums(function () { return 1; });
  function gam(v) { v = Math.max(0, Math.min(1, v)); return Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)); }

  // Absorptionsbande: Maximum bei lmax, Höhe amax; zur roten Seite ein längerer Auslauf (Schwingungsfeinstruktur wird nicht gezeigt)
  function band(lmax, amax, wr, wb) {
    amax = amax || 2.6; wr = wr || 0.13 * lmax; wb = wb || 0.085 * lmax;
    return function (lam) { var d = lam - lmax, w = d < 0 ? wb : wr; return amax * Math.exp(-(d * d) / (w * w)); };
  }
  // Farbe der Lösung im Durchlicht (weißes Licht, Schichtdicke so, dass ein starker Farbstoff kräftig erscheint)
  function colorOf(A, k) {
    k = k || 1; var r = sums(function (lam) { return Math.pow(10, -k * A(lam)); });
    return [gam(r[0] / W[0]), gam(r[1] / W[1]), gam(r[2] / W[2])];
  }
  function rgbCss(c, a) { return a == null ? 'rgb(' + c.join(',') + ')' : 'rgba(' + c.join(',') + ',' + a + ')'; }
  function hsv(c) {
    var r = c[0] / 255, gg = c[1] / 255, b = c[2] / 255, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), d = mx - mn, h = 0;
    if (d) { if (mx === r) h = ((gg - b) / d) % 6; else if (mx === gg) h = (b - r) / d + 2; else h = (r - gg) / d + 4; h *= 60; if (h < 0) h += 360; }
    return { h: h, s: mx ? d / mx : 0, v: mx };
  }
  function colorName(c) {
    var o = hsv(c);
    if (o.s < 0.07) return o.v < 0.3 ? 'schwarz' : 'farblos';
    var n, h = o.h;
    if (h < 15 || h >= 345) n = 'rot'; else if (h < 40) n = 'orange'; else if (h < 68) n = 'gelb'; else if (h < 100) n = 'gelbgrün'; else if (h < 160) n = 'grün';
    else if (h < 195) n = 'türkis'; else if (h < 255) n = 'blau'; else if (h < 290) n = 'violett'; else n = 'purpur';
    if (o.s < 0.14) return 'sehr hell ' + n;
    if (o.s < 0.28) return 'hell' + n;
    return n;
  }
  // Welche Farbe wird absorbiert? (Spektralbereich des Maximums)
  function absorbedName(lmax) {
    if (lmax < 390) return 'UV-Licht (unsichtbar)';
    if (lmax < 435) return 'violettes Licht'; if (lmax < 480) return 'blaues Licht'; if (lmax < 500) return 'blaugrünes Licht';
    if (lmax < 560) return 'grünes Licht'; if (lmax < 580) return 'gelbgrünes Licht'; if (lmax < 595) return 'gelbes Licht'; if (lmax < 620) return 'oranges Licht';
    return 'rotes Licht';
  }
  function wlRGB(w) {   // Spektralfarbe für das Diagramm
    var r = 0, gg = 0, b = 0, f;
    if (w >= 380 && w < 440) { r = -(w - 440) / 60; b = 1; } else if (w < 490) { gg = (w - 440) / 50; b = 1; } else if (w < 510) { gg = 1; b = -(w - 510) / 20; }
    else if (w < 580) { r = (w - 510) / 70; gg = 1; } else if (w < 645) { r = 1; gg = -(w - 645) / 65; } else if (w <= 750) { r = 1; }
    f = w < 420 ? 0.3 + 0.7 * (w - 380) / 40 : w > 700 ? 0.3 + 0.7 * (750 - w) / 50 : 1;
    return 'rgb(' + [r, gg, b].map(function (x) { return Math.round(255 * Math.pow(x * f, 0.8)); }).join(',') + ')';
  }

  // ---------------------------------------------------------------- Spektrum-Diagramm (SVG)
  var X0 = 36, X1 = 346, LA = 150, LB = 750;
  function px(l) { return X0 + (l - LA) / (LB - LA) * (X1 - X0); }
  function refPath(A, amax, yb, h) { var d = '', lam; for (lam = LA; lam <= LB; lam += 3) { var a = Math.min(amax, A(lam)); d += (d ? ' L' : 'M') + px(lam).toFixed(1) + ' ' + (yb - a / amax * h * 0.92).toFixed(1); } return d; }
  function plot(svg, lmax, A, opts) {
    opts = opts || {};
    var stops = '', i;
    for (i = 0; i <= 40; i++) { var wl = 400 + i * (300 / 40); stops += '<stop offset="' + (i / 40) + '" stop-color="' + wlRGB(wl) + '"/>'; }
    var yb = 118, ytop = 14, h = yb - ytop, amax = opts.amax || 3.2, d = '', lam;
    for (lam = LA; lam <= LB; lam += 3) { var a = Math.min(amax, A(lam)); d += (d ? ' L' : 'M') + px(lam).toFixed(1) + ' ' + (yb - a / amax * h * 0.92).toFixed(1); }
    var fill = d + ' L' + px(LB).toFixed(1) + ' ' + yb + ' L' + px(LA).toFixed(1) + ' ' + yb + ' Z';
    var mx = px(Math.max(LA + 4, Math.min(LB - 4, lmax))), off = lmax < LA;
    var ticks = '';
    [200, 300, 400, 500, 600, 700].forEach(function (t) { ticks += '<line x1="' + px(t) + '" x2="' + px(t) + '" y1="' + yb + '" y2="' + (yb + 4) + '" stroke="#64748b"/><text x="' + px(t) + '" y="' + (yb + 26) + '" font-size="9.5" text-anchor="middle" fill="#475569">' + t + '</text>'; });
    var lab = off ? '≈ ' + lmax + ' nm (links außerhalb)' : 'λmax ≈ ' + Math.round(lmax) + ' nm';
    var anchor = mx > 270 ? 'end' : 'start', lx = mx > 270 ? mx - 5 : mx + 5;
    svg.setAttribute('viewBox', '0 0 360 160');
    svg.innerHTML =
      '<defs><linearGradient id="fp-sp-' + svg.id + '" x1="0" x2="1" y1="0" y2="0">' + stops + '</linearGradient></defs>' +
      '<rect x="' + X0 + '" y="' + ytop + '" width="' + (px(400) - X0) + '" height="' + h + '" fill="#e2e8f0" opacity=".75"/>' +
      '<text x="' + ((X0 + px(400)) / 2) + '" y="' + (ytop + 11) + '" font-size="9.5" text-anchor="middle" fill="#64748b" font-weight="700">UV</text>' +
      '<rect x="' + px(400) + '" y="' + yb + '" width="' + (px(700) - px(400)) + '" height="10" fill="url(#fp-sp-' + svg.id + ')" rx="2"/>' +
      '<rect x="' + px(400) + '" y="' + ytop + '" width="' + (px(700) - px(400)) + '" height="' + h + '" fill="url(#fp-sp-' + svg.id + ')" opacity=".13"/>' +
      '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + yb + '" y2="' + yb + '" stroke="#475569" stroke-width="1.4"/><line x1="' + X0 + '" x2="' + X0 + '" y1="' + ytop + '" y2="' + yb + '" stroke="#475569" stroke-width="1.4"/>' +
      ticks + '<text x="' + ((X0 + X1) / 2) + '" y="' + (yb + 38) + '" font-size="10" text-anchor="middle" fill="#334155">Wellenlänge λ in nm</text>' +
      '<text x="10" y="' + (ytop + h / 2) + '" font-size="10" fill="#334155" transform="rotate(-90 10 ' + (ytop + h / 2) + ')" text-anchor="middle">Absorption</text>' +
      (opts.ref ? '<path d="' + refPath(opts.ref, amax, yb, h) + '" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="5 4"/>' : '') +
      '<path d="' + fill + '" fill="#2563eb" opacity=".22"/><path d="' + d + '" fill="none" stroke="#1d4ed8" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<line x1="' + mx + '" x2="' + mx + '" y1="' + ytop + '" y2="' + yb + '" stroke="#b91c1c" stroke-width="1.4" stroke-dasharray="4 3"/>' +
      '<text x="' + lx + '" y="' + (ytop + 10) + '" font-size="10.5" fill="#b91c1c" font-weight="700" text-anchor="' + anchor + '">' + lab + '</text>';
  }

  // ---------------------------------------------------------------- Becherglas (SVG)
  function beaker(svg) {
    svg.setAttribute('viewBox', '0 0 120 140');
    svg.innerHTML =
      '<defs><clipPath id="bk-c-' + svg.id + '"><path d="M26 30 V118 Q26 126 34 126 H86 Q94 126 94 118 V30 Z"/></clipPath></defs>' +
      '<g clip-path="url(#bk-c-' + svg.id + ')"><rect class="bk-liq" x="20" y="52" width="80" height="80" fill="#eaf4fb"/><path d="M26 52 H94" stroke="#fff" stroke-opacity=".7" stroke-width="2"/></g>' +
      '<path d="M26 30 V118 Q26 126 34 126 H86 Q94 126 94 118 V30" fill="none" stroke="#475569" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M20 30 H100" stroke="#475569" stroke-width="3" stroke-linecap="round"/><path d="M26 50 h8 M26 70 h8 M26 90 h8 M26 110 h8" stroke="#64748b" stroke-width="1.6"/>' +
      '<path d="M32 40 V112" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="14" y="128" width="92" height="6" rx="3" fill="#cbd5e1"/>';
  }
  function setBeaker(svg, rgb) {
    var q = svg.querySelector('.bk-liq'); if (!q) return;
    q.setAttribute('fill', rgb ? rgbCss(rgb) : '#eaf4fb');
  }

  // ---------------------------------------------------------------- Energiestufen der π-Elektronen (Hückel, qualitativ)
  // Für eine Kette aus N = 2n Atomen: E_k = α + 2β·cos(kπ/(N+1)), die untere Hälfte ist besetzt.
  function levels(svg, n) {
    var N = 2 * n, ks = [], k, y0 = 12, y1 = 148, i;
    for (k = 1; k <= N; k++) ks.push(2 * Math.cos(k * Math.PI / (N + 1)));   // positiv = energiearm
    function py(x) { return y0 + (2.1 - x) / 4.2 * (y1 - y0); }
    var s = '<line x1="20" x2="20" y1="10" y2="150" stroke="#475569" stroke-width="1.4"/><text x="8" y="80" font-size="10" fill="#334155" transform="rotate(-90 8 80)" text-anchor="middle">Energie der π-Orbitale</text>';
    for (i = 0; i < N; i++) {
      var occ = i < n, y = py(ks[i]), homo = i === n - 1, lumo = i === n, col = homo ? '#2563eb' : lumo ? '#dc2626' : '#64748b';
      s += '<line x1="60" x2="160" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + col + '" stroke-width="' + (homo || lumo ? 3.2 : 2) + '" stroke-linecap="round"/>';
      if (occ) s += '<text x="110" y="' + (y - 3).toFixed(1) + '" font-size="11" text-anchor="middle" fill="' + col + '">↑↓</text>';
      if (homo) s += '<text x="168" y="' + (y + 4).toFixed(1) + '" font-size="10.5" fill="#2563eb" font-weight="700">höchstes besetztes</text>';
      if (lumo) s += '<text x="168" y="' + (y + 4).toFixed(1) + '" font-size="10.5" fill="#dc2626" font-weight="700">niedrigstes leeres</text>';
    }
    var yh = py(ks[n - 1]), yl = py(ks[n]);
    s += '<path d="M44 ' + yh.toFixed(1) + ' V' + yl.toFixed(1) + '" stroke="#b45309" stroke-width="2" marker-start="url(#lv-a-' + svg.id + ')" marker-end="url(#lv-a-' + svg.id + ')"/>' +
      '<text x="40" y="' + ((yh + yl) / 2 + 3).toFixed(1) + '" font-size="11" fill="#b45309" font-weight="800" text-anchor="end">ΔE</text>';
    svg.setAttribute('viewBox', '0 0 280 160');
    svg.innerHTML = '<defs><marker id="lv-a-' + svg.id + '" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6Z" fill="#b45309"/></marker></defs>' + s;
    return ks[n - 1] - ks[n];
  }

  var LAM = [165, 217, 258, 290, 334, 364, 390, 410, 430, 448, 465, 477, 486, 494];   // λmax von H–(CH=CH)n–H für n = 1 … 14 (gerundete Modellwerte)
  window.Farbe = { LAM: LAM, band: band, colorOf: colorOf, rgbCss: rgbCss, colorName: colorName, absorbedName: absorbedName, plot: plot, beaker: beaker, setBeaker: setBeaker, levels: levels, hsv: hsv, wlRGB: wlRGB };
})();
