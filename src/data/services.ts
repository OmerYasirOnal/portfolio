/**
 * Service architecture: three groups, each with a handful of concrete services.
 *
 * Single source of truth for the home-page cards, the /services hub, the
 * /services/<group> detail pages, the footer, llms.txt and the Service
 * JSON-LD. No prices on purpose: every engagement is quoted per scope.
 *
 * Copy rules (see CLAUDE.md "İşletme iddiaları"): no guaranteed rankings,
 * sales or ROAS; ad spend is always separate from the management fee; AI is a
 * tool under human review; nothing is published to a client account without
 * the client's approval.
 */
import type { Bilingual } from './profile';
import type { ContactTopic } from '../lib/contact';

export type ServiceGroupId = 'web-software' | 'ads-growth' | 'content-video';

export interface Service {
  /** Anchor id on the group page, e.g. /services/ads-growth/#google-ads */
  id: string;
  name: Bilingual;
  summary: Bilingual;
  items: Bilingual[];
  topic: ContactTopic;
  /** Optional honest scope note (ad spend, approval, etc.). */
  note?: Bilingual;
}

export interface ServiceFaq {
  question: Bilingual;
  answer: Bilingual;
}

export interface ServiceGroup {
  id: ServiceGroupId;
  /** Short card / menu title. */
  short: Bilingual;
  /** Page H1. */
  title: Bilingual;
  /** <title> tag (without the name suffix). */
  seoTitle: Bilingual;
  /** Meta description. */
  description: Bilingual;
  /** One-line card summary. */
  cardSummary: Bilingual;
  /** Page intro paragraph. */
  intro: Bilingual;
  /** Why an engineer, in one or two sentences. */
  angle: Bilingual;
  topic: ContactTopic;
  services: Service[];
  /** Project slugs (src/content/projects) shown as proof on the page. */
  work: string[];
  faqs: ServiceFaq[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'web-software',
    short: { tr: 'Web Sitesi & Yazılım', en: 'Websites & Software' },
    title: {
      tr: 'Web sitesi, özel yazılım ve mobil uygulama',
      en: 'Websites, custom software and mobile apps',
    },
    seoTitle: {
      tr: 'Kurumsal Web Sitesi, Özel Yazılım ve Mobil Uygulama Geliştirme',
      en: 'Business Websites, Custom Software and Mobile App Development',
    },
    description: {
      tr: 'İşletmeler için hızlı, mobil uyumlu kurumsal web siteleri, yönetim panelleri, özel yazılım ve iOS uygulamaları. Bilgisayar Mühendisi Ömer Yasir Önal, İstanbul.',
      en: 'Fast, mobile-first business websites, admin panels, custom software and iOS apps, built by Computer Engineer Ömer Yasir Önal in Istanbul.',
    },
    cardSummary: {
      tr: 'Hızlı açılan kurumsal siteler, yönetim panelleri, özel yazılım ve mobil uygulamalar.',
      en: 'Fast business websites, admin panels, custom software and mobile apps.',
    },
    intro: {
      tr: 'Ziyaretçinin ilk birkaç saniyede ne yaptığınızı anladığı, telefonda hızlı açılan ve sizi aramaya ya da WhatsApp’a yönlendiren siteler kuruyorum. İhtiyaç bir siteden büyükse yönetim paneli, özel yazılım veya mobil uygulama da geliştiriyorum.',
      en: 'I build sites that load fast on a phone, make clear in seconds what you do, and lead visitors to call or message you. When the need is bigger than a website, I also build admin panels, custom software and mobile apps.',
    },
    angle: {
      tr: 'Tasarımı, kodu, yayını ve sonraki bakımı aynı kişi yapıyor. Arada aktarım kaybı olmuyor; siteniz, alan adınız ve hesaplarınız size teslim ediliyor.',
      en: 'Design, code, launch and maintenance are done by the same person, so nothing gets lost in handoffs. Your site, domain and accounts are handed over to you.',
    },
    topic: 'web',
    services: [
      {
        id: 'website',
        name: { tr: 'Kurumsal web sitesi', en: 'Business website' },
        summary: {
          tr: 'Şirket, klinik, restoran, salon ve hizmet işletmeleri için tanıtım ve teklif toplayan siteler.',
          en: 'Sites for companies, clinics, restaurants, salons and service businesses that present you and collect enquiries.',
        },
        items: [
          { tr: 'Mobil öncelikli, hızlı açılan tasarım', en: 'Mobile-first design that loads fast' },
          { tr: 'Tek sayfalık açılış ve kampanya sayfaları', en: 'Single-page landing and campaign pages' },
          { tr: 'Çok dilli siteler (TR / EN / AR)', en: 'Multilingual sites (TR / EN / AR)' },
          { tr: 'WhatsApp, form, harita ve telefon entegrasyonu', en: 'WhatsApp, form, map and phone integrations' },
          { tr: 'Teknik SEO, hız ve Core Web Vitals', en: 'Technical SEO, speed and Core Web Vitals' },
          { tr: 'Alan adı, hosting, SSL ve kurumsal e-posta kurulumu (kapsama göre)', en: 'Domain, hosting, SSL and business email setup (as scoped)' },
        ],
        topic: 'web',
      },
      {
        id: 'custom-software',
        name: { tr: 'Özel yazılım ve yönetim paneli', en: 'Custom software and admin panels' },
        summary: {
          tr: 'Excel ve WhatsApp’ta dağılan işleri tek bir panelde toplayan, işletmeye özel web uygulamaları.',
          en: 'Web apps tailored to your business that bring work scattered across spreadsheets and chats into one panel.',
        },
        items: [
          { tr: 'İçerik, randevu ve başvuru yönetim panelleri', en: 'Content, booking and application panels' },
          { tr: 'Müşteri ve iş akışı takip uygulamaları', en: 'Customer and workflow tracking apps' },
          { tr: 'API geliştirme ve üçüncü taraf entegrasyonları', en: 'API development and third-party integrations' },
          { tr: 'Güvenli giriş, yetkilendirme ve yedekleme', en: 'Secure sign-in, permissions and backups' },
        ],
        topic: 'software',
      },
      {
        id: 'mobile',
        name: { tr: 'Mobil uygulama ve MVP', en: 'Mobile apps and MVPs' },
        summary: {
          tr: 'Fikri, gerçek kullanıcıların deneyebileceği çalışan bir uygulamaya dönüştürme. App Store’da yayında iki uygulamam var.',
          en: 'Turning an idea into a working app real users can try. I have two apps live on the App Store.',
        },
        items: [
          { tr: 'iPhone, iPad ve Mac için SwiftUI uygulamaları', en: 'SwiftUI apps for iPhone, iPad and Mac' },
          { tr: 'Uygulamanın kendi sunucusu ve veri tabanı', en: 'The app’s own backend and database' },
          { tr: 'TestFlight ile test, App Store yayın süreci', en: 'TestFlight testing and App Store release' },
          { tr: 'Prototip ve MVP geliştirme', en: 'Prototype and MVP development' },
        ],
        topic: 'mobile',
      },
    ],
    work: ['ozsaye', 'parladeniz', 'a2reklam', 'odak', 'unisum'],
    faqs: [
      {
        question: { tr: 'Bir web sitesi ne kadar sürede hazır olur?', en: 'How long does a website take?' },
        answer: {
          tr: 'Kapsama bağlı. Tek sayfalık bir tanıtım sitesi ile çok dilli, yönetim panelli bir kurumsal site çok farklı işler. İlk görüşmede içeriklerinizin ne kadar hazır olduğuna bakıp net bir takvim veriyorum.',
          en: 'It depends on scope. A one-page site and a multilingual site with an admin panel are very different jobs. In the first call I look at how ready your content is and give you a concrete timeline.',
        },
      },
      {
        question: { tr: 'Site, alan adı ve hesaplar kimin üzerine olur?', en: 'Who owns the site, domain and accounts?' },
        answer: {
          tr: 'Sizin. Alan adı, hosting ve analiz hesapları işletmenin adına açılır ya da teslimde size devredilir. Kaynak kod ve erişim bilgileri teslim belgesiyle birlikte verilir.',
          en: 'You do. The domain, hosting and analytics accounts are opened in the business’s name or transferred to you at handover, together with the source code and access details.',
        },
      },
      {
        question: { tr: 'Teslimden sonra destek veriyor musunuz?', en: 'Do you offer support after launch?' },
        answer: {
          tr: 'Evet. Küçük düzeltmeler ve içerik güncellemeleri için teslim sonrası destek veriyorum; düzenli bakım isterseniz aylık olarak ayrıca planlıyoruz.',
          en: 'Yes. I handle fixes and small content updates after launch, and we can plan ongoing monthly maintenance separately if you want it.',
        },
      },
      {
        question: { tr: 'Fiyatlar nasıl belirleniyor?', en: 'How is pricing set?' },
        answer: {
          tr: 'Sabit paket yerine kapsamınıza özel teklif hazırlıyorum: sayfa sayısı, dil, panel ihtiyacı ve entegrasyonlar fiyatı belirliyor. WhatsApp’tan kısaca anlatmanız yeterli.',
          en: 'Instead of fixed packages I quote each project: pages, languages, panel needs and integrations drive the price. A short WhatsApp message is enough to start.',
        },
      },
    ],
  },
  {
    id: 'ads-growth',
    short: { tr: 'Reklam & Dijital Büyüme', en: 'Ads & Digital Growth' },
    title: {
      tr: 'Google Ads, Meta reklamları, SEO ve yapay zekâ araması',
      en: 'Google Ads, Meta ads, SEO and AI search visibility',
    },
    seoTitle: {
      tr: 'Google Ads Yönetimi, Meta Reklamları, SEO ve GEO / AEO Hizmeti',
      en: 'Google Ads Management, Meta Ads, SEO and GEO / AEO Services',
    },
    description: {
      tr: 'Google Ads ve Instagram / Facebook reklam yönetimi, teknik SEO, yerel SEO ve yapay zekâ aramalarında (AI Overviews, ChatGPT) görünürlük. Ölçülebilir, garanti vaadi olmayan dürüst çalışma.',
      en: 'Google Ads and Instagram / Facebook ads management, technical and local SEO, and visibility in AI search (AI Overviews, ChatGPT). Measurable work with no fake guarantees.',
    },
    cardSummary: {
      tr: 'Google ve Meta reklamları, SEO, yapay zekâ aramalarında görünürlük ve doğru ölçüm.',
      en: 'Google and Meta ads, SEO, AI search visibility and proper measurement.',
    },
    intro: {
      tr: 'Reklama para harcayıp hangi aramanın, hangi mesajın geldiğini bilmemek en sık gördüğüm sorun. Önce ölçümü kuruyorum, sonra reklamı ve arama görünürlüğünü bu verilere göre yönetiyorum.',
      en: 'The most common problem I see is paying for ads without knowing which searches and which messages actually bring customers. I set up measurement first, then run ads and search visibility on that data.',
    },
    angle: {
      tr: 'Reklam hesabını, siteyi ve dönüşüm takibini aynı kişi yönettiğinde açılış sayfası ile kampanya birbirini tutar. Gerekirse sitede değişikliği de ben yapıyorum.',
      en: 'When the same person runs the ad account, the website and conversion tracking, landing pages and campaigns stay aligned, and I can change the site myself when needed.',
    },
    topic: 'google-ads',
    services: [
      {
        id: 'google-ads',
        name: { tr: 'Google Ads yönetimi', en: 'Google Ads management' },
        summary: {
          tr: 'Arama ağı kampanyaları: sizi arayan kişinin karşısına doğru mesajla çıkmak.',
          en: 'Search campaigns that put the right message in front of people already looking for you.',
        },
        items: [
          { tr: 'Anahtar kelime ve arama niyeti araştırması', en: 'Keyword and search-intent research' },
          { tr: 'Kampanya yapısı, konum ve hedef kitle ayarları', en: 'Campaign structure, location and audience settings' },
          { tr: 'Reklam metinleri ve açılış sayfası önerileri', en: 'Ad copy and landing-page recommendations' },
          { tr: 'Arama, WhatsApp ve form dönüşüm ölçümü (GTM / GA4)', en: 'Call, WhatsApp and form conversion tracking (GTM / GA4)' },
          { tr: 'Arama terimi temizliği ve bütçe optimizasyonu', en: 'Search-term cleanup and budget optimisation' },
          { tr: 'Anlaşılır, düzenli performans raporu', en: 'Clear, regular performance reports' },
        ],
        topic: 'google-ads',
        note: {
          tr: 'Reklam bütçesi doğrudan Google’a ödenir ve yönetim ücretinden ayrıdır.',
          en: 'Ad spend is paid directly to Google and is separate from the management fee.',
        },
      },
      {
        id: 'meta-ads',
        name: { tr: 'Instagram ve Facebook (Meta) reklamları', en: 'Instagram and Facebook (Meta) ads' },
        summary: {
          tr: 'Henüz sizi aramayan ama ilgilenebilecek kişilere görsel ve videoyla ulaşmak.',
          en: 'Reaching people who are not searching for you yet but are likely to care, with visuals and video.',
        },
        items: [
          { tr: 'Hedef kitle ve kampanya stratejisi', en: 'Audience and campaign strategy' },
          { tr: 'Reklam kreatifleri (görsel, Reels, carousel)', en: 'Ad creatives (images, Reels, carousels)' },
          { tr: 'A/B test planı', en: 'A/B test planning' },
          { tr: 'Yeniden pazarlama (retargeting) kurgusu', en: 'Retargeting setup' },
          { tr: 'Meta Pixel / Conversions API ve WhatsApp mesaj ölçümü', en: 'Meta Pixel / Conversions API and WhatsApp message tracking' },
          { tr: 'Kampanya analizi ve raporlama', en: 'Campaign analysis and reporting' },
        ],
        topic: 'meta-ads',
        note: {
          tr: 'Reklam bütçesi Meta’ya ayrıca ödenir. Hiçbir reklam ve gönderi onayınız olmadan yayına alınmaz.',
          en: 'Ad spend is paid to Meta separately. No ad or post goes live without your approval.',
        },
      },
      {
        id: 'seo',
        name: { tr: 'SEO ve yerel SEO', en: 'SEO and local SEO' },
        summary: {
          tr: 'Google’da reklam ödemeden bulunmak: teknik altyapı, doğru içerik ve Google İşletme Profili.',
          en: 'Getting found on Google without paying per click: technical foundations, the right content and your Business Profile.',
        },
        items: [
          { tr: 'Teknik SEO denetimi ve indekslenebilirlik', en: 'Technical SEO audit and indexability' },
          { tr: 'Sayfa hızı ve Core Web Vitals', en: 'Page speed and Core Web Vitals' },
          { tr: 'Anahtar kelime ve arama niyeti analizi', en: 'Keyword and search-intent analysis' },
          { tr: 'Hizmet ve bölge sayfaları, iç bağlantı mimarisi', en: 'Service and location pages, internal linking' },
          { tr: 'Google İşletme Profili ve yerel SEO', en: 'Google Business Profile and local SEO' },
          { tr: 'Search Console takibi ve yapılandırılmış veri', en: 'Search Console monitoring and structured data' },
        ],
        topic: 'seo',
        note: {
          tr: 'Hiç kimse Google’da belirli bir sırayı garanti edemez; ben de etmiyorum. Yapılan işi ve sonuçları Search Console verisiyle gösteriyorum.',
          en: 'Nobody can guarantee a specific Google position, and I don’t. I show the work and results with Search Console data.',
        },
      },
      {
        id: 'geo-aeo',
        name: { tr: 'Yapay zekâ aramalarında görünürlük (GEO / AEO)', en: 'AI search visibility (GEO / AEO)' },
        summary: {
          tr: 'Google AI Overviews, ChatGPT ve Perplexity gibi cevap motorlarının işletmenizi doğru anlayıp kaynak gösterebileceği bir web varlığı.',
          en: 'A web presence that answer engines like Google AI Overviews, ChatGPT and Perplexity can understand correctly and cite.',
        },
        items: [
          { tr: 'Taranabilirlik ve teknik SEO temeli', en: 'Crawlability and a technical SEO baseline' },
          { tr: 'Müşteri sorularına net cevap veren içerik yapısı', en: 'Content structured around the questions customers ask' },
          { tr: 'Tutarlı kurumsal bilgiler (site, harita, profiller)', en: 'Consistent business facts across site, maps and profiles' },
          { tr: 'Doğru yapılandırılmış veri (schema.org)', en: 'Correct structured data (schema.org)' },
          { tr: 'Özgün, kaynağı doğrulanabilir içerik', en: 'Original, verifiable content' },
          { tr: 'Görünürlüğün düzenli ölçümü', en: 'Regular visibility measurement' },
        ],
        topic: 'geo',
        note: {
          tr: 'GEO: Generative Engine Optimization, AEO: Answer Engine Optimization. Google, AI Overviews için ek bir teknik gereklilik olmadığını, iyi SEO uygulamalarının geçerli olduğunu belirtiyor. Bu yüzden “gizli yöntem” değil, sağlam temel ve iyi içerik sunuyorum.',
          en: 'GEO: Generative Engine Optimization, AEO: Answer Engine Optimization. Google states there are no extra technical requirements for AI Overviews and that SEO best practices apply, so I offer solid foundations and good content, not secret tricks.',
        },
      },
    ],
    work: ['a2reklam', 'ozsaye', 'parladeniz'],
    faqs: [
      {
        question: { tr: 'Reklam bütçesi ücrete dahil mi?', en: 'Is ad spend included in the fee?' },
        answer: {
          tr: 'Hayır. Reklam bütçesi kartınızdan doğrudan Google’a veya Meta’ya ödenir. Benim ücretim yalnızca kurulum ve yönetim içindir; harcamayı her zaman kendi hesabınızda görürsünüz.',
          en: 'No. Ad spend is charged directly to your card by Google or Meta. My fee covers setup and management only, and you always see the spend in your own account.',
        },
      },
      {
        question: { tr: 'İlk ayda sonuç alır mıyım?', en: 'Will I see results in the first month?' },
        answer: {
          tr: 'Reklamlarda ilk hafta trafik başlar ama kampanyanın oturması birkaç hafta veri ister. SEO ise aylar içinde birikir. Satış ya da sıralama garantisi vermiyorum; ne yaptığımı ve ne değiştiğini düzenli raporluyorum.',
          en: 'Ads bring traffic in the first week, but campaigns need a few weeks of data to settle. SEO compounds over months. I don’t promise sales or rankings; I report what I did and what changed.',
        },
      },
      {
        question: { tr: 'GEO / AEO, SEO’dan farklı mı?', en: 'Is GEO / AEO different from SEO?' },
        answer: {
          tr: 'Büyük ölçüde aynı temele dayanıyor. Google’ın yapay zekâ özellikleri aynı arama dizinini ve kalite sinyallerini kullanıyor. Fark, içeriği müşterinin sorduğu sorulara net cevap verecek ve bilgileri her yerde tutarlı olacak şekilde düzenlemekte.',
          en: 'It rests largely on the same foundation: Google’s AI features use the same search index and quality signals. The difference is structuring content to answer real customer questions clearly and keeping your facts consistent everywhere.',
        },
      },
      {
        question: { tr: 'Hesaplarıma erişim nasıl olacak?', en: 'How will account access work?' },
        answer: {
          tr: 'Hesaplar sizin adınıza kalır; bana yönetici erişimi verirsiniz ve istediğiniz an geri alabilirsiniz. Şifre istemem.',
          en: 'Accounts stay in your name; you give me manager access and can revoke it any time. I never ask for passwords.',
        },
      },
    ],
  },
  {
    id: 'content-video',
    short: { tr: 'Sosyal Medya & AI İçerik', en: 'Social Media & AI Content' },
    title: {
      tr: 'Sosyal medya yönetimi, Reels ve profesyonel AI içerik üretimi',
      en: 'Social media management, Reels and professional AI content',
    },
    seoTitle: {
      tr: 'Sosyal Medya Yönetimi, AI Video ve Reels İçerik Üretimi, Dijital Persona',
      en: 'Social Media Management, AI Video and Reels Production, Digital Personas',
    },
    description: {
      tr: 'Instagram ve Facebook hesap yönetimi, yapay zekâ destekli profesyonel video ve Reels üretimi, tanıtım filmi ve logo animasyonu, markaya özel sanal sunucu, içerik takvimi ve Meta reklamlarıyla birlikte planlama.',
      en: 'Instagram and Facebook account management, professional AI-assisted video and Reels production, promo films and logo animations, brand virtual presenters, content calendars planned together with Meta ads.',
    },
    cardSummary: {
      tr: 'Hesap yönetimi, yapay zekâ destekli Reels ve video, sanal sunucu ve düzenli içerik takvimi.',
      en: 'Account management, AI-assisted Reels and video, virtual presenters and a steady content calendar.',
    },
    intro: {
      tr: 'Sizi anlatan kısa videolar ve düzenli içerik üretiyorum: Reels kurgusu, tanıtım filmi, logo animasyonu ve gerekirse markanıza özel bir sanal sunucu. Konu, mesaj ve marka dili sizinle belirleniyor; her içerik yayından önce onayınıza geliyor.',
      en: 'I produce short videos and regular content about your business: Reels edits, promo films, logo animations and, if useful, a virtual presenter for your brand. Topic, message and voice are agreed with you, and every piece comes to you for approval before it goes out.',
    },
    angle: {
      tr: 'Kendi Instagram serimi senaryodan kurguya, seslendirmeden kod tabanlı animasyona kadar kendim üretiyorum. Aynı üretim hattını markanız için kuruyorum.',
      en: 'I produce my own Instagram series end to end, from script and voice-over to code-driven animation and editing. I set up the same pipeline for your brand.',
    },
    topic: 'content',
    services: [
      {
        id: 'reels-video',
        name: { tr: 'Reels kurgu ve video edit', en: 'Reels editing and video production' },
        summary: {
          tr: 'Dikey videolar, tanıtım filmleri ve logo animasyonları; çekiminiz varsa kurgu, yoksa sıfırdan üretim.',
          en: 'Vertical videos, promo films and logo animations: editing your footage, or producing from scratch.',
        },
        items: [
          { tr: 'Reels kurgu ve montaj', en: 'Reels editing and cutting' },
          { tr: 'Hareketli yazı, altyazı ve geçişler', en: 'Motion text, subtitles and transitions' },
          { tr: 'Tanıtım filmi ve kampanya videoları', en: 'Promo films and campaign videos' },
          { tr: 'Logo animasyonu ve marka açılışları', en: 'Logo animations and brand intros' },
          { tr: 'Seslendirme ve müzik', en: 'Voice-over and music' },
          { tr: 'Dikey (9:16) Reels, Hikâye ve reklam formatları', en: 'Vertical (9:16) Reels, Stories and ad formats' },
        ],
        topic: 'video',
      },
      {
        id: 'persona',
        name: { tr: 'Dijital persona ve sanal sunucu', en: 'Digital persona and virtual presenter' },
        summary: {
          tr: 'Kamera önüne geçmek istemeyen markalar için yüzü, sesi ve tarzı tutarlı bir sanal sunucu.',
          en: 'A virtual presenter with a consistent face, voice and style for brands that don’t want to be on camera.',
        },
        items: [
          { tr: 'Markaya uygun karakter tasarımı (görünüm, ses, üslup)', en: 'Character design that fits the brand (look, voice, tone)' },
          { tr: 'Tanıtım ve bilgilendirme videolarında kullanım', en: 'Use in promo and explainer videos' },
          { tr: 'Seri içeriklerde aynı yüzle süreklilik', en: 'The same face across a content series' },
          { tr: 'Türkçe ve İngilizce seslendirme', en: 'Turkish and English voice-over' },
        ],
        topic: 'video',
        note: {
          tr: 'Sanal kişiler platform kurallarına göre etiketlenir. Gerçek bir kişiyi taklit eden persona üretmiyorum.',
          en: 'Virtual people are labelled according to platform rules. I don’t create personas that imitate a real person.',
        },
      },
      {
        id: 'instagram-content',
        name: { tr: 'Instagram içerik üretimi', en: 'Instagram content production' },
        summary: {
          tr: 'Reels, gönderi ve carousel içerikleri: fikirden metne, kurgudan açıklamaya.',
          en: 'Reels, posts and carousels: from idea to script, edit and caption.',
        },
        items: [
          { tr: 'Reels konseptleri ve konu araştırması', en: 'Reels concepts and topic research' },
          { tr: 'Senaryo ve metin yazımı', en: 'Scripts and copywriting' },
          { tr: 'Gönderi ve carousel tasarımı', en: 'Post and carousel design' },
          { tr: 'Türkçe / İngilizce altyazı', en: 'Turkish / English subtitles' },
          { tr: 'Açıklama, başlık ve hashtag hazırlığı', en: 'Captions, headlines and hashtags' },
          { tr: 'Marka tonuna uygun anlatım', en: 'Writing in your brand voice' },
        ],
        topic: 'content',
        note: {
          tr: 'İçerik üretimi ile tam hesap yönetimi (mesajlara cevap, günlük paylaşım) ayrı kapsamlardır. Hesabınızda onayınız olmadan işlem yapılmaz.',
          en: 'Content production and full account management (replying to DMs, daily posting) are separate scopes. Nothing is done on your account without your approval.',
        },
      },
      {
        id: 'social-management',
        name: { tr: 'Sosyal medya hesap yönetimi', en: 'Social media account management' },
        summary: {
          tr: 'Instagram ve Facebook hesabınızın planlı, düzenli ve markaya uygun yürümesi: içerik takvimi, üretim, paylaşım ve Meta reklamlarıyla uyum.',
          en: 'Running your Instagram and Facebook on a plan: content calendar, production, posting and alignment with Meta ads.',
        },
        items: [
          { tr: 'Aylık içerik takvimi ve seri kurgusu', en: 'Monthly content calendar and series planning' },
          { tr: 'Reels, gönderi ve hikâye üretimi', en: 'Reels, post and Story production' },
          { tr: 'Açıklama, sabit yorum ve harekete geçirici mesaj', en: 'Captions, pinned comments and calls to action' },
          { tr: 'Profil, öne çıkanlar ve biyografi düzeni', en: 'Profile, highlights and bio setup' },
          { tr: 'Organik içerik ile Meta reklamlarının birlikte planlanması', en: 'Organic content planned together with Meta ads' },
          { tr: 'Aylık izlenme, kaydetme ve mesaj raporu', en: 'Monthly views, saves and messages report' },
        ],
        topic: 'content',
        note: {
          tr: 'Her içerik yayından önce onayınıza gelir. Takipçi satın alma, bot ya da etkileşim garantisi yok.',
          en: 'Every piece comes to you for approval before it goes out. No bought followers, bots or engagement guarantees.',
        },
      },
      {
        id: 'content-strategy',
        name: { tr: 'Sosyal medya içerik stratejisi', en: 'Social media content strategy' },
        summary: {
          tr: 'Ne paylaşacağınızı, ne zaman ve kime paylaşacağınızı belirleyen plan.',
          en: 'A plan for what to post, when, and for whom.',
        },
        items: [
          { tr: 'Hedef kitle ve rakip analizi', en: 'Audience and competitor analysis' },
          { tr: 'İçerik kategorileri ve seri fikirleri', en: 'Content pillars and series ideas' },
          { tr: 'Haftalık / aylık yayın takvimi', en: 'Weekly / monthly publishing calendar' },
          { tr: 'Organik içerik ile reklamın birlikte planlanması', en: 'Coordinating organic content with ads' },
          { tr: 'Aylık performans değerlendirmesi', en: 'Monthly performance review' },
        ],
        topic: 'content',
      },
      {
        id: 'automation',
        name: { tr: 'Yapay zekâ asistanları ve otomasyon', en: 'AI assistants and automation' },
        summary: {
          tr: 'Tekrarlayan işleri azaltan, şirket bilgisiyle çalışan asistanlar ve iş akışları.',
          en: 'Assistants and workflows that use your company knowledge and cut repetitive work.',
        },
        items: [
          { tr: 'Doküman ve bilgi bankası asistanları (RAG)', en: 'Document and knowledge-base assistants (RAG)' },
          { tr: 'Kurumsal doküman arama', en: 'Internal document search' },
          { tr: 'Form, e-posta ve teklif süreçlerinin otomasyonu', en: 'Automating forms, email and quote workflows' },
          { tr: 'API tabanlı yapay zekâ entegrasyonları', en: 'API-based AI integrations' },
          { tr: 'İnsan onaylı, kayıt tutan iş akışları', en: 'Human-approved, logged workflows' },
        ],
        topic: 'automation',
      },
    ],
    work: ['a2reklam-video', 'kuran-reels', 'ozsaye', 'akis'],
    faqs: [
      {
        question: { tr: 'Çekim yapmam gerekiyor mu?', en: 'Do I need to film anything?' },
        answer: {
          tr: 'Şart değil. Elinizde çekim varsa kurguluyorum; yoksa görsel, animasyon, seslendirme ve gerekirse sanal sunucuyla sıfırdan üretiyorum. Modern üretim araçlarını (yapay zekâ dahil) kullanıyorum, ama mesajı ve son kontrolü insan belirliyor.',
          en: 'Not necessarily. If you have footage I edit it; if not, I produce from scratch with visuals, animation, voice-over and, if useful, a virtual presenter. I use modern production tools (AI included), but the message and the final check are human.',
        },
      },
      {
        question: { tr: 'Hesabımı siz mi yöneteceksiniz?', en: 'Will you run my account?' },
        answer: {
          tr: 'İsterseniz sadece içerik üretiyorum, paylaşımı siz yapıyorsunuz. Tam hesap yönetimi ayrı bir kapsam; o durumda bile hiçbir paylaşım onayınız olmadan yapılmıyor.',
          en: 'If you prefer, I only produce the content and you post it. Full account management is a separate scope, and even then nothing is posted without your approval.',
        },
      },
      {
        question: { tr: 'Ayda kaç içerik üretilebilir?', en: 'How many pieces per month?' },
        answer: {
          tr: 'Hedefinize ve içerik türüne göre planlıyoruz. Reels, gönderi ve carousel karışımı için ilk görüşmede gerçekçi bir aylık plan çıkarıyorum.',
          en: 'We plan it around your goals and formats. In the first call I draft a realistic monthly mix of Reels, posts and carousels.',
        },
      },
    ],
  },
];

