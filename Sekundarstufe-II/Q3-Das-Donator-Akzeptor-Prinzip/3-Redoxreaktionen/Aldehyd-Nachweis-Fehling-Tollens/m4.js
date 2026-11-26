/* Modul 4: Die TOLLENS-Probe als Redoxreaktion, Vergleich der Proben, Oxidationsreihe */
(function () {
  'use strict';
  Prog.add('m4', 6);
  Prog.onFinish('m4', function () { $('m4merke').hidden = false; });

  gap($('m4t1'), {
    parts: ['<p class="qt"><b>1.</b> In der Tollens-Lösung liegt Silber als Ag⁺ vor (vereinfacht geschrieben; tatsächlich als Diamminsilber(I)-Komplex). Am Ende steht elementares Silber an der Glaswand.</p><div class="gaptext">Die Oxidationszahl von Silber ändert sich von ', { o: ['+1', '0', '−1'], ok: 0 }, ' auf ', { o: ['0', '+1', '−1'], ok: 0 }, '. Jedes Ag⁺-Ion nimmt ', { o: ['1', '2', '3'], ok: 0 }, ' Elektron auf: Ag⁺ + e⁻ → Ag. Ein Aldehyd-Molekül gibt aber ', { o: ['2', '1', '3'], ok: 0 }, ' Elektronen ab.</div>'],
    mod: 'm4', why: 'Ag⁺ nimmt ein Elektron auf. Der Aldehyd gibt zwei ab. Deshalb braucht man je Aldehyd-Molekül zwei Silber-Ionen.'
  });
  mc($('m4t2'), {
    q: '<b>2.</b> Um die Elektronen auszugleichen: Wie oft muss die Teilgleichung Ag⁺ + e⁻ → Ag mit der Aldehyd-Gleichung kombiniert werden?',
    opts: ['einmal', 'zweimal', 'dreimal', 'viermal'], ok: 1, fix: true, mod: 'm4',
    why: 'Die Aldehyd-Gleichung liefert 2 e⁻. Die Silber-Gleichung muss daher zweimal ablaufen: 2 Ag⁺ + 2 e⁻ → 2 Ag.',
    hints: { 0: 'Dann würden nur 1 e⁻ aufgenommen, aber 2 e⁻ abgegeben.', 2: 'Das wären 3 e⁻ aufgenommen, aber nur 2 e⁻ abgegeben.', 3: 'Das wären 4 e⁻ aufgenommen, aber nur 2 e⁻ abgegeben.' }
  });
  eqn($('m4t3'), {
    lead: '<b>3.</b> Addiere die Aldehyd-Teilgleichung (R–CHO + 3 OH⁻ → R–COO⁻ + 2 H₂O + 2 e⁻) und die zweimal genommene Silber-Teilgleichung. Gib die Gesamtgleichung in kleinsten ganzen Zahlen an.',
    sp: [{ k: 'ald', side: 0 }, { k: 'ag', side: 0 }, { k: 'oh', side: 0 }, { k: 'ate', side: 1 }, { k: 'ag0', side: 1 }, { k: 'h2o', side: 1 }],
    sol: [1, 2, 3, 1, 2, 2], mod: 'm4', why: 'R–CHO + 2 Ag⁺ + 3 OH⁻ → R–COO⁻ + 2 Ag + 2 H₂O. In der Praxis liegt Ag⁺ als [Ag(NH₃)₂]⁺ vor.'
  });
  gap($('m4t4'), {
    parts: ['<p class="qt"><b>4.</b> Vergleiche beide Proben.</p><div class="gaptext">Bei der Fehling-Probe ist das Oxidationsmittel ', { o: ['Cu²⁺', 'Ag⁺'], ok: 0 }, ' und das Produkt ', { o: ['Cu₂O', 'Ag', 'CuO'], ok: 0 }, '. Bei der Tollens-Probe ist das Oxidationsmittel ', { o: ['Ag⁺', 'Cu²⁺'], ok: 0 }, ' und das Produkt ', { o: ['Ag', 'Ag₂O', 'AgNO₃'], ok: 0 }, '. In beiden Fällen wird der Aldehyd zum ', { o: ['Carboxylat-Ion', 'Alkohol', 'Keton'], ok: 0 }, ' oxidiert und gibt ', { o: ['2', '1', '4'], ok: 0 }, ' Elektronen ab.</div>'],
    mod: 'm4', why: 'Fehling: Cu²⁺ → Cu₂O. Tollens: Ag⁺ → Ag. Der Aldehyd wird jedes Mal zum Carboxylat oxidiert.'
  });
  gap($('m4t5'), {
    parts: ['<p class="qt"><b>5.</b> Alkohol, Aldehyd und Carbonsäure bilden eine Oxidationsreihe. Bestimme die Oxidationszahl des funktionellen C-Atoms (Ethanol: gebunden an O, 2 H und 1 C).</p><div class="gaptext">Ethanol: ', { o: ['−1', '0', '+1', '+3'], ok: 0 }, ' → Ethanal: ', { o: ['+1', '−1', '+2', '+3'], ok: 0 }, ' → Ethansäure: ', { o: ['+3', '+1', '+2', '+4'], ok: 0 }, '. Jede Stufe bedeutet die Abgabe von ', { o: ['2', '1', '3'], ok: 0 }, ' Elektronen.</div>'],
    mod: 'm4', why: 'Das funktionelle C-Atom hat in Ethanol −1, in Ethanal +1 und in Ethansäure +3. Jede Stufe verbraucht zwei Elektronen.'
  });
  mc($('m4t6'), {
    q: '<b>6.</b> Eine unbekannte farblose Flüssigkeit ergibt mit Tollens-Reagenz einen Silberspiegel. Was lässt sich daraus schließen?',
    opts: ['Sie enthält ein Reduktionsmittel, etwa einen Aldehyd.', 'Sie enthält ein Oxidationsmittel, etwa ein Keton.', 'Sie enthält sicher Glucose und keinen anderen Stoff.', 'Sie enthält sicher Silberionen, die bereits gelöst sind.'], ok: 0, mod: 'm4',
    why: 'Ein Silberspiegel zeigt, dass Ag⁺ reduziert wurde. Die Probe enthält also ein Reduktionsmittel. Ein Aldehyd ist möglich, auch andere Stoffe wie Glucose kommen infrage.',
    hints: { 1: 'Ketone sind unter diesen Bedingungen keine Reduktionsmittel.', 2: 'Auch andere Aldehyde ergeben die Probe, nicht nur Glucose.', 3: 'Das Silber stammt aus dem Reagenz, nicht aus der Probe.' }
  });
})();
