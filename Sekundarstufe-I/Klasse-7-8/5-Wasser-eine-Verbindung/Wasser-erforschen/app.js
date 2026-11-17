/* Start: gemerkte Freischaltung, Passwortfeld, Hinweise. Gespeichert wird nur im Browser der Schüler. */
(function () {
  'use strict';
  if (Store('open')) unlock('restore');
  $('lockhint').hidden = true;
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
