export default function Card({ children, className = '', style = {} }) {
  return (
    <div
      className={`bg-white ${className}`}
      style={{
        borderRadius: '14px',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
