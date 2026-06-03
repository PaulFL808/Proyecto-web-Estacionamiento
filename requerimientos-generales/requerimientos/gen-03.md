# GEN-03: Conexión a BD y migraciones Sequelize iniciales

## Actor

Sistema

## Precondiciones

Variables de BD definidas (GEN-02).

## Postcondiciones

Tablas base creadas de forma reproducible en otro equipo con `db:migrate`.

## Descripción detallada

Sequelize conecta a PostgreSQL (o MySQL documentado); migraciones iniciales del dominio y usuario aplican sin error.

Configurar Sequelize desde `DATABASE_URL`. Crear migraciones para modelo Usuario (GEN-04) y entidades principales del dominio (rq-01, rq-02). No depender solo de `sync({ force: true })` en producción.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] Conexión verificada al arrancar API
- [ ] Migraciones en carpeta `migrations/`
- [ ] README indica comando de migración
- [ ] Migraciones ejecutables en entorno limpio

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