export function serviceGroup(id: ServiceGroupId): ServiceGroup {
  const g = serviceGroups.find((s) => s.id === id);
  if (!g) throw new Error(`Unknown service group: ${id}`);
  return g;
}

/** "What can I do for you?" prompts on the home page, phrased as the visitor. */
export const problemPrompts: { text: Bilingual; group: ServiceGroupId; anchor: string }[] = [
  {
    text: { tr: 'İşletmem için profesyonel bir web sitesi istiyorum.', en: 'I need a professional website for my business.' },
    group: 'web-software',
    anchor: 'website',
  },
  {
    text: { tr: 'Google’da daha görünür olmak istiyorum.', en: 'I want to be more visible on Google.' },
    group: 'ads-growth',
    anchor: 'seo',
  },
  {
    text: { tr: 'Sosyal medya hesabımı profesyonel biri yönetsin istiyorum.', en: 'I want a professional to run my social media.' },
    group: 'content-video',
    anchor: 'social-management',
  },
  {
    text: { tr: 'Reklam veriyorum ama sonuçları ölçemiyorum.', en: 'I run ads but can’t measure the results.' },
    group: 'ads-growth',
    anchor: 'google-ads',
  },
  {
    text: { tr: 'Markam için Reels ve tanıtım videosu istiyorum.', en: 'I want Reels and a promo video for my brand.' },
    group: 'content-video',
    anchor: 'reels-video',
  },
  {
    text: {
      tr: 'Bazı işlerimizi yapay zekâyla otomatikleştirmek istiyorum.',
      en: 'I want to automate some of our work with AI.',
    },
    group: 'content-video',
    anchor: 'automation',
  },
];

