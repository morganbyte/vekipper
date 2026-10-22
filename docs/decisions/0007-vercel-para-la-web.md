# 0007. Vercel para alojar la web

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
La web (`apps/web`) es Next.js y necesita alojamiento para staging y producción, con despliegue automático por rama ([ADR 0006](0006-entornos-y-ramas.md)).

## Decisión
**Vercel**, de los creadores de Next.js:
- **Production** → rama `main`.
- **Preview** → rama `develop`, que es staging, con variables de entorno propias para esa rama.
- Las demás ramas generan *previews* temporales con las variables de staging.

## Consecuencias
- Soporte completo de Next.js 16 (proxy, Cache Components, server actions) sin configuración.
- Despliegue automático por rama, encajado con el flujo `develop`/`main`.
- **El plan Hobby (gratuito) es solo para uso personal, no comercial.** Si Vekipper llega a ser un SaaS, hará falta el plan Pro.
- El alojamiento de la API (`apps/api`) sigue sin decidir. Vercel también puede ejecutar FastAPI como funciones *serverless*. Habrá que evaluarlo frente a un servidor persistente (Railway o Render) cuando la API tenga tareas en segundo plano o webhooks.
