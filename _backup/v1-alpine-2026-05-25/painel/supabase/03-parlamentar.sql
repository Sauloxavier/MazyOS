-- =====================================================================
-- Migração 03: Processos legislativos + Emendas
-- Rodar no SQL Editor depois do 02-usuarios.sql
-- =====================================================================

-- ============ TABELA: proposituras ============
create table if not exists public.proposituras (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,                  -- Projeto de Lei, Requerimento, Moção, Ofício, Indicação...
  numero text,
  ano int not null default extract(year from now()),
  titulo text not null,
  descricao text,
  status text not null default 'Em elaboração',
  data_protocolo date,
  data_aprovacao date,
  coautores text,
  link_pdf text,
  observacoes text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_proposituras_tipo on public.proposituras (tipo);
create index if not exists idx_proposituras_status on public.proposituras (status);
create index if not exists idx_proposituras_data on public.proposituras (data_protocolo desc);

-- ============ TABELA: emendas ============
create table if not exists public.emendas (
  id uuid primary key default gen_random_uuid(),
  numero text,
  ano int not null default extract(year from now()),
  tipo text not null default 'Emenda Impositiva',
  titulo text not null,
  descricao text,
  area text,
  valor numeric(15,2) default 0,
  beneficiario text,
  status text not null default 'Em elaboração',
  data_protocolo date,
  propositura_id uuid references public.proposituras(id) on delete set null,
  observacoes text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_emendas_status on public.emendas (status);
create index if not exists idx_emendas_propositura on public.emendas (propositura_id);

-- ============ TRIGGERS atualizado_em ============
drop trigger if exists trg_proposituras_at on public.proposituras;
create trigger trg_proposituras_at before update on public.proposituras
  for each row execute procedure public.tg_atualizado_em();

drop trigger if exists trg_emendas_at on public.emendas;
create trigger trg_emendas_at before update on public.emendas
  for each row execute procedure public.tg_atualizado_em();

-- ============ RLS ============
alter table public.proposituras enable row level security;
alter table public.emendas      enable row level security;

drop policy if exists "auth users full proposituras" on public.proposituras;
create policy "auth users full proposituras" on public.proposituras
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full emendas" on public.emendas;
create policy "auth users full emendas" on public.emendas
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ============ FIM ============
