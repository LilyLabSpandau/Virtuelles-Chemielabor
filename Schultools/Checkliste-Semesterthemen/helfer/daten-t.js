/* Erklärfolien Q2 Thermodynamik und Reaktionskinetik (Hugo) */
(function () {
  'use strict';
  var G = GFig, A = Glossar.add, I = G.INK, R = G.RED, B = G.BLU, N = G.GRN, O = G.ORA, V = G.VIO, T = G.t, L = G.l, W = 360;
  function GRY() { return '#94a3b8'; }
  function eaSlides() {
    return [
      { h: 'Der Berg vor der Reaktion', t: 'Selbst wenn eine Reaktion Energie freisetzt, müssen die Teilchen erst einen <b>Energieberg</b> überwinden. Die nötige Energie ist die <b>Aktivierungsenergie E<sub>A</sub></b>. Sie bricht alte Bindungen auf, damit neue entstehen können.', f: G.energy({ exo: 1 }) },
      { h: 'Ohne Zündfunke keine Verbrennung', t: 'Holz und Sauerstoff reagieren bei Raumtemperatur nicht, obwohl die Reaktion stark exotherm ist: Die Teilchen haben zu wenig Energie für den Berg. Ein <b>Streichholz</b> liefert die Aktivierungsenergie, dann hält die frei werdende Wärme die Reaktion selbst am Laufen.',
        f: G.svg(W, 150, T(70, 80, '🔥', { s: 46 }) + T(70, 122, 'Zündung', { s: 12, b: 1, c: R }) + G.ar(112, 76, 170, 76, { c: R }) + T(240, 66, 'E_A überwunden', { s: 13, b: 1, c: B }) + T(240, 92, '→ Reaktion läuft', { s: 13, b: 1, c: N })) }
    ];
  }
  A('t', 'gk', 'Aktivierungsenergie', 'h', ['t4'], eaSlides(), 'Aktivierungsenergie E_A = Energie, die man aufbringen muss, damit eine Reaktion in Gang kommt (Energieberg).');

  A('t', 'gk', 'offenes, geschlossenes, isoliertes System', 'h', ['t2', 't1'], [
    { h: 'Was kann über die Grenze?', t: 'Ein <b>System</b> ist der Teil der Welt, den du betrachtest. Die Systemgrenze entscheidet: <b>Offen</b> = Stoff <b>und</b> Energie können durch. <b>Geschlossen</b> = nur Energie, kein Stoff. <b>Isoliert</b> = weder Stoff noch Energie.',
      f: G.svg(W, 190, [['offen', 0], ['geschlossen', 1], ['isoliert', 2]].map(function (u, i) { var x = 14 + i * 116; return G.r(x + 14, 30, 74, 64, { f: '#f8fafc', s: [N, O, R][i], w: 3, d: i === 0 ? '6 4' : i === 1 ? '' : '' }) + T(x + 51, 66, ['Stoff ⇄', 'Energie ⇄', '✕'][i], { b: 1, s: 12, c: [N, O, R][i] }) + T(x + 51, 22, u[0], { b: 1, s: 13, c: [N, O, R][i] }) + (i < 2 ? G.ar(x + 51, 120, x + 51, 100, { c: O, w: 2 }) + T(x + 51, 136, i === 0 ? 'Stoff + Wärme' : 'nur Wärme', { s: 11 }) : T(x + 51, 136, 'nichts', { s: 11 })); }).join('') + T(180, 172, 'Beispiele: Topf ohne Deckel · verschlossene Flasche · Thermoskanne', { s: 10, c: '#475569' })) },
    { h: 'Der 1. Hauptsatz', t: 'Im <b>isolierten System</b> bleibt die Gesamtenergie gleich: <b>Energie geht nie verloren, sie wird nur umgewandelt</b> (Energieerhaltungssatz). In offenen und geschlossenen Systemen tauscht das System Energie mit der Umgebung aus.',
      f: G.svg(W, 120, G.bub(20, 36, 130, 44, 'chemische Energie', { f: '#dcfce7', s: N, b: 1, fs: 12 }) + G.ar(156, 58, 202, 58, { c: I }) + G.bub(208, 36, 130, 44, 'Wärme + Licht', { f: '#fef3c7', s: O, b: 1, fs: 12 }) + T(180, 106, 'Summe bleibt gleich', { s: 12, b: 1 })) }
  ], 'Offen: Stoff + Energie. Geschlossen: nur Energie. Isoliert: nichts. Energie bleibt immer erhalten.');

  A('t', 'gk', 'molare Standardenthalpien (Reaktions-, Bildungs-, Lösungs-, Verbrennungsenthalpie)', 'h', ['t6', 't7'], [
    { h: 'Enthalpie = Wärme bei konstantem Druck', t: 'Die <b>Reaktionsenthalpie ΔH</b> ist die Wärme, die bei konstantem Druck frei oder aufgenommen wird. <b>Negativ</b> (ΔH &lt; 0) = exotherm, Energie wird abgegeben. <b>Positiv</b> = endotherm. „Standard“ (Index 0) heißt: 25 °C, 1013 hPa; „molar“: pro mol Formelumsatz, Einheit kJ/mol.',
      f: G.svg(W, 170, G.bub(10, 30, 150, 60, 'ΔH < 0: exotherm', { f: '#fee2e2', s: R, b: 1 }) + T(85, 112, 'gibt Wärme ab', { s: 11 }) + G.bub(200, 30, 150, 60, 'ΔH > 0: endotherm', { f: '#dbeafe', s: B, b: 1 }) + T(275, 112, 'nimmt Wärme auf', { s: 11 }) + T(180, 150, 'Standardbedingungen: 25 °C · 1013 hPa', { s: 11, c: '#475569' })) },
    { h: 'Vier wichtige Enthalpien', t: '<b>Bildungsenthalpie Δ<sub>f</sub>H⁰</b>: Bildung von 1 mol aus den Elementen. <b>Verbrennungsenthalpie Δ<sub>c</sub>H⁰</b>: vollständige Verbrennung von 1 mol. <b>Lösungsenthalpie Δ<sub>L</sub>H⁰</b>: Lösen von 1 mol in Wasser. <b>Reaktionsenthalpie Δ<sub>r</sub>H⁰</b>: für die ganze Gleichung.',
      f: G.svg(W, 170, [['Δ_fH⁰', 'Bildung aus Elementen', N], ['Δ_cH⁰', 'Verbrennung', R], ['Δ_LH⁰', 'Lösen in Wasser', B], ['Δ_rH⁰', 'ganze Reaktion', V]].map(function (u, i) { var x = 12 + (i % 2) * 172, y = 14 + Math.floor(i / 2) * 76; return G.r(x, y, 160, 64, { f: '#f8fafc', s: u[2], w: 2.4 }) + T(x + 80, y + 28, u[0], { b: 1, s: 18, c: u[2] }) + T(x + 80, y + 50, u[1], { s: 11 }); }).join('')) },
    { h: 'Der Satz von HESS', t: 'Die Reaktionsenthalpie hängt nur von Anfang und Ende ab, nicht vom Weg. Aus Bildungsenthalpien: <b>Δ<sub>r</sub>H⁰ = Σ Δ<sub>f</sub>H⁰(Produkte) − Σ Δ<sub>f</sub>H⁰(Edukte)</b>. Elemente in ihrer stabilen Form haben Δ<sub>f</sub>H⁰ = 0.',
      f: G.svg(W, 170, G.r(14, 14, 332, 40, { f: '#f5f3ff', s: V }) + T(180, 40, 'Δ_rH⁰ = Σ Δ_fH⁰(Produkte) − Σ Δ_fH⁰(Edukte)', { s: 13, b: 1 }) + G.l(60, 130, 160, 130, { w: 3, c: GRY() }) + T(110, 150, 'Edukte', { s: 12 }) + G.l(200, 90, 300, 90, { w: 3, c: GRY() }) + T(250, 108, 'Produkte', { s: 12 }) + G.ar(180, 128, 180, 94, { c: R, w: 2.6 }) + T(150, 118, 'ΔrH⁰', { c: R, b: 1, s: 12, a: 'end' }) + T(60, 72, 'Elemente: 0', { s: 11, c: '#475569', a: 'start' }) + L(60, 78, 300, 78, { c: GRY(), d: '3 3', w: 1 })) }
  ], 'ΔH < 0 exotherm, ΔH > 0 endotherm. Δ_rH⁰ = Σ Δ_fH⁰(Produkte) − Σ Δ_fH⁰(Edukte).');

  A('t', 'gk', 'spezifische Wärmekapazität', 'h', ['t5'], [
    { h: 'Wie viel Wärme braucht ein Stoff?', t: 'Die <b>spezifische Wärmekapazität c</b> sagt, wie viel Energie nötig ist, um <b>1 g</b> eines Stoffs um <b>1 K</b> zu erwärmen. Wasser: <b>c = 4,18 J/(g·K)</b>. Das ist ziemlich viel, darum erwärmt sich Wasser langsam und speichert viel Wärme.',
      f: G.svg(W, 150, G.beaker(40, 24, 70, 80, '#bfdbfe', { lvl: .7 }) + T(75, 124, 'Wasser', { s: 12 }) + G.ar(120, 66, 170, 66, { c: R, w: 3 }) + T(145, 56, 'Q', { c: R, b: 1, s: 15 }) + G.beaker(180, 24, 70, 80, '#fecaca', { lvl: .7 }) + T(215, 124, '+1 K', { s: 12, b: 1, c: R }) + T(300, 66, 'c = 4,18', { s: 15, b: 1 }) + T(300, 84, 'J/(g·K)', { s: 12 })) },
    { h: 'Die Formel', t: '<b>Q = m · c · ΔT</b>: Wärme = Masse × spezifische Wärmekapazität × Temperaturänderung. Beispiel: 100 g Wasser um 10 K erwärmen: Q = 100 g · 4,18 J/(g·K) · 10 K = <b>4180 J</b>. Im <b>Kalorimeter</b> misst man ΔT und rechnet die Reaktionswärme aus.',
      f: G.svg(W, 120, T(180, 50, 'Q = m · c · ΔT', { s: 28, b: 1 }) + T(180, 88, '100 g · 4,18 J/(g·K) · 10 K = 4180 J', { s: 13, c: '#475569' })) }
  ], 'Q = m · c · ΔT. Wasser hat mit 4,18 J/(g·K) eine hohe Wärmekapazität.');

  A('t', 'gk', '(s), (l), (g), (aq)', 'h', ['t6'], [
    { h: 'Der Zustand gehört zur Formel', t: 'In thermodynamischen Gleichungen schreibt man den <b>Aggregatzustand</b> hinter jede Formel, weil die Enthalpie davon abhängt: <b>(s)</b> fest, <b>(l)</b> flüssig, <b>(g)</b> gasförmig, <b>(aq)</b> in Wasser gelöst (aquatisiert).',
      f: G.svg(W, 150, [['(s)', 'fest', 0], ['(l)', 'flüssig', 1], ['(g)', 'gasförmig', 2], ['(aq)', 'gelöst', 3]].map(function (u, i) { var x = 12 + i * 86; var dots = [[[18, 20], [34, 20], [50, 20], [18, 36], [34, 36], [50, 36]], [[16, 24], [38, 18], [26, 38], [48, 36], [30, 54]], [[10, 12], [48, 24], [22, 46], [52, 56], [34, 70]], [[22, 22], [46, 40], [20, 56]]][i]; return G.r(x, 20, 70, 84, { f: '#f8fafc', s: I }) + dots.map(function (p) { return G.c(x + p[0] + 4, 20 + p[1] + 4, 5, { f: '#93c5fd' }); }).join('') + T(x + 35, 126, u[0], { b: 1, s: 15, c: B }) + T(x + 35, 142, u[1], { s: 11 }); }).join('')) },
    { h: 'Beispiel', t: 'C(s) + O₂(g) → CO₂(g) und H₂(g) + ½ O₂(g) → H₂O(l). Eine Reaktion zu H₂O(g) statt H₂O(l) hat eine <b>andere Enthalpie</b>, weil beim Verdampfen Energie nötig ist.',
      f: G.svg(W, 100, T(180, 44, 'C(s) + O₂(g) → CO₂(g)', { s: 18, b: 1 }) + T(180, 76, 'H₂(g) + ½ O₂(g) → H₂O(l)', { s: 18, b: 1 })) }
  ], '(s) fest, (l) flüssig, (g) gasförmig, (aq) gelöst: Der Zustand ändert die Enthalpie.');

  function dip(x, y, ang, col) { var a = ang * Math.PI / 180; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')">' + G.c(0, 0, 9, { f: '#fecaca', s: R }) + G.c(-8, 12, 5, { f: '#e2e8f0' }) + G.c(8, 12, 5, { f: '#e2e8f0' }) + '</g>'; }
  A('t', 'gk', 'Ion-Dipol-Wechselwirkung', 'h', ['t8'], [
    { h: 'Wasser ist ein Dipol', t: 'Das Wasser-Molekül ist <b>gewinkelt</b>: Das O-Atom zieht die Elektronen stärker an und ist <b>δ⁻</b>, die H-Atome sind <b>δ⁺</b>. Das Molekül hat einen negativen und einen positiven „Pol“: es ist ein <b>Dipol</b>.',
      f: G.svg(W, 150, G.c(180, 56, 22, { f: '#fecaca', s: R }) + T(180, 62, 'O', { b: 1, s: 18 }) + G.c(146, 100, 14, { f: '#e2e8f0' }) + G.c(214, 100, 14, { f: '#e2e8f0' }) + T(146, 105, 'H', { b: 1 }) + T(214, 105, 'H', { b: 1 }) + L(170, 74, 152, 90, { w: 3 }) + L(190, 74, 208, 90, { w: 3 }) + T(180, 30, 'δ⁻', { c: R, b: 1, s: 16 }) + T(120, 124, 'δ⁺', { c: B, b: 1, s: 16 }) + T(240, 124, 'δ⁺', { c: B, b: 1, s: 16 })) },
    { h: 'Ionen werden umhüllt', t: 'Beim Lösen eines Salzes ordnen sich Wasser-Dipole um die Ionen: Um <b>Na⁺</b> zeigt die <b>negative O-Seite</b> hin, um <b>Cl⁻</b> die <b>positive H-Seite</b>. Diese Anziehung heißt <b>Ion-Dipol-Wechselwirkung</b>, die Hülle <b>Hydrathülle</b> (Solvatation).',
      f: G.svg(W, 170, G.c(90, 85, 18, { f: '#bfdbfe', s: B }) + T(90, 91, 'Na⁺', { b: 1, s: 14 }) + [[90, 38, 0], [140, 85, 90], [90, 132, 180], [42, 85, 270]].map(function (p) { return '<g transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')">' + G.c(0, 0, 10, { f: '#fecaca', s: R }) + G.c(-9, -14, 5, { f: '#e2e8f0' }) + G.c(9, -14, 5, { f: '#e2e8f0' }) + '</g>'; }).join('') + G.c(270, 85, 20, { f: '#fecaca', s: R }) + T(270, 91, 'Cl⁻', { b: 1, s: 14 }) + [[270, 38, 180], [320, 85, 270], [270, 132, 0], [220, 85, 90]].map(function (p) { return '<g transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')">' + G.c(0, 0, 10, { f: '#fecaca', s: R }) + G.c(-9, -14, 5, { f: '#e2e8f0' }) + G.c(9, -14, 5, { f: '#e2e8f0' }) + '</g>'; }).join('') + T(90, 164, 'O-Seite zum Kation', { s: 11 }) + T(270, 164, 'H-Seite zum Anion', { s: 11 })) }
  ], 'Ion-Dipol-Wechselwirkung: Wasser-Dipole lagern sich an Ionen an (Hydratation).');

  /* LK */
  A('t', 'lk', 'Gitterenthalpie, Hydratationsenthalpie', 'h', ['t9'], [
    { h: 'Zwei Schritte beim Lösen', t: 'Beim Lösen eines Salzes passiert zweierlei: Das Gitter wird <b>zerlegt</b> (kostet Energie: <b>Gitterenthalpie</b>, endotherm). Die Ionen werden von Wasser <b>umhüllt</b> (setzt Energie frei: <b>Hydratationsenthalpie</b>, exotherm).',
      f: G.svg(W, 190, G.ax(30, 170, 300, 150, '', 'H') + G.l(60, 120, 120, 120, { w: 3 }) + T(90, 138, 'Salz(s)', { s: 11 }) + G.l(150, 50, 210, 50, { w: 3, c: O }) + T(180, 40, 'Ionen (gasförmig)', { s: 11, c: O }) + G.l(240, 100, 300, 100, { w: 3, c: B }) + T(270, 118, 'Ionen (aq)', { s: 11, c: B }) + G.ar(90, 116, 170, 54, { c: R }) + T(138, 96, '+ Gitterenthalpie', { c: R, s: 11, b: 1, a: 'start' }) + G.ar(200, 54, 262, 96, { c: N }) + T(226, 62, '− Hydratation', { c: N, s: 11, b: 1, a: 'start' })) },
    { h: 'Warum wird es warm oder kalt?', t: 'Die <b>Lösungsenthalpie</b> ist die Summe: Δ<sub>L</sub>H = Gitterenthalpie + Hydratationsenthalpie. Überwiegt die Hydratation, erwärmt sich die Lösung (z. B. NaOH). Überwiegt die Gitterenthalpie, kühlt sie ab (z. B. NH₄NO₃, Kältepack).',
      f: G.svg(W, 130, G.bub(14, 30, 150, 50, 'Hydratation > Gitter: warm', { f: '#fee2e2', s: R, b: 1, fs: 10 }) + G.bub(196, 30, 150, 50, 'Gitter > Hydratation: kalt', { f: '#dbeafe', s: B, b: 1, fs: 10 }) + T(90, 104, 'NaOH, CaCl₂', { s: 12 }) + T(270, 104, 'NH₄NO₃, KNO₃', { s: 12 })) }
  ], 'Δ_LH = Gitterenthalpie + Hydratationsenthalpie.');
  A('t', 'lk', 'Kristallwasser', 'h', ['t9'], [
    { h: 'Wasser im Kristall', t: 'Manche Salze bauen <b>Wasser-Moleküle fest in ihr Gitter</b> ein: <b>Kristallwasser</b>. Beispiel: <b>CuSO₄ · 5 H₂O</b> (Kupfersulfat-Pentahydrat) ist blau. Erhitzt man es, entweicht das Wasser und es entsteht wasserfreies, <b>weißes</b> CuSO₄.',
      f: G.svg(W, 150, G.r(20, 40, 100, 54, { f: '#60a5fa', s: B, w: 2.4 }) + T(70, 72, 'CuSO₄·5H₂O', { b: 1, s: 12, c: '#0b1020' }) + T(70, 112, 'blau', { s: 12, b: 1, c: B }) + G.ar(130, 66, 220, 66, { c: R, w: 3 }) + T(175, 54, 'Wärme', { c: R, b: 1, s: 12 }) + G.r(230, 40, 100, 54, { f: '#f1f5f9', s: GRY(), w: 2.4 }) + T(280, 72, 'CuSO₄', { b: 1, s: 14 }) + T(280, 112, 'weiß + 5 H₂O ↑', { s: 12, b: 1, c: '#475569' })) }
  ], 'Kristallwasser = Wasser, das fest im Kristallgitter eingebaut ist (z. B. CuSO₄·5H₂O).');

  A('t', 'lk', 'exergonisch, endergonisch', 'h', ['t11', 't12'], [
    { h: 'Läuft es von selbst?', t: '<b>Exergonisch</b> (ΔG &lt; 0): Die Reaktion läuft <b>freiwillig</b> ab (spontan). <b>Endergonisch</b> (ΔG &gt; 0): Sie läuft nur, wenn man Energie von außen zuführt. Wichtig: „freiwillig“ sagt nichts über die <b>Geschwindigkeit</b>.',
      f: G.svg(W, 170, G.bub(10, 30, 160, 60, 'exergonisch ΔG < 0', { f: '#dcfce7', s: N, b: 1 }) + T(90, 112, 'läuft freiwillig', { s: 12 }) + G.bub(190, 30, 160, 60, 'endergonisch ΔG > 0', { f: '#fee2e2', s: R, b: 1 }) + T(270, 112, 'braucht Zufuhr', { s: 12 }) + T(180, 152, 'freiwillig ≠ schnell (Aktivierungsenergie!)', { s: 11, c: '#475569' })) },
    { h: 'Exotherm und endotherm sind etwas anderes', t: '<b>Exergonisch/endergonisch</b> beziehen sich auf ΔG (freie Enthalpie), <b>exotherm/endotherm</b> auf ΔH (Wärme). Eine Reaktion kann endotherm und trotzdem exergonisch sein, wenn die Entropie stark zunimmt.',
      f: G.svg(W, 120, T(180, 40, 'ΔG = ΔH − T·ΔS', { s: 22, b: 1 }) + T(180, 76, 'endotherm (ΔH > 0) kann exergonisch sein,', { s: 12, c: '#475569' }) + T(180, 94, 'wenn T·ΔS groß genug ist', { s: 12, c: '#475569' })) }
  ], 'Exergonisch: ΔG < 0 (freiwillig). Endergonisch: ΔG > 0 (nicht freiwillig).');
  A('t', 'lk', 'freie molare Standardreaktionsenthalpie', 'h', ['t11', 't12'], [
    { h: 'Δ_rG⁰: der Maßstab für „freiwillig“', t: '<b>Δ<sub>r</sub>G⁰ = Δ<sub>r</sub>H⁰ − T · Δ<sub>r</sub>S⁰</b> (GIBBS-HELMHOLTZ-Gleichung). ΔH steht für die Energie, T·ΔS für die Unordnung. Ist Δ<sub>r</sub>G⁰ negativ, läuft die Reaktion freiwillig ab.',
      f: G.svg(W, 150, T(180, 46, 'ΔG = ΔH − T · ΔS', { s: 26, b: 1 }) + T(80, 90, 'ΔH', { c: R, b: 1, s: 16 }) + T(80, 110, 'Energie', { s: 11 }) + T(180, 90, 'T · ΔS', { c: B, b: 1, s: 16 }) + T(180, 110, 'Unordnung', { s: 11 }) + T(280, 90, 'ΔG', { c: N, b: 1, s: 16 }) + T(280, 110, 'frei verfügbar', { s: 11 })) },
    { h: 'Vier Fälle', t: 'ΔH &lt; 0 und ΔS &gt; 0: <b>immer</b> freiwillig. ΔH &gt; 0 und ΔS &lt; 0: <b>nie</b> freiwillig. In den anderen Fällen entscheidet die <b>Temperatur</b>. Dort gibt es eine <b>Grenztemperatur</b>: T = ΔH/ΔS.',
      f: G.svg(W, 170, [['ΔH<0, ΔS>0', 'immer', N], ['ΔH>0, ΔS<0', 'nie', R], ['ΔH<0, ΔS<0', 'bei tiefem T', B], ['ΔH>0, ΔS>0', 'bei hohem T', O]].map(function (u, i) { var x = 12 + (i % 2) * 172, y = 14 + Math.floor(i / 2) * 72; return G.r(x, y, 160, 60, { f: '#f8fafc', s: u[2], w: 2.2 }) + T(x + 80, y + 26, u[0], { b: 1, s: 13 }) + T(x + 80, y + 46, 'freiwillig: ' + u[1], { s: 12, c: u[2], b: 1 }); }).join('')) }
  ], 'Δ_rG⁰ = Δ_rH⁰ − T·Δ_rS⁰. ΔG < 0 → freiwillig.');
  A('t', 'lk', 'freie molare Standardbildungsenthalpie', 'h', ['t12'], [
    { h: 'Wie bei der Bildungsenthalpie', t: 'Die <b>freie molare Standardbildungsenthalpie Δ<sub>f</sub>G⁰</b> beschreibt die Bildung von 1 mol einer Verbindung aus den Elementen. Für die Elemente in ihrer stabilen Form ist sie <b>0</b>. Damit berechnest du Δ<sub>r</sub>G⁰:',
      f: G.svg(W, 120, T(180, 44, 'Δ_rG⁰ = Σ Δ_fG⁰(Produkte) − Σ Δ_fG⁰(Edukte)', { s: 14, b: 1 }) + T(180, 80, 'Beispiel: Δ_fG⁰(H₂O, l) = −237 kJ/mol', { s: 12, c: '#475569' })) }
  ], 'Δ_rG⁰ aus Δ_fG⁰: Produkte minus Edukte. Elemente haben Δ_fG⁰ = 0.');

  /* ------------- Reaktionsgeschwindigkeit ------------- */
  A('r', 'gk', 'Aktivierungsenergie', 'h', ['r2', 'r6'], [
    eaSlides()[0],
    { h: 'Mit Katalysator kleiner', t: 'Ein <b>Katalysator</b> öffnet einen <b>anderen Reaktionsweg</b> mit niedrigerer Aktivierungsenergie (grün gestrichelt). Dadurch reagieren mehr Teilchen pro Sekunde, die Reaktionsenthalpie bleibt unverändert und der Katalysator wird nicht verbraucht.', f: G.energy({ exo: 1, cat: 1 }) }
  ], 'Katalysator senkt E_A, ändert aber ΔH nicht.');
  function coll(i) {
    var s = '';
    if (i === 0) s += G.c(70, 60, 20, { f: '#bfdbfe', s: B }) + G.c(150, 60, 20, { f: '#fecaca', s: R }) + G.ar(40, 100, 60, 100, { c: GRY(), w: 1.6 }) + T(70, 130, 'zu langsam', { s: 11, b: 1, c: R }) + G.ar(110, 60, 126, 60, { c: B, w: 1.6, d: '3 2' });
    if (i === 1) s += G.p('M50 60 h50 v30 h-50 z', { f: '#bfdbfe', s: B }) + G.p('M140 40 h40 v50 h-40 z', { f: '#fecaca', s: R }) + T(75, 80, '▲', { s: 12 }) + T(160, 120, 'falsche Orientierung', { s: 11, b: 1, c: R, a: 'middle' });
    return s;
  }
  A('r', 'gk', 'wirksamer Zusammenstoß', 'h', ['r2'], [
    { h: 'Nicht jeder Stoß zählt', t: 'Damit Teilchen reagieren, müssen sie <b>zusammenstoßen</b>. Aber nur ein kleiner Teil dieser Stöße ist <b>wirksam</b>. Zwei Bedingungen: <b>genug Energie</b> (mindestens E<sub>A</sub>) und die <b>richtige Orientierung</b> der Teilchen.',
      f: G.svg(W, 180, G.r(8, 10, 112, 130, { f: '#fef2f2', s: R }) + G.c(36, 56, 14, { f: '#bfdbfe', s: B }) + G.c(86, 56, 14, { f: '#fecaca', s: R }) + G.ar(18, 90, 30, 90, { c: GRY(), w: 1.6 }) + T(64, 122, 'zu wenig Energie', { s: 10, b: 1, c: R }) + G.r(124, 10, 112, 130, { f: '#fef2f2', s: R }) + G.p('M140 40 l24 0 l0 24 l-24 0 Z', { f: '#bfdbfe', s: B }) + G.c(210, 52, 14, { f: '#fecaca', s: R }) + T(180, 122, 'falsche Orientierung', { s: 10, b: 1, c: R }) + G.r(240, 10, 112, 130, { f: '#f0fdf4', s: N, w: 2.6 }) + G.c(270, 56, 14, { f: '#bfdbfe', s: B }) + G.c(322, 56, 14, { f: '#fecaca', s: R }) + G.ar(250, 90, 290, 90, { c: N, w: 2.4 }) + T(296, 122, 'wirksam', { s: 11, b: 1, c: N }) + T(180, 168, 'Energie ≥ E_A  und  richtige Lage', { s: 12, b: 1 })) },
    { h: 'Was bedeutet das für die Geschwindigkeit?', t: 'Die Reaktionsgeschwindigkeit hängt von der Zahl der <b>wirksamen Zusammenstöße pro Sekunde</b> ab. Mehr Teilchen pro Volumen, mehr Oberfläche oder mehr Bewegung → mehr Stöße.',
      f: G.svg(W, 120, T(180, 44, 'v ~ Zahl wirksamer Stöße pro Zeit', { s: 18, b: 1 }) + T(180, 80, 'Konzentration · Zerteilungsgrad · Temperatur', { s: 12, c: '#475569' })) }
  ], 'Wirksamer Stoß: genügend Energie (≥ E_A) und passende Orientierung.');
  A('r', 'gk', 'Mindestenergie, kinetische Energie', 'h', ['r2', 'r3', 'r1'], [
    { h: 'Teilchen haben verschieden viel Energie', t: 'In einem Stoff bewegen sich die Teilchen mit <b>verschiedenen Geschwindigkeiten</b>, also mit unterschiedlicher <b>kinetischer Energie</b>. Nur Teilchen oberhalb der <b>Mindestenergie (= Aktivierungsenergie)</b> können wirksam stoßen (rechts von der Linie).',
      f: G.svg(W, 190, G.ax(40, 160, 290, 130, 'kinetische Energie', 'Anzahl') + G.p('M50 158 C80 40 110 30 150 70 C190 110 220 140 320 152', { s: B, w: 3.5 }) + G.p('M200 158 L200 120 C230 140 270 148 320 152 L320 158 Z', { f: '#fecaca', s: 'none' }) + L(200, 30, 200, 160, { c: R, w: 2.4, d: '5 3' }) + T(200, 24, 'E_A (Mindestenergie)', { s: 11, b: 1, c: R }) + T(262, 100, 'reagieren', { s: 11, b: 1, c: R })) },
    { h: 'Wärmer = mehr Teilchen über E_A', t: 'Steigt die Temperatur, verschiebt sich die Verteilung nach rechts, und <b>deutlich mehr Teilchen</b> haben mehr als E<sub>A</sub>. Das erklärt die <b>RGT-Regel</b>: Eine Erhöhung um <b>10 K</b> verdoppelt bis verdreifacht ungefähr die Reaktionsgeschwindigkeit.',
      f: G.svg(W, 190, G.ax(40, 160, 290, 130, 'kinetische Energie', 'Anzahl') + G.p('M50 158 C80 40 110 30 150 70 C190 110 220 140 320 152', { s: B, w: 2.6 }) + G.p('M50 158 C100 60 150 40 200 70 C240 94 270 130 320 146', { s: R, w: 3 }) + L(200, 30, 200, 160, { c: GRY(), w: 2, d: '5 3' }) + T(200, 24, 'E_A', { s: 12, b: 1 }) + T(110, 38, 'T', { s: 12, b: 1, c: B }) + T(212, 62, 'T + 10 K', { s: 12, b: 1, c: R, a: 'start' })) }
  ], 'Nur Teilchen mit Energie ≥ E_A reagieren. Höhere Temperatur → mehr solcher Teilchen (RGT-Regel).');
  A('r', 'gk', 'mittlere Reaktionsgeschwindigkeit', 'h', ['r4', 'r1'], [
    { h: 'Änderung pro Zeit', t: 'Die <b>mittlere Reaktionsgeschwindigkeit</b> ist die Konzentrationsänderung in einem Zeitabschnitt: <b>v = Δc / Δt</b> (Einheit mol/(L·s)). Im Diagramm ist es die Steigung der <b>Sekante</b> zwischen zwei Zeitpunkten.',
      f: G.svg(W, 190, G.ax(40, 170, 290, 140, 't', 'c(Produkt)') + G.p('M50 166 C100 80 160 50 210 44 C250 40 290 38 320 38', { s: B, w: 3.5 }) + G.c(80, 120, 4, { f: R, s: R }) + G.c(160, 62, 4, { f: R, s: R }) + L(80, 120, 160, 120, { c: R, w: 1.6 }) + L(160, 120, 160, 62, { c: R, w: 1.6 }) + T(120, 136, 'Δt', { c: R, b: 1 }) + T(172, 96, 'Δc', { c: R, b: 1, a: 'start' }) + L(60, 138, 190, 44, { c: R, w: 1.5, d: '4 3' })) },
    { h: 'Sie nimmt im Verlauf ab', t: 'Am Anfang gibt es viele Edukt-Teilchen und viele Stöße: Die Kurve ist <b>steil</b>. Später sind weniger Edukte da, es gibt weniger Stöße, die Kurve <b>flacht ab</b>. Die Geschwindigkeit sinkt also meist im Verlauf der Reaktion.',
      f: G.svg(W, 170, G.ax(40, 150, 290, 120, 't', 'c(Edukt)') + G.p('M50 40 C90 100 140 126 200 138 C240 144 290 146 320 148', { s: R, w: 3.5 }) + T(100, 62, 'steil: schnell', { s: 11, b: 1, c: R, a: 'start' }) + T(230, 128, 'flach: langsam', { s: 11, b: 1, c: R, a: 'start' })) }
  ], 'v = Δc/Δt; die Geschwindigkeit nimmt im Reaktionsverlauf meist ab.');
  A('r', 'gk', 'Inhibitor', 'h', ['r7'], [
    { h: 'Der Bremser', t: 'Ein <b>Inhibitor</b> <b>verlangsamt</b> eine Reaktion oder hemmt sie. Beispiele: <b>Konservierungsstoffe</b> in Lebensmitteln, <b>Antioxidantien</b> (Vitamin C), Korrosionsschutz. Anders als ein Katalysator <b>setzt</b> er die Reaktionsgeschwindigkeit herab.',
      f: G.svg(W, 170, G.ax(30, 150, 310, 130, 'Reaktionsverlauf', 'Energie') + G.p('M50 100 H100 C130 100 130 50 160 50 C190 50 190 120 220 120 H320', { s: '#f97316', w: 3.4 }) + G.p('M50 100 H90 C120 100 120 18 160 18 C200 18 200 120 230 120 H320', { s: V, w: 3, d: '6 4' }) + T(200, 12, 'mit Inhibitor: höherer Berg', { s: 11, b: 1, c: V, a: 'start' }) + T(62, 118, 'Edukte', { s: 11 }) + T(280, 138, 'Produkte', { s: 11 })) }
  ], 'Inhibitor: verlangsamt eine Reaktion (Gegenteil des Katalysators).');
  A('r', 'gk', 'Radikal, Radikalbildung, homolytische Spaltung', 'h', ['r5'], [
    { h: 'Atome mit ungepaartem Elektron', t: 'Ein <b>Radikal</b> hat ein <b>ungepaartes Elektron</b> (Punkt •). Es entsteht bei der <b>homolytischen Spaltung</b>, wenn eine Bindung gleichmäßig bricht, jedes Atom behält ein Elektron: Cl–Cl → 2 Cl•. Dafür braucht man Energie, z. B. <b>Licht</b> oder Wärme.',
      f: G.svg(W, 140, T(70, 62, 'Cl–Cl', { s: 24, b: 1 }) + G.ar(130, 58, 210, 58, { c: O, w: 3 }) + T(170, 44, 'Licht (hν)', { s: 12, b: 1, c: O }) + T(280, 62, '2 Cl•', { s: 24, b: 1, c: R }) + T(180, 110, 'Radikale sind sehr reaktiv', { s: 12, c: '#475569' })) }
  ], 'Radikale entstehen durch homolytische Spaltung; sie haben ein ungepaartes Elektron.');
  A('r', 'gk', 'Kettenstart, Alkylradikal, Kettenfortpflanzung, Kettenabbruch (Rekombination)', 'h', ['r5'], [
    { h: 'Radikalische Substitution in drei Phasen', t: '<b>Kettenstart:</b> Cl₂ → 2 Cl• (Licht). <b>Kettenfortpflanzung:</b> Cl• + CH₄ → HCl + •CH₃ (<b>Alkylradikal</b>), dann •CH₃ + Cl₂ → CH₃Cl + Cl•. Das Cl• startet den nächsten Zyklus. <b>Kettenabbruch (Rekombination):</b> zwei Radikale vereinigen sich, z. B. 2 Cl• → Cl₂.',
      f: G.svg(W, 190, G.bub(10, 10, 340, 44, 'Start: Cl₂ → 2 Cl•', { f: '#fef3c7', s: O, b: 1, fs: 13 }) + G.bub(10, 64, 340, 56, '', { f: '#dcfce7', s: N }) + T(180, 86, 'Fortpflanzung: Cl• + CH₄ → HCl + •CH₃', { s: 12, b: 1 }) + T(180, 108, '•CH₃ + Cl₂ → CH₃Cl + Cl•', { s: 12, b: 1 }) + G.bub(10, 130, 340, 44, 'Abbruch: Cl• + Cl• → Cl₂', { f: '#fee2e2', s: R, b: 1, fs: 13 })) },
    { h: 'Die Kettenreaktion', t: 'Weil bei der Fortpflanzung immer wieder ein neues Radikal entsteht, läuft die Reaktion <b>wie eine Kette</b> weiter, bis zwei Radikale sich treffen. Ein einziges Licht-Quant kann so tausende Moleküle umsetzen. Beispiel: Methan + Chlor → <b>Chlormethan</b>.',
      f: G.svg(W, 130, T(60, 56, 'CH₄ + Cl₂', { s: 17, b: 1 }) + G.ar(120, 52, 210, 52, { c: O, w: 2.6 }) + T(165, 40, 'hν', { s: 13, b: 1, c: O }) + T(290, 56, 'CH₃Cl + HCl', { s: 17, b: 1, c: N }) + T(180, 100, 'radikalische Substitution (SR)', { s: 12, c: '#475569' })) }
  ], 'Radikalische Substitution: Start, Fortpflanzung (Kette), Abbruch (Rekombination).');

  function surf(step) {
    var s = G.r(30, 130, 300, 24, { f: '#cbd5e1', s: I }) + T(180, 148, 'Katalysator-Oberfläche', { s: 11, b: 1 });
    var lab = ['① Diffusion', '② Adsorption', '③ Dissoziation', '④ Desorption'][step];
    if (step === 0) s += G.c(90, 40, 12, { f: '#bfdbfe', s: B }) + G.c(114, 40, 12, { f: '#bfdbfe', s: B }) + G.ar(130, 56, 150, 100, { c: GRY() }) + G.c(250, 50, 12, { f: '#fde68a', s: O }) + G.c(274, 50, 12, { f: '#fde68a', s: O }) + T(180, 22, 'Teilchen wandern zur Oberfläche', { s: 11 });
    if (step === 1) s += G.c(120, 118, 12, { f: '#bfdbfe', s: B }) + G.c(144, 118, 12, { f: '#bfdbfe', s: B }) + G.c(240, 118, 12, { f: '#fde68a', s: O }) + G.c(264, 118, 12, { f: '#fde68a', s: O }) + T(180, 22, 'Teilchen haften an der Oberfläche', { s: 11 });
    if (step === 2) s += G.c(100, 118, 12, { f: '#bfdbfe', s: B }) + G.c(170, 118, 12, { f: '#bfdbfe', s: B }) + G.c(220, 118, 12, { f: '#fde68a', s: O }) + G.c(290, 118, 12, { f: '#fde68a', s: O }) + T(180, 22, 'Bindungen brechen: Atome entstehen', { s: 11 });
    if (step === 3) s += G.c(140, 118, 12, { f: '#bfdbfe', s: B }) + G.c(164, 118, 12, { f: '#fde68a', s: O }) + G.c(220, 118, 12, { f: '#fde68a', s: O }) + G.ar(190, 100, 190, 60, { c: N, w: 2.4 }) + T(180, 22, 'Produkt löst sich ab', { s: 11 });
    return G.svg(W, 190, s + T(180, 184, lab, { s: 13, b: 1, c: V }));
  }
  [['Diffusion', 0, 'Teilchen bewegen sich durch zufällige Bewegung von Orten hoher zu niedriger Konzentration. Hier: Die Edukte gelangen aus dem Gas an die <b>Oberfläche</b> des Katalysators.'], ['Adsorption', 1, 'Die Edukt-Teilchen <b>lagern sich an der Oberfläche an</b> (Adsorption). Dort sind sie nah beieinander und schwach gebunden.'], ['Dissoziation', 2, 'Auf der Oberfläche <b>brechen die Bindungen</b> der Moleküle auf (z. B. H–H, N≡N). Es entstehen reaktive Atome.'], ['Desorption', 3, 'Das fertige Produkt-Molekül <b>löst sich von der Oberfläche</b> (Desorption) und macht Platz für neue Edukte.']].forEach(function (u) {
    A('r', 'lk', u[0], 'h', ['r10'], [{ h: u[0], t: u[2], f: surf(u[1]) }, { h: 'Die vier Schritte', t: '<b>① Diffusion</b> zur Oberfläche → <b>② Adsorption</b> → <b>③ Dissoziation</b> und Reaktion der Atome → <b>④ Desorption</b> des Produkts. Dieses Modell erklärt z. B. die Ammoniaksynthese am Eisenkatalysator.', f: G.svg(W, 100, ['Diffusion', 'Adsorption', 'Dissoziation', 'Desorption'].map(function (n, i) { return G.bub(6 + i * 88, 30, 82, 40, n, { f: n === u[0] ? '#fef3c7' : '#f8fafc', s: n === u[0] ? O : GRY(), b: n === u[0] ? 1 : 0, fs: 10.5 }); }).join('')) }], 'Oberflächenkatalyse: Diffusion → Adsorption → Dissoziation → Desorption.');
  });
})();
