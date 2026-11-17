/* Gemeinsame Helfer: Reiter mit Sperre, Aufgabenbausteine (Multiple Choice, Lückentext, Zuordnen), SVG-Helfer.
   Rückmeldungen stehen in .fb (Kolbi liest diese Felder). Gespeichert wird nur im Browser der Schüler, ob Modul 1 geschafft ist. */
(function () {
  'use strict';
  window.$ = function (id) { return document.getElementById(id); };
  window.NS = 'http://www.w3.org/2000/svg';
  function note(html) {
    var t = String(html || '').replace(/<[^>]*>/g, '').trim();
    if (t.length > 230) { var cut = t.lastIndexOf('. ', 230); t = t.slice(0, cut > 60 ? cut + 1 : 230); }
    window.KolbiNote = t;
  }
  window.note = note;
  function shuffled(n, keep) {
    var a = []; for (var i = 0; i < n; i++) a.push(i);
    if (!keep) for (var j = n - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)), t = a[j]; a[j] = a[k]; a[k] = t; }
    return a;
  }
  window.svgEl = function (tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e); return e;
  };
  var KEY = 'wasser8-v1';
  function store(k, v) { try { if (v === undefined) return (JSON.parse(localStorage.getItem(KEY) || '{}'))[k]; var o = JSON.parse(localStorage.getItem(KEY) || '{}'); o[k] = v; localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  window.Store = store;

  // ------------------------------------------------------------ Fortschritt je Modul (nur für den Haken am Reiter)
  var prog = {};
  window.Prog = {
    add: function (mod, total) { prog[mod] = { n: 0, total: total, fn: null }; },
    done: function (mod) {
      var p = prog[mod]; if (!p) return; p.n++;
      if (p.n >= p.total) { var t = $('tab-' + mod); if (t) t.classList.add('fin'); if (p.fn) p.fn(); }
    },
    onFinish: function (mod, fn) { if (prog[mod]) prog[mod].fn = fn; }
  };

  // ------------------------------------------------------------ Reiter mit Sperre (Modul h muss zuerst geschafft sein)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var unlocked = false;
  window.isUnlocked = function () { return unlocked; };
  window.showTab = function (id) {
    if (id !== 'h' && !unlocked) { id = 'h'; $('lockhint').hidden = false; }
    tabs.forEach(function (t) { var on = t.getAttribute('data-t') === id; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
    Array.prototype.forEach.call(document.querySelectorAll('.mod'), function (m) { m.classList.toggle('on', m.id === id); });
    try { window.scrollTo({ top: 0 }); } catch (e) { window.scrollTo(0, 0); }
    document.dispatchEvent(new CustomEvent('tabchange', { detail: id }));
  };
  window.unlock = function (how) {
    if (unlocked) return; unlocked = true; if (how !== 'restore') store('open', how);
    document.body.classList.add('open');
    tabs.forEach(function (t) { if (t.getAttribute('data-t') !== 'h') { t.disabled = false; t.classList.remove('locked'); } });
    document.dispatchEvent(new CustomEvent('unlocked', { detail: how }));
  };
  tabs.forEach(function (t) { t.addEventListener('click', function () { showTab(t.getAttribute('data-t')); }); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (b) { b.addEventListener('click', function () { showTab(b.getAttribute('data-go')); }); });
  // Passwort-Umgehung (nur der Hash steht im Code)
  function hash(s) { var h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (var i = 0, c; i < s.length; i++) { c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36); }
  window.checkPw = function (s) { return hash(String(s || '').trim().toLowerCase()) === window.PW_HASH; };
  window.pwHash = hash;

  // ------------------------------------------------------------ Multiple Choice
  window.mc = function (box, o) {
    var d = document.createElement('div'); d.className = 'q';
    var h = '<p class="qt">' + o.q + '</p><div class="opts">';
    shuffled(o.opts.length, o.fix).forEach(function (i) { h += '<button class="opt" data-i="' + i + '">' + o.opts[i] + '</button>'; });
    h += '</div><div class="fb" hidden></div>';
    d.innerHTML = h; box.appendChild(d);
    var fb = d.querySelector('.fb'), done = false;
    d.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null; if (!b || done || b.disabled) return;
      var i = +b.getAttribute('data-i'); fb.hidden = false;
      if (i === o.ok) {
        done = true; b.classList.add('ok'); d.classList.add('done'); fb.className = 'fb ok';
        note(o.why); fb.innerHTML = '✔ Richtig. ' + (o.why || '');
        Array.prototype.forEach.call(d.querySelectorAll('.opt'), function (x) { x.disabled = true; });
        if (o.mod) Prog.done(o.mod);
        if (o.after) o.after();
      } else {
        b.classList.add('no'); b.disabled = true; fb.className = 'fb bad';
        fb.innerHTML = '✗ Leider nicht. ' + ((o.hints && o.hints[i]) || 'Denk noch einmal an das, was du eben ausprobiert hast.');
      }
    });
    return d;
  };

  // ------------------------------------------------------------ Lückentext mit Auswahlfeldern
  window.gap = function (box, o) {
    var d = document.createElement('div'), h = '<div class="gaptext">';
    o.parts.forEach(function (p, i) {
      if (typeof p === 'string') h += p;
      else { h += '<select data-k="' + i + '"><option value="-1">… wähle …</option>'; shuffled(p.o.length).forEach(function (j) { h += '<option value="' + j + '">' + p.o[j] + '</option>'; }); h += '</select>'; }
    });
    h += '</div><div style="margin-top:8px"><button class="btn gchk">Prüfen</button></div><div class="fb" hidden></div>';
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
      if (bad) { fb.className = 'fb bad'; fb.innerHTML = '✗ ' + (bad === 1 ? 'Eine Stelle ist' : bad + ' Stellen sind') + ' noch nicht richtig (rot markiert). Überlege noch einmal.'; return; }
      done = true; note(o.why); fb.className = 'fb ok'; fb.innerHTML = '✔ Alles richtig! ' + (o.why || '');
      Array.prototype.forEach.call(d.querySelectorAll('select'), function (s) { s.disabled = true; });
      if (o.mod) Prog.done(o.mod);
      if (o.after) o.after();
    });
    return d;
  };

  // ------------------------------------------------------------ Zuordnen: Liste von Dingen, je zwei Knöpfe
  // o = { intro, items:[{lab, sub, ok:0|1, why}], btn:['Ja','Nein'], mod }
  window.sortq = function (box, o) {
    var d = document.createElement('div'), html = '', done = 0;
    if (o.intro) html += '<p class="qt">' + o.intro + '</p>';
    var order = shuffled(o.items.length);
    order.forEach(function (ix) {
      var it = o.items[ix];
      html += '<div class="grp" data-i="' + ix + '"><div><span class="nm">' + it.lab + '</span>' + (it.sub ? '<div class="ef">' + it.sub + '</div>' : '') + '</div><div class="bt">' +
        o.btn.map(function (t, k) { return '<button class="btn sec" data-a="' + k + '">' + t + '</button>'; }).join('') + '</div><div class="fb" hidden></div></div>';
    });
    d.innerHTML = html; box.appendChild(d);
    d.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-a]') : null; if (!b || b.disabled) return;
      var row = b.closest('.grp'), it = o.items[+row.getAttribute('data-i')], fb = row.querySelector('.fb');
      if (row.getAttribute('data-ok')) return; fb.hidden = false;
      if (+b.getAttribute('data-a') === it.ok) {
        row.setAttribute('data-ok', '1'); fb.className = 'fb ok'; fb.innerHTML = '✔ Richtig. ' + it.why; note(it.why);
        Array.prototype.forEach.call(row.querySelectorAll('button'), function (x) { x.disabled = true; });
        b.classList.remove('sec'); if (++done === o.items.length) { if (o.mod) Prog.done(o.mod); if (o.after) o.after(); }
      } else { fb.className = 'fb bad'; fb.innerHTML = '✗ Leider nicht. ' + (it.hint || 'Schau noch einmal genau hin.'); }
    });
    return d;
  };
})();
