/* Erklärfolien Elektrochemie (Hugo) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  function el(x, y) { return G.c(x, y, 5, { f: '#fde047', s: I, w: 1.2 }) + T(x, y + 3.5, '−', { s: 9, b: 1 }); }
  function halbzelle(x, name, col, ionCol, lbl) {
    return G.beaker(x, 70, 90, 80, ionCol, { lvl: .75 }) + G.r(x + 38, 30, 14, 100, { f: col, s: I }) + T(x + 45, 168, lbl, { s: 11 });
  }
  function daniell(sig) {
    var s = halbzelle(30, 'Zn', '#cbd5e1', '#e2e8f0', 'Zn in ZnSO₄-Lösung') + halbzelle(240, 'Cu', '#fdba74', '#bfdbfe', 'Cu in CuSO₄-Lösung');
    s += G.p('M75 30 V10 H285 V30', { s: I, w: 2.4 }) + G.c(180, 10, 14, { f: '#fff', s: I }) + T(180, 15, 'V', { b: 1, s: 14 });
    s += G.p('M100 80 V56 H260 V80', { s: '#94a3b8', w: 9 }) + T(180, 78, 'Salzbrücke', { s: 10, c: '#475569' });
    if (sig) s += G.ar(90, 26, 134, 26, { c: '#ca8a04', w: 2.4 }) + T(112, 42, 'e⁻', { s: 11, b: 1, c: '#a16207' }) + T(95, 192, 'Zn → Zn²⁺ + 2e⁻', { s: 10, c: R, b: 1 }) + T(285, 192, 'Cu²⁺ + 2e⁻ → Cu', { s: 10, c: B, b: 1 });
    return G.svg(W, 200, s);
  }
  A('e', 'gk', 'elektrochemische Doppelschicht', 'h', ['e1', 'e2'], [
    { h: 'Was passiert am Metallstab?', t: 'Taucht ein Metall (z. B. Zink) in Wasser oder in eine Salzlösung, gehen <b>Metall-Ionen in Lösung</b> und lassen Elektronen im Metall zurück. Der Stab wird <b>negativ</b> geladen, die Lösung nahe der Oberfläche <b>positiv</b>.',
      f: G.svg(W, 170, G.r(40, 20, 50, 130, { f: '#cbd5e1', s: I }) + T(65, 90, 'Zn', { b: 1, s: 15 }) + G.r(90, 20, 230, 130, { f: '#eff6ff', s: 'none' }) + [40, 70, 100, 130].map(function (y) { return el(76, y) + G.c(106, y, 9, { f: '#fed7aa', s: O }) + T(106, y + 4, '+', { b: 1, s: 12 }); }).join('') + G.ar(124, 70, 162, 70, { c: GRY0() }) + T(230, 70, 'Zn → Zn²⁺ + 2 e⁻', { s: 12, b: 1 }) + T(230, 94, '(Ionen lösen sich)', { s: 11, c: '#475569' })) },
    { h: 'Zwei Schichten = Doppelschicht', t: 'So entstehen zwei geladene Schichten gegenüber: Elektronen im Metall (−) und Ionen in der Lösung (+). Das ist die <b>elektrochemische Doppelschicht</b>. Zwischen den Schichten herrscht eine <b>Spannung (Potenzial)</b>, die man allein aber nicht messen kann.',
      f: G.svg(W, 170, G.r(40, 20, 80, 130, { f: '#cbd5e1', s: I }) + T(80, 90, 'Metall', { s: 12, b: 1 }) + [40, 70, 100, 130].map(function (y) { return el(110, y) + G.c(140, y, 9, { f: '#fed7aa', s: O }) + T(140, y + 4, '+', { b: 1, s: 12 }); }).join('') + L(125, 14, 125, 156, { c: R, w: 1.6, d: '4 3' }) + T(260, 56, 'negative Schicht', { s: 11, b: 1, c: B, a: 'middle' }) + T(260, 80, 'positive Schicht', { s: 11, b: 1, c: O }) + T(260, 120, 'ergibt eine Spannung', { s: 11, c: '#475569' })) }
  ], 'Doppelschicht: negative Metallschicht gegenüber positiver Ionenschicht → Potenzial.');
  function GRY0() { return '#94a3b8'; }

  A('e', 'gk', 'elektrochemische Elektrode', 'h', ['e1', 'e2'], [
    { h: 'Elektrode = Metall + Lösung', t: 'Eine <b>Elektrode</b> besteht aus einem Elektronenleiter (Metallstab) und einem Elektrolyten (Lösung), in der das Metall und seine Ionen vorkommen. Beispiel: <b>Zn-Stab in ZnSO₄-Lösung</b> = Zn/Zn²⁺-Elektrode. Sie bildet immer ein Redoxpaar.',
      f: G.svg(W, 170, halbzelle(135, 'Zn', '#cbd5e1', '#e2e8f0', 'Zn/Zn²⁺-Elektrode')) },
    { h: 'Auch Gase und Inertmetalle', t: 'Nicht jedes Redoxpaar hat ein festes Metall: Bei <b>H₂/H⁺</b> leitet ein <b>Platinblech</b> die Elektronen (Platin reagiert selbst nicht), das Gas umspült es. Das ist die <b>Standardwasserstoffelektrode</b>, die Bezugsgröße der Spannungsreihe (0 V).',
      f: G.svg(W, 170, G.beaker(135, 60, 90, 90, '#fef3c7', { lvl: .8 }) + G.r(176, 28, 8, 90, { f: '#e2e8f0', s: I }) + T(180, 20, 'Pt', { s: 12, b: 1 }) + G.ar(150, 10, 170, 60, { c: N }) + T(130, 12, 'H₂ (g)', { s: 11, b: 1, c: N, a: 'end' }) + T(180, 164, 'H⁺ (1 mol/L), 25 °C, 1013 hPa', { s: 10 }) + T(290, 90, 'E⁰ = 0 V', { s: 15, b: 1, c: V })) }
  ], 'Elektrode = Leiter + Elektrolyt (Redoxpaar), z. B. Zn/Zn²⁺ oder die Wasserstoffelektrode.');

  A('e', 'gk', 'Donator- und Akzeptor-Halbzelle', 'h', ['e1', 'e3'], [
    { h: 'Das DANIELL-Element', t: 'Zwei Halbzellen sind über einen <b>Draht</b> (für Elektronen) und eine <b>Salzbrücke</b> (für Ionen) verbunden. Elektronen fließen von der einen Halbzelle zur anderen: Es entsteht eine <b>Spannung</b> (ca. 1,1 V). Das ist eine <b>galvanische Zelle</b>.', f: daniell(false) },
    { h: 'Wer gibt, wer nimmt?', t: 'Die <b>Donator-Halbzelle</b> (Zn) gibt Elektronen ab: Zn → Zn²⁺ + 2 e⁻ (Oxidation, <b>Minuspol</b>). Die <b>Akzeptor-Halbzelle</b> (Cu) nimmt sie auf: Cu²⁺ + 2 e⁻ → Cu (Reduktion, <b>Pluspol</b>). Das unedlere Metall ist der Donator.', f: daniell(true) },
    { h: 'Die Salzbrücke', t: 'Ohne Salzbrücke würde sich die Zn-Halbzelle positiv, die Cu-Halbzelle negativ aufladen und der Strom käme zum Erliegen. Die Brücke <b>gleicht die Ladungen aus</b>, indem Ionen wandern (Anionen zu Zn, Kationen zu Cu).',
      f: G.svg(W, 120, T(180, 30, 'Salzbrücke: Ladungsausgleich', { s: 14, b: 1 }) + G.ar(250, 66, 110, 66, { c: B }) + T(180, 56, 'Anionen →  Zn-Seite', { s: 11, c: B, b: 1 }) + G.ar(110, 94, 250, 94, { c: R }) + T(180, 112, 'Kationen →  Cu-Seite', { s: 11, c: R, b: 1 })) }
  ], 'Donator-Halbzelle: Oxidation (−Pol); Akzeptor-Halbzelle: Reduktion (+Pol).');

  function zelle(kind) {
    var s = G.beaker(100, 60, 160, 100, '#e0f2fe', { lvl: .8 });
    s += G.r(120, 30, 14, 110, { f: '#cbd5e1', s: I }) + G.r(226, 30, 14, 110, { f: '#cbd5e1', s: I });
    var left = kind === 'elektrolyse' ? ['Kathode', '−', B, 'Reduktion'] : ['Anode', '−', R, 'Oxidation'];
    if (kind === 'elektrolyse') {
      s += G.p('M127 30 V14 H180', { s: I, w: 2.2 }) + G.p('M233 30 V14 H180', { s: I, w: 2.2 }) + G.r(160, 4, 40, 20, { f: '#fde68a', s: I }) + T(180, 19, 'U ≥ UZ', { s: 10, b: 1 });
      s += T(127, 178, 'Kathode (−)', { s: 11, b: 1, c: B }) + T(127, 194, 'Reduktion', { s: 10 }) + T(233, 178, 'Anode (+)', { s: 11, b: 1, c: R }) + T(233, 194, 'Oxidation', { s: 10 });
    } else {
      s += G.p('M127 30 V14 H233 V30', { s: I, w: 2.2 }) + G.c(180, 14, 13, { f: '#fff', s: I }) + T(180, 19, 'V', { b: 1, s: 13 });
      s += T(127, 178, 'Anode (−)', { s: 11, b: 1, c: R }) + T(127, 194, 'Oxidation', { s: 10 }) + T(233, 178, 'Kathode (+)', { s: 11, b: 1, c: B }) + T(233, 194, 'Reduktion', { s: 10 });
    }
    return G.svg(W, 200, s);
  }
  A('e', 'gk', 'Kathode, Anode', 'h', ['e1', 'e4', 'e8'], [
    { h: 'Die Regel: An der Anode wird oxidiert', t: 'Definition (immer gültig): An der <b>Anode</b> läuft die <b>Oxidation</b> ab, an der <b>Kathode</b> die <b>Reduktion</b>. Merkhilfe: <b>A</b>node und <b>O</b>xidation fangen mit Vokal an, <b>K</b>athode und <b>R</b>eduktion mit Konsonant.', f: zelle('galv') },
    { h: 'Aber: Pole wechseln', t: 'In der <b>galvanischen Zelle</b> ist die Anode der <b>Minuspol</b>. In der <b>Elektrolyse</b> ist es umgekehrt: Der Strom wird <b>erzwungen</b>, die Anode ist der <b>Pluspol</b> und die Kathode der Minuspol. Die Zuordnung Anode = Oxidation bleibt gleich!', f: zelle('elektrolyse') },
    { h: 'Auf einen Blick', t: 'Merke: Es kommt nie auf das Vorzeichen an, sondern auf die <b>Reaktion</b>. Oxidation → Anode. Reduktion → Kathode.',
      f: G.svg(W, 130, G.r(14, 16, 160, 80, { f: '#f8fafc', s: I }) + T(94, 40, 'Galvanische Zelle', { s: 12, b: 1 }) + T(94, 64, 'Anode −', { s: 12, c: R, b: 1 }) + T(94, 82, 'Kathode +', { s: 12, c: B, b: 1 }) + G.r(186, 16, 160, 80, { f: '#f8fafc', s: I }) + T(266, 40, 'Elektrolyse', { s: 12, b: 1 }) + T(266, 64, 'Anode +', { s: 12, c: R, b: 1 }) + T(266, 82, 'Kathode −', { s: 12, c: B, b: 1 }) + T(180, 120, 'Anode = Oxidation · Kathode = Reduktion', { s: 11, c: '#475569' })) }
  ], 'Anode = Oxidation, Kathode = Reduktion. Galvanische Zelle: Anode −; Elektrolyse: Anode +.');

  A('e', 'gk', 'Elektrolysezelle', 'h', ['e4', 'e8'], [
    { h: 'Strom erzwingt eine Reaktion', t: 'In der <b>Elektrolysezelle</b> legt man eine äußere <b>Gleichspannung</b> an. Dadurch läuft eine Reaktion ab, die <b>nicht freiwillig</b> geschehen würde. Beispiel: ZnBr₂-Lösung → Zn an der Kathode, Br₂ an der Anode.', f: zelle('elektrolyse') },
    { h: 'Energie-Umkehr', t: 'Die galvanische Zelle <b>liefert</b> Energie (freiwillige Reaktion). Die Elektrolysezelle <b>braucht</b> Energie (erzwungene Reaktion). Technisch genutzt zur Gewinnung von Aluminium, Chlor oder Wasserstoff.',
      f: G.svg(W, 130, G.bub(14, 20, 160, 50, 'Galvanische Zelle', { f: '#dcfce7', s: N, b: 1 }) + T(94, 92, 'liefert Strom', { s: 11 }) + T(94, 108, 'freiwillig', { s: 11, b: 1, c: N }) + G.bub(186, 20, 160, 50, 'Elektrolysezelle', { f: '#fee2e2', s: R, b: 1 }) + T(266, 92, 'braucht Strom', { s: 11 }) + T(266, 108, 'erzwungen', { s: 11, b: 1, c: R })) }
  ], 'Elektrolyse: erzwungene Reaktion durch angelegte Gleichspannung.');

  A('e', 'lk', 'Konzentrationszelle', 'h', ['e7'], [
    { h: 'Gleiches Metall, andere Konzentration', t: 'Eine <b>Konzentrationszelle</b> hat zwei gleiche Elektroden (z. B. Cu/Cu²⁺), aber <b>unterschiedliche Konzentrationen</b> der Lösung. Elektronen fließen so, dass sich die Konzentrationen angleichen wollen. Es gibt eine kleine Spannung.',
      f: G.svg(W, 180, G.beaker(30, 80, 90, 80, '#bfdbfe', { lvl: .75 }) + G.r(68, 36, 14, 100, { f: '#fdba74', s: I }) + T(75, 176, 'c = 0,01 mol/L', { s: 10 }) + G.beaker(240, 80, 90, 80, '#60a5fa', { lvl: .75 }) + G.r(278, 36, 14, 100, { f: '#fdba74', s: I }) + T(285, 176, 'c = 1 mol/L', { s: 10 }) + G.p('M75 36 V14 H285 V36', { s: I, w: 2.2 }) + G.c(180, 14, 13, { f: '#fff', s: I }) + T(180, 19, 'V', { b: 1, s: 13 }) + T(180, 84, 'Salzbrücke', { s: 10, c: '#475569' }) + G.p('M100 90 V62 H260 V90', { s: '#94a3b8', w: 8 })) },
    { h: 'NERNST-Gleichung', t: 'Die Spannung wächst mit dem Konzentrationsunterschied. Mit der <b>NERNST-Gleichung</b>: <b>E = E⁰ + (0,059 V / z) · lg( c(Ox) / c(Red) )</b> (bei 25 °C). Verdünnte Seite = Donator (−), konzentrierte = Akzeptor (+).',
      f: G.svg(W, 120, T(180, 44, 'E = E⁰ + (0,059 V / z) · lg( c(Ox) / c(Red) )', { s: 13, b: 1 }) + T(180, 80, 'gleiche Konzentration: E = E⁰', { s: 12, c: '#475569' })) }
  ], 'Konzentrationszelle: gleiche Elektroden, verschiedene c → Spannung (NERNST).');
  A('e', 'lk', 'Überspannung', 'h', ['e8'], [
    { h: 'Manchmal braucht es mehr', t: 'Beim Abscheiden von <b>Gasen</b> (H₂, O₂) an manchen Elektroden ist die Reaktion gehemmt. Man muss eine <b>höhere Spannung</b> anlegen als berechnet. Dieser Zuschlag ist die <b>Überspannung</b>. Sie hängt vom Elektrodenmaterial ab.',
      f: G.svg(W, 150, G.r(40, 100, 80, 24, { f: '#dbeafe', s: B }) + T(80, 117, 'berechnet', { s: 11, b: 1 }) + G.r(130, 60, 80, 64, { f: '#fee2e2', s: R }) + T(170, 98, 'nötig', { s: 11, b: 1 }) + G.ar(232, 94, 232, 66, { c: V }) + T(244, 82, 'Überspannung', { s: 11, b: 1, c: V, a: 'start' }) + T(180, 144, 'Folge: Wasserelektrolyse braucht mehr als 1,23 V', { s: 11, c: '#475569' })) }
  ], 'Überspannung: Zusatzspannung durch gehemmte Elektrodenvorgänge (v. a. bei Gasen).');
  A('e', 'lk', 'Zersetzungsspannung', 'h', ['e4', 'e8'], [
    { h: 'Ab wann fließt Strom?', t: 'Die <b>Zersetzungsspannung U<sub>Z</sub></b> ist die <b>Mindestspannung</b>, ab der in einer Elektrolyse dauerhaft Stoff umgesetzt wird. Darunter fließt praktisch kein Strom. Sie ergibt sich aus den Potenzialen plus Überspannungen.',
      f: G.svg(W, 190, G.ax(40, 160, 290, 130, 'U / V', 'Stromstärke I') + G.p('M50 156 H170 L300 40', { s: R, w: 3.4 }) + L(170, 156, 170, 30, { c: GRY0(), d: '4 3', w: 1.6 }) + T(170, 24, 'U_Z', { s: 14, b: 1, c: V }) + T(110, 140, 'kein Strom', { s: 11, c: '#475569' }) + T(250, 100, 'Stoffumsatz', { s: 11, b: 1, c: R, a: 'start' })) },
    { h: 'Beispiel Wasser', t: 'Rechnerisch reichen für H₂O → H₂ + ½ O₂ 1,23 V. Praktisch braucht man je nach Elektroden etwa <b>1,7 bis 2 V</b>, wegen der Überspannung.',
      f: G.svg(W, 110, T(180, 40, 'U_Z (berechnet) = 1,23 V', { s: 16, b: 1 }) + T(180, 76, 'U_Z (praktisch) ≈ 1,7 – 2 V', { s: 16, b: 1, c: R })) }
  ], 'U_Z = Mindestspannung für Elektrolyse; = Potenzialdifferenz + Überspannung.');
})();
