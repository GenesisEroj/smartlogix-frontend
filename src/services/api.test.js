/**
 * api.test.js
 * Pruebas unitarias del servicio API (Factory Method Pattern)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { inventarioServiceFactory, pedidosServiceFactory } from '../services/api'

// Mock de axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      }
    }))
  }
}))

describe('Factory Method - inventarioServiceFactory', () => {
  it('debe crear un servicio con los métodos requeridos', () => {
    const service = inventarioServiceFactory()
    expect(service).toHaveProperty('getProductos')
    expect(service).toHaveProperty('createProducto')
    expect(service).toHaveProperty('updateProducto')
    expect(service).toHaveProperty('deleteProducto')
    expect(service).toHaveProperty('getProductoById')
  })

  it('todos los métodos deben ser funciones', () => {
    const service = inventarioServiceFactory()
    Object.values(service).forEach((method) => {
      expect(typeof method).toBe('function')
    })
  })

  it('debe crear instancias independientes (Factory)', () => {
    const s1 = inventarioServiceFactory()
    const s2 = inventarioServiceFactory()
    expect(s1).not.toBe(s2)
  })
})

describe('Factory Method - pedidosServiceFactory', () => {
  it('debe crear un servicio con los métodos requeridos', () => {
    const service = pedidosServiceFactory()
    expect(service).toHaveProperty('getPedidos')
    expect(service).toHaveProperty('createPedido')
    expect(service).toHaveProperty('updateEstado')
    expect(service).toHaveProperty('deletePedido')
    expect(service).toHaveProperty('getPedidoById')
  })

  it('todos los métodos deben ser funciones', () => {
    const service = pedidosServiceFactory()
    Object.values(service).forEach((method) => {
      expect(typeof method).toBe('function')
    })
  })
})
