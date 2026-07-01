import 'dart:ui' show PlatformDispatcher;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'i18n.dart';
import 'state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  final state = AppState();
  state.load(
    deviceLanguageCode: PlatformDispatcher.instance.locale.languageCode,
  );
  runApp(OdakApp(state: state));
}

const _bgDark = Color(0xFF12141F);
const _surfaceDark = Color(0xFF1B1E2E);
const _focusColor = Color(0xFFFF7A59);
const _shortBreakColor = Color(0xFF4EC9B0);
const _longBreakColor = Color(0xFF7C8CF8);

Color phaseColor(Phase phase) => switch (phase) {
      Phase.focus => _focusColor,
      Phase.shortBreak => _shortBreakColor,
      Phase.longBreak => _longBreakColor,
    };

class OdakApp extends StatelessWidget {
  const OdakApp({super.key, required this.state});

  final AppState state;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: state,
      builder: (context, _) {
        return MaterialApp(
          title: 'Odak',
          debugShowCheckedModeBanner: false,
          themeMode: state.themeMode,
          theme: _theme(Brightness.light),
          darkTheme: _theme(Brightness.dark),
          home: HomeScreen(state: state),
        );
      },
    );
  }

  ThemeData _theme(Brightness brightness) {
    final dark = brightness == Brightness.dark;
    final scheme = ColorScheme.fromSeed(
      seedColor: _focusColor,
      brightness: brightness,
      surface: dark ? _surfaceDark : Colors.white,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: dark ? _bgDark : const Color(0xFFF6F5F2),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
          color: dark ? Colors.white : const Color(0xFF1B1E2E),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: dark ? _surfaceDark : Colors.white,
        indicatorColor: _focusColor.withValues(alpha: 0.18),
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, required this.state});

  final AppState state;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _tab = 0;

  AppState get state => widget.state;
  L10n get l10n => L10n(state.locale);

  @override
  void initState() {
    super.initState();
    state.addListener(_onStateChanged);
  }

  @override
  void dispose() {
    state.removeListener(_onStateChanged);
    super.dispose();
  }

  void _onStateChanged() {
    _updateTabTitle();
    final completed = state.consumePhaseJustCompleted();
    if (completed != null && mounted) {
      final message = completed == Phase.focus
          ? l10n.t('phaseDoneFocus')
          : l10n.t('phaseDoneBreak');
      ScaffoldMessenger.of(context)
        ..clearSnackBars()
        ..showSnackBar(
          SnackBar(
            content: Text(message),
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 4),
          ),
        );
    }
  }

  /// Mirrors the countdown into the browser tab title on web.
  void _updateTabTitle() {
    final label = state.running
        ? '${_format(state.remainingSeconds)} · ${l10n.t(_phaseKey(state.phase))} — Odak'
        : 'Odak';
    SystemChrome.setApplicationSwitcherDescription(
      ApplicationSwitcherDescription(
        label: label,
        primaryColor: _bgDark.toARGB32(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: state,
      builder: (context, _) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Odak'),
            actions: [
              IconButton(
                tooltip: l10n.t('settings'),
                icon: const Icon(Icons.tune_rounded),
                onPressed: () => showSettingsSheet(context, state),
              ),
            ],
          ),
          body: SafeArea(
            child: IndexedStack(
              index: _tab,
              children: [
                TimerView(state: state),
                TasksView(state: state),
                StatsView(state: state),
              ],
            ),
          ),
          bottomNavigationBar: NavigationBar(
            selectedIndex: _tab,
            onDestinationSelected: (i) => setState(() => _tab = i),
            destinations: [
              NavigationDestination(
                icon: const Icon(Icons.timer_outlined),
                selectedIcon: const Icon(Icons.timer_rounded),
                label: l10n.t('timer'),
              ),
              NavigationDestination(
                icon: const Icon(Icons.checklist_rounded),
                label: l10n.t('tasks'),
              ),
              NavigationDestination(
                icon: const Icon(Icons.insights_outlined),
                selectedIcon: const Icon(Icons.insights_rounded),
                label: l10n.t('stats'),
              ),
            ],
          ),
        );
      },
    );
  }
}

String _format(int seconds) {
  final m = (seconds ~/ 60).toString().padLeft(2, '0');
  final s = (seconds % 60).toString().padLeft(2, '0');
  return '$m:$s';
}

