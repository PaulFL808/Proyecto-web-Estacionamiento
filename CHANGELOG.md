# Changelog

## Hito 3 - entrega final

### GEN-12 - Evolucion de esquema

Se agregaron dos migraciones versionadas para completar el flujo final del dominio:

- `20260614000100-add-active-parking-exit-fields.js`
  - Agrega `check_out_at`, `duration_minutes` y `total_amount` a `active_parkings`.
  - Permite registrar salida, calcular duracion y guardar el total cobrado.
- `20260614000200-create-password-reset-tokens.js`
  - Crea `password_reset_tokens`.
  - Permite recuperar contrasena con token expirado y de un solo uso.

El backend y el frontend fueron actualizados para consumir estos campos y rutas.
