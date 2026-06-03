# GEN-13: Despliegue: API+BD Railway y front público

## Actor

Corrector / usuario final

## Precondiciones

Hito 3: 23 requisitos listos en código.

## Postcondiciones

Demo E2E posible sin localhost.

## Descripción detallada

API responde en URL Railway; PostgreSQL en Railway; front accesible en Railway, Vercel o Netlify consumiendo API de producción.

Desplegar API con variables de Railway. Ejecutar migraciones. Desplegar front con URL de API de producción. Configurar CORS. README con ambas URLs y plataforma elegida para front.

## Requiere página web integrada

Parcial — URLs públicas; la UI ya se valida en otros GEN/rq

## Criterios de aceptación (checklist)

- [ ] URL API Railway en README
- [ ] Front público carga y consume API
- [ ] CORS configurado
- [ ] Migraciones aplicadas en BD de producción

## Libertad de diseño (qué decide el alumno)

- Plataforma del front: Railway, Vercel o Netlify
- Estrategia de build y variables en cada hosting
- Uno o dos servicios en Railway según preferencia
- Comando de migración en CI o manual documentado

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
