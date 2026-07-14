const targetDate = new Date("2026-10-10T00:00:00").getTime();
const announcements = [
  "We offer free delivery on all orders",
  "New arrivals - Fall collection is live",
  "30-day money-back guarantee on every order"
];

const accessories = [
  { label: "Accessories", img: "/public/images/pods.jpg" },
  { label: "Bluetooth Speaker", img: "/public/images/p-pulse.jpg" },
  { label: "Classic Headphones", img: "/public/images/p-heritage.jpg" },
  { label: "Gaming", img: "/public/images/p-noise.jpg" },
  { label: "Home Speaker", img: "/public/images/p-pulse.jpg" },
  { label: "Ocean Beats", img: "/public/images/p-aura.jpg" },
  { label: "Pure Outdoor", img: "/public/images/soft-base.jpg" },
  { label: "Pure Sound", img: "/public/images/earbuds.jpg" },
  { label: "Sleek Earbuds", img: "/public/images/earbuds.jpg" },
  { label: "Smart Device", img: "/public/images/classic.jpg" },
  { label: "Warm Harmony", img: "/public/images/p-heritage.jpg" },
  { label: "Wireless Pods", img: "/public/images/pods.jpg" }
];

const boldProducts = [
  { name: "Echo Pods Neo", price: "$440.00", img: "/public/images/pods.jpg" },
  { name: "Aura Speaker", price: "$390.00", img: "/public/images/p-pulse.jpg" },
  { name: "Wireless Headphone", price: "$680.00", img: "/public/images/p-aura.jpg", wide: true },
  { name: "Aura Luxe Sound", price: "$840.00", img: "/public/images/p-aura.jpg" },
  { name: "Wireless Headphone", price: "$680.00", img: "/public/images/p-heritage.jpg" }
];

const productSets = {
  trending: [
    { name: "Echo Pods Neo", price: "$440.00", img: "/public/images/pods.jpg", colors: ["#111111", "#f4b6c2", "#f5f5f5", "#8b1e1e"] },
    { name: "Heritage Sound", price: "$680.00", oldPrice: "$880.00", sale: true, img: "/public/images/p-heritage.jpg", colors: ["#f2ead6", "#8b1e1e", "#6d6d6d"] },
    { name: "Aura Luxe Sound", price: "$840.00", img: "/public/images/p-aura.jpg", colors: ["#111111", "#8b1e1e", "#6d6d6d", "#cfcfcf"] },
    { name: "Noise Guard Elite", price: "$950.00", oldPrice: "$1,480.00", sale: true, img: "/public/images/p-noise.jpg", colors: ["#111111", "#e8c93a", "#8b1e1e", "#f4b6c2"] }
  ],
  best: [
    { name: "Pulse Base Speaker", price: "$390.00", img: "/public/images/p-pulse.jpg", colors: ["#111111", "#f2ead6", "#8b6b6b"] },
    { name: "Classic Wireless", price: "$720.00", oldPrice: "$860.00", sale: true, img: "/public/images/classic.jpg", colors: ["#111111", "#cfcfcf"] },
    { name: "Soft Base Speaker", price: "$510.00", img: "/public/images/soft-base.jpg", colors: ["#f2ead6", "#8b1e1e", "#6d6d6d"] },
    { name: "Sleek Earbuds", price: "$260.00", img: "/public/images/earbuds.jpg", colors: ["#111111", "#f5f5f5", "#f4b6c2"] }
  ],
  new: [
    { name: "Aura Studio Pods", price: "$590.00", img: "/public/images/p-aura.jpg", colors: ["#111111", "#cfcfcf", "#8b1e1e"] },
    { name: "Noise Guard Mini", price: "$430.00", img: "/public/images/p-noise.jpg", colors: ["#111111", "#e8c93a"] },
    { name: "Outdoor Pure", price: "$480.00", img: "/public/images/soft-base.jpg", colors: ["#f2ead6", "#6d6d6d"] },
    { name: "Base Speakers Duo", price: "$760.00", oldPrice: "$920.00", sale: true, img: "/public/images/base-speakers.jpg", colors: ["#111111", "#8b6b6b", "#f5f5f5"] }
  ]
};

