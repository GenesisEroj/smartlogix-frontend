/**
 * DashboardHome.jsx
 * Vista principal con métricas del sistema SmartLogix
 */

export const DashboardHome = ({ totalProductos, totalPedidos, pedidosPendientes, stockBajo }) => {
  const stats = [
    { label: 'Total Productos', value: totalProductos, icon: '▦', color: '#3b82f6', sub: 'en inventario' },
    { label: 'Total Pedidos', value: totalPedidos, icon: '◎', color: '#06b6d4', sub: 'registrados' },
    { label: 'Pedidos Pendientes', value: pedidosPendientes, icon: '⏳', color: '#f59e0b', sub: 'por procesar' },
    { label: 'Stock Bajo', value: stockBajo, icon: '⚠', color: '#ef4444', sub: 'productos críticos' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          color: '#e2e8f0', fontSize: '1.75rem', fontWeight: 700,
          letterSpacing: '-0.03em', margin: 0
        }}>
          Panel de Control
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.9rem' }}>
          Resumen operativo de SmartLogix
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem', marginBottom: '2rem'
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: '#0f172a',
            border: '1px solid rgba(99,179,237,0.1)',
            borderRadius: '12px', padding: '1.5rem',
            transition: 'border-color 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {stat.label}
                </div>
                <div style={{ color: stat.color, fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, marginTop: '0.4rem' }}>
                  {stat.value ?? '—'}
                </div>
                <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.25rem' }}>{stat.sub}</div>
              </div>
              <span style={{
                fontSize: '1.5rem', opacity: 0.4, color: stat.color
              }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div style={{
        background: 'rgba(59,130,246,0.05)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '12px', padding: '1.25rem 1.5rem',
        color: '#93c5fd', fontSize: '0.875rem'
      }}>
        <strong>ℹ SmartLogix</strong> — Plataforma de gestión logística para PYMEs de eCommerce.
        Usa el menú lateral para gestionar Inventario y Pedidos.
      </div>
    </div>
  )
}
