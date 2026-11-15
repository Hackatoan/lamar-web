// Adds a "Share Lamar" button under the closing call-to-action, for visitors
// who aren't the server admin and need to pass the link along. Uses the native
// share sheet where available (mostly mobile) and copies the link otherwise.
(function () {
  var L = {
    en: ["Share Lamar", "Link copied!", "Not your server? Send this to whoever runs it."],
    es: ["Compartir Lamar", "¡Enlace copiado!", "¿No es tu servidor? Envíaselo a quien lo administra."],
    "pt-br": ["Compartilhar Lamar", "Link copiado!", "Não é seu servidor? Mande para quem administra."],
    fr: ["Partager Lamar", "Lien copié !", "Pas ton serveur ? Envoie ça à celui qui le gère."],
    de: ["Lamar teilen", "Link kopiert!", "Nicht dein Server? Schick das an den Admin."],
    vi: ["Chia sẻ Lamar", "Đã sao chép liên kết!", "Không phải server của bạn? Gửi cho người quản lý."],
    th: ["แชร์ Lamar", "คัดลอกลิงก์แล้ว!", "ไม่ใช่เซิร์ฟเวอร์ของคุณ? ส่งให้แอดมินเลย"]
  };
  var t = L[(document.documentElement.lang || "en").toLowerCase()] || L.en;
  var cta = document.querySelector(".cta-section .btn-primary");
  if (!cta) return;

  var url = location.origin + location.pathname;
  var data = { title: document.title, url: url };

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

  var wrap = document.createElement("div");
  wrap.className = "cta-share";
  var hint = document.createElement("p");
  hint.className = "cta-share-hint";
  hint.textContent = t[2];
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-secondary";
  btn.textContent = t[0];
  var status = document.createElement("span");
  status.className = "cta-share-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  var timer;
  function done() {
    status.textContent = t[1];
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ""; }, 2000);
  }
  btn.addEventListener("click", function () {
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      navigator.share(data).catch(function (e) {
        if (!e || e.name !== "AbortError") copy(url).then(done, function () {});
      });
    } else {
      copy(url).then(done, function () {});
    }
  });

  wrap.appendChild(hint);
  wrap.appendChild(btn);
  wrap.appendChild(status);
  cta.parentNode.insertBefore(wrap, cta.nextSibling);
})();
