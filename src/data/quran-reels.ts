/**
 * Kur'an Reels: episode data for the per-episode pages (/kuran-reels/<slug>/).
 *
 * Source of the Arabic text: Tanzil Project (tanzil.net), used unmodified
 * (Tanzil Quran Text, Uthmani). Every page that shows it links to tanzil.net.
 * Turkish titles, descriptions and transcripts are the owner's own texts.
 * English lines are taken from the published captions and subtitles.
 *
 * Generated from the episode extracts; keep the Arabic strings byte for byte.
 */

export interface QuranAyah {
  ayah: number;
  text: string;
}

interface RawEpisode {
  id: string;
  slug: string;
  surahNo: number;
  surahTr: string;
  surahEn: string;
  /** Position of the surah in revelation (nüzul) order. */
  nuzul: number;
  ayahFrom: number;
  ayahTo: number;
  titleTr: string;
  titleEn: string | null;
  descTr: string[];
  descEn: string[] | null;
  transcriptTr: string[] | null;
  transcriptEn: string[] | null;
  arabic: QuranAyah[];
  besmele: string | null;
  durationSec: number | null;
  refs: string[];
  pub: {
    /** Instagram reel shortcode. */
    ig: string;
    /** Instagram publish date, YYYY-MM-DD (Istanbul time). */
    igDate: string;
    /** YouTube video id. */
    yt: string | null;
    /** True when the YouTube video is already public. */
    ytPublic: boolean;
    /** Scheduled YouTube publish time (ISO) when not yet public. */
    ytFrom: string | null;
  };
}

export interface QuranEpisode extends RawEpisode {
  /** Short episode name for headings, cards and the title tag. */
  shortTr: string;
  shortEn: string;
  instagramUrl: string;
  youtubeId: string | null;
  youtubeFrom?: string;
  /** Public on YouTube at build time (public, or its scheduled time has passed). */
  youtubeEmbeddable: boolean;
  /** Site path of the 540x960 cover. */
  cover: string;
  /** "1-5", or "20" for a single ayah. */
  range: string;
}

export interface QuranSurah {
  no: number;
  nuzul: number;
  nameTr: string;
  nameEn: string;
}

