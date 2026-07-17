import { animate, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm";
import { categories as catalogCategories, products as catalogProducts } from "./products-data.js";

const targetDate = new Date("2026-10-10T00:00:00").getTime();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const announcements = [
  "Tüm siparişlerde ücretsiz teslimat",
  "Yeni ürünler yayında",
  "30 gün koşulsuz iade garantisi"
];

const productUrl = (product) => `./product.html?id=${encodeURIComponent(product.id)}`;
const colorValues = {
  Siyah: "#111111",
  Beyaz: "#f7f7f2",
  Gri: "#8a8f98",
  Krem: "#e9dcc5",
  Mavi: "#2563eb",
  Lacivert: "#1e3a8a",
  Turuncu: "#f97316",
  Mor: "#7c3aed",
  Pembe: "#f4a3b8",
  Turkuaz: "#14b8a6",
  Kahverengi: "#8b5e3c",
  "Rose Gold": "#b76e79",
  Standart: "#d1d5db"
};
const withCardFields = (product) => ({
  ...product,
  img: product.image,
  hoverImg: product.hoverImg || product.image,
  colors: [colorValues[product.color] || colorValues.Standart]
});
const allProducts = catalogProducts.map(withCardFields);
const featuredProducts = allProducts.slice(0, 8);
const categoryGroups = catalogCategories.reduce((groups, category) => {
  const existing = groups.get(category.parent) || { label: category.parent, href: "#shop", children: [], productIds: [] };
  existing.productIds.push(...category.productIds);
  if (category.child) {
    existing.children.push({ label: category.child, href: "#shop", productIds: category.productIds });
  }
  groups.set(category.parent, existing);
  return groups;
}, new Map());
const categories = Array.from(categoryGroups.values());

const heroSlides = [
  {
    title: "Teknoloji Ürünleri. <br /> Ekocep'te.",
    copy: "Günlük kullanım, ofis, araç ve mobil yaşam için seçilmiş güncel teknoloji ürünleri.",
    cta: "ÜRÜNLERİ İNCELE",
    ctaHref: "#shop",
    image: "/public/images/hero-lifestyle-tech.png",
    alt: "Ekocep teknoloji ürünleri lifestyle görseli",
    products: featuredProducts.slice(0, 2)
  },
  {
    title: "Güç Her Zaman Yanında.",
    copy: "Powerbank, adaptör ve kablosuz şarj seçenekleriyle cihazların hazır kalsın.",
    cta: "ŞARJ ÜRÜNLERİ",
    ctaHref: "#shop",
    image: "/public/images/hero-lifestyle-power.png",
    alt: "Ekocep powerbank ve şarj ürünleri lifestyle görseli",
    products: allProducts.filter((product) => product.category === "Powerbank").slice(0, 2)
  },
  {
    title: "Ses, Müzik ve Aksesuar.",
    copy: "Kulaklık, hoparlör ve mobil aksesuar kategorilerinde yeni ürünleri keşfet.",
    cta: "POPÜLER ÜRÜNLER",
    ctaHref: "#trending",
    image: "/public/images/hero-lifestyle-audio.png",
    alt: "Ekocep ses ve müzik ürünleri lifestyle görseli",
    products: allProducts.filter((product) => product.category === "Ses ve Müzik").slice(0, 2)
  }
];

const accessories = catalogCategories.slice(0, 9).map((category) => {
  const product = allProducts.find((item) => category.productIds.includes(item.id)) || allProducts[0];
  return { label: category.child || category.parent, href: "#shop", img: product.img };
});

const boldProducts = featuredProducts.slice(0, 7);

const productSets = {
  trending: allProducts.slice(0, 12),
  best: allProducts.slice(0, 12),
  new: allProducts.slice(-12)
};

const menuProducts = featuredProducts.slice(0, 4);
const footerMenuColumns = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "./about.html" },
      { label: "Blog", href: "./blog.html" },
      { label: "İletişim", href: "./contact.html" }
    ]
  },
  {
    title: "Yardım ve Destek",
    links: [
      { label: "Sıkça Sorulan Sorular", href: "./faq.html" },
      { label: "Sipariş Takibi", href: "./order-tracking.html" },
      { label: "Kargo ve Teslimat", href: "./shipping-delivery.html" },
      { label: "İade ve Değişim", href: "./returns-exchanges.html" },
      { label: "Bize Ulaşın", href: "./contact.html" }
    ]
  },
  {
    title: "Alışveriş Rehberi",
    links: [
      { label: "Nasıl Sipariş Verilir?", href: "./how-to-order.html" },
      { label: "Ödeme Seçenekleri", href: "./payment-options.html" },
      { label: "Güvenli Alışveriş", href: "./secure-shopping.html" },
      { label: "Üyelik İşlemleri", href: "./membership.html" },
      { label: "Kampanyalar", href: "./campaigns.html" }
    ]
  },
  {
    title: "Yasal Bilgilendirme",
    links: [
      { label: "Gizlilik Politikası", href: "./privacy-policy.html" },
      { label: "KVKK Aydınlatma Metni", href: "./kvkk.html" },
      { label: "Mesafeli Satış Sözleşmesi", href: "./distance-sales.html" },
      { label: "Üyelik Sözleşmesi", href: "./membership-agreement.html" },
      { label: "Çerez Politikası", href: "./cookie-policy.html" },
      { label: "Hesap ve Veri Silme Talebi", href: "./data-deletion.html" }
    ]
  },
  {
    title: "Popüler Kategoriler",
    links: [
      { label: "Telefon Aksesuarları", href: "#shop" },
      { label: "Şarj Cihazları", href: "#shop" },
      { label: "Kulaklıklar", href: "#shop" },
      { label: "Kablolar", href: "#shop" },
      { label: "Akıllı Saat Aksesuarları", href: "#shop" }
    ]
  }
];

