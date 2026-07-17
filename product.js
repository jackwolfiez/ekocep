import { categories as catalogCategories, products as catalogProducts } from "./products-data.js";

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
const allProducts = catalogProducts.map((product) => ({
  ...product,
  img: product.image,
  colors: [colorValues[product.color] || colorValues.Standart]
}));
drawer?.querySelectorAll(".cart-empty-collection").forEach((card, index) => {
  const product = allProducts[index] || allProducts[0];
  if (!product) return;
  card.href = productUrl(product);
  const image = card.querySelector("img");
  const label = card.querySelector("span");
  if (image) {
    image.src = product.image;
    image.alt = product.name;
  }
  if (label) label.textContent = product.subcategory || product.category;
});
const requestedId = new URLSearchParams(window.location.search).get("id");
const currentProduct = allProducts.find((product) => product.id === requestedId) || allProducts[0];
const relatedProducts = allProducts
  .filter((product) => product.id !== currentProduct.id && product.category === currentProduct.category)
  .concat(allProducts.filter((product) => product.id !== currentProduct.id))
  .slice(0, 4);
const productCartItem = {
  name: currentProduct.name,
  price: currentProduct.price,
  image: currentProduct.image
};
const specLabels = [
  "Uyumlu Modeller",
  "Ürün Ağırlığı",
  "Malzeme Cinsi",
  "Usb Çıkış Sayısı",
  "Çıkış Voltaj (V)",
  "Giriş Voltaj (V)",
  "Şarj Tipi",
  "Otomatik Şarj Kesme",
  "Kablo Dış Materyal",
  "Kablo Tipi",
  "Hızlı Şarj Desteği",
  "Görüntü Aktarım Desteği",
  "Data Aktarım Hızı ( Mb/S)",
  "Kablo Uzunluğu (Cm.)",
  "Medya Kontrol Tuşları",
  "Kulaklık Tipi",
  "Mikrofon Var Mı ?",
  "Çocuklar İçin Uygun mu ?",
  "Kamera Adedi",
  "Kamera Pil Kapasitesi (Mah)",
  "Paket İçeriği",
  "Kılıf Adı",
  "Seri",
  "Stand Olarak Kullanım",
  "Ürün Kalınlık (Mm)",
  "Yapışkan Türü",
  "Baskı Türü",
  "Ürün Menşei/Ülke",
  "Bağlantı Tipi",
  "Kullanım Tipi",
  "Garanti Durumu",
  "Ürün Durumu",
  "Çıkış Amper (Mah)",
  "Renk"
];

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function parseProductSpecs(product) {
  if (Array.isArray(product.specs) && product.specs.length) {
    return product.specs
      .filter((spec) => spec.label && spec.value)
      .map((spec) => ({ label: spec.label, value: spec.value }));
  }

  const description = String(product.description || "").replace(/^Özellikler\s*/i, "").trim();
  const matches = specLabels
    .flatMap((label) => {
      const positions = [];
      let startIndex = 0;
      while (startIndex < description.length) {
        const index = description.indexOf(label, startIndex);
        if (index === -1) break;
        positions.push({ label, index, end: index + label.length });
        startIndex = index + label.length;
      }
      return positions;
    })
    .sort((a, b) => a.index - b.index || b.label.length - a.label.length);

  const rows = matches
    .filter((match, index, list) => index === 0 || match.index !== list[index - 1].index)
    .map((match, index, list) => {
      const next = list[index + 1];
      const value = description.slice(match.end, next?.index ?? description.length).trim();
      return { label: match.label, value };
    })
    .filter((row) => row.value);

  if (!rows.some((row) => row.label === "Renk") && product.color) {
    rows.unshift({ label: "Renk", value: product.color });
  }

  return rows.length ? rows : [
    { label: "Kategori", value: product.subcategory || product.category },
    { label: "Renk", value: product.color || "Standart" }
  ];
}

const categoryGroups = catalogCategories.reduce((groups, category) => {
  const existing = groups.get(category.parent) || { label: category.parent, href: "./index.html#shop", children: [], productIds: [] };
  existing.productIds.push(...category.productIds);
  if (category.child) {
    existing.children.push({ label: category.child, href: "./index.html#shop", productIds: category.productIds });
  }
  groups.set(category.parent, existing);
  return groups;
}, new Map());
const categories = Array.from(categoryGroups.values());

