import React, { useState, useEffect } from 'react';
import { getPedidos } from '../services/api';

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPedidos()
            .then(response => {
                setPedidos(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar pedidos');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando pedidos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Lista de Pedidos</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.clienteId}</td>
                            <td>{pedido.productoId}</td>
                            <td>{pedido.cantidad}</td>
                            <td>{pedido.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPedidos;