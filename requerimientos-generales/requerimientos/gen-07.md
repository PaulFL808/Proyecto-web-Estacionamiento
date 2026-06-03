# GEN-07: Restablecer contraseña

## Actor

Usuario que olvidó contraseña

## Precondiciones

Mecanismo único documentado en README.

## Postcondiciones

Puede hacer login con la nueva contraseña.

## Descripción detallada

Usuario solicita restablecimiento; recibe token o código con expiración; define nueva contraseña.

Tabla `password_reset_tokens` o equivalente. Flujo: solicitud → validación token → nueva contraseña. Email real opcional; permitido modo desarrollo (mostrar token en log o pantalla admin de prueba). Pantallas: solicitar y restablecer.

## Requiere página web integrada

Sí

## Criterios de aceptación (checklist)

- [ ] Flujo completo documentado
- [ ] Tokens expiran
- [ ] Pantallas web del flujo
- [ ] No se envía contraseña en texto plano por API

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
