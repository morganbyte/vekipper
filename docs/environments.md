# Entornos y flujo de ramas

Vekipper trabaja con tres entornos. Cada uno tiene su propia base de datos y su propia configuración, y el código solo avanza de uno al siguiente.

```
 feature/*  ──PR──►  develop  ──PR de release──►  main
 (tu máquina)        (staging)                    (producción)
     │                  │                            │
 development         staging                     production
 Supabase local      Supabase "vekipper-staging" Supabase "vekipper-prod"
```

## Los tres entornos

| Entorno | Rama | Para qué | Datos | Quién lo usa |
|---|---|---|---|---|
| **development** | cualquier rama, en local | Programar y probar rápido | Supabase local (Docker), datos de prueba | Tú |
| **staging** | `develop` | Probar el conjunto integrado, igual que en producción | Proyecto Supabase de staging | Tú y testers |
| **production** | `main` | La app real | Proyecto Supabase de producción | Usuarios reales |

Reglas de oro:
- **Nunca se comparten bases de datos ni credenciales entre entornos.**
- **Nada llega a producción sin pasar antes por staging.**
- La variable `APP_ENV` (`ENVIRONMENT` en la API, `NEXT_PUBLIC_APP_ENV` en la web) dice en qué entorno corre el código. Fuera de producción, la web muestra una etiqueta en la esquina inferior derecha.

## Ramas

| Rama | Vive | Se crea desde | Se fusiona en | Cómo |
|---|---|---|---|---|
| `main` | Siempre | — | — | Solo recibe PRs de release y hotfixes |
| `develop` | Siempre | `main` | `main` (release) | PR de release |
| `feat/*`, `fix/*`, `chore/*`, `docs/*` | Lo que dure la tarea | `develop` | `develop` | PR con *squash merge* |
| `hotfix/*` | Horas | `main` | `main` **y** `develop` | PR |

`main` y `develop` están protegidas: no se puede hacer push directo, todo entra por pull request y la CI (`web` y `api`) tiene que estar en verde.

## El día a día

```bash
# 1. Partir siempre de develop actualizado
git switch develop && git pull

# 2. Rama para la tarea
git switch -c feat/conector-calendar

# 3. Trabajar con commits convencionales
git commit -m "feat(api): lista los eventos de hoy"

# 4. Subir y abrir el PR hacia develop
git push -u origin feat/conector-calendar
gh pr create --base develop --fill

# 5. Cuando la CI esté en verde: squash merge (se borra la rama)
gh pr merge --squash --delete-branch
```

Al fusionar en `develop`, el cambio se despliega en **staging**. El despliegue automático llegará cuando se elija el hosting; ver el [roadmap](roadmap.md).

## Publicar una versión (release)

Cuando lo que hay en staging está probado y estable:

```bash
# 1. Actualizar CHANGELOG.md: mover "Sin publicar" a una versión nueva (p. ej. 0.1.0)
#    y fusionar ese cambio en develop con un PR, como cualquier otro.

# 2. PR de release de develop a main
gh pr create --base main --head develop --title "release: v0.1.0" --body "Ver CHANGELOG"

# 3. Fusionar con merge commit (NO squash, para conservar el historial)
gh pr merge --merge

# 4. Etiquetar la versión en main
git switch main && git pull
git tag -a v0.1.0 -m "v0.1.0"
git push origin v0.1.0
gh release create v0.1.0 --notes-from-tag
```

Al fusionar en `main`, el cambio se despliega en **producción**.

## Hotfix: arreglar producción con urgencia

```bash
git switch main && git pull
git switch -c hotfix/login-roto
# ... arreglo ...
gh pr create --base main --fill      # 1. a producción
# después de fusionar, llevar el arreglo también a develop:
gh pr create --base develop --head main --title "chore: sincroniza hotfix en develop"
```

## Versionado

[Versionado semántico](https://semver.org/lang/es/): `MAYOR.MENOR.PARCHE`.
- Mientras sea `0.x`, cada hito del roadmap sube el número MENOR (`0.1.0` → `0.2.0`).
- Los hotfixes suben el PARCHE (`0.2.0` → `0.2.1`).
- `1.0.0` llega cuando Vekipper esté listo para el público general.

## Configuración por entorno

| Variable | development | staging | production |
|---|---|---|---|
| `APP_ENV` | `development` | `staging` | `production` |
| Supabase | local (`pnpm db:start`) | proyecto de staging | proyecto de producción |
| OAuth de Google | cliente de pruebas | cliente de pruebas | cliente verificado (en el futuro) |
| Dónde se guardan los secretos | `.env` local (nunca en git) | Environment `staging` de GitHub y del hosting | Environment `production` de GitHub y del hosting |

Plantillas: [`apps/web/.env.example`](../apps/web/.env.example) y [`apps/api/.env.example`](../apps/api/.env.example). Configuración de Supabase paso a paso: [supabase.md](supabase.md).
