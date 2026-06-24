import { useState } from 'react'
import Card from '../components/Card'
import TodoItem from '../components/TodoItem'
import { useTodos } from '../hooks/useTodos'
import { todos as todoData } from '../data/todos'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function todayIndex() {
  return (new Date().getDay() + 6) % 7
}

function downloadICS(time) {
  const [h, m] = time.split(':')
  const d = new Date()
  const pad = n => String(n).padStart(2, '0')
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hindi Quest//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dateStr}T${h}${m}00`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:Hindi Quest Study Session',
    'DESCRIPTION:Time to study Hindi. Open your app to see today\'s tasks.',
    'DURATION:PT35M',
    'BEGIN:VALARM',
    'TRIGGER:-PT5M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Hindi Quest starts in 5 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hindi-quest-reminder.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export default function Today() {
  const [selectedDay, setSelectedDay] = useState(days[todayIndex()])
  const [reminderTime, setReminderTime] = useState('19:00')
  const { checked, toggle, resetDay, getProgress } = useTodos()

  const dayTodos = todoData[selectedDay] || []
  const progress = getProgress(selectedDay)

  const timeBlocks = ['0–5 min', '5–20 min', '20–35 min', 'Evening']
  const grouped = timeBlocks
    .map(block => ({ block, items: dayTodos.filter(i => i.timeBlock === block) }))
    .filter(g => g.items.length > 0)

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Day picker */}
      <div className="flex gap-2 flex-wrap">
        {days.map((day, i) => {
          const isToday = i === todayIndex()
          const isSelected = day === selectedDay
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderRadius: '20px',
                backgroundColor: isSelected ? 'var(--accent)' : isToday ? 'rgba(0,122,255,0.10)' : 'white',
                color: isSelected ? 'white' : isToday ? 'var(--accent)' : 'var(--text-secondary)',
                boxShadow: isSelected ? 'none' : 'var(--shadow-sm)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {dayLabels[i]}
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {days[days.indexOf(selectedDay)].charAt(0).toUpperCase() + days[days.indexOf(selectedDay)].slice(1)}
            </span>
            <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>
              {progress}% complete
            </span>
          </div>
          <button
            onClick={() => resetDay(selectedDay)}
            className="text-xs px-3 py-1 transition-colors"
            style={{
              borderRadius: '20px',
              backgroundColor: 'rgba(60,60,67,0.08)',
              color: 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(60,60,67,0.08)' }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: progress === 100 ? 'var(--green)' : 'var(--accent)' }}
          />
        </div>
      </Card>

      {/* Todo list grouped by time block */}
      {grouped.map(({ block, items }) => (
        <div key={block}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2 px-1" style={{ color: 'var(--text-secondary)' }}>
            {block}
          </p>
          <Card>
            {items.map((item, idx) => (
              <div key={item.id} style={idx === items.length - 1 ? { borderBottom: 'none' } : {}}>
                <TodoItem
                  item={item}
                  checked={!!checked[selectedDay]?.[item.id]}
                  onToggle={() => toggle(selectedDay, item.id)}
                />
              </div>
            ))}
          </Card>
        </div>
      ))}

      {/* Calendar reminder card */}
      <Card className="p-4">
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Daily reminder
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Download a repeating calendar event with a 5-minute alarm. Works with Apple Calendar, Google Calendar, and Outlook.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="time"
            value={reminderTime}
            onChange={e => setReminderTime(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl"
            style={{
              border: '1px solid var(--divider)',
              color: 'var(--text-primary)',
              backgroundColor: 'white',
            }}
          />
          <button
            onClick={() => downloadICS(reminderTime)}
            className="text-sm font-medium px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Download reminder
          </button>
        </div>
      </Card>

    </div>
  )
}
