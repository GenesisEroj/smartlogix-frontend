/**
 * NotificationToast.jsx
 * Componente que se suscribe al Observer de notificaciones
 * y muestra los mensajes en pantalla.
 */

import { useNotifications } from '../../hooks/useNotifications'

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠'
}

export const NotificationToast = () => {
  const { notifications, dismiss } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div style={{
      position: 'fixed', top: '1.5rem', right: '1.5rem',
      zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.75rem'
    }}>
      {notifications.map((n) => (
        <div
          key={n.id}
          onClick={() => dismiss(n.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.875rem 1.25rem',
            background: n.type === 'success' ? '#0d9e6e' : n.type === 'error' ? '#e53e3e' : '#d97706',
            color: '#fff', borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            cursor: 'pointer', minWidth: '280px', maxWidth: '380px',
            animation: 'slideIn 0.3s ease',
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem'
          }}
        >
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{icons[n.type]}</span>
          <span>{n.message}</span>
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  )
}
