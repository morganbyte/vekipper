# Roadmap

Orientativo: el orden puede cambiar según el feedback de usuarios reales.

## v0.1: Cimientos ✅ (2026-10-23)
- [x] Monorepo: `apps/web` (Next.js + shadcn/ui) y `apps/api` (FastAPI)
- [x] Documentación base: visión, arquitectura y decisiones
- [x] CI: lint y tests de web y API
- [x] Entornos y flujo de ramas: `develop` → staging, `main` → producción ([ADR 0006](decisions/0006-entornos-y-ramas.md))
- [x] Supabase en los tres entornos, con la tabla `feedback` y RLS ([docs/supabase.md](supabase.md))
- [x] Inicio de sesión con Google en todos los entornos ([docs/google-cloud.md](google-cloud.md))
- [x] Web desplegada en Vercel: staging y producción ([ADR 0007](decisions/0007-vercel-para-la-web.md), [docs/vercel.md](vercel.md))
- [x] Layout base de la app (navegación, tema claro/oscuro)
- [x] Sección de feedback funcional en la interfaz

## v0.2: Calendario
Base de la API (antes en v0.1; se necesita a partir de aquí):
- [ ] La API valida el JWT de Supabase
- [ ] Elegir el hosting de la API y desplegarla en staging y producción
- [ ] Migraciones automáticas desde la CI (`develop` → staging, `main` → producción)

Calendario:
- [ ] Conectar Google Calendar (OAuth)
- [ ] Ver los eventos de hoy y de los próximos días
- [ ] Crear, editar y borrar eventos

## v0.3: Tareas
- [ ] Conector de Google Tasks
- [ ] Conector de Todoist
- [ ] Vista unificada de tareas: ver, crear y completar

## v0.4: Correo
- [ ] Conectar Gmail en solo lectura
- [ ] Bandeja Principal de las últimas 24 h
- [ ] Botón "Abrir en Gmail" en cada correo

## v0.5: Tiempo real y pulido
- [ ] Webhooks de Google y Todoist
- [ ] Pulido de la interfaz y de las animaciones

## Más adelante (ideas, sin compromiso)
- Verificación de Google para abrir la app al público
- Más proveedores (Outlook, Apple Calendar...)
- Priorización inteligente de correos
- Definir la licencia ([ADR 0005](decisions/0005-licencia-diferida.md))
