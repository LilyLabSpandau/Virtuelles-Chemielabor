/*
  Herr Neumann als Lernbegleiter in Wiederholungs- und Arbeitenmodulen.
  Idee: Dr. Benjamin Janzen · Umsetzung: Erik Neumann mit Hilfe von Claude

  Einbinden (statt kolbi-app.js, vor </body>):  <script src="../../../../kolbi/neumann-lernen.js"></script>
  Pro Modul (Schlüssel = Ordnername) steht unten eine Aufgabenbeschreibung und die Liste der Wörterbücher (kolbi/glossare/*.js).
  Die Rückmeldungen der Module (.fb, .feedback, #fb-… usw.) werden automatisch beobachtet: „richtig“ und „falsch“ steuern die Stimmung von Herrn Neumann.
  Hat ein Modul eigene Aufrufe (Begleiter.richtig / Begleiter.falsch / Begleiter.setAufgabe), setzt es vorher window.NEUMANN_EXPLICIT = true.
  Es wird nichts gespeichert oder gesendet. Alles läuft im Browser.
*/
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me || !me.src) return;
  var base = me.src.replace(/neumann-lernen\.js.*$/, '');
  var parts = decodeURIComponent(location.pathname).split('/').filter(Boolean);
  var key = /\.html?$/i.test(parts[parts.length - 1] || '') ? parts[parts.length - 2] : parts[parts.length - 1];

  var TIPPS = ['Lies die Aufgabe noch einmal ganz genau. Welches Wort ist das wichtigste?', 'Überlege zuerst, was du schon weißt. Was hast du dazu im Unterricht gelernt?', 'Gehe die Aufgabe Schritt für Schritt durch und prüfe, an welcher Stelle dein Gedankengang abweicht.'];
  var M = {
    'Molekuelbau-und-Dipol': { aufgabe: 'Arbeite die Kapitel nacheinander durch. Jedes hat einen Merkkasten, ein Musterbeispiel und Übungen. Probiere erst selbst, dann hilft dir der Tipp. Mit „Prüfen“ siehst du, ob deine Antwort stimmt.', hilfe: 'Wähle oben ein Kapitel und beginne mit dem Merkkasten.', glossare: ['molekuelbau'] },
    'Loeslichkeit': { aufgabe: 'Du untersuchst die Löslichkeit in mehreren Modulen. Das erste Modul, die Grundlagen der Polarität, ist Pflicht. Löse die Aufgaben der Reihe nach und prüfe sie.', hilfe: 'Beginne mit Modul 1 und lies die Erklärungen, bevor du das Quiz bearbeitest.', glossare: ['molekuelbau', 'loeslichkeit'] },
    'Eigenschaften-des-Wassers': { aufgabe: 'Du wiederholst Aufbau und Eigenschaften des Wassers in mehreren Modulen. Beginne mit dem Aufbau des Moleküls und arbeite dich nach unten vor.', hilfe: 'Lies zuerst den Text im Modul und bearbeite dann die Aufgaben dazu.', glossare: ['molekuelbau', 'wasser'] },
    'Klausurtraining': { aufgabe: 'Du trainierst typische Klausuraufgaben zu Säure-Base-Konzepten, Stärke, Titration und Redox. Wähle eine Aufgabe, löse sie und vergleiche dann mit dem Lösungsweg. Dein Stand wird automatisch gespeichert.', hilfe: 'Wechsle jederzeit zwischen den Aufgaben. Arbeite sauber und begründe in ganzen Sätzen.', glossare: ['klausurtraining'] }
  };
  var app = M[key] || { aufgabe: 'Arbeite die Aufgaben nacheinander durch und prüfe deine Antworten.', hilfe: '', glossare: [] };

  var FB = '.fb, .feedback, .res, [id$="-fb"], [id^="fb-"], [id$="fb"], [id*="feedback"], [id$="Fb"]';
  function verdict(n) {
    if (!n.offsetParent && getComputedStyle(n).position !== 'fixed') return 0;
    var t = (n.textContent || '').trim(), c = (n.className && n.className.baseVal === undefined) ? String(n.className) : '';
    if (!t) return 0;
    if (/^(✗|✘|✕|❌|❎|✖|Leider|Falsch|Nicht ganz|Das stimmt (noch )?nicht|Noch nicht)/i.test(t) || /\b(bad|wrong|incorrect|error|fail|no)\b/i.test(c)) return -1;
    if (/^(✓|✔|✅|🎉|Richtig|Vollkommen richtig|Glückwunsch|Genau|Stimmt)/i.test(t) || /\b(correct|success|good|ok)\b/i.test(c)) return 1;
    return 0;
  }
  function container(el) { return el && el.closest ? el.closest('.task, .quiz, .aufgabe, .frage, article, fieldset, .card, section, .module') : null; }
  function title(c) { var h = c && c.querySelector('.q, legend, h3, h4, h2'); return h ? (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160) : ''; }
  function idOf(n) { var c = container(n) || n; return c.id || (title(c) || 'x').slice(0, 40); }

  function watch() {
    var timer = null, touched = new Set();
    function flush() {
      timer = null; var ok = 0, bad = 0, okId = null, badId = null;
      touched.forEach(function (n) { var v = verdict(n); if (v > 0) { ok++; okId = okId || idOf(n); } else if (v < 0) { bad++; badId = badId || idOf(n); } });
      touched.clear();
      if (bad) Begleiter.falsch(badId); else if (ok) Begleiter.richtig(okId);
    }
    new MutationObserver(function (list) {
      list.forEach(function (m) {
        var t = m.target.nodeType === 1 ? m.target : m.target.parentElement, h = t && t.closest && t.closest(FB); if (h) touched.add(h);
        if (m.addedNodes) m.addedNodes.forEach(function (an) { if (an.nodeType !== 1) return; if (an.matches(FB)) touched.add(an); else an.querySelectorAll(FB).forEach(function (x) { touched.add(x); }); });
      });
      if (touched.size && !timer) timer = setTimeout(flush, 300);
    }).observe(document.body, { childList: true, characterData: true, subtree: true });
    // Beim Anfassen einer Aufgabe merkt sich Herr Neumann, welche gerade dran ist
    document.addEventListener('pointerdown', function (e) {
      if (e.target.closest && e.target.closest('#kolbi-root')) return;
      var c = container(e.target), tt = title(c); if (tt) Begleiter.setAufgabe(tt, TIPPS, idOf(c), app.hilfe);
    }, true);
  }

  function run() {
    if (app.glossare.length) { var i = 0; (function next() { var g = app.glossare[i++]; if (!g) return init(); var s = document.createElement('script'); s.src = base + 'glossare/' + g + '.js'; s.onload = s.onerror = next; document.head.appendChild(s); })(); }
    else init();
  }
  function init() {
    Begleiter.init({ mode: 'lernen', offsetBottom: 56, aufgabe: app.aufgabe, hilfe: app.hilfe, tipps: [] });
    if (!window.NEUMANN_EXPLICIT) watch();
    if (key === 'Klausurtraining') { var st = document.createElement('style'); st.textContent = '.mascot,#kfloat{display:none!important}'; document.head.appendChild(st); }   // eigenes Kolbi-Maskottchen dieser Seite ausblenden
  }
  function load(files, done) {
    var i = 0; (function next() {
      var f = files[i++]; if (!f) return done();
      if ((f === 'kolbi.js' && window.Kolbi) || (f === 'skin-neumann.js' && window.KolbiSkins && window.KolbiSkins.neumann) || (f === 'neumann-begleiter.js' && window.Begleiter) || (f === 'glossare/allgemein.js' && window.__glosAllg)) return next();
      var sc = document.createElement('script'); sc.src = base + f; sc.onload = function () { if (f === 'glossare/allgemein.js') window.__glosAllg = 1; next(); }; document.head.appendChild(sc);
    })();
  }
  function start() { load(['kolbi.js', 'skin-neumann.js', 'neumann-begleiter.js', 'glossare/allgemein.js'], run); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
