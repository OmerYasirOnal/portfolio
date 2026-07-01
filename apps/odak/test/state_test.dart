import 'package:flutter_test/flutter_test.dart';
import 'package:odak/state.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUp(() => SharedPreferences.setMockInitialValues({}));

  group('tasks', () {
    test('addTask trims, ignores empty, first task becomes active', () {
      final s = AppState();
      s.addTask('   ');
      expect(s.tasks, isEmpty);

      s.addTask('  Study math  ');
      expect(s.tasks.single.title, 'Study math');
      expect(s.activeTaskId, s.tasks.single.id);
    });

    test('completing the active task promotes the next pending task', () {
      final s = AppState();
      s.addTask('A');
      s.addTask('B');
      final a = s.tasks[0];
      final b = s.tasks[1];
      expect(s.activeTaskId, a.id);

      s.toggleTaskDone(a);
      expect(s.activeTaskId, b.id);
    });

    test('removing the active task clears the selection', () {
      final s = AppState();
      s.addTask('A');
      s.removeTask(s.tasks.single);
      expect(s.tasks, isEmpty);
      expect(s.activeTaskId, isNull);
    });
  });

  group('phase cycle', () {
    test('skip cycles focus -> short break -> focus, long break after cycle',
        () {
      final s = AppState()..sessionsPerCycle = 4;
      expect(s.phase, Phase.focus);

      s.skip();
      expect(s.phase, Phase.shortBreak);
      s.skip();
      expect(s.phase, Phase.focus);

      // Complete the remaining focus sessions of the cycle.
      s.skip(); // 2nd focus done -> short
      s.skip(); // -> focus
      s.skip(); // 3rd focus done -> short
      s.skip(); // -> focus
      s.skip(); // 4th focus done -> long break
      expect(s.phase, Phase.longBreak);

      s.skip();
      expect(s.phase, Phase.focus);
    });

    test('skip does not record stats', () {
      final s = AppState();
      s.skip();
      expect(s.todaySessions, 0);
      expect(s.todayMinutes, 0);
    });

    test('remaining time follows the new phase length', () {
      final s = AppState()
        ..focusMinutes = 30
        ..shortBreakMinutes = 7;
      s.updateSettings(focus: 30); // re-sync remaining
      expect(s.remainingSeconds, 30 * 60);
      s.skip();
      expect(s.remainingSeconds, 7 * 60);
    });
  });

  group('stats', () {
    AppState stateAt(DateTime now) => AppState(clock: () => now);

    test('streak counts consecutive days ending today', () {
      final now = DateTime(2026, 7, 1);
      final s = stateAt(now);
      s.sessionsByDay[s.dayKey(DateTime(2026, 7, 1))] = 2;
      s.sessionsByDay[s.dayKey(DateTime(2026, 6, 30))] = 1;
      s.sessionsByDay[s.dayKey(DateTime(2026, 6, 29))] = 3;
      s.sessionsByDay[s.dayKey(DateTime(2026, 6, 27))] = 5; // gap on 28th
      expect(s.streak, 3);
    });

    test('streak survives an empty today (yesterday anchored)', () {
      final now = DateTime(2026, 7, 1);
      final s = stateAt(now);
      s.sessionsByDay[s.dayKey(DateTime(2026, 6, 30))] = 1;
      s.sessionsByDay[s.dayKey(DateTime(2026, 6, 29))] = 1;
      expect(s.streak, 2);
    });

    test('last7Days returns oldest-first window of 7 entries', () {
      final now = DateTime(2026, 7, 1);
      final s = stateAt(now);
      s.sessionsByDay[s.dayKey(DateTime(2026, 7, 1))] = 4;
      final week = s.last7Days;
      expect(week.length, 7);
      expect(week.first.$1.day, 25);
      expect(week.last.$2, 4);
    });
  });

  group('persistence', () {
    test('toJson/_applyJson roundtrip via public API', () {
      final s = AppState();
      s.addTask('Write thesis');
      s.updateSettings(focus: 40, language: 'en');
      final json = s.toJson();

      expect(json['focusMinutes'], 40);
      expect(json['locale'], 'en');
      expect((json['tasks'] as List).length, 1);
    });
  });
}
