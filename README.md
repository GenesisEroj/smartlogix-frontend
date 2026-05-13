# SmartLogix Frontend

Frontend de la plataforma **SmartLogix** — Gestión Logística para eCommerce.
Construido con **React + Vite**, empaquetado como módulo NPM.

## Patrones de Diseño Implementados

| Patrón | Ubicación | Descripción |
|---|---|---|
| **Factory Method** | `src/services/api.js` | `inventarioServiceFactory()` y `pedidosServiceFactory()` crean clientes HTTP configurados independientemente |
| **Observer** | `src/hooks/useNotifications.js` | `EventBus` permite que componentes se suscriban a notificaciones del sistema sin acoplamiento directo |
| **Repository** | `src/hooks/useInventario.js` / `usePedidos.js` | Abstrae el acceso a datos; los componentes no conocen la fuente (API, caché, mock) |

## Requisitos

- Node.js >= 18
- npm >= 9
- Backend BFF corriendo en `http://localhost:8080`

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GenesisEroj/smartlogix-frontend.git
cd smartlogix-frontend

# Instalar dependencias
npm install
```

## Configuración

Editar el archivo `.env` con la URL del BFF:

```env
VITE_BFF_URL=http://localhost:8080
```

> ⚠️ Si el BFF corre en otro puerto, actualiza este valor.

## Ejecución en Desarrollo

```bash
npm run dev
```

Acceder en: [http://localhost:3000](http://localhost:3000)

## Build para Producción

```bash
npm run build
npm run preview   # para previsualizar el build
```

## Pruebas Unitarias

```bash
# Ejecutar tests
npm test

# Ejecutar con cobertura
npm run test:coverage
```

La cobertura mínima requerida es **60%** (configurada en `vite.config.js`).

## Estructura del Proyecto

```
smartlogix-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Sidebar.jsx           # Navegación lateral
│   │   │   ├── DashboardHome.jsx     # Vista principal con métricas
│   │   │   └── NotificationToast.jsx # Toasts (Observer)
│   │   ├── Inventario/
│   │   │   └── InventarioModule.jsx  # CRUD de productos
│   │   └── Pedidos/
│   │       └── PedidosModule.jsx     # CRUD de pedidos con estados
│   ├── hooks/
│   │   ├── useInventario.js          # Repository Pattern - inventario
│   │   ├── usePedidos.js             # Repository Pattern - pedidos
│   │   └── useNotifications.js       # Observer Pattern - notificaciones
│   ├── services/
│   │   └── api.js                    # Factory Method - clientes HTTP
│   ├── App.jsx                       # Componente raíz
│   └── index.jsx                     # Entry point
├── .env                              # Variables de entorno
├── index.html
├── package.json
└── vite.config.js
```

## Endpoints del BFF Esperados

### Inventario
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/inventario/productos` | Listar todos los productos |
| GET | `/api/inventario/productos/:id` | Obtener producto por ID |
| POST | `/api/inventario/productos` | Crear producto |
| PUT | `/api/inventario/productos/:id` | Actualizar producto |
| DELETE | `/api/inventario/productos/:id` | Eliminar producto |

### Pedidos
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/pedidos/` | Listar todos los pedidos |
| GET | `/api/pedidos/:id` | Obtener pedido por ID |
| POST | `/api/pedidos/` | Crear pedido |
| PATCH | `/api/pedidos/:id/estado` | Cambiar estado del pedido |
| DELETE | `/api/pedidos/:id` | Eliminar pedido |

## Estrategia de Branching

Este proyecto utiliza **GitHub Flow**:

```
main          → rama principal, siempre desplegable
feature/*     → ramas de funcionalidad creadas desde main, integradas vía Pull Request
```

## Tecnologías

- React 18
- Vite 5
- Axios (comunicación con BFF via REST)
- Vitest + Testing Library (pruebas unitarias)
