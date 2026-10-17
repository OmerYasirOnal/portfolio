/**
 * Corporate software & digital engineering service pillars.
 *
 * Single source of truth for the home-page services preview and the `/packages`
 * services page. Per user preference, fixed price tags are removed and visitors
 * are guided to request a tailored quote via the contact form.
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
  /** Technical & infrastructure scope for the comparison table. */
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

/**
 * Fast-track validation sprints for teams or founders who want a rapid prototype
 * or focused landing page before a full-scale build.
 */
export const rapidSprints: RapidSprint[] = [
  {
    id: 'web-sprint',
    eyebrow: { en: 'Fast-Track Web Launch', tr: 'Hızlı Web Başlangıcı' },
    name: { en: 'Conversion Landing Page', tr: 'Dönüşüm Odaklı Tanıtım Sitesi' },
    tagline: {
      en: 'A fast, mobile-first single-page site designed to turn visitors into form submissions, calls, and WhatsApp inquiries.',
      tr: 'Ziyaretçileri iletişim formuna, aramaya ve WhatsApp görüşmesine yönlendiren hızlı, mobil uyumlu tek sayfa kurumsal site.',
    },
    timeline: { en: '3 - 5 business days', tr: '3 - 5 iş günü' },
    features: [
      { en: 'Custom responsive design and high-speed Astro build', tr: 'Özel mobil uyumlu tasarım ve yüksek hızlı Astro altyapısı' },
      { en: 'Contact form, WhatsApp, phone, and map integrations', tr: 'İletişim formu, WhatsApp, telefon ve harita entegrasyonları' },
      { en: 'On-page SEO, Schema.org metadata, and clean copy structure', tr: 'Temel teknik SEO, Schema.org yapısal verisi ve kurumsal metin kurgusu' },
      { en: 'Domain connection, SSL setup, and source-code handoff', tr: 'Alan adı bağlantısı, SSL kurulumu ve kaynak kod teslimi' },
    ],
    exclusions: {
      en: 'Multi-language architecture, custom admin panels, and complex third-party integrations are scoped in full projects.',
      tr: 'Çok dilli mimari, özel yönetim paneli ve kapsamlı dış servis entegrasyonları ana projelerde kapsamlandırılır.',
    },
    highlighted: false,
  },
  {
    id: 'mobile-mvp',
    eyebrow: { en: 'Fast-Track Product', tr: 'Hızlı Ürün Doğrulama' },
    name: { en: 'Mobile or Web MVP', tr: 'Mobil veya Web MVP' },
    tagline: {
      en: 'Turn a core product idea into a working, testable mobile or web MVP with clean architecture.',
      tr: 'Net bir ürün fikrini gerçek kullanıcılara sunabileceğiniz, temiz mimarili çalışan bir mobil veya web MVP’ye dönüştürün.',
    },
    timeline: { en: '1 - 2 weeks', tr: '1 - 2 hafta' },
    features: [
      { en: 'Core user flows built with SwiftUI, Flutter, or Next.js', tr: 'SwiftUI, Flutter veya Next.js ile temel kullanıcı akışlarının geliştirilmesi' },
      { en: 'Authentication and API / database integration', tr: 'Kimlik doğrulama ve API / veritabanı bağlantısı' },
      { en: 'Testable build (TestFlight or live preview URL)', tr: 'Test edilebilir sürüm (TestFlight veya canlı önizleme bağlantısı)' },
      { en: 'Clean, maintainable repository ready to scale', tr: 'Büyümeye hazır, temiz ve sürdürülebilir kaynak kod teslimi' },
    ],
    exclusions: {
      en: 'Full App Store / Play Store commercial release management and enterprise ERP integrations are scoped separately.',
      tr: 'Tam kapsamlı mağaza yayın yönetimi ve kurumsal ERP entegrasyonları proje kapsamına göre ayrıca planlanır.',
    },
    highlighted: true,
  },
];

