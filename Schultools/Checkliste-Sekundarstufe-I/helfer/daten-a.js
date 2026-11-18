/* Erklärfolien Sek I, Themenfelder 3.1–3.4 (Kolbi: Chemie, Hugo: Atome und Energie) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;

  /* ---------- gemeinsame Bausteine ---------- */
  var COL = { H: '#f1f5f9', O: '#fca5a5', C: '#94a3b8', N: '#93c5fd', Cl: '#86efac', Na: '#c4b5fd', Mg: '#fde68a' };
  function ball(x, y, sym, r) { return G.c(x, y, r || 14, { f: COL[sym] || '#e2e8f0', s: I }) + T(x, y + 5, sym, { b: 1, s: (r || 14) > 12 ? 13 : 11 }); }
  function box(x, y, w, h, s, f, c) { return G.bub(x, y, w, h, s, { f: f || '#eff6ff', s: c || B, b: 1, fs: 13 }); }
  function lewis(x, y, sym, n, o) {   // Lewis-Schreibweise: n Punkte um das Symbol, erst einzeln, dann paarweise
    var P = [[0, -15, 5, 0], [16, 0, 0, 5], [0, 15, 5, 0], [-16, 0, 0, 5]], s = T(x, y + 6, sym, { b: 1, s: 18 }), k, side, sec;
    for (k = 0; k < n && k < 8; k++) {
      side = k % 4; sec = k >= 4 ? 1 : 0;
      var dx = P[side][0], dy = P[side][1], ox = P[side][2], oy = P[side][3];
      s += G.c(x + dx + (sec ? ox : -ox), y + dy + (sec ? oy : -oy), 2.3, { f: (o && o.c) || R, s: 'none' });
      if (!sec) continue;
    }
    return s;
  }
  function pseGrid(x0, y0, cw, ch, hl) {   // schematisches PSE: 18 Spalten, 7 Perioden
    var s = '', p, g, skip, col, fill;
    for (p = 1; p <= 7; p++) for (g = 1; g <= 18; g++) {
      skip = (p === 1 && g > 1 && g < 18) || ((p === 2 || p === 3) && g > 2 && g < 13);
      if (skip) continue;
      fill = g === 1 ? '#fecaca' : g === 2 ? '#fed7aa' : g <= 12 ? '#e2e8f0' : g <= 16 ? '#fef9c3' : g === 17 ? '#bbf7d0' : '#bfdbfe';
      if (p === 1 && g === 1) fill = '#fef9c3';
      if (hl === 'per' && p === 3) fill = '#fde047';
      if (hl === 'hg' && g === 17) fill = '#fde047';
      if (hl === 'ng' && g >= 3 && g <= 12) fill = '#fde047';
      s += G.r(x0 + (g - 1) * cw, y0 + (p - 1) * ch, cw - 1, ch - 1, { f: fill, s: '#64748b', w: .8, rx: 1.5 });
    }
    return s;
  }
  function atomShells(cx, cy, shells, sym, o) {   // Schalenmodell
    var s = '', k, e, r, a;
    for (k = 0; k < shells.length; k++) { r = 22 + k * 16; s += G.c(cx, cy, r, { f: 'none', s: '#94a3b8', w: 1.4 }); }
    s += G.c(cx, cy, 11, { f: '#fecaca', s: I }) + T(cx, cy + 4, sym || '', { s: 10, b: 1 });
    for (k = 0; k < shells.length; k++) {
      r = 22 + k * 16;
      for (e = 0; e < shells[k]; e++) {
        a = (e / shells[k]) * 6.2832 + k * .5;
        var last = (k === shells.length - 1) && o && o.val;
        s += G.c(cx + r * Math.cos(a), cy + r * Math.sin(a), 3.4, { f: last ? '#fde047' : '#93c5fd', s: I, w: 1 });
      }
    }
    return s;
  }

  /* ================= 3.1 Faszination Chemie ================= */
  A('a1', 'gk', 'Reaktionsenergie', 'h', ['s12'], [
    { h: 'Jede Reaktion setzt Energie um', t: 'Bei jeder chemischen Reaktion wird <b>Energie umgesetzt</b>: Entweder wird sie an die Umgebung <b>abgegeben</b> (Wärme, Licht, Schall) oder aus der Umgebung <b>aufgenommen</b>. Diese Energie nennt man <b>Reaktionsenergie</b>. Man misst sie meist als Wärme.',
      f: G.svg(W, 150, box(10, 50, 90, 44, 'Edukte', '#dbeafe', B) + G.ar(106, 72, 250, 72, { c: O, w: 3 }) + T(178, 56, 'Reaktion', { s: 12, b: 1 }) + box(256, 50, 94, 44, 'Produkte', '#fee2e2', R) + T(178, 112, 'Energie wird abgegeben oder aufgenommen', { s: 12, c: '#475569' }) + T(178, 132, 'Reaktionsenergie', { s: 14, b: 1, c: O })) },
    { h: 'Beispiele aus dem Alltag', t: 'Die Kerze gibt <b>Wärme und Licht</b> ab. Beim Verbrennen von Erdgas wird Wärme zum Heizen frei. Beim Erhitzen von Kupfercarbonat muss dagegen <b>ständig Energie zugeführt</b> werden, sonst bleibt die Reaktion stehen.',
      f: G.svg(W, 150, T(90, 36, 'gibt Energie ab', { b: 1, c: R }) + T(270, 36, 'nimmt Energie auf', { b: 1, c: B }) + T(90, 70, '🕯️', { s: 34 }) + T(270, 70, '🔥', { s: 34 }) + T(90, 104, 'Kerze, Erdgasflamme', { s: 12 }) + T(270, 104, 'Zersetzung beim Erhitzen', { s: 12 }) + G.ar(90, 124, 90, 144, { c: R }) + G.ar(270, 144, 270, 124, { c: B })) }
  ], 'Reaktionsenergie: Energie, die bei einer chemischen Reaktion abgegeben oder aufgenommen wird.');

  A('a1', 'gk', 'exotherm', 'h', ['s12'], [
    { h: 'Energie wird frei', t: 'Eine <b>exotherme</b> Reaktion gibt Energie an die Umgebung ab, meist als Wärme. Die Produkte haben <b>weniger Energie</b> als die Edukte. Die Umgebung wird <b>wärmer</b>. Alle Verbrennungen sind exotherm.',
      f: G.energy({ exo: 1, ea: 1, dh: 1 }) },
    { h: 'So erkennst du es', t: 'Das Thermometer steigt, das Gefäß wird warm oder es leuchtet. Beispiele: <b>Verbrennung</b> von Magnesium, Kohle oder Erdgas, Neutralisation, Zement, der Handwärmer.',
      f: G.svg(W, 130, T(180, 28, 'exotherm', { b: 1, s: 16, c: R }) + G.r(120, 40, 120, 60, { f: '#fee2e2', s: R }) + T(180, 76, 'Reaktion', { b: 1 }) + G.ar(250, 70, 320, 70, { c: R, w: 3 }) + T(300, 58, 'Wärme', { c: R, b: 1, s: 12 }) + T(180, 120, 'Temperatur der Umgebung steigt', { s: 12, c: '#475569' })) }
  ], 'exotherm: Reaktion gibt Energie ab, die Umgebung wird wärmer.');

  A('a1', 'gk', 'endotherm', 'h', ['s12'], [
    { h: 'Energie wird gebraucht', t: 'Eine <b>endotherme</b> Reaktion nimmt Energie aus der Umgebung auf. Die Produkte haben <b>mehr Energie</b> als die Edukte. Die Umgebung wird <b>kälter</b>, oder man muss ständig Energie zuführen, z. B. durch Erhitzen.',
      f: G.energy({ exo: 0, ea: 1, dh: 1 }) },
    { h: 'So erkennst du es', t: 'Das Thermometer sinkt oder die Reaktion stoppt, sobald du nicht mehr heizt. Beispiele: <b>Zersetzung</b> von Kupfercarbonat durch Erhitzen, die <b>Elektrolyse</b> von Wasser (elektrische Energie wird zugeführt), die Photosynthese (Lichtenergie).',
      f: G.svg(W, 130, T(180, 28, 'endotherm', { b: 1, s: 16, c: B }) + G.r(120, 40, 120, 60, { f: '#dbeafe', s: B }) + T(180, 76, 'Reaktion', { b: 1 }) + G.ar(40, 70, 112, 70, { c: B, w: 3 }) + T(60, 58, 'Energie', { c: B, b: 1, s: 12 }) + T(180, 120, 'Energie muss zugeführt werden', { s: 12, c: '#475569' })) }
  ], 'endotherm: Reaktion nimmt Energie auf, die Umgebung wird kälter oder du musst Energie zuführen.');

  A('a1', 'gk', 'Aktivierungsenergie', 'h', ['s12'], [
    { h: 'Der Anstoß', t: 'Ein Streichholz im Schrank brennt nicht von allein. Erst durch <b>Reiben</b> bekommt es einen Anstoß. Diese Mindestenergie, die man zuführen muss, damit eine Reaktion in Gang kommt, heißt <b>Aktivierungsenergie</b> (E<sub>A</sub>).',
      f: G.energy({ exo: 1, ea: 1, dh: 0 }) },
    { h: 'Wie bei einem Hügel', t: 'Stell dir einen Ball vor, der über einen <b>Hügel</b> muss. Erst ein Schubs bringt ihn hinüber, dann rollt er von allein weiter. Bei einer <b>exothermen</b> Reaktion liefert die frei werdende Energie den nächsten Anstoß, deshalb brennt eine Kerze weiter, wenn du sie einmal angezündet hast.',
      f: G.svg(W, 150, G.p('M20 110 C80 110 100 40 160 40 C220 40 240 110 330 110', { s: O, w: 3 }) + G.c(60, 100, 10, { f: '#fde047', s: I }) + G.ar(40, 130, 120, 130, { c: R, w: 2.4 }) + T(150, 146, 'Schubs = Aktivierungsenergie', { s: 11, c: R, b: 1 }) + T(160, 30, 'Hügel', { s: 12, c: '#475569' })) }
  ], 'Aktivierungsenergie: Mindestenergie, die zugeführt werden muss, damit eine Reaktion startet.');

  A('a1', 'gk', 'Oxidation', 'k', ['s14'], [
    { h: 'Reaktion mit Sauerstoff', t: 'Eine <b>Oxidation</b> ist eine Reaktion eines Stoffes <b>mit Sauerstoff</b>. Dabei entsteht ein <b>Oxid</b>. Brennt Magnesium, reagiert es mit dem Sauerstoff der Luft: <b>Magnesium + Sauerstoff → Magnesiumoxid</b>. Das ist zugleich die <b>Wortgleichung</b> der Reaktion.',
      f: G.svg(W, 150, box(6, 40, 86, 40, 'Magnesium', '#fef9c3', YEL()) + T(100, 66, '+', { s: 20, b: 1 }) + box(112, 40, 78, 40, 'Sauerstoff', '#fee2e2', R) + G.ar(194, 60, 222, 60, { c: I, w: 2.6 }) + box(226, 40, 126, 40, 'Magnesiumoxid', '#dbeafe', B) + T(180, 112, '2 Mg + O₂ → 2 MgO', { s: 17, b: 1 }) + T(180, 136, 'grelles weißes Licht, Wärme wird frei', { s: 11, c: '#475569' })) },
    { h: 'Auch Nichtmetalle oxidieren', t: 'Kohlenstoff verbrennt zu <b>Kohlenstoffdioxid</b>, Schwefel zu <b>Schwefeldioxid</b>. Eine Verbrennung ist eine schnelle Oxidation mit Flamme. Das <b>Rosten</b> von Eisen ist eine langsame Oxidation, ganz ohne Flamme.',
      f: G.svg(W, 120, T(90, 30, 'Kohlenstoff + Sauerstoff', { s: 12 }) + G.ar(90, 38, 90, 60, { c: I }) + T(90, 80, 'Kohlenstoffdioxid', { b: 1, s: 13, c: B }) + T(270, 30, 'Eisen + Sauerstoff + Wasser', { s: 12 }) + G.ar(270, 38, 270, 60, { c: I }) + T(270, 80, 'Rost (langsam)', { b: 1, s: 13, c: O }) + T(180, 108, 'Oxidation = Reaktion mit Sauerstoff', { s: 12, c: '#475569' })) }
  ], 'Oxidation: Reaktion eines Stoffes mit Sauerstoff. Es entsteht ein Oxid.');
  function YEL() { return '#ca8a04'; }

  A('a1', 'gk', 'Oxid, Verbindung', 'k', ['s15'], [
    { h: 'Element oder Verbindung?', t: 'Ein <b>Element</b> besteht nur aus einer Atomart (Mg, O₂, C). Eine <b>Verbindung</b> besteht aus <b>mehreren Elementen</b>, die fest verbunden sind (MgO, CO₂, H₂O). Sie lässt sich durch chemische Reaktionen wieder zerlegen und hat ganz andere Eigenschaften als ihre Elemente.',
      f: G.svg(W, 150, box(6, 20, 84, 34, 'Magnesium', '#fef9c3', YEL()) + box(6, 62, 84, 34, 'Sauerstoff', '#fef9c3', YEL()) + G.ar(98, 40, 140, 62, { c: I }) + G.ar(98, 78, 140, 62, { c: I }) + box(144, 44, 126, 36, 'Magnesiumoxid', '#dbeafe', B) + T(312, 54, 'Verbindung', { s: 12, b: 1, c: B }) + T(312, 70, 'aus 2 Elementen', { s: 11, c: '#475569' }) + T(180, 128, 'Verbindung ≠ Gemisch: Die Eigenschaften ändern sich völlig', { s: 11, c: '#475569' })) },
    { h: 'Oxide benennen', t: '<b>Metalloxid</b>: Metall + Sauerstoff, z. B. Magnesiumoxid MgO, Eisen(III)-oxid Fe₂O₃. <b>Nichtmetalloxid</b>: Nichtmetall + Sauerstoff, z. B. Kohlenstoffdioxid CO₂, Schwefeldioxid SO₂. Die Vorsilben (Di-, Tri-) oder die römische Zahl in Klammern zeigen, wie viele Atome verbunden sind.',
      f: G.svg(W, 130, T(95, 28, 'Metalloxide', { b: 1, c: B }) + T(95, 52, 'MgO  Magnesiumoxid', { s: 12 }) + T(95, 72, 'Fe₂O₃  Eisen(III)-oxid', { s: 12 }) + T(95, 92, 'CuO  Kupfer(II)-oxid', { s: 12 }) + T(270, 28, 'Nichtmetalloxide', { b: 1, c: R }) + T(270, 52, 'CO₂  Kohlenstoffdioxid', { s: 12 }) + T(270, 72, 'SO₂  Schwefeldioxid', { s: 12 }) + T(270, 92, 'CO  Kohlenstoffmonoxid', { s: 12 })) }
  ], 'Verbindung: Stoff aus mehreren Elementen. Oxid: Verbindung eines Elements mit Sauerstoff.');

  A('a1', 'gk', 'Edukt, Produkt', 'k', ['s15', 's11', 's13'], [
    { h: 'Vorher und nachher', t: '<b>Edukte</b> sind die Stoffe, die du <b>vor</b> der Reaktion hast, <b>Produkte</b> die Stoffe, die <b>danach</b> entstehen. Der Pfeil → liest sich „reagiert zu“. Links stehen die Edukte, rechts die Produkte.',
      f: G.svg(W, 140, box(8, 40, 120, 46, 'Edukte', '#dbeafe', B) + G.ar(134, 63, 226, 63, { c: I, w: 3 }) + T(180, 50, 'reagieren zu', { s: 11 }) + box(232, 40, 120, 46, 'Produkte', '#fee2e2', R) + T(180, 120, 'Magnesium + Sauerstoff → Magnesiumoxid', { s: 12, c: '#475569' })) },
    { h: 'Die Masse bleibt gleich', t: 'Bei einer Reaktion werden Atome nur <b>umgruppiert</b>, keine verschwinden. Darum ist die Gesamtmasse der Edukte gleich der Gesamtmasse der Produkte: das <b>Gesetz von der Erhaltung der Masse</b>. Wenn die Waage anders anzeigt, ist meist ein Gas entwichen oder dazugekommen.',
      f: G.svg(W, 150, G.p('M60 60 H300', { s: I, w: 3 }) + G.p('M180 60 L166 112 H194 Z', { f: '#cbd5e1', s: I, w: 2 }) + G.l(70, 60, 70, 82, { w: 1.6 }) + G.l(290, 60, 290, 82, { w: 1.6 }) + G.p('M40 82 H100 Q70 106 40 82 Z', { f: '#e2e8f0', s: I, w: 2 }) + G.p('M260 82 H320 Q290 106 260 82 Z', { f: '#e2e8f0', s: I, w: 2 }) + T(70, 44, 'Edukte', { b: 1, c: B }) + T(290, 44, 'Produkte', { b: 1, c: R }) + T(70, 132, '10,0 g', { b: 1 }) + T(290, 132, '10,0 g', { b: 1 }) + T(180, 92, '=', { s: 34, b: 1, c: N, a: 'middle' }) + T(180, 144, 'Waage im Gleichgewicht', { s: 11, c: '#475569' })) }
  ], 'Edukte reagieren zu Produkten. Die Gesamtmasse bleibt dabei gleich.');

  /* ================= 3.2 PSE ================= */
  A('a2', 'gk', 'PSE', 'h', ['s21', 's24'], [
    { h: 'Die Landkarte der Elemente', t: 'Das <b>Periodensystem der Elemente</b> ordnet alle Elemente nach ihrer <b>Protonenzahl</b> (Ordnungszahl). In den <b>Zeilen</b> (Perioden) wächst sie von links nach rechts, in den <b>Spalten</b> stehen Elemente mit ähnlichen Eigenschaften untereinander.',
      f: G.svg(W, 162, pseGrid(30, 10, 17.5, 17.5) + T(180, 150, 'Spalten = Gruppen · Zeilen = Perioden', { s: 12, c: '#475569' })) },
    { h: 'So liest du ein Kästchen', t: 'Im Kästchen stehen das <b>Symbol</b> (z. B. Na), die <b>Ordnungszahl</b> (11 = Protonenzahl) und die <b>Atommasse</b> (23). Mit diesen drei Angaben bestimmst du Protonen, Elektronen und Neutronen.',
      f: G.svg(W, 150, G.r(120, 16, 120, 100, { f: '#fef9c3', s: I, w: 2.4 }) + T(138, 44, '11', { b: 1, s: 18, c: R, a: 'start' }) + T(180, 86, 'Na', { b: 1, s: 38 }) + T(180, 108, 'Natrium', { s: 12 }) + T(232, 44, '23', { b: 1, s: 14, c: B, a: 'end' }) + G.ar(112, 40, 88, 40, { c: R }) + T(84, 36, 'Ordnungs-', { s: 11, a: 'end', c: R }) + T(84, 50, 'zahl = p⁺', { s: 11, a: 'end', c: R }) + G.ar(248, 40, 272, 40, { c: B }) + T(276, 36, 'Atom-', { s: 11, a: 'start', c: B }) + T(276, 50, 'masse', { s: 11, a: 'start', c: B }) + T(180, 140, 'Symbol und Name des Elements', { s: 11, c: '#475569' })) }
  ], 'PSE: Elemente nach Protonenzahl geordnet, Spalten zeigen ähnliche Eigenschaften.');

  A('a2', 'gk', 'Element', 'h', ['s21'], [
    { h: 'Nur eine Atomart', t: 'Ein <b>Element</b> ist ein Stoff, der nur aus <b>einer Atomart</b> besteht. Alle Atome eines Elements haben dieselbe <b>Protonenzahl</b>. Jedes Element hat einen Namen und ein <b>chemisches Symbol</b>: ein Großbuchstabe, manchmal mit einem kleinen dahinter.',
      f: G.svg(W, 140, [['H', 'Wasserstoff'], ['C', 'Kohlenstoff'], ['O', 'Sauerstoff'], ['Fe', 'Eisen'], ['Cu', 'Kupfer']].map(function (e, i) { return G.r(8 + i * 70, 24, 64, 64, { f: '#fef9c3', s: I }) + T(40 + i * 70, 64, e[0], { b: 1, s: 24 }) + T(40 + i * 70, 106, e[1], { s: 10.5 }); }).join('')) },
    { h: 'Symbole kommen oft aus dem Lateinischen', t: 'Eisen heißt lateinisch <i>Ferrum</i> (Fe), Kupfer <i>Cuprum</i> (Cu), Natrium <i>Natrium</i> (Na), Silber <i>Argentum</i> (Ag), Gold <i>Aurum</i> (Au). Etwa 90 Elemente kommen in der Natur vor, alle Stoffe sind aus ihnen aufgebaut.',
      f: G.svg(W, 110, [['Fe', 'Ferrum'], ['Cu', 'Cuprum'], ['Ag', 'Argentum'], ['Au', 'Aurum']].map(function (e, i) { return G.r(14 + i * 86, 20, 76, 64, { f: '#e0f2fe', s: B }) + T(52 + i * 86, 52, e[0], { b: 1, s: 22 }) + T(52 + i * 86, 74, e[1], { s: 11, i: 1 }); }).join('')) }
  ], 'Element: Stoff aus nur einer Atomart, gleiche Protonenzahl, eigenes Symbol.');

  A('a2', 'gk', 'Proton, Neutron, Elektron', 'h', ['s22'], [
    { h: 'Kern und Hülle', t: 'Ein Atom besteht aus einem winzigen, schweren <b>Kern</b> und der <b>Hülle</b>. Im Kern liegen <b>Protonen</b> (positiv) und <b>Neutronen</b> (ungeladen). In der Hülle bewegen sich die <b>Elektronen</b> (negativ). Fast die gesamte Masse steckt im Kern, fast der ganze Platz gehört der Hülle.',
      f: G.svg(W, 170, G.c(110, 85, 70, { f: '#f8fafc', s: '#94a3b8', w: 1.4 }) + G.c(110, 85, 22, { f: '#fecaca', s: I }) + G.c(102, 80, 7, { f: '#fca5a5', s: I, w: 1.2 }) + T(102, 84, '+', { s: 10, b: 1 }) + G.c(118, 80, 7, { f: '#e2e8f0', s: I, w: 1.2 }) + G.c(110, 94, 7, { f: '#fca5a5', s: I, w: 1.2 }) + T(110, 98, '+', { s: 10, b: 1 }) + G.c(110, 15, 5, { f: '#93c5fd', s: I, w: 1.2 }) + T(110, 19, '−', { s: 9, b: 1 }) + G.c(172, 90, 5, { f: '#93c5fd', s: I, w: 1.2 }) + G.c(58, 120, 5, { f: '#93c5fd', s: I, w: 1.2 }) + T(215, 30, 'Teilchen', { b: 1, s: 12, a: 'start' }) + T(215, 52, 'Proton  p⁺  +1', { s: 12, a: 'start', c: R }) + T(215, 74, 'Neutron n  0', { s: 12, a: 'start', c: '#475569' }) + T(215, 96, 'Elektron e⁻  −1', { s: 12, a: 'start', c: B }) + T(215, 126, 'Masse: p ≈ n ≫ e⁻', { s: 11, a: 'start' }) + T(110, 168, 'Kern-Hülle-Modell', { s: 11, c: '#475569' })) },
    { h: 'Wie viele Teilchen?', t: 'Die <b>Ordnungszahl</b> im PSE ist die Zahl der <b>Protonen</b>. Ein neutrales Atom hat <b>genauso viele Elektronen</b>. Die Neutronen erhältst du so: <b>Massenzahl − Protonenzahl</b>. Beispiel Natrium: 11 p⁺, 11 e⁻, 23 − 11 = 12 n.',
      f: G.svg(W, 130, G.r(40, 20, 280, 90, { f: '#f8fafc', s: '#cbd5e1' }) + T(180, 48, 'Natrium  ²³₁₁Na', { b: 1, s: 16 }) + T(100, 82, '11 p⁺', { c: R, b: 1, s: 15 }) + T(180, 82, '12 n', { c: '#475569', b: 1, s: 15 }) + T(262, 82, '11 e⁻', { c: B, b: 1, s: 15 }) + T(180, 102, 'Protonen = Elektronen (neutral)', { s: 11, c: '#475569' })) }
  ], 'Kern: Protonen (+) und Neutronen. Hülle: Elektronen (−). Protonenzahl = Ordnungszahl.');

  A('a2', 'gk', 'Isotop', 'h', ['s22'], [
    { h: 'Gleiches Element, verschieden schwer', t: '<b>Isotope</b> sind Atome desselben Elements mit <b>gleicher Protonenzahl</b>, aber <b>verschiedener Neutronenzahl</b>. Sie verhalten sich chemisch gleich, haben aber unterschiedliche Masse. Wasserstoff hat drei Isotope: ¹H, ²H (Deuterium) und ³H (Tritium).',
      f: G.svg(W, 150, [['¹H', 0, 'Wasserstoff'], ['²H', 1, 'Deuterium'], ['³H', 2, 'Tritium']].map(function (e, i) { var x = 62 + i * 118; var s = G.c(x, 62, 24, { f: '#f8fafc', s: '#94a3b8' }) + G.c(x - 5, 62, 6, { f: '#fca5a5', s: I, w: 1.2 }) + T(x - 5, 66, '+', { s: 9, b: 1 }); if (e[1] >= 1) s += G.c(x + 5, 56, 6, { f: '#e2e8f0', s: I, w: 1.2 }); if (e[1] >= 2) s += G.c(x + 4, 70, 6, { f: '#e2e8f0', s: I, w: 1.2 }); return s + T(x, 108, e[0], { b: 1, s: 16 }) + T(x, 126, e[2], { s: 11 }) + T(x, 142, '1 p⁺, ' + e[1] + ' n', { s: 11, c: '#475569' }); }).join('')) },
    { h: 'Darum die krummen Atommassen', t: 'Im PSE steht für Chlor 35,45. Natürliches Chlor ist ein <b>Gemisch</b> aus ³⁵Cl und ³⁷Cl. Die Atommasse im PSE ist der <b>Mittelwert</b> aller Isotope, gewichtet nach ihrer Häufigkeit.',
      f: G.svg(W, 130, G.r(50, 46, 195, 28, { f: '#bfdbfe', s: B }) + G.r(245, 46, 65, 28, { f: '#fecaca', s: R }) + T(148, 38, '³⁵Cl  ≈ 76 %', { b: 1, s: 12 }) + T(278, 38, '³⁷Cl  ≈ 24 %', { b: 1, s: 12 }) + T(180, 100, 'Mittelwert: 35,45 u', { b: 1, s: 15, c: N }) + T(180, 120, 'so steht es im PSE', { s: 11, c: '#475569' })) }
  ], 'Isotope: gleiche Protonenzahl, verschiedene Neutronenzahl.');

  A('a2', 'gk', 'absolute und relative Atommasse', 'h', ['s22', 's24'], [
    { h: 'Atome sind unvorstellbar leicht', t: 'Die <b>absolute Atommasse</b> ist die wirkliche Masse eines Atoms, z. B. 1,99 · 10⁻²⁶ kg für ein Kohlenstoffatom. Solche Zahlen sind unhandlich. Deshalb nutzt man die <b>atomare Masseneinheit u</b>: 1 u ist ein Zwölftel der Masse eines ¹²C-Atoms (≈ 1,66 · 10⁻²⁷ kg).',
      f: G.svg(W, 120, T(180, 30, 'Kohlenstoffatom', { b: 1, s: 14 }) + T(180, 56, '1,99 · 10⁻²⁶ kg', { s: 15, c: R, b: 1 }) + T(180, 80, '= 12 u', { s: 22, b: 1, c: N }) + T(180, 106, 'u macht die Zahlen handlich', { s: 11, c: '#475569' })) },
    { h: 'Relativ heißt: im Vergleich', t: 'Die <b>relative Atommasse</b> gibt an, wievielmal schwerer ein Atom als <b>1 u</b> ist. Sie hat <b>keine Einheit</b> und steht im PSE. Wasserstoff: 1, Kohlenstoff: 12, Sauerstoff: 16. Ein Sauerstoffatom ist also 16-mal so schwer wie ein Wasserstoffatom.',
      f: G.svg(W, 150, G.ax(40, 130, 290, 110, '', 'relative Masse') + [['H', 1], ['C', 12], ['O', 16]].map(function (e, i) { var h = e[1] * 5.6 + 3; return G.r(80 + i * 80, 130 - h, 50, h, { f: ['#fef9c3', '#e2e8f0', '#fecaca'][i], s: I }) + T(105 + i * 80, 148, e[0], { b: 1 }) + T(105 + i * 80, 122 - h, String(e[1]), { b: 1, s: 12, c: N }); }).join('')) }
  ], 'Relative Atommasse: Vielfaches von 1 u, ohne Einheit, steht im PSE.');

  A('a2', 'gk', 'Periode, Hauptgruppe, Nebengruppe', 'h', ['s24'], [
    { h: 'Zeilen und Spalten', t: 'Die waagerechten Zeilen heißen <b>Perioden</b> (1 bis 7). Die senkrechten Spalten heißen <b>Gruppen</b>. Die hohen Spalten ganz links und rechts sind die <b>Hauptgruppen</b> (I bis VIII), die Mitte sind die <b>Nebengruppen</b>, alles Metalle.',
      f: G.svg(W, 162, pseGrid(30, 8, 17.5, 17.5, 'per') + T(180, 152, 'Gelb: die 3. Periode', { s: 12, c: '#475569' })) },
    { h: 'Hauptgruppen haben Namen', t: 'I: <b>Alkalimetalle</b> (Li, Na, K) · II: <b>Erdalkalimetalle</b> (Mg, Ca) · VII: <b>Halogene</b> (F, Cl) · VIII: <b>Edelgase</b> (He, Ne, Ar). Elemente einer Hauptgruppe haben <b>ähnliche Eigenschaften</b>, weil sie dieselbe Zahl von Außenelektronen haben.',
      f: G.svg(W, 162, pseGrid(30, 8, 17.5, 17.5, 'hg') + T(180, 152, 'Gelb: Hauptgruppe VII (Halogene)', { s: 12, c: '#475569' })) }
  ], 'Perioden = Zeilen, Hauptgruppen = lange Spalten links/rechts, Nebengruppen = Mitte.');

  A('a2', 'gk', 'Atommodell', 'h', ['s22', 's23'], [
    { h: 'Ein Modell ist keine Fotografie', t: 'Atome sind viel zu klein, um sie direkt zu sehen. Deshalb nutzen wir <b>Modelle</b>. Ein Modell ist eine <b>vereinfachte Vorstellung</b>, die bestimmte Beobachtungen erklärt, aber nicht alles zeigt. Reichen die Erklärungen nicht mehr, wird das Modell verbessert.',
      f: G.svg(W, 120, G.bub(10, 30, 100, 50, 'Beobachtung', { f: '#dbeafe', s: B, b: 1 }) + G.ar(116, 55, 154, 55, { c: I }) + G.bub(158, 30, 80, 50, 'Modell', { f: '#fef9c3', s: YEL(), b: 1 }) + G.ar(244, 55, 280, 55, { c: I }) + T(318, 60, 'Erklärung', { b: 1, s: 12 }) + T(180, 106, 'Neue Beobachtung passt nicht → neues Modell', { s: 12, c: '#475569' })) },
    { h: 'Von der Kugel zum Schalenmodell', t: '<b>Kugelmodell</b>: Atome sind winzige, massive Kugeln. <b>Kern-Hülle-Modell</b>: kleiner Kern mit den Protonen und Neutronen, Elektronen in der Hülle. <b>Schalenmodell</b>: Die Elektronen halten sich auf bestimmten Schalen auf, die immer mehr Platz bieten.',
      f: G.svg(W, 150, G.c(60, 64, 24, { f: '#cbd5e1', s: I }) + T(60, 112, 'Kugel', { s: 12, b: 1 }) + G.c(180, 64, 36, { f: '#f8fafc', s: '#94a3b8' }) + G.c(180, 64, 7, { f: '#fecaca', s: I }) + G.c(206, 50, 4, { f: '#93c5fd', s: I }) + G.c(154, 78, 4, { f: '#93c5fd', s: I }) + T(180, 112, 'Kern-Hülle', { s: 12, b: 1 }) + atomShells(300, 64, [2, 8], '') + T(300, 112, 'Schalen', { s: 12, b: 1 }) + T(180, 140, 'Jedes Modell erklärt mehr als das vorige', { s: 11, c: '#475569' })) }
  ], 'Atommodell: vereinfachte Vorstellung vom Atom, die sich mit neuem Wissen weiterentwickelt.');

  A('a2', 'gk', 'Valenzelektronen/Außenelektronen', 'h', ['s23', 's24'], [
    { h: 'Die äußerste Schale zählt', t: 'Die Elektronen der <b>äußersten Schale</b> heißen <b>Valenzelektronen</b> oder <b>Außenelektronen</b>. Nur sie sind an chemischen Reaktionen beteiligt. Für Hauptgruppenelemente gilt: <b>Hauptgruppennummer = Zahl der Außenelektronen</b>, <b>Periodennummer = Zahl der Schalen</b>.',
      f: G.svg(W, 166, atomShells(90, 74, [2, 8, 1], 'Na', { val: 1 }) + T(90, 140, 'Natrium: 3 Schalen', { s: 11, b: 1 }) + T(90, 156, '1 Außenelektron', { s: 11, c: YEL() }) + atomShells(270, 74, [2, 8, 7], 'Cl', { val: 1 }) + T(270, 140, 'Chlor: 3 Schalen', { s: 11, b: 1 }) + T(270, 156, '7 Außenelektronen', { s: 11, c: YEL() })) },
    { h: 'Schreibweise nach Lewis', t: 'Nach <b>Lewis</b> stellst du nur die Außenelektronen als <b>Punkte</b> um das Elementsymbol dar. Die Punkte kommen erst <b>einzeln</b> an jede der vier Seiten, dann bilden sie <b>Paare</b>. Ein Elektronenpaar wird oft als <b>Strich</b> gezeichnet.',
      f: G.svg(W, 120, [['Li', 1], ['C', 4], ['N', 5], ['O', 6], ['Cl', 7]].map(function (e, i) { return lewis(36 + i * 72, 54, e[0], e[1]) + T(36 + i * 72, 100, e[1] + ' e⁻', { s: 11, c: '#475569' }); }).join('')) }
  ], 'Valenzelektronen: Elektronen der äußersten Schale. Hauptgruppennummer = Zahl der Außenelektronen.');

  A('a2', 'gk', 'Edelgase', 'h', ['s24'], [
    { h: 'Die Zufriedenen', t: 'Die <b>Edelgase</b> (Hauptgruppe VIII: He, Ne, Ar, Kr, Xe) reagieren fast nie. Der Grund: Ihre äußerste Schale ist <b>voll besetzt</b> (Helium 2, die anderen 8 Außenelektronen). Diese <b>Edelgaskonfiguration</b> ist besonders stabil.',
      f: G.svg(W, 150, atomShells(90, 74, [2], 'He', { val: 1 }) + T(90, 130, 'Helium: 2 Außenelektronen', { s: 11 }) + atomShells(270, 74, [2, 8], 'Ne', { val: 1 }) + T(270, 130, 'Neon: 8 Außenelektronen', { s: 11 })) },
    { h: 'Vorbild für alle anderen', t: 'Viele Atome erreichen durch Reaktionen eine Edelgaskonfiguration: Natrium gibt ein Elektron ab, Chlor nimmt eines auf. Darum bilden sie <b>Ionen</b> (Salze) oder teilen Elektronen in <b>Molekülen</b>. Das ist das Ziel der <b>Oktettregel</b>.',
      f: G.svg(W, 110, box(10, 30, 100, 46, 'Reaktion', '#fef9c3', YEL()) + G.ar(116, 53, 190, 53, { c: N, w: 3 }) + box(196, 30, 150, 46, 'volle Außenschale', '#dcfce7', N) + T(180, 100, 'Edelgas-Zustand = stabil', { s: 12, c: '#475569' })) }
  ], 'Edelgase: volle Außenschale, deshalb sehr reaktionsträge.');

  /* ================= 3.3 Gase ================= */
  A('a3', 'gk', 'Moleküle', 'k', ['s34'], [
    { h: 'Atome, die zusammenhängen', t: '<b>Moleküle</b> sind Teilchen aus <b>mindestens zwei Atomen</b>, die durch Elektronenpaarbindungen fest verbunden sind. Sauerstoff ist kein einzelnes O, sondern ein Molekül <b>O₂</b>. Wasser ist <b>H₂O</b>, Kohlenstoffdioxid <b>CO₂</b>.',
      f: G.svg(W, 130, ball(40, 56, 'O') + ball(66, 56, 'O') + T(53, 100, 'O₂', { b: 1, s: 14 }) + ball(130, 66, 'O') + ball(110, 48, 'H', 10) + ball(150, 48, 'H', 10) + T(130, 100, 'H₂O', { b: 1, s: 14 }) + ball(220, 56, 'O') + ball(250, 56, 'C', 15) + ball(280, 56, 'O') + T(250, 100, 'CO₂', { b: 1, s: 14 }) + T(180, 124, 'Die Tiefindexzahl gibt die Atomzahl an', { s: 11, c: '#475569' })) },
    { h: 'Summenformel lesen', t: 'Die kleine tiefgestellte Zahl in <b>H₂O</b> gilt für das Atom <b>davor</b>: 2 H-Atome und 1 O-Atom (die 1 schreibt man nicht). Eine große Zahl <b>vor</b> der Formel, z. B. 3 H₂O, gibt die Zahl der <b>Moleküle</b> an: 3 Moleküle mit 6 H- und 3 O-Atomen.',
      f: G.svg(W, 110, T(180, 56, '3 H₂O', { b: 1, s: 30 }) + G.ar(112, 34, 128, 40, { c: R }) + T(92, 30, '3 Moleküle', { c: R, b: 1, s: 12, a: 'end' }) + G.ar(238, 70, 224, 52, { c: B }) + T(352, 88, '2 H-Atome je Molekül', { c: B, b: 1, s: 12, a: 'end' })) }
  ], 'Molekül: Teilchen aus mindestens zwei durch Elektronenpaarbindung verbundenen Atomen.');

  A('a3', 'gk', 'unpolare Atom-/Elektronenpaarbindung', 'k', ['s33'], [
    { h: 'Gemeinsam statt abgeben', t: 'Zwei Nichtmetallatome teilen sich ein oder mehrere <b>Elektronenpaare</b>. Dieses gemeinsame Paar gehört beiden Atomen und hält sie zusammen: die <b>Atombindung</b> oder <b>Elektronenpaarbindung</b>. Beim Wasserstoffmolekül H₂ trägt jedes H-Atom ein Elektron bei.',
      f: G.svg(W, 140, G.c(120, 64, 38, { f: '#dbeafe', s: B, op: .6 }) + G.c(206, 64, 38, { f: '#fee2e2', s: R, op: .6 }) + G.c(120, 64, 5, { f: R, s: 'none' }) + G.c(206, 64, 5, { f: R, s: 'none' }) + G.c(163, 58, 3.6, { f: '#7c3aed', s: 'none' }) + G.c(163, 70, 3.6, { f: '#7c3aed', s: 'none' }) + T(120, 112, 'H', { b: 1, s: 16 }) + T(206, 112, 'H', { b: 1, s: 16 }) + T(163, 128, 'gemeinsames Elektronenpaar', { s: 11, c: V, b: 1 })) },
    { h: 'Unpolar: fair geteilt', t: 'Sind die beiden Atome <b>gleich</b> (H₂, O₂, N₂, Cl₂), zieht jedes das Paar gleich stark an. Die Bindung ist <b>unpolar</b>. Brauchen die Atome mehr als ein Paar, entstehen <b>Doppelbindungen</b> (O=O) oder <b>Dreifachbindungen</b> (N≡N).',
      f: G.svg(W, 110, T(60, 40, 'H–H', { b: 1, s: 20 }) + T(60, 64, 'einfach', { s: 11 }) + T(180, 40, 'O=O', { b: 1, s: 20 }) + T(180, 64, 'doppelt', { s: 11 }) + T(300, 40, 'N≡N', { b: 1, s: 20 }) + T(300, 64, 'dreifach', { s: 11 }) + T(180, 98, 'Ein Strich = ein bindendes Elektronenpaar', { s: 11, c: '#475569' })) }
  ], 'Elektronenpaarbindung: Atome teilen sich Elektronenpaare. Gleiche Atome: unpolar.');

  A('a3', 'gk', 'Oktettregel', 'k', ['s33'], [
    { h: 'Acht Außenelektronen sind das Ziel', t: 'Nach der <b>Oktettregel</b> streben Atome in Molekülen <b>acht Außenelektronen</b> an (Wasserstoff nur zwei), also die Konfiguration eines Edelgases. Dazu teilen sie Elektronenpaare. Jedes <b>gemeinsame</b> Paar zählt für <b>beide</b> Atome.',
      f: G.svg(W, 150, T(110, 76, 'Cl', { b: 1, s: 24 }) + T(250, 76, 'Cl', { b: 1, s: 24 }) + G.l(134, 70, 226, 70, { c: V, w: 3 }) + G.l(100, 46, 120, 46, { c: R, w: 3 }) + G.l(100, 96, 120, 96, { c: R, w: 3 }) + G.l(82, 62, 82, 82, { c: R, w: 3 }) + G.l(240, 46, 260, 46, { c: R, w: 3 }) + G.l(240, 96, 260, 96, { c: R, w: 3 }) + G.l(278, 62, 278, 82, { c: R, w: 3 }) + T(180, 56, 'bindendes Paar', { s: 11, c: V, b: 1 }) + T(180, 126, 'Jedes Cl: 1 bindendes + 3 freie Paare = 8 Außenelektronen', { s: 11, c: '#475569' }) + T(180, 142, 'Das gemeinsame Paar zählt für beide Atome', { s: 11, c: '#475569' })) },
    { h: 'Wie viele Bindungen?', t: 'Aus den fehlenden Außenelektronen folgt die Zahl der Bindungen: <b>H: 1</b>, <b>O: 2</b> (6 Außenelektronen, 2 fehlen), <b>N: 3</b>, <b>C: 4</b>, Halogene wie Cl: 1. Damit lassen sich viele Formeln gleich erraten: H₂O, NH₃, CH₄, CO₂.',
      f: G.svg(W, 120, [['H', 1], ['O', 2], ['N', 3], ['C', 4]].map(function (e, i) { return ball(45 + i * 90, 44, e[0], 17) + T(45 + i * 90, 88, e[1] + (e[1] === 1 ? ' Bindung' : ' Bindungen'), { s: 11, b: 1, c: N }); }).join('') + T(180, 110, 'Bindigkeit = Zahl der Bindungen eines Atoms', { s: 11, c: '#475569' })) }
  ], 'Oktettregel: Atome erreichen durch gemeinsame Elektronenpaare acht Außenelektronen (H: zwei).');

  A('a3', 'gk', 'Lewis-Strukturformel', 'k', ['s34'], [
    { h: 'Jedes Elektronenpaar ein Strich', t: 'In der <b>Lewis-Strukturformel</b> steht jedes Elektronenpaar als Strich. Ein Strich <b>zwischen</b> zwei Atomen ist ein <b>bindendes</b> Paar. Ein Strich <b>am</b> Atom ist ein <b>freies</b> (nichtbindendes) Paar. Beim Wasser trägt Sauerstoff zwei freie Paare.',
      f: G.svg(W, 160, G.l(180, 72, 140, 104, { w: 2.4 }) + G.l(180, 72, 220, 104, { w: 2.4 }) + G.at(180, 66, 'O', { r: 14, s: 20 }) + G.at(134, 110, 'H', { r: 12, s: 18 }) + G.at(226, 110, 'H', { r: 12, s: 18 }) + G.l(164, 40, 176, 40, { c: R, w: 3 }) + G.l(184, 40, 196, 40, { c: R, w: 3 }) + T(290, 40, 'freie Paare', { c: R, b: 1, s: 12 }) + G.ar(262, 42, 202, 42, { c: R, w: 1.4 }) + T(60, 90, 'bindende Paare', { c: B, b: 1, s: 12, a: 'middle' }) + G.ar(78, 96, 126, 106, { c: B, w: 1.4 })) },
    { h: 'So gehst du vor', t: '1. <b>Außenelektronen</b> aller Atome zählen. 2. Das Atom mit den meisten Bindungsmöglichkeiten (O, N, C) kommt in die <b>Mitte</b>. 3. Atome durch <b>Striche</b> verbinden. 4. Restliche Elektronen als <b>freie Paare</b> verteilen, bis jedes Atom <b>8</b> hat (H: 2). Zur Probe: Passen die Zahlen?',
      f: G.svg(W, 130, G.at(40, 56, 'O', { r: 14, s: 20 }) + G.l(54, 54, 94, 54, { w: 2.4 }) + G.l(54, 60, 94, 60, { w: 2.4 }) + G.at(110, 56, 'C', { r: 14, s: 20 }) + G.l(124, 54, 164, 54, { w: 2.4 }) + G.l(124, 60, 164, 60, { w: 2.4 }) + G.at(180, 56, 'O', { r: 14, s: 20 }) + G.l(32, 36, 48, 36, { c: R, w: 2.4 }) + G.l(32, 78, 48, 78, { c: R, w: 2.4 }) + G.l(172, 36, 188, 36, { c: R, w: 2.4 }) + G.l(172, 78, 188, 78, { c: R, w: 2.4 }) + T(110, 92, 'CO₂: 4 Bindungen am C', { s: 11 }) + T(110, 108, 'je 2 freie Paare an O (rot)', { s: 11, c: '#475569' }) + T(300, 64, '= 8 e⁻', { s: 13, b: 1, c: N }) + T(300, 80, 'je Atom', { s: 12, b: 1, c: N })) }
  ], 'Lewis-Formel: Striche für bindende und freie Elektronenpaare; jedes Atom erreicht ein Oktett.');

  /* ================= 3.4 Wasser ================= */
  A('a4', 'gk', 'Reaktionsgleichung', 'k', ['s45'], [
    { h: 'Von Worten zu Formeln', t: 'Die <b>Wortgleichung</b> nennt die Stoffe: Wasserstoff + Sauerstoff → Wasser. Die <b>Reaktionsgleichung</b> schreibt sie mit Formeln und zeigt zusätzlich die <b>Teilchenzahlen</b>: 2 H₂ + O₂ → 2 H₂O. Links und rechts muss von jeder Atomsorte <b>gleich viel</b> stehen.',
      f: G.svg(W, 150, T(180, 40, 'Wasserstoff + Sauerstoff → Wasser', { s: 13 }) + T(180, 80, '2 H₂ + O₂ → 2 H₂O', { s: 24, b: 1 }) + T(90, 114, 'links: 4 H, 2 O', { s: 12, c: B, b: 1 }) + T(270, 114, 'rechts: 4 H, 2 O', { s: 12, c: R, b: 1 }) + T(180, 114, '=', { s: 18, b: 1, c: N }) + T(180, 138, 'Atome gehen nicht verloren', { s: 11, c: '#475569' })) },
    { h: 'Gleichung einrichten', t: '1. Edukte und Produkte mit <b>Formeln</b> aufschreiben. 2. Atome auf beiden Seiten <b>zählen</b>. 3. Mit <b>Koeffizienten</b> (große Zahlen davor) ausgleichen. <b>Niemals</b> die kleinen Zahlen in der Formel ändern, sonst wird es ein anderer Stoff!',
      f: G.svg(W, 150, T(180, 32, 'H₂ + O₂ → H₂O  (nicht ausgeglichen: 2 O → 1 O)', { s: 12, c: R }) + T(180, 62, '2 H₂ + O₂ → 2 H₂O', { s: 20, b: 1, c: N }) + T(180, 92, '✔ Koeffizient vor H₂O und H₂', { s: 12 }) + T(180, 114, '✘ nicht H₂O₂ schreiben (anderer Stoff!)', { s: 12, c: R }) + T(180, 138, 'Wasserstoffperoxid ≠ Wasser', { s: 11, c: '#475569' })) }
  ], 'Reaktionsgleichung: Formeln und Koeffizienten; von jeder Atomsorte links wie rechts gleich viele.');

  A('a4', 'gk', 'Elektronegativität', 'k', ['s47'], [
    { h: 'Wer zieht stärker?', t: 'Die <b>Elektronegativität</b> (EN) beschreibt, wie stark ein Atom die Elektronen einer Bindung zu sich <b>heranzieht</b>. Fluor hat den höchsten Wert (4,0), Sauerstoff 3,5, Stickstoff und Chlor 3,0, Kohlenstoff 2,5, Wasserstoff 2,1.',
      f: G.svg(W, 160, G.ax(30, 136, 300, 116, '', 'EN') + [['H', 2.1], ['C', 2.5], ['N', 3.0], ['Cl', 3.0], ['O', 3.5], ['F', 4.0]].map(function (e, i) { var h = e[1] * 24; return G.r(52 + i * 46, 136 - h, 34, h, { f: ['#f1f5f9', '#cbd5e1', '#bfdbfe', '#bbf7d0', '#fecaca', '#fde68a'][i], s: I }) + T(69 + i * 46, 152, e[0], { b: 1, s: 12 }) + T(69 + i * 46, 130 - h, String(e[1]).replace('.', ','), { s: 10.5, b: 1, c: N }); }).join('')) },
    { h: 'Im PSE nach rechts oben', t: 'Die Elektronegativität <b>steigt in einer Periode nach rechts</b> und <b>sinkt in einer Gruppe nach unten</b>. Die stärksten Elektronenzieher stehen also oben rechts: F, O, N, Cl. Metalle links unten haben niedrige Werte.',
      f: G.svg(W, 140, pseGrid(60, 10, 14, 14) + G.ar(200, 96, 250, 30, { c: R, w: 3 }) + T(334, 24, 'EN ↑', { c: R, b: 1, s: 15 }) + T(180, 128, 'oben rechts am höchsten (ohne Edelgase)', { s: 11, c: '#475569' })) }
  ], 'Elektronegativität: Maß für die Anziehung auf Bindungselektronen, oben rechts im PSE am größten.');

  A('a4', 'gk', 'polare Elektronenpaarbindung', 'k', ['s47'], [
    { h: 'Das Paar rutscht', t: 'Verbinden sich Atome mit <b>verschiedener Elektronegativität</b>, zieht das stärkere das Bindungspaar näher zu sich. Es entsteht eine <b>polare Bindung</b>. Das O-Atom bekommt eine <b>negative Teilladung (δ⁻)</b>, das H-Atom eine <b>positive Teilladung (δ⁺)</b>.',
      f: G.svg(W, 130, G.c(110, 60, 28, { f: '#f1f5f9', s: I }) + T(110, 66, 'H', { b: 1, s: 18 }) + G.c(250, 60, 36, { f: '#fecaca', s: I }) + T(250, 66, 'O', { b: 1, s: 20 }) + G.c(196, 60, 4, { f: V, s: 'none' }) + G.c(206, 60, 4, { f: V, s: 'none' }) + G.ar(150, 60, 200, 60, { c: R, w: 2 }) + T(110, 20, 'δ⁺', { c: B, b: 1, s: 18 }) + T(250, 20, 'δ⁻', { c: R, b: 1, s: 18 }) + T(180, 114, 'O zieht das Elektronenpaar zu sich (EN 3,5 gegen 2,1)', { s: 11, c: '#475569' })) },
    { h: 'Unpolar oder polar?', t: '<b>Gleiche Atome</b> (H–H, O=O): unpolar. <b>Je größer der Unterschied</b> der Elektronegativität, desto polarer die Bindung. Polare Bindungen findest du bei H–O, H–Cl, C–O. Das Bindungselektronenpaar bleibt dabei <b>geteilt</b>, nur nicht gleichmäßig.',
      f: G.svg(W, 110, T(60, 40, 'H–H', { b: 1, s: 20 }) + T(60, 64, 'unpolar', { s: 12, c: N, b: 1 }) + T(180, 40, 'C–H', { b: 1, s: 20 }) + T(180, 64, 'kaum polar', { s: 12, c: '#475569', b: 1 }) + T(300, 40, 'O–H', { b: 1, s: 20 }) + T(300, 64, 'polar', { s: 12, c: R, b: 1 }) + G.ar(40, 90, 320, 90, { c: R, w: 2 }) + T(180, 106, 'Unterschied der EN wächst', { s: 11, c: '#475569' })) }
  ], 'Polare Bindung: Elektronenpaar näher beim Atom mit höherer EN, Teilladungen δ⁺ und δ⁻.');

  A('a4', 'gk', 'Dipol', 'k', ['s47', 's46'], [
    { h: 'Zwei Pole', t: 'Ein Molekül ist ein <b>Dipol</b>, wenn die Schwerpunkte der positiven und negativen Teilladungen <b>nicht zusammenfallen</b>. Das Wassermolekül ist <b>gewinkelt</b>. Das O-Atom ist δ⁻, die beiden H-Atome sind δ⁺. Deshalb hat das Molekül einen <b>negativen und einen positiven Pol</b>.',
      f: G.svg(W, 170, G.l(180, 70, 128, 116, { w: 2.4 }) + G.l(180, 70, 232, 116, { w: 2.4 }) + G.at(180, 66, 'O', { r: 16, s: 22 }) + G.at(124, 120, 'H', { r: 13, s: 18 }) + G.at(236, 120, 'H', { r: 13, s: 18 }) + T(180, 34, 'δ⁻', { c: R, b: 1, s: 20 }) + T(112, 148, 'δ⁺', { c: B, b: 1, s: 16 }) + T(248, 148, 'δ⁺', { c: B, b: 1, s: 16 }) + G.ar(180, 140, 180, 100, { c: V, w: 2.6 }) + T(300, 98, 'Dipolpfeil', { c: V, b: 1, s: 12 })) },
    { h: 'Form entscheidet', t: 'Es kommt auch auf die <b>Form</b> an: CO₂ ist <b>linear</b> (O=C=O). Seine polaren Bindungen zeigen in entgegengesetzte Richtungen und <b>heben sich auf</b>. CO₂ ist daher <b>kein Dipol</b>, Wasser schon. Darum lenkt ein geladener Stab einen Wasserstrahl ab, aber keinen Strahl aus Heptan.',
      f: G.svg(W, 120, T(90, 30, 'H₂O: gewinkelt', { b: 1, s: 12 }) + G.ar(90, 78, 90, 48, { c: V, w: 3 }) + T(90, 100, 'Dipol', { b: 1, c: N, s: 13 }) + T(270, 30, 'CO₂: linear', { b: 1, s: 12 }) + G.ar(270, 60, 230, 60, { c: R, w: 2.4 }) + G.ar(270, 60, 310, 60, { c: R, w: 2.4 }) + T(270, 100, 'kein Dipol', { b: 1, c: R, s: 13 })) }
  ], 'Dipol: Molekül mit getrennten Ladungsschwerpunkten. Wasser ist gewinkelt und deshalb ein Dipol.');

  A('a4', 'gk', 'Dipol-Dipol-Wechselwirkungen', 'k', ['s41', 's47'], [
    { h: 'Plus zieht Minus an', t: 'Dipol-Moleküle ziehen sich gegenseitig an: Der <b>positive Pol</b> (δ⁺) eines Moleküls zieht den <b>negativen Pol</b> (δ⁻) des Nachbarn an. Man nennt das <b>Dipol-Dipol-Wechselwirkung</b>. Beim Wasser ist sie besonders stark: die <b>Wasserstoffbrückenbindung</b>.',
      f: G.svg(W, 170, G.at(70, 70, 'O', { r: 14, s: 18, bg: '#fecaca' }) + G.l(70, 70, 40, 100, { w: 2 }) + G.l(70, 70, 100, 100, { w: 2 }) + G.at(40, 106, 'H', { r: 10, s: 14 }) + G.at(102, 106, 'H', { r: 10, s: 14 }) + G.at(250, 70, 'O', { r: 14, s: 18, bg: '#fecaca' }) + G.l(250, 70, 220, 100, { w: 2 }) + G.l(250, 70, 280, 100, { w: 2 }) + G.at(220, 106, 'H', { r: 10, s: 14 }) + G.at(282, 106, 'H', { r: 10, s: 14 }) + G.l(112, 104, 214, 74, { c: V, d: '5 4', w: 2.4 }) + T(160, 128, 'anziehend', { c: V, b: 1, s: 12 }) + T(160, 150, 'δ⁺ (H) … δ⁻ (O)', { s: 11, c: '#475569' })) },
    { h: 'Das erklärt viel', t: 'Wegen der starken Anziehung zwischen den Molekülen hat Wasser eine <b>hohe Siedetemperatur</b>, eine große <b>Oberflächenspannung</b> (Wasserläufer!) und löst viele Salze. Beim Gefrieren ordnen sich die Moleküle zu einem weiten Gitter: Eis ist <b>leichter</b> als Wasser (Dichteanomalie).',
      f: G.svg(W, 120, T(60, 36, '100 °C', { b: 1, s: 16, c: R }) + T(60, 56, 'Siedetemperatur', { s: 11 }) + T(180, 36, '💧', { s: 22 }) + T(180, 56, 'Oberflächenspannung', { s: 11 }) + T(300, 36, '🧊', { s: 22 }) + T(300, 56, 'Eis schwimmt', { s: 11 }) + T(180, 100, 'alles wegen der Anziehung zwischen den Molekülen', { s: 11, c: '#475569' })) }
  ], 'Dipol-Dipol-Wechselwirkung: Anziehung zwischen δ⁺ und δ⁻ benachbarter Dipol-Moleküle.');
})();
