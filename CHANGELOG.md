# Changelog

Todos los cambios relevantes de Vekipper se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido
- Monorepo con `apps/web` (Next.js + shadcn/ui + Motion) y `apps/api` (FastAPI).
- Página inicial con la base visual de Vekipper.
- Endpoint `GET /health` en la API.
- Migración de la tabla `feedback` con Row Level Security.
- Documentación base: visión, arquitectura, roadmap, guía de inicio y ADRs 0001–0005.
- Plantillas de issues y pull requests, y CI para web y API.
- Entornos development/staging/production con flujo de ramas `develop`/`main` (ADR 0006).
- Etiqueta de entorno en la web fuera de producción.
- Layout base: cabecera con navegación animada, tema claro/oscuro y menú de usuario.
- Inicio de sesión con Google mediante Supabase Auth (`/login` y `/auth/callback`).
- Sección de feedback (`/feedback`): enviar un problema, una funcionalidad u otro, y ver el estado de lo enviado.
- Guía de Google Cloud (`docs/google-cloud.md`) y ADR 0007 (Vercel para la web).
- Guía de despliegue en Vercel (`docs/vercel.md`): staging en `develop` y producción en `main`.
- Guía de configuración de Supabase (`docs/supabase.md`) y CLI de Supabase incluida en el repo, con los atajos `pnpm db:*`.

### Cambiado
- Toda la interfaz usa la fuente Geist Mono.
- Las variables de entorno usan las claves nuevas de Supabase (publicable y secreta) en lugar de `anon` y el JWT secret.
