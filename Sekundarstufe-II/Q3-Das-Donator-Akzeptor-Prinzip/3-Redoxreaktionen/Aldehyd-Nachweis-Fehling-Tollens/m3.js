/* Modul 3: Die FEHLING-Probe als Redoxreaktion: Oxidationszahlen, Teilgleichungen, Gesamtgleichung */
(function () {
  'use strict';
  Prog.add('m3', 6);
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
  var NS = 'http://www.w3.org/2000/svg';
  function mol(box, ate) {
    var s = '<svg viewBox="0 0 230 120" role="img" aria-label="Strukturformel" style="max-width:230px;width:100%;height:auto">';
    function ln(a, b, c, d) { return '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + d + '" stroke="#1f2937" stroke-width="2.4" stroke-linecap="round"/>'; }
    function tx(x, y, t, col) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="central" font-family="Arial,sans-serif" font-size="19" font-weight="600" fill="' + (col || '#1f2937') + '">' + t + '</text>'; }
    s += ln(50, 80, 98, 62) + ln(103, 56, 103, 30) + ln(111, 56, 111, 30) + ln(112, 66, 160, 84);
    s += '<circle cx="106" cy="63" r="14" fill="#fff4e0" stroke="#d97706" stroke-width="2" stroke-dasharray="4 3"/>';
    s += tx(30, 84, 'H₃C') + tx(106, 63, 'C') + tx(107, 16, 'O', '#b91c1c') + tx(ate ? 176 : 176, 90, ate ? 'O⁻' : 'H', ate ? '#b91c1c' : '#1f2937');
    s += '<text id="' + (ate ? 'ozB' : 'ozA') + '" x="106" y="104" text-anchor="middle" font-size="17" font-weight="800" fill="#b45309" font-family="Arial,sans-serif"></text></svg>';
    box.innerHTML += '<div style="text-align:center"><div class="small"><b>' + (ate ? 'Ethanoat-Ion' : 'Ethanal') + '</b></div>' + s + '</div>';
  }
  var sv = $('m3mols'); mol(sv, false); mol(sv, true);

  // 1 Oxidationszahlen
  gap($('m3t1'), {
    parts: ['<p class="qt"><b>1.</b> Elektronegativitäten: O 3,5 · C 2,5 · H 2,1. Ordne die Bindungselektronen dem elektronegativeren Atom zu. Das markierte C-Atom bindet im Ethanal ein O-Atom (Doppelbindung), ein H-Atom und ein C-Atom.</p><div class="gaptext">Oxidationszahl des markierten C-Atoms im Ethanal: ', { o: ['−1', '+1', '+2', '+3'], ok: 1 }, '. Im Ethanoat-Ion: ', { o: ['−1', '+1', '+2', '+3'], ok: 3 }, '. Das C-Atom wird dabei ', { o: ['oxidiert', 'reduziert'], ok: 0 }, ' und gibt ', { o: ['1', '2', '3'], ok: 1 }, ' Elektronen ab.</div>'],
    mod: 'm3', why: 'Das Aldehyd-C-Atom hat im Ethanal die Oxidationszahl +1 und im Ethanoat-Ion +3. Es gibt zwei Elektronen ab und wird oxidiert.',
    after: function () { $('ozA').textContent = '+1'; $('ozB').textContent = '+3'; }
  });
  // 2 Oxidation
  eqn($('m3t2'), {
    lead: '<b>2.</b> Stelle die Teilgleichung für den Aldehyd auf. In alkalischer Lösung entsteht das Carboxylat-Ion. R steht für den unveränderten Rest des Moleküls (bei Ethanal CH₃). Gleiche Atome und Ladung mit OH⁻, H₂O und Elektronen aus.',
    sp: [{ k: 'ald', side: 0, fix: 1 }, { k: 'oh', side: 0 }, { k: 'ate', side: 1, fix: 1 }, { k: 'h2o', side: 1 }, { k: 'e', side: 1 }],
    sol: [1, 3, 1, 2, 2], mod: 'm3', why: 'R–CHO + 3 OH⁻ → R–COO⁻ + 2 H₂O + 2 e⁻. Der Aldehyd gibt zwei Elektronen ab.'
  });
  // 3 Reduktion Cu
  eqn($('m3t3'), {
    lead: '<b>3.</b> Die Kupfer-Ionen aus der Fehling-Lösung (Oxidationszahl +2) bilden den Niederschlag Cu₂O (Oxidationszahl +1). Stelle auch hierfür die Teilgleichung auf, in alkalischer Lösung mit OH⁻ und H₂O.',
    sp: [{ k: 'cu', side: 0 }, { k: 'oh', side: 0 }, { k: 'e', side: 0 }, { k: 'cu2o', side: 1, fix: 1 }, { k: 'h2o', side: 1 }],
    sol: [2, 2, 2, 1, 1], mod: 'm3', why: '2 Cu²⁺ + 2 OH⁻ + 2 e⁻ → Cu₂O + H₂O. Zwei Kupfer-Ionen nehmen zusammen zwei Elektronen auf.'
  });
  // 4 Zuordnung
  gap($('m3t4'), {
    parts: ['<p class="qt"><b>4.</b> Ordne die beiden Teilgleichungen zu.</p><div class="gaptext">Die Gleichung des Aldehyds ist die ', { o: ['Oxidation', 'Reduktion'], ok: 0 }, ', die der Kupfer-Ionen die ', { o: ['Reduktion', 'Oxidation'], ok: 0 }, '. Der Aldehyd ist das ', { o: ['Reduktionsmittel', 'Oxidationsmittel'], ok: 0 }, ', die Kupfer(II)-Ionen sind das ', { o: ['Oxidationsmittel', 'Reduktionsmittel'], ok: 0 }, '. Beide Teilgleichungen enthalten ', { o: ['2', '1', '3'], ok: 0 }, ' Elektronen, deshalb können sie ', { o: ['direkt addiert', 'erst nach Verdoppeln addiert'], ok: 0 }, ' werden.</div>'],
    mod: 'm3', why: 'Beide Halbreaktionen tauschen 2 Elektronen aus, die Elektronen kürzen sich beim Addieren heraus.'
  });
  // 5 Gesamtgleichung
  eqn($('m3t5'), {
    lead: '<b>5.</b> Addiere die beiden Teilgleichungen. Die Elektronen kürzen sich heraus, gleiche Teilchen auf beiden Seiten werden zusammengefasst. Wähle die kleinsten ganzen Zahlen.',
    sp: [{ k: 'ald', side: 0 }, { k: 'cu', side: 0 }, { k: 'oh', side: 0 }, { k: 'ate', side: 1 }, { k: 'cu2o', side: 1 }, { k: 'h2o', side: 1 }],
    sol: [1, 2, 5, 1, 1, 3], mod: 'm3', why: 'R–CHO + 2 Cu²⁺ + 5 OH⁻ → R–COO⁻ + Cu₂O + 3 H₂O. Pro Aldehyd-Molekül werden zwei Kupfer-Ionen reduziert.'
  });
  // 6 Transfer
  mc($('m3t6'), {
    q: '<b>6.</b> Wie viel Kupfer(II)-Ionen werden mindestens gebraucht, wenn 0,1 mol Ethanal vollständig oxidiert werden soll?',
    opts: ['0,05 mol Cu²⁺', '0,1 mol Cu²⁺', '0,2 mol Cu²⁺', '0,4 mol Cu²⁺'], ok: 2, fix: true, mod: 'm3',
    why: 'Nach der Gesamtgleichung reagieren 2 Cu²⁺ mit 1 Aldehyd. Für 0,1 mol Ethanal braucht man also 0,2 mol Cu²⁺.',
    hints: { 1: 'Schau auf das Verhältnis in der Gesamtgleichung: Es sind zwei Cu²⁺ je Aldehyd.', 3: 'Das wäre das Vierfache, nicht das Doppelte der Aldehydmenge.', 0: 'Die Kupfermenge ist größer als die Aldehydmenge, nicht kleiner.' }
  });
})();
