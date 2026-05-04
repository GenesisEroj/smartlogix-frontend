import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/api';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProductos()
            .then(response => {
                setProductos(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar productos');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Inventario de Productos</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.productoId}>
                            <td>{producto.productoId}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.stock}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaProductos;