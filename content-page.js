export const contentPages = {
  about: {
    path: "about.html",
    title: "Hakkımızda",
    eyebrow: "Kurumsal",
    description: "Ekocep Ltd. Şti., Bursa Nilüfer merkezli B2C teknoloji ve telefon aksesuarları e-ticaret markasıdır.",
    intro: "Ekocep.com; telefon aksesuarları, şarj çözümleri, kulaklıklar, kablolar ve mobil teknoloji ürünlerinde sade, güvenilir ve ulaşılabilir bir alışveriş deneyimi sunmak için kuruldu.",
    cards: [
      ["map-pin", "Bursa / Nilüfer", "Operasyon merkezimiz Bursa Nilüfer'de yer alır; ürün seçimi ve müşteri desteği süreçleri buradan yönetilir."],
      ["shield-check", "Güvenli alışveriş", "Ödeme sürecinde İyzico altyapısı, kart güvenliği ve 3D Secure destekli ödeme akışları kullanılır."],
      ["package-check", "Seçilmiş ürünler", "Vitrindeki ürünler günlük kullanım, mobil yaşam ve teknoloji aksesuarı ihtiyaçlarına göre düzenlenir."]
    ],
    sections: [
      ["Ekocep yaklaşımı", "B2C teknoloji alışverişinde kullanıcının hızlı karar verebilmesi, ürün bilgilerine rahat ulaşabilmesi ve sipariş sonrası destek alabilmesi bizim için önceliklidir."],
      ["Ürün odağı", "Telefon aksesuarları, şarj cihazları, powerbank, kulaklık, kablo, akıllı saat aksesuarları ve tamamlayıcı teknoloji ürünleri ana ürün odağımızı oluşturur."],
      ["Şeffaf hizmet", "Teslimat, iade, ödeme ve destek süreçleri müşterinin anlayabileceği sade Türkçe ile anlatılır. Yasal metinler düzenlenebilir taslak yapıda tutulur ve ihtiyaç halinde güncellenebilir."]
    ]
  },
  blog: {
    path: "blog.html",
    title: "Blog",
    eyebrow: "Rehberler",
    description: "Telefon aksesuarları, şarj çözümleri ve mobil teknoloji ürünleri hakkında Ekocep blog yazıları.",
    intro: "Mobil teknoloji ürünlerini seçerken dikkat edilecek noktaları, kullanım ipuçlarını ve alışveriş rehberlerini burada topluyoruz.",
    posts: [
      ["Powerbank seçerken nelere dikkat edilmeli?", "Kapasite, çıkış gücü, bağlantı tipi ve taşınabilirlik kriterlerini sade şekilde karşılaştır."],
      ["Type-C kablo alırken önemli detaylar", "Hızlı şarj desteği, veri aktarımı ve kablo dış materyali seçimde belirleyici olabilir."],
      ["Kablosuz kulaklık kullanım ipuçları", "Bağlantı stabilitesi, mikrofon performansı ve günlük bakım önerileri."],
      ["Güvenli online alışveriş kontrol listesi", "SSL, 3D Secure, ödeme sağlayıcısı ve sipariş sonrası destek göstergeleri."]
    ]
  },
  faq: {
    path: "faq.html",
    title: "Sıkça Sorulan Sorular",
    eyebrow: "Yardım ve Destek",
    description: "Ekocep sipariş, ödeme, kargo, iade ve üyelik süreçleri hakkında sıkça sorulan sorular.",
    intro: "Sipariş vermeden önce veya sipariş sonrasında en çok merak edilen konuları kısa yanıtlarla derledik.",
    faq: [
      ["Siparişim ne zaman hazırlanır?", "Siparişler genellikle 1-2 iş günü içinde hazırlanır ve kargo sürecine aktarılır."],
      ["Kargo takip numaramı nereden görebilirim?", "Siparişiniz kargoya verildiğinde takip bilgisi kayıtlı e-posta veya telefon kanalınıza iletilir."],
      ["İade süresi kaç gündür?", "Mesafeli satış kapsamında kullanılmamış ve yeniden satılabilir ürünler için 14 günlük cayma hakkı bulunur."],
      ["Ödemeler güvenli mi?", "Ödeme işlemleri İyzico altyapısı ve desteklenen kartlarda 3D Secure doğrulama ile yürütülür."]
    ]
  },
  "order-tracking": {
    path: "order-tracking.html",
    title: "Sipariş Takibi",
    eyebrow: "Yardım ve Destek",
    description: "Ekocep sipariş numarası ve e-posta veya telefon ile sipariş takip arayüzü.",
    intro: "Sipariş durumunu kontrol etmek için sipariş numaranı ve alışveriş sırasında kullandığın e-posta ya da telefon bilgisini gir.",
    form: "tracking",
    cards: [
      ["receipt-text", "Sipariş numarası", "Sipariş onay e-postasında yer alan numarayı kullan."],
      ["mail", "E-posta veya telefon", "Sipariş sırasında verdiğin iletişim bilgisini gir."],
      ["truck", "Kargo takibi", "Kargoya verilen siparişlerde takip bağlantısı görüntülenebilir."]
    ]
  },
  "shipping-delivery": {
    path: "shipping-delivery.html",
    title: "Kargo ve Teslimat",
    eyebrow: "Yardım ve Destek",
    description: "Ekocep kargo hazırlık, teslimat, takip ve hasarlı teslimat süreçleri.",
    intro: "Siparişlerin güvenli ve takip edilebilir şekilde teslim edilmesi için hazırlık, kargo ve teslimat süreçleri açık şekilde yönetilir.",
    cards: [
      ["package", "Hazırlık", "Siparişler stok ve ödeme kontrolünün ardından genellikle 1-2 iş günü içinde hazırlanır."],
      ["truck", "Kargo takip", "Kargoya verilen gönderiler için takip bilgisi müşteriye iletilir."],
      ["alert-circle", "Hasarlı teslimat", "Paket hasarlı görünüyorsa teslim alırken tutanak tutulması önerilir."]
    ],
    sections: [
      ["Tahmini teslimat", "Teslimat süresi şehir, kargo yoğunluğu ve kampanya dönemlerine göre değişebilir. Ortalama teslimat 2-5 iş günü aralığında planlanır."],
      ["Kargo takip", "Kargo takip numarası oluştuğunda sipariş durumunu kargo firmasının takip ekranından kontrol edebilirsiniz."],
      ["Hasarlı paket", "Dış ambalajda ezilme, yırtılma veya sıvı teması varsa ürünü teslim almadan önce kargo görevlisiyle hasar tutanağı düzenlenmelidir."]
    ]
  },
  "returns-exchanges": {
    path: "returns-exchanges.html",
    title: "İade ve Değişim",
    eyebrow: "Yardım ve Destek",
    description: "Ekocep 14 günlük cayma hakkı, iade koşulları ve değişim süreci.",
    intro: "İade ve değişim talepleri ürünün kullanım durumu, ambalajı, aksesuarları ve yasal cayma hakkı çerçevesinde değerlendirilir.",
    cards: [
      ["rotate-ccw", "14 gün cayma hakkı", "Teslimden itibaren 14 gün içinde iade talebi oluşturulabilir."],
      ["box", "Ürün koşulları", "Ürün kullanılmamış, eksiksiz ve yeniden satılabilir durumda olmalıdır."],
      ["clipboard-check", "Kontrol süreci", "İade ürün depoya ulaştığında kontrol edilir ve ödeme süreci başlatılır."]
    ],
    faq: [
      ["Hangi ürünler iade edilemez?", "Kullanılmış, hasar görmüş, eksik aksesuarla gönderilmiş veya hijyen nedeniyle yeniden satışı uygun olmayan ürünlerde iade kabul edilmeyebilir."],
      ["Değişim yapabilir miyim?", "Stok durumuna göre model, renk veya ürün değişimi için destek ekibimiz yardımcı olabilir."],
      ["Geri ödeme ne zaman yapılır?", "Ürün kontrolü tamamlandıktan sonra geri ödeme ödeme yöntemin üzerinden başlatılır; banka süreleri değişebilir."]
    ]
  },
  "how-to-order": {
    path: "how-to-order.html",
    title: "Nasıl Sipariş Verilir?",
    eyebrow: "Alışveriş Rehberi",
    description: "Ekocep üzerinden ürün seçme, sepete ekleme ve sipariş tamamlama adımları.",
    intro: "Ekocep.com üzerinde ürün seçimi, sepet ve ödeme adımları sade bir alışveriş akışıyla ilerler.",
    steps: ["Ürün kategorisini veya aramayı kullanarak ürünü incele.", "Ürün detayında görselleri, özellikleri ve fiyatı kontrol et.", "Ürünü sepete ekle ve teslimat bilgilerini gir.", "İyzico güvenli ödeme adımında siparişini tamamla."]
  },
  "payment-options": {
    path: "payment-options.html",
    title: "Ödeme Seçenekleri",
    eyebrow: "Alışveriş Rehberi",
    description: "Ekocep İyzico altyapısı, kart ile ödeme ve 3D Secure güvenli ödeme bilgileri.",
    intro: "Ekocep.com ödeme işlemlerinde İyzico altyapısını kullanır. Kart bilgileri güvenli ödeme ekranında işlenir.",
    cards: [
      ["credit-card", "Kredi ve banka kartı", "Desteklenen kartlarla hızlı ve güvenli ödeme yapılabilir."],
      ["shield-check", "3D Secure", "Bankanız destekliyorsa ek doğrulama adımı ile işlem güvenliği artırılır."],
      ["lock", "İyzico altyapısı", "Kart bilgileri Ekocep tarafından saklanmaz; ödeme güvenli sağlayıcı üzerinden tamamlanır."]
    ]
  },
  "secure-shopping": {
    path: "secure-shopping.html",
    title: "Güvenli Alışveriş",
    eyebrow: "Alışveriş Rehberi",
    description: "Ekocep SSL, güvenli ödeme, kişisel veri güvenliği ve sahte işlem önlemleri.",
    intro: "Güvenli alışveriş; ödeme altyapısı, veri güvenliği, şeffaf iletişim ve sipariş takibi gibi birden fazla katmandan oluşur.",
    cards: [
      ["lock-keyhole", "SSL bağlantısı", "Site trafiği güvenli bağlantı üzerinden iletilir."],
      ["shield", "Güvenli ödeme", "Ödemeler İyzico altyapısı ile yürütülür."],
      ["user-check", "Veri güvenliği", "Kişisel veriler yalnızca sipariş, destek ve yasal süreçler için işlenir."],
      ["ban", "Sahte işlem önlemleri", "Şüpheli işlemler ek doğrulama veya destek kontrolüne alınabilir."]
    ]
  },
  membership: {
    path: "membership.html",
    title: "Üyelik İşlemleri",
    eyebrow: "Alışveriş Rehberi",
    description: "Ekocep üyelik, hesap bilgileri, sipariş geçmişi ve hesap yönetimi işlemleri.",
    intro: "Üyelik işlemleri; sipariş geçmişini takip etmek, iletişim bilgilerini yönetmek ve destek taleplerini kolaylaştırmak için tasarlanır.",
    sections: [
      ["Hesap oluşturma", "Alışveriş sırasında veya üyelik ekranı üzerinden temel iletişim bilgileriyle hesap oluşturulabilir."],
      ["Bilgi güncelleme", "Adres, telefon ve e-posta bilgilerinin güncel olması teslimat ve destek süreçlerini hızlandırır."],
      ["Hesap silme", "Hesap ve veri silme talepleri için ilgili yasal sayfadaki başvuru yöntemi kullanılabilir."]
    ]
  },
  campaigns: {
    path: "campaigns.html",
    title: "Kampanyalar",
    eyebrow: "Alışveriş Rehberi",
    description: "Ekocep kampanya, indirim ve dönemsel fırsat bilgileri.",
    intro: "Aktif kampanya dönemlerinde telefon aksesuarları, şarj ürünleri, kulaklık ve kablo kategorilerinde fırsatlar burada listelenir.",
    empty: ["Aktif kampanya bulunmuyor", "Yeni fırsatlar hazırlandığında bu sayfada duyurulacak. Haber bültenine kaydolarak gelişmeleri takip edebilirsin."]
  },
  "privacy-policy": {
    path: "privacy-policy.html",
    title: "Gizlilik Politikası",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep gizlilik politikası ve kişisel verilerin işlenmesine ilişkin profesyonel taslak metin.",
    intro: "Bu metin Ekocep.com için hazırlanmış profesyonel taslak niteliğindedir; nihai hukuki kontrol için düzenlenebilir.",
    sections: [
      ["Toplanan bilgiler", "Ad, soyad, e-posta, telefon, teslimat adresi, sipariş bilgisi ve destek yazışmaları hizmetin sağlanması için işlenebilir."],
      ["Kullanım amaçları", "Veriler sipariş hazırlama, ödeme, teslimat, müşteri desteği, yasal yükümlülükler ve alışveriş deneyimini iyileştirme amaçlarıyla kullanılabilir."],
      ["Paylaşım", "Kişisel veriler ödeme sağlayıcısı, kargo firması, teknik hizmet sağlayıcılar ve yasal mercilerle yalnızca gerekli ölçüde paylaşılabilir."],
      ["Haklarınız", "Kişisel verilerinize erişme, düzeltme, silme veya işlenmesine itiraz etme talepleriniz için Ekocep ile iletişime geçebilirsiniz."]
    ]
  },
  kvkk: {
    path: "kvkk.html",
    title: "KVKK Aydınlatma Metni",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep KVKK aydınlatma metni taslağı.",
    intro: "Ekocep Ltd. Şti. kişisel verileri 6698 sayılı KVKK kapsamında, hizmetin gerektirdiği ölçüde ve şeffaflık ilkesiyle işler.",
    sections: [
      ["Veri sorumlusu", "Ekocep Ltd. Şti., Bursa / Nilüfer merkezli e-ticaret faaliyetleri kapsamında veri sorumlusu sıfatıyla hareket eder."],
      ["İşlenen veri kategorileri", "Kimlik, iletişim, müşteri işlem, işlem güvenliği, finans ve talep/şikayet bilgileri işlenebilir."],
      ["Hukuki sebepler", "Sözleşmenin kurulması, hukuki yükümlülük, meşru menfaat ve açık rıza gerektiren haller temel alınabilir."],
      ["Başvuru", "KVKK kapsamındaki talepler info@ekocep.com üzerinden yazılı olarak iletilebilir."]
    ]
  },
  "distance-sales": {
    path: "distance-sales.html",
    title: "Mesafeli Satış Sözleşmesi",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep mesafeli satış sözleşmesi profesyonel taslak metni.",
    intro: "Bu sözleşme taslağı Ekocep.com üzerinden yapılan B2C satışlarda alıcı ve satıcı arasındaki temel hak ve yükümlülükleri açıklar.",
    sections: [
      ["Taraflar", "Satıcı Ekocep Ltd. Şti.; alıcı ise ekocep.com üzerinden sipariş veren tüketicidir."],
      ["Konu", "Sözleşme, elektronik ortamda sipariş verilen ürünlerin satışı, teslimatı ve cayma hakkına ilişkin hükümleri kapsar."],
      ["Teslimat", "Ürünler, sipariş sırasında belirtilen teslimat adresine kargo aracılığıyla gönderilir."],
      ["Cayma hakkı", "Tüketici, mevzuatta belirtilen istisnalar dışında 14 gün içinde cayma hakkını kullanabilir."]
    ]
  },
  "membership-agreement": {
    path: "membership-agreement.html",
    title: "Üyelik Sözleşmesi",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep üyelik sözleşmesi profesyonel taslak metni.",
    intro: "Bu taslak, Ekocep.com üyelik hesabı kullanımına ilişkin temel kuralları ve tarafların sorumluluklarını açıklar.",
    sections: [
      ["Üyelik hesabı", "Kullanıcı, üyelik oluştururken doğru ve güncel bilgi vermeyi kabul eder."],
      ["Hesap güvenliği", "Şifre ve hesap erişim bilgilerinin güvenliği kullanıcının sorumluluğundadır."],
      ["Hizmet kullanımı", "Üyelik hesabı sipariş takibi, adres yönetimi ve destek süreçlerini kolaylaştırmak için kullanılabilir."],
      ["Sonlandırma", "Kullanıcı hesap kapatma veya veri silme talebini Ekocep'e iletebilir."]
    ]
  },
  "cookie-policy": {
    path: "cookie-policy.html",
    title: "Çerez Politikası",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep çerez politikası ve çerez tercihleri hakkında taslak bilgilendirme.",
    intro: "Çerezler site performansını ölçmek, tercihleri hatırlamak ve alışveriş deneyimini iyileştirmek için kullanılabilir.",
    sections: [
      ["Zorunlu çerezler", "Sepet, oturum ve güvenlik gibi temel site işlevleri için gereklidir."],
      ["Performans çerezleri", "Sayfa kullanımı ve teknik performans hakkında toplu bilgiler sağlayabilir."],
      ["Pazarlama çerezleri", "Kampanya ve ilgi alanı bazlı iletişimlerde kullanılabilir; tercihlerinize göre yönetilebilir."],
      ["Tercih yönetimi", "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz."]
    ]
  },
  "data-deletion": {
    path: "data-deletion.html",
    title: "Hesap ve Veri Silme Talebi",
    eyebrow: "Yasal Bilgilendirme",
    description: "Ekocep hesap kapatma ve kişisel veri silme talebi sayfası.",
    intro: "Hesap kapatma veya kişisel verilerin silinmesi taleplerini bu sayfadaki form bilgileriyle Ekocep'e iletebilirsiniz.",
    form: "dataDeletion",
    sections: [
      ["Talep kapsamı", "Hesap kapatma, iletişim bilgilerinin silinmesi veya belirli veri işleme faaliyetlerine itiraz talepleri değerlendirilebilir."],
      ["Kimlik doğrulama", "Talebin güvenli şekilde işlenebilmesi için ek doğrulama bilgileri istenebilir."],
      ["Yasal saklama", "Vergi, muhasebe ve tüketici mevzuatı gereği saklanması zorunlu kayıtlar yasal süre boyunca tutulabilir."]
    ]
  },
  contact: {
    path: "contact.html",
    title: "İletişim",
    eyebrow: "Destek",
    description: "Ekocep Bursa Nilüfer iletişim bilgileri ve kullanıcı dostu iletişim formu.",
    intro: "Sipariş, ürün, iade veya teknik destek konularında Ekocep destek ekibine ulaşabilirsin.",
    form: "contact",
    cards: [
      ["mail", "E-posta", "info@ekocep.com"],
      ["phone", "Telefon", "+90 (224) 555 16 16"],
      ["map-pin", "Adres", "Ekocep Ltd. Şti., Nilüfer / Bursa"]
    ]
  }
};

