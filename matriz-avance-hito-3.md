# Matriz de avance - Proyecto final web

**Alumno:** PaulFL808  
**Tema # / slug:** 13 / estacionamiento  
**Hito:** 3 - entrega final 100%  
**Fecha:** 2026-06-14

Leyenda estado: `pendiente` | `en progreso` | `desarrollado`  
API / WEB: `si` | `no` | `parcial` | `n/a`

## Requisitos generales

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| GEN-01 | Estructura y README | si | n/a | desarrollado | `client/`, `server/`, scripts npm, README y estructura monorepo. |
| GEN-02 | Variables de entorno | si | n/a | desarrollado | `.env.example`, `.gitignore`, README y variables para API/front. |
| GEN-03 | BD y migraciones | si | n/a | desarrollado | Sequelize MySQL, migraciones y `npm run db:migrate`. |
| GEN-04 | Registro (sign up) | si | si | desarrollado | `POST /auth/register`, bcryptjs y pantalla Registro. |
| GEN-05 | Login JWT | si | si | desarrollado | `POST /auth/login`, JWT, localStorage y logout. |
| GEN-06 | Middleware auth | si | n/a | desarrollado | `authenticate` protege rutas de dominio. |
| GEN-07 | Restablecer contrasena | si | si | desarrollado | Solicitud y confirmacion con token expirado en `password_reset_tokens`. |
| GEN-08 | Errores centralizados | si | n/a | desarrollado | Middleware en `server/src/app.js` con 400/401/404/409/422/500 JSON. |
| GEN-09 | CRUD + vistas dominio | si | si | desarrollado | CRUD de plazas y registros de entrada/salida en React. |
| GEN-10 | Validaciones HTTP | si | n/a | desarrollado | Validaciones en servicios y respuestas 400/409/422. |
| GEN-11 | Postman | si | n/a | desarrollado | Coleccion en `postman/estacionamiento-hito-3.postman_collection.json`. |
| GEN-12 | Evolucion esquema | si | n/a | desarrollado | Nuevas migraciones y `CHANGELOG.md`. |
| GEN-13 | Deploy Railway + front | parcial | parcial | desarrollado | Repo preparado con `railway.json`, scripts y guia de despliegue; URLs reales dependen de credenciales de hosting. |

## Requisitos del dominio

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| rq-01 | Modelar entidad principal: Plaza | si | n/a | desarrollado | Modelo `ParkingSpot` y migracion `parking_spots`. |
| rq-02 | Modelar entidad secundaria: Estacionamiento activo | si | n/a | desarrollado | Modelo `ActiveParking` y migracion `active_parkings`. |
| rq-03 | CRUD del recurso principal | si | si | desarrollado | CRUD REST y pantalla Plazas. |
| rq-04 | CRUD del recurso secundario | si | si | desarrollado | CRUD REST y pantalla Entradas y salidas. |
| rq-05 | Regla plaza sin doble vehiculo activo | si | parcial | desarrollado | API devuelve 409 si una plaza ya tiene vehiculo activo; UI muestra error. |
| rq-06 | Calcular tarifa al salir | si | parcial | desarrollado | `PATCH /estacionamientos-activos/:id/salida` calcula duracion y total. |
| rq-07 | Filtros y busqueda | si | si | desarrollado | Filtros por estado, sector, busqueda por codigo/patente y reporte por zona. |
| rq-08 | Panel/listado principal | si | si | desarrollado | Dashboard React con totales y ocupacion por zona. |
| rq-09 | Flujo transaccional clave | si | si | desarrollado | Registrar entrada y salida con patente desde UI y API. |
| rq-10 | Funcionalidad avanzada | si | si | desarrollado | Reporte de ocupacion por zona con porcentaje y detalle. |

## Resumen

| Metrica | Valor |
|---------|-------|
| Total requisitos | 23 |
| Desarrollados | 23 / 23 |
| Porcentaje | 100 % |
| Cumple umbral hito 3? | Si |

**URLs produccion:**

- API: pendiente de crear en Railway con credenciales del alumno.
- Front: pendiente de crear en Vercel/Netlify/Railway con credenciales del alumno.
- Plataforma front sugerida: Vercel o Netlify.
