# GEN-01: Estructura del repositorio y README ejecutable

## Actor

Usuario autenticado / corrector

## Precondiciones

El alumno inicia el proyecto final.

## Postcondiciones

El corrector puede clonar, instalar dependencias y entender el alcance sin reuniones adicionales.

## Descripción detallada

Existe repositorio Git con estructura clara: frontend (`client/`), backend, migraciones, `.gitignore`, `.env.example`, README.

Documentar en README: requisitos (Node versión), pasos `npm install`, variables necesarias (ver GEN-02), cómo levantar API y front en local, estructura de carpetas.

## Requiere página web integrada

No

## Criterios de aceptación (checklist)

- [ ] README con secciones: descripción, stack, instalación, variables, ejecución local
- [ ] `.gitignore` excluye `node_modules`, `.env`, builds
- [ ] Estructura `client/` + servidor API visible
- [ ] Sin secretos en el repo

## Libertad de diseño (qué decide el alumno)

- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