const iconFor = (icon) => `<i data-lucide="${icon}" class="h-5 w-5"></i>`;
const sectionHtml = ([title, text]) => `<section><h2>${title}</h2><p>${text}</p></section>`;
const cardHtml = ([icon, title, text]) => `<section class="content-info-card">${iconFor(icon)}<h2>${title}</h2><p>${text}</p></section>`;

function formHtml(type) {
  if (type === "tracking") {
    return `
      <form class="content-form">
        <label for="order-number">Sipariş numarası<input id="order-number" type="text" placeholder="Örn. EKC-2026-1001" /></label>
        <label for="order-contact">E-posta veya telefon<input id="order-contact" type="text" placeholder="Siparişte kullanılan iletişim bilgisi" /></label>
        <button type="button">Siparişi Sorgula</button>
      </form>
    `;
  }
  if (type === "dataDeletion") {
    return `
      <form class="content-form">
        <label for="delete-name">Ad Soyad<input id="delete-name" type="text" placeholder="Adın ve soyadın" /></label>
        <label for="delete-email">E-posta<input id="delete-email" type="email" placeholder="info@ornek.com" /></label>
        <label for="delete-request">Talep Detayı<textarea id="delete-request" rows="5" placeholder="Hangi veriler için işlem yapılmasını istiyorsun?"></textarea></label>
        <button type="button">Talep Gönder</button>
      </form>
    `;
  }
  return `
    <form class="content-form">
      <label for="contact-name">Ad Soyad<input id="contact-name" type="text" placeholder="Adın ve soyadın" /></label>
      <label for="contact-email">E-posta<input id="contact-email" type="email" placeholder="info@ornek.com" /></label>
      <label for="contact-topic">Konu<input id="contact-topic" type="text" placeholder="Sipariş, iade, ürün veya destek" /></label>
      <label for="contact-message">Mesaj<textarea id="contact-message" rows="5" placeholder="Mesajını yaz"></textarea></label>
      <button type="button">Gönder</button>
    </form>
  `;
}

