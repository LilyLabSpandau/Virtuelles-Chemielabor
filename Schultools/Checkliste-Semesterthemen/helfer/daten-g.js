/* Erklärfolien Q2 Chemisches Gleichgewicht (Kolbi) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;

  function conc(o) {   // c(t)-Diagramm mit Einstellung des Gleichgewichts
    var s = G.ax(40, 170, 290, 140, 't', 'c');
    s += G.p('M50 40 C100 40 130 100 190 112 H320', { s: B, w: 3 }) + G.p('M50 150 C100 150 130 120 190 114 H320', { s: R, w: 3, d: o && o.dash ? '5 4' : '' });
    s += L(190, 30, 190, 170, { c: GRY(), d: '4 3', w: 1.5 }) + T(190, 24, 'Gleichgewicht erreicht', { s: 11, c: '#475569' });
    s += T(66, 36, 'Edukte', { c: B, b: 1, s: 12, a: 'start' }) + T(66, 164, 'Produkte', { c: R, b: 1, s: 12, a: 'start' }) + T(300, 104, 'konstant', { s: 11, c: '#475569' });
    return s;
  }
  function GRY() { return '#94a3b8'; }

  A('g', 'gk', 'Gleichgewichtspfeil', 'k', ['g1'], [
    { h: 'Hin und zurück', t: 'Bei vielen Reaktionen laufen <b>Hin-</b> und <b>Rückreaktion gleichzeitig</b> ab. Das schreibt man mit dem <b>Gleichgewichtspfeil ⇌</b>. Ein einfacher Pfeil → bedeutet dagegen: Die Reaktion läuft (praktisch) vollständig in eine Richtung.',
      f: G.svg(W, 140, T(60, 60, 'A + B', { s: 22, b: 1, c: B }) + G.ar(112, 54, 240, 54, { c: N, w: 3 }) + G.ar(240, 74, 112, 74, { c: R, w: 3 }) + T(300, 60, 'C + D', { s: 22, b: 1, c: R }) + T(176, 44, 'Hinreaktion', { s: 11, c: N, b: 1 }) + T(176, 94, 'Rückreaktion', { s: 11, c: R, b: 1 }) + T(180, 124, 'A + B ⇌ C + D', { s: 18, b: 1 })) },
    { h: 'Dynamisch, nicht „fertig“', t: 'Im <b>Gleichgewicht</b> sind die Konzentrationen <b>konstant</b>, aber es läuft weiter ständig Hin- und Rückreaktion ab, und zwar <b>gleich schnell</b>. Auf der Stoffebene sieht man nichts mehr, auf der Teilchenebene ist viel los: ein <b>dynamisches Gleichgewicht</b>.',
      f: G.svg(W, 190, conc()) }
  ], 'Gleichgewicht: Hin- und Rückreaktion laufen gleich schnell, die Konzentrationen bleiben konstant.');

  A('g', 'gk', 'Prinzip des kleinsten Zwangs', 'k', ['g5'], [
    { h: 'Das System weicht aus', t: 'Das <b>Prinzip von LE CHATELIER</b>: Übt man einen <b>Zwang</b> auf ein Gleichgewicht aus (Konzentration, Temperatur oder Druck ändern), <b>weicht</b> das System aus. Die Gleichgewichtslage verschiebt sich so, dass der Zwang kleiner wird.',
      f: G.svg(W, 150, G.bub(8, 50, 108, 44, 'Gleichgewicht', { f: '#dcfce7', s: N, b: 1, fs: 12 }) + G.ar(120, 72, 160, 72, { c: R }) + T(140, 56, 'Zwang', { c: R, b: 1, s: 11 }) + G.bub(168, 50, 90, 44, 'gestört', { f: '#fee2e2', s: R, b: 1 }) + G.ar(264, 72, 296, 72, { c: N }) + G.bub(298, 56, 56, 32, 'neu', { f: '#dcfce7', s: N, b: 1, fs: 12 }) + T(180, 128, 'Das System „wehrt sich“ gegen die Änderung.', { s: 12, c: '#475569' })) },
    { h: 'Was passiert wann?', t: '<b>Mehr Edukt</b> → Gleichgewicht verschiebt sich nach rechts. <b>Temperatur erhöhen</b> → die <b>endotherme</b> Richtung wird bevorzugt. <b>Druck erhöhen</b> → die Seite mit <b>weniger Gasteilchen</b> wird bevorzugt.',
      f: G.svg(W, 170, G.r(10, 14, 340, 40, { f: '#eff6ff', s: B }) + T(24, 40, 'Konzentration ↑ Edukt', { a: 'start', b: 1, c: B }) + T(340, 40, '→ rechts', { a: 'end', b: 1 }) + G.r(10, 62, 340, 40, { f: '#fff7ed', s: O }) + T(24, 88, 'Temperatur ↑', { a: 'start', b: 1, c: O }) + T(340, 88, '→ endotherme Richtung', { a: 'end', b: 1 }) + G.r(10, 110, 340, 40, { f: '#f5f3ff', s: V }) + T(24, 136, 'Druck ↑', { a: 'start', b: 1, c: V }) + T(340, 136, '→ weniger Gasteilchen', { a: 'end', b: 1 })) },
    { h: 'Beispiel: Ammoniaksynthese', t: 'N₂ + 3 H₂ ⇌ 2 NH₃ (exotherm). <b>4 Teilchen links, 2 rechts</b>: Hoher Druck und niedrige Temperatur verschieben das Gleichgewicht nach rechts. Aber bei niedriger Temperatur ist die Reaktion zu langsam, deshalb braucht man einen <b>Katalysator</b> und einen Kompromiss.',
      f: G.svg(W, 150, T(180, 46, 'N₂ + 3 H₂ ⇌ 2 NH₃', { s: 22, b: 1 }) + T(80, 78, '4 Teilchen', { s: 12, c: B, b: 1 }) + T(280, 78, '2 Teilchen', { s: 12, c: B, b: 1 }) + T(180, 110, 'exotherm: ΔH < 0', { s: 13, c: O, b: 1 }) + T(180, 136, 'p ↑, T ↓ → mehr NH₃', { s: 13, c: N, b: 1 })) }
  ], 'LE CHATELIER: Das System weicht einem äußeren Zwang aus (Konzentration, Temperatur, Druck).');

  /* LK: Estersynthese */
  A('g', 'lk', 'Protonierung', 'k', ['g7'], [
    { h: 'Der Katalysator greift ein', t: 'Bei der <b>säurekatalysierten Veresterung</b> wird zuerst das O-Atom der C=O-Gruppe der Carbonsäure <b>protoniert</b> (H⁺ lagert sich an). Dadurch wird das C-Atom noch stärker <b>positiv</b> und lässt sich besser angreifen.',
      f: G.svg(W, 150, T(70, 60, 'R–C(=O)–OH', { s: 18, b: 1 }) + G.ar(130, 54, 210, 54, { c: R }) + T(170, 42, '+ H⁺', { c: R, b: 1 }) + T(284, 60, 'R–C(–O⁺H₂…)', { s: 0 }) + T(285, 60, 'R–C(OH)₂⁺', { s: 18, b: 1 }) + T(180, 110, 'C-Atom wird stärker δ⁺ → leichter anzugreifen', { s: 12, c: '#475569' })) }
  ], 'Protonierung: H⁺ lagert sich an die C=O-Gruppe an und macht das C-Atom reaktiver.');
  A('g', 'lk', 'nucleophiler Angriff', 'k', ['g7'], [
    { h: 'Der Alkohol greift an', t: 'Das O-Atom des <b>Alkohols</b> hat freie Elektronenpaare. Es greift das <b>positivierte C-Atom</b> der protonierten Carbonsäure an (nucleophiler Angriff) und bildet eine neue C–O-Bindung.',
      f: G.svg(W, 150, T(70, 64, 'R′–OH', { s: 18, b: 1, c: B }) + T(70, 46, '··', { c: R, b: 1, s: 16 }) + G.ar(106, 60, 180, 60, { c: B, w: 2.6 }) + T(250, 64, 'R–C(OH)₂⁺', { s: 18, b: 1 }) + T(180, 120, '→ Zwischenprodukt', { s: 14, b: 1, c: N })) }
  ], 'Nucleophiler Angriff: Elektronenpaar des Alkohols greift das δ⁺-C-Atom an.');
  A('g', 'lk', 'Zwischenprodukt', 'k', ['g7'], [
    { h: 'Eine Zwischenstation', t: 'Nach dem Angriff entsteht ein <b>Zwischenprodukt</b>: ein C-Atom mit <b>vier Bindungspartnern</b> (tetraedrisch), unter anderem zwei OH-Gruppen und die OR′-Gruppe. Es ist energiereich und zerfällt schnell weiter.',
      f: G.svg(W, 170, G.at(180, 80, 'C', { s: 22, r: 16 }) + L(180, 64, 180, 28, { w: 3 }) + T(180, 22, 'R', { b: 1 }) + L(166, 92, 130, 112, { w: 3 }) + T(120, 124, 'OH', { b: 1, c: R }) + L(194, 92, 230, 112, { w: 3 }) + T(244, 124, 'OH', { b: 1, c: R }) + L(194, 70, 236, 56, { w: 3 }) + T(262, 56, 'OR′', { b: 1, c: B }) + T(180, 160, 'Zwischenprodukt (4 Partner am C)', { s: 12 })) },
    { h: 'In der Mulde der Energiekurve', t: 'Zwischenprodukte liegen in einem <b>Tal</b> zwischen zwei Übergangszuständen. Die Veresterung hat mehrere Schritte, jeder mit eigener Barriere.',
      f: G.svg(W, 170, G.ax(40, 150, 290, 130, 'Reaktionsverlauf', 'E') + G.p('M50 110 C80 110 80 40 120 40 C150 40 150 90 180 90 C210 90 210 30 250 30 C280 30 280 120 320 120', { s: O, w: 3 }) + T(180, 106, 'Zwischenprodukt', { c: B, b: 1, s: 11 })) }
  ], 'Zwischenprodukt: instabiles Teilchen zwischen Edukt und Produkt (in einer Mulde der Energiekurve).');
  A('g', 'lk', 'Rückgewinnung des Katalysators', 'k', ['g7'], [
    { h: 'Katalysator bleibt übrig', t: 'Am Ende der Reaktion gibt das Zwischenprodukt ein <b>H⁺</b> wieder ab. Der <b>Katalysator wird zurückgebildet</b> und kann das nächste Molekül protonieren. Darum reichen wenige H⁺-Ionen für viele Moleküle.',
      f: G.svg(W, 190, G.bub(14, 20, 130, 40, 'H⁺ (Katalysator)', { f: '#fee2e2', s: R, b: 1, fs: 12 }) + G.bub(216, 20, 130, 40, 'Säure protoniert', { f: '#fef3c7', s: O, b: 1, fs: 12 }) + G.bub(216, 130, 130, 40, 'Zwischenprodukt', { f: '#dbeafe', s: B, b: 1, fs: 12 }) + G.bub(14, 130, 130, 40, 'H⁺ wieder frei', { f: '#dcfce7', s: N, b: 1, fs: 12 }) + G.ar(148, 40, 212, 40, { c: I }) + G.ar(281, 64, 281, 126, { c: I }) + G.ar(212, 150, 148, 150, { c: I }) + G.ar(79, 126, 79, 64, { c: N, w: 3 }) + T(180, 98, 'Kreislauf', { b: 1, c: V, s: 13 })) }
  ], 'Der Katalysator H⁺ wird am Ende wieder abgegeben und steht erneut zur Verfügung.');
  A('g', 'lk', 'Kondensationsreaktion', 'k', ['g7'], [
    { h: 'Zwei Moleküle, ein kleines fällt ab', t: 'Bei einer <b>Kondensationsreaktion</b> werden zwei Moleküle unter Abspaltung eines kleinen Moleküls (hier <b>Wasser</b>) verknüpft. Die Estersynthese ist eine Gleichgewichtsreaktion: Säure + Alkohol ⇌ Ester + Wasser.',
      f: G.svg(W, 120, T(180, 44, 'R–COOH + R′–OH ⇌ R–COO–R′ + H₂O', { s: 16, b: 1 }) + T(180, 88, 'Das Wasser stammt aus der OH der Säure und dem H des Alkohols.', { s: 11, c: '#475569' })) }
  ], 'Kondensationsreaktion: Verknüpfung zweier Moleküle unter Abspaltung eines kleinen Moleküls.');

  function beakerSat(solid, dots) {
    var s = G.beaker(120, 30, 120, 120, '#bfdbfe', { lvl: .72 });
    if (solid) s += G.p('M126 146 L136 130 L148 142 L160 128 L172 144 L186 132 L200 144 L214 130 L226 146 Z', { f: '#e2e8f0', s: I, w: 1.6 });
    (dots || []).forEach(function (p) { s += G.c(p[0], p[1], 4, { f: p[2] ? '#fca5a5' : '#93c5fd' }); });
    return s;
  }
  A('g', 'lk', 'gesättigte Lösung', 'k', ['g9'], [
    { h: 'Nichts geht mehr', t: 'Eine <b>gesättigte Lösung</b> enthält bei einer bestimmten Temperatur so viel gelösten Stoff, wie sie maximal aufnehmen kann. Gibt man mehr Salz dazu, bleibt es als <b>Bodenkörper</b> liegen.',
      f: G.svg(W, 180, beakerSat(true, [[140, 70, 0], [160, 90, 1], [190, 60, 0], [200, 100, 1], [150, 112, 1], [215, 80, 0]]) + T(60, 96, 'gesättigt', { b: 1, c: B }) + G.ar(98, 100, 140, 100, { c: B, w: 1.5 }) + T(300, 140, 'Bodenkörper', { b: 1, c: '#475569', a: 'middle' }) + G.ar(262, 140, 228, 140, { c: '#475569', w: 1.5 })) },
    { h: 'Im Gleichgewicht', t: 'Es lösen sich genauso viele Teilchen aus dem Feststoff, wie sich wieder abscheiden: <b>Lösen = Kristallisieren</b>. Das ist ein <b>Löslichkeitsgleichgewicht</b> mit dem Löslichkeitsprodukt K<sub>L</sub>.',
      f: G.svg(W, 130, T(52, 50, 'NaCl(s)', { s: 16, b: 1 }) + G.ar(104, 44, 204, 44, { c: N, w: 3 }) + G.ar(204, 62, 104, 62, { c: R, w: 3 }) + T(284, 50, 'Na⁺(aq) + Cl⁻(aq)', { s: 13, b: 1 }) + T(154, 34, 'Lösen', { c: N, b: 1, s: 11 }) + T(154, 84, 'Kristallisation', { c: R, b: 1, s: 11 }) + T(180, 114, 'beide gleich schnell', { s: 12, c: '#475569' })) }
  ], 'Gesättigt: Die Lösung kann bei dieser Temperatur nichts mehr lösen, es bleibt ein Bodenkörper.');
  A('g', 'lk', 'Bodenkörper', 'k', ['g9'], [
    { h: 'Der ungelöste Feststoff', t: 'Der <b>Bodenkörper</b> ist der Feststoff, der <b>ungelöst am Boden</b> liegt. Solange er da ist, ist die Lösung gesättigt. Er ist der „Vorrat“, aus dem Ionen nachgeliefert werden. Gibt man Wasser dazu, löst sich ein Teil und die Lösung bleibt gesättigt.',
      f: G.svg(W, 170, beakerSat(true, [[150, 70, 0], [200, 90, 1], [170, 110, 0]]) + T(300, 140, 'Bodenkörper', { b: 1, c: '#475569' }) + G.ar(262, 140, 232, 142, { c: '#475569', w: 1.5 }) + T(60, 80, 'Lösung', { b: 1, c: B }))}
  ], 'Bodenkörper = ungelöster Feststoff in einer gesättigten Lösung.');
  A('g', 'lk', 'Kristallisation', 'k', ['g9'], [
    { h: 'Ordnung entsteht', t: 'Bei der <b>Kristallisation</b> lagern sich gelöste Ionen in ein regelmäßiges <b>Kristallgitter</b> ein. Sie tritt auf, wenn eine Lösung <b>übersättigt</b> ist oder abkühlt. Im Gleichgewicht ist sie der <b>Gegenspieler</b> zum Lösen.',
      f: G.svg(W, 150, [0, 1, 2, 3].map(function (i) { return G.c(40 + (i % 2) * 30 + (i > 1 ? 0 : 0), 50 + Math.floor(i / 2) * 30 + (i * 11) % 20, 8, { f: i % 2 ? '#fca5a5' : '#93c5fd' }); }).join('') + T(70, 120, 'gelöste Ionen', { s: 12 }) + G.ar(120, 70, 200, 70, { c: I }) + [0, 1, 2, 3, 4, 5].map(function (i) { return G.c(240 + (i % 3) * 22, 44 + Math.floor(i / 3) * 22, 9, { f: (i + Math.floor(i / 3)) % 2 ? '#fca5a5' : '#93c5fd' }); }).join('') + T(270, 120, 'Kristallgitter', { s: 12 })) }
  ], 'Kristallisation: Ionen ordnen sich zu einem Kristall, Gegenreaktion zum Lösen.');
})();
