/**
 * useNotifications.js
 * PATRÓN DE DISEÑO: Observer
 * Los componentes se suscriben a notificaciones del sistema.
 * Cuando ocurre un evento (error, éxito, stock bajo), todos los
 * suscriptores son notificados automáticamente.
 */

import { useState, useEffect, useCallback } from 'react'

// ─── EventBus: el "Subject" del patrón Observer ───────────────────────────────
const eventBus = {
  listeners: new Map(),

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event).add(callback)
    // Retorna función de unsubscribe
    return () => this.listeners.get(event)?.delete(callback)
  },

  publish(event, data) {
    this.listeners.get(event)?.forEach((cb) => cb(data))
  }
}

export { eventBus }

// ─── Hook para componentes que observan notificaciones ────────────────────────
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const unsubSuccess = eventBus.subscribe('NOTIFY_SUCCESS', (msg) => {
      const id = Date.now()
      setNotifications((prev) => [...prev, { id, type: 'success', message: msg }])
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3500)
    })

    const unsubError = eventBus.subscribe('NOTIFY_ERROR', (msg) => {
      const id = Date.now()
      setNotifications((prev) => [...prev, { id, type: 'error', message: msg }])
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 4500)
    })

    const unsubWarning = eventBus.subscribe('NOTIFY_WARNING', (msg) => {
      const id = Date.now()
      setNotifications((prev) => [...prev, { id, type: 'warning', message: msg }])
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 4000)
    })

    return () => {
      unsubSuccess()
      unsubError()
      unsubWarning()
    }
  }, [])

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return { notifications, dismiss }
}

// ─── Helpers para publicar eventos desde cualquier componente ─────────────────
export const notify = {
  success: (msg) => eventBus.publish('NOTIFY_SUCCESS', msg),
  error: (msg) => eventBus.publish('NOTIFY_ERROR', msg),
  warning: (msg) => eventBus.publish('NOTIFY_WARNING', msg)
}
