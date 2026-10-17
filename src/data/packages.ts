/**
 * Corporate software & digital engineering service pillars.
 *
 * Single source of truth for the home-page services preview and the `/packages`
 * services page. Fixed price tags are intentionally omitted; visitors are
 * invited to request a tailored proposal via the contact form.
 */
import type { Bilingual } from './profile';

export interface RapidSprint {
  id: 'web-sprint' | 'mobile-mvp';
  eyebrow: Bilingual;
  name: Bilingual;
  tagline: Bilingual;
  timeline: Bilingual;
  features: Bilingual[];
  exclusions: Bilingual;
  highlighted: boolean;
}

export interface PackageTier {
  id: 'mobile' | 'web' | 'brand' | 'seo-aio';
  name: Bilingual;
  tagline: Bilingual;
  timeline: Bilingual;
  /** Deliverable summary for the comparison table. */
  pages: Bilingual;
  /** Technical & business outcome scope for the comparison table. */
  brandScope: Bilingual;
  features: Bilingual[];
  /** Surfaced as a highlighted pillar. */
  highlighted: boolean;
}

export interface PackageFaq {
  question: Bilingual;
  answer: Bilingual;
}

export interface ProcessStep {
  title: Bilingual;
  description: Bilingual;
}

export const rapidSprints: RapidSprint[] = [
  {
    id: 'web-sprint',
    eyebrow: { en: 'Fast-Track Launch', tr: 'Hızlı Başlangıç' },
    name: { en: 'Executive Launch Website', tr: 'Hızlı Kurumsal Tanıtım Sitesi' },
    tagline: {
      en: 'A refined, mobile-first single-page site designed to turn visitors into inquiries, calls, and WhatsApp conversations.',
      tr: 'Ziyaretçileri doğrudan iletişime, aramaya ve WhatsApp görüşmesine yönlendiren şık, hızlı ve mobil uyumlu tanıtım sitesi.',
    },
    timeline: { en: '3 - 5 business days', tr: '3 - 5 iş günü' },
    features: [
      {
        en: 'Custom mobile-first design and instant-loading infrastructure',
        tr: 'Markanıza özel mobil uyumlu tasarım ve anında açılan altyapı',
      },
      {
        en: 'Contact form, WhatsApp, phone, and Google Maps integrations',
        tr: 'İletişim formu, WhatsApp, telefon ve harita entegrasyonları',
      },
      {
        en: 'Foundational Google SEO setup and persuasive corporate copy structure',
        tr: 'Temel Google SEO kurulumu ve güven veren kurumsal metin kurgusu',
      },
      {
        en: 'Domain connection, SSL security, and full account ownership',
        tr: 'Alan adı bağlantısı, SSL güvenliği ve tüm hesapların teslimi',
      },
    ],
    exclusions: {
      en: 'Multi-language architecture and custom management panels are scoped within full corporate projects.',
      tr: 'Çok dilli yapı ve özel yönetim panelleri kapsamlı kurumsal projelerde planlanır.',
    },
    highlighted: false,
  },
  {
    id: 'mobile-mvp',
    eyebrow: { en: 'Product Validation', tr: 'Ürün Doğrulama' },
    name: { en: 'Mobile or Web Product MVP', tr: 'Mobil veya Web Ürün MVP' },
    tagline: {
      en: 'Turn your product idea into a working, testable mobile or web application ready for real users.',
      tr: 'Ürün fikrinizi gerçek kullanıcılara sunabileceğiniz, çalışan ve ölçeklenmeye hazır bir uygulamaya dönüştürün.',
    },
    timeline: { en: '1 - 2 weeks', tr: '1 - 2 hafta' },
    features: [
      {
        en: 'Core user experience built for iOS, Android, or Web',
        tr: 'iOS, Android veya Web için temel kullanıcı akışlarının geliştirilmesi',
      },
      {
        en: 'User sign-in, database, and server infrastructure',
        tr: 'Kullanıcı girişi, veritabanı ve güvenli sunucu bağlantısı',
      },
      {
        en: 'Live testable release (TestFlight or preview link)',
        tr: 'Gerçek cihazlarda test edilebilir canlı sürüm (TestFlight veya önizleme)',
      },
      {
        en: 'Solid technical foundation ready to grow into a full product',
        tr: 'Tam kapsamlı ürüne büyümeye hazır, sağlam teknik temel',
      },
    ],
    exclusions: {
      en: 'Full commercial store release management and enterprise integrations are scoped separately.',
      tr: 'Tam kapsamlı mağaza yayın yönetimi ve kurumsal entegrasyonlar ayrıca planlanır.',
    },
    highlighted: true,
  },
];

