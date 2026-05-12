/**
 * useInventario.test.js
 * Pruebas unitarias del Repository Pattern (useInventario)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInventario } from '../hooks/useInventario'

// Mock del servicio API
vi.mock('../services/api', () => ({
  inventarioService: {
    getProductos: vi.fn(),
    createProducto: vi.fn(),
    updateProducto: vi.fn(),
    deleteProducto: vi.fn()
  }
}))

// Mock del sistema de notificaciones
vi.mock('../hooks/useNotifications', () => ({
  notify: { success: vi.fn(), error: vi.fn(), warning: vi.fn() }
}))

import { inventarioService } from '../services/api'

const mockProductos = [
  { id: 1, nombre: 'Camiseta', precio: 15000, stock: 100, categoria: 'Ropa' },
  { id: 2, nombre: 'Pantalón', precio: 25000, stock: 4, categoria: 'Ropa' },
]

describe('Repository Pattern - useInventario', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('debe inicializar con estado vacío', () => {
    const { result } = renderHook(() => useInventario())
    expect(result.current.productos).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('debe cargar productos desde el repositorio', async () => {
    inventarioService.getProductos.mockResolvedValue(mockProductos)
    const { result } = renderHook(() => useInventario())
    await act(async () => { await result.current.fetchProductos() })
    expect(result.current.productos).toEqual(mockProductos)
    expect(result.current.loading).toBe(false)
  })

  it('debe manejar error al cargar productos', async () => {
    inventarioService.getProductos.mockRejectedValue(new Error('Conexión rechazada'))
    const { result } = renderHook(() => useInventario())
    await act(async () => { await result.current.fetchProductos() })
    expect(result.current.error).toBe('Conexión rechazada')
    expect(result.current.productos).toEqual([])
  })

  it('debe agregar un nuevo producto al crear', async () => {
    const nuevo = { id: 3, nombre: 'Zapatos', precio: 40000, stock: 50, categoria: 'Calzado' }
    inventarioService.createProducto.mockResolvedValue(nuevo)
    const { result } = renderHook(() => useInventario())
    await act(async () => { await result.current.crearProducto({ nombre: 'Zapatos', precio: 40000, stock: 50 }) })
    expect(result.current.productos).toContainEqual(nuevo)
  })

  it('debe actualizar un producto existente', async () => {
    inventarioService.getProductos.mockResolvedValue(mockProductos)
    const actualizado = { ...mockProductos[0], stock: 200 }
    inventarioService.updateProducto.mockResolvedValue(actualizado)
    const { result } = renderHook(() => useInventario())
    await act(async () => { await result.current.fetchProductos() })
    await act(async () => { await result.current.actualizarProducto(1, { stock: 200 }) })
    const found = result.current.productos.find(p => p.id === 1)
    expect(found.stock).toBe(200)
  })

  it('debe eliminar un producto por id', async () => {
    inventarioService.getProductos.mockResolvedValue(mockProductos)
    inventarioService.deleteProducto.mockResolvedValue({})
    const { result } = renderHook(() => useInventario())
    await act(async () => { await result.current.fetchProductos() })
    await act(async () => { await result.current.eliminarProducto(1) })
    expect(result.current.productos.find(p => p.id === 1)).toBeUndefined()
  })
})
