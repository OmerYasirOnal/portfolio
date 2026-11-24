/**
 * Client Instagram Reels shown on the home page and the sector landing pages.
 * Real posts only. The owner's own Qur'an series lives in quran-reels.ts. Previews are 7 s muted loops (public/work/previews);
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
    kind: { tr: 'Müşteri · Hikâye Reels + yapay zekâ sahneleri', en: 'Client · Story Reel + AI scenes' },
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
    kind: { tr: 'Müşteri · Öz & Saye · Yapay zekâ destekli video + seslendirme', en: 'Client · Öz & Saye · AI video + voice-over' },
    preview: '/work/previews/sacide.mp4',
    poster: '/work/previews/sacide.jpg',
    project: 'ozsaye',
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
    id: 'a2-sunucu',
    account: 'a2_reklam',
    url: 'https://www.instagram.com/a2_reklam/',
    title: { tr: 'Markaya özel sanal sunucu', en: 'A virtual presenter for the brand' },
    kind: { tr: 'Müşteri · Sanal sunucu', en: 'Client · Virtual presenter' },
    preview: '/work/previews/a2-sunucu.mp4',
    poster: '/work/previews/a2-sunucu.jpg',
    project: 'a2reklam-video',
  },
];

export const instagramAccounts = {
  omeryasironal: 'https://www.instagram.com/omeryasironal/',
  a2_reklam: 'https://www.instagram.com/a2_reklam/',
  psikologsacidesahin: 'https://www.instagram.com/psikologsacidesahin/',
} as const;
