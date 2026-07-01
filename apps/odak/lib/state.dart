import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum Phase { focus, shortBreak, longBreak }

class Task {
  Task({
    required this.id,
    required this.title,
    this.done = false,
    this.pomodoros = 0,
  });

  final String id;
  String title;
  bool done;
  int pomodoros;

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'done': done,
        'pomodoros': pomodoros,
      };

  factory Task.fromJson(Map<String, dynamic> json) => Task(
        id: json['id'] as String,
        title: json['title'] as String,
        done: json['done'] as bool? ?? false,
        pomodoros: json['pomodoros'] as int? ?? 0,
      );
}

/// Single source of truth for timer, tasks, stats and settings.
/// Persisted as JSON in SharedPreferences (localStorage on web).
class AppState extends ChangeNotifier {
  AppState({DateTime Function()? clock}) : _clock = clock ?? DateTime.now;

  static const _prefsKey = 'odak.v1';

  final DateTime Function() _clock;

  // --- Settings ---
  int focusMinutes = 25;
  int shortBreakMinutes = 5;
  int longBreakMinutes = 15;
  int sessionsPerCycle = 4;
  bool autoStartNext = false;
  String locale = 'tr';
  ThemeMode themeMode = ThemeMode.dark;

  // --- Timer ---
  Phase phase = Phase.focus;
  int remainingSeconds = 25 * 60;
  bool running = false;
  int completedInCycle = 0;
  Timer? _ticker;

  /// Set for one notification cycle after a phase completes, so the UI can
  /// show a snackbar. Cleared by [consumePhaseJustCompleted].
  Phase? _phaseJustCompleted;

  // --- Tasks ---
  final List<Task> tasks = [];
  String? activeTaskId;

  // --- Stats: 'yyyy-MM-dd' -> completed focus sessions / minutes ---
  final Map<String, int> sessionsByDay = {};
  final Map<String, int> minutesByDay = {};

  int get phaseTotalSeconds => switch (phase) {
        Phase.focus => focusMinutes * 60,
        Phase.shortBreak => shortBreakMinutes * 60,
        Phase.longBreak => longBreakMinutes * 60,
      };

  double get progress =>
      phaseTotalSeconds == 0 ? 0 : 1 - remainingSeconds / phaseTotalSeconds;

  Task? get activeTask {
    for (final t in tasks) {
      if (t.id == activeTaskId) return t;
    }
    return null;
  }

  String dayKey(DateTime d) =>
      '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  int get todaySessions => sessionsByDay[dayKey(_clock())] ?? 0;
  int get todayMinutes => minutesByDay[dayKey(_clock())] ?? 0;

  /// Consecutive days (ending today or yesterday) with >= 1 focus session.
  int get streak {
    var day = _clock();
    if ((sessionsByDay[dayKey(day)] ?? 0) == 0) {
      day = day.subtract(const Duration(days: 1));
    }
    var count = 0;
    while ((sessionsByDay[dayKey(day)] ?? 0) > 0) {
      count++;
      day = day.subtract(const Duration(days: 1));
    }
    return count;
  }

  /// Last 7 days of (label day, sessions), oldest first.
  List<(DateTime, int)> get last7Days {
    final now = _clock();
    return [
      for (var i = 6; i >= 0; i--)
        () {
          final d = now.subtract(Duration(days: i));
          return (d, sessionsByDay[dayKey(d)] ?? 0);
        }(),
    ];
  }

  // ---------------- Timer control ----------------

