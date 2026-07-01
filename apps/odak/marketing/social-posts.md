# Odak — Hazır Sosyal Medya Metinleri

Linki her gönderide kullan: `https://omeryasironal.github.io/portfolio/`
(Custom domain bağlanırsa tüm metinlerde güncelle.)

---

## X / Twitter — TR (lansman)

> Ders çalışırken kullandığım pomodoro uygulamaları ya reklam gösteriyor ya da temel özellikleri paraya kilitliyordu.
>
> Ben de kendiminkini yaptım: **Odak** 🍅
>
> ✅ Tamamen ücretsiz, reklamsız
> ✅ Hesap yok — verilerin cihazında kalıyor
> ✅ Görevler + istatistik + seri takibi
> ✅ Türkçe & İngilizce
>
> Tarayıcıdan direkt çalışıyor: [link]

## X / Twitter — EN (launch)

> Every Pomodoro app I tried had ads or a paywall on basic features.
>
> So I built my own: **Odak** 🍅
>
> ✅ Free & ad-free, forever
> ✅ No account — your data never leaves your device
> ✅ Tasks, daily stats, streaks
> ✅ Works offline as a PWA
>
> Built with Flutter, deployed for $0: [link]

## LinkedIn — TR (build in public)

> 🍅 Yan proje: Odak — ücretsiz ve reklamsız bir Pomodoro odak uygulaması.
>
> Amacım iki şeydi:
> 1) Sınav dönemlerinde gerçekten kullanacağım, dikkat dağıtmayan bir araç yapmak
> 2) Bir ürünü **sıfır maliyetle** uçtan uca yayına almak
>
> Teknik taraf:
> • Flutter (web-first PWA — aynı kod Android/iOS'a da derleniyor)
> • Birim testli ChangeNotifier durum katmanı
> • CanvasKit self-hosted → üçüncü taraf CDN yok, çevrimdışı çalışıyor
> • CI/CD: GitHub Actions → GitHub Pages (tamamen ücretsiz)
>
> Veriler cihazdan çıkmıyor: hesap yok, reklam yok, takip yok.
>
> Denemek 10 saniye sürüyor (kurulum yok): [link]
> Geri bildirimlere gerçekten ihtiyacım var — yorumlara bekliyorum 🙏

## Reddit — r/FlutterDev (Showcase)

**Title:** I built a free, offline-capable Pomodoro PWA with Flutter — self-hosted CanvasKit, zero-cost CI/CD

**Body:**
> Hi all! I shipped a small focus timer as a web-first Flutter app and wanted to share the technical bits:
>
> - Single `ChangeNotifier` state layer, unit-tested (timer cycle, streaks, persistence)
> - `--no-web-resources-cdn` so CanvasKit is served from my origin → works offline, no third-party requests
> - Only dependency is `shared_preferences`; everything stored locally
> - Deployed free: GitHub Actions builds on push → GitHub Pages hosts
> - TR/EN localization with a ~40-line map instead of the full intl pipeline
>
> Live: [link] — Source: [repo link]
> Happy to answer anything about Flutter web/PWA setup.

## Reddit — r/productivity

**Title:** I made a free Pomodoro timer with no ads, no account and no tracking (works in the browser)

**Body:**
> Student here. I got tired of Pomodoro apps that show ads mid-break or lock stats behind subscriptions, so I built a free one and I'm keeping it free.
>
> - Timer with configurable focus/break lengths
> - Task list — each finished session counts a 🍅 on the task
> - Daily stats, day streak, last-7-days chart
> - Your data stays on your device (it literally has no server)
> - Installable as an app (PWA), works offline
>
> Link: [link] — feedback very welcome, especially about what's missing.

## Product Hunt

**Name:** Odak
**Tagline:** Free, ad-free Pomodoro timer that respects your privacy
**Description:**
> Odak is a Pomodoro focus timer with tasks, daily stats and streaks. No account, no ads, no tracking — all data stays on your device. Bilingual (EN/TR), installable as a PWA, works offline. Built with Flutter and hosted for $0, and it will stay free.

**First comment (maker):**
> Hi PH! I'm a CS student and I built Odak because every focus app I tried interrupted my breaks with ads. It's fully free and privacy-first: there is no backend at all — your stats live in your browser. Would love feedback on what to build next: sounds? weekly goals? Thanks for checking it out! 🍅

## Hacker News — Show HN

**Title:** Show HN: Odak – a free, offline Pomodoro PWA with no backend
**Text:**
> I built a Pomodoro timer as a Flutter web PWA. There's no server: tasks and stats persist in localStorage, CanvasKit is self-hosted so it works offline after first load, and CI/CD is GitHub Actions → GitHub Pages (total hosting cost: $0). Source is in my portfolio monorepo: [repo link]. Feedback welcome — especially on Flutter-web performance perceptions.
