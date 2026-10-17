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
  'nav.cta': { en: 'Get in Touch', tr: 'İletişime Geç' },

  'hero.eyebrow': {
    en: 'Computer Engineer · Digital Product & Brand Solutions',
    tr: 'Bilgisayar Mühendisi · Dijital Ürün ve Marka Çözümleri',
  },
  'hero.headline': {
    en: 'Turning ideas and brands into prestigious, high-impact digital products.',
    tr: 'Fikirleri ve markaları güçlü, güven veren dijital ürünlere dönüştürüyorum.',
  },
  'hero.status': {
    en: 'Available for select client projects and partnerships',
    tr: 'Yeni proje ve iş birlikleri için iletişime açık',
  },
  'hero.viewWork': { en: 'Explore Selected Work', tr: 'Çalışmaları İncele' },
  'hero.viewPackages': { en: 'Explore Services', tr: 'Hizmetleri İncele' },
  'hero.contactCta': { en: 'Discuss Your Project', tr: 'Projenizi Konuşalım' },
  'hero.resume': { en: 'Curriculum Vitae (CV)', tr: 'Özgeçmiş (CV)' },
  'hero.portraitCaption': {
    en: 'Istanbul, Türkiye · End-to-End Digital Solutions',
    tr: 'İstanbul · Uçtan Uca Yazılım ve Dijital Danışmanlık',
  },

  'hero.pillar.mobile': { en: 'Mobile Apps (iOS & Android)', tr: 'Mobil Uygulama (iOS & Android)' },
  'hero.pillar.web': { en: 'Corporate Websites & Systems', tr: 'Kurumsal Web & Özel Sistemler' },
  'hero.pillar.brand': { en: 'Digital Brand Setup', tr: 'Dijital Marka Kurulumu' },
  'hero.pillar.seo': { en: 'Google SEO & AI Search (AIO)', tr: 'Google SEO & Yapay Zeka Araması' },
  'hero.pillar.ai': { en: 'Custom Software & AI', tr: 'Özel Yazılım & Yapay Zeka' },

  'hero.pillars.mobile': { en: 'Mobile Apps (iOS & Android)', tr: 'Mobil Uygulama (iOS & Android)' },
  'hero.pillars.web': { en: 'Corporate Websites & Systems', tr: 'Kurumsal Web & Özel Sistemler' },
  'hero.pillars.brand': { en: 'Digital Brand Setup', tr: 'Dijital Marka Kurulumu' },
  'hero.pillars.seo': { en: 'Google SEO & AI Search (AIO)', tr: 'Google SEO & Yapay Zeka Araması' },
  'hero.pillars.ai': { en: 'Custom Software & AI', tr: 'Özel Yazılım & Yapay Zeka' },

  'hero.stat.products.label': { en: 'Published Products', tr: 'Yayındaki Ürünler' },
  'hero.stat.products.value': {
    en: 'Odak & UniSum on the App Store',
    tr: 'App Store’da Odak ve UniSum',
  },
  'hero.stat.clients.label': { en: 'Corporate & Brand Work', tr: 'Kurumsal Marka Projeleri' },
  'hero.stat.clients.value': {
    en: 'Parla Deniz, Öz & Saye, A2 Reklam',
    tr: 'Parla Deniz, Öz & Saye, A2 Reklam',
  },
  'hero.stat.research.label': { en: 'Academic & Engineering Background', tr: 'Akademik ve Mühendislik Temeli' },
  'hero.stat.research.value': {
    en: 'Computer Engineer · IEEE Author',
    tr: 'Bilgisayar Mühendisi · IEEE Yazarı',
  },

  'section.eyebrow.services': { en: 'What I Do', tr: 'Neler Yapıyorum' },
  'section.services': { en: 'Digital Solutions for Your Business', tr: 'İşletmeniz ve Markanız İçin Çözümler' },
  'section.eyebrow.work': { en: 'Selected Portfolio', tr: 'Seçkin Çalışmalar' },
  'section.selectedWork': { en: 'Products & Corporate Projects', tr: 'Ürünlerim ve Kurumsal Projeler' },
  'section.eyebrow.about': { en: 'Background & Approach', tr: 'Hakkımda ve Yaklaşımım' },
  'section.about': { en: 'About Ömer Yasir Önal', tr: 'Ömer Yasir Önal Kimdir?' },
  'section.eyebrow.experience': { en: 'Career & Research', tr: 'Deneyim ve Akademik Geçmiş' },
  'section.experience': { en: 'Experience & Milestones', tr: 'Deneyim ve Kilometre Taşları' },
  'section.eyebrow.skills': { en: 'Expertise', tr: 'Uzmanlık Alanları' },
  'section.skills': { en: 'Capabilities & Technology Stack', tr: 'Yetkinlikler ve Çözüm Başlıkları' },
  'section.eyebrow.writing': { en: 'Perspectives & Research', tr: 'Yazılar ve Yayınlar' },
  'section.writing': { en: 'Articles, Essays & Publications', tr: 'Yazılar, Notlar ve Akademik Yayınlar' },
  'section.eyebrow.contact': { en: 'Direct Inquiry', tr: 'İletişim' },
  'section.contact': { en: 'Let’s Talk About Your Project', tr: 'Projenizi Birlikte Planlayalım' },
  'section.more': { en: 'Additional Projects & Open-Source Work', tr: 'Diğer Projeler ve Araştırma Çalışmaları' },

  'work.title': { en: 'Selected Work', tr: 'Seçkin Projeler' },
  'work.filter.all': { en: 'All Projects', tr: 'Tüm Projeler' },
  'work.filter.products': { en: 'Own Products & Apps', tr: 'Kendi Ürünlerim ve Uygulamalar' },
  'work.filter.clients': { en: 'Corporate & Brand Projects', tr: 'Kurumsal Web ve Marka Projeleri' },
  'work.filterAll': { en: 'All Projects', tr: 'Tüm Projeler' },
  'work.filterProduct': { en: 'Own Products & Apps', tr: 'Kendi Ürünlerim' },
  'work.filterClient': { en: 'Corporate & Brand Projects', tr: 'Kurumsal Marka Projeleri' },
  'work.card.caseStudy': { en: 'View Case Study', tr: 'Projeyi İncele' },
  'work.inspect': { en: 'View Details', tr: 'Detayları İncele' },
  'work.viewAll': { en: 'Explore all projects and case studies', tr: 'Tüm projeleri ve vaka analizlerini incele' },

  'services.intro': {
    en: 'Whether you are launching a new brand, upgrading your corporate presence, or building a mobile application, I manage the entire process from strategy and design to launch and search visibility.',
    tr: 'Yeni bir marka kuruyor, kurumsal web sitenizi yeniliyor veya bir mobil uygulama hayata geçiriyor olun; strateji ve tasarımdan yayına, Google ve yapay zeka görünürlüğüne kadar tüm süreci tek muhatap olarak uçtan uca yönetiyorum.',
  },
  'services.cta': { en: 'Review detailed service scope & how we work', tr: 'Tüm hizmet kapsamını ve çalışma sürecini incele' },
  'services.quoteCta': { en: 'Request a quote for this service', tr: 'Bu hizmet için teklif al' },

  'projects.title': { en: 'Projects & Case Studies', tr: 'Projeler ve Vaka Analizleri' },
  'projects.intro': {
    en: 'A selection of mobile applications live on the App Store, corporate websites and brand platforms built for businesses, and applied AI systems.',
    tr: 'App Store’da yayında olan mobil uygulamalarım, işletmeler için uçtan uca kurduğum kurumsal web ve marka platformları ile yapay zeka projelerim.',
  },
  'projects.backToAll': { en: 'Back to all projects', tr: 'Tüm projelere dön' },
  'project.overview': { en: 'Overview', tr: 'Genel Bakış' },
  'project.stack': { en: 'Capabilities & Technologies', tr: 'Kapsam ve Teknolojiler' },
  'project.problem': { en: 'The Need & Context', tr: 'İhtiyaç ve Hedef' },
  'project.whatIDid': { en: 'Solution & Execution', tr: 'Uygulanan Çözüm ve Yaklaşım' },
  'project.highlights': { en: 'Key Outcomes & Deliverables', tr: 'Öne Çıkan Çıktılar ve Kazanımlar' },

  'contact.intro': {
    en: 'Have a mobile app idea, need a prestigious corporate website, or want to strengthen your brand’s Google and AI search visibility? Fill out the form below and your message will come straight to my inbox.',
    tr: 'Markanız için prestijli bir kurumsal web sitesi, mobil uygulama, dijital marka kurulumu veya SEO / yapay zeka görünürlüğü planlıyorsanız aşağıdaki formu doldurabilirsiniz. Mesajınız doğrudan e-posta kutuma düşer ve en kısa sürede size dönüş yaparım.',
  },
  'contact.form.name': { en: 'Full Name', tr: 'Adınız Soyadınız' },
  'contact.form.namePlaceholder': { en: 'Your name and surname', tr: 'Adınız ve soyadınız' },
  'contact.form.email': { en: 'Email Address', tr: 'E-posta Adresiniz' },
  'contact.form.emailPlaceholder': { en: 'name@company.com', tr: 'isim@sirketiniz.com' },
  'contact.form.phone': { en: 'Phone / WhatsApp (Optional)', tr: 'Telefon / WhatsApp (İsteğe bağlı)' },
  'contact.form.phonePlaceholder': { en: '+90 5XX XXX XX XX', tr: '05XX XXX XX XX' },
  'contact.form.service': { en: 'How Can I Help You?', tr: 'Hangi Konuda Görüşmek İstersiniz?' },
  'contact.form.topic': { en: 'How Can I Help You?', tr: 'Hangi Konuda Görüşmek İstersiniz?' },
  'contact.form.topics.mobile': {
    en: 'Mobile App Development (iOS / Android / macOS)',
    tr: 'Mobil Uygulama Geliştirme (iOS / Android / macOS)',
  },
  'contact.form.topics.web': {
    en: 'Corporate Website & Custom Management System',
    tr: 'Kurumsal Web Sitesi ve Özel Yönetim Sistemi',
  },
  'contact.form.topics.brand': {
    en: 'Digital Brand Setup (Domain, Corporate Email, Google)',
    tr: 'Dijital Marka Kurulumu (Alan Adı, Kurumsal E-posta, Google)',
  },
  'contact.form.topics.seo': {
    en: 'Google SEO & AI Search Visibility (AIO)',
    tr: 'Google SEO ve Yapay Zeka Araması (AIO) Görünürlüğü',
  },
  'contact.form.topics.ai': {
    en: 'Custom Software, Automation & AI Solutions',
    tr: 'Özel Yazılım, Otomasyon ve Yapay Zeka Çözümleri',
  },
  'contact.form.topics.other': {
    en: 'General Inquiry / Partnership',
    tr: 'Genel Tanışma / İş Birliği / Diğer',
  },
  'contact.form.message': { en: 'Project Details or Message', tr: 'Projeniz veya Mesajınız' },
  'contact.form.messagePlaceholder': {
    en: 'Tell me briefly about your business, your goals, or what you would like to build together...',
    tr: 'İşletmenizden, hedeflerinizden veya birlikte hayata geçirmek istediğiniz projeden kısaca bahsedebilirsiniz...',
  },
  'contact.form.submit': { en: 'Send Message', tr: 'Mesajı Gönder' },
  'contact.form.sending': { en: 'Sending...', tr: 'Gönderiliyor...' },
  'contact.form.success': {
    en: 'Thank you! Your message has been sent to engomeryasironal@gmail.com. I will get back to you shortly.',
    tr: 'Teşekkür ederim! Mesajınız engomeryasironal@gmail.com adresime iletildi. En kısa sürede size dönüş yapacağım.',
  },
  'contact.form.fallback': {
    en: 'Your message has been prepared in your email app for direct sending.',
    tr: 'Mesajınız doğrudan gönderilmek üzere e-posta uygulamanızda hazırlandı.',
  },
  'contact.form.error': {
    en: 'Could not send right now. Please try again or email engomeryasironal@gmail.com directly.',
    tr: 'Mesaj şu an iletilemedi. Lütfen tekrar deneyin veya doğrudan engomeryasironal@gmail.com adresine yazın.',
  },
  'contact.directTitle': { en: 'Direct Contact', tr: 'Doğrudan İletişim' },
  'contact.emailMe': { en: 'Send an Email', tr: 'E-posta Gönder' },
  'contact.whatsappMe': { en: 'Contact via WhatsApp', tr: 'WhatsApp ile Ulaşın' },
  'contact.copyEmail': { en: 'Copy email address', tr: 'E-posta adresini kopyala' },
  'contact.copied': { en: 'Copied', tr: 'Kopyalandı' },
  'contact.viewCv': { en: 'View Curriculum Vitae (CV)', tr: 'Özgeçmişi (CV) İncele' },

  'cv.title': { en: 'Curriculum Vitae', tr: 'Özgeçmiş (CV)' },
  'cv.intro': {
    en: 'My up-to-date résumé covering my computer engineering background, published App Store applications, corporate brand & web deliveries, and IEEE academic research.',
    tr: 'Bilgisayar mühendisliği eğitimimi, App Store’da yayında olan uygulamalarımı, kurumsal marka ve web projelerimi ve hakemli akademik çalışmalarımı içeren güncel özgeçmişim.',
  },
  'cv.download': { en: 'Download PDF', tr: 'PDF İndir' },
  'cv.downloadEn': { en: 'Download CV (English PDF)', tr: 'Özgeçmiş İndir (İngilizce PDF)' },
  'cv.downloadTr': { en: 'Download CV (Turkish PDF)', tr: 'Özgeçmiş İndir (Türkçe PDF)' },
  'cv.downloadEu': { en: 'Download CV (EU Format)', tr: 'Özgeçmiş İndir (Avrupa Formatı)' },
  'cv.downloadShowcase': { en: 'Download Visual Project Portfolio (PDF)', tr: 'Görsel Proje Portfolyosunu İndir (PDF)' },
  'cv.comingSoon': { en: 'Coming soon', tr: 'Yakında' },
  'cv.emailInstead': { en: 'Get in touch directly via email', tr: 'Doğrudan e-posta ile iletişime geçin' },
  'contact.elsewhere': { en: 'Professional Profiles', tr: 'Profesyonel Profiller' },

  'writing.articles': { en: 'Articles & Essays', tr: 'Yazılar ve Değerlendirmeler' },
  'writing.publications': { en: 'Peer-Reviewed Academic Publications', tr: 'Hakemli Akademik Yayınlar' },
  'writing.seeAll': { en: 'Read all articles and notes', tr: 'Tüm yazıları ve notları oku' },
  'writing.intro': {
    en: 'Personal essays, digital product notes, software architecture perspectives, and peer-reviewed academic research.',
    tr: 'Teknoloji, dijital ürün geliştirme, yapay zeka ve yazılım dünyası üzerine kişisel yazılarım, notlarım ve hakemli akademik yayınlarım.',
  },
  'contact.availability': {
    en: 'Available for new client projects, product consulting, and engineering collaborations.',
    tr: 'Yeni müşteri projeleri, dijital ürün danışmanlığı ve mühendislik iş birlikleri için uygun.',
  },
  'theme.switchToLight': { en: 'Switch to light theme', tr: 'Açık görünüme geç' },
  'theme.switchToDark': { en: 'Switch to dark theme', tr: 'Koyu görünüme geç' },
  'lang.label': { en: 'Language', tr: 'Dil' },
  'lang.switchToTr': { en: 'Switch to Turkish', tr: 'Türkçe’ye geç' },
  'lang.switchToEn': { en: 'Switch to English', tr: 'İngilizce’ye geç' },
  'social.opensNewTab': { en: 'opens in a new tab', tr: 'yeni sekmede açılır' },

  'seo.home.description': {
    en: 'Ömer Yasir Önal - Computer Engineer delivering mobile apps (iOS & Android), prestigious corporate websites, digital brand infrastructure, and Google SEO / AI Search (AIO) solutions.',
    tr: 'Ömer Yasir Önal - Mobil uygulama geliştirme, prestijli kurumsal web siteleri, dijital marka kurulumu ve Google SEO / Yapay Zeka Araması (AIO) çözümleri sunan Bilgisayar Mühendisi.',
  },
  'seo.projects.description': {
    en: 'Selected products and client projects by Ömer Yasir Önal: Odak and UniSum on the App Store, Parla Deniz, Öz & Saye Psikoloji, A2 Reklam, and AKIS.',
    tr: 'Ömer Yasir Önal’ın seçkin projeleri: App Store’da yayında olan Odak ve UniSum, Parla Deniz, Öz & Saye Psikoloji, A2 Reklam ve AKIS.',
  },
  'seo.writing.description': {
    en: 'Articles, personal essays, and IEEE academic publications by Computer Engineer Ömer Yasir Önal.',
    tr: 'Bilgisayar Mühendisi Ömer Yasir Önal’ın teknoloji ve yazılım üzerine yazıları, kişisel notları ve IEEE akademik yayınları.',
  },
  'seo.cv.description': {
    en: 'Curriculum Vitae (CV) of {name} - {role}.',
    tr: '{name} özgeçmişi (CV) - {role}.',
  },

  'courses.title': { en: 'Guides & Notes', tr: 'Rehberler ve Notlar' },
  'courses.intro': {
    en: 'Structured guides and notes on building digital products, software architecture, and applied AI.',
    tr: 'Dijital ürün geliştirme, yazılım mimarisi ve uygulamalı yapay zeka üzerine derlenmiş rehber ve notlar.',
  },
  'courses.comingSoon': {
    en: 'New guides are in preparation. In the meantime, you can read the published articles below:',
    tr: 'Yeni rehber serileri hazırlanıyor. Bu sırada yayımlanan yazıları aşağıdan inceleyebilirsiniz:',
  },
  'courses.backToAll': { en: 'All guides', tr: 'Tüm rehberler' },
  'course.lessons': { en: 'Chapters', tr: 'Bölümler' },
  'level.beginner': { en: 'Foundational', tr: 'Temel' },
  'level.intermediate': { en: 'Intermediate', tr: 'Orta' },
  'level.advanced': { en: 'Advanced', tr: 'İleri' },
  'lesson.prev': { en: 'Previous', tr: 'Önceki' },
  'lesson.next': { en: 'Next', tr: 'Sonraki' },
  'writing.minRead': { en: 'min read', tr: 'dk okuma' },
  'writing.updated': { en: 'Updated', tr: 'Güncellendi' },
  'writing.backToAll': { en: 'Back to all writing', tr: 'Tüm yazılara dön' },
  'writing.browseCourses': { en: 'Explore guides & notes', tr: 'Rehber ve notlara göz atın' },
  'writing.sourceSelf': { en: 'Personal Essay', tr: 'Kişisel Yazı' },
  'seo.courses.description': {
    en: 'Guides and notes by Ömer Yasir Önal on digital products, software architecture, and applied AI.',
    tr: 'Ömer Yasir Önal’dan dijital ürünler, yazılım mimarisi ve uygulamalı yapay zeka üzerine rehberler.',
  },

  'packages.title': { en: 'Services & Digital Solutions', tr: 'Hizmetler ve Dijital Çözümler' },
  'packages.intro': {
    en: 'End-to-end digital product and brand engineering for businesses and founders: mobile applications, corporate websites, digital brand setup, and Google SEO / AI Search visibility.',
    tr: 'İşletmeler, markalar ve girişimler için tek muhatapla uçtan uca yazılım ve dijital çözüm ortaklığı: mobil uygulama geliştirme, kurumsal web siteleri, dijital marka kurulumu ve Google / yapay zeka görünürlüğü.',
  },
  'packages.fullTitle': { en: 'Core Solution Areas', tr: 'Temel Hizmet Alanları' },
  'packages.fullIntro': {
    en: 'Every project is tailored to your business goals, target audience, and timeline.',
    tr: 'Her çalışma; markanızın hedeflerine, sektörünüze ve ihtiyaç duyduğunuz kapsama göre özel olarak planlanır.',
  },
  'packages.mostPopular': { en: 'Most Requested', tr: 'En Çok Tercih Edilen' },
  'packages.deliverables': { en: 'What Is Included', tr: 'Neleri Kapsar?' },
  'packages.timeline': { en: 'Estimated Timeline', tr: 'Tahmini Süre' },
  'packages.cta': { en: 'Request a Proposal', tr: 'Teklif ve Plan İste' },
  'packages.priceNote': {
    en: 'Every business has unique needs. Share your goals via the contact form or WhatsApp, and I will prepare a clear, tailored scope and proposal.',
    tr: 'Her işletmenin ve projenin ihtiyacı farklıdır. Hedeflerinizi iletişim formundan veya WhatsApp üzerinden paylaştığınızda, size özel net bir yol haritası ve teklif hazırlıyorum.',
  },
  'packages.faqTitle': { en: 'Frequently Asked Questions', tr: 'Sıkça Sorulan Sorular' },
  'packages.processTitle': { en: 'How We Work Together', tr: 'Çalışma Sürecimiz' },
  'packages.compareTitle': { en: 'Solution Overview', tr: 'Hizmet Alanları Özeti' },
  'packages.compare.plan': { en: 'Service Area', tr: 'Hizmet Alanı' },
  'packages.compare.timeline': { en: 'Typical Timeline', tr: 'Tipik Süreç' },
  'packages.compare.pages': { en: 'Platforms & Scope', tr: 'Platform ve Kapsam' },
  'packages.compare.brand': { en: 'Key Outcome', tr: 'Temel Kazanım' },
  'packages.ctaTitle': { en: 'Ready to bring your project to life?', tr: 'Projenizi birlikte hayata geçirelim' },
  'packages.ctaText': {
    en: 'Tell me about your goals via the contact form or WhatsApp. I will get back to you promptly with a clear roadmap and proposal.',
    tr: 'İhtiyacınızı iletişim formundan veya WhatsApp üzerinden paylaşın; en kısa sürede net bir yol haritası ve teklifle dönüş yapayım.',
  },
  'packages.ctaWhatsapp': { en: 'Contact on WhatsApp', tr: 'WhatsApp ile Yazın' },
  'packages.ctaEmail': { en: 'Open Contact Form', tr: 'İletişim Formuna Git' },
  'packages.whatsappPrefill': {
    en: 'Hello Ömer, I would like to discuss a project for our brand / business.',
    tr: 'Merhaba Ömer Bey, markamız / projemiz için sunduğunuz dijital çözümler hakkında görüşmek istiyorum.',
  },
  'seo.packages.description': {
    en: 'Digital solutions by Ömer Yasir Önal: Mobile app development, corporate websites, digital brand setup, and Google SEO / AI Search (AIO) visibility.',
    tr: 'Ömer Yasir Önal hizmetleri: Mobil uygulama geliştirme, kurumsal web sitesi, dijital marka kurulumu ve Google SEO / Yapay Zeka Araması (AIO) görünürlüğü.',
  },

  'footer.builtWith': {
    en: 'Computer Engineer · Mobile, Web, Brand & AI Solutions',
    tr: 'Bilgisayar Mühendisi · Mobil Uygulama, Kurumsal Web, Marka ve Yapay Zeka Çözümleri',
  },
  'footer.rights': {
    en: 'All rights reserved.',
    tr: 'Tüm hakları saklıdır.',
  },
  'footer.backToTop': { en: 'Back to top', tr: 'Yukarı çık' },

  'link.repo': { en: 'Technical Repository', tr: 'Teknik İnceleme (GitHub)' },
  'link.live': { en: 'Visit Live Website', tr: 'Canlı Siteyi Ziyaret Et' },
  'link.appstore': { en: 'View on App Store', tr: 'App Store’da İncele' },
  'link.other': { en: 'Related Link', tr: 'İlgili Bağlantı' },

  'category.AI-Agents': { en: 'AI & Automation Platform', tr: 'Yapay Zeka ve Otomasyon' },
  'category.Applied-AI': { en: 'Applied AI Solution', tr: 'Uygulamalı Yapay Zeka' },
  'category.ML-Research': { en: 'Scientific Research', tr: 'Bilimsel Araştırma' },
  'category.Mobile': { en: 'Mobile Application', tr: 'Mobil Uygulama' },
  'category.Web': { en: 'Corporate Web & Brand', tr: 'Kurumsal Web ve Marka' },
  'category.DevTool': { en: 'Software Tool', tr: 'Yazılım Aracı' },
  'category.Networking': { en: 'System Software', tr: 'Sistem Yazılımı' },
  'category.Other': { en: 'Software Project', tr: 'Yazılım Projesi' },
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