const RAW: RawEpisode[] = [
  {
    "id": "T001",
    "slug": "alak-1-5",
    "surahNo": 96,
    "surahTr": "Alak",
    "surahEn": "Al-Alaq",
    "nuzul": 1,
    "ayahFrom": 1,
    "ayahTo": 5,
    "titleTr": "Şeytan bir yemin etti. Rabbin ise tek kelime söyledi: Oku.",
    "titleEn": "Satan swore an oath; your Lord said one word: Read",
    "descTr": [
      "Şeytan bir yemin etti. Rabbin ise tek kelime söyledi: Oku.",
      "\"İkra\" harfleri seslendirmek değil; dağınık olanı bir araya getirmek, anlamı toplamak demek. Kitap da bir ayet, kâinat da, kendi başlangıcın da.",
      "Peki biz neden okumuyoruz?"
    ],
    "descEn": [
      "Satan swore an oath. Your Lord answered with one word: Read.",
      "\"Iqra\" is not about pronouncing letters. It means bringing together what is scattered: gathering meaning. The Book is a sign, the universe is a sign, and so is your own beginning.",
      "So why are we not reading?"
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 1,
        "text": "ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ"
      },
      {
        "ayah": 2,
        "text": "خَلَقَ ٱلْإِنسَـٰنَ مِنْ عَلَقٍ"
      },
      {
        "ayah": 3,
        "text": "ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ"
      },
      {
        "ayah": 4,
        "text": "ٱلَّذِى عَلَّمَ بِٱلْقَلَمِ"
      },
      {
        "ayah": 5,
        "text": "عَلَّمَ ٱلْإِنسَـٰنَ مَا لَمْ يَعْلَمْ"
      }
    ],
    "besmele": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "durationSec": 96.5,
    "refs": [
      "Nisâ 4:119",
      "Fussilet 41:53",
      "Sebe 34:13",
      "Kamer 54:17"
    ],
    "pub": {
      "ig": "DfkiwhszqNX",
      "igDate": "2026-11-10",
      "yt": "xfyCafF6al0",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T002B",
    "slug": "alak-6-19",
    "surahNo": 96,
    "surahTr": "Alak",
    "surahEn": "Al-Alaq",
    "nuzul": 1,
    "ayahFrom": 6,
    "ayahTo": 19,
    "titleTr": "İnsan ne zaman azar?",
    "titleEn": "When does a human transgress?",
    "descTr": [
      "İnsan ne zaman azar? Alak suresi cevap veriyor: kendi kendine yettiğini sandığı an.",
      "Alak 6-19, tahlildeki çeviriyle kelime kelime. Köşeli parantezli kelimeler Arapça metinde yok; anlamı açmak için eklendi.",
      "Yalnız kaldığında, kimse görmüyor sandığında kimsin? Yoruma yaz."
    ],
    "descEn": [
      "When does a human transgress? Surah Al-Alaq answers: the moment he imagines he is self-sufficient.",
      "Al-Alaq 96:6-19, phrase by phrase. Words in [brackets] are not in the Arabic text; they were added for clarity.",
      "Who are you when no one is watching?"
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 6,
        "text": "كَلَّآ إِنَّ ٱلْإِنسَـٰنَ لَيَطْغَىٰٓ"
      },
      {
        "ayah": 7,
        "text": "أَن رَّءَاهُ ٱسْتَغْنَىٰٓ"
      },
      {
        "ayah": 8,
        "text": "إِنَّ إِلَىٰ رَبِّكَ ٱلرُّجْعَىٰٓ"
      },
      {
        "ayah": 9,
        "text": "أَرَءَيْتَ ٱلَّذِى يَنْهَىٰ"
      },
      {
        "ayah": 10,
        "text": "عَبْدًا إِذَا صَلَّىٰٓ"
      },
      {
        "ayah": 11,
        "text": "أَرَءَيْتَ إِن كَانَ عَلَى ٱلْهُدَىٰٓ"
      },
      {
        "ayah": 12,
        "text": "أَوْ أَمَرَ بِٱلتَّقْوَىٰٓ"
      },
      {
        "ayah": 13,
        "text": "أَرَءَيْتَ إِن كَذَّبَ وَتَوَلَّىٰٓ"
      },
      {
        "ayah": 14,
        "text": "أَلَمْ يَعْلَم بِأَنَّ ٱللَّهَ يَرَىٰ"
      },
      {
        "ayah": 15,
        "text": "كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًۢا بِٱلنَّاصِيَةِ"
      },
      {
        "ayah": 16,
        "text": "نَاصِيَةٍۢ كَـٰذِبَةٍ خَاطِئَةٍۢ"
      },
      {
        "ayah": 17,
        "text": "فَلْيَدْعُ نَادِيَهُۥ"
      },
      {
        "ayah": 18,
        "text": "سَنَدْعُ ٱلزَّبَانِيَةَ"
      },
      {
        "ayah": 19,
        "text": "كَلَّا لَا تُطِعْهُ وَٱسْجُدْ وَٱقْتَرِب ۩"
      }
    ],
    "besmele": null,
    "durationSec": 79.2,
    "refs": [],
    "pub": {
      "ig": "Dfm9WTIoBv4",
      "igDate": "2026-11-11",
      "yt": "hUIxuxwsg40",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T004",
    "slug": "kalem-1-16",
    "surahNo": 68,
    "surahTr": "Kalem",
    "surahEn": "Al-Qalam",
    "nuzul": 2,
    "ayahFrom": 1,
    "ayahTo": 16,
    "titleTr": "Herkes sana \"deli\" derse ne yaparsın?",
    "titleEn": "What if everyone called you \"mad\"?",
    "descTr": [
      "Herkes sana \"deli\" derse ne yaparsın? Kalem suresi bir yeminle başlıyor: \"Değilsin.\"",
      "İsterler ki yumuşayasın, onlar da yumuşasın. Sen kendi doğrundan ne kadar taviz veriyorsun? Yoruma yaz."
    ],
    "descEn": [
      "What would you do if everyone called you \"mad\"? Surah Al-Qalam opens with an oath: \"You are not.\"",
      "They wish you would soften, so they could soften too. How much of your own truth are you trading away?"
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 1,
        "text": "نٓ ۚ وَٱلْقَلَمِ وَمَا يَسْطُرُونَ"
      },
      {
        "ayah": 2,
        "text": "مَآ أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍۢ"
      },
      {
        "ayah": 3,
        "text": "وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍۢ"
      },
      {
        "ayah": 4,
        "text": "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍۢ"
      },
      {
        "ayah": 5,
        "text": "فَسَتُبْصِرُ وَيُبْصِرُونَ"
      },
      {
        "ayah": 6,
        "text": "بِأَييِّكُمُ ٱلْمَفْتُونُ"
      },
      {
        "ayah": 7,
        "text": "إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَن ضَلَّ عَن سَبِيلِهِۦ وَهُوَ أَعْلَمُ بِٱلْمُهْتَدِينَ"
      },
      {
        "ayah": 8,
        "text": "فَلَا تُطِعِ ٱلْمُكَذِّبِينَ"
      },
      {
        "ayah": 9,
        "text": "وَدُّوا۟ لَوْ تُدْهِنُ فَيُدْهِنُونَ"
      },
      {
        "ayah": 10,
        "text": "وَلَا تُطِعْ كُلَّ حَلَّافٍۢ مَّهِينٍ"
      },
      {
        "ayah": 11,
        "text": "هَمَّازٍۢ مَّشَّآءٍۭ بِنَمِيمٍۢ"
      },
      {
        "ayah": 12,
        "text": "مَّنَّاعٍۢ لِّلْخَيْرِ مُعْتَدٍ أَثِيمٍ"
      },
      {
        "ayah": 13,
        "text": "عُتُلٍّۭ بَعْدَ ذَٰلِكَ زَنِيمٍ"
      },
      {
        "ayah": 14,
        "text": "أَن كَانَ ذَا مَالٍۢ وَبَنِينَ"
      },
      {
        "ayah": 15,
        "text": "إِذَا تُتْلَىٰ عَلَيْهِ ءَايَـٰتُنَا قَالَ أَسَـٰطِيرُ ٱلْأَوَّلِينَ"
      },
      {
        "ayah": 16,
        "text": "سَنَسِمُهُۥ عَلَى ٱلْخُرْطُومِ"
      }
    ],
    "besmele": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "durationSec": 114.4,
    "refs": [
      "Zâriyât 51:52-53",
      "Zümer 39:53"
    ],
    "pub": {
      "ig": "Dfpk6YSI45t",
      "igDate": "2026-11-12",
      "yt": "TW9CEcB8S8w",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T005",
    "slug": "kalem-17-33",
    "surahNo": 68,
    "surahTr": "Kalem",
    "surahEn": "Al-Qalam",
    "nuzul": 2,
    "ayahFrom": 17,
    "ayahTo": 33,
    "titleTr": "Yarın sabah her şeyin yerinde olacağına yemin eder misin?",
    "titleEn": "Would you swear about tomorrow? The garden owners did",
    "descTr": [
      "Yarın sabah her şeyin yerinde olacağına yemin eder misin? Bahçe sahipleri etti.",
      "Başkasını mahrum bırakmak için kurulan her düzen, gün gelir sahibini mahrum bırakır. Bugün senin bahçende başkasının payı var mı? Yoruma yaz."
    ],
    "descEn": [
      "Would you swear that tomorrow morning everything will still be in its place? The owners of the garden did.",
      "Every order built to deprive someone else one day deprives its own owner. Today, in your garden, is there a share for someone else?"
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 17,
        "text": "إِنَّا بَلَوْنَـٰهُمْ كَمَا بَلَوْنَآ أَصْحَـٰبَ ٱلْجَنَّةِ إِذْ أَقْسَمُوا۟ لَيَصْرِمُنَّهَا مُصْبِحِينَ"
      },
      {
        "ayah": 18,
        "text": "وَلَا يَسْتَثْنُونَ"
      },
      {
        "ayah": 19,
        "text": "فَطَافَ عَلَيْهَا طَآئِفٌۭ مِّن رَّبِّكَ وَهُمْ نَآئِمُونَ"
      },
      {
        "ayah": 20,
        "text": "فَأَصْبَحَتْ كَٱلصَّرِيمِ"
      },
      {
        "ayah": 21,
        "text": "فَتَنَادَوْا۟ مُصْبِحِينَ"
      },
      {
        "ayah": 22,
        "text": "أَنِ ٱغْدُوا۟ عَلَىٰ حَرْثِكُمْ إِن كُنتُمْ صَـٰرِمِينَ"
      },
      {
        "ayah": 23,
        "text": "فَٱنطَلَقُوا۟ وَهُمْ يَتَخَـٰفَتُونَ"
      },
      {
        "ayah": 24,
        "text": "أَن لَّا يَدْخُلَنَّهَا ٱلْيَوْمَ عَلَيْكُم مِّسْكِينٌۭ"
      },
      {
        "ayah": 25,
        "text": "وَغَدَوْا۟ عَلَىٰ حَرْدٍۢ قَـٰدِرِينَ"
      },
      {
        "ayah": 26,
        "text": "فَلَمَّا رَأَوْهَا قَالُوٓا۟ إِنَّا لَضَآلُّونَ"
      },
      {
        "ayah": 27,
        "text": "بَلْ نَحْنُ مَحْرُومُونَ"
      },
      {
        "ayah": 28,
        "text": "قَالَ أَوْسَطُهُمْ أَلَمْ أَقُل لَّكُمْ لَوْلَا تُسَبِّحُونَ"
      },
      {
        "ayah": 29,
        "text": "قَالُوا۟ سُبْحَـٰنَ رَبِّنَآ إِنَّا كُنَّا ظَـٰلِمِينَ"
      },
      {
        "ayah": 30,
        "text": "فَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍۢ يَتَلَـٰوَمُونَ"
      },
      {
        "ayah": 31,
        "text": "قَالُوا۟ يَـٰوَيْلَنَآ إِنَّا كُنَّا طَـٰغِينَ"
      },
      {
        "ayah": 32,
        "text": "عَسَىٰ رَبُّنَآ أَن يُبْدِلَنَا خَيْرًۭا مِّنْهَآ إِنَّآ إِلَىٰ رَبِّنَا رَٰغِبُونَ"
      },
      {
        "ayah": 33,
        "text": "كَذَٰلِكَ ٱلْعَذَابُ ۖ وَلَعَذَابُ ٱلْـَٔاخِرَةِ أَكْبَرُ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ"
      }
    ],
    "besmele": null,
    "durationSec": 117.8,
    "refs": [
      "Zâriyât 51:19"
    ],
    "pub": {
      "ig": "DfsIvqdoEVl",
      "igDate": "2026-11-13",
      "yt": "YuqluFOJOyQ",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T006",
    "slug": "kalem-34-41",
    "surahNo": 68,
    "surahTr": "Kalem",
    "surahEn": "Al-Qalam",
    "nuzul": 2,
    "ayahFrom": 34,
    "ayahTo": 41,
    "titleTr": "Ne yaparsan yap, sonunda kazanacağına sana kim söz verdi?",
    "titleEn": "Who promised you that you'll win in the end?",
    "descTr": [
      "Ne yaparsan yap, sonunda kazanacağına sana kim söz verdi?",
      "Ne bir kitap, ne bir sözleşme, ne de bir kefil... Kimsenin elinde, istediğini yapıp yine de kazanacağına dair tek bir belge yok."
    ],
    "descEn": [
      "Whatever you do, who promised you that you will win in the end?",
      "No book, no contract, no guarantor... No one holds a single document that they can do as they please and still win."
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 34,
        "text": "إِنَّ لِلْمُتَّقِينَ عِندَ رَبِّهِمْ جَنَّـٰتِ ٱلنَّعِيمِ"
      },
      {
        "ayah": 35,
        "text": "أَفَنَجْعَلُ ٱلْمُسْلِمِينَ كَٱلْمُجْرِمِينَ"
      },
      {
        "ayah": 36,
        "text": "مَا لَكُمْ كَيْفَ تَحْكُمُونَ"
      },
      {
        "ayah": 37,
        "text": "أَمْ لَكُمْ كِتَـٰبٌۭ فِيهِ تَدْرُسُونَ"
      },
      {
        "ayah": 38,
        "text": "إِنَّ لَكُمْ فِيهِ لَمَا تَخَيَّرُونَ"
      },
      {
        "ayah": 39,
        "text": "أَمْ لَكُمْ أَيْمَـٰنٌ عَلَيْنَا بَـٰلِغَةٌ إِلَىٰ يَوْمِ ٱلْقِيَـٰمَةِ ۙ إِنَّ لَكُمْ لَمَا تَحْكُمُونَ"
      },
      {
        "ayah": 40,
        "text": "سَلْهُمْ أَيُّهُم بِذَٰلِكَ زَعِيمٌ"
      },
      {
        "ayah": 41,
        "text": "أَمْ لَهُمْ شُرَكَآءُ فَلْيَأْتُوا۟ بِشُرَكَآئِهِمْ إِن كَانُوا۟ صَـٰدِقِينَ"
      }
    ],
    "besmele": null,
    "durationSec": 65.5,
    "refs": [
      "Kamer 54:17",
      "Câsiye 45:21"
    ],
    "pub": {
      "ig": "Dfuoy7cotb6",
      "igDate": "2026-11-14",
      "yt": "qilY4nt9vyI",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T007",
    "slug": "kalem-42-52",
    "surahNo": 68,
    "surahTr": "Kalem",
    "surahEn": "Al-Qalam",
    "nuzul": 2,
    "ayahFrom": 42,
    "ayahTo": 52,
    "titleTr": "Bugün sapasağlamken secdeye çağrılıyorlar; o gün çağrıldıklarında ise artık güç yetiremeyecekler.",
    "titleEn": "Called to prostrate today; that day they won't be able",
    "descTr": [
      "Bugün sapasağlamken secdeye çağrılıyorlar; o gün çağrıldıklarında ise artık güç yetiremeyecekler.",
      "Sure \"sen mecnun değilsin\" diye açılıyor; \"o mecnundur\" diyenlere son sözü de söylüyor: o, âlemler için bir öğüttür."
    ],
    "descEn": [
      "Today, while they are sound, they are called to prostrate; on that day, when they are called, they will no longer be able.",
      "The surah opens with \"you are not possessed\"; to those who say \"he is possessed\", it gives the last word too: it is an admonition for all the worlds."
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 42,
        "text": "يَوْمَ يُكْشَفُ عَن سَاقٍۢ وَيُدْعَوْنَ إِلَى ٱلسُّجُودِ فَلَا يَسْتَطِيعُونَ"
      },
      {
        "ayah": 43,
        "text": "خَـٰشِعَةً أَبْصَـٰرُهُمْ تَرْهَقُهُمْ ذِلَّةٌۭ ۖ وَقَدْ كَانُوا۟ يُدْعَوْنَ إِلَى ٱلسُّجُودِ وَهُمْ سَـٰلِمُونَ"
      },
      {
        "ayah": 44,
        "text": "فَذَرْنِى وَمَن يُكَذِّبُ بِهَـٰذَا ٱلْحَدِيثِ ۖ سَنَسْتَدْرِجُهُم مِّنْ حَيْثُ لَا يَعْلَمُونَ"
      },
      {
        "ayah": 45,
        "text": "وَأُمْلِى لَهُمْ ۚ إِنَّ كَيْدِى مَتِينٌ"
      },
      {
        "ayah": 46,
        "text": "أَمْ تَسْـَٔلُهُمْ أَجْرًۭا فَهُم مِّن مَّغْرَمٍۢ مُّثْقَلُونَ"
      },
      {
        "ayah": 47,
        "text": "أَمْ عِندَهُمُ ٱلْغَيْبُ فَهُمْ يَكْتُبُونَ"
      },
      {
        "ayah": 48,
        "text": "فَٱصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تَكُن كَصَاحِبِ ٱلْحُوتِ إِذْ نَادَىٰ وَهُوَ مَكْظُومٌۭ"
      },
      {
        "ayah": 49,
        "text": "لَّوْلَآ أَن تَدَٰرَكَهُۥ نِعْمَةٌۭ مِّن رَّبِّهِۦ لَنُبِذَ بِٱلْعَرَآءِ وَهُوَ مَذْمُومٌۭ"
      },
      {
        "ayah": 50,
        "text": "فَٱجْتَبَـٰهُ رَبُّهُۥ فَجَعَلَهُۥ مِنَ ٱلصَّـٰلِحِينَ"
      },
      {
        "ayah": 51,
        "text": "وَإِن يَكَادُ ٱلَّذِينَ كَفَرُوا۟ لَيُزْلِقُونَكَ بِأَبْصَـٰرِهِمْ لَمَّا سَمِعُوا۟ ٱلذِّكْرَ وَيَقُولُونَ إِنَّهُۥ لَمَجْنُونٌۭ"
      },
      {
        "ayah": 52,
        "text": "وَمَا هُوَ إِلَّا ذِكْرٌۭ لِّلْعَـٰلَمِينَ"
      }
    ],
    "besmele": null,
    "durationSec": 97.4,
    "refs": [
      "Kalem 68:2",
      "Sâd 38:29"
    ],
    "pub": {
      "ig": "DfxRb-ModtJ",
      "igDate": "2026-11-15",
      "yt": "iVSG0w5vgtM",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T008",
    "slug": "muzzemmil-1-9",
    "surahNo": 73,
    "surahTr": "Müzzemmil",
    "surahEn": "Al-Muzzammil",
    "nuzul": 3,
    "ayahFrom": 1,
    "ayahTo": 9,
    "titleTr": "Herkes uyurken kalkan, ne kazanır?",
    "titleEn": "Rising while everyone sleeps: what do you gain?",
    "descTr": [
      "Herkes uyurken kalkan, ne kazanır?",
      "Müzzemmil 1-9, ayet ayet. Kapanış ayeti: İsrâ 106.",
      "Gece kalkanın kazancını 6. ayet anlatıyor. Uzun gündüzden ve ağır sözden önce, gece var."
    ],
    "descEn": [
      "The one who rises while everyone sleeps, what does he gain?",
      "Al-Muzzammil 73:1-9, verse by verse. Closing verse: Al-Isra 17:106.",
      "Verse 6 tells what the night riser gains. Before the long day and the weighty word, there is the night."
    ],
    "transcriptTr": null,
    "transcriptEn": null,
    "arabic": [
      {
        "ayah": 1,
        "text": "يَـٰٓأَيُّهَا ٱلْمُزَّمِّلُ"
      },
      {
        "ayah": 2,
        "text": "قُمِ ٱلَّيْلَ إِلَّا قَلِيلًۭا"
      },
      {
        "ayah": 3,
        "text": "نِّصْفَهُۥٓ أَوِ ٱنقُصْ مِنْهُ قَلِيلًا"
      },
      {
        "ayah": 4,
        "text": "أَوْ زِدْ عَلَيْهِ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا"
      },
      {
        "ayah": 5,
        "text": "إِنَّا سَنُلْقِى عَلَيْكَ قَوْلًۭا ثَقِيلًا"
      },
      {
        "ayah": 6,
        "text": "إِنَّ نَاشِئَةَ ٱلَّيْلِ هِىَ أَشَدُّ وَطْـًۭٔا وَأَقْوَمُ قِيلًا"
      },
      {
        "ayah": 7,
        "text": "إِنَّ لَكَ فِى ٱلنَّهَارِ سَبْحًۭا طَوِيلًۭا"
      },
      {
        "ayah": 8,
        "text": "وَٱذْكُرِ ٱسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًۭا"
      },
      {
        "ayah": 9,
        "text": "رَّبُّ ٱلْمَشْرِقِ وَٱلْمَغْرِبِ لَآ إِلَـٰهَ إِلَّا هُوَ فَٱتَّخِذْهُ وَكِيلًۭا"
      }
    ],
    "besmele": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "durationSec": 74.5,
    "refs": [
      "İsrâ 17:106"
    ],
    "pub": {
      "ig": "Df0BGAsIQvg",
      "igDate": "2026-11-16",
      "yt": "xvAD-KyAZj8",
      "ytPublic": true,
      "ytFrom": null
    }
  },
  {
    "id": "T009",
    "slug": "muzzemmil-10-17",
    "surahNo": 73,
    "surahTr": "Müzzemmil",
    "surahEn": "Al-Muzzammil",
    "nuzul": 3,
    "ayahFrom": 10,
    "ayahTo": 17,
    "titleTr": "Devasa bir dağ, bir anda kum yığınına dönüşebilir mi?",
    "titleEn": "Can a giant mountain suddenly turn into a heap of sand?",
    "descTr": [
      "Devasa bir dağ, bir anda kum yığınına dönüşebilir mi?",
      "Müzzemmil 10-17, ayet ayet, lafız çevirisiyle. Kapanış ayeti: Kehf 47.",
      "Cevap 14. ayette: \"O gün yeryüzü ve dağlar şiddetle sarsılır; dağlar, tabanı kayıp akıveren bir kum yığınına dönüşür.\"",
      "İktidar da servet de geçicidir. Dağların bile kuma dönüştüğü o gün gelmeden, seçimin senin elinde."
    ],
    "descEn": [
      "Can a giant mountain suddenly turn into a heap of sand?",
      "Al-Muzzammil 73:10-17, verse by verse, in a literal Turkish translation. Closing verse: Al-Kahf 18:47.",
      "Power and wealth are fleeting. Before the Day when even mountains turn to sand, the choice is in your hands."
    ],
    "transcriptTr": [
      "Devasa bir dağ, bir anda kum yığınına dönüşebilir mi?",
      "Servetine güvenip hakikate kibirlenenlere karşı, Müzzemmil suresi cevabı verir:",
      "Onların söylediklerine karşı direnç göster ve onlardan kırıp dökmeden, vakarla uzaklaş.",
      "Nimet şımarıklığı içindeki o yalanlayıcılarla Beni baş başa bırak ve onlara az bir süre tanı.",
      "Şüphesiz bizim katımızda ağır prangalar ve yakıcı bir ateş vardır.",
      "Boğaza düğümlenip geçmeyen bir yiyecek ve can yakıcı bir azap.",
      "O gün yeryüzü ve dağlar şiddetle sarsılır; dağlar, tabanı kayıp akıveren bir kum yığınına dönüşür.",
      "Doğrusu Biz, tıpkı Firavun'a bir elçi gönderdiğimiz gibi, size de üzerinizde tanıklık edecek bir elçi gönderdik.",
      "Ne var ki Firavun o elçiye baş kaldırdı; Biz de onu kökünü kazıyan yıkıcı bir yakalayışla kıskıvrak yakaladık.",
      "Öyleyse inkâr ederseniz, dehşetinden çocukların bile saçlarını ağartan o günden kendinizi nasıl koruyacaksınız?",
      "İktidar da servet de geçicidir.",
      "Dağların bile kuma dönüştüğü o gün gelmeden, seçimin senin elinde.",
      "Dağları yürüteceğimiz ve yeryüzünü çırılçıplak göreceğin o günü hatırla!"
    ],
    "transcriptEn": [
      "Can a giant mountain,",
      "suddenly turn into a heap of sand?",
      "Against those who trust their wealth and grow arrogant toward the truth,",
      "Surah al-Muzzammil gives the answer:",
      "“Stand firm against what they say,",
      "and leave them without breaking anything, with dignity.”",
      "“Those deniers, spoiled by blessing:",
      "leave them to Me, and give them a little time.”",
      "“Surely, with Us are",
      "heavy shackles and a blazing fire.”",
      "“Food that knots in the throat",
      "and will not go down, and a painful punishment.”",
      "“On that Day the earth and the mountains violently shake;",
      "the mountains become a heap of sand, slipping and pouring away.”",
      "“Indeed We,",
      "just as We sent a messenger to Pharaoh,",
      "have sent you a messenger, a witness over you.”",
      "“But Pharaoh defied that messenger;",
      "and We seized him with a crushing, uprooting grip,",
      "completely.”",
      "“So if you deny,",
      "from a Day whose terror",
      "turns even children’s hair white, how will you protect yourselves?”",
      "Power and wealth are fleeting.",
      "Before the Day when even mountains turn to sand,",
      "the choice is in your hands."
    ],
    "arabic": [
      {
        "ayah": 10,
        "text": "وَٱصْبِرْ عَلَىٰ مَا يَقُولُونَ وَٱهْجُرْهُمْ هَجْرًۭا جَمِيلًۭا"
      },
      {
        "ayah": 11,
        "text": "وَذَرْنِى وَٱلْمُكَذِّبِينَ أُو۟لِى ٱلنَّعْمَةِ وَمَهِّلْهُمْ قَلِيلًا"
      },
      {
        "ayah": 12,
        "text": "إِنَّ لَدَيْنَآ أَنكَالًۭا وَجَحِيمًۭا"
      },
      {
        "ayah": 13,
        "text": "وَطَعَامًۭا ذَا غُصَّةٍۢ وَعَذَابًا أَلِيمًۭا"
      },
      {
        "ayah": 14,
        "text": "يَوْمَ تَرْجُفُ ٱلْأَرْضُ وَٱلْجِبَالُ وَكَانَتِ ٱلْجِبَالُ كَثِيبًۭا مَّهِيلًا"
      },
      {
        "ayah": 15,
        "text": "إِنَّآ أَرْسَلْنَآ إِلَيْكُمْ رَسُولًۭا شَـٰهِدًا عَلَيْكُمْ كَمَآ أَرْسَلْنَآ إِلَىٰ فِرْعَوْنَ رَسُولًۭا"
      },
      {
        "ayah": 16,
        "text": "فَعَصَىٰ فِرْعَوْنُ ٱلرَّسُولَ فَأَخَذْنَـٰهُ أَخْذًۭا وَبِيلًۭا"
      },
      {
        "ayah": 17,
        "text": "فَكَيْفَ تَتَّقُونَ إِن كَفَرْتُمْ يَوْمًۭا يَجْعَلُ ٱلْوِلْدَٰنَ شِيبًا"
      }
    ],
    "besmele": null,
    "durationSec": 83.2,
    "refs": [
      "Kehf 18:47"
    ],
    "pub": {
      "ig": "Df2b5CWTGDp",
      "igDate": "2026-11-17",
      "yt": "CydhVsjzjj8",
      "ytPublic": false,
      "ytFrom": "2026-11-24T19:00:00+03:00"
    }
  },
  {
    "id": "T010",
    "slug": "muzzemmil-17-19",
    "surahNo": 73,
    "surahTr": "Müzzemmil",
    "surahEn": "Al-Muzzammil",
    "nuzul": 3,
    "ayahFrom": 17,
    "ayahTo": 19,
    "titleTr": "Gök yarıldığında",
    "titleEn": "When the sky splits open",
    "descTr": [
      "\"O günün şiddetiyle gök bile çatlayıp yarılır\" | Müzzemmil Suresi 17-19",
      "Müzzemmil Suresi 17, 18 ve 19. ayetler: Arapçası ve Türkçe anlamı, akıcı lafız çevirisiyle.",
      "\"Gerçeği inkâr ederseniz, dehşetinden çocukların bile saçlarını ağartan o günden kendinizi nasıl koruyacaksınız?\"",
      "\"Şüphesiz bunlar zihinleri uyaran bir hatırlatmadır; dileyen, Rabbine uzanan bir yol tutar.\"",
      "Allah kimseyi zorlamaz; olacak olanı açıkça bildirir, her okuyanı uyarır ve yolu seçmeyi dileyene bırakır.",
      "Kapanış ayeti, Muhammed 24: \"Kur'an'ı derinlemesine düşünüp anlamaya çalışmıyorlar mı, yoksa kalplerinin üzerinde kilitler mi var?\""
    ],
    "descEn": [
      "Surah Al-Muzzammil 73:17-19, Qur'an verses with Turkish narration and English subtitles.",
      "\"By its force, even the sky cracks and splits open; His promise will surely be fulfilled.\"",
      "Allah forces no one; He makes clear what is to come, warns every reader, and leaves the choice of path to whoever wills."
    ],
    "transcriptTr": [
      "Gerçeği inkâr ederseniz, dehşetinden çocukların bile saçlarını ağartan o günden kendinizi nasıl koruyacaksınız?",
      "O günün şiddetiyle gök bile çatlayıp yarılır; O'nun vaadi mutlaka gerçekleşecektir.",
      "Şüphesiz bunlar zihinleri uyaran bir hatırlatmadır; dileyen, Rabbine uzanan bir yol tutar.",
      "Allah kimseyi zorlamaz; olacak olanı açıkça bildirir, her okuyanı uyarır ve yolu seçmeyi dileyene bırakır.",
      "Kur'an'ı derinlemesine düşünüp anlamaya çalışmıyorlar mı, yoksa kalplerinin üzerinde kilitler mi var?"
    ],
    "transcriptEn": [
      "“If you deny the truth,",
      "from a Day whose terror turns even children’s hair white,",
      "how will you shield yourselves?”",
      "“By its force, even the sky cracks and splits open;",
      "His promise will surely be fulfilled.”",
      "“Surely this is a reminder that awakens minds;",
      "whoever wills, takes a path that reaches to his Lord.”",
      "Allah forces no one;",
      "He makes clear what is to come,",
      "warns every reader, and leaves the choice of path to whoever wills."
    ],
    "arabic": [
      {
        "ayah": 17,
        "text": "فَكَيْفَ تَتَّقُونَ إِن كَفَرْتُمْ يَوْمًۭا يَجْعَلُ ٱلْوِلْدَٰنَ شِيبًا"
      },
      {
        "ayah": 18,
        "text": "ٱلسَّمَآءُ مُنفَطِرٌۢ بِهِۦ ۚ كَانَ وَعْدُهُۥ مَفْعُولًا"
      },
      {
        "ayah": 19,
        "text": "إِنَّ هَـٰذِهِۦ تَذْكِرَةٌۭ ۖ فَمَن شَآءَ ٱتَّخَذَ إِلَىٰ رَبِّهِۦ سَبِيلًا"
      }
    ],
    "besmele": null,
    "durationSec": 45.3,
    "refs": [
      "Muhammed 47:24"
    ],
    "pub": {
      "ig": "Df7knpVIUkv",
      "igDate": "2026-11-19",
      "yt": "QEE0YNKcFOk",
      "ytPublic": false,
      "ytFrom": "2026-11-25T19:00:00+03:00"
    }
  },
  {
    "id": "T011",
    "slug": "muzzemmil-20",
    "surahNo": 73,
    "surahTr": "Müzzemmil",
    "surahEn": "Al-Muzzammil",
    "nuzul": 3,
    "ayahFrom": 20,
    "ayahTo": 20,
    "titleTr": "Kolayınıza geleni okuyun",
    "titleEn": "Read what is easy for you",
    "descTr": [
      "\"Kur'an'dan kolayınıza geleni okuyun.\" | Müzzemmil Suresi 20. ayet",
      "Müzzemmil Suresi'nin son ayeti, 20. ayetin tamamı: Arapçası ve Türkçe anlamı, akıcı lafız çevirisiyle.",
      "\"Geceyi ve gündüzü ölçüp belirleyen Allah'tır.\"",
      "\"Allah içinizde hastalar bulunacağını, bir kısmınızın Allah'ın lütfundan rızık aramak üzere yeryüzünde yol tepeceğini, bir kısmınızın ise hakikat ve adalet uğruna mücadele edeceğini bilmektedir. Ondan kolayınıza geleni okuyun.\"",
      "Kapanış ayeti, Kamer 17: \"Andolsun Biz Kur'an'ı düşünülüp öğüt alınsın diye kolaylaştırdık; düşünüp anlayan yok mu?\""
    ],
    "descEn": [
      "Surah Al-Muzzammil 73:20, the full verse, with Turkish narration and English subtitles.",
      "\"It is Allah who measures out the night and the day.\"",
      "\"Read of the Qur'an what is easy for you.\""
    ],
    "transcriptTr": [
      "Şüphesiz Rabbin senin, gecenin üçte ikisinden biraz azını, yarısını ve üçte birini ayakta geçirdiğini; seninle birlikte olanlardan bir topluluğun da böyle yaptığını biliyor.",
      "Geceyi ve gündüzü ölçüp belirleyen Allah'tır.",
      "Sizin bu süreyi kusursuzca hesaplayıp kuşatamayacağınızı bildiği için yükünüzü hafifletip sizi doğal dengeye döndürdü.",
      "Kur'an'dan kolayınıza geleni okuyun.",
      "Allah içinizde hastalar bulunacağını, bir kısmınızın Allah'ın lütfundan rızık aramak üzere yeryüzünde yol tepeceğini, bir kısmınızın ise hakikat ve adalet uğruna mücadele edeceğini bilmektedir.",
      "Ondan kolayınıza geleni okuyun.",
      "Toplumsal dayanışmayı ve namazı ayakta tutun, arındırıcı mali sorumluluğu verin ve Allah'a karşılık beklemeksizin güzel bir borç verin.",
      "Kendiniz için önceden ne iyilik gönderirseniz, onu Allah katında daha hayırlı ve ödülü daha büyük olarak bulursunuz.",
      "Allah'tan bağışlanma dileyin; çünkü Allah çok bağışlayıcıdır, sınırsız merhamet sahibidir.",
      "Andolsun Biz Kur'an'ı düşünülüp öğüt alınsın diye kolaylaştırdık; düşünüp anlayan yok mu?"
    ],
    "transcriptEn": [
      "“Surely your Lord knows",
      "that you stand a little less than two thirds of the night,",
      "or half of it, or a third of it;",
      "and that a group",
      "of those with you does the same.",
      "It is Allah who measures out the night and the day.",
      "Knowing that you could never perfectly",
      "calculate and encompass this time,",
      "He lightened your burden and returned you to natural balance.",
      "Read of the Qur’an what is easy for you.”",
      "“Allah knows that among you there will be the sick,",
      "that some of you, seeking provision from Allah’s bounty,",
      "will travel the land, and others will strive",
      "for truth and justice.",
      "Read of it what is easy for you.”",
      "“Uphold solidarity and the prayer,",
      "give the purifying dues, and lend to Allah",
      "a goodly loan, expecting nothing in return.”",
      "“Whatever good you send ahead for yourselves,",
      "you will find it with Allah,",
      "better and greater in reward.",
      "Ask Allah for forgiveness;",
      "for Allah is Most Forgiving,",
      "boundless in mercy.”"
    ],
    "arabic": [
      {
        "ayah": 20,
        "text": "۞ إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَىِ ٱلَّيْلِ وَنِصْفَهُۥ وَثُلُثَهُۥ وَطَآئِفَةٌۭ مِّنَ ٱلَّذِينَ مَعَكَ ۚ وَٱللَّهُ يُقَدِّرُ ٱلَّيْلَ وَٱلنَّهَارَ ۚ عَلِمَ أَن لَّن تُحْصُوهُ فَتَابَ عَلَيْكُمْ ۖ فَٱقْرَءُوا۟ مَا تَيَسَّرَ مِنَ ٱلْقُرْءَانِ ۚ عَلِمَ أَن سَيَكُونُ مِنكُم مَّرْضَىٰ ۙ وَءَاخَرُونَ يَضْرِبُونَ فِى ٱلْأَرْضِ يَبْتَغُونَ مِن فَضْلِ ٱللَّهِ ۙ وَءَاخَرُونَ يُقَـٰتِلُونَ فِى سَبِيلِ ٱللَّهِ ۖ فَٱقْرَءُوا۟ مَا تَيَسَّرَ مِنْهُ ۚ وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَأَقْرِضُوا۟ ٱللَّهَ قَرْضًا حَسَنًۭا ۚ وَمَا تُقَدِّمُوا۟ لِأَنفُسِكُم مِّنْ خَيْرٍۢ تَجِدُوهُ عِندَ ٱللَّهِ هُوَ خَيْرًۭا وَأَعْظَمَ أَجْرًۭا ۚ وَٱسْتَغْفِرُوا۟ ٱللَّهَ ۖ إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌۢ"
      }
    ],
    "besmele": null,
    "durationSec": 80,
    "refs": [
      "Kamer 54:17"
    ],
    "pub": {
      "ig": "Df-QnPmTVAd",
      "igDate": "2026-11-20",
      "yt": "8aUYy1vU0rI",
      "ytPublic": false,
      "ytFrom": "2026-11-26T19:00:00+03:00"
    }
  },
  {
    "id": "T012",
    "slug": "muddessir-1-10",
    "surahNo": 74,
    "surahTr": "Müddessir",
    "surahEn": "Al-Muddaththir",
    "nuzul": 4,
    "ayahFrom": 1,
    "ayahTo": 10,
    "titleTr": "Kalk ve uyar",
    "titleEn": "Arise and warn",
    "descTr": [
      "\"Ey örtüsüne bürünen, kalk ve uyar.\" (Müddessir 1-10)",
      "Allah önce kabuğuna çekilip kaçmayı keser, sonra beş net ölçü verir: Rabbini büyüt, giysilerini ve duruşunu temiz tut, iradeni çökerten kirlilikten kop, iyiliği başa kakma ve Rabbin için sabret. İslam'ın insandan istediği duruş bu kadar açık; çünkü o gün hakikati örtenler için hiç kolay olmayacak.",
      "Peki biz bugün sorumluluktan kaçıp hangi örtünün altına saklanıyoruz?"
    ],
    "descEn": [
      "\"O you wrapped in your cloak, arise and warn.\" (Al-Muddaththir 74:1-10)",
      "Magnify your Lord, keep yourself clean, cut ties with decay, do not hold favors over others, and be patient. Islam's stance is that clear. Which cloak are we hiding under today?"
    ],
    "transcriptTr": [
      "Ağır bir sorumlulukla yüzleştiğinde ilk refleksin kabuğuna çekilip örtünmek mi?",
      "Allah, Müddessir Suresi'ne tam bu insan refleksini kırarak başlıyor:",
      "“Ey örtüsüne bürünen,” “kalk ve uyar.”",
      "Buradaki muddessir kökü, çöl kumunun izleri örtüp silmesi gibi, insanın kendi kabuğuna çekilip silikleşmesidir.",
      "Ancak Allah, insanı bu ağır yüzleşmeye hazırlıksız çıkarmıyor.",
      "Hemen peşinden beş adımlık bir direnç protokolü kuruyor:",
      "“Rabbini büyüt.”",
      "Çünkü zihninde gerçek büyüklük yerli yerine oturduğunda, çevrendeki bütün sahte otoriteler kendiliğinden küçülür.",
      "“Giysilerini arındır.”",
      "Yani hem dış görünüşünü hem de toplum içindeki karakter duruşunu lekesiz tut.",
      "“Ruczdan, o yıkıcı kirlilikten kop.”",
      "Rucz, devenin arka bacaklarını titreterek onu yere çökerten sinirsel hastalıktır.",
      "İnsanın iradesini felç eden her türlü çürümeden bağını kesin olarak kes.",
      "“Daha fazlasını elde etmeyi umarak başa kakıcı iyilikte bulunma.”",
      "Menn kökü, sağlam bir ipi incelterek zayıflatıp kesmektir.",
      "Yaptığın iyilikten karşılık ya da minnet beklediğin anda, o iyiliğin gerçek değerini kendi elinle kesmiş olursun.",
      "“Ve Rabbin için sabret.”",
      "Peki bütün bu hazırlık ve acele neden?",
      "Allah hemen sekizinci ayette insanı kendine getirecek gerçeği şu sözlerle ortaya koyar:",
      "“O oyuk boruya keskin bir vuruşla üflendiğinde,” “işte o gün çetin bir gündür.”",
      "“Hakikati örtenler için hiç kolay olmayan.”"
    ],
    "transcriptEn": [
      "When you face a heavy responsibility,",
      "is your first reflex",
      "to retreat into your shell and hide?",
      "Allah opens Surah Al-Muddaththir",
      "by breaking exactly this human reflex:",
      "O you wrapped in your cloak,",
      "arise and warn.",
      "The root of “muddaththir” here",
      "is like desert sand covering every track:",
      "a person withdrawing into a shell and fading.",
      "Yet Allah does not send a person",
      "into this hard confrontation unprepared.",
      "Right away, He lays out a five-step",
      "protocol of resilience:",
      "Magnify your Lord.",
      "Because once true greatness",
      "settles into place in your mind,",
      "all the false authorities around you",
      "shrink on their own.",
      "Purify your garments.",
      "So keep both your outward appearance",
      "and, among people,",
      "your character spotless.",
      "Break away from rujz, that ruinous filth.",
      "Rujz makes a camel’s hind legs",
      "tremble until it collapses:",
      "a disease of the nerves.",
      "Whatever paralyzes a person’s will,",
      "every kind of decay:",
      "cut your ties with it for good.",
      "Hoping to gain more,",
      "do not do favors you hold over others.",
      "The root “menn”: a strong rope",
      "thinned, weakened, and cut.",
      "A return for the good you did,",
      "or gratitude: the moment you expect it,",
      "the true worth of that good",
      "is cut by your own hand.",
      "And for your Lord, be patient.",
      "So why all this preparation",
      "and urgency?",
      "Right in the eighth verse, Allah",
      "lays out the sobering truth",
      "in these words:",
      "When that hollow horn",
      "is sounded with a piercing strike,",
      "that very day",
      "is a hard day.",
      "For those who cover the truth,",
      "not easy at all."
    ],
    "arabic": [
      {
        "ayah": 1,
        "text": "يَـٰٓأَيُّهَا ٱلْمُدَّثِّرُ"
      },
      {
        "ayah": 2,
        "text": "قُمْ فَأَنذِرْ"
      },
      {
        "ayah": 3,
        "text": "وَرَبَّكَ فَكَبِّرْ"
      },
      {
        "ayah": 4,
        "text": "وَثِيَابَكَ فَطَهِّرْ"
      },
      {
        "ayah": 5,
        "text": "وَٱلرُّجْزَ فَٱهْجُرْ"
      },
      {
        "ayah": 6,
        "text": "وَلَا تَمْنُن تَسْتَكْثِرُ"
      },
      {
        "ayah": 7,
        "text": "وَلِرَبِّكَ فَٱصْبِرْ"
      },
      {
        "ayah": 8,
        "text": "فَإِذَا نُقِرَ فِى ٱلنَّاقُورِ"
      },
      {
        "ayah": 9,
        "text": "فَذَٰلِكَ يَوْمَئِذٍۢ يَوْمٌ عَسِيرٌ"
      },
      {
        "ayah": 10,
        "text": "عَلَى ٱلْكَـٰفِرِينَ غَيْرُ يَسِيرٍۢ"
      }
    ],
    "besmele": "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    "durationSec": 99.3,
    "refs": [],
    "pub": {
      "ig": "DgFw-2zIKD6",
      "igDate": "2026-11-23",
      "yt": "3rqM0QwwOEM",
      "ytPublic": false,
      "ytFrom": "2026-11-27T19:00:00+03:00"
    }
  }
];

