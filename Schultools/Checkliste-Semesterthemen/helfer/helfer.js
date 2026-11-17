/* Kolbi und Hugo als Glossar-Helfer der Semestercheckliste.
   Kolbi: Chemie. Hugo: Physik. Wer ein Thema antippt, bekommt vom zuständigen Helfer die Fachbegriffe angeboten
   und eine kleine bebilderte Erklärung. Die Helfer achten auf die Lernzeit und regen Pausen an.
   Alles bleibt im Browser (nur "leise/ausgeblendet" wird lokal gemerkt), keine Auswertung. */
(function () {
  'use strict';
  var KEYS = 'cl2-helfer', KEYT = 'cl2-lernzeit';
  var TERMS = [], BYCHIP = {}, FIELDS = [], FIELDBY = {}, ITEMBY = {};
  var FWHO = { p: 'k', k: 'k', g: 'k', s: 'k', i: 'k', t: 'h', r: 'h', o: 'h', e: 'h' };
  var NAME = { k: 'Kolbi', h: 'Hugo' }, EMO = { k: '🧪', h: '⚛️' };
  var COL = { k: '#38bdf8', h: '#ff7a8f' };
  var st = { quiet: false, hidden: false };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dock, sheet, bub, nudge, pauseEl, av = {}, S = { who: 'k', view: 'none', term: null, idx: 0, item: null, field: null, last: 'k' };
  var mood = { k: 'happy', h: 'happy' }, moodT = { k: 0, h: 0 }, bubT = 0, lastAct = Date.now(), sleeping = false;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function $(id) { return document.getElementById(id); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function skin(w) { return window.KolbiSkins && window.KolbiSkins[w === 'k' ? 'kolbi' : 'hugo']; }
  function mode() { return document.body.getAttribute('data-mode') || 'lk'; }

  /* ---------------------------------------------------------------- Daten */
  window.Glossar = {
    // add(Themenfeld, Stufe, Chip-Text, Helfer, [Punkte], [Folien], Merksatz)
    add: function (f, lvl, chip, who, items, slides, merk) {
      var t = { f: f, lvl: lvl, chip: chip, who: who || FWHO[f], items: items || [], s: slides, m: merk || '' };
      TERMS.push(t); BYCHIP[f + '|' + chip] = t;
    },
    terms: TERMS
  };

  /* ---------------------------------------------------------------- Avatare */
  function mkAvatar(w) {
    var sk = skin(w), box = document.createElement('div');
    box.className = 'hv hv-' + w; box.setAttribute('data-who', w);
    if (!sk) { box.textContent = EMO[w]; return box; }
    box.innerHTML = sk.svg(COL[w]);
    return box;
  }
  function setFace(w, m) {
    var sk = skin(w); if (!sk) return;
    var list = document.querySelectorAll('.hv-' + w);
    Array.prototype.forEach.call(list, function (b) {
      var f = b.querySelector('#kk-face'); if (f) f.innerHTML = sk.face(m);
    });
  }
  function setMood(w, m, ms) {
    clearTimeout(moodT[w]); mood[w] = m; setFace(w, m);
    if (ms) moodT[w] = setTimeout(function () { mood[w] = 'happy'; setFace(w, sleeping ? 'sleep' : 'happy'); }, ms);
  }
  function hop(w) {
    if (reduce) return;
    Array.prototype.forEach.call(document.querySelectorAll('.hv-' + w), function (b) { b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop'); });
  }

  /* ---------------------------------------------------------------- Sprechblase am Dock */
  function say(w, html, ms, buttons) {
    if (!dock) return;
    clearTimeout(bubT);
    bub.className = 'hbub on ' + w; bub.innerHTML = html + (buttons ? '<div class="bb">' + buttons + '</div>' : '');
    bub.setAttribute('data-who', w);
    placeBub(w);
    S.last = w; hop(w);
    if (ms) bubT = setTimeout(hideBub, ms);
  }
  function hideBub() { if (bub) bub.className = 'hbub'; }

  /* ---------------------------------------------------------------- Dock */
  function buildDock() {
    dock = document.createElement('div'); dock.id = 'hdock'; dock.setAttribute('data-html2canvas-ignore', 'true');
    ['k', 'h'].forEach(function (w) {
      var p = document.createElement('button'); p.type = 'button'; p.className = 'hp hp-' + w; p.setAttribute('data-who', w);
      p.setAttribute('aria-label', NAME[w] + ' fragen'); p.title = NAME[w] + (w === 'k' ? ' (Chemie)' : ' (Physik)');
      var a = mkAvatar(w); p.appendChild(a); av[w] = a;
      var l = document.createElement('span'); l.className = 'hn'; l.textContent = NAME[w]; p.appendChild(l);
      dock.appendChild(p);
    });
    bub = document.createElement('div'); bub.id = 'hbub'; bub.className = 'hbub'; bub.setAttribute('role', 'status'); bub.setAttribute('aria-live', 'polite');
    dock.appendChild(bub);
    document.body.appendChild(dock);
    var back = document.createElement('button'); back.type = 'button'; back.id = 'hback'; back.textContent = '🧪⚛️ Helfer holen'; back.hidden = true;
    back.setAttribute('data-html2canvas-ignore', 'true'); document.body.appendChild(back);
    back.onclick = function () { st.hidden = false; saveSt(); applyHidden(); say('k', 'Da bin ich wieder! Tippe ein Thema an, dann erkläre ich dir die Fachbegriffe.', 6000); setMood('k', 'excited', 2500); };
    dock.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]');
      if (b) {
        var a = b.getAttribute('data-a');
        if (a === 'quiet') { st.quiet = !st.quiet; saveSt(); hideBub(); }
        if (a === 'hide') { st.hidden = true; saveSt(); applyHidden(); }
        if (a === 'help') helpMenu(b.getAttribute('data-w'));
        if (a === 'joke') joke(b.getAttribute('data-w'));
        if (a === 'pause') startPause();
        if (a === 'last') { hideBub(); if (S.item) openItem(S.item); }
        if (a === 'snooze') { snooze(); }
        if (a === 'bubx') hideBub();
        return;
      }
      var p = e.target.closest('.hp'); if (p && Date.now() < noClick) return; if (p) poke(p.getAttribute('data-w') || p.getAttribute('data-who'));
    });
    applyHidden();
    setFace('k', 'happy'); setFace('h', 'happy');
    initMove();
  }

  /* ---------------------------------------------------------------- Bewegung: ziehen und selbst herumlaufen */
  var noClick = 0, dragging = false, pos = {}, wanderT = 0;
  function vw() { return document.documentElement.clientWidth; }
  function vh() { return window.innerHeight; }
  function sizeOf(w) { var e = dock.querySelector('.hp-' + w); return { w: e.offsetWidth || 58, h: e.offsetHeight || 78 }; }
  function clampPos(w, x, y) { var z = sizeOf(w); return { x: Math.max(6, Math.min(vw() - z.w - 6, x)), y: Math.max(70, Math.min(vh() - z.h - 40, y)) }; }
  function putPos(w, x, y, secs) {
    var e = dock.querySelector('.hp-' + w), c = clampPos(w, x, y); pos[w] = c;
    e.style.transition = secs ? 'translate ' + secs + 's ease-in-out, transform .3s, opacity .3s' : 'transform .3s, opacity .3s';
    e.style.translate = c.x + 'px ' + c.y + 'px';
    if (bub.classList.contains('on') && bub.getAttribute('data-who') === w) placeBub(w);
    return c;
  }
  function defaults() {
    var z = sizeOf('h'), y = vh() - z.h - 90;
    if (st.pos) { pos = { k: { x: st.pos.k.x * vw(), y: st.pos.k.y * vh() }, h: { x: st.pos.h.x * vw(), y: st.pos.h.y * vh() } }; }
    else pos = { k: { x: vw() - 2 * z.w - 18, y: y }, h: { x: vw() - z.w - 10, y: y } };
    putPos('k', pos.k.x, pos.k.y); putPos('h', pos.h.x, pos.h.y);
  }
  function savePos() { st.pos = { k: { x: pos.k.x / vw(), y: pos.k.y / vh() }, h: { x: pos.h.x / vw(), y: pos.h.y / vh() } }; saveSt(); }
  function placeBub(w) {
    var e = dock.querySelector('.hp-' + w); if (!e) return;
    var r = e.getBoundingClientRect(), bw = Math.min(300, vw() - 24), bh = bub.offsetHeight || 90;
    var cx = r.left + r.width / 2, left = Math.max(12, Math.min(vw() - bw - 12, cx - bw / 2));
    var above = r.top > bh + 20;
    bub.style.width = bw + 'px'; bub.style.left = left + 'px';
    bub.style.top = (above ? r.top - bh - 12 : r.bottom + 12) + 'px';
    bub.style.setProperty('--ax', Math.max(14, Math.min(bw - 28, cx - left - 7)) + 'px');
    bub.classList.toggle('below', !above);
  }
  function initMove() {
    defaults();
    window.addEventListener('resize', function () { ['k', 'h'].forEach(function (w) { putPos(w, pos[w].x, pos[w].y); }); });
    ['k', 'h'].forEach(function (w) {
      var e = dock.querySelector('.hp-' + w), sx, sy, ox, oy, id = null, moved = false;
      e.addEventListener('pointerdown', function (ev) {
        if (ev.button > 0) return;
        var r = e.getBoundingClientRect(); sx = ev.clientX; sy = ev.clientY; ox = r.left; oy = r.top; id = ev.pointerId; moved = false;
        try { e.setPointerCapture(id); } catch (x) {}
      });
      e.addEventListener('pointermove', function (ev) {
        if (id === null || ev.pointerId !== id) return;
        var dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 9) return;
        if (!moved) { moved = true; dragging = true; e.classList.add('drag'); setMood(w, 'surprised', 0); hideBub(); wake(); }
        putPos(w, ox + dx, oy + dy, 0);
      });
      function end(ev) {
        if (id === null || (ev && ev.pointerId !== id)) return;
        try { e.releasePointerCapture(id); } catch (x) {}
        id = null; e.classList.remove('drag');
        if (moved) { dragging = false; noClick = Date.now() + 350; savePos(); setMood(w, 'happy'); setFace(w, 'happy'); if (!st.quiet && Math.random() < .5) say(w, rnd(MOVEQ[w]), 3500); }
      }
      e.addEventListener('pointerup', end); e.addEventListener('pointercancel', end);
      e.addEventListener('transitionend', function (ev) { if (ev.propertyName === 'translate') e.classList.remove('walk'); });
    });
    scheduleWander();
  }
  var MOVEQ = {
    k: ['Wheee, neue Aussicht! Von hier sieht die Liste ganz anders aus.', 'Hier steh ich gut. Danke fürs Tragen!', 'Huch! Ich war gerade noch mit dem Rühren beschäftigt.'],
    h: ['Interessant, ein Ortswechsel! Die Energie bleibt dabei erhalten.', 'Bewegung! Hier ist die potenzielle Energie genau richtig.', 'Danke. Ich hätte gleich selbst laufen können, aber so geht es schneller.']
  };
  function scheduleWander() { clearTimeout(wanderT); wanderT = setTimeout(wander, 9000 + Math.random() * 14000); }
  function wander() {
    scheduleWander();
    if (reduce || st.hidden || dragging || sleeping || S.view !== 'none' || !pauseEl.hidden || bub.classList.contains('on') || document.visibilityState !== 'visible') return;
    var w = Math.random() < .5 ? 'k' : 'h', o = w === 'k' ? 'h' : 'k', e = dock.querySelector('.hp-' + w), tx, ty, visit = Math.random() < .3;
    if (visit) { tx = pos[o].x + (pos[w].x < pos[o].x ? -62 : 62); ty = pos[o].y; }
    else { var a = Math.random() * 6.283, d = 90 + Math.random() * 190; tx = pos[w].x + Math.cos(a) * d; ty = pos[w].y + Math.sin(a) * d * .6; }
    var from = pos[w], c = clampPos(w, tx, ty), dist = Math.hypot(c.x - from.x, c.y - from.y);
    if (dist < 40) return;
    e.classList.add('walk'); putPos(w, c.x, c.y, Math.max(1.6, dist / 55));
    if (visit) { setTimeout(function () { if (!dragging && !sleeping) { setMood(w, 'giggle', 1800); setMood(o, 'wink', 1800); hop(o); } }, dist / 55 * 1000 + 200); }
  }
  function saveSt() { lsSet(KEYS, JSON.stringify(st)); }
  function applyHidden() { dock.hidden = st.hidden; $('hback').hidden = !st.hidden; }

  var pokes = 0, pokeT = 0;
  function poke(w) {
    var now = Date.now(); if (now - pokeT > 2500) pokes = 0; pokeT = now; pokes++;
    wake();
    if (pokes >= 5) { setMood(w, 'dizzy', 2200); say(w, rnd(skin(w).t.DIZZY), 4500); pokes = 0; return; }
    if (pokes === 3) { setMood(w, 'giggle', 1800); say(w, rnd(skin(w).t.TICKLE), 3500); return; }
    helpMenu(w);
  }
  function helpMenu(w) {
    setMood(w, 'interested', 3000);
    var who = w === 'k' ? 'Chemie' : 'Physik';
    say(w, '<b>' + NAME[w] + ':</b> Ich helfe dir bei <b>' + who + '</b>. Tippe in der Liste einen Punkt an, dann zeige ich dir die passenden Fachbegriffe mit Bildern. Das Kästchen kreuzt du erst an, wenn du ein Thema wirklich kannst.',
      0, '<button type="button" data-a="joke" data-w="' + w + '">😄 Witz</button>' + (S.item ? '<button type="button" data-a="last">🔁 Letztes Thema</button>' : '') + '<button type="button" data-a="pause">☕ Pause</button><button type="button" data-a="quiet">' + (st.quiet ? '🔔 Wieder reden' : '🔕 Leise') + '</button><button type="button" data-a="hide">✖ Ausblenden</button><button type="button" data-a="bubx">OK</button>');
    clearTimeout(bubT); bubT = setTimeout(hideBub, 16000);
  }
  function joke(w) {
    var j = rnd(skin(w).t.JOKES); setMood(w, 'giggle', 3000);
    say(w, '<b>' + esc(skin(w).t.jokeLead || 'Witz: ') + '</b>' + esc(j[0]) + '<br><b>' + esc(j[1]) + '</b>', 14000, '<button type="button" data-a="joke" data-w="' + w + '">Noch einer</button><button type="button" data-a="bubx">Genug</button>');
  }

  /* ---------------------------------------------------------------- Zuordnung Punkt ↔ Begriffe */
  function termsFor(itemId) {
    var it = ITEMBY[itemId]; if (!it) return { list: [], exact: false };
    var fid = it.field, lk = mode() === 'lk';
    var all = TERMS.filter(function (t) { return t.f === fid && (lk || t.lvl === 'gk'); });
    var ex = all.filter(function (t) { return t.items.indexOf(itemId) >= 0; });
    return { list: ex.length ? ex : all, exact: ex.length > 0, all: all };
  }
  function whoOf(itemId, ts) {
    var it = ITEMBY[itemId]; if (!it) return 'k';
    if (ts && ts.list.length) { var c = { k: 0, h: 0 }; ts.list.forEach(function (t) { c[t.who]++; }); if (c.h !== c.k) return c.h > c.k ? 'h' : 'k'; }
    return FWHO[it.field] || 'k';
  }

  /* ---------------------------------------------------------------- Sheet (Begriffe und Folien) */
  function buildSheet() {
    sheet = document.createElement('div'); sheet.id = 'hsheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'false'); sheet.setAttribute('aria-label', 'Erklärung der Helfer');
    sheet.setAttribute('data-html2canvas-ignore', 'true');
    sheet.innerHTML = '<div class="sh-in"><div class="sh-head"><div class="sh-av" id="shAv"></div><div class="sh-say" id="shSay"></div><button type="button" class="sh-x" id="shX" aria-label="Schließen">×</button></div><div class="sh-main" id="shMain"></div></div>';
    document.body.appendChild(sheet);
    $('shX').onclick = closeSheet;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (!pauseEl.hidden) endPause(); else if (S.view !== 'none') closeSheet(); } });
    $('shMain').addEventListener('click', function (e) {
      var b = e.target.closest('[data-t],[data-n],[data-a]'); if (!b) return;
      if (b.hasAttribute('data-t')) { openTerm(TERMS[+b.getAttribute('data-t')]); return; }
      if (b.hasAttribute('data-n')) { go(+b.getAttribute('data-n')); return; }
      var a = b.getAttribute('data-a');
      if (a === 'back') { if (S.item) openItem(S.item, true); else if (S.field) openField(S.field); else closeSheet(); }
      if (a === 'done') closeSheet();
      if (a === 'pause') { closeSheet(); startPause(); }
    });
  }
  function setSheetAvatar(w, fromDock) {
    var holder = $('shAv'); holder.innerHTML = ''; var a = mkAvatar(w); holder.appendChild(a); holder.setAttribute('data-who', w);
    setFace(w, mood[w]);
    if (fromDock && a.animate && !reduce) {
      var src = av[w] && av[w].getBoundingClientRect(), dst = a.getBoundingClientRect();
      if (src && src.width > 0 && dst.width > 0) {
        var dx = src.left + src.width / 2 - (dst.left + dst.width / 2), dy = src.top + src.height / 2 - (dst.top + dst.height / 2), k = src.width / dst.width;
        a.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + k + ')', opacity: .9 }, { transform: 'translate(0,0) scale(1)', opacity: 1 }], { duration: 520, easing: 'cubic-bezier(.2,.9,.25,1.1)' });
      }
    }
  }
  function showSheet(w, line) {
    var wasOpen = sheet.classList.contains('on');
    sheet.classList.add('on'); document.body.classList.add('hsheet-open');
    if (S.who !== w || !wasOpen) { S.who = w; setSheetAvatar(w, !wasOpen); }
    if (!wasOpen) { Array.prototype.forEach.call(document.querySelectorAll('.hp-' + w), function (p) { p.classList.add('away'); }); }
    sheet.setAttribute('data-who', w);
    $('shSay').innerHTML = line || '';
    hideBub(); hop(w);
  }
  function closeSheet() {
    if (!sheet.classList.contains('on')) return;
    sheet.classList.remove('on'); document.body.classList.remove('hsheet-open'); S.view = 'none';
    Array.prototype.forEach.call(document.querySelectorAll('.hp'), function (p) { p.classList.remove('away'); });
    setMood(S.who, 'happy');
    if (S.who && av[S.who] && av[S.who].animate && !reduce) av[S.who].animate([{ transform: 'translateY(-18px) scale(1.15)' }, { transform: 'none' }], { duration: 400, easing: 'ease-out' });
  }
  function chipHtml(ts, extraCls) {
    return ts.map(function (t) {
      var i = TERMS.indexOf(t);
      return '<button type="button" class="tchip ' + t.who + (t.lvl === 'lk' ? ' lk' : '') + (extraCls || '') + '" data-t="' + i + '"><span class="te">' + EMO[t.who] + '</span>' + esc(t.chip) + (t.lvl === 'lk' ? '<span class="lkb">LK</span>' : '') + '</button>';
    }).join('');
  }
  function openItem(itemId, quiet) {
    var it = ITEMBY[itemId]; if (!it) return;
    S.item = itemId; S.field = it.field; S.view = 'terms'; S.term = null;
    var ts = termsFor(itemId), w = whoOf(itemId, ts);
    var title = it.title.replace(/⟦([\s\S]*?)⟧/g, '$1');
    var line;
    if (!ts.list.length) {
      line = '<b>' + NAME[w] + ':</b> Zu diesem Punkt gibt es im Rahmenlehrplan keinen eigenen Fachbegriff. Schau dir bei „Genauer“ an, was du können sollst. Ich bin da, wenn du etwas nicht verstehst.';
      showSheet(w, line); setMood(w, 'happy', 2500);
      $('shMain').innerHTML = '<p class="sh-t">' + esc(title) + '</p><div class="sh-nav"><button type="button" class="bt" data-a="done">Alles klar</button></div>';
      return;
    }
    line = ts.exact
      ? '<b>' + NAME[w] + ':</b> Das ist mein Gebiet! Zu <b>' + esc(title) + '</b> gehören diese Fachbegriffe. Tippe einen an, dann erkläre ich ihn mit Bildern.'
      : '<b>' + NAME[w] + ':</b> Zu diesem Punkt ist kein Begriff einzeln aufgeführt. Das sind die Fachbegriffe des ganzen Themenfelds. Tippe einen an, dann erkläre ich ihn.';
    showSheet(w, line); setMood(w, 'interested', 3000);
    var more = ts.exact && ts.all.length > ts.list.length ? '<details class="sh-more"><summary>Alle Fachbegriffe dieses Themenfelds (' + ts.all.length + ')</summary><div class="tchips">' + chipHtml(ts.all) + '</div></details>' : '';
    $('shMain').innerHTML = '<p class="sh-t">' + esc(title) + '</p><div class="tchips">' + chipHtml(ts.list) + '</div>' + more +
      '<p class="sh-hint">Ich erkläre dir jeden Begriff in wenigen Bildern. Du kannst jederzeit zurück oder abbrechen.</p>';
  }
  function openField(fid) {
    S.item = null; S.field = fid; S.view = 'terms';
    var lk = mode() === 'lk', ts = TERMS.filter(function (t) { return t.f === fid && (lk || t.lvl === 'gk'); }), w = FWHO[fid] || 'k';
    if (ts.length) { var c = { k: 0, h: 0 }; ts.forEach(function (t) { c[t.who]++; }); if (c.h > c.k) w = 'h'; }
    showSheet(w, '<b>' + NAME[w] + ':</b> Das sind die Fachbegriffe dieses Themenfelds. Tippe einen an, dann erkläre ich ihn.');
    $('shMain').innerHTML = '<p class="sh-t">' + esc((FIELDBY[fid] || {}).title || '') + '</p><div class="tchips">' + chipHtml(ts) + '</div>';
    setMood(w, 'interested', 3000);
  }
  var LEAD = { first: ['Los geht’s!', 'Schauen wir uns das an.', 'Das ist einfacher, als es klingt.', 'Ich zeig’s dir Schritt für Schritt.'], mid: ['Weiter im Text.', 'Jetzt kommt der wichtige Teil.', 'Gut aufgepasst? Dann weiter.', 'Schau dir das Bild genau an.'], last: ['Geschafft! Das ist der Kern.', 'Das war’s schon. Merk dir diesen Satz.', 'Und damit hast du den Begriff im Kasten.'] };
  function openTerm(t) {
    if (!t) return;
    var w = t.who, prev = S.who, swap = prev !== w && sheet.classList.contains('on');
    S.term = t; S.idx = 0; S.view = 'slides'; S.field = t.f;
    var line = swap ? '<b>' + NAME[w] + ':</b> Das erkläre ich dir! ' + NAME[prev] + ' hat mich dafür geholt.' : null;
        showSheet(w, line || '');
    drawSlide(line);
    setMood(w, 'excited', 1800);
  }
  function go(n) {
    var t = S.term; if (!t) return;
    S.idx = Math.max(0, Math.min(t.s.length - 1, n)); drawSlide(); setMood(S.who, S.idx === t.s.length - 1 ? 'happy' : 'interested', 2500);
  }
  function us(h) { return String(h).replace(/(Δ|E|U|λ)_(max|[A-Za-z])/g, '$1<sub>$2</sub>'); }
  function drawSlide(forcedLine) {
    var t = S.term, n = t.s.length, i = S.idx, sl = t.s[i], w = t.who;
    var lead = forcedLine || ('<b>' + NAME[w] + ':</b> ' + (sl.say ? esc(sl.say) : rnd(i === 0 ? LEAD.first : i === n - 1 ? LEAD.last : LEAD.mid)));
    $('shSay').innerHTML = lead;
    var fig = typeof sl.f === 'function' ? sl.f() : (sl.f || '');
    var dots = ''; for (var k = 0; k < n; k++) dots += '<button type="button" class="dt' + (k === i ? ' on' : '') + '" data-n="' + k + '" aria-label="Folie ' + (k + 1) + '"></button>';
    var html = '<div class="sl-top"><span class="sl-term">' + EMO[w] + ' ' + esc(t.chip) + '</span><span class="sl-count">' + (i + 1) + ' / ' + n + '</span></div>';
    html += '<div class="sl-fig">' + fig + '</div>';
    html += '<h3 class="sl-h">' + us(esc(sl.h)) + '</h3><div class="sl-t">' + us(sl.t) + '</div>';
    if (i === n - 1 && t.m) html += '<div class="sl-m"><b>Merke:</b> ' + us(t.m) + '</div>';
    html += '<div class="sh-nav"><button type="button" class="bt ghost" data-n="' + (i - 1) + '"' + (i === 0 ? ' disabled' : '') + '>◀ Zurück</button><span class="dts">' + dots + '</span>';
    if (i < n - 1) html += '<button type="button" class="bt" data-n="' + (i + 1) + '">Weiter ▶</button>';
    else html += '<button type="button" class="bt" data-a="back">Weitere Begriffe</button>';
    html += '</div>';
    if (i === n - 1) html += '<div class="sh-end"><button type="button" class="bt ghost" data-a="done">Fertig</button><button type="button" class="bt ghost" data-a="pause">☕ Kurze Pause</button></div>';
    var main = $('shMain'); main.innerHTML = html;
    var fg = main.querySelector('.sl-fig svg'); if (fg) { fg.removeAttribute('width'); fg.removeAttribute('height'); }
    if (!reduce && main.animate) main.animate([{ opacity: 0, transform: 'translateX(14px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
    try { sheet.querySelector('.sh-in').scrollTop = 0; } catch (e) {}
  }

  /* ---------------------------------------------------------------- Lernzeit und Pause */
  var study = { ms: 0, last: Date.now(), next: 25, snoozed: 0 };
  function loadStudy() {
    try {
      var o = JSON.parse(lsGet(KEYT) || 'null');
      if (o && Date.now() - o.last < 10 * 60000) { study.ms = o.ms || 0; study.next = o.next || 25; }
    } catch (e) {}
  }
  function saveStudy() { lsSet(KEYT, JSON.stringify({ ms: study.ms, last: Date.now(), next: study.next })); }
  function activity() {
    var now = Date.now();
    if (sleeping) wake();
    if (now - lastAct > 10 * 60000 && study.ms > 5 * 60000) {     // war lange weg: Pause zählt
      study.ms = 0; study.next = 25;
      if (!st.quiet) { var w = S.last || 'k'; setMood(w, 'happy', 2500); say(w, rnd(skin(w).t.WAKE || ['Schön, dass du wieder da bist!']), 6000); }
    }
    lastAct = now;
  }
  function wake() { if (!sleeping) return; sleeping = false; setFace('k', mood.k); setFace('h', mood.h); }
  function tickStudy() {
    var now = Date.now();
    if (document.visibilityState === 'visible' && now - lastAct < 120000) { study.ms += 1000; if (study.ms % 15000 === 0) saveStudy(); }
    var idle = now - lastAct;
    if (!sleeping && idle > 90000 && document.visibilityState === 'visible') { sleeping = true; setFace('k', 'sleep'); setFace('h', 'sleep'); }
    var min = study.ms / 60000;
    if (min >= study.next && pauseEl.hidden) askPause();
  }
  var PAUSE_TXT = {
    25: ['Du lernst jetzt schon eine halbe Stunde, ohne Pause. Mein Tipp: kurz aufstehen, strecken, Wasser trinken. Danach merkst du dir mehr.', 'Zeit für eine kleine Verschnaufpause? Das Gehirn speichert in den Pausen, nicht beim Dauerlesen.'],
    50: ['Fast eine Stunde am Stück! Gönn dir wirklich eine Pause von mindestens fünf Minuten. Ich warte hier auf dich.', 'Jetzt ist eine Pause dran. Schau aus dem Fenster, bewege dich, trink etwas. Das Wissen sortiert sich dabei von allein.'],
    90: ['Du hast heute schon richtig viel geschafft. Mach eine längere Pause oder hör für heute auf. Du darfst stolz sein.', 'Lange gelernt, großartig! Aber irgendwann ist der Kopf voll. Eine richtige Pause hilft jetzt mehr als noch ein Thema.']
  };
  function askPause() {
    var min = Math.round(study.ms / 60000), key = study.next >= 90 ? 90 : study.next >= 50 ? 50 : 25;
    study.next = study.next < 50 ? 50 : study.next < 90 ? 90 : study.next + 30;
    saveStudy();
    if (ssGet('cl2-nonudge') === '1') return;
    var w = S.last || 'k';
    nudge.innerHTML = '<div class="nd-av" id="ndAv"></div><div class="nd-tx"><b>' + NAME[w] + ':</b> ' + esc(rnd(PAUSE_TXT[key])) + '<div class="nd-sub">Lernzeit: etwa ' + min + ' Minuten</div><div class="nd-bt"><button type="button" class="bt" data-a="pause">☕ Pause machen</button><button type="button" class="bt ghost" data-a="snooze">Noch 5 Minuten</button><button type="button" class="bt ghost" data-a="nomore">Heute nicht mehr fragen</button></div></div>';
    $('ndAv').appendChild(mkAvatar(w)); setFace(w, 'yawn'); nudge.classList.add('on'); nudge.setAttribute('data-who', w);
    setTimeout(function () { setFace(w, 'thinking'); }, 2500);
  }
  function snooze() { hideNudge(); study.next = Math.round(study.ms / 60000) + 5; saveStudy(); setMood(S.last, 'happy'); say(S.last, 'Okay, ich melde mich in fünf Minuten. Aber dann ist Pause!', 4500); }
  function hideNudge() { nudge.classList.remove('on'); }
  var pauseT = 0, pauseLeft = 0, pauseTipT = 0;
  var TIPS = ['Steh auf und strecke dich: Arme hoch, Schultern kreisen.', 'Trink ein Glas Wasser.', 'Schau 20 Sekunden aus dem Fenster in die Ferne. Das entspannt die Augen.', 'Atme viermal tief ein und langsam wieder aus.', 'Geh kurz an die frische Luft oder öffne das Fenster.', 'Bewege dich ein paar Schritte. Beine und Kopf mögen das.', 'Lass das Handy mal liegen. Pause heißt: nichts lernen.'];
  function startPause() {
    hideNudge(); hideBub(); if (S.view !== 'none') closeSheet();
    pauseLeft = 300; pauseEl.hidden = false; pauseEl.classList.add('on');
    var w1 = S.last || 'k', w2 = w1 === 'k' ? 'h' : 'k';
    pauseEl.innerHTML = '<div class="pz-in"><div class="pz-av"><div id="pzA"></div><div id="pzB"></div></div><h2>Pause! ☕</h2><div class="pz-breath" aria-hidden="true"></div><div class="pz-time" id="pzTime">5:00</div><p class="pz-tip" id="pzTip"></p><button type="button" class="bt" id="pzEnd">Ich bin wieder da</button></div>';
    $('pzA').appendChild(mkAvatar(w1)); $('pzB').appendChild(mkAvatar(w2));
    setFace(w1, 'sleep'); setFace(w2, 'yawn');
    $('pzEnd').onclick = endPause;
    function tip() { $('pzTip').textContent = rnd(TIPS); }
    tip(); clearInterval(pauseT); clearInterval(pauseTipT);
    pauseTipT = setInterval(tip, 25000);
    pauseT = setInterval(function () {
      pauseLeft--; var m = Math.floor(pauseLeft / 60), s = pauseLeft % 60;
      var el = $('pzTime'); if (el) el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
      if (pauseLeft <= 0) { clearInterval(pauseT); if (el) el.textContent = 'Die Pause ist um!'; }
    }, 1000);
  }
  function endPause() {
    clearInterval(pauseT); clearInterval(pauseTipT); pauseEl.classList.remove('on'); pauseEl.hidden = true; pauseEl.innerHTML = '';
    var longPause = pauseLeft < 240;      // mindestens eine Minute wirklich pausiert
    if (longPause) { study.ms = 0; study.next = 25; saveStudy(); }
    lastAct = Date.now(); setFace('k', 'happy'); setFace('h', 'happy'); mood.k = mood.h = 'happy';
    var w = S.last || 'k';
    setMood(w, 'excited', 3000);
    say(w, longPause ? 'Willkommen zurück! Frisch ausgeruht geht es gleich besser. Wo möchtest du weitermachen?' : 'Das war aber eine kurze Pause. Dein Kopf braucht mehr Ruhe, probier es später noch einmal.', 7000);
  }

  /* ---------------------------------------------------------------- Zwischenrufe */
  var R = {
    k: [
      'Tipp: Tippe einen Punkt in der Liste an. Dann zeige ich dir die Fachbegriffe dazu.',
      'Das Kästchen kreuzt du erst an, wenn du das Thema wirklich erklären könntest. Ehrlich zu dir selbst sein lohnt sich.',
      'Fachbegriffe sind wie Werkzeug: Wenn du den richtigen Namen kennst, findest du auch die richtige Antwort.',
      'Bei Bildern lernt man schneller. Tippe einen farbigen Begriff an, ich male dir was dazu.',
      'Nicht alles auf einmal! Ein Thema nach dem anderen reicht völlig.'
    ],
    h: [
      'Hugo hier! Mein Fachgebiet: Energie, Tempo und Strom. Tippe ein Thema an, ich erkläre dir die Begriffe.',
      'Wenn dir Thermodynamik zu abstrakt ist: Zeichne die Teilchen. Fast alles wird dann klarer.',
      'Redox ist einfach: Elektronen wandern. Mehr nicht. Frag mich, wenn es hakt!',
      'Pausen sind kein Zeitverlust. Mein Elektron kreist auch nicht ununterbrochen.',
      'Tipp: Erst verstehen, dann merken. Frag mich bei jedem Begriff nach dem Bild dazu.'
    ]
  };
  var FREM = {
    p: ['Proteine! Aminosäuren sind die Bausteine. Tippe ein Thema an, ich zeige dir Peptidbindung und Strukturen.', 'Hier geht es um Proteine. Die Peptidbindung ist der Star. 😉'],
    k: ['Kunststoffe: lange Ketten aus kleinen Bausteinen. Soll ich dir Monomer, Polymer und Co. erklären?'],
    g: ['Gleichgewicht: Hin- und Rückreaktion gleich schnell. Mehr steckt im Kern nicht dahinter.'],
    s: ['Säuren und Basen drehen sich ums Proton. Tippe ein Thema an, ich zeige dir die Paare.'],
    i: ['Farbstoffe: Spektrum erklärt Hugo, die Struktur Kolbi. Wir teilen uns das.'],
    t: ['Thermodynamik: Energie wird nie verbraucht, nur umverteilt. Frag mich, wenn du Diagramme brauchst.'],
    r: ['Reaktionsgeschwindigkeit: nur wirksame Zusammenstöße zählen. Ich zeige dir das mit Teilchen.'],
    o: ['Redoxreaktionen: Elektronen werden übertragen. Ich zeige dir, wie du das erkennst.'],
    e: ['Elektrochemie: Strom aus Reaktionen und Reaktionen durch Strom. Tippe ein Thema an!']
  };
  var visField = null, remarkT = 0;
  function scheduleRemark() { clearTimeout(remarkT); remarkT = setTimeout(function () { remark(); scheduleRemark(); }, 50000 + Math.random() * 50000); }
  function remark() {
    if (st.quiet || st.hidden || S.view !== 'none' || !pauseEl.hidden || sleeping || document.visibilityState !== 'visible') return;
    if (bub.classList.contains('on')) return;
    if (Date.now() - lastAct > 120000) return;
    var w = Math.random() < .5 ? 'k' : 'h', txt;
    if (visField && FREM[visField] && Math.random() < .55) { w = FWHO[visField] || 'k'; txt = rnd(FREM[visField]); }
    else txt = rnd(R[w]);
    setMood(w, rnd(['happy', 'interested', 'wink', 'hum']), 4000);
    say(w, '<b>' + NAME[w] + ':</b> ' + esc(txt), 9000);
  }
  function watchFields() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > .35) visField = e.target.getAttribute('data-field'); });
    }, { threshold: [.35] });
    Array.prototype.forEach.call(document.querySelectorAll('details.field'), function (d) { io.observe(d); });
  }

  /* ---------------------------------------------------------------- Reaktion auf Kästchen */
  function onCheck(e) {
    var c = e.target; if (!c || c.type !== 'checkbox' || !c.closest('.item')) return;
    activity();
    if (!c.checked || st.quiet) return;
    var id = c.closest('.item').getAttribute('data-id'), it = ITEMBY[id], w = FWHO[it && it.field] || 'k';
    var ts = termsFor(id); w = whoOf(id, ts);
    var done = Array.prototype.filter.call(document.querySelectorAll('.item input'), function (x) { return x.checked; }).length;
    var fieldDone = it && FIELDS.filter(function (f) { return f.id === it.field; })[0];
    var txt;
    var allField = fieldDone && fieldDone.items.every(function (x) { return (mode() === 'lk' || x[1] === 'gk') ? document.getElementById('c-' + x[0]).checked : true; });
    if (allField) txt = 'Das ganze Themenfeld „' + fieldDone.title + '“ ist abgehakt! Das ist ein großer Schritt. Gönn dir einen Moment Stolz. 🎉';
    else txt = rnd(['Stark! Wieder ein Punkt geschafft.', 'Gut gemacht! Du kommst voran.', 'Das sitzt also schon. Klasse!', 'Ein Kästchen mehr. Aber ehrlich: könntest du es auch erklären?']);
    setMood(w, allField ? 'excited' : 'happy', 3200); say(w, '<b>' + NAME[w] + ':</b> ' + esc(txt), 6000);
  }

  /* ---------------------------------------------------------------- Einbau in die Seite */
  function decorate() {
    // Punkte: Antippen öffnet den Helfer
    Array.prototype.forEach.call(document.querySelectorAll('.item'), function (el) {
      var id = el.getAttribute('data-id'), ib = el.querySelector('.ib'); if (!ib) return;
      var ts = termsFor(id), w = whoOf(id, ts);
      el.classList.add('askable');
      var b = document.createElement('button'); b.type = 'button'; b.className = 'ask ' + w; b.setAttribute('data-ask', id);
      b.innerHTML = EMO[w] + ' ' + NAME[w] + ' erklärt Begriffe';
      var tt = ib.querySelector('.tt'); tt.parentNode.insertBefore(b, tt.nextSibling);
    });
    document.addEventListener('click', function (e) {
      activity();
      var ask = e.target.closest('[data-ask]');
      if (ask) { e.preventDefault(); openItem(ask.getAttribute('data-ask')); return; }
      var tc = e.target.closest('[data-term]');
      if (tc) { e.preventDefault(); var t = TERMS[+tc.getAttribute('data-term')]; S.item = null; S.field = t.f; openTerm(t); return; }
      var tt = e.target.closest('.item .tt');
      if (tt) { openItem(tt.closest('.item').getAttribute('data-id')); }
    });
    // Fachbegriff-Chips der Themenfelder werden zu Schaltflächen
    Array.prototype.forEach.call(document.querySelectorAll('details.field'), function (fd) {
      var fid = fd.getAttribute('data-field');
      Array.prototype.forEach.call(fd.querySelectorAll('.blk .chip'), function (c) {
        var key = fid + '|' + c.textContent.trim(), t = BYCHIP[key]; if (!t) return;
        var b = document.createElement('button'); b.type = 'button'; b.className = c.className + ' chipbtn ' + t.who; b.setAttribute('data-term', TERMS.indexOf(t));
        b.innerHTML = EMO[t.who] + ' ' + c.innerHTML; c.parentNode.replaceChild(b, c);
      });
      var h = fd.querySelector('.blk h4');
      if (h && /Fachbegriffe/.test(h.textContent)) h.innerHTML = 'Verbindliche Fachbegriffe <span class="hh">· tippe einen an, ' + EMO.k + ' Kolbi und ' + EMO.h + ' Hugo erklären sie</span>';
    });
  }

  function css() {
    var s = document.createElement('style');
    s.textContent = [
      '#hdock{position:fixed;left:0;top:0;width:100%;height:100%;z-index:40;pointer-events:none}',
      '#hdock[hidden]{display:none}',
      '.hp{position:absolute;left:0;top:0;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;border:0;background:none;padding:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;-webkit-tap-highlight-color:transparent;transition:transform .3s,opacity .3s;color:#cfd6f6;font-size:.68rem;font-weight:700}',
      '.hp.away{opacity:.25;transform:translateY(6px) scale(.92)}.hp.drag{cursor:grabbing;transform:scale(1.12);z-index:3}.hp.walk .hv{animation-duration:.5s}',
      '.hv{width:58px;height:62px;animation:hbob 3.4s ease-in-out infinite;filter:drop-shadow(0 4px 6px rgba(0,0,0,.45));pointer-events:none}',
      '.hp-h .hv{animation-delay:-1.7s;width:58px;height:58px}',
      '.hv svg{width:100%;height:100%;overflow:visible}',
      '.hv .k-lid{transform-box:fill-box;transform-origin:center;animation:hblink 5s infinite}',
      '.hv .k-bub{animation:hrise 3.4s linear infinite;opacity:0}.hv .k-bub.b2{animation-delay:1.1s}.hv .k-bub.b3{animation-delay:2.2s}',
      '.hv .k-zzz{animation:hzzz 3s ease-in-out infinite}',
      '.hv #hg-ring{transform-origin:40px 40px;animation:hspin 9s linear infinite}',
      '.hv.hop{animation:hhop .5s ease-out 1,hbob 3.4s ease-in-out .5s infinite}',
      '@keyframes hbob{0%,100%{translate:0 0}50%{translate:0 -4px}}',
      '@keyframes hhop{0%,100%{translate:0 0;scale:1 1}35%{translate:0 -16px;scale:.95 1.06}70%{translate:0 0;scale:1.06 .94}}',
      '@keyframes hblink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}',
      '@keyframes hrise{0%{transform:translateY(0);opacity:0}15%{opacity:.7}85%{opacity:.5}100%{transform:translateY(-26px);opacity:0}}',
      '@keyframes hzzz{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-6px);opacity:1}}',
      '@keyframes hspin{to{transform:rotate(360deg)}}',
      '.hn{margin-top:-2px;text-shadow:0 1px 3px #000}',
      '.hbub{position:absolute;left:0;top:0;width:min(300px,calc(100vw - 24px));background:#fff;color:#1e293b;border-radius:16px;padding:11px 14px;font-size:.88rem;line-height:1.45;box-shadow:0 8px 28px rgba(0,0,0,.5);opacity:0;pointer-events:none;transform:translateY(8px) scale(.96);transform-origin:bottom right;transition:.22s}',
      '.hbub.on{opacity:1;pointer-events:auto;transform:none}',
      '.hbub::after{content:"";position:absolute;bottom:-7px;left:var(--ax,40px);width:14px;height:14px;background:#fff;transform:rotate(45deg)}',
      '.hbub.below::after{bottom:auto;top:-7px}',
      '.hbub .bb{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}',
      '.hbub .bb button,.bt{border:0;border-radius:10px;background:#3b4fd8;color:#fff;font-size:.82rem;font-weight:700;padding:8px 12px;min-height:40px;cursor:pointer}',
      '.hbub .bb button{background:#e8ecff;color:#26308f;min-height:36px}',
      
      '#hback{position:fixed;right:10px;bottom:calc(44px + env(safe-area-inset-bottom));z-index:40;border:1px solid var(--line);background:#232c63;color:#e9edff;border-radius:99px;padding:9px 14px;font-size:.85rem;font-weight:700;cursor:pointer;min-height:42px}',
      '#hback[hidden]{display:none}',
      /* Sheet */
      '#hsheet{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;justify-content:center;pointer-events:none;transform:translateY(105%);transition:transform .38s cubic-bezier(.2,.8,.2,1)}',
      '#hsheet.on{transform:none;pointer-events:auto}',
      '.sh-in{width:min(760px,100%);max-height:84vh;max-height:84dvh;overflow:auto;background:linear-gradient(180deg,#1a2250,#141a33);border:1px solid rgba(255,255,255,.18);border-bottom:0;border-radius:22px 22px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.55);padding:12px 16px calc(52px + env(safe-area-inset-bottom));-webkit-overflow-scrolling:touch}',
      '#hsheet[data-who=k] .sh-in{border-top:4px solid #38bdf8}#hsheet[data-who=h] .sh-in{border-top:4px solid #ff7a8f}',
      '.sh-head{display:flex;gap:12px;align-items:center;position:sticky;top:-12px;background:linear-gradient(180deg,#1a2250 70%,transparent);padding:4px 0 8px;margin-top:-4px;z-index:2}',
      '.sh-av{flex:none;width:64px;height:68px}',
      '.sh-av .hv{width:64px;height:68px}',
      '.sh-say{flex:1;min-width:0;background:#fff;color:#1e293b;border-radius:14px;padding:9px 13px;font-size:.9rem;line-height:1.4;position:relative}',
      '.sh-say::before{content:"";position:absolute;left:-6px;top:22px;width:12px;height:12px;background:#fff;transform:rotate(45deg)}',
      '.sh-x{flex:none;border:0;background:#2a3370;color:#fff;width:42px;height:42px;border-radius:50%;font-size:1.5rem;line-height:1;cursor:pointer}',
      '.sh-t{margin:6px 0 10px;font-weight:700;font-size:1rem;color:#fff}',
      '.tchips{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 10px}',
      '.tchip{border:1px solid rgba(255,255,255,.2);background:#232c63;color:#eaf0ff;border-radius:99px;padding:9px 14px;font-size:.9rem;font-weight:600;cursor:pointer;min-height:44px;display:inline-flex;align-items:center;gap:7px;text-align:left}',
      '.tchip.k{border-color:#38bdf8aa;background:#12304a}.tchip.h{border-color:#ff7a8faa;background:#3a1a2c}',
      '.tchip:active{transform:scale(.97)}',
      '.lkb{font-size:.62rem;font-weight:800;background:#ffb347;color:#2b1700;border-radius:5px;padding:1px 5px}',
      '.sh-more{margin:8px 0;color:#9fb2ff;font-size:.85rem}.sh-more summary{cursor:pointer;padding:6px 0}',
      '.sh-hint{color:#9aa5cf;font-size:.82rem;margin:8px 0 0}',
      '.sl-top{display:flex;justify-content:space-between;color:#9aa5cf;font-size:.8rem;font-weight:700}',
      '.sl-term{color:#fff}',
      '.sl-fig{background:#f8fafc;border-radius:16px;margin:8px 0;padding:8px;display:flex;justify-content:center;border:1px solid #cbd5e1}',
      '.sl-fig svg{width:100%;max-width:520px;height:auto;max-height:40vh;display:block}',
      '.sl-h{margin:8px 0 4px;font-size:1.08rem;color:#ffd98a}',
      '.sl-t{color:#e4e9ff;font-size:.95rem;line-height:1.55}.sl-t p{margin:0 0 6px}',
      '.sl-t b{color:#fff}.sl-t .r{color:#ff9db0;font-weight:700}.sl-t .bl{color:#8ec5ff;font-weight:700}.sl-t .gn{color:#7ee7a8;font-weight:700}.sl-t .or{color:#ffbd7a;font-weight:700}',
      '.sl-m{margin:10px 0 2px;background:#1f3a2e;border:1px solid #3cb878;border-radius:12px;padding:9px 12px;color:#d8ffe8;font-size:.92rem}',
      '.sh-nav{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px}',
      '.bt.ghost{background:#2a3370}.bt[disabled]{opacity:.35}',
      '.dts{display:flex;gap:7px;align-items:center}.dt{width:12px;height:12px;border-radius:50%;border:0;background:#4a5390;padding:0;cursor:pointer;position:relative}.dt::after{content:"";position:absolute;inset:-10px}.dt.on{background:#ffd98a;transform:scale(1.25)}',
      '.sh-end{display:flex;gap:8px;justify-content:center;margin-top:10px;flex-wrap:wrap}',
      /* Punkte */
      '.item.askable .tt{cursor:pointer}',
      '.ask{display:inline-block;margin:4px 0 0;border:1px solid rgba(255,255,255,.18);background:#1b2350;color:#dbe3ff;border-radius:99px;padding:5px 11px;font-size:.75rem;font-weight:700;cursor:pointer;min-height:32px}',
      '.ask.k{border-color:#38bdf899}.ask.h{border-color:#ff7a8f99}',
      '.chipbtn{cursor:pointer;font:inherit;font-size:.82rem;color:inherit;min-height:34px}.chipbtn.k{border-color:#38bdf899}.chipbtn.h{border-color:#ff7a8f99}.chipbtn:active{transform:scale(.97)}',
      '.hh{text-transform:none;letter-spacing:0;font-weight:500;opacity:.9}',
      /* Hinweis zur Lernzeit */
      '#hnudge{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translate(-50%,160%);visibility:hidden;z-index:70;width:min(560px,calc(100vw - 20px));background:#fff;color:#1e293b;border-radius:18px;padding:12px 14px;display:flex;gap:12px;box-shadow:0 12px 40px rgba(0,0,0,.6);transition:transform .4s cubic-bezier(.2,.9,.25,1.1),visibility 0s .4s}',
      '#hnudge.on{transform:translate(-50%,0);visibility:visible;transition:transform .4s cubic-bezier(.2,.9,.25,1.1)}',
      '.nd-av{flex:none;width:64px;height:68px}.nd-av .hv{width:64px;height:68px}',
      '.nd-tx{font-size:.92rem;line-height:1.45}.nd-sub{color:#64748b;font-size:.76rem;margin-top:3px}.nd-bt{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}',
      '#hnudge .bt.ghost{background:#e8ecff;color:#26308f}',
      /* Pause */
      '#hpause{position:fixed;inset:0;z-index:90;background:radial-gradient(800px 600px at 50% 30%,#1b2a66,#0b1020);display:none;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px}',
      '#hpause.on{display:flex}',
      '.pz-in{max-width:460px}.pz-av{display:flex;justify-content:center;gap:10px}.pz-av .hv{width:84px;height:88px}',
      '.pz-in h2{margin:8px 0 4px;font-size:1.7rem}',
      '.pz-breath{width:110px;height:110px;margin:12px auto;border-radius:50%;background:radial-gradient(circle,#7df9ff,#3b82f6);opacity:.8;animation:hbreath 8s ease-in-out infinite}',
      '@keyframes hbreath{0%,100%{transform:scale(.6)}50%{transform:scale(1.15)}}',
      '.pz-time{font-size:2.4rem;font-weight:800;margin:4px 0}.pz-tip{color:#cfd6f6;min-height:3em;font-size:1rem}',
      '@media (max-width:560px){.hv{width:50px;height:54px}.hp-h .hv{height:50px}.sh-av,.sh-av .hv{width:54px;height:58px}.sh-say{font-size:.84rem}}',
      '@media (prefers-reduced-motion:reduce){.hv,.hv .k-lid,.hv #hg-ring,.pz-breath{animation:none}#hsheet{transition:none}}',
      'body.hsheet-open{padding-bottom:50vh}'
    ].join('\n');
    document.head.appendChild(s);
  }

  window.Helfer = {
    init: function (fields) {
      FIELDS = fields;
      fields.forEach(function (f) { FIELDBY[f.id] = f; f.items.forEach(function (it) { ITEMBY[it[0]] = { id: it[0], field: f.id, lvl: it[1], title: it[2] }; }); });
      try { var o = JSON.parse(lsGet(KEYS) || '{}'); st.quiet = !!o.quiet; st.hidden = !!o.hidden; if (o.pos && o.pos.k && o.pos.h) st.pos = o.pos; } catch (e) {}
      css();
      pauseEl = document.createElement('div'); pauseEl.id = 'hpause'; pauseEl.hidden = true; document.body.appendChild(pauseEl);
      nudge = document.createElement('div'); nudge.id = 'hnudge'; nudge.setAttribute('role', 'alertdialog'); document.body.appendChild(nudge);
      nudge.addEventListener('click', function (e) {
        var b = e.target.closest('[data-a]'); if (!b) return; var a = b.getAttribute('data-a');
        if (a === 'pause') startPause(); if (a === 'snooze') snooze();
        if (a === 'nomore') { ssSet('cl2-nonudge', '1'); hideNudge(); say(S.last, 'Alles klar, ich sage heute nichts mehr. Pass trotzdem gut auf dich auf!', 5000); }
      });
      buildDock(); buildSheet(); decorate(); watchFields();
      document.addEventListener('change', onCheck);
      ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, function () { lastAct = Date.now(); if (sleeping) wake(); }, { passive: true }); });
      loadStudy(); setInterval(tickStudy, 1000); scheduleRemark();
      setTimeout(function () {
        if (st.hidden) return;
        setMood('k', 'excited', 2500); setMood('h', 'wink', 2500);
        say('k', '<b>Kolbi:</b> Hi! Ich bin Kolbi und kümmere mich um die <b>Chemie</b>. <b>Hugo</b> übernimmt die Physik. Tippe einen Punkt in der Liste an, dann erklären wir dir die Fachbegriffe mit Bildern.', 11000);
      }, 1800);
    },
    open: openItem, S: S, termsFor: termsFor, openTerm: openTerm, TERMS: TERMS
  };
})();
