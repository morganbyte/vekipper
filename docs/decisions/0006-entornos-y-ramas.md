# 0006. Entornos (development, staging, production) y flujo de ramas

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
Aunque Vekipper empieza como proyecto personal, tendrá usuarios reales y debe ser robusto. También es una oportunidad para aprender a trabajar como en un equipo profesional.

## Decisión
- Tres entornos aislados: **development** (local), **staging** y **production**, cada uno con su propia base de datos y sus secretos.
- Flujo de ramas tipo Git Flow simplificado:
  - `develop` → staging
  - `main` → producción
  - ramas cortas por tarea que entran en `develop` por PR con squash
  - releases de `develop` a `main` con un merge commit y una etiqueta `vX.Y.Z`
- `main` y `develop` protegidas con *rulesets* de GitHub: PR obligatorio, CI en verde, sin force push ni borrado.
- `develop` es la rama por defecto del repositorio, para que los PRs apunten ahí sin pensarlo.
- Environments `staging` y `production` en GitHub para guardar los secretos de cada uno. `production` solo acepta despliegues desde `main`.

## Consecuencias
- Producción solo recibe código probado en staging.
- Más pasos para cada cambio (rama → PR → merge), incluso trabajando solo. Es intencional.
- Se mantienen dos proyectos de Supabase en la nube (el plan gratuito permite dos proyectos activos).
- El hosting y el despliegue automático quedan pendientes de otra decisión.
- Detalle operativo: [docs/environments.md](../environments.md).