export const packageTiers: PackageTier[] = [
  {
    id: 'mobile',
    name: { en: 'Mobile App Development', tr: 'Mobil Uygulama Geliştirme' },
    tagline: {
      en: 'Native iOS/macOS (SwiftUI) and cross-platform (Flutter) applications built from scratch and shipped to the stores.',
      tr: 'iOS, iPadOS, macOS (SwiftUI) ve çoklu platform (Flutter) için sıfırdan tasarlanan, mağazaya çıkmaya hazır mobil uygulamalar.',
    },
    timeline: { en: 'Project-based', tr: 'Kapsama göre planlanır' },
    pages: { en: 'iOS, iPadOS, macOS & Android', tr: 'iOS, iPadOS, macOS ve Android' },
    brandScope: { en: 'UI/UX + Backend API + Store Launch', tr: 'UI/UX + Backend API + Mağaza Yayını' },
    features: [
      {
        en: 'Native SwiftUI (iOS/macOS) or cross-platform Flutter development',
        tr: 'Native SwiftUI (iOS/macOS) veya Flutter ile yüksek performanslı geliştirme',
      },
      {
        en: 'Offline-first data, iCloud/CloudKit sync, or custom REST API backend',
        tr: 'Çevrimdışı çalışma, iCloud/CloudKit senkronizasyonu veya özel REST API altyapısı',
      },
      {
        en: 'Widgets, Live Activities, notifications, and in-app subscriptions',
        tr: 'Widget, Canlı Etkinlikler (Live Activity), bildirim ve abonelik kurguları',
      },
      {
        en: 'App Store & Google Play preparation, screenshots, and review submission',
        tr: 'App Store ve Google Play mağaza hazırlığı, görseller ve onay süreci yönetimi',
      },
    ],
    highlighted: false,
  },
  {
    id: 'web',
    name: { en: 'Corporate Web & Custom Software', tr: 'Kurumsal Web Sitesi & Özel Yazılım' },
    tagline: {
      en: 'High-speed, multi-language corporate websites, custom admin panels, and full-stack web applications.',
      tr: 'Yüksek hızlı, çok dilli kurumsal web siteleri, özel yönetim panelleri ve uçtan uca web uygulamaları.',
    },
    timeline: { en: '2 - 4 weeks', tr: '2 - 4 hafta' },
    pages: { en: 'Multi-page & Multi-language', tr: 'Çok sayfalı ve çok dilli mimari' },
    brandScope: { en: 'Custom Design + Admin/CMS + API', tr: 'Özel Tasarım + Yönetim Paneli + API' },
    features: [
      {
        en: 'Modern Astro or Next.js architecture with sub-second page loads',
        tr: 'Astro veya Next.js ile saniyenin altında açılan modern web mimarisi',
      },
      {
        en: 'Multi-language (TR/EN/AR) routing and responsive corporate UI',
        tr: 'Çok dilli (TR/EN/AR) sayfa yapısı ve tüm cihazlara uyumlu kurumsal arayüz',
      },
      {
        en: 'Custom admin panel, blog/content management, and lead forms',
        tr: 'Özel yönetim paneli, blog/içerik yönetimi ve güvenli iletişim formları',
      },
      {
        en: 'PostgreSQL/MySQL database, Node.js/FastAPI backend, and AI integrations',
        tr: 'PostgreSQL/MySQL veritabanı, Node.js/FastAPI backend ve yapay zeka entegrasyonları',
      },
    ],
    highlighted: true,
  },
  {
    id: 'brand',
    name: { en: 'Brand Setup & Digital Infrastructure', tr: 'Marka Kurulumu & Dijital Altyapı' },
    tagline: {
      en: 'Complete digital foundation for new or growing brands: domain, corporate email, Cloudflare, and Google ecosystem.',
      tr: 'Yeni kurulan veya yenilenen markalar için alan adından kurumsal e-postaya ve Google ekosistemine kadar tam dijital kurulum.',
    },
    timeline: { en: '1 - 2 weeks', tr: '1 - 2 hafta' },
    pages: { en: 'End-to-End Brand Kit & Infra', tr: 'Uçtan Uca Dijital Kurulum' },
    brandScope: { en: 'Domain + Corporate Mail + Google', tr: 'Domain + Kurumsal E-Posta + Google' },
    features: [
      {
        en: 'Domain registration, Cloudflare DNS, SSL, and edge security setup',
        tr: 'Alan adı (domain), Cloudflare DNS, SSL ve güvenlik duvarı kurulumu',
      },
      {
        en: 'Corporate email setup (info@yourdomain.com) with SPF, DKIM, and DMARC',
        tr: 'Kurumsal e-posta kurulumu (info@markaniz.com) ve SPF, DKIM, DMARC doğrulamaları',
      },
      {
        en: 'Visual identity direction (color palette, typography, social templates)',
        tr: 'Görsel kimlik kurgusu (renk paleti, tipografi, sosyal medya ve profil şablonları)',
      },
      {
        en: 'Google Business Profile, Google Tag Manager (GTM), and GA4 analytics',
        tr: 'Google İşletme Profili (Haritalar), Google Tag Manager (GTM) ve GA4 kurulumu',
      },
    ],
    highlighted: false,
  },
  {
    id: 'seo-aio',
    name: { en: 'SEO & AIO (AI Search Optimization)', tr: 'SEO & AIO (Yapay Zeka Optimizasyonu)' },
    tagline: {
      en: 'Make your business visible both on Google Search and inside AI assistants like ChatGPT, Claude, Perplexity, and Gemini.',
      tr: 'İşletmenizi hem Google aramalarında hem de ChatGPT, Claude, Perplexity ve Gemini gibi yapay zeka yanıtlarında görünür kılın.',
    },
    timeline: { en: '1 - 3 weeks', tr: '1 - 3 hafta' },
    pages: { en: 'Site-wide Technical & Semantic Audit', tr: 'Site Geneli Teknik & Semantik Yapı' },
    brandScope: { en: 'Schema.org + llms.txt + Core Web Vitals', tr: 'Schema.org + llms.txt + Hız Optimizasyonu' },
    features: [
      {
        en: 'Rich Schema.org JSON-LD structured data (LocalBusiness, Service, FAQPage)',
        tr: 'Zengin Schema.org JSON-LD yapısal verileri (LocalBusiness, Service, FAQPage)',
      },
      {
        en: 'AIO corpus setup (llms.txt, llms-full.txt, semantic entity hierarchy)',
        tr: 'Yapay zeka botları için llms.txt, llms-full.txt ve semantik içerik mimarisi',
      },
      {
        en: 'Search Console, Bing Webmaster Tools, IndexNow, and sitemap automation',
        tr: 'Google Search Console, Bing Webmaster, IndexNow ve otomatik site haritası kaydı',
      },
      {
        en: 'Core Web Vitals performance tuning and semantic content restructuring',
        tr: 'Core Web Vitals hız optimizasyonu ve arama niyetine uygun içerik yapılandırması',
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
      en: 'How is project pricing determined?',
      tr: 'Proje fiyatlandırması nasıl belirleniyor?',
    },
    answer: {
      en: 'Every project has different technical requirements: a single-language corporate site, a multi-language platform with an admin panel, and a native mobile app have very different scopes. After a short discovery call or form message, I share a transparent, written proposal with clear deliverables and timeline.',
      tr: 'Her projenin teknik ihtiyacı farklıdır; tek dilli bir kurumsal site, yönetim panelli çok dilli bir platform veya App Store’a çıkacak bir mobil uygulama farklı kapsamlar gerektirir. İhtiyacınızı iletişim formundan ilettiğinizde kapsamı netleştirip şeffaf, yazılı bir teklif ve takvim paylaşıyorum.',
    },
  },
  {
    question: {
      en: 'Can you handle everything from domain purchase to going live?',
      tr: 'Alan adı alımından canlı yayına kadar tüm süreci üstleniyor musunuz?',
    },
    answer: {
      en: 'Yes. I handle domain registration, Cloudflare DNS, corporate email routing, design, development, SEO/AIO configuration, and production deployment so you do not have to coordinate multiple agencies or freelancers.',
      tr: 'Evet. Alan adı tescili, Cloudflare DNS, kurumsal e-posta kurulumu, tasarım, yazılım geliştirme, SEO/AIO ayarları ve canlıya alma adımlarının tamamını tek elden yönetiyorum.',
    },
  },
  {
    question: {
      en: 'What is AIO (AI Search Optimization) and why does it matter?',
      tr: 'AIO (Yapay Zeka Arama Optimizasyonu) nedir ve neden önemlidir?',
    },
    answer: {
      en: 'Customers increasingly ask ChatGPT, Gemini, Perplexity, and Claude for service recommendations. AIO uses structured Schema.org JSON-LD graphs, llms.txt files, and clear semantic hierarchy so AI models accurately understand and recommend your business.',
      tr: 'Kullanıcılar artık hizmet ve firma araştırmalarını yalnızca Google’da değil; ChatGPT, Gemini, Perplexity ve Claude üzerinden de yapıyor. AIO; sitenize eklenen Schema.org JSON-LD verileri, llms.txt dosyaları ve semantik içerik kurgusuyla yapay zeka modellerinin markanızı doğru tanıyıp önermesini sağlar.',
    },
  },
  {
    question: {
      en: 'Do you build both iOS and Android mobile applications?',
      tr: 'Hem iOS hem Android için mobil uygulama geliştiriyor musunuz?',
    },
    answer: {
      en: 'Yes. For Apple-ecosystem products (iOS, iPadOS, macOS, Widgets, Live Activities, iCloud sync) I build natively with Swift and SwiftUI. For cross-platform iOS and Android apps from a single codebase, I build with Flutter and Node.js/FastAPI backends.',
      tr: 'Evet. Apple ekosistemine özel ürünlerde (iOS, iPadOS, macOS, Widget, Live Activity, iCloud senkronizasyonu) Swift ve SwiftUI ile native geliştirme yapıyorum. Tek kod tabanıyla hem iOS hem Android hedefleyen projelerde ise Flutter ve Node.js/FastAPI altyapılarını kullanıyorum.',
    },
  },
  {
    question: {
      en: 'Do you provide maintenance and support after launch?',
      tr: 'Proje yayına alındıktan sonra teknik destek ve bakım sağlıyor musunuz?',
    },
    answer: {
      en: 'Yes. Every project includes post-launch stabilization support, and we can set up a monthly maintenance or feature-development retainer based on your needs.',
      tr: 'Evet. Teslim edilen her projede yayın sonrası doğrulama desteği bulunur; ayrıca talebinize göre düzenli bakım, içerik güncelleme ve yeni özellik geliştirme desteği sağlıyorum.',
    },
  },
];

/**
 * The four-step engineering delivery process shown on /packages.
 */
export const packageProcess: ProcessStep[] = [
  {
    title: { en: 'Discovery & Scope', tr: 'Keşif & Kapsam' },
    description: {
      en: 'We clarify your business goals, target audience, technical requirements, and timeline in a focused kickoff.',
      tr: 'İş hedeflerinizi, hedef kitlenizi ve teknik gereksinimleri netleştirip yol haritasını ve teslim takvimini çıkarıyoruz.',
    },
  },
  {
    title: { en: 'Architecture & UI Design', tr: 'Mimari & Tasarım' },
    description: {
      en: 'Information architecture, brand visual direction, database/API schema, and interface layouts are aligned before implementation.',
      tr: 'Bilgi mimarisi, kurumsal görsel dil, veritabanı/API şeması ve ekran tasarımları geliştirme öncesinde netleştirilir.',
    },
  },
  {
    title: { en: 'Engineering & SEO/AIO', tr: 'Geliştirme & SEO/AIO' },
    description: {
      en: 'Clean, tested mobile or web implementation with technical SEO, Schema.org JSON-LD, llms.txt, and security hardening.',
      tr: 'Mobil veya web uygulaması; teknik SEO, Schema.org JSON-LD, llms.txt ve güvenlik katmanlarıyla birlikte geliştirilir ve test edilir.',
    },
  },
  {
    title: { en: 'Launch & Handover', tr: 'Canlıya Alma & Teslim' },
    description: {
      en: 'Production deployment, DNS/SSL, Search Console & analytics verification, full source-code ownership, and post-launch support.',
      tr: 'Canlı sunucu/mağaza yayını, DNS/SSL, Search Console ve analitik kurulumları tamamlanarak tüm hesap ve kaynak kodlar teslim edilir.',
    },
  },
];
