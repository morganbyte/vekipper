# 0002. FastAPI para el backend, Next.js + shadcn/ui para el frontend

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
- El proyecto también sirve para aprender Python a fondo.
- La interfaz debe ser elegante, minimalista y con animaciones suaves, al estilo de shadcn/ui.
- Se consideró hacerlo todo en Python con plantillas + HTMX, pero shadcn/ui solo existe para React.

## Decisión
- **Backend:** Python + FastAPI. Concentra lo complejo: OAuth, conectores, sincronización y lógica de negocio.
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Motion. Se limita a la presentación.

## Consecuencias
- El aprendizaje de Python está en la parte más rica del sistema.
- Se gana el ecosistema de React para la interfaz.
- Hay que mantener un contrato HTTP entre web y API. FastAPI genera un esquema OpenAPI que más adelante puede servir para generar tipos en TypeScript.
