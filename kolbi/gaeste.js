/*
  Gäste für Kolbi: Tinto (Tintenfass) und Rolli (Schriftrolle) aus „Gesellschaft und Geschichte“.
  Die Figuren sind hier lokal eingebunden (nichts wird von außen geladen) und haben eine kleine eigene Bühnen-Steuerung:
  Gaeste.actor('T'|'R') liefert eine Figur mit  place(x,y)  walkTo(x,y,ms)  mood(m,ms)  say(text,ms)  setInk(0..1)  leave().
  Alle Methoden mit Wartezeit geben ein Promise zurück. Die Grafik stammt aus maskottchen/duo.js (Gesellschaft und Geschichte).
*/
(function () {
  'use strict';
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  var INK = '#2c2457', PINK = '#ff6b81';
  function dot(cx, cy, r, hl) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + INK + '"/><circle cx="' + (cx + 1.5) + '" cy="' + (cy - 1.6) + '" r="' + (hl || 1.6) + '" fill="#fff"/>'; }
  function eyesOpen(r) { return '<g class="dc-lid">' + dot(41, 74, r || 4.6) + dot(61, 74, r || 4.6) + '</g>'; }
  // Koordinaten um den Gesichtsmittelpunkt (51,80); Arme kommen getrennt je nach Figur
  var MOODS = {
    happy: { pose: 'down', eyes: eyesOpen(), mouth: '<path d="M43 83 q8 9 16 0"/>' },
    calm: { pose: 'down', eyes: eyesOpen(), mouth: '<path d="M45 85 q6 2 12 0"/>' },
    sad: { pose: 'down', eyes: '<g class="dc-lid">' + dot(41, 76, 4.4) + dot(61, 76, 4.4) + '</g>', brows: '<path d="M34 67 q6 2 13 -3"/><path d="M55 64 q7 4 13 3"/>', mouth: '<path d="M44 89 q7 -6 14 0"/>' },
    excited: {
      pose: 'up', eyes: '<path d="M35 76 q6 -10 12 0"/><path d="M55 76 q6 -10 12 0"/>', mouth: '<path d="M42 81 q9 16 18 0 z" fill="' + PINK + '"/>',
      extra: '<g fill="#ffd35a" stroke="none"><polygon points="8,40 10,45 15,45 11,48 13,53 8,50 3,53 5,48 1,45 6,45"/><polygon points="94,34 96,39 101,39 97,42 99,47 94,44 89,47 91,42 87,39 92,39"/></g>'
    },
    interested: { pose: 'curious', eyes: '<g class="dc-lid">' + dot(41, 74, 5.8, 1.9) + dot(61, 74, 5.8, 1.9) + '</g>', brows: '<path d="M34 64 q6 -5 13 -1"/><path d="M55 63 q7 -4 13 1"/>', mouth: '<ellipse cx="51" cy="86" rx="2.6" ry="3" fill="#3b1d4a"/>' },
    thinking: {
      pose: 'think', eyes: '<g class="dc-lid"><circle cx="40" cy="72" r="4.6" fill="' + INK + '"/><circle cx="60" cy="72" r="4.6" fill="' + INK + '"/><circle cx="41.5" cy="70.4" r="1.6" fill="#fff"/><circle cx="61.5" cy="70.4" r="1.6" fill="#fff"/></g>',
      mouth: '<path d="M45 85 q6 -3 12 0"/>', extra: '<text x="82" y="24" font-size="26" font-weight="800" fill="#ffd35a" stroke="none">?</text>'
    },
    bored: {
      pose: 'down', eyes: '<path d="M36.4 75 a4.6 4.6 0 0 0 9.2 0 z" fill="' + INK + '" stroke="none"/><path d="M56.4 75 a4.6 4.6 0 0 0 9.2 0 z" fill="' + INK + '" stroke="none"/><path d="M35 75 h12"/><path d="M55 75 h12"/>',
      mouth: '<path d="M44 86 q3 -2 7 0 t7 0"/>'
    },
    yawn: { pose: 'yawn', eyes: '<path d="M36 75 q5 4 10 0"/><path d="M56 75 q5 4 10 0"/>', mouth: '<ellipse cx="51" cy="86" rx="5.5" ry="7.5" fill="#3b1d4a"/>' },
    sleep: {
      pose: 'down', eyes: '<path d="M36 75 q5 4 10 0"/><path d="M56 75 q5 4 10 0"/>', mouth: '<path d="M46 86 q5 3 10 0"/>',
      extra: '<g class="dc-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="80" y="38" font-size="15">Z</text><text x="90" y="24" font-size="11">z</text></g>'
    },
    wink: { pose: 'wave', eyes: '<g class="dc-lid">' + dot(41, 74, 4.6) + '</g><path d="M56 76 q5 -6 10 0"/>', mouth: '<path d="M42 83 q9 11 18 0"/>' },
    giggle: { pose: 'hug', eyes: '<path d="M35 76 q6 -10 12 0"/><path d="M55 76 q6 -10 12 0"/>', mouth: '<path d="M42 81 q9 16 18 0 z" fill="' + PINK + '"/>' },
    dizzy: {
      pose: 'out', eyes: '<path d="M37 70 l8 8 M45 70 l-8 8"/><path d="M57 70 l8 8 M65 70 l-8 8"/>', mouth: '<path d="M43 87 q4 -5 8 0 q4 5 8 0"/>',
      extra: '<g class="dc-zzz" fill="#ffd35a" stroke="none"><circle cx="30" cy="40" r="2.6"/><circle cx="72" cy="36" r="2.6"/><circle cx="51" cy="28" r="2.6"/></g>'
    },
    surprised: { pose: 'up2', eyes: '<g class="dc-lid">' + dot(41, 74, 6.2, 2.1) + dot(61, 74, 6.2, 2.1) + '</g>', brows: '<path d="M34 63 q6 -6 13 -2"/><path d="M55 61 q7 -4 13 2"/>', mouth: '<ellipse cx="51" cy="87" rx="3.4" ry="4.2" fill="#3b1d4a"/>' },
    love: {
      pose: 'down', eyes: '<path d="M41 80 c-8 -5 -8 -12 -2.5 -12 c2.3 0 2.5 2 2.5 3 c0 -1 .2 -3 2.5 -3 c5.5 0 5.5 7 -2.5 12z" fill="#ff4d6d" stroke="none"/><path d="M61 80 c-8 -5 -8 -12 -2.5 -12 c2.3 0 2.5 2 2.5 3 c0 -1 .2 -3 2.5 -3 c5.5 0 5.5 7 -2.5 12z" fill="#ff4d6d" stroke="none"/>',
      mouth: '<path d="M43 84 q8 9 16 0"/>', extra: '<g class="dc-zzz" fill="#ff8fa8" stroke="none" font-weight="800"><text x="82" y="34" font-size="14">♥</text><text x="6" y="44" font-size="10">♥</text></g>'
    },
    hum: { pose: 'down', eyes: eyesOpen(), mouth: '<path d="M44 84 q7 7 14 0"/>', extra: '<g class="dc-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="84" y="40" font-size="16">♪</text><text x="2" y="46" font-size="13">♫</text></g>' },
    oops: {
      pose: 'out', eyes: '<g class="dc-lid"><circle cx="41" cy="75" r="4" fill="' + INK + '"/><circle cx="61" cy="75" r="4" fill="' + INK + '"/></g>', brows: '<path d="M35 66 l10 3"/><path d="M67 66 l-10 3"/>',
      mouth: '<path d="M43 88 q4 -5 8 0 q4 5 8 0"/>', extra: '<path d="M78 58 q4 7 0 10 q-4 -3 0 -10z" fill="#7fd0ff" stroke="none"/>'
    }
  };
  // Armhaltungen: [Kontrollpunkt dx,dy, Endpunkt dx,dy] relativ zum Ansatz (links, rechts)
  var POSES = {
    down: [[-10, 6, -11, 16], [10, 6, 11, 16]],
    up: [[-12, -4, -14, -22], [12, -4, 14, -22]],
    up2: [[-12, -2, -16, -14], [12, -2, 16, -14]],
    wave: [[-10, 6, -11, 16], [10, -8, 9, -22]],
    curious: [[-10, 6, -11, 16], [8, -4, 6, -16]],
    think: [[-10, 6, -11, 16], [4, -6, -12, -18]],
    yawn: [[-4, -8, 8, -18], [4, -8, -8, -18]],
    hug: [[-2, 4, 10, -2], [2, 4, -10, -2]],
    out: [[-12, 0, -16, 6], [12, 0, 16, 6]]
  };
  function armPath(c, m, i) {
    var d = MOODS[m] || MOODS.happy, p = POSES[d.pose] || POSES.down, a = c.skin.arms[i], q = p[i];
    return '<path class="dc-arm ' + (i ? 'dc-armr' : 'dc-arml') + '" d="M' + a[0] + ' ' + a[1] + ' Q' + (a[0] + q[0]) + ' ' + (a[1] + q[1]) + ' ' + (a[0] + q[2]) + ' ' + (a[1] + q[3]) + '"/>';
  }
  function faceSVG(c, m) {
    var d = MOODS[m] || MOODS.happy, F = c.skin.face, S = 'stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';
    return '<g ' + S + '>' + armPath(c, m, 0) + armPath(c, m, 1) + '</g>' +
      '<g transform="translate(' + F.cx + ' ' + F.cy + ') scale(' + F.s + ') translate(-51 -80)">' +
      '<g ' + S + '>' + (d.brows || '') + '</g><g class="dc-eyes" ' + S + '>' + d.eyes + '</g><g class="dc-mouth" ' + S + '>' + d.mouth + '</g>' +
      '<ellipse cx="33" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/><ellipse cx="69" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/>' + (d.extra || '') + '</g>';
  }
  var TINTO_BODY = 'M38 46 V52 C22 60 16 74 16 90 Q16 112 38 112 H72 Q94 112 94 90 C94 74 88 60 72 52 V46 Z';
  var SKINS = {
    T: {
      name: 'Tinto', emoji: '🖋️', color: '#3b5bdb', face: { cx: 55, cy: 86, s: 1 }, arms: [[18, 92], [92, 92]],
      svg: function () {
        return '<svg viewBox="-6 -6 122 130" role="img" aria-label="Tinto, das Tintenfass-Maskottchen"><defs><clipPath id="tt-c"><path d="' + TINTO_BODY + '"/></clipPath>' +
          '<linearGradient id="tt-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa4ff"/><stop offset="1" stop-color="#5a78e6"/></linearGradient></defs>' +
          '<path d="' + TINTO_BODY + '" fill="#fff" fill-opacity=".3"/>' +
          '<g clip-path="url(#tt-c)"><path id="tt-liq" d="M-6 66 H116 V125 H-6Z" fill="url(#tt-g)"/><path id="tt-surf" d="M-6 66 H116" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>' +
          '<circle class="dc-bub b1" cx="34" cy="106" r="3" fill="#fff"/><circle class="dc-bub b2" cx="74" cy="100" r="2.2" fill="#fff"/><circle class="dc-bub b3" cx="60" cy="108" r="1.8" fill="#fff"/></g>' +
          '<path d="' + TINTO_BODY + '" fill="none" stroke="#fff" stroke-opacity=".95" stroke-width="3" stroke-linejoin="round"/>' +
          '<rect x="33" y="40" width="44" height="9" rx="4.5" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="2.5"/>' +
          '<g id="tt-quill"><path d="M62 42 C66 26 78 12 98 2 C97 18 90 32 76 40 Z" fill="#fff8e6" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
          '<path d="M64 40 C72 28 82 16 96 5" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/><path d="M70 36 l8 -2 M74 30 l8 -2 M79 24 l7 -3" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"/></g>' +
          '<path d="M24 82 Q22 92 28 100" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".5"/><g id="tt-face"></g></svg>';
      },
      phys: function (c, ph, tn, amp) {
        var d = '', y, x;
        for (x = -6; x <= 116; x += 6) { y = 66 + tn * (x - 55) + amp * Math.sin(x * 0.11 + ph.t * 7) * 0.6; y = Math.max(50, Math.min(120, y)); d += (d ? ' L' : 'M') + x + ' ' + y.toFixed(1); }
        var s = d; d += ' L116 125 L-6 125 Z';
        if (c.liq) c.liq.setAttribute('d', d); if (c.surf) c.surf.setAttribute('d', s);
        if (c.quill) c.quill.setAttribute('transform', 'rotate(' + (ph.th * -18).toFixed(2) + ' 62 42)');
      }
    },
    R: {
      name: 'Rolli', emoji: '📜', color: '#a0661c', face: { cx: 55, cy: 58, s: 1 }, arms: [[26, 66], [84, 66]],
      svg: function () {
        return '<svg viewBox="-6 -6 122 130" role="img" aria-label="Rolli, die Schriftrolle"><defs><linearGradient id="rr-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3dca6"/><stop offset=".5" stop-color="#fff0c4"/><stop offset="1" stop-color="#f0d596"/></linearGradient></defs><g id="rr-all">' +
          '<path id="rr-sheet" d="M26 26 H84 V96 H26Z" fill="url(#rr-g)" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>' +
          '<g id="rr-top"><rect x="18" y="12" width="74" height="18" rx="9" fill="#f6e2ae" stroke="' + INK + '" stroke-width="2.6"/><ellipse cx="22" cy="21" rx="4.5" ry="7" fill="#e8c883" stroke="' + INK + '" stroke-width="2"/><rect x="8" y="14" width="10" height="14" rx="4" fill="#9a6a3c" stroke="' + INK + '" stroke-width="2"/></g>' +
          '<g id="rr-deco"><path d="M36 90 h18 M36 84 h26" stroke="#c9a85f" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
          '<g id="rr-bot"><rect x="18" y="92" width="74" height="18" rx="9" fill="#f6e2ae" stroke="' + INK + '" stroke-width="2.6"/><ellipse cx="88" cy="101" rx="4.5" ry="7" fill="#e8c883" stroke="' + INK + '" stroke-width="2"/><rect x="92" y="94" width="10" height="14" rx="4" fill="#9a6a3c" stroke="' + INK + '" stroke-width="2"/></g>' +
          '<path d="M74 84 l-4 14 l5 -3 l5 3 l-3 -14" fill="#d64550" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/><circle cx="74" cy="82" r="8" fill="#d64550" stroke="' + INK + '" stroke-width="2"/><path d="M71 82 l2 2 l4 -4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".8"/></g>' +
          '<g id="rr-face"></g></g></svg>';
      },
      // u = 1: Rolle ganz aufgerollt (Pergament offen), u = 0: zusammengerollt wie ein Röllchen. Federt mit leichtem Überschwingen.
      phys: function (c, ph, tn, amp) {
        var r = c.roll, dt = ph.dt || 0.016, a = Math.max(-7, Math.min(7, ph.th * 9));
        r.v += ((r.target - r.u) * 170 - r.v * 13) * dt; r.u += r.v * dt; r.u = Math.max(0, Math.min(1.12, r.u));
        var u = r.u, H = 66 * u, dy = H - 66, k = .72 + .28 * Math.min(1, u), cy = 28 + 30 * Math.min(1, u);
        if (c.all) c.all.setAttribute('transform', 'translate(0 ' + (Math.max(0, 1 - u) * 66).toFixed(1) + ')');   // zusammengerollt sitzt Rolli auf dem Boden
        if (c.sheet) { c.sheet.setAttribute('d', 'M26 26 H84 V' + (26 + H + 4).toFixed(1) + ' H26Z'); c.sheet.setAttribute('opacity', Math.max(0, Math.min(1, u * 8)).toFixed(2)); }
        if (c.deco) { c.deco.setAttribute('transform', 'translate(0 ' + dy.toFixed(1) + ')'); c.deco.setAttribute('opacity', Math.max(0, Math.min(1, (u - .45) * 3)).toFixed(2)); }
        if (c.bot) c.bot.setAttribute('transform', 'translate(0 ' + dy.toFixed(1) + ') rotate(' + a.toFixed(2) + ' 55 101)');
        if (c.top) c.top.setAttribute('transform', 'rotate(' + (-a * .6).toFixed(2) + ' 55 21)');
        c.faceG.setAttribute('transform', 'translate(55 ' + cy.toFixed(1) + ') scale(' + k.toFixed(3) + ') translate(-55 -58)');
      }
    }
  };
  var CSS = '' +
  '.dc{position:fixed;left:0;top:0;width:var(--dw,110px);height:var(--dh,118px);pointer-events:auto;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;perspective:420px;transition:left 1.8s cubic-bezier(.45,0,.25,1),top 1.8s cubic-bezier(.45,0,.25,1),opacity .3s}' +
  '.dc-r{transition-duration:2.1s;transition-delay:.12s}' +
  '.dc-shadow{position:absolute;left:50%;bottom:-2px;width:calc(var(--dw,110px) * .8);height:11px;margin-left:calc(var(--dw,110px) * -.4);border-radius:50%;background:rgba(0,0,0,.3);filter:blur(3px);transition:transform .3s,opacity .3s}' +
  '.dc-body{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d;transform:rotateY(var(--ry,0deg)) rotateZ(var(--rz,0deg));transform-origin:50% 90%;animation:dc-bob 3.2s ease-in-out infinite;filter:drop-shadow(0 6px 5px rgba(0,0,0,.3))}' +
  '.dc-r .dc-body{animation-delay:-1.4s}' +
  '.dc.walk .dc-body{animation:dc-hop .42s ease-in-out infinite}.dc.walk .dc-shadow{transform:scale(.8);opacity:.7}' +
  '.dc.hop .dc-body{animation:dc-hop .42s ease-in-out 2}' +
  '.dc[data-mood=excited] .dc-body{animation:dc-hop .34s ease-in-out infinite}' +
  '.dc[data-mood=giggle] .dc-body{animation:dc-shake .22s linear infinite}.dc[data-mood=dizzy] .dc-body{animation:dc-wobble .7s ease-in-out infinite}' +
  '.dc[data-mood=bored] .dc-body{animation-duration:5.5s}.dc[data-mood=sleep] .dc-body{animation-duration:6.5s}' +
  '.dc-body svg{-webkit-user-drag:none;pointer-events:none;width:100%;height:100%;overflow:visible;display:block}' +
  '.dc-body .dc-lid{transform-box:fill-box;transform-origin:center;animation:dc-blink 5s infinite}.dc-r .dc-lid{animation-delay:-2s}' +
  '.dc-body .dc-arm{transform-box:fill-box;transform-origin:50% 0}' +
  '.dc.talk .dc-armr{animation:dc-wave .7s ease-in-out infinite}' +
  '.dc.talk .dc-mouth{transform-box:fill-box;transform-origin:center;animation:dc-talk .32s ease-in-out infinite}' +
  '.dc-eyes{transition:transform .22s ease-out}' +
  '.dc-body .dc-bub{animation:dc-rise 3.4s linear infinite;opacity:0}.dc-body .dc-bub.b2{animation-delay:1.1s;animation-duration:4s}.dc-body .dc-bub.b3{animation-delay:2.2s;animation-duration:3.1s}' +
  '.dc-body .dc-zzz{animation:dc-zzz 3s ease-in-out infinite}' +
  '@keyframes dc-bob{0%,100%{translate:0 0}50%{translate:0 -4px}}' +
  '@keyframes dc-hop{0%,100%{translate:0 0;scale:1 1}35%{translate:0 -11px;scale:.96 1.05}70%{translate:0 0;scale:1.05 .94}}' +
  '@keyframes dc-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}' +
  '@keyframes dc-shake{0%,100%{translate:-2px 0;rotate:-2deg}50%{translate:2px -2px;rotate:2deg}}' +
  '@keyframes dc-wobble{0%,100%{rotate:-7deg}50%{rotate:7deg}}' +
  '@keyframes dc-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-24deg)}}' +
  '@keyframes dc-talk{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.55)}}' +
  '@keyframes dc-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.7}85%{opacity:.5}100%{transform:translateY(-26px);opacity:0}}' +
  '@keyframes dc-zzz{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-6px);opacity:1}}' +
  '@media (max-width:700px){.dc{width:var(--dwm,84px);height:var(--dhm,90px)}.dc-shadow{width:calc(var(--dwm,84px) * .8);margin-left:calc(var(--dwm,84px) * -.4)}}';

  var ROLL_BY_MOOD = { sleep: 0, dizzy: .3, oops: .55 };
  function setFace(c, m) {
    if (c.roll) c.roll.target = ROLL_BY_MOOD[m] != null ? ROLL_BY_MOOD[m] : 1;
    c.mood = m; c.node.setAttribute('data-mood', m);
    c.faceG.innerHTML = faceSVG(c, m);
  }
  var root = null, bub = null, actors = {}, raf = 0;
  function dims() { return innerWidth <= 700 ? { w: 84, h: 90 } : { w: 110, h: 118 }; }
  function ensureRoot() {
    if (root) return;
    var st = document.createElement('style');
    st.textContent = CSS +
      '#gx-root{position:fixed;left:0;top:0;width:0;height:0;z-index:8990;pointer-events:none;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}' +
      '#gx-root .dc{pointer-events:none;cursor:default}' +
      '#gx-bubble{position:fixed;left:0;top:0;width:min(290px,calc(100vw - 20px));box-sizing:border-box;pointer-events:none;background:#fffbe3;color:#1f2937;border:1.5px solid #3b3b2a;border-radius:12px;padding:10px 13px;box-shadow:0 10px 26px rgba(0,0,0,.35);font-size:14.5px;line-height:1.42;display:none;opacity:0;transform:scale(.94);transform-origin:var(--ox,50%) 100%;transition:opacity .18s,transform .18s;z-index:8995}' +
      '#gx-bubble.on{display:block}#gx-bubble.show{opacity:1;transform:scale(1)}' +
      '#gx-bubble::after{content:"";position:absolute;left:var(--tx,40px);width:14px;height:14px;background:#fffbe3;border:1.5px solid #3b3b2a;border-top:0;border-left:0;transform:rotate(45deg);margin-left:-7px;bottom:-8px}' +
      '#gx-bubble.below::after{bottom:auto;top:-8px;border:1.5px solid #3b3b2a;border-bottom:0;border-right:0}' +
      '#gx-bubble .who{font-weight:800;font-size:12.5px;margin:0 0 2px}';
    document.head.appendChild(st);
    root = document.createElement('div'); root.id = 'gx-root'; root.setAttribute('data-html2canvas-ignore', 'true');
    bub = document.createElement('div'); bub.id = 'gx-bubble'; bub.setAttribute('aria-live', 'polite');
    document.body.appendChild(root); document.body.appendChild(bub);
    var d = dims(); root.style.setProperty('--dw', d.w + 'px'); root.style.setProperty('--dh', d.h + 'px');
    root.style.setProperty('--dwm', d.w + 'px'); root.style.setProperty('--dhm', d.h + 'px');
    window.addEventListener('resize', function () { var d2 = dims(); root.style.setProperty('--dw', d2.w + 'px'); root.style.setProperty('--dh', d2.h + 'px'); root.style.setProperty('--dwm', d2.w + 'px'); root.style.setProperty('--dhm', d2.h + 'px'); });
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  var ph0 = function () { return { px: null, vx: 0, th: 0, w: 0, t: 0, dt: 0.016 }; };
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    var any = false;
    for (var k in actors) {
      var a = actors[k]; if (!a || !a.c) continue; any = true;
      var c = a.c, ph = c.ph, dt = Math.min(0.05, (ts - (ph.last || ts)) / 1000 || 0.016); ph.last = ts; if (dt <= 0) continue; ph.dt = dt;
      var r = a.node.getBoundingClientRect(), cx = r.left + r.width / 2;
      if (ph.px === null) { ph.px = cx; ph.vx = 0; }
      var vx = (cx - ph.px) / dt, ax = (vx - ph.vx) / dt; ph.px = cx; ph.vx = vx;
      ax = Math.max(-3500, Math.min(3500, ax));
      var wn = 10, zeta = 0.1, acc = -wn * wn * ph.th - 2 * zeta * wn * ph.w - ax * 0.0012;
      ph.w += acc * dt; ph.th += ph.w * dt; ph.th = Math.max(-0.7, Math.min(0.7, ph.th)); ph.t += dt;
      var lean = Math.max(-12, Math.min(12, vx * 0.014));
      a.body.style.setProperty('--rz', lean.toFixed(2) + 'deg');
      var amp = 0.7 + Math.min(4.5, Math.abs(ph.w) * 1.1);
      c.skin.phys(c, ph, Math.tan(Math.max(-0.75, Math.min(0.75, ph.th))), amp);
    }
    if (!any) { cancelAnimationFrame(raf); raf = 0; }
  }
  function Actor(w) {
    ensureRoot();
    var skin = SKINS[w], node = document.createElement('div');
    node.className = 'dc' + (w === 'R' ? ' dc-r' : ''); node.setAttribute('data-mood', 'happy'); node.style.opacity = '0';
    node.innerHTML = '<div class="dc-shadow"></div><div class="dc-body">' + skin.svg() + '</div>';
    root.appendChild(node);
    var c = { skin: skin, node: node, mood: 'happy', ph: ph0() };
    if (w === 'T') { c.faceG = node.querySelector('#tt-face'); c.liq = node.querySelector('#tt-liq'); c.surf = node.querySelector('#tt-surf'); c.quill = node.querySelector('#tt-quill'); c.stops = node.querySelectorAll('#tt-g stop'); }
    else { c.faceG = node.querySelector('#rr-face'); c.all = node.querySelector('#rr-all'); c.sheet = node.querySelector('#rr-sheet'); c.deco = node.querySelector('#rr-deco'); c.bot = node.querySelector('#rr-bot'); c.top = node.querySelector('#rr-top'); c.roll = { u: 1, v: 0, target: 1 }; }
    setFace(c, 'happy');
    this.w = w; this.c = c; this.node = node; this.body = node.querySelector('.dc-body'); this.moodT = null; this.ink = 1; this.sp = null;
    actors[w] = this; if (!raf) raf = requestAnimationFrame(loop);
  }
  Actor.prototype.size = function () { var d = dims(); return d; };
  Actor.prototype.place = function (x, y) { var n = this.node; n.style.transition = 'none'; n.style.left = x + 'px'; n.style.top = y + 'px'; n.style.opacity = '1'; void n.offsetWidth; this.x = x; this.y = y; return this; };
  Actor.prototype.walkTo = function (x, y, ms) {
    var n = this.node, me = this; ms = ms || 1800; n.style.opacity = '1';
    n.style.transition = 'left ' + ms + 'ms linear, top ' + ms + 'ms linear'; void n.offsetWidth;
    n.classList.add('walk'); n.style.left = x + 'px'; n.style.top = y + 'px'; this.x = x; this.y = y;
    return sleep(ms).then(function () { n.classList.remove('walk'); });
  };
  Actor.prototype.mood = function (m, ms) {
    var me = this; clearTimeout(this.moodT); setFace(this.c, m);
    if (ms) this.moodT = setTimeout(function () { setFace(me.c, 'happy'); }, ms);
  };
  Actor.prototype.hop = function () { var n = this.node; n.classList.add('hop'); setTimeout(function () { n.classList.remove('hop'); }, 900); };
  // Sprechblase über der Figur; wartet, bis der Text gelesen werden konnte
  Actor.prototype.say = function (text, ms, m) {
    var me = this, n = this.node; if (m) this.mood(m);
    var who = this.w === 'T' ? '<p class="who" style="color:#3b5bdb">Tinto 🖋️</p>' : '<p class="who" style="color:#a0661c">Rolli 📜</p>';
    bub.innerHTML = who + '<div>' + text + '</div>'; bub.classList.add('on');
    var r = n.getBoundingClientRect(), w = bub.offsetWidth, h = bub.offsetHeight, cx = r.left + r.width / 2;
    var x = Math.max(10, Math.min(innerWidth - w - 10, cx - w / 2)), above = r.top - h - 14 > 8, y = above ? r.top - h - 14 : r.bottom + 14;
    bub.style.left = x + 'px'; bub.style.top = Math.max(8, Math.min(innerHeight - h - 8, y)) + 'px'; bub.classList.toggle('below', !above);
    var tx = Math.max(24, Math.min(w - 24, cx - x)); bub.style.setProperty('--tx', tx + 'px'); bub.style.setProperty('--ox', tx + 'px');
    requestAnimationFrame(function () { bub.classList.add('show'); });
    n.classList.add('talk'); var len = (bub.textContent || '').length, wait = ms || Math.max(2200, 1300 + len * 52);
    return sleep(wait).then(function () { n.classList.remove('talk'); });
  };
  Actor.prototype.hush = function () { bub.classList.remove('show'); setTimeout(function () { if (!bub.classList.contains('show')) bub.classList.remove('on'); }, 200); };
  // Tintenfarbe: 1 = kräftig blau, 0 = farblos (die Tinte verliert ihren Farbstoff)
  Actor.prototype.setInk = function (t) {
    this.ink = t; var s = this.c.stops; if (!s || !s.length) return;
    function mix(a, b, k) { return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(a[i] + (b[i] - a[i]) * k); }).join(',') + ')'; }
    s[0].setAttribute('stop-color', mix([232, 238, 247], [138, 164, 255], t)); s[1].setAttribute('stop-color', mix([214, 224, 240], [90, 120, 230], t));
    if (this.c.liq) this.c.liq.style.opacity = (0.45 + 0.55 * t).toFixed(2);
  };
  Actor.prototype.fadeInk = function (to, ms) {
    var me = this, from = this.ink, t0 = performance.now(); ms = ms || 2500;
    return new Promise(function (res) { (function step(now) { var k = Math.min(1, (now - t0) / ms); me.setInk(from + (to - from) * (k * k * (3 - 2 * k))); if (k < 1) requestAnimationFrame(step); else res(); })(t0); });
  };
  Actor.prototype.remove = function () { clearTimeout(this.moodT); if (this.node.parentNode) this.node.parentNode.removeChild(this.node); delete actors[this.w]; };
  window.Gaeste = {
    actor: function (w) { if (actors[w]) actors[w].remove(); return new Actor(w); },
    hush: function () { if (bub) { bub.classList.remove('show'); bub.classList.remove('on'); } },
    clear: function () { for (var k in actors) actors[k].remove(); if (bub) { bub.classList.remove('show'); bub.classList.remove('on'); } },
    size: dims, sleep: sleep
  };
})();
