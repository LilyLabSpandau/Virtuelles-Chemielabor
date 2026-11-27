/* Station 3: Zusammenbauen: Waage + Gesamtgleichung */
(function () {
  'use strict';
  Prog.add('m3', 6);
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
  var C = [
    { t: 'Aluminium in Kupfersulfat-Lösung', ox: { eq: 'Al → Al^3+ + 3 e^-', n: 3 }, red: { eq: 'Cu^2+ + 2 e^- → Cu', n: 2 },
      sp: [{ f: 'Al', side: 0 }, { f: 'Cu^2+', side: 0 }, { f: 'Al^3+', side: 1 }, { f: 'Cu', side: 1 }], sol: [2, 3, 2, 3], why: '2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu. Je 6 Elektronen werden abgegeben und aufgenommen.' },
    { t: 'Eisen(II)-Ionen und Permanganat in saurer Lösung', ox: { eq: 'Fe^2+ → Fe^3+ + e^-', n: 1 }, red: { eq: 'MnO4^- + 8 H3O^+ + 5 e^- → Mn^2+ + 12 H2O', n: 5 },
      sp: [{ f: 'Fe^2+', side: 0 }, { f: 'MnO4^-', side: 0 }, { f: 'H3O^+', side: 0 }, { f: 'Fe^3+', side: 1 }, { f: 'Mn^2+', side: 1 }, { f: 'H2O', side: 1 }], sol: [5, 1, 8, 5, 1, 12], why: '5 Fe²⁺ + MnO₄⁻ + 8 H₃O⁺ → 5 Fe³⁺ + Mn²⁺ + 12 H₂O. Auf fünf Eisen-Ionen kommt ein Permanganat-Ion.' },
    { t: 'Zinn(II)-Ionen und Dichromat in saurer Lösung', ox: { eq: 'Sn^2+ → Sn^4+ + 2 e^-', n: 2 }, red: { eq: 'Cr2O7^2- + 14 H3O^+ + 6 e^- → 2 Cr^3+ + 21 H2O', n: 6 },
      sp: [{ f: 'Sn^2+', side: 0 }, { f: 'Cr2O7^2-', side: 0 }, { f: 'H3O^+', side: 0 }, { f: 'Sn^4+', side: 1 }, { f: 'Cr^3+', side: 1 }, { f: 'H2O', side: 1 }], sol: [3, 1, 14, 3, 2, 21], why: '3 Sn²⁺ + Cr₂O₇²⁻ + 14 H₃O⁺ → 3 Sn⁴⁺ + 2 Cr³⁺ + 21 H₂O. Das kgV von 2 und 6 ist 6, nicht 12.' }
  ];
  var box = $('m3g');
  C.forEach(function (c, i) {
    var wrap = document.createElement('div'); box.appendChild(wrap);
    wrap.innerHTML = '<h3>Reaktion ' + (i + 1) + ': ' + c.t + '</h3>';
    var w2 = document.createElement('div'), b2 = document.createElement('div'); wrap.appendChild(w2); wrap.appendChild(b2); b2.hidden = true;
    waage(w2, { lead: '<b>Schritt A.</b> Stelle die Faktoren so ein, dass die Waage im Gleichgewicht steht (kleinste Zahlen).', ox: c.ox, red: c.red, blind: false, mod: 'm3', after: function () { b2.hidden = false; } });
    build(b2, { lead: '<b>Schritt B.</b> Schreibe die Gesamtgleichung ohne Elektronen. Übernimm die Faktoren, addiere und kürze.', sp: c.sp, sol: c.sol, mod: 'm3', why: c.why });
  });
})();
