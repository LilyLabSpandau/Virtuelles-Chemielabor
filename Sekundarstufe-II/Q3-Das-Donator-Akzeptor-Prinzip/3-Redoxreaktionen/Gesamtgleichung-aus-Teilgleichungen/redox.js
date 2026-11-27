/* Bausteine: Formelschreibweise, Gleichungsbaukasten (Koeffizienten, Atom- und Ladungsbilanz), Elektronen-Waage, Reihenfolge-Spiel */
(function () {
  'use strict';
  function fmt(s) {
    var p = s.split('^'), b = p[0].replace(/(\d+)/g, '<sub>$1</sub>'), c = p[1] || '';
    if (c) { var sg = c.slice(-1), n = c.slice(0, -1); b += '<sup>' + (n === '1' ? '' : n) + (sg === '+' ? '+' : '−') + '</sup>'; }
    return b;
  }
  window.E = function (str) {
    return str.split(' ').map(function (t) { return (t === '+' || t === '→' || t === '×' || t === '(' || t === ')' || /^\d+$/.test(t)) ? t : fmt(t); }).join(' ');
  };
  function parse(s) {
    var p = s.split('^'), c = {}, q = 0, m, re = /([A-Z][a-z]?)(\d*)/g;
    while ((m = re.exec(p[0]))) c[m[1]] = (c[m[1]] || 0) + (m[2] ? +m[2] : 1);
    if (p[1]) { var sg = p[1].slice(-1), n = p[1].slice(0, -1); q = (n ? +n : 1) * (sg === '+' ? 1 : -1); }
    return { c: c, q: q };
  }
  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
  function lcm(a, b) { return a * b / gcd(a, b); }
  window.lcm = lcm;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  window.shuffleArr = shuffle;

  // ------------------------------------------------------------ Gleichungsbaukasten
  // o = { lead, sp:[{f:'Al', side:0|1, fix?:n}], sol:[…], mod, why, noE:true (Elektronen müssen fehlen) }
  window.build = function (box, o) {
    var d = document.createElement('div'); d.className = 'q eq';
    var h = (o.lead ? '<p class="qt">' + o.lead + '</p>' : '') + '<div class="eqrow">', prev = null;
    var P = o.sp.map(function (s) { return parse(s.f); });
    var opts = '<option value="0">·</option>'; for (var n = 1; n <= 24; n++) opts += '<option value="' + n + '">' + n + '</option>';
    o.sp.forEach(function (s, i) {
      if (prev !== null) h += s.side !== prev ? '<span class="eqop">→</span>' : '<span class="eqop">+</span>';
      prev = s.side;
      h += '<span class="eqsp">' + (s.fix ? (s.fix > 1 ? s.fix + ' ' : '') : '<select data-i="' + i + '" aria-label="Koeffizient">' + opts + '</select>') + '<span class="f">' + fmt(s.f) + '</span></span>';
    });
    h += '</div><table class="bil"><thead><tr><th>Bilanz</th><th>links</th><th>rechts</th><th></th></tr></thead><tbody></tbody></table>';
    h += '<div style="margin-top:8px"><button class="btn gchk">Prüfen</button></div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), tb = d.querySelector('tbody'), done = false, keys = [];
    P.forEach(function (p) { Object.keys(p.c).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
    function coefs() { return o.sp.map(function (s, i) { return s.fix ? s.fix : +d.querySelector('select[data-i="' + i + '"]').value; }); }
    function bil() {
      var c = coefs(), rows = [], ok = true, any = c.some(function (v) { return v > 0; });
      keys.concat(['q']).forEach(function (k) {
        var L = 0, R = 0;
        o.sp.forEach(function (s, i) { var v = (k === 'q' ? P[i].q : (P[i].c[k] || 0)) * c[i]; if (s.side === 0) L += v; else R += v; });
        rows.push([k === 'q' ? 'Ladung' : k, L, R]); if (L !== R) ok = false;
      });
      return { rows: rows, ok: ok && any, c: c };
    }
    function paint() {
      var b = bil(); tb.innerHTML = '';
      b.rows.forEach(function (r) {
        var tr = document.createElement('tr'), eq = r[1] === r[2]; tr.className = eq ? 'eqok' : 'eqno';
        tr.innerHTML = '<td>' + r[0] + '</td><td>' + String(r[1]).replace('-', '−') + '</td><td>' + String(r[2]).replace('-', '−') + '</td><td>' + (eq ? '✔' : '✗') + '</td>'; tb.appendChild(tr);
      });
      return b;
    }
    d.addEventListener('change', function () { if (!done) { paint(); fb.hidden = true; } });
    paint();
    d.querySelector('.gchk').addEventListener('click', function () {
      if (done) return;
      var b = paint(); fb.hidden = false;
      if (!b.ok) { fb.className = 'fb bad'; fb.innerHTML = '✗ Die Bilanz stimmt noch nicht. Zeilen mit ✗ zeigen, wo links und rechts verschieden sind. Denke auch an die Ladung.'; return; }
      var same = b.c.every(function (v, i) { return v === o.sol[i]; });
      if (!same) {
        var g = 0; b.c.forEach(function (v) { g = gcd(g, v); });
        fb.className = 'fb bad';
        fb.innerHTML = g > 1 ? '✗ Die Bilanz stimmt, aber alle Zahlen lassen sich noch durch ' + g + ' teilen. Gib die kleinsten ganzen Zahlen an.' : '✗ Die Bilanz stimmt, aber die Gleichung ist nicht die gesuchte. Prüfe, ob sich noch Teilchen auf beiden Seiten kürzen lassen.';
        return;
      }
      done = true; note(o.why); fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. ' + (o.why || '');
      Array.prototype.forEach.call(d.querySelectorAll('select'), function (s) { s.disabled = true; });
      d.classList.add('done'); if (o.mod) Prog.done(o.mod); if (o.after) o.after();
    });
    return d;
  };

  // ------------------------------------------------------------ Elektronen-Waage
  // o = { lead, ox:{eq,n}, red:{eq,n}, blind:bool, mod, after:fn(stars), why }
  window.waage = function (box, o) {
    var d = document.createElement('div'); d.className = 'q wg';
    var Lc = lcm(o.ox.n, o.red.n), sol = [Lc / o.ox.n, Lc / o.red.n], a = 1, b = 1, shown = !o.blind, weigh = 0, done = false, last = null;
    function card(i, t, e) { return '<div class="wc"><div class="wh">' + t + '</div><div class="weq"></div><div class="wm"><button class="btn sec dec" aria-label="Faktor kleiner">−</button><b class="mul">× 1</b><button class="btn sec inc" aria-label="Faktor größer">+</button></div></div>'; }
    d.innerHTML = (o.lead ? '<p class="qt">' + o.lead + '</p>' : '') + '<div class="wgcards">' + card(0, 'Oxidation') + card(1, 'Reduktion') + '</div><svg class="wsvg" viewBox="0 0 360 250" role="img" aria-label="Waage mit Elektronen"></svg>' +
      '<div class="row">' + (o.blind ? '<button class="btn wbtn">⚖ Wiegen</button><span class="small wcnt"></span>' : '') + '</div><div class="fb" hidden></div>';
    box.appendChild(d);
    var svg = d.querySelector('svg'), fb = d.querySelector('.fb'), eqs = d.querySelectorAll('.weq'), muls = d.querySelectorAll('.mul');
    function draw() {
      var lw = a * o.ox.n, rw = b * o.red.n;
      eqs[0].innerHTML = a + ' × ( ' + E(o.ox.eq) + ' )'; eqs[1].innerHTML = b + ' × ( ' + E(o.red.eq) + ' )';
      muls[0].textContent = '× ' + a; muls[1].textContent = '× ' + b;
      var ang = shown ? Math.max(-14, Math.min(14, (rw - lw) * 2.5)) : 0, r = ang * Math.PI / 180, cx = 180, cy = 56, hl = 130;
      var lx = cx - hl * Math.cos(r), ly = cy - hl * Math.sin(r), rx = cx + hl * Math.cos(r), ry = cy + hl * Math.sin(r);
      var s = '<line x1="180" y1="56" x2="180" y2="236" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/><rect x="130" y="232" width="100" height="10" rx="5" fill="#94a3b8"/>';
      s += '<line x1="' + lx + '" y1="' + ly + '" x2="' + rx + '" y2="' + ry + '" stroke="#475569" stroke-width="7" stroke-linecap="round"/><circle cx="180" cy="56" r="9" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>';
      [[lx, ly, lw, 'abgegeben'], [rx, ry, rw, 'aufgenommen']].forEach(function (p) {
        var px = p[0], py = p[1] + 118;
        s += '<line x1="' + px + '" y1="' + py1(p[1]) + '" x2="' + (px - 46) + '" y2="' + py + '" stroke="#94a3b8"/><line x1="' + px + '" y1="' + py1(p[1]) + '" x2="' + (px + 46) + '" y2="' + py + '" stroke="#94a3b8"/>';
        s += '<path d="M' + (px - 52) + ' ' + (py - 2) + ' h104 l-10 14 h-84 z" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>';
        if (shown) {
          var n = p[2], cols = 6, row = 0, left = n;
          while (left > 0) { var inrow = Math.min(cols, left); for (var k = 0; k < inrow; k++) s += '<circle cx="' + (px - (inrow - 1) * 8 + k * 16) + '" cy="' + (py - 9 - row * 15) + '" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>'; left -= inrow; row++; }
          s += '<text x="' + Math.max(62, Math.min(298, px)) + '" y="' + (py + 30) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#334155">' + n + ' e⁻ ' + p[3] + '</text>';
        } else s += '<text x="' + px + '" y="' + (py - 12) + '" text-anchor="middle" font-size="26" font-weight="800" fill="#94a3b8">?</text><text x="' + px + '" y="' + (py + 30) + '" text-anchor="middle" font-size="14" fill="#64748b">e⁻ ' + p[3] + '</text>';
      });
      svg.innerHTML = s;
      function py1(y) { return y + 2; }
    }
    function evaluate() {
      var lw = a * o.ox.n, rw = b * o.red.n; fb.hidden = false; shown = true; draw();
      if (lw === rw && a === sol[0] && b === sol[1]) {
        done = true; var stars = o.blind ? Math.max(1, 4 - weigh) : 0, why = 'Beide Seiten tauschen ' + lw + ' Elektronen aus: das kleinste gemeinsame Vielfache von ' + o.ox.n + ' und ' + o.red.n + '.';
        note(why); fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. ' + why + (o.blind ? ' ' + '★★★'.slice(0, stars) + '☆☆☆'.slice(0, 3 - stars) : '');
        Array.prototype.forEach.call(d.querySelectorAll('button'), function (x) { x.disabled = true; }); d.classList.add('done');
        if (o.mod) Prog.done(o.mod); if (o.after) o.after(stars);
      } else if (lw === rw) { fb.className = 'fb bad'; fb.innerHTML = '✗ Die Waage steht im Gleichgewicht, aber es geht mit kleineren Faktoren. Gesucht ist das kleinste gemeinsame Vielfache der Elektronenzahlen.'; }
      else { fb.className = 'fb bad'; fb.innerHTML = '✗ Die Waage kippt nach ' + (lw > rw ? 'links' : 'rechts') + (o.blind ? '. Die Seite mit den meisten Elektronen zieht nach unten.' : ': ' + lw + ' e⁻ abgegeben, ' + rw + ' e⁻ aufgenommen.'); }
    }
    function change() { if (done) return; if (o.blind) { shown = false; fb.hidden = true; draw(); } else evaluate(); }
    d.addEventListener('click', function (e) {
      if (done) return; var t = e.target.closest ? e.target.closest('button') : null; if (!t) return;
      var card = t.closest('.wc'), i = card ? Array.prototype.indexOf.call(d.querySelectorAll('.wc'), card) : -1;
      if (t.classList.contains('inc') || t.classList.contains('dec')) {
        var v = (i ? b : a) + (t.classList.contains('inc') ? 1 : -1); v = Math.max(1, Math.min(6, v)); if (i) b = v; else a = v; change();
      } else if (t.classList.contains('wbtn')) { weigh++; d.querySelector('.wcnt').textContent = weigh + ' × gewogen'; evaluate(); }
    });
    draw();
    return d;
  };

  // ------------------------------------------------------------ Reihenfolge-Spiel
  // o = { q, steps:[…richtige Reihenfolge…], mod, why, after }
  window.order = function (box, o) {
    var d = document.createElement('div'); d.className = 'q';
    var idx = o.steps.map(function (_, i) { return i; }), sh = shuffle(idx), t = 0; while (sh.every(function (v, i) { return v === i; }) && t++ < 20) sh = shuffle(idx);
    d.innerHTML = '<p class="qt">' + o.q + '</p><ol class="ordl"></ol><div class="opts ordt"></div><div class="fb" hidden></div>';
    box.appendChild(d);
    var ol = d.querySelector('.ordl'), tiles = d.querySelector('.ordt'), fb = d.querySelector('.fb'), next = 0;
    sh.forEach(function (i) { var b = document.createElement('button'); b.className = 'opt'; b.setAttribute('data-i', i); b.innerHTML = o.steps[i]; tiles.appendChild(b); });
    tiles.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null; if (!b || b.disabled) return; var i = +b.getAttribute('data-i'); fb.hidden = false;
      if (i === next) {
        var li = document.createElement('li'); li.innerHTML = o.steps[i]; ol.appendChild(li); b.remove(); next++;
        if (next === o.steps.length) { note(o.why); fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. ' + (o.why || ''); d.classList.add('done'); if (o.mod) Prog.done(o.mod); if (o.after) o.after(); }
        else { fb.className = 'fb ok'; fb.innerHTML = '✔ Weiter: Was kommt als Nächstes?'; }
      } else { b.classList.add('no'); setTimeout(function () { b.classList.remove('no'); }, 700); fb.className = 'fb bad'; fb.innerHTML = '✗ Das ist noch nicht dran. Überlege, was vorher erledigt sein muss.'; }
    });
    return d;
  };
})();