export interface ProcessStep {
  title: Bilingual;
  description: Bilingual;
}

export const processSteps: ProcessStep[] = [
  {
    title: { tr: 'Dinliyorum', en: 'I listen' },
    description: {
      tr: 'WhatsApp’tan ya da kısa bir görüşmede işinizi, hedefinizi ve elinizdekileri konuşuyoruz.',
      en: 'Over WhatsApp or a short call we go through your business, goals and what you already have.',
    },
  },
  {
    title: { tr: 'Kapsamı netleştiriyoruz', en: 'We define the scope' },
    description: {
      tr: 'Neyin yapılacağını, neyin yapılmayacağını, takvimi ve fiyatı yazılı olarak paylaşıyorum.',
      en: 'I put in writing what will and won’t be done, the timeline and the price.',
    },
  },
  {
    title: { tr: 'Geliştiriyorum', en: 'I build' },
    description: {
      tr: 'Tasarım ve uygulamayı ara önizlemelerle ilerletiyorum; geri bildiriminizle şekilleniyor.',
      en: 'I build in steps with previews along the way, shaped by your feedback.',
    },
  },
  {
    title: { tr: 'Teslim ve destek', en: 'Launch and support' },
    description: {
      tr: 'Test edip yayına alıyorum, hesapları ve belgeleri teslim ediyorum. Sonrasında da ulaşabiliyorsunuz.',
      en: 'I test, launch and hand over accounts and documentation. You can still reach me afterwards.',
    },
  },
];
