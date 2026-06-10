# Matriz de avance - Proyecto final web

**Alumno:** PaulFL808  
**Tema # / slug:** 13 / estacionamiento  
**Hito:** 2 - 40% (>=10/23)  
**Fecha:** 2026-06-09

Leyenda estado: `pendiente` | `en progreso` | `desarrollado`  
API / WEB: `si` | `no` | `parcial` | `n/a`

## Requisitos generales

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| GEN-01 | Estructura y README | si | n/a | desarrollado | `client/`, `server/`, README, `.gitignore` y scripts npm. |
| GEN-02 | Variables de entorno | si | n/a | desarrollado | `.env.example` sin secretos, `.env` local y variables documentadas. |
| GEN-03 | BD y migraciones | si | n/a | desarrollado | Sequelize con MySQL, `mysql2`, migraciones iniciales y `npm run db:migrate`. |
| GEN-04 | Registro (sign up) | si | si | desarrollado | `POST /api/v1/auth/register`, bcryptjs y pantalla de registro. |
| GEN-05 | Login JWT | si | si | desarrollado | `POST /api/v1/auth/login`, JWT, almacenamiento local y logout. |
| GEN-06 | Middleware auth | si | n/a | desarrollado | Middleware `authenticate` aplicado a rutas de dominio. |
| GEN-07 | Restablecer contrasena | no | no | pendiente | Pendiente para Hito 3. |
| GEN-08 | Errores centralizados | parcial | n/a | en progreso | Middleware central responde 400/401/404/409 con mensajes JSON. |
| GEN-09 | CRUD + vistas dominio | si | si | en progreso | CRUD de plazas y vista React; falta cubrir todos los recursos del dominio. |
| GEN-10 | Validaciones HTTP | parcial | n/a | en progreso | Validaciones de registro, login, modelos y errores Sequelize. |
| GEN-11 | Postman | no | n/a | pendiente | Pendiente para Hito 3. |
| GEN-12 | Evolucion esquema | no | n/a | pendiente | Pendiente para Hito 3. |
| GEN-13 | Deploy Railway + front | no | parcial | pendiente | Pendiente para Hito 3. |

## Requisitos del dominio

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| rq-01 | Modelar entidad principal: Plaza | si | n/a | desarrollado | Modelo `ParkingSpot` y migracion `parking_spots`. |
| rq-02 | Modelar entidad secundaria: Estacionamiento activo | si | n/a | desarrollado | Modelo `ActiveParking` y migracion `active_parkings`. |
| rq-03 | CRUD del recurso principal de gestion | si | si | desarrollado | Endpoints `GET/POST/PUT/DELETE /plazas` y formulario web. |
| rq-04 | CRUD del recurso secundario | parcial | no | en progreso | Endpoints iniciales de estacionamientos activos; falta WEB completa. |
| rq-05 | Regla de negocio principal | no | n/a | pendiente | Pendiente. |
| rq-06 | Regla de negocio complementaria | no | n/a | pendiente | Pendiente. |
| rq-07 | Consultas con filtros y busqueda | no | no | pendiente | Pendiente. |
| rq-08 | Panel o listado principal del dominio | si | si | desarrollado | Panel React con totales, estados y listado de plazas. |
| rq-09 | Flujo transaccional clave del dominio | no | no | pendiente | Pendiente. |
| rq-10 | Funcionalidad avanzada del dominio | no | n/a | pendiente | Pendiente. |

## Resumen

| Metrica | Valor |
|---------|-------|
| Total requisitos | 23 |
| Desarrollados | 10 / 23 |
| Porcentaje | 43.5 % |
| Umbral hito 1 (20%) | >= 5 |
| Umbral hito 2 (40%) | >= 10 |
| Umbral hito 3 (100%) | 23 |
| Cumple umbral de este hito? | Si |

**URLs produccion (solo hito 3):**

- API: pendiente
- Front: pendiente
- Plataforma front: pendiente
