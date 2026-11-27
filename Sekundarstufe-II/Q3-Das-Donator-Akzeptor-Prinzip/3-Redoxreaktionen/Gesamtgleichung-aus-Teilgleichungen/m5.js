/* Station 5: Fehlerdetektiv */
(function () {
  'use strict';
  Prog.add('m5', 5);
  Prog.onFinish('m5', function () { $('m5merke').hidden = false; });
  var box = $('m5g');
  var OPT = ['Die Elektronenzahlen wurden nicht angeglichen, die Ladung stimmt nicht', 'Die Elektronen stehen noch in der Gleichung und müssen erst gekürzt werden', 'Die Koeffizienten haben einen gemeinsamen Teiler und sind nicht gekürzt', 'Auf der rechten Seite fehlen Wassermoleküle für den Atomausgleich'];
  var Q = [
    { eq: 'Al + Cu^2+ → Al^3+ + Cu', ok: 0, why: 'Die Atome stimmen, aber links ist die Ladung +2, rechts +3. Aluminium gibt 3, Kupfer nimmt 2 Elektronen auf: Richtig ist 2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu.', h: { 1: 'Hier stehen keine Elektronen in der Gleichung.', 2: 'Die Koeffizienten sind alle 1, da gibt es nichts zu kürzen.', 3: 'Die Atombilanz stimmt hier, schau auf die Ladung.' } },
    { eq: '5 Fe^2+ + MnO4^- + 8 H3O^+ → 5 Fe^3+ + Mn^2+ + 8 H2O', ok: 3, why: 'Links stehen 12 O und 24 H, rechts nur 8 O und 16 H. Es müssen 12 H₂O sein. Die Ladung stimmt (+17 auf beiden Seiten), der Fehler liegt im Atomausgleich.', h: { 0: 'Fünf Eisen-Ionen auf ein Permanganat-Ion ist richtig angeglichen.', 1: 'In der Gleichung steht kein e⁻.', 2: 'Die Zahlen 5, 1 und 8 haben keinen gemeinsamen Teiler.' } },
    { eq: '2 Al + 3 Cu^2+ + 6 e^- → 2 Al^3+ + 3 Cu + 6 e^-', ok: 1, why: 'Atom- und Ladungsbilanz stimmen, aber freie Elektronen gehören nicht in die Gesamtgleichung. Sie stehen auf beiden Seiten und fallen heraus.', h: { 0: 'Die Faktoren 2 und 3 sind richtig, das kgV 6 wurde erreicht.', 2: 'Die Zahlen 2, 3, 6 haben keinen gemeinsamen Teiler.', 3: 'Wasser kommt in dieser Reaktion nicht vor.' } },
    { eq: '4 Al + 6 Cu^2+ → 4 Al^3+ + 6 Cu', ok: 2, why: 'Die Gleichung ist richtig bilanziert, aber alle Zahlen lassen sich durch 2 teilen. Gesucht sind die kleinsten ganzen Zahlen: 2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu.', h: { 0: 'Atome und Ladung stimmen: 12 Elektronen werden ausgetauscht.', 1: 'Elektronen kommen in dieser Gleichung nicht vor.', 3: 'Wasser wird hier nicht gebraucht.' } }
  ];
  Q.forEach(function (q, i) {
    mc(box.appendChild(document.createElement('div')), { q: '<b>Fall ' + (i + 1) + '.</b> Was ist an dieser Gleichung falsch?<div class="eqbig">' + E(q.eq) + '</div>', opts: OPT, ok: q.ok, mod: 'm5', why: q.why, hints: q.h });
  });
  build(box.appendChild(document.createElement('div')), {
    lead: '<b>Abschlussaufgabe.</b> Kupfer löst sich in verdünnter Salpetersäure. Teilgleichungen: Cu → Cu²⁺ + 2 e⁻ und NO₃⁻ + 4 H₃O⁺ + 3 e⁻ → NO + 6 H₂O. Bestimme die Faktoren (kgV von 2 und 3) und stelle die Gesamtgleichung auf.',
    sp: [{ f: 'Cu', side: 0 }, { f: 'NO3^-', side: 0 }, { f: 'H3O^+', side: 0 }, { f: 'Cu^2+', side: 1 }, { f: 'NO', side: 1 }, { f: 'H2O', side: 1 }], sol: [3, 2, 8, 3, 2, 12], mod: 'm5',
    why: '3 Cu + 2 NO₃⁻ + 8 H₃O⁺ → 3 Cu²⁺ + 2 NO + 12 H₂O. Je 6 Elektronen werden abgegeben und aufgenommen.'
  });
})();
