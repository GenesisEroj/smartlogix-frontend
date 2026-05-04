import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaPedidos from './componentes/ListaPedidos';
import ListaProductos from './componentes/ListaProductos';
import FormularioPedido from './componentes/FormularioPedido';

function App() {
    return (
        <Router>
            <div>
                <nav style={{ background: '#0D1B2A', padding: '10px' }}>
                    <h1 style={{ color: '#0891B2', display: 'inline' }}>SmartLogix</h1>
                    <ul style={{ listStyle: 'none', display: 'inline', marginLeft: '20px' }}>
                        <li style={{ display: 'inline', marginRight: '15px' }}>
                            <Link to="/" style={{ color: 'white' }}>Pedidos</Link>
                        </li>
                        <li style={{ display: 'inline', marginRight: '15px' }}>
                            <Link to="/productos" style={{ color: 'white' }}>Inventario</Link>
                        </li>
                        <li style={{ display: 'inline' }}>
                            <Link to="/nuevo-pedido" style={{ color: 'white' }}>Nuevo Pedido</Link>
                        </li>
                    </ul>
                </nav>
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<ListaPedidos />} />
                        <Route path="/productos" element={<ListaProductos />} />
                        <Route path="/nuevo-pedido" element={<FormularioPedido />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;