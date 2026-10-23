# Configurar Google Cloud (inicio de sesión con Google)

Vekipper usa Google para iniciar sesión, a través de Supabase Auth. Esta guía configura **solo el login**. Los permisos de Calendar, Tasks y Gmail se añadirán en sus versiones (v0.2–v0.4), con su propia guía.

## ¿Cuesta dinero?

**No.** Crear proyectos, configurar OAuth y usar el login de Google es gratis y **no requiere cuenta de facturación**. Si Google te pide activar la facturación, no hace falta para nada de esta guía.

A futuro, para tenerlo en cuenta:
- Las APIs de Calendar, Tasks y Gmail también son gratuitas dentro de sus cuotas, que sobran para uso personal.
- Abrir Gmail al público exigirá una **evaluación de seguridad** (CASA) que **puede tener coste** según el nivel. Solo hará falta con más de 100 usuarios.

## Estructura: dos proyectos de Google Cloud

| Proyecto de Google Cloud | Entornos | Estado de la app | Clientes OAuth |
|---|---|---|---|
| `vekipper-dev` | development y staging | **Testing**: solo usuarios de prueba (máx. 100) | `vekipper-local`, `vekipper-staging` |
| `vekipper-prod` | production | **In production** | `vekipper-production` |

Por qué dos proyectos: igual que con Supabase, producción queda aislada. Además, cuando lleguen los permisos de Gmail, el proyecto de desarrollo puede seguir en *Testing* sin verificación mientras el de producción pasa por ella.

Por qué un cliente OAuth por entorno: cada uno tiene su propio secreto, así que si uno se filtra solo hay que cambiar ese.

---

## Parte 1: proyecto `vekipper-dev`

### 1. Crear el proyecto
1. Entra en https://console.cloud.google.com con tu cuenta de Google y acepta los términos si es la primera vez.
2. En el selector de proyectos (arriba a la izquierda) → **New project**.
   - **Project name:** `vekipper-dev`
   - **Location / Organization:** *No organization*
3. **Create**, y asegúrate de que queda **seleccionado** en el selector antes de seguir.

### 2. Configurar la pantalla de consentimiento (Google Auth Platform)
1. Menú ☰ → **APIs & Services → OAuth consent screen**. Te lleva a *Google Auth Platform* → **Get started**.
2. **App information:**
   - **App name:** `Vekipper (dev)`. El "(dev)" te avisa en la pantalla de Google de que estás en desarrollo.
   - **User support email:** tu correo
3. **Audience:** **External**. *Internal* solo existe para organizaciones de Google Workspace.
4. **Contact information:** tu correo.
5. Acepta la política de datos de usuario → **Create**.

### 3. Usuarios de prueba
**Audience** (menú lateral):
- **Publishing status** debe ser **Testing**. **No** pulses *Publish app* en este proyecto.
- **Test users → Add users:** tu cuenta de Gmail y cualquier persona que vaya a probar staging.

> En *Testing*, solo los usuarios de esta lista pueden iniciar sesión. Cualquier otro verá un error de Google.

### 4. Permisos (scopes)
**Data Access → Add or remove scopes.** Marca **solo** estos tres:
- `openid`
- `.../auth/userinfo.email`
- `.../auth/userinfo.profile`

→ **Update** → **Save**.

> **No** añadas ahora Calendar, Gmail ni Tasks. Se añaden en su versión, y añadir permisos de más complica la verificación.

### 5. Branding
**Branding:** comprueba el nombre y el correo de soporte. **No subas logo**: hacerlo obliga a pasar una verificación de marca.

### 6. Cliente OAuth para development (local)
**Clients → Create client:**
- **Application type:** *Web application*
- **Name:** `vekipper-local`
- **Authorized JavaScript origins:** `http://localhost:3000`
- **Authorized redirect URIs:** `http://127.0.0.1:54321/auth/v1/callback`

→ **Create**.

> ⚠️ **Copia el *Client ID* y el *Client secret* en ese momento y guárdalos en tu gestor de contraseñas.** Google solo muestra el secreto completo al crearlo. Si lo pierdes, tendrás que generar otro.

