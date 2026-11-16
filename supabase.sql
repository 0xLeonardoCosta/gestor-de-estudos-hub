-- Gestor de estudos: tabela onde fica o progresso (uma linha por app, por usuário).
-- Cole tudo no SQL Editor do Supabase e clique em Run. Pode rodar mais de uma vez.

create table if not exists public.estados (
  user_id       uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  chave         text        not null,
  dados         jsonb       not null,
  atualizado_em timestamptz not null default now(),
  primary key (user_id, chave)
);

-- Sem login ninguém lê nada; logado, cada usuário só enxerga e altera as próprias linhas.
alter table public.estados enable row level security;

drop policy if exists "cada usuario so acessa o que e seu" on public.estados;
create policy "cada usuario so acessa o que e seu" on public.estados
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.estados to authenticated;
