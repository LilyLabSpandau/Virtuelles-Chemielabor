/* Station 2: Elektronen-Waage (zufällige Runden, ab Runde 3 blind) */
(function () {
  'use strict';
  Prog.add('m2', 6);
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });
  var OX = {
    zn: { eq: 'Zn → Zn^2+ + 2 e^-', n: 2 }, mg: { eq: 'Mg → Mg^2+ + 2 e^-', n: 2 }, al: { eq: 'Al → Al^3+ + 3 e^-', n: 3 },
    fe2: { eq: 'Fe^2+ → Fe^3+ + e^-', n: 1 }, c2o4: { eq: 'C2O4^2- → 2 CO2 + 2 e^-', n: 2 }, cu: { eq: 'Cu → Cu^2+ + 2 e^-', n: 2 }, sn2: { eq: 'Sn^2+ → Sn^4+ + 2 e^-', n: 2 }
  };
  var RED = {
    cu2: { eq: 'Cu^2+ + 2 e^- → Cu', n: 2 }, ag: { eq: 'Ag^+ + e^- → Ag', n: 1 }, fe3: { eq: 'Fe^3+ + 3 e^- → Fe', n: 3 },
    mno4: { eq: 'MnO4^- + 8 H3O^+ + 5 e^- → Mn^2+ + 12 H2O', n: 5 }, cr2o7: { eq: 'Cr2O7^2- + 14 H3O^+ + 6 e^- → 2 Cr^3+ + 21 H2O', n: 6 }, no3: { eq: 'NO3^- + 4 H3O^+ + 3 e^- → NO + 6 H2O', n: 3 }
  };
  var T = [
    [['zn', 'cu2'], ['mg', 'ag'], ['zn', 'ag']],
    [['al', 'ag'], ['fe2', 'mno4'], ['fe2', 'cr2o7']],
    [['al', 'cu2'], ['mg', 'fe3'], ['c2o4', 'mno4'], ['cu', 'no3']],
    [['sn2', 'cr2o7'], ['zn', 'cr2o7'], ['mg', 'cr2o7'], ['c2o4', 'cr2o7'], ['al', 'cr2o7']]
  ];
  function pick(t, not) { var l = shuffleArr(T[t]); for (var i = 0; i < l.length; i++) if (l[i].join() !== not) return l[i]; return l[0]; }
  var rounds = [pick(0), pick(1), pick(2), null, pick(3), null];
  rounds[3] = pick(2, rounds[2].join()); rounds[5] = pick(3, rounds[4].join());
  var total = 0, got = 0;
  function stars(sum, n) { $('m2stars').textContent = n ? 'Sterne: ' + sum + ' von ' + n * 3 + ' ★' : ''; }
  function start(i) {
    if (i >= rounds.length) return;
    var p = rounds[i], box = document.createElement('div'); $('m2g').appendChild(box);
    waage(box, {
      lead: '<b>Runde ' + (i + 1) + ' von 6</b>' + (i < 2 ? ' · Die Waage kippt sofort.' : ' · Blind: Die Waage zeigt erst beim Wiegen, wohin sie kippt.'),
      ox: OX[p[0]], red: RED[p[1]], blind: i >= 2, mod: 'm2',
      after: function (st) { if (i >= 2) { total += st; got++; stars(total, got); } setTimeout(function () { start(i + 1); }, 500); }
    });
  }
  start(0);
})();
