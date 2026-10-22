# 0003. Supabase como base de datos y autenticación

- **Estado:** Aceptada
- **Fecha:** 2026-10-22

## Contexto
Vekipper es multiusuario desde el inicio. Necesita usuarios, inicio de sesión, una base de datos relacional y aislar los datos de cada usuario.

## Decisión
Supabase: Postgres gestionado, Auth (incluido el inicio de sesión con Google) y Row Level Security. Las migraciones viven en `supabase/migrations` y se versionan en git.

## Consecuencias
- Inicio de sesión y base de datos listos sin montar infraestructura propia.
- Al ser Postgres estándar, se puede migrar fuera de Supabase si hace falta.
- RLS obligatorio en todas las tablas: cada usuario solo accede a sus filas.
- La API en Python valida el JWT emitido por Supabase.