export const packageTiers: PackageTier[] = [
  {
    id: 'mobile',
    name: { en: 'Mobile App Development', tr: 'Mobil Uygulama Geliştirme' },
    tagline: {
      en: 'Polished, high-performance iOS, Android, and macOS applications built from the ground up and published on the App Store and Google Play.',
      tr: 'Fikir aşamasından App Store ve Google Play yayınına kadar; iPhone, iPad, Mac ve Android için sıfırdan tasarlanan, hızlı ve güvenilir mobil uygulamalar.',
    },
    timeline: { en: 'Tailored to project scope', tr: 'Proje kapsamına göre planlanır' },
    pages: { en: 'iOS, Android, iPad & Mac', tr: 'iOS, Android, iPad ve Mac' },
    brandScope: {
      en: 'Design + Software + Store Launch',
      tr: 'Tasarım + Yazılım + Mağaza Yayını',
    },
    features: [
      {
        en: 'Native Apple apps (iPhone, iPad, Mac) or unified iOS & Android apps',
        tr: 'Apple ekosistemine özel (iPhone, iPad, Mac) veya hem iOS hem Android uyumlu uygulama geliştirme',
      },
      {
        en: 'Offline support, cloud sync, user accounts, and custom server infrastructure',
        tr: 'Çevrimdışı çalışma, bulut senkronizasyonu, kullanıcı hesapları ve güvenli sunucu altyapısı',
      },
      {
        en: 'Notifications, lock-screen widgets, live activities, and in-app subscriptions',
        tr: 'Bildirim kurguları, ekran widget’ları, canlı etkinlikler ve uygulama içi abonelik sistemleri',
      },
      {
        en: 'End-to-end App Store and Google Play store visuals, submission, and approval management',
        tr: 'App Store ve Google Play mağaza görselleri, başvuru ve onay süreçlerinin uçtan uca yönetimi',
      },
    ],
    highlighted: false,
  },
  {
    id: 'web',
    name: { en: 'Corporate Websites & Custom Systems', tr: 'Kurumsal Web Sitesi ve Özel Sistemler' },
    tagline: {
      en: 'Prestigious, fast-loading corporate websites and custom management platforms that build trust and turn visitors into clients.',
      tr: 'Markanızın prestijini yansıtan, saniyenin altında açılan, ziyaretçileri müşteriye dönüştüren çok dilli kurumsal web siteleri ve özel yönetim panelleri.',
    },
    timeline: { en: '2 - 4 weeks', tr: '2 - 4 hafta' },
    pages: { en: 'Multi-Page & Multi-Language', tr: 'Çok Sayfalı ve Çok Dilli Yapı' },
    brandScope: {
      en: 'Custom Design + Management Panel',
      tr: 'Özel Tasarım + Yönetim Paneli',
    },
    features: [
      {
        en: 'Bespoke corporate design that works flawlessly on phones, tablets, and desktops',
        tr: 'Telefon, tablet ve bilgisayarda kusursuz görünen, markanıza özel kurumsal arayüz tasarımı',
      },
      {
        en: 'Multi-language support (Turkish, English, Arabic, etc.) for international reach',
        tr: 'Yurt içi ve yurt dışı müşteriler için çok dilli yapı (Türkçe, İngilizce, Arapça vb.)',
      },
      {
        en: 'Easy-to-use management panel for updating blog posts, services, appointments, or tests',
        tr: 'Yazılarınızı, hizmetlerinizi, randevu taleplerini veya ölçekleri kolayca yönetebileceğiniz kontrol paneli',
      },
      {
        en: 'Direct inquiry forms, WhatsApp integration, and KVKK/privacy-compliant lead flows',
        tr: 'E-postanıza düşen teklif ve iletişim formları, WhatsApp entegrasyonu ve KVKK uyumlu yapı',
      },
    ],
    highlighted: true,
  },
  {
    id: 'brand',
    name: { en: 'Digital Brand Setup & Infrastructure', tr: 'Dijital Marka Kurulumu ve Kurumsal Altyapı' },
    tagline: {
      en: 'Everything a new or growing business needs to look established online: domain, corporate email, Google Maps, and analytics.',
      tr: 'Yeni kurulan veya yenilenen işletmeler için alan adından kurumsal e-postaya, Google Haritalar kaydından analitiğe kadar eksiksiz dijital kurulum.',
    },
    timeline: { en: '1 - 2 weeks', tr: '1 - 2 hafta' },
    pages: { en: 'Turnkey Brand Infrastructure', tr: 'Anahtar Teslim Dijital Kurulum' },
    brandScope: {
      en: 'Domain + Corporate Mail + Google',
      tr: 'Alan Adı + Kurumsal E-posta + Google',
    },
    features: [
      {
        en: 'Domain registration, Cloudflare security shield, and SSL certificate setup',
        tr: 'Alan adı (domain) tescili, güvenlik duvarı ve SSL güvenlik sertifikası kurulumu',
      },
      {
        en: 'Professional corporate email setup (info@yourcompany.com) with high inbox deliverability',
        tr: 'Kurumsal e-posta kurulumu (info@markaniz.com) ve e-postaların spam’e düşmesini önleyen doğrulamalar',
      },
      {
        en: 'Cohesive digital visual identity (color palette, typography, social media profile kit)',
        tr: 'Dijital kurumsal kimlik uyumu (renk paleti, yazı karakterleri, sosyal medya profil ve kapak şablonları)',
      },
      {
        en: 'Google Business Profile (Maps), Google Analytics (GA4), and advertising conversion setup',
        tr: 'Google İşletme Profili (Haritalar), Google Analytics (GA4) ve reklam dönüşüm altyapısının kurulması',
      },
    ],
    highlighted: false,
  },
  {
    id: 'seo-aio',
    name: { en: 'Google SEO & AI Search (AIO) Visibility', tr: 'Google SEO ve Yapay Zeka Araması (AIO)' },
    tagline: {
      en: 'Ensure potential clients find and trust your business both on Google Search/Maps and on AI assistants like ChatGPT, Gemini, and Perplexity.',
      tr: 'Potansiyel müşterileriniz hizmetlerinizi hem Google’da hem de ChatGPT, Gemini ve Perplexity gibi yapay zeka asistanlarında aradığında markanızın ilk sıralarda önerilmesini sağlayın.',
    },
    timeline: { en: '1 - 3 weeks', tr: '1 - 3 hafta' },
    pages: { en: 'Google & AI Search Optimization', tr: 'Google ve Yapay Zeka Görünürlüğü' },
    brandScope: {
      en: 'Organic Traffic + AI Recommendations',
      tr: 'Organik Müşteri + Yapay Zeka Önerisi',
    },
    features: [
      {
        en: 'Comprehensive technical SEO and service/location pages tailored to customer search intent',
        tr: 'Müşterilerin arama alışkanlıklarına uygun hizmet/bölge sayfaları ve kapsamlı teknik SEO kurulumu',
      },
      {
        en: 'AI Search Optimization (AIO) so ChatGPT, Gemini, and Claude accurately cite and recommend your business',
        tr: 'ChatGPT, Gemini ve Claude gibi yapay zeka asistanlarının işletmenizi doğru tanıması ve önermesi için özel veri altyapısı (AIO)',
      },
      {
        en: 'Google Search Console, Bing, and automated search indexing configuration',
        tr: 'Google ve diğer arama motorlarına resmi kayıt, site haritası ve hızlı dizine ekleme otomasyonu',
      },
      {
        en: 'Page-speed optimization for higher visitor retention and stronger search rankings',
        tr: 'Sayfa açılış hızı optimizasyonu ile ziyaretçi memnuniyeti ve arama sıralaması artışı',
      },
    ],
    highlighted: false,
  },
];

