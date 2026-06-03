# Matriz de avance - Proyecto final web

**Alumno:** PaulFL808  
**Tema # / slug:** 13 / estacionamiento  
**Hito:** 1 - 20% (>=5/23)  
**Fecha:** 2026-06-02

Leyenda estado: `pendiente` | `en progreso` | `desarrollado`  
API / WEB: `si` | `no` | `parcial` | `n/a`

## Requisitos generales

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| GEN-01 | Estructura y README | si | n/a | desarrollado | `README.md`, `.gitignore`, estructura `client/` + `server/`. |
| GEN-02 | Variables de entorno | si | n/a | desarrollado | `.env.example` comentado y tabla de variables en README. |
| GEN-03 | BD y migraciones | si | n/a | desarrollado | `server/config/database.js`, `server/migrations/`, script `npm run db:migrate`. |
| GEN-04 | Registro (sign up) | no | no | pendiente | Pendiente para Hito 2. |
| GEN-05 | Login JWT | no | no | pendiente | Pendiente para Hito 2. |
| GEN-06 | Middleware auth | no | n/a | pendiente | Pendiente para Hito 2. |
| GEN-07 | Restablecer contrasena | no | no | pendiente | Pendiente para Hito 3. |
| GEN-08 | Errores centralizados | parcial | n/a | en progreso | Estructura API preparada; falta cobertura completa de casos HTTP. |
| GEN-09 | CRUD + vistas dominio | parcial | no | en progreso | Endpoints iniciales sin CRUD completo ni pantallas finales. |
| GEN-10 | Validaciones HTTP | parcial | n/a | en progreso | Validaciones basicas de modelo; falta capa completa por requisito. |
| GEN-11 | Postman | no | n/a | pendiente | Pendiente para Hito 3. |
| GEN-12 | Evolucion esquema | no | n/a | pendiente | Pendiente para Hito 3. |
| GEN-13 | Deploy Railway + front | no | parcial | pendiente | Pendiente para Hito 3. |

## Requisitos del dominio

| ID | Titulo | API | WEB | Estado | Evidencia |
|----|--------|-----|-----|--------|-----------|
| rq-01 | Modelar entidad principal: Plaza | si | n/a | desarrollado | Modelo `ParkingSpot` y migracion `parking_spots`. |
| rq-02 | Modelar entidad secundaria: Estacionamiento activo | si | n/a | desarrollado | Modelo `ActiveParking` y migracion `active_parkings`. |
| rq-03 | CRUD del recurso principal de gestion | parcial | no | en progreso | Endpoints iniciales de plazas; falta CRUD completo y WEB. |
| rq-04 | CRUD del recurso secundario | parcial | no | en progreso | Endpoints iniciales de estacionamientos activos; falta CRUD completo y WEB. |
| rq-05 | Regla de negocio principal | no | n/a | pendiente | Pendiente. |
| rq-06 | Regla de negocio complementaria | no | n/a | pendiente | Pendiente. |
| rq-07 | Consultas con filtros y busqueda | no | no | pendiente | Pendiente. |
| rq-08 | Panel o listado principal del dominio | no | no | pendiente | Pendiente. |
| rq-09 | Flujo transaccional clave del dominio | no | no | pendiente | Pendiente. |
| rq-10 | Funcionalidad avanzada del dominio | no | n/a | pendiente | Pendiente. |

## Resumen

| Metrica | Valor |
|---------|-------|
| Total requisitos | 23 |
| Desarrollados | 5 / 23 |
| Porcentaje | 21.7 % |
| Umbral hito 1 (20%) | >= 5 |
| Umbral hito 2 (40%) | >= 10 |
| Umbral hito 3 (100%) | 23 |
| Cumple umbral de este hito? | Si |

**URLs produccion (solo hito 3):**

- API: pendiente
- Front: pendiente
- Plataforma front: pendiente
