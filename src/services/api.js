import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:8083'

const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  })

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const message = error.response?.data?.message || 'Error de conexión'
      return Promise.reject(new Error(message))
    }
  )

  return client
}

export const inventarioServiceFactory = () => {
  const client = createApiClient(`${BASE_URL}/api/inventario`)

  return {
    getProductos: () => client.get(''),
    getProductoById: (id) => client.get(`/${id}`),
    createProducto: (data) => client.post('', data),
    updateProducto: (id, data) => client.put(`/${id}`, data),
    deleteProducto: (id) => client.delete(`/${id}`),
    getStockBajo: (limite) => client.get(`/stock-bajo/${limite}`)
  }
}

export const pedidosServiceFactory = () => {
  const client = createApiClient(`${BASE_URL}/api/pedidos`)

  return {
    getPedidos: () => client.get(''),
    getPedidoById: (id) => client.get(`/${id}`),
    createPedido: (data) => client.post('', data),
    updateEstado: (id, estado) => client.patch(`/${id}/estado`, { estado }),
    deletePedido: (id) => client.delete(`/${id}`),
    getPedidosByEstado: (estado) => client.get(`?estado=${estado}`)
  }
}

export const inventarioService = inventarioServiceFactory()
export const pedidosService = pedidosServiceFactory()