# GEN-02: Variables de entorno y `.env.example`

## Actor

Desarrollador

## Precondiciones

Decisión de stack y carpetas tomada (GEN-01).

## Postcondiciones

El proyecto arranca en local y puede configurarse en Railway/Vercel/Netlify sin adivinar nombres de variables.

## Descripción detallada

Archivo `.env.example` comentado; variables configuradas en local y en paneles de hosting para producción.

Incluir sección en README «Variables de entorno» explicando local vs producción. Tabla mínima: `DATABASE_URL`, `JWT_SECRET`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`, variable de URL de API para el front (`VITE_API_URL` o equivalente). Cada línea en `.env.example` con comentario de para qué sirve.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] `.env.example` presente y sin valores secretos reales
- [ ] README explica dónde configurar cada variable en Railway y en el host del front
- [ ] `.env` en `.gitignore`
- [ ] Producción usa variables del panel, no archivos subidos

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
