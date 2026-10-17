export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

const dict: Record<string, Record<Locale, string>> = {
  'a11y.skip': { en: 'Skip to content', tr: 'İçeriğe geç' },
  'nav.work': { en: 'Projects', tr: 'Projeler' },
  'nav.services': { en: 'Services', tr: 'Hizmetler' },
  'nav.packages': { en: 'Services', tr: 'Hizmetler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.writing': { en: 'Writing', tr: 'Yazılar' },
  'nav.cv': { en: 'CV', tr: 'Özgeçmiş' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'hero.status': {
    en: 'Available for new projects & software engineering roles',
    tr: 'Yeni projeler ve yazılım mühendisliği iş birlikleri için uygun',
  },
  'hero.viewWork': { en: 'Explore Projects', tr: 'Projeleri İncele' },
  'hero.viewPackages': { en: 'Services & Solutions', tr: 'Hizmetler & Çözümler' },
  'hero.contactCta': { en: 'Request a Quote / Contact', tr: 'Teklif Al / İletişime Geç' },
  'hero.resume': { en: 'CV', tr: 'Özgeçmiş (CV)' },
  'hero.pillar.mobile': { en: 'Mobile Apps (iOS & macOS)', tr: 'Mobil Uygulama (iOS & macOS)' },
  'hero.pillar.web': { en: 'Corporate Web & CMS', tr: 'Kurumsal Web & Yönetim Paneli' },
  'hero.pillar.brand': { en: 'Brand Setup & Digital Infra', tr: 'Marka Kurulumu & Dijital Altyapı' },
  'hero.pillar.seo': { en: 'SEO & AIO (AI Search)', tr: 'SEO & AIO (Yapay Zeka Araması)' },
  'hero.pillar.ai': { en: 'Backend, API & AI Systems', tr: 'Backend, API & Yapay Zeka' },
  'section.about': { en: 'About & Engineering Approach', tr: 'Hakkımda & Mühendislik Yaklaşımı' },
  'section.selectedWork': { en: 'Featured Products & Client Work', tr: 'Öne Çıkan Ürünler & Marka Projeleri' },
  'section.experience': { en: 'Experience & Background', tr: 'Deneyim & Geçmiş' },
  'section.skills': { en: 'Technical Capabilities', tr: 'Teknik Yetkinlikler' },
  'section.writing': { en: 'Writing & Publications', tr: 'Yazılar & Akademik Yayınlar' },
  'section.contact': { en: 'Contact & Project Inquiry', tr: 'İletişim & Proje Formu' },
  'section.services': { en: 'Engineering & Digital Solutions', tr: 'Yazılım & Dijital Çözüm Alanları' },
  'section.more': { en: 'Additional Engineering & Open-Source Work', tr: 'Diğer Mühendislik & Açık Kaynak Çalışmaları' },
  'work.filter.all': { en: 'All Selected Work', tr: 'Tümü' },
  'work.filter.products': { en: 'Own Products & AI', tr: 'Kendi Ürünlerim & AI' },
  'work.filter.clients': { en: 'Corporate Web & Brand', tr: 'Kurumsal Web & Marka İşleri' },
  'work.card.caseStudy': { en: 'Case Study', tr: 'Proje Detayı' },
  'work.viewAll': { en: 'View all projects & open-source work →', tr: 'Tüm projeleri ve açık kaynak çalışmaları gör →' },
  'services.intro': {
    en: 'As a full-stack computer engineer, I handle your software needs end to end: from native mobile apps on the App Store to high-conversion corporate websites, digital brand setup, and SEO/AIO optimization.',
    tr: 'Tam donanımlı bir bilgisayar mühendisi olarak fikir aşamasından yayına ve büyümeye kadar tüm yazılım süreçlerinizi tek elden yönetiyorum: App Store’da yayında olan mobil uygulamalardan kurumsal web sitelerine, dijital marka altyapısından SEO ve AIO görünürlüğüne kadar.',
  },
  'services.cta': { en: 'Explore detailed service scope & process →', tr: 'Tüm hizmet kapsamını ve çalışma sürecini incele →' },
  'services.quoteCta': { en: 'Request a quote for this service', tr: 'Bu alan için iletişime geç' },
  'projects.title': { en: 'Projects & Products', tr: 'Projeler & Ürünler' },
  'projects.intro': {
    en: 'Products published on the App Store, multi-agent AI platforms, and end-to-end corporate web and brand systems delivered to real clients.',
    tr: 'App Store’da yayımladığım ürünler, çok ajanlı yapay zeka sistemleri ve müşterilerim için uçtan uca kurduğum kurumsal web ve marka projeleri.',
  },
  'projects.backToAll': { en: 'All projects', tr: 'Tüm projeler' },
  'project.overview': { en: 'Overview', tr: 'Genel Bakış' },
  'project.stack': { en: 'Technologies', tr: 'Kullanılan Teknolojiler' },
  'project.problem': { en: 'Need & Context', tr: 'İhtiyaç & Bağlam' },
  'project.whatIDid': { en: 'Solution & Architecture', tr: 'Çözüm & Mimari' },
  'project.highlights': { en: 'Key Deliverables', tr: 'Öne Çıkan Çıktılar' },
  'contact.intro': {
    en: 'Whether you want to build a mobile app, establish a corporate website and digital brand, improve your SEO/AIO visibility, or discuss an engineering role, fill out the form below to send a direct message to my inbox.',
    tr: 'Yeni bir mobil uygulama, kurumsal web sitesi, dijital marka kurulumu, SEO/AIO çalışması veya yazılım mühendisliği iş birliği için aşağıdaki formu doldurarak doğrudan e-posta kutuma mesaj gönderebilirsiniz.',
  },
  'contact.form.name': { en: 'Full Name', tr: 'Adınız Soyadınız' },
  'contact.form.namePlaceholder': { en: 'Your name and surname', tr: 'Adınız ve soyadınız' },
  'contact.form.email': { en: 'Email Address', tr: 'E-posta Adresiniz' },
  'contact.form.emailPlaceholder': { en: 'name@company.com', tr: 'ornek@sirket.com' },
  'contact.form.phone': { en: 'Phone / WhatsApp (Optional)', tr: 'Telefon / WhatsApp (İsteğe bağlı)' },
  'contact.form.phonePlaceholder': { en: '+90 5XX XXX XX XX', tr: '05XX XXX XX XX' },
  'contact.form.service': { en: 'Topic / Service Area', tr: 'Konu / İhtiyaç Alanı' },
  'contact.form.service.mobile': { en: 'Mobile App Development (iOS / macOS / Cross-Platform)', tr: 'Mobil Uygulama Geliştirme (iOS / macOS / Çapraz Platform)' },
  'contact.form.service.web': { en: 'Corporate Website & Custom Web Software', tr: 'Kurumsal Web Sitesi & Özel Web Yazılımı' },
  'contact.form.service.brand': { en: 'Brand Setup, Domain/Email & Google Ads/GTM', tr: 'Marka Kurulumu, Alan Adı/E-posta & Google Altyapısı' },
  'contact.form.service.seo': { en: 'SEO & AIO (AI Search Optimization)', tr: 'SEO & AIO (Yapay Zeka Arama Optimizasyonu)' },
  'contact.form.service.backend': { en: 'Backend, API & Applied AI Systems', tr: 'Backend, API & Yapay Zeka Sistemleri' },
  'contact.form.service.career': { en: 'Software Engineering Role / Team Collaboration', tr: 'Yazılım Mühendisliği Pozisyonu / Ekip İş Birliği' },
  'contact.form.service.other': { en: 'General Inquiry / Other', tr: 'Genel Soru / Diğer' },
  'contact.form.message': { en: 'Project Details or Message', tr: 'Proje Detayları veya Mesajınız' },
  'contact.form.messagePlaceholder': {
    en: 'Briefly describe your goals, timeline, or what you would like to build together...',
    tr: 'Hedefinizden, projenin kapsamından veya konuşmak istediğiniz konudan kısaca bahsedin...',
  },
  'contact.form.submit': { en: 'Send Message', tr: 'Mesajı Gönder' },
  'contact.form.sending': { en: 'Sending...', tr: 'Gönderiliyor...' },
  'contact.form.success': {
    en: 'Thank you! Your message has been sent to engomeryasironal@gmail.com. I will get back to you shortly.',
    tr: 'Teşekkürler! Mesajınız engomeryasironal@gmail.com adresine iletildi. En kısa sürede dönüş yapacağım.',
  },
  'contact.form.fallback': {
    en: 'Your message is ready to send via your email client. Opening email app...',
    tr: 'Mesajınız doğrudan e-posta uygulamanız üzerinden gönderilmek üzere hazırlandı.',
  },
  'contact.form.error': {
    en: 'Could not send right now. Please try again or email engomeryasironal@gmail.com directly.',
    tr: 'Mesaj şu an iletilemedi. Lütfen tekrar deneyin veya doğrudan engomeryasironal@gmail.com adresine yazın.',
  },
  'contact.directTitle': { en: 'Direct Contact Channels', tr: 'Doğrudan İletişim Kanalları' },
  'contact.emailMe': { en: 'Email directly', tr: 'Doğrudan e-posta gönder' },
  'contact.whatsappMe': { en: 'Write on WhatsApp', tr: 'WhatsApp’tan yaz' },
  'contact.copyEmail': { en: 'Copy email address', tr: 'E-posta adresini kopyala' },
  'contact.copied': { en: 'Copied', tr: 'Kopyalandı' },
  'contact.viewCv': { en: 'View CV', tr: 'Özgeçmişi (CV) İncele' },
  'cv.title': { en: 'Curriculum Vitae', tr: 'Özgeçmiş (CV)' },
  'cv.intro': {
    en: 'Up-to-date PDF résumé detailing my computer engineering background, published App Store products, corporate web projects, and AI research.',
    tr: 'Bilgisayar mühendisliği eğitimimi, App Store’da yayımlanan ürünlerimi, kurumsal web projelerimi ve yapay zeka araştırmalarımı içeren güncel PDF özgeçmişim.',
  },
  'cv.download': { en: 'Download PDF', tr: 'PDF indir' },
  'cv.downloadEn': { en: 'Download CV (English)', tr: 'Özgeçmiş İndir (İngilizce)' },
  'cv.downloadTr': { en: 'Download CV (Türkçe)', tr: 'Özgeçmiş İndir (Türkçe)' },
  'cv.downloadEu': { en: 'Download CV (EU / GDPR)', tr: 'Özgeçmiş İndir (AB / GDPR)' },
  'cv.downloadShowcase': { en: 'Visual portfolio (PDF)', tr: 'Görsel Portfolyo (PDF)' },
  'cv.comingSoon': { en: 'Coming soon', tr: 'Çok yakında' },
  'cv.emailInstead': { en: 'Contact me for details', tr: 'Detaylar için iletişime geçin' },
  'contact.elsewhere': { en: 'Profiles & Code', tr: 'Profiller & Kaynak Kodlar' },
  'writing.articles': { en: 'Technical Articles', tr: 'Teknik Makaleler' },
  'writing.publications': { en: 'Academic Publications', tr: 'Akademik Yayınlar' },
  'writing.seeAll': { en: 'See all articles', tr: 'Tüm yazıları gör' },
  'writing.intro': {
    en: 'Technical articles on agentic AI systems and software architecture, along with peer-reviewed IEEE research.',
    tr: 'Ajan tabanlı yapay zeka sistemleri ve yazılım mimarisi üzerine teknik makaleler ile hakemli IEEE araştırmaları.',
  },
  'contact.availability': {
    en: 'Available for software engineering roles and end-to-end client projects.',
    tr: 'Yazılım mühendisliği fırsatları ve uçtan uca müşteri projeleri için uygun.',
  },
  'theme.switchToLight': { en: 'Switch to light theme', tr: 'Açık temaya geç' },
  'theme.switchToDark': { en: 'Switch to dark theme', tr: 'Koyu temaya geç' },
  'lang.label': { en: 'Language', tr: 'Dil' },
  'lang.switchToTr': { en: 'Switch to Turkish', tr: 'Türkçe’ye geç' },
  'lang.switchToEn': { en: 'Switch to English', tr: 'İngilizce’ye geç' },
  'social.opensNewTab': { en: 'opens in a new tab', tr: 'yeni sekmede açılır' },
  'seo.home.description': {
    en: 'Ömer Yasir Önal - Computer Engineer building native mobile apps (SwiftUI, Flutter), corporate websites, digital brand infrastructure, SEO/AIO solutions, and backend/AI systems.',
    tr: 'Ömer Yasir Önal - Mobil uygulama geliştirme (SwiftUI, Flutter), kurumsal web siteleri, dijital marka kurulumu, SEO/AIO ve backend/yapay zeka çözümleri üreten Bilgisayar Mühendisi.',
  },
  'seo.projects.description': {
    en: 'Projects by Ömer Yasir Önal: Odak and UniSum on the App Store, AKIS multi-agent AI platform, and corporate web & brand builds (Parla Deniz, Öz & Saye, A2 Reklam).',
    tr: 'Ömer Yasir Önal’ın projeleri: App Store’da yayında olan Odak ve UniSum, AKIS yapay zeka ajan platformu ve kurumsal web/marka projeleri (Parla Deniz, Öz & Saye, A2 Reklam).',
  },
  'seo.writing.description': {
    en: 'Technical articles and IEEE SIU 2025 publication by Computer Engineer Ömer Yasir Önal.',
    tr: 'Bilgisayar Mühendisi Ömer Yasir Önal’ın teknik makaleleri ve IEEE SIU 2025 hakemli bildirisi.',
  },
  'seo.cv.description': {
    en: 'Downloadable PDF résumé for {name} - {role}.',
    tr: '{name} için indirilebilir PDF özgeçmiş - {role}.',
  },
  'courses.title': { en: 'Courses', tr: 'Eğitim Notları' },
  'courses.intro': {
    en: 'Focused technical guides on software engineering, AI systems, and mobile development.',
    tr: 'Yazılım mühendisliği, yapay zeka sistemleri ve mobil geliştirme üzerine odaklı teknik rehberler.',
  },
  'courses.comingSoon': {
    en: 'New technical guides are in preparation. Meanwhile, browse the published articles:',
    tr: 'Yeni teknik rehberler hazırlanıyor. Bu sırada yayımlanan makaleleri inceleyebilirsiniz:',
  },
  'courses.backToAll': { en: 'All courses', tr: 'Tüm eğitimler' },
  'course.lessons': { en: 'Lessons', tr: 'Bölümler' },
  'level.beginner': { en: 'Beginner', tr: 'Başlangıç' },
  'level.intermediate': { en: 'Intermediate', tr: 'Orta' },
  'level.advanced': { en: 'Advanced', tr: 'İleri' },
  'lesson.prev': { en: 'Previous', tr: 'Önceki' },
  'lesson.next': { en: 'Next', tr: 'Sonraki' },
  'writing.minRead': { en: 'min read', tr: 'dk okuma' },
  'writing.updated': { en: 'Updated', tr: 'Güncellendi' },
  'writing.backToAll': { en: 'All writing', tr: 'Tüm yazılar' },
  'writing.browseCourses': { en: 'Browse technical guides →', tr: 'Teknik rehberlere göz at →' },
  'writing.sourceSelf': { en: 'This site', tr: 'Bu site' },
  'seo.courses.description': {
    en: 'Focused technical guides by Ömer Yasir Önal on agentic systems, applied AI, and mobile engineering.',
    tr: 'Ömer Yasir Önal’dan ajan tabanlı sistemler, uygulamalı yapay zeka ve mobil geliştirme üzerine teknik rehberler.',
  },
  'packages.title': { en: 'Services & Solutions', tr: 'Hizmetler & Çözümler' },
  'packages.intro': {
    en: 'End-to-end software engineering for brands, startups, and businesses: mobile application development, modern corporate websites, digital brand infrastructure, and SEO/AIO visibility.',
    tr: 'İşletmeler, markalar ve girişimler için uçtan uca yazılım mühendisliği: mobil uygulama geliştirme, modern kurumsal web siteleri, dijital marka altyapısı ve SEO/AIO görünürlüğü.',
  },
  'packages.fullTitle': { en: 'Core Service Pillars', tr: 'Temel Hizmet ve Uzmanlık Alanları' },
  'packages.fullIntro': {
    en: 'Every project is scoped according to your technical requirements, target audience, and business goals.',
    tr: 'Her proje; işletmenizin teknik ihtiyaçlarına, hedef kitlesine ve büyüme hedeflerine göre özel olarak planlanır ve teslim edilir.',
  },
  'packages.mostPopular': { en: 'Featured Solution', tr: 'Öne Çıkan Çözüm' },
  'packages.deliverables': { en: 'Scope & Deliverables', tr: 'Kapsam & Teslimatlar' },
  'packages.timeline': { en: 'Typical Timeline', tr: 'Tipik Süreç' },
  'packages.cta': { en: 'Request a Quote', tr: 'Proje Teklifi Al' },
  'packages.priceNote': {
    en: 'Project scope and pricing are tailored to your exact requirements. Fill out the contact form or reach out via WhatsApp for a detailed proposal.',
    tr: 'Proje kapsamı ve bütçesi ihtiyacınıza göre netleştirilir. Detaylı teklif ve yol haritası için iletişim formunu doldurabilir veya doğrudan ulaşabilirsiniz.',
  },
  'packages.faqTitle': { en: 'Frequently Asked Questions', tr: 'Sıkça Sorulan Sorular' },
  'packages.processTitle': { en: 'How We Work', tr: 'Nasıl Çalışıyoruz' },
  'packages.compareTitle': { en: 'Service Matrix', tr: 'Çözüm Karşılaştırma Tablosu' },
  'packages.compare.plan': { en: 'Service Area', tr: 'Hizmet Alanı' },
  'packages.compare.timeline': { en: 'Timeline', tr: 'Süreç' },
  'packages.compare.pages': { en: 'Architecture & Tech', tr: 'Mimari & Teknoloji' },
  'packages.compare.brand': { en: 'Primary Output', tr: 'Temel Çıktı' },
  'packages.ctaTitle': { en: 'Let’s discuss your project', tr: 'Projenizi birlikte planlayalım' },
  'packages.ctaText': {
    en: 'Share your goals and requirements via the contact form, email, or WhatsApp. I will get back to you with a clear technical plan and quote.',
    tr: 'İhtiyacınızı iletişim formundan, e-posta ile veya WhatsApp üzerinden iletin; net bir teknik plan ve teklifle dönüş yapayım.',
  },
  'packages.ctaWhatsapp': { en: 'Message on WhatsApp', tr: 'WhatsApp’tan Yaz' },
  'packages.ctaEmail': { en: 'Go to Contact Form', tr: 'İletişim Formuna Git' },
  'packages.whatsappPrefill': {
    en: 'Hi Ömer, I would like to discuss a software / web / mobile project.',
    tr: 'Merhaba Ömer Bey, bir yazılım / web / mobil uygulama projesi hakkında görüşmek istiyorum.',
  },
  'seo.packages.description': {
    en: 'Software engineering services by Ömer Yasir Önal: iOS/macOS mobile apps, corporate websites, digital brand setup, SEO/AIO optimization, and backend/AI development.',
    tr: 'Ömer Yasir Önal yazılım mühendisliği hizmetleri: iOS/macOS mobil uygulama geliştirme, kurumsal web sitesi, dijital marka kurulumu, SEO/AIO optimizasyonu ve backend/AI sistemleri.',
  },
  'footer.builtWith': {
    en: 'Computer Engineer · Mobile, Web, SEO/AIO & AI Systems',
    tr: 'Bilgisayar Mühendisi · Mobil, Web, SEO/AIO & Yapay Zeka Sistemleri',
  },
  'footer.backToTop': { en: 'Back to top', tr: 'Başa dön' },
  'footer.deliveryProof': { en: 'Delivery proof', tr: 'Teslimat kanıtı' },
  'link.repo': { en: 'Source code', tr: 'Kaynak kod' },
  'link.live': { en: 'Visit live site', tr: 'Canlı siteyi aç' },
  'link.appstore': { en: 'App Store', tr: 'App Store’da incele' },
  'link.other': { en: 'Related link', tr: 'İlgili bağlantı' },
  'category.AI-Agents': { en: 'AI & Agent Systems', tr: 'Yapay Zeka & Ajan Sistemleri' },
  'category.Applied-AI': { en: 'Applied AI', tr: 'Uygulamalı Yapay Zeka' },
  'category.ML-Research': { en: 'ML Research', tr: 'Makine Öğrenmesi Araştırması' },
  'category.Mobile': { en: 'Mobile & Native App', tr: 'Mobil & Native Uygulama' },
  'category.Web': { en: 'Corporate Web & SEO/AIO', tr: 'Kurumsal Web & SEO/AIO' },
  'category.DevTool': { en: 'Developer Tool', tr: 'Geliştirici Aracı' },
  'category.Networking': { en: 'Networking', tr: 'Ağ Sistemleri' },
  'category.Other': { en: 'Other', tr: 'Diğer' },
};

export function t(locale: Locale, key: string): string {
  return dict[key]?.[locale] ?? key;
}

/**
 * Default locale is Turkish (`tr`) at root (`/`).
 * Secondary locale is English (`en`) under `/en`.
 */
export function localizePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return locale === 'tr' ? p : `/en${p === '/' ? '/' : p}`;
}

export function altLocalePath(locale: Locale, path: string): string {
  if (locale === 'tr') return localizePath('en', path);
  // Strip only a whole `/en` segment (so `/engineering` is left untouched).
  return path.replace(/^\/en(?=\/|$)/, '') || '/';
}
