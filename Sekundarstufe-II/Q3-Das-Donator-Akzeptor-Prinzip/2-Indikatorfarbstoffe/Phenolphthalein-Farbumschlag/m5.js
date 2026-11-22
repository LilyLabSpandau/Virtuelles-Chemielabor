/* Modul 5: Phthalein-Werkstatt (Substituenten), Einordnen (bathochrom/hypsochrom), Abschluss-Check */
(function () {
  'use strict';
  var VAR = [
    { key: 'phenolphthalein', t: 'Phenolphthalein', sub: 'Ausgangsstoff', lmax: 553, u: '8,2 – 10,0', col: 'magenta' },
    { key: 'kresol', t: 'o-Kresolphthalein', sub: 'je Ring eine Methylgruppe', lmax: 566, u: '8,2 – 9,8', col: 'rotviolett' },
    { key: 'thymol', t: 'Thymolphthalein', sub: 'je Ring Isopropyl- und Methylgruppe', lmax: 596, u: '9,3 – 10,5', col: 'blau' }
  ], cur = 0, vb = $('m5var');
  Prog.add('m5', 10);
  Prog.onFinish('m5', function () { $('m5merke').hidden = false; });
  function Aof(l) { return function (x) { return Farbe.band(l, 2.6, 38, 75)(x) + Farbe.band(300, 0.9, 30, 24)(x); }; }
  Farbe.beaker($('m5bk'));
  VAR.forEach(function (v, i) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = v.t + '<small>' + v.sub + '</small>'; b.addEventListener('click', function () { cur = i; show(); }); vb.appendChild(b); });
  function show() {
    Array.prototype.forEach.call(vb.children, function (b, i) { b.classList.toggle('on', i === cur); });
    var v = VAR[cur], A = Aof(v.lmax), col = Farbe.colorOf(A);
    Struct.draw($('m5mol'), Struct.build('dian', v.key), {});
    Farbe.plot($('m5plot'), v.lmax, A, { amax: 3.2, ref: cur ? Aof(553) : null });
    Farbe.setBeaker($('m5bk'), col);
    $('m5l').textContent = '≈ ' + v.lmax + ' nm'; $('m5f').textContent = v.col; $('m5u').textContent = 'pH ' + v.u;
  }
  show();

  var box = $('m5qs');
  mc(box, {
    mod: 'm5', q: '<b>1.</b> Vergleiche Phenolphthalein mit Thymolphthalein: Das Maximum wandert von etwa 553 nm nach etwa 596 nm. Wie nennt man diese Verschiebung?',
    opts: ['bathochromer Effekt', 'hypsochromer Effekt', 'hyperchromer Effekt', 'hypochromer Effekt'], ok: 0,
    why: 'Die Verschiebung zu größeren Wellenlängen heißt bathochrom. Hyper- und hypochrom beschreiben dagegen die Intensität der Bande, nicht ihre Lage.',
    hints: { 1: 'Hypsochrom wäre eine Verschiebung zu kleineren Wellenlängen. Hier wird die Wellenlänge größer.', 2: 'Hyperchrom beschreibt eine höhere Intensität der Bande, nicht die Lage des Maximums.', 3: 'Hypochrom beschreibt eine geringere Intensität der Bande, nicht die Lage des Maximums.' }
  });
  mc(box, {
    mod: 'm5', q: '<b>2.</b> Thymolphthalein trägt zusätzliche Alkylgruppen (CH₃, iPr), die als schwache Elektronendonatoren wirken. Was ist die plausible Folge?',
    opts: ['Das HOMO wird angehoben, ΔE sinkt, das Maximum verschiebt sich bathochrom.', 'Das LUMO wird abgesenkt, ΔE steigt, das Maximum verschiebt sich hypsochrom.', 'Die Alkylgruppen verkleinern das π-System, das Maximum verschiebt sich hypsochrom.', 'Die Alkylgruppen absorbieren selbst sichtbares Licht und verändern so die Farbe.'], ok: 0,
    why: 'Donatoren erhöhen die Elektronendichte im π-System und heben das HOMO an. ΔE wird kleiner, das Maximum wandert zu größeren Wellenlängen.',
    hints: { 1: 'Ein größeres ΔE würde zu kürzeren Wellenlängen führen, aber Donatoren verkleinern ΔE.', 2: 'Alkylgruppen sind keine π-Systeme: Sie verkleinern das System nicht, sondern beeinflussen es elektronisch.', 3: 'Gesättigte Alkylgruppen absorbieren im sichtbaren Bereich nicht.' }
  });
  gap(box, {
    mod: 'm5', why: 'In der Reihe wandert das Maximum bathochrom von 553 über 566 nach 596 nm. Die Lösung erscheint dadurch von magenta über rotviolett bis blau.',
    parts: ['<p class="qt"><b>3.</b> Vergleiche die Werte aus der Werkstatt. </p>Von Phenolphthalein über o-Kresolphthalein zu Thymolphthalein wandert das Maximum zu ', { o: ['größeren', 'kleineren'], ok: 0 }, ' Wellenlängen. Die Farbe der basischen Lösung ändert sich von magenta über rotviolett nach ', { o: ['blau', 'gelb', 'grün'], ok: 0 }, '.']
  });

  // ------------------------------------------------------------ Einordnen
  var SORT = [
    { t: 'Form ① (λmax ≈ 275 nm) → Form ② (λmax ≈ 553 nm)', a: 'b', e: 'Das Maximum wandert zu größerer Wellenlänge. Das π-System wächst: bathochrom.' },
    { t: 'Form ② (λmax ≈ 553 nm) → Form ③ (λmax ≈ 292 nm)', a: 'h', e: 'Das Maximum wandert zu kleinerer Wellenlänge, weil das π-System zerfällt: hypsochrom.' },
    { t: 'Phenolphthalein (≈ 553 nm) → Thymolphthalein (≈ 596 nm)', a: 'b', e: 'Zusätzliche Donatoren verkleinern ΔE. Das Maximum rückt zu größerer Wellenlänge: bathochrom.' },
    { t: 'Thymolphthalein (≈ 596 nm) → Phenolphthalein (≈ 553 nm)', a: 'h', e: 'Ohne die Donatoren rückt das Maximum zu kleinerer Wellenlänge: hypsochrom.' },
    { t: 'In einer Polyenkette wird eine weitere C=C-Doppelbindung eingefügt.', a: 'b', e: 'Das konjugierte System wird länger, ΔE sinkt: bathochrom.' },
    { t: 'Ein sp²-Kohlenstoffatom in der Mitte des π-Systems wird durch Addition zu sp³. Das System wird unterbrochen.', a: 'h', e: 'Aus einem großen System werden kleine, ΔE steigt: hypsochrom.' }
  ], sbox = $('m5sort'), okN = 0;
  sbox.innerHTML = '<p style="margin:0 0 6px">Entscheide bei jedem Beispiel, ob die Verschiebung des Absorptionsmaximums <b>bathochrom</b> oder <b>hypsochrom</b> ist.</p>';
  for (var si = SORT.length - 1; si > 0; si--) { var sj = Math.floor(Math.random() * (si + 1)), st = SORT[si]; SORT[si] = SORT[sj]; SORT[sj] = st; }
  SORT.forEach(function (s) {
    var d = document.createElement('div'); d.className = 'grp';
    d.innerHTML = '<div class="nm" style="font-size:15.5px;font-weight:600">' + s.t + '</div><div class="bt">' + (Math.random() < 0.5 ? '<button class="btn sec" data-a="b">bathochrom</button><button class="btn sec" data-a="h">hypsochrom</button>' : '<button class="btn sec" data-a="h">hypsochrom</button><button class="btn sec" data-a="b">bathochrom</button>') + '</div><div class="fb" hidden></div>';
    var fb = d.querySelector('.fb'), done = false;
    d.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null; if (!b || done) return;
      fb.hidden = false;
      if (b.getAttribute('data-a') === s.a) {
        done = true; fb.className = 'fb ok'; fb.innerHTML = '✔ ' + s.e; note(s.e); okN++; Array.prototype.forEach.call(d.querySelectorAll('button'), function (x) { x.disabled = true; });
        if (okN === SORT.length) Prog.done('m5');
      } else { fb.className = 'fb bad'; fb.innerHTML = '✗ Leider nicht. Bathochrom: zu größerer Wellenlänge. Hypsochrom: zu kleinerer Wellenlänge. Schau auf die Zahlen oder auf die Größe des π-Systems.'; }
    });
    sbox.appendChild(d);
  });

  // ------------------------------------------------------------ Check
  var ck = $('m5check');
  var CH = [
    { q: 'Welche Aussage zum Umschlag von Phenolphthalein stimmt?', o: ['Die Farbe ändert sich zwischen etwa pH 8 und pH 10 von farblos nach magenta.', 'Die Farbe ändert sich zwischen etwa pH 3 und pH 5 von farblos nach magenta.', 'Die Farbe ändert sich zwischen etwa pH 8 und pH 10 von magenta nach farblos.', 'Die Farbe ändert sich zwischen etwa pH 12 und pH 14 von magenta nach blau.'], w: 'Phenolphthalein ist unterhalb von etwa pH 8 farblos und oberhalb von etwa pH 10 magenta.', h: { 1: 'Das wäre der Bereich von Methylorange, nicht von Phenolphthalein.', 2: 'Die Richtung ist umgekehrt: Im Sauren ist die Lösung farblos.', 3: 'Bei hohem pH wird die Lösung nicht blau, sondern verblasst.' } },
    { q: 'Du titrierst Salzsäure mit Natronlauge und gibst Phenolphthalein dazu. Wann färbt sich die Lösung erstmals dauerhaft?', o: ['Kurz nach dem Äquivalenzpunkt, wenn der pH-Wert über etwa 8 steigt.', 'Genau am Äquivalenzpunkt bei pH 7, wenn die Neutralisation abgeschlossen ist.', 'Schon zu Beginn, weil das Phenolphthalein sofort mit der Säure reagiert.', 'Erst ganz am Schluss, wenn die Lösung stark alkalisch bei pH 14 ist.'], w: 'Am Äquivalenzpunkt ist die Lösung neutral und noch farblos. Erst der erste Überschuss an NaOH hebt den pH-Wert über etwa 8.', h: { 1: 'Bei pH 7 liegt die farblose Form H₂In vor.', 2: 'Im sauren Bereich liegt nur die farblose Form vor.', 3: 'Schon bei etwa pH 8 bis 10 färbt sich die Lösung, nicht erst bei pH 14.' } },
    { q: 'Wodurch entsteht das große π-System der magentafarbenen Form?', o: ['Der Lactonring öffnet sich, das zentrale C-Atom wird sp² und verbindet beide Ringe.', 'Natrium-Ionen lagern sich an beide Ringe an und erweitern so deren π-System.', 'Die beiden Phenolringe spalten sich vom zentralen C-Atom ab und liegen frei vor.', 'Die Carbonylgruppe im Lactonring wird protoniert und färbt den ganzen Ring ein.'], w: 'Erst durch die Ringöffnung wird das zentrale C-Atom planar und verbindet die Ringe zu einem durchgehenden π-System.', h: { 1: 'Na⁺-Ionen sind Zuschauer und ändern die Struktur des Indikators nicht.', 2: 'Die Ringe bleiben am zentralen C-Atom gebunden.', 3: 'Es wird deprotoniert, nicht protoniert.' } },
    { q: 'Farbstoff A absorbiert bei 480 nm, ein verwandter Farbstoff B bei 530 nm. Wie lässt sich der Unterschied beschreiben?', o: ['B ist gegenüber A bathochrom verschoben.', 'B ist gegenüber A hypsochrom verschoben.', 'B hat gegenüber A ein größeres ΔE.', 'B absorbiert energiereicheres Licht als A.'], w: '530 nm ist die größere Wellenlänge: bathochrom. Das Licht hat weniger Energie, ΔE ist kleiner.', h: { 1: 'Hypsochrom wäre eine Verschiebung zu kürzeren Wellenlängen.', 2: 'Ein größeres ΔE gehört zu kürzeren Wellenlängen.', 3: 'Größere Wellenlänge heißt energieärmeres Licht.' } },
    { q: 'Kolbi ist mit demselben Ansatz gefüllt wie der Kolben. Nach viel konzentrierter Natronlauge (pH ≈ 14) wird er nach einiger Zeit wieder blass. Was ist die beste Erklärung?', o: ['OH⁻ addiert am zentralen C-Atom, das π-System zerfällt, es entsteht die Carbinolform.', 'Phenolphthalein wird durch konzentrierte Lauge vollständig und unumkehrbar zerstört.', 'Die Glaswand von Kolbi absorbiert das Magenta, sobald die Lösung zu basisch wird.', 'Die Lösung wird durch die Natronlauge so stark verdünnt, dass die Farbe verschwindet.'], w: 'Bei hohem pH bildet sich die Carbinolform. Mit Säure lässt sich die Farbe zurückholen: Die Reaktion ist umkehrbar.', h: { 1: 'Mit Säure kommt die Farbe zurück, der Stoff ist also nicht zerstört.', 2: 'Die Glaswand absorbiert kein Magenta. Die Lösung selbst ändert sich.', 3: 'Du gibst nur wenige Milliliter zu 50 mL zu. Das ist keine starke Verdünnung.' } },
    { q: 'Welche Aussage über einen hypsochromen Effekt ist richtig?', o: ['Das Maximum wandert zu kürzeren Wellenlängen, der Abstand ΔE nimmt zu.', 'Das Maximum verschiebt sich zu kürzeren Wellenlängen, der Abstand ΔE nimmt ab.', 'Das Maximum verschiebt sich zu längeren Wellenlängen, der Abstand ΔE nimmt zu.', 'Die Bande wird höher, das Maximum bleibt bei derselben Wellenlänge.'], w: 'Hypsochrom: kürzere Wellenlänge, energiereicheres Licht, größeres ΔE.', h: { 1: 'Kürzere Wellenlänge bedeutet energiereicheres Licht, also ein größeres ΔE.', 2: 'Längere Wellenlänge gehört zum bathochromen Effekt.', 3: 'Eine höhere Bande nennt man hyperchrom und sie ändert die Lage nicht.' } }
  ];
  CH.forEach(function (c, i) { mc(ck, { mod: 'm5', q: '<b>' + (i + 1) + '.</b> ' + c.q, opts: c.o, ok: 0, why: c.w, hints: c.h }); });
})();
