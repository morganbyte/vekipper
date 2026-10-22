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
- Guía de configuración de Supabase (`docs/supabase.md`) y CLI de Supabase incluida en el repo, con los atajos `pnpm db:*`.

### Cambiado
- Toda la interfaz usa la fuente Geist Mono.
- Las variables de entorno usan las claves nuevas de Supabase (publicable y secreta) en lugar de `anon` y el JWT secret.
