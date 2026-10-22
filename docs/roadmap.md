# Roadmap

Orientativo: el orden puede cambiar según el feedback de usuarios reales.

## v0.1: Cimientos ⏳
- [x] Monorepo: `apps/web` (Next.js + shadcn/ui) y `apps/api` (FastAPI)
- [x] Documentación base: visión, arquitectura y decisiones
- [x] Migración de la tabla `feedback` en Supabase
- [x] CI: lint y tests de web y API
- [x] Entornos y flujo de ramas: `develop` → staging, `main` → producción ([ADR 0006](decisions/0006-entornos-y-ramas.md))
- [ ] Elegir hosting (web y API) y configurar el despliegue automático a staging y producción
- [x] Guía de configuración de Supabase ([docs/supabase.md](supabase.md))
- [ ] Proyectos Supabase de staging y producción
- [ ] Migraciones automáticas desde la CI (`develop` → staging, `main` → producción)
- [ ] Inicio de sesión con Google (Supabase Auth)
- [ ] Layout base de la app (navegación, tema claro/oscuro)
- [ ] Sección de feedback funcional en la interfaz
- [ ] La API valida el JWT de Supabase

## v0.2: Calendario
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
