/*
  Strukturformeln der Phthaleine als SVG (Phenolphthalein, o-Kresolphthalein, Thymolphthalein).
  Struct.build(form, variant): form 'lac' (H2In, Lactonform), 'dian' (In2-, chinoid), 'carb' (In(OH)3-, Carbinol)
  Struct.draw(svg, mol, {sets: true|false, hl: {atoms:[…]}})
  Die Formeln sind schematisch gezeichnet (Strichformeln mit Ringen); π-Systeme lassen sich farbig unterlegen.
*/
(function () {
  'use strict';
  var L = 30, R = Math.PI / 180, NS = 'http://www.w3.org/2000/svg';
  function dir(a) { return [Math.cos(a * R), Math.sin(a * R)]; }
  function Mol() { this.at = []; this.bd = []; this.n = {}; this.sets = []; }
  Mol.prototype.add = function (x, y, lab) { this.at.push({ x: x, y: y, lab: lab || '' }); return this.at.length - 1; };
  Mol.prototype.bond = function (a, b, ord, c) { this.bd.push({ a: a, b: b, ord: ord || 1, c: c || null }); };
  Mol.prototype.sub = function (i, len, ang, lab, ord) { var a = this.at[i], d = dir(ang), j = this.add(a.x + len * d[0], a.y + len * d[1], lab); this.bond(i, j, ord || 1); return j; };

  // Benzolring, der in Richtung theta an das zentrale C-Atom (c0) gebunden ist; ids[0] = C1 (ipso), ids[3] = para
  function arene(m, c0, theta, dbl, o) {
    o = o || {}; var d = dir(theta), cx = 2 * L * d[0], cy = 2 * L * d[1], ids = [], k, v;
    for (k = 0; k < 6; k++) { v = dir(theta + 180 + 60 * k); ids.push(m.add(cx + L * v[0], cy + L * v[1])); }
    for (k = 0; k < 6; k++) m.bond(ids[k], ids[(k + 1) % 6], dbl.indexOf(k) >= 0 ? 2 : 1, [cx, cy]);
    m.bond(c0, ids[0], o.exo || 1);
    var oi = null; if (o.end) oi = m.sub(ids[3], L, theta, o.end, o.endOrd || 1);
    (o.subs || []).forEach(function (s) { m.sub(ids[s.k], L, theta + 180 + 60 * s.k, s.lab); });
    return { ids: ids, oi: oi, c: [cx, cy] };
  }

  var VARIANTS = {
    phenolphthalein: { name: 'Phenolphthalein', subs: [] },
    kresol: { name: 'o-Kresolphthalein', subs: [{ k: 2, lab: 'CH₃' }] },
    thymol: { name: 'Thymolphthalein', subs: [{ k: 1, lab: 'iPr' }, { k: 4, lab: 'CH₃' }] }
  };

  function build(form, variant) {
    var v = VARIANTS[variant || 'phenolphthalein'] || VARIANTS.phenolphthalein, m = new Mol(), c0 = m.add(0, 0, ''), A, B, C, sA = [], sB = [];
    v.subs.forEach(function (s) { sB.push({ k: s.k, lab: s.lab }); sA.push({ k: (6 - s.k) % 6, lab: s.lab }); });
    m.n.c0 = c0;
    if (form === 'lac') {
      A = arene(m, c0, 150, [0, 2, 4], { end: 'OH', subs: sA }); B = arene(m, c0, 30, [0, 2, 4], { end: 'OH', subs: sB });
      var Rp = L / (2 * Math.sin(36 * R)), pcx = 0, pcy = -Rp, P = [c0], k, a;
      for (k = 1; k < 5; k++) { a = 90 + 72 * k; P.push(m.add(pcx + Rp * Math.cos(a * R), pcy + Rp * Math.sin(a * R))); }
      m.bond(c0, P[1], 1); m.bond(P[2], P[3], 1); m.bond(P[3], P[4], 1); m.bond(P[4], c0, 1);
      m.at[P[4]].lab = 'O';
      var mx = (m.at[P[1]].x + m.at[P[2]].x) / 2, my = (m.at[P[1]].y + m.at[P[2]].y) / 2, ox = mx - pcx, oy = my - pcy, ol = Math.sqrt(ox * ox + oy * oy);
      var bcx = mx + ox / ol * L * 0.866, bcy = my + oy / ol * L * 0.866;
      var a0 = Math.atan2(m.at[P[1]].y - bcy, m.at[P[1]].x - bcx) / R, a1 = Math.atan2(m.at[P[2]].y - bcy, m.at[P[2]].x - bcx) / R;
      var diff = ((a1 - a0 + 540) % 360) - 180, step = diff > 0 ? 60 : -60, ids = [P[1], P[2]], p;
      for (k = 2; k < 6; k++) { p = a0 + step * k; ids.push(m.add(bcx + L * Math.cos(p * R), bcy + L * Math.sin(p * R))); }
      for (k = 0; k < 6; k++) m.bond(ids[k], ids[(k + 1) % 6], k % 2 === 0 ? 2 : 1, [bcx, bcy]);
      var ca = Math.atan2(m.at[P[3]].y - pcy, m.at[P[3]].x - pcx) / R, oc = m.sub(P[3], L, ca, 'O', 2);
      m.n.A = A.ids; m.n.B = B.ids; m.n.C = ids; m.n.oA = A.oi; m.n.oB = B.oi; m.n.carbonylC = P[3]; m.n.ringO = P[4]; m.n.carbonylO = oc;
      m.sets = [{ at: A.ids.concat([A.oi]), col: '#2563eb' }, { at: B.ids.concat([B.oi]), col: '#16a34a' }, { at: ids.concat([P[3], oc]), col: '#d97706' }];
    } else if (form === 'dian') {
      A = arene(m, c0, 150, [0, 2, 4], { end: 'O⁻', subs: sA }); B = arene(m, c0, 30, [1, 4], { end: 'O', endOrd: 2, exo: 2, subs: sB });
      C = arene(m, c0, 270, [0, 2, 4], { subs: [{ k: 1, lab: 'COO⁻' }] });
      m.n.A = A.ids; m.n.B = B.ids; m.n.C = C.ids; m.n.oA = A.oi; m.n.oB = B.oi;
      m.sets = [{ at: A.ids.concat([A.oi, c0], B.ids, [B.oi]), col: '#c026d3', big: true }, { at: C.ids, col: '#d97706' }];
    } else {
      A = arene(m, c0, 160, [0, 2, 4], { end: 'O⁻', subs: sA }); B = arene(m, c0, 20, [0, 2, 4], { end: 'O⁻', subs: sB });
      C = arene(m, c0, 270, [0, 2, 4], { subs: [{ k: 1, lab: 'COO⁻' }] });
      var oh = m.sub(c0, L, 90, 'OH');
      m.n.A = A.ids; m.n.B = B.ids; m.n.C = C.ids; m.n.oA = A.oi; m.n.oB = B.oi; m.n.oh = oh;
      m.sets = [{ at: A.ids.concat([A.oi]), col: '#2563eb' }, { at: B.ids.concat([B.oi]), col: '#16a34a' }, { at: C.ids, col: '#d97706' }];
    }
    m.form = form; return m;
  }

  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }

  function draw(svg, m, o) {
    o = o || {}; var minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9;
    m.at.forEach(function (a) { var w = a.lab ? (a.lab.length > 3 ? 30 : 14) : 6; minx = Math.min(minx, a.x - w); maxx = Math.max(maxx, a.x + w); miny = Math.min(miny, a.y - 16); maxy = Math.max(maxy, a.y + 16); });
    var pad = 14, W = maxx - minx + 2 * pad, H = maxy - miny + 2 * pad;
    svg.setAttribute('viewBox', [minx - pad, miny - pad, W, H].join(' ')); svg.innerHTML = '';
    var g0 = el('g', {}, svg);
    if (o.sets) {
      m.sets.forEach(function (s) {
        var g = el('g', { opacity: o.big && !s.big ? 0.18 : 0.30 }, g0), inS = {}; s.at.forEach(function (i) { inS[i] = 1; });
        s.at.forEach(function (i) { el('circle', { cx: m.at[i].x, cy: m.at[i].y, r: 13, fill: s.col }, g); });
        m.bd.forEach(function (b) { if (inS[b.a] && inS[b.b]) el('line', { x1: m.at[b.a].x, y1: m.at[b.a].y, x2: m.at[b.b].x, y2: m.at[b.b].y, stroke: s.col, 'stroke-width': 26, 'stroke-linecap': 'round' }, g); });
      });
    }
    var gb = el('g', { stroke: '#1e293b', 'stroke-width': 2.2, 'stroke-linecap': 'round', fill: 'none' }, svg);
    function trim(i) { var l = m.at[i].lab; return l ? Math.min(24, l.length * 5 + 6) : 0; }
    m.bd.forEach(function (b) {
      var p = m.at[b.a], q = m.at[b.b], dx = q.x - p.x, dy = q.y - p.y, len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len;
      var x1 = p.x + ux * trim(b.a), y1 = p.y + uy * trim(b.a), x2 = q.x - ux * trim(b.b), y2 = q.y - uy * trim(b.b);
      var hl = o.hl && o.hl.bonds && o.hl.bonds.some(function (h) { return (h[0] === b.a && h[1] === b.b) || (h[0] === b.b && h[1] === b.a); });
      var col = hl ? '#ea580c' : '#1e293b', w = hl ? 3.4 : 2.2;
      if (b.ord === 1) el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col, 'stroke-width': w }, gb);
      else if (b.c) {
        el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col, 'stroke-width': w }, gb);
        var mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, nx = -uy, ny = ux, s = ((b.c[0] - mx) * nx + (b.c[1] - my) * ny) > 0 ? 1 : -1, off = 5.6;
        el('line', { x1: x1 + nx * s * off + ux * 4, y1: y1 + ny * s * off + uy * 4, x2: x2 + nx * s * off - ux * 4, y2: y2 + ny * s * off - uy * 4, stroke: col, 'stroke-width': w }, gb);
      } else {
        var nx2 = -uy * 2.9, ny2 = ux * 2.9;
        el('line', { x1: x1 + nx2, y1: y1 + ny2, x2: x2 + nx2, y2: y2 + ny2, stroke: col, 'stroke-width': w }, gb);
        el('line', { x1: x1 - nx2, y1: y1 - ny2, x2: x2 - nx2, y2: y2 - ny2, stroke: col, 'stroke-width': w }, gb);
      }
    });
    var gt = el('g', { 'font-family': 'Segoe UI, system-ui, sans-serif', 'font-size': 15, 'font-weight': 700, fill: '#0f172a', 'text-anchor': 'middle' }, svg);
    m.at.forEach(function (a, i) {
      if (o.hl && o.hl.atoms && o.hl.atoms.indexOf(i) >= 0) el('circle', { cx: a.x, cy: a.y, r: 15, fill: 'none', stroke: '#ea580c', 'stroke-width': 2.6, 'stroke-dasharray': '4 3' }, svg);
      if (!a.lab) return;
      var t = el('text', { x: a.x, y: a.y + 5.4 }, gt); t.textContent = a.lab;
      if (/[OH]/.test(a.lab) && a.lab !== 'iPr' && a.lab.indexOf('CH') < 0) t.setAttribute('fill', '#b91c1c');
    });
    if (o.c0label) { var t2 = el('text', { x: m.at[m.n.c0].x + 11, y: m.at[m.n.c0].y + 4.5, 'font-size': 12, 'font-weight': 700, fill: '#64748b', 'font-family': 'system-ui, sans-serif' }, svg); t2.textContent = o.c0label; }
  }

  window.Struct = { build: build, draw: draw, VARIANTS: VARIANTS };
})();