/**
 * FAQ shown on the /packages page and mirrored as FAQPage JSON-LD.
 */
export const packageFaqs: PackageFaq[] = [
  {
    question: {
      en: 'How do we determine the scope and budget for a project?',
      tr: 'Proje kapsamı ve bütçesi nasıl belirleniyor?',
    },
    answer: {
      en: 'Every business has different goals: a single-language corporate site, a clinic platform with an admin panel, and a mobile app on the App Store require different plans. Once you share your goals via the contact form or WhatsApp, I prepare a clear, transparent written proposal with deliverables and timeline.',
      tr: 'Her işletmenin ihtiyacı farklıdır; kurumsal bir tanıtım sitesi, yönetim panelli kapsamlı bir klinik/şirket platformu veya App Store’da yayımlanacak bir mobil uygulama farklı planlama gerektirir. İhtiyacınızı iletişim formundan veya WhatsApp’tan ilettiğinizde, yapılacak işleri ve teslim takvimini içeren net ve şeffaf bir teklif paylaşıyorum.',
    },
  },
  {
    question: {
      en: 'Can you handle the entire process from domain purchase to launch?',
      tr: 'Alan adı alımından canlı yayına kadar her şeyi tek elden yönetiyor musunuz?',
    },
    answer: {
      en: 'Yes. You do not need to coordinate separate agencies or technical people. I handle domain registration, corporate email setup, design, software development, Google/AI search optimization, and launch end to end.',
      tr: 'Evet. Farklı ajanslarla veya birden fazla teknik kişiyle uğraşmanıza gerek kalmaz. Alan adı alımı, kurumsal e-posta kurulumu, tasarım, yazılım geliştirme, Google/yapay zeka görünürlüğü ve yayına alma süreçlerinin tamamını tek muhatap olarak yönetiyorum.',
    },
  },
  {
    question: {
      en: 'What is AI Search Optimization (AIO) and how does it help my business?',
      tr: 'Yapay Zeka Araması (AIO) nedir, işletmeme ne kazandırır?',
    },
    answer: {
      en: 'People increasingly ask ChatGPT, Gemini, and Perplexity questions like "Which company/clinic do you recommend in Istanbul?". AIO structures your website’s data so AI assistants clearly understand your services, location, and expertise and recommend your brand with confidence.',
      tr: 'Müşteriler artık yalnızca Google’da arama yapmıyor; ChatGPT, Gemini ve Perplexity gibi yapay zeka araçlarına "İstanbul’da hangi firmayı/kliniği önerirsin?" diye soruyor. Kurduğum AIO altyapısı sayesinde yapay zeka modelleri işletmenizin hizmetlerini, uzmanlığını ve iletişim bilgilerini doğrudan okuyup müşterilere doğru şekilde önerir.',
    },
  },
  {
    question: {
      en: 'Do you develop mobile apps for both iPhone (iOS) and Android?',
      tr: 'Hem iPhone (iOS) hem de Android için mobil uygulama yapıyor musunuz?',
    },
    answer: {
      en: 'Yes. Depending on your goal, I develop native Apple applications (iPhone, iPad, Mac) or cross-platform apps that run on both iOS and Android from a single codebase, including server infrastructure and store submission.',
      tr: 'Evet. Projenizin hedef kitlesine göre hem Apple ekosistemine özel (iPhone, iPad, Mac) native uygulamalar hem de tek altyapıyla hem iOS hem Android’de çalışan mobil uygulamalar geliştiriyor; sunucu sisteminden mağaza onayına kadar tüm süreci tamamlıyorum.',
    },
  },
  {
    question: {
      en: 'Will I own all accounts, domain names, and source code?',
      tr: 'Site, alan adı ve hesapların mülkiyeti tamamen bana mı ait oluyor?',
    },
    answer: {
      en: 'Absolutely. All domain names, hosting/cloud accounts, Google profiles, and software source code are registered under your ownership and handed over transparently.',
      tr: 'Kesinlikle. Alan adınız, kurumsal e-postanız, Google İşletme ve analitik hesaplarınız ile yazılım kaynak kodlarının tamamı sizin adınıza tanımlanır ve şeffaf biçimde teslim edilir; dışa bağımlı kalmazsınız.',
    },
  },
  {
    question: {
      en: 'Do you provide support and updates after the project goes live?',
      tr: 'Proje tamamlandıktan sonra destek ve güncelleme sağlıyor musunuz?',
    },
    answer: {
      en: 'Yes. Every delivery includes post-launch support to ensure everything runs smoothly. For ongoing content updates, new features, or continuous SEO/AIO growth, we can also continue with regular support.',
      tr: 'Evet. Her projede canlıya geçiş sonrası doğrulama ve teknik destek yer alır. İlerleyen dönemde yeni özellik ekleme, içerik güncelleme veya düzenli bakım ihtiyaçlarınız için de yanınızda olmaya devam ediyorum.',
    },
  },
];

