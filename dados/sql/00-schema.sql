-- ============================================================
-- MazyOS — Schema completo do Supabase
-- Roda esse SQL no SQL Editor pra garantir todas as tabelas
-- ============================================================
-- Idempotente: usa IF NOT EXISTS, pode rodar várias vezes sem quebrar.

-- =============== EXTENSÕES =====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============== TABELA: perfis ================
CREATE TABLE IF NOT EXISTS perfis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  email TEXT NOT NULL,
  papel TEXT NOT NULL DEFAULT 'assessor' CHECK (papel IN ('admin', 'assessor')),
  avatar_url TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_perfis_user_id ON perfis(user_id);

-- =============== TABELA: config ================
CREATE TABLE IF NOT EXISTS config (
  chave TEXT PRIMARY KEY,
  valor JSONB,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============== TABELA: eleitores =============
CREATE TABLE IF NOT EXISTS eleitores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  telefone TEXT,
  telefone_res TEXT,
  cpf TEXT,
  sexo TEXT,
  nascimento DATE,
  bairro TEXT,
  endereco TEXT,
  cidade TEXT DEFAULT 'Limeira',
  uf TEXT DEFAULT 'SP',
  email TEXT,
  rede_social TEXT,
  titulo_eleitor TEXT,
  local_votacao TEXT,
  envolvimento TEXT DEFAULT 'Não trabalhado',
  marcadores TEXT[] DEFAULT ARRAY[]::TEXT[],
  nichos TEXT[] DEFAULT ARRAY[]::TEXT[],
  obs TEXT,
  ultimo_contato TIMESTAMPTZ,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_eleitores_nome ON eleitores(nome);
CREATE INDEX IF NOT EXISTS idx_eleitores_telefone ON eleitores(telefone);
CREATE INDEX IF NOT EXISTS idx_eleitores_bairro ON eleitores(bairro);
CREATE INDEX IF NOT EXISTS idx_eleitores_envolvimento ON eleitores(envolvimento);

-- =============== TABELA: demandas ==============
CREATE TABLE IF NOT EXISTS demandas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  eleitor_id UUID NOT NULL REFERENCES eleitores(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Aberta',
  orgao_responsavel TEXT,
  origem TEXT,
  classificacao TEXT,
  setor TEXT,
  descricao TEXT NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  prazo DATE,
  notas TEXT,
  anexos_meta JSONB DEFAULT '[]'::jsonb,
  chat_id TEXT,
  ultima_visualizacao TIMESTAMPTZ,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_demandas_eleitor_id ON demandas(eleitor_id);
CREATE INDEX IF NOT EXISTS idx_demandas_status ON demandas(status);
CREATE INDEX IF NOT EXISTS idx_demandas_data ON demandas(data DESC);
CREATE INDEX IF NOT EXISTS idx_demandas_tipo ON demandas(tipo);

-- =============== TABELA: compromissos ==========
CREATE TABLE IF NOT EXISTS compromissos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  data DATE NOT NULL,
  hora TIME,
  local TEXT,
  descricao TEXT,
  cor TEXT NOT NULL DEFAULT '#1E5BBA',
  eleitor_id UUID REFERENCES eleitores(id) ON DELETE SET NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_compromissos_data ON compromissos(data);

-- =============== TABELA: proposituras ==========
CREATE TABLE IF NOT EXISTS proposituras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo TEXT NOT NULL,
  numero TEXT,
  ano INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT NOT NULL DEFAULT 'Em elaboração',
  data_protocolo DATE,
  data_aprovacao DATE,
  coautores TEXT,
  link_pdf TEXT,
  observacoes TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_proposituras_ano ON proposituras(ano DESC);
CREATE INDEX IF NOT EXISTS idx_proposituras_tipo ON proposituras(tipo);

-- =============== TABELA: emendas ===============
CREATE TABLE IF NOT EXISTS emendas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero TEXT,
  ano INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  tipo TEXT NOT NULL DEFAULT 'Emenda Impositiva',
  titulo TEXT NOT NULL,
  descricao TEXT,
  area TEXT,
  valor NUMERIC(14, 2) DEFAULT 0,
  beneficiario TEXT,
  status TEXT NOT NULL DEFAULT 'Em elaboração',
  data_protocolo DATE,
  propositura_id UUID REFERENCES proposituras(id) ON DELETE SET NULL,
  observacoes TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_emendas_ano ON emendas(ano DESC);

-- =============== TABELA: solicitacoes ==========
-- Recebe do site público
CREATE TABLE IF NOT EXISTS solicitacoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocolo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  nascimento DATE,
  email TEXT,
  rede_social TEXT,
  bairro TEXT,
  tipo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  endereco TEXT,
  consentimento BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'ignorado')),
  enviado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processado_em TIMESTAMPTZ,
  eleitor_id UUID REFERENCES eleitores(id) ON DELETE SET NULL,
  demanda_id UUID REFERENCES demandas(id) ON DELETE SET NULL,
  origem TEXT
);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_enviado ON solicitacoes(enviado_em DESC);

-- =============== TABELA: disparos ==============
-- Histórico de disparos em massa
CREATE TABLE IF NOT EXISTS disparos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  criado_por TEXT,
  template_id TEXT,
  conteudo TEXT,
  filtros JSONB,
  modo TEXT,
  intervalo_min INTEGER,
  intervalo_max INTEGER,
  total_alvos INTEGER,
  total_enviados INTEGER DEFAULT 0,
  total_falhas INTEGER DEFAULT 0,
  status TEXT DEFAULT 'rodando',
  log JSONB DEFAULT '[]'::jsonb,
  finalizado_em TIMESTAMPTZ
);

-- =============== TRIGGERS pra atualizado_em ====
CREATE OR REPLACE FUNCTION trigger_set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_atualizado_em_eleitores ON eleitores;
CREATE TRIGGER set_atualizado_em_eleitores
  BEFORE UPDATE ON eleitores
  FOR EACH ROW EXECUTE FUNCTION trigger_set_atualizado_em();

DROP TRIGGER IF EXISTS set_atualizado_em_demandas ON demandas;
CREATE TRIGGER set_atualizado_em_demandas
  BEFORE UPDATE ON demandas
  FOR EACH ROW EXECUTE FUNCTION trigger_set_atualizado_em();

-- =============== RLS (Row Level Security) =====
-- Por padrão, apenas usuários autenticados acessam.
-- Pra deixar simples (gabinete único), todos os autenticados veem tudo.

ALTER TABLE eleitores ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandas ENABLE ROW LEVEL SECURITY;
ALTER TABLE compromissos ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE emendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE disparos ENABLE ROW LEVEL SECURITY;

-- Policies: autenticados podem tudo
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN VALUES ('eleitores'), ('demandas'), ('compromissos'),
                    ('proposituras'), ('emendas'), ('config'),
                    ('perfis'), ('disparos')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS auth_all ON %I', tbl);
    EXECUTE format(
      'CREATE POLICY auth_all ON %I FOR ALL TO authenticated USING (true) WITH CHECK (true)',
      tbl
    );
  END LOOP;
END $$;

-- Solicitações: anon pode INSERT (vem do site público)
DROP POLICY IF EXISTS anon_insert_solicitacoes ON solicitacoes;
CREATE POLICY anon_insert_solicitacoes ON solicitacoes
  FOR INSERT TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS auth_all_solicitacoes ON solicitacoes;
CREATE POLICY auth_all_solicitacoes ON solicitacoes
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ============================================================
-- Pronto! Roda esse SQL e o schema está completo.
-- ============================================================
