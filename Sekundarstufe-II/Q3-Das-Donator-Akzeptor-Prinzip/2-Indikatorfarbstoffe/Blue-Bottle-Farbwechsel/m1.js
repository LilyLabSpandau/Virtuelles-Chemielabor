/* Modul 1: Der Versuch (Kolben schütteln und ruhen lassen) */
(function () {
  'use strict';
  var B = { mb: new BB.Bottle('mb'), ic: new BB.Bottle('ic') }, svg = $('flask'), shaking = 0, speed = 1, lastW = '', wT = 0, logN = 0, tlAcc = 0, cols = [], lastWord = '', pending = '', acted = 'Kolben steht in Ruhe';
  BB.flaskSVG(svg, 'm1'); BB.dyeSwitch($('dsw1')); BB.dyeSwitch($('dsw2')); BB.dyeSwitch($('dsw3')); BB.dyeSwitch($('dsw4'));
  BB.bottle = B;
  function cur() { return B[BB.cur]; }
  BB.src.m1 = BB.src.m5 = function () { var b = cur(); return BB.color(BB.cur, b.pop); };
  function shake() { shaking = 1.4; acted = 'Ich schüttle den Kolben'; svg.parentNode.classList.add('shk'); BB.shakeKolbi(1400); }
  $('m1shake').addEventListener('click', shake); $('flask').addEventListener('click', shake);
  $('m1fast').addEventListener('click', function () { speed = speed === 1 ? 3 : 1; this.setAttribute('aria-pressed', speed === 3); this.classList.toggle('sec', speed !== 3); });
  $('m1reset').addEventListener('click', function () { cur().reset(); cols = []; tlAcc = 0; lastWord = ''; acted = 'Neu angesetzt: frische Lösung'; });
  document.addEventListener('dye', function () { cols = []; tlAcc = 0; lastWord = ''; acted = 'Anderer Farbstoff'; });
  function fmt(t) { return Math.round(t) + ' s'; }
  function addLog(word) {
    var tb = $('m1log'); if (!logN) tb.innerHTML = ''; logN++;
    var tr = document.createElement('tr'); tr.innerHTML = '<td>' + fmt(cur().t) + '</td><td>' + acted + '</td><td><b>' + word + '</b></td>'; tb.insertBefore(tr, tb.firstChild);
    while (tb.children.length > 12) tb.removeChild(tb.lastChild);
  }
  var tl = $('tl'), tc = tl.getContext('2d'), last = 0;
  function drawTL() {
    tc.clearRect(0, 0, 600, 36); var n = cols.length, i, w = 2; for (i = 0; i < n; i++) { var c = cols[i]; tc.fillStyle = '#fff'; tc.fillRect(600 - (n - i) * w, 8, w, 28); tc.fillStyle = c.css; tc.fillRect(600 - (n - i) * w, 8, w, 28); if (c.sh) { tc.fillStyle = '#1e293b'; tc.fillRect(600 - (n - i) * w, 0, w, 6); } }
  }
  function frame(t) {
    var dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    if (BB.active === 'm1' && svg.offsetParent !== null) {
      var b = cur(), d = dt * speed; var sh = shaking > 0; if (sh) { shaking -= dt; if (shaking <= 0) svg.parentNode.classList.remove('shk'); }
      b.step(d, sh);
      var c = BB.color(BB.cur, b.pop); BB.flaskColor(svg, c);
      var word = BB.word(BB.cur, b.pop); $('m1word').textContent = word;
      $('m1bO').style.width = Math.round(b.o * 100) + '%'; $('m1gO').textContent = b.o > 0.6 ? 'viel' : b.o > 0.15 ? 'wenig' : 'fast keiner';
      $('m1bG').style.width = Math.round(b.G * 100) + '%'; $('m1gG').textContent = b.G > 0.6 ? 'reichlich' : b.G > 0.2 ? 'sinkt' : 'fast aufgebraucht';
      $('m1cyc').textContent = b.cycles;
      var bubs = svg.querySelector('.fl-bubs'); if (sh) { var h = ''; for (var k = 0; k < 12; k++) h += '<circle cx="' + (50 + Math.random() * 100) + '" cy="' + (130 + Math.random() * 80) + '" r="' + (2 + Math.random() * 3) + '" fill="#fff" opacity=".75"/>'; bubs.innerHTML = h; } else if (bubs.firstChild) bubs.innerHTML = '';
      tlAcc += d; while (tlAcc >= 0.25) { tlAcc -= 0.25; cols.push({ css: BB.css(c), sh: sh }); if (cols.length > 300) cols.shift(); }
      drawTL();
      // Protokoll: ein Eintrag, wenn sich das Farbwort für eine Weile nicht mehr ändert
      if (word !== pending) { pending = word; wT = 0; } else { wT += dt; if (wT > 0.9 && word !== lastWord) { addLog(word); lastWord = word; if (!sh) acted = 'Der Kolben steht in Ruhe'; } }
      if (b.cycles >= 1 && !svg._m) { svg._m = 1; }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ---- Aufgaben
  Prog.add('m1', 4);
  mc($('m1q'), { mod: 'm1', q: '<b>a)</b> Du lässt den Kolben mit der Methylenblau-Lösung ruhig stehen. Was beobachtest du, und was geschieht dann beim Schütteln?', opts: [
      'Die blaue Lösung wird farblos. Beim Schütteln wird sie wieder blau.', 'Die blaue Lösung bleibt blau. Beim Schütteln wird sie farblos.', 'Die Lösung wird immer dunkler, egal was man tut.', 'Die Lösung wird farblos und bleibt auch beim Schütteln farblos.'], ok: 0,
    why: 'In Ruhe entfärbt sich die Lösung, beim Schütteln kehrt die Farbe zurück. Das lässt sich oft wiederholen.', hints: { 1: 'Probiere es oben noch einmal aus: Was passiert, wenn du lange nichts tust?', 2: 'Beobachte den Verlauf: Es gibt dunkle und helle Phasen.', 3: 'Schüttle den Kolben noch einmal und schau genau hin.' } });
  mc($('m1q'), { mod: 'm1', q: '<b>b)</b> Beim <b>Indigocarmin</b> verändert sich die Farbe, wenn der Kolben ruht, in mehreren Stufen. Welche Reihenfolge siehst du?', opts: [
      'grün → rot → gelb', 'gelb → rot → grün', 'blau → farblos', 'grün → blau → violett'], ok: 0, fix: true,
    why: 'Beim Ruhen wird die Lösung zuerst rot und dann gelb. Beim Schütteln läuft die Reihe rückwärts: gelb → rot → grün. Das erinnert an eine Ampel.', hints: { 1: 'Das ist die Richtung beim Schütteln. Beim Ruhen läuft es umgekehrt.', 2: 'Das gilt für Methylenblau, nicht für Indigocarmin. Wähle oben den anderen Farbstoff.', 3: 'Wähle oben Indigocarmin und lass den Kolben ruhen.' } });
  mc($('m1q'), { mod: 'm1', q: '<b>c)</b> Wozu braucht die Lösung wohl das Schütteln? Welche Vermutung passt zu den Anzeigen „gelöster Sauerstoff“ und „Glucose-Vorrat“?', opts: [
      'Beim Schütteln löst sich Sauerstoff aus der Luft im Kolben in der Lösung.', 'Beim Schütteln wird die Lösung warm, und Wärme färbt den Farbstoff.', 'Beim Schütteln entsteht neuer Farbstoff aus Glucose.', 'Beim Schütteln wird Licht in die Lösung gemischt.'], ok: 0,
    why: 'Der Balken „gelöster Sauerstoff“ steigt beim Schütteln stark an. Sauerstoff ist also der Stoff, der die Farbe zurückbringt.', hints: { 1: 'Schau auf den Balken: Was steigt beim Schütteln an?', 2: 'Die Menge des Farbstoffs ändert sich nicht. Das siehst du in Modul 2.', 3: 'Licht spielt hier keine Rolle. Achte auf die Balken.' } });
  gap($('m1q'), { mod: 'm1', parts: ['<b>d)</b> Zum Entfärben wird ', { o: ['Glucose', 'Sauerstoff', 'Natronlauge'], ok: 0 }, ' verbraucht, zum Zurückfärben wird ', { o: ['Glucose', 'Sauerstoff', 'Farbstoff'], ok: 1 }, ' verbraucht. Nach sehr vielen Wiederholungen bleibt die Lösung dauerhaft ', { o: ['farbig', 'farblos'], ok: 0 }, ', weil die ', { o: ['Glucose aufgebraucht ist', 'Luft im Kolben verbraucht ist'], ok: 0 }, '.'],
    why: 'Der Glucose-Vorrat sinkt mit jeder Entfärbung. Ist er leer, kann der Farbstoff nicht mehr entfärbt werden.'});
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });
})();
