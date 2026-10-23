# Decisiones de arquitectura (ADR)

Cada decisión técnica importante queda registrada en un archivo corto: qué se decidió, por qué y qué consecuencias tiene. Así, dentro de seis meses, se sabe *por qué* las cosas son como son.

## Cómo añadir una

1. Copia [`template.md`](template.md) como `NNNN-titulo-corto.md`, con el siguiente número libre.
2. Rellénalo en pocas líneas.
3. Si una decisión reemplaza a otra, marca la antigua como `Reemplazada por NNNN`.

## Índice

| # | Decisión | Estado |
|---|---|---|
| [0001](0001-monorepo.md) | Monorepo con pnpm y uv | Aceptada |
| [0002](0002-fastapi-y-nextjs.md) | FastAPI para el backend, Next.js + shadcn/ui para el frontend | Aceptada |
| [0003](0003-supabase.md) | Supabase como base de datos y autenticación | Aceptada |
| [0004](0004-feedback-desde-el-dia-1.md) | Feedback de usuarios desde el día 1 | Aceptada |
| [0005](0005-licencia-diferida.md) | Licencia diferida | Aceptada |
| [0006](0006-entornos-y-ramas.md) | Entornos (development, staging, production) y flujo de ramas | Aceptada |
| [0007](0007-vercel-para-la-web.md) | Vercel para alojar la web | Aceptada |
