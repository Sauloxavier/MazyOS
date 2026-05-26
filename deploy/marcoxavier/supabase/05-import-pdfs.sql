-- =====================================================================
-- Migração 05: Importação dos dados dos PDFs do Marco
-- "0 Tarefas 2026 - Cadastro Endereço.pdf"
-- "0 Tarefas 2026 - Tarefas.pdf"
-- Rodar no SQL Editor depois das outras migrações
-- =====================================================================

-- ============ ELEITORES (do Cadastro Endereço + dos Atendimentos) ============
-- Usa ON CONFLICT pra não duplicar quando rodar de novo

-- Helper: cria função que insere eleitor de forma idempotente
create or replace function public._import_eleitor(
  p_nome text, p_telefone text, p_endereco text, p_bairro text,
  p_nascimento date default null, p_nichos text[] default '{}',
  p_obs text default null
) returns uuid language plpgsql as $$
declare
  v_id uuid;
begin
  -- procura por telefone existente (limpo)
  select id into v_id from public.eleitores
    where regexp_replace(coalesce(telefone,''), '\D', '', 'g') =
          regexp_replace(coalesce(p_telefone,''), '\D', '', 'g')
      and regexp_replace(coalesce(p_telefone,''), '\D', '', 'g') <> ''
    limit 1;

  if v_id is not null then return v_id; end if;

  -- senão, procura por nome exato
  select id into v_id from public.eleitores where lower(nome) = lower(p_nome) limit 1;
  if v_id is not null then return v_id; end if;

  -- insere novo
  insert into public.eleitores (nome, telefone, endereco, bairro, nascimento, nichos, obs, envolvimento)
    values (p_nome, p_telefone, p_endereco, p_bairro, p_nascimento, p_nichos, p_obs, 'Em prospecção')
    returning id into v_id;
  return v_id;
end $$;

-- === Cadastro Endereço (3 contatos) ===
select public._import_eleitor(
  'Nara Maria Araujo Santos', '19987694424',
  'Henrique Del Bianco, 184', 'Jd Novo Horizonte',
  '1974-07-28'::date, array['SJE'], 'naraaraujo@'
);
select public._import_eleitor(
  'Bruno / Primo MX', '1999646403468',
  'Doutor Aguinaldo de Lima Viote Junior, 68', 'Nossa Senhora das Dores',
  null, array['Família'], null
);
select public._import_eleitor(
  'Reginaldo Batista Alves', '1999646403468',
  'Doutor Aguinaldo de Lima Viote Junior, 68', 'Nossa Senhora das Dores',
  null, array['Contato Novo'], 'obs. vizinho bruno/primo mx — telefone de recado'
);

-- === Atendimentos (Tarefas) — primeiro os eleitores que ainda não existem ===

-- Bloco de import dos atendimentos: cria eleitor (se novo) + demanda
do $$
declare
  v_id uuid;
  v_marco uuid;
  v_lista record;
  v_count int := 0;
