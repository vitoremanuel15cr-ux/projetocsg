/* ==========================================================================
   Script do site (JS leve)
   - Menu mobile (abrir/fechar)
   - Link ativo conforme rolagem (scrollspy)
   - Animações suaves de entrada (IntersectionObserver)
   - Modal simples para a galeria
   ========================================================================== */

(() => {
  const body = document.body;
  const root = document.documentElement;

  /* ---------------------------
     Ano automático no footer
  ---------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------
     Tema (claro/escuro)
  ---------------------------- */
  const themeToggle = document.querySelector(".theme-toggle");
  const themeStorageKey = "theme";
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

  const getTheme = () => {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved === "light" || saved === "dark") return saved;
    return prefersLight.matches ? "light" : "dark";
  };

  const renderThemeToggle = (theme) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (icon) icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  const applyTheme = (theme, { persist } = { persist: false }) => {
    root.setAttribute("data-theme", theme);
    renderThemeToggle(theme);
    if (persist) localStorage.setItem(themeStorageKey, theme);
  };

  applyTheme(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = (root.getAttribute("data-theme") || "dark") === "dark" ? "light" : "dark";
      applyTheme(next, { persist: true });
    });
  }

  prefersLight.addEventListener("change", () => {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved === "light" || saved === "dark") return;
    applyTheme(getTheme());
  });

  /* ---------------------------
     Menu mobile
  ---------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  const setNavOpen = (open) => {
    body.classList.toggle("nav-open", open);
    if (navToggle) navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => setNavOpen(!body.classList.contains("nav-open")));
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!body.classList.contains("nav-open")) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    const clickedInsideNav = !!target.closest(".site-nav");
    const clickedToggle = !!target.closest(".nav-toggle");
    if (!clickedInsideNav && !clickedToggle) setNavOpen(false);
  });

  /* ---------------------------
     Scrollspy (link ativo)
  ---------------------------- */
  const sectionIds = navLinks
    .map((a) => a.getAttribute("href"))
    .filter((href) => typeof href === "string" && href.startsWith("#"))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el) => el instanceof HTMLElement);

  const setActiveLink = (id) => {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("is-active", href === `#${id}`);
    });
  };

  if (sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible || !(visible.target instanceof HTMLElement)) return;
        setActiveLink(visible.target.id);
      },
      { root: null, threshold: [0.25, 0.4, 0.6] }
    );

    sections.forEach((sec) => spy.observe(sec));
  }

  /* ---------------------------
     Animações de entrada
  ---------------------------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------
     Modal da galeria
  ---------------------------- */
  const modal = document.getElementById("modal");
  const modalMedia = document.getElementById("modalMedia");
  const modalCaption = document.getElementById("modalCaption");
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));

  const getThumbClass = (index) => {
    const map = { 1: "g1", 2: "g2", 3: "g3", 4: "g4" };
    return map[index] || "g1";
  };

  const openModal = ({ full, caption }) => {
    if (!modal || !modalMedia) return;
    const thumbClass = getThumbClass(Number(full));
    modalMedia.className = `modal-media ${thumbClass}`;
    if (modalCaption) modalCaption.textContent = caption || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
  };

  galleryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const full = btn.getAttribute("data-full") || "1";
      const captionEl = btn.querySelector(".gallery-caption");
      const caption = captionEl ? captionEl.textContent.trim() : "";
      openModal({ full, caption });
    });
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const shouldClose = target.matches('[data-close="true"]') || !!target.closest('[data-close="true"]');
      if (shouldClose) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal || modal.getAttribute("aria-hidden") === "true") return;
    closeModal();
  });

  /* ---------------------------
     3D Card Hover Effect
  ---------------------------- */
  const cards = document.querySelectorAll('.card-hover-3d');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();
