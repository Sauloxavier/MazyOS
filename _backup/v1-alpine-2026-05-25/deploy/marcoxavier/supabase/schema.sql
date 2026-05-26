-- =====================================================================
-- Painel Gabinete Marco Xavier — Schema Supabase
-- Rodar uma vez no SQL Editor do Supabase Studio
-- =====================================================================

-- ============ EXTENSIONS ============
create extension if not exists "pgcrypto";

-- ============ TABELA: eleitores ============
create table if not exists public.eleitores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text,
  telefone_res text,
  cpf text,
  sexo text,
  nascimento date,
  bairro text,
  endereco text,
  cidade text default 'Limeira',
  uf text default 'SP',
  email text,
  rede_social text,
  titulo_eleitor text,
  local_votacao text,
  envolvimento text default 'Não trabalhado',
  marcadores text[] default '{}',
  nichos text[] default '{}',
  obs text,
  ultimo_contato date,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_eleitores_nome on public.eleitores (lower(nome));
create index if not exists idx_eleitores_bairro on public.eleitores (bairro);
create index if not exists idx_eleitores_envolvimento on public.eleitores (envolvimento);
create index if not exists idx_eleitores_marcadores on public.eleitores using gin (marcadores);
create index if not exists idx_eleitores_nichos on public.eleitores using gin (nichos);
create index if not exists idx_eleitores_aniversario on public.eleitores (
  (extract(month from nascimento)),
  (extract(day from nascimento))
);

