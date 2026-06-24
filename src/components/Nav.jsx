import { NavLink } from 'react-router-dom'

const tabs = [
  { path: '/',          label: 'Today' },
  { path: '/setup',     label: 'Get Started' },
  { path: '/roadmap',   label: 'Roadmap' },
  { path: '/practice',  label: 'Practice' },
  { path: '/resources', label: 'Resources' },
  { path: '/culture',   label: 'Culture' },
  { path: '/clapback',  label: 'Clap Back' },
  { path: '/progress',  label: 'Progress' },
]

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--divider)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-center gap-8 px-6 mx-auto" style={{ maxWidth: '1200px' }}>
        <span
          className="text-base font-semibold shrink-0 py-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Hindi Quest
        </span>
        <nav className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className="whitespace-nowrap text-sm font-medium px-3 py-4 transition-colors duration-150"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                textDecoration: 'none',
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
