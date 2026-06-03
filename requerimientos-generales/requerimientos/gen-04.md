# GEN-04: Registro de usuario (sign up)

## Actor

Visitante / nuevo usuario

## Precondiciones

API y tabla de usuarios existentes.

## Postcondiciones

Usuario creado en BD; puede iniciar sesión (GEN-05).

## Descripción detallada

Un visitante puede registrarse con datos mínimos (email, contraseña, nombre según diseño); contraseña no se guarda en texto plano.

Endpoint de registro público; validar email único y fortaleza mínima de contraseña. Pantalla de registro en el front envía formulario a la API y muestra errores de validación.

## Requiere página web integrada

Sí

## Criterios de aceptación (checklist)

- [ ] POST registro funciona
- [ ] Contraseña hasheada con bcrypt
- [ ] Pantalla web de registro
- [ ] Errores 400/409 visibles en UI

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
