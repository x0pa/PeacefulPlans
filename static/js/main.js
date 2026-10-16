document.addEventListener("scroll", function () {
  var bar = document.getElementById("progressLine");
  if (!bar) return;
  var h = document.documentElement;
  var max = h.scrollHeight - h.clientHeight;
  var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
  bar.style.width = pct + "%";
}, { passive: true });
