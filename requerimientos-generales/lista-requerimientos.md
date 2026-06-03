# Requisitos generales — Todos los proyectos

Aplican a **cualquier tema** (1–26). Total: **13** requisitos GEN + **10** rq locales = **23** por alumno.

| ID | Título | WEB | Detalle |
|----|--------|-----|---------|
| GEN-01 | Estructura del repositorio y README ejecutable | — | [gen-01.md](requerimientos/gen-01.md) |
| GEN-02 | Variables de entorno y `.env.example` | — | [gen-02.md](requerimientos/gen-02.md) |
| GEN-03 | Conexión a BD y migraciones Sequelize iniciales | — | [gen-03.md](requerimientos/gen-03.md) |
| GEN-04 | Registro de usuario (sign up) | [WEB] | [gen-04.md](requerimientos/gen-04.md) |
| GEN-05 | Login y emisión JWT | [WEB] | [gen-05.md](requerimientos/gen-05.md) |
| GEN-06 | Middleware de autenticación en rutas protegidas | — | [gen-06.md](requerimientos/gen-06.md) |
| GEN-07 | Restablecer contraseña | [WEB] | [gen-07.md](requerimientos/gen-07.md) |
| GEN-08 | Manejo centralizado de errores y respuestas JSON | — | [gen-08.md](requerimientos/gen-08.md) |
| GEN-09 | CRUD REST y pantallas web de gestión del dominio | [WEB] | [gen-09.md](requerimientos/gen-09.md) |
| GEN-10 | Validaciones de entrada y reglas HTTP | — | [gen-10.md](requerimientos/gen-10.md) |
| GEN-11 | Colección Postman con auth y casos de error | — | [gen-11.md](requerimientos/gen-11.md) |
| GEN-12 | Evolución de esquema (cambio AC/EC/AV/MT) | — | [gen-12.md](requerimientos/gen-12.md) |
| GEN-13 | Despliegue: API+BD Railway y front público | [WEB parcial] | [gen-13.md](requerimientos/gen-13.md) |

## Orden sugerido de implementación

1. GEN-01 → GEN-03 (base)
2. GEN-04 → GEN-06 (auth API)
3. rq-01, rq-02 (modelos dominio)
4. GEN-04, GEN-05, GEN-07 (auth UI)
5. rq-03 … rq-10 y GEN-09, GEN-10
6. GEN-11, GEN-12, GEN-13 (cierre y deploy)

Ver [planificacion.md](../planificacion.md): hito 0 inicio · hito 1 (20%) · hito 2 (40%) · hito 3 (100% + deploy).
