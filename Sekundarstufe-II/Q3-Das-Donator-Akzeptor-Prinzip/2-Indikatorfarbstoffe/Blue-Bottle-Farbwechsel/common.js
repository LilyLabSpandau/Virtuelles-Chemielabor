/* Gemeinsame Helfer: Reiter, Aufgabenbausteine (Multiple Choice, Lückentext) mit Rückmeldung "✔ …" / "✗ …" (Kolbi liest diese Felder). */
(function () {
  'use strict';
  window.$ = function (id) { return document.getElementById(id); };
  window.NS = 'http://www.w3.org/2000/svg';
  function note(html) {   // Kolbi sagt bei einer richtigen Antwort die wichtigste Erkenntnis dazu
    var t = String(html || '').replace(/<[^>]*>/g, '').trim();
    if (t.length > 230) { var cut = t.lastIndexOf('. ', 230); t = t.slice(0, cut > 60 ? cut + 1 : 230); }
    window.KolbiNote = t;
  }
  window.note = note;   // auch für m1.js, me.js und m2.js

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

  // ------------------------------------------------------------ Fortschritt je Modul und Versuch
  // Schlüssel: 'm1|mb' (Modul 1, Versuch Methylenblau) bzw. 'm1|ic'. Jeder Versuch hat seine eigene Auswertung.
  var prog = {}, fin = { mb: {}, ic: {} }, cur = 'mb';
  function refresh() {
    tabs.forEach(function (t) { var m = t.getAttribute('data-t'); t.classList.toggle('fin', !!fin[cur][m]); });
    Array.prototype.forEach.call(document.querySelectorAll('.merke[id$=merke]'), function (b) { var m = b.id.replace('merke', ''); b.hidden = !fin[cur][m]; });
  }
  window.Prog = {
    add: function (key, total) { prog[key] = { n: 0, total: total }; },
    done: function (key) {
      var p = prog[key]; if (!p) return; p.n++;
      if (p.n >= p.total) { var m = key.split('|'); fin[m[1]][m[0]] = true; refresh(); }
    },
    setVersuch: function (d) { cur = d; refresh(); },
    onFinish: function () { }
  };

  // ------------------------------------------------------------ Multiple Choice
  // o = { q, opts:[…], ok: Index, why: 'Erklärung', hints: {Index: 'Hinweis'}, mod: 'm1', after: fn }
  // Reihenfolge der Antworten wird bei jedem Laden gemischt (o.fix = true lässt sie stehen, z. B. bei Zahlen)
  function shuffled(n, keep) {
    var a = []; for (var i = 0; i < n; i++) a.push(i);
    if (!keep) for (var j = n - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)), t = a[j]; a[j] = a[k]; a[k] = t; }
    return a;
  }
  window.mc = function (box, o) {
    var d = document.createElement('div'); d.className = 'q';
    var h = '<p class="qt">' + o.q + '</p><div class="opts">';
    shuffled(o.opts.length, o.fix).forEach(function (i) { h += '<button class="opt" data-i="' + i + '">' + o.opts[i] + '</button>'; });
    h += '</div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), done = false, tries = 0;
    d.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null; if (!b || done || b.disabled) return;
      var i = +b.getAttribute('data-i'); tries++;
      fb.hidden = false;
      if (i === o.ok) {
        done = true; b.classList.add('ok'); d.classList.add('done'); fb.className = 'fb ok';
        note(o.why); fb.innerHTML = '✔ Richtig. ' + (o.why || '');
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
      else { h += '<select data-k="' + i + '"><option value="-1">… wähle …</option>'; shuffled(p.o.length).forEach(function (j) { h += '<option value="' + j + '">' + p.o[j] + '</option>'; }); h += '</select>'; }
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
      done = true; note(o.why); fb.className = 'fb ok'; fb.innerHTML = '✔ Alles richtig! ' + (o.why || '');
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
