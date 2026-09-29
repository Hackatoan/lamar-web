(function () {
  var controller = new AbortController();
  var timeout = setTimeout(function () { controller.abort(); }, 5000);
  fetch("https://lamar-api.hackatoa.com/stats", { signal: controller.signal })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.guilds) document.getElementById("lamar-server-count").textContent = d.guilds.toLocaleString();
    })
    .catch(function () {})
    .finally(function () { clearTimeout(timeout); });
})();
