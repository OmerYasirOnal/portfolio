/// Lightweight in-app localization for Turkish and English.
///
/// The app intentionally avoids the full `flutter_localizations` codegen
/// pipeline: two locales and a few dozen strings fit comfortably in a map,
/// and this keeps the build dependency-free.
library;

class L10n {
  const L10n(this.code);

  /// Active language code: 'tr' or 'en'.
  final String code;

  String t(String key) {
    final entry = _strings[key];
    if (entry == null) return key;
    return entry[code] ?? entry['en'] ?? key;
  }

  static const Map<String, Map<String, String>> _strings = {
    'timer': {'tr': 'Zamanlayıcı', 'en': 'Timer'},
    'tasks': {'tr': 'Görevler', 'en': 'Tasks'},
    'stats': {'tr': 'İstatistik', 'en': 'Stats'},
    'settings': {'tr': 'Ayarlar', 'en': 'Settings'},
    'focus': {'tr': 'Odaklan', 'en': 'Focus'},
    'shortBreak': {'tr': 'Kısa Mola', 'en': 'Short Break'},
    'longBreak': {'tr': 'Uzun Mola', 'en': 'Long Break'},
    'start': {'tr': 'Başlat', 'en': 'Start'},
    'pause': {'tr': 'Duraklat', 'en': 'Pause'},
    'reset': {'tr': 'Sıfırla', 'en': 'Reset'},
    'skip': {'tr': 'Atla', 'en': 'Skip'},
    'sessionOf': {'tr': 'Seans', 'en': 'Session'},
    'addTaskHint': {
      'tr': 'Yeni görev ekle… (ör. Analiz ödevi)',
      'en': 'Add a task… (e.g. Math homework)',
    },
    'noTasks': {
      'tr': 'Henüz görev yok.\nBir görev ekle ve odaklanmaya başla!',
      'en': 'No tasks yet.\nAdd one and start focusing!',
    },
    'activeTaskBadge': {'tr': 'Aktif', 'en': 'Active'},
    'deleteTask': {'tr': 'Görevi sil', 'en': 'Delete task'},
    'completedTasks': {'tr': 'Tamamlananlar', 'en': 'Completed'},
    'today': {'tr': 'Bugün', 'en': 'Today'},
    'sessions': {'tr': 'seans', 'en': 'sessions'},
    'focusMinutes': {'tr': 'odak dakikası', 'en': 'focus minutes'},
    'last7Days': {'tr': 'Son 7 Gün', 'en': 'Last 7 Days'},
    'streak': {'tr': 'Seri', 'en': 'Streak'},
    'streakDays': {'tr': 'gün', 'en': 'days'},
    'noStats': {
      'tr': 'Henüz istatistik yok.\nİlk odak seansını tamamla!',
      'en': 'No stats yet.\nFinish your first focus session!',
    },
    'focusLength': {'tr': 'Odak süresi', 'en': 'Focus length'},
    'shortLength': {'tr': 'Kısa mola süresi', 'en': 'Short break length'},
    'longLength': {'tr': 'Uzun mola süresi', 'en': 'Long break length'},
    'minutesSuffix': {'tr': 'dk', 'en': 'min'},
    'sessionsPerCycle': {
      'tr': 'Uzun molaya kadar seans',
      'en': 'Sessions until long break',
    },
    'autoStartNext': {
      'tr': 'Sonraki seansı otomatik başlat',
      'en': 'Auto-start next session',
    },
    'language': {'tr': 'Dil', 'en': 'Language'},
    'theme': {'tr': 'Tema', 'en': 'Theme'},
    'themeDark': {'tr': 'Koyu', 'en': 'Dark'},
    'themeLight': {'tr': 'Açık', 'en': 'Light'},
    'phaseDoneFocus': {
      'tr': 'Harika! Odak seansı tamamlandı 🎉',
      'en': 'Great! Focus session complete 🎉',
    },
    'phaseDoneBreak': {
      'tr': 'Mola bitti — hadi devam!',
      'en': 'Break over — back to it!',
    },
    'privacyNote': {
      'tr': 'Verilerin yalnızca bu cihazda saklanır. Hesap yok, reklam yok, takip yok.',
      'en': 'Your data stays on this device. No account, no ads, no tracking.',
    },
  };
}
