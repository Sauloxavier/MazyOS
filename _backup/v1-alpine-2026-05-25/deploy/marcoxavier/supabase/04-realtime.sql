-- =====================================================================
-- Migração 04: Habilitar Realtime nas tabelas principais
-- Rodar no SQL Editor depois do 03-parlamentar.sql
-- =====================================================================
-- Com isso, qualquer INSERT/UPDATE/DELETE é transmitido em tempo real
-- pros painéis abertos. Marco edita → assessor vê na hora.
-- =====================================================================

-- Helper: adiciona à publicação se ainda não estiver
do $$
declare
  t text;
  tabelas text[] := array['eleitores','demandas','anexos','compromissos','proposituras','emendas','perfis','config'];
begin
  foreach t in array tabelas loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception
      when duplicate_object then
        -- já estava na publicação, ignora
        null;
    end;
  end loop;
end $$;

-- Confere o que está habilitado:
select schemaname, tablename
  from pg_publication_tables
 where pubname = 'supabase_realtime'
 order by tablename;