const pad = (number) => number.toString().padStart(2, "0");

function updateCountdown() {
  const diff = Math.max(0, targetDate - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.querySelector("#days").textContent = `${pad(days)} Days`;
  document.querySelector("#hours").textContent = `${pad(hours)} Hours`;
  document.querySelector("#minutes").textContent = `${pad(minutes)} Minutes`;
  document.querySelector("#seconds").textContent = `${pad(seconds)} Seconds`;
}

function renderAccessories() {
  const container = document.querySelector("#accessories");
  container.innerHTML = accessories
    .map(
      (item) => `
        <a href="#shop" class="flex items-center gap-3 rounded-full border border-border bg-background py-2 pl-2 pr-6 transition hover:shadow-md">
          <img src="${item.img}" alt="" loading="lazy" class="h-10 w-10 rounded-full object-cover" />
          <span class="text-sm font-medium">${item.label}</span>
        </a>
      `
    )
    .join("");
}

function renderBoldProducts() {
  const container = document.querySelector("#bold-products");
  container.innerHTML = boldProducts
    .map(
      (product) => `
        <a href="#shop" class="group relative overflow-hidden rounded-2xl bg-secondary ${product.wide ? "lg:row-span-2" : ""}">
          <img src="${product.img}" alt="${product.name}" loading="lazy" class="w-full object-cover transition duration-500 group-hover:scale-105 ${product.wide ? "aspect-[3/5]" : "aspect-square"}" />
          <span class="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-background/90 p-3 backdrop-blur">
            <span class="flex items-center gap-2">
              <span class="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
                <img src="${product.img}" alt="" class="h-full w-full object-cover" />
              </span>
              <span class="text-xs leading-tight">
                <span class="block font-medium">${product.name}</span>
                <span class="block text-muted-foreground">${product.price}</span>
              </span>
            </span>
            <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
          </span>
        </a>
      `
    )
    .join("");
}

function renderProducts(type = "trending") {
  const container = document.querySelector("#product-grid");
  container.innerHTML = productSets[type]
    .map(
      (product) => `
        <article class="group">
          <div class="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
            ${product.sale ? `<span class="absolute left-3 top-3 z-10 rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">Sale</span>` : ""}
            <img src="${product.img}" alt="${product.name}" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <button aria-label="Add ${product.name} to cart" class="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background shadow-md transition group-hover:bg-foreground group-hover:text-background">
              <i data-lucide="plus" class="h-4 w-4"></i>
            </button>
          </div>
          <div class="mt-4">
            <div class="font-medium">${product.name}</div>
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
}

function bindTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const activeType = button.dataset.tab;
      document.querySelectorAll(".tab-button").forEach((item) => {
        item.classList.remove("text-foreground");
        item.classList.add("text-muted-foreground");
        item.querySelector("span")?.remove();
      });
      button.classList.add("text-foreground");
      button.classList.remove("text-muted-foreground");
      button.insertAdjacentHTML("afterbegin", '<span class="h-1.5 w-1.5 rounded-full bg-destructive"></span>');
      renderProducts(activeType);
    });
  });
}

function bindAnnouncementControls() {
  let index = 0;
  const output = document.querySelector("#announcement");
  const setAnnouncement = (nextIndex) => {
    index = (nextIndex + announcements.length) % announcements.length;
    output.textContent = announcements[index];
  };

  document.querySelector("#announcement-prev").addEventListener("click", () => setAnnouncement(index - 1));
  document.querySelector("#announcement-next").addEventListener("click", () => setAnnouncement(index + 1));
}

function bindMobileMenu() {
  const button = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  button.addEventListener("click", () => menu.classList.toggle("hidden"));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => menu.classList.add("hidden")));
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  renderAccessories();
  renderBoldProducts();
  renderProducts("trending");
  bindTabs();
  bindAnnouncementControls();
  bindMobileMenu();
  lucide.createIcons();
});
