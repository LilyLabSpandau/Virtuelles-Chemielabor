/* Modul 3: Der Farbstoff als Katalysator */
(function () {
  'use strict';
  var A = new BB.Sim($('sim3a'), { dye: 'mb', dyeOn: false, nG: 40, nO: 5 }), Bm = new BB.Sim($('sim3b'), { dye: 'mb', dyeOn: true, nG: 40, nD: 10, nO: 5 }), playing = true, V = { mb: { shown: false, done: false, cat: false }, ic: { shown: false, done: false, cat: false } };
  function sims() { return [A, Bm]; }
  sims().forEach(function (s) { s.start(); });
  BB.src.m3 = function () { return BB.color(Bm.dye, Bm.pop()); };
  function setDyeN() { $('m3dn').textContent = '(' + BB.DYE[BB.cur].name + ')'; }
  setDyeN();
  document.addEventListener('dye', function () { A.dye = BB.cur; Bm.setDye(BB.cur); A.reset(); A.draw(); $('m3verd').hidden = true; V.mb.shown = V.ic.shown = false; cat.checked = V[BB.cur].cat; energy(); setDyeN(); });
  setInterval(function () {
    $('m3a').textContent = A.used() + ' von ' + A.glc.length; $('m3b').textContent = Bm.used() + ' von ' + Bm.glc.length; $('m3t').textContent = Math.round(Bm.t);
    var v = V[BB.cur];
    if (!v.shown && Bm.t >= 30 && $('sim3b').offsetParent !== null) {
      v.shown = true; if (!v.done) { v.done = true; Prog.done('m3|' + BB.cur); } var f = $('m3verd'); f.hidden = false;
      f.innerHTML = '<b>Auswertung nach 30 s Modellzeit:</b> Ohne Farbstoff haben nur ' + A.used() + ' von ' + A.glc.length + ' Glucose-Teilchen Elektronen abgegeben, mit Farbstoff ' + Bm.used() + '. Die Reaktion zwischen Glucose und Sauerstoff läuft mit Farbstoff also deutlich schneller. Der Farbstoff selbst ist dabei nicht weniger geworden.';
    }
  }, 300);
  $('m3play').addEventListener('click', function () { playing = !playing; sims().forEach(function (s) { if (playing) s.start(); else s.stop(); }); this.textContent = playing ? 'Pause' : 'Weiter'; });
  $('m3shake').addEventListener('click', function () { A.shake(); Bm.shake(); });
  $('m3fast').addEventListener('click', function () { var v = A.speed === 1 ? 3 : 1; sims().forEach(function (s) { s.speed = v; }); this.setAttribute('aria-pressed', v === 3); this.classList.toggle('sec', v !== 3); });
  $('m3reset').addEventListener('click', function () { sims().forEach(function (s) { s.reset(); s.draw(); }); V[BB.cur].shown = false; $('m3verd').hidden = true; });
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
  cat.addEventListener('change', function () { energy(); var v = V[BB.cur]; if (cat.checked) v.cat = true; if (cat.checked && !v.catDone) { v.catDone = true; Prog.done('m3|' + BB.cur); } });
  energy();

  Prog.add('m3|mb', 7); Prog.add('m3|ic', 7);
  var Q = BB.boxes($('m3q'));
  
  ['mb', 'ic'].forEach(function (d) {
    var box = Q[d], mb = d === 'mb', key = 'm3|' + d, farbig = mb ? 'blaue' : 'grüne', leer = mb ? 'farblos' : 'gelb';
    mc(box, { mod: key, q: '<b>a)</b> Warum nennt man den Farbstoff in diesem Versuch einen <b>Katalysator</b>?', opts: [
        'Er beschleunigt die Reaktion und liegt am Ende unverändert vor.', 'Er liefert die Elektronen, die der Sauerstoff am Ende aufnimmt.', 'Er verschiebt die Produkte auf eine niedrigere Energie als die Edukte.', 'Er wird bei der Reaktion verbraucht und muss deshalb nachgefüllt werden.'], ok: 0,
      why: 'Ein Katalysator beschleunigt die Reaktion und wird dabei nicht verbraucht. Er geht zwischendurch in eine andere Form über, am Ende ist er wieder da.', hints: { 1: 'Die Elektronen kommen von der Glucose. Der Farbstoff vermittelt nur.', 2: 'Ein Katalysator ändert nur den Weg, nicht Edukte und Produkte.', 3: 'Zähle die Farbstoff-Teilchen in Modul 2 nach: Sie bleiben gleich viele.' } });
    mc(box, { mod: key, q: '<b>b)</b> Was ändert der Farbstoff am Energiediagramm?', opts: [
        'Er öffnet einen Weg mit zwei kleineren Barrieren, ΔE bleibt gleich.', 'Er senkt die Energie der Produkte, sodass bei der Reaktion mehr Energie frei wird.', 'Er erhöht die Energie der Edukte und senkt so die Barriere.', 'Er senkt die Barriere, indem er die Edukte stark erwärmt.'], ok: 0,
      why: 'Der Farbstoff öffnet einen neuen Reaktionsweg mit niedrigeren Aktivierungsenergien. Die Energiedifferenz ΔE zwischen Edukten und Produkten bleibt gleich.', hints: { 1: 'Schalte den Farbstoff im Diagramm ein und aus: Die Produkte bleiben auf gleicher Höhe.', 2: 'Edukte und Produkte liegen im Diagramm immer auf denselben Niveaus.', 3: 'Ein Katalysator wirkt nicht über die Temperatur.' } });
    gap(box, { mod: key, parts: ['<b>c)</b> Der Farbstoff nimmt zuerst ', { o: ['Elektronen von der Glucose', 'Sauerstoff', 'Glucose'], ok: 0 }, ' auf und gibt sie danach an ', { o: ['die Natronlauge', 'den Sauerstoff', 'die Glucose'], ok: 1 }, ' weiter. Er wirkt als ', { o: ['Elektronenvermittler und Katalysator', 'Edukt', 'Produkt'], ok: 0 }, ', und seine Gesamtmenge bleibt ', { o: ['gleich', 'nicht erhalten'], ok: 0 }, '.'],
      why: 'Der Farbstoff transportiert Elektronen von der Glucose zum Sauerstoff. Weder entsteht neuer Farbstoff, noch geht welcher verloren.' });
    mc(box, { mod: key, q: '<b>d)</b> Wann überwiegt im Kolben die ' + farbig + ' Form des Farbstoffs?', opts: [
        'Wenn viel Sauerstoff gelöst ist, etwa direkt nach dem Schütteln.', 'Wenn der Sauerstoff aufgebraucht ist und noch viel Glucose da ist.', 'Wenn der Kolben schon lange ruhig in Ruhe steht.', 'Immer, denn der Farbstoff hat nur eine einzige Form.'], ok: 0,
      why: 'Die Farbe zeigt, in welcher Form der Katalysator gerade überwiegt. Viel Sauerstoff: die ' + farbig + ' Form, weil die Elektronen schnell weitergegeben werden. Wenig Sauerstoff: Die Elektronen bleiben am Farbstoff, er ist ' + leer + '.', hints: { 1: 'Das stimmt für die Phase lange nach dem Schütteln, nicht für die Phase direkt danach.', 2: 'In Ruhe wird der Sauerstoff verbraucht, und die Lösung wird ' + leer + '.', 3: 'Der Farbstoff hat in Modul 2 mehrere Formen gezeigt.' } });
    mc(box, { mod: key, q: '<b>e)</b> Die Lösung ist ' + leer + ', und du schüttelst nicht. Warum läuft die Reaktion von Glucose mit Sauerstoff nur noch sehr langsam weiter?', opts: [
        'Der Farbstoff ist beladen und wartet auf Sauerstoff, der nur langsam nachkommt.', 'Der Katalysator ist inzwischen verbraucht, deshalb kann er nichts mehr vermitteln.', 'Die Glucose ist inzwischen vollständig aufgebraucht, nichts kann mehr reagieren.', 'Der Sauerstoff ist zerfallen und steht daher nicht mehr zur Verfügung.'], ok: 0,
      why: 'Der Kreislauf der Elektronen stockt: Der Farbstoff ist „beladen“ und wartet auf Sauerstoff, der in Ruhe nur langsam von der Oberfläche nachkommt. Deshalb sinkt der Glucose-Vorrat auch in Ruhe noch ein wenig, aber viel langsamer. Erst nach dem Schütteln geht es wieder schnell.', hints: { 1: 'Der Farbstoff ist nicht verbraucht, er liegt nur in der ' + leer + 'en Form vor.', 2: 'Prüfe in Modul 1 den Glucose-Balken: Er ist noch nicht leer.', 3: 'Sauerstoff wird in der Reaktion verbraucht, nicht zersetzt.' } });
  });
})();