  void start() {
    if (running) return;
    running = true;
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) => _tick());
    notifyListeners();
  }

  void pause() {
    running = false;
    _ticker?.cancel();
    _ticker = null;
    notifyListeners();
  }

  void reset() {
    pause();
    remainingSeconds = phaseTotalSeconds;
    notifyListeners();
  }

  /// Skips to the next phase without recording stats.
  void skip() => _advancePhase(recordStats: false);

  void _tick() {
    if (remainingSeconds > 1) {
      remainingSeconds--;
      notifyListeners();
      return;
    }
    remainingSeconds = 0;
    _advancePhase(recordStats: true);
  }

  void _advancePhase({required bool recordStats}) {
    final finished = phase;
    pause();

    if (finished == Phase.focus) {
      if (recordStats) {
        final key = dayKey(_clock());
        sessionsByDay[key] = (sessionsByDay[key] ?? 0) + 1;
        minutesByDay[key] = (minutesByDay[key] ?? 0) + focusMinutes;
        activeTask?.pomodoros++;
      }
      completedInCycle++;
      phase = completedInCycle % sessionsPerCycle == 0
          ? Phase.longBreak
          : Phase.shortBreak;
    } else {
      phase = Phase.focus;
    }

    remainingSeconds = phaseTotalSeconds;
    if (recordStats) _phaseJustCompleted = finished;
    save();
    notifyListeners();
    if (recordStats && autoStartNext) start();
  }

  Phase? consumePhaseJustCompleted() {
    final p = _phaseJustCompleted;
    _phaseJustCompleted = null;
    return p;
  }

  // ---------------- Tasks ----------------

  void addTask(String title) {
    final trimmed = title.trim();
    if (trimmed.isEmpty) return;
    final task = Task(
      id: '${_clock().microsecondsSinceEpoch}-${tasks.length}',
      title: trimmed,
    );
    tasks.add(task);
    activeTaskId ??= task.id;
    save();
    notifyListeners();
  }

  void toggleTaskDone(Task task) {
    task.done = !task.done;
    if (task.done && activeTaskId == task.id) {
      activeTaskId = null;
      for (final t in tasks) {
        if (!t.done) {
          activeTaskId = t.id;
          break;
        }
      }
    }
    save();
    notifyListeners();
  }

  void setActiveTask(Task task) {
    if (task.done) return;
    activeTaskId = task.id;
    save();
    notifyListeners();
  }

  void removeTask(Task task) {
    tasks.remove(task);
    if (activeTaskId == task.id) activeTaskId = null;
    save();
    notifyListeners();
  }

  // ---------------- Settings ----------------

  void updateSettings({
    int? focus,
    int? shortBreak,
    int? longBreak,
    int? perCycle,
    bool? autoStart,
    String? language,
    ThemeMode? mode,
  }) {
    focusMinutes = focus ?? focusMinutes;
    shortBreakMinutes = shortBreak ?? shortBreakMinutes;
    longBreakMinutes = longBreak ?? longBreakMinutes;
    sessionsPerCycle = perCycle ?? sessionsPerCycle;
    autoStartNext = autoStart ?? autoStartNext;
    locale = language ?? locale;
    themeMode = mode ?? themeMode;
    if (!running) remainingSeconds = phaseTotalSeconds;
    save();
    notifyListeners();
  }

  // ---------------- Persistence ----------------

  Map<String, dynamic> toJson() => {
        'focusMinutes': focusMinutes,
        'shortBreakMinutes': shortBreakMinutes,
        'longBreakMinutes': longBreakMinutes,
        'sessionsPerCycle': sessionsPerCycle,
        'autoStartNext': autoStartNext,
        'locale': locale,
        'themeMode': themeMode.name,
        'completedInCycle': completedInCycle,
        'tasks': [for (final t in tasks) t.toJson()],
        'activeTaskId': activeTaskId,
        'sessionsByDay': sessionsByDay,
        'minutesByDay': minutesByDay,
      };

  void _applyJson(Map<String, dynamic> json) {
    focusMinutes = json['focusMinutes'] as int? ?? focusMinutes;
    shortBreakMinutes = json['shortBreakMinutes'] as int? ?? shortBreakMinutes;
    longBreakMinutes = json['longBreakMinutes'] as int? ?? longBreakMinutes;
    sessionsPerCycle = json['sessionsPerCycle'] as int? ?? sessionsPerCycle;
    autoStartNext = json['autoStartNext'] as bool? ?? autoStartNext;
    locale = json['locale'] as String? ?? locale;
    themeMode = ThemeMode.values.asNameMap()[json['themeMode']] ?? themeMode;
    completedInCycle = json['completedInCycle'] as int? ?? 0;
    tasks
      ..clear()
      ..addAll([
        for (final t in (json['tasks'] as List? ?? []))
          Task.fromJson(Map<String, dynamic>.from(t as Map)),
      ]);
    activeTaskId = json['activeTaskId'] as String?;
    sessionsByDay
      ..clear()
      ..addAll(Map<String, int>.from(json['sessionsByDay'] as Map? ?? {}));
    minutesByDay
      ..clear()
      ..addAll(Map<String, int>.from(json['minutesByDay'] as Map? ?? {}));
    remainingSeconds = phaseTotalSeconds;
  }

  Future<void> load({String? deviceLanguageCode}) async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null) {
      try {
        _applyJson(jsonDecode(raw) as Map<String, dynamic>);
      } catch (_) {
        // Corrupt store: fall through with defaults rather than crash.
      }
    } else if (deviceLanguageCode != null) {
      locale = deviceLanguageCode == 'tr' ? 'tr' : 'en';
    }
    notifyListeners();
  }

  Future<void> save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, jsonEncode(toJson()));
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }
}
