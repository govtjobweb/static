(function () {
  function setupTicker(root) {
    var speed = parseInt(root.getAttribute("data-speed"), 10);
    if (!speed || speed < 30) speed = 90;

    var viewport = root.querySelector(".wplt-ticker__viewport");
    var track = root.querySelector(".wplt-ticker__track");
    if (!viewport || !track) return;

    // Measure widths
    var viewportW = viewport.getBoundingClientRect().width;
    var trackW = track.scrollWidth;

    // Start from outside right edge
    var startX = viewportW;

    // End when the whole track is outside left edge
    var endX = -trackW;

    // Total travel distance (px)
    var travel = startX - endX;

    // Duration (seconds) = distance / speed(px/sec)
    var duration = Math.max(6, Math.round(travel / speed));

    // Apply CSS variables used by keyframes
    root.style.setProperty("--wplt-start", startX + "px");
    root.style.setProperty("--wplt-end", endX + "px");
    root.style.setProperty("--wplt-duration", duration + "s");
  }

  function init() {
    document.querySelectorAll(".wplt-ticker").forEach(setupTicker);

    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        document.querySelectorAll(".wplt-ticker").forEach(setupTicker);
      }, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
