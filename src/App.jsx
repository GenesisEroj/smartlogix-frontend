/**
 * App.jsx
 * Componente raíz de SmartLogix Frontend.
 * Integra Sidebar, módulos y el sistema de notificaciones (Observer).
 */

import { useState } from 'react'
import { Sidebar } from './components/Dashboard/Sidebar'
import { DashboardHome } from './components/Dashboard/DashboardHome'
import { NotificationToast } from './components/Dashboard/NotificationToast'
import { InventarioModule } from './components/Inventario/InventarioModule'
import { PedidosModule } from './components/Pedidos/PedidosModule'

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard')

  // Datos de resumen para el dashboard
  // En producción vendrían de hooks o contexto global
  const dashStats = {
    totalProductos: null,
    totalPedidos: null,
    pedidosPendientes: null,
    stockBajo: null,
  }

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
