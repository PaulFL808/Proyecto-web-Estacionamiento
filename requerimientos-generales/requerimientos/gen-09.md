# GEN-09: CRUD REST y pantallas web de gestión del dominio

## Actor

Usuario autenticado

## Precondiciones

Modelos de dominio migrados (rq-01, rq-02); auth operativa.

## Postcondiciones

Operaciones visibles y persistentes vía API.

## Descripción detallada

Al menos un recurso principal del dominio tiene CRUD REST y pantallas listar / crear / editar (o equivalente).

Endpoints REST convencionales. Vistas web con tablas o cards; formularios conectados a API; sin datos mock de negocio.

## Requiere página web integrada

Sí

## Criterios de aceptación (checklist)

- [ ] CRUD API verificado en Postman
- [ ] Listado y alta/edición en UI
- [ ] Eliminar o desactivar según reglas del dominio
- [ ] UI refleja errores de API

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