export function renderPageBody(page) {
  const cards = page.cards?.length ? `<div class="content-card-grid">${page.cards.map(cardHtml).join("")}</div>` : "";
  const sections = page.sections?.length ? `<article class="policy-content">${page.sections.map(sectionHtml).join("")}</article>` : "";
  const faq = page.faq?.length
    ? `<div class="content-faq">${page.faq.map(([q, a], index) => `<details ${index === 0 ? "open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`
    : "";
  const steps = page.steps?.length
    ? `<ol class="content-steps">${page.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`
    : "";
  const posts = page.posts?.length
    ? `<div class="content-card-grid">${page.posts.map(([title, text]) => `<article class="content-blog-card"><span>Rehber</span><h2>${title}</h2><p>${text}</p><a href="#contact">Devamını Oku</a></article>`).join("")}</div>`
    : "";
  const empty = page.empty
    ? `<section class="content-empty"><i data-lucide="badge-percent" class="h-7 w-7"></i><h2>${page.empty[0]}</h2><p>${page.empty[1]}</p><a href="./index.html#shop">Ürünleri İncele</a></section>`
    : "";

  return `
    <div class="policy-hero">
      <p>${page.eyebrow}</p>
      <h1>${page.title}</h1>
      <span>${page.intro}</span>
    </div>
    ${cards}
    ${steps}
    ${posts}
    ${empty}
    ${page.form ? formHtml(page.form) : ""}
    ${sections}
    ${faq}
  `;
}

function renderContentPage() {
  const main = document.querySelector("[data-content-page]");
  if (!main) return;
  const page = contentPages[main.dataset.contentPage];
  if (!page) return;

  main.innerHTML = renderPageBody(page);
  window.lucide?.createIcons();
}

if (typeof document !== "undefined") {
  renderContentPage();
}
