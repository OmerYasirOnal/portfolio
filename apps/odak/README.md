# Odak 🍅

**TR** — Ücretsiz, reklamsız, iki dilli (TR/EN) Pomodoro odak zamanlayıcısı. Görev listesi, günlük istatistikler ve seri (streak) takibi. Verileriniz yalnızca cihazınızda saklanır: hesap yok, reklam yok, takip yok.

**EN** — Free, ad-free, bilingual (TR/EN) Pomodoro focus timer with a task list, daily stats and streak tracking. Your data never leaves your device: no account, no ads, no tracking.

## Features

- 🎯 Pomodoro timer — configurable focus / short break / long break lengths and cycle size
- ✅ Tasks — add tasks, mark one active, completed focus sessions count 🍅 per task
- 📊 Stats — today's sessions & focus minutes, day streak, last-7-days chart
- 🌗 Dark & light themes, 🇹🇷/🇬🇧 instant language switch
- 🔒 Privacy-first — everything stored locally (localStorage / SharedPreferences)
- 📱 Installable PWA — works offline after first load

## Tech

Flutter (web-first, also builds for Android/iOS/desktop), single `ChangeNotifier` state, no backend, only dependency is `shared_preferences`.

## Development

```bash
cd apps/odak
flutter pub get
flutter test
flutter run -d chrome
```

## Release build (web)

```bash
flutter build web --release
# output: build/web — deploy anywhere static (Vercel, GitHub Pages, Netlify, Cloudflare Pages)
```