/**
 * Short names: the owner's working titles (bolum-takip.csv) or the start of the
 * published YouTube title. The full published hook stays in titleTr / titleEn.
 */
const SHORT: Record<string, { tr: string; en: string }> = {
  T001: { tr: 'Oku', en: 'Read' },
  T002B: { tr: 'İnsan ne zaman azar?', en: 'When does a human transgress?' },
  T004: { tr: 'Herkes sana deli derse', en: 'If everyone called you mad' },
  T005: { tr: 'Bahçe sahipleri', en: 'The garden owners' },
  T006: { tr: 'Kim kefil?', en: 'Who guarantees it?' },
  T007: { tr: 'Bugün secdeye çağrılıyorlar', en: 'Called to prostrate today' },
  T008: { tr: 'Gece kalk', en: 'Rise at night' },
  T009: { tr: 'Dağlar kuma döndüğünde', en: 'When mountains turn to sand' },
  T010: { tr: 'Gök yarıldığında', en: 'When the sky splits open' },
  T011: { tr: 'Kolayınıza geleni okuyun', en: 'Read what is easy for you' },
  T012: { tr: 'Kalk ve uyar', en: 'Arise and warn' },
};

/** Build time; a scheduled YouTube video becomes embeddable on the next build after its time. */
const BUILD_TIME = Date.now();

