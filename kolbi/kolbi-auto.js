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
    var help;
    if (isRoot) help = { text: 'Anscheinend suchst du dir ein Thema aus.', tip: 'Tippe auf einen Gegenstand auf dem Tisch: Der Erlenmeyerkolben führt zur Sekundarstufe I, der Messkolben zur Sekundarstufe II, das Lineal zu den Schultools und der Mörser zur Lewis-Werkstatt.' };
    else if (onBoard) help = { text: 'Anscheinend suchst du dir ein Modul aus.', tip: 'Die Zettel an der Pinnwand führen zu Simulationen und Übungen. Tippe einen an. Mit dem Knopf unten links kommst du eine Ebene zurück.' };
    else help = { text: 'Anscheinend suchst du dir einen Bereich aus.', tip: 'Tippe auf einen Gegenstand auf dem Tisch. Jeder führt zu einer Klassenstufe oder einem Halbjahr. Mit dem Knopf unten links kommst du eine Ebene zurück.' };
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

    if (isRoot) {
      // Auf der Startseite begrüßt Kolbi bei jedem Besuch
      setTimeout(function () { Kolbi.greetHome({ hint: 'Tippe auf einen Gegenstand auf dem Tisch, um loszulegen.' }); }, 2300);
    } else {
      // Auf den anderen Seiten winkt er kurz; ab und zu sagt er, wo man ist (nicht bei jedem Klick)
      try {
        var last = +sessionStorage.getItem('kolbi-lastsay') || 0;
        if (title && Date.now() - last > 4 * 60000 && Math.random() < 0.35) {
          sessionStorage.setItem('kolbi-lastsay', String(Date.now()));
          setTimeout(function () { Kolbi.say(onBoard ? 'Du bist jetzt bei „' + title + '“. Viel Spaß beim Stöbern!' : 'Weiter geht’s! Such dir einen Gegenstand aus.', 'interested'); }, 1800);
        }
      } catch (e) {}
    }
  }
  function start() { if (window.Kolbi) return run(); var s = document.createElement('script'); s.src = base + 'kolbi.js'; s.onload = run; document.head.appendChild(s); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
