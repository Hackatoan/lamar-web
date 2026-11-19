// Adds a tiny rock-paper-scissors warm-up under the command list so visitors
// can try Lamar's `lamar rps` game right on the page before inviting him.
// Pure client-side: Math.random() for Lamar's pick, score lives in memory only.
(function () {
  var L = {
    en: ["Warm up before you face him", "Rock", "Paper", "Scissors", "Lamar threw", "You win. Lucky.", "Lamar wins. Obviously.", "Draw. Run it back.", "You", "Lamar", "Play the real thing in Discord:"],
    es: ["Calienta antes de enfrentarlo", "Piedra", "Papel", "Tijeras", "Lamar sacó", "Ganaste. Pura suerte.", "Gana Lamar. Obvio.", "Empate. Otra vez.", "Tú", "Lamar", "Juega de verdad en Discord:"],
    "pt-br": ["Aqueça antes de encarar ele", "Pedra", "Papel", "Tesoura", "Lamar jogou", "Você venceu. Sorte.", "Lamar venceu. Óbvio.", "Empate. De novo.", "Você", "Lamar", "Jogue de verdade no Discord:"],
    fr: ["Échauffe-toi avant de l'affronter", "Pierre", "Papier", "Ciseaux", "Lamar a joué", "Tu gagnes. Coup de chance.", "Lamar gagne. Évidemment.", "Égalité. On rejoue.", "Toi", "Lamar", "Joue pour de vrai sur Discord :"],
    de: ["Wärm dich auf, bevor du gegen ihn antrittst", "Stein", "Papier", "Schere", "Lamar nahm", "Du gewinnst. Glück gehabt.", "Lamar gewinnt. Natürlich.", "Unentschieden. Nochmal.", "Du", "Lamar", "Spiel es richtig auf Discord:"],
    vi: ["Khởi động trước khi đấu với anh ta", "Búa", "Bao", "Kéo", "Lamar ra", "Bạn thắng. Hên thôi.", "Lamar thắng. Hiển nhiên.", "Hòa. Làm lại.", "Bạn", "Lamar", "Chơi thật trên Discord:"],
    th: ["วอร์มอัพก่อนเจอเขา", "ค้อน", "กระดาษ", "กรรไกร", "Lamar ออก", "คุณชนะ ฟลุ๊คน่ะ", "Lamar ชนะ แน่นอนอยู่แล้ว", "เสมอ เอาใหม่", "คุณ", "Lamar", "เล่นของจริงใน Discord:"]
  };
  var t = L[(document.documentElement.lang || "en").toLowerCase()] || L.en;
  var grid = document.querySelector("#commands .cmd-grid");
  if (!grid) return;

  // index 0 rock, 1 paper, 2 scissors; (a - b + 3) % 3 === 1 means a beats b
  var MOVES = [["✊", t[1]], ["✋", t[2]], ["✌️", t[3]]];
  var score = [0, 0];

  var box = document.createElement("div");
  box.className = "rps-demo";
  var title = document.createElement("h3");
  title.textContent = t[0];
  var row = document.createElement("div");
  row.className = "rps-moves";
  var result = document.createElement("p");
  result.className = "rps-result";
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  var tally = document.createElement("p");
  tally.className = "rps-score";
  var hint = document.createElement("p");
  hint.className = "rps-hint";
  hint.appendChild(document.createTextNode(t[10] + " "));
  var code = document.createElement("code");
  code.textContent = "lamar rps rock";
  hint.appendChild(code);

  function renderScore() { tally.textContent = t[8] + " " + score[0] + " – " + score[1] + " " + t[9]; }

  function play(you) {
    var lamar = Math.floor(Math.random() * 3);
    var outcome = (you - lamar + 3) % 3; // 0 draw, 1 you win, 2 Lamar wins
    if (outcome === 1) score[0]++;
    else if (outcome === 2) score[1]++;
    result.textContent = t[4] + " " + MOVES[lamar][0] + " " + MOVES[lamar][1] + ". " + [t[7], t[5], t[6]][outcome];
    renderScore();
  }

  MOVES.forEach(function (m, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "rps-move";
    b.textContent = m[0];
    b.title = m[1];
    b.setAttribute("aria-label", m[1]);
    b.addEventListener("click", function () { play(i); });
    row.appendChild(b);
  });

  renderScore();
  box.appendChild(title);
  box.appendChild(row);
  box.appendChild(result);
  box.appendChild(tally);
  box.appendChild(hint);
  grid.parentNode.insertBefore(box, grid.nextSibling);
})();
