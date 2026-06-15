# Guia de despliegue

## API en Railway

1. Crear un proyecto en Railway conectado a este repositorio.
2. Configurar variables:

```env
DATABASE_URL=mysql://usuario:password@host:puerto/base
JWT_SECRET=un_secreto_largo_y_privado
NODE_ENV=production
CORS_ORIGIN=https://URL_PUBLICA_DEL_FRONT
```

3. Railway puede usar `railway.json`, que ejecuta:

```bash
npm run start:api
```

4. Ejecutar migraciones en la consola del servicio:

```bash
npm run db:migrate
```

## Frontend en Vercel o Netlify

Configurar el proyecto apuntando a `client/`.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Variable:

```env
VITE_API_URL=https://URL_PUBLICA_DE_LA_API/api/v1
```

## Verificacion final

- Abrir el front publico.
- Registrarse.
- Iniciar sesion.
- Crear una plaza.
- Registrar entrada.
- Registrar salida.
- Revisar reporte por zona.
