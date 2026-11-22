/* Modul 2: Teilchenebene. Gleicher Kolben wie in Modul 1, daneben ein Ausschnitt mit 24 Indikatorteilchen, H3O+ und OH-. */
(function () {
  'use strict';
  var fmt = PP.fmt, cv = $('m2cv'), ctx = cv.getContext('2d'), W = 640, H = 330, dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  PP.flask($('m2flask'));
  Prog.add('m2', 3);
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });

  var N = 24, NAMES = { c: 'H₂In', p: 'In²⁻', x: 'In(OH)³⁻' }, FORM = { c: 'lac', p: 'dian', x: 'carb' };
  var mols = [], ions = { h: [], o: [] }, sel = -1, ranks = [], i;
  for (i = 0; i < N; i++) ranks.push(i);
  for (i = N - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = ranks[i]; ranks[i] = ranks[j]; ranks[j] = t; }
  for (i = 0; i < N; i++) mols.push({ x: 40 + Math.random() * (W - 80), y: 40 + Math.random() * (H - 80), vx: (Math.random() - .5) * 22, vy: (Math.random() - .5) * 22, rank: ranks[i], sp: 'c', flash: 0, rot: Math.random() * 6.28, vr: (Math.random() - .5) * 0.8 });
  function ion(kind) { return { x: 12 + Math.random() * (W - 24), y: 12 + Math.random() * (H - 24), vx: (Math.random() - .5) * 60, vy: (Math.random() - .5) * 60, k: kind }; }

  // ------------------------------------------------------------ Zeichnen
  function hex(cx, cy, r, rot, fill, stroke, lw) {
    ctx.beginPath(); for (var k = 0; k < 6; k++) { var a = rot + k * Math.PI / 3; ctx[k ? 'lineTo' : 'moveTo'](cx + r * Math.cos(a), cy + r * Math.sin(a)); } ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.6; ctx.stroke();
  }
  function glyph(x, y, sp, s, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
    var d = 2 * s, ang = [150, 30, 270].map(function (a) { return a * Math.PI / 180; });
    var pink = 'rgba(200,30,170,.82)', grey = '#64748b';
    if (sp === 'p') {   // großes farbiges System aus zwei Ringen und dem zentralen C-Atom
      ctx.strokeStyle = pink; ctx.lineWidth = s * 0.9; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(d * Math.cos(ang[0]), d * Math.sin(ang[0])); ctx.lineTo(0, 0); ctx.lineTo(d * Math.cos(ang[1]), d * Math.sin(ang[1])); ctx.stroke();
    }
    ang.forEach(function (a, k) {
      var fill = sp === 'p' && k < 2 ? 'rgba(217,70,239,.85)' : '#fff', st = sp === 'p' && k < 2 ? '#a21caf' : grey;
      hex(d * Math.cos(a), d * Math.sin(a), s, a + Math.PI / 6, fill, st, 1.5);
    });
    ctx.fillStyle = sp === 'p' ? '#a21caf' : grey; ctx.beginPath(); ctx.arc(0, 0, s * 0.42, 0, 6.3); ctx.fill();
    if (sp === 'x') { ctx.fillStyle = '#b91c1c'; ctx.font = '700 ' + Math.round(s * 1.6) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('OH', 0, s * 2.7); }
    ctx.restore();
  }
  function ionDraw(p) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 6.3); ctx.fillStyle = p.k === 'h' ? '#fb923c' : '#60a5fa'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '800 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.k === 'h' ? '+' : '−', p.x, p.y + 4);
  }

  // ------------------------------------------------------------ Zustand je Bild
  var last = 0, counts = { c: 0, p: 0, x: 0 };
  function assign() {
    var f = PP.frac(), nx = Math.round(f.x * N), np = Math.min(N - nx, Math.round(f.p * N));
    counts = { c: N - nx - np, p: np, x: nx };
    mols.forEach(function (m) { var s = m.rank < nx ? 'x' : m.rank < nx + np ? 'p' : 'c'; if (s !== m.sp) { m.sp = s; m.flash = 1; } });
    var pH = PP.pH(), nH = pH < 7 ? Math.min(26, Math.round(2 + 3.2 * (7 - pH))) : 2, nO = pH > 7 ? Math.min(26, Math.round(2 + 3.2 * (pH - 7))) : 2;
    while (ions.h.length < nH) ions.h.push(ion('h')); while (ions.h.length > nH) ions.h.pop();
    while (ions.o.length < nO) ions.o.push(ion('o')); while (ions.o.length > nO) ions.o.pop();
    [0, 1, 2].forEach(function (k) { var sp = ['c', 'p', 'x'][k]; $('m2n' + k).textContent = counts[sp] + ' von ' + N; });
  }
  function frame(t) {
    requestAnimationFrame(frame);
    if (cv.offsetParent === null) { last = 0; return; }
    var dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    assign();
    ctx.clearRect(0, 0, W, H);
    ions.h.concat(ions.o).forEach(function (p) {
      p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < 8 || p.x > W - 8) p.vx *= -1; if (p.y < 8 || p.y > H - 8) p.vy *= -1;
      p.vx += (Math.random() - .5) * 40 * dt; p.vy += (Math.random() - .5) * 40 * dt; var v = Math.hypot(p.vx, p.vy); if (v > 70) { p.vx *= 70 / v; p.vy *= 70 / v; }
      ionDraw(p);
    });
    mols.forEach(function (m, k) {
      m.x += m.vx * dt; m.y += m.vy * dt; m.rot += m.vr * dt;
      if (m.x < 30 || m.x > W - 30) { m.vx *= -1; m.x = Math.max(30, Math.min(W - 30, m.x)); } if (m.y < 32 || m.y > H - 32) { m.vy *= -1; m.y = Math.max(32, Math.min(H - 32, m.y)); }
      m.vx += (Math.random() - .5) * 14 * dt; m.vy += (Math.random() - .5) * 14 * dt; var v = Math.hypot(m.vx, m.vy); if (v > 24) { m.vx *= 24 / v; m.vy *= 24 / v; }
      if (m.flash > 0) { m.flash -= dt * 2.2; ctx.beginPath(); ctx.arc(m.x, m.y, 18 + 22 * (1 - m.flash), 0, 6.3); ctx.strokeStyle = 'rgba(234,88,12,' + Math.max(0, m.flash).toFixed(2) + ')'; ctx.lineWidth = 2.4; ctx.stroke(); }
      if (k === sel) { ctx.beginPath(); ctx.arc(m.x, m.y, 25, 0, 6.3); ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 2.4; ctx.setLineDash([5, 4]); ctx.stroke(); ctx.setLineDash([]); }
      glyph(m.x, m.y, m.sp, 7.2, m.rot * 0.25);
    });
  }
  requestAnimationFrame(frame);

  // ------------------------------------------------------------ Antippen
  cv.addEventListener('pointerdown', function (e) {
    var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H, best = -1, bd = 34;
    mols.forEach(function (m, k) { var d = Math.hypot(m.x - x, m.y - y); if (d < bd) { bd = d; best = k; } });
    sel = best; var box = $('m2info'); if (best < 0) { box.hidden = true; return; }
    var sp = mols[best].sp; box.hidden = false;
    Struct.draw($('m2infosvg'), Struct.build(FORM[sp]), {});
    $('m2infotxt').innerHTML = '<b style="font-size:18px">' + NAMES[sp] + '</b><br><span class="small">Strukturformel dieser Teilchenart. Merke sie dir für Modul 3.</span>';
  });
  $('m2leg').innerHTML = ['c', 'p', 'x'].map(function (sp) { return '<span><svg viewBox="-16 -16 32 32"></svg>' + NAMES[sp] + '</span>'; }).join('') + '<span><i style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#fb923c;margin-right:4px"></i>H₃O⁺</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#60a5fa;margin-right:4px"></i>OH⁻</span>';
  // Legenden-Symbole mit demselben Zeichner
  (function () {
    var svgs = $('m2leg').querySelectorAll('svg'), spk = ['c', 'p', 'x'];
    Array.prototype.forEach.call(svgs, function (sv, k) {
      var c2 = document.createElement('canvas'); c2.width = 64; c2.height = 64; var keep = ctx; ctx = c2.getContext('2d'); ctx.scale(2, 2); ctx.translate(0, 0);
      ctx.save(); ctx.translate(16, 16); glyph(0, 0, spk[k], 5, 0); ctx.restore(); var url = c2.toDataURL(); ctx = keep;
      sv.outerHTML = '<img alt="" src="' + url + '" style="width:30px;height:30px;margin-right:3px">';
    });
  })();
  ['c', 'p', 'x'].forEach(function (sp, k) { $('m2n' + k).previousElementSibling.textContent = NAMES[sp]; });

  // ------------------------------------------------------------ Steuerung
  var sl = $('m2slider'), drag = false;
  sl.addEventListener('input', function () { drag = true; PP.setPH(+sl.value); });
  sl.addEventListener('change', function () { drag = false; });
  Array.prototype.forEach.call(document.querySelectorAll('#m2 [data-k]'), function (b) { b.addEventListener('click', function () { PP.add(b.getAttribute('data-k'), +b.getAttribute('data-n')); }); });
  $('m2reset').addEventListener('click', function () { PP.reset(); });
  PP.on(function (f) {
    f = f || PP.frac(); var pH = PP.pH();
    $('m2ph').textContent = fmt(pH, 1); $('m2farbe').textContent = PP.word(f); $('m2phv').textContent = fmt(pH, 1);
    if (!drag) sl.value = Math.max(0, Math.min(14, pH));
  });

  // ------------------------------------------------------------ Aufgaben
  var box = $('m2qs');
  mc(box, {
    mod: 'm2', q: '<b>1.</b> Die Zahl der gefärbten Teilchen steigt, wenn du Natronlauge zugibst. Was ist die Ursache?',
    opts: ['Hydroxid-Ionen nehmen den Indikatormolekülen Protonen ab.', 'Hydronium-Ionen färben die Indikatormoleküle magenta ein.', 'Natrium-Ionen lagern sich an die Indikatormoleküle an.', 'Wassermoleküle zerfallen und setzen den Farbstoff frei.'], ok: 0,
    why: 'OH⁻ ist eine Base: Es nimmt dem Indikator H⁺ ab. Dabei verändert sich die Struktur des Teilchens, und mit ihr die Farbe.',
    hints: { 1: 'Bei Zugabe von Natronlauge werden H₃O⁺-Ionen weniger, nicht mehr.', 2: 'Na⁺-Ionen sind nur Zuschauer: Sie nehmen an der Reaktion des Indikators nicht teil.', 3: 'Die Zahl der Indikatorteilchen bleibt im Modell gleich: Es sind immer 24.' }
  });
  gap(box, {
    mod: 'm2', why: 'Die Anteile folgen dem pH-Wert: Bei pH 6 liegt fast nur die erste Form vor, bei pH 9 sind es etwa die Hälfte, bei pH 11 fast alle.',
    parts: ['<p class="qt"><b>2.</b> Stelle nacheinander pH 6, pH 9 und pH 11 ein und lies die Zähler ab. Wie viele Teilchen der Art In²⁻ gibt es?</p>Bei pH 6 sind es ', { o: ['kaum welche', 'etwa die Hälfte', 'fast alle'], ok: 0 }, ', bei pH 9 ', { o: ['etwa die Hälfte', 'kaum welche', 'fast alle'], ok: 0 }, ' und bei pH 11 ', { o: ['fast alle', 'kaum welche', 'etwa die Hälfte'], ok: 0 }, '.']
  });
  mc(box, {
    mod: 'm2', q: '<b>3.</b> Bei pH 6 und bei pH 14 ist die Lösung farblos. Stelle beide Werte ein und vergleiche die Teilchen. Was gilt?',
    opts: ['Es sind zwei verschiedene Teilchenarten, die beide farblos sind.', 'Es ist in beiden Fällen dieselbe Teilchenart wie am Anfang.', 'Bei pH 14 ist der Indikator vollständig aus der Lösung verschwunden.', 'Bei pH 6 ist der Indikator durch die Säure unbrauchbar geworden.'], ok: 0,
    why: 'Bei pH 6 liegt H₂In vor, bei pH 14 In(OH)³⁻. Beide sind farblos, aber es sind verschiedene Teilchen mit verschiedener Struktur.',
    hints: { 1: 'Schau auf die Zähler: Bei pH 14 steht die Zahl bei einer anderen Teilchenart.', 2: 'Die Zahl der Teilchen bleibt 24, nur ihre Form ändert sich.', 3: 'Mit Natronlauge kommt die Farbe wieder: Der Indikator ist nicht unbrauchbar.' }
  });
})();