begin
  -- pega o ID do Marco pra atribuir como criado_por (se existir)
  select id into v_marco from auth.users where email like 'marcoxavier%' limit 1;

  for v_lista in
    select * from (values
      -- (assunto, status, assessoria, data_inicio, nome, telefone, pedido, observacao, grupo, data_termino, protocolo)
      ('Saúde',          'Resolvida',     'Leandro',       '2026-05-17'::date, 'Rayza Cerqueira',   '19981311500', 'Cuidados para indicação',                      'Chacara Antoneta',                                 'Já Eleitor', '2026-05-19'::date, null),
      ('Saúde',          'Resolvida',     'Marco',         '2026-05-18'::date, 'Melissa',           '19982453661', 'Transferência da UPA para Santa Casa',         'Amigo do Cassiano do Pedro',                       'Indicação',  '2026-05-18'::date, null),
      ('Saúde',          'Resolvida',     'Marco',         '2026-05-19'::date, 'Vanda',             '19987181928', 'Consulta Dra Mayra',                           'Restaurante Cantinho do Centro',                   'Já Eleitor', null,               null),
      ('Doação',         'Resolvida',     'Marco',         '2026-05-21'::date, 'Marco Marinovet',   '19998523095', 'Prenda em R$',                                 'Bingo Beneficente',                                'Maria Promessa', null,           null),
      ('Educação',       'Em andamento',  'Leandro',       '2026-05-19'::date, 'Ana Ferreira',      '19981411710', 'Vaga de Creche',                               'Neta da Rosana Bizicoso',                          'Indicação',  null,               null),
      ('Iluminação',     'Em andamento',  'Leandro',       '2026-05-19'::date, 'Diogenes Carvalho', '19998774248', 'Lâmpada',                                       'Av Anaceci',                                       'Já Eleitor', null,               '3068830/exoxre'),
      ('Iluminação',     'Em andamento',  'Leandro',       '2026-05-19'::date, 'Ricardo Vale',      '19998851634', 'Lâmpadas',                                     'Vega da Esperança',                                'Já Eleitor', null,               '3068950/ exoxre'),
      ('Drogas',         'Em andamento',  'Marco',         '2026-05-20'::date, 'Ze da Edna',        '19971421562', 'Perfil Festa Paulina',                         null,                                               'Já Eleitor', null,               null),
      ('Mobilidade Urbana','Em andamento','MarcoVal',      '2026-05-20'::date, 'Del',               '19987273714', 'Fechamento de Rua',                            null,                                               'MCCSL - Já Eleitor', null,        'Ofício'),
      ('Obras',          'Em andamento',  'Leandro',       '2026-05-20'::date, 'Lucas Ribeiro',     '19983207309', 'Buraco',                                       'São Simão',                                        'Já Eleitor', null,               'Indicação'),
      ('Iluminação',     'Em andamento',  'Marco/Leandro', '2026-05-20'::date, 'Lourdes Egidio',    '19981315961', 'Iluminação',                                   '(rua Eduardo Graf - 170 Tenoindo Neves) — Sta Luzia já Eleitor', 'Sta Luzia - Já Eleitor', null, '3072425/exoxre'),
      ('Meio Ambiente',  'Em andamento',  'Marco/Leandro', '2026-05-20'::date, 'Odete do Ricardo',  '19987128886', 'Poda',                                         '(Rua Natalio Bernal Sampaio Vila A 308 Jd Anhanguera)', 'Sto Agostinho - Já Eleitor', null,  'Indicação'),
      ('Meio Ambiente',  'Em andamento',  'MarcoVal',      '2026-05-22'::date, '3-Maria Maria',     '19987814424', 'Assistência',                                   null,                                               'Stp Agostinho da Lima Viola Junior numero 68', null, null),
      ('Social',         'Em andamento',  'MarcoVal',      '2026-05-22'::date, 'Renato / TG',       '19986201210', 'Abandono Animal',                              'Chácara área sul',                                 'TG',         null,               null),
      ('Saúde Animal',   'Não iniciada',  'Leandro',       '2026-05-19'::date, 'Ricardo Valle',     '19986601634', 'Remoção de árvore',                            'Av Laranjeiras',                                   'Já Eleitor', null,               'Protocolo: 158 3074703'),
      ('Mobilidade Urbana','Não iniciada','Marco',         '2026-05-20'::date, 'Adenor',             '19984883097', 'Repintura da Ciclovia',                        null,                                               'Já Eleitor', null,               null),
      ('Meio Ambiente',  'Não iniciada',  'Marco',         '2026-05-20'::date, 'Fabricio - Mayra',  '19984148087', 'Poda/Retirada Árvore',                         'Ja pediu Nilton e Heitor',                         'Romeiro',    null,               'Heitor faz exoxre')
    ) as t(assunto, status, assessoria, data_inicio, nome, telefone, pedido, observacao, grupo, data_termino, protocolo)
  loop
    v_id := public._import_eleitor(v_lista.nome, v_lista.telefone, null, null, null, array[v_lista.grupo]::text[], null);

    insert into public.demandas (
      eleitor_id, tipo, status, descricao, data, origem, classificacao, setor, notas, criado_por
    ) values (
      v_id,
      v_lista.assunto,
      case v_lista.status
        when 'Resolvida'    then 'Resolvida'
        when 'Não iniciada' then 'Aberta'
        else 'Em andamento'
      end,
      v_lista.pedido,
      v_lista.data_inicio,
      'Presencial',
      v_lista.grupo,
      v_lista.assunto,
      concat_ws(E'\n',
        'Assessoria: ' || v_lista.assessoria,
        case when v_lista.data_termino is not null then 'Data término: ' || to_char(v_lista.data_termino, 'DD/MM/YYYY') else null end,
        case when v_lista.observacao is not null then 'Observação: ' || v_lista.observacao else null end,
        case when v_lista.protocolo is not null then 'Protocolo: ' || v_lista.protocolo else null end
      ),
      v_marco
    );
    v_count := v_count + 1;
  end loop;

  raise notice '✅ Importados % atendimentos', v_count;
end $$;

-- ============ Confere ============
select 'eleitores' as tabela, count(*) from public.eleitores
union all
select 'demandas',           count(*) from public.demandas
order by tabela;
