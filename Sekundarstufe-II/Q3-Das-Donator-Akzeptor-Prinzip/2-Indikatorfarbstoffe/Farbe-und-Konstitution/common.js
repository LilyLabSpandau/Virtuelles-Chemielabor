/* Gemeinsame Helfer: Reiter, Aufgabenbausteine (Multiple Choice, Lückentext) mit Rückmeldung "✔ …" / "✗ …" (Kolbi liest diese Felder). */
(function () {
  'use strict';
  window.$ = function (id) { return document.getElementById(id); };
  window.NS = 'http://www.w3.org/2000/svg';
  function esc(s) { return String(s); }   // Texte stammen von uns, enthalten bewusst einfaches HTML

  // ------------------------------------------------------------ Reiter
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  window.showTab = function (id) {
    tabs.forEach(function (t) { var on = t.getAttribute('data-t') === id; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
    Array.prototype.forEach.call(document.querySelectorAll('.mod'), function (m) { m.classList.toggle('on', m.id === id); });
    try { window.scrollTo({ top: 0 }); } catch (e) { window.scrollTo(0, 0); }
    document.dispatchEvent(new CustomEvent('tabchange', { detail: id }));
  };
  tabs.forEach(function (t) { t.addEventListener('click', function () { showTab(t.getAttribute('data-t')); }); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (b) { b.addEventListener('click', function () { showTab(b.getAttribute('data-go')); }); });

  // ------------------------------------------------------------ Fortschritt je Modul
  var prog = {};
  window.Prog = {
    add: function (mod, total) { prog[mod] = { n: 0, total: total, fn: null }; },
    done: function (mod) {
      var p = prog[mod]; if (!p) return; p.n++;
      if (p.n >= p.total) { var t = $('tab-' + mod); if (t) t.classList.add('fin'); if (p.fn) p.fn(); }
    },
    onFinish: function (mod, fn) { if (prog[mod]) prog[mod].fn = fn; }
  };

  // ------------------------------------------------------------ Multiple Choice
  // o = { q, opts:[…], ok: Index, why: 'Erklärung', hints: {Index: 'Hinweis'}, mod: 'm1', after: fn }
  window.mc = function (box, o) {
    var d = document.createElement('div'); d.className = 'q';
    var h = '<p class="qt">' + o.q + '</p><div class="opts">';
    o.opts.forEach(function (t, i) { h += '<button class="opt" data-i="' + i + '">' + t + '</button>'; });
    h += '</div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), done = false, tries = 0;
    d.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null; if (!b || done || b.disabled) return;
      var i = +b.getAttribute('data-i'); tries++;
      fb.hidden = false;
      if (i === o.ok) {
        done = true; b.classList.add('ok'); d.classList.add('done'); fb.className = 'fb ok';
        fb.innerHTML = '✔ Richtig. ' + (o.why || '');
        Array.prototype.forEach.call(d.querySelectorAll('.opt'), function (x) { x.disabled = true; });
        if (o.mod) Prog.done(o.mod);
        if (o.after) o.after();
      } else {
        b.classList.add('no'); b.disabled = true; fb.className = 'fb bad';
        fb.innerHTML = '✗ Leider nicht. ' + ((o.hints && o.hints[i]) || 'Denk noch einmal an das, was du im Versuch beobachtet hast.');
      }
    });
    return d;
  };

  // ------------------------------------------------------------ Lückentext mit Auswahlfeldern
  // o = { parts:[ 'Text', {o:['a','b'], ok:1}, 'Text' … ], mod, why }
  window.gap = function (box, o) {
    var d = document.createElement('div'), h = '';
    o.parts.forEach(function (p, i) {
      if (typeof p === 'string') h += p;
      else { h += '<select data-k="' + i + '"><option value="-1">… wähle …</option>'; p.o.forEach(function (t, j) { h += '<option value="' + j + '">' + t + '</option>'; }); h += '</select>'; }
    });
    h += '<div style="margin-top:8px"><button class="btn gchk">Prüfen</button></div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), done = false;
    d.querySelector('.gchk').addEventListener('click', function () {
      if (done) return;
      var bad = 0, empty = 0;
      Array.prototype.forEach.call(d.querySelectorAll('select'), function (s) {
        var p = o.parts[+s.getAttribute('data-k')], v = +s.value;
        s.classList.remove('ok', 'no');
        if (v < 0) { empty++; return; }
        if (v === p.ok) s.classList.add('ok'); else { s.classList.add('no'); bad++; }
      });
      fb.hidden = false;
      if (empty) { fb.className = 'fb bad'; fb.innerHTML = '✗ Es fehlen noch Auswahlfelder. Fülle alle aus und prüfe dann noch einmal.'; return; }
      if (bad) { fb.className = 'fb bad'; fb.innerHTML = '✗ ' + (bad === 1 ? 'Eine Stelle ist' : bad + ' Stellen sind') + ' noch nicht richtig (rot markiert). Überlege, was du in den Modulen 1 und 2 und bei den Formeln gesehen hast.'; return; }
      done = true; fb.className = 'fb ok'; fb.innerHTML = '✔ Alles richtig! ' + (o.why || '');
      Array.prototype.forEach.call(d.querySelectorAll('select'), function (s) { s.disabled = true; });
      if (o.mod) Prog.done(o.mod);
      if (o.after) o.after();
    });
    return d;
  };

  // ------------------------------------------------------------ SVG-Helfer
  window.svgEl = function (tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  window.IUPAC = {
    name: function (n) {
      if (n === 1) return 'Ethen';
      var pre = { 2: 'But', 3: 'Hex', 4: 'Oct', 5: 'Dec', 6: 'Dodec', 7: 'Tetradec', 8: 'Hexadec', 9: 'Octadec', 10: 'Icos', 11: 'Docos', 12: 'Tetracos', 13: 'Hexacos', 14: 'Octacos' };
      var mul = { 2: 'dien', 3: 'trien', 4: 'tetraen', 5: 'pentaen', 6: 'hexaen', 7: 'heptaen', 8: 'octaen', 9: 'nonaen', 10: 'decaen', 11: 'undecaen', 12: 'dodecaen', 13: 'tridecaen', 14: 'tetradecaen' };
      var loc = []; for (var i = 0; i < n; i++) loc.push(2 * i + 1);
      return pre[n] + 'a-' + loc.join(',') + '-' + mul[n];
    },
    formula: function (n) { var c = 2 * n, h = 2 * n + 2; function sub(x) { return String(x).replace(/\d/g, function (d) { return '₀₁₂₃₄₅₆₇₈₉'[+d]; }); } return 'C' + sub(c) + 'H' + sub(h); }
  };
})();
