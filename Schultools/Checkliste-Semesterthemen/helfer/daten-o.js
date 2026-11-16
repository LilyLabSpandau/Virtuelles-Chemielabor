/* Erklärfolien Redoxreaktionen (Hugo) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  function atom(x, y, lab, col, r) { return G.c(x, y, r || 18, { f: col, s: I }) + T(x, y + 5, lab, { b: 1, s: 13 }); }
  function el(x, y) { return G.c(x, y, 5, { f: '#fde047', s: I, w: 1.2 }) + T(x, y + 3.5, '−', { s: 9, b: 1 }); }

  A('o', 'gk', 'Elektronengas, Valenzelektronen', 'h', ['o1'], [
    { h: 'Metalle: Ionen im Elektronenmeer', t: 'Im Metall geben die Atome ihre <b>Valenzelektronen</b> (Außenelektronen) ab. Es bleiben positive <b>Atomrümpfe</b> im Gitter, umgeben von frei beweglichen Elektronen, dem <b>Elektronengas</b>. Das hält das Metall zusammen (Metallbindung).',
      f: G.svg(W, 170, G.r(30, 20, 300, 120, { f: '#fef9c3', s: '#ca8a04', w: 1.5 }) + [0, 1, 2, 3].map(function (c) { return [0, 1, 2].map(function (r) { return G.c(70 + c * 76, 46 + r * 38, 14, { f: '#93c5fd', s: B }) + T(70 + c * 76, 51 + r * 38, '+', { b: 1, s: 13 }); }).join(''); }).join('') + [[108, 66], [184, 84], [262, 66], [146, 122], [224, 122], [300, 84]].map(function (p) { return el(p[0], p[1]); }).join('') + T(180, 160, '+ Atomrümpfe     − frei bewegliche Elektronen', { s: 11 })) },
    { h: 'Was folgt daraus?', t: 'Weil die Elektronen frei beweglich sind, leiten Metalle <b>Strom</b> und <b>Wärme</b>. Weil sich die Ionen im Elektronenmeer verschieben lassen, sind Metalle <b>verformbar</b>. Und die Elektronen reflektieren Licht: <b>Metallglanz</b>.',
      f: G.svg(W, 110, [['⚡', 'Strom'], ['🔥', 'Wärme'], ['🔨', 'verformbar'], ['✨', 'Glanz']].map(function (u, i) { var x = 12 + i * 86; return G.r(x, 12, 76, 80, { f: '#f8fafc', s: I }) + T(x + 38, 52, u[0], { s: 26 }) + T(x + 38, 80, u[1], { s: 11, b: 1 }); }).join('')) }
  ], 'Metall = Atomrümpfe + frei bewegliche Valenzelektronen (Elektronengas).');

  A('o', 'gk', 'Oxidation, Reduktion', 'h', ['o3', 'o5'], [
    { h: 'Elektronen wandern', t: '<b>Oxidation</b> = Abgabe von Elektronen. <b>Reduktion</b> = Aufnahme von Elektronen. Beides passiert <b>immer gleichzeitig</b>: Eine Redoxreaktion ist ein Elektronenübergang. Merkhilfe: <b>OIL RIG</b> (Oxidation Is Loss, Reduction Is Gain).',
      f: G.svg(W, 170, atom(70, 70, 'Zn', '#e2e8f0') + atom(290, 70, 'Cu²⁺', '#fed7aa', 22) + G.ar(104, 60, 252, 60, { c: '#ca8a04', w: 3 }) + el(170, 60) + el(190, 60) + T(180, 44, '2 e⁻', { b: 1, s: 12, c: '#a16207' }) + T(70, 112, 'Oxidation', { b: 1, c: R, s: 13 }) + T(70, 130, 'Zn → Zn²⁺ + 2 e⁻', { s: 11 }) + T(290, 112, 'Reduktion', { b: 1, c: B, s: 13 }) + T(290, 130, 'Cu²⁺ + 2 e⁻ → Cu', { s: 11 })) },
    { h: 'Sauerstoff war nur der Anfang', t: 'Früher nannte man nur die Aufnahme von Sauerstoff „Oxidation“ (2 Mg + O₂ → 2 MgO). Heute weißt du: Mg gibt Elektronen an O ab, <b>der Elektronenübergang</b> ist das Entscheidende. Darum gibt es auch Redoxreaktionen ganz ohne Sauerstoff (z. B. Na + Cl₂).',
      f: G.svg(W, 120, T(180, 40, '2 Mg + O₂ → 2 MgO', { s: 20, b: 1 }) + T(180, 70, 'Mg → Mg²⁺ + 2 e⁻   (Oxidation)', { s: 12, c: R, b: 1 }) + T(180, 92, 'O₂ + 4 e⁻ → 2 O²⁻   (Reduktion)', { s: 12, c: B, b: 1 })) }
  ], 'Oxidation = Elektronenabgabe, Reduktion = Elektronenaufnahme (immer gemeinsam).');

  A('o', 'gk', 'korrespondierende Redoxpaare', 'h', ['o3', 'o6'], [
    { h: 'Zwei Seiten einer Medaille', t: 'Jede Teilgleichung beschreibt ein <b>Redoxpaar</b>: die <b>reduzierte Form</b> (gibt Elektronen ab) und die <b>oxidierte Form</b> (nimmt Elektronen auf). Sie gehören zusammen: Red ⇌ Ox + z e⁻. Beispiel: Zn / Zn²⁺.',
      f: G.svg(W, 150, G.bub(20, 40, 120, 50, 'Zn (Red)', { f: '#e2e8f0', s: I, b: 1 }) + G.bub(220, 40, 120, 50, 'Zn²⁺ (Ox)', { f: '#fed7aa', s: O, b: 1 }) + G.ar(146, 54, 214, 54, { c: R }) + T(180, 46, '− 2 e⁻', { s: 11, b: 1, c: R }) + G.ar(214, 76, 146, 76, { c: B }) + T(180, 94, '+ 2 e⁻', { s: 11, b: 1, c: B }) + T(180, 130, 'Redoxpaar Zn / Zn²⁺', { s: 12 })) },
    { h: 'Eine Redoxreaktion = zwei Paare', t: 'Bei der Reaktion Zn + Cu²⁺ → Zn²⁺ + Cu treffen <b>zwei Redoxpaare</b> aufeinander: Zn/Zn²⁺ und Cu/Cu²⁺. Das Paar mit der stärkeren Neigung zur Elektronenabgabe wird oxidiert.',
      f: G.svg(W, 130, G.bub(14, 20, 150, 44, 'Zn / Zn²⁺', { f: '#f8fafc', s: I, b: 1 }) + G.bub(196, 20, 150, 44, 'Cu / Cu²⁺', { f: '#f8fafc', s: I, b: 1 }) + G.ar(170, 42, 190, 42, { c: '#ca8a04' }) + T(180, 100, 'Elektronen fließen von Zn zu Cu²⁺', { s: 12, c: '#475569' })) }
  ], 'Redoxpaar: Red ⇌ Ox + z e⁻. Eine Redoxreaktion verbindet zwei Paare.');

  A('o', 'gk', 'Oxidationsmittel, Reduktionsmittel', 'h', ['o3', 'o2'], [
    { h: 'Wer oxidiert, wird selbst reduziert', t: 'Das <b>Oxidationsmittel</b> nimmt Elektronen auf und oxidiert dadurch den Partner; es wird dabei selbst <b>reduziert</b>. Das <b>Reduktionsmittel</b> gibt Elektronen ab, reduziert den Partner und wird selbst <b>oxidiert</b>.',
      f: G.svg(W, 150, G.bub(14, 20, 150, 50, 'Reduktionsmittel', { f: '#fee2e2', s: R, b: 1 }) + T(89, 90, 'gibt e⁻ ab → wird oxidiert', { s: 11 }) + G.bub(196, 20, 150, 50, 'Oxidationsmittel', { f: '#dbeafe', s: B, b: 1 }) + T(271, 90, 'nimmt e⁻ auf → wird reduziert', { s: 11 }) + G.ar(166, 44, 192, 44, { c: '#ca8a04', w: 3 }) + T(89, 130, 'z. B. Zn', { s: 12, c: '#475569' }) + T(271, 130, 'z. B. Cu²⁺', { s: 12, c: '#475569' })) },
    { h: 'Starke und schwache', t: 'In der <b>Redoxreihe</b> sind unedle Metalle (Zn, Mg) gute Reduktionsmittel, edle Metall-Ionen (Ag⁺, Cu²⁺) gute Oxidationsmittel. Darum gewinnt man Metalle aus Erzen mit einem stärkeren Reduktionsmittel (z. B. Koks).',
      f: G.svg(W, 150, G.ar(40, 20, 40, 130, { c: I }) + T(55, 28, 'Mg  stark reduzierend', { s: 12, a: 'start', c: R, b: 1 }) + T(55, 56, 'Zn', { s: 12, a: 'start' }) + T(55, 84, 'Cu', { s: 12, a: 'start' }) + T(55, 112, 'Ag', { s: 12, a: 'start' }) + T(150, 132, 'Ag⁺ stark oxidierend', { s: 12, a: 'start', c: B, b: 1 })) }
  ], 'Oxidationsmittel nimmt e⁻ auf (wird reduziert); Reduktionsmittel gibt e⁻ ab (wird oxidiert).');

  A('o', 'gk', 'Elektronen-Donator, Elektronen-Akzeptor', 'h', ['o3'], [
    { h: 'Geber und Nehmer', t: 'Das ist dasselbe Prinzip, nur anders benannt: Der <b>Donator</b> gibt Elektronen ab (= Reduktionsmittel), der <b>Akzeptor</b> nimmt sie auf (= Oxidationsmittel). Wie beim Protonenübertrag (Säure-Base) wird hier etwas „weitergereicht“, nur sind es Elektronen.',
      f: G.svg(W, 140, G.bub(14, 30, 130, 50, 'Donator', { f: '#fee2e2', s: R, b: 1 }) + G.bub(216, 30, 130, 50, 'Akzeptor', { f: '#dbeafe', s: B, b: 1 }) + G.ar(150, 55, 210, 55, { c: '#ca8a04', w: 3 }) + el(172, 46) + el(188, 46) + T(79, 100, '= Reduktionsmittel', { s: 11 }) + T(281, 100, '= Oxidationsmittel', { s: 11 })) }
  ], 'Donator = Reduktionsmittel (gibt e⁻), Akzeptor = Oxidationsmittel (nimmt e⁻).');

  A('o', 'gk', 'Oxidationszahl', 'h', ['o4', 'o5', 'o7'], [
    { h: 'Ein Buchhaltungs-Trick', t: 'Die <b>Oxidationszahl</b> (OZ) ist die gedachte Ladung eines Atoms, wenn man alle Bindungselektronen dem <b>elektronegativeren</b> Partner zuweist. So kannst du Elektronenübergänge auch bei Molekülen verfolgen. Beispiel H₂O: O bekommt beide Paare → <b>O: −II</b>, H: +I.',
      f: G.svg(W, 150, G.c(180, 56, 20, { f: '#fecaca', s: R }) + T(180, 62, 'O', { b: 1, s: 16 }) + G.c(130, 100, 14, { f: '#e2e8f0' }) + T(130, 105, 'H', { b: 1 }) + G.c(230, 100, 14, { f: '#e2e8f0' }) + T(230, 105, 'H', { b: 1 }) + L(168, 74, 138, 90, { w: 3 }) + L(192, 74, 222, 90, { w: 3 }) + T(180, 26, '−II', { c: R, b: 1, s: 16 }) + T(104, 126, '+I', { c: B, b: 1, s: 16 }) + T(256, 126, '+I', { c: B, b: 1, s: 16 })) },
    { h: 'Die Regeln', t: '<b>Elemente: 0</b> (Na, O₂). <b>Einatomige Ionen:</b> Ladung (Mg²⁺: +II). <b>Fluor:</b> immer −I. <b>Wasserstoff:</b> meist +I. <b>Sauerstoff:</b> meist −II. <b>Summe</b> aller OZ = Ladung des Teilchens (Molekül: 0).',
      f: G.svg(W, 170, [['Element', '0'], ['Ion Mg²⁺', '+II'], ['Fluor', '−I'], ['H (meist)', '+I'], ['O (meist)', '−II'], ['Summe', '= Ladung']].map(function (u, i) { var x = 12 + (i % 3) * 116, y = 14 + Math.floor(i / 3) * 70; return G.r(x, y, 106, 58, { f: '#f8fafc', s: I }) + T(x + 53, y + 24, u[0], { s: 11 }) + T(x + 53, y + 46, u[1], { s: 16, b: 1, c: V }); }).join('')) },
    { h: 'Rechenbeispiel Permanganat', t: 'MnO₄⁻: 4 O = 4 · (−II) = −8. Gesamtladung −1. Also muss Mn <b>+VII</b> sein (+7 − 8 = −1). Steigt die OZ eines Atoms, wird es <b>oxidiert</b>; sinkt sie, wird es <b>reduziert</b>.',
      f: G.svg(W, 130, T(180, 40, 'MnO₄⁻:  x + 4·(−2) = −1', { s: 17, b: 1 }) + T(180, 76, 'x = +7', { s: 22, b: 1, c: V }) + T(180, 108, 'OZ ↑ Oxidation   ·   OZ ↓ Reduktion', { s: 12, c: '#475569' })) }
  ], 'Oxidationszahl = gedachte Ladung; OZ steigt → Oxidation, sinkt → Reduktion.');

  A('o', 'lk', 'Disproportionierung', 'h', ['o8'], [
    { h: 'Einer wird zu zwei', t: 'Bei der <b>Disproportionierung</b> wird <b>dasselbe Element</b> gleichzeitig oxidiert und reduziert: Aus einer mittleren OZ entstehen eine höhere und eine tiefere. Beispiel: Cl₂ + 2 OH⁻ → Cl⁻ + OCl⁻ + H₂O.',
      f: G.svg(W, 150, G.bub(120, 10, 120, 40, 'Cl₂  (0)', { f: '#f1f5f9', s: I, b: 1 }) + G.ar(150, 54, 100, 92, { c: B }) + G.ar(210, 54, 260, 92, { c: R }) + G.bub(30, 96, 140, 40, 'Cl⁻  (−I)', { f: '#dbeafe', s: B, b: 1 }) + G.bub(190, 96, 140, 40, 'OCl⁻  (+I)', { f: '#fee2e2', s: R, b: 1 }) + T(84, 76, 'reduziert', { s: 11, c: B, b: 1 }) + T(276, 76, 'oxidiert', { s: 11, c: R, b: 1 })) }
  ], 'Disproportionierung: Dasselbe Element wird oxidiert und reduziert.');
  A('o', 'lk', 'Synproportionierung', 'h', ['o8'], [
    { h: 'Zwei werden zu einem', t: 'Das Gegenteil: Bei der <b>Synproportionierung</b> reagieren zwei Teilchen desselben Elements mit <b>verschiedener OZ</b> zu einer mittleren OZ. Beispiel: 5 I⁻ + IO₃⁻ + 6 H⁺ → 3 I₂ + 3 H₂O (−I und +V → 0).',
      f: G.svg(W, 150, G.bub(30, 10, 140, 40, 'I⁻  (−I)', { f: '#dbeafe', s: B, b: 1 }) + G.bub(190, 10, 140, 40, 'IO₃⁻  (+V)', { f: '#fee2e2', s: R, b: 1 }) + G.ar(100, 54, 150, 92, { c: B }) + G.ar(260, 54, 210, 92, { c: R }) + G.bub(120, 96, 120, 40, 'I₂  (0)', { f: '#f1f5f9', s: I, b: 1 })) }
  ], 'Synproportionierung: zwei OZ desselben Elements → eine mittlere OZ.');
})();
