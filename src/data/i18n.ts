export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

const dict: Record<string, Record<Locale, string>> = {
  'nav.work': { en: 'Work', tr: 'Projeler' },
  'nav.about': { en: 'About', tr: 'Hakkımda' },
  'nav.writing': { en: 'Writing', tr: 'Yazılar' },
  'nav.contact': { en: 'Contact', tr: 'İletişim' },
  'hero.viewWork': { en: 'View work', tr: 'Projeleri gör' },
  'hero.resume': { en: 'Résumé', tr: 'CV' },
  'section.selectedWork': { en: 'Selected work', tr: 'Seçili işler' },
  'section.experience': { en: 'Experience', tr: 'Deneyim' },
  'section.skills': { en: 'Skills', tr: 'Yetenekler' },
  'section.writing': { en: 'Writing & publications', tr: 'Yazılar & yayınlar' },
  'section.more': { en: 'More projects', tr: 'Diğer projeler' },
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
  'link.repo': { en: 'Source code', tr: 'Kaynak kod' },
  'link.live': { en: 'Live site', tr: 'Canlı site' },
  'link.appstore': { en: 'App Store', tr: 'App Store' },
  'link.other': { en: 'Related link', tr: 'İlgili bağlantı' },
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
  return path.replace(/^\/tr/, '') || '/';
}
