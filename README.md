# Control de estacionamiento

Proyecto final web individual, tema #13: control de estacionamiento. El Hito 2 cubre la base tecnica, autenticacion JWT y el primer panel web operativo del dominio.

## Stack

- Backend: Node.js, Express, Sequelize, MySQL.
- Frontend: Vite + React.
- Base de datos: MySQL local.
- Migraciones: Sequelize CLI.

## Requisitos desarrollados en Hito 2

| ID | Estado | Evidencia |
|----|--------|-----------|
| GEN-01 | desarrollado | Estructura `client/`, `server/`, README, `.gitignore` y scripts npm. |
| GEN-02 | desarrollado | `.env.example` comentado y variables documentadas. |
| GEN-03 | desarrollado | Conexion Sequelize por `DATABASE_URL` MySQL y migraciones iniciales. |
| GEN-04 | desarrollado | Registro con `POST /api/v1/auth/register`, bcryptjs y pantalla React. |
| GEN-05 | desarrollado | Login con `POST /api/v1/auth/login`, JWT, sesion local y logout. |
| GEN-06 | desarrollado | Middleware JWT protegiendo rutas de dominio. |
| rq-01 | desarrollado | Modelo y migracion de `Plaza` (`parking_spots`). |
| rq-02 | desarrollado | Modelo y migracion de `EstacionamientoActivo` (`active_parkings`). |
| rq-03 | desarrollado | CRUD de plazas en API y UI React. |
| rq-08 | desarrollado | Panel/listado principal de plazas con totales por estado. |

La matriz completa esta en [`matriz-avance-hito-2.md`](matriz-avance-hito-2.md).

## Estructura

```text
.
├── client/                 # Frontend Vite + React
├── server/                 # API Express
│   ├── config/             # Configuracion Sequelize CLI
│   ├── migrations/         # Migraciones iniciales
│   └── src/
│       ├── config/         # Conexion Sequelize
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/
├── .env.example
├── docker-compose.yml
└── matriz-avance-hito-1.md
```

## Instalacion

Requisitos:

- Node.js 20 o superior.
- npm 10 o superior.
- MySQL 8 local o Docker para levantar la base local.

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` a partir de `.env.example`.

| Variable | Servicio | Uso local | Produccion |
|----------|----------|-----------|------------|
| `DATABASE_URL` | API | URL de MySQL local. | Variable privada equivalente en produccion. |
| `MYSQL_DATABASE` | Docker | Nombre de la BD local. | No aplica si no se usa Docker. |
| `MYSQL_ROOT_PASSWORD` | Docker | Password root local en `.env`. | No subir al repositorio. |
| `JWT_SECRET` | API | Secreto largo para JWT. | Variable privada del servicio API en Railway. |
| `PORT` | API | Puerto local, por defecto `3000`. | Railway puede inyectarlo automaticamente. |
| `NODE_ENV` | API | `development`. | `production`. |
| `CORS_ORIGIN` | API | `http://localhost:5173`. | URL publica del frontend. |
| `VITE_API_URL` | Front | `http://localhost:3000/api/v1`. | URL publica de la API desplegada. |

No se debe subir `.env` al repositorio. En produccion, las variables se configuran en los paneles de Railway y del host del frontend.

## Base de datos y migraciones

Opcion rapida con Docker:

```bash
docker compose up -d db
```

Ejecutar migraciones:

```bash
npm run db:migrate
```

Revertir la ultima migracion:

```bash
npm run db:migrate:undo
```

Las migraciones iniciales crean:

- `users`: usuarios para registro y login.
- `parking_spots`: plazas del estacionamiento.
- `active_parkings`: estacionamientos activos vinculados a plazas.

## Ejecucion local

API:

```bash
npm run dev:api
```

Frontend:

```bash
npm run dev:client
```

Endpoints publicos:

- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Endpoints protegidos con `Authorization: Bearer <token>`:

- `GET /api/v1/plazas`
- `POST /api/v1/plazas`
- `GET /api/v1/plazas/:id`
- `PUT /api/v1/plazas/:id`
- `DELETE /api/v1/plazas/:id`
- `GET /api/v1/estacionamientos-activos`
- `POST /api/v1/estacionamientos-activos`

## Verificacion

```bash
npm run check
```

Este comando revisa sintaxis del backend y compila el cliente.

## Alcance pendiente para hitos siguientes

- Hito 3: CRUD completo, validaciones, Postman, restablecer contrasena, deploy API/BD/front.
