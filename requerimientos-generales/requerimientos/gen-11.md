# GEN-11: Colección Postman con auth y casos de error

## Actor

Corrector / alumno

## Precondiciones

API desplegada o local documentada.

## Postcondiciones

Tercero puede reproducir pruebas siguiendo README.

## Descripción detallada

Colección exportada `.json` con flujos de registro, login, CRUD y al menos un caso 401 y un 409/422.

Variables de colección para `baseUrl` y `token`. Carpeta por módulo o recurso. Incluir en repo `postman/`.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] Archivo JSON en el repo
- [ ] Flujo auth automatizable
- [ ] Casos de error documentados en descripción de request

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
