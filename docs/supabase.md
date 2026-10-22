# Configurar Supabase

Vekipper usa una base de datos por entorno ([ADR 0006](decisions/0006-entornos-y-ramas.md)):

| Entorno | Dónde | Cómo se crea |
|---|---|---|
| development | Tu máquina (Docker) | `pnpm db:start` |
| staging | Proyecto `vekipper-staging` en supabase.com | A mano, una vez |
| production | Proyecto `vekipper-prod` en supabase.com | A mano, una vez |

La CLI de Supabase viene incluida como dependencia del repo: tras `pnpm install`, se usa con `pnpm supabase ...`.

## Las claves de Supabase

| Clave | Formato | Dónde se usa | ¿Es secreta? |
|---|---|---|---|
| **Publicable** | `sb_publishable_...` | Web (navegador) | No. RLS protege los datos |
| **Secreta** | `sb_secret_...` | Solo la API | **Sí.** Se salta RLS: nunca en git ni en el navegador |
| JWKS (claves públicas) | `<SUPABASE_URL>/auth/v1/.well-known/jwks.json` | La API, para verificar los tokens de usuario | No |

> Las claves antiguas `anon`, `service_role` y el *JWT secret* son legado y Supabase las retira a finales de 2026. Vekipper no las usa.

---

## 1. Development (local)

**Requisito:** Docker corriendo.

```bash
cd ~/Proyectos/vekipper
pnpm install
pnpm db:start        # la primera vez descarga las imágenes (varios minutos)
```

Al terminar, la terminal muestra las URLs y las claves locales (`pnpm db:status` las vuelve a mostrar):

- **API URL:** `http://127.0.0.1:54321`
- **Studio** (panel visual): http://127.0.0.1:54323
- **Publishable key** y **Secret key** locales. Son de desarrollo, no dan acceso a nada real.

Las migraciones de `supabase/migrations/` se aplican solas al arrancar.

Copia los valores a tus archivos `.env`:

```bash
cp apps/web/.env.example apps/web/.env.local   # → NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
cp apps/api/.env.example apps/api/.env         # → SUPABASE_SECRET_KEY
```

**Comprobación:** abre Studio → *Table Editor*. Debe aparecer la tabla `feedback`.

Comandos del día a día:

| Comando | Qué hace |
|---|---|
| `pnpm db:start` | Levanta Supabase local |
| `pnpm db:stop` | Lo detiene (los datos se conservan) |
| `pnpm db:status` | Muestra las URLs y las claves |
| `pnpm db:reset` | Borra todo y reaplica las migraciones desde cero |
| `pnpm supabase migration new <nombre>` | Crea una migración nueva |

---

## 2. Crear los proyectos en la nube (una sola vez)

1. Entra en [supabase.com](https://supabase.com) e inicia sesión. Con GitHub es lo más cómodo.
2. Crea una **organización**, por ejemplo `vekipper`, en el plan **Free**.
3. **New project**:
   - **Name:** `vekipper-staging`
   - **Database password:** pulsa *Generate* y **guárdala en tu gestor de contraseñas**. No se vuelve a mostrar.
   - **Region:** la más cercana a ti y a tus usuarios. **Usa la misma región en ambos proyectos.**
4. Repite el paso 3 con **Name:** `vekipper-prod`, con **otra** contraseña.
5. Apunta el **Project ref** de cada uno: es el identificador que aparece en la URL del panel (`supabase.com/dashboard/project/<ref>`) y en *Settings → General*.

> El plan gratuito pausa un proyecto tras **7 días sin actividad**. Si staging está pausado, se reactiva con *Restore* desde el panel.

## 3. Aplicar las migraciones

Siempre **primero en staging**, comprobar, y **después en producción**.

```bash
pnpm supabase login                              # una vez: abre el navegador

# Staging
pnpm supabase link --project-ref <ref-staging>   # pide la contraseña de la base de datos
pnpm supabase db push                            # muestra las migraciones y pide confirmación

# Comprobar en el panel de staging → Table Editor → feedback

# Producción
pnpm supabase link --project-ref <ref-prod>
pnpm supabase db push
```

> `link` recuerda a qué proyecto apunta la CLI (en `supabase/.temp/`, fuera de git). **Antes de cada `db push`, asegúrate de a cuál estás enlazado.** Cuando el despliegue esté automatizado, este paso lo hará la CI (ver el [roadmap](roadmap.md)).

## 4. Guardar las claves de cada entorno en GitHub

En cada proyecto: *Settings → API Keys*. Copia la **publishable key** y crea una **secret key**. Después, guárdalas en el environment de GitHub que le corresponde:

```bash
# Staging (valores de vekipper-staging)
gh variable set SUPABASE_URL --env staging --body "https://<ref-staging>.supabase.co"
gh variable set SUPABASE_PUBLISHABLE_KEY --env staging --body "sb_publishable_..."
gh secret set SUPABASE_SECRET_KEY --env staging          # la pide de forma oculta
gh secret set SUPABASE_DB_PASSWORD --env staging

# Producción (valores de vekipper-prod)
gh variable set SUPABASE_URL --env production --body "https://<ref-prod>.supabase.co"
gh variable set SUPABASE_PUBLISHABLE_KEY --env production --body "sb_publishable_..."
gh secret set SUPABASE_SECRET_KEY --env production
gh secret set SUPABASE_DB_PASSWORD --env production
```

- **Variables** (URL, clave publicable): no son secretas y se pueden leer en GitHub.
- **Secrets** (clave secreta, contraseña): GitHub no los vuelve a mostrar nunca.

Cuando se elija el hosting, estos mismos valores se cargarán también allí.

## 5. Pendiente para más adelante

Estos pasos dependen de otras piezas y se documentarán cuando lleguen:

- **Authentication → URL Configuration:** *Site URL* y *Redirect URLs* de staging y producción. Requiere conocer los dominios del hosting.
- **Authentication → Providers → Google:** requiere el proyecto de Google Cloud (inicio de sesión con Google, v0.1).
- **Migraciones automáticas desde la CI:** `develop` → staging y `main` → producción.

## Checklist

- [ ] `pnpm db:start` funciona y Studio muestra la tabla `feedback`
- [ ] `.env.local` (web) y `.env` (API) con las claves locales
- [ ] Proyectos `vekipper-staging` y `vekipper-prod` creados, en la misma región
- [ ] Contraseñas de ambas bases de datos guardadas en el gestor de contraseñas
- [ ] Migraciones aplicadas en staging y luego en producción
- [ ] Variables y secrets cargados en los environments `staging` y `production` de GitHub
