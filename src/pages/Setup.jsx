import { useState } from 'react'
import Card from '../components/Card'
import { useSetup } from '../hooks/useSetup'
import { setupSteps } from '../data/setup'

function StepCircle({ number, complete }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors"
      style={{
        backgroundColor: complete ? 'var(--green)' : 'rgba(60,60,67,0.08)',
        color: complete ? 'white' : 'var(--text-secondary)',
      }}
    >
      {complete ? (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5l3 3L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : number}
    </div>
  )
}

function StepRow({ step, index, checked, toggle, getStepProgress, isStepComplete }) {
  const [open, setOpen] = useState(false)
  const complete = isStepComplete(step)
  const { done, total } = getStepProgress(step)
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <StepCircle number={index + 1} complete={complete} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{step.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(60,60,67,0.08)' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, backgroundColor: complete ? 'var(--green)' : 'var(--accent)' }}
              />
            </div>
            <span className="text-xs shrink-0" style={{ color: 'var(--text-secondary)' }}>{done}/{total}</span>
          </div>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--text-secondary)' }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--divider)' }}>
          {step.items.map(item => {
            const isChecked = !!checked[step.id]?.[item.id]
            return (
              <button
                key={item.id}
                onClick={() => toggle(step.id, item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{
                  background: isChecked ? 'rgba(52,199,89,0.05)' : 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--divider)',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{
                    borderColor: isChecked ? 'var(--green)' : 'rgba(60,60,67,0.30)',
                    backgroundColor: isChecked ? 'var(--green)' : 'transparent',
                  }}
                >
                  {isChecked && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5l2 2L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-sm"
                  style={{
                    color: isChecked ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}
                >
                  {item.text}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </Card>
  )
}

export default function Setup() {
  const { checked, toggle, getStepProgress, isStepComplete } = useSetup()
  const totalDone = setupSteps.filter(s => isStepComplete(s)).length

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Get Started</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {totalDone} of {setupSteps.length} steps complete — tap a step to expand it
        </p>
      </div>

      {setupSteps.map((step, i) => (
        <StepRow
          key={step.id}
          step={step}
          index={i}
          checked={checked}
          toggle={toggle}
          getStepProgress={getStepProgress}
          isStepComplete={isStepComplete}
        />
      ))}
    </div>
  )
}
