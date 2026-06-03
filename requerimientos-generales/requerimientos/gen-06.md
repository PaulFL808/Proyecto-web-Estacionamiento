# GEN-06: Middleware de autenticación en rutas protegidas

## Actor

Usuario autenticado

## Precondiciones

GEN-05 operativo.

## Postcondiciones

Solo usuarios autenticados mutan o consultan datos según diseño.

## Descripción detallada

Rutas de dominio exigen JWT válido; sin token o token inválido → 401.

Middleware `authenticate` aplicado a rutas de negocio. Rutas públicas explícitas (registro, login, health). Probar en Postman con y sin header Authorization.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] Rutas protegidas rechazan petición sin token
- [ ] Token expirado o inválido → 401
- [ ] Documentado qué rutas son públicas

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
