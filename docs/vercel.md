# Desplegar la web en Vercel

La web (`apps/web`) se despliega en Vercel ([ADR 0007](decisions/0007-vercel-para-la-web.md)) con un entorno por rama:

| Rama | Entorno de Vercel | Entorno de Vekipper | Dominio | Supabase |
|---|---|---|---|---|
| `main` | Production | production | `vekipper.vercel.app` | `vekipper-prod` |
| `develop` | Preview (dominio fijo) | staging | `vekipper-staging.vercel.app` | `vekipper-staging` |
| otras ramas / PRs | Preview (temporal) | preview | URL generada por Vercel | `vekipper-staging` |

> Los *Custom Environments* de Vercel ("staging") son de pago. En el plan **Hobby**, staging es una *preview* de la rama `develop` con dominio fijo y variables propias. Es el método que Vercel documenta para Hobby.

Los nombres de dominio de esta guía son los deseados. Si `vekipper.vercel.app` o `vekipper-staging.vercel.app` ya están ocupados, Vercel te propondrá otros: usa los que te asigne en todos los pasos.

---

## 1. Crear la cuenta e importar el repo

1. Entra en https://vercel.com/signup con **Continue with GitHub**, plan **Hobby**.
2. **Add New… → Project** → busca `morganbyte/vekipper` → **Import**. Si no aparece: *Adjust GitHub App Permissions* y dale acceso al repo.
3. En la pantalla de configuración:
   - **Project Name:** `vekipper`
   - **Framework Preset:** Next.js (lo detecta solo)
   - **Root Directory:** **Edit → `apps/web`**. Es lo más importante: la web vive ahí dentro del monorepo.
   - **Build and Output Settings:** déjalo por defecto. Vercel detecta pnpm por el `pnpm-lock.yaml` de la raíz.
   - **Environment Variables:** añade las de **producción** (ver la tabla del paso 3). El primer despliegue usa siempre las de producción.
     > ⚠️ **No pegues tu `.env.local`.** Tiene los valores locales (`127.0.0.1:54321` y `development`), y la app desplegada intentaría conectarse a tu máquina. Escribe a mano los valores de `vekipper-prod`.
4. **Deploy.**

> El primer despliegue sale de la rama por defecto del repo, que es **`develop`**, y Vercel lo trata como producción. Es normal y lo corriges en el paso 2.

## 2. Producción solo desde `main` ⚠️

**Settings → Environments → Production → Branch Tracking:** cambia la rama a **`main`** y guarda.

Después, despliega `main` en producción para reemplazar el primer despliegue:
**Deployments → Create Deployment →** rama `main` **→ Create Deployment**.

