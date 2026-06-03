#!/usr/bin/env python3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "requerimientos-generales" / "requerimientos"

GEN = [
    ("01", "Estructura del repositorio y README ejecutable", "No",
     "Usuario autenticado / corrector",
     "El alumno inicia el proyecto final.",
     "Existe repositorio Git con estructura clara: frontend (`client/`), backend, migraciones, `.gitignore`, `.env.example`, README.",
     "El corrector puede clonar, instalar dependencias y entender el alcance sin reuniones adicionales.",
     "Documentar en README: requisitos (Node versión), pasos `npm install`, variables necesarias (ver GEN-02), cómo levantar API y front en local, estructura de carpetas.",
     ["README con secciones: descripción, stack, instalación, variables, ejecución local", "`.gitignore` excluye `node_modules`, `.env`, builds", "Estructura `client/` + servidor API visible", "Sin secretos en el repo"]),
    ("02", "Variables de entorno y `.env.example`", "No",
     "Desarrollador",
     "Decisión de stack y carpetas tomada (GEN-01).",
     "Archivo `.env.example` comentado; variables configuradas en local y en paneles de hosting para producción.",
     "El proyecto arranca en local y puede configurarse en Railway/Vercel/Netlify sin adivinar nombres de variables.",
     "Incluir sección en README «Variables de entorno» explicando local vs producción. Tabla mínima: `DATABASE_URL`, `JWT_SECRET`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`, variable de URL de API para el front (`VITE_API_URL` o equivalente). Cada línea en `.env.example` con comentario de para qué sirve.",
     ["`.env.example` presente y sin valores secretos reales", "README explica dónde configurar cada variable en Railway y en el host del front", "`.env` en `.gitignore`", "Producción usa variables del panel, no archivos subidos"]),
    ("03", "Conexión a BD y migraciones Sequelize iniciales", "No",
     "Sistema",
     "Variables de BD definidas (GEN-02).",
     "Sequelize conecta a PostgreSQL (o MySQL documentado); migraciones iniciales del dominio y usuario aplican sin error.",
     "Tablas base creadas de forma reproducible en otro equipo con `db:migrate`.",
     "Configurar Sequelize desde `DATABASE_URL`. Crear migraciones para modelo Usuario (GEN-04) y entidades principales del dominio (rq-01, rq-02). No depender solo de `sync({ force: true })` en producción.",
     ["Conexión verificada al arrancar API", "Migraciones en carpeta `migrations/`", "README indica comando de migración", "Migraciones ejecutables en entorno limpio"]),
    ("04", "Registro de usuario (sign up)", "Sí",
     "Visitante / nuevo usuario",
     "API y tabla de usuarios existentes.",
     "Un visitante puede registrarse con datos mínimos (email, contraseña, nombre según diseño); contraseña no se guarda en texto plano.",
     "Usuario creado en BD; puede iniciar sesión (GEN-05).",
     "Endpoint de registro público; validar email único y fortaleza mínima de contraseña. Pantalla de registro en el front envía formulario a la API y muestra errores de validación.",
     ["POST registro funciona", "Contraseña hasheada con bcrypt", "Pantalla web de registro", "Errores 400/409 visibles en UI"]),
    ("05", "Login y emisión JWT", "Sí",
     "Usuario registrado",
     "Usuario existe en BD.",
     "Login con credenciales válidas devuelve JWT; credenciales inválidas devuelven 401.",
     "Cliente almacena token y puede llamar rutas protegidas.",
     "Endpoint login público. Payload JWT con identificador de usuario (y rol opcional). Pantalla login en front; redirección tras éxito; botón cerrar sesión que borra token.",
     ["Login API con JWT", "401 si credenciales incorrectas", "Pantalla login web", "Logout limpia sesión en cliente"]),
    ("06", "Middleware de autenticación en rutas protegidas", "No",
     "Usuario autenticado",
     "GEN-05 operativo.",
     "Rutas de dominio exigen JWT válido; sin token o token inválido → 401.",
     "Solo usuarios autenticados mutan o consultan datos según diseño.",
     "Middleware `authenticate` aplicado a rutas de negocio. Rutas públicas explícitas (registro, login, health). Probar en Postman con y sin header Authorization.",
     ["Rutas protegidas rechazan petición sin token", "Token expirado o inválido → 401", "Documentado qué rutas son públicas"]),
    ("07", "Restablecer contraseña", "Sí",
     "Usuario que olvidó contraseña",
     "Mecanismo único documentado en README.",
     "Usuario solicita restablecimiento; recibe token o código con expiración; define nueva contraseña.",
     "Puede hacer login con la nueva contraseña.",
     "Tabla `password_reset_tokens` o equivalente. Flujo: solicitud → validación token → nueva contraseña. Email real opcional; permitido modo desarrollo (mostrar token en log o pantalla admin de prueba). Pantallas: solicitar y restablecer.",
     ["Flujo completo documentado", "Tokens expiran", "Pantallas web del flujo", "No se envía contraseña en texto plano por API"]),
    ("08", "Manejo centralizado de errores y respuestas JSON", "No",
     "Cliente API / front",
     "App Express configurada.",
     "Errores no capturados no exponen stack en producción; respuestas JSON coherentes.",
     "Front puede mostrar `message` al usuario.",
     "Middleware de error al final de la cadena. Formato uniforme `{ error, message, code? }`. Mapear errores Sequelize/validación a 400/409/422.",
     ["404 para recurso inexistente", "500 sin stack trace al cliente en producción", "Validaciones devuelven 400/422 con mensaje claro"]),
    ("09", "CRUD REST y pantallas web de gestión del dominio", "Sí",
     "Usuario autenticado",
     "Modelos de dominio migrados (rq-01, rq-02); auth operativa.",
     "Al menos un recurso principal del dominio tiene CRUD REST y pantallas listar / crear / editar (o equivalente).",
     "Operaciones visibles y persistentes vía API.",
     "Endpoints REST convencionales. Vistas web con tablas o cards; formularios conectados a API; sin datos mock de negocio.",
     ["CRUD API verificado en Postman", "Listado y alta/edición en UI", "Eliminar o desactivar según reglas del dominio", "UI refleja errores de API"]),
    ("10", "Validaciones de entrada y reglas HTTP", "No",
     "Sistema",
     "Endpoints de dominio implementados.",
     "Campos obligatorios y tipos validados; reglas de negocio devuelven 409/422 cuando corresponda.",
     "Datos inconsistentes no se persisten.",
     "Validar en servicio o controlador antes de Sequelize. Mensajes en español o inglés consistentes. Coherencia con rq-05 y rq-06.",
     ["400/422 por datos inválidos", "409 por conflictos de negocio", "Mensajes útiles en cuerpo JSON"]),
    ("11", "Colección Postman con auth y casos de error", "No",
     "Corrector / alumno",
     "API desplegada o local documentada.",
     "Colección exportada `.json` con flujos de registro, login, CRUD y al menos un caso 401 y un 409/422.",
     "Tercero puede reproducir pruebas siguiendo README.",
     "Variables de colección para `baseUrl` y `token`. Carpeta por módulo o recurso. Incluir en repo `postman/`.",
     ["Archivo JSON en el repo", "Flujo auth automatizable", "Casos de error documentados en descripción de request"]),
    ("12", "Evolución de esquema (cambio AC/EC/AV/MT)", "No",
     "Desarrollador",
     "Esquema inicial estable.",
     "Una migración adicional documenta un cambio tipo: agregar campo (AC), eliminar campo (EC), agregar validación (AV) o modificar tipo (MT).",
     "API y front ajustados al nuevo esquema.",
     "Elegir un cambio coherente con el dominio. Documentar en README o CHANGELOG qué cambió y por qué. Inspirarse en tipos de Parte 2 de la evaluación API del curso.",
     ["Nueva migración versionada", "Descripción del cambio en documentación", "Endpoints/UI actualizados"]),
    ("13", "Despliegue: API+BD Railway y front público", "Parcial — URLs públicas; la UI ya se valida en otros GEN/rq",
     "Corrector / usuario final",
     "Hito 3: 23 requisitos listos en código.",
     "API responde en URL Railway; PostgreSQL en Railway; front accesible en Railway, Vercel o Netlify consumiendo API de producción.",
     "Demo E2E posible sin localhost.",
     "Desplegar API con variables de Railway. Ejecutar migraciones. Desplegar front con URL de API de producción. Configurar CORS. README con ambas URLs y plataforma elegida para front.",
     ["URL API Railway en README", "Front público carga y consume API", "CORS configurado", "Migraciones aplicadas en BD de producción"]),
]


