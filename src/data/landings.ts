/**
 * Single-language offer pages (one market each, no mirror route).
 * Copy rules: only verified facts, no guarantees, AI use stated openly.
 */
import type { ContactTopic } from '../lib/contact';

export interface Landing {
  slug: string; // full path, e.g. '/en/ai-video-ads'
  locale: 'tr' | 'en';
  seoTitle: string;
  description: string;
  eyebrow: string;
  h1: string; // *word* = gradient accent
  intro: string;
  reelIds: string[];
  /** Sample covers (no client names) shown instead of / before Reels. */
  covers?: { src: string; alt: string }[];
  coversNote?: string;
  deliverables: { title: string; text: string }[];
  proof: { title: string; text: string; href: string }[];
  faqs: { q: string; a: string }[];
  topic: ContactTopic;
  ctaLabel: string;
  serviceName: string;
}

export const landings: Landing[] = [
  {
    slug: '/en/ai-video-ads',
    locale: 'en',
    seoTitle: 'AI Video Ads & Reels Production | Ömer Yasir Önal',
    description:
      'AI-assisted short-form video for Reels, TikTok, Shorts and Meta ads: script, AI scenes, motion text, voice-over and edit by a Computer Engineer. Live client examples.',
    eyebrow: 'AI video ads · Reels · Shorts',
    h1: 'Short videos that *stop the scroll,* made with AI and edited by a human.',
    intro:
      'I script, generate, animate and edit vertical videos for brands: hooks in the first second, motion text, voice-over and a clear call to action. AI produces scenes; I write the message and review every frame. Delivered in 9:16, plus 1:1 and 16:9 on request.',
    reelIds: ['a2-aksaray', 'kalem-1-16', 'a2-3hata', 'a2-logo', 'a2-sunucu'],
    deliverables: [
      { title: 'Script & hooks', text: 'Two or three opening hooks per video so you can test which one holds attention.' },
      { title: 'AI scenes + real footage', text: 'Generated scenes, your photos or footage, product shots and virtual presenters, labelled as AI where platforms require.' },
      { title: 'Motion text & voice', text: 'Word-by-word captions, motion typography, voice-over in English or Turkish, licensed music.' },
      { title: 'Ad-ready exports', text: '9:16 for Reels / TikTok / Shorts, 1:1 and 16:9 versions, cover frame and caption text.' },
    ],
    proof: [
      { title: 'A2 Reklam · signage company', text: 'Story Reels from real installs with AI-animated scenes, a virtual presenter and a logo reveal; Meta ads being set up on top.', href: '/en/projects/a2reklam-video/' },
      { title: 'Öz & Saye · clinical psychologist', text: 'An educational Reel on how children show anxiety: script, AI visuals, voice-over, captions, disclaimer.', href: '/en/projects/ozsaye/' },
      { title: 'My own Instagram series', text: 'Code-animated (Remotion) Reels; one episode reached 7,238 views and 115 saves in its first 20 hours.', href: '/en/projects/kuran-reels/' },
    ],
    faqs: [
      { q: 'How long does one video take?', a: 'A single 15-30 second video usually takes a few working days from approved script to final export, depending on footage and revisions. I confirm the timeline before we start.' },
      { q: 'Do you use AI avatars of real people?', a: 'No. I don’t imitate real people. Virtual presenters are original characters, and AI content is labelled according to platform rules.' },
      { q: 'Can you run the ads too?', a: 'Yes. I can set up Meta Pixel / GA4 tracking and run Meta or Google campaigns. Ad spend is paid directly to the platform and is separate from my fee.' },
      { q: 'How do we work across time zones?', a: 'I’m in Istanbul (GMT+3), work in English, reply within the same working day and share drafts asynchronously, so a call is optional.' },
    ],
    topic: 'video',
    ctaLabel: 'Message me on WhatsApp',
    serviceName: 'AI video ads and Reels production',
  },
  {
    slug: '/psikologlar-icin-instagram-reels',
    locale: 'tr',
    seoTitle: 'Psikolog ve Terapistler için Instagram Reels ve Web Sitesi | Ömer Yasir Önal',
    description:
      'Psikolog, terapist ve danışmanlık merkezleri için bilgilendirici Instagram Reels, güven veren web sitesi ve randevu akışı. Öz & Saye Psikoloji için yapılan gerçek işler.',
    eyebrow: 'Psikolog · terapist · danışmanlık merkezi',
    h1: 'Danışanlarınızın sizi *güvenle* bulduğu Reels ve web sitesi.',
    intro:
      'Bilgilendirici, sakin ve etik sınırlara uygun kısa videolar; randevuya kolay ulaştıran bir site. Senaryoyu birlikte belirliyoruz, her içerik yayından önce onayınıza geliyor. Tanı ya da tedavi vaadi, danışan yorumu ve abartılı ifade kullanmıyorum.',
    reelIds: [],
    covers: [
      { src: '/work/ornek-kapak/sinav-kaygisi.jpg', alt: 'Örnek Reels kapağı: Sınav kaygısı mı, hazırlıksızlık mı?' },
      { src: '/work/ornek-kapak/cift-efsane.jpg', alt: 'Örnek Reels kapağı: İyi çiftler hiç tartışmaz efsanesi' },
      { src: '/work/ornek-kapak/ekran-suresi.jpg', alt: 'Örnek Reels kapağı: Ekran süresi her akşam kavga mı?' },
      { src: '/work/ornek-kapak/tukenmislik.jpg', alt: 'Örnek Reels kapağı: Tükenmişlik bir zayıflık değil, bir sinyal' },
      { src: '/work/ornek-kapak/cocuklar-kaygi.jpg', alt: 'Örnek Reels kapağı: Çocuklar kaygılıyım demez' },
      { src: '/work/ornek-kapak/ici-rahat-degil.jpg', alt: 'Örnek Reels kapağı: Her şey yolunda ama içim rahat değil' },
      { src: '/work/ornek-kapak/ergen-3-hata.jpg', alt: 'Örnek Reels kapağı: Ergeninizle konuşurken kapıyı kapatan 3 hata' },
      { src: '/work/ornek-kapak/gece-uyanma.jpg', alt: 'Örnek Reels kapağı: Gece uyanınca düşünceler mi başlıyor?' },
    ],
    coversNote: 'Sekiz farklı konu, sekiz farklı tarz. Örnek kapak tasarımlarıdır; görseller yapay zekâ ile üretildi. Konu, renk ve dil sizin uzmanlık alanınıza ve marka tonunuza göre birlikte belirlenir.',
    deliverables: [
      { title: 'Bilgilendirici Reels', text: 'Tek bir soruya cevap veren 20-40 saniyelik videolar: senaryo, yapay zekâ görselleri, seslendirme, kelime kelime altyazı ve "bilgilendirme amaçlıdır" notu.' },
      { title: 'Güven veren web sitesi', text: 'Uzmanlık alanları, eğitim ve yaklaşım, sık sorulanlar ve WhatsApp / randevu formu. Hızlı, mobil öncelikli, Google’a uygun.' },
      { title: 'Google Haritalar ve arama', text: 'Google İşletme Profili düzeni, yerel SEO ve yapay zekâ aramalarında doğru görünmek için yapılandırılmış veri.' },
      { title: 'İçerik takvimi', text: 'Ayda 2-8 içerik; konu havuzu, açıklama metinleri ve paylaşım planı.' },
    ],
    proof: [
      { title: 'Öz & Saye Psikoloji', text: 'Next.js ve PostgreSQL ile kurumsal site, yazı / SSS / ölçek / başvuru yönetim paneli.', href: '/projects/ozsaye/' },
      { title: 'Bir klinik psikolog için Reels', text: 'Çocuklarda kaygıyı anlatan bilgilendirici video: senaryo, yapay zekâ görselleri, seslendirme, altyazı ve tıbbi uyarı notu.', href: '/projects/ozsaye/' },
    ],
    faqs: [
      { q: 'Videolarda kendim görünmek zorunda mıyım?', a: 'Hayır. Görseller ve seslendirme yapay zekâ ile hazırlanabilir; isterseniz kendi sesiniz ya da çekiminiz de kullanılır. Yapay zekâ içerikleri platform kurallarına göre etiketlenir.' },
      { q: 'Etik kurallara nasıl dikkat ediyorsunuz?', a: 'Tanı, tedavi ya da sonuç vaadi yok; danışan bilgisi ve yorumu kullanılmaz; bedensel şikâyetlerde hekime yönlendiren not eklenir. Metni yayından önce siz onaylarsınız.' },
      { q: 'Fiyatlar nasıl?', a: 'İçerik sayısı ve sitenin kapsamına göre özel teklif hazırlıyorum. WhatsApp’tan kısaca yazmanız yeterli.' },
    ],
    topic: 'video',
    ctaLabel: 'WhatsApp’tan yazın',
    serviceName: 'Psikologlar için Instagram Reels ve web sitesi',
  },
  {
    slug: '/guzellik-merkezleri-icin-web-sitesi-ve-reels',
    locale: 'tr',
    seoTitle: 'Güzellik Merkezleri için Web Sitesi, Reels ve Google Reklamları | Ömer Yasir Önal',
    description:
      'Güzellik ve bakım merkezleri için hızlı web sitesi, Google Haritalar düzeni, Instagram Reels ve Google / Meta reklamları. Parla Deniz ve A2 Reklam için yapılan gerçek işler.',
    eyebrow: 'Güzellik · bakım · lazer · nail',
    h1: 'Yorumlarınız çok, *vitrininiz* nerede?',
    intro:
      'Google’da yüzlerce yorumu olan pek çok salonun hâlâ bir web sitesi yok, Instagram’ı da haftalarca sessiz kalıyor. Hizmetlerinizi, fiyat aralığınızı ve randevu yolunu tek sayfada toplayan bir site ve düzenli Reels ile bunu değiştirebiliriz.',
    reelIds: ['a2-aksaray', 'a2-3hata', 'a2-logo', 'a2-sunucu'],
    deliverables: [
      { title: 'Tek sayfa ya da kurumsal site', text: 'Hizmetler, önce / sonra galeri (izinli), ekip, WhatsApp ve randevu. Türkçe / İngilizce / Arapça seçenekli.' },
      { title: 'Instagram Reels', text: 'Mekân ve hizmet videoları, kampanya duyuruları, yapay zekâ ile hareketlendirilmiş sahneler; aylık plan.' },
      { title: 'Google Haritalar', text: 'İşletme Profili düzeni, kategori ve hizmet listesi, fotoğraf ve yorum yanıtlarına rehber.' },
      { title: 'Reklam ve ölçüm', text: 'Google ve Meta reklamları, WhatsApp tıklaması ve form ölçümü (GTM / GA4). Reklam bütçesi ücretten ayrıdır.' },
    ],
    proof: [
      { title: 'Parla Deniz Güzellik Merkezi', text: 'Türkçe / İngilizce kurumsal site, alan adı ve kurumsal e-posta kurulumu, yayına alma.', href: '/projects/parladeniz/' },
      { title: 'A2 Reklam', text: 'Çok dilli site, Google Ads yönetimi ve Instagram Reels üretimi; aynı yöntem salonlara uygulanır.', href: '/projects/a2reklam-video/' },
    ],
    faqs: [
      { q: 'Instagram hesabımızı siz mi yöneteceksiniz?', a: 'İsterseniz yalnız içerik üretiyorum ve paylaşımı siz yapıyorsunuz; isterseniz hesap yönetimini de üstleniyorum. Her içerik yayından önce onayınıza gelir.' },
      { q: 'Ne kadar sürede yayına çıkar?', a: 'Tek sayfalık bir site, içerikler hazırsa genelde birkaç hafta içinde yayına çıkar. İlk görüşmede net takvim veriyorum.' },
      { q: 'Müşteri garantisi veriyor musunuz?', a: 'Hayır. Kimse belirli sayıda müşteri garanti edemez. Yaptığım işi ve gelen aramaları, WhatsApp tıklamalarını ölçüp raporluyorum.' },
    ],
    topic: 'web',
    ctaLabel: 'WhatsApp’tan teklif alın',
    serviceName: 'Güzellik merkezleri için web sitesi, Reels ve reklam',
  },
];
