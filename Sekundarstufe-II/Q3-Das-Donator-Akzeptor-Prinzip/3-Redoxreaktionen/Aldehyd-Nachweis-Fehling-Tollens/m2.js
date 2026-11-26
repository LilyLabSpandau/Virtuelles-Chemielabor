/* Modul 2: TOLLENS-Probe im Reagenzglas (Kolbi ist die Probe) */
(function () {
  'use strict';
  Prog.add('m2', 3);
  Prog.onFinish('m2', function () { $('m2merke').hidden = false; });
  var built = false;
  var lab = Lab.create({ kind: 'tollens', root: 'm2lab', prefix: 'm2', onComplete: function () {
    if (built) return; built = true; $('m2gate').hidden = true; $('m2qs').hidden = false; build();
  } });
  lab.tab = 'm2';
  function build() {
    var box = $('m2qs');
    gap(box, {
      parts: ['<p class="qt"><b>1.</b> An der Glaswand hat sich elementares Silber abgeschieden (Silberspiegel). Aus Ag⁺ mit der Oxidationszahl +1 wird Ag mit der Oxidationszahl 0.</p><div class="gaptext">Die Silber-Ionen werden ', { o: ['reduziert', 'oxidiert'], ok: 0 }, ', sie sind das ', { o: ['Oxidationsmittel', 'Reduktionsmittel'], ok: 0 }, '. Der Aldehyd gibt Elektronen ab und ist das ', { o: ['Reduktionsmittel', 'Oxidationsmittel'], ok: 0 }, '.</div>'],
      mod: 'm2', why: 'Ag⁺ nimmt je ein Elektron auf und wird zu Ag reduziert. Der Aldehyd liefert die Elektronen und wird zur Carbonsäure bzw. zum Carboxylat oxidiert.'
    });
    mc(box, {
      q: '<b>2.</b> Wodurch unterscheiden sich die Beobachtungen bei FEHLING- und TOLLENS-Probe, wenn ein Aldehyd vorliegt?',
      opts: ['Fehling: ziegelroter Niederschlag, Tollens: Silberspiegel', 'Fehling: Silberspiegel, Tollens: ziegelroter Niederschlag', 'Beide Proben: ziegelroter Niederschlag, nur anders schnell', 'Beide Proben: Silberspiegel, nur an anderer Stelle im Glas'], ok: 0, mod: 'm2',
      why: 'Bei der Fehling-Probe entsteht rotes Cu₂O, bei der Tollens-Probe elementares Silber. Beide Proben zeigen, dass der Aldehyd als Reduktionsmittel wirkt.',
      hints: { 1: 'Das Silber gehört zur Tollens-Probe, das Kupfer zur Fehling-Probe.', 2: 'Silber-Ionen können kein Kupfer(I)-oxid bilden.', 3: 'Kupfer-Ionen können keinen Silberspiegel bilden.' }
    });
    mc(box, {
      q: '<b>3.</b> Warum wird das Tollens-Reagenz nach dem Versuch sofort entsorgt und nicht aufbewahrt?',
      opts: ['Beim Stehen können explosive Silberverbindungen entstehen.', 'Es verliert beim Stehen an der Luft nach kurzer Zeit seine Wirkung.', 'Es greift das Glas des Gefäßes an.', 'Es wird mit der Zeit zu einer starken Säure und greift Gefäße an.'], ok: 0, mod: 'm2',
      why: 'Aus ammoniakalischer Silberlösung können beim Stehen explosive Silberverbindungen entstehen. Darum kommt der Rest sofort in den Silberabfall.',
      hints: { 1: 'Das Reagenz wirkt auch nach einiger Zeit noch. Die Gefahr liegt woanders.', 2: 'Das Glas wird nicht angegriffen.', 3: 'Das Reagenz bleibt alkalisch und wird nicht sauer.' }
    });
  }
})();