const pad = (number) => number.toString().padStart(2, "0");

function renderHeroSlide(index = 0) {
  const slide = heroSlides[index];
  const image = document.querySelector("#hero-image");
  const video = document.querySelector("#hero-video");
  const title = document.querySelector("#hero-title");
  const copy = document.querySelector("#hero-copy");
  const cta = document.querySelector("#hero-cta");
  const products = document.querySelector("#hero-mini-products");
  const dots = document.querySelector("#hero-dots");

  image.alt = slide.alt;
  if (slide.video) {
    image.classList.add("hidden");
    video.classList.remove("hidden");
    if (video.getAttribute("src") !== slide.video) {
      video.src = slide.video;
    }
    video.play().catch(() => {});
  } else {
    video.pause();
    video.classList.add("hidden");
    image.classList.remove("hidden");
    image.src = slide.image;
  }
  title.innerHTML = slide.title;
  copy.textContent = slide.copy;
  cta.textContent = slide.cta;
  cta.href = slide.ctaHref;
  products.innerHTML = slide.products
    .map(
      (product) => `
        <a href="${product.id ? productUrl(product) : "#shop"}" class="flex items-center gap-3 rounded-2xl bg-white/15 p-2 pr-5 backdrop-blur-md ring-1 ring-white/25 transition hover:bg-white/25">
          <img src="${product.img}" alt="${product.name}" class="h-14 w-14 rounded-xl object-cover" />
          <span class="text-sm leading-tight">
            <span class="block font-medium">${product.name}</span>
            <span class="block text-white/75">İncele</span>
          </span>
        </a>
      `
    )
    .join("");
  dots.innerHTML = heroSlides
    .map(
      (_, dotIndex) => `
        <button
          class="h-2.5 rounded-full transition-all ${dotIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"}"
          data-hero-dot="${dotIndex}"
          aria-label="Slayta git ${dotIndex + 1}"
        ></button>
      `
    )
    .join("");
  animateHeroSlide();
}

