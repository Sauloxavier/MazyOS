-- =====================================================================
-- Migração 08: Recursos Pro
-- - disparos       — histórico de disparos em massa via WhatsApp (WAHA)
-- - diagnosticos   — diagnósticos do mandato (IA analisa)
-- - posts          — posts automáticos (carrosséis/legendas)
-- Rodar no SQL Editor depois do 07-avatar-usuario.sql
-- =====================================================================

-- ============ TABELA: disparos ============
create table if not exists public.disparos (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  criado_por text,                         -- nome / email do operador
  template_id text,                        -- id do template (mensagensPadrao) ou null se custom
  conteudo text not null,                  -- corpo final com variáveis ({{nome}}…)
  filtros jsonb not null default '{}'::jsonb, -- bairro, nicho, envolvimento, marcador, somenteComTelefone
  intervalo_min int not null default 8,
  intervalo_max int not null default 20,
  total_alvos int not null default 0,
  total_enviados int not null default 0,
  total_falhas int not null default 0,
  status text not null default 'concluido', -- rodando | concluido | cancelado
  finalizado_em timestamptz,
  log jsonb not null default '[]'::jsonb    -- [{ eleitorId, nome, telefone, status, erro, em }]
);

create index if not exists idx_disparos_criado on public.disparos (criado_em desc);
create index if not exists idx_disparos_status on public.disparos (status);

-- ============ TABELA: diagnosticos ============
create table if not exists public.diagnosticos (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  criado_por text,
  periodo text,                            -- ex: "30d", "ytd", "mandato"
  conteudo text not null,                  -- markdown do diagnóstico
  metricas jsonb not null default '{}'::jsonb
);

create index if not exists idx_diagnosticos_criado on public.diagnosticos (criado_em desc);

-- ============ TABELA: posts ============
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  criado_por text,
  tema text not null,
  formato text not null default 'feed',    -- feed | carrossel | story | reels
  legenda text,
  hashtags text,
  slides jsonb not null default '[]'::jsonb, -- [{ titulo, subtitulo, corpo, cor }]
  status text not null default 'rascunho', -- rascunho | aprovado | publicado
  agendado_para timestamptz
);

create index if not exists idx_posts_criado on public.posts (criado_em desc);
create index if not exists idx_posts_status on public.posts (status);

-- ============ RLS ============
alter table public.disparos     enable row level security;
alter table public.diagnosticos enable row level security;
alter table public.posts        enable row level security;

drop policy if exists "auth users full disparos" on public.disparos;
create policy "auth users full disparos" on public.disparos
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full diagnosticos" on public.diagnosticos;
create policy "auth users full diagnosticos" on public.diagnosticos
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full posts" on public.posts;
create policy "auth users full posts" on public.posts
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- ============ FIM ============
