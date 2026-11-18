/* Modul 3: Der Farbstoff als Katalysator */
(function () {
  'use strict';
  var A = new BB.Sim($('sim3a'), { dye: 'mb', dyeOn: false, nG: 40, nO: 5 }), Bm = new BB.Sim($('sim3b'), { dye: 'mb', dyeOn: true, nG: 40, nD: 10, nO: 5 }), playing = true, verdShown = false;
  function sims() { return [A, Bm]; }
  sims().forEach(function (s) { s.start(); });
  BB.src.m3 = function () { return BB.color(Bm.dye, Bm.pop()); };
  function setDyeN() { $('m3dn').textContent = '(' + BB.DYE[BB.cur].name + ')'; }
  setDyeN();
  document.addEventListener('dye', function () { A.dye = BB.cur; Bm.setDye(BB.cur); A.reset(); A.draw(); verdShown = false; $('m3verd').hidden = true; setDyeN(); });
  setInterval(function () {
    $('m3a').textContent = A.used() + ' von ' + A.glc.length; $('m3b').textContent = Bm.used() + ' von ' + Bm.glc.length; $('m3t').textContent = Math.round(Bm.t);
    if (!verdShown && Bm.t >= 30 && $('sim3b').offsetParent !== null) {
      verdShown = true; if (!window._m3v) { window._m3v = 1; Prog.done('m3'); } var f = $('m3verd'); f.hidden = false;
      f.innerHTML = '<b>Auswertung nach 30 s Modellzeit:</b> Ohne Farbstoff haben nur ' + A.used() + ' von ' + A.glc.length + ' Glucose-Teilchen Elektronen abgegeben, mit Farbstoff ' + Bm.used() + '. Die Reaktion zwischen Glucose und Sauerstoff läuft mit Farbstoff also deutlich schneller. Der Farbstoff selbst ist dabei nicht weniger geworden.';
    }
  }, 300);
  $('m3play').addEventListener('click', function () { playing = !playing; sims().forEach(function (s) { if (playing) s.start(); else s.stop(); }); this.textContent = playing ? 'Pause' : 'Weiter'; });
  $('m3shake').addEventListener('click', function () { A.shake(); Bm.shake(); });
  $('m3fast').addEventListener('click', function () { var v = A.speed === 1 ? 3 : 1; sims().forEach(function (s) { s.speed = v; }); this.setAttribute('aria-pressed', v === 3); this.classList.toggle('sec', v !== 3); });
  $('m3reset').addEventListener('click', function () { sims().forEach(function (s) { s.reset(); s.draw(); }); verdShown = false; $('m3verd').hidden = true; });
  sims().forEach(function (s) { s.draw(); });

  // ---- Energiediagramm
  var en = $('m3en'), cat = $('m3cat');
  function energy() {
    var on = cat.checked;
    en.setAttribute('viewBox', '0 0 380 220');
    var u = 'M80 140 C110 140 140 36 180 36 C220 36 250 172 280 172', c = 'M80 140 C100 140 115 86 140 86 C160 86 170 112 190 112 C210 112 215 92 235 92 C255 92 262 172 280 172';
    en.innerHTML =
      '<defs><marker id="en-a" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L6 3L0 6z" fill="#475569"/></marker></defs>' +
      '<line x1="40" x2="40" y1="14" y2="196" stroke="#475569" stroke-width="1.6"/><line x1="40" x2="360" y1="196" y2="196" stroke="#475569" stroke-width="1.6"/>' +
      '<text x="12" y="105" font-size="11" fill="#334155" transform="rotate(-90 12 105)" text-anchor="middle">Energie</text><text x="200" y="213" font-size="11" fill="#334155" text-anchor="middle">Reaktionsverlauf</text>' +
      '<path d="M40 140 H80" stroke="#334155" stroke-width="3"/><path d="M280 172 H330" stroke="#334155" stroke-width="3"/>' +
      '<text x="44" y="131" font-size="10.5" fill="#334155" font-weight="700">Edukte</text><text x="44" y="156" font-size="9.5" fill="#64748b">Glucose + O₂</text>' +
      '<text x="305" y="162" font-size="10.5" fill="#334155" text-anchor="middle" font-weight="700">Produkte</text><text x="305" y="186" font-size="9.5" fill="#64748b" text-anchor="middle">Gluconat + OH⁻</text>' +
      '<path d="' + u + '" fill="none" stroke="' + (on ? '#94a3b8' : '#dc2626') + '" stroke-width="' + (on ? 2 : 3.2) + '" stroke-dasharray="' + (on ? '6 4' : '') + '" stroke-linecap="round"/>' +
      '<path d="M180 140 V38" stroke="#dc2626" stroke-width="1.6" marker-start="url(#en-a)" marker-end="url(#en-a)" opacity="' + (on ? .4 : 1) + '"/><text x="180" y="26" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="800" opacity="' + (on ? .55 : 1) + '">Ea ohne Farbstoff</text>' +
      (on ? '<path d="' + c + '" fill="none" stroke="#2563eb" stroke-width="3.4" stroke-linecap="round"/>' +
        '<path d="M120 140 V86" stroke="#2563eb" stroke-width="1.6" marker-start="url(#en-a)" marker-end="url(#en-a)"/><text x="116" y="119" font-size="10.5" fill="#2563eb" font-weight="800" text-anchor="end">Ea 1</text>' +
        '<path d="M236 118 V92" stroke="#2563eb" stroke-width="1.6" marker-start="url(#en-a)" marker-end="url(#en-a)"/><text x="241" y="108" font-size="10.5" fill="#2563eb" font-weight="800">Ea 2</text>' +
        '<text x="190" y="130" font-size="10" fill="#1d4ed8" text-anchor="middle" font-weight="700">Farbstoff mit</text><text x="190" y="141" font-size="10" fill="#1d4ed8" text-anchor="middle" font-weight="700">Elektronen (farblos)</text>' +
        '<text x="140" y="78" font-size="10" fill="#1d4ed8" text-anchor="middle">1: Glucose → Farbstoff</text><text x="238" y="82" font-size="10" fill="#1d4ed8" text-anchor="middle">2: Farbstoff → O₂</text>' : '') +
      '<path d="M350 140 V172" stroke="#475569" stroke-width="1.6" marker-start="url(#en-a)" marker-end="url(#en-a)"/><text x="354" y="160" font-size="10.5" fill="#475569" font-weight="800">ΔE</text><path d="M330 140 H350" stroke="#475569" stroke-dasharray="3 3"/>';
    $('m3entxt').innerHTML = on ? 'Mit Farbstoff gibt es zwei Teilschritte mit je <b>niedrigerer</b> Aktivierungsenergie. Der Höhenunterschied ΔE zwischen Edukten und Produkten ist <b>derselbe</b> geblieben.' : 'Ohne Farbstoff muss die Reaktion einen einzigen sehr hohen Berg überwinden. Die Teilchen schaffen das nur selten.';
  }
  cat.addEventListener('change', function () { energy(); if (cat.checked && !catDone) { catDone = true; Prog.done('m3'); } });
  energy();

  Prog.add('m3', 7); var catDone = false;
  var box = $('m3q');
  mc(box, { mod: 'm3', q: '<b>a)</b> Warum nennt man den Farbstoff in diesem Versuch einen <b>Katalysator</b>?', opts: [
      'Er beschleunigt die Reaktion von Glucose mit Sauerstoff und liegt am Ende unverändert wieder vor.', 'Er liefert die Elektronen, die der Sauerstoff aufnimmt.', 'Er verschiebt die Lage der Produkte auf eine niedrigere Energie.', 'Er wird verbraucht und muss deshalb nachgefüllt werden.'], ok: 0,
    why: 'Ein Katalysator beschleunigt die Reaktion und wird dabei nicht verbraucht. Er geht zwischendurch in eine andere Form über, am Ende ist er wieder da.', hints: { 1: 'Die Elektronen kommen von der Glucose. Der Farbstoff vermittelt nur.', 2: 'Ein Katalysator ändert nur den Weg, nicht Edukte und Produkte.', 3: 'Zähle die Farbstoff-Teilchen in Modul 2 nach: Sie bleiben gleich viele.' } });
  mc(box, { mod: 'm3', q: '<b>b)</b> Was ändert der Farbstoff am Energiediagramm?', opts: [
      'Er ermöglicht einen Weg mit zwei niedrigeren Barrieren, während ΔE gleich bleibt.', 'Er senkt die Energie der Produkte, sodass mehr Energie frei wird.', 'Er erhöht die Energie der Edukte.', 'Er senkt die Barriere, weil er die Edukte erwärmt.'], ok: 0,
    why: 'Der Farbstoff öffnet einen neuen Reaktionsweg mit niedrigeren Aktivierungsenergien. Die Energiedifferenz ΔE zwischen Edukten und Produkten bleibt gleich.', hints: { 1: 'Schalte den Farbstoff im Diagramm ein und aus: Die Produkte bleiben auf gleicher Höhe.', 2: 'Edukte und Produkte liegen im Diagramm immer auf denselben Niveaus.', 3: 'Ein Katalysator wirkt nicht über die Temperatur.' } });
  gap(box, { mod: 'm3', parts: ['<b>c)</b> Der Farbstoff nimmt zuerst ', { o: ['Elektronen von der Glucose', 'Sauerstoff', 'Glucose'], ok: 0 }, ' auf und gibt sie danach an ', { o: ['die Natronlauge', 'den Sauerstoff', 'die Glucose'], ok: 1 }, ' weiter. Er wirkt als ', { o: ['Elektronenvermittler und Katalysator', 'Edukt', 'Produkt'], ok: 0 }, ', und seine Gesamtmenge bleibt ', { o: ['gleich', 'nicht erhalten'], ok: 0 }, '.'],
    why: 'Der Farbstoff transportiert Elektronen von der Glucose zum Sauerstoff. Weder entsteht neuer Farbstoff, noch geht welcher verloren.' });
  mc(box, { mod: 'm3', q: '<b>d)</b> Wann überwiegt im Kolben die farbige Form des Farbstoffs?', opts: [
      'Wenn viel Sauerstoff gelöst ist, zum Beispiel nach dem Schütteln. Dann gibt der Farbstoff seine Elektronen schnell an den Sauerstoff ab.', 'Wenn der Sauerstoff aufgebraucht ist und die Glucose noch reichlich vorhanden ist.', 'Wenn der Kolben lange in Ruhe steht.', 'Immer, denn der Farbstoff ist nur farbig.'], ok: 0,
    why: 'Die Farbe zeigt, in welcher Form der Katalysator gerade überwiegt. Viel Sauerstoff: farbig, weil die Elektronen schnell weitergegeben werden. Wenig Sauerstoff: die Elektronen bleiben am Farbstoff, er ist farblos.', hints: { 1: 'Das stimmt für den Dauerzustand am Ende, aber nicht für die Phase direkt nach dem Schütteln.', 2: 'In Ruhe wird der Sauerstoff verbraucht, und die Lösung wird farblos.', 3: 'Der Farbstoff hat in Modul 2 beide Formen gezeigt.' } });
  mc(box, { mod: 'm3', q: '<b>e)</b> Die Lösung ist farblos, und du schüttelst nicht. Warum läuft die Reaktion von Glucose mit Sauerstoff praktisch nicht weiter?', opts: [
      'Der Farbstoff hat alle Elektronen aufgenommen, aber es ist kein Sauerstoff mehr da, an den er sie weitergeben kann.', 'Der Katalysator ist verbraucht.', 'Die Glucose ist sofort leer.', 'Der Sauerstoff ist zerfallen.'], ok: 0,
    why: 'Der Kreislauf der Elektronen ist unterbrochen: Der Farbstoff ist „beladen“ und wartet auf Sauerstoff. Erst nach dem Schütteln geht es weiter.', hints: { 1: 'Der Farbstoff ist nicht verbraucht, er liegt nur in der farblosen Form vor.', 2: 'Prüfe in Modul 1 den Glucose-Balken: Er ist noch gefüllt.', 3: 'Sauerstoff wird in der Reaktion verbraucht, nicht zersetzt.' } });
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
})();
