# Control de estacionamiento

Proyecto final web individual, tema #13: control de estacionamiento. La entrega final cubre autenticacion, recuperacion de contrasena, CRUD de plazas, entradas/salidas, reglas de negocio, reportes, Postman y preparacion de despliegue.

## Stack

- Backend: Node.js, Express, Sequelize, MySQL.
- Frontend: Vite + React.
- Base de datos: MySQL local o servicio compatible con MySQL en produccion.
- Migraciones: Sequelize CLI.

## Requisitos desarrollados

La matriz final esta en [`matriz-avance-hito-3.md`](matriz-avance-hito-3.md).

Resumen:

- GEN-01 a GEN-13: desarrollados o preparados para despliegue.
- rq-01 a rq-10: desarrollados.
- Total: 23/23 requisitos.

## Instalacion

Requisitos:

- Node.js 20 o superior.
- npm 10 o superior.
- MySQL 8 local.

Instalar dependencias:

```bash
npm install
```

Crear `.env` desde `.env.example` y configurar `DATABASE_URL`.

Ejemplo local:

```env
DATABASE_URL=mysql://root:TU_PASSWORD@localhost:3306/estacionamiento
JWT_SECRET=cambiar_por_un_secreto_largo_y_aleatorio
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
VITE_API_URL=http://localhost:3000/api/v1
```

No subir `.env` al repositorio.

## Base de datos

Crear la base local si no existe:

```sql
CREATE DATABASE estacionamiento CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Ejecutar migraciones:

```bash
npm run db:migrate
```

Las migraciones crean:

- `users`
- `parking_spots`
- `active_parkings`
- `password_reset_tokens`

Tambien agregan campos de cierre:

- `check_out_at`
- `duration_minutes`
- `total_amount`

## Ejecucion local

API:

```bash
npm run dev:api
```

Frontend:

```bash
npm run dev:client
```

URLs:

- API: `http://localhost:3000/api/v1`
- Frontend: `http://localhost:5173`

Health check:

```text
GET http://localhost:3000/api/v1/health
```

## Funcionalidades web

El frontend React incluye:

- Registro.
- Login.
- Logout.
- Recuperacion de contrasena con token de desarrollo.
- Panel principal con metricas.
- CRUD de plazas.
- Registro de entrada con patente.
- Edicion/cancelacion de registros activos.
- Registro de salida con calculo de tarifa.
- Filtros por busqueda, sector y estado.
- Reporte de ocupacion por zona.
- Mensajes visibles para errores 400, 401, 404, 409 y 422.

## Rutas API

Rutas publicas:

```text
GET  /api/v1/health
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/password-reset/request
POST /api/v1/auth/password-reset/confirm
```

Rutas protegidas con `Authorization: Bearer <token>`:

```text
GET    /api/v1/plazas
POST   /api/v1/plazas
GET    /api/v1/plazas/:id
PUT    /api/v1/plazas/:id
DELETE /api/v1/plazas/:id

GET    /api/v1/estacionamientos-activos
POST   /api/v1/estacionamientos-activos
GET    /api/v1/estacionamientos-activos/:id
PUT    /api/v1/estacionamientos-activos/:id
PATCH  /api/v1/estacionamientos-activos/:id/salida
PATCH  /api/v1/estacionamientos-activos/:id/cancelar
DELETE /api/v1/estacionamientos-activos/:id

GET    /api/v1/reportes/ocupacion-zona
```

## Reglas de negocio

- Una plaza no puede tener dos vehiculos activos.
- Una patente no puede tener dos estacionamientos activos.
- No se puede registrar entrada en una plaza en mantencion o reservada.
- Al registrar entrada, la plaza pasa a `occupied`.
- Al registrar salida, la plaza vuelve a `available`.
- La tarifa se calcula por hora o fraccion, con minimo de una hora.
- No se elimina una plaza con registros relacionados sin eliminar/cancelar antes esos registros.

## Recuperacion de contrasena

Flujo:

1. El usuario solicita recuperacion con su email.
2. La API genera un token con expiracion de 30 minutos.
3. En modo desarrollo, el token se devuelve en la respuesta para poder probar sin correo real.
4. El usuario ingresa token y nueva contrasena.
5. La API marca el token como usado y actualiza el hash de contrasena.

No se envia ni guarda la contrasena en texto plano.

## Postman

Coleccion:

```text
postman/estacionamiento-hito-3.postman_collection.json
```

Incluye:

- Registro.
- Login.
- Recuperacion de contrasena.
- CRUD plazas.
- Entrada/salida de vehiculo.
- Reporte por zona.
- Casos 401 y 409/422.

## Verificacion

```bash
npm run check
```

Tambien se valido un flujo local contra MySQL:

- Registro.
- Recuperacion de contrasena.
- Login.
- Crear plaza.
- Registrar entrada.
- Rechazar doble ocupacion con 409.
- Registrar salida con monto.
- Consultar reporte por zona.

## Despliegue

Guia en [`DEPLOY.md`](DEPLOY.md).

El repositorio incluye `railway.json` para ejecutar la API en Railway con:

```bash
npm run start:api
```

URLs de produccion:

- API: pendiente de configurar en Railway.
- Front: pendiente de configurar en Vercel/Netlify/Railway.

Estas URLs requieren acceso a las cuentas de hosting del alumno para completar GEN-13 en ambiente publico.

## Evolucion de esquema

Detalle en [`CHANGELOG.md`](CHANGELOG.md).
