const drawer = document.querySelector("#cart-drawer");
const cartToggle = document.querySelector("#cart-toggle");
const closeTriggers = document.querySelectorAll("[data-cart-close]");
const countOutputs = document.querySelectorAll("[data-cart-count]");
const countLabel = document.querySelector("[data-cart-count-label]");
const quantityInput = document.querySelector("#product-quantity");
const cartEmptyState = drawer?.querySelector(".cart-empty-state");
const cartEmptyExtra = drawer?.querySelector("[data-cart-empty-extra]");
const cartFilledState = drawer?.querySelector("[data-cart-filled]");
const cartItemImage = drawer?.querySelector("[data-cart-item-image]");
const cartItemName = drawer?.querySelector("[data-cart-item-name]");
const cartItemVariant = drawer?.querySelector("[data-cart-item-variant]");
const cartItemQuantity = drawer?.querySelector("[data-cart-item-quantity]");
const cartItemPrice = drawer?.querySelector("[data-cart-item-price]");
const cartSubtotal = drawer?.querySelector("[data-cart-subtotal]");
const cartQtyMinus = drawer?.querySelector("[data-cart-qty-minus]");
const cartQtyPlus = drawer?.querySelector("[data-cart-qty-plus]");
const cartRemove = drawer?.querySelector("[data-cart-remove]");

let cartCount = 0;
const productCartItem = {
  name: "Kablosuz Kulaklık",
  price: "22.999 TL",
  image: "https://supreme-realm.myshopify.com/cdn/shop/files/Supreme_Realm_pro-3.jpg?v=1767809480&width=300"
};

const categories = [
  {
    label: "Telefon / Tablet",
    href: "./index.html#shop",
    children: [
      { label: "Cep Telefonu", href: "./index.html#shop" },
      { label: "Tablet", href: "./index.html#shop" }
    ]
  },
  { label: "Teknoloji Ürünleri", href: "./index.html#shop" },
  { label: "Powerbank", href: "./index.html#shop" },
  {
    label: "Şarj Cihazı",
    href: "./index.html#shop",
    children: [
      { label: "Şarj Aleti", href: "./index.html#shop" },
      { label: "Kablosuz Şarj", href: "./index.html#shop" },
      { label: "Araç Şarj Aleti", href: "./index.html#shop" }
    ]
  },
  {
    label: "Kablo",
    href: "./index.html#shop",
    children: [
      { label: "Şarj ve Data Kablosu", href: "./index.html#shop" },
      { label: "Otg ve Dönüştürücü Kablo", href: "./index.html#shop" },
      { label: "Hdmi ve Audio Kablosu", href: "./index.html#shop" }
    ]
  },
  {
    label: "Ses ve Müzik",
    href: "./index.html#shop",
    children: [
      { label: "Bluetooth Kulaklık", href: "./index.html#shop" },
      { label: "Kulak Üstü Kulaklık", href: "./index.html#shop" },
      { label: "Hoparlör", href: "./index.html#shop" },
      { label: "Kulak İçi Kulaklık", href: "./index.html#shop" }
    ]
  },
  {
    label: "Aksesuar",
    href: "./index.html#shop",
    children: [
      { label: "Monopod - Tripod", href: "./index.html#shop" },
      { label: "Araç Tutucu", href: "./index.html#shop" },
      { label: "Telefon - Tablet Standı", href: "./index.html#shop" },
      { label: "Aydınlatma Lamba", href: "./index.html#shop" },
      { label: "Diğer Aksesuarlar", href: "./index.html#shop" }
    ]
  },
  {
    label: "Giyilebilir Teknoloji",
    href: "./index.html#shop",
    children: [
      { label: "Akıllı Saat", href: "./index.html#shop" },
      { label: "Akıllı Saat Aksesuarları", href: "./index.html#shop" },
      { label: "Aksiyon Kamera", href: "./index.html#shop" }
    ]
  },
  {
    label: "Hafıza Ürünleri",
    href: "./index.html#shop",
    children: [
      { label: "Usb Bellek", href: "./index.html#shop" },
      { label: "Hafıza Kartı", href: "./index.html#shop" }
    ]
  },
  {
    label: "Telefon Kılıfı",
    href: "./index.html#shop",
    children: [
      { label: "Arka Koruma Kılıf", href: "./index.html#shop" },
      { label: "Kapaklı Kılıf", href: "./index.html#shop" },
      { label: "Diğer Kılıflar", href: "./index.html#shop" }
    ]
  }
];

const menuProducts = [
  { name: "Echo Pods Neo", price: "14.999 TL", img: "/public/images/pods.jpg" },
  { name: "Aura Hoparlör", price: "12.999 TL", img: "/public/images/p-pulse.jpg" },
  { name: "Miras Ses", price: "22.999 TL", img: "/public/images/p-heritage.jpg" },
  { name: "Noise Guard Elite", price: "31.999 TL", img: "/public/images/p-noise.jpg" }
];

