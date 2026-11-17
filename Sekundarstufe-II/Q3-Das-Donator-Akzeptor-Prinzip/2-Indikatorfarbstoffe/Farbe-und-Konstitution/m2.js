/* Modul 2: Auxochrome und Antiauxochrome an der Polyenal-Kette X–(CH=CH)6–CHO */
(function () {
  'use strict';
  var REF = 395;
  var G = [
    { id: 'H', lab: '–H', eff: 'Bezug', d: 0, kind: 'ref', ex: 'Das ist die Bezugsverbindung ohne Gruppe am Kettenende.' },
    { id: 'NMe2', lab: '–N(CH₃)₂', eff: '+M, +I', d: 67, kind: 'aux', m: true, ex: 'Das freie Elektronenpaar am Stickstoff wird in das π-System geschoben (+M). Die beiden Methylgruppen erhöhen die Elektronendichte am N zusätzlich (+I).' },
    { id: 'NH2', lab: '–NH₂', eff: '+M (−I)', d: 45, kind: 'aux', m: true, ex: 'Das freie Elektronenpaar am Stickstoff wird in das π-System geschoben (+M). Der −I-Effekt des elektronegativen N spielt dagegen kaum eine Rolle.' },
    { id: 'OMe', lab: '–OCH₃', eff: '+M (−I)', d: 23, kind: 'aux', m: true, ex: 'Ein freies Elektronenpaar am Sauerstoff kann in das π-System übergehen (+M). Sauerstoff gibt schwächer ab als Stickstoff.' },
    { id: 'OH', lab: '–OH', eff: '+M (−I)', d: 21, kind: 'aux', m: true, ex: 'Ein freies Elektronenpaar am Sauerstoff kann in das π-System übergehen (+M). Sauerstoff gibt schwächer ab als Stickstoff.' },
    { id: 'CH3', lab: '–CH₃', eff: '+I', d: 7, kind: 'aux', m: false, ex: 'Die Methylgruppe schiebt Elektronen nur über die σ-Bindung (+I). Dieser rein induktive Effekt ist klein.' },
    { id: 'CF3', lab: '–CF₃', eff: '−I', d: -4, kind: 'anti', m: false, ex: 'Die Fluoratome ziehen Elektronen über die σ-Bindung (−I). Dieser rein induktive Effekt ist klein.' },
    { id: 'COOH', lab: '–COOH', eff: '−M, −I', d: -11, kind: 'anti', m: true, ex: 'Die C=O-Gruppe zieht π-Elektronen aus der Kette (−M). Sie konkurriert mit der Aldehydgruppe am anderen Ende.' },
    { id: 'CN', lab: '–C≡N', eff: '−M, −I', d: -15, kind: 'anti', m: true, ex: 'Die Dreifachbindung zum elektronegativen N zieht π-Elektronen aus der Kette (−M).' },
    { id: 'NO2', lab: '–NO₂', eff: '−M, −I', d: -29, kind: 'anti', m: true, ex: 'Die Nitrogruppe ist ein starker Elektronenakzeptor (−M, −I). Beide Kettenenden ziehen jetzt an den π-Elektronen, die Elektronen sind stärker festgelegt.' }
  ];
  var sel = G[0], visited = {}, SH = { 'H': 0 };
  Prog.add('m2', 5);
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });

  // ---------------------------------------------------------- Schritt 1: sortieren
  (function () {
    var box = $('m2sort'), html = '', done = 0, total = G.length - 1;
    // gemischte Reihenfolge, damit sie nichts verrät
    ['NO2', 'OH', 'CF3', 'NH2', 'CH3', 'COOH', 'OMe', 'CN', 'NMe2'].map(function (id) { return G.filter(function (x) { return x.id === id; })[0]; }).forEach(function (g) {
      if (g.id === 'H') return;
      html += '<div class="grp" data-id="' + g.id + '"><div><span class="nm">' + g.lab + '</span><div class="ef">Gruppeneffekt: ' + g.eff + '</div></div><div class="bt"><button class="btn sec" data-a="aux">Auxochrom</button><button class="btn sec" data-a="anti">Antiauxochrom</button></div><div class="fb" hidden></div></div>';
    });
    box.innerHTML = '<p class="small" style="margin:0 0 6px">Tippe bei jeder Gruppe an, ob sie ein <b>Auxochrom</b> (Donator) oder ein <b>Antiauxochrom</b> (Akzeptor) ist.</p>' + html;
    box.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-a]') : null; if (!b) return;
      var row = b.closest('.grp'), g = G.filter(function (x) { return x.id === row.getAttribute('data-id'); })[0], fb = row.querySelector('.fb');
      if (row.getAttribute('data-ok')) return; fb.hidden = false;
      if (b.getAttribute('data-a') === g.kind) {
        row.setAttribute('data-ok', '1'); fb.className = 'fb ok';
        note(g.lab + ': ' + (g.kind === 'aux' ? 'Elektronendonator (' + g.eff + '), also ein Auxochrom.' : 'Elektronenakzeptor (' + g.eff + '), also ein Antiauxochrom.')); fb.innerHTML = '✔ Richtig. ' + (g.kind === 'aux' ? 'Elektronendonator (' + g.eff + ').' : 'Elektronenakzeptor (' + g.eff + ').');
        Array.prototype.forEach.call(row.querySelectorAll('button'), function (x) { x.disabled = true; });
        b.classList.remove('sec'); if (++done === total) Prog.done('m2');
      } else {
        fb.className = 'fb bad';
        fb.innerHTML = '✗ Leider nicht. Der Gruppeneffekt ' + g.eff + ' zeigt, ob die Gruppe Elektronen ' + (g.kind === 'aux' ? 'in das System schiebt (Donator = Auxochrom)' : 'aus dem System zieht (Akzeptor = Antiauxochrom)') + '. Lies noch einmal die Tabelle oben.';
      }
    });
  })();

  // ---------------------------------------------------------- Schritt 2: Versuch
  var selBox = $('m2sel');
  G.forEach(function (g) {
    var b = document.createElement('button'); b.textContent = g.lab; b.setAttribute('data-id', g.id);
    if (g.kind === 'aux') b.className = 'aux'; else if (g.kind === 'anti') b.className = 'anti';
    b.title = g.kind === 'aux' ? 'Auxochrom' : g.kind === 'anti' ? 'Antiauxochrom' : 'Bezug';
    selBox.appendChild(b);
  });
  selBox.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
    sel = G.filter(function (x) { return x.id === b.getAttribute('data-id'); })[0]; update();
  });
  $('m2gf').addEventListener('change', update);
  Farbe.beaker($('m2bkR')); Farbe.beaker($('m2bkS'));
  // jeder SVG-Becher hat dieselben IDs; deshalb Flüssigkeit je Becher getrennt setzen
  function setBk(svg, rgb) { var q = svg.querySelector('.bk-liq'); q.setAttribute('fill', rgb ? Farbe.rgbCss(rgb) : '#eaf4fb'); }

  function drawChain(second) {
    // Knoten: 0 = X, 1..13 = C1..C13 (C13 = CHO-Kohlenstoff), 14 = O
    var dx = 22, amp = 12, mar = 52, N = 15, W = (N - 1) * dx + mar + 36, H = 100, i, pts = [];
    for (i = 0; i < N; i++) pts.push([mar + i * dx, 52 + (i % 2 ? -amp : amp)]);
    var s = '', pat = second ? function (b) { return b % 2 === 0 && b <= 12; } : function (b) { return b % 2 === 1; };
    if (second) pat = function (b) { return b % 2 === 0 && b < 14; };
    var cloudA = (sel.m && sel.kind === 'aux' && second) ? 0.22 : 0.14;
    s += '<path d="M' + pts.slice(1).map(function (p) { return p[0] + ' ' + p[1]; }).join(' L') + '" fill="none" stroke="#14b8a6" stroke-opacity="' + cloudA + '" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>';
    for (i = 0; i < N - 1; i++) {
      var a = pts[i], b = pts[i + 1], dbl = pat(i), sw = 2.6;
      if (second && i === 13) dbl = false;
      if (!second && i === 0) dbl = false;
      s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#1e293b" stroke-width="' + sw + '" stroke-linecap="round"/>';
      if (dbl) {
        var vx = b[0] - a[0], vy = b[1] - a[1], L = Math.sqrt(vx * vx + vy * vy), sg = (a[1] > b[1]) ? 1 : -1, nx = -vy / L * 4.6 * sg, ny = vx / L * 4.6 * sg;
        s += '<line x1="' + (a[0] + nx) + '" y1="' + (a[1] + ny) + '" x2="' + (b[0] + nx) + '" y2="' + (b[1] + ny) + '" stroke="#1e293b" stroke-width="' + sw + '" stroke-linecap="round"/>';
      }
    }
    // zweite Grenzformel: Doppelbindung X=C1 (b0) und Einfachbindung C13–O (Ladung am O)
    if (second) {
      var a0 = pts[0], b0 = pts[1], vx0 = b0[0] - a0[0], vy0 = b0[1] - a0[1], L0 = Math.sqrt(vx0 * vx0 + vy0 * vy0), sg0 = (a0[1] > b0[1]) ? 1 : -1;
      s += '<line x1="' + (a0[0] - vy0 / L0 * 4.6 * sg0) + '" y1="' + (a0[1] + vx0 / L0 * 4.6 * sg0) + '" x2="' + (b0[0] - vy0 / L0 * 4.6 * sg0) + '" y2="' + (b0[1] + vx0 / L0 * 4.6 * sg0) + '" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round"/>';
    }
    // Beschriftungen
    var xl = sel.id === 'H' ? 'H' : sel.lab.replace('–', ''), fs = 14;
    s += '<text x="' + (pts[0][0] - 6) + '" y="' + (pts[0][1] + 5) + '" font-size="' + fs + '" text-anchor="end" fill="#1e293b" font-weight="700">' + xl + '</text>';
    s += '<text x="' + (pts[14][0] + 6) + '" y="' + (pts[14][1] + 5) + '" font-size="' + fs + '" fill="#1e293b" font-weight="700">O</text>';
    s += '<text x="' + (pts[13][0] + 3) + '" y="' + (pts[13][1] + 24) + '" font-size="11" fill="#475569" text-anchor="middle">H</text>';
    if (second) {
      s += '<circle cx="' + (pts[0][0] - 6 - xl.length * 4.2 - 7) + '" cy="' + (pts[0][1] - 8) + '" r="7" fill="#fff" stroke="#2563eb" stroke-width="1.6"/><text x="' + (pts[0][0] - 6 - xl.length * 4.2 - 7) + '" y="' + (pts[0][1] - 4.2) + '" font-size="11" text-anchor="middle" fill="#2563eb" font-weight="800">+</text>';
      s += '<circle cx="' + (pts[14][0] + 20) + '" cy="' + (pts[14][1] - 8) + '" r="7" fill="#fff" stroke="#dc2626" stroke-width="1.6"/><text x="' + (pts[14][0] + 20) + '" y="' + (pts[14][1] - 4) + '" font-size="12" text-anchor="middle" fill="#dc2626" font-weight="800">−</text>';
    }
    // Elektronenzug/-schub als Pfeile unter der Kette
    var y = 86, ar = '';
    function arrow(x1, x2, col, txt) { return '<line x1="' + x1 + '" x2="' + x2 + '" y1="' + y + '" y2="' + y + '" stroke="' + col + '" stroke-width="2.4" marker-end="url(#m2a' + col.slice(1) + ')"/><text x="' + ((x1 + x2) / 2) + '" y="' + (y + 12) + '" font-size="10" text-anchor="middle" fill="' + col + '">' + txt + '</text>'; }
    if (sel.kind === 'aux') ar = arrow(mar - 6, mar + 120, '#16a34a', sel.m ? 'schiebt Elektronen (+M)' : 'schiebt Elektronen (+I)');
    else if (sel.kind === 'anti') ar = arrow(mar + 120, mar - 6, '#dc2626', 'zieht Elektronen') + arrow(mar + 190, mar + 300, '#dc2626', 'C=O zieht ebenfalls');
    else ar = '';
    s = '<defs><marker id="m2a16a34a" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#16a34a"/></marker><marker id="m2adc2626" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#dc2626"/></marker></defs>' + s + ar;
    $('m2chain').setAttribute('viewBox', '0 0 ' + W + ' ' + H); $('m2chain').innerHTML = s;
  }

  function update() {
    var lm = REF + sel.d, A = Farbe.band(lm), col = Farbe.colorOf(A), cn = Farbe.colorName(col), colR = Farbe.colorOf(Farbe.band(REF));
    var second = $('m2gf').checked && sel.m && sel.kind === 'aux';
    drawChain(second);
    Array.prototype.forEach.call(selBox.children, function (b) { b.classList.toggle('on', b.getAttribute('data-id') === sel.id); });
    setBk($('m2bkR'), Farbe.colorName(colR) === 'farblos' ? null : colR); setBk($('m2bkS'), cn === 'farblos' ? null : col);
    $('m2bkN').textContent = sel.id === 'H' ? '(gleich)' : 'mit ' + sel.lab;
    $('m2lmax').textContent = lm + ' nm'; $('m2farbe').textContent = cn;
    var d = sel.d; $('m2d').textContent = d === 0 ? '0 nm' : (d > 0 ? '+' : '−') + Math.abs(d) + ' nm';
    $('m2term').innerHTML = d > 0 ? '<span class="tag b">bathochromer Effekt</span><br><span class="small">Verschiebung zu größerer Wellenlänge (Rotverschiebung), Farbvertiefung</span>' : d < 0 ? '<span class="tag h">hypsochromer Effekt</span><br><span class="small">Verschiebung zu kleinerer Wellenlänge (Blauverschiebung), Aufhellung</span>' : '<span class="small">Bezug, keine Verschiebung</span>';
    var ex = sel.ex; if ($('m2gf').checked && !second && sel.id !== 'H') ex += ' Für diese Gruppe ist keine Grenzformel mit Ladungstrennung über die ganze Kette sinnvoll.';
    $('m2expl').innerHTML = '<b>' + sel.lab + ' · ' + sel.eff + ':</b> ' + ex;
    Farbe.plot($('m2plot'), lm, A, { ref: sel.id === 'H' ? null : Farbe.band(REF) });
    if (!visited[sel.id]) { visited[sel.id] = 1; }
    var rows = '';
    G.forEach(function (g) {
      if (!visited[g.id]) return; var lmx = REF + g.d, c = Farbe.colorOf(Farbe.band(lmx)), dd = g.d === 0 ? '0' : (g.d > 0 ? '+' : '−') + Math.abs(g.d);
      rows += '<tr' + (g.id === sel.id ? ' style="background:#fff7e6"' : '') + '><td><b>' + g.lab + '</b></td><td>' + g.eff + '</td><td>' + lmx + ' nm</td><td>' + dd + ' nm</td><td><span class="dot" style="background:' + Farbe.rgbCss(c) + '"></span>' + Farbe.colorName(c) + '</td></tr>';
    });
    $('m2tab').innerHTML = rows;
  }

  // ---------------------------------------------------------- Aufgaben
  var box = $('m2q');
  gap(box, { mod: 'm2', parts: ['<b>1.</b> Auxochrome (Donatoren) verschieben das Absorptionsmaximum zu ', { o: ['kleineren', 'größeren'], ok: 1 }, ' Wellenlängen. Das nennt man ', { o: ['hypsochromen', 'bathochromen'], ok: 1 }, ' Effekt. Antiauxochrome (Akzeptoren) bewirken einen ', { o: ['bathochromen', 'hypsochromen'], ok: 1 }, ' Effekt, die Farbe wird dadurch ', { o: ['tiefer', 'heller'], ok: 1 }, '.'], why: 'Bathochrom heißt „zum Roten hin“, hypsochrom „zum Blauen hin“. Das Protokoll zeigt es: −NH₂ gibt +45 nm, −NO₂ gibt −29 nm.' });
  mc(box, { mod: 'm2', q: '<b>2.</b> Vergleiche in deinem Protokoll –CH₃ mit –OCH₃ und –CF₃ mit –NO₂. Was fällt auf?', opts: ['Mesomere Effekte (±M) verschieben die Absorption deutlich stärker als induktive Effekte (±I).', 'Induktive Effekte verschieben die Absorption stärker, weil sie über alle σ-Bindungen wirken.', 'Mesomere und induktive Effekte verschieben die Absorption beide gleich stark, nur in verschiedene Richtungen.', 'Nur Gruppen mit einem Sauerstoffatom verschieben die Absorption merklich.'], ok: 0,
    why: 'Mesomere Effekte wirken über das ganze π-System, induktive nur über die σ-Bindung und nehmen mit dem Abstand schnell ab.', hints: { 1: 'Schau noch einmal auf die Δλ-Werte: +7 nm für –CH₃ gegen +23 nm für –OCH₃.', 2: 'Die Zahlen in der Tabelle sind sehr verschieden.', 3: '–NH₂ und –NO₂ zeigen beide große Effekte und enthalten kein O (–NH₂) bzw. einen anderen Typ.' } });
  mc(box, { mod: 'm2', q: '<b>3.</b> Welche Aussage erklärt den bathochromen Effekt der –NH₂-Gruppe richtig? (Schau dir dazu die zweite Grenzformel an.)', opts: ['Das freie Elektronenpaar am N wechselwirkt mit dem π-System (+M). In der Grenzformel trägt N eine positive und O eine negative Ladung. Das System ist stärker delokalisiert, ΔE sinkt.', 'Die –NH₂-Gruppe zieht Elektronen aus der Kette (−M). In der Grenzformel trägt N eine negative und O eine positive Ladung. Die Elektronen sind stärker gebunden, ΔE sinkt.', 'Die –NH₂-Gruppe verlängert die Kohlenstoffkette um zwei C-Atome. Dadurch wächst das konjugierte System und die Absorption wandert zu größeren Wellenlängen.', 'Die –NH₂-Gruppe absorbiert selbst im sichtbaren Bereich. Ihre Absorption überlagert sich mit der der Kette, das Maximum wandert zu größeren Wellenlängen.'], ok: 0,
    why: 'Das freie Elektronenpaar wird bis zum Sauerstoff „durchgereicht“. Dadurch umfasst das delokalisierte System auch das N-Atom, und das Elektronensystem ist leichter anregbar.', hints: { 1: 'Das wäre ein Akzeptor (−M). Stickstoff mit freiem Elektronenpaar ist ein Donator.', 2: 'Die Kette bleibt gleich lang, nur das Ende trägt eine Gruppe.', 3: 'Die Gruppe selbst absorbiert nur im UV. Sie verändert die Absorption der Kette.' } });
  mc(box, { mod: 'm2', q: '<b>4.</b> Warum ist –N(CH₃)₂ ein noch stärkerer Auxochrom als –NH₂?', opts: ['Die +I-Effekte der beiden Methylgruppen erhöhen die Elektronendichte am Stickstoff, sein Elektronenpaar wird leichter ins π-System geschoben.', 'Die beiden Methylgruppen verlängern die konjugierte Kette, das π-System wird dadurch größer und ΔE sinkt deutlich stärker.', 'Die Methylgruppen haben einen −M-Effekt, sie ziehen zusätzlich Elektronen aus dem π-System und verstärken den Stickstoff.', 'Stickstoff ist in –N(CH₃)₂ elektronegativer als in –NH₂ und polarisiert das π-System deshalb stärker.'], ok: 0,
    why: '+M und +I wirken hier zusammen. Dieses Motiv kommt später beim Farbstoff im Tintenkiller wieder vor: Dort sitzen drei –N(CH₃)₂-Gruppen.', hints: { 1: 'Methylgruppen sind gesättigt und gehören nicht zum konjugierten System.', 2: 'Alkylgruppen haben keinen −M-Effekt, sondern +I.', 3: 'Der Unterschied liegt nicht in der Elektronegativität des Stickstoffs, sondern in der Elektronendichte am N.' } });
  mc(box, { mod: 'm2', q: '<b>5.</b> Prognose: Du ersetzt in der Kette das Wasserstoffatom –H durch eine –NO₂-Gruppe. Was erwartest du?', opts: ['Hypsochromer Effekt: Das Maximum wandert zu kürzeren Wellenlängen, die Lösung wird heller.', 'Bathochromer Effekt: Das Maximum wandert zu längeren Wellenlängen, die Lösung wird tiefer gefärbt.', 'Keine Änderung, weil Nitrogruppen nicht mit dem π-System wechselwirken.', 'Die Lösung wird farblos, weil die Kette zerstört wird.'], ok: 0,
    why: 'Die Nitrogruppe ist ein Antiauxochrom (−M, −I). Sie konkurriert mit der Aldehydgruppe um die Elektronen. Das Protokoll zeigt −29 nm.', hints: { 1: 'Das wäre bei einem Donator wie –NH₂ der Fall. –NO₂ ist ein Akzeptor.', 2: '–NO₂ hat einen starken −M-Effekt, es wechselwirkt also stark mit dem π-System.', 3: 'Die Kette bleibt erhalten, nur die Absorption verschiebt sich.' } });
  update();
})();
