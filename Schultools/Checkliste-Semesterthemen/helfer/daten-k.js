/* Erklärfolien Q1 Kunststoffe (Kolbi) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  var C6 = ['#f97316', '#38bdf8', '#a78bfa', '#4ade80', '#f472b6', '#facc15'];
  function mono(x, y, col, lab) { return G.c(x, y, 13, { f: col, w: 1.8 }) + (lab ? T(x, y + 4, lab, { s: 9, b: 1 }) : ''); }
  function chainOf(n, x0, y, dx, col, lab) { var s = '', i; for (i = 0; i < n; i++) { if (i) s += L(x0 + (i - 1) * dx + 13, y, x0 + i * dx - 13, y, { w: 3 }); s += mono(x0 + i * dx, y, col || C6[i % 6], lab); } return s; }
  function ethene(x, y, sub) { return G.at(x - 30, y, 'C', { s: 15 }) + G.at(x + 30, y, 'C', { s: 15 }) + G.b(x - 30, y, x + 30, y, 2) + T(x - 46, y - 18, 'H', { b: 1 }) + T(x - 46, y + 26, 'H', { b: 1 }) + T(x + 46, y - 18, 'H', { b: 1 }) + T(x + 46, y + 26, sub || 'H', { b: 1, c: sub ? N : I }) + L(x - 36, y - 8, x - 44, y - 16, {}) + L(x - 36, y + 8, x - 44, y + 18, {}) + L(x + 36, y - 8, x + 44, y - 16, {}) + L(x + 36, y + 8, x + 44, y + 18, {}); }

  A('k', 'gk', 'Monomer, Makromolekül, Polymer', 'k', ['k1', 'k4'], [
    { h: 'Aus klein mach groß', t: '<b>Monomere</b> sind kleine Moleküle (z. B. Ethen). Werden sehr viele zu einer langen Kette verknüpft, entsteht ein <b>Makromolekül</b>. Das fertige Material heißt <b>Polymer</b> (griech. „viele Teile“).',
      f: G.svg(W, 170, T(60, 32, 'Monomere', { b: 1, c: B }) + [0, 1, 2, 3].map(function (i) { return mono(30 + i * 22, 62, C6[1]); }).join('') + G.ar(125, 62, 175, 62, { c: I }) + T(150, 50, 'verknüpfen', { s: 11 }) + chainOf(7, 195, 62, 22, C6[1]) + T(262, 32, 'Polymer (Makromolekül)', { b: 1, c: O }) + T(180, 130, 'z. B. Ethen → Polyethen (PE)', { s: 13 }) + T(180, 152, 'Molare Masse oft über 10 000 g/mol', { s: 11, c: '#475569' })) },
    { h: 'Die Wiederholeinheit', t: 'In der Kette wiederholt sich ein Baustein immer wieder: die <b>Repetiereinheit</b>. Man schreibt sie in eckigen Klammern mit dem Index <b>n</b> (Anzahl der Wiederholungen).',
      f: G.svg(W, 150, T(180, 40, '[ –CH₂–CH₂– ]ₙ', { s: 24, b: 1 }) + T(180, 80, 'Repetiereinheit von Polyethen', { c: R, b: 1 }) + T(180, 110, 'n = einige 1000', { s: 12 })) }
  ], 'Monomer = Baustein, Polymer = Kette aus vielen Monomeren (Makromolekül).');

  /* Elektrophil */
  A('k', 'gk', 'Elektrophil, elektrophiler Angriff', 'k', ['k3'], [
    { h: 'Elektronen-Liebhaber', t: 'Ein <b>Elektrophil</b> (griech. „elektronenliebend“) ist ein Teilchen mit <b>Elektronenmangel</b>, meist positiv geladen oder positiv polarisiert, zum Beispiel H⁺. Es greift Stellen mit hoher Elektronendichte an, etwa eine <b>C=C-Doppelbindung</b>.',
      f: G.svg(W, 150, T(60, 70, 'H⁺', { s: 30, b: 1, c: R }) + T(60, 102, 'Elektrophil', { c: R, b: 1, s: 12 }) + G.ar(100, 66, 180, 66, { c: R, w: 3 }) + ethene(250, 66) + G.c(250, 66, 20, { f: '#bfdbfe', s: B, op: .3 }) + T(250, 116, 'viel Elektronendichte (π-Bindung)', { c: B, s: 11 })) },
    { h: 'Der Angriff', t: 'Das π-Elektronenpaar der Doppelbindung bildet eine neue Bindung zum Elektrophil. Dabei bleibt am anderen C-Atom ein <b>Elektronenmangel</b> zurück: Es entsteht ein <b>Carbenium-Ion</b>.',
      f: G.svg(W, 170, ethene(110, 70) + G.p('M110 56 C110 20 190 20 196 62', { s: R, w: 2.6, m: 1 }) + T(200, 78, 'H⁺', { s: 22, c: R, b: 1, a: 'start' }) + G.ar(230, 70, 270, 70, { c: I }) + T(300, 66, 'C⁺', { s: 20, b: 1, c: B }) + T(300, 92, 'Carbenium-Ion', { s: 11 }) + T(180, 150, 'Pfeil = Elektronenpaar wandert zum H⁺', { s: 11, c: R })) }
  ], 'Elektrophil: elektronenarmes Teilchen, das Elektronendichte angreift (z. B. eine C=C-Bindung).');

  A('k', 'gk', 'Polarisierung', 'k', ['k3'], [
    { h: 'Ungleich verteilte Elektronen', t: 'Bindet sich Wasserstoff an Chlor, zieht Cl die Bindungselektronen stärker an (höhere <b>Elektronegativität</b>). Die Bindung ist <b>polarisiert</b>: H trägt eine Teilladung <span class="bl">δ⁺</span>, Cl eine Teilladung <span class="r">δ⁻</span>.',
      f: G.svg(W, 140, G.c(110, 70, 30, { f: '#dbeafe', s: B }) + T(110, 76, 'H', { s: 20, b: 1 }) + G.c(210, 70, 40, { f: '#fee2e2', s: R }) + T(210, 76, 'Cl', { s: 22, b: 1 }) + T(110, 40, 'δ⁺', { c: B, b: 1, s: 16 }) + T(210, 34, 'δ⁻', { c: R, b: 1, s: 16 }) + G.ar(130, 70, 170, 70, { c: O, w: 3 }) + T(245, 120, 'Elektronen wandern zum Cl', { c: O, s: 11, a: 'middle' })) },
    { h: 'Warum ist das wichtig?', t: 'Polarisierte Bindungen machen Moleküle <b>reaktiv</b>: das H⁺-Ende ist ein Elektrophil. So kann HCl eine Doppel- oder Dreifachbindung <b>angreifen</b>.',
      f: G.svg(W, 120, T(180, 50, 'H–Cl  ⟶  H⁺ + Cl⁻', { s: 22, b: 1 }) + T(180, 86, 'die polare Bindung bricht „ungleichmäßig“', { s: 12, c: '#475569' })) }
  ], 'Polarisierung: Elektronen sind in einer Bindung zum elektronegativeren Atom verschoben (δ⁺/δ⁻).');

  A('k', 'gk', 'Übergangskomplex', 'k', ['k3'], [
    { h: 'Der Moment dazwischen', t: 'Auf dem Weg von den Edukten zu den Produkten gibt es einen Punkt mit der <b>höchsten Energie</b>: den <b>Übergangskomplex</b>. Alte Bindungen sind halb gelöst, neue halb gebildet. Er ist <b>nicht isolierbar</b>.',
      f: G.energy({ exo: 1 }).replace('</svg>', G.c(180, 28, 5, { f: R, s: R }) + T(180, 14, 'Übergangskomplex', { c: R, b: 1, s: 12 }) + '</svg>') },
    { h: 'Zwischenprodukt ist etwas anderes', t: 'Ein <b>Zwischenprodukt</b> (z. B. das Carbenium-Ion) liegt in einer „Mulde“ der Energiekurve. Es lässt sich unter Umständen nachweisen. Der Übergangskomplex sitzt dagegen immer auf dem <b>Gipfel</b>.',
      f: G.svg(W, 190, G.ax(40, 170, 290, 150, 'Reaktionsverlauf', 'Energie') + G.p('M50 130 C80 130 80 50 110 50 C135 50 135 100 160 100 C185 100 185 36 215 36 C245 36 245 140 290 140', { s: O, w: 3 }) + G.c(110, 50, 4, { f: R, s: R }) + G.c(215, 36, 4, { f: R, s: R }) + T(110, 38, 'Übergangskomplex', { s: 10, c: R, b: 1 }) + T(215, 24, 'Übergangskomplex', { s: 10, c: R, b: 1 }) + T(160, 120, 'Zwischenprodukt', { c: B, b: 1, s: 11 }) + T(160, 90, '', { })) }
  ], 'Übergangskomplex = energiereichster Zustand auf dem Reaktionsweg, nicht isolierbar.');

  A('k', 'gk', 'heterolytische Spaltung', 'k', ['k3'], [
    { h: 'Ungleiche Teilung', t: 'Bei der <b>heterolytischen Spaltung</b> bekommt <b>ein</b> Atom beide Bindungselektronen. So entstehen <b>Ionen</b>: zum Beispiel H–Cl → H⁺ + Cl⁻. Das Cl-Atom nimmt das Elektronenpaar mit.',
      f: G.svg(W, 140, T(60, 60, 'H', { s: 22, b: 1 }) + L(76, 56, 112, 56, {}) + T(130, 60, 'Cl', { s: 22, b: 1 }) + G.p('M94 44 C100 30 112 30 118 40', { s: R, w: 2.4, m: 1 }) + G.ar(160, 56, 200, 56, { c: I }) + T(230, 60, 'H⁺', { s: 22, b: 1, c: B }) + T(250, 60, '+', { s: 22 }) + T(290, 60, 'Cl⁻', { s: 22, b: 1, c: R }) + T(180, 110, 'Elektronenpaar geht an Cl', { c: R, s: 12 })) },
    { h: 'Der Gegenbegriff', t: 'Bei der <b>homolytischen Spaltung</b> (Radikale) würde jedes Atom <b>ein</b> Elektron behalten. Das lernst du später bei der radikalischen Polymerisation. Merke: <b>hetero = ungleich</b>, <b>homo = gleich</b>.',
      f: G.svg(W, 120, G.bub(24, 30, 150, 56, 'hetero → Ionen', { f: '#dbeafe', s: B, b: 1 }) + G.bub(186, 30, 150, 56, 'homo → Radikale', { f: '#fee2e2', s: R, b: 1 })) }
  ], 'Heterolytisch: ein Atom erhält beide Bindungselektronen, es entstehen Ionen.');

  A('k', 'gk', 'Carbenium-Ion', 'k', ['k3'], [
    { h: 'Ein C⁺ mit Elektronenmangel', t: 'Ein <b>Carbenium-Ion</b> ist ein Teilchen mit einem <b>positiv geladenen C-Atom</b>, das nur drei Bindungspartner hat und deshalb ein Elektronenpaar zu wenig besitzt. Es ist sehr reaktiv.',
      f: G.svg(W, 160, G.at(180, 80, 'C', { s: 24, r: 18 }) + T(196, 62, '+', { c: R, b: 1, s: 20, a: 'start' }) + L(180, 62, 180, 30, { w: 3 }) + L(168, 94, 140, 118, { w: 3 }) + L(192, 94, 220, 118, { w: 3 }) + T(180, 24, 'R', { b: 1 }) + T(134, 132, 'R', { b: 1 }) + T(226, 132, 'R', { b: 1 }) + T(180, 150, 'eben gebaut, 3 Bindungen', { s: 11, c: '#475569' })) },
    { h: 'Wie geht es weiter?', t: 'Das C⁺ wird von einem <b>Nucleophil</b> (z. B. Cl⁻) schnell gebunden, denn es hat Elektronen im Überfluss. So endet die elektrophile Addition: Aus Ethin und HCl entsteht <b>Chlorethen (Vinylchlorid)</b>.',
      f: G.svg(W, 150, T(70, 70, '[H–CH=C⁺–H]', { s: 17, b: 1 }) + T(70, 96, 'Carbenium-Ion', { s: 11 }) + T(182, 56, '+ Cl⁻', { c: R, b: 1 }) + G.ar(150, 70, 214, 70, { c: I }) + T(296, 70, 'H₂C=CHCl', { s: 18, b: 1, c: N }) + T(296, 96, 'Vinylchlorid', { s: 11 })) }
  ], 'Carbenium-Ion: C-Atom mit positiver Ladung und nur drei Bindungspartnern.');

  /* Veresterung */
  A('k', 'gk', 'Veresterung, Kondensationsreaktion', 'k', ['k5', 'k13'], [
    { h: 'Säure + Alkohol → Ester + Wasser', t: 'Bei der <b>Veresterung</b> reagiert eine <b>Carbonsäure</b> mit einem <b>Alkohol</b>. Es entsteht ein <b>Ester</b> und Wasser. Weil dabei Wasser abgespalten wird, ist das eine <b>Kondensationsreaktion</b>.',
      f: G.svg(W, 150, T(180, 40, 'R–C(=O)–OH  +  H–O–R′', { s: 18, b: 1 }) + G.ar(180, 54, 180, 84, { c: I }) + T(180, 110, 'R–C(=O)–O–R′  +  H₂O', { s: 18, b: 1 }) + T(60, 134, 'Säure + Alkohol', { s: 11, c: '#475569' }) + T(300, 134, 'Ester + Wasser', { s: 11, c: '#475569' })) },
    { h: 'Für Kunststoffe: Polyester', t: 'Hat jedes Monomer <b>zwei</b> reaktive Gruppen (eine Dicarbonsäure und ein Diol), entsteht eine lange Kette: ein <b>Polyester</b> wie PET. Bei jeder Verknüpfung wird ein H₂O frei.',
      f: G.svg(W, 150, G.r(8, 40, 92, 34, { f: '#fee2e2', s: R }) + T(54, 62, 'HOOC–R–COOH', { s: 10, b: 1 }) + G.r(104, 40, 72, 34, { f: '#dbeafe', s: B }) + T(140, 62, 'HO–R′–OH', { s: 10, b: 1 }) + G.ar(182, 57, 204, 57, { c: I }) + T(284, 52, '…–CO–O–R′–O–CO–…', { s: 11, b: 1 }) + T(284, 70, 'Polyester', { s: 11, c: O, b: 1 }) + T(284, 110, '+ n H₂O', { c: R, b: 1, s: 14 })) }
  ], 'Veresterung: Säure + Alkohol → Ester + Wasser (Kondensationsreaktion).');

  A('k', 'gk', 'Polymerisat, Polykondensat', 'k', ['k4', 'k5'], [
    { h: 'Zwei Wege zum Kunststoff', t: 'Ein <b>Polymerisat</b> entsteht durch <b>Polymerisation</b> aus Monomeren mit <b>C=C-Doppelbindung</b>. Es wird <b>nichts</b> abgespalten (z. B. PE, PVC). Ein <b>Polykondensat</b> entsteht aus Monomeren mit <b>zwei funktionellen Gruppen</b>, dabei wird ein <b>kleines Molekül</b> (H₂O) abgespalten (z. B. PET).',
      f: G.svg(W, 190, G.bub(10, 20, 160, 60, 'Polymerisat', { f: '#dcfce7', s: N, b: 1 }) + T(90, 100, 'C=C wird aufgebrochen', { s: 11 }) + T(90, 118, 'nichts wird abgespalten', { s: 11 }) + T(90, 138, 'PE · PVC · PS', { s: 12, b: 1, c: N }) + G.bub(190, 20, 160, 60, 'Polykondensat', { f: '#fef3c7', s: O, b: 1 }) + T(270, 100, '2 funktionelle Gruppen', { s: 11 }) + T(270, 118, '+ H₂O (o. Ä.) frei', { s: 11, c: R }) + T(270, 138, 'PET · Nylon', { s: 12, b: 1, c: O })) }
  ], 'Polymerisat: aus C=C-Monomeren, ohne Abspaltung. Polykondensat: aus bifunktionellen Monomeren unter Abspaltung (z. B. H₂O).');

  A('k', 'gk', 'Pyrolyse, Hydrolyse', 'k', ['k8'], [
    { h: 'Rohstoffliches Recycling', t: 'Beim <b>rohstofflichen Recycling</b> wird der Kunststoff chemisch in kleine Bausteine zerlegt. <b>Pyrolyse</b>: Spaltung durch <b>Hitze ohne Sauerstoff</b> (bis ca. 500 °C), es entstehen Öle und Gase. <b>Hydrolyse</b>: Spaltung mit <b>Wasser</b> (z. B. PET in Terephthalsäure und Ethandiol).',
      f: G.svg(W, 170, G.bub(14, 56, 80, 44, 'Kunststoff', { f: '#e0f2fe', s: B, b: 1 }) + G.ar(100, 70, 150, 40, { c: R }) + T(160, 26, 'Pyrolyse', { c: R, b: 1 }) + T(160, 40, '(Hitze, ohne O₂)', { s: 10, c: R, a: 'start' }) + G.bub(250, 14, 100, 40, 'Öle · Gase', { f: '#fee2e2', s: R, b: 1 }) + G.ar(100, 86, 150, 120, { c: B }) + T(160, 128, 'Hydrolyse', { c: B, b: 1, a: 'start' }) + T(160, 142, '(Wasser)', { s: 10, c: B, a: 'start' }) + G.bub(250, 108, 100, 40, 'Monomere', { f: '#dbeafe', s: B, b: 1 })) }
  ], 'Pyrolyse: Zersetzung durch Hitze ohne Sauerstoff. Hydrolyse: Spaltung durch Wasser. Beides rohstoffliches Recycling.');

  A('k', 'gk', 'Schwimm-Sink-Verfahren', 'k', ['k8'], [
    { h: 'Trennen nach Dichte', t: 'Zerkleinerte Kunststoffe kommen in Wasser (Dichte 1,0 g/cm³). <b>Leichtere</b> Sorten wie PE und PP <b>schwimmen</b>, <b>dichtere</b> wie PET und PVC <b>sinken</b>. So lassen sie sich grob trennen, ein Verfahren fürs <b>werkstoffliche Recycling</b>.',
      f: G.svg(W, 190, G.r(60, 50, 240, 110, { f: '#bae6fd', s: B, rx: 8 }) + L(60, 50, 300, 50, { c: B, w: 3 }) + [['PE', 110, 66], ['PP', 190, 62], ['PS?', 260, 70]].slice(0, 2).map(function (u) { return G.bub(u[1] - 24, u[2] - 28, 48, 22, u[0], { f: '#fef3c7', s: O, b: 1 }); }).join('') + [['PET', 110, 130], ['PVC', 200, 138]].map(function (u) { return G.bub(u[1] - 24, u[2] - 12, 48, 22, u[0], { f: '#fee2e2', s: R, b: 1 }); }).join('') + T(180, 30, 'schwimmt (ρ < 1 g/cm³)', { c: O, b: 1, s: 12 }) + T(180, 182, 'sinkt (ρ > 1 g/cm³)', { c: R, b: 1, s: 12 })) }
  ], 'Schwimm-Sink-Verfahren: Trennung von Kunststoffen nach ihrer Dichte in Wasser.');

  /* LK */
  A('k', 'lk', 'Startradikal', 'k', ['k11'], [
    { h: 'Ein Teilchen mit einem ungepaarten Elektron', t: 'Ein <b>Radikal</b> hat ein <b>ungepaartes Elektron</b> (Punkt) und ist sehr reaktiv. Ein <b>Initiator</b> (z. B. ein Peroxid R–O–O–R) zerfällt bei Wärme oder Licht in zwei <b>Startradikale</b> R–O•.',
      f: G.svg(W, 130, T(60, 62, 'R–O–O–R', { s: 20, b: 1 }) + G.ar(130, 58, 190, 58, { c: R }) + T(160, 44, 'Wärme/Licht', { s: 10, c: R }) + T(270, 62, '2 R–O•', { s: 20, b: 1, c: R }) + T(270, 88, 'Startradikale', { s: 11 })) }
  ], 'Startradikal: Teilchen mit ungepaartem Elektron, das die Kettenreaktion startet.');
  A('k', 'lk', 'homolytische Spaltung', 'k', ['k11', 'r5'], [
    { h: 'Gleichmäßig geteilt', t: 'Bei der <b>homolytischen Spaltung</b> bekommt jedes Atom <b>ein</b> Elektron der Bindung. Es entstehen zwei <b>Radikale</b> (nicht Ionen). Sie braucht Energie, meist Wärme oder Licht.',
      f: G.svg(W, 140, T(60, 62, 'Cl', { s: 22, b: 1 }) + L(78, 58, 108, 58, {}) + T(124, 62, 'Cl', { s: 22, b: 1 }) + G.p('M80 40 C84 26 96 26 100 38', { s: R, w: 2.2, m: 1 }) + G.p('M118 40 C114 26 104 26 100 38', { s: R, w: 2.2, m: 1, op: 0 }) + G.ar(150, 58, 200, 58, { c: R }) + T(230, 62, 'Cl•', { s: 22, b: 1, c: R }) + T(270, 62, '+', { s: 22 }) + T(300, 62, 'Cl•', { s: 22, b: 1, c: R }) + T(180, 110, 'jedes Atom behält ein Elektron', { s: 12, c: R })) }
  ], 'Homolytisch: jedes Atom behält ein Bindungselektron → Radikale.');
  A('k', 'lk', 'Initiation, Kettenstart', 'k', ['k11'], [
    { h: 'Schritt 1: Start', t: 'Bei der <b>Initiation</b> (Kettenstart) greift das Startradikal ein Monomer an: Es öffnet die C=C-Doppelbindung und bindet sich an ein C-Atom. Am anderen C bleibt das ungepaarte Elektron: ein <b>Monomer-Radikal</b> ist entstanden.',
      f: G.svg(W, 150, T(34, 62, 'R–O•', { s: 16, b: 1, c: R }) + T(70, 62, '+', { s: 18 }) + T(128, 62, 'CH₂=CH–X', { s: 16, b: 1 }) + G.ar(180, 58, 208, 58, { c: I }) + T(290, 62, 'R–O–CH₂–CH•–X', { s: 12, b: 1, c: R }) + T(290, 84, 'Monomer-Radikal', { s: 11 }) + T(180, 126, 'Die Doppelbindung wird „aufgeklappt“.', { s: 12, c: '#475569' })) }
  ], 'Initiation: Startradikal addiert an ein Monomer. Es entsteht ein Monomer-Radikal.');
  A('k', 'lk', 'Monomer-Radikal', 'k', ['k11'], [
    { h: 'Das Ende bleibt aktiv', t: 'Das <b>Monomer-Radikal</b> besitzt am Kettenende ein ungepaartes Elektron. Es ist weiter sehr reaktiv und greift das <b>nächste Monomer</b> an. So hält die Reaktion sich selbst am Laufen: eine <b>Kettenreaktion</b>.',
      f: G.svg(W, 130, T(80, 60, '~~CH₂–CH•', { s: 18, b: 1 }) + T(80, 84, 'aktives Ende', { s: 11, c: R }) + T(150, 56, '+', { s: 20 }) + T(220, 60, 'CH₂=CH', { s: 18, b: 1 }) + G.ar(262, 56, 290, 56, { c: I }) + T(332, 60, 'länger', { s: 13, c: N, b: 1 })) }
  ], 'Monomer-Radikal: Kettenende mit ungepaartem Elektron, das weiter reagiert.');
  A('k', 'lk', 'Kettenwachstum', 'k', ['k11'], [
    { h: 'Schritt 2: Wachsen', t: 'Beim <b>Kettenwachstum</b> addiert das Radikal-Ende ein Monomer nach dem anderen. Jedes Mal bleibt das Elektron am neuen Kettenende. Die Kette wächst in Sekundenbruchteilen auf mehrere tausend Monomere.',
      f: G.svg(W, 150, chainOf(6, 40, 60, 28, '#38bdf8') + G.c(220, 60, 6, { f: R, s: R }) + T(220, 40, '•', { c: R, b: 1, s: 22 }) + G.c(262, 60, 13, { f: '#fde68a' }) + T(262, 90, 'Monomer', { s: 11 }) + G.ar(248, 60, 236, 60, { c: R }) + T(180, 130, 'jedes Monomer verlängert die Kette um ein Glied', { s: 12 })) }
  ], 'Kettenwachstum: das Radikal-Ende addiert immer weitere Monomere.');
  A('k', 'lk', 'Kettenabbruch', 'k', ['k11', 'r5'], [
    { h: 'Schritt 3: Ende', t: 'Die Kette hört auf zu wachsen, wenn sich <b>zwei Radikale</b> treffen und ihre ungepaarten Elektronen zu einer Bindung vereinigen (<b>Rekombination</b>). Dann ist kein Radikal mehr übrig.',
      f: G.svg(W, 130, chainOf(3, 40, 50, 24, '#38bdf8') + T(114, 54, '•', { c: R, b: 1, s: 22 }) + T(182, 54, '•', { c: R, b: 1, s: 22 }) + chainOf(3, 200, 50, 24, '#fb923c') + G.ar(180, 82, 180, 104, { c: I }) + chainOf(3, 40, 118, 24, '#38bdf8') + L(76, 118, 140, 118, { w: 3 }) + chainOf(3, 136, 118, 24, '#fb923c').replace('', '')) }
  ], 'Kettenabbruch: Zwei Radikale verbinden sich, die Kettenreaktion endet (Rekombination).');
  A('k', 'lk', 'Copolymer', 'k', ['k12'], [
    { h: 'Zwei verschiedene Monomere', t: 'Ein <b>Copolymer</b> entsteht aus mindestens <b>zwei verschiedenen Monomeren</b>. Je nach Anordnung (abwechselnd, zufällig, in Blöcken) bekommt der Kunststoff <b>neue Eigenschaften</b>, z. B. SBR-Gummi aus Styrol und Butadien.',
      f: G.svg(W, 180, T(30, 36, 'abwechselnd', { s: 11, a: 'start' }) + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return mono(120 + i * 28, 32, i % 2 ? '#fb923c' : '#38bdf8'); }).join('') + T(30, 86, 'zufällig', { s: 11, a: 'start' }) + [0, 1, 1, 0, 1, 0, 0, 1].map(function (u, i) { return mono(120 + i * 28, 82, u ? '#fb923c' : '#38bdf8'); }).join('') + T(30, 136, 'Blöcke', { s: 11, a: 'start' }) + [0, 0, 0, 0, 1, 1, 1, 1].map(function (u, i) { return mono(120 + i * 28, 132, u ? '#fb923c' : '#38bdf8'); }).join('') + T(180, 172, 'Mischung der Eigenschaften beider Monomere', { s: 11 })) }
  ], 'Copolymer: Kette aus mindestens zwei verschiedenen Monomeren.');
  A('k', 'lk', 'Nucleophil, nucleophiler Angriff', 'k', ['k13', 'g7'], [
    { h: 'Kern-Liebhaber', t: 'Ein <b>Nucleophil</b> (griech. „kernliebend“) hat ein <b>freies Elektronenpaar</b> oder ist negativ geladen. Es greift eine Stelle mit <b>Elektronenmangel</b> an (positiv polarisiertes C-Atom). Beispiele: OH⁻, NH₃, Cl⁻, R–OH.',
      f: G.svg(W, 150, T(70, 70, 'Nu⁻', { s: 26, b: 1, c: B }) + T(70, 96, 'Nucleophil', { s: 11, c: B, b: 1 }) + G.ar(110, 66, 190, 66, { c: B, w: 3 }) + T(250, 70, 'Cδ⁺', { s: 24, b: 1 }) + T(250, 96, '(Elektronenmangel)', { s: 11 }) + T(180, 130, 'Elektronenpaar → Bindung', { s: 12, c: B })) },
    { h: 'Beim Polyester', t: 'Das O-Atom des Alkohols (Diol) hat freie Elektronenpaare. Es greift das <b>positiv polarisierte Carbonyl-C</b> der Carbonsäure an (C=O: C ist δ⁺). Nach Abspaltung von Wasser ist die <b>Esterbindung</b> geknüpft.',
      f: G.svg(W, 150, T(70, 70, 'R–O–H', { s: 18, b: 1, c: B }) + T(70, 52, '··', { c: R, b: 1 }) + G.ar(105, 66, 182, 66, { c: B, w: 2.6 }) + T(220, 70, 'R′–C(=O)–OH', { s: 18, b: 1 }) + T(172, 90, 'δ⁺', { c: B, s: 11 }) + T(180, 130, '→ Ester + H₂O', { s: 14, b: 1, c: N })) }
  ], 'Nucleophil: Teilchen mit freiem Elektronenpaar, das ein positiv polarisiertes Atom angreift.');
  A('k', 'lk', 'Amid-Gruppe', 'k', ['k14'], [
    { h: 'Die Gruppe –CO–NH–', t: 'Die <b>Amid-Gruppe</b> verknüpft bei <b>Polyamiden</b> die Monomere: Aus einer <b>Carbonsäure</b> und einem <b>Amin</b> entsteht –CO–NH– und Wasser. Sie ist dieselbe Bindung wie die Peptidbindung im Protein!',
      f: G.svg(W, 150, T(180, 50, '–C(=O)–N(H)–', { s: 24, b: 1 }) + T(180, 84, 'Amid-Gruppe = Peptidbindung', { c: R, b: 1 }) + T(180, 120, 'Beispiel: Nylon (Diamin + Dicarbonsäure)', { s: 12, c: '#475569' })) },
    { h: 'Nylon', t: 'Für Nylon reagiert ein <b>Diamin</b> (H₂N–(CH₂)₆–NH₂) mit einer <b>Dicarbonsäure</b> (HOOC–(CH₂)₄–COOH). Bei jeder Verknüpfung wird H₂O frei. Zwischen den Ketten halten <b>Wasserstoffbrücken</b> der Amid-Gruppen die Fasern fest.',
      f: G.svg(W, 140, G.r(14, 40, 100, 34, { f: '#dbeafe', s: B }) + T(64, 62, 'H₂N–…–NH₂', { s: 12, b: 1 }) + T(124, 62, '+', { s: 20 }) + G.r(136, 40, 110, 34, { f: '#fee2e2', s: R }) + T(191, 62, 'HOOC–…–COOH', { s: 11, b: 1 }) + G.ar(254, 57, 286, 57, { c: I }) + T(322, 52, '…–CO–NH–…', { s: 11, b: 1 }) + T(322, 70, '+ H₂O', { c: R, s: 11, b: 1 })) }
  ], 'Amid-Gruppe –CO–NH–: Verknüpfung in Polyamiden (Nylon) und Proteinen.');
})();
