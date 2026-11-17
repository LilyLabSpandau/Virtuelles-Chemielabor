/* Start: gemerkte Freischaltung, Passwortfeld, Hinweise. Gespeichert wird nur im Browser der Schüler. */
(function () {
  'use strict';
  if (Store('open')) unlock('restore');
  $('lockhint').hidden = true;
  $('wipebtn').addEventListener('click', function () { $('wipebtn').hidden = true; $('wipeask').hidden = false; });
  $('wipeno').addEventListener('click', function () { $('wipeask').hidden = true; $('wipebtn').hidden = false; });
  $('wipeyes').addEventListener('click', function () {
    try { localStorage.removeItem('wasser8-v1'); } catch (e) {}
    location.reload();
  });
  $('introbtn').addEventListener('click', function () { Szene.play(Szene.INTRO); });
  setTimeout(function () { if (!Szene.running()) Szene.play(Szene.INTRO); }, 900);   // Die Einführung startet bei jedem Öffnen; mit „Überspringen“ lässt sie sich beenden
  document.addEventListener('unlocked', function (e) { $('lockbox').hidden = true; $('lockhint').hidden = true; });
  if (isUnlocked()) $('lockbox').hidden = true;
  function go() {
    var v = $('pw').value, m = $('pwmsg');
    if (checkPw(v)) { m.style.color = '#166534'; m.textContent = 'Passwort stimmt. Die Module 2 bis 4 sind frei.'; unlock('pw'); }
    else { m.style.color = '#b91c1c'; m.textContent = 'Das Passwort stimmt nicht.'; }
  }
  $('pwgo').addEventListener('click', go); $('pw').addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  document.querySelector('.tabs').addEventListener('click', function (e) { var t = e.target.closest ? e.target.closest('.tab') : null; if (t && t.disabled) $('lockhint').hidden = false; });
})();
