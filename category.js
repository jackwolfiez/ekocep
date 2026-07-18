import { categories as catalogCategories, products as catalogProducts } from "./products-data.js";
import { initSiteAnimations } from "./site-animations.js";

const productUrl = (product) => `./product.html?id=${encodeURIComponent(product.id)}`;
const categoryUrl = (category, subcategory = "") =>
  `./category.html?category=${encodeURIComponent(category)}${subcategory ? `&subcategory=${encodeURIComponent(subcategory)}` : ""}`;

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
  Natural: "#d8d2c4",
  Standart: "#d1d5db"
};

const allProducts = catalogProducts.map((product) => ({
  ...product,
  img: product.image,
  hoverImg: product.hoverImg || product.image,
  colors: [colorValues[product.color] || colorValues.Standart]
}));

const categoryGroups = catalogCategories.reduce((groups, category) => {
  const existing = groups.get(category.parent) || {
    label: category.parent,
    href: categoryUrl(category.parent),
    children: [],
    productIds: []
  };
  existing.productIds.push(...category.productIds);
  if (category.child) {
    existing.children.push({
      label: category.child,
      href: categoryUrl(category.parent, category.child),
      productIds: category.productIds
    });
  }
  groups.set(category.parent, existing);
  return groups;
}, new Map());

const categories = Array.from(categoryGroups.values());
const params = new URLSearchParams(window.location.search);
let activeProducts = [];

function currentState() {
  const requestedCategory = params.get("category") || categories[0]?.label || "";
  const requestedSubcategory = params.get("subcategory") || "";
  const category = categories.find((item) => item.label === requestedCategory) || categories[0];
  const subcategory = category?.children.find((item) => item.label === requestedSubcategory);
  return { category, subcategory };
}

function productPriceNumber(product) {
  return Number(String(product.price).replace(/[^\d]/g, "")) || 0;
}

function createIcons() {
  window.lucide?.createIcons?.();
}

function renderHeaderCategoryNav() {
  const nav = document.querySelector("#category-category-nav");
  if (!nav) return;

  nav.innerHTML = categories
    .map((category) => {
      const submenu = category.children.length
        ? `
          <div class="page-category-panel">
            <div class="page-category-panel-links">
              ${category.children.map((child) => `<a href="${child.href}">${child.label}</a>`).join("")}
            </div>
          </div>
        `
        : "";

      return `
        <div class="page-category-item${category.children.length ? " has-submenu" : ""}">
          <a href="${category.href}" class="page-category-link">
            <span>${category.label}</span>
            ${category.children.length ? '<i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>' : ""}
          </a>
          ${submenu}
        </div>
      `;
    })
    .join("");
}

function renderSidebar(activeCategory, activeSubcategory) {
  const output = document.querySelector("[data-category-filter-list]");
  if (!output) return;
  const sidebarTitle = document.querySelector(".category-sidebar h2");
  if (sidebarTitle) sidebarTitle.textContent = activeCategory.label;

  output.innerHTML = `
    <div class="category-filter-group">
      <a href="${activeCategory.href}" class="${!activeSubcategory ? "is-active" : ""}">Tüm ${activeCategory.label}</a>
      ${
        activeCategory.children.length
          ? `<div>${activeCategory.children
              .map((child) => `<a href="${child.href}" class="${child.label === activeSubcategory?.label ? "is-active" : ""}">${child.label}</a>`)
              .join("")}</div>`
          : ""
      }
    </div>
    <div class="category-standard-filters">
      <details open>
        <summary>Fiyat</summary>
        <label><input type="checkbox" data-price-filter="0-500" /> 500 TL altı</label>
        <label><input type="checkbox" data-price-filter="500-1500" /> 500 - 1.500 TL</label>
        <label><input type="checkbox" data-price-filter="1500-3000" /> 1.500 - 3.000 TL</label>
        <label><input type="checkbox" data-price-filter="3000-" /> 3.000 TL ve üzeri</label>
      </details>
      <details open>
        <summary>Renk</summary>
        <div data-color-filter-list></div>
      </details>
    </div>
  `;
}

