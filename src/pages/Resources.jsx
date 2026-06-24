import Card from '../components/Card'
import Pill from '../components/Pill'
import { resources } from '../data/resources'

export default function Resources() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Resources</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Free tools only — except where marked.
        </p>
      </div>

      {resources.map(group => (
        <div key={group.group}>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>
            {group.group}
          </h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {group.items.map(item => (
              <Card key={item.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                  </div>
                  <Pill label={item.cost} variant={item.cost} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium mt-auto"
                    style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    Open →
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