LIBERTAD = {
    "13": """- Plataforma del front: Railway, Vercel o Netlify
- Estrategia de build y variables en cada hosting
- Uno o dos servicios en Railway según preferencia
- Comando de migración en CI o manual documentado""",
    "default": """- Estructura de carpetas y scripts npm
- Herramientas de calidad de código (opcionales)
- Detalles de UI no exigidos explícitamente en el requisito""",
}


def render(n, title, web, actor, pre, desc, post, detail, criteria):
    crit = "\n".join(f"- [ ] {c}" for c in criteria)
    libertad = LIBERTAD.get(n, LIBERTAD["default"])
    body_desc = f"{desc}\n\n{detail}" if desc != detail else detail
    return f"""# GEN-{n}: {title}

## Actor

{actor}

## Precondiciones

{pre}

## Postcondiciones

{post}

## Descripción detallada

{body_desc}

## Requiere página web integrada

{web}

## Criterios de aceptación (checklist)

{crit}

## Libertad de diseño (qué decide el alumno)

{libertad}

## Referencias

- [arquitectura.md](../../arquitectura.md)
- [planificacion.md](../../planificacion.md)
"""


def main():
    BASE.mkdir(parents=True, exist_ok=True)
    rows = []
    for g in GEN:
        n, title, web = g[0], g[1], g[2]
        path = BASE / f"gen-{n}.md"
        path.write_text(render(n, title, web, g[3], g[4], g[5], g[6], g[7], g[8]), encoding="utf-8")
        wtag = "[WEB]" if web.startswith("Sí") else ("[WEB parcial]" if "Parcial" in web else "")
        rows.append(f"| GEN-{n} | {title} | {wtag or '—'} | [gen-{n}.md](requerimientos/gen-{n}.md) |")
    lista = BASE.parent / "lista-requerimientos.md"
    lista.write_text(f"""# Requisitos generales — Todos los proyectos

Aplican a **cualquier tema** (1–26). Total: **13** requisitos GEN + **10** rq locales = **23** por alumno.

| ID | Título | WEB | Detalle |
|----|--------|-----|---------|
{chr(10).join(rows)}

## Orden sugerido de implementación

1. GEN-01 → GEN-03 (base)
2. GEN-04 → GEN-06 (auth API)
3. rq-01, rq-02 (modelos dominio)
4. GEN-04, GEN-05, GEN-07 (auth UI)
5. rq-03 … rq-10 y GEN-09, GEN-10
6. GEN-11, GEN-12, GEN-13 (cierre y deploy)

Ver [planificacion.md](../planificacion.md) para hitos y porcentajes.
""", encoding="utf-8")
    print("GEN OK:", len(GEN))


if __name__ == "__main__":
    main()