export function isYoutubeEmbeddable(pub: RawEpisode['pub'], now: number = BUILD_TIME): boolean {
  if (!pub.yt) return false;
  if (pub.ytPublic) return true;
  return pub.ytFrom ? now >= Date.parse(pub.ytFrom) : false;
}

export const quranEpisodes: QuranEpisode[] = RAW.map((e) => ({
  ...e,
  shortTr: SHORT[e.id]?.tr ?? e.titleTr,
  shortEn: SHORT[e.id]?.en ?? e.titleEn ?? e.titleTr,
  instagramUrl: `https://www.instagram.com/omeryasironal/reel/${e.pub.ig}/`,
  youtubeId: e.pub.yt,
  ...(e.pub.ytFrom ? { youtubeFrom: e.pub.ytFrom } : {}),
  youtubeEmbeddable: isYoutubeEmbeddable(e.pub),
  cover: `/work/kuran-reels/kapak/${e.slug}.jpg`,
  range: e.ayahFrom === e.ayahTo ? String(e.ayahFrom) : `${e.ayahFrom}-${e.ayahTo}`,
})).sort((a, b) => a.nuzul - b.nuzul || a.ayahFrom - b.ayahFrom);

/** Surahs that have at least one episode, in revelation order. */
export const quranSurahs: QuranSurah[] = [...new Map(
  quranEpisodes.map((e) => [e.surahNo, { no: e.surahNo, nuzul: e.nuzul, nameTr: e.surahTr, nameEn: e.surahEn }]),
).values()].sort((a, b) => a.nuzul - b.nuzul);

