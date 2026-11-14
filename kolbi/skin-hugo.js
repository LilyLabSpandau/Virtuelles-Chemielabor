/* Hugo – das Wasserstoff-Atom-Maskottchen (Skin für die Kolbi-Engine, nur im Atombauer Klasse 7) */
(function () {
  'use strict';
  var INK = '#3a0f1c';
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }

  var M = {
    happy:      { e: 'o', m: '<path d="M33 48 q7 8 14 0"/>' },
    excited:    { e: 'big', m: '<path d="M32 47 q8 12 16 0 z" fill="#7a1230"/>', ex: '<text x="64" y="16" font-size="13" font-weight="800" fill="#ffd35a" stroke="none">!</text>' },
    interested: { e: 'o', m: '<path d="M35 49 q5 3 10 0"/>', br: '<path d="M26 29 q6 -4 12 -1"/><path d="M42 27 q6 -3 12 1"/>' },
    thinking:   { e: 'side', m: '<path d="M35 50 h10"/>', ex: '<text x="62" y="16" font-size="16" font-weight="800" fill="#ffd35a" stroke="none">?</text>' },
    bored:      { e: 'half', m: '<path d="M34 50 q3 -2 6 0 t6 0"/>' },
    yawn:       { e: 'closed', m: '<ellipse cx="40" cy="49" rx="5" ry="6.5" fill="#7a1230"/>' },
    sleep:      { e: 'closed', m: '<path d="M35 49 q5 3 10 0"/>', ex: '<g class="k-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="62" y="20" font-size="13">Z</text><text x="70" y="9" font-size="9">z</text></g>' },
    oops:       { e: 'small', m: '<path d="M34 51 q3 -4 6 0 q3 4 6 0"/>', br: '<path d="M26 31 l10 3"/><path d="M54 31 l-10 3"/>', ex: '<path d="M60 26 q3 6 0 8 q-3 -2 0 -8z" fill="#7fd0ff" stroke="none"/>' },
    wink:       { e: 'wink', m: '<path d="M32 47 q8 10 16 0"/>' },
    giggle:     { e: 'happy', m: '<path d="M32 46 q8 13 16 0 z" fill="#7a1230"/>' },
    dizzy:      { e: 'x', m: '<path d="M34 50 q3 -4 6 0 q3 4 6 0"/>', ex: '<g class="k-zzz" fill="#ffd35a" stroke="none"><circle cx="22" cy="18" r="2.2"/><circle cx="58" cy="16" r="2.2"/><circle cx="40" cy="10" r="2.2"/></g>' },
    surprised:  { e: 'wide', m: '<ellipse cx="40" cy="49" rx="3" ry="4" fill="#7a1230"/>', br: '<path d="M25 27 q6 -5 12 -1"/><path d="M43 26 q6 -4 12 1"/>' },
    love:       { e: 'heart', m: '<path d="M34 47 q6 8 12 0"/>', ex: '<g class="k-zzz" fill="#ff8fa8" stroke="none" font-weight="800"><text x="62" y="18" font-size="12">♥</text></g>' },
    hum:        { e: 'o', m: '<path d="M34 47 q6 6 12 0"/>', ex: '<g class="k-zzz" fill="#cbd5f5" stroke="none" font-weight="800"><text x="62" y="18" font-size="14">♪</text><text x="6" y="22" font-size="11">♫</text></g>' }
  };
  function dot(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + INK + '"/><circle cx="' + (cx + 1.4) + '" cy="' + (cy - 1.5) + '" r="' + (r * .34).toFixed(1) + '" fill="#fff"/>'; }
  function eyes(k) {
    switch (k) {
      case 'big': return '<g class="k-lid">' + dot(31, 37, 5.2) + dot(49, 37, 5.2) + '</g>';
      case 'wide': return '<g class="k-lid">' + dot(31, 37, 5.8) + dot(49, 37, 5.8) + '</g>';
      case 'small': return '<g class="k-lid"><circle cx="32" cy="38" r="3.6" fill="' + INK + '"/><circle cx="48" cy="38" r="3.6" fill="' + INK + '"/></g>';
      case 'side': return '<g class="k-lid">' + dot(33, 37, 4.4) + dot(51, 37, 4.4) + '</g>';
      case 'half': return '<path d="M26.5 39 a4.5 4.5 0 0 0 9 0 z" fill="' + INK + '" stroke="none"/><path d="M44.5 39 a4.5 4.5 0 0 0 9 0 z" fill="' + INK + '" stroke="none"/><path d="M25.5 39 h11"/><path d="M43.5 39 h11"/>';
      case 'closed': return '<path d="M26 38 q5 4 10 0"/><path d="M44 38 q5 4 10 0"/>';
      case 'happy': return '<path d="M26 39 q5 -9 10 0"/><path d="M44 39 q5 -9 10 0"/>';
      case 'wink': return '<g class="k-lid">' + dot(31, 37, 4.4) + '</g><path d="M44 39 q5 -7 10 0"/>';
      case 'x': return '<path d="M27 34 l8 8 M35 34 l-8 8"/><path d="M45 34 l8 8 M53 34 l-8 8"/>';
      case 'heart': return '<path d="M31 43 c-7 -4 -7 -11 -2.5 -11 c2 0 2.5 1.8 2.5 2.6 c0 -.8 .5 -2.6 2.5 -2.6 c4.5 0 4.5 7 -2.5 11z" fill="#ff4d6d" stroke="none"/><path d="M49 43 c-7 -4 -7 -11 -2.5 -11 c2 0 2.5 1.8 2.5 2.6 c0 -.8 .5 -2.6 2.5 -2.6 c4.5 0 4.5 7 -2.5 11z" fill="#ff4d6d" stroke="none"/>';
      default: return '<g class="k-lid">' + dot(31, 37, 4.4) + dot(49, 37, 4.4) + '</g>';
    }
  }
  function face(m) {
    var d = M[m] || M.happy;
    return '<g id="kolbi-eyes" fill="none" stroke="' + INK + '" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">' + eyes(d.e) + '</g>' +
      '<g fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' + (d.br || '') + '</g>' +
      '<g class="k-mouth" fill="none" stroke="' + INK + '" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">' + d.m + '</g>' +
      '<ellipse cx="24" cy="45" rx="4" ry="2.6" fill="#ff8fa8" opacity=".55"/><ellipse cx="56" cy="45" rx="4" ry="2.6" fill="#ff8fa8" opacity=".55"/>' + (d.ex || '');
  }
  function svg() {
    return '<svg viewBox="0 0 80 80" role="img" aria-label="Hugo, das Wasserstoff-Atom-Maskottchen">' +
      '<defs><radialGradient id="kk-hg" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffc1cb"/><stop offset="1" stop-color="#e0334f"/></radialGradient></defs>' +
      '<g id="hg-ring"><circle cx="40" cy="40" r="35" fill="none" stroke="#7df9ff" stroke-width="1.8" stroke-dasharray="3 3" opacity=".85"/>' +
      '<circle r="4.6" fill="#4fe3ff" stroke="#fff" stroke-width="1.2"><animateMotion dur="4.2s" repeatCount="indefinite" path="M40 5 a35 35 0 1 1 -0.01 0"/></circle></g>' +
      '<g id="hg-core"><circle cx="40" cy="40" r="24" fill="url(#kk-hg)" stroke="rgba(255,255,255,.85)" stroke-width="2.2"/>' +
      '<text x="40" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" stroke="none" opacity=".9">+</text></g>' +
      '<g id="kk-face">' + face('happy') + '</g></svg>';
  }
  function phys(el, ph, tn, amp) {
    var ring = el.root.querySelector('#hg-ring'), core = el.root.querySelector('#hg-core');
    if (ring) ring.setAttribute('transform', 'rotate(' + (tn * 38).toFixed(1) + ' 40 40)');
    if (core) {
      var s = Math.min(0.09, amp * 0.012), a = Math.sin(ph.t * 9) * s;
      core.setAttribute('transform', 'translate(40 40) scale(' + (1 + a).toFixed(3) + ' ' + (1 - a).toFixed(3) + ') translate(-40 -40)');
    }
  }

  window.KolbiSkins = window.KolbiSkins || {};
  window.KolbiSkins.hugo = {
    name: 'Hugo', emoji: '⚛️', key: 'hugo', size: { w: 78, h: 78, wm: 62, hm: 62 },
    svg: svg, face: face, phys: phys,
    t: {
      jokeLead: 'Unlustiger Atom-Witz: ',
      intro: ['Hi, ich bin Hugo ⚛️', 'Ich bin ein Wasserstoff-Atom: ein Proton, ein Elektron und sehr viel Humor. Ich begleite dich beim Atombauen.'],
      NICE: [
        'Du baust das richtig gut. Ich bin beeindruckt!',
        'Du hast ein gutes Gefühl für Atome. Mein Elektron klatscht!',
        'Schön, dass du dran bleibst. Das zahlt sich aus.',
        'Mit dir macht Atombau richtig Spaß!',
        'Du bist wirklich anziehend. Ich meine: Proton-Elektron-mäßig.'
      ],
      MOTIVATION: [
        'Jedes große Atom hat mal klein angefangen, auch ich: ein Proton!',
        'Fehler gehören dazu. Selbst Elektronen springen manchmal auf die falsche Schale.',
        'Bleib dran. Schale für Schale kommst du ans Ziel!',
        'Wer ausprobiert, lernt. Und hier geht nichts kaputt.',
        'Du schaffst das. Ich glaube an dich, und ich habe sogar einen Kern!'
      ],
      JOKES: [
        ['Was sagt ein Elektron, wenn man es anrempelt?', '„Hey, ich bin negativ geladen, nicht nachtragend!“'],
        ['Warum ist Hugo so gut drauf?', 'Er ist positiv.'],
        ['Wieso sind Neutronen so entspannt?', 'Ihnen ist alles egal. Sie sind neutral.'],
        ['Warum geht ein Elektron nie allein auf Reisen?', 'Weil es immer auf seiner Schale bleibt.'],
        ['Treffen sich zwei Atome. Sagt das eine: „Ich glaube, ich habe ein Elektron verloren.“', '„Bist du sicher?“ – „Ja, ich bin ganz positiv.“'],
        ['Warum sind Edelgase so unnahbar?', 'Sie haben die Schale voll und brauchen niemanden.'],
        ['Was macht ein Proton am Wochenende?', 'Es hängt im Kern ab.'],
        ['Wie nennt man ein Atom mit Humor?', 'Hugo.'],
        ['Warum sind Elektronen so sprunghaft?', 'Sie wechseln ständig die Schale.']
      ],
      FACTS: [
        'Wusstest du? Ich bin das einfachste aller Atome: ein Proton und ein Elektron, sonst nichts.',
        'Wusstest du? Fast der ganze Raum in einem Atom ist leer. Der Kern ist winzig im Vergleich zur Hülle.',
        'Wusstest du? Die Masse eines Atoms steckt fast komplett im Kern.',
        'Wusstest du? Auf der ersten Schale haben höchstens 2 Elektronen Platz, auf der zweiten höchstens 8.',
        'Wusstest du? Die Ordnungszahl verrät, wie viele Protonen ein Atom hat.',
        'Wusstest du? Im Universum besteht fast alles Sichtbare aus Wasserstoff und Helium.'
      ],
      GENERIC: [
        'Magst du mit der Maus oder dem Finger an mir ziehen? Ich schwebe gern mit.',
        'Neugier ist die halbe Chemie.',
        'Tipp: Ein neutrales Atom hat genauso viele Elektronen wie Protonen.',
        'Probier ruhig aus. Hier geht nichts kaputt!',
        'Ich kreise gern. Du auch?'
      ],
      TICKLE: ['Hihi, das kitzelt im Kern! 😄', 'Hihihi! Mein Elektron wird ganz nervös!', 'Kitzeln verboten! … na gut, ein bisschen ist okay.'],
      DIZZY: ['Uff, mir wird ganz schwindelig. Ich kreise schon genug!', 'Wow, so schnell flitzt nicht mal ein Elektron!', 'Langsam bitte, mein Elektron kommt nicht hinterher!'],
      BREAK: ['Du arbeitest schon lange. Trink einen Schluck Wasser, ich habe ja auch zwei Wasserstoffe drin. 💧', 'Kleine Pause gefällig? Danach sieht man klarer.'],
      BORED: ['Ähm … hallo? Ist da jemand?', 'Ich zähle mal meine Elektronen. Eins … Moment, das war schon alles.', 'Ist hier gerade Pause? Ich kreise einfach weiter.', '*gähn* Ich hätte Lust auf ein bisschen Atombau.'],
      WAKE: ['Oh! Ich bin kurz eingenickt. Schön, dass du wieder da bist!', 'Huch, da bist du ja wieder! Ich habe nur kurz die Schale zugemacht.']
    }
  };
})();
