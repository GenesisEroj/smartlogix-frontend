/**
 * Sidebar.jsx
 * Navegación lateral de SmartLogix
 */

export const Sidebar = ({ activeModule, setActiveModule }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'inventario', label: 'Inventario', icon: '▦' },
    { id: 'pedidos', label: 'Pedidos', icon: '◎' },
  ]

  return (
    <aside style={{
      width: '240px', minHeight: '100vh',
      background: '#0a0f1e',
      borderRight: '1px solid rgba(99,179,237,0.12)',
      display: 'flex', flexDirection: 'column',
      padding: '0',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Logo */}
      <div style={{
        padding: '2rem 1.5rem 1.5rem',
        borderBottom: '1px solid rgba(99,179,237,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
          }}>⚡</span>
          <div>
            <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              SmartLogix
            </div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Logística v1.0
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
        <div style={{ color: '#475569', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 0.75rem 0.5rem' }}>
          Módulos
        </div>
        {navItems.map((item) => {
          const active = activeModule === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 0.75rem', marginBottom: '2px',
                background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                border: 'none',
                borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                borderRadius: '0 6px 6px 0',
                color: active ? '#93c5fd' : '#64748b',
                cursor: 'pointer', textAlign: 'left',
                fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                transition: 'all 0.15s ease',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              <span style={{ fontSize: '1rem', opacity: active ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(99,179,237,0.1)',
        color: '#334155', fontSize: '0.75rem'
      }}>
        DSY1106 — Fullstack III
      </div>
    </aside>
  )
}
