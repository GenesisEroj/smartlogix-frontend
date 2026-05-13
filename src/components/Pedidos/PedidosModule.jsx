/**
 * PedidosModule.jsx
 * Módulo completo de gestión de pedidos con estados.
 * Usa el hook usePedidos (Repository Pattern).
 */

import { useState, useEffect } from 'react'
import { usePedidos } from '../../hooks/usePedidos'

const ESTADOS = ['PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO', 'CANCELADO']
const EMPTY_FORM = { clienteNombre: '', clienteEmail: '', direccionEnvio: '', productoId: '', cantidad: '', total: '' }

const estadoColor = {
  PENDIENTE: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  PROCESANDO: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa' },
  ENVIADO: { bg: 'rgba(139,92,246,0.1)', color: '#a78bfa' },
  ENTREGADO: { bg: 'rgba(52,211,153,0.1)', color: '#34d399' },
  CANCELADO: { bg: 'rgba(239,68,68,0.1)', color: '#f87171' },
}

export const PedidosModule = () => {
  const { pedidos, loading, fetchPedidos, crearPedido, cambiarEstado, eliminarPedido } = usePedidos()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [filtroEstado, setFiltroEstado] = useState('TODOS')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [changeEstado, setChangeEstado] = useState(null) // { id, estadoActual }

  useEffect(() => { fetchPedidos() }, [fetchPedidos])

  const handleSubmit = async () => {
    if (!form.clienteNombre || !form.productoId || !form.cantidad) return
    try {
      await crearPedido({
        clienteId: form.clienteNombre,
        productoId: form.productoId,
        cantidad: parseInt(form.cantidad),
        total: parseFloat(form.total || 0)
      })
      setForm(EMPTY_FORM); setShowForm(false)
    } catch (_) { }
  }
  const filtered = pedidos.filter(p => filtroEstado === 'TODOS' || p.estado === filtroEstado)

  const inputStyle = {
    background: '#0a0f1e', border: '1px solid rgba(99,179,237,0.2)',
    borderRadius: '8px', padding: '0.6rem 0.875rem',
    color: '#e2e8f0', fontSize: '0.875rem', width: '100%',
    outline: 'none', fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box'
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Pedidos</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {pedidos.length} pedidos registrados
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setForm(EMPTY_FORM) }}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem',
            color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif"
          }}>
          + Nuevo Pedido
        </button>
      </div>

      {/* Filtros de estado */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['TODOS', ...ESTADOS].map(e => (
          <button key={e} onClick={() => setFiltroEstado(e)}
            style={{
              background: filtroEstado === e ? 'rgba(59,130,246,0.2)' : 'transparent',
              border: `1px solid ${filtroEstado === e ? 'rgba(59,130,246,0.4)' : 'rgba(99,179,237,0.1)'}`,
              borderRadius: '20px', padding: '0.35rem 0.875rem',
              color: filtroEstado === e ? '#93c5fd' : '#475569',
              cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em'
            }}>
            {e}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#93c5fd', margin: '0 0 1rem', fontSize: '1rem' }}>Nuevo Pedido</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              ['clienteNombre', 'Nombre Cliente *', 'text'],
              ['clienteEmail', 'Email Cliente', 'email'],
              ['productoId', 'ID Producto *', 'number'],
              ['cantidad', 'Cantidad *', 'number'],
              ['total', 'Total ($)', 'number'],
            ].map(([field, label, type]) => (
              <div key={field}>
                <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>{label}</label>
                <input type={type} value={form[field]}
                  onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={inputStyle} />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Dirección de Envío</label>
              <input value={form.direccionEnvio}
                onChange={(e) => setForm(f => ({ ...f, direccionEnvio: e.target.value }))}
                style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={handleSubmit} disabled={loading}
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Creando...' : 'Crear Pedido'}
            </button>
            <button onClick={() => setShowForm(false)}
              style={{ background: 'transparent', border: '1px solid rgba(99,179,237,0.2)', borderRadius: '8px', padding: '0.6rem 1.25rem', color: '#64748b', cursor: 'pointer', fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading && !showForm ? (
        <div style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>Cargando pedidos...</div>
      ) : (
        <div style={{ background: '#0f172a', border: '1px solid rgba(99,179,237,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(99,179,237,0.1)' }}>
                {['ID', 'Cliente', 'Producto', 'Cantidad', 'Total', 'Estado', 'Acciones'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#334155' }}>
                  No hay pedidos{filtroEstado !== 'TODOS' ? ` con estado ${filtroEstado}` : ''}.
                </td></tr>
              ) : filtered.map((p, i) => {
                const ec = estadoColor[p.estado] || estadoColor.PENDIENTE
                return (
                  <tr key={p.id ?? i} style={{ borderBottom: '1px solid rgba(99,179,237,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.8rem' }}>#{p.id}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ color: '#e2e8f0', fontWeight: 500, fontSize: '0.875rem' }}>{p.clienteNombre}</div>
                      <div style={{ color: '#475569', fontSize: '0.75rem' }}>{p.clienteEmail}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>#{p.productoId}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#93c5fd' }}>{p.cantidad}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#34d399', fontWeight: 600 }}>${parseFloat(p.total || 0).toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ background: ec.bg, color: ec.color, borderRadius: '20px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
                        {p.estado}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setChangeEstado({ id: p.id, estadoActual: p.estado })}
                          style={{ background: 'rgba(59,130,246,0.15)', border: 'none', borderRadius: '6px', padding: '0.35rem 0.75rem', color: '#93c5fd', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif" }}>
                          Estado
                        </button>
                        <button onClick={() => setConfirmDelete(p.id)}
                          style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', padding: '0.35rem 0.75rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif" }}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Cambiar Estado Modal */}
      {changeEstado && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', padding: '2rem', maxWidth: '360px', width: '90%', fontFamily: "'DM Sans', sans-serif" }}>
            <h3 style={{ color: '#93c5fd', margin: '0 0 1rem', fontSize: '1rem' }}>Cambiar Estado del Pedido #{changeEstado.id}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {ESTADOS.map(e => {
                const ec = estadoColor[e]
                return (
                  <button key={e}
                    onClick={async () => { await cambiarEstado(changeEstado.id, e); setChangeEstado(null) }}
                    style={{
                      background: changeEstado.estadoActual === e ? ec.bg : 'transparent',
                      border: `1px solid ${changeEstado.estadoActual === e ? ec.color : 'rgba(99,179,237,0.1)'}`,
                      borderRadius: '8px', padding: '0.6rem 1rem',
                      color: ec.color, cursor: 'pointer', textAlign: 'left',
                      fontSize: '0.875rem', fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                    {changeEstado.estadoActual === e ? '✓ ' : ''}{e}
                  </button>
                )
              })}
            </div>
            <button onClick={() => setChangeEstado(null)}
              style={{ width: '100%', background: 'transparent', border: '1px solid rgba(99,179,237,0.2)', borderRadius: '8px', padding: '0.6rem', color: '#64748b', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '2rem', maxWidth: '360px', width: '90%', fontFamily: "'DM Sans', sans-serif" }}>
            <h3 style={{ color: '#f87171', margin: '0 0 0.75rem' }}>¿Eliminar pedido?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 1.5rem' }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={async () => { await eliminarPedido(confirmDelete); setConfirmDelete(null) }}
                style={{ flex: 1, background: '#ef4444', border: 'none', borderRadius: '8px', padding: '0.7rem', color: '#fff', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Sí, eliminar
              </button>
              <button onClick={() => setConfirmDelete(null)}
                style={{ flex: 1, background: 'transparent', border: '1px solid rgba(99,179,237,0.2)', borderRadius: '8px', padding: '0.7rem', color: '#64748b', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
