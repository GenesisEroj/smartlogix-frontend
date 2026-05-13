/**
 * App.jsx
 * Componente raíz de SmartLogix Frontend.
 * Integra Sidebar, módulos y el sistema de notificaciones (Observer).
 */

import { useState, useEffect } from 'react'
import { Sidebar } from './components/Dashboard/Sidebar'
import { DashboardHome } from './components/Dashboard/DashboardHome'
import { NotificationToast } from './components/Dashboard/NotificationToast'
import { InventarioModule } from './components/Inventario/InventarioModule'
import { PedidosModule } from './components/Pedidos/PedidosModule'
import { inventarioService, pedidosService } from './services/api'

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [dashStats, setDashStats] = useState({
    totalProductos: null,
    totalPedidos: null,
    pedidosPendientes: null,
    stockBajo: null,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productos, pedidos] = await Promise.all([
          inventarioService.getProductos(),
          pedidosService.getPedidos(),
        ])

        const totalProductos = Array.isArray(productos) ? productos.length : 0
        const totalPedidos = Array.isArray(pedidos) ? pedidos.length : 0
        const pedidosPendientes = Array.isArray(pedidos)
          ? pedidos.filter(p => p.estado === 'PENDIENTE').length
          : 0
        const stockBajo = Array.isArray(productos)
          ? productos.filter(p => p.stock < 5).length
          : 0

        setDashStats({ totalProductos, totalPedidos, pedidosPendientes, stockBajo })
      } catch (err) {
        console.error('Error cargando stats del dashboard:', err)
      }
    }

    fetchStats()
  }, [])

  const renderModule = () => {
    switch (activeModule) {
      case 'inventario': return <InventarioModule />
      case 'pedidos': return <PedidosModule />
      default: return <DashboardHome {...dashStats} />
    }
  }

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#060b18',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      <main style={{
        flex: 1, padding: '2rem 2.5rem',
        overflowY: 'auto', maxHeight: '100vh'
      }}>
        {renderModule()}
      </main>

      {/* Sistema de Notificaciones (Observer Pattern) */}
      <NotificationToast />
    </div>
  )
}