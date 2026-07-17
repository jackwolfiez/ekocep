import fs from "node:fs/promises";
import { contentPages, renderPageBody } from "../content-page.js";

const header = `
    <header class="policy-header">
      <a href="./index.html" class="policy-logo">Ekocep</a>
      <nav>
        <a href="./index.html">Ana Sayfa</a>
        <a href="./index.html#shop">Mağaza</a>
        <a href="./contact.html">İletişim</a>
      </nav>
    </header>`;

const footer = `
    <footer id="contact" class="site-footer">
      <div class="site-footer-inner">
        <div class="site-footer-news">
          <div>
            <p class="site-footer-kicker">HABERLERE KAYDOL, %10 İNDİRİM KAZAN</p>
            <h2>Ekocep fırsatları ve yeni ürünleri kaçırma.</h2>
          </div>
          <form class="site-footer-form">
            <label for="content-footer-email">E-posta adresin</label>
            <div>
              <input id="content-footer-email" type="email" placeholder="E-posta adresini gir" />
              <button type="button" aria-label="Kaydol">
                <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="site-footer-main">
          <div class="site-footer-links">
            <div><h3>Kurumsal</h3><a href="./about.html">Hakkımızda</a><a href="./blog.html">Blog</a><a href="./contact.html">İletişim</a></div>
            <div><h3>Yardım ve Destek</h3><a href="./faq.html">Sıkça Sorulan Sorular</a><a href="./order-tracking.html">Sipariş Takibi</a><a href="./shipping-delivery.html">Kargo ve Teslimat</a><a href="./returns-exchanges.html">İade ve Değişim</a><a href="./contact.html">Bize Ulaşın</a></div>
            <div><h3>Alışveriş Rehberi</h3><a href="./how-to-order.html">Nasıl Sipariş Verilir?</a><a href="./payment-options.html">Ödeme Seçenekleri</a><a href="./secure-shopping.html">Güvenli Alışveriş</a><a href="./membership.html">Üyelik İşlemleri</a><a href="./campaigns.html">Kampanyalar</a></div>
            <div><h3>Yasal Bilgilendirme</h3><a href="./privacy-policy.html">Gizlilik Politikası</a><a href="./kvkk.html">KVKK Aydınlatma Metni</a><a href="./distance-sales.html">Mesafeli Satış Sözleşmesi</a><a href="./membership-agreement.html">Üyelik Sözleşmesi</a><a href="./cookie-policy.html">Çerez Politikası</a><a href="./data-deletion.html">Hesap ve Veri Silme Talebi</a></div>
            <div><h3>Popüler Kategoriler</h3><a href="./index.html#shop">Telefon Aksesuarları</a><a href="./index.html#shop">Şarj Cihazları</a><a href="./index.html#shop">Kulaklıklar</a><a href="./index.html#shop">Kablolar</a><a href="./index.html#shop">Akıllı Saat Aksesuarları</a></div>
          </div>
        </div>
        <div class="site-footer-bottom">
          <span>&copy; 2026 Ekocep. Tüm hakları saklıdır.</span>
          <a href="#top">Yukarı dön <i data-lucide="arrow-up" class="h-3 w-3"></i></a>
        </div>
      </div>
    </footer>`;

const pageHtml = (key, page) => `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${page.description}" />
    <title>${page.title} - Ekocep</title>
    <link rel="icon" href="/public/favicon.ico" />
    <link rel="stylesheet" href="./styles.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
  </head>
  <body class="bg-background text-foreground antialiased">
${header}
    <main class="policy-page content-page" data-content-page="${key}">
${renderPageBody(page)}
    </main>
${footer}
    <script type="module" src="./content-page.js"></script>
  </body>
</html>
`;

for (const [key, page] of Object.entries(contentPages)) {
  await fs.writeFile(new URL(`../${page.path}`, import.meta.url), pageHtml(key, page), "utf8");
  console.log(`Wrote ${page.path}`);
}