const menuProducts = allProducts.slice(0, 4);

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
  const productsContainer = searchDrawer?.querySelector(".search-products");
  const emptyState = document.querySelector("[data-search-empty]");
  if (!searchDrawer || !toggles.length) return;
  if (productsContainer) {
    productsContainer.innerHTML = allProducts
      .map(
        (product) => `
          <a href="${productUrl(product)}" class="search-product-card" data-search-item="${product.name}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
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

function hydrateProductDetail() {
  document.title = `${currentProduct.name} - Ekocep`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", currentProduct.description);

  const breadcrumbCurrent = document.querySelector(".product-breadcrumb span:last-child");
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;

  const breadcrumbCategory = document.querySelector(".product-breadcrumb a:nth-of-type(2)");
  if (breadcrumbCategory) breadcrumbCategory.textContent = currentProduct.subcategory || currentProduct.category;

  const title = document.querySelector(".product-info-panel h1");
  if (title) title.textContent = currentProduct.name;

  const price = document.querySelector(".product-price");
  if (price) price.textContent = currentProduct.price;

  const stock = document.querySelector(".product-stock");
  if (stock) stock.textContent = "Stoktan hızlı teslimat";

  const galleryImages = [currentProduct.image, ...(currentProduct.images || []), currentProduct.hoverImg].filter(Boolean);
  const uniqueImages = Array.from(new Set(galleryImages));
  const thumbList = document.querySelector(".product-thumb-list");
  if (thumbList) {
    thumbList.innerHTML = uniqueImages
      .map(
        (image, index) => `
          <button type="button" class="product-thumb ${index === 0 ? "is-active" : ""}" data-product-image="${image}" aria-label="Görsel ${index + 1}">
            <img src="${image}" alt="" loading="lazy" />
          </button>
        `
      )
      .join("");
  }

  const mainImage = document.querySelector("#product-main-image");
  if (mainImage) {
    mainImage.src = currentProduct.image;
    mainImage.alt = currentProduct.name;
  }

  document.querySelectorAll("[data-selected-color], [data-selected-color-copy]").forEach((output) => {
    output.textContent = currentProduct.color || "Standart";
  });
  document.querySelectorAll("[data-selected-material], [data-selected-material-copy]").forEach((output) => {
    output.textContent = "Standart";
  });

  const swatchRow = document.querySelector(".product-swatch-row");
  if (swatchRow) {
    const swatch = currentProduct.colors?.[0] || colorValues.Standart;
    swatchRow.innerHTML = `<button type="button" class="product-swatch is-active" data-option-group="color" data-option-value="${currentProduct.color || "Standart"}" style="--swatch: ${swatch}" aria-label="${currentProduct.color || "Standart"}"></button>`;
  }

  const materialRow = document.querySelector(".product-material-row");
  if (materialRow) {
    materialRow.innerHTML = `<button type="button" class="product-material is-active" data-option-group="material" data-option-value="Standart">Standart</button>`;
  }

  const storeCardImage = document.querySelector(".product-store-card img");
  if (storeCardImage) storeCardImage.src = currentProduct.image;
  const storeCardName = document.querySelector(".product-store-card .font-semibold");
  if (storeCardName) storeCardName.textContent = currentProduct.name;

  const featureTitle = document.querySelector(".product-feature-grid h2");
  if (featureTitle) featureTitle.textContent = "Ürün Özellikleri";
  const featureList = document.querySelector(".product-feature-grid ul");
  if (featureList) {
    featureList.innerHTML = `
      <li>Kategori: ${currentProduct.subcategory || currentProduct.category}</li>
      <li>Renk: ${currentProduct.color || "Standart"}</li>
      <li>Ekocep vitrininde güncel ürün listesine dahil edildi</li>
      <li>Kaynak ürün bilgileri Nettech Store sayfasından alınmıştır</li>
    `;
  }

  const specTable = document.querySelector(".product-spec-table");
  if (specTable) {
    specTable.innerHTML = parseProductSpecs(currentProduct)
      .map(
        (spec) => `
          <div class="product-spec-row">
            <div class="product-spec-label">${escapeHtml(spec.label)}</div>
            <div class="product-spec-value">${escapeHtml(spec.value)}</div>
          </div>
        `
      )
      .join("");
  }

  const relatedGrid = document.querySelector(".related-products-grid");
  if (relatedGrid) {
    relatedGrid.innerHTML = relatedProducts
      .map(
        (product) => `
          <article class="related-product-card">
            <a href="${productUrl(product)}" class="related-product-media" aria-label="${product.name}">
              <img src="${product.image}" alt="${product.name}" loading="lazy" />
            </a>
            <div class="related-product-body">
              <a href="${productUrl(product)}">${product.name}</a>
              <span>${product.price}</span>
            </div>
          </article>
        `
      )
      .join("");
  }
}

function renderFooterCatalogLinks() {
  const columns = document.querySelectorAll(".site-footer-links > div");
  const collectionColumn = columns[2];
  const bestsellerColumn = columns[3];
  if (collectionColumn) {
    collectionColumn.innerHTML = `
      <h3>Koleksiyonlar</h3>
      ${catalogCategories.slice(0, 5).map((category) => `<a href="./index.html#shop">${category.child || category.parent}</a>`).join("")}
    `;
  }
  if (bestsellerColumn) {
    bestsellerColumn.innerHTML = `
      <h3>Çok Satanlar</h3>
      ${allProducts.slice(0, 5).map((product) => `<a href="${productUrl(product)}">${product.name}</a>`).join("")}
    `;
  }
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
  hydrateProductDetail();
  renderFooterCatalogLinks();
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
