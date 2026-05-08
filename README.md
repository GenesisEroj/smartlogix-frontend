# SmartLogix - Frontend

## Descripción
Componente frontend de SmartLogix desarrollado con React. Proporciona la
interfaz de usuario para la gestión de pedidos e inventario, comunicándose
con el Backend For Frontend (BFF).

## Tecnologías
- React 18
- JavaScript
- React Router DOM
- Axios
- NPM

## Patrones de Diseño Implementados
- **Observer Pattern**: Manejo de estado con useState y useEffect
- **Component Pattern**: Componentes reutilizables y modulares
- **Service Layer**: Separación de lógica de comunicación con la API

## Estructura del Proyecto
src/
├── componentes/
│   ├── ListaPedidos.js
│   ├── ListaProductos.js
│   └── FormularioPedido.js
├── services/
│   └── api.js
├── pages/
├── context/
├── App.js
└── index.js

## Requisitos
- Node.js 18+
- NPM 9+
- BFF corriendo en puerto 8080

## Instalación y Ejecución
```bash
# Clonar el repositorio
git clone https://github.com/GenesisEroj/smartlogix-frontend

# Entrar al directorio
cd smartlogix-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| npm start | Inicia el servidor de desarrollo |
| npm run build | Genera build de producción |
| npm test | Ejecuta las pruebas |

## Vistas disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| / | ListaPedidos | Lista de todos los pedidos |
| /productos | ListaProductos | Inventario de productos |
| /nuevo-pedido | FormularioPedido | Crear nuevo pedido |

## Equipo
- Genesis Eroj
- Francisco Monsalve

**DSY1106 - Desarrollo Fullstack III**