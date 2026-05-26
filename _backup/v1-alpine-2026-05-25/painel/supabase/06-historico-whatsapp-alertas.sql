-- =====================================================================
-- Migração 06: Histórico de demandas + Link WhatsApp + Visualizações
-- =====================================================================

-- ============ 1. Coluna chat_id em demandas ============
alter table public.demandas add column if not exists chat_id text;
alter table public.demandas add column if not exists ultima_visualizacao timestamptz;
alter table public.eleitores add column if not exists ultimo_contato date;

-- ============ 2. Tabela de histórico ============
create table if not exists public.demanda_historico (
  id uuid primary key default gen_random_uuid(),
  demanda_id uuid not null references public.demandas(id) on delete cascade,
  acao text not null,                  -- 'criada' | 'atualizada' | 'status' | 'nota' | 'anexo' | 'visualizada'
  campo text,                          -- coluna alterada (status, descricao, etc.)
  valor_antigo text,
  valor_novo text,
  feito_por uuid references auth.users(id) on delete set null,
  criado_em timestamptz default now()
);

create index if not exists idx_historico_demanda on public.demanda_historico (demanda_id, criado_em desc);

-- ============ 3. Trigger: registra alterações automaticamente ============
create or replace function public.tg_demanda_historico() returns trigger
language plpgsql security definer as $$
declare
  v_uid uuid := coalesce(auth.uid(), null);
begin
  if tg_op = 'INSERT' then
    insert into public.demanda_historico (demanda_id, acao, valor_novo, feito_por)
    values (new.id, 'criada', new.descricao, v_uid);
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if old.status is distinct from new.status then
      insert into public.demanda_historico (demanda_id, acao, campo, valor_antigo, valor_novo, feito_por)
      values (new.id, 'status', 'status', old.status, new.status, v_uid);
    end if;
    if old.descricao is distinct from new.descricao then
      insert into public.demanda_historico (demanda_id, acao, campo, valor_antigo, valor_novo, feito_por)
      values (new.id, 'atualizada', 'descricao', left(coalesce(old.descricao,''), 200), left(coalesce(new.descricao,''), 200), v_uid);
    end if;
    if old.notas is distinct from new.notas then
      insert into public.demanda_historico (demanda_id, acao, campo, valor_antigo, valor_novo, feito_por)
      values (new.id, 'nota', 'notas', left(coalesce(old.notas,''), 200), left(coalesce(new.notas,''), 200), v_uid);
    end if;
    if old.orgao_responsavel is distinct from new.orgao_responsavel then
      insert into public.demanda_historico (demanda_id, acao, campo, valor_antigo, valor_novo, feito_por)
      values (new.id, 'atualizada', 'orgao_responsavel', old.orgao_responsavel, new.orgao_responsavel, v_uid);
    end if;
    if old.prazo is distinct from new.prazo then
      insert into public.demanda_historico (demanda_id, acao, campo, valor_antigo, valor_novo, feito_por)
      values (new.id, 'atualizada', 'prazo', old.prazo::text, new.prazo::text, v_uid);
    end if;
    return new;
  end if;

  return null;
end $$;

drop trigger if exists trg_demandas_hist on public.demandas;
create trigger trg_demandas_hist
  after insert or update on public.demandas
  for each row execute function public.tg_demanda_historico();

-- ============ 4. RLS no histórico ============
alter table public.demanda_historico enable row level security;
drop policy if exists "auth users read historico" on public.demanda_historico;
create policy "auth users read historico" on public.demanda_historico
  for select using (auth.uid() is not null);
drop policy if exists "auth users insert historico" on public.demanda_historico;
create policy "auth users insert historico" on public.demanda_historico
  for insert with check (auth.uid() is not null);

-- ============ 5. Função registrar visualização manual ============
create or replace function public.registrar_visualizacao(p_demanda_id uuid) returns void
language plpgsql security definer as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then return; end if;
  update public.demandas set ultima_visualizacao = now() where id = p_demanda_id;
  insert into public.demanda_historico (demanda_id, acao, feito_por)
  values (p_demanda_id, 'visualizada', v_uid);
end $$;

-- ============ 6. Realtime do histórico ============
do $$ begin
  perform 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'demanda_historico';
  if not found then
    alter publication supabase_realtime add table public.demanda_historico;
  end if;
end $$;

-- ============ FIM ============
-- Atualiza configuração padrão: alerta vira 15 dias
insert into public.config (chave, valor) values ('dias_sem_contato', '15'::jsonb)
on conflict (chave) do update set valor = '15'::jsonb;
