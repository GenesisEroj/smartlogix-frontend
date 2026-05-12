/**
 * useNotifications.test.js
 * Pruebas unitarias del patrón Observer (EventBus + useNotifications)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { eventBus, notify } from '../hooks/useNotifications'

describe('Observer Pattern - EventBus', () => {
  beforeEach(() => {
    // Limpiar listeners entre tests
    eventBus.listeners.clear()
  })

  it('debe permitir suscribirse a un evento', () => {
    const cb = vi.fn()
    eventBus.subscribe('TEST_EVENT', cb)
    expect(eventBus.listeners.has('TEST_EVENT')).toBe(true)
  })

  it('debe notificar a los suscriptores cuando se publica un evento', () => {
    const cb = vi.fn()
    eventBus.subscribe('TEST_EVENT', cb)
    eventBus.publish('TEST_EVENT', 'mensaje de prueba')
    expect(cb).toHaveBeenCalledWith('mensaje de prueba')
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('debe notificar a múltiples suscriptores del mismo evento', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    eventBus.subscribe('TEST_EVENT', cb1)
    eventBus.subscribe('TEST_EVENT', cb2)
    eventBus.publish('TEST_EVENT', 'dato')
    expect(cb1).toHaveBeenCalledWith('dato')
    expect(cb2).toHaveBeenCalledWith('dato')
  })

  it('debe permitir desuscribirse (unsubscribe)', () => {
    const cb = vi.fn()
    const unsubscribe = eventBus.subscribe('TEST_EVENT', cb)
    unsubscribe()
    eventBus.publish('TEST_EVENT', 'datos')
    expect(cb).not.toHaveBeenCalled()
  })

  it('no debe llamar a suscriptores de otros eventos', () => {
    const cbA = vi.fn()
    const cbB = vi.fn()
    eventBus.subscribe('EVENTO_A', cbA)
    eventBus.subscribe('EVENTO_B', cbB)
    eventBus.publish('EVENTO_A', 'solo A')
    expect(cbA).toHaveBeenCalled()
    expect(cbB).not.toHaveBeenCalled()
  })
})

describe('Observer Pattern - notify helpers', () => {
  beforeEach(() => { eventBus.listeners.clear() })

  it('notify.success debe publicar NOTIFY_SUCCESS', () => {
    const cb = vi.fn()
    eventBus.subscribe('NOTIFY_SUCCESS', cb)
    notify.success('Operación exitosa')
    expect(cb).toHaveBeenCalledWith('Operación exitosa')
  })

  it('notify.error debe publicar NOTIFY_ERROR', () => {
    const cb = vi.fn()
    eventBus.subscribe('NOTIFY_ERROR', cb)
    notify.error('Algo falló')
    expect(cb).toHaveBeenCalledWith('Algo falló')
  })

  it('notify.warning debe publicar NOTIFY_WARNING', () => {
    const cb = vi.fn()
    eventBus.subscribe('NOTIFY_WARNING', cb)
    notify.warning('Stock bajo')
    expect(cb).toHaveBeenCalledWith('Stock bajo')
  })
})
