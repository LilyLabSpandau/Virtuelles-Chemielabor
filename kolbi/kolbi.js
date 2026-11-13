/*
  Kolbi – frei bewegliches Maskottchen (zentral, von allen Modulen nutzbar).
  Einbinden:  <script src="…/kolbi/kolbi.js"></script>
  Nutzen:     Kolbi.init({ id:'modulname', color:'#38bdf8', tapHelp:function(){ return {text:'…', tip:'…'}; } });
              Kolbi.ask({ id:'eindeutige-id', text:'Anscheinend möchtest du …', tip:'Denkanstoß …' });
  Gespeichert wird nur im Browser der Schüler: "Tipp nicht mehr anzeigen" und "Kolbi aus". Keine Auswertung.
*/
(function () {
  'use strict';
  var KEY = 'kolbi-v1';
  var cfg = { id: 'modul', color: '#38bdf8', tapHelp: null, offsetBottom: 56 };
  var st = { off: false, mute: {} };
  var el = {}, pos = { x: 0, y: 0 }, size = 78;
  var wanderT = null, quietUntil = 0, bubbleOpen = false, curAsk = null, shownIds = {};
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function load() { try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); if (o && typeof o === 'object') { st.off = !!o.off; st.mute = o.mute || {}; } } catch (e) {} }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  var CSS = '' +
  '#kolbi-root{position:fixed;left:0;top:0;width:0;height:0;z-index:9000;pointer-events:none;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}' +
  '#kolbi-char{position:fixed;left:0;top:0;width:78px;height:96px;pointer-events:auto;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;perspective:420px;transition:left 1.8s cubic-bezier(.45,0,.25,1),top 1.8s cubic-bezier(.45,0,.25,1),opacity .3s}' +
  '#kolbi-char.drag{cursor:grabbing;transition:none}' +
  '#kolbi-char.nomove{transition:none}' +
  '#kolbi-shadow{position:absolute;left:50%;bottom:-2px;width:62px;height:11px;margin-left:-31px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(3px);transition:transform .3s,opacity .3s}' +
  '#kolbi-body{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d;transform:rotateY(var(--ry,0deg)) rotateZ(var(--rz,0deg));transition:transform .5s ease;transform-origin:50% 90%;animation:kolbi-bob 3.2s ease-in-out infinite;filter:drop-shadow(0 6px 5px rgba(0,0,0,.35))}' +
  '#kolbi-char.walk #kolbi-body{animation:kolbi-hop .42s ease-in-out infinite}' +
  '#kolbi-char.walk #kolbi-shadow{transform:scale(.8);opacity:.7}' +
  '#kolbi-body svg{width:100%;height:100%;overflow:visible;display:block}' +
  '#kolbi-body .k-lid{transform-box:fill-box;transform-origin:center;animation:kolbi-blink 5s infinite}' +
  '#kolbi-body .k-arm{transform-box:fill-box;transform-origin:50% 0}' +
  '#kolbi-char.talk .k-armr{animation:kolbi-wave .7s ease-in-out infinite}' +
  '@keyframes kolbi-bob{0%,100%{translate:0 0}50%{translate:0 -4px}}' +
  '@keyframes kolbi-hop{0%,100%{translate:0 0;scale:1 1}35%{translate:0 -10px;scale:.96 1.05}70%{translate:0 0;scale:1.05 .94}}' +
  '@keyframes kolbi-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}' +
  '@keyframes kolbi-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-24deg)}}' +
  '#kolbi-bubble{position:fixed;left:0;top:0;width:min(290px,calc(100vw - 20px));box-sizing:border-box;pointer-events:auto;background:#fffbe3;color:#1f2937;border:1.5px solid #3b3b2a;border-radius:12px;padding:12px 14px;box-shadow:0 10px 26px rgba(0,0,0,.4);font-size:14.5px;line-height:1.45;display:none;opacity:0;transform:scale(.94);transform-origin:var(--ox,50%) 100%;transition:opacity .18s,transform .18s}' +
  '#kolbi-bubble.on{display:block}' +
  '#kolbi-bubble.show{opacity:1;transform:scale(1)}' +
  '#kolbi-bubble::after{content:"";position:absolute;left:var(--tx,40px);width:14px;height:14px;background:#fffbe3;border:1.5px solid #3b3b2a;border-top:0;border-left:0;transform:rotate(45deg);margin-left:-7px;bottom:-8px}' +
  '#kolbi-bubble.below::after{bottom:auto;top:-8px;border:1.5px solid #3b3b2a;border-bottom:0;border-right:0}' +
  '#kolbi-bubble .kb-text{margin:0 18px 10px 0}' +
  '#kolbi-bubble .kb-x{position:absolute;right:6px;top:4px;border:0;background:none;font-size:20px;line-height:1;color:#6b7280;cursor:pointer;padding:4px 7px}' +
  '#kolbi-bubble .kb-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:7px 4px;font:inherit;color:#111827;cursor:pointer;border-radius:8px}' +
  '#kolbi-bubble .kb-opt:hover,#kolbi-bubble .kb-opt:focus-visible{background:rgba(59,130,246,.14);outline:none}' +
  '#kolbi-bubble .kb-dot{flex:none;width:13px;height:13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#60a5fa,#1d4ed8);box-shadow:0 0 0 1.5px #1e3a8a}' +
  '#kolbi-bubble .kb-mute{display:flex;align-items:center;gap:9px;margin-top:6px;padding:6px 2px 0;font-size:13px;color:#374151;cursor:pointer}' +
  '#kolbi-bubble .kb-mute input{width:17px;height:17px;margin:0}' +
  '#kolbi-bubble .kb-off{display:block;margin:8px 0 0 auto;border:0;background:none;color:#6b7280;font:inherit;font-size:12px;text-decoration:underline;cursor:pointer;padding:4px 0}' +
  '#kolbi-bubble .kb-ok{margin-top:6px;border:0;border-radius:8px;background:#2563eb;color:#fff;font:inherit;font-weight:600;padding:8px 16px;cursor:pointer}' +
  '#kolbi-back{position:fixed;left:10px;pointer-events:auto;display:none;border:0;border-radius:999px;background:rgba(30,41,59,.92);color:#e2e8f0;font:600 12px "Segoe UI",system-ui,sans-serif;padding:7px 12px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.35)}' +
  '@media (max-width:520px){#kolbi-back .kb-hol{display:none}}' +
  '@media (max-width:700px){#kolbi-char{width:62px;height:77px}#kolbi-shadow{width:50px;margin-left:-25px}}' +
  '@media (prefers-reduced-motion:reduce){#kolbi-body,#kolbi-char.walk #kolbi-body{animation:none}#kolbi-body .k-lid{animation:none}}';

  function svg(col) {
    var body = 'M40 12 V42 L11 98 Q5 112 19 112 H83 Q97 112 91 98 L62 42 V12 Z';
    return '<svg viewBox="-2 -8 106 128" role="img" aria-label="Kolbi, das Erlenmeyerkolben-Maskottchen">' +
      '<defs><clipPath id="kk-c"><path d="' + body + '"/></clipPath>' +
      '<linearGradient id="kk-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '"/><stop offset="1" stop-color="' + col + '" stop-opacity=".62"/></linearGradient>' +
      '<linearGradient id="kk-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient></defs>' +
      '<path d="' + body + '" fill="url(#kk-glass)"/>' +
      '<g clip-path="url(#kk-c)"><path d="M0 62 q13 -7 26 0 t26 0 t26 0 t26 0 V120 H0z" fill="url(#kk-g)"/>' +
      '<circle cx="30" cy="100" r="3" fill="#fff" opacity=".5"/><circle cx="72" cy="94" r="2.2" fill="#fff" opacity=".5"/><circle cx="60" cy="104" r="1.8" fill="#fff" opacity=".5"/></g>' +
      '<path d="' + body + '" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="3" stroke-linejoin="round"/>' +
      '<rect x="35" y="6" width="32" height="8" rx="4" fill="rgba(255,255,255,.4)" stroke="rgba(255,255,255,.9)" stroke-width="2.5"/>' +
      '<path d="M46 20 V36" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>' +
      '<path d="M19 96 Q16 104 22 108" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".45"/>' +
      '<g fill="none" stroke="#2c2457" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      '<path class="k-arm k-arml" d="M16 86 Q6 92 5 100"/><path class="k-arm k-armr" d="M86 86 Q96 92 97 100"/></g>' +
      '<g id="kolbi-eyes"><g class="k-lid"><circle cx="41" cy="74" r="4.6" fill="#2c2457"/><circle cx="61" cy="74" r="4.6" fill="#2c2457"/>' +
      '<circle cx="42.5" cy="72.4" r="1.6" fill="#fff"/><circle cx="62.5" cy="72.4" r="1.6" fill="#fff"/></g></g>' +
      '<path d="M43 83 q8 9 16 0" fill="none" stroke="#2c2457" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="33" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/><ellipse cx="69" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/></svg>';
  }

  function vw() { return window.innerWidth; }
  function vh() { return window.innerHeight; }
  function csz() { return el.char ? el.char.offsetWidth : size; }
  function clampPos(x, y) {
    var w = csz(), h = el.char.offsetHeight;
    return { x: Math.max(6, Math.min(vw() - w - 6, x)), y: Math.max(6, Math.min(vh() - h - 6, y)) };
  }
  function place(x, y, animate) {
    var p = clampPos(x, y);
    if (!animate) el.char.classList.add('nomove');
    var dx = p.x - pos.x;
    pos = p;
    el.char.style.left = p.x + 'px';
    el.char.style.top = p.y + 'px';
    tilt(dx);
    if (!animate) { void el.char.offsetWidth; el.char.classList.remove('nomove'); }
    if (bubbleOpen) layoutBubble();
  }
  function tilt(dx) {
    var cxm = pos.x + csz() / 2, side = (cxm / vw()) - 0.5; // -0.5 links … +0.5 rechts
    var ry = -side * 34 + (dx > 0 ? 10 : dx < 0 ? -10 : 0);
    el.body.style.setProperty('--ry', ry.toFixed(1) + 'deg');
    el.body.style.setProperty('--rz', (dx > 0 ? 3 : dx < 0 ? -3 : 0) + 'deg');
  }
  function anchors() {
    var w = csz(), h = el.char.offsetHeight, b = cfg.offsetBottom;
    return [
      { x: vw() - w - 14, y: vh() - h - b },
      { x: 14, y: vh() - h - b },
      { x: vw() - w - 14, y: vh() * 0.55 },
      { x: 14, y: vh() * 0.6 },
      { x: vw() * 0.5 - w / 2, y: vh() - h - b }
    ];
  }
  function walkTo(a) {
    var far = Math.abs(a.x - pos.x) + Math.abs(a.y - pos.y) > 40;
    if (far && !reduce) { el.char.classList.add('walk'); setTimeout(function () { el.char.classList.remove('walk'); }, 1800); }
    place(a.x, a.y, true);
  }
  function wander() {
    clearTimeout(wanderT);
    var delay = 14000 + Math.random() * 14000;
    wanderT = setTimeout(function () {
      if (!bubbleOpen && !st.off && Date.now() > quietUntil && !reduce && !document.hidden) {
        var a = anchors(); walkTo(a[Math.floor(Math.random() * a.length)]);
      }
      wander();
    }, delay);
  }

  // ---- Sprechblase ----
  function layoutBubble() {
    var b = el.bubble, w = b.offsetWidth, h = b.offsetHeight;
    var cx = pos.x + csz() / 2;
    var x = Math.max(10, Math.min(vw() - w - 10, cx - w / 2));
    var above = pos.y - h - 14 > 8;
    var y = above ? pos.y - h - 14 : pos.y + el.char.offsetHeight + 14;
    b.style.left = x + 'px'; b.style.top = Math.max(8, Math.min(vh() - h - 8, y)) + 'px';
    b.classList.toggle('below', !above);
    var tx = Math.max(24, Math.min(w - 24, cx - x));
    b.style.setProperty('--tx', tx + 'px');
    b.style.setProperty('--ox', tx + 'px');
  }
  function openBubble(html) {
    el.bubble.innerHTML = html;
    el.bubble.classList.add('on');
    bubbleOpen = true; quietUntil = Date.now() + 25000;
    layoutBubble();
    requestAnimationFrame(function () { el.bubble.classList.add('show'); layoutBubble(); });
    el.char.classList.add('talk');
  }
  function closeBubble() {
    bubbleOpen = false; curAsk = null;
    el.bubble.classList.remove('show');
    el.char.classList.remove('talk');
    setTimeout(function () { if (!bubbleOpen) el.bubble.classList.remove('on'); }, 200);
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  function showAsk(o) {
    curAsk = o;
    var html = '<button class="kb-x" aria-label="Schließen" data-k="close">×</button>' +
      '<p class="kb-text">' + esc(o.text) + '<br><br><b>Brauchst du Hilfe?</b></p>' +
      '<button class="kb-opt" data-k="tip"><span class="kb-dot"></span>Tipp anzeigen</button>' +
      '<button class="kb-opt" data-k="no"><span class="kb-dot"></span>Ohne Hilfe weitermachen</button>' +
      (o.id ? '<label class="kb-mute"><input type="checkbox" id="kb-mute"> Diesen Tipp nicht mehr anzeigen</label>' : '') +
      '<button class="kb-off" data-k="off">Kolbi ausblenden</button>';
    openBubble(html);
  }
  function showTip(o) {
    var html = '<button class="kb-x" aria-label="Schließen" data-k="close">×</button>' +
      '<p class="kb-text" style="margin-bottom:8px">' + esc(o.tip) + '</p><button class="kb-ok" data-k="no">Alles klar</button>';
    openBubble(html);
  }
  function onBubbleClick(e) {
    var t = e.target.closest ? e.target.closest('[data-k]') : null;
    if (!t) return;
    var k = t.getAttribute('data-k'), o = curAsk;
    var m = document.getElementById('kb-mute');
    if (m && m.checked && o && o.id) { st.mute[o.id] = 1; save(); }
    if (k === 'tip' && o) showTip(o);
    else if (k === 'off') { API.hide(); }
    else if (k === 'close') { closeBubble(); }
    else closeBubble();
  }

  var API = {
    init: function (c) {
      for (var k in c) cfg[k] = c[k];
      load();
      if (document.getElementById('kolbi-root')) return;
      var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
      var root = document.createElement('div'); root.id = 'kolbi-root';
      root.innerHTML = '<div id="kolbi-char" role="button" tabindex="0" aria-label="Kolbi – Hilfe"><div id="kolbi-shadow"></div><div id="kolbi-body">' + svg(cfg.color) + '</div></div>' +
        '<div id="kolbi-bubble" role="dialog" aria-live="polite"></div><button id="kolbi-back" type="button" aria-label="Kolbi wieder holen" title="Kolbi wieder holen">🧪 Kolbi<span class="kb-hol"> holen</span></button>';
      document.body.appendChild(root);
      el.root = root; el.char = root.querySelector('#kolbi-char'); el.body = root.querySelector('#kolbi-body');
      el.bubble = root.querySelector('#kolbi-bubble'); el.back = root.querySelector('#kolbi-back'); el.eyes = root.querySelector('#kolbi-eyes');
      el.bubble.addEventListener('click', onBubbleClick);
      el.back.addEventListener('click', function () { st.off = false; save(); applyOff(); API.help(); });

      // Ziehen & Tippen
      var d = null;
      el.char.addEventListener('pointerdown', function (e) {
        d = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y, moved: false };
        try { el.char.setPointerCapture(e.pointerId); } catch (x) {}
      });
      el.char.addEventListener('pointermove', function (e) {
        if (!d) return;
        var dx = e.clientX - d.sx, dy = e.clientY - d.sy;
        if (!d.moved && Math.abs(dx) + Math.abs(dy) > 6) { d.moved = true; el.char.classList.add('drag'); }
        if (d.moved) { place(d.px + dx, d.py + dy, false); quietUntil = Date.now() + 30000; }
      });
      function up() {
        if (!d) return; var moved = d.moved; d = null; el.char.classList.remove('drag');
        if (!moved) { if (bubbleOpen) closeBubble(); else API.help(); }
      }
      el.char.addEventListener('pointerup', up);
      el.char.addEventListener('pointercancel', function () { d = null; el.char.classList.remove('drag'); });
      el.char.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bubbleOpen ? closeBubble() : API.help(); } });

      // Augen folgen dem Zeiger
      document.addEventListener('pointermove', function (e) {
        if (!el.eyes || st.off) return;
        var r = el.char.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.6;
        var dx = e.clientX - cx, dy = e.clientY - cy, L = Math.sqrt(dx * dx + dy * dy) || 1, m = Math.min(1, L / 160) * 2.6;
        el.eyes.setAttribute('transform', 'translate(' + (dx / L * m).toFixed(2) + ' ' + (dy / L * m).toFixed(2) + ')');
      }, { passive: true });

      window.addEventListener('resize', function () { place(pos.x, pos.y, false); });
      window.addEventListener('orientationchange', function () { setTimeout(function () { place(pos.x, pos.y, false); }, 200); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bubbleOpen) closeBubble(); });

      var a = anchors()[0]; pos = { x: a.x, y: vh() + 120 }; place(a.x, vh() + 120, false);
      setTimeout(function () { place(a.x, a.y, true); }, 400);
      applyOff();
      wander();
    },
    ask: function (o) {
      if (!el.char || st.off) return;
      if (o.id && (st.mute[o.id] || (shownIds[o.id] && !o.repeat))) return;
      if (bubbleOpen) return;
      if (o.id) shownIds[o.id] = 1;
      var a = anchors()[0]; if (pos.x < vw() / 2) a = anchors()[1];
      showAsk(o);
    },
    help: function () {
      var o = cfg.tapHelp ? cfg.tapHelp() : null;
      if (!o) o = { text: 'Hallo, ich bin Kolbi!', tip: 'Tippe auf mich, wenn du Hilfe brauchst. Du kannst mich auch verschieben.' };
      showAsk({ id: '', text: o.text, tip: o.tip });
    },
    say: function (text) { if (!el.char || st.off) return; curAsk = null; openBubble('<button class="kb-x" aria-label="Schließen" data-k="close">×</button><p class="kb-text" style="margin-bottom:2px">' + esc(text) + '</p>'); },
    hide: function () { st.off = true; save(); closeBubble(); applyOff(); },
    show: function () { st.off = false; save(); applyOff(); }
  };
  function applyOff() {
    if (!el.char) return;
    el.char.style.display = st.off ? 'none' : '';
    el.back.style.display = st.off ? 'block' : 'none';
    el.back.style.bottom = 'calc(10px + env(safe-area-inset-bottom,0px))';
    el.back.style.left = '128px';
  }
  window.Kolbi = API;
})();
