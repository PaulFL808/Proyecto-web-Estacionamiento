# GEN-08: Manejo centralizado de errores y respuestas JSON

## Actor

Cliente API / front

## Precondiciones

App Express configurada.

## Postcondiciones

Front puede mostrar `message` al usuario.

## Descripción detallada

Errores no capturados no exponen stack en producción; respuestas JSON coherentes.

Middleware de error al final de la cadena. Formato uniforme `{ error, message, code? }`. Mapear errores Sequelize/validación a 400/409/422.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] 404 para recurso inexistente
- [ ] 500 sin stack trace al cliente en producción
- [ ] Validaciones devuelven 400/422 con mensaje claro

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
