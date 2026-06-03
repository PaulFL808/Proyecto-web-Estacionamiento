# Arquitectura — Proyecto final web (individual)

## Naturaleza del producto

El entregable es un **sistema web** desplegado y usable en producción:

- El usuario opera desde el **navegador** (frontend).
- La **API REST** persiste datos y aplica reglas de negocio.
- **PostgreSQL** almacena el estado (recomendado; MySQL permitido si se documenta).
- En el **hito 3** la demo se realiza contra URLs públicas, no solo `localhost`.

Postman valida la API; la nota final pondera la **experiencia web integrada**.

```mermaid
flowchart LR
  subgraph client [Frontend]
    UI[Paginas_WEB]
  end
  subgraph server [Backend]
    Routes[Rutas_Express]
    Ctrl[Controladores]
    Svc[Servicios]
    Seq[Sequelize_Models]
  end
  DB[(PostgreSQL)]
  Host[Railway_Vercel_Netlify]
  UI -->|HTTPS_JSON_JWT| Routes
  Routes --> Ctrl --> Svc --> Seq --> DB
  Host --> UI
  Host --> Routes
```

---

## Estructura del repositorio

Estructura mínima sugerida (el alumno puede ajustar nombres):

```text
proyecto-final/
├── client/                 # Frontend (React, Vue, etc.)
├── src/ o server/          # Backend Express
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/             # Sequelize
│   ├── middlewares/
│   └── app.js
├── migrations/
├── seeders/                # Opcional: usuario de prueba
├── postman/                # Colección exportada
├── .env.example            # Sin secretos reales
├── .gitignore
└── README.md
```

---

## Backend (Express + Sequelize)

### Capas

| Capa | Responsabilidad |
|------|-----------------|
| **routes** | Definir endpoints y middlewares |
| **controllers** | HTTP: parsear req, invocar servicio, responder JSON |
| **services** | Reglas de negocio y orquestación |
| **models** | Sequelize: esquema, validaciones de modelo |

### Convenciones API

- Prefijo sugerido: `/api/v1`
- JSON en request/response
- Códigos: `200`, `201`, `400`, `401`, `404`, `409`, `422`, `500`
- Formato de error uniforme, por ejemplo:

```json
{
  "error": true,
  "message": "Descripción legible",
  "code": "CODIGO_OPCIONAL"
}
```

### Sequelize

- Migraciones versionadas (no solo `sync()` en producción).
- Transacciones en operaciones multi-tabla (ventas, reservas, etc.).
- Validaciones en modelo y/o servicio antes de persistir.

---

## Autenticación (JWT)

- **Registro** y **login** con contraseña hasheada (**bcrypt**).
- Tras login, API devuelve **JWT**; el cliente lo envía en `Authorization: Bearer <token>`.
- Middleware `authenticate` protege rutas de dominio.
- **Roles** (admin, operador, etc.) solo si el dominio lo requiere — decisión del alumno.

### Restablecer contraseña

Un solo mecanismo documentado en README, por ejemplo:

1. Solicitud con email → generar token en tabla `password_reset_tokens` con expiración.
2. Enlace con token o código de 6 dígitos (pantalla en front).
3. Email real opcional; permitido mostrar token en consola/logs en desarrollo.

---

## Frontend (obligatorio)

- Carpeta `client/` en el mismo repositorio.
- Framework libre: React, Vue, Angular, Svelte, etc.
- **Routing** y layout navegable.
- Pantallas obligatorias de auth: registro, login, restablecer contraseña.
- Todas las funcionalidades marcadas `[WEB]` en requisitos GEN y rq deben tener UI conectada a la API real.
- Mostrar errores HTTP al usuario (no solo `console.error`).
- Variable de entorno del front apuntando a la API (`VITE_API_URL`, `NEXT_PUBLIC_API_URL`, etc.).

### Almacenamiento del token

El alumno elige e documenta:

- `localStorage` / `sessionStorage` (simple; riesgo XSS), o
- Cookie `httpOnly` (más seguro; requiere configuración CORS/cookies).

---

## Variables de entorno

### Cómo funcionan

| Entorno | Dónde se definen | Uso |
|---------|------------------|-----|
| **Local** | Archivo `.env` (gitignored) | Desarrollo en tu máquina |
| **Producción API** | Panel **Railway** → Variables | Backend desplegado |
| **Producción front** | Panel **Railway / Vercel / Netlify** | Build del cliente |

**Nunca** subas `.env` con secretos al repositorio. Sí sube **`.env.example`** comentado.

### Variables recomendadas

| Variable | Servicio | Descripción |
|----------|----------|-------------|
| `DATABASE_URL` | API (Railway) | Connection string PostgreSQL (SSL en producción) |
| `JWT_SECRET` | API | Clave larga y aleatoria para firmar tokens |
| `PORT` | API | Puerto del proceso (Railway suele inyectarlo) |
| `NODE_ENV` | API | `development` / `production` |
| `CORS_ORIGIN` | API | URL pública del front (ej. `https://tu-app.vercel.app`) |
| `VITE_API_URL` o equivalente | Front | URL pública de la API (ej. `https://tu-api.up.railway.app`) |

### Ejemplo `.env.example` (orientativo)

```env
# === Backend (local) ===
DATABASE_URL=postgresql://usuario:password@localhost:5432/proyecto_final
JWT_SECRET=cambiar_por_secreto_largo_aleatorio
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# === Frontend (local, Vite) ===
VITE_API_URL=http://localhost:3000/api/v1
```

En producción, las mismas claves se configuran en cada hosting con valores reales.

---

## Despliegue (hito 3 — GEN-13)

| Componente | Plataforma | Obligatorio |
|------------|------------|-------------|
| API Node + Express | **Railway** | Sí |
| PostgreSQL | **Railway** (plugin) | Sí |
| Frontend | **Railway**, **Vercel** o **Netlify** | Sí (elección del alumno) |

Pasos generales:

1. Crear proyecto en Railway; añadir servicio PostgreSQL; copiar `DATABASE_URL`.
2. Desplegar API; configurar variables; ejecutar migraciones en deploy o manualmente documentado.
3. Configurar `CORS_ORIGIN` con la URL final del front.
4. Desplegar `client/` en la plataforma elegida con la variable de API pública.
5. Verificar flujo completo: registro → login → operación de dominio desde URL pública.

Documentar en README: URLs, plataforma del front y comandos de migración.

---

## Pruebas

- **Postman:** colección con registro, login, CRUD dominio y casos de error (401, 409).
- **Demo E2E manual:** obligatoria en hito 3 desde el navegador contra producción.

Tests automáticos (Jest, Vitest, Playwright): opcionales.

---

## Anti-patrones (evitar)

- Datos de negocio hardcodeados en el front sin API.
- Lógica crítica solo en el cliente (validar siempre en servidor).
- Requisito `[WEB]` cumplido solo con Postman.
- Deploy solo en localhost en la entrega final.
- Secretos en el repositorio o en capturas de pantalla.

---

## Lo que no se prescribe

- Framework o librería UI concreta.
- Nombres de tablas, columnas o rutas REST del dominio.
- Diseño visual o marca.
- Uso de TypeScript (opcional).

El alumno documenta sus decisiones en el README del repositorio.