function bindHeroSlider() {
  let index = 0;
  let timer;
  const showSlide = (nextIndex) => {
    index = (nextIndex + heroSlides.length) % heroSlides.length;
    renderHeroSlide(index);
    bindHeroDots(showSlide);
  };
  const restartTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(index + 1), 6000);
  };

  document.querySelector("#hero-next").addEventListener("click", () => {
    showSlide(index + 1);
    restartTimer();
  });
  document.querySelector("#hero-prev").addEventListener("click", () => {
    showSlide(index - 1);
    restartTimer();
  });
  showSlide(0);
  restartTimer();
}

function bindHeroDots(showSlide) {
  document.querySelectorAll("[data-hero-dot]").forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.heroDot)));
  });
}

function animateHeroSlide() {
  if (prefersReducedMotion) return;

  animate(["#hero-image:not(.hidden)", "#hero-video:not(.hidden)"], {
    opacity: [0.72, 1],
    scale: [1.035, 1],
    duration: 900,
    ease: "outCubic"
  });

  animate(["#hero-title", "#hero-copy", "#hero-cta", "#hero-mini-products > a"], {
    opacity: [0, 1],
    y: [26, 0],
    duration: 760,
    delay: stagger(90),
    ease: "outCubic"
  });
}

function animateProductGrid() {
  if (prefersReducedMotion) return;

  animate("#product-grid article", {
    opacity: [0, 1],
    y: [20, 0],
    duration: 620,
    delay: stagger(80),
    ease: "outCubic"
  });
}