/**
 * The four-step delivery process shown on /packages.
 */
export const packageProcess: ProcessStep[] = [
  {
    title: { en: '1. Listening & Roadmap', tr: '1. İhtiyacı Dinleme ve Planlama' },
    description: {
      en: 'We talk through your business goals, target audience, and expectations, then establish a clear scope and timeline.',
      tr: 'İşletmenizin hedeflerini, müşteri kitlenizi ve beklentilerinizi dinliyor; yapılacak işleri ve teslim takvimini net bir plana döküyoruz.',
    },
  },
  {
    title: { en: '2. Design & Brand Architecture', tr: '2. Kurumsal Tasarım ve Kurgulama' },
    description: {
      en: 'We shape a clean, trustworthy visual design and page structure that reflects your brand’s prestige on every device.',
      tr: 'Markanızın prestijini yansıtan, ziyaretçiye güven veren ve her ekranda kusursuz görünen sade, modern bir tasarım hazırlıyoruz.',
    },
  },
  {
    title: { en: '3. Development & Search Visibility', tr: '3. Geliştirme, SEO ve Yapay Zeka Altyapısı' },
    description: {
      en: 'Your mobile app or website is built for speed and security, complete with Google SEO and AI search (AIO) infrastructure.',
      tr: 'Uygulamanızı veya web sitenizi yüksek hız, güvenlik, Google SEO ve yapay zeka araması (AIO) uyumuyla eksiksiz olarak geliştiriyoruz.',
    },
  },
  {
    title: { en: '4. Launch & Full Handover', tr: '4. Yayına Alma ve Anahtar Teslim' },
    description: {
      en: 'We launch your project, verify email, Maps, and analytics flows, hand over all accounts, and stay with you for post-launch support.',
      tr: 'Projenizi canlı yayına alıyor; kurumsal e-posta, harita ve analitik kontrollerini tamamlayıp tüm hesaplarla birlikte anahtar teslim sunuyoruz.',
    },
  },
];
