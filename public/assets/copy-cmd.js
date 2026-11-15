// Adds a copy-to-clipboard button to each command card so visitors can paste
// a ready-to-run command straight into Discord. Placeholders like [message] or
// [rock|paper|scissors] are dropped so the pasted text is a valid prefix.
(function () {
  var L = {
    en: ["Copy", "Copied!", "Copy command"],
    es: ["Copiar", "¡Copiado!", "Copiar comando"],
    "pt-br": ["Copiar", "Copiado!", "Copiar comando"],
    fr: ["Copier", "Copié !", "Copier la commande"],
    de: ["Kopieren", "Kopiert!", "Befehl kopieren"],
    vi: ["Sao chép", "Đã chép!", "Sao chép lệnh"],
    th: ["คัดลอก", "คัดลอกแล้ว!", "คัดลอกคำสั่ง"]
  };
  var t = L[(document.documentElement.lang || "en").toLowerCase()] || L.en;

  function toCommand(text) {
    var stripped = text.replace(/\s*\[[^\]]*\]/g, "").trim();
    return stripped === text.trim() ? stripped : stripped + " ";
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok ? Promise.resolve() : Promise.reject();
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  var cards = document.querySelectorAll(".cmd-card");
  for (var i = 0; i < cards.length; i++) {
    (function (card) {
      var name = card.querySelector(".cmd-name");
      if (!name) return;
      var cmd = toCommand(name.textContent);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cmd-copy";
      btn.textContent = t[0];
      btn.setAttribute("aria-label", t[2] + ": " + cmd.trim());
      var timer;
      btn.addEventListener("click", function () {
        copy(cmd).then(function () {
          btn.textContent = t[1];
          btn.classList.add("copied");
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.textContent = t[0];
            btn.classList.remove("copied");
          }, 1500);
        }, function () {});
      });
      card.appendChild(btn);
    })(cards[i]);
  }
})();
