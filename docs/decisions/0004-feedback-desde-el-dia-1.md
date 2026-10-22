# 0004. Feedback de usuarios desde el día 1

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
Vekipper quiere crecer según el uso real, no según suposiciones. Muchos usuarios no tienen cuenta de GitHub o no quieren abrir issues.

## Decisión
Dos canales:
1. **Dentro de la app:** una sección de feedback (problema, funcionalidad deseada u otro) que se guarda en la tabla `feedback` de Supabase, con la ruta de la app donde estaba el usuario.
2. **En GitHub:** plantillas de issues para reportar problemas y pedir funcionalidades.

## Consecuencias
- Barrera mínima para dar feedback.
- El feedback de la app hay que revisarlo y, cuando aplique, pasarlo a issues o al roadmap.
- La columna `status` (`new`, `planned`, `in_progress`, `done`, `declined`) permite más adelante mostrar al usuario qué pasó con su sugerencia.
