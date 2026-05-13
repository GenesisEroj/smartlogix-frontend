# SmartLogix Frontend

Frontend de la plataforma **SmartLogix** — Sistema de Gestión Logística para eCommerce.  
Construido con **React 18 + Vite 5**, consume una arquitectura de microservicios a través de un BFF (Backend For Frontend).

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    SmartLogix Frontend                      │
│                  React + Vite  :3000                        │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP REST
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              BFF (Backend For Frontend)                     │
│                 Spring Boot  :8084                          │
└─────────────┬───────────────────────────┬───────────────────┘
              │                           │
              ▼                           ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│  ms-inventario      │     │  ms-pedidos                 │
│  Spring Boot        │     │  Spring Boot                │
└─────────────────────┘     └─────────────────────────────┘
```

---

## Patrones de Diseño Implementados

| Patrón | Ubicación | Descripción |
|---|---|---|
| **Factory Method** | `src/services/api.js` | `inventarioServiceFactory()` y `pedidosServiceFactory()` crean instancias de clientes HTTP Axios configuradas de forma independiente |
| **Observer** | `src/hooks/useNotifications.js` | `EventBus` permite que cualquier componente emita y escuche eventos de notificación sin acoplamiento directo |
| **Repository** | `src/hooks/useInventario.js` / `usePedidos.js` | Abstrae el acceso a datos; los componentes consumen hooks sin conocer la fuente (API, caché o mock) |

---

## Requisitos Previos

- Node.js >= 18
- npm >= 9
- BFF corriendo en `http://localhost:8084`
- `smartlogix-ms-inventario` corriendo (consumido por el BFF)
- `smartlogix-ms-pedidos` corriendo (consumido por el BFF)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GenesisEroj/smartlogix-frontend.git
cd smartlogix-frontend

# Instalar dependencias
npm install
```

---

## Configuración

Crear el archivo `.env` en la raíz del proyecto:

```env
VITE_BFF_URL=http://localhost:8084
```

> ⚠️ Si el BFF corre en un puerto distinto, actualiza este valor. El BFF por defecto escucha en el puerto **8084**.

---

## Ejecución en Desarrollo

```bash
npm run dev
```

Acceder en: [http://localhost:3000](http://localhost:3000)

---

## Build para Producción

```bash
npm run build
npm run preview   # para previsualizar el build localmente
```

---

## Pruebas Unitarias

```bash
# Ejecutar todos los tests
npm test

# Ejecutar con reporte de cobertura
npm run test:coverage
```

La cobertura mínima requerida es **60%** sobre líneas (configurada en `vite.config.js`).

Archivos de test disponibles:

| Archivo | Patrón cubierto |
|---|---|
| `src/hooks/useInventario.test.js` | Repository Pattern — inventario |
| `src/hooks/useNotifications.test.js` | Observer Pattern — notificaciones |

---

## Estructura del Proyecto

```
smartlogix-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Sidebar.jsx              # Navegación lateral
│   │   │   ├── DashboardHome.jsx        # Vista principal con métricas
│   │   │   └── NotificationToast.jsx    # Sistema de toasts (Observer)
│   │   ├── Inventario/
│   │   │   └── InventarioModule.jsx     # CRUD de productos
│   │   └── Pedidos/
│   │       └── PedidosModule.jsx        # CRUD de pedidos con gestión de estados
│   ├── hooks/
│   │   ├── useInventario.js             # Repository Pattern — inventario
│   │   ├── useInventario.test.js        # Tests del hook de inventario
│   │   ├── usePedidos.js                # Repository Pattern — pedidos
│   │   ├── useNotifications.js          # Observer Pattern — EventBus
│   │   └── useNotifications.test.js     # Tests del EventBus
│   ├── services/
│   │   └── api.js                       # Factory Method — clientes HTTP Axios
│   ├── App.jsx                          # Componente raíz con enrutamiento de módulos
│   ├── index.jsx                        # Entry point de React
│   └── setupTests.js                    # Configuración de Vitest
├── .env                                 # Variables de entorno (no versionado)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Endpoints del BFF Esperados

### Inventario — `GET /api/inventario`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/inventario` | Listar todos los productos |
| `GET` | `/api/inventario/{id}` | Obtener producto por ID |
| `POST` | `/api/inventario` | Crear producto |
| `PUT` | `/api/inventario/{id}` | Actualizar producto |
| `DELETE` | `/api/inventario/{id}` | Eliminar producto |
| `GET` | `/api/inventario/stock-bajo/{limite}` | Productos con stock bajo el límite indicado |

### Pedidos — `GET /api/pedidos`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/pedidos` | Listar todos los pedidos |
| `GET` | `/api/pedidos/{id}` | Obtener pedido por ID |
| `POST` | `/api/pedidos` | Crear nuevo pedido |
| `PATCH` | `/api/pedidos/{id}/estado` | Cambiar estado del pedido |
| `DELETE` | `/api/pedidos/{id}` | Eliminar pedido |
| `GET` | `/api/pedidos?estado={estado}` | Filtrar pedidos por estado |

---

## Estrategia de Branching

Este proyecto utiliza **GitHub Flow**:

```
main        → rama principal (producción)
develop     → integración de features
feature/*   → desarrollo de funcionalidades individuales
```

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.x | UI y gestión de estado local |
| Vite | 5.x | Bundler y servidor de desarrollo |
| Axios | 1.x | Comunicación HTTP con el BFF |
| React Router DOM | 6.x | Enrutamiento del lado del cliente |
| Vitest | 1.x | Framework de pruebas unitarias |
| Testing Library | 14.x | Utilidades de testing para React |

---

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en puerto 3000 |
| `npm run build` | Genera el bundle de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm test` | Ejecuta los tests con Vitest |
| `npm run test:coverage` | Ejecuta tests con reporte de cobertura HTML |
