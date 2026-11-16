/* Erklärfolien Q3 Säure-Base-Reaktionen und Indikatorfarbstoffe (Struktur-Teil) – Kolbi */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  function mid(s, x, y, w, h, f, c) { return G.bub(x, y, w, h, s, { f: f, s: c, b: 1 }); }

  A('s', 'gk', 'BRÖNSTED-Säure, BRÖNSTED-Base', 'k', ['s1', 's2'], [
    { h: 'Säure gibt ab, Base nimmt auf', t: 'Nach BRÖNSTED ist eine <b>Säure</b> ein Teilchen, das ein <b>Proton (H⁺) abgibt</b>. Eine <b>Base</b> ist ein Teilchen, das ein <b>Proton aufnimmt</b>. Es geht immer um den Austausch von H⁺-Ionen, einer allein reicht nie.',
      f: G.svg(W, 160, mid('HCl', 14, 48, 84, 44, '#fee2e2', R) + T(56, 40, 'Säure', { c: R, b: 1 }) + G.ar(104, 60, 210, 60, { c: R, w: 3 }) + T(157, 50, 'H⁺', { c: R, b: 1, s: 16 }) + mid('H₂O', 216, 48, 84, 44, '#dbeafe', B) + T(258, 40, 'Base', { c: B, b: 1 }) + T(180, 128, 'HCl + H₂O → Cl⁻ + H₃O⁺', { s: 16, b: 1 })) },
    { h: 'Erkennen am Teilchen', t: 'Säuren haben ein <b>abspaltbares H</b> (z. B. –OH in HCl, H₂SO₄, CH₃COOH). Basen haben ein <b>freies Elektronenpaar</b>, an das sich H⁺ binden kann (OH⁻, NH₃, H₂O, CO₃²⁻).',
      f: G.svg(W, 150, G.r(10, 14, 168, 112, { f: '#fff1f2', s: R }) + T(94, 36, 'Säure', { c: R, b: 1 }) + T(94, 66, 'H–Cl', { s: 20, b: 1 }) + T(94, 92, 'H–A', { s: 14 }) + T(94, 116, 'H⁺ abspaltbar', { s: 11, c: R }) + G.r(186, 14, 164, 112, { f: '#eff6ff', s: B }) + T(268, 36, 'Base', { c: B, b: 1 }) + T(268, 66, '|NH₃', { s: 20, b: 1 }) + T(268, 92, '|OH⁻', { s: 14 }) + T(268, 116, 'freies Elektronenpaar', { s: 11, c: B })) }
  ], 'Säure = Protonendonator (gibt H⁺ ab), Base = Protonenakzeptor (nimmt H⁺ auf).');
  A('s', 'gk', 'Protonendonator, -akzeptor', 'k', ['s1'], [
    { h: 'Das Donator-Akzeptor-Prinzip', t: 'Der <b>Donator</b> gibt etwas ab, der <b>Akzeptor</b> nimmt es auf. Bei Säure-Base-Reaktionen ist das übertragene Teilchen das <b>Proton</b>. Dasselbe Prinzip gilt später für Elektronen bei der Redoxreaktion.',
      f: G.svg(W, 150, mid('Donator', 14, 46, 100, 48, '#fee2e2', R) + mid('Akzeptor', 246, 46, 100, 48, '#dbeafe', B) + G.c(180, 70, 12, { f: '#fde68a', s: O }) + T(180, 75, 'H⁺', { b: 1, s: 11 }) + G.ar(118, 60, 160, 60, { c: O, w: 2.4 }) + G.ar(200, 60, 242, 60, { c: O, w: 2.4 }) + T(180, 120, 'Proton wird übertragen', { s: 12, c: '#475569' })) },
    { h: 'Ein Beispiel', t: 'Bei <b>HCl + NH₃ → Cl⁻ + NH₄⁺</b> gibt HCl das Proton ab (Donator), NH₃ nimmt es auf (Akzeptor). Beide Rollen gibt es nur gemeinsam: ohne Akzeptor kann kein Donator abgeben.',
      f: G.svg(W, 140, T(180, 40, 'HCl + NH₃ → Cl⁻ + NH₄⁺', { s: 20, b: 1 }) + G.bub(20, 66, 150, 34, 'HCl gibt H⁺ ab', { f: '#fee2e2', s: R, b: 1, fs: 12 }) + T(95, 118, 'Donator', { c: R, b: 1, s: 12 }) + G.bub(190, 66, 150, 34, 'NH₃ nimmt H⁺ auf', { f: '#dbeafe', s: B, b: 1, fs: 12 }) + T(265, 118, 'Akzeptor', { c: B, b: 1, s: 12 })) }
  ], 'Donator gibt das Proton ab, Akzeptor nimmt es auf.');
  A('s', 'gk', 'korrespondierende Säure-Base-Paare', 'k', ['s1', 's2'], [
    { h: 'Ein Paar, nur ein H⁺ Unterschied', t: 'Gibt eine Säure ein Proton ab, wird sie zu ihrer <b>korrespondierenden Base</b>. Nimmt die Base ein Proton auf, wird sie wieder zur Säure. Beide bilden ein <b>Säure-Base-Paar</b>: HA / A⁻.',
      f: G.svg(W, 150, mid('Säure HA', 24, 40, 100, 48, '#fee2e2', R) + mid('Base A⁻', 236, 40, 100, 48, '#dbeafe', B) + G.ar(128, 56, 232, 56, { c: R }) + T(180, 46, '− H⁺', { c: R, b: 1, s: 12 }) + G.ar(232, 74, 128, 74, { c: B }) + T(180, 94, '+ H⁺', { c: B, b: 1, s: 12 }) + T(180, 126, 'korrespondierendes Paar', { s: 12, c: '#475569' })) },
    { h: 'Eine Reaktion hat zwei Paare', t: 'Bei HCl + H₂O ⇌ Cl⁻ + H₃O⁺ gibt es <b>zwei Paare</b>: HCl / Cl⁻ und H₃O⁺ / H₂O. Die Säure des einen Paars reagiert mit der Base des anderen. Beim Aufschreiben markierst du die Paare am besten mit Farben.',
      f: G.svg(W, 150, T(44, 46, 'HCl', { s: 17, b: 1, c: R }) + T(84, 46, '+', { s: 17 }) + T(128, 46, 'H₂O', { s: 17, b: 1, c: B }) + T(180, 46, '⇌', { s: 20 }) + T(230, 46, 'Cl⁻', { s: 17, b: 1, c: R }) + T(268, 46, '+', { s: 17 }) + T(316, 46, 'H₃O⁺', { s: 17, b: 1, c: B }) + G.p('M44 58 V78 H230 V58', { s: R, w: 2 }) + G.p('M128 58 V104 H316 V58', { s: B, w: 2 }) + T(137, 74, '', {}) + T(137, 96, 'Paar 1', { c: R, s: 11, b: 1 }) + T(222, 122, 'Paar 2', { c: B, s: 11, b: 1 })) }
  ], 'Säure und korrespondierende Base unterscheiden sich um genau ein Proton.');
  A('s', 'gk', 'Oxonium-Ion', 'k', ['s1', 's3'], [
    { h: 'H₃O⁺', t: 'Ein Wasser-Molekül hat am O-Atom <b>freie Elektronenpaare</b>. Damit bindet es ein H⁺ und wird zum <b>Oxonium-Ion H₃O⁺</b>. Es ist die eigentliche „saure“ Teilchenart in Wasser, H⁺ allein gibt es dort nicht.',
      f: G.svg(W, 170, G.at(90, 80, 'O', { s: 22, r: 16 }) + L(80, 92, 56, 126, { w: 3 }) + L(100, 92, 124, 126, { w: 3 }) + T(48, 140, 'H', { b: 1, s: 16 }) + T(130, 140, 'H', { b: 1, s: 16 }) + G.c(82, 58, 2.4, { f: R, s: R }) + G.c(98, 58, 2.4, { f: R, s: R }) + T(90, 168, 'Wasser', { s: 12 }) + G.ar(150, 90, 210, 90, { c: R }) + T(180, 78, '+ H⁺', { c: R, b: 1 }) + G.at(270, 80, 'O', { s: 22, r: 16 }) + L(260, 92, 236, 126, { w: 3 }) + L(280, 92, 304, 126, { w: 3 }) + L(270, 66, 270, 40, { w: 3, c: R }) + T(270, 34, 'H', { b: 1, s: 16, c: R }) + T(228, 140, 'H', { b: 1, s: 16 }) + T(310, 140, 'H', { b: 1, s: 16 }) + T(296, 62, '+', { c: R, b: 1, s: 18 }) + T(270, 168, 'Oxonium-Ion', { s: 12, b: 1 })) }
  ], 'Oxonium-Ion H₃O⁺ = Wasser-Molekül mit angelagertem Proton.');
  A('s', 'gk', 'amphoter, Ampholyt', 'k', ['s1', 's2', 's3'], [
    { h: 'Mal Säure, mal Base', t: 'Ein Teilchen ist <b>amphoter</b> (ein <b>Ampholyt</b>), wenn es <b>Proton abgeben und aufnehmen</b> kann. Wasser ist das bekannteste Beispiel: Gegenüber HCl ist es Base, gegenüber NH₃ ist es Säure.',
      f: G.svg(W, 150, T(180, 40, 'HCl + H₂O → Cl⁻ + H₃O⁺', { s: 16, b: 1 }) + T(180, 60, 'Wasser nimmt H⁺ auf: Base', { s: 11, c: B, b: 1 }) + T(180, 98, 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻', { s: 16, b: 1 }) + T(180, 118, 'Wasser gibt H⁺ ab: Säure', { s: 11, c: R, b: 1 })) },
    { h: 'Auch Hydrogencarbonat', t: 'Weitere Ampholyte: <b>HCO₃⁻</b>, <b>HSO₄⁻</b>, <b>H₂PO₄⁻</b> und Aminosäuren. Sie haben ein H zum Abgeben <b>und</b> ein freies Elektronenpaar zum Aufnehmen.',
      f: G.svg(W, 130, ['HCO₃⁻', 'HSO₄⁻', 'H₂PO₄⁻', 'H₂O'].map(function (s, i) { return G.bub(14 + i * 86, 40, 76, 42, s, { f: '#f5f3ff', s: V, b: 1 }); }).join('') + T(180, 108, 'alle amphoter', { s: 12, c: '#475569' })) }
  ], 'Ampholyt: Teilchen, das als Säure und als Base reagieren kann (z. B. H₂O).');

  function buret() {
    return G.r(60, 14, 22, 100, { f: '#f0f9ff', s: I, rx: 3 }) + G.r(61, 14, 20, 40, { f: '#bfdbfe', s: 'none', rx: 0 }) + L(71, 114, 71, 130, { w: 3 }) + G.c(71, 138, 2.6, { f: B, s: B }) +
      G.p('M40 150 L40 174 Q40 182 50 182 H110 Q120 182 120 174 L120 150 L102 140 V128 H60 V140 Z', { f: '#fde68a', s: I, w: 2 }) + T(96, 30, 'Bürette:', { s: 11, b: 1, c: B, a: 'start' }) + T(96, 44, 'Base', { s: 11, b: 1, c: B, a: 'start' }) + T(180, 202, 'Erlenmeyerkolben: Säure + Indikator', { s: 11 });
  }
  A('s', 'gk', 'Neutralisationstitration', 'k', ['s6'], [
    { h: 'Konzentration bestimmen', t: 'Bei der <b>Neutralisationstitration</b> lässt man eine Lösung bekannter Konzentration (<b>Maßlösung</b>) aus einer Bürette zu einer Probe fließen, bis sie genau <b>neutralisiert</b> ist. Aus dem verbrauchten Volumen berechnet man die unbekannte Konzentration.',
      f: G.svg(W, 210, buret() + T(250, 70, 'Maßlösung', { s: 12, b: 1, c: B }) + T(250, 88, 'c bekannt', { s: 11 }) + T(250, 130, 'Probe', { s: 12, b: 1, c: R }) + T(250, 148, 'c gesucht', { s: 11 }) + T(250, 180, 'bis zum Farbumschlag', { s: 11, c: O, b: 1 })) },
    { h: 'Die Reaktion dahinter', t: 'H₃O⁺ + OH⁻ → 2 H₂O. Am Ende gilt: <b>n(H₃O⁺) = n(OH⁻)</b>. Mit <b>c₁ · V₁ = c₂ · V₂</b> (bei gleicher Protonenzahl) berechnest du die gesuchte Konzentration.',
      f: G.svg(W, 120, T(180, 44, 'H₃O⁺ + OH⁻ → 2 H₂O', { s: 20, b: 1 }) + T(180, 84, 'c₁ · V₁ = c₂ · V₂', { s: 20, b: 1, c: N })) }
  ], 'Neutralisationstitration: Maßlösung bis zum Äquivalenzpunkt zugeben, daraus c berechnen.');

  function tcurve(weak, mark) {
    var s = G.ax(40, 170, 290, 150, 'V(Maßlösung)', 'pH');
    [0, 7, 14].forEach(function (p) { s += T(34, 174 - p * 10, String(p), { a: 'end', s: 10 }); });
    s += L(40, 104, 330, 104, { c: '#cbd5e1', d: '3 3', w: 1.2 });
    s += G.p(weak ? 'M50 130 C60 114 80 112 115 110 C150 108 172 100 178 74 C184 52 200 44 230 40 L320 34' : 'M50 156 L150 148 C170 138 176 110 180 104 C184 98 190 56 210 46 L320 38', { s: B, w: 3.5 });
    return s + (mark || '');
  }
  A('s', 'gk', 'Umschlagpunkt', 'k', ['s6'], [
    { h: 'Wo der Indikator die Farbe wechselt', t: 'Ein <b>Indikator</b> ist selbst eine schwache Säure, deren Säure- und Basenform <b>verschiedene Farben</b> haben. Beim <b>Umschlagpunkt</b> wechselt er die Farbe. Bromthymolblau z. B. von <span class="or">gelb</span> (sauer) über <span class="gn">grün</span> zu <span class="bl">blau</span> (basisch).',
      f: G.svg(W, 130, '<defs><linearGradient id="ig1" x1="0" x2="1"><stop offset="0" stop-color="#facc15"/><stop offset=".5" stop-color="#4ade80"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>' + G.r(30, 40, 300, 30, { f: 'url(#ig1)', s: I, rx: 6 }) + T(60, 30, 'pH 6', { s: 12 }) + T(300, 30, 'pH 7,6', { s: 12 }) + T(180, 30, 'Umschlagbereich', { s: 12, b: 1 }) + T(180, 100, 'Der Farbwechsel ist ein Bereich, nicht ein einzelner Wert.', { s: 12, c: '#475569' })) },
    { h: 'Der richtige Indikator', t: 'Der Umschlagpunkt sollte <b>beim Äquivalenzpunkt</b> liegen, sonst hört man zu früh oder zu spät auf. Bei der Titration einer starken Säure mit starker Base (ÄP bei pH 7) passt Bromthymolblau gut.',
      f: G.svg(W, 190, tcurve(false) + G.r(176, 84, 12, 40, { f: '#4ade80', s: N, op: .6 }) + T(250, 100, 'Umschlag-', { s: 11, b: 1, c: N, a: 'start' }) + T(250, 114, 'bereich', { s: 11, b: 1, c: N, a: 'start' })) }
  ], 'Umschlagpunkt: Der Indikator wechselt die Farbe. Er sollte beim Äquivalenzpunkt liegen.');
  A('s', 'gk', 'Äquivalenzpunkt', 'k', ['s6'], [
    { h: 'Genau neutralisiert', t: 'Am <b>Äquivalenzpunkt</b> ist so viel Base zugegeben worden, dass die Stoffmenge der Base <b>genau gleich</b> der Stoffmenge der Säure ist: n(OH⁻) = n(H₃O⁺). In der Titrationskurve ist er der Punkt des <b>steilsten Anstiegs</b> (Sprung).',
      f: G.svg(W, 190, tcurve(false, G.c(180, 104, 6, { f: R, s: R }) + T(210, 130, 'Äquivalenzpunkt', { c: R, b: 1, s: 12, a: 'start' }) + G.ar(208, 126, 186, 108, { c: R, w: 1.6 }))) },
    { h: 'Äquivalenz ≠ Neutral', t: 'Bei starker Säure und starker Base liegt der ÄP bei pH 7. Bei einer <b>schwachen Säure</b> liegt er im <b>basischen</b> Bereich, weil das entstehende Salz basisch reagiert. Der Äquivalenzpunkt ist also nicht automatisch pH 7.',
      f: G.svg(W, 190, tcurve(true, G.c(180, 74, 6, { f: R, s: R }) + T(210, 70, 'ÄP bei pH ≈ 9', { c: R, b: 1, s: 12, a: 'start' }))) }
  ], 'Äquivalenzpunkt: n(Säure) = n(Base). Er liegt nicht immer bei pH 7.');

  /* LK */
  A('s', 'lk', 'Neutralpunkt', 'k', ['s11'], [
    { h: 'pH 7 bei 25 °C', t: 'Der <b>Neutralpunkt</b> ist der Punkt, an dem die Lösung <b>neutral</b> ist: c(H₃O⁺) = c(OH⁻) (pH 7 bei 25 °C). In der Titrationskurve einer <b>schwachen Säure</b> liegt er <b>vor</b> dem Äquivalenzpunkt.',
      f: G.svg(W, 190, tcurve(true, G.c(168, 104, 6, { f: B, s: B }) + T(56, 94, 'Neutralpunkt (pH 7)', { c: B, b: 1, s: 11, a: 'start' }) + G.c(180, 74, 5, { f: R, s: R }) + T(210, 70, 'ÄP', { c: R, b: 1, s: 12, a: 'start' }))) }
  ], 'Neutralpunkt: pH 7 (25 °C). Äquivalenzpunkt und Neutralpunkt fallen bei schwachen Säuren nicht zusammen.');
  A('s', 'lk', 'Halbäquivalenzpunkt', 'k', ['s11', 's12'], [
    { h: 'Halb neutralisiert', t: 'Am <b>Halbäquivalenzpunkt</b> ist die Hälfte der schwachen Säure zu ihrer Base reagiert: c(HA) = c(A⁻). Dann gilt <b>pH = pKₛ</b>. Der Punkt liegt mitten im flachen Bereich der Kurve (Pufferbereich).',
      f: G.svg(W, 190, tcurve(true, G.c(115, 110, 6, { f: R, s: R }) + T(120, 140, 'Halbäquivalenzpunkt', { c: R, b: 1, s: 11, a: 'start' }) + T(120, 154, 'pH = pKₛ', { c: R, b: 1, s: 11, a: 'start' }))) }
  ], 'Halbäquivalenzpunkt: c(HA) = c(A⁻), pH = pKₛ.');
  A('s', 'lk', 'Ligand, Zentralteilchen', 'k', ['s10'], [
    { h: 'Ein Komplex-Ion', t: 'In einem <b>Komplex</b> sitzt in der Mitte ein <b>Zentralteilchen</b> (meist ein Metall-Ion, z. B. Al³⁺). Drumherum sind <b>Liganden</b> gebunden, Teilchen mit freien Elektronenpaaren, z. B. H₂O. Man schreibt [Al(H₂O)₆]³⁺.',
      f: G.svg(W, 190, G.c(180, 95, 22, { f: '#fde68a', s: O, w: 2.4 }) + T(180, 101, 'Al³⁺', { b: 1, s: 14 }) + [[180, 36], [180, 154], [118, 95], [242, 95], [136, 52], [224, 138]].map(function (p) { return L(180 + (p[0] - 180) * .35, 95 + (p[1] - 95) * .35, 180 + (p[0] - 180) * .7, 95 + (p[1] - 95) * .7, { w: 2.5 }) + G.c(p[0], p[1], 15, { f: '#dbeafe', s: B }) + T(p[0], p[1] + 4, 'H₂O', { s: 9, b: 1 }); }).join('') + T(300, 60, 'Liganden', { c: B, b: 1, s: 12 }) + T(300, 160, 'Zentralteilchen', { c: O, b: 1, s: 12, a: 'middle' })) },
    { h: 'Warum Salzlösungen sauer sein können', t: 'Das stark positive Al³⁺ zieht die Elektronen der Wasser-Liganden an. Dadurch geben diese leichter ein <b>H⁺</b> ab: [Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅OH]²⁺ + H₃O⁺. Die Lösung reagiert <b>sauer</b>.',
      f: G.svg(W, 120, T(180, 50, '[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅OH]²⁺ + H₃O⁺', { s: 14, b: 1 }) + T(180, 86, '→ saure Salzlösung', { s: 13, c: R, b: 1 })) }
  ], 'Komplex: Zentralteilchen + Liganden (mit freien Elektronenpaaren).');
  A('s', 'lk', 'koordinative Bindung', 'k', ['s10'], [
    { h: 'Beide Elektronen vom Ligand', t: 'Bei der <b>koordinativen Bindung</b> stammt das <b>bindende Elektronenpaar komplett von einem Partner</b>: dem Liganden. Das Zentralteilchen (z. B. Metall-Ion) stellt nur die leere Stelle. Auch im H₃O⁺ ist die O–H-Bindung zum angelagerten H⁺ so entstanden.',
      f: G.svg(W, 140, T(60, 68, 'H₂O', { s: 22, b: 1, c: B }) + T(60, 50, '··', { c: R, b: 1, s: 18 }) + G.ar(98, 62, 200, 62, { c: R, w: 3 }) + T(250, 68, 'Mⁿ⁺', { s: 22, b: 1, c: O }) + T(150, 50, 'Elektronenpaar', { c: R, b: 1, s: 11 }) + T(180, 110, 'Ligand → Zentralteilchen', { s: 12, c: '#475569' })) }
  ], 'Koordinative Bindung: Das Elektronenpaar stammt allein vom Liganden.');

  /* Indikatorfarbstoffe, Struktur (Kolbi) */
  function chain(n, x0, y, dx, lone) { var s = '', i, up = true, px = x0, py = y; for (i = 0; i < 2 * n; i++) { var nx = px + dx, ny = y + (i % 2 ? 0 : -14); if (i === 0) { py = y; } s += L(px, py, nx, ny, { w: 2.6 }); if (i % 2 === 0) { var vx = nx - px, vy = ny - py, l = Math.sqrt(vx * vx + vy * vy); s += L(px + (-vy / l) * 4, py + (vx / l) * 4, nx + (-vy / l) * 4, ny + (vx / l) * 4, { w: 2.6 }); } px = nx; py = ny; } return s; }
  A('i', 'lk', 'konjugiertes Doppelbindungssystem', 'k', ['i3'], [
    { h: 'Doppelbindung, Einfachbindung, Doppelbindung …', t: 'Ein <b>konjugiertes</b> System hat <b>abwechselnd</b> Doppel- und Einfachbindungen: C=C–C=C–C=C. Die π-Elektronen sind dann nicht mehr auf zwei C-Atome beschränkt, sondern über die ganze Kette <b>verteilt</b>.',
      f: G.svg(W, 130, chain(3, 36, 70, 40) + T(180, 114, 'C=C–C=C–C=C: konjugiert', { s: 12, b: 1 }) + G.p('M30 56 C60 36 120 36 150 56', { s: R, w: 1.5, d: '3 3' })) },
    { h: 'Je länger, desto langwelliger', t: 'Je größer das konjugierte System, desto <b>kleiner</b> der Abstand der Energiestufen (HOMO–LUMO) und desto <b>langwelliger</b> das absorbierte Licht. Ab etwa 7 bis 8 konjugierten C=C-Bindungen absorbiert ein Stoff <b>sichtbares Licht</b> und ist farbig.',
      f: G.svg(W, 170, [['1 C=C', 'UV', '#e2e8f0'], ['4 C=C', 'UV', '#e2e8f0'], ['8 C=C', 'gelb', '#fde047'], ['11 C=C', 'orange', '#fb923c']].map(function (u, i) { return G.r(14 + i * 86, 28, 76, 64, { f: u[2], s: I }) + T(52 + i * 86, 56, u[0], { b: 1, s: 13 }) + T(52 + i * 86, 78, u[1], { s: 12 }); }).join('') + T(180, 124, 'mehr C=C → kleinere Energielücke → Farbe', { s: 12, b: 1, c: V })) }
  ], 'Konjugation = abwechselnde Doppel-/Einfachbindungen. Je größer das System, desto langwelliger die Absorption.');
  A('i', 'lk', 'delokalisierte π-Elektronen', 'k', ['i3'], [
    { h: 'Elektronen, die nicht festsitzen', t: 'Im Benzol (und in jeder konjugierten Kette) gehören die π-Elektronen nicht zu einer bestimmten Bindung. Sie sind über das <b>ganze System verteilt</b>: <b>delokalisiert</b>. Das stabilisiert das Molekül und senkt die Anregungsenergie.',
      f: G.svg(W, 190, G.benz(110, 95, 54) + T(110, 175, 'Kekulé-Formel', { s: 12 }) + G.benz(260, 95, 54, { circle: 1 }) + T(260, 175, 'Kreis = delokalisiert', { s: 12, c: V, b: 1 }) + T(185, 100, '⟷', { s: 26, c: O })) }
  ], 'Delokalisierte π-Elektronen sind über das gesamte konjugierte System verteilt.');
  A('i', 'lk', 'mesomere Effekte', 'k', ['i3', 'i5'], [
    { h: 'Grenzformeln', t: 'Wenn sich ein Molekül mit <b>einer</b> Lewis-Formel nicht richtig beschreiben lässt, zeichnet man mehrere <b>Grenzformeln</b>, verbunden durch den <b>Mesomeriepfeil ⟷</b>. Die Wirklichkeit liegt dazwischen. Die Mesomerie liefert die Delokalisierung.',
      f: G.svg(W, 150, T(80, 56, 'H₂N–CH=CH₂', { s: 17, b: 1 }) + T(180, 56, '⟷', { s: 26, c: O }) + T(280, 56, 'H₂N⁺=CH–CH₂⁻', { s: 15, b: 1 }) + T(180, 110, 'Elektronenpaar des N wandert in das System', { s: 12, c: '#475569' })) },
    { h: '+M und −M', t: 'Substituenten mit <b>freiem Elektronenpaar</b> (–NH₂, –OH, –OCH₃) geben Elektronen ins System: <b>+M-Effekt</b> (Donator). Substituenten mit Mehrfachbindung, die Elektronen ziehen (–NO₂, –C=O, –CN), haben einen <b>−M-Effekt</b> (Akzeptor).',
      f: G.svg(W, 130, G.bub(14, 30, 152, 54, '+M: Donator', { f: '#dcfce7', s: N, b: 1 }) + T(90, 104, '–NH₂ –OH –OCH₃', { s: 12 }) + G.bub(194, 30, 152, 54, '−M: Akzeptor', { f: '#fee2e2', s: R, b: 1 }) + T(270, 104, '–NO₂ –CN –C=O', { s: 12 })) }
  ], 'Mesomerie: Delokalisierung beschrieben durch Grenzformeln. +M = Donator, −M = Akzeptor.');
  A('i', 'lk', 'Chromophor, auxochrome und antiauxochrome Gruppen', 'k', ['i5', 'i6'], [
    { h: 'Wer macht die Farbe?', t: 'Der <b>Chromophor</b> ist das konjugierte System, das die Farbe trägt. <b>Auxochrome</b> Gruppen (Donatoren, +M/+I, z. B. –NH₂) und <b>antiauxochrome</b> Gruppen (Akzeptoren, −M/−I, z. B. –NO₂) verändern die Lage der Absorption.',
      f: G.svg(W, 150, T(180, 28, 'Auxochrom  –  Chromophor  –  Antiauxochrom', { s: 13, b: 1 }) + G.bub(10, 46, 90, 40, '–NH₂', { f: '#dcfce7', s: N, b: 1 }) + G.bub(126, 46, 108, 40, 'C=C–C=C–C=C', { f: '#fef3c7', s: O, b: 1, fs: 12 }) + G.bub(260, 46, 90, 40, '–NO₂', { f: '#fee2e2', s: R, b: 1 }) + T(55, 106, 'Donator (+M)', { s: 11, c: N }) + T(180, 106, 'Chromophor', { s: 11, c: O }) + T(305, 106, 'Akzeptor (−M)', { s: 11, c: R }) + T(180, 136, 'Der Chromophor allein reicht oft nicht, die Gruppen verfeinern die Farbe.', { s: 10, c: '#475569' })) }
  ], 'Chromophor = Farbträger (konjugiertes System). Auxochrom: Donator. Antiauxochrom: Akzeptor.');
  A('i', 'lk', 'bathochromer und hypsochromer Effekt', 'k', ['i5'], [
    { h: 'Verschiebung der Absorption', t: '<b>Bathochrom</b> (griech. „tiefer“): Die Absorption verschiebt sich zu <b>größeren Wellenlängen</b>, die Farbe vertieft sich Richtung Rot. <b>Hypsochrom</b> („höher“): zu <b>kleineren Wellenlängen</b>, Richtung Blau/UV. Auxochrome wirken meist bathochrom.',
      f: G.svg(W, 150, '<defs><linearGradient id="ig2" x1="0" x2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset=".2" stop-color="#3b82f6"/><stop offset=".4" stop-color="#22c55e"/><stop offset=".6" stop-color="#facc15"/><stop offset=".8" stop-color="#f97316"/><stop offset="1" stop-color="#dc2626"/></linearGradient></defs>' + G.r(30, 50, 300, 26, { f: 'url(#ig2)', s: I, rx: 4 }) + T(30, 40, '400 nm', { s: 11, a: 'start' }) + T(330, 40, '700 nm', { s: 11, a: 'end' }) + G.ar(130, 100, 70, 100, { c: B, w: 2.6 }) + T(100, 120, 'hypsochrom', { c: B, b: 1, s: 12 }) + G.ar(230, 100, 290, 100, { c: R, w: 2.6 }) + T(260, 120, 'bathochrom', { c: R, b: 1, s: 12 })) }
  ], 'Bathochrom: Absorption zu größerem λ. Hypsochrom: zu kleinerem λ.');
  A('i', 'lk', 'Indikatorsäure und -base', 'k', ['i7'], [
    { h: 'Zwei Formen, zwei Farben', t: 'Ein Indikator ist selbst eine <b>schwache Säure HInd</b>. Seine Säure- und Basenform (<b>Ind⁻</b>) haben <b>verschiedene Farben</b>, weil durch die Protonenabgabe das delokalisierte System verändert wird. Beispiel Phenolphthalein: farblos (HInd) ⇌ rosa (Ind⁻).',
      f: G.svg(W, 150, G.bub(14, 40, 120, 50, 'HInd', { f: '#f1f5f9', s: GRY(), b: 1 }) + T(74, 108, 'Indikatorsäure, farblos', { s: 11 }) + G.ar(140, 58, 220, 58, { c: R }) + T(180, 48, '− H⁺', { c: R, b: 1, s: 11 }) + G.ar(220, 74, 140, 74, { c: B }) + T(180, 92, '+ H⁺', { c: B, b: 1, s: 11 }) + G.bub(226, 40, 120, 50, 'Ind⁻', { f: '#fbcfe8', s: '#db2777', b: 1 }) + T(286, 108, 'Indikatorbase, rosa', { s: 11 })) },
    { h: 'Warum ändert sich die Farbe?', t: 'Nach der H⁺-Abgabe ändert sich das <b>konjugierte System</b> (es wird größer oder die Ladung verteilt sich neu). Damit ändert sich die <b>Anregungsenergie</b> und die Lage der Absorption im Spektrum. Das Licht, das übrig bleibt, hat eine andere Farbe.',
      f: G.svg(W, 120, T(180, 44, 'Protonenabgabe → anderes π-System', { s: 15, b: 1 }) + T(180, 70, '→ anderes λmax → andere Farbe', { s: 15, b: 1, c: V }) + T(180, 100, 'Farbwechsel = Veränderung der Konjugation', { s: 11, c: '#475569' })) }
  ], 'Indikator: schwache Säure HInd/Ind⁻ mit zwei Farben, weil sich das π-System durch die H⁺-Abgabe ändert.');
  function GRY() { return '#94a3b8'; }
})();
