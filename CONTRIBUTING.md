# Cómo contribuir

¡Gracias por el interés! Vekipper está en desarrollo temprano.

> **Nota:** mientras no haya licencia definida ([ADR 0005](docs/decisions/0005-licencia-diferida.md)), no se aceptan pull requests externos. Los issues con problemas e ideas son muy bienvenidos.

## Reportar un problema o pedir una funcionalidad

- Desde la app: sección de feedback.
- Desde GitHub: [abre un issue](../../issues/new/choose) con la plantilla que corresponda.

## Flujo de trabajo

- Rama principal: `main`. Los cambios se hacen en ramas cortas: `feat/...`, `fix/...`, `docs/...`.
- **Commits convencionales:**
  - `feat:` nueva funcionalidad
  - `fix:` corrección de un error
  - `docs:` solo documentación
  - `refactor:` cambio interno sin cambio de comportamiento
  - `test:`, `chore:`, `ci:`

  Se puede indicar el ámbito: `feat(api): conector de Google Calendar`, `fix(web): ...`.
- **La documentación cambia junto con el código.** Si un cambio afecta a cómo se usa o se instala algo, actualiza `docs/` en el mismo commit o PR.
- **Decisiones importantes → ADR** en [`docs/decisions/`](docs/decisions/).
- **Cambios visibles para el usuario → [CHANGELOG](CHANGELOG.md)**, en la sección `Sin publicar`.

## Antes de subir cambios

```bash
pnpm lint:web && pnpm build:web                  # frontend
cd apps/api && uv run ruff check . && uv run pytest   # backend
```

La CI ejecuta lo mismo en cada push y pull request.
