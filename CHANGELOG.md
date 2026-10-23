# Changelog

Todos los cambios relevantes de Vekipper se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

## [0.1.0] - 2026-10-23

Primera versión: los cimientos de Vekipper, con inicio de sesión y feedback en producción.

### Añadido

**Para quien usa Vekipper**
- Inicio de sesión con Google.
- Interfaz minimalista en Geist Mono, con tema claro/oscuro y navegación animada.
- Portada "Hoy" con la fecha del día y las secciones que vienen (Calendario, Tareas, Correo).
- Sección de feedback: reportar un problema, pedir una funcionalidad y ver el estado de lo enviado.

**Para quien desarrolla Vekipper**
- Monorepo con `apps/web` (Next.js 16 + shadcn/ui + Motion) y `apps/api` (FastAPI), y CI de lint, tipos y tests.
- Entornos development, staging y production, con flujo de ramas `develop`/`main` y despliegue automático en Vercel.
- Supabase con Row Level Security y la tabla `feedback`; CLI incluida con los atajos `pnpm db:*`.
- Documentación: visión, arquitectura, roadmap, guía de inicio, guías de Supabase, Google Cloud y Vercel, y ADRs 0001–0007.

[Sin publicar]: https://github.com/morganbyte/vekipper/compare/v0.1.0...develop
[0.1.0]: https://github.com/morganbyte/vekipper/releases/tag/v0.1.0
