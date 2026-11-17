/* Modul 2: I- und M-Effekte erkennen. Effekt-Detektiv an Gruppen auf einer C=C-Bindung (Vinylgruppe). */
(function () {
  'use strict';
  // lay: 'lp' = Atom mit freien Elektronenpaaren, 'alk' = nur Text, 'dbl' = Doppelbindung nach oben, 'trp' = Dreifachbindung nach links
  var G = [
    { id: 'OH', lab: '–OH', txt: 'HO', lay: 'lp', pairs: 2, i: '-', m: '+',
      ih: 'Sauerstoff (EN 3,5) ist elektronegativer als Kohlenstoff (EN 2,5) und zieht die Elektronen der σ-Bindung zu sich.',
      mh: 'Das Sauerstoffatom sitzt direkt an der Kette und trägt freie Elektronenpaare. Sie können sich mit dem π-System überlappen.',
      gf: 'HO–CH=CH₂  ↔  HO⁺=CH–CH₂⁻' },
    { id: 'NH2', lab: '–NH₂', txt: 'H₂N', lay: 'lp', pairs: 1, i: '-', m: '+',
      ih: 'Stickstoff (EN 3,0) ist elektronegativer als Kohlenstoff (EN 2,5) und zieht die Elektronen der σ-Bindung zu sich.',
      mh: 'Das Stickstoffatom sitzt direkt an der Kette und trägt ein freies Elektronenpaar. Es kann sich mit dem π-System überlappen.',
      gf: 'H₂N–CH=CH₂  ↔  H₂N⁺=CH–CH₂⁻' },
    { id: 'OMe', lab: '–OCH₃', txt: 'H₃CO', lay: 'lp', pairs: 2, i: '-', m: '+',
      ih: 'Das erste Atom ist Sauerstoff (EN 3,5), elektronegativer als Kohlenstoff (EN 2,5). Es zieht die σ-Bindungselektronen zu sich.',
      mh: 'Das Sauerstoffatom sitzt direkt an der Kette und trägt freie Elektronenpaare. Die Methylgruppe daneben ändert daran nichts.',
      gf: 'H₃C–O–CH=CH₂  ↔  H₃C–O⁺=CH–CH₂⁻' },
    { id: 'CH3', lab: '–CH₃', txt: 'H₃C', lay: 'alk', i: '+', m: '0',
      ih: 'Die Methylgruppe besteht nur aus C und H. Alkylgruppen geben Elektronendichte über die σ-Bindung an die Kette ab.',
      mh: 'Das erste Atom ist ein C mit drei Einfachbindungen. Es hat weder ein freies Elektronenpaar noch eine Mehrfachbindung.',
      gf: null },
    { id: 'CF3', lab: '–CF₃', txt: 'F₃C', lay: 'alk', i: '-', m: '0',
      ih: 'Die drei Fluoratome (EN 4,0) ziehen Elektronen zum C der Gruppe, und die Gruppe zieht dadurch an der Kette.',
      mh: 'Das erste Atom ist ein C mit drei Einfachbindungen. Die F-Atome sitzen nicht direkt am π-System, das C hat weder ein freies Elektronenpaar noch eine Mehrfachbindung.',
      gf: null },
    { id: 'COOH', lab: '–COOH', txt: 'C', lay: 'dbl', a: 'C', down: 'OH', i: '-', m: '-',
      ih: 'Am ersten C-Atom sitzen zwei Sauerstoffatome (EN 3,5). Sie ziehen Elektronen zu sich.',
      mh: 'Das erste Atom hat kein freies Elektronenpaar, aber eine Doppelbindung zum elektronegativeren Sauerstoff. Sie kann π-Elektronen der Kette anziehen.',
      gf: 'HO–C(=O)–CH=CH₂  ↔  HO–C(–O⁻)=CH–CH₂⁺' },
    { id: 'CN', lab: '–C≡N', txt: 'C', lay: 'trp', a: 'C', left: 'N', i: '-', m: '-',
      ih: 'Das Stickstoffatom (EN 3,0) der Dreifachbindung ist elektronegativer als Kohlenstoff und zieht Elektronen zu sich.',
      mh: 'Das erste Atom hat kein freies Elektronenpaar, aber eine Dreifachbindung zum elektronegativeren Stickstoff. Sie kann π-Elektronen der Kette anziehen.',
      gf: 'N≡C–CH=CH₂  ↔  ⁻N=C=CH–CH₂⁺' },
    { id: 'NO2', lab: '–NO₂', txt: 'N', lay: 'dbl', a: 'N⁺', down: 'O⁻', i: '-', m: '-',
      ih: 'Am Stickstoff sitzen zwei Sauerstoffatome (EN 3,5) und eine positive Formalladung. Beides zieht stark Elektronen zu sich.',
      mh: 'Das erste Atom hat kein freies Elektronenpaar, aber eine Doppelbindung zum elektronegativeren Sauerstoff. Sie kann π-Elektronen der Kette anziehen.',
      gf: '⁻O–N⁺(=O)–CH=CH₂  ↔  ⁻O–N⁺(–O⁻)=CH–CH₂⁺' }
  ];
  var ORDER = ['NO2', 'OH', 'CF3', 'NH2', 'CH3', 'COOH', 'OMe', 'CN'];
  var cur = null, solved = {}, got = {};   // got[id] = { i:bool, m:bool }
  Prog.add('me', ORDER.length + 5);
  Prog.onFinish('me', function () { $('mmerke').hidden = false; });
  function byId(id) { return G.filter(function (x) { return x.id === id; })[0]; }

  // ------------------------------------------------------------ Zeichnung
  var BL = '#2563eb', RD = '#dc2626', K = '#1e293b';
  function txt(svg, x, y, s, size, anchor, fill) {
    var t = svgEl('text', { x: x, y: y, 'text-anchor': anchor || 'middle', 'font-size': size || 20, 'font-family': 'inherit', fill: fill || K, 'font-weight': 600 });
    t.textContent = s; svg.appendChild(t); return t;
  }
  function ln(svg, x1, y1, x2, y2, c, w) { svg.appendChild(svgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: c || K, 'stroke-width': w || 2.2, 'stroke-linecap': 'round' })); }
  function dots(svg, x, y) { [x - 4.5, x + 4.5].forEach(function (cx) { svg.appendChild(svgEl('circle', { cx: cx, cy: y, r: 2.2, fill: K })); }); }
  function arrow(svg, d, c) { svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: c, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'marker-end': 'url(#' + (c === BL ? 'meAb' : 'meAr') + ')' })); }
  function draw(g, arrows) {
    var s = $('mesvg'); while (s.firstChild) s.removeChild(s.firstChild);
    s.setAttribute('viewBox', '0 0 360 160');
    ['meAb:' + BL, 'meAr:' + RD].forEach(function (m) {
      var p = m.split(':'), mk = svgEl('marker', { id: p[0], viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
      mk.appendChild(svgEl('path', { d: 'M0 0L10 5L0 10z', fill: p[1] })); s.appendChild(mk);
    });
    var AX = 160, Y = 84, C1 = 222, C2 = 302;
    // Kette C1=C2
    ln(s, C1, Y - 3, C2, Y - 3); ln(s, C1, Y + 3, C2, Y + 3); txt(s, C2 + 24, Y + 7, 'CH₂', 19, 'middle');
    ln(s, AX + 14, Y, C1, Y);
    if (g.lay === 'lp' || g.lay === 'alk') {
      txt(s, AX + 6, Y + 7, g.txt, 22, 'end');
      if (g.lay === 'lp') { dots(s, AX - 1, Y - 22); if (g.pairs === 2) dots(s, AX - 1, Y + 28); }
    } else if (g.lay === 'dbl') {
      txt(s, AX, Y + 7, g.a, 22);
      ln(s, AX - 3, Y - 12, AX - 3, Y - 40); ln(s, AX + 3, Y - 12, AX + 3, Y - 40); txt(s, AX, Y - 46, 'O', 22);
      ln(s, AX, Y + 14, AX, Y + 36); txt(s, AX, Y + 58, g.down, 22);
    } else {
      txt(s, AX, Y + 7, g.a, 22);
      [-4, 0, 4].forEach(function (o) { ln(s, AX - 14, Y + o, AX - 62, Y + o); });
      txt(s, AX - 80, Y + 7, g.left, 22);
    }
    if (!arrows) return;
    // I-Effekt: Pfeil entlang der σ-Bindung unterhalb
    var ix = (AX + 18), ie = C1 - 6, iy = Y + 22;
    if (g.i === '-') { arrow(s, 'M ' + ie + ' ' + iy + ' L ' + ix + ' ' + iy, BL); txt(s, (ix + ie) / 2, iy + 20, '−I', 17, 'middle', BL); }
    else if (g.i === '+') { arrow(s, 'M ' + ix + ' ' + iy + ' L ' + ie + ' ' + iy, BL); txt(s, (ix + ie) / 2, iy + 20, '+I', 17, 'middle', BL); }
    // M-Effekt: gebogene Pfeile oberhalb
    if (g.m === '+') {
      arrow(s, 'M ' + (AX + 2) + ' ' + (Y - 30) + ' Q ' + (AX + 36) + ' ' + (Y - 56) + ' ' + (C1 - 22) + ' ' + (Y - 6), RD);
      arrow(s, 'M ' + (C1 + 40) + ' ' + (Y - 8) + ' Q ' + (C1 + 66) + ' ' + (Y - 52) + ' ' + (C2 + 2) + ' ' + (Y - 12), RD);
      txt(s, C1 + 18, Y - 48, '+M', 17, 'middle', RD);
    } else if (g.m === '-') {
      arrow(s, 'M ' + (C1 + 40) + ' ' + (Y - 8) + ' Q ' + (C1 + 4) + ' ' + (Y - 52) + ' ' + (C1 - 22) + ' ' + (Y - 6), RD);
      if (g.lay === 'dbl') arrow(s, 'M ' + (AX + 8) + ' ' + (Y - 26) + ' Q ' + (AX + 34) + ' ' + (Y - 40) + ' ' + (AX + 14) + ' ' + (Y - 46), RD);
      else arrow(s, 'M ' + (AX - 38) + ' ' + (Y - 8) + ' Q ' + (AX - 62) + ' ' + (Y - 36) + ' ' + (AX - 76) + ' ' + (Y - 12), RD);
      txt(s, C1 + 58, Y - 48, '−M', 17, 'middle', RD);
    }
  }

  // ------------------------------------------------------------ Gruppenwahl
  var sel = $('mesel');
  ORDER.forEach(function (id) { var g = byId(id), b = document.createElement('button'); b.textContent = g.lab; b.setAttribute('data-id', id); sel.appendChild(b); });
  sel.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('button') : null; if (b) show(b.getAttribute('data-id')); });

  function mk(box, key, opts) {   // eine Reihe Antwortknöpfe
    box.innerHTML = '';
    opts.forEach(function (o) { var b = document.createElement('button'); b.textContent = o[0]; b.setAttribute('data-v', o[1]); b.setAttribute('data-k', key); box.appendChild(b); });
  }
  mk($('mei'), 'i', [['+I', '+'], ['−I', '-'], ['kein I-Effekt', '0']]);
  mk($('mem'), 'm', [['+M', '+'], ['−M', '-'], ['kein M-Effekt', '0']]);

  function lock(row, v) { Array.prototype.forEach.call(row.querySelectorAll('button'), function (b) { b.disabled = true; b.classList.toggle('on', b.getAttribute('data-v') === v); }); }
  function reset(row) { Array.prototype.forEach.call(row.querySelectorAll('button'), function (b) { b.disabled = false; b.classList.remove('on', 'wrong'); }); }

  function show(id) {
    cur = byId(id); var st = got[id] || (got[id] = { i: false, m: false });
    Array.prototype.forEach.call(sel.querySelectorAll('button'), function (b) { b.classList.toggle('on', b.getAttribute('data-id') === id); });
    reset($('mei')); reset($('mem')); $('mefi').hidden = true; $('mefm').hidden = true; $('mefin').hidden = true;
    if (st.i) { lock($('mei'), cur.i); fbOk($('mefi'), 'I'); }
    if (st.m) { lock($('mem'), cur.m); fbOk($('mefm'), 'M'); }
    $('mename').textContent = 'Gruppe ' + cur.lab + ' an einer C=C-Bindung';
    $('mestep').hidden = false;
    finish();
  }
  function label(g, k) { var v = g[k]; return v === '0' ? 'kein ' + (k === 'i' ? 'I' : 'M') + '-Effekt' : (v === '+' ? '+' : '−') + k.toUpperCase(); }
  function fbOk(el, which) {
    var g = cur, k = which.toLowerCase(); el.hidden = false; el.className = 'fb ok';
    var msg = k === 'i' ? g.ih : g.mh;
    if (k === 'm' && g.m === '+') msg = g.mh + ' Die Gruppe schiebt Elektronendichte in das π-System.';
    el.innerHTML = '✔ Richtig: ' + label(g, k) + '. ' + msg;
    if (k === 'i' && g.i !== '0') note(g.lab + ': ' + label(g, 'i') + '. ' + g.ih);
    else if (k === 'm') note(g.lab + ': ' + label(g, 'm') + '. ' + g.mh);
  }
  function finish() {
    var st = got[cur.id]; if (!st || !(st.i && st.m)) return;
    draw(cur, true);
    var fin = $('mefin'); fin.hidden = false; fin.className = 'fb ok';
    var tot = (cur.i === '-' ? '−I' : '+I') + (cur.m === '0' ? '' : ', ' + (cur.m === '+' ? '+M' : '−M'));
    fin.innerHTML = '<b>' + cur.lab + ': ' + tot + '.</b> Blaue Pfeile zeigen den I-Effekt entlang der σ-Bindung, rote Pfeile den M-Effekt im π-System.' +
      (cur.gf ? '<div class="gf"><span class="small">Mesomere Grenzformeln:</span><br>' + cur.gf.split('  ↔  ').map(function (x) { return '<span style="white-space:nowrap">' + x + '</span>'; }).join(' ↔ ') + '</div>' : '<div class="small" style="margin-top:6px">Ohne M-Effekt gibt es keine zweite Grenzformel: Die Elektronen im π-System werden nicht verschoben.</div>');
    var b = sel.querySelector('[data-id="' + cur.id + '"]'); b.classList.add('fin'); b.textContent = '✔ ' + cur.lab;
    if (!solved[cur.id]) { solved[cur.id] = 1; Prog.done('me'); }
  }
  function ask(e, key) {
    var b = e.target.closest ? e.target.closest('button') : null; if (!b || b.disabled || !cur) return;
    var v = b.getAttribute('data-v'), row = key === 'i' ? $('mei') : $('mem'), fb = key === 'i' ? $('mefi') : $('mefm'), st = got[cur.id];
    if (v === cur[key]) { st[key] = true; lock(row, v); fbOk(fb, key.toUpperCase()); finish(); return; }
    b.disabled = true; b.classList.add('wrong'); fb.hidden = false; fb.className = 'fb bad';
    var hint;
    if (key === 'i') hint = v === '0' ? 'Jede Gruppe wirkt auf die σ-Bindung zur Kette. Prüfe, ob sie Elektronen anzieht oder abgibt. ' + cur.ih : 'Denk an die Elektronegativität. ' + cur.ih;
    else hint = v === '0' ? 'Prüfe das erste Atom der Gruppe auf freie Elektronenpaare und auf Mehrfachbindungen. ' + cur.mh
      : (cur.m === '0' ? 'Hier gibt es keinen M-Effekt. ' + cur.mh : (cur.m === '+' ? 'Ein freies Elektronenpaar wird in das π-System geschoben, nicht herausgezogen. Das ist ein Donator-Effekt.' : 'Hier wird Elektronendichte aus dem π-System herausgezogen, nicht hineingeschoben. ' + cur.mh));
    fb.innerHTML = '✗ Leider nicht. ' + hint;
  }
  $('mei').addEventListener('click', function (e) { ask(e, 'i'); });
  $('mem').addEventListener('click', function (e) { ask(e, 'm'); });

  show('NO2'); draw(byId('NO2'), false);

  // ------------------------------------------------------------ Aufgaben
  var q = $('meq');
  mc(q, { mod: 'me', q: '<b>1.</b> Das erste Atom einer Gruppe trägt freie Elektronenpaare und sitzt direkt an einer C=C-Bindung. Was folgt daraus?',
    opts: ['Die Elektronenpaare können in das π-System geschoben werden: Die Gruppe hat einen +M-Effekt und wirkt als Donator.',
      'Die Elektronenpaare ziehen Elektronen aus dem π-System heraus: Die Gruppe hat einen −M-Effekt und wirkt als Akzeptor.',
      'Freie Elektronenpaare haben keinen Einfluss auf das π-System, nur Doppelbindungen am ersten Atom lösen einen M-Effekt aus.',
      'Freie Elektronenpaare sorgen nur für einen induktiven Effekt über die σ-Bindung, einen M-Effekt gibt es dann nicht.'], ok: 0,
    why: 'Ein freies Elektronenpaar am ersten Atom überlappt mit dem π-System und fließt dorthin: +M.',
    hints: { 1: 'Ein freies Elektronenpaar ist reich an Elektronen. Es wird abgegeben, nicht angezogen.', 2: 'Doch: Auch freie Elektronenpaare können mit dem π-System überlappen. Denk an –OH und –NH₂ im Detektiv.', 3: 'Der M-Effekt braucht gerade die Überlappung mit dem π-System. Denk an –OH und –NH₂ im Detektiv.' } });
  mc(q, { mod: 'me', q: '<b>2.</b> Warum hat –CF₃ nur einen I-Effekt und keinen M-Effekt, obwohl Fluoratome freie Elektronenpaare besitzen?',
    opts: ['Die F-Atome sitzen nicht am π-System. Das erste Atom der Gruppe ist ein C ohne freies Elektronenpaar und ohne Mehrfachbindung.',
      'Fluor ist zu elektronegativ, deshalb geben die Fluoratome ihre Elektronenpaare grundsätzlich nie an andere Atome ab.',
      'Die C–F-Bindungen sind Doppelbindungen, die sich nicht mit dem π-System der Kette überlappen können.',
      'Der M-Effekt tritt nur bei Gruppen mit Sauerstoff oder Stickstoff als erstem Atom überhaupt auf.'], ok: 0,
    why: 'Entscheidend ist das erste Atom, das an der Kette sitzt. Beim –CF₃ ist das ein C mit drei Einfachbindungen.',
    hints: { 1: 'Es kommt nicht darauf an, ob Fluor Elektronenpaare abgibt, sondern wo die Fluoratome sitzen.', 2: 'In –CF₃ gibt es nur Einfachbindungen. Schau auf die Strichformel im Detektiv.', 3: 'Auch ein C-Atom mit einer Doppelbindung zu O (–COOH) hat einen M-Effekt. Es kommt auf das erste Atom an.' } });
  mc(q, { mod: 'me', q: '<b>3.</b> Worin unterscheiden sich I-Effekt und M-Effekt grundsätzlich?',
    opts: ['Der I-Effekt wirkt über σ-Bindungen und nimmt mit dem Abstand schnell ab, der M-Effekt wirkt über das π-System entlang der Konjugation.',
      'Der M-Effekt wirkt über σ-Bindungen und nimmt mit dem Abstand schnell ab, der I-Effekt wirkt über das π-System der Konjugation.',
      'Beide Effekte wirken über das π-System, der I-Effekt zieht aber nur Elektronen an und der M-Effekt schiebt sie nur.',
      'Beide Effekte wirken über σ-Bindungen, der M-Effekt ist aber immer schwächer und tritt nur bei Alkylgruppen auf.'], ok: 0,
    why: 'I: Verschiebung der σ-Bindungselektronen. M: Verschiebung von π- oder freien Elektronen durch Überlappung, daher nur bei Konjugation.',
    hints: { 1: 'Das ist vertauscht. Das „M“ steht für mesomer, und Mesomerie betrifft das π-System.', 2: 'Der I-Effekt braucht kein π-System. Er wirkt schon über eine einzelne σ-Bindung.', 3: 'Der M-Effekt braucht ein π-System und ist meist sogar stärker als der I-Effekt.' } });
  mc(q, { mod: 'me', q: '<b>4.</b> –OH hat einen −I- und einen +M-Effekt. Was bestimmt, dass –OH insgesamt als Donator wirkt?',
    opts: ['Der mesomere Effekt ist hier stärker als der induktive, deshalb überwiegt das Schieben von Elektronen in das π-System.',
      'Der induktive Effekt ist immer stärker als der mesomere, deshalb überwiegt die Anziehung der σ-Bindungselektronen.',
      'Beide Effekte heben sich genau auf, deshalb bestimmt allein die Größe der Gruppe, ob sie Donator oder Akzeptor ist.',
      'Der −I-Effekt wirkt nur im Grundzustand, deshalb wird er bei der Betrachtung der Farbe grundsätzlich weggelassen.'], ok: 0,
    why: 'Bei O- und N-Gruppen überwiegt der +M-Effekt den −I-Effekt. Deshalb sind –OH, –OCH₃ und –NH₂ Auxochrome.',
    hints: { 1: 'Dann wäre –OH ein Akzeptor. Im Versuch verschieben solche Gruppen aber das Maximum nach Rot.', 2: 'Beide Effekte sind nicht gleich stark. Einer überwiegt.', 3: 'Beide Effekte wirken gleichzeitig. Es gibt keinen „Grundzustand“-Trick.' } });
  gap(q, { mod: 'me', parts: ['<b>5.</b> Das Stickstoffatom der Nitrogruppe trägt ', { o: ['ein freies Elektronenpaar', 'eine Doppelbindung zum elektronegativen Sauerstoff'], ok: 1 },
    '. Deshalb zieht die Gruppe π-Elektronen aus der Kette. Sie hat einen ', { o: ['+M-Effekt', '−M-Effekt'], ok: 1 }, ' und wirkt als ', { o: ['Donator', 'Akzeptor'], ok: 1 }, '.'],
    why: '−M: Die Elektronen der Kette werden zum elektronegativen O hin gezogen. Die Gruppe ist ein Akzeptor, also ein Antiauxochrom.' });
})();
