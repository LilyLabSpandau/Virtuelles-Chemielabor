/* Reagenzglas-Simulation für FEHLING- und TOLLENS-Probe. Kolbi ist die Probe: Er zeigt immer Farbe und Glanz des Reagenzglases. */
(function () {
  'use strict';
  var SUBS = [
    { id: 'ethanal',  name: 'Ethanal',          f: 'CH₃–CHO',            pos: true,  t: 8 },
    { id: 'propanon', name: 'Propanon',         f: 'CH₃–CO–CH₃',         pos: false, t: 9 },
    { id: 'glucose',  name: 'Glucose-Lösung',   f: 'HOCH₂–(CHOH)₄–CHO',  pos: true,  t: 12 },
    { id: 'ethanol',  name: 'Ethanol',          f: 'CH₃–CH₂–OH',         pos: false, t: 9 },
    { id: 'propanal', name: 'Propanal',         f: 'CH₃–CH₂–CHO',        pos: true,  t: 9 }
  ];
  window.LabSubs = SUBS;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function stops(S, p) {
    p = Math.max(0, Math.min(1, p));
    for (var i = 1; i < S.length; i++) if (p <= S[i][0]) { var a = S[i - 1], b = S[i], t = (p - a[0]) / (b[0] - a[0]); return [lerp(a[1][0], b[1][0], t), lerp(a[1][1], b[1][1], t), lerp(a[1][2], b[1][2], t)]; }
    return S[S.length - 1][1];
  }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  var FE = [[0, [28, 66, 178]], [.3, [30, 138, 122]], [.55, [172, 170, 40]], [.8, [214, 112, 30]], [1, [158, 50, 28]]];
  var rnd = (function () { var s = 7; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })();
  var DOTS = []; for (var i = 0; i < 70; i++) DOTS.push([rnd(), rnd(), rnd()]);

  var TUBE = 'M104 40 V236 a26 26 0 0 0 52 0 V40';
  var instances = [], lastInst = null;

  function create(cfg) {
    var K = cfg.kind, FEH = K === 'fehling', root = $(cfg.root);
    var P = cfg.prefix;
    var S = { sub: null, step: 0, drops: 0, q: 0, heat: false, done: false, vol: 0, msg: '' };
    var proto = {};   // id -> Beobachtung
    var said = {}, sinceR = 20;

    var steps = FEH
      ? [{ t: '1 · Fehling-Lösung I zugeben', s: 'blaue Kupfer(II)-sulfat-Lösung' }, { t: '2 · Fehling-Lösung II zugeben', s: 'alkalische Tartrat-Lösung' }, { t: '3 · Probe zugeben', s: 'etwa 1 mL des gewählten Stoffes' }, { t: '4 · Ins Wasserbad (70 °C)', s: 'erwärmen und beobachten' }]
      : [{ t: '1 · Silbernitrat-Lösung zugeben', s: 'farblos, etwa 2 mL' }, { t: '2 · Natronlauge zugeben', s: 'einige Tropfen' }, { t: '3 · Ammoniak-Lösung zutropfen', s: 'tropfenweise bis zur Veränderung' }, { t: '4 · Probe zugeben', s: 'etwa 1 mL des gewählten Stoffes' }, { t: '5 · Ins Wasserbad (60 °C)', s: 'erwärmen und beobachten' }];
    var HEATSTEP = steps.length;

    root.innerHTML =
      '<div class="grid"><div class="card"><h4>Der Versuch</h4>' +
      '<p class="small" style="margin:0 0 4px"><b>Probe wählen:</b></p><div class="sel" id="' + P + 'subs"></div>' +
      '<div class="labtube"><svg id="' + P + 'svg" viewBox="0 0 260 330" role="img" aria-label="Reagenzglas im Wasserbad"></svg>' +
      '<div class="stepcol" id="' + P + 'steps"></div></div>' +
      '<div class="chips"><div class="chip"><b>Probe</b><span id="' + P + 'cs" style="font-size:15px">noch keine</span></div><div class="chip"><b>Farbe im Glas</b><span id="' + P + 'cf" style="font-size:15px">leer</span></div><div class="chip"><b>Wasserbad</b><span id="' + P + 'ct" style="font-size:15px">22 °C</span></div></div>' +
      '<div class="row"><button class="btn sec" id="' + P + 'new">' + (FEH ? '↺ Neues Reagenzglas' : '↺ Entsorgen (Silberabfall) und neues Reagenzglas') + '</button></div>' +
      '<p class="small" style="margin:8px 0 0">Kolbi (unten auf der Seite) ist die Probe: Er zeigt immer Farbe und Glanz des Reagenzglases.</p></div>' +
      '<div class="card"><h4>Protokoll</h4><p class="stars" id="' + P + 'stars">★ 0 von ' + SUBS.length + ' Stoffen geprüft</p>' +
      '<div class="logwrap"><table><thead><tr><th>Stoff</th><th>Beobachtung nach dem Erwärmen</th></tr></thead><tbody id="' + P + 'log"></tbody></table></div>' +
      (FEH ? '' : '<div class="merke" style="margin:10px 0 0"><b class="t">Sicherheit:</b> Tollens-Reagenz wird nie aufbewahrt. Beim Stehen können explosive Silberverbindungen entstehen. Nach dem Versuch kommt alles sofort in den Silberabfall.</div>') +
      '</div></div>';

    var svg = $(P + 'svg');
    // Stoffauswahl
    var selBox = $(P + 'subs');
    SUBS.forEach(function (s) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-id', s.id);
      b.innerHTML = s.name + '<small style="display:block;font-weight:500;color:#64748b">' + s.f + '</small>';
      b.addEventListener('click', function () { if (S.step >= (FEH ? 3 : 4)) return; S.sub = s.id; S.msg = ''; render(true); });
      selBox.appendChild(b);
    });
    // Schritte
    var stBox = $(P + 'steps');
    steps.forEach(function (s, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'btn stb'; b.setAttribute('data-i', i);
      b.innerHTML = s.t + '<small>' + s.s + '</small>';
      b.addEventListener('click', function () { act(i); });
      stBox.appendChild(b);
    });

    function sub() { for (var i = 0; i < SUBS.length; i++) if (SUBS[i].id === S.sub) return SUBS[i]; return null; }
    var NH3N = 4, PROBE = FEH ? 2 : 3;
    function act(i) {
      if (S.heat) return;
      if (FEH) {
        if (i === 0 && S.step === 0) { S.step = 1; S.vol = 1; }
        else if (i === 1 && S.step === 1) { S.step = 2; S.vol = 2; }
        else if (i === 2 && S.step === 2) { if (!S.sub) { S.msg = 'Wähle zuerst eine Probe.'; render(); return; } S.step = 3; S.vol = 3; }
        else if (i === 3 && S.step === 3) { S.heat = true; S.q = 0; }
        else return;
      } else {
        if (i === 0 && S.step === 0) { S.step = 1; S.vol = 1; }
        else if (i === 1 && S.step === 1) { S.step = 2; S.vol = 2; }
        else if (i === 2 && S.step >= 2 && S.step < 3) { S.drops++; if (S.drops >= NH3N) { S.step = 3; S.vol = 3; } }
        else if (i === 3 && S.step === 3) { if (!S.sub) { S.msg = 'Wähle zuerst eine Probe.'; render(); return; } S.step = 4; S.vol = 4; }
        else if (i === 4 && S.step === 4) { S.heat = true; S.q = 0; }
        else return;
      }
      S.msg = '';
      render(true);
    }
    function reset() { S.sub = null; S.step = 0; S.drops = 0; S.q = 0; S.heat = false; S.done = false; S.vol = 0; S.msg = ''; said = {}; render(true); }
    $(P + 'new').addEventListener('click', reset);

    // ---------------------------------------------------------- Farben
    function liquid() {
      var u = sub(), p = (S.heat || S.done) && u && u.pos ? S.q : 0;
      if (S.step === 0) return null;
      if (FEH) {
        if (S.step === 1) return { c: [110, 170, 235], a: .55, w: 'hellblau' };
        var c = stops(FE, p), a = .88;
        var w = p < .12 ? 'tiefblau' : p < .35 ? 'blaugrün' : p < .5 ? 'grün' : p < .66 ? 'gelbgrün bis gelb' : p < .88 ? 'orange' : 'ziegelrot, trüb';
        return { c: c, a: a, w: w, p: p };
      }
      if (S.step === 1) return { c: [225, 235, 245], a: .35, w: 'farblos' };
      if (S.step === 2) return { c: [112, 76, 46], a: .88, w: 'braune Trübung' };
      if (S.step === 2 && S.drops) return null;
      var br = Math.max(0, 1 - S.drops / NH3N);
      if (S.step === 2) { return { c: [112, 76, 46], a: .88 * br + .3 * (1 - br), w: br > .3 ? 'braune Trübung' : 'fast klar' }; }
      var m = sm((p - .1) / .9);
      var gq = Math.min(1, p * 1.4), grey = [lerp(225, 196, gq), lerp(235, 204, gq), lerp(245, 214, gq)];
      return { c: grey, a: .35 - .12 * Math.min(1, p * 1.5), w: p < .15 ? 'farblos klar' : p < .5 ? 'grau schimmernd' : 'silbrig glänzender Belag an der Wand', p: p, m: m };
    }
    function liqForStep2() {
      if (!FEH && S.step === 2) { var br = Math.max(0, 1 - S.drops / NH3N); return { c: [112, 76, 46], a: .3 + .58 * br, w: br > .5 ? 'braune Trübung' : br > 0 ? 'fast klar' : 'farblos klar' }; }
      return null;
    }

    // ---------------------------------------------------------- Zeichnen
    var lastKey = '';
    function draw() {
      var L = liqForStep2() || liquid(), p = L && L.p || 0, m = L && L.m || 0;
      var levels = [0, 70, 100, 125, 140]; var h = levels[Math.min(S.vol, 4)] + (S.step >= 1 ? 0 : 0);
      var yTop = 262 - h;
      var key = [S.step, S.drops, S.q.toFixed(3), S.sub, S.heat, S.done].join('|'); if (key === lastKey) return; lastKey = key;
      var warm = S.heat || (S.done);
      var g = '<defs><clipPath id="' + P + 'clip"><path d="' + TUBE + ' V40 Z"/></clipPath></defs>';
      // Wasserbad
      g += '<rect x="30" y="170" width="200" height="140" rx="12" fill="#cfe4f5" fill-opacity=".7" stroke="#94a3b8" stroke-width="3"/>';
      g += '<path d="M36 186 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>';
      if (warm) g += '<path d="M52 300 q-6 -12 0 -22 M208 300 q6 -12 0 -22" fill="none" stroke="#ea580c" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>';
      // Reagenzglas
      g += '<path d="' + TUBE + '" fill="#fff" fill-opacity=".92"/>';
      g += '<g clip-path="url(#' + P + 'clip)">';
      if (L) {
        g += '<rect x="100" y="' + yTop + '" width="60" height="' + (300 - yTop) + '" fill="rgb(' + L.c.map(Math.round).join(',') + ')" fill-opacity="' + L.a + '"/>';
        if (FEH && p > .3) {
          var n = Math.floor(70 * sm((p - .3) / .7)), pc = 'rgb(176,52,24)';
          for (var i = 0; i < n; i++) { var d = DOTS[i], x = 110 + d[0] * 40, y = 262 - 6 - d[1] * d[1] * (h * .9) * (0.35 + .65 * (1 - d[2])); g += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (2 + d[2] * 2).toFixed(1) + '" fill="' + pc + '"/>'; }
        }
        if (!FEH && m > 0) {
          g += '<path d="M108 ' + yTop + ' V236 a22 22 0 0 0 44 0 V' + yTop + '" fill="none" stroke="#5f6b78" stroke-width="13" stroke-opacity="' + (.9 * m).toFixed(2) + '"/>';
          g += '<path d="M108 ' + yTop + ' V236 a22 22 0 0 0 44 0 V' + yTop + '" fill="none" stroke="#c4ccd5" stroke-width="8" stroke-opacity="' + (.95 * m).toFixed(2) + '"/>';
          g += '<path d="M107 ' + (yTop + 4) + ' V232" stroke="#fff" stroke-width="3" stroke-opacity="' + (m).toFixed(2) + '" stroke-linecap="round"/>';
        }
        if (!FEH && S.step === 2 && S.drops === 0) { for (var j = 0; j < 14; j++) { var e = DOTS[j]; g += '<circle cx="' + (110 + e[0] * 40).toFixed(1) + '" cy="' + (262 - 8 - e[1] * 50).toFixed(1) + '" r="3" fill="#5b3b20" fill-opacity=".7"/>'; } }
      }
      g += '</g><path d="' + TUBE + '" fill="none" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>';
      g += '<path d="M98 40 H162" stroke="#64748b" stroke-width="3.5" stroke-linecap="round"/>';
      g += '<text x="130" y="296" text-anchor="middle" font-size="12.5" font-weight="700" fill="#475569" font-family="Arial,sans-serif">Wasserbad' + (warm ? ' · ' + (FEH ? '70' : '60') + ' °C' : '') + '</text>';
      g += '<text x="130" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#334155" font-family="Arial,sans-serif">' + (S.sub ? 'Reagenzglas: ' + sub().name : 'Reagenzglas') + '</text>';
      svg.innerHTML = g;
    }

    function render(force) {
      if (force) lastKey = '';
      var u = sub();
      Array.prototype.forEach.call(selBox.children, function (b) { b.classList.toggle('on', b.getAttribute('data-id') === S.sub); b.disabled = S.step >= (FEH ? 3 : 4); });
      Array.prototype.forEach.call(stBox.children, function (b) {
        var i = +b.getAttribute('data-i'), en = false;
        if (!S.heat) { if (FEH) en = i === S.step; else en = (i === S.step) || (i === 2 && S.step === 2); }
        b.disabled = !en; b.classList.toggle('now', en);
        b.classList.toggle('fin', i < S.step);
      });
      if (!FEH) { var b3 = stBox.children[2]; b3.firstChild.nodeValue = '3 · Ammoniak-Lösung zutropfen' + (S.drops ? ' (' + S.drops + ')' : ''); }
      $(P + 'cs').textContent = u ? u.name : 'noch keine';
      var L = liqForStep2() || liquid();
      $(P + 'cf').textContent = L ? L.w : 'leer';
      $(P + 'ct').textContent = S.heat || S.done ? (FEH ? '70 °C' : '60 °C') : '22 °C';
      draw();
    }

    // ---------------------------------------------------------- Protokoll
    function addLog() {
      var u = sub(); proto[u.id] = u.pos ? (FEH ? 'Farbe: blau → grün → gelb → orange, am Ende ziegelroter Niederschlag.' : 'Lösung wird grau, an der Glaswand entsteht ein silbrig glänzender Belag.')
        : (FEH ? 'Keine Veränderung, die Lösung bleibt tiefblau.' : 'Keine Veränderung, die Lösung bleibt klar und farblos.');
      var tb = $(P + 'log'); tb.innerHTML = '';
      SUBS.forEach(function (s) { if (proto[s.id]) { var tr = document.createElement('tr'); tr.innerHTML = '<td><b>' + s.name + '</b><br><span class="small">' + s.f + '</span></td><td>' + proto[s.id] + '</td>'; tb.appendChild(tr); } });
      var n = Object.keys(proto).length; $(P + 'stars').textContent = '★ ' + n + ' von ' + SUBS.length + ' Stoffen geprüft';
      if (n === SUBS.length && cfg.onComplete) cfg.onComplete();
    }

    // ---------------------------------------------------------- Zeitschritt + Kolbi
    var last = Date.now();
    function tick() {
      var now = Date.now(), dt = Math.min(.5, (now - last) / 1000); last = now; sinceR += dt;
      if (S.heat && !S.done) {
        var u = sub(); S.q = Math.min(1, S.q + dt / (u.t || 9));
        if (S.q >= 1) { S.heat = false; S.done = true; addLog(); render(true); } else render();
      }
      if (lastInst === inst) syncKolbi();
    }
    function syncKolbi() {
      if (!window.Kolbi || !Kolbi.tint) return;
      var L = liqForStep2() || liquid(), u = sub();
      var sig = L ? L.c.map(Math.round).join(',') + '|' + L.a.toFixed(2) + '|' + (L.m || 0).toFixed(2) : 'x';
      if (sig !== syncKolbi.sig) {
        syncKolbi.sig = sig;
        if (!L) Kolbi.tint(null);
        else if (!FEH && L.m) { var m = L.m, c = [lerp(L.c[0], 196, m), lerp(L.c[1], 202, m), lerp(L.c[2], 208, m)]; Kolbi.tint('rgb(' + c.map(Math.round).join(',') + ')', Math.min(.95, L.a + .5 * m)); }
        else Kolbi.tint('rgb(' + L.c.map(Math.round).join(',') + ')', L.a);
      }
      if (sinceR > 9 && Kolbi.react && u) {
        var done = S.done, p = L && L.p || 0;
        if (FEH) {
          if (S.heat && u.pos && p > .3 && !said.g) { said.g = 1; sinceR = 0; Kolbi.react('surprised', 'Huch, ich werde grün!'); }
          else if (S.done && u.pos && !said.r) { said.r = 1; sinceR = 0; Kolbi.react('happy', 'Jetzt bin ich ziegelrot, mit Niederschlag.'); }
          else if (S.done && !u.pos && !said.n) { said.n = 1; sinceR = 0; Kolbi.react('thinking', 'Bei mir bleibt alles blau.'); }
        } else {
          if (S.heat && u.pos && p > .55 && !said.g) { said.g = 1; sinceR = 0; Kolbi.react('surprised', 'Ich glänze wie ein Spiegel!'); }
          else if (S.done && u.pos && !said.r) { said.r = 1; sinceR = 0; Kolbi.react('happy', 'Silberspiegel! Schau mich an.'); }
          else if (S.done && !u.pos && !said.n) { said.n = 1; sinceR = 0; Kolbi.react('thinking', 'Bei mir bleibt alles klar.'); }
        }
      }
    }
    var inst = { S: S, activate: function () { lastInst = inst; syncKolbi.sig = null; syncKolbi(); } };
    instances.push(inst); if (!lastInst) lastInst = inst;
    setInterval(tick, 100);
    render(true);
    root.addEventListener('pointerdown', function () { lastInst = inst; });
    return inst;
  }
  window.Lab = { create: create };
  document.addEventListener('tabchange', function (e) { instances.forEach(function (i) { if (i.tab === e.detail) i.activate(); }); });
})();
