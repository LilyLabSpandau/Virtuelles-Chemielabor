/* Station 5: Legierungen */
(function () {
  'use strict';
  Prog.add('m5', 4);
  Prog.onFinish('m5', function () { $('m5merke').hidden = false; });
  var cv = $('m5cv'), ctx = cv.getContext('2d'), W = 560, H = 240; cv.width = W * 2; cv.height = H * 2; ctx.scale(2, 2);
  var kind = 0, force = 0, THR = [25, 60, 80], D = 44, R = 18;
  var foreign = [[1, 3], [0, 7], [2, 5], [3, 2], [1, 10]], small = [[0, 4], [1, 8], [2, 2], [2, 9], [3, 6]];
  function draw() {
    var sh = Math.max(0, Math.min(D, (force - THR[kind]) * .7)); ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#dc2626'; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(6, 122); ctx.lineTo(W - 6, 122); ctx.stroke(); ctx.setLineDash([]);
    for (var j = 0; j < 4; j++) for (var i = -1; i < 13; i++) {
      var x = 24 + i * D + (j % 2) * D / 2 + (j < 2 ? sh : 0), y = 34 + j * 54, isF = kind === 1 && foreign.some(function (f) { return f[0] === j && f[1] === i; });
      if (x < 8 || x > W - 8) continue;
      ctx.beginPath(); ctx.arc(x, y, isF ? 23 : R, 0, 6.28); ctx.fillStyle = isF ? '#c084fc' : '#93c5fd'; ctx.fill(); ctx.strokeStyle = '#1e3a8a'; ctx.stroke();
    }
    if (kind === 2) small.forEach(function (f) { var j = f[0], i = f[1], x = 24 + i * D + (j % 2) * D / 2 + D / 2 + (j < 2 ? sh : 0), y = 34 + j * 54 + 27; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.28); ctx.fillStyle = '#fb7185'; ctx.fill(); ctx.strokeStyle = '#9f1239'; ctx.stroke(); });
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'right'; ctx.fillText('Scherebene →', W - 8, 116);
    $('m5r').textContent = 'Verschiebung der oberen Schichten: ' + (sh / D).toFixed(1).replace('.', ',') + ' Atomabstände';
  }
  $('m5f').oninput = function () { force = +this.value; draw(); };
  Array.prototype.forEach.call(document.querySelectorAll('#m5 .ctrl .btn'), function (b) { b.onclick = function () { kind = +b.getAttribute('data-k'); Array.prototype.forEach.call(document.querySelectorAll('#m5 .ctrl .btn'), function (x) { x.classList.toggle('on', x === b); }); draw(); }; });
  draw();
  gap($('m5g'), {
    parts: ['<p class="qt"><b>Aufgabe 1.</b> Ordne die Legierungsarten zu.</p><div class="gaptext">In Stahl sitzen kleine Kohlenstoff-Atome in den Lücken des Eisengitters: eine ', { o: ['Einlagerungslegierung', 'Austauschlegierung'], ok: 0 }, '. In Messing ersetzen Zinkatome einen Teil der Kupferatome: eine ', { o: ['Austauschlegierung', 'Einlagerungslegierung'], ok: 0 }, '.</div>'],
    mod: 'm5', why: 'Kleine Atome (C, N, H) lagern sich in Lücken ein, ähnlich große Atome (Zn, Sn, Ni) ersetzen Gitteratome.'
  });
  mc($('m5g').appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 2.</b> Warum ist Stahl härter als reines Eisen?',
    opts: ['Kohlenstoff-Atome stören die regelmäßigen Gitterebenen und behindern das Gleiten', 'Kohlenstoff gibt zusätzliche Elektronen ab und macht das Elektronengas dichter', 'Stahl enthält kein Eisen, sondern Kohlenstoff-Atome mit festen Bindungen', 'Kohlenstoff-Atome füllen die Lücken und senken die Schmelztemperatur des Eisens'], ok: 0, mod: 'm5',
    why: 'Die Fremdatome blockieren das Verschieben der Schichten. Das Metall ist fester, aber weniger duktil.',
    hints: { 1: 'Nicht die Elektronenzahl, sondern die gestörten Gleitebenen sind entscheidend.', 2: 'Stahl besteht überwiegend aus Eisen.', 3: 'Die Schmelztemperatur erklärt die Härte nicht.' }
  });
  mc($('m5g').appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 3.</b> Reines Gold (24 Karat) ist sehr weich. Warum besteht Schmuck meist aus Gold-Legierungen?',
    opts: ['Zugesetzte Metalle wie Kupfer oder Silber machen den Schmuck härter und widerstandsfähiger', 'Das Gold wird dadurch leichter, weil Kupfer und Silber weniger Atome enthalten', 'Legierungen leiten den Strom besser und beschlagen deshalb nicht so schnell', 'Zugesetzte Metalle verringern die Zahl der Valenzelektronen im Elektronengas'], ok: 0, mod: 'm5',
    why: 'Fremdatome behindern das Gleiten der Goldschichten. 18-karätiges Gold enthält 75 % Gold und ist deutlich härter.',
    hints: { 1: 'Es geht um die mechanische Festigkeit, nicht um das Gewicht.', 2: 'Legierungen leiten meist schlechter als reine Metalle.', 3: 'Die Valenzelektronen sind nicht der Grund, sondern die gestörten Gitterebenen.' }
  });
  mc($('m5g').appendChild(document.createElement('div')), {
    q: '<b>Aufgabe 4.</b> Magnesium löst sich in Säure auf: Die Metallatome geben ihre Valenzelektronen ab. Welche Teilgleichung beschreibt das?',
    opts: ['Mg → Mg²⁺ + 2 e⁻ (Oxidation)', 'Mg + 2 e⁻ → Mg²⁺ (Reduktion)', 'Mg²⁺ → Mg + 2 e⁻ (Oxidation)', 'Mg → Mg²⁺ + e⁻ (Oxidation)'], ok: 0, mod: 'm5',
    why: 'Mg gibt zwei Valenzelektronen ab und wird oxidiert. Metalle sind typische Reduktionsmittel, ihre Rümpfe gehen als Kationen in Lösung.',
    hints: { 1: 'Hier würden Elektronen aufgenommen, das Metall gibt sie aber ab.', 2: 'Das ist die Rückreaktion: Ionen würden zum Metall reduziert.', 3: 'Magnesium hat zwei Valenzelektronen.' }
  });
})();
