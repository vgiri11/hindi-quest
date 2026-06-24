import Card from '../components/Card'
import { useTodos } from '../hooks/useTodos'
import { useStreak } from '../hooks/useStreak'

const achievements = [
  { id: 'a1',  icon: '🌱', name: 'First Lesson',       desc: 'Completed your first study day',                          auto: true },
  { id: 'a2',  icon: '🔥', name: '7-Day Streak',        desc: 'Studied 7 days in a row',                                auto: true },
  { id: 'a3',  icon: '💎', name: '30-Day Streak',       desc: 'Studied 30 days in a row',                               auto: true },
  { id: 'a4',  icon: '✍️', name: 'Script Master',       desc: 'Can write the full Devanagari alphabet from memory',     auto: false },
  { id: 'a5',  icon: '📚', name: '100 Words',           desc: 'Added 100 words to Anki',                                auto: false },
  { id: 'a6',  icon: '⚡', name: 'First Clap Back',     desc: 'Delivered a clap back without hesitation',               auto: false },
  { id: 'a7',  icon: '🎭', name: 'Comedy Night Ready',  desc: 'Completed the full mock show rehearsal',                 auto: false },
  { id: 'a8',  icon: '🏆', name: 'B1 Level',            desc: 'Passed a B1 Hindi vocabulary test',                      auto: false },
  { id: 'a9',  icon: '🤝', name: 'Partner Pro',         desc: 'Completed 20 partner practice sessions',                 auto: false },
  { id: 'a10', icon: '🎤', name: 'Show Day',            desc: 'Attended the Abhishek Upmanyu show',                     auto: false },
]

const skillList = [
  { id: 'script',   label: 'Script & Pronunciation' },
  { id: 'vocab',    label: 'Vocabulary' },
  { id: 'grammar',  label: 'Grammar' },
  { id: 'listen',   label: 'Listening' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'culture',  label: 'Cultural Knowledge' },
]

function getLast30Days() {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return d.toISOString().split('T')[0]
  })
}

export default function Progress() {
  const { studiedDates } = useTodos()
  const { manualDays, toggleManualDay, getCurrentStreak, unlockedAchievements, toggleAchievement, skills, setSkill } = useStreak()

  const allStudiedDates = [...new Set([...studiedDates, ...manualDays])]
  const streak = getCurrentStreak(allStudiedDates)
  const last30 = getLast30Days()
  const today = new Date().toISOString().split('T')[0]

  function isUnlocked(a) {
    if (!a.auto) return unlockedAchievements.includes(a.id)
    if (a.id === 'a1') return allStudiedDates.length >= 1
    if (a.id === 'a2') return streak >= 7
    if (a.id === 'a3') return streak >= 30
    return false
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Progress</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Streak updates automatically when you check off todos. Click a tile to manually mark a day.
        </p>
      </div>

      {/* Streak */}
      <Card className="p-5">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{streak}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>day streak</span>
        </div>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
          {last30.map(date => {
            const isAuto = studiedDates.includes(date)
            const isManual = manualDays.includes(date)
            const studied = isAuto || isManual
            const isToday = date === today
            return (
              <button
                key={date}
                onClick={() => !isAuto && toggleManualDay(date)}
                title={date}
                className="aspect-square rounded-lg transition-colors"
                style={{
                  backgroundColor: studied ? 'var(--accent)' : 'rgba(60,60,67,0.08)',
                  border: isToday ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: isAuto ? 'default' : 'pointer',
                  opacity: isAuto && !isToday ? 0.85 : 1,
                }}
              />
            )
          })}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
          Last 30 days — bottom-right is today. Solid tiles auto-recorded from todos; click any empty tile to add manually.
        </p>
      </Card>

      {/* Achievements */}
      <Card className="p-5">
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Achievements</p>
        <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
          First 3 unlock automatically. Tick the rest yourself when you hit them.
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {achievements.map(a => {
            const unlocked = isUnlocked(a)
            return (
              <div
                key={a.id}
                onClick={a.auto ? undefined : () => toggleAchievement(a.id)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all"
                style={{
                  backgroundColor: unlocked ? 'rgba(0,122,255,0.08)' : 'rgba(60,60,67,0.04)',
                  border: unlocked ? '1px solid rgba(0,122,255,0.20)' : '1px solid transparent',
                  cursor: a.auto ? 'default' : 'pointer',
                  opacity: unlocked ? 1 : 0.4,
                }}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{a.name}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{a.desc}</span>
                {a.auto && (
                  <span className="text-xs mt-1 font-medium" style={{ color: unlocked ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {unlocked ? 'auto ✓' : 'auto'}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Skills — self-assessed</p>
        <div className="space-y-4">
          {skillList.map(skill => {
            const value = skills[skill.id] ?? 0
            return (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{skill.label}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={e => setSkill(skill.id, Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--accent)' }}
                />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
