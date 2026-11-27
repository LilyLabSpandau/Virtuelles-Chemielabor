/* Station 2: Eigenschaften-Labor: Metall und Salzkristall im Vergleich */
(function () {
  'use strict';
  Prog.add('m2', 4);
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });
  var W = 280, H = 250, SP = 44, COLS = 5, ROWS = 4;
  function mk(id) { var c = $(id), x = c.getContext('2d'); c.width = W * 2; c.height = H * 2; x.scale(2, 2); return x; }
  var cm = mk('m2a'), cs = mk('m2b'), volt = false, shear = 0, shearing = false, crack = 0, el = [];
  for (var i = 0; i < 20; i++) el.push({ x: 30 + Math.random() * 220, y: 50 + Math.random() * 160, vx: Math.random() - .5, vy: Math.random() - .5 });
  var jit = [];
  for (i = 0; i < 40; i++) jit.push(Math.random() * 6.28);
  function lamp(x, on) {
    x.beginPath(); x.arc(W / 2, 18, 11, 0, 6.28); x.fillStyle = on ? '#fde047' : '#e5e7eb'; x.fill(); x.strokeStyle = '#64748b'; x.lineWidth = 2; x.stroke();
    if (on) { x.strokeStyle = '#facc15'; for (var a = 0; a < 8; a++) { x.beginPath(); x.moveTo(W / 2 + Math.cos(a * .785) * 15, 18 + Math.sin(a * .785) * 15); x.lineTo(W / 2 + Math.cos(a * .785) * 22, 18 + Math.sin(a * .785) * 22); x.stroke(); } }
    x.lineWidth = 1;
  }
  function plates(x) {
    x.fillStyle = volt ? '#dc2626' : '#cbd5e1'; x.fillRect(2, 40, 8, 190); x.fillStyle = volt ? '#2563eb' : '#cbd5e1'; x.fillRect(W - 10, 40, 8, 190);
    x.fillStyle = '#fff'; x.font = 'bold 13px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; if (volt) { x.fillText('−', 6, 135); x.fillText('+', W - 6, 135); }
  }
  function cx(i, j) { return 26 + i * SP; }
  function cy(j) { return 62 + j * 46; }
  function sh(j) { return j < 2 ? shear * SP : 0; }
  function frame() {
    if ($('m2').classList.contains('on')) {
      if (shearing) { shear = Math.min(1, shear + .012); if (shear >= 1) { shearing = false; } }
      if (shear >= 1 && crack < 1) crack = Math.min(1, crack + .02);
      // Metall
      cm.clearRect(0, 0, W, H); plates(cm); lamp(cm, volt);
      for (var j = 0; j < ROWS; j++) for (var i = 0; i < COLS; i++) {
        var x = cx(i, j) + sh(j), y = cy(j);
        cm.beginPath(); cm.arc(x, y, 13, 0, 6.28); cm.fillStyle = '#c7d2fe'; cm.fill(); cm.strokeStyle = '#475569'; cm.stroke(); cm.fillStyle = '#1e293b'; cm.font = 'bold 12px sans-serif'; cm.textAlign = 'center'; cm.textBaseline = 'middle'; cm.fillText('+', x, y);
      }
      cm.fillStyle = '#f59e0b';
      el.forEach(function (p) {
        p.vx += (Math.random() - .5) * .3; p.vy += (Math.random() - .5) * .3; var s = Math.hypot(p.vx, p.vy) || 1; p.vx = p.vx / s * 1; p.vy = p.vy / s * 1;
        var dx = volt ? 1.4 : 0; p.x += p.vx + dx; p.y += p.vy; if (p.x > W - 14) p.x = 14; if (p.x < 14) p.x = W - 14; if (p.y < 40) p.y = 40; if (p.y > 228) p.y = 228;
        cm.beginPath(); cm.arc(p.x, p.y, 3.2, 0, 6.28); cm.fill();
      });
      // Salz
      cs.clearRect(0, 0, W, H); plates(cs); lamp(cs, false);
      var split = crack > 0 ? crack : 0;
      for (j = 0; j < ROWS; j++) for (i = 0; i < COLS; i++) {
        var pos = ((i + j) % 2 === 0), top = j < 2, off = top ? shear * SP : 0, ex = top ? split * 8 : 0, ey = top ? -split * 16 : 0;
        var jx = Math.cos(jit[j * 5 + i] + performance.now() / 300) * 1.2, jy = Math.sin(jit[j * 5 + i] + performance.now() / 300) * 1.2;
        var x2 = cx(i, j) + off + ex + jx, y2 = cy(j) + ey + jy;
        cs.beginPath(); cs.arc(x2, y2, pos ? 11 : 15, 0, 6.28); cs.fillStyle = pos ? '#bfdbfe' : '#bbf7d0'; cs.fill(); cs.strokeStyle = '#475569'; cs.stroke();
        cs.fillStyle = '#1e293b'; cs.font = 'bold 11px sans-serif'; cs.textAlign = 'center'; cs.textBaseline = 'middle'; cs.fillText(pos ? 'Na⁺' : 'Cl⁻', x2, y2);
      }
      if (shear >= 1 && crack < .3) { cs.strokeStyle = '#dc2626'; cs.lineWidth = 3; cs.beginPath(); cs.moveTo(14, cy(1) + 23); cs.lineTo(W - 14, cy(1) + 23); cs.stroke(); cs.lineWidth = 1; cs.fillStyle = '#dc2626'; cs.font = 'bold 22px sans-serif'; cs.fillText('⇄', W / 2, cy(1) + 23); }
    }
    requestAnimationFrame(frame);
  }
  $('m2v').onclick = function () { volt = !volt; $('m2v').textContent = volt ? 'Spannung abschalten' : 'Spannung anlegen'; };
  $('m2s').onclick = function () { if (shear === 0) shearing = true; };
  $('m2r').onclick = function () { shear = 0; crack = 0; shearing = false; };
  requestAnimationFrame(frame);
  gap($('m2g'), {
    parts: ['<p class="qt"><b>Aufgabe 1.</b> Erkläre die Leitfähigkeit.</p><div class="gaptext">Das Metall leitet den Strom, weil sich die ', { o: ['Elektronen im Gas frei bewegen können', 'Atomrümpfe durch das Gitter bewegen', 'Atomkerne in Richtung Pluspol verschieben'], ok: 0 }, '. Der feste Salzkristall leitet nicht, weil die ', { o: ['Ionen auf festen Gitterplätzen sitzen', 'Ionen keine Ladung besitzen', 'Elektronen im Gitter frei beweglich sind'], ok: 0 }, '.</div>'],
    mod: 'm2', why: 'Im Metall wandern die frei beweglichen Elektronen zum Pluspol. Im festen Salz sind die Ionen an ihre Plätze gebunden.'
  });
  gap($('m2g').appendChild(document.createElement('div')), {
    parts: ['<p class="qt"><b>Aufgabe 2.</b> Erkläre das Verhalten beim Schlag.</p><div class="gaptext">Im Metall verschieben sich ganze Gitterschichten, die Bindung bleibt erhalten, weil das ', { o: ['Elektronengas alle Rümpfe weiterhin umgibt', 'Gitter die Ionen in feste Positionen zwingt', 'Elektronengas zwischen den Schichten verschwindet'], ok: 0 }, '. Im Salzkristall stehen sich nach der Verschiebung ', { o: ['gleichnamig geladene Ionen', 'ungleichnamig geladene Ionen', 'neutrale Atome'], ok: 0 }, ' gegenüber. Sie ', { o: ['stoßen sich ab', 'ziehen sich stärker an', 'bleiben unbeeinflusst'], ok: 0 }, ' und der Kristall ', { o: ['zerspringt', 'lässt sich schmieden', 'wird weich'], ok: 0 }, '.</div>'],
    mod: 'm2', why: 'Metalle sind duktil, weil das Elektronengas die Rümpfe auch nach dem Verschieben zusammenhält. Ionenkristalle sind spröde.'
  });
  mc($('m2g').appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 3.</b> Warum haben Metalle einen charakteristischen Glanz?',
    opts: ['Die beweglichen Elektronen nehmen Licht auf und senden es wieder aus', 'Die Atomrümpfe sind selbst durchsichtig und lassen alles Licht hindurch', 'Die Valenzelektronen sind fest gebunden und färben das Licht silbrig', 'Metallatome besitzen eine besondere Oberfläche, die das Licht verstärkt'], ok: 0, mod: 'm2',
    why: 'Das Elektronengas absorbiert Licht aller Wellenlängen und strahlt es sofort wieder ab. Das ist der Metallglanz.',
    hints: { 1: 'Metalle sind undurchsichtig. Das Licht dringt nicht hindurch.', 2: 'Im Metall sind die Valenzelektronen gerade nicht fest gebunden.', 3: 'Licht wird nicht verstärkt, sondern reflektiert.' }
  });
  mc($('m2g').appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 4.</b> Warum leiten Metalle auch Wärme besonders gut?',
    opts: ['Die frei beweglichen Elektronen transportieren Energie schnell durch das Gitter', 'Die Atomrümpfe haben sehr hohe Schmelztemperaturen und speichern Wärme', 'Die Metallatome stoßen einander ab und geben Wärme dadurch schnell weiter', 'Die Ionen im Gitter wandern bei Erwärmung zur kälteren Stelle des Stücks'], ok: 0, mod: 'm2',
    why: 'Schnelle Elektronen geben Bewegungsenergie im ganzen Gitter weiter. Deshalb sind gute Stromleiter meist auch gute Wärmeleiter.',
    hints: { 1: 'Hohe Schmelztemperaturen sagen nichts über die Wärmeleitung.', 2: 'Im Gitter wirken Anziehungskräfte, die Atomrümpfe stoßen sich nicht einfach ab.', 3: 'Die Rümpfe bleiben auf ihren Plätzen und schwingen nur.' }
  });
})();
