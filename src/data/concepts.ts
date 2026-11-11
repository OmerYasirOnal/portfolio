/**
 * Concept designs: sector-specific site and content layouts drawn in pure
 * HTML/CSS by `ConceptMock.astro`. They show how I would structure a site for
 * a given type of business.
 *
 * These are NOT client projects. Business names are invented and every card
 * carries a visible "Concept" label (honesty rule: no fake portfolio).
 */
import type { Bilingual } from './profile';

export interface Concept {
  id: string;
  kind: 'site' | 'instagram';
  sector: Bilingual;
  /** Invented brand name shown inside the mock. */
  brand: string;
  headline: Bilingual;
  sub: Bilingual;
  cta: Bilingual;
  nav: Bilingual[];
  cards: Bilingual[];
  /** What the structure is built to achieve (shown under the mock). */
  focus: Bilingual;
  palette: { bg: string; fg: string; accent: string; soft: string; muted: string };
  serif?: boolean;
}

export const concepts: Concept[] = [
  {
    id: 'restaurant',
    kind: 'site',
    sector: { tr: 'Restoran', en: 'Restaurant' },
    brand: 'Kıyı Meze Evi',
    headline: { tr: 'Mevsimin mezeleri, deniz kenarında.', en: 'Seasonal meze by the sea.' },
    sub: { tr: 'Rezervasyon için tek dokunuş', en: 'Book in one tap' },
    cta: { tr: 'Masa ayırt', en: 'Book a table' },
    nav: [
      { tr: 'Menü', en: 'Menu' },
      { tr: 'Galeri', en: 'Gallery' },
      { tr: 'Konum', en: 'Location' },
    ],
    cards: [
      { tr: 'Soğuk mezeler', en: 'Cold meze' },
      { tr: 'Günün balığı', en: 'Catch of the day' },
      { tr: 'Tatlılar', en: 'Desserts' },
    ],
    focus: {
      tr: 'Menü, harita ve WhatsApp rezervasyonu ilk ekranda; Google İşletme Profili ile uyumlu bilgiler.',
      en: 'Menu, map and WhatsApp booking on the first screen; facts matched to the Google Business Profile.',
    },
    palette: { bg: '#14213d', fg: '#f7efe2', accent: '#e07a5f', soft: '#1f2f52', muted: '#c9bfae' },
    serif: true,
  },
  {
    id: 'dental',
    kind: 'site',
    sector: { tr: 'Diş kliniği', en: 'Dental clinic' },
    brand: 'Lumen Ağız ve Diş',
    headline: { tr: 'Tedavi planınızı önceden bilin.', en: 'Know your treatment plan upfront.' },
    sub: { tr: 'İmplant · Ortodonti · Estetik', en: 'Implants · Orthodontics · Aesthetics' },
    cta: { tr: 'Randevu al', en: 'Book a visit' },
    nav: [
      { tr: 'Tedaviler', en: 'Treatments' },
      { tr: 'Hekimler', en: 'Doctors' },
      { tr: 'SSS', en: 'FAQ' },
    ],
    cards: [
      { tr: 'İmplant', en: 'Implants' },
      { tr: 'Şeffaf plak', en: 'Clear aligners' },
      { tr: 'Diş beyazlatma', en: 'Whitening' },
    ],
    focus: {
      tr: 'Her tedaviye ayrı, soru-cevap yapılı sayfa; hekim profilleri ve randevu formu.',
      en: 'One question-led page per treatment, doctor profiles and a booking form.',
    },
    palette: { bg: '#f4fbfb', fg: '#0d3b3e', accent: '#0f8b8d', soft: '#dff1f1', muted: '#4f7375' },
  },
  {
    id: 'boutique',
    kind: 'site',
    sector: { tr: 'E-ticaret butik', en: 'E-commerce boutique' },
    brand: 'Nar Atölye',
    headline: { tr: 'Elde şekillenen seramikler.', en: 'Hand-thrown ceramics.' },
    sub: { tr: 'Yeni koleksiyon · Ücretsiz kargo eşiği', en: 'New collection · Free-shipping threshold' },
    cta: { tr: 'Koleksiyonu gör', en: 'Shop the collection' },
    nav: [
      { tr: 'Mağaza', en: 'Shop' },
      { tr: 'Atölye', en: 'Studio' },
      { tr: 'Sepet', en: 'Cart' },
    ],
    cards: [
      { tr: 'Kupalar', en: 'Mugs' },
      { tr: 'Tabaklar', en: 'Plates' },
      { tr: 'Vazolar', en: 'Vases' },
    ],
    focus: {
      tr: 'Ürün sayfası şeması, Instagram’dan gelen trafiğe uygun hızlı mobil vitrin ve Meta katalog bağlantısı.',
      en: 'Product schema, a fast mobile storefront for Instagram traffic and a Meta catalog connection.',
    },
    palette: { bg: '#fbf5ee', fg: '#3a1f1d', accent: '#b23a48', soft: '#f2e3d5', muted: '#7a5c56' },
    serif: true,
  },
  {
    id: 'law',
    kind: 'site',
    sector: { tr: 'Hukuk bürosu', en: 'Law firm' },
    brand: 'Atlas Hukuk',
    headline: { tr: 'Ticari uyuşmazlıklarda net yol haritası.', en: 'A clear roadmap for commercial disputes.' },
    sub: { tr: 'Şirketler hukuku · İş hukuku · KVKK', en: 'Corporate · Employment · Data protection' },
    cta: { tr: 'Ön görüşme', en: 'Initial consultation' },
    nav: [
      { tr: 'Alanlar', en: 'Practice' },
      { tr: 'Ekip', en: 'Team' },
      { tr: 'Makaleler', en: 'Articles' },
    ],
    cards: [
      { tr: 'Şirketler hukuku', en: 'Corporate law' },
      { tr: 'İş hukuku', en: 'Employment' },
      { tr: 'KVKK uyumu', en: 'Data protection' },
    ],
    focus: {
      tr: 'Uzmanlık alanı sayfaları ve makalelerle arama görünürlüğü; reklam yasaklarına uygun, sade dil.',
      en: 'Practice-area pages and articles for search visibility, in plain language that respects bar advertising rules.',
    },
    palette: { bg: '#111418', fg: '#ece8df', accent: '#c8a96a', soft: '#1c2127', muted: '#a8a397' },
    serif: true,
  },
  {
    id: 'salon',
    kind: 'instagram',
    sector: { tr: 'Güzellik salonu · Instagram', en: 'Beauty salon · Instagram' },
    brand: 'studio.ela',
    headline: { tr: '30 günlük Reels planı', en: '30-day Reels plan' },
    sub: { tr: 'Önce / sonra · Uzman anlatıyor · SSS', en: 'Before / after · Expert explains · FAQ' },
    cta: { tr: 'Randevu', en: 'Book' },
    nav: [],
    cards: [
      { tr: 'Önce / sonra', en: 'Before / after' },
      { tr: '3 soruda cilt bakımı', en: 'Skincare in 3 questions' },
      { tr: 'Kampanya', en: 'Offer' },
      { tr: 'Uzman anlatıyor', en: 'Expert explains' },
      { tr: 'Müşteri sorusu', en: 'Client question' },
      { tr: 'Salon turu', en: 'Studio tour' },
    ],
    focus: {
      tr: 'İçerik kategorileri, haftalık yayın ritmi ve her Reels için kanca, metin ve altyazı şablonu.',
      en: 'Content pillars, a weekly rhythm and a hook, script and caption template for every Reel.',
    },
    palette: { bg: '#fff7f5', fg: '#3b1d2a', accent: '#c2577a', soft: '#f6dde3', muted: '#86606d' },
  },
  {
    id: 'architecture',
    kind: 'site',
    sector: { tr: 'Mimarlık ofisi', en: 'Architecture studio' },
    brand: 'Plan Ofis',
    headline: { tr: 'Işığı merkeze alan iç mekânlar.', en: 'Interiors designed around light.' },
    sub: { tr: 'Konut · Ofis · Restorasyon', en: 'Residential · Office · Restoration' },
    cta: { tr: 'Projeleri incele', en: 'View projects' },
    nav: [
      { tr: 'Projeler', en: 'Projects' },
      { tr: 'Ofis', en: 'Studio' },
      { tr: 'İletişim', en: 'Contact' },
    ],
    cards: [
      { tr: 'Moda Konut', en: 'Moda Residence' },
      { tr: 'Karaköy Ofis', en: 'Karaköy Office' },
      { tr: 'Cihangir Daire', en: 'Cihangir Flat' },
    ],
    focus: {
      tr: 'Büyük görsellerle proje sayfaları, hızlı yüklenen galeri ve teklif formuna yönlendiren akış.',
      en: 'Image-led project pages, a fast gallery and a flow that ends at the enquiry form.',
    },
    palette: { bg: '#efece6', fg: '#1d1d1b', accent: '#5b6b4e', soft: '#dedad1', muted: '#66645e' },
  },
];
