# GEN-05: Login y emisión JWT

## Actor

Usuario registrado

## Precondiciones

Usuario existe en BD.

## Postcondiciones

Cliente almacena token y puede llamar rutas protegidas.

## Descripción detallada

Login con credenciales válidas devuelve JWT; credenciales inválidas devuelven 401.

Endpoint login público. Payload JWT con identificador de usuario (y rol opcional). Pantalla login en front; redirección tras éxito; botón cerrar sesión que borra token.

## Requiere página web integrada

Sí

## Criterios de aceptación (checklist)

- [ ] Login API con JWT
- [ ] 401 si credenciales incorrectas
- [ ] Pantalla login web
- [ ] Logout limpia sesión en cliente

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