function setCartOpen(isOpen) {
  if (!drawer || !cartToggle) return;
  drawer.classList.toggle("is-open", isOpen);
  drawer.setAttribute("aria-hidden", String(!isOpen));
  cartToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("cart-drawer-open", isOpen);
}

function syncCartCount() {
  countOutputs.forEach((output) => {
    output.textContent = String(cartCount);
  });
  if (countLabel) countLabel.textContent = `(${cartCount})`;
  const hasItem = cartCount > 0;
  if (cartEmptyState) cartEmptyState.hidden = hasItem;
  if (cartEmptyExtra) cartEmptyExtra.hidden = hasItem;
  if (cartFilledState) cartFilledState.hidden = !hasItem;
  if (!hasItem) return;

  const color = document.querySelector("[data-selected-color]")?.textContent || "Kahverengi";
  const material = document.querySelector("[data-selected-material]")?.textContent || "Krom";
  const priceValue = Number(productCartItem.price.replace(/[^\d]/g, "")) || 0;
  if (cartItemImage) cartItemImage.src = productCartItem.image;
  if (cartItemName) cartItemName.textContent = productCartItem.name;
  if (cartItemVariant) cartItemVariant.textContent = `Renk: ${color}, Materyal: ${material}`;
  if (cartItemQuantity) cartItemQuantity.textContent = String(cartCount);
  if (cartItemPrice) cartItemPrice.textContent = productCartItem.price;
  if (cartSubtotal) cartSubtotal.textContent = `${new Intl.NumberFormat("tr-TR").format(priceValue * cartCount)} TL`;
}

function bindCartDrawer() {
  cartToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setCartOpen(true);
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => setCartOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!drawer?.classList.contains("is-open")) return;
    if (drawer.contains(event.target) || cartToggle?.contains(event.target)) return;
    setCartOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setCartOpen(false);
  });

  document.querySelectorAll("[data-product-add]").forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += Number(quantityInput?.value || 1);
      syncCartCount();
      setCartOpen(true);
    });
  });

  cartQtyMinus?.addEventListener("click", () => {
    cartCount = Math.max(0, cartCount - 1);
    syncCartCount();
  });

  cartQtyPlus?.addEventListener("click", () => {
    cartCount += 1;
    syncCartCount();
  });

  cartRemove?.addEventListener("click", () => {
    cartCount = 0;
    syncCartCount();
  });

  syncCartCount();
}

function bindLoginDrawer() {
  const loginDrawer = document.querySelector("#login-drawer");
  const toggles = document.querySelectorAll("[data-login-toggle]");
  const closeTriggers = document.querySelectorAll("[data-login-close]");
  const viewButtons = document.querySelectorAll("[data-login-view]");
  if (!loginDrawer || !toggles.length) return;

  const setOpen = (isOpen) => {
    loginDrawer.classList.toggle("is-open", isOpen);
    loginDrawer.setAttribute("aria-hidden", String(!isOpen));
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
    if (!loginDrawer.classList.contains("is-open")) return;
    if (loginDrawer.contains(event.target) || event.target.closest("[data-login-toggle]")) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function bindSearchDrawer() {
  const searchDrawer = document.querySelector("#search-drawer");
  const toggles = document.querySelectorAll("[data-search-toggle]");
  const closeTriggers = document.querySelectorAll("[data-search-close]");
  const input = document.querySelector("[data-search-input]");
  const clearButton = document.querySelector("[data-search-clear]");
  const items = document.querySelectorAll("[data-search-item]");
  const emptyState = document.querySelector("[data-search-empty]");
  if (!searchDrawer || !toggles.length) return;

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
    searchDrawer.classList.toggle("is-open", isOpen);
    searchDrawer.setAttribute("aria-hidden", String(!isOpen));
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
    if (!searchDrawer.classList.contains("is-open")) return;
    if (searchDrawer.contains(event.target) || event.target.closest("[data-search-toggle]")) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  filterItems();
}

function bindGallery() {
  const mainImage = document.querySelector("#product-main-image");
  document.querySelectorAll("[data-product-image]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-product-image]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      if (!mainImage) return;
      mainImage.style.opacity = "0";
      window.setTimeout(() => {
        mainImage.src = button.dataset.productImage;
        mainImage.style.opacity = "1";
      }, 120);
    });
  });
}

function bindOptions() {
  document.querySelectorAll("[data-option-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.optionGroup;
      const value = button.dataset.optionValue;
      document.querySelectorAll(`[data-option-group="${group}"]`).forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      document.querySelectorAll(`[data-selected-${group}]`).forEach((output) => {
        output.textContent = value;
      });
      document.querySelectorAll(`[data-selected-${group}-copy]`).forEach((output) => {
        output.textContent = value;
      });
    });
  });
}

