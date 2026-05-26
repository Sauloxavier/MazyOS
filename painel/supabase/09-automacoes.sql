-- =====================================================================
-- Migração 09: Automações
-- - automacoes      — regras editáveis pelo painel (FUP, prospecção,
--                     boas-vindas, reativação)
-- - automacao_log   — histórico de execução de cada regra
-- Rodar no SQL Editor depois do 08-recursos-pro.sql
-- =====================================================================

create table if not exists public.automacoes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text,
  tipo text not null,            -- fup | reativacao | boas_vindas | aniversario | resposta_keyword
  ativo boolean not null default true,
  gatilho jsonb not null default '{}'::jsonb,
  -- gatilho exemplos:
  --   fup           : { dias_sem_movimento: 3, status_demanda: 'Em andamento' }
  --   reativacao    : { dias_sem_contato: 30, envolvimento: 'Conquistado' }
  --   boas_vindas   : { quando: 'novo_eleitor' }
  --   aniversario   : { dias_antes: 0 }
  --   resposta_keyword : { keywords: ['horario','funcionamento'], aplicar_em: 'mensagem_recebida' }
  acao jsonb not null default '{}'::jsonb,
  -- acao exemplos:
  --   { tipo: 'enviar_whatsapp', template_id: 'demanda-rec', so_horario: { de: 8, ate: 18 } }
  --   { tipo: 'enviar_whatsapp', conteudo_custom: 'Olá {{nome}}, ...' }
  --   { tipo: 'criar_compromisso', titulo: 'Ligar pra {{nome}}', dias_depois: 1 }
  --   { tipo: 'mudar_envolvimento', para: 'Em prospecção' }
  ultima_execucao timestamptz,
  total_execucoes int not null default 0,
  total_falhas int not null default 0,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid references auth.users(id) on delete set null
);

create index if not exists idx_automacoes_tipo on public.automacoes (tipo);
create index if not exists idx_automacoes_ativo on public.automacoes (ativo);

drop trigger if exists trg_automacoes_at on public.automacoes;
create trigger trg_automacoes_at before update on public.automacoes
  for each row execute procedure public.tg_atualizado_em();

-- Log de execução: cada acionamento gera uma linha
create table if not exists public.automacao_log (
  id uuid primary key default gen_random_uuid(),
  automacao_id uuid references public.automacoes(id) on delete cascade,
  eleitor_id uuid references public.eleitores(id) on delete set null,
  demanda_id uuid references public.demandas(id) on delete set null,
  status text not null default 'sucesso',   -- sucesso | falha | pulado
  detalhe text,
  executado_em timestamptz not null default now()
);

create index if not exists idx_autlog_aut on public.automacao_log (automacao_id, executado_em desc);
create index if not exists idx_autlog_eleitor on public.automacao_log (eleitor_id);

-- RLS
alter table public.automacoes    enable row level security;
alter table public.automacao_log enable row level security;

drop policy if exists "auth users full automacoes" on public.automacoes;
create policy "auth users full automacoes" on public.automacoes
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "auth users full automacao_log" on public.automacao_log;
create policy "auth users full automacao_log" on public.automacao_log
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- Seeds opcionais — automações úteis pro mandato (todas desativadas por padrão)
insert into public.automacoes (nome, descricao, tipo, ativo, gatilho, acao) values
  (
    'Boas-vindas a novo eleitor',
    'Manda uma mensagem 1h depois de cadastrar um eleitor novo (e que tem telefone).',
    'boas_vindas',
    false,
    '{"quando":"novo_eleitor","esperar_minutos":60}'::jsonb,
    '{"tipo":"enviar_whatsapp","template_id":"agradecimento"}'::jsonb
  ),
  (
    'FUP atendimento parado',
    'Se um atendimento ficar 3 dias em "Em andamento" sem ser atualizado, manda mensagem pro eleitor.',
    'fup',
    false,
    '{"dias_sem_movimento":3,"status_demanda":"Em andamento"}'::jsonb,
    '{"tipo":"enviar_whatsapp","template_id":"demanda-rec","so_horario":{"de":9,"ate":18}}'::jsonb
  ),
  (
    'Reativar conquistados frios',
    'Eleitores Conquistados sem contato há 60 dias: dispara um "como vai" no aniversário do bairro etc.',
    'reativacao',
    false,
    '{"dias_sem_contato":60,"envolvimento":"Conquistado"}'::jsonb,
    '{"tipo":"enviar_whatsapp","template_id":"convite-igreja"}'::jsonb
  ),
  (
    'Mensagem de aniversário',
    'Manda mensagem no dia do aniversário do eleitor (executa toda manhã às 9h).',
    'aniversario',
    false,
    '{"dias_antes":0}'::jsonb,
    '{"tipo":"enviar_whatsapp","template_id":"aniversario","so_horario":{"de":9,"ate":11}}'::jsonb
  )
on conflict do nothing;
