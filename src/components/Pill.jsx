const palette = {
  Anki:      { bg: 'rgba(0,122,255,0.10)',   color: '#007AFF' },
  Partner:   { bg: 'rgba(52,199,89,0.10)',   color: '#34C759' },
  Claude:    { bg: 'rgba(255,149,0,0.10)',   color: '#FF9500' },
  Listening: { bg: 'rgba(175,82,222,0.10)',  color: '#AF52DE' },
  Writing:   { bg: 'rgba(255,45,85,0.10)',   color: '#FF2D55' },
  Book:      { bg: 'rgba(162,132,94,0.12)',  color: '#A2845E' },
  free:      { bg: 'rgba(52,199,89,0.10)',   color: '#34C759' },
  paid:      { bg: 'rgba(255,149,0,0.10)',   color: '#FF9500' },
}

export default function Pill({ label, variant }) {
  const c = palette[variant] || { bg: 'rgba(60,60,67,0.08)', color: 'var(--text-secondary)' }
  return (
    <span
      className="inline-block text-xs font-medium px-3 py-1"
      style={{ borderRadius: '20px', backgroundColor: c.bg, color: c.color }}
    >
      {label}
    </span>
  )
}
