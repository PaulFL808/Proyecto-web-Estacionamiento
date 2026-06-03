# GEN-10: Validaciones de entrada y reglas HTTP

## Actor

Sistema

## Precondiciones

Endpoints de dominio implementados.

## Postcondiciones

Datos inconsistentes no se persisten.

## Descripción detallada

Campos obligatorios y tipos validados; reglas de negocio devuelven 409/422 cuando corresponda.

Validar en servicio o controlador antes de Sequelize. Mensajes en español o inglés consistentes. Coherencia con rq-05 y rq-06.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] 400/422 por datos inválidos
- [ ] 409 por conflictos de negocio
- [ ] Mensajes útiles en cuerpo JSON

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
