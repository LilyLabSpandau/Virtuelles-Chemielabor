/* Modul 4: Warum wird die Lösung farblos? Struktur, Chromophor, hypsochromer Effekt */
(function () {
  'use strict';
  var NSv = 'http://www.w3.org/2000/svg';
  function line(a, b, w) { return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#1e293b" stroke-width="' + (w || 2.2) + '" stroke-linecap="round"/>'; }
  function bond(P, b) {                       // [a, b, art, cx, cy]: art 1 einfach, 2 Doppelbindung im Ring (zur Mitte versetzt), 3 Doppelbindung nach außen
    var A = P[b[0]], B = P[b[1]], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, s = '';
    if (b[2] === 1) return line(A, B);
    if (b[2] === 3) { var o = 2.4; return line([A[0] + nx * o, A[1] + ny * o], [B[0] + nx * o, B[1] + ny * o]) + line([A[0] - nx * o, A[1] - ny * o], [B[0] - nx * o, B[1] - ny * o]); }
    var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, sg = ((b[3] - mx) * nx + (b[4] - my) * ny) >= 0 ? 1 : -1, off = 5, sh = 0.16 * L;
    return line(A, B) + line([A[0] + ux * sh + nx * off * sg, A[1] + uy * sh + ny * off * sg], [B[0] - ux * sh + nx * off * sg, B[1] - uy * sh + ny * off * sg], 1.8);
  }
  function lab(x, y, t, o) { o = o || {}; var w = (t.length > 1 ? 9 : 7.5) * (o.sz || 15) / 15 * 1.0; return (o.bg === false ? '' : '<circle cx="' + x + '" cy="' + (y - 0.5) + '" r="' + (o.r || 9) + '" fill="#fff"/>') + '<text x="' + x + '" y="' + (y + 5) + '" font-size="' + (o.sz || 15) + '" font-weight="700" text-anchor="' + (o.an || 'middle') + '" fill="' + (o.c || '#1e293b') + '">' + t + '</text>'; }
  function hl(x, y, w, h, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="30" fill="' + c + '" fill-opacity=".13" stroke="' + c + '" stroke-width="2" stroke-dasharray="6 4"/>'; }
  function badge(x, y, n) { return '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#7c3aed"/><text x="' + x + '" y="' + (y + 4.5) + '" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">' + n + '</text>'; }

  // ---------------------------------------------------------------- Methylenblau
  var mbP = { a1: [70, 70], a2: [96, 85], a3: [96, 115], a4: [70, 130], a5: [44, 115], a6: [44, 85], S: [122, 70], N: [122, 130], b1: [174, 70], b2: [148, 85], b3: [148, 115], b4: [174, 130], b5: [200, 115], b6: [200, 85], NL: [22, 72], NR: [222, 72], m1: [6, 56], m2: [6, 88], m3: [240, 56], m4: [240, 88], H: [122, 154] };
  var L = [70, 100], R = [174, 100], M = [122, 100];
  function mbSVG(ox) {
    var b, s = '';
    if (ox) b = [['a1', 'a2', 2, L[0], L[1]], ['a2', 'a3', 1], ['a3', 'N', 3], ['a3', 'a4', 1], ['a4', 'a5', 2, L[0], L[1]], ['a5', 'a6', 1], ['a6', 'NL', 3], ['a6', 'a1', 1], ['a2', 'S', 1], ['S', 'b2', 1], ['b2', 'b1', 2, R[0], R[1]], ['b2', 'b3', 1], ['b3', 'N', 1], ['b3', 'b4', 2, R[0], R[1]], ['b4', 'b5', 1], ['b5', 'b6', 2, R[0], R[1]], ['b6', 'b1', 1], ['b6', 'NR', 1], ['NL', 'm1', 1], ['NL', 'm2', 1], ['NR', 'm3', 1], ['NR', 'm4', 1]];
    else b = [['a1', 'a2', 2, L[0], L[1]], ['a2', 'a3', 1], ['a3', 'N', 1], ['a3', 'a4', 2, L[0], L[1]], ['a4', 'a5', 1], ['a5', 'a6', 2, L[0], L[1]], ['a6', 'NL', 1], ['a6', 'a1', 1], ['a2', 'S', 1], ['S', 'b2', 1], ['b2', 'b1', 2, R[0], R[1]], ['b2', 'b3', 1], ['b3', 'N', 1], ['b3', 'b4', 2, R[0], R[1]], ['b4', 'b5', 1], ['b5', 'b6', 2, R[0], R[1]], ['b6', 'b1', 1], ['b6', 'NR', 1], ['NL', 'm1', 1], ['NL', 'm2', 1], ['NR', 'm3', 1], ['NR', 'm4', 1], ['N', 'H', 1]];
    if (ox) s += hl(6, 48, 236, 100, '#2563eb'); else s += hl(6, 48, 104, 100, '#0d9488') + hl(134, 48, 108, 100, '#0d9488');
    b.forEach(function (x) { s += bond(mbP, x); });
    s += lab(122, 70, 'S') + lab(122, 130, 'N') + lab(22, 72, ox ? 'N⁺' : 'N', { c: ox ? '#1d4ed8' : '#1e293b' }) + lab(222, 72, 'N');
    s += '<text x="2" y="56" font-size="12" text-anchor="end" fill="#334155">CH₃</text><text x="2" y="96" font-size="12" text-anchor="end" fill="#334155">CH₃</text><text x="244" y="56" font-size="12" fill="#334155">CH₃</text><text x="244" y="96" font-size="12" fill="#334155">CH₃</text>';
    if (!ox) s += lab(122, 154, 'H', { c: '#0f766e' });
    if (ox) s += badge(22, 106, 1) + badge(122, 160, 2) + badge(122, 38, 3);
    return s;
  }
  // ---------------------------------------------------------------- Indigocarmin
  var icP = { C4: [60, 92], C3a: [84, 106], C7a: [84, 134], C7: [60, 148], C6: [36, 134], C5: [36, 106], C3: [112, 98], C2: [130, 120], N1: [112, 142], O: [112, 72], H: [112, 168], S1: [14, 94],
    C4s: [240, 148], C3as: [216, 134], C7as: [216, 106], C7s: [240, 92], C6s: [264, 106], C5s: [264, 134], C3s: [188, 142], C2s: [170, 120], N1s: [188, 98], Os: [188, 168], Hs: [188, 72], S2: [286, 146] };
  var CL = [60, 120], CR = [240, 120], F1 = [110, 120], F2 = [190, 120];
  function icSVG(ox) {
    var b;
    b = [['C3a', 'C4', 2, CL[0], CL[1]], ['C4', 'C5', 1], ['C5', 'C6', 2, CL[0], CL[1]], ['C6', 'C7', 1], ['C7', 'C7a', 2, CL[0], CL[1]], ['C7a', 'C3a', 1], ['C3a', 'C3', 1], ['C2', 'N1', 1], ['N1', 'C7a', 1],
      ['C7as', 'C7s', 2, CR[0], CR[1]], ['C7s', 'C6s', 1], ['C6s', 'C5s', 2, CR[0], CR[1]], ['C5s', 'C4s', 1], ['C4s', 'C3as', 2, CR[0], CR[1]], ['C3as', 'C7as', 1], ['C3as', 'C3s', 1], ['C2s', 'N1s', 1], ['N1s', 'C7as', 1],
      ['C5', 'S1', 1], ['C5s', 'S2', 1], ['N1', 'H', 1], ['N1s', 'Hs', 1]];
    if (ox) b.push(['C3', 'C2', 1], ['C3s', 'C2s', 1], ['C3', 'O', 3], ['C3s', 'Os', 3], ['C2', 'C2s', 3]);
    else b.push(['C3', 'C2', 2, F1[0], F1[1]], ['C3s', 'C2s', 2, F2[0], F2[1]], ['C3', 'O', 1], ['C3s', 'Os', 1], ['C2', 'C2s', 1]);
    var s = '';
    if (ox) s += hl(14, 56, 276, 124, '#2563eb'); else s += hl(14, 56, 130, 124, '#b45309') + hl(156, 56, 134, 124, '#b45309');
    b.forEach(function (x) { s += bond(icP, x); });
    s += lab(112, 142, 'N') + lab(188, 98, 'N') + lab(112, 168, 'H', { c: '#0f766e' }) + lab(188, 72, 'H', { c: '#0f766e' });
    s += lab(112, 72, ox ? 'O' : 'O⁻', { c: ox ? '#b91c1c' : '#7c2d12' }) + lab(188, 168, ox ? 'O' : 'O⁻', { c: ox ? '#b91c1c' : '#7c2d12' });
    s += '<text x="8" y="92" font-size="13" text-anchor="end" fill="#334155" font-weight="700">⁻O₃S</text><text x="290" y="151" font-size="13" fill="#334155" font-weight="700">SO₃⁻</text>';
    if (ox) s += badge(135, 160, 1) + badge(135, 76, 2) + badge(152, 46, 3);
    return s;
  }
  // Das zweite Sulfonat sitzt in Wirklichkeit am zweiten Benzolring (unten rechts); die Lage ist hier vereinfacht.

  var FORMS = {
    mb: [
      { k: 'ox', lab: 'MB⁺ (farbig)', lmax: 664, amax: 2.6, wr: 50, wb: 36, st: 0, svg: function () { return mbSVG(true); }, vb: '-36 28 308 150',
        note: 'Ein durchgehendes π-System über alle drei Ringe. Die beiden –N(CH₃)₂-Gruppen schieben Elektronen hinein (①), die elektronenarme Ring-Seite zieht sie an (②). Das ganze System (③) ist der Chromophor.' },
      { k: 'red', lab: 'Leuko-MB (farblos)', lmax: 320, amax: 2.0, wr: 28, wb: 22, st: 1, svg: function () { return mbSVG(false); }, vb: '-36 28 308 150',
        note: 'Der Ring-Stickstoff trägt jetzt ein H-Atom und gehört nicht mehr zum durchgehenden π-System. Es bleiben zwei getrennte kleinere π-Systeme, die beiden Benzolringe mit ihren Aminogruppen.' }
    ],
    ic: [
      { k: 'ox', lab: 'grün (Ausgangsform)', lmax: 610, amax: 2.6, wr: 55, wb: 42, st: 0, svg: function () { return icSVG(true); }, vb: '-60 36 400 160',
        note: 'Die N–H-Gruppen (①) sind Donatoren, die C=O-Gruppen (②) sind Akzeptoren. Zusammen mit der zentralen C=C-Bindung bilden sie ein durchgehendes π-System (③), den Chromophor. Das erzeugt die langwellige Absorption.' },
      { k: 'mid', lab: 'rot (Zwischenstufe)', lmax: 510, amax: 1.9, wr: 45, wb: 36, st: 1, svg: null, vb: null,
        note: 'Zwischenstufe nach Aufnahme von nur einem Elektron. Die Struktur wird hier nicht gezeichnet. Das Absorptionsmaximum liegt zwischen der grünen und der gelben Form.' },
      { k: 'red', lab: 'gelb (Leuko-Form)', lmax: 405, amax: 2.2, wr: 38, wb: 28, st: 2, svg: function () { return icSVG(false); }, vb: '-60 36 400 160',
        note: 'Die C=O-Gruppen sind zu C–O⁻-Gruppen geworden. Der Akzeptor ist weg, das Push-Pull-System ist unterbrochen. Es bleiben zwei kleinere π-Systeme (Indol-Einheiten).' }
    ]
  };
  var cur = { mb: 0, ic: 0 }, prev = { mb: 0, ic: 0 };
  function show(d) {
    var f = FORMS[d][cur[d]], P = FORMS[d][prev[d]], id = 'm4' + '';
    var sv = $('m4s' + d), pl = $('m4p' + d), bk = $('m4b' + d);
    if (f.svg) { sv.setAttribute('viewBox', f.vb); sv.innerHTML = f.svg(); sv.style.display = 'block'; } else { sv.innerHTML = '<text x="150" y="80" font-size="14" fill="#475569" text-anchor="middle">Zwischenstufe (1 e⁻ aufgenommen)</text><text x="150" y="102" font-size="12" fill="#64748b" text-anchor="middle">ungepaartes Elektron, nicht gezeichnet</text>'; sv.setAttribute('viewBox', '0 0 300 160'); }
    $('m4n' + d).textContent = f.note;
    var A = Farbe.band(f.lmax, f.amax, f.wr, f.wb), ref = cur[d] !== prev[d] ? Farbe.band(P.lmax, P.amax, P.wr, P.wb) : null;
    Farbe.plot(pl, f.lmax, A, { amax: 3, ref: ref });
    var D = BB.DYE[d], pop = d === 'mb' ? (f.st === 0 ? [1, 0] : [0, 1]) : [f.st === 0 ? 1 : 0, f.st === 1 ? 1 : 0, f.st === 2 ? 1 : 0], c = BB.color(d, pop);
    if (!bk.firstChild) Farbe.beaker(bk); bk.querySelector('.bk-liq').setAttribute('fill', BB.css(c));
    $('m4a' + d).textContent = Farbe.absorbedName(f.lmax) + ' (≈ ' + f.lmax + ' nm)';
    $('m4c' + d).textContent = D.st[f.st].word;
    var dl = f.lmax - P.lmax, txt;
    if (cur[d] === prev[d]) txt = 'Wähle oben eine andere Form und beobachte, wie sich das Absorptionsmaximum verschiebt.';
    else if (dl < 0) txt = '<b>Hypsochromer Effekt:</b> Das Absorptionsmaximum ist von ' + P.lmax + ' nm nach ≈ ' + f.lmax + ' nm gewandert (Δλ ≈ ' + dl + ' nm), also zu kürzeren Wellenlängen. Der Abstand zwischen HOMO und LUMO ist größer geworden.';
    else txt = '<b>Bathochromer Effekt:</b> Das Absorptionsmaximum ist von ' + P.lmax + ' nm nach ≈ ' + f.lmax + ' nm gewandert (Δλ ≈ +' + dl + ' nm), also zu längeren Wellenlängen. Das π-System ist wieder größer, ΔE kleiner.';
    $('m4d' + d).innerHTML = txt;
    Array.prototype.forEach.call($('m4f' + d).children, function (b, i) { b.classList.toggle('on', i === cur[d]); });
    seen[d][cur[d]] = 1;
  }
  var seen = { mb: {}, ic: {} };
  ['mb', 'ic'].forEach(function (d) {
    var box = $('m4f' + d);
    FORMS[d].forEach(function (f, i) { var b = document.createElement('button'); b.textContent = f.lab; b.addEventListener('click', function () { if (i === cur[d]) return; prev[d] = cur[d]; cur[d] = i; show(d); }); box.appendChild(b); });
    show(d);
  });
  Array.prototype.forEach.call(document.querySelectorAll('.dyepane'), function (p) { });
  function panes() { Array.prototype.forEach.call(document.querySelectorAll('.dyepane'), function (p) { p.classList.toggle('on', p.getAttribute('data-dye') === BB.cur); }); }
  document.addEventListener('dye', panes); panes();
  BB.src.m4 = function () { var d = BB.cur, f = FORMS[d][cur[d]], D = BB.DYE[d]; var pop = d === 'mb' ? (f.st === 0 ? [1, 0] : [0, 1]) : [f.st === 0 ? 1 : 0, f.st === 1 ? 1 : 0, f.st === 2 ? 1 : 0]; return BB.color(d, pop); };

  // ---- Aufgaben
  var T = ['Auxochrom', 'Antiauxochrom', 'Chromophor'];
  Prog.add('m4', 9);
  var qm = $('m4qmb'), qi = $('m4qic');
  gap(qm, { mod: 'm4', parts: ['<b>a)</b> Wähle die Form „MB⁺“. Die beiden –N(CH₃)₂-Gruppen (①) sind ein ', { o: T, ok: 0 }, ', weil sie Elektronen in das π-System schieben. Die elektronenarme Akzeptorseite mit dem Ring-Stickstoff (②) übernimmt die Rolle eines ', { o: T, ok: 1 }, '. Das gesamte durchgehende π-System (③) ist der ', { o: T, ok: 2 }, '.'], why: 'Donatoren heißen Auxochrome, Akzeptoren Antiauxochrome. Gemeinsam mit dem π-System ergeben sie einen Push-Pull-Chromophor.' });
  mc(qm, { mod: 'm4', q: '<b>b)</b> Methylenblau nimmt zwei Elektronen auf, und am Ring-Stickstoff entsteht eine N–H-Gruppe. Was geschieht mit dem π-System?', opts: [
      'Es zerfällt in zwei kleinere, getrennte π-Systeme. Die Konjugation ist unterbrochen.', 'Es wird größer, weil neue Elektronen hinzukommen.', 'Es bleibt unverändert, nur die Ladung ändert sich.', 'Es verschwindet vollständig, die Ringe sind danach gesättigt.'], ok: 0,
    why: 'Der Ring-Stickstoff gehört nach der Aufnahme nicht mehr zum durchgehenden π-System. Die beiden Benzolringe mit den Aminogruppen bleiben als kleinere π-Systeme übrig.', hints: { 1: 'Vergleiche die beiden gestrichelten Bereiche in der Strukturformel.', 2: 'Schau auf die Markierung in der Leuko-Form: Es sind zwei Bereiche, nicht einer.', 3: 'Die Benzolringe bleiben aromatisch, sie gehen nicht verloren.' } });
  mc(qm, { mod: 'm4', q: '<b>c)</b> Wie verändern sich der HOMO-LUMO-Abstand ΔE und das Absorptionsmaximum beim Entfärben?', opts: [
      'ΔE wird größer, das Maximum wandert zu kürzeren Wellenlängen (hypsochromer Effekt).', 'ΔE wird größer, das Maximum wandert zu längeren Wellenlängen (bathochromer Effekt).', 'ΔE wird kleiner, das Maximum wandert zu kürzeren Wellenlängen.', 'ΔE und Maximum ändern sich nicht, nur die Intensität.'], ok: 0,
    why: 'Je kleiner das π-System, desto größer ΔE und desto kürzer die absorbierte Wellenlänge. Das ist der hypsochrome Effekt.', hints: { 1: 'Größeres ΔE heißt: Es braucht energiereicheres, also kurzwelligeres Licht.', 2: 'Das passt nicht zusammen: Ein kleineres ΔE würde zu längeren Wellenlängen führen.', 3: 'Schau im Spektrum auf die Lage des Maximums.' } });
  mc(qm, { mod: 'm4', q: '<b>d)</b> Warum erscheint die Leuko-Form des Methylenblaus <b>farblos</b>, obwohl sie Licht absorbiert?', opts: [
      'Ihr Absorptionsmaximum liegt im UV-Bereich. Im sichtbaren Bereich wird praktisch kein Licht absorbiert.', 'Sie absorbiert alle Wellenlängen gleich stark.', 'Sie absorbiert nur grünes Licht, und das sieht man nicht.', 'Sie absorbiert gar kein Licht.'], ok: 0,
    why: 'Das Auge sieht nur Licht zwischen etwa 400 und 750 nm. Absorbiert ein Stoff nur im UV, erscheint er farblos.', hints: { 1: 'Dann wäre die Lösung schwarz.', 2: 'Dann hätte die Lösung eine Farbe.', 3: 'Doch, im UV-Bereich absorbiert sie. Schau im Spektrum nach links.' } });
  gap(qm, { mod: 'm4', parts: ['<b>e)</b> Beim Entfärben wandert das Absorptionsmaximum zu kürzeren Wellenlängen: ', { o: ['hypsochromer', 'bathochromer'], ok: 0 }, ' Effekt. Beim Schütteln wandert es zu längeren Wellenlängen: ', { o: ['bathochromer', 'hypsochromer'], ok: 0 }, ' Effekt.'], why: 'Hypsochrom bedeutet „Verschiebung zu kürzeren Wellenlängen“, bathochrom „zu längeren“.' });

  gap(qi, { mod: 'm4', parts: ['<b>a)</b> Wähle die Form „grün“. Die N–H-Gruppen (①) sind ', { o: T, ok: 0 }, '. Die C=O-Gruppen (②) sind ', { o: T, ok: 1 }, '. Das gesamte durchgehende π-System (③) ist der ', { o: T, ok: 2 }, '.'], why: 'Die N–H-Gruppen geben Elektronen ab (Donatoren), die C=O-Gruppen ziehen sie an (Akzeptoren). Das erzeugt das Push-Pull-System, das Licht im langwelligen Bereich absorbiert.' });
  mc(qi, { mod: 'm4', q: '<b>b)</b> Der Indigocarmin-Farbstoff nimmt Elektronen auf und wird gelb. Welche Veränderung am Molekül erklärt die Verschiebung der Absorption?', opts: [
      'Die C=O-Gruppen (Antiauxochrome) werden zu C–O⁻-Gruppen. Der Akzeptorcharakter geht verloren, das Push-Pull-System ist unterbrochen.', 'Die N–H-Gruppen (Auxochrome) werden zu Akzeptoren.', 'Die Sulfonatgruppen fallen vom Molekül ab.', 'Das Molekül wird größer, weil sich zwei Moleküle verbinden.'], ok: 0,
    why: 'Ohne die Akzeptor-Gruppen fehlt der „Pull“. Das π-System ist kleiner, ΔE wächst, die Absorption wandert in den kurzwelligen Bereich. Das Maximum liegt jetzt im violetten Bereich, und die Lösung erscheint gelb.', hints: { 1: 'Vergleiche in der Strukturformel, welche Gruppen sich ändern: Es sind die mit dem O.', 2: 'Schau auf die Strukturen: Die Sulfonatgruppen sind unverändert.', 3: 'In der Simulation bleibt jedes Teilchen für sich.' } });
  mc(qi, { mod: 'm4', q: '<b>c)</b> Die Leuko-Form des Indigocarmins erscheint <b>gelb</b>. Welches Licht absorbiert sie vor allem?', opts: [
      'Violettes Licht (etwa 405 nm), das ist die Ergänzungsfarbe zu Gelb.', 'Gelbes Licht, denn das sieht man.', 'Rotes Licht (etwa 700 nm).', 'Kein Licht, gelb ist die Eigenfarbe.'], ok: 0,
    why: 'Wir sehen die Ergänzungsfarbe zum absorbierten Licht. Absorbiert eine Lösung Violett, erscheint sie gelb.', hints: { 1: 'Gelbes Licht, das absorbiert wird, fehlt dem Auge. Dann sähe man die Ergänzungsfarbe.', 2: 'Rotes Licht absorbiert die blaue Methylenblau-Lösung.', 3: 'Farbe entsteht durch Absorption bestimmter Wellenlängen.' } });
  mc(qi, { mod: 'm4', q: '<b>d)</b> Die rote Zwischenstufe absorbiert bei etwa 510 nm. Wo liegt sie im Vergleich zur grünen (610 nm) und zur gelben Form (405 nm)?', opts: [
      'Dazwischen: Je mehr Elektronen aufgenommen sind, desto kürzer die absorbierte Wellenlänge.', 'Bei der kürzesten Wellenlänge von allen.', 'Bei der längsten Wellenlänge von allen.', 'Das lässt sich nicht vergleichen.'], ok: 0, fix: true,
    why: 'Jede Aufnahme eines Elektrons verkleinert das System etwas weiter und verschiebt das Maximum hypsochrom: 610 nm, 510 nm, 405 nm.', hints: { 1: 'Die kürzeste Wellenlänge hat die gelbe Form (405 nm).', 2: 'Die längste Wellenlänge hat die grüne Form (610 nm).', 3: 'Die Zahlen lassen sich auf einer Skala einordnen.' } });
  Prog.onFinish('m4', function () { $('m4merke').hidden = false; });
})();
