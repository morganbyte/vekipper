# Arquitectura

## Vista general

```
┌────────────────────┐   sesión (JWT)    ┌───────────────────────┐
│  apps/web          │ ───────────────►  │  Supabase Auth        │
│  Next.js + shadcn  │                   └───────────────────────┘
│  (la interfaz)     │
└─────────┬──────────┘
          │ HTTP + JWT del usuario
          ▼
┌────────────────────┐   lee/escribe     ┌───────────────────────┐
│  apps/api          │ ◄──────────────►  │  Supabase Postgres    │
│  FastAPI (Python)  │                   │  (usuarios, cuentas   │
│  - conectores      │                   │   conectadas, caché,  │
│  - sincronización  │                   │   feedback)           │
│  - lógica          │                   └───────────────────────┘
└─────────┬──────────┘
          │ OAuth / APIs REST
          ▼
  Google Calendar · Gmail · Google Tasks · Todoist
```

## Responsabilidades

### `apps/web`: la interfaz
- Muestra los datos y envía acciones (crear evento, completar tarea...).
- Gestiona la sesión del usuario con Supabase Auth.
- **No** habla directamente con Google ni con Todoist: todo pasa por la API.
- Excepción: el feedback se escribe directo en Supabase desde una *server action*, protegido por RLS (Row Level Security).
- La sesión vive en cookies (`@supabase/ssr`). El `proxy.ts` de Next la refresca en cada petición, y el servidor la verifica con `getClaims()`.
- Con *Cache Components*, todo lo que lee la sesión va dentro de `<Suspense>`. El resto de la página se sirve prerenderizado al instante.

### `apps/api`: el cerebro
- **Conectores**: un módulo por proveedor (Google Calendar, Gmail, Google Tasks, Todoist), todos con la misma interfaz. Añadir un proveedor nuevo (Outlook, Notion...) significa escribir un conector, sin tocar el resto.
- **OAuth**: gestiona la conexión de cada cuenta externa y guarda sus tokens **cifrados**.
- **Sincronización** en ambos sentidos (ver abajo).
- **Verificación de identidad**: cada petición trae el JWT de Supabase, y la API lo valida con las claves públicas del proyecto (JWKS) antes de hacer nada.

### `supabase/`: los datos
- Migraciones SQL versionadas en git.
- RLS activado en todas las tablas: cada usuario solo ve sus propios datos.

## Modelo de conectores (diseño previsto)

Cada fuente se traduce a un modelo común, para que la interfaz no dependa de ningún proveedor concreto:

| Modelo común | Google | Todoist |
|---|---|---|
| `Event` | Calendar event | — |
| `Task` | Tasks task | Todoist task |
| `MailItem` | Gmail message | — |

## Sincronización (diseño previsto)

1. **Fase inicial:** refrescos periódicos y al abrir la app. Es simple y suficiente para validar.
2. **Fase posterior:** notificaciones automáticas (*webhooks*) de Google y Todoist para enterarse de los cambios casi al instante.

Las escrituras van primero al proveedor (Google o Todoist) y, si salen bien, se actualizan en la caché local. La app original siempre es la fuente de verdad.

## Seguridad

- Los tokens OAuth de terceros se guardan cifrados y solo la API los lee.
- Permisos mínimos: Gmail se usa en **solo lectura** (`gmail.readonly`).
- **Importante:** los permisos de Gmail son *restringidos* para Google. Mientras la app esté en "modo prueba", admite hasta 100 usuarios añadidos a mano. Abrirla al público exige la verificación de Google y una auditoría de seguridad (CASA). Ver el [roadmap](roadmap.md).
