-- =====================================================================
-- Migração 02: perfis de usuário (admin / assessor)
-- Rodar no SQL Editor depois do schema.sql
-- =====================================================================

-- ============ TABELA: perfis ============
-- Extende auth.users com nome + papel + ativo
create table if not exists public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  papel text not null default 'assessor', -- 'admin' | 'assessor'
  ativo boolean default true,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- ============ FUNÇÕES auxiliares ============
-- Verifica se o usuário logado é admin
create or replace function public.is_admin() returns boolean
language sql security definer stable
as $$
  select coalesce((select papel = 'admin' and ativo from public.perfis where id = auth.uid()), false);
$$;

-- ============ TRIGGER: cria perfil automaticamente ============
create or replace function public.tg_handle_new_user() returns trigger
language plpgsql security definer
as $$
begin
  insert into public.perfis (id, nome, papel)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'papel', 'assessor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.tg_handle_new_user();

-- ============ TRIGGER: atualizado_em ============
drop trigger if exists trg_perfis_at on public.perfis;
create trigger trg_perfis_at before update on public.perfis
  for each row execute procedure public.tg_atualizado_em();

-- ============ RLS ============
alter table public.perfis enable row level security;

-- Todo usuário autenticado vê a lista (pra mostrar quem fez o quê)
drop policy if exists "auth users read perfis" on public.perfis;
create policy "auth users read perfis" on public.perfis
  for select using (auth.uid() is not null);

-- Cada um pode atualizar o próprio NOME (mas não o próprio papel)
drop policy if exists "self update nome" on public.perfis;
create policy "self update nome" on public.perfis
  for update using (id = auth.uid())
  with check (id = auth.uid() and papel = (select papel from public.perfis where id = auth.uid()));

-- Admin pode INSERIR, ATUALIZAR e DELETAR qualquer perfil
drop policy if exists "admin manage perfis" on public.perfis;
create policy "admin manage perfis" on public.perfis
  for all using (public.is_admin()) with check (public.is_admin());

-- ============ Já cria perfis pra usuários que existem ============
insert into public.perfis (id, nome, papel)
  select id, coalesce(raw_user_meta_data->>'nome', split_part(email, '@', 1)), 'assessor'
  from auth.users
  on conflict (id) do nothing;

-- ============ FIM ============
-- Depois de criar o usuário marco@... no Studio Auth, eleve ele a admin:
--   update public.perfis set papel = 'admin' where id =
--     (select id from auth.users where email = 'marco@gabinete.local');