> Hasta la primera release (v0.1.0), `main` solo tiene la página inicial. Es lo esperado: producción se actualiza al publicar una versión ([environments.md](environments.md#publicar-una-versión-release)).

## 3. Variables de entorno

**Settings → Environment Variables.** Las variables `NEXT_PUBLIC_*` se incrustan en el código al compilar, así que **cada cambio exige un nuevo despliegue** para aplicarse.

| Variable | Production | Preview (todas las ramas) | Preview, solo rama `develop` |
|---|---|---|---|
| `NEXT_PUBLIC_APP_ENV` | `production` | `preview` | `staging` |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de `vekipper-prod` | URL de `vekipper-staging` | — (hereda) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publicable de `vekipper-prod` | Clave publicable de `vekipper-staging` | — (hereda) |

Cómo añadir cada una:
- **Production:** *Add New* → marca solo **Production**.
- **Preview (todas):** *Add New* → marca solo **Preview** y deja *Git Branch* vacío.
- **Solo `develop`:** *Add New* → marca **Preview** → en *Git Branch* escribe **`develop`**. Este valor reemplaza al genérico solo en esa rama.

**No marques Development:** en local se usa `apps/web/.env.local`.

Los valores son los mismos que guardaste en los environments de GitHub. Puedes verlos con:
```bash
gh variable list --env staging
gh variable list --env production
```

## 4. Dominio fijo para staging

**Settings → Domains → Add Domain:**
1. Escribe `vekipper-staging.vercel.app` → **Add**.
2. En la configuración del dominio, conéctalo a **Preview** y, en **Git Branch**, pon **`develop`** → **Save**.

A partir de ahí, cada push a `develop` actualiza `vekipper-staging.vercel.app`.

Para estrenarlo con las variables nuevas, despliega `develop`:
**Deployments → Create Deployment →** rama `develop`.

## 5. Protección de las previews

**Settings → Deployment Protection.** Por defecto, **Vercel Authentication** con *Standard Protection*: producción es pública y staging y las *previews* solo las ve quien tenga acceso a tu cuenta de Vercel.

- **Por ahora déjalo así:** staging es solo para ti.
- **Cuando quieras testers en staging**, desactiva *Vercel Authentication*. En Hobby no se pueden invitar miembros ni poner contraseña, y el login de Google en *Testing* ya limita quién puede entrar.

## 6. URLs de autenticación en Supabase

Supabase solo redirige a URLs que estén en su lista permitida. Sin esto, el login falla al volver de Google.

Tu *slug* de Vercel es lo que aparece tras `vercel.com/` en la URL del dashboard (algo como `morganbytes-projects`), y también al final de las URLs de las previews (`https://vekipper-git-…-<slug>.vercel.app`).

**Panel de `vekipper-staging` → Authentication → URL Configuration:**
- **Site URL:** `https://vekipper-staging.vercel.app`
- **Redirect URLs → Add URL:**
  - `https://vekipper-staging.vercel.app/auth/callback`
  - `https://*-<slug>.vercel.app/**` (para las previews de cada PR)

**Panel de `vekipper-prod` → Authentication → URL Configuration:**
- **Site URL:** `https://vekipper.vercel.app`
- **Redirect URLs:** `https://vekipper.vercel.app/auth/callback`

## 7. Orígenes en Google Cloud

Opcional para que el login funcione, porque Google redirige a Supabase y no a la web, pero mantiene la configuración completa:

- **`vekipper-dev` → Clients → `vekipper-staging` → Authorized JavaScript origins:** `https://vekipper-staging.vercel.app`
- **`vekipper-prod` → Clients → `vekipper-production`** (cuando lo crees): `https://vekipper.vercel.app`

Google no acepta comodines, así que las previews de cada PR no se añaden. No hace falta para que funcionen.

## 8. Comprobar

1. Abre `https://vekipper-staging.vercel.app`. Debe verse la etiqueta **staging** abajo a la derecha.
2. **Iniciar sesión → Continuar con Google**, con una cuenta que esté en *Test users* de `vekipper-dev`.
3. Envía un feedback de prueba.
4. En el panel de `vekipper-staging` → *Table Editor* → `feedback`, debe aparecer la fila.
5. Abre `https://vekipper.vercel.app`: la página inicial, sin etiqueta. El login de producción llegará con la release v0.1.0 y el proyecto `vekipper-prod` de Google Cloud.

## Desde ahora, el flujo

| Acción | Resultado en Vercel |
|---|---|
| Abrir un PR | *Preview* temporal, con un comentario de Vercel en el PR |
| Fusionar en `develop` | Se actualiza **staging** |
| Release `develop` → `main` | Se actualiza **producción** |

Si un despliegue falla, el error está en **Deployments → (el despliegue) → Build Logs**.

## Problemas típicos

| Síntoma | Causa | Solución |
|---|---|---|
| La etiqueta dice `development` en Vercel | Las variables tienen los valores locales, o no existían al compilar | Corrige las variables (paso 3) y **redespliega** |
| El login lleva a `127.0.0.1:54321` | `NEXT_PUBLIC_SUPABASE_URL` tiene el valor local | Ídem |
| Producción muestra lo que hay en `develop` | La rama de producción sigue siendo `develop` | Paso 2: *Branch Tracking* → `main`, y despliega `main` |
| Cambié una variable y no se nota | Las `NEXT_PUBLIC_*` se incrustan al compilar | *Deployments → … → Redeploy* |

## Checklist

- [ ] Proyecto importado con *Root Directory* `apps/web`
- [ ] Rama de producción cambiada a `main` y `main` desplegada
- [ ] Variables de Production, Preview y Preview de `develop`
- [ ] Dominio `vekipper-staging.vercel.app` asignado a la rama `develop`
- [ ] URLs de autenticación en Supabase (staging y producción)
- [ ] Login con Google y feedback funcionando en staging
