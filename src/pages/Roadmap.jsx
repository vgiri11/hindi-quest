import { useState } from 'react'
import Card from '../components/Card'
import { phases } from '../data/phases'

function WeekCard({ week, color }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold mb-1" style={{ color }}>Week {week.week}</p>
      <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{week.title}</p>
      <ul className="space-y-1">
        {week.tasks.map((task, i) => (
          <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="mt-1 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: color, marginTop: '7px' }} />
            {task}
          </li>
        ))}
      </ul>
      {(week.hasPractice || week.hasClaude) && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {week.hasPractice && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(52,199,89,0.10)', color: '#34C759' }}>
              Partner practice
            </span>
          )}
          {week.hasClaude && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,149,0,0.10)', color: '#FF9500' }}>
              Claude session
            </span>
          )}
        </div>
      )}
    </Card>
  )
}

function PhaseAccordion({ phase }) {
  const [open, setOpen] = useState(phase.number === 1)

  return (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 p-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer', borderLeft: `4px solid ${phase.color}` }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${phase.color}18`, color: phase.color }}>
              {phase.months}
            </span>
          </div>
          <p className="text-base font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{phase.title}</p>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{phase.subtitle}</p>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', color: 'var(--text-secondary)' }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--divider)' }}>
          <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {phase.weeks.map(week => (
              <WeekCard key={week.week} week={week} color={phase.color} />
            ))}
          </div>
          <div
            className="mt-4 p-4 rounded-xl text-sm"
            style={{ backgroundColor: `${phase.color}10`, borderLeft: `3px solid ${phase.color}` }}
          >
            <span className="font-semibold" style={{ color: phase.color }}>Checkpoint: </span>
            <span style={{ color: 'var(--text-primary)' }}>{phase.checkpoint}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Roadmap() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Roadmap</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          B1+ Hindi in 26 weeks — click a phase to expand it
        </p>
      </div>
      {phases.map(phase => (
        <PhaseAccordion key={phase.id} phase={phase} />
      ))}
    </div>
  )
}
