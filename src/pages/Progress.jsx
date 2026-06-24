import Card from '../components/Card'
import { useStreak } from '../hooks/useStreak'

const achievements = [
  { id: 'a1',  icon: '🌱', name: 'First Lesson',       desc: 'Completed your first study day' },
  { id: 'a2',  icon: '🔥', name: '7-Day Streak',       desc: 'Studied 7 days in a row' },
  { id: 'a3',  icon: '💎', name: '30-Day Streak',      desc: 'Studied 30 days in a row' },
  { id: 'a4',  icon: '✍️', name: 'Script Master',      desc: 'Can write the full Devanagari alphabet from memory' },
  { id: 'a5',  icon: '📚', name: '100 Words',          desc: 'Added 100 words to Anki' },
  { id: 'a6',  icon: '⚡', name: 'First Clap Back',    desc: 'Delivered a clap back to your partner without hesitation' },
  { id: 'a7',  icon: '🎭', name: 'Comedy Night Ready', desc: 'Completed the full mock show rehearsal' },
  { id: 'a8',  icon: '🏆', name: 'B1 Level',           desc: 'Passed a B1 Hindi vocabulary test' },
  { id: 'a9',  icon: '🤝', name: 'Partner Pro',        desc: 'Completed 20 partner practice sessions' },
  { id: 'a10', icon: '🎤', name: 'Show Day',           desc: 'Attended the Abhishek Upmanyu show' },
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
  const { completedDays, toggleDay, getCurrentStreak, unlockedAchievements, toggleAchievement, skills, setSkill } = useStreak()
  const streak = getCurrentStreak()
  const last30 = getLast30Days()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Progress</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Click a day tile to mark it done. Click an achievement to unlock it.
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
            const done = completedDays.includes(date)
            const isToday = date === new Date().toISOString().split('T')[0]
            return (
              <button
                key={date}
                onClick={() => toggleDay(date)}
                title={date}
                className="aspect-square rounded-lg transition-colors"
                style={{
                  backgroundColor: done ? 'var(--accent)' : 'rgba(60,60,67,0.08)',
                  border: isToday ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              />
            )
          })}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>Last 30 days — today is bottom-right</p>
      </Card>

      {/* Achievements */}
      <Card className="p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Achievements</p>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {achievements.map(a => {
            const unlocked = unlockedAchievements.includes(a.id)
            return (
              <button
                key={a.id}
                onClick={() => toggleAchievement(a.id)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all"
                style={{
                  backgroundColor: unlocked ? 'rgba(0,122,255,0.08)' : 'rgba(60,60,67,0.04)',
                  border: unlocked ? '1px solid rgba(0,122,255,0.20)' : '1px solid transparent',
                  cursor: 'pointer',
                  opacity: unlocked ? 1 : 0.45,
                }}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{a.name}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{a.desc}</span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Skill progress */}
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
