/* Station 1: Metallgitter mit Elektronengas */
(function () {
  'use strict';
  Prog.add('m1', 3);
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });
  var cv = $('m1cv'), ctx = cv.getContext('2d'), W = 560, H = 250; cv.width = W * 2; cv.height = H * 2; ctx.scale(2, 2);
  var EL = { Na: { z: 1, r: 18, c: '#a5b4fc', ch: '+' }, Mg: { z: 2, r: 13, c: '#fcd34d', ch: '2+' }, Al: { z: 3, r: 10, c: '#fca5a5', ch: '3+' } };
  var cur = 'Na', mode = 'gas', cores = [], el = [];
  for (var j = 0; j < 4; j++) for (var i = 0; i < 8; i++) cores.push({ x: 40 + i * 64 + (j % 2) * 32, y: 38 + j * 58 });
  function reset() {
    var z = EL[cur].z; el = [];
    cores.forEach(function (c, ci) { for (var k = 0; k < z; k++) { var a = Math.random() * 6.28; el.push({ x: c.x + (Math.random() - .5) * 120, y: c.y + (Math.random() - .5) * 90, vx: Math.cos(a), vy: Math.sin(a), c: ci, ph: Math.random() * 6.28 }); } });
  }
  function chips() {
    var e = EL[cur];
    $('m1chips').innerHTML = [['Element', cur], ['Valenzelektronen je Atom', e.z], ['Ladung der Atomrümpfe', mode === 'gas' ? e.ch : '0 (Atome)'], ['Elektronen im Gas je Atom', mode === 'gas' ? e.z : '0']].map(function (x) { return '<div class="chip"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
    Array.prototype.forEach.call($('m1sel').children, function (b) { b.classList.toggle('on', b.getAttribute('data-e') === cur); });
    $('m1mode').textContent = mode === 'gas' ? 'Modell wechseln: einzelne Atome' : 'Modell wechseln: Metallgitter';
  }
  ['Na', 'Mg', 'Al'].forEach(function (n) { var b = document.createElement('button'); b.className = 'btn'; b.setAttribute('data-e', n); b.textContent = n === 'Na' ? 'Natrium' : n === 'Mg' ? 'Magnesium' : 'Aluminium'; b.onclick = function () { cur = n; reset(); chips(); }; $('m1sel').appendChild(b); });
  $('m1mode').onclick = function () { mode = mode === 'gas' ? 'atom' : 'gas'; chips(); };
  function frame(t) {
    if (cv.offsetParent !== null) {
      var e = EL[cur]; ctx.clearRect(0, 0, W, H);
      cores.forEach(function (c) {
        ctx.beginPath(); ctx.arc(c.x, c.y, mode === 'gas' ? e.r : e.r + 12, 0, 6.28); ctx.fillStyle = mode === 'gas' ? e.c : '#e5e7eb'; ctx.fill(); ctx.strokeStyle = '#475569'; ctx.stroke();
        ctx.fillStyle = '#1e293b'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(mode === 'gas' ? e.ch : cur, c.x, c.y);
      });
      ctx.fillStyle = '#f59e0b';
      el.forEach(function (p) {
        if (mode === 'gas') {
          p.vx += (Math.random() - .5) * .3; p.vy += (Math.random() - .5) * .3; var s = Math.hypot(p.vx, p.vy) || 1; p.vx = p.vx / s * 1.1; p.vy = p.vy / s * 1.1;
          p.x += p.vx; p.y += p.vy; if (p.x < 6) p.x = W - 6; if (p.x > W - 6) p.x = 6; if (p.y < 6) p.y = H - 6; if (p.y > H - 6) p.y = 6;
        } else { var c = cores[p.c]; p.ph += .05; var a = p.ph, rr = e.r + 12 + 5 + (el.indexOf(p) % 3) * 0; p.x = c.x + Math.cos(a + p.c) * (e.r + 22); p.y = c.y + Math.sin(a + p.c) * (e.r + 22); }
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, 6.28); ctx.fill();
      });
    }
    requestAnimationFrame(frame);
  }
  reset(); chips(); requestAnimationFrame(frame);
  gap($('m1a'), {
    parts: ['<p class="qt"><b>Aufgabe 1.</b> Beschreibe das Modell.</p><div class="gaptext">Im Metallgitter sind die Valenzelektronen ', { o: ['nicht mehr einzelnen Atomen zugeordnet', 'fest an je ein Atom gebunden', 'nur an der Oberfläche beweglich'], ok: 0 }, '. Zurück bleiben ', { o: ['positiv geladene Atomrümpfe', 'negativ geladene Atomrümpfe', 'neutrale Atome'], ok: 0 }, ', die vom ', { o: ['Elektronengas', 'Ionengitter', 'Atomkern'], ok: 0 }, ' zusammengehalten werden. Das Metallstück als Ganzes ist ', { o: ['elektrisch neutral', 'positiv geladen', 'negativ geladen'], ok: 0 }, ', weil ', { o: ['die Ladung der Rümpfe die der Elektronen ausgleicht', 'Elektronen die Oberfläche verlassen haben', 'sich die Atomkerne gegenseitig neutralisieren'], ok: 0 }, '.</div>'],
    mod: 'm1', why: 'Die Valenzelektronen gehören dem ganzen Gitter. Die positiven Rümpfe und das negative Elektronengas gleichen sich in der Ladung aus.'
  });
  mc($('m1b'), {
    q: '<b>Aufgabe 2.</b> Aluminium hat drei Valenzelektronen. Wie viele Mol Elektronen bilden das Elektronengas in 2 mol Aluminium?',
    opts: ['2 mol Elektronen', '3 mol Elektronen', '6 mol Elektronen', '26 mol Elektronen'], ok: 2, fix: true, mod: 'm1',
    why: 'Jedes Al-Atom gibt 3 Elektronen ab: 2 mol · 3 = 6 mol Elektronen. Es bleiben 2 mol Al³⁺-Rümpfe.',
    hints: { 0: 'Das wäre nur ein Elektron je Atom.', 1: 'Das gilt für 1 mol Aluminium, gefragt sind 2 mol.', 3: 'Nur die Valenzelektronen gehen ins Elektronengas, nicht alle 13.' }
  });
  mc($('m1c'), {
    q: '<b>Aufgabe 3.</b> Die positiven Atomrümpfe stoßen sich gegenseitig ab. Warum hält das Gitter trotzdem zusammen?',
    opts: ['Das Elektronengas zieht alle positiv geladenen Atomrümpfe gleichzeitig an', 'Zwischen den Rümpfen bestehen Elektronenpaarbindungen, die sie festhalten', 'Die Kernkräfte zwischen benachbarten Atomkernen halten das Gitter zusammen', 'Die Rümpfe tragen verschiedene Ladungen und ziehen sich daher gegenseitig an'], ok: 0, mod: 'm1',
    why: 'Die negativ geladenen, frei beweglichen Elektronen umgeben alle Rümpfe und halten sie durch elektrostatische Anziehung zusammen.',
    hints: { 1: 'Im Metall gibt es keine festen Elektronenpaare zwischen bestimmten Atomen.', 2: 'Die Kernkräfte wirken nur über winzige Entfernungen im Atomkern.', 3: 'Alle Rümpfe eines Metalls tragen dieselbe Ladung.' }
  });
})();
