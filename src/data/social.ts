/**
 * Recent Instagram Reels shown on the home page "Social & AI content" stage.
 * Real, published posts only. Previews are 7 s muted loops (public/work/previews);
 * the full video lives on the linked project page and on Instagram.
 */
import type { Bilingual } from './profile';

export interface Reel {
  id: string;
  account: 'omeryasironal' | 'a2_reklam' | 'psikologsacidesahin';
  /** Produced and delivered, not yet on Instagram: link goes to the project page. */
  ready?: boolean;
  /** Public Instagram Reel URL (or profile when the post is not out yet). */
  url: string;
  date?: string; // YYYY-MM-DD, only when verified
  title: Bilingual;
  kind: Bilingual;
  preview: string;
  poster: string;
  /** Project page slug with the full video and case notes (optional). */
  project?: string;
}

export const reels: Reel[] = [
  {
    id: 'a2-aksaray',
    account: 'a2_reklam',
    url: 'https://www.instagram.com/a2_reklam/reel/Dfpm-rkujYS/',
    date: '2026-11-12',
    title: { tr: '1972’den bu yana süren hikâye, tek tabelada', en: 'A story since 1972, on one sign' },
    kind: { tr: 'Müşteri · Hikâye Reels + AI sahneler', en: 'Client · Story Reel + AI scenes' },
    preview: '/work/previews/aksaray.mp4',
    poster: '/work/previews/aksaray.jpg',
    project: 'a2reklam-video',
  },
  {
    id: 'sacide-kaygi',
    account: 'psikologsacidesahin',
    url: 'https://www.instagram.com/psikologsacidesahin/',
    ready: true,
    date: '2026-11-12',
    title: { tr: 'Çocuklar “kaygılıyım” demez', en: 'Children don’t say “I’m anxious”' },
    kind: { tr: 'Müşteri · Öz & Saye · AI video + seslendirme', en: 'Client · Öz & Saye · AI video + voice-over' },
    preview: '/work/previews/sacide.mp4',
    poster: '/work/previews/sacide.jpg',
    project: 'ozsaye',
  },
  {
    id: 'kalem-1-16',
    account: 'omeryasironal',
    url: 'https://www.instagram.com/omeryasironal/reel/Dfpk6YSI45t/',
    date: '2026-11-12',
    title: { tr: 'Herkes sana “deli” derse ne yaparsın?', en: 'What if everyone called you “mad”?' },
    kind: { tr: 'Kendi serim · Sinematik AI video', en: 'My series · Cinematic AI video' },
    preview: '/work/previews/kalem.mp4',
    poster: '/work/previews/kalem.jpg',
    project: 'kuran-reels',
  },
  {
    id: 'dogu-turkistan',
    account: 'omeryasironal',
    url: 'https://www.instagram.com/omeryasironal/reel/Dfp7E4Iz5RC/',
    date: '2026-11-12',
    title: { tr: '12 Kasım: Doğu Türkistan ve Gazze, “Dünya susuyor”', en: 'November 12: East Turkestan and Gaza, “The world is silent”' },
    kind: { tr: 'Kendi hesabım · Kaynaklı belgesel Reels', en: 'My account · Sourced documentary Reel' },
    preview: '/work/previews/dogu-turkistan.mp4',
    poster: '/work/previews/dogu-turkistan.jpg',
  },
  {
    id: 'a2-3hata',
    account: 'a2_reklam',
    url: 'https://www.instagram.com/a2_reklam/reel/DfnCnkKOgIR/',
    date: '2026-11-11',
    title: { tr: 'Tabelanız gündüz güzel, peki gece?', en: 'Your sign looks great by day. At night?' },
    kind: { tr: 'Müşteri · Bilgi Reels’i', en: 'Client · Tips Reel' },
    preview: '/work/previews/a2-3hata.mp4',
    poster: '/work/previews/a2-3hata.jpg',
    project: 'a2reklam-video',
  },
  {
    id: 'a2-logo',
    account: 'a2_reklam',
    url: 'https://www.instagram.com/a2_reklam/',
    title: { tr: 'Logo animasyonu: çatıdan marka kartına', en: 'Logo reveal: from rooftop to brand card' },
    kind: { tr: 'Müşteri · Logo animasyonu', en: 'Client · Logo animation' },
    preview: '/work/previews/a2-logo.mp4',
    poster: '/work/previews/a2-logo.jpg',
    project: 'a2reklam-video',
  },
  {
    id: 'alak-6-19',
    account: 'omeryasironal',
    url: 'https://www.instagram.com/omeryasironal/reel/Dfm9WTIoBv4/',
    date: '2026-11-11',
    title: { tr: 'İnsan ne zaman azar? İlk 20 saatte 7 bin+ izlenme', en: 'When does a human transgress? 7k+ views in 20 hours' },
    kind: { tr: 'Kendi serim · Kod tabanlı animasyon', en: 'My series · Code-driven animation' },
    preview: '/work/previews/alak.mp4',
    poster: '/work/previews/alak.jpg',
    project: 'kuran-reels',
  },
  {
    id: 'a2-sunucu',
    account: 'a2_reklam',
    url: 'https://www.instagram.com/a2_reklam/',
    title: { tr: 'Markaya özel sanal sunucu', en: 'A virtual presenter for the brand' },
    kind: { tr: 'Müşteri · AI persona', en: 'Client · AI persona' },
    preview: '/work/previews/a2-sunucu.mp4',
    poster: '/work/previews/a2-sunucu.jpg',
    project: 'a2reklam-video',
  },
  {
    id: 'alak-1-5',
    account: 'omeryasironal',
    url: 'https://www.instagram.com/omeryasironal/reel/DfkiwhszqNX/',
    date: '2026-11-10',
    title: { tr: 'İlk emir: “Oku”', en: 'The first command: “Read”' },
    kind: { tr: 'Kendi serim · Türkçe ses, İngilizce altyazı', en: 'My series · Turkish voice, English subtitles' },
    preview: '/work/previews/alak-oku.mp4',
    poster: '/work/previews/alak-oku.jpg',
    project: 'kuran-reels',
  },
];

export const instagramAccounts = {
  omeryasironal: 'https://www.instagram.com/omeryasironal/',
  a2_reklam: 'https://www.instagram.com/a2_reklam/',
  psikologsacidesahin: 'https://www.instagram.com/psikologsacidesahin/',
} as const;
