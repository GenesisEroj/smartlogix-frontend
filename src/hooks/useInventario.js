/**
 * useInventario.js
 * PATRÓN DE DISEÑO: Repository Pattern
 * Abstrae el acceso a datos del módulo de inventario.
 * Los componentes no saben si los datos vienen de la API, caché o mock.
 */

import { useState, useCallback } from 'react'
import { inventarioService } from '../services/api'
import { notify } from './useNotifications'

export const useInventario = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProductos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await inventarioService.getProductos()
      setProductos(Array.isArray(data) ? data : data?.content ?? [])
    } catch (err) {
      setError(err.message)
      notify.error('Error al cargar productos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const crearProducto = useCallback(async (productoData) => {
    setLoading(true)
    try {
      const nuevo = await inventarioService.createProducto(productoData)
      setProductos((prev) => [...prev, nuevo])
      notify.success('Producto creado exitosamente')
      return nuevo
    } catch (err) {
      notify.error('Error al crear producto: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const actualizarProducto = useCallback(async (id, productoData) => {
    setLoading(true)
    try {
      const actualizado = await inventarioService.updateProducto(id, productoData)
      setProductos((prev) => prev.map((p) => (p.id === id ? actualizado : p)))
      notify.success('Producto actualizado')
      return actualizado
    } catch (err) {
      notify.error('Error al actualizar: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const eliminarProducto = useCallback(async (id) => {
    setLoading(true)
    try {
      await inventarioService.deleteProducto(id)
      setProductos((prev) => prev.filter((p) => p.id !== id))
      notify.success('Producto eliminado')
    } catch (err) {
      notify.error('Error al eliminar: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    productos,
    loading,
    error,
    fetchProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  }
}