function renderColorFilters(products) {
  const output = document.querySelector("[data-color-filter-list]");
  if (!output) return;
  const colors = [...new Set(products.map((product) => product.color).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
  output.innerHTML = colors.map((color) => `<label><input type="checkbox" data-color-filter="${color}" /> ${color}</label>`).join("");
}

function bindSort(products) {
  const select = document.querySelector("[data-category-sort]");
  if (!select) return;
  select.addEventListener("change", () => {
    const sorted = [...products];
    if (select.value === "price-asc") sorted.sort((a, b) => productPriceNumber(a) - productPriceNumber(b));
    if (select.value === "price-desc") sorted.sort((a, b) => productPriceNumber(b) - productPriceNumber(a));
    if (select.value === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    renderProducts(sorted);
  });
}

function renderProducts(products) {
  const output = document.querySelector("[data-category-products]");
  const count = document.querySelector("[data-category-count]");
  if (count) count.textContent = `${products.length} ürün listeleniyor`;
  if (!output) return;

  output.innerHTML = products
    .map(
      (product) => `
        <article class="popular-product-card group">
          <a href="${productUrl(product)}" class="popular-card-image-wrap" aria-label="${product.name}">
            <img src="${product.img}" alt="${product.name}" class="popular-card-image" loading="lazy" />
            <img src="${product.hoverImg}" alt="" class="popular-card-hover-image" loading="lazy" />
          </a>
          <div class="popular-card-text">
            <a href="${productUrl(product)}" class="popular-card-title">${product.name}</a>
            <div class="mt-1 flex items-center gap-2 text-sm">
              <span>${product.price}</span>
            </div>
            <div class="mt-3 flex gap-2">
              ${product.colors.map((color) => `<span class="h-4 w-4 rounded-full border border-border" style="background-color: ${color}"></span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function filteredProducts() {
  const priceFilters = [...document.querySelectorAll("[data-price-filter]:checked")].map((input) => input.dataset.priceFilter);
  const colorFilters = [...document.querySelectorAll("[data-color-filter]:checked")].map((input) => input.dataset.colorFilter);
  let products = [...activeProducts];

  if (priceFilters.length) {
    products = products.filter((product) =>
      priceFilters.some((range) => {
        const [min, max] = range.split("-").map((value) => (value ? Number(value) : undefined));
        const price = productPriceNumber(product);
        return price >= (min || 0) && (max === undefined || price <= max);
      })
    );
  }

  if (colorFilters.length) {
    products = products.filter((product) => colorFilters.includes(product.color));
  }

  const select = document.querySelector("[data-category-sort]");
  if (select?.value === "price-asc") products.sort((a, b) => productPriceNumber(a) - productPriceNumber(b));
  if (select?.value === "price-desc") products.sort((a, b) => productPriceNumber(b) - productPriceNumber(a));
  if (select?.value === "name-asc") products.sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return products;
}

function refreshProducts() {
  renderProducts(filteredProducts());
}

function renderToolbar(title) {
  const toolbar = document.querySelector(".category-toolbar");
  if (!toolbar) return;

  toolbar.innerHTML = `
    <div>
      <h1 data-category-title>${title}</h1>
      <span data-category-count></span>
    </div>
    <div class="category-toolbar-actions">
      <div class="category-view-toggle" aria-label="Ürün görünümü">
        <button type="button" class="is-active" data-grid-view="4">4'lü</button>
        <button type="button" data-grid-view="5">5'li</button>
      </div>
      <select data-category-sort aria-label="Sıralama">
        <option value="default">Önerilen sıralama</option>
        <option value="price-asc">Fiyat artan</option>
        <option value="price-desc">Fiyat azalan</option>
        <option value="name-asc">İsim A-Z</option>
      </select>
    </div>
  `;
}

function bindListingControls() {
  document.querySelector("[data-category-sort]")?.addEventListener("change", refreshProducts);
  document.querySelectorAll("[data-price-filter], [data-color-filter]").forEach((input) => {
    input.addEventListener("change", refreshProducts);
  });
  document.querySelectorAll("[data-grid-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-grid-view]").forEach((item) => item.classList.toggle("is-active", item === button));
      const grid = document.querySelector("[data-category-products]");
      grid?.classList.toggle("view-5", button.dataset.gridView === "5");
      grid?.classList.toggle("view-4", button.dataset.gridView !== "5");
    });
  });
}

function bindSearchDrawer() {
  const drawer = document.querySelector("#search-drawer");
  const toggles = document.querySelectorAll("[data-search-toggle]");
  const closeTriggers = document.querySelectorAll("[data-search-close]");
  const input = document.querySelector("[data-search-input]");
  const headerSearchInput = document.querySelector(".commerce-search input");
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
      if (input && headerSearchInput?.value) input.value = headerSearchInput.value;
      filterItems();
      setOpen(true);
    });
  });
  document.querySelectorAll(".commerce-search").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input && headerSearchInput?.value) input.value = headerSearchInput.value;
      filterItems();
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
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  filterItems();
}

function bindLoginDrawer() {
  const drawer = document.querySelector("#login-drawer");
  const toggles = document.querySelectorAll("[data-login-toggle]");
  const closeTriggers = document.querySelectorAll("[data-login-close]");
  if (!drawer || !toggles.length) return;
  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("login-drawer-open", isOpen);
  };
  toggles.forEach((toggle) => toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(true);
  }));
  closeTriggers.forEach((trigger) => trigger.addEventListener("click", () => setOpen(false)));
  document.querySelectorAll("[data-login-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-login-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.loginPanel !== button.dataset.loginView;
      });
    });
  });
}

function bindCartDrawer() {
  const drawer = document.querySelector("#cart-drawer");
  const toggle = document.querySelector("#cart-toggle");
  const closeTriggers = document.querySelectorAll("[data-cart-close]");
  if (!drawer || !toggle) return;
  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("cart-drawer-open", isOpen);
  };
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(true);
  });
  closeTriggers.forEach((trigger) => trigger.addEventListener("click", () => setOpen(false)));
}

function renderCategoryPage() {
  const { category, subcategory } = currentState();
  const activeProductIds = subcategory?.productIds || category?.productIds || [];
  const products = allProducts.filter((product) => activeProductIds.includes(product.id));
  const title = subcategory ? subcategory.label : category.label;
  activeProducts = products;

  document.title = `${title} - Ekocep`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `${title} kategorisindeki Ekocep ürünleri.`);
  document.querySelector("[data-category-breadcrumb]").textContent = title;

  renderToolbar(title);
  renderSidebar(category, subcategory);
  renderColorFilters(products);
  bindListingControls();
  refreshProducts();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderCategoryNav();
  renderCategoryPage();
  bindSearchDrawer();
  bindLoginDrawer();
  bindCartDrawer();
  initSiteAnimations("general");
  createIcons();
});
