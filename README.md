# Vekipper

**Tu día, en un solo vistazo.**

Vekipper es un centro de mando personal en la web. Reúne tu calendario, tus tareas y los correos que importan en una sola pantalla, para tenerla abierta todo el día, y te deja gestionarlos desde ahí sin perder la sincronización con las apps originales.

Sin funciones de relleno: solo lo que usas.

> **Estado:** en desarrollo temprano (v0.1). Mira el [roadmap](docs/roadmap.md).

## Qué hace (y qué hará)

| Área | Fuente | Qué puedes hacer | Estado |
|---|---|---|---|
| Calendario | Google Calendar | Ver, crear, editar y borrar eventos | Planeado · v0.2 |
| Tareas | Google Tasks, Todoist | Ver, crear y completar tareas | Planeado · v0.3 |
| Correo | Gmail | Leer la bandeja **Principal** de las **últimas 24 h** y abrir cualquier correo en Gmail | Planeado · v0.4 |
| Feedback | Vekipper | Reportar problemas y pedir funcionalidades desde la app | En curso · v0.1 |

La sincronización funciona **en ambos sentidos**: lo que cambias en Vekipper aparece en Google o Todoist, y lo que cambias allí aparece en Vekipper.

## Stack

- **Frontend:** [Next.js](https://nextjs.org) + TypeScript + [Tailwind](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) + [Motion](https://motion.dev)
- **Backend:** Python + [FastAPI](https://fastapi.tiangolo.com)
- **Base de datos y autenticación:** [Supabase](https://supabase.com)
- **Monorepo** con pnpm (JavaScript) y [uv](https://docs.astral.sh/uv/) (Python)
- **Tipografía:** [Geist Mono](https://vercel.com/font) en toda la interfaz

## Estructura

```
vekipper/
├── apps/
│   ├── web/          # Interfaz: Next.js + shadcn/ui
│   └── api/          # Backend: FastAPI (conectores, sincronización, lógica)
├── supabase/         # Configuración y migraciones de la base de datos
├── docs/             # Documentación del proyecto
└── .github/          # Plantillas de issues/PR y CI
```

## Empezar

Ver [docs/getting-started.md](docs/getting-started.md).

## Documentación

- [Visión](docs/vision.md): qué es Vekipper, para quién es y qué *no* es
- [Arquitectura](docs/architecture.md): cómo encajan las piezas
- [Roadmap](docs/roadmap.md): qué viene y en qué orden
- [Entornos y ramas](docs/environments.md): development, staging, production y cómo se publica una versión
- [Configurar Supabase](docs/supabase.md): base de datos local, staging y producción paso a paso
- [Decisiones de arquitectura](docs/decisions/): el porqué de cada decisión importante
- [Cómo contribuir](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Feedback

¿Encontraste un problema o echas algo en falta? Usa la sección de feedback dentro de la app, o abre un [issue](../../issues/new/choose).

## Licencia

Todavía sin definir. Hasta que se añada una, el código es público para consulta, pero no se concede ningún permiso de uso o redistribución. Ver [ADR 0005](docs/decisions/0005-licencia-diferida.md).
