import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/bff';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getPedidos = () => api.get('/pedidos');
export const getPedidoById = (id) => api.get(`/pedidos/${id}`);
export const createPedido = (pedido) => api.post('/pedidos', pedido);
export const getProductos = () => api.get('/productos');
export const getProductoById = (id) => api.get(`/productos/${id}`);

export default api;