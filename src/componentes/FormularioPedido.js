import React, { useState } from 'react';
import { createPedido } from '../services/api';

const FormularioPedido = () => {
    const [pedido, setPedido] = useState({
        clienteId: '',
        productoId: '',
        cantidad: ''
    });
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setPedido({
            ...pedido,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPedido(pedido)
            .then(response => {
                setMensaje('Pedido creado exitosamente!');
                setError(null);
                setPedido({ clienteId: '', productoId: '', cantidad: '' });
            })
            .catch(err => {
                setError('Error al crear el pedido');
                setMensaje(null);
            });
    };

    return (
        <div>
            <h2>Crear Nuevo Pedido</h2>
            {mensaje && <p style={{color: 'green'}}>{mensaje}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cliente ID: </label>
                    <input
                        type="text"
                        name="clienteId"
                        value={pedido.clienteId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Producto ID: </label>
                    <input
                        type="text"
                        name="productoId"
                        value={pedido.productoId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cantidad: </label>
                    <input
                        type="number"
                        name="cantidad"
                        value={pedido.cantidad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear Pedido</button>
            </form>
        </div>
    );
};

export default FormularioPedido;