/*
  Kolbi für Navigationsseiten (Startseite, Tische, Pinnwände).
  Wird von pinnwand.js geladen oder per <script src=".../kolbi/kolbi-auto.js"> eingebunden.
  Erkennt anhand des Pfades, wo der Schüler gerade ist, und begrüßt ihn auf der Startseite bei jedem Besuch.
*/
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me || !me.src) return;
  var base = me.src.replace(/kolbi-auto\.js.*$/, '');            // …/kolbi/
  var root = base.replace(/kolbi\/$/, '');                         // Wurzel der Seite
  var rel = decodeURIComponent(location.href.replace(/[?#].*$/, '').slice(root.length)).replace(/index\.html$/, '');
  var isRoot = rel === '';

  function run() {
    var paper = document.querySelector('.paper h1'), title = paper ? paper.textContent.trim() : (document.title || '').replace(/\s*[-–]\s*Chemie.*$/, '').trim();
    var onBoard = !!document.querySelector('.paper');
    function clean(t) { return (t || '').replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim(); }
    function names(l) { return l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' und ' + l[l.length - 1]; }
    function explain() {
      if (isRoot) return 'Das ist dein virtuelles Chemielabor. Die Sekundarstufe I und II enthalten Lernmodule und Simulationen zu den Klassenstufen, die Schultools praktische Werkzeuge für den Schulalltag und die Lewis-Werkstatt eine Werkstatt für Moleküle und Lewis-Formeln.';
      if (onBoard) {
        var notes = [].slice.call(document.querySelectorAll('a.note')).filter(function (n) { return !n.hidden && n.offsetParent !== null; });
        if (!notes.length) return 'Das ist die Pinnwand zu „' + title + '“. Hier hängt noch nichts. Schau später wieder vorbei!';
        var t = notes.map(function (n) { var b = n.querySelector('b'); return clean(b ? b.textContent : n.textContent); }).filter(Boolean);
        var shown = t.slice(0, 4), more = t.length > 4 ? ' und ' + (t.length - 4) + ' weitere' : '';
        return 'Das ist die Pinnwand zu „' + title + '“. Hier ' + (notes.length === 1 ? 'hängt ein Zettel: ' : 'hängen ' + notes.length + ' Zettel: ') + (more ? shown.join(', ') + more : names(shown)) + '. Das Etikett auf dem Zettel verrät dir, ob es eine Simulation, ein Lernmodul oder etwas anderes ist.';
      }
      var links = [].slice.call(document.querySelectorAll('a.lab-link, a.item')).map(function (a) { var t = clean(a.getAttribute('title')); return a.classList.contains('item') ? t.split(/\s–\s|:\s/)[0] : t; }).filter(Boolean);
      return 'Das ist der Bereich „' + title + '“. Hier wählst du, womit du weitermachst: ' + names(links) + '.';
    }
    var tip = isRoot ? 'Tippe auf einen Gegenstand auf dem Tisch: Der Erlenmeyerkolben führt zur Sekundarstufe I, der Messkolben zur Sekundarstufe II, das Lineal zu den Schultools und der Mörser zur Lewis-Werkstatt.'
      : onBoard ? 'Die Zettel an der Pinnwand führen zu Simulationen und Übungen. Tippe einen an. Mit dem Knopf unten links kommst du eine Ebene zurück.'
      : 'Tippe auf einen Gegenstand auf dem Tisch. Mit dem Knopf unten links kommst du eine Ebene zurück.';
    var help = { get text() { return explain(); }, tip: tip };
    var comments = isRoot ? [
      'Auf dem Tisch liegt alles, was du brauchst. Fang bei dem an, was dich neugierig macht.',
      'Hast du schon die Lewis-Werkstatt ausprobiert? Der Mörser ist ein Geheimtipp.',
      'Ich wohne hier auf dem Tisch. Die Aussicht ist super!'
    ] : onBoard ? [
      title ? 'Du bist gerade bei „' + title + '“. Such dir einen Zettel aus!' : 'Such dir einen Zettel aus!',
      'Wenn an der Pinnwand noch nichts hängt: Hier kommt bald etwas dazu.',
      'Pinnwände sind wie Laborjournale, nur mit Reißzwecken.'
    ] : [
      'Hier wählst du deinen Weg. Es gibt keinen falschen!',
      'Alle Wege führen zu Chemie. Garantiert.'
    ];
    Kolbi.init({ id: 'site', color: '#38bdf8', offsetBottom: 56, tapHelp: function () { return help; }, comments: comments });

    var key = 'kolbi-expl-' + rel, seen = false;
    try { seen = !!sessionStorage.getItem(key); } catch (e) {}
    function mark() { try { sessionStorage.setItem(key, '1'); } catch (e) {} }
    if (isRoot) {
      // Startseite: Begrüßung bei jedem Besuch, beim ersten Besuch der Sitzung mit Erklärung
      setTimeout(function () { Kolbi.greetHome({ hint: seen ? 'Tippe auf einen Gegenstand auf dem Tisch, um loszulegen.' : explain() }); mark(); }, 2300);
    } else if (!seen) {
      // Übersichtsseiten: beim ersten Besuch pro Sitzung erklärt Kolbi, was man hier findet (wartet notfalls das Kennenlernen ab)
      var tries = 0;
      setTimeout(function go() { if (Kolbi.say(explain(), 'interested')) mark(); else if (++tries < 5) setTimeout(go, 6000); }, onBoard ? 2400 : 1800);
    }
  }
  function start() { if (window.Kolbi) return run(); var s = document.createElement('script'); s.src = base + 'kolbi.js'; s.onload = run; document.head.appendChild(s); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
