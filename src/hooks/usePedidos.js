/**
 * usePedidos.js
 * PATRÓN DE DISEÑO: Repository Pattern
 * Abstrae el acceso a datos del módulo de pedidos.
 */

import { useState, useCallback } from 'react'
import { pedidosService } from '../services/api'
import { notify } from './useNotifications'

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPedidos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await pedidosService.getPedidos()
      setPedidos(Array.isArray(data) ? data : data?.content ?? [])
    } catch (err) {
      setError(err.message)
      notify.error('Error al cargar pedidos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const crearPedido = useCallback(async (pedidoData) => {
    setLoading(true)
    try {
      const nuevo = await pedidosService.createPedido(pedidoData)
      setPedidos((prev) => [...prev, nuevo])
      notify.success('Pedido creado exitosamente')
      return nuevo
    } catch (err) {
      notify.error('Error al crear pedido: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const cambiarEstado = useCallback(async (id, estado) => {
    setLoading(true)
    try {
      const actualizado = await pedidosService.updateEstado(id, estado)
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))
      notify.success(`Pedido ${id} → ${estado}`)
      return actualizado
    } catch (err) {
      notify.error('Error al cambiar estado: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const eliminarPedido = useCallback(async (id) => {
    setLoading(true)
    try {
      await pedidosService.deletePedido(id)
      setPedidos((prev) => prev.filter((p) => p.id !== id))
      notify.success('Pedido eliminado')
    } catch (err) {
      notify.error('Error al eliminar pedido: ' + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    pedidos,
    loading,
    error,
    fetchPedidos,
    crearPedido,
    cambiarEstado,
    eliminarPedido
  }
}
