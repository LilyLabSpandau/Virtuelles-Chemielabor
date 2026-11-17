/* Erklärfolien Q1 Proteine (Kolbi) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l;
  var W = 360, H = 210;

  /* allgemeine α-Aminosäure; hl: welche Gruppen farbig hervorgehoben werden */
  function aa(o) {
    o = o || {}; var s = '', x = 180, y = 108, cN = o.n ? B : I, cC = o.c ? R : I, cR = o.r ? G.GRN : I;
    var zw = o.zw;
    s += G.b(x, y, x - 62, y, 1, { c: cN }) + G.b(x, y, x + 62, y, 1, { c: cC });
    s += G.b(x, y, x, y - 50, 1, { c: cR }) + G.b(x, y, x, y + 46, 1);
    s += G.at(x, y, 'Cα', { s: 15, r: 13 });
    s += G.at(x - 70, y, zw ? 'NH₃' : 'NH₂', { s: 15, r: 20, c: cN });
    if (zw) s += T(x - 52, y - 10, '+', { c: R, b: 1, s: 15 });
    s += G.at(x + 70, y, 'C', { s: 15, c: cC });
    s += G.b(x + 70, y, x + 70, y - 46, 2, { c: cC }) + G.at(x + 70, y - 52, 'O', { s: 15, c: cC });
    s += G.b(x + 70, y, x + 112, y + 24, 1, { c: cC }) + G.at(x + 126, y + 32, zw ? 'O' : 'OH', { s: 15, r: 14, c: cC });
    if (zw) s += T(x + 140, y + 22, '−', { c: B, b: 1, s: 17 });
    s += G.at(x, y - 58, o.R || 'R', { s: 16, c: cR });
    s += G.at(x, y + 54, 'H', { s: 15 });
    return s;
  }
  function tag(x, y, s, c, a) { return T(x, y, s, { c: c, b: 1, s: 12, a: a || 'middle' }); }

  function nh(x, y, plus) {   // –NH2 bzw. –NH3+ mit Rest R
    var s = G.b(x, y, x - 36, y - 30, 1) + G.b(x, y, x + 36, y - 30, 1) + G.b(x, y, x, y + 40, 1) + G.at(x, y, 'N', { s: 20, r: 16 }) + T(x - 42, y - 36, 'H', { b: 1, s: 15, a: 'end' }) + T(x + 42, y - 36, 'H', { b: 1, s: 15, a: 'start' }) + T(x, y + 58, 'R', { b: 1, s: 15, c: N });
    if (plus) s += G.b(x, y, x + 40, y + 28, 1) + T(x + 46, y + 36, 'H', { b: 1, s: 15, a: 'start' }) + T(x + 22, y - 6, '+', { c: R, b: 1, s: 18, a: 'start' });
    else s += G.c(x - 14, y + 6, 2.4, { f: R, s: R }) + G.c(x - 6, y + 12, 2.4, { f: R, s: R }) + T(x - 26, y + 22, 'freies', { c: R, s: 10, a: 'end' }) + T(x - 26, y + 34, 'Paar', { c: R, s: 10, a: 'end' });
    return s;
  }
  /* 1 Amino-Gruppe */
  A('p', 'gk', 'Amino-Gruppe', 'k', ['p1', 'p2'], [
    { h: 'Die Bausteine der Proteine', t: 'Jede α-Aminosäure hat <b>ein zentrales C-Atom (Cα)</b>. Daran hängen vier Partner: eine <span class="bl">Amino-Gruppe</span>, eine <span class="r">Carboxy-Gruppe</span>, ein H-Atom und ein <span class="gn">Rest R</span>. Nur der Rest ist bei jeder Aminosäure anders.',
      f: G.svg(W, H, aa({ n: 1, c: 1, r: 1 }) + tag(76, 160, 'Amino-Gruppe', B) + tag(262, 160, 'Carboxy-Gruppe', R) + tag(262, 36, 'α-Aminosäure', I) + tag(250, 66, '', I) + tag(120, 40, 'Rest R', N, 'end')) },
    { h: 'Die Gruppe –NH₂', t: 'Stickstoff hat hier <b>ein freies Elektronenpaar</b>. Damit kann die Amino-Gruppe ein Proton aufnehmen und wird zu –NH₃⁺. Sie wirkt also als <span class="bl">Base</span> (Protonenakzeptor).',
      f: G.svg(W, 190, nh(80, 100, false) + G.ar(150, 96, 210, 96, { c: R }) + T(180, 84, '+ H⁺', { c: R, b: 1, s: 15 }) + nh(280, 100, true) + T(80, 176, '–NH₂ (Base)', { s: 12, b: 1, c: B }) + T(280, 176, '–NH₃⁺', { s: 12, b: 1, c: B })) },
    { h: 'Funktionelle Gruppe', t: 'Eine <b>funktionelle Gruppe</b> bestimmt, wie ein Molekül reagiert. Die Amino-Gruppe macht Aminosäuren basisch, die Carboxy-Gruppe sauer. Beides zusammen erklärt das besondere Verhalten in Wasser.',
      f: G.svg(W, 150, G.bub(30, 30, 130, 52, '–NH₂  Amino', { f: '#dbeafe', s: B, tc: B, b: 1 }) + T(95, 104, 'basisch (nimmt H⁺ auf)', { c: B, s: 12 }) + G.bub(200, 30, 130, 52, '–COOH  Carboxy', { f: '#fee2e2', s: R, tc: R, b: 1 }) + T(265, 104, 'sauer (gibt H⁺ ab)', { c: R, s: 12 })) }
  ], 'Alle α-Aminosäuren tragen eine Amino-Gruppe (–NH₂) und eine Carboxy-Gruppe (–COOH) am selben C-Atom. Nur der Rest R unterscheidet sie.');

  /* 2 Zwitterion */
  function box3(x, y, w, h, title, sub, col, fill) { return G.r(x, y, w, h, { f: fill, s: col, w: 2 }) + T(x + w / 2, y + 24, title, { c: col, b: 1, s: 12 }) + T(x + w / 2, y + h - 10, sub, { s: 11 }); }
  A('p', 'gk', 'Zwitterion', 'k', ['p2'], [
    { h: 'Zwei Ladungen in einem Teilchen', t: 'In Wasser gibt die Carboxy-Gruppe ein Proton ab, die Amino-Gruppe nimmt es auf. So entsteht ein <b>Zwitterion</b>: es trägt eine <span class="bl">positive</span> und eine <span class="r">negative</span> Ladung, ist aber <b>insgesamt neutral</b>.',
      f: G.svg(W, H, aa({ zw: 1 }) + T(180, 28, 'Zwitterion (innere Salzform)', { b: 1 }) + tag(76, 170, '–NH₃⁺', B) + tag(266, 170, '–COO⁻', R)) },
    { h: 'Das Teilchen hängt vom pH-Wert ab', t: 'Im <span class="r">Sauren</span> nimmt auch die Carboxy-Gruppe ein Proton auf: das Teilchen ist <b>positiv</b>. Im <span class="bl">Basischen</span> gibt die Amino-Gruppe ihr Proton ab: das Teilchen ist <b>negativ</b>. Dazwischen liegt das neutrale Zwitterion.',
      f: G.svg(W, 190, box3(8, 30, 104, 100, 'stark sauer', 'H₃N⁺–CHR–COOH', R, '#fee2e2') + box3(128, 30, 104, 100, 'neutral', 'H₃N⁺–CHR–COO⁻', N, '#dcfce7') + box3(248, 30, 104, 100, 'stark basisch', 'H₂N–CHR–COO⁻', B, '#dbeafe') + T(60, 76, '+', { c: R, b: 1, s: 30 }) + T(180, 76, '±', { c: N, b: 1, s: 30 }) + T(300, 76, '−', { c: B, b: 1, s: 30 }) + G.ar(40, 160, 320, 160, { c: I }) + T(40, 180, 'pH niedrig', { a: 'start', s: 11 }) + T(320, 180, 'pH hoch', { a: 'end', s: 11 }) + T(180, 150, 'OH⁻ →', { s: 11 }) ) },
    { h: 'Warum Aminosäuren so besonders sind', t: 'Zwitterionen ziehen sich wie Ionen gegenseitig stark an. Darum sind Aminosäuren <b>Feststoffe mit hohen Schmelztemperaturen</b> und lösen sich gut in Wasser, aber schlecht in Benzin.',
      f: G.svg(W, 170, [0, 1, 2, 3].map(function (i) { return [0, 1, 2].map(function (j) { var x = 70 + i * 72 + (j % 2) * 0, y = 30 + j * 46; return G.r(x, y, 56, 28, { f: '#f1f5f9', rx: 14 }) + T(x + 12, y + 19, '+', { c: B, b: 1, s: 15 }) + T(x + 44, y + 18, '−', { c: R, b: 1, s: 17 }); }).join(''); }).join('') + [0, 1, 2].map(function (j) { return G.l(135, 44 + j * 46, 142, 44 + j * 46, { c: O, w: 2, d: '2 2' }); }).join('') + T(180, 164, 'Anziehung zwischen + und −', { c: O, b: 1, s: 12 })) }
  ], 'Das Zwitterion trägt –NH₃⁺ und –COO⁻, ist aber nach außen neutral. Es verhält sich wie ein Salz.');

  /* 3 Strukturebenen */
  var colors = ['#f97316', '#38bdf8', '#a78bfa', '#4ade80', '#f472b6', '#facc15'];
  function beads(n, x0, y0, dx) { var s = '', i; for (i = 0; i < n; i++) { if (i) s += L(x0 + (i - 1) * dx + 12, y0, x0 + i * dx - 12, y0, { w: 3 }); s += G.c(x0 + i * dx, y0, 12, { f: colors[i % 6], w: 1.6 }) + T(x0 + i * dx, y0 + 4, ['Ala', 'Gly', 'Ser', 'Lys', 'Val', 'Phe'][i % 6], { s: 8.5, b: 1 }); } return s; }
  function helix() { var d = 'M30 120', i; for (i = 0; i < 6; i++) d += ' c20 -50 40 -50 40 0 c0 30 30 30 30 -8'; return d; }
  A('p', 'gk', 'Primär-, Sekundär-, Tertiär-, Quartärstruktur', 'k', ['p6', 'p4'], [
    { h: '1. Primärstruktur = die Reihenfolge', t: 'Die <b>Primärstruktur</b> ist die <b>Aminosäuresequenz</b>: welche Aminosäure steht an welcher Stelle der Kette? Zusammengehalten wird sie von <b>Peptidbindungen</b>. Diese Reihenfolge legt alles Weitere fest.',
      f: G.svg(W, 120, beads(6, 56, 56, 50) + T(180, 104, 'Ala – Gly – Ser – Lys – Val – Phe – …', { s: 13, b: 1 })) },
    { h: '2. Sekundärstruktur = regelmäßige Muster', t: 'Die Kette bildet <b>Muster</b>, die durch <span class="bl">Wasserstoffbrücken</span> zwischen N–H und C=O der Peptidbindungen stabilisiert werden: die <b>α-Helix</b> (Schraube) und das <b>β-Faltblatt</b> (Ziehharmonika).',
      f: G.svg(W, 200, G.p('M20 90 c10 -62 40 -62 40 0 c0 20 -22 20 -22 0 c0 -62 40 -62 40 0 c0 20 -22 20 -22 0 c0 -62 40 -62 40 0', { s: B, w: 3.5 }) + T(75, 142, 'α-Helix', { b: 1 }) + G.l(42, 66, 58, 66, { c: R, d: '3 2', w: 2.2 }) + G.l(80, 66, 96, 66, { c: R, d: '3 2', w: 2.2 }) +
        G.p('M195 60 l22 -22 l22 22 l22 -22 l22 22 l22 -22', { s: N, w: 3.5 }) + G.p('M195 96 l22 -22 l22 22 l22 -22 l22 22 l22 -22', { s: N, w: 3.5 }) + [217, 239, 261, 283].map(function (x, i) { return G.l(x + (i % 2 ? 0 : 0), 76, x, 58, { c: R, d: '3 2', w: 2.2 }); }).join('') + T(262, 142, 'β-Faltblatt', { b: 1 }) + T(180, 184, 'rot gestrichelt = Wasserstoffbrücken', { c: R, s: 11 })) },
    { h: '3. Tertiärstruktur = die ganze Kette gefaltet', t: 'Die ganze Kette faltet sich zu einer <b>dreidimensionalen Form</b>. Dafür sorgen Wechselwirkungen zwischen den <b>Resten R</b>: Disulfidbrücken (S–S), Salzbrücken (+/−), Wasserstoffbrücken und die <b>hydrophobe Wechselwirkung</b> unpolarer Reste im Inneren.',
      f: G.svg(W, 210, G.p('M60 160 C30 100 70 40 130 50 C190 60 150 120 200 120 C260 120 300 60 290 110 C285 150 230 175 190 160 C150 150 110 190 60 160', { s: V, w: 5 }) + G.c(120, 60, 0.1) + G.l(110, 54, 200, 118, { c: O, w: 2.5, d: '4 3' }) + G.at(155, 85, 'S–S', { s: 12, r: 13, c: O }) + T(88, 120, '+ ⋯ −', { c: R, b: 1, s: 12 }) + T(230, 138, 'hydrophob', { c: N, b: 1, s: 12 }) + T(180, 202, 'Reste R halten die Form zusammen', { s: 11 })) },
    { h: '4. Quartärstruktur = mehrere Ketten zusammen', t: 'Manche Proteine bestehen aus <b>mehreren Untereinheiten</b>. Wie sie sich zusammenlagern, heißt <b>Quartärstruktur</b>. Beispiel: <b>Hämoglobin</b> aus vier Ketten (2 α und 2 β), jede trägt ein Häm mit Eisen für den Sauerstoff.',
      f: G.svg(W, 190, [[120, 60, '#fb923c', 'α'], [220, 60, '#38bdf8', 'β'], [120, 140, '#38bdf8', 'β'], [220, 140, '#fb923c', 'α']].map(function (u) { return G.c(u[0], u[1], 38, { f: u[2], w: 2 }) + T(u[0], u[1] + 6, u[3], { b: 1, s: 20 }) + G.c(u[0] + 14, u[1] + 12, 7, { f: R, s: I }) ; }).join('') + T(180, 192, '', {}) + T(300, 100, 'Häm', { c: R, b: 1, s: 12, a: 'start' }) + G.ar(300, 104, 236, 150, { c: R, w: 1.5 })) }
  ], 'Primär: Sequenz. Sekundär: Helix/Faltblatt (H-Brücken). Tertiär: ganze Kette gefaltet (Reste R). Quartär: mehrere Ketten zusammen.');

  /* 4 Kondensation */
  A('p', 'gk', 'Kondensation', 'k', ['p5'], [
    { h: 'Zwei werden eins, Wasser fällt ab', t: 'Bei einer <b>Kondensation</b> verbinden sich zwei Moleküle und dabei wird ein kleines Molekül abgespalten, meist <b>Wasser</b>. Aminosäuren verknüpfen sich so zur Peptidbindung.',
      f: G.svg(W, 170, G.r(8, 40, 100, 56, { f: '#dbeafe', s: B }) + T(58, 64, 'Aminosäure 1', { s: 12, b: 1 }) + T(58, 84, '…–C(=O)–', { s: 12 }) + T(104, 84, 'OH', { c: R, b: 1, a: 'end', s: 0 }) + G.r(124, 40, 100, 56, { f: '#dcfce7', s: N }) + T(174, 64, 'Aminosäure 2', { s: 12, b: 1 }) + T(174, 84, 'H–N–…', { s: 12 }) + T(115, 70, '+', { b: 1, s: 22 }) + G.ar(232, 68, 270, 68, { c: I }) + G.r(278, 30, 76, 76, { f: '#fef9c3', s: O }) + T(316, 62, 'Dipeptid', { b: 1, s: 12 }) + T(316, 82, '–CO–NH–', { s: 12, b: 1 }) + T(316, 146, '+ H₂O', { c: R, b: 1, s: 16 }) + G.ar(316, 108, 316, 126, { c: R, w: 1.6 })) },
    { h: 'Wo genau passiert das?', t: 'Die <b>OH-Gruppe</b> der Carboxy-Gruppe der ersten Aminosäure und ein <b>H-Atom</b> der Amino-Gruppe der zweiten treten als <span class="r">H₂O</span> aus. Zwischen C und N entsteht die <b>Peptidbindung</b>.',
      f: G.svg(W, 150, T(8, 62, 'H₂N–CHR–C(=O)', { s: 13, a: 'start' }) + T(124, 62, 'OH', { s: 13, b: 1, c: R, a: 'start' }) + T(149, 62, 'H', { s: 13, b: 1, c: R, a: 'start' }) + G.r(119, 44, 44, 26, { f: 'none', s: R, rx: 13, w: 2.4 }) + T(169, 62, 'NH–CHR–COOH', { s: 13, a: 'start' }) + G.ar(141, 74, 141, 112, { c: R, w: 2.2 }) + T(141, 132, 'H₂O', { c: R, b: 1, s: 15 }) + T(196, 108, '(OH der Carboxy-Gruppe', { s: 11, c: '#475569', a: 'start' }) + T(196, 124, '+ H der Amino-Gruppe)', { s: 11, c: '#475569', a: 'start' })) }
  ], 'Kondensation: Zwei Moleküle verbinden sich, ein kleines Molekül (hier H₂O) wird abgespalten.');

  /* 5 Hydrolyse */
  A('p', 'gk', 'Hydrolyse', 'k', ['p5', 'p7'], [
    { h: 'Mit Wasser spalten', t: 'Die <b>Hydrolyse</b> ist die Umkehrung der Kondensation: Wasser spaltet die Peptidbindung. Aus dem Dipeptid werden wieder <b>zwei Aminosäuren</b>. So verdaut dein Körper Proteine.',
      f: G.svg(W, 150, G.r(10, 44, 100, 56, { f: '#fef9c3', s: O }) + T(60, 66, 'Dipeptid', { b: 1, s: 12 }) + T(60, 86, '–CO–NH–', { s: 12 }) + T(135, 50, '+ H₂O', { c: R, b: 1, s: 15 }) + G.ar(106, 72, 200, 72, { c: I }) + G.r(210, 24, 62, 46, { f: '#dbeafe', s: B }) + T(241, 52, 'AS 1', { b: 1 }) + G.r(210, 82, 62, 46, { f: '#dcfce7', s: N }) + T(241, 110, 'AS 2', { b: 1 }) + T(318, 70, 'Enzyme', { s: 11, c: V, b: 1 }) + T(318, 84, '(Proteasen)', { s: 10, c: V })) },
    { h: 'Kondensation ⇄ Hydrolyse', t: 'Die beiden Reaktionen sind <b>Gegenspieler</b>: Aufbau mit Wasserabspaltung, Abbau mit Wasseraufnahme. Das gilt auch für Fette, Kohlenhydrate und Kunststoffe wie PET.',
      f: G.svg(W, 150, G.bub(14, 56, 100, 44, 'AS 1 + AS 2', { f: '#e0f2fe', s: B, b: 1 }) + G.bub(236, 56, 118, 44, 'Dipeptid + H₂O', { f: '#fef9c3', s: O, b: 1 }) + G.ar(120, 70, 230, 70, { c: N }) + T(180, 60, 'Kondensation', { c: N, b: 1, s: 12 }) + G.ar(230, 88, 120, 88, { c: R }) + T(180, 108, 'Hydrolyse', { c: R, b: 1, s: 12 })) }
  ], 'Hydrolyse = Spaltung mit Wasser. Sie kehrt die Kondensation um.');

  /* 6 Peptidbindung */
  A('p', 'gk', 'Peptidbindung', 'k', ['p5', 'p6'], [
    { h: 'Die Verknüpfung', t: 'Die <b>Peptidbindung</b> ist die Amid-Bindung <b>–CO–NH–</b> zwischen dem C-Atom der Carboxy-Gruppe und dem N-Atom der nächsten Amino-Gruppe. Viele davon ergeben die Kette eines Proteins.',
      f: G.svg(W, 150, G.at(30, 90, 'Cα', { s: 14, r: 12 }) + G.b(42, 90, 78, 90, 1) + G.at(90, 90, 'C', { s: 15 }) + G.b(90, 80, 90, 44, 2) + G.at(90, 36, 'O', { s: 15 }) + G.b(100, 90, 140, 90, 1, { c: R, w: 3.5 }) + G.at(152, 90, 'N', { s: 15 }) + G.b(152, 100, 152, 130, 1) + G.at(152, 136, 'H', { s: 15 }) + G.b(164, 90, 200, 90, 1) + G.at(212, 90, 'Cα', { s: 14, r: 12 }) + T(236, 104, 'Peptidbindung', { c: R, b: 1, s: 12, a: 'start' })) },
    { h: 'Die Bindung ist flach', t: 'Das freie Elektronenpaar des N ist teilweise zur C=O-Gruppe <b>delokalisiert</b>. Darum hat die C–N-Bindung <b>Doppelbindungscharakter</b>: Sie ist kurz, <b>nicht drehbar</b> und die sechs Atome Cα, C, O, N, H, Cα liegen in einer <b>Ebene</b>.',
      f: G.svg(W, 182, G.p('M22 174 L64 14 L338 14 L296 174 Z', { s: B, f: '#e0f2fe', w: 1.8, d: '6 4' }) + G.b(78, 112, 140, 76, 1) + G.b(140, 76, 212, 112, 1, { c: R, w: 3.5 }) + G.b(212, 112, 274, 76, 1) + G.b(140, 66, 140, 38, 2) + G.b(212, 122, 212, 146, 1) + G.at(78, 112, 'Cα', { s: 14, r: 13 }) + G.at(140, 76, 'C', { s: 15 }) + G.at(140, 30, 'O', { s: 15 }) + G.at(212, 112, 'N', { s: 15 }) + G.at(212, 152, 'H', { s: 15 }) + G.at(274, 76, 'Cα', { s: 14, r: 13 }) + T(250, 38, 'eine Ebene', { c: B, b: 1, s: 12 })) }
  ], 'Peptidbindung = –CO–NH–. Sie ist planar und nicht frei drehbar.');

  /* 7 essenzielle AS */
  A('p', 'gk', 'essenzielle Aminosäuren', 'k', ['p3', 'p1'], [
    { h: 'Die können wir nicht selbst bauen', t: 'Von den 20 proteinogenen Aminosäuren kann unser Körper <b>acht nicht selbst herstellen</b>. Wir müssen sie mit der Nahrung aufnehmen: <b>Valin, Leucin, Isoleucin, Methionin, Phenylalanin, Tryptophan, Threonin und Lysin</b>.',
      f: G.svg(W, 190, ['Val', 'Leu', 'Ile', 'Met', 'Phe', 'Trp', 'Thr', 'Lys'].map(function (n, i) { var x = 24 + (i % 4) * 82, y = 24 + Math.floor(i / 4) * 64; return G.r(x, y, 70, 48, { f: '#fff7ed', s: O, rx: 12 }) + T(x + 35, y + 30, n, { b: 1, s: 16, c: O }); }).join('') + T(180, 172, '8 essenzielle von 20 Aminosäuren', { b: 1, s: 12 })) },
    { h: 'Woher bekommen wir sie?', t: 'Aus <b>Eiern, Milch, Fleisch, Fisch</b> und auch aus <b>Hülsenfrüchten</b> oder Getreide. Pflanzliche Quellen kann man gut kombinieren, damit alle acht zusammenkommen. Für Säuglinge sind auch Arginin und Histidin <b>semi-essenziell</b>.',
      f: G.svg(W, 120, ['🥚', '🥛', '🐟', '🫘', '🌾'].map(function (e, i) { return T(40 + i * 70, 70, e, { s: 38 }); }).join('') + T(180, 108, 'Nahrung liefert die essenziellen Aminosäuren', { s: 12 })) }
  ], 'Essenziell = der Körper kann sie nicht selbst herstellen. Sie müssen mit der Nahrung kommen (8 Stück).');

  /* LK: Chiralität */
  function tet(x, y, o) {  // Tetraeder-Darstellung: Cα in Mitte, vier Substituenten
    o = o || {}; var s = '', m = o.mir ? -1 : 1;
    s += G.l(x, y, x - 42, y + 8, { w: 2.6 }) + G.l(x, y, x + 42, y + 8, { w: 2.6 }) + G.l(x, y, x, y - 48, { w: 2.6 });
    s += G.p('M' + (x - 4 * m) + ' ' + y + ' L' + (x - 22 * m) + ' ' + (y + 50) + ' L' + (x - 12 * m) + ' ' + (y + 52) + ' Z', { f: I, s: I, w: 1 });
    s += G.at(x, y, 'C', { s: 15, c: I });
    var c = o.c || [R, B, N, O], t = o.t || ['COOH', 'NH₂', 'R', 'H'];
    s += T(x - 48, y + 16, m > 0 ? t[0] : t[1], { c: m > 0 ? c[0] : c[1], b: 1, a: 'end' }) + T(x + 48, y + 16, m > 0 ? t[1] : t[0], { c: m > 0 ? c[1] : c[0], b: 1, a: 'start' }) + T(x, y - 54, t[2], { c: c[2], b: 1 }) + T(x - 16 * m, y + 68, t[3], { c: c[3], b: 1 });
    return s;
  }
  A('p', 'lk', 'Chiralität', 'k', ['p10'], [
    { h: 'Wie deine Hände', t: 'Deine linke und deine rechte Hand sind <b>Bild und Spiegelbild</b>, aber du bekommst sie <b>nicht zur Deckung</b>. Genau so verhalten sich <b>chirale</b> Moleküle: Sie sind spiegelbildlich, aber nicht deckungsgleich.',
      f: G.svg(W, 170, T(90, 100, '🤚', { s: 70 }) + '<text x="270" y="100" font-size="70" text-anchor="middle" transform="translate(540 0) scale(-1 1)">🤚</text>' + L(180, 14, 180, 150, { c: O, d: '5 4', w: 2.5 }) + T(180, 166, 'Spiegelebene', { c: O, s: 12, b: 1 }) + T(90, 142, 'links', { s: 12 }) + T(270, 142, 'rechts', { s: 12 })) },
    { h: 'Bei Aminosäuren', t: 'Fast alle Aminosäuren sind chiral, weil das Cα-Atom vier <b>verschiedene</b> Partner hat. Die beiden Spiegelbilder verhalten sich wie linke und rechte Hand. Ausnahme: <b>Glycin</b> (R = H) ist nicht chiral.',
      f: G.svg(W, 170, tet(96, 74) + tet(264, 74, { mir: 1 }) + L(180, 10, 180, 160, { c: O, d: '5 4', w: 2 })) }
  ], 'Chiral = Bild und Spiegelbild lassen sich nicht zur Deckung bringen. Ursache: ein Atom mit vier verschiedenen Partnern.');

  A('p', 'lk', 'asymmetrisch substituiertes C-Atom', 'k', ['p10'], [
    { h: 'Vier verschiedene Partner', t: 'Ein <b>asymmetrisch substituiertes C-Atom</b> trägt vier <b>verschiedene</b> Substituenten. Beim Cα der Aminosäuren sind das: <span class="r">COOH</span>, <span class="bl">NH₂</span>, <span class="gn">R</span> und <span class="or">H</span>. Solch ein Atom heißt auch <b>Stereozentrum</b>.',
      f: G.svg(W, 190, tet(180, 80)) },
    { h: 'Test: zwei gleiche = kein Stereozentrum', t: 'Bei <b>Glycin</b> ist R = H. Dann hängen <b>zwei gleiche</b> H-Atome am Cα. Es gibt kein Spiegelbild, das sich unterscheidet. Glycin ist deshalb die einzige Aminosäure ohne Chiralität.',
      f: G.svg(W, 190, tet(180, 80, { t: ['COOH', 'NH₂', 'H', 'H'], c: [R, B, O, O] }) + T(180, 178, 'zwei gleiche Partner (H, H)', { c: O, b: 1, s: 12 })) }
  ], 'Stereozentrum = C-Atom mit vier verschiedenen Substituenten.');

  A('p', 'lk', 'Enantiomer', 'k', ['p10', 'p11'], [
    { h: 'Spiegelbild-Isomere', t: '<b>Enantiomere</b> sind zwei Stereoisomere, die sich wie <b>Bild und Spiegelbild</b> verhalten. Bei Alanin gibt es L-Alanin und D-Alanin. Ihre Atome sind gleich verknüpft, aber im Raum anders angeordnet.',
      f: G.svg(W, 190, tet(96, 74, { t: ['COOH', 'NH₂', 'CH₃', 'H'] }) + tet(264, 74, { t: ['COOH', 'NH₂', 'CH₃', 'H'], mir: 1 }) + L(180, 10, 180, 170, { c: O, d: '5 4' }) + T(96, 176, 'L-Alanin', { b: 1 }) + T(264, 176, 'D-Alanin', { b: 1 })) },
    { h: 'Gleich und doch verschieden', t: 'Enantiomere haben <b>gleiche physikalische Eigenschaften</b> (Schmelzpunkt, Löslichkeit). Sie drehen aber die <b>Schwingungsebene von polarisiertem Licht</b> in entgegengesetzte Richtungen. Im Körper wirken sie oft unterschiedlich: Die Proteine bestehen fast nur aus <b>L</b>-Aminosäuren.',
      f: G.svg(W, 150, G.bub(30, 30, 130, 60, 'L-Form', { f: '#dbeafe', s: B, b: 1 }) + G.bub(200, 30, 130, 60, 'D-Form', { f: '#fee2e2', s: R, b: 1 }) + T(95, 112, 'dreht Licht z. B. nach rechts', { s: 11 }) + T(265, 112, 'dreht Licht nach links', { s: 11 }) + T(180, 140, 'gleicher Schmelzpunkt, gleiche Löslichkeit', { c: N, b: 1, s: 12 })) }
  ], 'Enantiomere: Spiegelbild-Isomere. Gleiche Eigenschaften, aber umgekehrte Drehung des polarisierten Lichts.');

  /* Fischer */
  function fischer(x, y, dir, lab) {
    var s = '';
    s += L(x, y - 60, x, y + 60, { w: 3 }) + L(x - 46, y, x + 46, y, { w: 3 });
    s += T(x, y - 68, 'COOH', { b: 1, c: R }) + T(x, y + 82, 'R', { b: 1, c: N, s: 14 }) + T(x + (dir > 0 ? 62 : -62), y + 5, 'NH₂', { b: 1, c: B, a: dir > 0 ? 'start' : 'end' }) + T(x + (dir > 0 ? -50 : 50), y + 5, 'H', { b: 1, c: O, a: dir > 0 ? 'end' : 'start' });
    return s + T(x, y + 108, lab, { b: 1 });
  }
  A('p', 'lk', 'FISCHER-Projektion', 'k', ['p11'], [
    { h: 'Räumliches Molekül auf Papier', t: 'In der <b>FISCHER-Projektion</b> zeichnest du die C-Kette <b>senkrecht</b>, die <b>Carboxy-Gruppe oben</b>. Senkrechte Bindungen zeigen <b>nach hinten</b>, waagerechte <b>zum Betrachter</b>. So lässt sich die Anordnung am Cα eindeutig festhalten.',
      f: G.svg(W, 215, fischer(110, 90, -1, 'L-Aminosäure') + T(290, 70, 'senkrecht:', { s: 12, a: 'middle', c: GRY(), b: 1 }) + T(290, 86, 'hinter dem Papier', { s: 11, c: GRY() }) + T(290, 116, 'waagerecht:', { s: 12, c: GRY(), b: 1 }) + T(290, 132, 'vor dem Papier', { s: 11, c: GRY() })) },
    { h: 'So liest du L und D', t: 'Steht die <b>Amino-Gruppe links</b> (H rechts), ist es eine <b>L</b>-Aminosäure. Steht sie <b>rechts</b>, ist es eine <b>D</b>-Aminosäure. Die Proteine des Körpers bestehen aus L-Aminosäuren.',
      f: G.svg(W, 215, fischer(100, 90, -1, 'L') + fischer(260, 90, 1, 'D') + L(180, 10, 180, 190, { c: O, d: '5 4' })) }
  ], 'Fischer: C-Kette senkrecht, COOH oben. NH₂ links = L, NH₂ rechts = D.');
  function GRY() { return '#64748b'; }

  A('p', 'lk', 'α-L-/α-D-Aminosäure', 'k', ['p11'], [
    { h: 'Zwei Reihen', t: 'Je nachdem, wo in der FISCHER-Projektion die Amino-Gruppe steht, gehört die Aminosäure zur <b>L-Reihe</b> (links) oder <b>D-Reihe</b> (rechts). Das L und D bezieht sich auf die <b>räumliche Anordnung</b>, nicht auf die Drehrichtung des Lichts.',
      f: G.svg(W, 215, fischer(100, 90, -1, 'α-L-Aminosäure') + fischer(260, 90, 1, 'α-D-Aminosäure') + L(180, 10, 180, 190, { c: O, d: '5 4' })) },
    { h: 'In der Natur fast nur L', t: 'Alle Proteine im Körper bauen sich aus <b>α-L-Aminosäuren</b> auf. D-Aminosäuren kommen selten vor, zum Beispiel in manchen Bakterienwänden. Auch das gehört zum Bild vom „Schlüssel-Schloss“ zwischen Molekülen.',
      f: G.svg(W, 120, G.bub(30, 30, 130, 56, 'L: in Proteinen', { f: '#dcfce7', s: N, b: 1 }) + G.bub(200, 30, 130, 56, 'D: selten', { f: '#fef3c7', s: O, b: 1 })) }
  ], 'Alle Proteinbausteine sind α-L-Aminosäuren.');

  A('p', 'lk', 'EPA-Modell', 'k', ['p12'], [
    { h: 'Elektronenwolken stoßen sich ab', t: 'Das <b>EPA-Modell</b> (Elektronenpaar-Abstoßung) sagt: Elektronenwolken um ein Atom stoßen sich ab und gehen sich möglichst weit aus dem Weg. Mehrfachbindung zählt als <b>eine</b> Wolke. Vier Wolken ergeben einen <b>Tetraeder</b> (109,5°), drei Wolken eine <b>Ebene</b> (120°).',
      f: G.svg(W, 180, tet(95, 70) + T(95, 176, '4 Wolken: Tetraeder', { s: 12, b: 1 }) + G.p('M260 60 L260 96 M260 96 L232 120 M260 96 L288 120', { w: 3 }) + G.at(260, 96, 'C', { s: 15 }) + T(260, 52, '3 Wolken', { s: 12 }) + T(260, 176, 'Ebene, 120°', { s: 12, b: 1 })) },
    { h: 'Das Cα ist tetraedrisch', t: 'Das <b>Cα-Atom</b> hat vier Bindungspartner. Es ist deshalb <b>tetraedrisch</b> gebaut, mit Winkeln von etwa 109,5°. Genau das macht es zum Stereozentrum.',
      f: G.svg(W, 190, tet(180, 80, { t: ['COOH', 'NH₂', 'R', 'H'] }) + T(180, 176, 'Cα: Tetraeder', { b: 1 })) },
    { h: 'Der Stickstoff der Peptidbindung ist eben', t: 'Am N sitzen drei Partner und ein freies Paar. Das EPA-Modell würde eine <b>Pyramide</b> erwarten. In der Peptidbindung ist das Paar aber <b>delokalisiert</b> (Mesomerie): zwei Grenzformeln mit Doppelbindung C=O oder C=N⁺. Darum ist die Umgebung <b>planar</b>.',
      f: G.svg(W, 150, T(80, 60, 'C(=O)–N', { s: 16, b: 1 }) + G.c(104, 42, 2.2, { f: R, s: R }) + G.c(112, 42, 2.2, { f: R, s: R }) + G.ar(175, 60, 222, 60, { c: I }) + G.ar(175, 60, 128, 60, { c: I }) + T(275, 60, 'C(–O⁻)=N⁺', { s: 16, b: 1 }) + T(180, 120, 'Mesomerie: Grenzformeln', { c: O, b: 1, s: 12 }) + T(180, 140, '→ C–N hat Doppelbindungscharakter', { s: 11 })) }
  ], 'EPA: Cα tetraedrisch, Peptidbindung planar (Delokalisierung des N-Elektronenpaars).');
})();
