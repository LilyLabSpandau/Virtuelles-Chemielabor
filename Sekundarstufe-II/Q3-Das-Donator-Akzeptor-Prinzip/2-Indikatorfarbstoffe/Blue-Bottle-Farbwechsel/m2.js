/* Modul 2: Teilchenebene – wer gibt Elektronen an wen? */
(function () {
  'use strict';
  var cv = $('sim2'), sim = new BB.Sim(cv, { dye: 'mb', nG: 40, nD: 10, nO: 5 }), playing = true;
  sim.start();
  BB.src.m2 = function () { var D = BB.DYE[sim.dye]; var p = sim.pop(); return BB.color(sim.dye, p); };
  function ico(cls, css) { return '<span><i class="lg ' + cls + '" style="' + css + '"></i>'; }
  function legend() {
    var D = BB.DYE[BB.cur], h = ico('hx', '') + ' Glucose</span><span><i class="lg hx" style="background:#c8e0a0"></i> Gluconat (Elektronen abgegeben)</span>';
    if (BB.cur === 'mb') h += '<span><i class="lg c" style="background:#1c3cbe"></i> MB⁺ (blau)</span><span><i class="lg c" style="background:#fff;border:1.6px dashed #7aa6e0"></i> Leuko-MB (farblos)</span>';
    else h += '<span><i class="lg c" style="background:#26a069"></i> IC grün</span><span><i class="lg c" style="background:#d6342c"></i> IC rot</span><span><i class="lg c" style="background:#ecc828"></i> Leuko-IC gelb</span>';
    h += '<span><i class="lg c" style="background:#e0364a"></i> O₂ (weiße Striche = freie Elektronenplätze)</span><span><i class="lg c" style="background:#facc15"></i> Elektronen (e⁻)</span>';
    $('m2leg').innerHTML = h;
  }
  function equations() {
    var h;
    if (BB.cur === 'mb') h =
      '<div class="eq"><span class="l">Glucose gibt ab:</span> R–CHO + 3 OH⁻ → R–COO⁻ + 2 H₂O + <b>2 e⁻</b></div>' +
      '<div class="eq"><span class="l">MB⁺ nimmt auf:</span> MB⁺ + H₂O + <b>2 e⁻</b> → MBH + OH⁻ <small>(Leuko-MB, farblos)</small></div>' +
      '<div class="eq"><span class="l">MBH gibt ab:</span> MBH + OH⁻ → MB⁺ + H₂O + <b>2 e⁻</b></div>' +
      '<div class="eq"><span class="l">O₂ nimmt auf:</span> O₂ + 2 H₂O + <b>4 e⁻</b> → 4 OH⁻</div>' +
      '<div class="eq" style="border-top:1px solid #e2e8f0;margin-top:4px;padding-top:4px"><span class="l">Gesamt:</span> 2 R–CHO + O₂ + 2 OH⁻ → 2 R–COO⁻ + 2 H₂O <small>(der Farbstoff kommt nicht mehr vor)</small></div>' +
      '<p class="small" style="margin:6px 0 0">R–CHO steht für Glucose in ihrer offenkettigen Aldehydform, R–COO⁻ für das Gluconat. In der Natronlauge liegt Glucose als besonders guter Elektronengeber vor.</p>';
    else h =
      '<div class="eq"><span class="l">Glucose gibt ab:</span> R–CHO + 3 OH⁻ → R–COO⁻ + 2 H₂O + <b>2 e⁻</b></div>' +
      '<div class="eq"><span class="l">1. Schritt:</span> IC (grün) + <b>1 e⁻</b> → IC (rot) <small>(Zwischenstufe)</small></div>' +
      '<div class="eq"><span class="l">2. Schritt:</span> IC (rot) + <b>1 e⁻</b> → Leuko-IC (gelb)</div>' +
      '<div class="eq"><span class="l">Rückweg:</span> Leuko-IC → IC (rot) + <b>1 e⁻</b> → IC (grün) + <b>1 e⁻</b></div>' +
      '<div class="eq"><span class="l">O₂ nimmt auf:</span> O₂ + 2 H₂O + <b>4 e⁻</b> → 4 OH⁻</div>' +
      '<p class="small" style="margin:6px 0 0">Der Indigocarmin-Farbstoff nimmt die Elektronen einzeln auf. Deshalb gibt es die rote Zwischenstufe. Die Beteiligung von H⁺ und OH⁻ am Farbstoff ist hier vereinfacht weggelassen.</p>';
    $('m2eq').innerHTML = h;
  }
  function counts() { $('m2c1').textContent = sim.stat.gd; $('m2c2').textContent = sim.stat.dO; $('m2c3').textContent = sim.stat.gO; $('m2c4').textContent = sim.free() + ' von ' + sim.glc.length; }
  setInterval(counts, 200);
  document.addEventListener('dye', function () { sim.setDye(BB.cur); legend(); equations(); });
  legend(); equations(); sim.draw();
  $('m2play').addEventListener('click', function () { playing = !playing; if (playing) sim.start(); else sim.stop(); this.textContent = playing ? 'Pause' : 'Weiter'; });
  $('m2shake').addEventListener('click', function () { sim.shake(); });
  $('m2fast').addEventListener('click', function () { sim.speed = sim.speed === 1 ? 3 : 1; this.setAttribute('aria-pressed', sim.speed === 3); this.classList.toggle('sec', sim.speed !== 3); });
  $('m2reset').addEventListener('click', function () { sim.reset(); sim.draw(); });
  cv.addEventListener('click', function () { sim.shake(); });

  Prog.add('m2', 5);
  var box = $('m2q');
  mc(box, { mod: 'm2', q: '<b>a)</b> Welche Teilchen geben im Verlauf des Versuchs Elektronen ab, welche nehmen sie auf?', opts: [
      'Glucose gibt ab, der Farbstoff nimmt auf und gibt anschließend an Sauerstoff weiter.', 'Sauerstoff gibt ab, der Farbstoff nimmt auf, Glucose nimmt am Ende auf.', 'Der Farbstoff gibt immer ab, Glucose und Sauerstoff nehmen auf.', 'Alle Teilchen tauschen zufällig Elektronen aus.'], ok: 0,
    why: 'Die Elektronen wandern von der Glucose über den Farbstoff zum Sauerstoff. Der Farbstoff ist dabei der Vermittler.', hints: { 1: 'Verfolge die gelben Elektronen in der Simulation: Wo starten sie, wo enden sie?', 2: 'Der Farbstoff nimmt zuerst auf und gibt erst danach ab.', 3: 'In der Simulation gibt es klare Richtungen.' } });
  gap(box, { mod: 'm2', parts: ['<b>b)</b> Ein Glucose-Teilchen gibt ', { o: ['1', '2', '4'], ok: 1 }, ' Elektronen ab. Ein O₂-Molekül kann ', { o: ['2', '4', '8'], ok: 1 }, ' Elektronen aufnehmen. Ein Leuko-MB-Teilchen gibt ', { o: ['2', '4'], ok: 0 }, ' Elektronen ab. Deshalb kann ein O₂-Molekül ', { o: ['ein', 'zwei', 'vier'], ok: 1 }, ' Leuko-MB-Teilchen wieder in MB⁺ verwandeln.'],
    why: 'Vier aufgenommene Elektronen reichen für zwei Leuko-MB-Teilchen mit je zwei abgegebenen Elektronen. Die Elektronenbilanz muss immer aufgehen.' });
  mc(box, { mod: 'm2', q: '<b>c)</b> Die Lösung ist farblos. Was ist mit den Farbstoff-Teilchen geschehen?', opts: [
      'Sie haben Elektronen aufgenommen und liegen in einer farblosen Form vor. Sie sind noch alle da.', 'Sie sind zerfallen und verschwunden.', 'Sie haben Elektronen abgegeben und sind dadurch farblos geworden.', 'Sie sind mit der Glucose zu einem neuen Stoff reagiert.'], ok: 0,
    why: 'Die Teilchenzahl des Farbstoffs bleibt konstant. Nur ihr Zustand, also die Zahl ihrer Elektronen, ändert sich. Das sieht man den weißen gestrichelten Kreisen an.', hints: { 1: 'Zähle in der Simulation: Die Zahl der Farbstoff-Teilchen bleibt gleich.', 2: 'In der Simulation ist es umgekehrt: Zuerst nehmen sie Elektronen von der Glucose auf.', 3: 'Der Farbstoff wird in der Gesamtgleichung nicht mehr genannt.' } });
  mc(box, { mod: 'm2', q: '<b>d)</b> Welche Teilchen werden im Verlauf des Versuchs dauerhaft verbraucht?', opts: [
      'Glucose und Sauerstoff', 'Farbstoff und Glucose', 'Nur der Farbstoff', 'Nur der Sauerstoff'], ok: 0, fix: true,
    why: 'Glucose wird zu Gluconat, Sauerstoff zu OH⁻. Der Farbstoff kommt in der Gesamtgleichung nicht vor: Er wird weder verbraucht noch gebildet.', hints: { 1: 'Zähle den Farbstoff vor und nach einem Durchlauf nach.', 2: 'Ein Stoff, der nur vermittelt, wird nicht verbraucht.', 3: 'Schau auch auf die Glucose-Teilchen: Sie werden grün und kommen nicht zurück.' } });
  mc(box, { mod: 'm2', q: '<b>e)</b> Beim <b>Indigocarmin</b> gibt es eine rote Zwischenstufe. Woran liegt das?', opts: [
      'Der Farbstoff nimmt die Elektronen einzeln auf. Nach dem ersten Elektron liegt die rote Zwischenstufe vor, nach dem zweiten die gelbe Leuko-Form.', 'Der Farbstoff nimmt vier Elektronen auf einmal auf.', 'Die rote Farbe entsteht aus der Reaktion von Sauerstoff mit Glucose.', 'Die rote Zwischenstufe entsteht nur, wenn kein Farbstoff vorhanden ist.'], ok: 0,
    why: 'Zwei Schritte mit je einem Elektron ergeben drei Zustände und damit drei Farben: grün, rot und gelb. Methylenblau nimmt beide Elektronen in einem Schritt auf und hat deshalb nur zwei Zustände.', hints: { 1: 'In der Simulation transportiert jeder Elektronenpunkt beim Indigocarmin nur ein Elektron.', 2: 'Der rote Zustand ist ein Zustand des Farbstoffs. Schau auf die Farbe der Kreise.', 3: 'Ohne Farbstoff gibt es keine rote Stufe.' }});
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });
})();
