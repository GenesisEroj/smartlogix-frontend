/**
 * InventarioModule.jsx
 * Módulo completo de gestión de inventario con CRUD.
 * Usa el hook useInventario (Repository Pattern).
 */

import { useState, useEffect } from 'react'
import { useInventario } from '../../hooks/useInventario'

const EMPTY_FORM = { nombre: '', descripcion: '', precio: '', stock: '', categoria: '' }

export const InventarioModule = () => {
  const { productos, loading, fetchProductos, crearProducto, actualizarProducto, eliminarProducto } = useInventario()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => { fetchProductos() }, [fetchProductos])

  const handleSubmit = async () => {
    if (!form.nombre || !form.precio || !form.stock) return
    const payload = {
    ...form,
    precio: parseFloat(form.precio),
    stock: parseInt(form.stock),
    productoId: editId ? form.productoId : `PROD-${Date.now()}`
    }
    try {
      if (editId) {
        await actualizarProducto(editId, payload)
      } else {
        await crearProducto(payload)
      }
      setForm(EMPTY_FORM); setShowForm(false); setEditId(null)
    } catch (_) {}
  }

  const handleEdit = (p) => {
    setForm({ nombre: p.nombre, descripcion: p.descripcion || '', precio: p.precio, stock: p.stock, categoria: p.categoria || '' })
    setEditId(p.id); setShowForm(true)
  }

  const filtered = productos.filter(p =>
    p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(search.toLowerCase())
  )

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
          <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Inventario</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {productos.length} productos registrados
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM) }}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem',
            color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
            fontFamily: "'DM Sans', sans-serif"
          }}>
          + Nuevo Producto
        </button>
      </div>

      {/* Search */}
      <input
        placeholder="Buscar por nombre o categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...inputStyle, marginBottom: '1rem', maxWidth: '380px' }}
      />

      {/* Form Modal */}
      {showForm && (
        <div style={{
          background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#93c5fd', margin: '0 0 1rem', fontSize: '1rem' }}>
            {editId ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              ['nombre', 'Nombre *', 'text'],
              ['categoria', 'Categoría', 'text'],
              ['precio', 'Precio ($) *', 'number'],
              ['stock', 'Stock (unidades) *', 'number'],
            ].map(([field, label, type]) => (
              <div key={field}>
                <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>{label}</label>
                <input
                  type={type} value={form[field]}
                  onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', marginBottom: '0.35rem' }}>Descripción</label>
              <input
                value={form.descripcion}
                onChange={(e) => setForm(f => ({ ...f, descripcion: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={handleSubmit} disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem',
                color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1
              }}>
              {loading ? 'Guardando...' : editId ? 'Actualizar' : 'Crear'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM) }}
              style={{
                background: 'transparent', border: '1px solid rgba(99,179,237,0.2)',
                borderRadius: '8px', padding: '0.6rem 1.25rem',
                color: '#64748b', cursor: 'pointer', fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading && !showForm ? (
        <div style={{ color: '#64748b', textAlign: 'center', padding: '3rem' }}>Cargando productos...</div>
      ) : (
        <div style={{ background: '#0f172a', border: '1px solid rgba(99,179,237,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(99,179,237,0.1)' }}>
                {['ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Estado', 'Acciones'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1rem', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#334155' }}>
                  No hay productos. Crea el primero con el botón superior.
                </td></tr>
              ) : filtered.map((p, i) => (
                <tr key={p.id ?? i} style={{ borderBottom: '1px solid rgba(99,179,237,0.05)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#475569', fontSize: '0.8rem' }}>#{p.id}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#e2e8f0', fontWeight: 500 }}>{p.nombre}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{p.categoria || '—'}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#34d399', fontWeight: 600 }}>${parseFloat(p.precio || 0).toFixed(2)}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      color: p.stock < 5 ? '#ef4444' : p.stock < 20 ? '#f59e0b' : '#34d399',
                      fontWeight: 600
                    }}>{p.stock}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      background: p.stock > 0 ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)',
                      color: p.stock > 0 ? '#34d399' : '#ef4444',
                      borderRadius: '20px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {p.stock > 0 ? 'Disponible' : 'Sin Stock'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(p)}
                        style={{ background: 'rgba(59,130,246,0.15)', border: 'none', borderRadius: '6px', padding: '0.35rem 0.75rem', color: '#93c5fd', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif" }}>
                        Editar
                      </button>
                      <button onClick={() => setConfirmDelete(p.id)}
                        style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', padding: '0.35rem 0.75rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif" }}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '2rem', maxWidth: '360px', width: '90%', fontFamily: "'DM Sans', sans-serif" }}>
            <h3 style={{ color: '#f87171', margin: '0 0 0.75rem' }}>¿Eliminar producto?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 1.5rem' }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={async () => { await eliminarProducto(confirmDelete); setConfirmDelete(null) }}
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