export function episodeBySlug(slug: string): QuranEpisode | undefined {
  return quranEpisodes.find((e) => e.slug === slug);
}

export function episodesOfSurah(no: number): QuranEpisode[] {
  return quranEpisodes.filter((e) => e.surahNo === no);
}

/** Previous and next episode in revelation order. */
export function episodeNeighbours(slug: string): { prev?: QuranEpisode; next?: QuranEpisode } {
  const i = quranEpisodes.findIndex((e) => e.slug === slug);
  if (i < 0) return {};
  return { prev: quranEpisodes[i - 1], next: quranEpisodes[i + 1] };
}

/** Short episode name in the given locale. */
export function shortTitle(locale: 'tr' | 'en', e: QuranEpisode): string {
  return locale === 'en' ? e.shortEn : e.shortTr;
}

/** Full published hook in the given locale (EN falls back to TR). */
export function hookTitle(locale: 'tr' | 'en', e: QuranEpisode): string {
  return locale === 'en' ? (e.titleEn ?? e.titleTr) : e.titleTr;
}

/** "Alak Suresi" / "Al-Alaq". */
export function surahLabel(locale: 'tr' | 'en', s: { surahTr: string; surahEn: string }): string {
  return locale === 'tr' ? `${s.surahTr} Suresi` : s.surahEn;
}

/** ISO 8601 duration from seconds, e.g. 96.5 -> "PT1M37S". */
export function isoDuration(sec: number): string {
  const total = Math.round(sec);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `PT${m ? `${m}M` : ''}${s || !m ? `${s}S` : ''}`;
}

/** Cut text to max chars on a word boundary, with an ellipsis when cut. */
export function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return `${(sp > max * 0.5 ? cut.slice(0, sp) : cut).replace(/[\s,;:.!?-]+$/, '')}…`;
}
