import { cultureCards } from '../data/culture'

export default function Culture() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Culture</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Context that makes the Hindi you're learning actually land.
        </p>
      </div>

      {cultureCards.map(card => (
        <div
          key={card.id}
          className="rounded-2xl p-5 bg-white space-y-3"
          style={{
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '4px solid var(--green)',
          }}
        >
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{card.title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.body}</p>

          <div
            className="rounded-xl p-3 text-sm italic"
            style={{ backgroundColor: 'rgba(52,199,89,0.06)', color: 'var(--text-primary)' }}
          >
            {card.example}
          </div>

          <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(0,122,255,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>Partner note</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{card.partnerNote}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
