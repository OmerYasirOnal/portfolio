export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

const dict: Record<string, Record<Locale, string>> = {
  'a11y.skip': { en: 'Skip to content', tr: 'İçeriğe geç' },
  'nav.work': { en: 'Work', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.writing': { en: 'Writing', tr: 'Yazılar' },
  'nav.packages': { en: 'Packages', tr: 'Paketler' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'hero.viewWork': { en: 'View work', tr: 'Projeleri gör' },
  'hero.viewPackages': { en: 'View packages', tr: 'Paketleri incele' },
  'hero.resume': { en: 'Résumé', tr: 'CV' },
  'section.about': { en: 'About', tr: 'Hakkımda' },
  'section.selectedWork': { en: 'Selected work', tr: 'Seçili işler' },
  'section.experience': { en: 'Experience', tr: 'Deneyim' },
  'section.skills': { en: 'Skills', tr: 'Yetenekler' },
  'section.writing': { en: 'Writing & publications', tr: 'Yazılar & yayınlar' },
  'section.contact': { en: 'Contact', tr: 'İletişim' },
  'section.services': { en: 'Freelance services', tr: 'Freelance hizmetler' },
  'section.more': { en: 'More projects', tr: 'Diğer projeler' },
  'services.intro': {
    en: 'Beyond my own products, I design and build brand identities and websites for founders and small businesses — as fixed-scope packages you can pick from.',
    tr: 'Kendi ürünlerimin yanı sıra, kurucular ve küçük işletmeler için marka kimliği ve web sitesi tasarlayıp geliştiriyorum — seçebileceğin sabit kapsamlı paketler hâlinde.',
  },
  'services.cta': { en: 'See packages & pricing →', tr: 'Paketleri ve fiyatları gör →' },
  'work.viewAll': { en: 'View all projects →', tr: 'Tüm projeleri gör →' },
  'projects.title': { en: 'Projects', tr: 'Projeler' },
  'projects.intro': {
    en: 'A selection of things I have designed, built, and shipped — from multi-agent systems to production mobile apps.',
    tr: 'Tasarladığım, geliştirdiğim ve yayına aldığım işlerden bir seçki — çok ajanlı sistemlerden yayında olan mobil uygulamalara.',
  },
  'projects.backToAll': { en: 'All projects', tr: 'Tüm projeler' },
  'project.overview': { en: 'Overview', tr: 'Genel bakış' },
  'project.stack': { en: 'Stack', tr: 'Teknolojiler' },
  'project.problem': { en: 'The problem', tr: 'Sorun' },
  'project.whatIDid': { en: 'What I did', tr: 'Ne yaptım' },
  'project.highlights': { en: 'Highlights', tr: 'Öne çıkanlar' },
  'contact.intro': {
    en: 'Have a role, a project, or a question? The fastest way to reach me is email — I read every message.',
    tr: 'Bir pozisyon, bir proje ya da bir sorunuz mu var? Bana ulaşmanın en hızlı yolu e-posta — her mesajı okuyorum.',
  },
  'contact.emailMe': { en: 'Email me', tr: 'E-posta gönder' },
  'contact.copyEmail': { en: 'Copy email address', tr: 'E-posta adresini kopyala' },
  'contact.copied': { en: 'Copied', tr: 'Kopyalandı' },
  'contact.viewCv': { en: 'View CV', tr: 'CV’yi gör' },
  'cv.title': { en: 'Curriculum Vitae', tr: 'Özgeçmiş' },
  'cv.intro': {
    en: 'A concise PDF résumé generated from the same verified source that drives this site. Available in English and Turkish — download whichever you need.',
    tr: 'Bu siteyi besleyen aynı doğrulanmış kaynaktan üretilen özlü bir PDF özgeçmiş. İngilizce ve Türkçe olarak hazır — ihtiyacınız olanı indirin.',
  },
  'cv.download': { en: 'Download PDF', tr: 'PDF indir' },
  'cv.downloadEn': { en: 'Download CV (English)', tr: 'CV indir (İngilizce)' },
  'cv.downloadTr': { en: 'Download CV (Türkçe)', tr: 'CV indir (Türkçe)' },
  'cv.downloadEu': { en: 'Download CV (EU / GDPR)', tr: 'CV indir (AB / GDPR)' },
  'cv.downloadShowcase': { en: 'Visual portfolio (PDF)', tr: 'Görsel portfolyo (PDF)' },
  'cv.comingSoon': { en: 'Coming soon', tr: 'Çok yakında' },
  'cv.emailInstead': { en: 'Email me instead', tr: 'Bunun yerine e-posta gönder' },
  'contact.elsewhere': { en: 'Find me elsewhere', tr: 'Diğer platformlar' },
  'writing.articles': { en: 'Articles', tr: 'Makaleler' },
  'writing.publications': { en: 'Publications', tr: 'Yayınlar' },
  'writing.seeAll': { en: 'See all writing', tr: 'Tüm yazılar' },
  'writing.intro': {
    en: 'Long-form notes on building agentic systems and shipping AI, plus peer-reviewed research.',
    tr: 'Ajan tabanlı sistemler kurmak ve yapay zekâyı yayına almak üzerine uzun yazılar ve hakemli araştırmalar.',
  },
  'contact.availability': {
    en: 'Open to part-time, internship, junior full-time, and freelance.',
    tr: 'Part-time, staj, junior tam zamanlı ve freelance fırsatlara açığım.',
  },
  'theme.switchToLight': { en: 'Switch to light theme', tr: 'Açık temaya geç' },
  'theme.switchToDark': { en: 'Switch to dark theme', tr: 'Koyu temaya geç' },
  'hero.status': { en: 'Open to work', tr: 'İşe açık' },
  'lang.label': { en: 'Language', tr: 'Dil' },
  'lang.switchToTr': { en: 'Switch to Turkish', tr: 'Türkçe’ye geç' },
  'lang.switchToEn': { en: 'Switch to English', tr: 'İngilizce’ye geç' },
  'social.opensNewTab': { en: 'opens in a new tab', tr: 'yeni sekmede açılır' },
  'seo.home.description': {
    en: 'Back-end & applied-AI engineer who ships verifiable systems.',
    tr: 'Doğrulanabilir sistemler geliştiren bir back-end ve uygulamalı yapay zeka mühendisi.',
  },
  'seo.projects.description': {
    en: 'Projects by Ömer Yasir Önal — multi-agent systems, applied AI, and shipped mobile & web apps.',
    tr: 'Ömer Yasir Önal’ın projeleri — çok ajanlı sistemler, uygulamalı yapay zeka ve yayına alınmış mobil & web uygulamaları.',
  },
  'seo.writing.description': {
    en: 'Articles and peer-reviewed publications by Ömer Yasir Önal — agentic systems, applied AI, and ML research.',
    tr: 'Ömer Yasir Önal’ın makaleleri ve hakemli yayınları — ajan tabanlı sistemler, uygulamalı yapay zeka ve makine öğrenmesi araştırmaları.',
  },
  'seo.cv.description': {
    en: 'Downloadable PDF résumé for {name} — {role}.',
    tr: '{name} için indirilebilir PDF özgeçmiş — {role}.',
  },
  'courses.title': { en: 'Courses', tr: 'Kurslar' },
  'courses.intro': {
    en: 'Small, focused courses — written in the open, free on the web, and synced to the upcoming mobile app.',
    tr: 'Küçük, odaklı kurslar — açıkta yazılıyor, web’de ücretsiz ve yakında mobil uygulamayla senkron.',
  },
  'courses.comingSoon': {
    en: 'The first course is in the works. Meanwhile, the articles are live:',
    tr: 'İlk kurs hazırlanıyor. Bu arada makaleler yayında:',
  },
  'courses.backToAll': { en: 'All courses', tr: 'Tüm kurslar' },
  'course.lessons': { en: 'Lessons', tr: 'Dersler' },
  'level.beginner': { en: 'Beginner', tr: 'Başlangıç' },
  'level.intermediate': { en: 'Intermediate', tr: 'Orta' },
  'level.advanced': { en: 'Advanced', tr: 'İleri' },
  'lesson.prev': { en: 'Previous', tr: 'Önceki' },
  'lesson.next': { en: 'Next', tr: 'Sonraki' },
  'writing.minRead': { en: 'min read', tr: 'dk okuma' },
  'writing.updated': { en: 'Updated', tr: 'Güncellendi' },
  'writing.backToAll': { en: 'All writing', tr: 'Tüm yazılar' },
  'writing.browseCourses': { en: 'Browse the courses →', tr: 'Kurslara göz at →' },
  'writing.sourceSelf': { en: 'This site', tr: 'Bu site' },
  'seo.courses.description': {
    en: 'Free, focused mini-courses by Ömer Yasir Önal — agentic systems, applied AI, and mobile engineering.',
    tr: 'Ömer Yasir Önal’dan ücretsiz, odaklı mini kurslar — ajan tabanlı sistemler, uygulamalı yapay zeka ve mobil geliştirme.',
  },
  'packages.title': { en: 'Packages', tr: 'Paketler' },
  'packages.intro': {
    en: 'Fixed-scope brand identity and website packages for founders and small businesses — pick a starting point, then we tailor the scope together.',
    tr: 'Kurucular ve küçük işletmeler için sabit kapsamlı marka kimliği ve web sitesi paketleri — bir başlangıç noktası seçin, kapsamı birlikte netleştirelim.',
  },
  'packages.mostPopular': { en: 'Most popular', tr: 'En çok tercih edilen' },
  'packages.priceFrom': { en: 'starting from', tr: 'başlayan fiyatlarla' },
  'packages.timeline': { en: 'Timeline', tr: 'Teslim süresi' },
  'packages.cta': { en: 'Get a quote', tr: 'Teklif al' },
  'packages.priceNote': {
    en: 'Prices are starting points in Turkish lira (TRY) and depend on final scope. Get in touch for an exact quote.',
    tr: 'Fiyatlar Türk lirası (TL) cinsinden başlangıç noktalarıdır ve nihai kapsama göre değişir. Net bir teklif için iletişime geçin.',
  },
  'packages.faqTitle': { en: 'Frequently asked questions', tr: 'Sıkça sorulan sorular' },
  'packages.processTitle': { en: 'How we work', tr: 'Nasıl çalışıyoruz' },
  'packages.compareTitle': { en: 'Compare packages', tr: 'Paketleri karşılaştır' },
  'packages.compare.plan': { en: 'Package', tr: 'Paket' },
  'packages.compare.price': { en: 'Starting price', tr: 'Başlangıç fiyatı' },
  'packages.compare.timeline': { en: 'Timeline', tr: 'Teslim süresi' },
  'packages.compare.pages': { en: 'Pages', tr: 'Sayfa sayısı' },
  'packages.compare.brand': { en: 'Brand identity', tr: 'Marka kimliği' },
  'packages.ctaTitle': { en: 'Ready to start?', tr: 'Başlamaya hazır mısın?' },
  'packages.ctaText': {
    en: 'Tell me about your project and I’ll get back to you with an exact quote. WhatsApp is usually the fastest.',
    tr: 'Projenden bahset, sana net bir teklifle döneyim. En hızlı yol genelde WhatsApp.',
  },
  'packages.ctaWhatsapp': { en: 'Message on WhatsApp', tr: 'WhatsApp’tan yaz' },
  'packages.ctaEmail': { en: 'Send an email', tr: 'E-posta gönder' },
  'packages.whatsappPrefill': {
    en: 'Hi Ömer, I’d like to talk about a website / brand project.',
    tr: 'Merhaba Ömer, bir web sitesi / marka projesi hakkında konuşmak istiyorum.',
  },
  'seo.packages.description': {
    en: 'Brand identity and website packages by Ömer Yasir Önal — fixed-scope freelance tiers for founders and small businesses.',
    tr: 'Ömer Yasir Önal’ın marka kimliği ve web sitesi paketleri — kurucular ve küçük işletmeler için sabit kapsamlı freelance paketler.',
  },
  'footer.builtWith': {
    en: 'Built with Astro & Tailwind CSS.',
    tr: 'Astro & Tailwind CSS ile geliştirildi.',
  },
  'footer.backToTop': { en: 'Back to top', tr: 'Başa dön' },
  'footer.deliveryProof': { en: 'Delivery proof', tr: 'Teslimat kanıtı' },
  'link.repo': { en: 'Source code', tr: 'Kaynak kod' },
  'link.live': { en: 'Live site', tr: 'Canlı site' },
  'link.appstore': { en: 'App Store', tr: 'App Store' },
  'link.other': { en: 'Related link', tr: 'İlgili bağlantı' },
  // Project category enum → localized label (see projectSchema `category`).
  'category.AI-Agents': { en: 'AI-Agents', tr: 'AI Ajanları' },
  'category.Applied-AI': { en: 'Applied-AI', tr: 'Uygulamalı AI' },
  'category.ML-Research': { en: 'ML-Research', tr: 'ML Araştırması' },
  'category.Mobile': { en: 'Mobile', tr: 'Mobil' },
  'category.Web': { en: 'Web', tr: 'Web' },
  'category.DevTool': { en: 'DevTool', tr: 'Geliştirici Aracı' },
  'category.Networking': { en: 'Networking', tr: 'Ağ' },
  'category.Other': { en: 'Other', tr: 'Diğer' },
};

export function t(locale: Locale, key: string): string {
  return dict[key]?.[locale] ?? key;
}

export function localizePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? p : `/tr${p === '/' ? '/' : p}`;
}

export function altLocalePath(locale: Locale, path: string): string {
  if (locale === 'en') return localizePath('tr', path);
  // Strip only a whole `/tr` segment (so `/trending` is left untouched).
  return path.replace(/^\/tr(?=\/|$)/, '') || '/';
}
