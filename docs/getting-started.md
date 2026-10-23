# Empezar a desarrollar

> Antes de programar, lee [Entornos y ramas](environments.md): todo cambio parte de `develop` en una rama propia.

## Requisitos

| Herramienta | Para qué | Instalación |
|---|---|---|
| Node.js 22+ | Frontend | https://nodejs.org |
| pnpm | Gestor de paquetes JS | `npm install -g pnpm` |
| Python 3.12+ | Backend | Viene con la mayoría de distribuciones Linux |
| uv | Gestor de Python (entornos y dependencias) | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Supabase CLI | Base de datos local y migraciones | Incluida en el repo: `pnpm supabase ...` |
| Docker | Lo necesita Supabase en local | https://docs.docker.com/engine/install/ |

## Frontend (`apps/web`)

```bash
pnpm install          # desde la raíz del repo
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web          # http://localhost:3000
```

Otros comandos: `pnpm lint:web`, `pnpm build:web`.

Para añadir componentes de shadcn/ui:

```bash
cd apps/web
pnpm dlx shadcn@latest add <componente>
```

## Backend (`apps/api`)

```bash
cd apps/api
cp .env.example .env
uv sync                                          # crea el entorno e instala dependencias
uv run uvicorn vekipper_api.main:app --reload    # http://localhost:8000
```

- Documentación interactiva de la API: http://localhost:8000/docs
- Tests: `uv run pytest`
- Lint y formato: `uv run ruff check .` y `uv run ruff format .`

## Base de datos (`supabase/`)

```bash
pnpm db:start    # levanta Supabase en local (requiere Docker)
pnpm db:status   # URLs y claves para tus archivos .env
```

Guía completa (local, staging y producción): [supabase.md](supabase.md). Para el inicio de sesión con Google en local hace falta además un `.env` en la raíz del repo: [google-cloud.md](google-cloud.md).
