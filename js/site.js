/* =================================================================
   Mantelzorgmakelaar Anneke — site.js (vanilla)
   Fullscreen mobiel menu · tellers · testimonials · staggered reveal
   ================================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initCounters();
    initTestimonials();
    initReveal();
  });

  /* ---------- mobiel menu (fullscreen) ---------- */
  function initMobileMenu() {
    var toggle  = document.getElementById("navToggle");
    var menu    = document.getElementById("mobileNav");
    var closeBt = document.getElementById("navClose");
    if (!toggle || !menu) return;

    function open() {
      menu.classList.remove("opacity-0", "invisible", "pointer-events-none");
      menu.classList.add("opacity-100");
      document.body.classList.add("overflow-hidden");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      menu.classList.add("opacity-0", "invisible", "pointer-events-none");
      menu.classList.remove("opacity-100");
      document.body.classList.remove("overflow-hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", open);
    if (closeBt) closeBt.addEventListener("click", close);
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- tellers ---------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    if (!("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
    function animate(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0, dur = 1700, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------- testimonials slider ---------- */
  function initTestimonials() {
    var track = document.getElementById("testiTrack");
    if (!track) return;
    var prev = document.getElementById("testiPrev"), next = document.getElementById("testiNext");
    function go(dir) {
      var card = track.querySelector("[data-testi]");
      var amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
  }

  /* ---------- staggered reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("reveal"); });
        var idx = sibs.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 0.08 : 0) + "s";
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
})();
