/* Station 3: Kugelpackungen */
(function () {
  'use strict';
  Prog.add('m3', 3);
  Prog.onFinish('m3', function () { $('m3merke').hidden = false; });
  function fig(sq) {
    var s = '<svg viewBox="0 0 200 170" role="img" aria-label="' + (sq ? 'Quadratische' : 'Hexagonale') + ' Anordnung"><rect width="200" height="170" fill="#fff"/>';
    for (var j = 0; j < 4; j++) for (var i = 0; i < 4; i++) {
      var x = 30 + i * 40 + (sq ? 0 : (j % 2) * 20), y = 25 + j * (sq ? 40 : 34.64);
      s += '<circle cx="' + x + '" cy="' + y + '" r="20" fill="#93c5fd" stroke="#1e3a8a" stroke-width="1.5"/>';
    }
    return s + '<text x="100" y="164" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">Anordnung ' + (sq ? 'A' : 'B') + '</text></svg>';
  }
  $('m3fig').innerHTML = fig(true) + fig(false);
  mc($('m3a'), {
    q: '<b>Aufgabe 1.</b> Welche Anordnung der Atome in einer Schicht nutzt den Platz besser?',
    opts: ['Anordnung B, weil weniger Lücken zwischen den Kugeln bleiben', 'Anordnung A, weil jede Kugel vier gleichmäßige Nachbarn hat', 'Beide gleich, weil in beiden die Kugeln dieselbe Größe haben', 'Anordnung A, weil die Kugeln dort genau übereinander liegen'], ok: 0, mod: 'm3',
    why: 'In der hexagonalen Anordnung berührt jede Kugel sechs Nachbarn.',
    hints: { 1: 'Zähle die Nachbarn und die freien Flächen zwischen den Kreisen in beiden Bildern.', 2: 'Gleich große Kugeln lassen sich trotzdem verschieden dicht anordnen.', 3: 'Quadratisch angeordnete Kugeln lassen größere Lücken frei.' },
    after: function () { var r = $('m3r1'); r.hidden = false; r.innerHTML = 'Quadratisch: Koordinationszahl 4, 78,5 % der Fläche ausgefüllt. Hexagonal: Koordinationszahl 6, 90,7 % der Fläche ausgefüllt.'; }
  });
  // Stapel-Modell
  var d = 40, h = d * Math.sqrt(3) / 2, sv = $('m3sv'), third = null, seen = {};
  function layer(dx, dy, r, fill, op) {
    var s = '';
    for (var j = -1; j < 6; j++) for (var i = -1; i < 8; i++) {
      var x = 30 + i * d + (((j % 2) + 2) % 2) * d / 2 + dx, y = 20 + j * h + dy;
      if (x > 8 && x < 352 && y > 8 && y < 242) s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" fill-opacity="' + op + '" stroke="#334155" stroke-width="1"/>';
    }
    return s;
  }
  function draw() {
    var s = layer(0, 0, 19, '#93c5fd', .95) + layer(d / 2, h / 3, 14, '#fdba74', .95);
    if (third === 'A') s += layer(0, 0, 9, '#1d4ed8', .95); else if (third === 'C') s += layer(d, 2 * h / 3, 9, '#16a34a', .95);
    sv.innerHTML = s;
  }
  function pick(k) {
    third = k; seen[k] = 1; draw();
    $('m3r2').innerHTML = k === 'A' ? 'Schichtfolge A B A B …: <b>hexagonal dichteste Kugelpackung (hdp)</b>, z. B. Magnesium und Zink. Koordinationszahl 12, 74 % Raumausfüllung.' : 'Schichtfolge A B C A B C …: <b>kubisch-flächenzentrierte Packung (kfz)</b>, z. B. Kupfer, Aluminium, Gold. Koordinationszahl 12, 74 % Raumausfüllung.';
  }
  $('m3x').onclick = function () { pick('A'); }; $('m3y').onclick = function () { pick('C'); };
  $('m3z').onclick = function () { third = null; $('m3r2').textContent = 'Lege Schicht 3.'; draw(); };
  draw();
  mc($('m3b'), {
    q: '<b>Aufgabe 2.</b> Welche Aussage über die beiden dichtesten Kugelpackungen stimmt?',
    opts: ['Beide haben Koordinationszahl 12 und unterscheiden sich in der Schichtfolge', 'Die hexagonale Packung hat Koordinationszahl 12, die kubische dagegen nur 8', 'Beide füllen 68 % des Raumes aus und unterscheiden sich in der Dichte', 'Die kubische Packung ist dichter, weil sie drei verschiedene Schichten enthält'], ok: 0, mod: 'm3',
    why: 'Bei ABAB… und ABCABC… hat jedes Atom 12 Nachbarn und 74 % des Raumes sind gefüllt. Nur die Lage der dritten Schicht ist anders.',
    hints: { 1: 'Auch die kubisch-flächenzentrierte Packung hat 12 Nachbarn je Atom.', 2: 'Die dichtesten Packungen füllen 74 % aus. 68 % gelten für das kubisch-raumzentrierte Gitter.', 3: 'Die Schichtfolge verändert die Raumausfüllung nicht.' }
  });
  mc($('m3c'), {
    q: '<b>Aufgabe 3.</b> Kupfer, Aluminium und Gold (kubisch-flächenzentriert) lassen sich besonders gut verformen. Was ist der Grund?',
    opts: ['Dicht gepackte Schichten gleiten in mehreren Richtungen leicht aufeinander', 'Die Atome sind locker gepackt und lassen sich leicht zusammendrücken', 'Das Elektronengas ist dort dichter und macht die Schichten weich', 'Die Atomrümpfe sind kleiner und lassen sich dadurch leichter verformen'], ok: 0, mod: 'm3',
    why: 'Dicht gepackte Netzebenen können in mehreren Raumrichtungen gegeneinander gleiten. Das Metall gibt nach, ohne zu brechen.',
    hints: { 1: 'Diese Gitter sind gerade sehr dicht gepackt (74 %).', 2: 'Ein dichteres Elektronengas macht Metalle eher fester, nicht weicher.', 3: 'Die Größe der Rümpfe erklärt nicht die vielen Gleitrichtungen.' }
  });
})();
