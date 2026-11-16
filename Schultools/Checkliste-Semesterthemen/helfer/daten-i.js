/* Erklärfolien Indikatorfarbstoffe, physikalischer Teil (Hugo) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  var SPEC = ['#7c3aed', '#4f46e5', '#2563eb', '#06b6d4', '#22c55e', '#eab308', '#f97316', '#ef4444'];
  function band(x, y, w, h) { var cw = w / SPEC.length; return SPEC.map(function (c, i) { return G.r(x + i * cw, y, cw + .5, h, { f: c, s: 'none' }); }).join(''); }

  A('i', 'lk', 'elektromagnetisches Spektrum', 'h', ['i1', 'i2'], [
    { h: 'Licht ist eine Welle', t: 'Licht ist <b>elektromagnetische Strahlung</b>. Sie wird durch ihre <b>Wellenlänge λ</b> beschrieben (Abstand zweier Wellenberge). Kurze Wellen sind energiereich, lange sind energiearm. Das sichtbare Licht ist nur ein schmaler Bereich.',
      f: G.svg(W, 150, G.p('M20 60 C40 20 60 20 80 60 S120 100 140 60 S180 20 200 60 S240 100 260 60 S300 20 320 60', { s: B, w: 3 }) + G.ar(80, 100, 140, 100, { c: R }) + G.ar(140, 100, 80, 100, { c: R }) + T(110, 120, 'λ', { s: 16, b: 1, c: R }) + T(180, 142, 'kurz = energiereich · lang = energiearm', { s: 11, c: '#475569' })) },
    { h: 'Sichtbarer Bereich 400–800 nm', t: 'Wir sehen nur Licht von etwa <b>400 nm (violett) bis 800 nm (rot)</b>. Davor liegt die energiereiche <b>UV-Strahlung</b>, danach <b>Infrarot</b> (Wärmestrahlung). Weißes Licht enthält alle Farben.',
      f: G.svg(W, 150, T(36, 36, 'UV', { s: 12, b: 1, c: V }) + band(60, 20, 240, 40) + T(330, 36, 'IR', { s: 12, b: 1, c: R }) + T(60, 78, '400 nm', { s: 11 }) + T(300, 78, '800 nm', { s: 11 }) + G.ar(60, 112, 300, 112, { c: I }) + T(180, 134, 'Wellenlänge λ wächst →', { s: 11, c: '#475569' })) }
  ], 'Sichtbares Licht: 400 nm (violett) bis 800 nm (rot).');

  A('i', 'lk', 'Absorption, Reflexion', 'h', ['i2'], [
    { h: 'Was kommt beim Auge an?', t: 'Trifft weißes Licht auf einen Stoff, wird ein Teil <b>absorbiert</b> (verschluckt) und der Rest <b>reflektiert</b> oder durchgelassen. Wir sehen die Farbe des Lichts, das <b>übrig bleibt</b>. Ein roter Farbstoff schluckt vor allem blaugrünes Licht.',
      f: G.svg(W, 170, G.ar(20, 30, 100, 80, { c: '#475569', w: 4 }) + T(30, 24, 'weißes Licht', { s: 11, b: 1, a: 'start' }) + G.r(100, 80, 100, 24, { f: '#fecaca', s: R }) + T(150, 97, 'Stoff', { s: 11, b: 1 }) + G.ar(170, 78, 290, 30, { c: R, w: 4 }) + T(345, 100, 'reflektiert: rot', { s: 11, b: 1, c: R, a: 'end' }) + T(150, 128, 'absorbiert: blaugrün', { s: 11, b: 1, c: '#0e7490' }) + G.ar(130, 106, 130, 118, { c: '#0e7490', w: 2 })) },
    { h: 'Komplementärfarben', t: 'Welche Farbe wir sehen, ist die <b>Komplementärfarbe</b> zum absorbierten Licht: absorbiert wird Blau → wir sehen Gelb. Absorbiert wird Grün → wir sehen Rot (Purpur). Im Farbkreis liegen Komplementärfarben <b>gegenüber</b>.',
      f: G.svg(W, 195, [['#2563eb', 0], ['#06b6d4', 1], ['#22c55e', 2], ['#eab308', 3], ['#f97316', 4], ['#ef4444', 5], ['#a855f7', 6], ['#6366f1', 7]].map(function (u, i) { var a = i * Math.PI / 4 - Math.PI / 2; return G.c(180 + 56 * Math.cos(a), 84 + 56 * Math.sin(a), 18, { f: u[0], s: 'none' }); }).join('') + T(180, 90, '⟷', { s: 20, b: 1 }) + T(180, 186, 'gegenüberliegend = komplementär', { s: 11, c: '#475569' })) }
  ], 'Wir sehen die Komplementärfarbe des absorbierten Lichts.');

  A('i', 'lk', 'Absorptionsspektrum, Absorptionsmaximum', 'h', ['i2'], [
    { h: 'Wie viel wird bei welcher Wellenlänge geschluckt?', t: 'Das <b>Absorptionsspektrum</b> zeigt die Absorption (y) gegen die Wellenlänge (x). Der Gipfel ist das <b>Absorptionsmaximum λ<sub>max</sub></b>: Hier wird am meisten Licht geschluckt. Er bestimmt die Farbe des Stoffs.',
      f: G.svg(W, 190, G.ax(40, 150, 290, 130, 'λ / nm', 'Absorption') + G.p('M60 148 C100 146 130 120 170 40 C200 -4 230 120 300 144', { s: R, w: 3.4 }) + L(185, 150, 185, 30, { c: '#94a3b8', d: '4 3' }) + T(186, 24, 'λ_max', { s: 13, b: 1, c: V })) },
    { h: 'Vom Spektrum zur Farbe', t: 'Liegt λ<sub>max</sub> im <b>blauen</b> Bereich (ca. 450 nm), erscheint der Stoff <b>gelb</b>. Liegt es im <b>grünen</b> (ca. 530 nm), erscheint er <b>rot/purpur</b>. Verschiebt sich λ<sub>max</sub>, ändert sich die Farbe: So erklärt man den Farbumschlag eines Indikators.',
      f: G.svg(W, 130, [['450 nm', 'absorbiert blau', 'sichtbar gelb', '#facc15'], ['530 nm', 'absorbiert grün', 'sichtbar rot', '#ef4444']].map(function (u, i) { var x = 12 + i * 172; return G.r(x, 14, 160, 84, { f: '#f8fafc', s: I }) + G.c(x + 30, 46, 16, { f: u[3], s: I }) + T(x + 100, 40, u[0], { s: 13, b: 1 }) + T(x + 100, 58, u[1], { s: 10 }) + T(x + 80, 84, u[2], { s: 12, b: 1 }); }).join('')) }
  ], 'λ_max = Wellenlänge der stärksten Absorption; die Farbe ist die Komplementärfarbe.');

  A('i', 'lk', 'Anregungsenergie', 'h', ['i1'], [
    { h: 'Elektron springt', t: 'Moleküle haben <b>Energiestufen</b> für ihre Elektronen. Trifft ein Lichtquant genau die <b>Energiedifferenz ΔE</b> zwischen Grundzustand und angeregtem Zustand, wird es absorbiert und hebt ein Elektron hoch. Diese Energie ist die <b>Anregungsenergie</b>.',
      f: G.svg(W, 190, L(60, 150, 200, 150, { w: 3.4 }) + T(60, 170, 'Grundzustand', { s: 11, a: 'start' }) + L(60, 50, 200, 50, { w: 3.4, c: R }) + T(60, 40, 'angeregter Zustand', { s: 11, a: 'start', c: R }) + G.c(120, 142, 6, { f: '#fde047', s: I }) + G.ar(240, 144, 240, 56, { c: R, w: 2.6 }) + T(250, 100, 'ΔE', { s: 18, b: 1, c: R, a: 'start' }) + T(260, 130, 'passendes', { s: 11, a: 'start', c: O, b: 1 }) + T(260, 146, 'Lichtquant hν', { s: 11, a: 'start', c: O, b: 1 })) },
    { h: 'ΔE = h · c / λ', t: 'Je <b>größer die Energielücke</b>, desto <b>kürzer</b> die absorbierte Wellenlänge: ΔE = h·c/λ. Kleines ΔE → langwelliges Licht (rot/IR), großes ΔE → kurzwelliges (UV). Je größer das konjugierte System, desto kleiner ΔE und desto größer λ<sub>max</sub>.',
      f: G.svg(W, 130, T(180, 44, 'ΔE = h · c / λ', { s: 26, b: 1 }) + T(180, 84, 'größeres ΔE → kürzeres λ', { s: 12, c: '#475569' }) + T(180, 104, 'größeres konjugiertes System → kleineres ΔE', { s: 12, c: '#475569' })) }
  ], 'Anregungsenergie ΔE = h·c/λ; kleines ΔE → langwelliges Licht.');
})();
