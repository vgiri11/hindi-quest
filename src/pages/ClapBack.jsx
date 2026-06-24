import { clapbacks, goldenRules } from '../data/clapbacks'

export default function ClapBack() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Clap Back</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Memorize these. Delivery beats script — practice until they feel like yours.
        </p>
      </div>

      {clapbacks.map(cb => (
        <div
          key={cb.id}
          className="rounded-2xl p-5 bg-white space-y-4"
          style={{
            boxShadow: cb.isNuclear ? '0 4px 16px rgba(255,59,48,0.12)' : 'var(--shadow-sm)',
            border: cb.isNuclear ? '1px solid rgba(255,59,48,0.20)' : 'none',
          }}
        >
          {cb.isNuclear && (
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#FF3B30' }}>
              ☢️ Nuclear Option
            </div>
          )}

          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{cb.scenario}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-medium">His approach: </span>{cb.approach}
            </p>
          </div>

          <div
            className="rounded-xl p-4 space-y-1"
            style={{ backgroundColor: cb.isNuclear ? 'rgba(255,59,48,0.05)' : 'rgba(0,122,255,0.05)' }}
          >
            <p className="text-xl font-semibold" style={{ color: cb.isNuclear ? '#FF3B30' : 'var(--text-primary)' }}>
              {cb.hindi}
            </p>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{cb.romanization}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cb.english}</p>
          </div>

          <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(52,199,89,0.06)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--green)' }}>Why it works</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{cb.whyItWorks}</p>
          </div>
        </div>
      ))}

      {/* Golden rules callout */}
      <div
        className="rounded-2xl p-5 mt-6"
        style={{ backgroundColor: 'rgba(255,149,0,0.08)', border: '1px solid rgba(255,149,0,0.20)' }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: '#FF9500' }}>Golden Rules</p>
        <ul className="space-y-2">
          {goldenRules.map((rule, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <span style={{ color: '#FF9500', fontWeight: '600' }}>{i + 1}.</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
