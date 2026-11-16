/* Zeichen-Bausteine für die Erklär-Folien der Helfer (SVG als Text, keine externen Dateien). */
(function () {
  'use strict';
  var INK = '#1e293b', RED = '#dc2626', BLU = '#2563eb', GRN = '#16a34a', ORA = '#ea580c', VIO = '#7c3aed', GRY = '#94a3b8', TEA = '#0d9488', YEL = '#ca8a04';
  function a(o, k, d) { return o && o[k] !== undefined ? o[k] : d; }
  var G = { INK: INK, RED: RED, BLU: BLU, GRN: GRN, ORA: ORA, VIO: VIO, GRY: GRY, TEA: TEA, YEL: YEL };
  G.svg = function (w, h, inner) {
    var mk = function (id, col) { return '<marker id="' + id + '" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8Z" fill="' + col + '"/></marker>'; };
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="13" fill="' + INK + '" role="img"><defs>' +
      mk('ah', INK) + mk('ahr', RED) + mk('ahb', BLU) + mk('ahg', GRN) + mk('aho', ORA) + mk('ahv', VIO) + '</defs>' + inner + '</svg>';
  };
  var AH = { '#1e293b': 'ah', '#dc2626': 'ahr', '#2563eb': 'ahb', '#16a34a': 'ahg', '#ea580c': 'aho', '#7c3aed': 'ahv' };
  G.t = function (x, y, s, o) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + a(o, 's', 13) + '" fill="' + a(o, 'c', INK) + '" text-anchor="' + a(o, 'a', 'middle') + '"' + (a(o, 'b', 0) ? ' font-weight="700"' : '') + (a(o, 'i', 0) ? ' font-style="italic"' : '') + (o && o.rot ? ' transform="rotate(' + o.rot + ' ' + x + ' ' + y + ')"' : '') + '>' + s + '</text>';
  };
  G.l = function (x1, y1, x2, y2, o) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + a(o, 'c', INK) + '" stroke-width="' + a(o, 'w', 2) + '" stroke-linecap="round"' + (o && o.d ? ' stroke-dasharray="' + o.d + '"' : '') + '/>';
  };
  G.ar = function (x1, y1, x2, y2, o) {
    var c = a(o, 'c', INK);
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + a(o, 'w', 2.2) + '" stroke-linecap="round" marker-end="url(#' + (AH[c] || 'ah') + ')"' + (o && o.d ? ' stroke-dasharray="' + o.d + '"' : '') + '/>';
  };
  G.r = function (x, y, w, h, o) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + a(o, 'rx', 6) + '" fill="' + a(o, 'f', '#fff') + '" stroke="' + a(o, 's', INK) + '" stroke-width="' + a(o, 'w', 1.8) + '"' + (o && o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
  };
  G.c = function (x, y, r, o) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + a(o, 'f', '#fff') + '" stroke="' + a(o, 's', INK) + '" stroke-width="' + a(o, 'w', 1.8) + '"' + (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
  };
  G.p = function (d, o) {
    return '<path d="' + d + '" fill="' + a(o, 'f', 'none') + '" stroke="' + a(o, 's', INK) + '" stroke-width="' + a(o, 'w', 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (o && o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o && o.m ? ' marker-end="url(#' + (AH[a(o, 's', INK)] || 'ah') + ')"' : '') + (o && o.op ? ' opacity="' + o.op + '"' : '') + '/>';
  };
  /* Atom mit weißem Hintergrund (Label) */
  G.at = function (x, y, s, o) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + a(o, 'r', 10) + '" fill="' + a(o, 'bg', '#fff') + '"/>' + G.t(x, y + 5, s, { s: a(o, 's', 15), b: 1, c: a(o, 'c', INK) });
  };
  /* Bindung mit Ordnung n (1–3) */
  G.b = function (x1, y1, x2, y2, n, o) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / L * 3.2, ny = dx / L * 3.2, c = a(o, 'c', INK), w = a(o, 'w', 2), s = '';
    n = n || 1;
    if (n === 1) return G.l(x1, y1, x2, y2, { c: c, w: w });
    if (n === 2) return G.l(x1 + nx, y1 + ny, x2 + nx, y2 + ny, { c: c, w: w }) + G.l(x1 - nx, y1 - ny, x2 - nx, y2 - ny, { c: c, w: w });
    return G.l(x1, y1, x2, y2, { c: c, w: w }) + G.l(x1 + 2 * nx, y1 + 2 * ny, x2 + 2 * nx, y2 + 2 * ny, { c: c, w: w }) + G.l(x1 - 2 * nx, y1 - 2 * ny, x2 - 2 * nx, y2 - 2 * ny, { c: c, w: w });
  };
  /* Benzolring (Sechseck, Mittelpunkt, Radius), Kekulé mit 3 Doppelbindungen oder Kreis */
  G.benz = function (cx, cy, r, o) {
    var v = [], i, s = '';
    for (i = 0; i < 6; i++) { var f = (30 + 60 * i) * Math.PI / 180; v.push([cx + r * Math.cos(f), cy + r * Math.sin(f)]); }
    var d = 'M' + v.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L') + ' Z';
    s += G.p(d, { s: a(o, 'c', INK), w: 2 });
    if (a(o, 'circle', 0)) s += G.c(cx, cy, r * 0.62, { f: 'none', s: a(o, 'c', INK), w: 1.8 });
    else for (i = 0; i < 6; i += 2) { var p1 = v[i], p2 = v[(i + 1) % 6], mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2, dx = cx - mx, dy = cy - my, L = Math.sqrt(dx * dx + dy * dy), k = 4.5 / L; s += G.l(p1[0] + dx * k + (p2[0] - p1[0]) * .14, p1[1] + dy * k + (p2[1] - p1[1]) * .14, p2[0] + dx * k - (p2[0] - p1[0]) * .14, p2[1] + dy * k - (p2[1] - p1[1]) * .14, { c: a(o, 'c', INK), w: 1.8 }); }
    return s;
  };
  G.bub = function (x, y, w, h, s, o) {   // beschriftete Box
    return G.r(x, y, w, h, o) + G.t(x + w / 2, y + h / 2 + 4.5, s, { c: a(o, 'tc', INK), b: a(o, 'b', 0), s: a(o, 'fs', 13) });
  };
  G.ax = function (x, y, w, h, xl, yl, o) {   // Koordinatenachsen, Ursprung unten links (x,y = unten links)
    return G.ar(x, y, x + w, y, { c: INK, w: 1.8 }) + G.ar(x, y, x, y - h, { c: INK, w: 1.8 }) +
      (xl ? G.t(x + w, y + 16, xl, { a: 'end', s: 12 }) : '') + (yl ? G.t(x - 6, y - h - 6, yl, { a: 'start', s: 12 }) : '');
  };
  G.beaker = function (x, y, w, h, fill, o) {   // Becherglas, (x,y) = obere linke Ecke
    var lvl = a(o, 'lvl', 0.55), fy = y + h * (1 - lvl);
    return G.r(x + 2, fy, w - 4, y + h - fy - 2, { f: fill, s: 'none', rx: 2, op: .9 }) +
      G.p('M' + x + ' ' + y + ' V' + (y + h) + ' H' + (x + w) + ' V' + y, { w: 2.4 }) + (o && o.label ? G.t(x + w / 2, y + h + 15, o.label, { s: 12 }) : '');
  };
  G.dots = function (pts, r, f, s) { return pts.map(function (p) { return G.c(p[0], p[1], r, { f: f || '#fff', s: s || INK, w: 1.6 }); }).join(''); };
  G.zig = function (x, y, n, dx, dy) { var p = [], i; for (i = 0; i < n; i++) p.push([x + i * dx, y + (i % 2 ? -dy : 0)]); return p; };
  G.chain = function (pts, o) { var s = '', i; for (i = 0; i < pts.length - 1; i++) s += G.l(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], o); return s; };
  G.chip = function (x, y, s, col) { var w = s.length * 7.4 + 16; return G.r(x, y, w, 22, { f: col || '#e0f2fe', s: col ? INK : BLU, rx: 11, w: 1.4 }) + G.t(x + w / 2, y + 15, s, { s: 12 }); };
  /* Energieprofil: exo oder endo, optional Katalysator; Beschriftung deutsch */
  G.energy = function (o) {
    var exo = a(o, 'exo', 1), cat = a(o, 'cat', 0), W = 360, H = 220, x0 = 50, ye = exo ? 84 : 150, yp = exo ? 150 : 84, top = 28, s = '';
    s += G.ax(x0, 196, 290, 176, 'Reaktionsverlauf', 'Energie');
    var curve = 'M60 ' + ye + ' H110 C140 ' + ye + ' 140 ' + top + ' 180 ' + top + ' C220 ' + top + ' 220 ' + yp + ' 250 ' + yp + ' H320';
    s += G.p(curve, { s: ORA, w: 3 });
    if (cat) s += G.p('M60 ' + ye + ' H110 C140 ' + ye + ' 140 ' + (top + 44) + ' 180 ' + (top + 44) + ' C220 ' + (top + 44) + ' 220 ' + yp + ' 250 ' + yp + ' H320', { s: GRN, w: 3, d: '6 4' });
    s += G.t(84, ye + 18, 'Edukte', { s: 12 }) + G.t(270, yp + 18, 'Produkte', { s: 12 });
    if (a(o, 'ea', 1)) { s += G.ar(100, ye, 100, top, { c: BLU, w: 2 }) + G.t(96, (ye + top) / 2 + 4, 'EA', { c: BLU, a: 'end', b: 1 }); }
    if (a(o, 'dh', 1)) { s += G.ar(304, ye, 304, yp, { c: RED, w: 2 }) + G.t(310, (ye + yp) / 2 + 4, 'ΔH', { c: RED, a: 'start', b: 1 }); s += G.l(250, ye, 304, ye, { c: GRY, w: 1, d: '3 3' }); }
    return G.svg(W, H, s);
  };
  window.GFig = G;
})();
