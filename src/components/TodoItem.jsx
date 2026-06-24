import Pill from './Pill'

export default function TodoItem({ item, checked, onToggle }) {
  return (
    <div
      className="flex gap-3 p-4"
      style={{ borderBottom: '1px solid var(--divider)' }}
    >
      <button
        onClick={onToggle}
        className="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{
          borderColor: checked ? 'var(--accent)' : 'rgba(60,60,67,0.30)',
          backgroundColor: checked ? 'var(--accent)' : 'transparent',
        }}
        aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-sm font-medium"
            style={{
              color: checked ? 'var(--text-secondary)' : 'var(--text-primary)',
              textDecoration: checked ? 'line-through' : 'none',
            }}
          >
            {item.title}
          </span>
          <Pill label={item.category} variant={item.category} />
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}