function bindQuantity() {
  const setQuantity = (value) => {
    if (!quantityInput) return;
    quantityInput.value = String(Math.max(1, Number(value) || 1));
  };

  document.querySelector("[data-qty-minus]")?.addEventListener("click", () => {
    setQuantity(Number(quantityInput.value) - 1);
  });

  document.querySelector("[data-qty-plus]")?.addEventListener("click", () => {
    setQuantity(Number(quantityInput.value) + 1);
  });

  quantityInput?.addEventListener("change", () => setQuantity(quantityInput.value));
}

function renderProductCategories() {
  const list = document.querySelector("#product-category-list");
  if (!list) return;
  const firstCategory = categories[0];

  list.innerHTML = `
    <div class="grid max-h-[72svh] overflow-y-auto lg:grid-cols-[290px_1fr]">
      <div class="border-b border-border bg-secondary/80 p-4 lg:border-b-0 lg:border-r">
        <div class="mb-4 flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Kategoriler</span>
          <span class="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">${categories.length}</span>
        </div>
        <div class="grid gap-1" id="product-category-main-list">
          ${categories
            .map((category, index) => {
              const hasChildren = Boolean(category.children?.length);
              return hasChildren
                ? `
                  <button
                    class="product-category-tab flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${index === 0 ? "bg-foreground text-background" : "hover:bg-background"}"
                    data-category-index="${index}"
                    type="button"
                  >
                    <span>${category.label}</span>
                    <i data-lucide="chevron-right" class="h-4 w-4"></i>
                  </button>
                `
                : `
                  <a href="${category.href}" class="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground transition hover:bg-background hover:text-foreground">
                    <span>${category.label}</span>
                    <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
                  </a>
                `;
            })
            .join("")}
        </div>
      </div>
      <div class="p-5">
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Alt Kategoriler</div>
            <h3 id="product-category-detail-title" class="mt-1 text-2xl font-semibold tracking-tight">${firstCategory.label}</h3>
          </div>
          <a id="product-category-detail-all" href="${firstCategory.href}" class="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold tracking-[0.12em] text-background">
            TÜMÜNÜ GÖR <i data-lucide="arrow-up-right" class="h-3.5 w-3.5"></i>
          </a>
        </div>
        <div id="product-category-detail-links" class="grid gap-2 sm:grid-cols-2"></div>
        <div class="mt-6 border-t border-border pt-5">
          <div class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Öne Çıkan Ürünler</div>
          <div id="product-category-menu-products" class="grid gap-3 sm:grid-cols-2"></div>
        </div>
      </div>
    </div>
  `;

  updateProductCategoryDetail(0);
  bindProductCategoryTabs();
}

function updateProductCategoryDetail(index) {
  const category = categories[index];
  const links = category.children || [];
  document.querySelector("#product-category-detail-title").textContent = category.label;
  document.querySelector("#product-category-detail-all").href = category.href;
  document.querySelector("#product-category-detail-links").innerHTML = links
    .map(
      (link) => `
        <a href="${link.href}" class="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background">
          <span>${link.label}</span>
          <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
        </a>
      `
    )
    .join("");

  document.querySelector("#product-category-menu-products").innerHTML = menuProducts
    .map(
      (product) => `
        <a href="./product.html" class="flex items-center gap-3 rounded-lg bg-secondary p-2 transition hover:bg-muted">
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

function bindProductCategoryTabs() {
  document.querySelectorAll(".product-category-tab").forEach((tab) => {
    tab.addEventListener("mouseenter", () => setActiveProductCategoryTab(tab));
    tab.addEventListener("focus", () => setActiveProductCategoryTab(tab));
    tab.addEventListener("click", () => setActiveProductCategoryTab(tab));
  });
}

function setActiveProductCategoryTab(tab) {
  const index = Number(tab.dataset.categoryIndex);
  document.querySelectorAll(".product-category-tab").forEach((item) => {
    item.classList.remove("bg-foreground", "text-background");
    item.classList.add("hover:bg-background");
  });
  tab.classList.add("bg-foreground", "text-background");
  tab.classList.remove("hover:bg-background");
  updateProductCategoryDetail(index);
}

function bindProductCategoryMenu() {
  const button = document.querySelector("#product-menu-toggle");
  const menu = document.querySelector("#product-category-menu");
  if (!button || !menu) return;

  const setOpen = (isOpen) => {
    menu.classList.toggle("hidden", !isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
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

document.addEventListener("DOMContentLoaded", () => {
  bindGallery();
  bindOptions();
  bindQuantity();
  renderProductCategories();
  bindProductCategoryMenu();
  bindCartDrawer();
  bindLoginDrawer();
  bindSearchDrawer();
  lucide.createIcons();
});