function bindScrollAnimations() {
  if (prefersReducedMotion) return;

  const groups = [
    { selector: "#accessories > a", delay: 35 },
    { selector: "#bold-products > a", delay: 70 },
    { selector: "#features .grid > div", delay: 80 }
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target.dataset.animateGroup;
        const group = groups[Number(target)];

        animate(group.selector, {
          opacity: [0, 1],
          y: [22, 0],
          duration: 650,
          delay: stagger(group.delay),
          ease: "outCubic"
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  groups.forEach((group, index) => {
    const firstElement = document.querySelector(group.selector);
    const parent = firstElement?.parentElement;
    if (!parent) return;
    parent.dataset.animateGroup = String(index);
    observer.observe(parent);
  });
}

function updateCountdown() {
  const diff = Math.max(0, targetDate - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.querySelector("#days").textContent = `${pad(days)} Gün`;
  document.querySelector("#hours").textContent = `${pad(hours)} Saat`;
  document.querySelector("#minutes").textContent = `${pad(minutes)} Dakika`;
  document.querySelector("#seconds").textContent = `${pad(seconds)} Saniye`;
}

function renderAccessories() {
  const container = document.querySelector("#accessories");
  if (!container) return;
  container.innerHTML = accessories
    .map(
      (item) => `
        <a href="${item.href}" class="category-pill flex items-center gap-3 rounded-full border border-border bg-background py-2 pl-2 pr-6">
          <img src="${item.img}" alt="" loading="lazy" class="h-10 w-10 rounded-full object-cover" />
          <span class="text-sm font-medium">${item.label}</span>
        </a>
      `
    )
    .join("");
}

function renderPopularCategories() {
  const container = document.querySelector(".popular-categories-grid");
  if (!container) return;
  container.innerHTML = catalogCategories.slice(0, 6)
    .map((category) => {
      const product = allProducts.find((item) => category.productIds.includes(item.id)) || allProducts[0];
      return `
        <a href="#shop" class="popular-category-card">
          <span class="popular-category-media">
            <img src="${product.img}" alt="${category.child || category.parent}" loading="lazy" />
          </span>
          <span class="popular-category-title">${category.child || category.parent}</span>
        </a>
      `;
    })
    .join("");
}

function renderFooterCatalogLinks() {
  const container = document.querySelector(".site-footer-links");
  if (!container) return;

  container.innerHTML = footerMenuColumns
    .map(
      (column) => `
        <div>
          <h3>${column.title}</h3>
          ${column.links.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}
        </div>
      `
    )
    .join("");
}

function renderBoldProducts() {
  const container = document.querySelector("#bold-products");
  const repeatedProducts = Array.from({ length: 5 }, (_, cycleIndex) =>
    boldProducts.map((product, productIndex) => ({ ...product, productIndex, cycleIndex }))
  ).flat();

  container.innerHTML = repeatedProducts
    .map((product) => renderBoldProductCard(product, product.productIndex))
    .join("");
  lucide.createIcons();
}

function renderBoldProductCard(product, productIndex) {
  const hasVideo = Boolean(product.video);
  

  return `
        <div class="swiper-slide flexible collection-list--card">
          <div class="flexi_collection_content">
            <div class="collection-card--img style-rounded">
              <a href="${productUrl(product)}" class="flexible-gallery-info product-hover" aria-label="${product.name} detay">
                <div class="flexible-card-info-img">
                  <img src="${product.img}" alt="" loading="lazy" />
                </div>
                <div class="min-w-0">
                  <span class="block truncate product-info-title">${product.name}</span>
                  <product-price-list class="product-price-list">
                    <product-sale-price class="product-price-actual">
                      <span class="product-actual-price">${product.price}</span>
                    </product-sale-price>
                  </product-price-list>
                </div>
                <span class="media-gallery-icon" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.597656 0.640625H10.6242V10.5526H9.37092V2.7556L2.29466 9.75223L1.85098 10.1896L0.96488 9.31362L1.4073 8.87502L8.48482 1.87962H0.597656V0.640625Z" fill="currentColor"></path>
                  </svg>
                </span>
              </a>
              <div class="media-ratio" style="--media-ratio:125%">
                ${
                  hasVideo
                    ? `
                      <video data-video-src="${product.video}" class="media-grid--video" autoplay muted loop playsinline preload="metadata" poster="${product.img}">
                        <source src="${product.video}" type="video/mp4" />
                      </video>
                    `
                    : `<img src="${product.img}" alt="${product.name}" loading="lazy" />`
                }
              </div>
            </div>
          </div>
        </div>
      `;
}

function syncBoldVideoClones(root) {
  const latestTimes = new Map();

  root.querySelectorAll("video[data-video-src]").forEach((video) => {
    if (Number.isFinite(video.currentTime) && video.currentTime > 0) {
      latestTimes.set(video.dataset.videoSrc, video.currentTime);
    }
  });

  root.querySelectorAll("video[data-video-src]").forEach((video) => {
    const savedTime = latestTimes.get(video.dataset.videoSrc);
    if (Number.isFinite(savedTime) && Math.abs(video.currentTime - savedTime) > 0.35) {
      try {
        video.currentTime = savedTime;
      } catch {
        // Metadata can arrive a tick later on cloned loop slides.
      }
    }
    video.play().catch(() => {});
  });
}

function bindBoldCarousel() {
  if (!window.Swiper) return;
  const middleSlideIndex = boldProducts.length * 2;

  const swiper = new window.Swiper("#bold-carousel", {
    loop: false,
    initialSlide: middleSlideIndex,
    speed: prefersReducedMotion ? 0 : 1000,
    slidesPerGroup: 1,
    centeredSlides: true,
    spaceBetween: 8,
    slidesPerView: 1.3,
    navigation: {
      nextEl: "#bold-next",
      prevEl: "#bold-prev"
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 8
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 8
      }
    },
    on: {
      afterInit(swiper) {
        syncBoldVideoClones(swiper.el);
      },
      beforeTransitionStart(swiper) {
        syncBoldVideoClones(swiper.el);
      },
      slideChangeTransitionEnd(swiper) {
        syncBoldVideoClones(swiper.el);
        keepBoldCarouselCentered(swiper);
      }
    }
  });

  window.setInterval(() => syncBoldVideoClones(swiper.el), 1200);
}

function keepBoldCarouselCentered(swiper) {
  const productCount = boldProducts.length;
  const minSafeIndex = productCount;
  const maxSafeIndex = productCount * 4 - 1;

  if (swiper.activeIndex >= minSafeIndex && swiper.activeIndex <= maxSafeIndex) return;

  const realProductIndex = ((swiper.activeIndex % productCount) + productCount) % productCount;
  swiper.slideTo(productCount * 2 + realProductIndex, 0, false);
}

function renderProducts(type = "trending") {
  const container = document.querySelector("#product-grid");
  
  container.innerHTML = productSets[type]
    .map(
      (product) => `
        <article class="popular-product-card group">
          <div class="popular-card-media">
            <a href="${productUrl(product)}" class="popular-card-image-wrap" aria-label="${product.name}">
              <img src="${product.img}" alt="${product.name}" loading="lazy" class="popular-card-image" />
              <img src="${product.hoverImg || product.img}" alt="" loading="lazy" class="popular-card-hover-image" />
            </a>
            ${product.sale ? `<span class="popular-sale-badge">Sale</span>` : ""}
            <div class="popular-card-actions">
              <a href="${productUrl(product)}" class="popular-action-button" aria-label="Hızlı görüntüle: ${product.name}">
                <i data-lucide="eye" class="h-4 w-4"></i>
              </a>
              <button aria-label="Sepete ekle: ${product.name}" class="popular-action-button" type="button" data-cart-add="${product.name}" data-cart-name="${product.name}" data-cart-price="${product.price}" data-cart-img="${product.img}" data-cart-variant="Renk seçimi">
                <i data-lucide="shopping-bag" class="h-4 w-4"></i>
              </button>
            </div>
          </div>
          <div class="popular-card-text">
            <a href="${productUrl(product)}" class="popular-card-title">${product.name}</a>
            <div class="mt-1 flex items-center gap-2 text-sm">
              <span>${product.price}</span>
              ${product.oldPrice ? `<span class="text-muted-foreground line-through">${product.oldPrice}</span>` : ""}
            </div>
            <div class="mt-3 flex gap-2">
              ${product.colors.map((color) => `<span class="h-4 w-4 rounded-full border border-border" style="background-color: ${color}"></span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
  lucide.createIcons();
  animateProductGrid();
}

function bindTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const activeType = button.dataset.tab;
      document.querySelectorAll(".tab-button").forEach((item) => {
        item.classList.remove("is-active");
        item.classList.remove("text-foreground");
        item.classList.add("text-muted-foreground");
        item.querySelector(".tab-dot")?.classList.replace("opacity-100", "opacity-0");
      });
      button.classList.add("is-active");
      button.classList.add("text-foreground");
      button.classList.remove("text-muted-foreground");
      button.querySelector(".tab-dot")?.classList.replace("opacity-0", "opacity-100");
      renderProducts(activeType);
    });
  });
}

