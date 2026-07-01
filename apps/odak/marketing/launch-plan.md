# Odak — 30 Günlük Sıfır Bütçeli Lansman Planı

Hedef: hiç para harcamadan ilk 1.000 kullanıcıya ulaşmak ve geri bildirim toplamak.
Tüm kanallar ücretsizdir. Ölçüm de ücretsizdir (aşağıya bak).

## Konumlandırma (tek cümle)

> **TR:** Ücretsiz, reklamsız, Türkçe Pomodoro zamanlayıcısı — hesap yok, takip yok, verilerin cihazında.
> **EN:** A free, ad-free Pomodoro timer that respects your privacy — no account, no ads, no tracking.

Ayrışma noktaları: (1) tamamen ücretsiz + reklamsız, (2) Türkçe yerelleştirme (rakiplerin çoğunda yok), (3) gizlilik: veri cihazdan çıkmıyor, (4) kurulum gerektirmeyen PWA.

## Hafta 1 — Yumuşak açılış (arkadaş çevresi + topluluklar)

- [ ] Uygulamayı 5–10 arkadaşına gönder, 3 somut soru sor: "Neyi eksik buldun? Neresi kafanı karıştırdı? Her gün kullanır mıydın?"
- [ ] LinkedIn'de "build in public" gönderisi (hazır metin: `social-posts.md`). Öğrenci + yazılım ağın için ideal kanal.
- [ ] X/Twitter'da TR + EN tanıtım flood'u (hazır metin var).
- [ ] Medium makalesi yaz (zaten 9 makalen var, kitlen hazır): "Flutter ile Sıfır Maliyetli Bir PWA Yayınlamak" — teknik hikâye + sonunda uygulama linki. Türkçe yaz, EN çevirisini ikinci makale olarak yayınla.

## Hafta 2 — Topluluk lansmanları

- [ ] **r/FlutterDev** (Showcase flair) — teknik açıdan anlat: self-hosted CanvasKit, offline PWA, tek ChangeNotifier. Geliştiriciler kaynak koda bakabilir (repo public).
- [ ] **r/productivity** ve **r/pomodoro** — ürün açısından anlat; "free, no ads, no account" başlıkta geçsin.
- [ ] Discord/Telegram Türk geliştirici grupları (Flutter Türkiye, Yazılımcılar Telegram grupları) — spam değil, "geri bildirim istiyorum" tonu.
- [ ] Üniversite kanalları: FSMVÜ öğrenci toplulukları/WhatsApp grupları — sınav dönemi ("vize/final haftası") zamanlaması altın değerinde.

## Hafta 3 — Ürün platformları

- [ ] **Product Hunt** lansmanı (ücretsiz, hazır metin var). Salı–Perşembe, sabah 10:01 Pasifik saati ideal.
- [ ] **Hacker News "Show HN"** (EN metin hazır). Beklenti düşük tut; teknik yorum gelirse hızlı yanıtla.
- [ ] Uygulamayı ücretsiz dizinlere ekle: AlternativeTo, Progressier PWA dizini, awesome-flutter listesine PR.

## Hafta 4 — İçerik + iterasyon

- [ ] Gelen geri bildirimden en çok istenen 1–2 özelliği ekle; "v1.1 — sizin isteklerinizle" gönderisi at (topluluk sahiplenmesi yaratır).
- [ ] İkinci Medium makalesi: kullanıcı verisiz "gizlilik odaklı ürün" anlatısı.
- [ ] YouTube Shorts / Instagram Reels: 30 saniyelik ekran kaydı (ücretsiz: OBS + CapCut). "Reklamsız pomodoro arayanlar" hook'u.

## Sürekli (her hafta)

- Haftada 1 build-in-public gönderisi (öğrenilen bir şey + ekran görüntüsü).
- Her yorum ve geri bildirime 24 saat içinde yanıt.
- README ve canlı demo linkini her gönderiye ekle.

## Ücretsiz ölçüm

- **GitHub Pages trafiği:** repo Insights → Traffic (ücretsiz).
- İstersen tek satırlık, çerezsiz, ücretsiz sayaç: GoatCounter (goatcounter.com) — gizlilik vaadiyle uyumlu, KVKK dostu.
- Başarı ölçütü (30 gün): 1.000 tekil ziyaret, 100 geri dönen kullanıcı, 20 geri bildirim.

## Sonraki adımlar (hâlâ ücretsiz)

- `flutter build apk` ile Android sürümü → önce GitHub Releases'ten dağıt (Play Store'un 25$ tek seferlik ücreti bütçe gerektirir; APK dağıtımı gerektirmez).
- Alan adı istersen: `odak.omeryasironal.com` alt alan adı **ücretsizdir** (mevcut domainine CNAME) — Pages'e custom domain olarak bağlanabilir.
- F-Droid'e gönderim tamamen ücretsizdir (açık kaynak şartıyla, kod zaten public).
