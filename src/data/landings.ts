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
  /** Price cards. price is display text; amount/currency feed the Offer JSON-LD. */
  packages?: { name: string; text: string; price: string; unit: string; amount: number; currency: 'TRY' | 'USD'; featured?: boolean }[];
  packagesNote?: string;
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
    slug: '/en/reels-for-therapists',
    locale: 'en',
    seoTitle: 'Search & AI Visibility and Instagram Reels for Therapists | Ömer Yasir Önal',
    description:
      'For therapists and counselling practices: visibility on Google and in AI answers, calm educational Instagram Reels and a trustworthy website. Sample covers and real client work.',
    eyebrow: 'Therapists · counsellors · group practices',
    h1: 'New clients look for you on *Google, in AI answers and on Instagram.*',
    intro:
      'I set up what your site needs to be understood correctly by Google and by assistants like ChatGPT and Gemini, and I produce calm, educational Reels for your practice. No diagnosis or treatment claims, no client testimonials; you approve every piece before it goes out.',
    reelIds: [],
    covers: [
      { src: '/work/ornek-kapak/en-exam-anxiety.jpg', alt: 'Sample Reels cover: Exam anxiety, or not prepared?' },
      { src: '/work/ornek-kapak/en-couples-myth.jpg', alt: 'Sample Reels cover: Happy couples never argue (myth)' },
      { src: '/work/ornek-kapak/en-screen-time.jpg', alt: 'Sample Reels cover: Screen time, a fight every evening?' },
      { src: '/work/ornek-kapak/en-burnout.jpg', alt: 'Sample Reels cover: Burnout is not a weakness, it is a signal' },
    ],
    coversNote: 'Sample cover designs; the photos are AI-generated. Topics, colours and tone are set together with you, to fit your specialty and voice.',
    packages: [
      { name: 'Trial Reel', text: 'One 30-45 second video: topic, script, visuals, voice-over, captions, cover and caption text. One revision.', price: '$150', unit: 'one video', amount: 150, currency: 'USD' },
      { name: 'Monthly Content', text: '4 Reels a month with covers, captions and a monthly topic plan. Two revisions per video.', price: '$480', unit: 'per month', amount: 480, currency: 'USD', featured: true },
      { name: 'Growth', text: '8 Reels and 4 posts a month, a content calendar, profile and highlights setup, and a short monthly report.', price: '$850', unit: 'per month', amount: 850, currency: 'USD' },
      { name: 'Visibility Check', text: 'Where your site stands on Google and in AI search: a list of gaps and the fixes applied (structured data, titles and descriptions, FAQ data), with a short report.', price: '$250', unit: 'one-off', amount: 250, currency: 'USD' },
    ],
    packagesNote: 'Half up front, half on delivery. Ad spend is separate. No guarantees on rankings, followers or client numbers.',
    deliverables: [
      { title: 'Visibility on Google (SEO)', text: 'Titles and descriptions, structured data (schema.org), page speed, Google Business Profile and local search. A short audit first, then the fixes.' },
      { title: 'Visibility in AI answers', text: 'Clear facts, FAQ content and consistent business data so ChatGPT, Gemini and Google’s AI summaries describe your practice correctly. No secret tricks: solid foundations and plain content.' },
      { title: 'Educational Reels', text: '30-45 second videos that answer one question: script, AI visuals, voice-over, word-by-word captions, cover and a “for information only” note.' },
      { title: 'A website people trust', text: 'Specialties, training and approach, FAQs and a simple booking or contact path. Fast, mobile-first and search-friendly.' },
    ],
    proof: [
      { title: 'Öz & Saye Psikoloji', text: 'A Next.js + PostgreSQL site for a psychotherapy clinic, with an admin panel for articles, FAQs, scales and applications.', href: '/en/projects/ozsaye/' },
      { title: 'A2 Reklam', text: 'A 3-language website, Google Ads management and AI-assisted Instagram Reels for a signage company.', href: '/en/projects/a2reklam-video/' },
      { title: 'My own Instagram series', text: 'Code-animated Reels; one episode reached 7,238 views and 115 saves in its first 20 hours.', href: '/en/projects/kuran-reels/' },
    ],
    faqs: [
      { q: 'Can you guarantee rankings or AI recommendations?', a: 'No. Nobody can guarantee a Google position or that an AI assistant will recommend you. I build the technical and content foundation your site needs to be understood correctly, and show what changed with Search Console data.' },
      { q: 'Do I have to appear in the videos?', a: 'No. Visuals and voice-over can be AI-generated, or we can use your own voice or footage. AI content is labelled according to platform rules.' },
      { q: 'How do you handle ethics?', a: 'No diagnosis, treatment or outcome claims; no client details or testimonials; a note pointing people to appropriate care where relevant. You approve the script before anything is published.' },
      { q: 'How do we work across time zones?', a: 'I’m in Istanbul (GMT+3), work in English, reply within the same working day and share drafts asynchronously, so a call is optional.' },
    ],
    topic: 'video',
    ctaLabel: 'Message me on WhatsApp',
    serviceName: 'Search and AI visibility, and Reels for therapists',
  },
  {
    slug: '/psikologlar-icin-instagram-reels',
    locale: 'tr',
    seoTitle: 'Psikologlar için Google ve Yapay Zekâ Görünürlüğü, Instagram Reels | Ömer Yasir Önal',
    description:
      'Psikolog, terapist ve danışmanlık merkezleri için Google’da (SEO) ve yapay zekâ cevaplarında (AIO) görünürlük, bilgilendirici Instagram Reels ve güven veren web sitesi. Örnek kapaklar ve gerçek işler.',
    eyebrow: 'Psikolog · terapist · danışmanlık merkezi',
    h1: 'Danışan adaylarınız sizi *Google’da, yapay zekâda ve Instagram’da* arıyor.',
    intro:
      'Sitenizin Google’da ve ChatGPT, Gemini gibi yapay zekâ asistanlarında doğru tanınması için gereken düzeni kuruyor, sosyal medyanız için sakin ve bilgilendirici Reels üretiyorum. Tanı ya da tedavi vaadi, danışan yorumu ve abartılı ifade yok; her içerik yayından önce onayınıza geliyor.',
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
    packages: [
      { name: 'Deneme Reels', text: '30-45 saniyelik 1 video: konu, senaryo, görseller, seslendirme, altyazı, kapak ve açıklama metni. 1 revizyon.', price: '₺2.000', unit: 'tek video', amount: 2000, currency: 'TRY' },
      { name: 'Aylık İçerik', text: 'Ayda 4 Reels, kapakları ve açıklamaları, aylık konu planı. Video başına 2 revizyon.', price: '₺6.500', unit: 'aylık', amount: 6500, currency: 'TRY', featured: true },
      { name: 'Büyüme', text: 'Ayda 8 Reels ve 4 gönderi, içerik takvimi, profil ve öne çıkanlar düzeni, aylık kısa rapor.', price: '₺11.500', unit: 'aylık', amount: 11500, currency: 'TRY' },
      { name: 'Görünürlük Kontrolü', text: 'Sitenizin Google ve yapay zekâ aramalarındaki durumu: eksiklerin listesi ve düzeltilmesi (yapılandırılmış veri, başlık ve açıklamalar, SSS verisi), kısa rapor.', price: '₺3.500', unit: 'tek sefer', amount: 3500, currency: 'TRY' },
    ],
    packagesNote: 'Ödemenin yarısı başlangıçta, yarısı teslimde. Reklam bütçesi ayrıdır. Sıralama, takipçi ya da danışan sayısı garantisi verilmez.',
    deliverables: [
      { title: 'Google’da görünürlük (SEO)', text: 'Başlık ve açıklamalar, yapılandırılmış veri (schema.org), sayfa hızı, Google İşletme Profili ve yerel arama düzeni. Önce kısa bir kontrol raporu, sonra düzeltmeler.' },
      { title: 'Yapay zekâ cevaplarında görünürlük (AIO)', text: 'ChatGPT, Gemini ve Google’ın yapay zekâ özetleri sitenizi doğru anlasın diye net bilgi, sık sorulan sorular ve her yerde tutarlı işletme verisi. Gizli bir yöntem değil; sağlam temel ve açık içerik.' },
      { title: 'Bilgilendirici Reels', text: 'Tek bir soruya cevap veren 30-45 saniyelik videolar: senaryo, yapay zekâ görselleri, seslendirme, kelime kelime altyazı, kapak ve “bilgilendirme amaçlıdır” notu.' },
      { title: 'Güven veren web sitesi', text: 'Uzmanlık alanları, eğitim ve yaklaşım, sık sorulanlar ve WhatsApp / randevu formu. Hızlı, mobil öncelikli, Google’a uygun.' },
    ],
    proof: [
      { title: 'Öz & Saye Psikoloji', text: 'Next.js ve PostgreSQL ile kurumsal site, yazı / SSS / ölçek / başvuru yönetim paneli.', href: '/projects/ozsaye/' },
      { title: 'Bir klinik psikolog için Reels', text: 'Çocuklarda kaygıyı anlatan bilgilendirici video: senaryo, yapay zekâ görselleri, seslendirme, altyazı ve tıbbi uyarı notu.', href: '/projects/ozsaye/' },
    ],
    faqs: [
      { q: 'Yapay zekâ aramalarında görünürlük (AIO) garanti edilebilir mi?', a: 'Hayır. Kimse Google’da belirli bir sırayı ya da bir yapay zekâ asistanının sizi önereceğini garanti edemez. Yaptığım şey, sitenizin doğru anlaşılması için gereken teknik ve içerik temelini kurmak ve değişimi Search Console verisiyle göstermek.' },
      { q: 'Videolarda kendim görünmek zorunda mıyım?', a: 'Hayır. Görseller ve seslendirme yapay zekâ ile hazırlanabilir; isterseniz kendi sesiniz ya da çekiminiz de kullanılır. Yapay zekâ içerikleri platform kurallarına göre etiketlenir.' },
      { q: 'Etik kurallara nasıl dikkat ediyorsunuz?', a: 'Tanı, tedavi ya da sonuç vaadi yok; danışan bilgisi ve yorumu kullanılmaz; bedensel şikâyetlerde hekime yönlendiren not eklenir. Metni yayından önce siz onaylarsınız.' },
      { q: 'Fiyatlar nasıl?', a: 'Paketler bu sayfada: tek bir Deneme Reels ₺2.000, ayda 4 Reels ₺6.500. Site ya da farklı bir kapsam isterseniz WhatsApp’tan yazın, özel teklif hazırlayayım.' },
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
  {
    slug: '/kafe-ve-restoranlar-icin-reels-ve-google-gorunurluk',
    locale: 'tr',
    seoTitle: 'Kafe ve Restoranlar için Instagram Reels, Google Haritalar ve Yapay Zekâ Görünürlüğü | Ömer Yasir Önal',
    description:
      'Kafe, restoran, pastane ve kahveciler için Instagram Reels, Google Haritalar (İşletme Profili) düzeni, menü ve yapay zekâ aramalarında görünürlük. Paketler ve fiyatlar, gerçek bir kahveci Reels örneği.',
    eyebrow: 'Kafe · restoran · pastane · kahveci',
    h1: '“Yakınımda iyi bir kafe” aramasında *siz* çıkıyor musunuz?',
    intro:
      'Müşteriler artık Google Haritalar’a, Instagram’a ve ChatGPT gibi asistanlara “yakınımda nerede oturulur” diye soruyor. İşletme Profilinizi, menünüzü ve sitenizi bu aramalarda doğru görünecek şekilde düzenliyor, mekânınızın hikâyesini anlatan Reels üretiyorum. Elinizdeki fotoğraf ve videolar yeterli; gerekirse yapay zekâ ile hareketlendiriyorum.',
    reelIds: ['a2-aksaray', 'a2-3hata', 'a2-logo', 'a2-sunucu'],
    packages: [
      { name: 'Deneme Reels', text: '30-45 saniyelik 1 video: mekân ya da ürün hikâyesi, senaryo, kurgu, hareketli yazı, müzik, kapak ve açıklama metni. 1 revizyon.', price: '₺2.000', unit: 'tek video', amount: 2000, currency: 'TRY' },
      { name: 'Aylık İçerik', text: 'Ayda 4 Reels (yeni ürün, menü, mekân, kampanya), kapakları ve açıklamaları, aylık içerik planı.', price: '₺6.500', unit: 'aylık', amount: 6500, currency: 'TRY', featured: true },
      { name: 'Büyüme', text: 'Ayda 8 Reels ve 4 gönderi, içerik takvimi, profil ve öne çıkanlar düzeni, aylık kısa rapor.', price: '₺11.500', unit: 'aylık', amount: 11500, currency: 'TRY' },
      { name: 'Görünürlük Kontrolü', text: 'Google Haritalar ve yapay zekâ aramalarındaki durumunuz: İşletme Profili kategorileri, çalışma saatleri, menü ve fotoğraf düzeni, sitede yapılandırılmış veri; eksik listesi, düzeltmeler ve kısa rapor.', price: '₺3.500', unit: 'tek sefer', amount: 3500, currency: 'TRY' },
    ],
    packagesNote: 'Ödemenin yarısı başlangıçta, yarısı teslimde. Reklam bütçesi ayrıdır. Sıralama, takipçi ya da müşteri sayısı garantisi verilmez.',
    deliverables: [
      { title: 'Google Haritalar ve İşletme Profili', text: 'Doğru kategori, çalışma saatleri, menü, fotoğraflar ve yorum yanıtları için rehber. “Yakınımda” aramalarında işletmenizin eksiksiz görünmesi için temel düzen.' },
      { title: 'Yapay zekâ aramalarında görünürlük', text: 'ChatGPT, Gemini ve Google’ın yapay zekâ özetleri mekânınızı doğru anlatsın diye sitede net bilgi, menü, adres ve saatler, yapılandırılmış veri ve her yerde tutarlı işletme bilgisi.' },
      { title: 'Instagram Reels', text: 'Mekânın hikâyesi, yeni ürün, menü ve kampanya videoları: senaryo, kurgu, hareketli yazı, müzik ve kapak. Elinizdeki görüntüler yeterli.' },
      { title: 'Menü ve tek sayfa site', text: 'Telefonda hızlı açılan menü sayfası ya da tek sayfa site: adres, yol tarifi, saatler, WhatsApp ve rezervasyon bağlantısı.' },
    ],
    proof: [
      { title: 'Bir kahveci için hikâye Reels', text: '1972’den bu yana süren bir kuru kahvecinin hikâyesini anlatan Reels; A2 Reklam için üretildi ve yayında.', href: '/projects/a2reklam-video/' },
      { title: 'A2 Reklam', text: '3 dilli site, 341 yerel SEO sayfası, Google Ads yönetimi ve düzenli Instagram Reels üretimi.', href: '/projects/a2reklam-video/' },
    ],
    faqs: [
      { q: 'Mekâna gelip çekim yapıyor musunuz?', a: 'Videoları sizin telefonla çektiğiniz kısa görüntüler ve fotoğraflarla hazırlıyorum; nasıl çekmeniz gerektiğini kısa bir listeyle anlatıyorum. Gerekirse sahneler yapay zekâ ile hareketlendirilir ve etiketlenir.' },
      { q: 'Google’da ilk sırada çıkmayı garanti ediyor musunuz?', a: 'Hayır. Kimse belirli bir sırayı ya da müşteri sayısını garanti edemez. Yaptığım şey, işletmenizin Google Haritalar’da ve yapay zekâ aramalarında doğru ve eksiksiz görünmesi için gereken temeli kurmak ve değişimi raporlamak.' },
      { q: 'Fiyatlar nasıl?', a: 'Paketler bu sayfada: tek bir Deneme Reels ₺2.000, ayda 4 Reels ₺6.500. Menü sitesi ya da reklam yönetimi isterseniz WhatsApp’tan yazın, özel teklif hazırlayayım.' },
      { q: 'Instagram hesabımızı siz mi paylaşacaksınız?', a: 'İsterseniz yalnız içerik üretiyorum ve paylaşımı siz yapıyorsunuz; isterseniz paylaşımı da üstleniyorum. Her içerik yayından önce onayınıza gelir.' },
    ],
    topic: 'video',
    ctaLabel: 'WhatsApp’tan yazın',
    serviceName: 'Kafe ve restoranlar için Instagram Reels ve Google görünürlüğü',
  },
];