function bindAnnouncementControls() {
  let index = 0;
  const output = document.querySelector("#announcement");
  let timer;
  const animateAnnouncement = (direction) => {
    if (prefersReducedMotion) return;
    animate(output, {
      opacity: [0, 1],
      x: [direction * 22, 0],
      duration: 430,
      ease: "outCubic"
    });
  };
  const setAnnouncement = (nextIndex, direction = 1) => {
    index = (nextIndex + announcements.length) % announcements.length;
    output.textContent = announcements[index];
    animateAnnouncement(direction);
  };
  const restartTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => setAnnouncement(index + 1, 1), 4000);
  };

  document.querySelector("#announcement-prev").addEventListener("click", () => {
    setAnnouncement(index - 1, -1);
    restartTimer();
  });
  document.querySelector("#announcement-next").addEventListener("click", () => {
    setAnnouncement(index + 1, 1);
    restartTimer();
  });
  restartTimer();
}

function renderCategories() {
  const list = document.querySelector("#category-list");
  const firstCategory = categories[0];
  list.innerHTML = `
    <div class="grid max-h-[72svh] overflow-y-auto lg:grid-cols-[290px_1fr]">
      <div class="border-b border-border bg-secondary/80 p-4 lg:border-b-0 lg:border-r">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Kategoriler</span>
          <span class="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">${categories.length}</span>
        </div>
        <div class="grid gap-1" id="category-main-list">
          ${categories
            .map(
              (category, index) => {
                const hasChildren = Boolean(category.children?.length);
                return `
                  ${
                    hasChildren
                      ? `
                        <button
                          class="category-tab flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${index === 0 ? "bg-foreground text-background" : "hover:bg-background"}"
                          data-category-index="${index}"
                          type="button"
                        >
                          <span>${category.label}</span>
                          <i data-lucide="chevron-right" class="h-4 w-4"></i>
                        </button>
                      `
                      : `
                        <a href="${category.href}" class="category-direct flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground transition hover:bg-background hover:text-foreground">
                          <span>${category.label}</span>
                          <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
                        </a>
                      `
                  }
                `;
              }
            )
            .join("")}
        </div>
      </div>
      <div class="p-5">
        <div>
          <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Alt Kategoriler</div>
              <h3 id="category-detail-title" class="mt-1 text-2xl font-semibold tracking-tight">${firstCategory.label}</h3>
            </div>
            <a id="category-detail-all" href="${firstCategory.href}" class="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold tracking-[0.12em] text-background">
              TÜMÜNÜ GÖR <i data-lucide="arrow-up-right" class="h-3.5 w-3.5"></i>
            </a>
          </div>
          <div id="category-detail-links" class="grid gap-2 sm:grid-cols-2"></div>
          <div class="mt-6 border-t border-border pt-5">
            <div class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Öne Çıkan Ürünler</div>
            <div id="category-menu-products" class="grid gap-3 sm:grid-cols-2"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  updateCategoryDetail(0);
  bindCategoryTabs();
  lucide.createIcons();
}

function updateCategoryDetail(index) {
  const category = categories[index];
  const links = category.children || [];
  document.querySelector("#category-detail-title").textContent = category.label;
  document.querySelector("#category-detail-all").href = category.href;
  document.querySelector("#category-detail-links").innerHTML = links
    .map(
      (link) => `
        <a href="${link.href}" class="category-link flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background">
          <span>${link.label}</span>
          <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
        </a>
      `
    )
    .join("");
  document.querySelector("#category-menu-products").innerHTML = menuProducts
    .map(
      (product) => `
        <a href="${productUrl(product)}" class="category-product flex items-center gap-3 rounded-lg bg-secondary p-2 transition hover:bg-muted">
          <img src="${product.img}" alt="${product.name}" class="h-14 w-14 rounded-md object-cover" />
          <span class="min-w-0">
            <span class="block truncate text-sm font-semibold">${product.name}</span>
            <span class="mt-0.5 block text-xs text-muted-foreground">${product.price}</span>
          </span>
        </a>
      `
    )
    .join("");
  lucide.createIcons();
}

function bindCategoryTabs() {
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("mouseenter", () => setActiveCategoryTab(tab));
    tab.addEventListener("focus", () => setActiveCategoryTab(tab));
    tab.addEventListener("click", () => setActiveCategoryTab(tab));
  });
}

function setActiveCategoryTab(tab) {
  const index = Number(tab.dataset.categoryIndex);
  document.querySelectorAll(".category-tab").forEach((item) => {
    item.classList.remove("bg-foreground", "text-background");
    item.classList.add("hover:bg-background");
  });
  tab.classList.add("bg-foreground", "text-background");
  tab.classList.remove("hover:bg-background");
  updateCategoryDetail(index);
  if (!prefersReducedMotion) {
    animate("#category-detail-links .category-link", {
      opacity: [0, 1],
      x: [14, 0],
      duration: 280,
      delay: stagger(24),
      ease: "outCubic"
    });
    animate("#category-menu-products .category-product", {
      opacity: [0, 1],
      y: [12, 0],
      duration: 320,
      delay: stagger(35),
      ease: "outCubic"
    });
  }
}

function bindCategoryMenu() {
  const button = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#category-menu");
  const setOpen = (isOpen) => {
    menu.classList.toggle("hidden", !isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen && !prefersReducedMotion) {
      animate("#category-menu", {
        opacity: [0, 1],
        y: [-8, 0],
        duration: 260,
        ease: "outCubic"
      });
      animate("#category-main-list > *", {
        opacity: [0, 1],
        y: [-10, 0],
        duration: 360,
        delay: stagger(28),
        ease: "outCubic"
      });
    }
  };

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(menu.classList.contains("hidden"));
  });
  menu.addEventListener("click", (event) => event.stopPropagation());
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function bindCartDrawer() {
  const drawer = document.querySelector("#cart-drawer");
  const toggle = document.querySelector("#cart-toggle");
  const closeTriggers = document.querySelectorAll("[data-cart-close]");
  const countOutputs = document.querySelectorAll("[data-cart-count]");
  const countLabel = document.querySelector("[data-cart-count-label]");
  const emptyState = drawer.querySelector(".cart-empty-state");
  const emptyExtra = drawer.querySelector("[data-cart-empty-extra]");
  const filledState = drawer.querySelector("[data-cart-filled]");
  const itemImage = drawer.querySelector("[data-cart-item-image]");
  const itemName = drawer.querySelector("[data-cart-item-name]");
  const itemVariant = drawer.querySelector("[data-cart-item-variant]");
  const itemQuantity = drawer.querySelector("[data-cart-item-quantity]");
  const itemPrice = drawer.querySelector("[data-cart-item-price]");
  const subtotal = drawer.querySelector("[data-cart-subtotal]");
  const qtyMinus = drawer.querySelector("[data-cart-qty-minus]");
  const qtyPlus = drawer.querySelector("[data-cart-qty-plus]");
  const removeButton = drawer.querySelector("[data-cart-remove]");
  drawer.querySelectorAll(".cart-empty-collection").forEach((card, index) => {
    const product = featuredProducts[index] || featuredProducts[0];
    if (!product) return;
    card.href = productUrl(product);
    const image = card.querySelector("img");
    const label = card.querySelector("span");
    if (image) {
      image.src = product.img;
      image.alt = product.name;
    }
    if (label) label.textContent = product.subcategory || product.category;
  });
  let cartCount = 0;
  let cartItem = {
    name: featuredProducts[0]?.name || "Ürün",
    price: featuredProducts[0]?.price || "Fiyat için iletişime geçin",
    image: featuredProducts[0]?.img || "",
    variant: "Renk seçimi"
  };

  const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, "")) || 0;
  const formatPrice = (value) => `${new Intl.NumberFormat("tr-TR").format(value)} TL`;

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("cart-drawer-open", isOpen);

  };

  const syncCount = () => {
    countOutputs.forEach((output) => {
      output.textContent = String(cartCount);
    });
    if (countLabel) countLabel.textContent = `(${cartCount})`;
    const hasItem = cartCount > 0;
    if (emptyState) emptyState.hidden = hasItem;
    if (emptyExtra) emptyExtra.hidden = hasItem;
    if (filledState) filledState.hidden = !hasItem;
    if (!hasItem) return;
    if (itemImage) itemImage.src = cartItem.image;
    if (itemName) itemName.textContent = cartItem.name;
    if (itemVariant) itemVariant.textContent = cartItem.variant;
    if (itemQuantity) itemQuantity.textContent = String(cartCount);
    if (itemPrice) itemPrice.textContent = cartItem.price;
    if (subtotal) subtotal.textContent = formatPrice(parsePrice(cartItem.price) * cartCount);
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(true);
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!drawer.classList.contains("is-open")) return;
    if (drawer.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-cart-add]");
    if (!addButton) return;
    cartItem = {
      name: addButton.dataset.cartName || addButton.dataset.cartAdd || cartItem.name,
      price: addButton.dataset.cartPrice || cartItem.price,
      image: addButton.dataset.cartImg || cartItem.image,
      variant: addButton.dataset.cartVariant || cartItem.variant
    };
    cartCount += 1;
    syncCount();
    setOpen(true);
  });

  qtyMinus?.addEventListener("click", () => {
    cartCount = Math.max(0, cartCount - 1);
    syncCount();
  });

  qtyPlus?.addEventListener("click", () => {
    cartCount += 1;
    syncCount();
  });

  removeButton?.addEventListener("click", () => {
    cartCount = 0;
    syncCount();
  });

  syncCount();
}

function bindLoginDrawer() {
  const drawer = document.querySelector("#login-drawer");
  const toggles = document.querySelectorAll("[data-login-toggle]");
  const closeTriggers = document.querySelectorAll("[data-login-close]");
  const viewButtons = document.querySelectorAll("[data-login-view]");
  if (!drawer || !toggles.length) return;

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", String(isOpen)));
    document.body.classList.toggle("login-drawer-open", isOpen);
  };

  const setView = (view) => {
    const mainPanel = document.querySelector("#login-main-panel");
    const resetPanel = document.querySelector("#login-reset-panel");
    const createPanel = document.querySelector("#login-create-panel");
    if (!mainPanel || !resetPanel || !createPanel) return;
    mainPanel.hidden = view !== "login";
    resetPanel.hidden = view !== "reset";
    createPanel.hidden = view !== "create";
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setView("login");
      setOpen(true);
    });
  });

  closeTriggers.forEach((trigger) => trigger.addEventListener("click", () => setOpen(false)));
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.loginView));
  });

  document.addEventListener("click", (event) => {
    if (!drawer.classList.contains("is-open")) return;
    if (drawer.contains(event.target) || event.target.closest("[data-login-toggle]")) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function bindSearchDrawer() {
  const drawer = document.querySelector("#search-drawer");
  const toggles = document.querySelectorAll("[data-search-toggle]");
  const closeTriggers = document.querySelectorAll("[data-search-close]");
  const input = document.querySelector("[data-search-input]");
  const clearButton = document.querySelector("[data-search-clear]");
  const productsContainer = drawer?.querySelector(".search-products");
  const emptyState = document.querySelector("[data-search-empty]");
  if (!drawer || !toggles.length) return;
  if (productsContainer) {
    productsContainer.innerHTML = allProducts
      .map(
        (product) => `
          <a href="${productUrl(product)}" class="search-product-card" data-search-item="${product.name}">
            <img src="${product.img}" alt="${product.name}" loading="lazy" />
            <span>
              <strong>${product.name}</strong>
              <small>${product.subcategory || product.category}</small>
            </span>
          </a>
        `
      )
      .join("");
  }
  const items = document.querySelectorAll("[data-search-item]");

  const filterItems = () => {
    const term = (input?.value || "").trim().toLocaleLowerCase("tr");
    let visibleCount = 0;

    items.forEach((item) => {
      const matches = !term || item.dataset.searchItem.toLocaleLowerCase("tr").includes(term);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
  };

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    toggles.forEach((toggle) => toggle.setAttribute("aria-expanded", String(isOpen)));
    document.body.classList.toggle("search-drawer-open", isOpen);
    if (isOpen) window.setTimeout(() => input?.focus(), 120);
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(true);
    });
  });

  closeTriggers.forEach((trigger) => trigger.addEventListener("click", () => setOpen(false)));
  input?.addEventListener("input", filterItems);
  clearButton?.addEventListener("click", () => {
    if (input) input.value = "";
    filterItems();
    input?.focus();
  });

  document.addEventListener("click", (event) => {
    if (!drawer.classList.contains("is-open")) return;
    if (drawer.contains(event.target) || event.target.closest("[data-search-toggle]")) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  filterItems();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  bindHeroSlider();
  renderAccessories();
  renderPopularCategories();
  renderFooterCatalogLinks();
  renderBoldProducts();
  bindBoldCarousel();
  renderProducts("trending");
  renderCategories();
  bindScrollAnimations();
  bindTabs();
  bindAnnouncementControls();
  bindCategoryMenu();
  bindCartDrawer();
  bindLoginDrawer();
  bindSearchDrawer();
  lucide.createIcons();
});