String _phaseKey(Phase phase) => switch (phase) {
      Phase.focus => 'focus',
      Phase.shortBreak => 'shortBreak',
      Phase.longBreak => 'longBreak',
    };

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------

class TimerView extends StatelessWidget {
  const TimerView({super.key, required this.state});

  final AppState state;

  @override
  Widget build(BuildContext context) {
    final l10n = L10n(state.locale);
    final color = phaseColor(state.phase);
    final active = state.activeTask;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 440),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _PhaseChip(label: l10n.t(_phaseKey(state.phase)), color: color),
              const SizedBox(height: 28),
              AspectRatio(
                aspectRatio: 1,
                child: CustomPaint(
                  painter: _RingPainter(
                    progress: state.progress,
                    color: color,
                    trackColor: Theme.of(context)
                        .colorScheme
                        .onSurface
                        .withValues(alpha: 0.08),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          _format(state.remainingSeconds),
                          style: TextStyle(
                            fontSize: 64,
                            fontWeight: FontWeight.w800,
                            fontFeatures: const [FontFeature.tabularFigures()],
                            letterSpacing: -1,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 4),
                        _SessionDots(
                          total: state.sessionsPerCycle,
                          done: state.completedInCycle % state.sessionsPerCycle,
                          color: color,
                        ),
                        if (active != null && state.phase == Phase.focus) ...[
                          const SizedBox(height: 10),
                          Text(
                            active.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontSize: 14,
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurface
                                  .withValues(alpha: 0.6),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton.filledTonal(
                    tooltip: l10n.t('reset'),
                    onPressed: state.reset,
                    icon: const Icon(Icons.refresh_rounded),
                  ),
                  const SizedBox(width: 16),
                  SizedBox(
                    width: 160,
                    height: 56,
                    child: FilledButton.icon(
                      style: FilledButton.styleFrom(
                        backgroundColor: color,
                        foregroundColor: Colors.white,
                        textStyle: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      onPressed: state.running ? state.pause : state.start,
                      icon: Icon(
                        state.running
                            ? Icons.pause_rounded
                            : Icons.play_arrow_rounded,
                      ),
                      label: Text(
                        state.running ? l10n.t('pause') : l10n.t('start'),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  IconButton.filledTonal(
                    tooltip: l10n.t('skip'),
                    onPressed: state.skip,
                    icon: const Icon(Icons.skip_next_rounded),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PhaseChip extends StatelessWidget {
  const _PhaseChip({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.14),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.5)),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.3,
        ),
      ),
    );
  }
}

class _SessionDots extends StatelessWidget {
  const _SessionDots({
    required this.total,
    required this.done,
    required this.color,
  });

  final int total;
  final int done;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < total; i++)
          Container(
            width: 8,
            height: 8,
            margin: const EdgeInsets.symmetric(horizontal: 3),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: i < done
                  ? color
                  : Theme.of(context)
                      .colorScheme
                      .onSurface
                      .withValues(alpha: 0.15),
            ),
          ),
      ],
    );
  }
}

class _RingPainter extends CustomPainter {
  _RingPainter({
    required this.progress,
    required this.color,
    required this.trackColor,
  });

  final double progress;
  final Color color;
  final Color trackColor;

  @override
  void paint(Canvas canvas, Size size) {
    const stroke = 14.0;
    final center = size.center(Offset.zero);
    final radius = (size.shortestSide - stroke) / 2;
    final rect = Rect.fromCircle(center: center, radius: radius);

    final track = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..color = trackColor;
    canvas.drawCircle(center, radius, track);

    final arc = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..color = color;
    canvas.drawArc(rect, -1.5707963, 6.2831853 * progress, false, arc);
  }

  @override
  bool shouldRepaint(_RingPainter old) =>
      old.progress != progress || old.color != color;
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

class TasksView extends StatefulWidget {
  const TasksView({super.key, required this.state});

  final AppState state;