-- ============ TABELA: demandas ============
create table if not exists public.demandas (
  id uuid primary key default gen_random_uuid(),
  eleitor_id uuid references public.eleitores(id) on delete cascade,
  tipo text not null,
  status text not null default 'Aberta',
  orgao_responsavel text,
  origem text,
  classificacao text,
  setor text,
  descricao text not null,
  data date not null default current_date,
  prazo date,
  notas text,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_demandas_eleitor on public.demandas (eleitor_id);
create index if not exists idx_demandas_status on public.demandas (status);
create index if not exists idx_demandas_data on public.demandas (data desc);
create index if not exists idx_demandas_orgao on public.demandas (orgao_responsavel);

-- ============ TABELA: solicitacoes (formulário público) ============
create table if not exists public.solicitacoes (
  id uuid primary key default gen_random_uuid(),
  protocolo text not null,
  nome text not null,
  telefone text,
  nascimento date,
  email text,
  rede_social text,
  bairro text,
  tipo text not null,
  descricao text not null,
  endereco text,
  consentimento boolean default false,
  status text not null default 'pendente', -- pendente | aceito | ignorado
  origem text default 'Site público',
  enviado_em timestamptz default now(),
  processado_em timestamptz,
  eleitor_id uuid references public.eleitores(id) on delete set null,
  demanda_id uuid references public.demandas(id) on delete set null
);

create index if not exists idx_solicitacoes_status on public.solicitacoes (status);
create index if not exists idx_solicitacoes_enviado on public.solicitacoes (enviado_em desc);
create index if not exists idx_solicitacoes_protocolo on public.solicitacoes (protocolo);

-- ============ TABELA: compromissos ============
create table if not exists public.compromissos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  data date not null,
  hora time,
  local text,
  descricao text,
  cor text default '#1E5BBA',
  eleitor_id uuid references public.eleitores(id) on delete set null,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_compromissos_data on public.compromissos (data);

-- ============ TABELA: anexos ============
-- caminho aponta pro objeto no Supabase Storage (bucket "anexos")
create table if not exists public.anexos (
  id uuid primary key default gen_random_uuid(),
  demanda_id uuid references public.demandas(id) on delete cascade,
  nome text not null,
  tipo text,
  tamanho bigint,
  caminho text not null,
  criado_em timestamptz default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_anexos_demanda on public.anexos (demanda_id);

-- ============ TABELA: config (key-value JSONB) ============
-- guarda mensagensPadrao, marcadores, nichos, nome_vereador, proxima_eleicao
create table if not exists public.config (
  chave text primary key,
  valor jsonb not null,
  atualizado_em timestamptz default now()
);

-- ============ TRIGGER: atualizado_em ============
create or replace function public.tg_atualizado_em() returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_eleitores_at on public.eleitores;
create trigger trg_eleitores_at before update on public.eleitores
  for each row execute procedure public.tg_atualizado_em();

drop trigger if exists trg_demandas_at on public.demandas;
create trigger trg_demandas_at before update on public.demandas
  for each row execute procedure public.tg_atualizado_em();

drop trigger if exists trg_config_at on public.config;
create trigger trg_config_at before update on public.config
  for each row execute procedure public.tg_atualizado_em();

drop trigger if exists trg_compromissos_at on public.compromissos;
create trigger trg_compromissos_at before update on public.compromissos
  for each row execute procedure public.tg_atualizado_em();

-- ============ RLS — Row Level Security ============
-- Política: qualquer usuário autenticado pode ler e escrever (gabinete pequeno, todos colaboram).
-- Se quiser restringir por papel depois, adiciono.

alter table public.eleitores     enable row level security;
alter table public.demandas      enable row level security;
alter table public.anexos        enable row level security;
alter table public.config        enable row level security;
alter table public.solicitacoes  enable row level security;
alter table public.compromissos  enable row level security;

drop policy if exists "auth users full eleitores" on public.eleitores;
create policy "auth users full eleitores" on public.eleitores
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full demandas" on public.demandas;
create policy "auth users full demandas" on public.demandas
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full anexos" on public.anexos;
create policy "auth users full anexos" on public.anexos
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full config" on public.config;
create policy "auth users full config" on public.config
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full compromissos" on public.compromissos;
create policy "auth users full compromissos" on public.compromissos
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- Solicitações: público (anon) pode INSERIR (pra formulário sem login funcionar).
-- Usuários autenticados podem ler/atualizar/deletar.
drop policy if exists "anyone can insert solicitacoes" on public.solicitacoes;
create policy "anyone can insert solicitacoes" on public.solicitacoes
  for insert with check (true);

drop policy if exists "auth users read solicitacoes" on public.solicitacoes;
create policy "auth users read solicitacoes" on public.solicitacoes
  for select using (auth.uid() is not null);

drop policy if exists "auth users update solicitacoes" on public.solicitacoes;
create policy "auth users update solicitacoes" on public.solicitacoes
  for update using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users delete solicitacoes" on public.solicitacoes;
create policy "auth users delete solicitacoes" on public.solicitacoes
  for delete using (auth.uid() is not null);

-- Realtime: precisamos publicar a tabela solicitacoes
alter publication supabase_realtime add table public.solicitacoes;

-- ============ STORAGE — bucket "anexos" ============
-- Criar via Studio: Storage → New bucket → Name: "anexos" → Public: OFF
-- Depois rodar isso pra liberar acesso aos autenticados:

insert into storage.buckets (id, name, public)
  values ('anexos', 'anexos', false)
  on conflict (id) do nothing;

drop policy if exists "auth read anexos" on storage.objects;
create policy "auth read anexos" on storage.objects
  for select using (bucket_id = 'anexos' and auth.uid() is not null);

drop policy if exists "auth write anexos" on storage.objects;
create policy "auth write anexos" on storage.objects
  for insert with check (bucket_id = 'anexos' and auth.uid() is not null);

drop policy if exists "auth delete anexos" on storage.objects;
create policy "auth delete anexos" on storage.objects
  for delete using (bucket_id = 'anexos' and auth.uid() is not null);

-- ============ SEED — config inicial ============
insert into public.config (chave, valor) values
  ('nome_vereador', '"Marco Xavier"'::jsonb),
  ('proxima_eleicao', '"2028-10-01"'::jsonb),
  ('marcadores', '["Liderança","Pai","Mãe","Cônjuge","Voluntário","Doador"]'::jsonb),
  ('nichos', '["Católico Sta Luzia","Atendido pelo gabinete","Tiro de Guerra 94","Romeiro","Vista Alegre","Novo Horizonte","Nova Suíça","Família","Voluntariado"]'::jsonb),
  ('mensagens_padrao', '[
    {"id":"aniversario","nome":"Aniversário","categoria":"Aniversário","conteudo":"Olá {{nome}}! Hoje é seu dia! 🎉\nQue Deus abençoe sua vida e sua família. Conta comigo aqui no gabinete pra o que precisar.\n— Marco Xavier"},
    {"id":"agradecimento","nome":"Agradecimento","categoria":"Geral","conteudo":"Olá {{nome}}, tudo bem? Passando pra agradecer o seu contato. Conta comigo sempre que precisar.\n— Marco Xavier"},
    {"id":"demanda-rec","nome":"Demanda recebida","categoria":"Atendimento","conteudo":"Olá {{nome}}! Recebemos sua solicitação aqui no gabinete. Já estamos encaminhando e te aviso assim que tiver retorno.\n— Equipe Marco Xavier"},
    {"id":"demanda-res","nome":"Demanda resolvida","categoria":"Atendimento","conteudo":"Olá {{nome}}! Boa notícia: sua solicitação foi atendida. Qualquer coisa, conta comigo.\n— Marco Xavier"},
    {"id":"convite-igreja","nome":"Convite — Sta Luzia","categoria":"Comunidade","conteudo":"Oi {{nome}}! Tem celebração na nossa Paróquia Santa Luzia esta semana. Conto com você! 🙏\n— Marco Xavier"}
  ]'::jsonb)
on conflict (chave) do nothing;

-- ============ FIM ============
-- Próximo passo: criar usuários no Authentication → Users do Supabase Studio
-- (Marco + assessor 1 + assessor 2, com email e senha)
