/* Gleichungsbaukasten: Koeffizienten wählen, Atom- und Ladungsbilanz wird live angezeigt. */
(function () {
  'use strict';
  var ORDER = ['R', 'C', 'H', 'O', 'Cu', 'Ag', 'q'], LBL = { q: 'Ladung', R: 'Rest R' };
  window.SP = {
    ald:  { f: 'R–CHO', c: { R: 1, C: 1, H: 1, O: 1 } },
    ate:  { f: 'R–COO⁻', c: { R: 1, C: 1, O: 2, q: -1 } },
    oh:   { f: 'OH⁻', c: { O: 1, H: 1, q: -1 } },
    h2o:  { f: 'H₂O', c: { H: 2, O: 1 } },
    e:    { f: 'e⁻', c: { q: -1 } },
    cu:   { f: 'Cu²⁺', c: { Cu: 1, q: 2 } },
    cu2o: { f: 'Cu₂O', c: { Cu: 2, O: 1 } },
    ag:   { f: 'Ag⁺', c: { Ag: 1, q: 1 } },
    ag0:  { f: 'Ag', c: { Ag: 1 } }
  };
  // o = { sp:[{k:'ald', side:0|1, fix:1?}], sol:[…], mod, why, lead }
  window.eqn = function (box, o) {
    var d = document.createElement('div'); d.className = 'q eq';
    var h = o.lead ? '<p class="qt">' + o.lead + '</p>' : '';
    h += '<div class="eqrow">';
    var prev = null;
    o.sp.forEach(function (s, i) {
      if (prev !== null && s.side !== prev) h += '<span class="eqop">→</span>'; else if (prev !== null) h += '<span class="eqop">+</span>';
      prev = s.side;
      h += '<span class="eqsp">' + (s.fix ? '' : '<select data-i="' + i + '" aria-label="Koeffizient"><option value="0">·</option>' + [1, 2, 3, 4, 5, 6].map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('') + '</select>') + '<span class="f">' + SP[s.k].f + '</span></span>';
    });
    h += '</div><table class="bil"><thead><tr><th>Bilanz</th><th>links</th><th>rechts</th><th></th></tr></thead><tbody></tbody></table>';
    h += '<div style="margin-top:8px"><button class="btn gchk">Prüfen</button></div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), tb = d.querySelector('tbody'), done = false;
    var keys = ORDER.filter(function (k) { return o.sp.some(function (s) { return SP[s.k].c[k]; }); });
    function coefs() { return o.sp.map(function (s, i) { if (s.fix) return s.fix; var sel = d.querySelector('select[data-i="' + i + '"]'); return +sel.value; }); }
    function bil() {
      var c = coefs(), rows = [], ok = true, any = false;
      keys.forEach(function (k) {
        var L = 0, R = 0;
        o.sp.forEach(function (s, i) { var v = (SP[s.k].c[k] || 0) * c[i]; if (s.side === 0) L += v; else R += v; if (c[i]) any = true; });
        rows.push([k, L, R]); if (L !== R) ok = false;
      });
      return { rows: rows, ok: ok && any, c: c };
    }
    function paint() {
      var b = bil(); tb.innerHTML = '';
      b.rows.forEach(function (r) {
        var tr = document.createElement('tr'), eq = r[1] === r[2];
        tr.className = eq ? 'eqok' : 'eqno';
        tr.innerHTML = '<td>' + (LBL[r[0]] || r[0]) + '</td><td>' + String(r[1]).replace('-', '−') + '</td><td>' + String(r[2]).replace('-', '−') + '</td><td>' + (eq ? '✔' : '✗') + '</td>'; tb.appendChild(tr);
      });
      return b;
    }
    d.addEventListener('change', function () { if (!done) { paint(); fb.hidden = true; } });
    paint();
    d.querySelector('.gchk').addEventListener('click', function () {
      if (done) return;
      var b = paint(); fb.hidden = false;
      if (!b.ok) { fb.className = 'fb bad'; fb.innerHTML = '✗ Die Bilanz stimmt noch nicht. Zeilen mit ✗ zeigen, wo links und rechts verschieden sind. Denke auch an die Ladung.'; return; }
      var sol = o.sol, same = b.c.every(function (v, i) { return v === sol[i]; });
      if (!same) {
        var g = 0; b.c.forEach(function (v) { var a = v, bb = g; while (bb) { var t = a % bb; a = bb; bb = t; } g = a; });
        fb.className = 'fb bad';
        fb.innerHTML = g > 1 ? '✗ Die Bilanz stimmt, aber die Zahlen lassen sich noch durch ' + g + ' teilen. Gib die kleinsten ganzen Zahlen an.' : '✗ Die Bilanz stimmt, aber so ist die Gleichung nicht gemeint. Prüfe, ob du alle Teilchen sinnvoll verwendet hast.';
        return;
      }
      done = true; note(o.why); fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. ' + (o.why || '');
      Array.prototype.forEach.call(d.querySelectorAll('select'), function (s) { s.disabled = true; });
      d.classList.add('done'); if (o.mod) Prog.done(o.mod); if (o.after) o.after();
    });
    return d;
  };
})();
