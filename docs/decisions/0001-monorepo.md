# 0001. Monorepo con pnpm y uv

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
Vekipper tiene un frontend en TypeScript y un backend en Python que evolucionan juntos: casi cualquier funcionalidad toca ambos.

## Decisión
Un solo repositorio con `apps/web` y `apps/api`. pnpm workspaces para la parte de JavaScript y uv para la de Python. Sin herramientas extra de orquestación (Turborepo, Nx) mientras no hagan falta.

## Consecuencias
- Un cambio completo (API + interfaz + docs) va en un solo commit o PR.
- Una sola fuente de documentación, issues y roadmap.
- Dos ecosistemas de herramientas conviven; los comandos de cada uno están en [getting-started](../getting-started.md).
