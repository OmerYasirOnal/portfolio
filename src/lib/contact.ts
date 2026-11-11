/**
 * Contact helpers: service-specific WhatsApp prefill messages and mail links.
 *
 * The number and address come from `profile.ts` (single source of truth). Each
 * service page passes its own topic so the first message already says what the
 * visitor wants; that also makes incoming chats easy to attribute.
 */
import { profile } from '../data/profile';
import type { Locale } from '../data/i18n';

export type ContactTopic =
  | 'general'
  | 'web'
  | 'software'
  | 'mobile'
  | 'automation'
  | 'google-ads'
  | 'meta-ads'
  | 'seo'
  | 'geo'
  | 'content'
  | 'video';

const MESSAGES: Record<ContactTopic, Record<Locale, string>> = {
  general: {
    tr: 'Merhaba Ömer Bey, sitenizden ulaşıyorum. Bir proje hakkında görüşmek istiyorum.',
    en: 'Hi Ömer, I found you through your website and would like to discuss a project.',
  },
  web: {
    tr: 'Merhaba Ömer Bey, web sitesi yaptırmak istiyorum. Kapsam ve fiyat hakkında bilgi alabilir miyim?',
    en: 'Hi Ömer, I would like a website for my business. Could you tell me about scope and pricing?',
  },
  software: {
    tr: 'Merhaba Ömer Bey, işletmemize özel bir yazılım / yönetim paneli düşünüyoruz. Görüşebilir miyiz?',
    en: 'Hi Ömer, we are considering custom software or an admin panel for our business. Can we talk?',
  },
  mobile: {
    tr: 'Merhaba Ömer Bey, bir mobil uygulama fikrimiz var. Nasıl ilerleyebileceğimizi konuşmak isterim.',
    en: 'Hi Ömer, we have a mobile app idea and would like to talk about how to move forward.',
  },
  automation: {
    tr: 'Merhaba Ömer Bey, işletmemizde bazı işleri yapay zekâyla otomatikleştirmek istiyoruz. Bilgi alabilir miyim?',
    en: 'Hi Ömer, we want to automate some of our work with AI. Could we discuss it?',
  },
  'google-ads': {
    tr: 'Merhaba Ömer Bey, Google Ads reklamlarımız için destek almak istiyorum. Bilgi alabilir miyim?',
    en: 'Hi Ömer, I am looking for help with our Google Ads campaigns. Could you share more?',
  },
  'meta-ads': {
    tr: 'Merhaba Ömer Bey, Instagram / Facebook reklamları için destek almak istiyorum. Bilgi alabilir miyim?',
    en: 'Hi Ömer, I am looking for help with Instagram / Facebook ads. Could you share more?',
  },
  seo: {
    tr: 'Merhaba Ömer Bey, Google’da daha görünür olmak istiyoruz. SEO çalışması hakkında bilgi alabilir miyim?',
    en: 'Hi Ömer, we want to be more visible on Google. Could you tell me about an SEO engagement?',
  },
  geo: {
    tr: 'Merhaba Ömer Bey, yapay zekâ aramalarındaki (AI Overviews, ChatGPT vb.) görünürlüğümüzü konuşmak istiyorum.',
    en: 'Hi Ömer, I would like to talk about our visibility in AI search (AI Overviews, ChatGPT and similar).',
  },
  content: {
    tr: 'Merhaba Ömer Bey, Instagram için düzenli içerik üretimi konusunda bilgi almak istiyorum.',
    en: 'Hi Ömer, I would like to learn more about regular Instagram content production.',
  },
  video: {
    tr: 'Merhaba Ömer Bey, Reels / tanıtım videosu hazırlatmak istiyorum. Bilgi alabilir miyim?',
    en: 'Hi Ömer, I am interested in Reels or a promo video. Could you share more?',
  },
};

export function whatsappMessage(locale: Locale, topic: ContactTopic = 'general'): string {
  return MESSAGES[topic][locale];
}

/** wa.me deep link with a prefilled, topic-specific message. */
export function whatsappHref(locale: Locale, topic: ContactTopic = 'general'): string {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(whatsappMessage(locale, topic))}`;
}

/** mailto link with a localized subject line. */
export function mailtoHref(locale: Locale, subject?: string): string {
  const s = subject ?? (locale === 'tr' ? 'Proje talebi' : 'Project inquiry');
  return `mailto:${profile.email}?subject=${encodeURIComponent(s)}`;
}

/** Human-readable phone number derived from the E.164 WhatsApp digits. */
export function displayPhone(): string {
  const d = profile.whatsapp; // 905323090261
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
}
