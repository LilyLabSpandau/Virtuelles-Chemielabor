/*
  Kolbi – frei bewegliches Maskottchen mit Persönlichkeit (zentral, von Modulen nutzbar).
  Einbinden:  <script src="…/kolbi/kolbi.js"></script>
  Nutzen:     Kolbi.init({ id:'modulname', color:'#38bdf8', tapHelp:fn, comments:[…] });
              Kolbi.ask({ id:'…', text:'…', tip:'…' });   Kolbi.react('excited','Text');   Kolbi.mood('interested',2500);
  Gespeichert wird nur im Browser der Schüler: "Tipp nicht mehr anzeigen", "Kolbi aus", "weniger reden", "kennt sich schon".
  Keine Auswertung, keine Datenübertragung.
*/
(function () {
  'use strict';
  var KEY = 'kolbi-v1', SK = null;
  var cfg = { id: 'modul', color: '#38bdf8', tapHelp: null, offsetBottom: 56, comments: [], intro: true, skin: null, canTalk: null };
  var st = { off: false, mute: {}, met: false, quiet: false };
  var el = {}, pos = { x: 0, y: 0 };
  var wanderT = null, quietUntil = 0, bubbleOpen = false, curAsk = null, shownIds = {}, queue = [], closeT = null, introActive = false;
  var lastAct = Date.now(), nextRemark = 45, base = 'happy', curMood = 'happy', moodT = null, wasSleeping = false, yawned = false;
  var eyeT = '', lastPtr = 0, taps = [], lastDizzy = 0, microT = null, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function load() { try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); if (o && typeof o === 'object') { st.off = !!o.off; st.mute = o.mute || {}; st.met = !!o.met; st.quiet = !!o.quiet; } } catch (e) {} }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  // ------------------------------------------------------------------ Texte
  var NICE = [
    'Du machst das richtig gut. Weiter so!',
    'Schön, dass du dir die Zeit nimmst – so lernt man am meisten.',
    'Mit dir macht Chemie echt Spaß!',
    'Ich bin stolz auf dich. Und ich bin nur ein Kolben!',
    'Du bist ein Naturtalent im Labor.',
    'Falls du es noch nicht gehört hast: Du bist klüger, als du denkst.'
  ];
  var MOTIVATION = [
    'Fehler sind nur Zwischenprodukte – am Ende kommt das richtige Ergebnis raus.',
    'Keine Reaktion ohne Aktivierungsenergie. Der Anfang ist immer der schwerste Teil!',
    'Auch ein Mol fängt mit einem einzelnen Teilchen an. Bleib dran!',
    'Diamanten sind auch nur Kohlenstoff, der unter Druck durchgehalten hat.',
    'Jede Formel war mal unbekannt. Du kriegst das raus!',
    'Wer ausprobiert, lernt. Wer nie probiert, bleibt ein Edelgas – und reagiert auf nichts.',
    'Ein bisschen Geduld, dann verbindet sich alles zu einem Ganzen.'
  ];
  var JOKES = [
    ['Warum sind Alkane so entspannt?', 'Sie sind gesättigt.'],
    ['Treffen sich zwei Wasserstoffatome. Sagt das eine: „Ich habe ein Elektron verloren!“ – „Bist du sicher?“', '„Ja, ich bin positiv.“'],
    ['Warum haben Edelgase keine Freunde?', 'Sie reagieren auf niemanden.'],
    ['Ein Mol geht in eine Bar. Der Barkeeper fragt: „Wie viele?“', '6,022 · 10²³.'],
    ['Helium geht in eine Bar. Der Barkeeper sagt: „Wir bedienen hier keine Edelgase.“', 'Helium reagiert nicht.'],
    ['Warum sind Salze so gesellig?', 'Bei ihnen ziehen sich Gegensätze an.'],
    ['Was ist ein Katalysator beim Date?', 'Jemand, der alles beschleunigt und selbst unverändert bleibt.'],
    ['Ich wollte einen Witz über Natrium erzählen …', 'Na.'],
    ['Was sagt ein Chemiker, wenn er Durst hat?', '„H₂O, bitte – aber ohne Reaktion.“'],
    ['Wer gewinnt, wenn Doppel- und Dreifachbindung streiten?', 'Die Dreifachbindung. Die hält mehr aus.'],
    ['Warum ist Kohlenstoff so beliebt?', 'Er hat vier Hände für Freundschaften.'],
    ['Welcher Kolben ist am glücklichsten?', 'Der, der nicht überkocht.'],
    ['Warum war das Elektron so schlecht gelaunt?', 'Es hatte eine negative Ausstrahlung.']
  ];
  var FACTS = [
    'Wusstest du? Wasser dehnt sich beim Gefrieren aus – deshalb schwimmt Eis auf Wasser.',
    'Wusstest du? Diamant und Graphit bestehen beide nur aus Kohlenstoff. Nur die Anordnung der Atome ist anders.',
    'Wusstest du? Wasserstoff ist das häufigste Element im Universum.',
    'Wusstest du? Quecksilber ist das einzige Metall, das bei Raumtemperatur flüssig ist.',
    'Wusstest du? Rund vier Fünftel der Luft sind Stickstoff, nur etwa ein Fünftel ist Sauerstoff.',
    'Wusstest du? Dein Körper besteht zu mehr als der Hälfte aus Wasser.',
    'Wusstest du? Ein Mol enthält etwa 6,022 · 10²³ Teilchen. Das ist die Avogadro-Konstante.',
    'Wusstest du? Der Erlenmeyerkolben ist nach dem Chemiker Emil Erlenmeyer benannt, der ihn 1860 erfand. Ich bin also ein Original!',
    'Wusstest du? Helium ist das zweithäufigste Element im Universum.',
    'Wusstest du? Gold reagiert kaum mit Sauerstoff. Deshalb glänzt es auch nach Jahrtausenden noch.'
  ];
  var GENERIC = [
    'Neugier ist die halbe Chemie.',
    'Hast du schon alle Ecken des Labors entdeckt?',
    'Mit dem Knopf unten links kommst du immer eine Ebene zurück.',
    'Probier ruhig Dinge aus. Im virtuellen Labor geht nichts kaputt!'
  ];
  var TICKLE = ['Hihi, das kitzelt! 😄', 'Hihihi! Hör auf, ich schwapp über!', 'Kitzeln verboten! … na gut, ein bisschen ist okay.'];
  var DIZZY = ['Uff … mir wird ganz schwindelig!', 'Oh weh, ich schwappe überall hin. Das war ein Wirbelwind!', 'Langsam bitte, ich bin kein Schüttelbecher!'];
  var BREAK = ['Du lernst schon eine ganze Weile. Trink einen Schluck Wasser und streck dich kurz! 💧', 'Kleine Pause gefällig? Danach geht es mit frischem Kopf weiter.'];
  var BORED = ['Ähm … hallo? Ist da jemand?', 'Ich zähle mal Atome. Eins … zwei …', 'Ist hier gerade Pause? Ich schwenke einfach mal ein bisschen.', '*gähn* Ich hätte jetzt Lust auf eine Reaktion.'];
  var WAKE = ['Oh! Ich bin kurz eingenickt. Schön, dass du wieder da bist!', 'Huch, da bist du ja wieder! Ich hab nur kurz die Augen zugemacht.'];

  // ------------------------------------------------------------------ Gesicht
  var INK = '#2c2457', PINK = '#ff6b81';
  function dot(cx, cy, r, hl) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + INK + '"/><circle cx="' + (cx + 1.5) + '" cy="' + (cy - 1.6) + '" r="' + (hl || 1.6) + '" fill="#fff"/>'; }
  function eyesOpen(r) { return '<g class="k-lid">' + dot(41, 74, r || 4.6) + dot(61, 74, r || 4.6) + '</g>'; }
  var ARM_L = '<path class="k-arm k-arml" d="M16 86 Q6 92 5 100"/>', ARM_R = '<path class="k-arm k-armr" d="M86 86 Q96 92 97 100"/>';
  var MOODS = {
    happy: { eyes: eyesOpen(), mouth: '<path d="M43 83 q8 9 16 0"/>', l: ARM_L, r: ARM_R },
    excited: {
      eyes: '<path d="M35 76 q6 -10 12 0"/><path d="M55 76 q6 -10 12 0"/>',
      mouth: '<path d="M42 81 q9 16 18 0 z" fill="' + PINK + '"/>',
      l: '<path class="k-arm k-arml" d="M17 82 Q4 72 3 58"/>', r: '<path class="k-arm k-armr" d="M85 82 Q98 72 99 58"/>',
      extra: '<g fill="#ffd35a" stroke="none"><polygon points="8,40 10,45 15,45 11,48 13,53 8,50 3,53 5,48 1,45 6,45"/><polygon points="94,34 96,39 101,39 97,42 99,47 94,44 89,47 91,42 87,39 92,39"/></g>'
    },
    interested: {
      eyes: '<g class="k-lid">' + dot(41, 74, 5.8, 1.9) + dot(61, 74, 5.8, 1.9) + '</g>',
      brows: '<path d="M34 64 q6 -5 13 -1"/><path d="M55 63 q7 -4 13 1"/>',
      mouth: '<ellipse cx="51" cy="86" rx="2.6" ry="3" fill="#3b1d4a"/>', l: ARM_L, r: '<path class="k-arm k-armr" d="M86 86 Q92 78 80 76"/>'
    },
    thinking: {
      eyes: '<g class="k-lid"><circle cx="40" cy="72" r="4.6" fill="' + INK + '"/><circle cx="60" cy="72" r="4.6" fill="' + INK + '"/><circle cx="41.5" cy="70.4" r="1.6" fill="#fff"/><circle cx="61.5" cy="70.4" r="1.6" fill="#fff"/></g>',
      mouth: '<path d="M45 85 q6 -3 12 0"/>', l: ARM_L, r: '<path class="k-arm k-armr" d="M86 86 Q92 78 80 76"/>',
      extra: '<text x="82" y="24" font-size="26" font-weight="800" fill="#ffd35a" stroke="none">?</text>'
    },
    bored: {
      eyes: '<path d="M36.4 75 a4.6 4.6 0 0 0 9.2 0 z" fill="' + INK + '" stroke="none"/><path d="M56.4 75 a4.6 4.6 0 0 0 9.2 0 z" fill="' + INK + '" stroke="none"/><path d="M35 75 h12"/><path d="M55 75 h12"/>',
      mouth: '<path d="M44 86 q3 -2 7 0 t7 0"/>', l: '<path class="k-arm k-arml" d="M16 86 Q10 96 12 106"/>', r: '<path class="k-arm k-armr" d="M86 86 Q92 96 90 106"/>'
    },
    yawn: {
      eyes: '<path d="M36 75 q5 4 10 0"/><path d="M56 75 q5 4 10 0"/>',
      mouth: '<ellipse cx="51" cy="86" rx="5.5" ry="7.5" fill="#3b1d4a"/>', l: '<path class="k-arm k-arml" d="M17 84 Q8 70 22 66"/>', r: '<path class="k-arm k-armr" d="M85 84 Q94 70 80 66"/>'
    },
    sleep: {
      eyes: '<path d="M36 75 q5 4 10 0"/><path d="M56 75 q5 4 10 0"/>', mouth: '<path d="M46 86 q5 3 10 0"/>',
      l: '<path class="k-arm k-arml" d="M16 86 Q10 96 12 106"/>', r: '<path class="k-arm k-armr" d="M86 86 Q92 96 90 106"/>',
      extra: '<g class="k-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="80" y="38" font-size="15">Z</text><text x="90" y="24" font-size="11">z</text></g>'
    },
    wink: { eyes: '<g class="k-lid">' + dot(41, 74, 4.6) + '</g><path d="M56 76 q5 -6 10 0"/>', mouth: '<path d="M42 83 q9 11 18 0"/>', l: ARM_L, r: '<path class="k-arm k-armr" d="M86 86 Q96 78 94 66"/>' },
    giggle: { eyes: '<path d="M35 76 q6 -10 12 0"/><path d="M55 76 q6 -10 12 0"/>', mouth: '<path d="M42 81 q9 16 18 0 z" fill="' + PINK + '"/>', l: '<path class="k-arm k-arml" d="M17 88 Q10 80 22 78"/>', r: '<path class="k-arm k-armr" d="M85 88 Q92 80 80 78"/>' },
    dizzy: {
      eyes: '<path d="M37 70 l8 8 M45 70 l-8 8"/><path d="M57 70 l8 8 M65 70 l-8 8"/>', mouth: '<path d="M43 87 q4 -5 8 0 q4 5 8 0"/>',
      l: '<path class="k-arm k-arml" d="M16 86 Q4 84 6 74"/>', r: '<path class="k-arm k-armr" d="M86 86 Q98 84 96 74"/>',
      extra: '<g class="k-zzz" fill="#ffd35a" stroke="none"><circle cx="30" cy="40" r="2.6"/><circle cx="72" cy="36" r="2.6"/><circle cx="51" cy="28" r="2.6"/></g>'
    },
    surprised: {
      eyes: '<g class="k-lid">' + dot(41, 74, 6.2, 2.1) + dot(61, 74, 6.2, 2.1) + '</g>', brows: '<path d="M34 63 q6 -6 13 -2"/><path d="M55 61 q7 -4 13 2"/>',
      mouth: '<ellipse cx="51" cy="87" rx="3.4" ry="4.2" fill="#3b1d4a"/>', l: '<path class="k-arm k-arml" d="M17 84 Q6 76 8 66"/>', r: '<path class="k-arm k-armr" d="M85 84 Q96 76 94 66"/>'
    },
    love: {
      eyes: '<path d="M41 80 c-8 -5 -8 -12 -2.5 -12 c2.3 0 2.5 2 2.5 3 c0 -1 .2 -3 2.5 -3 c5.5 0 5.5 7 -2.5 12z" fill="#ff4d6d" stroke="none"/><path d="M61 80 c-8 -5 -8 -12 -2.5 -12 c2.3 0 2.5 2 2.5 3 c0 -1 .2 -3 2.5 -3 c5.5 0 5.5 7 -2.5 12z" fill="#ff4d6d" stroke="none"/>',
      mouth: '<path d="M43 84 q8 9 16 0"/>', l: ARM_L, r: ARM_R,
      extra: '<g class="k-zzz" fill="#ff8fa8" stroke="none" font-weight="800"><text x="82" y="34" font-size="14">♥</text><text x="6" y="44" font-size="10">♥</text></g>'
    },
    hum: { eyes: eyesOpen(), mouth: '<path d="M44 84 q7 7 14 0"/>', l: ARM_L, r: ARM_R, extra: '<g class="k-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="84" y="40" font-size="16">♪</text><text x="2" y="46" font-size="13">♫</text></g>' },
    oops: {
      eyes: '<g class="k-lid"><circle cx="41" cy="75" r="4" fill="' + INK + '"/><circle cx="61" cy="75" r="4" fill="' + INK + '"/></g>',
      brows: '<path d="M35 66 l10 3"/><path d="M67 66 l-10 3"/>', mouth: '<path d="M43 88 q4 -5 8 0 q4 5 8 0"/>', l: ARM_L, r: ARM_R,
      extra: '<path d="M78 58 q4 7 0 10 q-4 -3 0 -10z" fill="#7fd0ff" stroke="none"/>'
    }
  };
  function face(m) {
    var d = MOODS[m] || MOODS.happy;
    return '<g fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + (d.l || ARM_L) + (d.r || ARM_R) + (d.brows || '') + '</g>' +
      '<g id="kolbi-eyes" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + d.eyes + '</g>' +
      '<g class="k-mouth" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + d.mouth + '</g>' +
      '<ellipse cx="33" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/><ellipse cx="69" cy="83" rx="5" ry="3.4" fill="#ff8fa8" opacity=".7"/>' + (d.extra || '');
  }

  var CSS = '' +
  '#kolbi-root{position:fixed;left:0;top:0;width:0;height:0;z-index:9000;pointer-events:none;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}' +
  '#kolbi-char{position:fixed;left:0;top:0;width:var(--kw,78px);height:var(--kh,96px);pointer-events:auto;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;perspective:420px;transition:left 1.8s cubic-bezier(.45,0,.25,1),top 1.8s cubic-bezier(.45,0,.25,1),opacity .3s}' +
  '#kolbi-char.drag{cursor:grabbing;transition:none}#kolbi-char.nomove{transition:none}' +
  '#kolbi-shadow{position:absolute;left:50%;bottom:-2px;width:calc(var(--kw,78px) * .8);height:11px;margin-left:calc(var(--kw,78px) * -.4);border-radius:50%;background:rgba(0,0,0,.35);filter:blur(3px);transition:transform .3s,opacity .3s}' +
  '#kolbi-body{position:absolute;left:0;top:0;width:100%;height:100%;transform-style:preserve-3d;transform:rotateY(var(--ry,0deg)) rotateZ(var(--rz,0deg));transform-origin:50% 90%;animation:kolbi-bob 3.2s ease-in-out infinite;filter:drop-shadow(0 6px 5px rgba(0,0,0,.35))}' +
  '#kolbi-char.walk #kolbi-body{animation:kolbi-hop .42s ease-in-out infinite}#kolbi-char.walk #kolbi-shadow{transform:scale(.8);opacity:.7}' +
  '#kolbi-char[data-mood=excited] #kolbi-body{animation:kolbi-hop .34s ease-in-out infinite}' +
  '#kolbi-char[data-mood=giggle] #kolbi-body{animation:kolbi-shake .22s linear infinite}#kolbi-char[data-mood=dizzy] #kolbi-body{animation:kolbi-wobble .7s ease-in-out infinite}' +
  '#kolbi-char[data-mood=bored] #kolbi-body{animation-duration:5.5s}#kolbi-char[data-mood=sleep] #kolbi-body{animation-duration:6.5s}' +
  '#kolbi-body svg{-webkit-user-drag:none;pointer-events:none;width:100%;height:100%;overflow:visible;display:block}' +
  '#kolbi-body .k-lid{transform-box:fill-box;transform-origin:center;animation:kolbi-blink 5s infinite}' +
  '#kolbi-body .k-arm{transform-box:fill-box;transform-origin:50% 0}' +
  '#kolbi-char.talk .k-armr{animation:kolbi-wave .7s ease-in-out infinite}' +
  '#kolbi-char.talk .k-mouth{transform-box:fill-box;transform-origin:center;animation:kolbi-talk .32s ease-in-out infinite}' +
  '#kolbi-eyes{transition:transform .22s ease-out}' +
  '#kolbi-body .k-bub{animation:kolbi-rise 3.4s linear infinite;opacity:0}#kolbi-body .k-bub.b2{animation-delay:1.1s;animation-duration:4s}#kolbi-body .k-bub.b3{animation-delay:2.2s;animation-duration:3.1s}' +
  '#kolbi-body .k-zzz{animation:kolbi-zzz 3s ease-in-out infinite}' +
  '@keyframes kolbi-bob{0%,100%{translate:0 0}50%{translate:0 -4px}}' +
  '@keyframes kolbi-hop{0%,100%{translate:0 0;scale:1 1}35%{translate:0 -11px;scale:.96 1.05}70%{translate:0 0;scale:1.05 .94}}' +
  '@keyframes kolbi-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}' +
  '@keyframes kolbi-shake{0%,100%{translate:-2px 0;rotate:-2deg}50%{translate:2px -2px;rotate:2deg}}' +
  '@keyframes kolbi-wobble{0%,100%{rotate:-7deg}50%{rotate:7deg}}' +
  '@keyframes kolbi-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(-24deg)}}' +
  '@keyframes kolbi-talk{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.55)}}' +
  '@keyframes kolbi-rise{0%{transform:translateY(0);opacity:0}15%{opacity:.7}85%{opacity:.5}100%{transform:translateY(-26px);opacity:0}}' +
  '@keyframes kolbi-zzz{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-6px);opacity:1}}' +
  '#kolbi-bubble{position:fixed;left:0;top:0;width:min(290px,calc(100vw - 20px));box-sizing:border-box;pointer-events:auto;background:#fffbe3;color:#1f2937;border:1.5px solid #3b3b2a;border-radius:12px;padding:12px 14px;box-shadow:0 10px 26px rgba(0,0,0,.4);font-size:14.5px;line-height:1.45;display:none;opacity:0;transform:scale(.94);transform-origin:var(--ox,50%) 100%;transition:opacity .18s,transform .18s}' +
  '#kolbi-bubble.on{display:block}#kolbi-bubble.show{opacity:1;transform:scale(1)}' +
  '#kolbi-bubble::after{content:"";position:absolute;left:var(--tx,40px);width:14px;height:14px;background:#fffbe3;border:1.5px solid #3b3b2a;border-top:0;border-left:0;transform:rotate(45deg);margin-left:-7px;bottom:-8px}' +
  '#kolbi-bubble.below::after{bottom:auto;top:-8px;border:1.5px solid #3b3b2a;border-bottom:0;border-right:0}' +
  '#kolbi-bubble .kb-text{margin:0 18px 10px 0}' +
  '#kolbi-bubble .kb-x{position:absolute;right:6px;top:4px;border:0;background:none;font-size:20px;line-height:1;color:#6b7280;cursor:pointer;padding:4px 7px}' +
  '#kolbi-bubble .kb-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:7px 4px;font:inherit;color:#111827;cursor:pointer;border-radius:8px}' +
  '#kolbi-bubble .kb-opt:hover,#kolbi-bubble .kb-opt:focus-visible{background:rgba(59,130,246,.14);outline:none}' +
  '#kolbi-bubble .kb-dot{flex:none;width:13px;height:13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#60a5fa,#1d4ed8);box-shadow:0 0 0 1.5px #1e3a8a}' +
  '#kolbi-bubble .kb-mute{display:flex;align-items:center;gap:9px;margin-top:6px;padding:6px 2px 0;font-size:13px;color:#374151;cursor:pointer}#kolbi-bubble .kb-mute input{width:17px;height:17px;margin:0}' +
  '#kolbi-bubble .kb-links{display:flex;justify-content:flex-end;gap:14px;margin-top:6px}' +
  '#kolbi-bubble .kb-link{border:0;background:none;color:#6b7280;font:inherit;font-size:12px;text-decoration:underline;cursor:pointer;padding:4px 0}' +
  '#kolbi-bubble .kb-ok{margin-top:6px;border:0;border-radius:8px;background:#2563eb;color:#fff;font:inherit;font-weight:600;padding:8px 16px;cursor:pointer}' +
  '#kolbi-bubble .kb-punch{display:block;margin-top:6px;font-weight:700;animation:kb-in .3s}@keyframes kb-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}' +
  '#kolbi-back{position:fixed;left:10px;pointer-events:auto;display:none;border:0;border-radius:999px;background:rgba(30,41,59,.92);color:#e2e8f0;font:600 12px "Segoe UI",system-ui,sans-serif;padding:7px 12px;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.35)}' +
  '@media (max-width:520px){#kolbi-back .kb-hol{display:none}}' +
  '@media (max-width:700px){#kolbi-char{width:var(--kwm,62px);height:var(--khm,77px)}#kolbi-shadow{width:calc(var(--kwm,62px) * .8);margin-left:calc(var(--kwm,62px) * -.4)}}' +
  '@media (prefers-reduced-motion:reduce){#kolbi-body,#kolbi-char.walk #kolbi-body,#kolbi-char[data-mood=excited] #kolbi-body{animation:none}#kolbi-body .k-lid,#kolbi-body .k-bub,#kolbi-body .k-zzz{animation:none}}';

  function svg(col) {
    var body = 'M40 12 V42 L11 98 Q5 112 19 112 H83 Q97 112 91 98 L62 42 V12 Z';
    return '<svg viewBox="-2 -8 106 128" role="img" aria-label="Kolbi, das Erlenmeyerkolben-Maskottchen">' +
      '<defs><clipPath id="kk-c"><path d="' + body + '"/></clipPath>' +
      '<linearGradient id="kk-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '"/><stop offset="1" stop-color="' + col + '" stop-opacity=".62"/></linearGradient>' +
      '<linearGradient id="kk-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient></defs>' +
      '<path d="' + body + '" fill="url(#kk-glass)"/>' +
      '<g clip-path="url(#kk-c)"><path id="kk-liq" d="M-2 64 H106 V125 H-2Z" fill="url(#kk-g)"/><path id="kk-surf" d="M-2 64 H106" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>' +
      '<circle class="k-bub b1" cx="30" cy="104" r="3" fill="#fff"/><circle class="k-bub b2" cx="70" cy="98" r="2.2" fill="#fff"/><circle class="k-bub b3" cx="56" cy="106" r="1.8" fill="#fff"/></g>' +
      '<path d="' + body + '" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="3" stroke-linejoin="round"/>' +
      '<rect x="35" y="6" width="32" height="8" rx="4" fill="rgba(255,255,255,.4)" stroke="rgba(255,255,255,.9)" stroke-width="2.5"/>' +
      '<path d="M46 20 V36" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>' +
      '<path d="M19 96 Q16 104 22 108" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".45"/>' +
      '<g id="kk-face">' + face('happy') + '</g></svg>';
  }

  // ------------------------------------------------------------------ Stimmung
  function setFace(m) {
    curMood = m; if (!el.char) return;
    el.char.setAttribute('data-mood', m);
    var f = el.root.querySelector('#kk-face'); if (f) f.innerHTML = SK.face(m);
    el.eyes = el.root.querySelector('#kolbi-eyes');
    if (el.eyes && eyeT) el.eyes.style.transform = eyeT;
  }
  function mood(m, ms) {
    if (!el.char) return;
    clearTimeout(moodT); setFace(m);
    if (ms) moodT = setTimeout(function () { setFace(base); }, ms);
  }
  function setBase(m) { base = m; if (!moodT) setFace(m); }

  // ------------------------------------------------------------------ Bewegung & Flüssigkeit (Physik)
  function vw() { return window.innerWidth; }
  function vh() { return window.innerHeight; }
  function csz() { return el.char ? el.char.offsetWidth : 78; }
  function clampPos(x, y) { var w = csz(), h = el.char.offsetHeight; return { x: Math.max(6, Math.min(vw() - w - 6, x)), y: Math.max(6, Math.min(vh() - h - 6, y)) }; }
  function place(x, y, animate) {
    var p = clampPos(x, y);
    if (!animate) el.char.classList.add('nomove');
    pos = p; el.char.style.left = p.x + 'px'; el.char.style.top = p.y + 'px';
    if (!animate) { void el.char.offsetWidth; el.char.classList.remove('nomove'); }
    if (bubbleOpen) layoutBubble();
  }
  var ph = { px: null, py: null, vx: 0, vy: 0, th: 0, w: 0, lean: 0, ry: 0, t: 0, last: 0 };
  function loop(ts) {
    requestAnimationFrame(loop);
    if (!el.char || st.off) { ph.px = null; return; }
    var dt = Math.min(0.05, (ts - (ph.last || ts)) / 1000 || 0.016); ph.last = ts; if (dt <= 0) return;
    var r = el.body.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top;
    if (ph.px === null) { ph.px = cx; ph.py = cy; return; }
    var vx = (cx - ph.px) / dt, vy = (cy - ph.py) / dt;
    var ax = (vx - ph.vx) / dt, ay = (vy - ph.vy) / dt;
    ph.px = cx; ph.py = cy; ph.vx = vx; ph.vy = vy;
    ax = Math.max(-3500, Math.min(3500, ax)); ay = Math.max(-3500, Math.min(3500, ay));
    // Schwappen: gedämpfter Feder-Schwinger, angetrieben von der Beschleunigung
    var wn = 10, zeta = 0.1;
    var acc = -wn * wn * ph.th - 2 * zeta * wn * ph.w - ax * 0.0012;
    ph.w += acc * dt; ph.th += ph.w * dt;
    ph.th = Math.max(-0.7, Math.min(0.7, ph.th));
    // Kolben neigt sich leicht in Laufrichtung
    var leanT = Math.max(-12, Math.min(12, vx * 0.014));
    ph.lean += (leanT - ph.lean) * Math.min(1, dt * 7);
    var side = (cx / vw()) - 0.5, ryT = -side * 34 + Math.max(-10, Math.min(10, vx * 0.02));
    ph.ry += (ryT - ph.ry) * Math.min(1, dt * 6);
    el.body.style.setProperty('--rz', ph.lean.toFixed(2) + 'deg');
    el.body.style.setProperty('--ry', ph.ry.toFixed(2) + 'deg');
    ph.t += dt;
    var tn = Math.tan(Math.max(-0.75, Math.min(0.75, ph.th - ph.lean * Math.PI / 180)));
    var amp = 0.7 + Math.min(4.5, Math.abs(ph.w) * 1.1) + Math.min(2.5, Math.abs(ay) * 0.0012);
    if (SK.phys) SK.phys(el, ph, tn, amp);
  }
  function kolbiPhys(el, ph, tn, amp) {
    var L0 = 62, d = '', y;
    for (var x = -2; x <= 106; x += 6) {
      y = L0 + tn * (x - 51) + amp * Math.sin(x * 0.11 + ph.t * 7) * 0.6;
      y = Math.max(40, Math.min(118, y));
      d += (d ? ' L' : 'M') + x + ' ' + y.toFixed(1);
    }
    var s = d;
    d += ' L106 125 L-2 125 Z';
    if (el.liq) el.liq.setAttribute('d', d);
    if (el.surf) el.surf.setAttribute('d', s);
  }
  function anchors() {
    var w = csz(), h = el.char.offsetHeight, b = cfg.offsetBottom;
    return [{ x: vw() - w - 14, y: vh() - h - b }, { x: 14, y: vh() - h - b }, { x: vw() - w - 14, y: vh() * 0.55 }, { x: 14, y: vh() * 0.6 }, { x: vw() * 0.5 - w / 2, y: vh() - h - b }];
  }
  function walkTo(a) {
    var far = Math.abs(a.x - pos.x) + Math.abs(a.y - pos.y) > 40;
    if (far && !reduce) { el.char.classList.add('walk'); setTimeout(function () { el.char.classList.remove('walk'); }, 1800); }
    place(a.x, a.y, true); savePos();
  }
  function savePos() { try { sessionStorage.setItem(SK.key + '-pos', JSON.stringify({ fx: pos.x / vw(), fy: pos.y / vh() })); } catch (e) {} }
  function loadPos() { try { var o = JSON.parse(sessionStorage.getItem(SK.key + '-pos') || 'null'); if (o && isFinite(o.fx) && isFinite(o.fy)) return o; } catch (e) {} return null; }
  function wander() {
    clearTimeout(wanderT);
    wanderT = setTimeout(function () {
      if (!bubbleOpen && !st.off && Date.now() > quietUntil && !reduce && !document.hidden && curMood !== 'sleep' && talkOk()) { var a = anchors(); walkTo(rnd(a)); }
      wander();
    }, 14000 + Math.random() * 14000);
  }

  // ------------------------------------------------------------------ Sprechblase
  function layoutBubble() {
    var b = el.bubble, w = b.offsetWidth, h = b.offsetHeight, cx = pos.x + csz() / 2;
    var x = Math.max(10, Math.min(vw() - w - 10, cx - w / 2));
    var above = pos.y - h - 14 > 8, y = above ? pos.y - h - 14 : pos.y + el.char.offsetHeight + 14;
    b.style.left = x + 'px'; b.style.top = Math.max(8, Math.min(vh() - h - 8, y)) + 'px';
    b.classList.toggle('below', !above);
    var tx = Math.max(24, Math.min(w - 24, cx - x)); b.style.setProperty('--tx', tx + 'px'); b.style.setProperty('--ox', tx + 'px');
  }
  var bubbleSeq = 0;
  function openBubble(html, autoMs) {
    bubbleSeq++; clearTimeout(closeT);
    el.bubble.innerHTML = html; el.bubble.classList.add('on');
    bubbleOpen = true; quietUntil = Date.now() + 25000; layoutBubble();
    requestAnimationFrame(function () { el.bubble.classList.add('show'); layoutBubble(); });
    el.char.classList.add('talk'); setTimeout(function () { if (el.char) el.char.classList.remove('talk'); }, Math.min(6000, 1200 + (el.bubble.textContent || '').length * 40));
    if (autoMs) closeT = setTimeout(closeBubble, autoMs);
  }
  function closeBubble() {
    clearTimeout(closeT); bubbleOpen = false; curAsk = null; introActive = false;
    if (!el.bubble) return;
    el.bubble.classList.remove('show'); el.char.classList.remove('talk');
    setTimeout(function () { if (!bubbleOpen) el.bubble.classList.remove('on'); }, 200);
    setTimeout(runQueue, 1800);
  }
  function runQueue() { if (bubbleOpen || !queue.length || st.off) return; var o = queue.shift(); API.ask(o); }
  var X = '<button class="kb-x" aria-label="Schließen" data-k="close">×</button>';
  function quietLink() { return '<button class="kb-link" data-k="quiet">' + (st.quiet ? SK.name + ' darf wieder erzählen' : 'Weniger reden') + '</button>'; }

  function showAsk(o) {
    curAsk = o; mood('interested', 4000);
    openBubble(X + '<p class="kb-text">' + esc(o.text) + '<br><br><b>Brauchst du Hilfe?</b></p>' +
      '<button class="kb-opt" data-k="tip"><span class="kb-dot"></span>Tipp anzeigen</button>' +
      '<button class="kb-opt" data-k="no"><span class="kb-dot"></span>Ohne Hilfe weitermachen</button>' +
      (o.id ? '<label class="kb-mute"><input type="checkbox" id="kb-mute"> Diesen Tipp nicht mehr anzeigen</label>' : '') +
      '<div class="kb-links">' + quietLink() + '<button class="kb-link" data-k="off">' + SK.name + ' ausblenden</button></div>', 40000);
  }
  function showTip(o) { mood('thinking', 5000); openBubble(X + '<p class="kb-text" style="margin-bottom:8px">' + esc(o.tip) + '</p><button class="kb-ok" data-k="no">Alles klar</button>', 60000); }
  function showRemark(text, m, punch, sub) {
    mood(m || 'happy', (m === 'giggle' || m === 'dizzy') ? 3200 : 6000);
    var ms = 6000 + text.length * 55 + (sub ? sub.length * 40 : 0) + (punch ? 4500 + punch.length * 55 : 0);
    openBubble(X + '<p class="kb-text" style="margin-bottom:4px">' + esc(text) + '</p>' + (sub ? '<p class="kb-text" style="margin:0 0 4px;font-size:13px;color:#4b5563">' + esc(sub) + '</p>' : '') + '<span id="kb-pl"></span><div class="kb-links">' + quietLink() + '</div>', ms);
    var my = bubbleSeq;
    if (punch) setTimeout(function () {
      var pl = document.getElementById('kb-pl'); if (!pl || !bubbleOpen || my !== bubbleSeq) return;
      pl.innerHTML = '<span class="kb-punch">' + esc(punch) + '</span>'; mood('excited', 2600); layoutBubble();
    }, 3400);
  }
  function showIntro() {
    introActive = true; mood('excited', 2800);
    openBubble(X + '<p class="kb-text"><b>' + SK.t.intro[0] + '</b><br>' + SK.t.intro[1] + '</p>' +
      '<p class="kb-text" style="font-size:13px;color:#4b5563;margin-top:-4px">Du kannst mich ziehen, antippen oder ausblenden.</p><button class="kb-ok" data-k="hello">Hallo, ' + SK.name + '! 👋</button>', 0);
  }
  function onBubbleClick(e) {
    var t = e.target.closest ? e.target.closest('[data-k]') : null; if (!t) return;
    var k = t.getAttribute('data-k'), o = curAsk, m = document.getElementById('kb-mute');
    if (m && m.checked && o && o.id) { st.mute[o.id] = 1; save(); }
    if (k === 'tip' && o) { showTip(o); }
    else if (k === 'off') { API.hide(); }
    else if (k === 'quiet') { st.quiet = !st.quiet; save(); closeBubble(); mood('happy', 1500); }
    else if (k === 'hello') { st.met = true; save(); closeBubble(); mood('excited', 1800); }
    else closeBubble();
  }

  // ------------------------------------------------------------------ Inaktivität & Persönlichkeit
  var bag = [];
  function refillBag() { bag = ['nice', 'joke', 'motiv', 'comment', 'help', 'fact', 'joke', 'motiv', 'comment', 'fact', 'nice', 'comment']; for (var i = bag.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = bag[i]; bag[i] = bag[j]; bag[j] = t; } }
  var lastText = '';
  function pickFrom(arr) { var t, n = 0; do { t = rnd(arr); n++; } while (t === lastText && n < 5 && arr.length > 1); lastText = Array.isArray(t) ? t[0] : t; return t; }
  function remark() {
    if (!bag.length) refillBag();
    var kind = bag.pop();
    if (kind === 'help') {
      var o = cfg.tapHelp ? cfg.tapHelp() : null;
      if (o) { showAsk({ id: '', text: o.text, tip: o.tip }); return; }
      kind = 'nice';
    }
    if (kind === 'nice') showRemark(pickFrom(SK.t.NICE), 'love');
    else if (kind === 'fact') showRemark(pickFrom(SK.t.FACTS), 'interested');
    else if (kind === 'motiv') showRemark(pickFrom(SK.t.MOTIVATION), 'excited');
    else if (kind === 'joke') { var j = pickFrom(SK.t.JOKES); showRemark(SK.t.jokeLead + j[0], 'interested', j[1]); }
    else { var c = cfg.comments && cfg.comments.length ? cfg.comments.concat(SK.t.GENERIC) : SK.t.GENERIC; showRemark(pickFrom(c), 'interested'); }
  }
  function activity() {
    var was = (Date.now() - lastAct) / 1000; lastAct = Date.now();
    nextRemark = 40 + Math.random() * 25; yawned = false;
    if (curMood === 'sleep' || curMood === 'bored' || curMood === 'yawn') {
      var slept = wasSleeping; wasSleeping = false; clearTimeout(moodT); moodT = null; base = 'happy';
      if (slept && !bubbleOpen && !st.quiet && !st.off) { mood('excited', 2600); showRemark(rnd(SK.t.WAKE), 'excited'); } else { mood('happy'); }
    }
  }
  function tick() {
    if (!el.char || st.off || document.hidden) return;
    var idle = (Date.now() - lastAct) / 1000;
    if (idle >= 240 && curMood !== 'sleep') { wasSleeping = true; if (!bubbleOpen) { clearTimeout(moodT); moodT = null; base = 'sleep'; setFace('sleep'); } }
    else if (idle >= 120 && base === 'happy') { base = 'bored'; if (!moodT) setFace('bored'); }
    if (idle >= 150 && !yawned && base === 'bored' && !bubbleOpen) { yawned = true; mood('yawn', 3200); }
    if (idle >= nextRemark && !bubbleOpen && !introActive && !st.quiet && base !== 'sleep' && talkOk()) {
      if (base === 'bored') { showRemark(rnd(SK.t.BORED), 'bored'); nextRemark = idle + 70 + Math.random() * 50; }
      else { remark(); nextRemark = idle + 55 + Math.random() * 45; }
    }
  }

  function talkOk() { return !cfg.canTalk || cfg.canTalk(); }
  function micro() {
    if (!el.char || st.off || bubbleOpen || document.hidden || moodT || base === 'sleep' || reduce) return;
    var a = rnd(['look', 'look', 'wink', 'hop', 'hum', 'look']);
    if (a === 'look') {
      var pts = [[-2.4, -0.6], [2.4, -1], [-1.6, 1.2], [0, 0]], i = 0;
      (function next() { if (Date.now() - lastPtr < 1500 || i >= pts.length) return; eyeT = 'translate(' + pts[i][0] + 'px,' + pts[i][1] + 'px)'; if (el.eyes) el.eyes.style.transform = eyeT; i++; setTimeout(next, 1100); })();
    } else if (a === 'wink') mood('wink', 1400);
    else if (a === 'hum') mood('hum', 3600);
    else { el.char.classList.add('walk'); setTimeout(function () { el.char.classList.remove('walk'); }, 900); }
  }
  function scheduleMicro() { clearTimeout(microT); microT = setTimeout(function () { micro(); scheduleMicro(); }, 8000 + Math.random() * 9000); }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function breakCheck() {
    var t0 = +sget(SK.key + '-t0'); if (!t0) { sset(SK.key + '-t0', String(Date.now())); return; }
    var min = (Date.now() - t0) / 60000, done = +sget(SK.key + '-brk') || 0, th = [40, 90, 140];
    if (done < th.length && min >= th[done] && !bubbleOpen && !introActive && !st.quiet) { sset(SK.key + '-brk', String(done + 1)); showRemark(rnd(SK.t.BREAK), 'interested'); }
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function greetText() {
    var d = new Date(), h = d.getHours(), wd = d.getDay(), v = { n: 1, last: 0 };
    try { var o = JSON.parse(localStorage.getItem(SK.key + '-visit') || '{}'); v.last = +o.last || 0; v.n = (o.day === today() ? (+o.n || 0) : 0) + 1; localStorage.setItem(SK.key + '-visit', JSON.stringify({ day: today(), n: v.n, last: Date.now() })); } catch (e) {}
    var t = h < 5 ? 'Noch (oder schon) wach? Respekt! Willkommen im Labor.' : h < 10 ? 'Guten Morgen! Bereit für ein bisschen Chemie?' : h < 13 ? 'Guten Tag! Schön, dass du da bist.' : h < 17 ? 'Hallo! Na, wie läuft dein Tag?' : h < 22 ? 'Guten Abend! Noch ein bisschen Chemie vor dem Feierabend?' : 'So spät noch im Labor? Ich bin bei dir – aber denk an deinen Schlaf.';
    if (wd === 1 && h >= 5 && h < 17) t += ' Auf in die Woche!';
    else if (wd === 5 && h >= 5 && h < 17) t += ' Und gleich ist Wochenende!';
    else if ((wd === 0 || wd === 6) && h >= 5 && h < 22) t += ' Am Wochenende im Labor? Das nenne ich Einsatz!';
    if (v.last && Date.now() - v.last > 7 * 86400000) t = 'Lange nicht gesehen! Schön, dass du wieder da bist. 💙';
    else if (v.n >= 3) t = 'Schon wieder da? Ich freu mich jedes Mal!';
    else if (v.n === 2) t = 'Willkommen zurück! Das ging ja schnell.';
    return t;
  }

  // ------------------------------------------------------------------ API
  var DEFAULT_SKIN = {
    name: 'Kolbi', emoji: '🧪', key: 'kolbi', size: { w: 78, h: 96, wm: 62, hm: 77 },
    svg: svg, face: face, phys: kolbiPhys,
    t: {
      NICE: NICE, MOTIVATION: MOTIVATION, JOKES: JOKES, FACTS: FACTS, GENERIC: GENERIC, TICKLE: TICKLE, DIZZY: DIZZY, BREAK: BREAK, BORED: BORED, WAKE: WAKE,
      jokeLead: 'Unlustiger Chemiker-Witz: ',
      intro: ['Hallo! Ich bin Kolbi 🧪', 'Ich bin der Erlenmeyerkolben in deinem Labor und passe auf, dass nichts überkocht. Ich erzähle ab und zu etwas, gebe Denkanstöße und helfe, wenn du magst.']
    }
  };
  window.KolbiSkins = window.KolbiSkins || {};
  var API = {
    init: function (c) {
      for (var k in c) cfg[k] = c[k];
      SK = cfg.skin || DEFAULT_SKIN; KEY = SK.key + '-v1';
      load();
      if (document.getElementById('kolbi-root')) return;
      var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
      var root = document.createElement('div'); root.id = 'kolbi-root';
      root.innerHTML = '<div id="kolbi-char" role="button" tabindex="0" aria-label="' + SK.name + ' – Hilfe"><div id="kolbi-shadow"></div><div id="kolbi-body">' + SK.svg(cfg.color) + '</div></div>' +
        '<div id="kolbi-bubble" role="dialog" aria-live="polite"></div><button id="kolbi-back" type="button" aria-label="' + SK.name + ' wieder holen" title="' + SK.name + ' wieder holen">' + SK.emoji + ' ' + SK.name + '<span class="kb-hol"> holen</span></button>';
      document.body.appendChild(root);
      var z = SK.size; root.style.setProperty('--kw', z.w + 'px'); root.style.setProperty('--kh', z.h + 'px'); root.style.setProperty('--kwm', z.wm + 'px'); root.style.setProperty('--khm', z.hm + 'px');
      el.root = root; el.char = root.querySelector('#kolbi-char'); el.body = root.querySelector('#kolbi-body');
      el.bubble = root.querySelector('#kolbi-bubble'); el.back = root.querySelector('#kolbi-back');
      el.eyes = root.querySelector('#kolbi-eyes'); el.liq = root.querySelector('#kk-liq'); el.surf = root.querySelector('#kk-surf');
      el.bubble.addEventListener('click', onBubbleClick);
      el.back.addEventListener('click', function () { st.off = false; save(); applyOff(); API.help(); });

      var d = null;
      el.char.addEventListener('dragstart', function (e) { e.preventDefault(); });
      el.char.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') e.preventDefault(); d = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y, moved: false }; try { el.char.setPointerCapture(e.pointerId); } catch (x) {} });
      el.char.addEventListener('pointermove', function (e) {
        if (!d) return; var dx = e.clientX - d.sx, dy = e.clientY - d.sy;
        if (!d.moved && Math.abs(dx) + Math.abs(dy) > 6) { d.moved = true; d.flips = []; d.lx = e.clientX; el.char.classList.add('drag'); if (curMood !== 'excited') mood('excited', 1600); }
        if (d.moved) {
          place(d.px + dx, d.py + dy, false); quietUntil = Date.now() + 30000;
          var dd = e.clientX - d.lx;
          if (Math.abs(dd) > 7) { var dir = dd > 0 ? 1 : -1, now = Date.now(); if (d.dir && dir !== d.dir) { d.flips.push(now); d.flips = d.flips.filter(function (t) { return now - t < 1500; }); if (d.flips.length >= 5 && now - lastDizzy > 12000) { lastDizzy = now; d.flips = []; showRemark(rnd(SK.t.DIZZY), 'dizzy'); } } d.dir = dir; d.lx = e.clientX; }
        }
      });
      el.char.addEventListener('pointerup', function () { if (!d) return; var m = d.moved; d = null; el.char.classList.remove('drag'); if (m) { savePos(); return; }
        var n = Date.now(); taps.push(n); taps = taps.filter(function (t) { return n - t < 2500; });
        if (taps.length >= 4) { taps = []; showRemark(rnd(SK.t.TICKLE), 'giggle'); return; }
        if (bubbleOpen) closeBubble(); else API.help();
      });
      el.char.addEventListener('pointercancel', function () { d = null; el.char.classList.remove('drag'); });
      el.char.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bubbleOpen ? closeBubble() : API.help(); } });

      document.addEventListener('pointermove', function (e) {
        if (!el.eyes || st.off) return;
        var r = el.char.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.6;
        var dx = e.clientX - cx, dy = e.clientY - cy, L = Math.sqrt(dx * dx + dy * dy) || 1, m = Math.min(1, L / 160) * 2.6;
        eyeT = 'translate(' + (dx / L * m).toFixed(2) + 'px,' + (dy / L * m).toFixed(2) + 'px)'; el.eyes.style.transform = eyeT; lastPtr = Date.now();
      }, { passive: true });
      ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, activity, { passive: true, capture: true }); });
      var lastMove = 0; document.addEventListener('pointermove', function () { var n = Date.now(); if (n - lastMove > 400) { lastMove = n; activity(); } }, { passive: true });

      window.addEventListener('resize', function () { place(pos.x, pos.y, false); });
      window.addEventListener('orientationchange', function () { setTimeout(function () { place(pos.x, pos.y, false); }, 200); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bubbleOpen) closeBubble(); });

      var sp = loadPos(), a = anchors()[0];
      if (sp) { place(sp.fx * vw(), sp.fy * vh(), false); setTimeout(API.arrive, 300); }
      else { pos = { x: a.x, y: vh() + 120 }; place(a.x, vh() + 120, false); setTimeout(function () { place(a.x, a.y, true); }, 400); }
      scheduleMicro(); breakCheck(); setInterval(breakCheck, 30000);
      applyOff(); wander(); requestAnimationFrame(loop); setInterval(tick, 1000);
      nextRemark = 40 + Math.random() * 25;
      if (cfg.intro && !st.met && !st.off) setTimeout(showIntro, 1800);
    },
    ask: function (o) {
      if (!el.char || st.off || !talkOk()) return;
      if (o.id && (st.mute[o.id] || (shownIds[o.id] && !o.repeat))) return;
      if (bubbleOpen || introActive || (cfg.intro && !st.met)) { if (o.id && !shownIds['q' + o.id]) { shownIds['q' + o.id] = 1; queue.push(o); } return; }
      if (o.id) shownIds[o.id] = 1;
      showAsk(o);
    },
    help: function () {
      var o = cfg.tapHelp ? cfg.tapHelp() : null;
      if (!o) o = { text: 'Hallo, ich bin ' + SK.name + '!', tip: 'Tippe auf mich, wenn du Hilfe brauchst. Du kannst mich auch verschieben.' };
      showAsk({ id: '', text: o.text, tip: o.tip });
    },
    greetHome: function (o) {
      o = o || {}; if (!el.char || st.off) return;
      var t = o.text || greetText();
      if (bubbleOpen || introActive || (cfg.intro && !st.met)) return;
      showRemark(t, 'excited', null, o.hint || '');
    },
    arrive: function () { if (!el.char || st.off) return; el.char.classList.add('walk'); setTimeout(function () { if (el.char) el.char.classList.remove('walk'); }, 800); mood('excited', 1500); },
    _break: function (min) { sset(SK.key + '-t0', String(Date.now() - min * 60000)); },
    say: function (text, m) { if (!el.char || st.off) return; curAsk = null; showRemark(text, m || 'happy'); },
    react: function (m, text) { if (!el.char || st.off) return; if (text && !bubbleOpen && !introActive && !st.quiet) showRemark(text, m); else mood(m, 2600); lastAct = Date.now(); },
    mood: function (m, ms) { mood(m, ms); },
    _remark: function () { if (el.char) remark(); },
    _idle: function (sec) { lastAct = Date.now() - sec * 1000; }, // nur zum Testen
    hide: function () { st.off = true; save(); closeBubble(); applyOff(); },
    show: function () { st.off = false; save(); applyOff(); }
  };
  function applyOff() {
    if (!el.char) return;
    el.char.style.display = st.off ? 'none' : ''; el.back.style.display = st.off ? 'block' : 'none';
    el.back.style.bottom = 'calc(10px + env(safe-area-inset-bottom,0px))'; el.back.style.left = '128px';
  }
  window.Kolbi = API;
})();
