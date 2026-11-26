/* Modul 1: FEHLING-Probe im Reagenzglas (Kolbi ist die Probe) */
(function () {
  'use strict';
  Prog.add('m1', 3);
  Prog.onFinish('m1', function () { $('m1merke').hidden = false; });
  var built = false;
  var lab = Lab.create({ kind: 'fehling', root: 'm1lab', prefix: 'm1', onComplete: function () {
    if (built) return; built = true; $('m1gate').hidden = true; $('m1qs').hidden = false; build();
  } });
  lab.tab = 'm1';
  function build() {
    var box = $('m1qs');
    mc(box, {
      q: '<b>1.</b> Welche Gemeinsamkeit haben die Stoffe, bei denen sich die Fehling-Lösung verändert hat?',
      opts: ['Sie tragen am Kettenende eine Aldehydgruppe (–CHO).', 'Sie besitzen alle eine C=O-Doppelbindung im Molekül.', 'Sie besitzen alle mindestens eine –OH-Gruppe im Molekül.', 'Sie sind alle in Wasser löslich, die anderen nicht.'], ok: 0, mod: 'm1',
      why: 'Ethanal, Propanal und Glucose besitzen eine Aldehydgruppe –CHO. Propanon hat zwar auch eine C=O-Gruppe, Ethanol nur eine OH-Gruppe.',
      hints: { 1: 'Propanon enthält ebenfalls eine C=O-Gruppe und hat nicht reagiert.', 2: 'Ethanal und Propanal haben gar keine OH-Gruppe.', 3: 'Alle fünf Stoffe haben sich in der Probe gelöst. Das unterscheidet sie nicht.' }
    });
    gap(box, {
      parts: ['<p class="qt"><b>2.</b> Der ziegelrote Niederschlag ist Kupfer(I)-oxid, Cu₂O. Die Oxidationszahl von Kupfer sinkt dabei von +2 auf +1.</p><div class="gaptext">Die Kupfer-Ionen werden ', { o: ['reduziert', 'oxidiert'], ok: 0 }, '. Dafür müssen sie Elektronen ', { o: ['aufnehmen', 'abgeben'], ok: 0 }, '. Diese Elektronen stammen von den Aldehyd-Molekülen, sie wirken also als ', { o: ['Oxidationsmittel', 'Reduktionsmittel'], ok: 1 }, '.</div>'],
      mod: 'm1', why: 'Cu²⁺ nimmt Elektronen auf (Reduktion). Der Aldehyd gibt sie ab und wird dabei selbst oxidiert, er ist das Reduktionsmittel.'
    });
    mc(box, {
      q: '<b>3.</b> Warum reagiert Propanon nicht mit der Fehling-Lösung?',
      opts: ['Am Carbonyl-C-Atom sitzt kein H-Atom, es lässt sich nicht oxidieren.', 'Propanon löst sich nicht in der stark alkalischen Fehling-Lösung auf.', 'Propanon ist selbst ein starkes Oxidationsmittel und bleibt daher stabil.', 'Die C=O-Gruppe von Propanon ist zu polar für die Kupfer-Ionen.'], ok: 0, mod: 'm1',
      why: 'Beim Aldehyd trägt das Carbonyl-C-Atom noch ein H-Atom und kann zur Carboxylgruppe oxidiert werden. Beim Keton fehlt dieses H-Atom.',
      hints: { 1: 'Propanon löst sich in Wasser und in der Lösung sehr gut.', 2: 'Ein Oxidationsmittel würde den Kupfer-Ionen nichts entgegensetzen. Das Problem liegt am Molekülbau.', 3: 'Polarität allein entscheidet nicht. Schau auf die Atome am Carbonyl-C-Atom.' }
    });
  }
})();
