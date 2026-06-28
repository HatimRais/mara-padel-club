/* =========================================================
   MĀRA — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Header: solid on scroll ---------- */
  const header = document.querySelector(".site-header");
  const isInterior = header && header.classList.contains("interior");
  const onScroll = () => {
    if (!header) return;
    const past = window.scrollY > 40;
    header.classList.toggle("is-solid", past || isInterior && window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
      const open = document.body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("menu-open"))
    );
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = Array.from(document.querySelectorAll(".reveal, .img-mask"));

  // Immediate check: reveal anything already within (or near) the viewport.
  const revealInView = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for (let i = reveals.length - 1; i >= 0; i--) {
      const el = reveals[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add("in");
        reveals.splice(i, 1);
      }
    }
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }
  // Always run an immediate + scroll-based fallback so content never stays hidden.
  revealInView();
  requestAnimationFrame(revealInView);
  window.addEventListener("scroll", revealInView, { passive: true });
  window.addEventListener("load", revealInView);
  window.addEventListener("resize", revealInView, { passive: true });

  /* ---------- Hero parallax (subtle) ---------- */
  const heroImg = document.querySelector(".hero__media img, .pagehero__media img");
  if (heroImg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroImg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
      },
      { passive: true }
    );
  }

  /* ---------- Animated logo: replay draw on hover ---------- */
  document.querySelectorAll(".brand").forEach((brand) => {
    const logo = brand.querySelector(".brand-logo");
    if (!logo) return;
    let playing = true;
    const onEnd = () => (playing = false);
    logo.addEventListener("animationend", onEnd);
    brand.addEventListener("mouseenter", () => {
      if (playing || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      logo.classList.remove("animate");
      void logo.offsetWidth; // force reflow to restart the animation
      logo.classList.add("animate");
      playing = true;
    });
  });

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Booking widget (demo) ---------- */
  const form = document.querySelector("#booking-form");
  if (form) {
    const dateInput = form.querySelector("#b-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      if (!dateInput.value) dateInput.value = today;
    }
    const result = document.querySelector("#slot-result");
    const slotsWrap = document.querySelector("#slots");
    const summary = document.querySelector("#slot-summary");

    const baseSlots = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "21:30"];

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!slotsWrap) return;
      slotsWrap.innerHTML = "";
      // pseudo-random availability seeded by date+court so it feels real
      const date = form.querySelector("#b-date").value || "today";
      const court = form.querySelector("#b-court").value || "1";
      let seed = 0;
      (date + court).split("").forEach((c) => (seed += c.charCodeAt(0)));
      baseSlots.forEach((t, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "slot";
        btn.textContent = t;
        if ((seed + i * 7) % 3 === 0) btn.classList.add("taken");
        btn.addEventListener("click", () => {
          slotsWrap.querySelectorAll(".slot").forEach((s) => s.classList.remove("selected"));
          btn.classList.add("selected");
          if (summary) {
            const people = form.querySelector("#b-players").value;
            summary.innerHTML = `Créneau sélectionné — <strong>${t}</strong>, ${date}, Court ${court}, ${people} joueurs. <br><span class="muted">Confirmez par téléphone ou via la conciergerie pour valider votre réservation.</span>`;
          }
        });
        slotsWrap.appendChild(btn);
      });
      if (result) {
        result.classList.add("show");
        if (summary) summary.textContent = "Sélectionnez un horaire disponible ci-dessous.";
      }
    });
  }

  /* ---------- Generic demo forms ---------- */
  document.querySelectorAll("form[data-demo]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = f.querySelector("[data-feedback]");
      if (note) {
        note.textContent = "Merci — votre demande a bien été reçue. Notre conciergerie vous recontactera sous 24h.";
        note.style.color = "var(--clay)";
      }
      f.querySelectorAll("input, textarea, select").forEach((el) => {
        if (el.type !== "submit") el.value = "";
      });
    });
  });
})();
