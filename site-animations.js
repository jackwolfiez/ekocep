let animeApiPromise;

function loadAnime() {
  if (!animeApiPromise) {
    animeApiPromise = import("https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm")
      .then((anime) => ({
        animate: anime.animate || (() => {}),
        stagger: anime.stagger || (() => 0)
      }))
      .catch(() => ({
        animate: () => {},
        stagger: () => 0
      }));
  }
  return animeApiPromise;
}

const hasTargets = (selector) => Boolean(document.querySelector(selector));

function animateIfPresent(animate, selector, params) {
  if (!hasTargets(selector)) return;
  animate(selector, params);
}

function observeGroups(animate, stagger, groups) {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const group = groups[Number(entry.target.dataset.motionGroup)];
        if (!group) return;

        animate(group.selector, {
          opacity: [0, 1],
          y: [group.y ?? 18, 0],
          duration: group.duration ?? 620,
          delay: stagger(group.delay ?? 55),
          ease: "outCubic"
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  groups.forEach((group, index) => {
    const firstElement = document.querySelector(group.selector);
    const parent = group.root ? document.querySelector(group.root) : firstElement?.parentElement;
    if (!parent) return;
    parent.dataset.motionGroup = String(index);
    observer.observe(parent);
  });
}

function bindHeaderHoverMotion(animate) {
  document.querySelectorAll(".commerce-category-nav .has-submenu").forEach((item) => {
    const panel = item.querySelector(".page-category-panel");
    if (!panel) return;

    item.addEventListener("mouseenter", () => {
      animate(panel, {
        opacity: [0, 1],
        y: [8, 0],
        duration: 180,
        ease: "outCubic"
      });
      animate(panel.querySelectorAll("a"), {
        opacity: [0, 1],
        x: [-6, 0],
        duration: 220,
        delay: 18,
        ease: "outCubic"
      });
    });
  });
}

function preparePromoMarquee() {
  document.querySelectorAll(".commerce-promo-track").forEach((track) => {
    if (track.dataset.marqueeReady === "true") return;
    const items = [...track.children];
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.dataset.marqueeReady = "true";
  });
}

export async function initSiteAnimations(page = "general") {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
  preparePromoMarquee();
  if (prefersReducedMotion) return;

  const { animate, stagger } = await loadAnime();

  requestAnimationFrame(() => {
    animateIfPresent(animate, ".commerce-promo", {
      opacity: [0, 1],
      y: [-8, 0],
      duration: 420,
      ease: "outCubic"
    });
    animateIfPresent(animate, ".commerce-utility-inner, .commerce-main, .commerce-nav-row", {
      opacity: [0, 1],
      y: [-10, 0],
      duration: 520,
      delay: stagger(70),
      ease: "outCubic"
    });
    animateIfPresent(animate, ".commerce-category-nav .page-category-item", {
      opacity: [0, 1],
      y: [-6, 0],
      duration: 360,
      delay: stagger(22),
      ease: "outCubic"
    });

    bindHeaderHoverMotion(animate);

    const sharedGroups = [
      { selector: ".site-footer-links > div", root: ".site-footer-links", delay: 45 },
      { selector: ".site-footer-news > *", root: ".site-footer-news", delay: 80 }
    ];

    const pageGroups = {
      home: [
        { selector: "#accessories > a", delay: 35 },
        { selector: "#product-grid article", delay: 55 },
        { selector: "#bold-products > a", delay: 70 },
        { selector: "#features .grid > div", delay: 75 }
      ],
      product: [
        { selector: ".product-gallery, .product-info-panel", root: ".product-detail-grid", delay: 90, y: 22 },
        { selector: ".related-products-grid > *", delay: 65 }
      ],
      content: [
        { selector: ".policy-hero > *", root: ".policy-hero", delay: 85, y: 18 },
        { selector: ".policy-content section", root: ".policy-content", delay: 60 },
        { selector: ".content-card-grid > *, .content-steps > *, .content-posts > *", delay: 55 }
      ],
      general: []
    };

    observeGroups(animate, stagger, [...(pageGroups[page] || []), ...sharedGroups]);
  });
}
