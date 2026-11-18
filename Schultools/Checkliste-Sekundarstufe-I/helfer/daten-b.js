/* Erklärfolien Sek I, Themenfelder 3.5–3.8 (Kolbi: Chemie) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  function YEL() { return '#ca8a04'; }
  function box(x, y, w, h, s, f, c) { return G.bub(x, y, w, h, s, { f: f || '#eff6ff', s: c || B, b: 1, fs: 13 }); }
  function shells(cx, cy, sh, sym, o) {
    var s = '', k, e, r, a, b0 = (o && o.b0) || 20, st = (o && o.st) || 14;
    for (k = 0; k < sh.length; k++) s += G.c(cx, cy, b0 + k * st, { f: 'none', s: '#94a3b8', w: 1.3 });
    s += G.c(cx, cy, b0 - 10, { f: (o && o.f) || '#fecaca', s: I }) + T(cx, cy + 4, sym, { s: 9, b: 1 });
    for (k = 0; k < sh.length; k++) { r = b0 + k * st; for (e = 0; e < sh[k]; e++) { a = (e / sh[k]) * 6.2832 + k * .5; s += G.c(cx + r * Math.cos(a), cy + r * Math.sin(a), 3, { f: (k === sh.length - 1) ? '#fde047' : '#93c5fd', s: I, w: 1 }); } }
    return s;
  }
  function ionTxt(x, y, s, plus, o) { return G.c(x, y, (o && o.r) || 17, { f: plus ? '#bfdbfe' : '#fecaca', s: plus ? B : R, w: 2 }) + T(x, y + 5, s, { b: 1, s: 12 }); }
  function lattice(x0, y0, n, m, d, o) {
    var s = '', i, j, p;
    for (i = 0; i < n; i++) for (j = 0; j < m; j++) { p = (i + j) % 2 === 0; s += ionTxt(x0 + i * d, y0 + j * d, p ? '+' : '−', p, { r: d * .42 }); }
    return s;
  }

  /* ================= 3.5 Salze ================= */
  A('a5', 'gk', 'Ion', 'k', ['s51'], [
    { h: 'Geladene Teilchen', t: 'Ein <b>Ion</b> ist ein Atom (oder eine Atomgruppe) mit <b>elektrischer Ladung</b>. Gibt ein Atom Elektronen ab, bleibt mehr <b>Plus</b> übrig: ein <b>Kation</b> (positiv). Nimmt es Elektronen auf, ist es ein <b>Anion</b> (negativ). Natrium gibt ein Elektron ab, Chlor nimmt eines auf.',
      f: G.svg(W, 150, shells(36, 66, [2, 8, 1], 'Na', { b0: 12, st: 8 }) + T(36, 112, 'Na', { b: 1, s: 14 }) + G.ar(72, 66, 100, 66, { c: R, w: 2.6 }) + T(86, 52, '− e⁻', { c: R, b: 1, s: 11 }) + shells(134, 66, [2, 8], 'Na', { b0: 12, st: 8 }) + T(134, 112, 'Na⁺', { b: 1, s: 14, c: B }) + shells(218, 66, [2, 8, 7], 'Cl', { b0: 12, st: 8 }) + T(218, 112, 'Cl', { b: 1, s: 14 }) + G.ar(252, 66, 280, 66, { c: N, w: 2.6 }) + T(266, 52, '+ e⁻', { c: N, b: 1, s: 11 }) + shells(318, 66, [2, 8, 8], 'Cl', { b0: 12, st: 8 }) + T(318, 112, 'Cl⁻', { b: 1, s: 14, c: R }) + T(180, 144, 'Ion = Atom mit zu wenig oder zu viel Elektronen', { s: 11, c: '#475569' })) },
    { h: 'Wie viele Ladungen?', t: 'Atome streben die <b>Edelgaskonfiguration</b> an. Metalle geben dazu ihre Außenelektronen ab: Na⁺, Mg²⁺, Al³⁺. Nichtmetalle nehmen welche auf: Cl⁻, O²⁻. Die Ladung ergibt sich aus der Gruppe: I → 1+, II → 2+, III → 3+, VI → 2−, VII → 1−.',
      f: G.svg(W, 130, T(60, 26, 'Kationen', { b: 1, c: B }) + T(60, 52, 'Na⁺  (I)', { s: 14 }) + T(60, 76, 'Mg²⁺ (II)', { s: 14 }) + T(60, 100, 'Al³⁺ (III)', { s: 14 }) + T(250, 26, 'Anionen', { b: 1, c: R }) + T(250, 52, 'Cl⁻   (VII)', { s: 14 }) + T(250, 76, 'O²⁻   (VI)', { s: 14 }) + T(250, 100, 'S²⁻   (VI)', { s: 14 })) }
  ], 'Ion: geladenes Teilchen. Kation positiv (Elektronen abgegeben), Anion negativ (Elektronen aufgenommen).');

  A('a5', 'gk', 'Ionenbindung (chemische Bindung)', 'k', ['s53'], [
    { h: 'Plus und Minus halten zusammen', t: 'Zwischen entgegengesetzt geladenen Ionen wirken starke <b>Anziehungskräfte</b>. Diesen Zusammenhalt nennt man <b>Ionenbindung</b>. Anders als bei der Elektronenpaarbindung gibt es kein gemeinsames Elektronenpaar. Die Anziehung wirkt in <b>alle Richtungen</b>.',
      f: G.svg(W, 130, ionTxt(80, 62, 'Na⁺', true, { r: 24 }) + ionTxt(280, 62, 'Cl⁻', false, { r: 28 }) + G.ar(112, 62, 160, 62, { c: V, w: 3 }) + G.ar(248, 62, 200, 62, { c: V, w: 3 }) + T(180, 50, 'Anziehung', { s: 12, b: 1, c: V }) + T(180, 110, 'Ionenbindung: + zieht − an', { s: 12, c: '#475569' })) },
    { h: 'Drei Arten von Bindung', t: '<b>Metall + Nichtmetall</b> → Elektronen werden abgegeben und aufgenommen → <b>Ionenbindung</b> (Salze). <b>Nichtmetall + Nichtmetall</b> → gemeinsame Elektronenpaare → <b>Elektronenpaarbindung</b> (Moleküle). <b>Metall + Metall</b> → frei bewegliche Elektronen → <b>Metallbindung</b>.',
      f: G.svg(W, 150, box(8, 10, 170, 36, 'Ionenbindung', '#dbeafe', B) + T(192, 33, 'Metall + Nichtmetall', { s: 12, a: 'start' }) + box(8, 56, 170, 36, 'Elektronenpaarbindung', '#fee2e2', R) + T(192, 79, 'Nichtmetall + Nichtmetall', { s: 12, a: 'start' }) + box(8, 102, 170, 36, 'Metallbindung', '#fef9c3', YEL()) + T(192, 125, 'Metall + Metall', { s: 12, a: 'start' })) }
  ], 'Ionenbindung: Anziehung zwischen Kationen und Anionen, ungerichtet.');

  A('a5', 'gk', 'Ionensubstanz', 'k', ['s52', 's54'], [
    { h: 'Salz = Ionen im Verhältnis', t: 'Eine <b>Ionensubstanz</b> (Salz) besteht aus Kationen und Anionen im <b>Zahlenverhältnis</b>, bei dem sich die Ladungen <b>ausgleichen</b>. Die Formel zeigt dieses Verhältnis: <b>NaCl</b> (1 : 1), <b>MgCl₂</b> (1 : 2), <b>Al₂O₃</b> (2 : 3). Es gibt keine einzelnen NaCl-Moleküle.',
      f: G.svg(W, 150, ionTxt(60, 50, 'Mg²⁺', true, { r: 22 }) + T(104, 56, '+', { s: 18, b: 1 }) + ionTxt(144, 50, 'Cl⁻', false) + ionTxt(184, 50, 'Cl⁻', false) + G.ar(212, 50, 248, 50, { c: I }) + T(300, 56, 'MgCl₂', { s: 20, b: 1 }) + T(180, 102, '2+ und 2 · (1−) → Gesamtladung 0', { s: 12, c: N, b: 1 }) + T(180, 128, 'Das Salz ist nach außen ungeladen', { s: 11, c: '#475569' })) },
    { h: 'Typische Eigenschaften', t: 'Salze sind <b>fest, spröde</b>, haben <b>hohe Schmelztemperaturen</b> und leiten den Strom <b>nicht als Feststoff</b>, aber als <b>Schmelze</b> oder <b>Lösung</b>, denn nur dann können die Ionen wandern. Viele lösen sich in Wasser.',
      f: G.svg(W, 120, T(60, 36, 'Feststoff', { b: 1 }) + T(60, 62, '✘ kein Strom', { c: R, b: 1, s: 12 }) + T(180, 36, 'Lösung', { b: 1 }) + T(180, 62, '✔ leitet', { c: N, b: 1, s: 12 }) + T(300, 36, 'Schmelze', { b: 1 }) + T(300, 62, '✔ leitet', { c: N, b: 1, s: 12 }) + T(180, 104, 'Strom brauchen bewegliche Ladungsträger', { s: 11, c: '#475569' })) }
  ], 'Ionensubstanz: Salz aus Ionen im Verhältnis des Ladungsausgleichs; leitet nur gelöst oder geschmolzen.');

  A('a5', 'gk', 'Ionenkristall, Kristallgitter', 'k', ['s53'], [
    { h: 'Ordnung im Kristall', t: 'Im <b>Ionenkristall</b> sind die Ionen in einem regelmäßigen <b>Kristallgitter</b> angeordnet: Jedes Kation ist von Anionen umgeben und umgekehrt. Im Kochsalzkristall ist jedes Na⁺ von sechs Cl⁻ umgeben (hier im Schnitt: vier).',
      f: G.svg(W, 154, lattice(122, 24, 5, 4, 29) + T(180, 148, 'abwechselnd + und −', { s: 11, c: '#475569' })) },
    { h: 'Darum ist Salz spröde', t: 'Wird eine Gitterschicht <b>verschoben</b>, liegen plötzlich <b>gleichnamige Ionen</b> nebeneinander. Sie <b>stoßen sich ab</b>, und der Kristall <b>bricht</b>. Ein Metall dagegen lässt sich verformen. Der Unterschied liegt in der Bindung.',
      f: G.svg(W, 160, lattice(60, 26, 3, 2, 28) + T(104, 100, 'vorher', { s: 11, b: 1 }) + G.ar(160, 52, 200, 52, { c: I }) + lattice(244, 26, 3, 1, 28) + lattice(258, 54, 3, 1, 28).replace(/#bfdbfe/g, '#bfdbfe') + T(284, 100, 'verschoben', { s: 11, b: 1 }) + G.l(210, 40, 210, 68, { c: R, w: 2.4, d: '3 3' }) + T(180, 140, '− neben −: Abstoßung → Bruch', { s: 12, c: R, b: 1 })) }
  ], 'Ionenkristall: Ionen im regelmäßigen Gitter. Verschiebung führt zur Abstoßung, Salze sind spröde.');

  A('a5', 'gk', 'Löslichkeit', 'k', ['s52'], [
    { h: 'Wie viel geht rein?', t: 'Die <b>Löslichkeit</b> gibt an, wie viel eines Stoffes sich in einer bestimmten Menge Lösungsmittel bei einer bestimmten Temperatur lösen lässt. Ist nichts mehr lösbar, ist die Lösung <b>gesättigt</b>, überschüssiger Stoff bleibt als <b>Bodenkörper</b> liegen. Kochsalz löst sich gut, Kalk (CaCO₃) kaum.',
      f: G.svg(W, 150, G.beaker(40, 20, 100, 100, '#dbeafe', { lvl: .8, label: 'ungesättigt' }) + G.beaker(220, 20, 100, 100, '#dbeafe', { lvl: .8, label: 'gesättigt' }) + G.dots([[250, 112], [268, 114], [286, 112], [258, 106], [278, 107]], 4, '#e2e8f0')) },
    { h: 'Wasser trennt die Ionen', t: 'Wassermoleküle sind <b>Dipole</b>. Sie umlagern die Ionen an der Kristalloberfläche: Der <b>δ⁻-Pol</b> (O) zeigt zu den Kationen, der <b>δ⁺-Pol</b> (H) zu den Anionen. So lösen die Ionen sich aus dem Gitter und schwimmen gelöst, umgeben von einer <b>Hülle aus Wassermolekülen</b>.',
      f: G.svg(W, 160, ionTxt(110, 76, 'Na⁺', true, { r: 20 }) + [[110, 38], [146, 76], [110, 114], [74, 76]].map(function (p) { return G.c(p[0], p[1], 10, { f: '#fecaca', s: R, w: 1.4 }) + T(p[0], p[1] + 4, 'O', { s: 10, b: 1 }); }).join('') + ionTxt(260, 76, 'Cl⁻', false, { r: 22 }) + [[260, 36], [298, 76], [260, 116], [222, 76]].map(function (p) { return G.c(p[0], p[1], 10, { f: '#f1f5f9', s: B, w: 1.4 }) + T(p[0], p[1] + 4, 'H', { s: 10, b: 1 }); }).join('') + T(110, 150, 'O (δ⁻) zeigt zum Kation', { s: 10.5, c: R, b: 1 }) + T(260, 150, 'H (δ⁺) zeigt zum Anion', { s: 10.5, c: B, b: 1 })) }
  ], 'Löslichkeit: wie viel sich bei einer Temperatur im Lösungsmittel löst; gesättigt = nichts mehr löslich.');

  A('a5', 'gk', 'Lösungsmittel', 'k', ['s52'], [
    { h: 'Der Stoff, der löst', t: 'Das <b>Lösungsmittel</b> nimmt den gelösten Stoff auf, zusammen ergeben sie eine <b>Lösung</b>. Salz in Wasser: Wasser ist das Lösungsmittel. Faustregel: <b>„Gleiches löst sich in Gleichem“</b>. Polare Stoffe und Salze lösen sich in polaren Lösungsmitteln (Wasser), unpolare Stoffe wie Fett in unpolaren (Benzin).',
      f: G.svg(W, 150, G.beaker(14, 20, 78, 90, '#dbeafe', { lvl: .7 }) + T(53, 128, 'Salz in Wasser', { s: 10.5, b: 1 }) + T(53, 146, '✔ löst sich', { s: 11, c: N, b: 1 }) + G.beaker(142, 20, 78, 90, '#fef3c7', { lvl: .7 }) + T(181, 128, 'Salz in Benzin', { s: 10.5, b: 1 }) + T(181, 146, '✘ löst sich nicht', { s: 11, c: R, b: 1 }) + G.beaker(270, 20, 78, 90, '#fef3c7', { lvl: .7 }) + T(309, 128, 'Fett in Benzin', { s: 10.5, b: 1 }) + T(309, 146, '✔ löst sich', { s: 11, c: N, b: 1 })) }
  ], 'Lösungsmittel: Stoff, in dem sich ein anderer löst. Gleiches löst sich in Gleichem.');

  /* ================= 3.6 Metalle ================= */
  A('a6', 'gk', 'Erz', 'k', ['s62'], [
    { h: 'Rohstoff für Metalle', t: 'Ein <b>Erz</b> ist ein Gestein, das <b>Metallverbindungen</b> enthält, meist Oxide oder Sulfide, in einer Menge, die sich zu gewinnen lohnt. Eisen kommt als Eisenoxid (Hämatit Fe₂O₃), Aluminium im Bauxit vor. Nur wenige Metalle (z. B. Gold) findet man <b>gediegen</b>, also rein.',
      f: G.svg(W, 140, box(8, 40, 120, 48, 'Erz (Metalloxid)', '#e2e8f0', '#64748b') + G.ar(134, 64, 220, 64, { c: O, w: 3 }) + T(177, 50, 'Gewinnung', { s: 12, b: 1, c: O }) + box(226, 40, 124, 48, 'Metall', '#fef9c3', YEL()) + T(180, 118, 'Fe₂O₃ → Eisen · Bauxit → Aluminium', { s: 12, c: '#475569' })) }
  ], 'Erz: Gestein mit Metallverbindungen, aus dem man Metalle gewinnt.');

  A('a6', 'gk', 'Legierung', 'k', ['s61'], [
    { h: 'Metallgemisch mit Zusatz', t: 'Eine <b>Legierung</b> ist ein Gemisch aus einem Metall und weiteren Metallen oder Elementen. Man schmilzt sie zusammen. Legierungen sind oft <b>härter</b> oder widerstandsfähiger als die reinen Metalle: <b>Bronze</b> (Kupfer + Zinn), <b>Messing</b> (Kupfer + Zink), <b>Stahl</b> (Eisen + wenig Kohlenstoff).',
      f: G.svg(W, 160, [0, 1, 2, 3].map(function (i) { return [0, 1, 2].map(function (j) { var big = (i + j) % 4 === 1; return G.c(70 + i * 34, 40 + j * 34, big ? 11 : 15, { f: big ? '#fca5a5' : '#fde68a', s: I, w: 1.4 }); }).join(''); }).join('') + T(130, 140, 'Metall + fremde Atome im Gitter', { s: 11, c: '#475569' }) + T(232, 40, 'Bronze', { b: 1, s: 13, a: 'start' }) + T(232, 58, 'Messing', { b: 1, s: 13, a: 'start' }) + T(232, 76, 'Stahl', { b: 1, s: 13, a: 'start' }) + T(232, 100, 'Fremdatome stören', { s: 10.5, a: 'start', c: R }) + T(232, 114, 'das Gleiten → härter', { s: 10.5, a: 'start', c: R })) }
  ], 'Legierung: Gemisch aus Metallen oder Metall und anderen Elementen, oft härter als das reine Metall.');

  A('a6', 'gk', 'Reduktion', 'k', ['s66', 's62'], [
    { h: 'Sauerstoff wird entzogen', t: 'Bei der <b>Reduktion</b> gibt ein Oxid seinen <b>Sauerstoff ab</b>. Aus dem Metalloxid wird das Metall. Das ist der Weg, um Metalle aus Erzen zu gewinnen: <b>Eisenoxid + Kohlenstoffmonoxid → Eisen + Kohlenstoffdioxid</b>. Der Stoff, der den Sauerstoff aufnimmt, heißt <b>Reduktionsmittel</b>.',
      f: G.svg(W, 150, T(70, 40, 'Fe₂O₃', { b: 1, s: 20 }) + T(70, 60, 'Eisenoxid', { s: 11 }) + T(112, 44, '+', { s: 20, b: 1 }) + T(150, 40, '3 CO', { b: 1, s: 20 }) + G.ar(190, 36, 226, 36, { c: I, w: 2.6 }) + T(262, 40, '2 Fe', { b: 1, s: 20, c: YEL() }) + T(296, 44, '+', { s: 20, b: 1 }) + T(332, 40, '3 CO₂', { b: 1, s: 16 }) + G.ar(70, 78, 150, 78, { c: R, w: 2.4 }) + T(180, 106, 'Sauerstoff wandert vom Eisenoxid zum CO', { c: R, b: 1, s: 12 }) + T(180, 136, 'Eisenoxid wird reduziert, CO wird oxidiert', { s: 11, c: '#475569' })) }
  ], 'Reduktion: Abgabe von Sauerstoff. Das Reduktionsmittel nimmt den Sauerstoff auf.');

  A('a6', 'gk', 'Affinität', 'k', ['s67', 's63'], [
    { h: 'Wie gern verbindet sich ein Metall mit Sauerstoff?', t: 'Die <b>Affinität</b> zu Sauerstoff beschreibt, wie stark sich ein Metall mit Sauerstoff verbindet. <b>Unedle</b> Metalle (Magnesium, Aluminium, Zink) haben eine <b>hohe</b> Affinität und reagieren leicht, <b>edle</b> Metalle (Silber, Gold) eine <b>sehr geringe</b>. Darum bleibt Gold blank.',
      f: G.svg(W, 140, ['Mg', 'Al', 'Zn', 'Fe', 'Cu', 'Ag', 'Au'].map(function (m, i) { return G.r(8 + i * 49, 36, 44, 44, { f: ['#fecaca', '#fed7aa', '#fde68a', '#d9f99d', '#bbf7d0', '#e0f2fe', '#fef08a'][i], s: I, w: 1.4 }) + T(30 + i * 49, 64, m, { b: 1, s: 16 }); }).join('') + G.ar(14, 104, 336, 104, { c: R, w: 2.4 }) + T(22, 24, 'unedel', { b: 1, s: 12, a: 'start', c: R }) + T(338, 24, 'edel', { b: 1, s: 12, a: 'end', c: YEL() }) + T(180, 126, 'Affinität zu Sauerstoff nimmt ab', { s: 11, c: '#475569' })) },
    { h: 'Der stärkere gewinnt', t: 'Das Metall mit der <b>höheren Affinität</b> entreißt dem Oxid des schwächeren Metalls den Sauerstoff. Beim <b>Thermit-Verfahren</b> reagiert Aluminium mit Eisenoxid: <b>Aluminium + Eisenoxid → Aluminiumoxid + Eisen</b>. Dabei wird so viel Wärme frei, dass das Eisen flüssig entsteht.',
      f: G.svg(W, 130, T(180, 36, '2 Al + Fe₂O₃ → Al₂O₃ + 2 Fe', { b: 1, s: 18 }) + T(90, 70, 'Al: hohe Affinität', { s: 12, c: R, b: 1 }) + T(270, 70, 'Fe: geringere Affinität', { s: 12, c: B, b: 1 }) + G.ar(116, 88, 238, 88, { c: R, w: 2.4 }) + T(180, 110, 'Al nimmt den Sauerstoff vom Eisen', { s: 11, c: '#475569' })) }
  ], 'Affinität: Neigung eines Metalls, sich mit Sauerstoff zu verbinden. Unedle Metalle: hoch, edle: gering.');

  A('a6', 'gk', 'Redoxreaktion', 'k', ['s66'], [
    { h: 'Zwei Vorgänge gleichzeitig', t: 'Reduktion und Oxidation laufen <b>immer zusammen</b> ab: Ein Stoff gibt Sauerstoff ab (wird <b>reduziert</b>), ein anderer nimmt ihn auf (wird <b>oxidiert</b>). Beides zusammen ist die <b>Redoxreaktion</b>. Beispiel: <b>Kupferoxid + Wasserstoff → Kupfer + Wasser</b>.',
      f: G.svg(W, 150, box(6, 20, 110, 40, 'CuO', '#e2e8f0', '#64748b') + T(124, 46, '+', { s: 18, b: 1 }) + box(138, 20, 70, 40, 'H₂', '#e2e8f0', '#64748b') + G.ar(214, 40, 244, 40, { c: I, w: 2.6 }) + box(248, 20, 44, 40, 'Cu', '#fef9c3', YEL()) + T(300, 46, '+', { s: 18, b: 1 }) + box(310, 20, 44, 40, 'H₂O', '#dbeafe', B) + G.ar(61, 78, 173, 78, { c: R, w: 2.4 }) + T(117, 100, 'Sauerstoff wandert von CuO zu H₂', { s: 12, c: R, b: 1 }) + T(61, 130, 'CuO: reduziert', { s: 11.5, c: R, b: 1 }) + T(220, 130, 'H₂: oxidiert', { s: 11.5, c: B, b: 1 })) }
  ], 'Redoxreaktion: Reduktion und Oxidation laufen gleichzeitig ab. Sauerstoff wird übertragen.');

  A('a6', 'gk', 'Metallbindung', 'k', ['s64'], [
    { h: 'Rümpfe und Elektronen', t: 'In Metallen geben die Atome ihre <b>Außenelektronen</b> ab. Es bleiben <b>positive Atomrümpfe</b> übrig. Die Außenelektronen gehören keinem Atom mehr, sie bewegen sich <b>frei</b> zwischen den Rümpfen. Die Anziehung zwischen den Rümpfen und diesen Elektronen hält das Metall zusammen: die <b>Metallbindung</b>.',
      f: G.svg(W, 160, [0, 1, 2, 3, 4].map(function (i) { return [0, 1, 2].map(function (j) { return G.c(50 + i * 62, 40 + j * 44, 14, { f: '#fde68a', s: I, w: 1.6 }) + T(50 + i * 62, 45 + j * 44, '+', { s: 14, b: 1 }); }).join(''); }).join('') + [[81, 62], [143, 62], [267, 62], [81, 106], [205, 106], [267, 106], [205, 84], [143, 84]].map(function (p) { return G.c(p[0], p[1], 3.6, { f: '#60a5fa', s: 'none' }); }).join('') + T(180, 152, '+ Atomrümpfe · blaue Punkte: freie Elektronen', { s: 11, c: '#475569' })) }
  ], 'Metallbindung: positive Atomrümpfe, zusammengehalten von frei beweglichen Elektronen.');

  A('a6', 'gk', 'Metallgitter', 'k', ['s64'], [
    { h: 'Dicht gepackt', t: 'Die Atomrümpfe sind im <b>Metallgitter</b> regelmäßig und sehr <b>dicht</b> angeordnet, wie Kugeln im Kasten. Dadurch haben die meisten Metalle eine <b>hohe Dichte</b>. Jedes Teilchen hat viele Nachbarn.',
      f: G.svg(W, 150, [0, 1, 2, 3].map(function (j) { var off = j % 2 ? 17 : 0; return [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return G.c(50 + off + i * 34, 26 + j * 29, 16, { f: '#fde68a', s: I, w: 1.4 }); }).join(''); }).join('') + T(180, 140, 'dichteste Kugelpackung (Schnitt)', { s: 11, c: '#475569' })) },
    { h: 'Darum lassen sich Metalle verformen', t: 'Drückt man auf ein Metall, <b>gleiten</b> Gitterschichten übereinander. Die freien Elektronen sind überall dazwischen, die Bindung bleibt also <b>bestehen</b>. Das Metall <b>verformt</b> sich, es bricht nicht, anders als ein Salzkristall.',
      f: G.svg(W, 150, [0, 1, 2].map(function (j) { return [0, 1, 2, 3].map(function (i) { return G.c(50 + i * 32 + (j === 1 ? 0 : 0), 30 + j * 30, 13, { f: '#fde68a', s: I, w: 1.4 }); }).join(''); }).join('') + G.ar(160, 60, 196, 60, { c: I }) + [0, 1, 2].map(function (j) { return [0, 1, 2, 3].map(function (i) { return G.c(236 + i * 32 + (j === 1 ? 16 : 0), 30 + j * 30, 13, { f: '#fde68a', s: I, w: 1.4 }); }).join(''); }).join('') + T(180, 134, 'Schicht rutscht, Bindung bleibt', { s: 12, c: N, b: 1 })) }
  ], 'Metallgitter: dichte, regelmäßige Anordnung der Atomrümpfe. Schichten können gleiten.');

  A('a6', 'gk', 'Elektronengas-Modell', 'k', ['s64'], [
    { h: 'Ein Meer aus Elektronen', t: 'Im <b>Elektronengas-Modell</b> sind die Außenelektronen wie ein <b>Gas</b> zwischen den Atomrümpfen verteilt. Damit erklärst du die <b>elektrische Leitfähigkeit</b>: Wird eine Spannung angelegt, wandern die Elektronen durch das Metall. Auch die gute <b>Wärmeleitung</b> kommt von den beweglichen Elektronen.',
      f: G.svg(W, 150, G.r(60, 40, 240, 56, { f: '#fef9c3', s: I, w: 2 }) + [0, 1, 2, 3, 4].map(function (i) { return G.c(86 + i * 48, 68, 11, { f: '#fde68a', s: I, w: 1.2 }) + T(86 + i * 48, 72, '+', { b: 1, s: 12 }); }).join('') + [[100, 52], [150, 84], [200, 52], [250, 84]].map(function (p) { return G.c(p[0], p[1], 4, { f: '#60a5fa', s: 'none' }); }).join('') + G.ar(50, 26, 310, 26, { c: B, w: 2.4 }) + T(180, 18, 'Elektronen wandern', { c: B, b: 1, s: 12 }) + G.r(10, 106, 32, 24, { f: '#e2e8f0', s: I, rx: 3 }) + T(26, 123, '+ −', { s: 11, b: 1 }) + T(180, 128, 'Strom = bewegte Elektronen', { s: 11, c: '#475569' })) },
    { h: 'Was das Modell alles erklärt', t: '<b>Glanz</b> (Elektronen werfen Licht zurück), <b>Leitfähigkeit</b> für Strom und Wärme, <b>Verformbarkeit</b> (die Bindung bleibt beim Gleiten bestehen). Grenze des Modells: Es erklärt nicht alles, z. B. nicht den Magnetismus. Ein Modell ist immer vereinfacht.',
      f: G.svg(W, 110, ['Glanz ✨', 'Leitfähigkeit ⚡', 'Verformbarkeit 🔨'].map(function (e, i) { return G.r(8 + i * 118, 24, 110, 44, { f: '#fef9c3', s: YEL() }) + T(63 + i * 118, 51, e, { b: 1, s: 12 }); }).join('') + T(180, 96, 'alles durch frei bewegliche Elektronen', { s: 11, c: '#475569' })) }
  ], 'Elektronengas-Modell: frei bewegliche Außenelektronen zwischen Atomrümpfen erklären Leitfähigkeit und Verformbarkeit.');

  /* ================= 3.7 Quantitative Betrachtungen ================= */
  A('a7', 'gk', 'Atommasse', 'k', ['s72'], [
    { h: 'Von u zu g/mol', t: 'Aus dem PSE liest du die <b>Atommasse</b> in u ab: Natrium 23 u, Chlor 35,5 u. Dieselbe Zahl gibt die <b>molare Masse</b> in <b>g/mol</b> an: Natrium 23 g/mol. Für Verbindungen <b>addierst</b> du die Atommassen: NaCl = 23 + 35,5 = 58,5.',
      f: G.svg(W, 130, T(70, 40, 'Na', { b: 1, s: 24 }) + T(70, 62, '23 u', { b: 1, s: 15, c: B }) + G.ar(110, 50, 160, 50, { c: I, w: 2.4 }) + T(224, 44, 'M(Na) = 23 g/mol', { b: 1, s: 14, c: N }) + T(180, 100, 'NaCl: 23 + 35,5 = 58,5 g/mol', { s: 13, b: 1 }) + T(180, 120, 'die Zahl bleibt, nur die Einheit wechselt', { s: 11, c: '#475569' })) }
  ], 'Atommasse aus dem PSE: Zahlenwert in u = Zahlenwert der molaren Masse in g/mol.');

  A('a7', 'gk', 'Stoffmenge', 'k', ['s71'], [
    { h: 'Zählen mit dem Mol', t: 'Chemiker können Teilchen nicht einzeln zählen. Deshalb gibt es die <b>Stoffmenge</b> mit dem Formelzeichen <b>n</b> und der Einheit <b>Mol</b> (mol). Es ist ein <b>Zählmaß</b> wie „Dutzend“ oder „Paar“, nur für sehr viele Teilchen.',
      f: G.svg(W, 130, T(60, 36, '1 Dutzend', { b: 1, s: 13 }) + T(60, 60, '= 12 Stück', { s: 13, c: B }) + T(180, 36, '1 Paar', { b: 1, s: 13 }) + T(180, 60, '= 2 Stück', { s: 13, c: B }) + T(300, 36, '1 mol', { b: 1, s: 13, c: N }) + T(300, 60, '= 6,022 · 10²³', { s: 13, c: N }) + T(180, 104, 'Zählmaß für Teilchen: n in mol', { s: 12, c: '#475569' })) }
  ], 'Stoffmenge n: Zählgröße in mol. Ein Zählmaß für Teilchen wie ein Dutzend.');

  A('a7', 'gk', 'Mol', 'k', ['s71', 's72'], [
    { h: 'Eine riesige Zahl', t: '<b>1 Mol</b> enthält <b>6,022 · 10²³</b> Teilchen (Avogadro-Konstante). Das ist eine 6 mit 23 Nullen hinter einer Handvoll Stellen. Dieselbe Zahl gilt immer, egal ob Atome oder Moleküle. Die <b>Masse</b> von 1 mol hängt aber vom Stoff ab.',
      f: G.svg(W, 130, T(180, 50, '6 022 000 000 000 000 000 000 000', { b: 1, s: 15, c: N }) + T(180, 76, '= 1 mol Teilchen', { s: 14 }) + T(180, 106, 'unvorstellbar viele, aber leicht zu handhaben', { s: 11, c: '#475569' })) },
    { h: 'Gleiche Teilchenzahl, andere Masse', t: '1 mol Wasser (H₂O) wiegt <b>18 g</b> und füllt etwa einen Schluck, 1 mol Kochsalz (NaCl) wiegt <b>58,5 g</b>, 1 mol Kupfer <b>63,5 g</b>. Alle drei Portionen enthalten <b>gleich viele Teilchen</b>. Das zeigt der Vergleich der Massen verschiedener Stoffe gleicher Stoffmenge.',
      f: G.svg(W, 162, [['H₂O', '18 g', 18, '#dbeafe'], ['NaCl', '58,5 g', 58.5, '#e2e8f0'], ['Cu', '63,5 g', 63.5, '#fed7aa']].map(function (e, i) { var h = e[2] * 1.2 + 10; return G.r(46 + i * 104, 118 - h, 64, h, { f: e[3], s: I }) + T(78 + i * 104, 136, e[0], { b: 1 }) + T(78 + i * 104, 112 - h, e[1], { b: 1, s: 12, c: N }); }).join('') + T(180, 156, 'je 1 mol = 6,022 · 10²³ Teilchen', { s: 11, c: '#475569' })) }
  ], 'Mol: 6,022 · 10²³ Teilchen. Gleiche Stoffmenge, aber stoffabhängige Masse.');

  A('a7', 'gk', 'Molare Masse', 'k', ['s72', 's73', 's74'], [
    { h: 'Gramm pro Mol', t: 'Die <b>molare Masse M</b> ist die Masse von <b>einem Mol</b> eines Stoffes. Einheit: <b>g/mol</b>. Du berechnest sie aus dem PSE. Beispiel Wasser: M(H₂O) = 2 · 1 + 16 = <b>18 g/mol</b>. Zusammenhang: <b>M = m ÷ n</b>.',
      f: G.svg(W, 150, G.p('M180 14 L110 130 H250 Z', { f: '#f8fafc', s: I, w: 2 }) + G.l(130, 96, 230, 96, { w: 2 }) + G.l(180, 96, 180, 130, { w: 2 }) + T(180, 80, 'm', { b: 1, s: 22, c: R }) + T(146, 120, 'n', { b: 1, s: 20, c: B }) + T(214, 120, 'M', { b: 1, s: 20, c: N }) + T(296, 60, 'm = n · M', { s: 13, b: 1 }) + T(296, 82, 'n = m ÷ M', { s: 13, b: 1 }) + T(296, 104, 'M = m ÷ n', { s: 13, b: 1 }) + T(60, 60, 'm in g', { s: 11, c: R, b: 1 }) + T(60, 80, 'n in mol', { s: 11, c: B, b: 1 }) + T(60, 100, 'M in g/mol', { s: 11, c: N, b: 1 })) },
    { h: 'Ein Rechenbeispiel', t: 'Wie viel Stoffmenge sind <b>36 g Wasser</b>? M(H₂O) = 18 g/mol. n = m ÷ M = 36 g ÷ 18 g/mol = <b>2 mol</b>. Immer zuerst M bestimmen, dann einsetzen. Auf die Einheiten achten!',
      f: G.svg(W, 120, T(180, 34, 'n = m ÷ M', { b: 1, s: 18 }) + T(180, 66, 'n = 36 g ÷ 18 g/mol', { s: 16 }) + T(180, 98, 'n = 2 mol', { b: 1, s: 20, c: N })) },
    { h: 'Massen in Reaktionen', t: 'Die Koeffizienten zeigen das <b>Stoffmengenverhältnis</b>. 2 H₂ + O₂ → 2 H₂O: 2 mol H₂ (4 g) und 1 mol O₂ (32 g) ergeben 2 mol H₂O (36 g). Die Gesamtmasse bleibt gleich: 4 g + 32 g = 36 g.',
      f: G.svg(W, 130, T(180, 36, '2 H₂ + O₂ → 2 H₂O', { b: 1, s: 20 }) + T(60, 70, '2 mol', { s: 12, c: B, b: 1 }) + T(60, 88, '4 g', { s: 12 }) + T(160, 70, '1 mol', { s: 12, c: B, b: 1 }) + T(160, 88, '32 g', { s: 12 }) + T(296, 70, '2 mol', { s: 12, c: B, b: 1 }) + T(296, 88, '36 g', { s: 12 }) + T(180, 118, '4 g + 32 g = 36 g', { s: 12, c: N, b: 1 })) }
  ], 'Molare Masse M in g/mol: M = m ÷ n. Mit der Reaktionsgleichung rechnest du Massen um.');

  A('a7', 'gk', 'Stoffmengenkonzentration', 'k', ['s75'], [
    { h: 'Wie voll ist die Lösung?', t: 'Die <b>Stoffmengenkonzentration c</b> sagt, wie viel Stoffmenge in einem Liter Lösung steckt: <b>c = n ÷ V</b>, Einheit <b>mol/L</b>. Beispiel: 0,5 mol NaCl in 2 L Lösung ergibt c = 0,5 mol ÷ 2 L = <b>0,25 mol/L</b>.',
      f: G.svg(W, 150, G.beaker(40, 20, 100, 100, '#dbeafe', { lvl: .75 }) + T(90, 82, '2 L', { b: 1, s: 14 }) + T(250, 40, 'c = n ÷ V', { b: 1, s: 20 }) + T(250, 72, '0,5 mol ÷ 2 L', { s: 14 }) + T(250, 100, '= 0,25 mol/L', { b: 1, s: 16, c: N })) },
    { h: 'Eine 1-molare Lösung ansetzen', t: 'Für 1 L einer <b>1 mol/L</b>-Kochsalzlösung brauchst du <b>1 mol NaCl = 58,5 g</b>. Das Salz in einen Messkolben geben, etwas Wasser zufügen, lösen und dann <b>bis zur Marke auffüllen</b> (1 L Lösung, nicht 1 L Wasser dazu!).',
      f: G.svg(W, 150, G.p('M150 14 V70 L110 124 H250 L210 70 V14', { f: '#dbeafe', s: I, w: 2 }) + G.l(150, 40, 210, 40, { c: R, w: 2.4 }) + T(255, 44, '1 L-Marke', { c: R, b: 1, s: 12, a: 'start' }) + T(180, 108, 'NaCl-Lösung', { s: 11 }) + T(60, 80, '58,5 g NaCl', { b: 1, s: 12, c: N }) + G.ar(96, 76, 140, 76, { c: N, w: 2 })) }
  ], 'Stoffmengenkonzentration c = n ÷ V in mol/L.');

  /* ================= 3.8 Säuren und Laugen ================= */
  function phBar() {
    var cols = ['#dc2626', '#ea580c', '#f97316', '#facc15', '#a3e635', '#4ade80', '#22c55e', '#2dd4bf', '#38bdf8', '#3b82f6', '#6366f1', '#8b5cf6', '#7c3aed', '#6d28d9', '#581c87'], s = '', i;
    for (i = 0; i < 15; i++) s += G.r(15 + i * 22, 40, 22, 38, { f: cols[i], s: 'none', rx: 0 }) + T(26 + i * 22, 98, String(i), { s: 11 });
    return s + G.r(15, 40, 330, 38, { f: 'none', s: I, w: 1.6, rx: 4 });
  }
  A('a8', 'gk', 'Indikatoren', 'k', ['s81'], [
    { h: 'Farben verraten den pH-Bereich', t: '<b>Indikatoren</b> sind Farbstoffe, die ihre Farbe ändern, je nachdem, ob eine Lösung <b>sauer, neutral oder alkalisch</b> ist. Der <b>Universalindikator</b> zeigt eine ganze Farbskala von rot (stark sauer) über grün (neutral) bis violett (stark alkalisch).',
      f: G.svg(W, 130, phBar() + T(60, 26, 'sauer', { b: 1, c: R }) + T(180, 26, 'neutral', { b: 1, c: N }) + T(300, 26, 'alkalisch', { b: 1, c: V }) + T(180, 120, 'pH-Wert 0 bis 14', { s: 11, c: '#475569' })) },
    { h: 'Indikatoren aus dem Alltag', t: 'Auch <b>Rotkohlsaft</b> ist ein Indikator: in Säuren rot, neutral violett, in Laugen blaugrün bis gelb. <b>Lackmus</b> färbt sich in Säuren rot und in Laugen blau. Immer die <b>Farbe</b> mit der Vergleichsskala abgleichen, nie schmecken.',
      f: G.svg(W, 120, [['sauer', '#dc2626'], ['neutral', '#8b5cf6'], ['alkalisch', '#22c55e']].map(function (e, i) { return G.beaker(34 + i * 112, 14, 62, 64, e[1], { lvl: .8 }) + T(65 + i * 112, 96, e[0], { b: 1, s: 12 }); }).join('') + T(180, 114, 'Rotkohlsaft als Indikator', { s: 11, c: '#475569' })) }
  ], 'Indikatoren: Farbstoffe, die durch ihre Farbe sauer, neutral oder alkalisch anzeigen.');

  A('a8', 'gk', 'Säuren, saure Lösungen', 'k', ['s83', 's84'], [
    { h: 'Was Säuren ausmacht', t: 'Eine <b>Säure</b> gibt in Wasser <b>Wasserstoff-Ionen</b> ab, die sofort Wassermoleküle zu <b>H₃O⁺</b> werden lassen. Eine <b>saure Lösung</b> hat einen <b>pH-Wert unter 7</b> und färbt Indikatoren rot. Beispiele: Salzsäure (HCl), Schwefelsäure (H₂SO₄), Essigsäure, Zitronensäure.',
      f: G.svg(W, 120, box(6, 30, 66, 40, 'HCl', '#fee2e2', R) + T(112, 56, '+ H₂O', { s: 14, b: 1 }) + G.ar(148, 50, 188, 50, { c: I, w: 2.6 }) + box(194, 30, 74, 40, 'H₃O⁺', '#fee2e2', R) + T(284, 56, '+', { s: 18, b: 1 }) + box(296, 30, 56, 40, 'Cl⁻', '#dbeafe', B) + T(180, 104, 'Säure + Wasser → saure Lösung', { s: 12, c: '#475569' })) },
    { h: 'Typische Reaktionen', t: 'Saure Lösungen reagieren mit <b>unedlen Metallen</b> (Zink, Magnesium): dabei entsteht <b>Wasserstoff</b> (Knallgasprobe). Mit <b>Carbonaten</b> (Kalk, Backpulver) entsteht <b>Kohlenstoffdioxid</b> (Kalkwasser trübt sich). Nichtmetalloxide ergeben mit Wasser saure Lösungen, z. B. CO₂ → Kohlensäure.',
      f: G.svg(W, 130, T(180, 28, 'Zn + 2 HCl → ZnCl₂ + H₂↑', { b: 1, s: 15 }) + T(180, 56, 'CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂↑', { b: 1, s: 13 }) + T(180, 86, 'CO₂ + H₂O → H₂CO₃ (Kohlensäure)', { b: 1, s: 13 }) + T(180, 116, 'Gas-Nachweise: Knallgasprobe, Kalkwasser', { s: 11, c: '#475569' })) }
  ], 'Säure: bildet in Wasser H₃O⁺-Ionen, pH < 7.');

  A('a8', 'gk', 'Wasserstoff-/Hydronium- bzw. Oxonium-Ionen', 'k', ['s83'], [
    { h: 'Das H⁺ ist ein Proton', t: 'Ein Wasserstoff-Ion H⁺ ist nur ein <b>Proton</b>. Allein existiert es in Wasser nicht, es lagert sich an ein <b>Wassermolekül</b> an: H⁺ + H₂O → <b>H₃O⁺</b>. Dieses Teilchen heißt <b>Hydronium-Ion</b> oder <b>Oxonium-Ion</b>. Es ist verantwortlich für den sauren Charakter.',
      f: G.svg(W, 150, G.at(60, 70, 'H⁺', { r: 18, s: 14, bg: '#fee2e2' }) + T(96, 76, '+', { s: 18, b: 1 }) + G.l(140, 70, 120, 100, { w: 2 }) + G.l(140, 70, 160, 100, { w: 2 }) + G.at(140, 66, 'O', { r: 13, s: 16, bg: '#fecaca' }) + G.at(116, 106, 'H', { r: 10, s: 13 }) + G.at(164, 106, 'H', { r: 10, s: 13 }) + G.ar(200, 70, 236, 70, { c: I, w: 2.6 }) + G.l(290, 70, 266, 106, { w: 2 }) + G.l(290, 70, 314, 106, { w: 2 }) + G.l(290, 70, 290, 108, { w: 2 }) + G.at(290, 66, 'O', { r: 13, s: 16, bg: '#fecaca' }) + G.at(262, 112, 'H', { r: 10, s: 13 }) + G.at(318, 112, 'H', { r: 10, s: 13 }) + G.at(290, 114, 'H', { r: 10, s: 13 }) + T(318, 46, '+', { s: 20, b: 1, c: R }) + T(180, 144, 'H₂O + H⁺ → H₃O⁺', { s: 12, c: '#475569' })) },
    { h: 'Sauer, neutral, alkalisch', t: 'Es kommt auf das Zahlenverhältnis an: <b>sauer</b> = mehr H₃O⁺ als OH⁻, <b>neutral</b> = gleich viele, <b>alkalisch</b> = mehr OH⁻ als H₃O⁺. Reines Wasser ist neutral (pH 7).',
      f: G.svg(W, 150, [['sauer', 6, 1, 'pH < 7'], ['neutral', 3, 3, 'pH = 7'], ['alkalisch', 1, 6, 'pH > 7']].map(function (e, i) { var x = 14 + i * 116, s = G.r(x, 16, 100, 84, { f: '#f8fafc', s: '#94a3b8' }), k; for (k = 0; k < e[1]; k++) s += T(x + 14 + (k % 3) * 30, 38 + Math.floor(k / 3) * 22, 'H₃O⁺', { s: 10.5, c: R, b: 1, a: 'start' }); for (k = 0; k < e[2]; k++) s += T(x + 14 + (k % 3) * 30, 74 + Math.floor(k / 3) * 14 - (e[2] > 3 ? 0 : 0), 'OH⁻', { s: 10.5, c: B, b: 1, a: 'start' }); return s + T(x + 50, 118, e[0], { b: 1, s: 13 }) + T(x + 50, 136, e[3], { s: 11, c: '#475569' }); }).join('')) }
  ], 'H₃O⁺ (Hydronium/Oxonium): entsteht aus H⁺ + H₂O, bestimmt den sauren Charakter.');

  A('a8', 'gk', 'Basen, basische/alkalische Lösungen (Laugen)', 'k', ['s83', 's84'], [
    { h: 'Laugen enthalten OH⁻', t: '<b>Basen</b> bilden in Wasser <b>Hydroxid-Ionen (OH⁻)</b>. Eine <b>alkalische Lösung</b> (Lauge) hat einen <b>pH-Wert über 7</b> und färbt den Universalindikator blau bis violett. Beispiele: <b>Natronlauge</b> (NaOH), Kalkwasser (Ca(OH)₂), Ammoniak-Lösung. Laugen sind <b>stark ätzend</b>, Schutzbrille tragen!',
      f: G.svg(W, 120, box(10, 30, 74, 40, 'NaOH', '#dbeafe', B) + G.ar(92, 50, 132, 50, { c: I, w: 2.6 }) + T(112, 38, 'in Wasser', { s: 10.5 }) + box(138, 30, 70, 40, 'Na⁺', '#e2e8f0', '#64748b') + T(222, 56, '+', { s: 18, b: 1 }) + box(236, 30, 70, 40, 'OH⁻', '#dbeafe', B) + T(180, 104, 'Lauge: viele OH⁻-Ionen, pH > 7', { s: 12, c: '#475569' })) },
    { h: 'So entstehen Laugen', t: '<b>Metalloxide</b> reagieren mit Wasser zu Laugen: Natriumoxid + Wasser → Natronlauge (Na₂O + H₂O → 2 NaOH). Auch unedle Metalle wie <b>Natrium</b> bilden mit Wasser Lauge und Wasserstoff. Nichtmetalloxide ergeben dagegen Säuren.',
      f: G.svg(W, 120, T(180, 34, 'Metalloxid + Wasser → Lauge', { b: 1, s: 15, c: B }) + T(180, 64, 'Nichtmetalloxid + Wasser → Säure', { b: 1, s: 15, c: R }) + T(180, 98, 'Na₂O + H₂O → 2 NaOH', { s: 13, c: '#475569' })) }
  ], 'Base/Lauge: bildet in Wasser OH⁻-Ionen, pH > 7.');

  A('a8', 'gk', 'Hydroxid-Ion', 'k', ['s83'], [
    { h: 'OH⁻: das Teilchen der Laugen', t: 'Das <b>Hydroxid-Ion</b> besteht aus einem Sauerstoff- und einem Wasserstoffatom und ist <b>einfach negativ</b> geladen. Das O-Atom trägt drei freie Elektronenpaare. Alle Laugen enthalten OH⁻. Je mehr OH⁻ in der Lösung, desto <b>höher</b> der pH-Wert.',
      f: G.svg(W, 130, G.l(150, 64, 210, 64, { w: 2.6 }) + G.at(138, 64, 'O', { r: 14, s: 22, bg: '#fecaca' }) + G.at(222, 64, 'H', { r: 12, s: 18 }) + G.l(130, 40, 146, 40, { c: R, w: 3 }) + G.l(130, 90, 146, 90, { c: R, w: 3 }) + G.l(110, 56, 110, 72, { c: R, w: 3 }) + T(246, 50, '⁻', { s: 24, b: 1, c: B }) + T(180, 118, 'drei freie Paare am O (rot), eine Bindung O–H', { s: 11, c: '#475569' })) }
  ], 'Hydroxid-Ion OH⁻: Teilchen, das Lösungen alkalisch macht.');

  A('a8', 'gk', 'Neutralisation', 'k', ['s85'], [
    { h: 'Plus und Minus löschen sich aus', t: 'Bei der <b>Neutralisation</b> reagiert eine saure mit einer alkalischen Lösung: <b>H₃O⁺ + OH⁻ → 2 H₂O</b>. Es entsteht Wasser, die restlichen Ionen bleiben gelöst und bilden ein <b>Salz</b>. Beispiel: Salzsäure + Natronlauge → Natriumchlorid + Wasser. Die Reaktion ist <b>exotherm</b>.',
      f: G.svg(W, 150, box(6, 26, 76, 40, 'H₃O⁺', '#fee2e2', R) + T(92, 52, '+', { s: 18, b: 1 }) + box(104, 26, 76, 40, 'OH⁻', '#dbeafe', B) + G.ar(188, 46, 226, 46, { c: I, w: 2.6 }) + box(232, 26, 120, 40, '2 H₂O', '#f0fdf4', N) + T(180, 98, 'HCl + NaOH → NaCl + H₂O', { b: 1, s: 15 }) + T(180, 124, 'Säure + Lauge → Salz + Wasser', { s: 12, c: '#475569' })) },
    { h: 'Woran erkennt man „neutral“?', t: 'Der Indikator <b>wechselt zu grün</b> (Universalindikator), der pH-Wert liegt bei <b>7</b>. Gibst du zu viel Lauge zu, wird die Lösung wieder alkalisch. Beim Neutralisieren mit Maßlösung nennt man das <b>Titration</b>: Du tropfst, bis die Farbe umschlägt.',
      f: G.svg(W, 130, [['#dc2626', 'sauer'], ['#22c55e', 'neutral'], ['#7c3aed', 'alkalisch']].map(function (e, i) { return G.beaker(34 + i * 112, 10, 62, 62, e[0], { lvl: .8 }) + T(65 + i * 112, 90, e[1], { b: 1, s: 12 }); }).join('') + T(180, 124, 'Lauge zutropfen →', { s: 12, c: B, b: 1 })) }
  ], 'Neutralisation: H₃O⁺ + OH⁻ → 2 H₂O; es bleibt ein Salz gelöst.');
})();
