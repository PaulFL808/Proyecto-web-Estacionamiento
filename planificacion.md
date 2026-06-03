# Planificación — 4 hitos

Proyecto **individual**. Cada alumno entrega evidencia en su repositorio GitHub (ZIP opcional como respaldo).

| Hito | Naturaleza | Requisitos desarrollados |
|------|------------|--------------------------|
| **0** | **Inicio del proyecto** | Sin % — planificación y repo |
| **1** | **Revisión del 20%** | **≥ 20%** (≥ 5 de 23) |
| **2** | **Revisión del 40%** | **≥ 40%** (≥ 10 de 23) |
| **3** | **Entrega final** | **100%** (23/23) + frontend completo + **deploy** |

> El docente puede alinear cada hito con una semana del curso; lo importante son los **umbrales de requisitos**, no solo el paso del tiempo.

---

## Resumen de requisitos

| Origen | Cantidad | IDs |
|--------|----------|-----|
| Generales | 13 | GEN-01 … GEN-13 |
| Dominio (tema elegido) | 10 | rq-01 … rq-10 |
| **Total** | **23** | — |

Un requisito está **desarrollado** cuando:

1. La **API** necesaria funciona (si aplica).
2. La **pantalla web** existe y consume la API real (si el requisito es `[WEB]` o GEN-04/05/07/09).
3. Se cumplen los criterios del archivo `gen-XX.md` o `rq-XX.md`.
4. Hay evidencia en matriz, README, Postman o capturas.

---

## Cuatro hitos

| Hito | Tipo de entrega | Umbral |
|------|-----------------|--------|
| **0** | Inicio del proyecto | 0/23 — solo inicio |
| **1** | Revisión del **20%** | ≥ 5/23 |
| **2** | Revisión del **40%** | ≥ 10/23 |
| **3** | Entrega final | 23/23 + web + deploy |

Entre hitos el alumno **sigue desarrollando** en su repositorio. Cada entrega (1, 2 y 3) es un punto de **revisión** o cierre con el porcentaje acumulado indicado.

### Hito 0 — Inicio del proyecto

- Confirmar tema (# 1–26) con el docente.
- Crear repositorio; estructura `client/` + API.
- README: alcance, stack, cronograma.
- Leer todos los GEN y rq del tema.
- Informe de inicio: [plantilla-informe-hito.md](plantillas/plantilla-informe-hito.md).
- Tag: `entrega-hito-0`.

**No se evalúa** con nota. **No se exige** ningún requisito desarrollado.

### Hito 1 — Revisión del 20%

- **Mínimo 5 requisitos** (≥ 20% de 23) en estado *desarrollado*.
- Matriz de avance: [plantilla-matriz-avance.md](plantillas/plantilla-matriz-avance.md).
- Base técnica: repo, `.env.example`, BD/migraciones iniciales (orientar GEN-01–03).
- Tag: `entrega-hito-1`.

**Prioridad sugerida** para 5/23: `GEN-01`, `GEN-02`, `GEN-03`, `rq-01`, `rq-02`

### Hito 2 — Revisión del 40%

- **Mínimo 10 requisitos** (≥ 40% de 23) en estado *desarrollado*.
- Matriz actualizada.
- Auth operativa (GEN-04, GEN-05, GEN-06) y al menos **una pantalla `[WEB]`** de dominio.
- Demo local (capturas o video) para revisión docente.
- Tag: `entrega-hito-2`.

**Prioridad sugerida** además del hito 1: `GEN-04`, `GEN-05`, `GEN-06`, `rq-03`, `rq-08`

### Hito 3 — Entrega final (100% + deploy)

- **23/23** requisitos desarrollados.
- **Frontend completo** (checklist abajo).
- **GEN-13:** API + BD en Railway; front en Railway, Vercel o Netlify.
- Postman completa; README con URLs locales y producción.
- Demo en **URL pública del front** (video 5–8 min o sesión en vivo).
- Tag: `entrega-hito-3`.

---

## Checklist — Frontend completo (hito 3)

- [ ] Navegación clara (menú o rutas).
- [ ] Registro, login, logout y restablecer contraseña en UI.
- [ ] Todas las pantallas de requisitos `[WEB]` y GEN-04/05/07/09.
- [ ] Flujos rq-08, rq-09, rq-10 de punta a punta en el navegador.
- [ ] Errores 401, 404, 409, 422 visibles para el usuario.
- [ ] Datos de negocio persistidos vía API (sin mocks falsos).

---

## Checklist — Deploy GEN-13 (hito 3)

- [ ] API accesible por URL pública Railway.
- [ ] PostgreSQL en Railway con `DATABASE_URL` configurada.
- [ ] Front desplegado (Railway, Vercel o Netlify) usando la API desplegada.
- [ ] Variables en paneles de hosting (coherentes con `.env.example`).
- [ ] README: URLs producción, plataforma del front, migraciones.

---

## Entrega y evidencias

| Elemento | Hito 0 | Hito 1 (20%) | Hito 2 (40%) | Hito 3 (100%) |
|----------|--------|--------------|--------------|---------------|
| Tag Git | `entrega-hito-0` | `entrega-hito-1` | `entrega-hito-2` | `entrega-hito-3` |
| Informe | Sí (inicio) | Recomendado | Recomendado | Resumen final |
| Matriz avance | No | Sí (≥5/23) | Sí (≥10/23) | Sí (23/23) |
| Postman | No | Opcional | Parcial | Completa |
| Demo web | No | No | Local | **URL pública** |

---

## Evaluación sugerida

| Hito | Peso | Qué se evalúa |
|------|------|----------------|
| **0** — Inicio | **No se evalúa** | Obligatorio: tema, repo, informe, tag `entrega-hito-0` |
| **1** — 20% | **20%** | ≥ 5/23 en matriz; base del proyecto |
| **2** — 40% | **30%** | ≥ 10/23; auth + demo parcial |
| **3** — 100% + deploy | **50%** | 23/23; web completa; Railway + front público |
| | **100%** | Solo hitos **1, 2 y 3** suman nota |

**Hito 1 no cumplido** si hay menos de 5/23 desarrollados.  
**Hito 2 no cumplido** si hay menos de 10/23 desarrollados.  
**Hito 3 incompleto** si falta algún requisito, el front no está completo o no hay deploy funcional.

Rúbrica: [plantillas/rubrica-evaluacion.md](plantillas/rubrica-evaluacion.md).

---

## Integridad académica

- Código propio del alumno.
- Citar APIs externas usadas (ej. PokeAPI, Open Library).
- No incluir secretos en el repositorio ni en ZIP de entrega.
