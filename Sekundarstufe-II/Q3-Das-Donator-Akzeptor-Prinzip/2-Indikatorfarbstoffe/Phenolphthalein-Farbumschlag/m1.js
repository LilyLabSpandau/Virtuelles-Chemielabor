/* Modul 1: Kolben und Kolbi im Farbwechsel (makroskopisch): zutropfen, beobachten, protokollieren, auswerten */
(function () {
  'use strict';
  var flask = $('m1flask'), fmt = PP.fmt;
  PP.flask(flask);
  Prog.add('m1', 2);
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });

  // ------------------------------------------------------------ Zutropfen
  Array.prototype.forEach.call(document.querySelectorAll('#m1 .bot .btn'), function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-k'), n = +b.getAttribute('data-n');
      PP.add(k, n);
      for (var i = 0; i < Math.min(n, 5); i++) (function (i) { setTimeout(function () { PP.dropAnim(flask, k); }, i * 130); })(i);
    });
  });
  function concLabel() { var s = fmt(PP.conc, PP.conc < 0.1 ? 2 : PP.conc < 1 ? 1 : 0) + ' mol/L'; $('m1cN').textContent = s; $('m1cS').textContent = s; }
  $('m1conc').addEventListener('change', function () { PP.setConc(+this.value); concLabel(); });
  $('m1reset').addEventListener('click', function () { PP.reset(); });
  concLabel();

  // ------------------------------------------------------------ Anzeige
  var MIS = [
    { id: 'a', t: 'Färbe den Kolben und Kolbi mit Natronlauge.', ok: function (f) { return f.p >= 0.5; } },
    { id: 'b', t: 'Entfärbe beide danach wieder mit Salzsäure.', ok: function (f) { return done.a && f.p < 0.1 && PP.S.na > 0; } },
    { id: 'c', t: 'Zielscheibe: Bringe einen frischen Ansatz nur mit Natronlauge-Tropfen auf pH 9,5 (± 0,2). Dafür brauchst du „Neuer Ansatz“.', ok: function () { var p = PP.pH(); return PP.S.na === 0 && PP.S.nb > 0 && p >= 9.3 && p <= 9.7; } },
    { id: 'd', t: 'Forschungsauftrag: Gib deutlich mehr Natronlauge zu, als zum ersten Färben nötig war, und beobachte danach noch etwa eine halbe Minute weiter.', ok: function (f) { return f.x > 0.5; } }
  ], done = {}, ul = $('m1missions');
  MIS.forEach(function (m) { var li = document.createElement('li'); li.id = 'mis' + m.id; li.innerHTML = '<span class="ck"></span><span>' + m.t + '</span>'; ul.appendChild(li); });
  PP.on(function (f) {
    f = f || PP.frac(); var pH = PP.pH();
    $('m1ph').textContent = fmt(pH, 1); $('m1farbe').textContent = PP.word(f);
    var v = PP.S.V - 50; $('m1zug').textContent = v < 0.005 ? '0 mL' : fmt(v, v < 1 ? 2 : 1) + ' mL';
    var n = 0;
    MIS.forEach(function (m) {
      if (!done[m.id] && m.ok(f)) { done[m.id] = 1; $('mis' + m.id).classList.add('ok'); }
      if (done[m.id]) n++;
    });
    $('m1stars').textContent = '★ ' + n + ' von ' + MIS.length + (n === MIS.length ? ' – alles geschafft!' : '');
  });

  // ------------------------------------------------------------ Protokoll
  var rows = 0, built = false, tb = $('m1log').querySelector('tbody');
  $('m1note').addEventListener('click', function () {
    var f = PP.frac(); if (rows >= 30) return; rows++;
    var tr = document.createElement('tr'), c = PP.rgb(f);
    tr.innerHTML = '<td>' + rows + '</td><td>' + fmt(PP.pH(), 1) + '</td><td><span class="swatch" style="background:rgb(' + c.join(',') + ')"></span>' + PP.word(f) + '</td>';
    tb.appendChild(tr); tr.scrollIntoView && tr.scrollIntoView({ block: 'nearest' });
    if (rows >= 4 && !built) build();
  });
  $('m1logclear').addEventListener('click', function () { tb.innerHTML = ''; rows = 0; });

  // ------------------------------------------------------------ Auswertung
  function build() {
    built = true; $('m1gate').hidden = true; var box = $('m1qs'); box.hidden = false;
    gap(box, {
      mod: 'm1', why: 'Die Farbe ändert sich zwischen etwa pH 8 und 10. In stark alkalischer Lösung ab etwa pH 13 verblasst sie wieder.',
      parts: ['<p class="qt">Werte deine Messungen aus und ergänze: </p>Unterhalb von etwa pH ', { o: ['8', '10', '12'], ok: 0 }, ' ist die Lösung farblos. Zwischen etwa pH 8 und pH ', { o: ['10', '12', '14'], ok: 0 },
        ' nimmt die Farbe stufenlos zu. In stark alkalischer Lösung ab etwa pH ', { o: ['13', '11', '9'], ok: 0 }, ' wird die Lösung wieder farblos.']
    });
    mc(box, {
      mod: 'm1', q: '<b>Was folgt aus der Entfärbung bei sehr viel Natronlauge?</b>',
      opts: ['Der Indikator liegt in mindestens drei verschiedenen Formen vor.', 'Natronlauge zerstört den Indikator in stark alkalischer Lösung für immer.', 'Der Indikator wird durch die zugesetzte Lösung so stark verdünnt.', 'In stark alkalischer Lösung fällt der Indikator als Feststoff aus.'], ok: 0,
      why: 'Es gibt eine farblose Form im Sauren, eine magentafarbene im schwach Alkalischen und eine weitere farblose in stark alkalischer Lösung. Mit Säure kommt die Farbe zurück.',
      hints: { 1: 'Teste, ob du die Farbe mit Salzsäure zurückholen kannst.', 2: 'Rechne nach: Du gibst nur wenige Milliliter zu 50 mL.', 3: 'Ein Feststoff wäre als Trübung oder Bodensatz im Kolben zu sehen.' }
    });
  }
})();