  @override
  State<TasksView> createState() => _TasksViewState();
}

class _TasksViewState extends State<TasksView> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _submit() {
    widget.state.addTask(_controller.text);
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    final state = widget.state;
    final l10n = L10n(state.locale);
    final pending = [for (final t in state.tasks) if (!t.done) t];
    final done = [for (final t in state.tasks) if (t.done) t];

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: Column(
            children: [
              TextField(
                controller: _controller,
                onSubmitted: (_) => _submit(),
                textInputAction: TextInputAction.done,
                decoration: InputDecoration(
                  hintText: l10n.t('addTaskHint'),
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: BorderSide.none,
                  ),
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.add_rounded),
                    onPressed: _submit,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: state.tasks.isEmpty
                    ? _EmptyHint(text: l10n.t('noTasks'))
                    : ListView(
                        children: [
                          for (final t in pending)
                            _TaskTile(state: state, task: t, l10n: l10n),
                          if (done.isNotEmpty) ...[
                            Padding(
                              padding: const EdgeInsets.fromLTRB(4, 16, 4, 8),
                              child: Text(
                                l10n.t('completedTasks'),
                                style: Theme.of(context).textTheme.labelLarge,
                              ),
                            ),
                            for (final t in done)
                              _TaskTile(state: state, task: t, l10n: l10n),
                          ],
                        ],
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TaskTile extends StatelessWidget {
  const _TaskTile({required this.state, required this.task, required this.l10n});

  final AppState state;
  final Task task;
  final L10n l10n;

  @override
  Widget build(BuildContext context) {
    final isActive = state.activeTaskId == task.id && !task.done;
    final scheme = Theme.of(context).colorScheme;

    return Card(
      elevation: 0,
      margin: const EdgeInsets.symmetric(vertical: 4),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: isActive
              ? _focusColor.withValues(alpha: 0.7)
              : scheme.onSurface.withValues(alpha: 0.08),
        ),
      ),
      child: ListTile(
        onTap: () => state.setActiveTask(task),
        leading: Checkbox(
          value: task.done,
          shape: const CircleBorder(),
          onChanged: (_) => state.toggleTaskDone(task),
        ),
        title: Text(
          task.title,
          style: TextStyle(
            decoration: task.done ? TextDecoration.lineThrough : null,
            color: task.done ? scheme.onSurface.withValues(alpha: 0.45) : null,
          ),
        ),
        subtitle: task.pomodoros > 0
            ? Text('🍅 ${task.pomodoros}')
            : null,
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isActive)
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _focusColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  l10n.t('activeTaskBadge'),
                  style: const TextStyle(
                    color: _focusColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            IconButton(
              tooltip: l10n.t('deleteTask'),
              icon: Icon(
                Icons.delete_outline_rounded,
                size: 20,
                color: scheme.onSurface.withValues(alpha: 0.4),
              ),
              onPressed: () => state.removeTask(task),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyHint extends StatelessWidget {
  const _EmptyHint({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 15,
          height: 1.6,
          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
        ),
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

class StatsView extends StatelessWidget {
  const StatsView({super.key, required this.state});

  final AppState state;

  @override
  Widget build(BuildContext context) {
    final l10n = L10n(state.locale);
    final week = state.last7Days;
    final hasAny = week.any((d) => d.$2 > 0) || state.todaySessions > 0;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: !hasAny
              ? _EmptyHint(text: l10n.t('noStats'))
              : ListView(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: _StatCard(
                            title: l10n.t('today'),
                            value: '${state.todaySessions}',
                            caption: l10n.t('sessions'),
                            color: _focusColor,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _StatCard(
                            title: l10n.t('today'),
                            value: '${state.todayMinutes}',
                            caption: l10n.t('focusMinutes'),
                            color: _shortBreakColor,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _StatCard(
                            title: l10n.t('streak'),
                            value: '${state.streak}',
                            caption: l10n.t('streakDays'),
                            color: _longBreakColor,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Text(
                      l10n.t('last7Days'),
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 12),
                    _WeekChart(week: week, locale: state.locale),
                  ],
                ),
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.title,
    required this.value,
    required this.caption,
    required this.color,
  });

  final String title;
  final String value;
  final String caption;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.25)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontSize: 12, color: color)),
          const SizedBox(height: 6),
          Text(
            value,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
          ),
          Text(
            caption,
            style: TextStyle(
              fontSize: 11,
              color:
                  Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
            ),
          ),
        ],
      ),
    );
  }
}

class _WeekChart extends StatelessWidget {
  const _WeekChart({required this.week, required this.locale});

  final List<(DateTime, int)> week;
  final String locale;

  static const _daysTr = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  static const _daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  @override
  Widget build(BuildContext context) {
    final names = locale == 'tr' ? _daysTr : _daysEn;
    final max = week.fold<int>(1, (m, d) => d.$2 > m ? d.$2 : m);
    final scheme = Theme.of(context).colorScheme;

    return Container(
      height: 180,
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
      decoration: BoxDecoration(
        color: scheme.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: scheme.onSurface.withValues(alpha: 0.08)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          for (final (day, count) in week)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 5),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    if (count > 0)
                      Text(
                        '$count',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: scheme.onSurface.withValues(alpha: 0.7),
                        ),
                      ),
                    const SizedBox(height: 4),
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      height: count == 0 ? 4 : 12 + 96 * (count / max),
                      decoration: BoxDecoration(
                        color: count == 0
                            ? scheme.onSurface.withValues(alpha: 0.10)
                            : _focusColor,
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      names[day.weekday - 1],
                      style: TextStyle(
                        fontSize: 11,
                        color: scheme.onSurface.withValues(alpha: 0.55),
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

void showSettingsSheet(BuildContext context, AppState state) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    builder: (context) => AnimatedBuilder(
      animation: state,
      builder: (context, _) {
        final l10n = L10n(state.locale);
        return SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  l10n.t('settings'),
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                _DurationSlider(
                  label: l10n.t('focusLength'),
                  suffix: l10n.t('minutesSuffix'),
                  value: state.focusMinutes,
                  min: 10,
                  max: 60,
                  onChanged: (v) => state.updateSettings(focus: v),
                ),
                _DurationSlider(
                  label: l10n.t('shortLength'),
                  suffix: l10n.t('minutesSuffix'),
                  value: state.shortBreakMinutes,
                  min: 3,
                  max: 15,
                  onChanged: (v) => state.updateSettings(shortBreak: v),
                ),
                _DurationSlider(
                  label: l10n.t('longLength'),
                  suffix: l10n.t('minutesSuffix'),
                  value: state.longBreakMinutes,
                  min: 10,
                  max: 30,
                  onChanged: (v) => state.updateSettings(longBreak: v),
                ),
                _DurationSlider(
                  label: l10n.t('sessionsPerCycle'),
                  suffix: '',
                  value: state.sessionsPerCycle,
                  min: 2,
                  max: 8,
                  onChanged: (v) => state.updateSettings(perCycle: v),
                ),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(l10n.t('autoStartNext')),
                  value: state.autoStartNext,
                  onChanged: (v) => state.updateSettings(autoStart: v),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(child: Text(l10n.t('language'))),
                    SegmentedButton<String>(
                      segments: const [
                        ButtonSegment(value: 'tr', label: Text('TR')),
                        ButtonSegment(value: 'en', label: Text('EN')),
                      ],
                      selected: {state.locale},
                      onSelectionChanged: (s) =>
                          state.updateSettings(language: s.first),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: Text(l10n.t('theme'))),
                    SegmentedButton<ThemeMode>(
                      segments: [
                        ButtonSegment(
                          value: ThemeMode.dark,
                          label: Text(l10n.t('themeDark')),
                        ),
                        ButtonSegment(
                          value: ThemeMode.light,
                          label: Text(l10n.t('themeLight')),
                        ),
                      ],
                      selected: {
                        state.themeMode == ThemeMode.light
                            ? ThemeMode.light
                            : ThemeMode.dark,
                      },
                      onSelectionChanged: (s) =>
                          state.updateSettings(mode: s.first),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                Text(
                  l10n.t('privacyNote'),
                  style: TextStyle(
                    fontSize: 12,
                    color: Theme.of(context)
                        .colorScheme
                        .onSurface
                        .withValues(alpha: 0.5),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
}

class _DurationSlider extends StatelessWidget {
  const _DurationSlider({
    required this.label,
    required this.suffix,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
  });

  final String label;
  final String suffix;
  final int value;
  final int min;
  final int max;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(flex: 3, child: Text(label)),
        Expanded(
          flex: 4,
          child: Slider(
            value: value.toDouble(),
            min: min.toDouble(),
            max: max.toDouble(),
            divisions: max - min,
            onChanged: (v) => onChanged(v.round()),
          ),
        ),
        SizedBox(
          width: 56,
          child: Text(
            '$value $suffix'.trim(),
            textAlign: TextAlign.end,
            style: const TextStyle(fontWeight: FontWeight.w700),
          ),
        ),
      ],
    );
  }
}
