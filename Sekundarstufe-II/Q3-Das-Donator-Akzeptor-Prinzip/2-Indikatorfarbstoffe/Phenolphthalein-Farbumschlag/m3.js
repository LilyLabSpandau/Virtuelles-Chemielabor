/* Modul 3: Strukturformeln der drei Formen, π-Systeme, Hybridisierung, Mechanismus in Schritten */
(function () {
  'use strict';
  Prog.add('m3', 4);
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
  var FORMS = [
    { key: 'lac', t: 'Form ① · H₂In', sub: 'liegt bei pH 6 vor', cap: 'Form ① (H₂In): fünfgliedriger Lactonring, zwei Phenol-OH-Gruppen, drei Ringe über ein zentrales C-Atom verbunden.' },
    { key: 'dian', t: 'Form ② · In²⁻', sub: 'liegt bei pH 11 vor', cap: 'Form ② (In²⁻): zwei negative Ladungen (Phenolat-O⁻ und Carboxylat), ein Ring mit C=O in para-Stellung, Doppelbindung am zentralen C-Atom. Die Ladung am Sauerstoff kann auch am anderen Ring stehen (zweite Grenzformel).' },
    { key: 'carb', t: 'Form ③ · In(OH)³⁻', sub: 'liegt bei pH 14 vor', cap: 'Form ③ (In(OH)³⁻): drei negative Ladungen (zwei Phenolat-O⁻, ein Carboxylat), zusätzliche OH-Gruppe am zentralen C-Atom.' }
  ], cur = 0, mols = {};
  FORMS.forEach(function (f) { mols[f.key] = Struct.build(f.key); });

  var fb = $('m3forms');
  FORMS.forEach(function (f, i) {
    var b = document.createElement('button'); b.type = 'button'; b.innerHTML = f.t + '<small>' + f.sub + '</small>'; b.addEventListener('click', function () { cur = i; draw(); }); fb.appendChild(b);
  });
  function draw() {
    Array.prototype.forEach.call(fb.children, function (b, i) { b.classList.toggle('on', i === cur); });
    var f = FORMS[cur], on = $('m3pi').checked;
    Struct.draw($('m3mol'), mols[f.key], { sets: on, big: f.key === 'dian', c0label: '' });
    $('m3cap').textContent = f.cap + (on ? ' Die Unterlegungen zeigen zusammenhängende π-Systeme (jede Farbe ein eigenes System).' : '');
  }
  $('m3pi').addEventListener('change', draw); draw();

  // ------------------------------------------------------------ Aufgaben zu den Formeln
  var box = $('m3qs');
  mc(box, {
    mod: 'm3', fix: true, q: '<b>1.</b> Schalte die π-Systeme zu. Wie viele Atome gehören in Form ② zum größten zusammenhängenden π-System?',
    opts: ['6 Atome', '13 Atome', '15 Atome', '19 Atome'], ok: 2,
    why: 'Zwei Ringe mit je 6 C-Atomen, das zentrale C-Atom und die zwei Sauerstoffatome ergeben 6 + 6 + 1 + 2 = 15 Atome in einem durchgehenden π-System.',
    hints: { 0: '6 Atome hat nur ein einzelner Ring. Hier sind zwei Ringe über das zentrale C-Atom verbunden.', 1: 'Die beiden Sauerstoffatome gehören mit zum System: Das O⁻ liefert ein freies Paar, das C=O die π-Bindung.', 3: 'Der Ring mit der Carboxylatgruppe ist aus der Ebene verdrillt und gehört nicht zum durchgehenden System.' }
  });
  gap(box, {
    mod: 'm3', why: 'Vier Einfachbindungen ergeben sp³, drei Bindungspartner mit Doppelbindung sp². Nur in Form ② ist das zentrale C-Atom planar und kann so das π-System des ganzen Moleküls verbinden.',
    parts: ['<p class="qt"><b>2.</b> Das zentrale C-Atom ist in Form ① </p>', { o: ['sp³', 'sp²', 'sp'], ok: 0 }, '-hybridisiert, in Form ② ', { o: ['sp²', 'sp³', 'sp'], ok: 0 }, ' und in Form ③ ', { o: ['sp³', 'sp²', 'sp'], ok: 0 }, '.']
  });

  // ------------------------------------------------------------ Mechanismus
  var STEPS = [
    { t: '1 · Deprotonierung', form: 'lac', hl: function (m) { return { atoms: [m.n.oA, m.n.oB] }; },
      x: '<b>OH⁻ nimmt Protonen ab.</b> Die Phenol-OH-Gruppen sind schwache Säuren. Es gilt: –OH + OH⁻ → –O⁻ + H₂O. Dafür braucht man pH-Werte im schwach alkalischen Bereich. Noch ist das zentrale C-Atom sp³-hybridisiert und trennt die Ringe.' },
    { t: '2 · Ringöffnung', form: 'lac', hl: function (m) { return { bonds: [[m.n.c0, m.n.ringO]] }; },
      x: '<b>Elektronenverschiebung.</b> Ein freies Elektronenpaar des Phenolat-Sauerstoffs wandert durch den Ring zum zentralen C-Atom. Die orange Bindung zwischen zentralem C-Atom und Ring-Sauerstoff des Lactons bricht. Es entsteht eine Carboxylatgruppe –COO⁻.' },
    { t: '3 · Chinoide Form', form: 'dian', hl: function (m) { return { bonds: [[m.n.c0, m.n.B[0]]] }; },
      x: '<b>Das große π-System entsteht.</b> Das zentrale C-Atom hat nur noch drei Bindungspartner und ist jetzt sp²-hybridisiert, planar und mit Ring B durch eine Doppelbindung verbunden. Ring B wird dadurch chinoid (C=O in para-Stellung). Ringe und zentrales C-Atom bilden ein durchgehendes System aus 15 Atomen.' },
    { t: '4 · Stark alkalisch', form: 'carb', hl: function (m) { return { atoms: [m.n.oh] }; },
      x: '<b>Weitere Addition.</b> Bei sehr hohem pH greift ein OH⁻-Ion das elektrophile zentrale C-Atom an. Es wird wieder sp³-hybridisiert (vier Bindungspartner), das große π-System zerfällt in drei kleine. Diese Reaktion läuft langsamer als die Deprotonierung.' }
  ], sc = 0, sb = $('m3steps');
  STEPS.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.textContent = s.t; b.addEventListener('click', function () { sc = i; step(); }); sb.appendChild(b); });
  function step() {
    Array.prototype.forEach.call(sb.children, function (b, i) { b.classList.toggle('on', i === sc); });
    var s = STEPS[sc], m = mols[s.form]; Struct.draw($('m3mech'), m, { sets: false, hl: s.hl(m) });
    $('m3mtext').innerHTML = s.x;
  }
  step();

  // ------------------------------------------------------------ Erklärung
  var b2 = $('m3q2');
  mc(b2, {
    mod: 'm3', q: '<b>3.</b> Warum absorbiert Form ① kein sichtbares Licht?',
    opts: ['Ihre π-Systeme sind klein, die Anregung braucht energiereiches UV-Licht.', 'Sie enthält keine Elektronen, die durch Licht angeregt werden können.', 'Sie reflektiert das gesamte sichtbare Licht an der Oberfläche der Lösung.', 'Ihre Ringe sind zu weit voneinander entfernt, um Licht zu absorbieren.'], ok: 0,
    why: 'Je kleiner das π-System, desto größer der Abstand ΔE zwischen HOMO und LUMO und desto kurzwelliger das absorbierte Licht. Bei drei getrennten Ringen liegt es im UV-Bereich.',
    hints: { 1: 'Jeder Benzolring hat π-Elektronen. Sie können angeregt werden, nur mit anderer Energie.', 2: 'Reflexion bestimmt die Farbe einer Lösung nicht, entscheidend ist die Absorption.', 3: 'Wichtig ist nicht der Abstand der Ringe, sondern ob ihre π-Systeme zusammenhängen.' }
  });
  gap(b2, {
    mod: 'm3', why: 'Das OH⁻ addiert an das zentrale C-Atom, das wieder sp³ wird. Das große π-System zerfällt, und die Lösung wird farblos.',
    parts: ['<p class="qt"><b>4.</b> Stark alkalische Lösung: </p>Ein ', { o: ['OH⁻', 'H₃O⁺', 'Na⁺'], ok: 0 }, '-Ion addiert an das zentrale C-Atom. Dieses wird wieder ', { o: ['sp³', 'sp²', 'sp'], ok: 0 }, '-hybridisiert, und das große π-System ', { o: ['zerfällt in kleine Systeme', 'wird noch größer', 'bleibt unverändert'], ok: 0 }, '.']
  });
})();
