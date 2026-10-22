-- Feedback de usuarios reales: problemas y funcionalidades deseadas.
-- Ver docs/decisions/0004-feedback-desde-el-dia-1.md

create table public.feedback (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null default auth.uid(),
  kind        text not null check (kind in ('bug', 'feature', 'other')),
  message     text not null check (char_length(message) between 1 and 5000),
  -- Ruta de la app donde estaba el usuario al enviarlo (ayuda a reproducir bugs).
  page        text,
  status      text not null default 'new'
              check (status in ('new', 'planned', 'in_progress', 'done', 'declined')),
  created_at  timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Cada usuario puede enviar feedback a su nombre...
create policy "users can insert their own feedback"
  on public.feedback for insert
  to authenticated
  with check (user_id = auth.uid());

-- ...y ver solo lo que él mismo envió.
create policy "users can read their own feedback"
  on public.feedback for select
  to authenticated
  using (user_id = auth.uid());
