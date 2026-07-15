const drawer = document.querySelector("#cart-drawer");
const cartToggle = document.querySelector("#cart-toggle");
const closeTriggers = document.querySelectorAll("[data-cart-close]");
const countOutputs = document.querySelectorAll("[data-cart-count]");
const countLabel = document.querySelector("[data-cart-count-label]");
const quantityInput = document.querySelector("#product-quantity");

let cartCount = 0;

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

  syncCartCount();
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

document.addEventListener("DOMContentLoaded", () => {
  bindGallery();
  bindOptions();
  bindQuantity();
  bindCartDrawer();
  lucide.createIcons();
});