### 7. Cliente OAuth para staging
**Clients → Create client:**
- **Application type:** *Web application*
- **Name:** `vekipper-staging`
- **Authorized JavaScript origins:** déjalo vacío por ahora. Se añade el dominio de staging en Vercel cuando exista.
- **Authorized redirect URIs:** `https://mdutvgapnqsojnhjdkuw.supabase.co/auth/v1/callback`

> El redirect URI exacto está en el panel de Supabase de **staging** → *Authentication → Sign In / Providers → Google* (campo *Callback URL*). Cópialo de ahí para no equivocarte.

→ **Create**, y guarda el ID y el secreto, como en el paso 6.

---

## Parte 2: conectar con Supabase

### 8. Development (local)
1. En la raíz del repo:
   ```bash
   cp .env.example .env
   ```
2. Rellena `.env` con los datos del cliente **`vekipper-local`**:
   ```
   SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=<client id>
   SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=<client secret>
   ```
3. Reinicia Supabase local para que lea la configuración:
   ```bash
   pnpm db:stop && pnpm db:start
   ```
4. Arranca la web (`pnpm dev:web`), entra en http://localhost:3000 → **Iniciar sesión → Continuar con Google**.

> Usa siempre `http://localhost:3000`, no `http://127.0.0.1:3000`. Las cookies de sesión dependen del host exacto.

### 9. Staging
En el panel de Supabase de **`vekipper-staging`**:
1. **Authentication → Sign In / Providers → Google** → activar.
2. Pega el *Client ID* y el *Client Secret* del cliente **`vekipper-staging`** → **Save**.
3. **Authentication → URL Configuration:** se completa cuando exista el dominio de staging en Vercel.

---

## Parte 3: proyecto `vekipper-prod`

Puedes hacerlo ya o cuando despliegues producción. Los pasos son los de la parte 1, con estas diferencias:

| Paso | Diferencia |
|---|---|
| 1 | **Project name:** `vekipper-prod` |
| 2 | **App name:** `Vekipper` (sin "(dev)") |
| 3 | No hacen falta usuarios de prueba (ver abajo) |
| 6–7 | Un solo cliente: **`vekipper-production`**, con el redirect URI `https://eissekicwgxnuxmlengd.supabase.co/auth/v1/callback`. *Authorized JavaScript origins:* el dominio de producción en Vercel, cuando exista |
| Branding | **Authorized domains:** añade `supabase.co` y, más adelante, el dominio de producción |

**Publicar la app:** *Audience → Publish app → In production.* Con solo los tres permisos básicos (`openid`, `email` y `profile`) y sin logo, Google **no exige verificación**, así que cualquiera puede iniciar sesión. Esto cambiará cuando se añadan Calendar y Gmail.

Luego, en el panel de Supabase de **`vekipper-prod`**: *Authentication → Sign In / Providers → Google*, con los datos de **`vekipper-production`**.

---

## Errores típicos

| Error | Causa | Solución |
|---|---|---|
| `redirect_uri_mismatch` | El redirect URI del cliente no coincide exactamente | Cópialo del panel de Supabase. Ojo con `http`/`https`, `127.0.0.1`/`localhost` y la barra final |
| `access_denied` / "app not verified" | Tu cuenta no está en *Test users* | Añádela en *Audience → Test users* |
| Vuelves a `/login?error=callback` | Iniciaste en `127.0.0.1:3000` y volviste a `localhost:3000`, o al revés | Usa siempre `localhost:3000` |
| Error al llegar a Google | Supabase local no leyó el `.env` | `.env` en la **raíz** del repo, y después `pnpm db:stop && pnpm db:start` |

## Checklist

- [ ] Proyecto `vekipper-dev` creado, en *Testing*, con tu cuenta como usuario de prueba
- [ ] Solo los permisos `openid`, `email` y `profile`
- [ ] Clientes `vekipper-local` y `vekipper-staging` creados, con sus secretos guardados
- [ ] `.env` en la raíz con el cliente local, y login local funcionando
- [ ] Google activado en Supabase de staging con el cliente `vekipper-staging`
- [ ] (Al desplegar) Proyecto `vekipper-prod`, cliente `vekipper-production`, app publicada y Google activado en Supabase de producción
