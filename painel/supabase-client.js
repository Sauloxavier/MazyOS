// ============================================================
// Cliente Supabase do painel Marco Xavier
// ============================================================
// URL e ANON KEY ficam aqui (hardcoded pra simplificar deploy).
// Pra trocar, edita as duas constantes abaixo.
// ============================================================

window.MX_SB_CONFIG = {
  url: 'https://iamob-supabase.fqejv1.easypanel.host',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE',
  // service_role: usada SÓ pra criar/deletar usuários (admin-only).
  // Em produção, isso devia estar numa Edge Function. Hardcoded aqui pra simplificar dev.
  serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q',
};

window.MX_SB = (function () {
  let client = null;
  let cfg = null;
  let session = null;

  async function init(url, anonKey) {
    if (!url || !anonKey) { client = null; cfg = null; return null; }
    if (!window.supabase || !window.supabase.createClient) {
      throw new Error('SDK do Supabase não carregou. Verifique sua conexão com a internet ou se o script @supabase/supabase-js está no <head> do HTML.');
    }
    cfg = { url: url.replace(/\/+$/, ''), anonKey };
    client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        storage: window.localStorage,
        storageKey: 'mx_supabase_auth',
      },
    });
    const { data } = await client.auth.getSession();
    session = data.session;
    console.log('[supabase] cliente inicializado em', cfg.url, '— sessão:', session ? 'ativa' : 'sem sessão');
    return { client, session };
  }

  function isReady() { return !!client; }
  function getClient() { return client; }
  function getSession() { return session; }
  function getUser() { return session?.user || null; }

  async function login(email, password) {
    if (!client) throw new Error('Supabase não inicializado');
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    session = data.session;
    return session;
  }

  async function logout() {
    if (!client) return;
    await client.auth.signOut();
    session = null;
  }

  function onAuthChange(cb) {
    if (!client) return;
    client.auth.onAuthStateChange((_event, sess) => {
      session = sess;
      cb(sess);
    });
  }

  // === Eleitores ===
  // O DB usa snake_case (titulo_eleitor, local_votacao, criado_em).
  // O frontend usa camelCase (tituloEleitor, localVotacao, criadoEm).
  // Essas funções fazem a conversão.

  function dbToEleitor(r) {
    if (!r) return null;
    return {
      id: r.id,
      nome: r.nome,
      telefone: r.telefone || '',
      telefoneRes: r.telefone_res || '',
      cpf: r.cpf || '',
      sexo: r.sexo || '',
      nascimento: r.nascimento || '',
      bairro: r.bairro || '',
      endereco: r.endereco || '',
      cidade: r.cidade || 'Limeira',
      uf: r.uf || 'SP',
      email: r.email || '',
      redeSocial: r.rede_social || '',
      tituloEleitor: r.titulo_eleitor || '',
      localVotacao: r.local_votacao || '',
      envolvimento: r.envolvimento || 'Não trabalhado',
      marcadores: r.marcadores || [],
      nichos: r.nichos || [],
      obs: r.obs || '',
      ultimoContato: r.ultimo_contato || null,
      criadoEm: r.criado_em,
      atualizadoEm: r.atualizado_em,
    };
  }
  function eleitorToDb(e) {
    return {
      id: e.id || undefined,
      nome: e.nome,
      telefone: e.telefone || null,
      telefone_res: e.telefoneRes || null,
      cpf: e.cpf || null,
      sexo: e.sexo || null,
      nascimento: e.nascimento || null,
      bairro: e.bairro || null,
      endereco: e.endereco || null,
      cidade: e.cidade || null,
      uf: e.uf || null,
      email: e.email || null,
      rede_social: e.redeSocial || null,
      titulo_eleitor: e.tituloEleitor || null,
      local_votacao: e.localVotacao || null,
      envolvimento: e.envolvimento || 'Não trabalhado',
      marcadores: e.marcadores || [],
      nichos: e.nichos || [],
      obs: e.obs || null,
      ultimo_contato: e.ultimoContato || null,
    };
  }

  async function listarEleitores() {
    const { data, error } = await client.from('eleitores').select('*').order('nome');
    if (error) throw error;
    return (data || []).map(dbToEleitor);
  }
  async function salvarEleitor(e) {
    const payload = eleitorToDb(e);
    if (e.id) {
      const { data, error } = await client.from('eleitores').update(payload).eq('id', e.id).select().single();
      if (error) throw error;
      return dbToEleitor(data);
    } else {
      const { data, error } = await client.from('eleitores').insert(payload).select().single();
      if (error) throw error;
      return dbToEleitor(data);
    }
  }
  async function deletarEleitor(id) {
    const { error } = await client.from('eleitores').delete().eq('id', id);
    if (error) throw error;
  }

  // === Solicitações ===
  function dbToSolicitacao(r) {
    return {
      id: r.id,
      protocolo: r.protocolo,
      nome: r.nome,
      telefone: r.telefone || '',
      nascimento: r.nascimento || '',
      email: r.email || '',
      redeSocial: r.rede_social || '',
      bairro: r.bairro || '',
      tipo: r.tipo,
      descricao: r.descricao,
      endereco: r.endereco || '',
      consentimento: r.consentimento,
      enviadoEm: r.enviado_em,
      status: r.status,
      processadoEm: r.processado_em,
      eleitorId: r.eleitor_id,
      demandaId: r.demanda_id,
      origem: r.origem,
    };
  }
  function solicitacaoToDb(s) {
    return {
      protocolo: s.protocolo,
      nome: s.nome,
      telefone: s.telefone,
      nascimento: s.nascimento || null,
      email: s.email || null,
      rede_social: s.redeSocial || null,
      bairro: s.bairro || null,
      tipo: s.tipo,
      descricao: s.descricao,
      endereco: s.endereco || null,
      consentimento: !!s.consentimento,
      status: s.status || 'pendente',
      origem: s.origem || 'Site público',
    };
  }
  async function listarSolicitacoes() {
    const { data, error } = await client.from('solicitacoes').select('*').order('enviado_em', { ascending: false });
    if (error) throw error;
    return (data || []).map(dbToSolicitacao);
  }
  async function criarSolicitacao(s) {
    const { data, error } = await client.from('solicitacoes').insert(solicitacaoToDb(s)).select().single();
    if (error) throw error;
    return dbToSolicitacao(data);
  }
  async function atualizarSolicitacao(id, patch) {
    const dbPatch = {};
    if (patch.status !== undefined) dbPatch.status = patch.status;
    if (patch.processadoEm !== undefined) dbPatch.processado_em = patch.processadoEm;
    if (patch.eleitorId !== undefined) dbPatch.eleitor_id = patch.eleitorId;
    if (patch.demandaId !== undefined) dbPatch.demanda_id = patch.demandaId;
    const { data, error } = await client.from('solicitacoes').update(dbPatch).eq('id', id).select().single();
    if (error) throw error;
    return dbToSolicitacao(data);
  }

  // Realtime: callback é chamado quando uma nova solicitação é inserida
  function ouvirSolicitacoes(onInsert) {
    if (!client) return null;
    const channel = client
      .channel('solicitacoes-changes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'solicitacoes' },
        (payload) => onInsert(dbToSolicitacao(payload.new))
      )
      .subscribe();
    return channel;
  }

  // Realtime genérico: escuta INSERT/UPDATE/DELETE em qualquer tabela
  // callbacks: { onInsert(row), onUpdate(row), onDelete(id) }
  function ouvirTabela(tabela, callbacks = {}) {
    if (!client) return null;
    const ch = client.channel(`rt-${tabela}-${Math.random().toString(36).slice(2, 8)}`);
    if (callbacks.onInsert) {
      ch.on('postgres_changes', { event: 'INSERT', schema: 'public', table: tabela },
        (p) => callbacks.onInsert(p.new));
    }
    if (callbacks.onUpdate) {
      ch.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: tabela },
        (p) => callbacks.onUpdate(p.new));
    }
    if (callbacks.onDelete) {
      ch.on('postgres_changes', { event: 'DELETE', schema: 'public', table: tabela },
        (p) => callbacks.onDelete(p.old?.id));
    }
    ch.subscribe();
    return ch;
  }

  // Wrappers de realtime por entidade (já transformam o row do banco pro shape do app)
  function _ouvir(tabela, transformer, cbs) {
    return ouvirTabela(tabela, {
      onInsert: cbs?.onInsert ? (r) => cbs.onInsert(transformer(r)) : null,
      onUpdate: cbs?.onUpdate ? (r) => cbs.onUpdate(transformer(r)) : null,
      onDelete: cbs?.onDelete || null,
    });
  }
  const ouvirEleitores    = (cbs) => _ouvir('eleitores',    dbToEleitor,    cbs);
  const ouvirDemandas     = (cbs) => _ouvir('demandas',     dbToDemanda,    cbs);
  const ouvirCompromissos = (cbs) => _ouvir('compromissos', dbToCompromisso,cbs);
  const ouvirProposituras = (cbs) => _ouvir('proposituras', dbToPropositura,cbs);
  const ouvirEmendas      = (cbs) => _ouvir('emendas',      dbToEmenda,     cbs);
  const ouvirPerfis       = (cbs) => ouvirTabela('perfis', cbs);
  const ouvirConfig       = (cbs) => ouvirTabela('config', cbs);

  // Remove um canal (chamar no logout / unmount)
  function fecharCanal(channel) {
    if (channel && client) {
      try { client.removeChannel(channel); } catch {}
    }
  }

  // === Perfis / Usuários ===
  async function listarPerfis() {
    const { data, error } = await client.from('perfis').select('*').order('nome');
    if (error) throw error;
    return data || [];
  }
  async function meuPerfil() {
    if (!session?.user) return null;
    const { data, error } = await client.from('perfis').select('*').eq('id', session.user.id).maybeSingle();
    if (error) throw error;
    return data;
  }
  async function souAdmin() {
    const p = await meuPerfil();
    return p?.papel === 'admin' && p?.ativo;
  }
  async function atualizarPerfil(id, patch) {
    const { data, error } = await client.from('perfis').update(patch).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
  async function uploadAvatar(userId, file) {
    const ext = (file.name.split('.').pop() || 'png').toLowerCase();
    const path = `${userId}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await client.storage.from('avatars').upload(path, file, {
      contentType: file.type, upsert: true,
    });
    if (upErr) throw upErr;
    const { data: pub } = client.storage.from('avatars').getPublicUrl(path);
    const url = pub?.publicUrl;
    if (url) {
      await client.from('perfis').update({ avatar_url: url }).eq('id', userId);
    }
    return url;
  }

  // === Demandas / Atendimentos ===
  function dbToDemanda(r) {
    return {
      id: r.id,
      eleitorId: r.eleitor_id,
      tipo: r.tipo,
      status: r.status,
      orgaoResponsavel: r.orgao_responsavel || '',
      origem: r.origem || '',
      classificacao: r.classificacao || '',
      setor: r.setor || '',
      descricao: r.descricao,
      data: r.data,
      prazo: r.prazo || '',
      notas: r.notas || '',
      anexos: r.anexos_meta || [],
      chatId: r.chat_id || '',
      ultimaVisualizacao: r.ultima_visualizacao || null,
      criadoEm: r.criado_em,
      atualizadoEm: r.atualizado_em,
    };
  }
  function demandaToDb(d) {
    return {
      id: d.id || undefined,
      eleitor_id: d.eleitorId,
      tipo: d.tipo,
      status: d.status || 'Aberta',
      orgao_responsavel: d.orgaoResponsavel || null,
      origem: d.origem || null,
      classificacao: d.classificacao || null,
      setor: d.setor || null,
      descricao: d.descricao,
      data: d.data || new Date().toISOString().slice(0, 10),
      prazo: d.prazo || null,
      notas: d.notas || null,
      chat_id: d.chatId || null,
      anexos_meta: (d.anexos || []).map(a => ({ id: a.id, nome: a.nome, tipo: a.tipo, tamanho: a.tamanho, caminho: a.caminho })),
    };
  }
  async function listarDemandas() {
    const { data, error } = await client.from('demandas').select('*').order('data', { ascending: false });
    if (error) throw error;
    return (data || []).map(dbToDemanda);
  }
  async function salvarDemanda(d) {
    const payload = demandaToDb(d);
    if (d.id) {
      const { data, error } = await client.from('demandas').update(payload).eq('id', d.id).select().single();
      if (error) throw error;
      return dbToDemanda(data);
    } else {
      const { data, error } = await client.from('demandas').insert(payload).select().single();
      if (error) throw error;
      return dbToDemanda(data);
    }
  }
  async function deletarDemanda(id) {
    const { error } = await client.from('demandas').delete().eq('id', id);
    if (error) throw error;
  }

  async function listarHistoricoDemanda(demandaId) {
    const { data, error } = await client
      .from('demanda_historico')
      .select('*')
      .eq('demanda_id', demandaId)
      .order('criado_em', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  async function registrarVisualizacao(demandaId) {
    const { error } = await client.rpc('registrar_visualizacao', { p_demanda_id: demandaId });
    if (error) throw error;
  }

  // === Anexos (Storage + tabela) ===
  async function uploadAnexo(demandaId, file) {
    const path = `demanda/${demandaId}/${Date.now()}-${file.name}`;
    const { error: upErr } = await client.storage.from('anexos').upload(path, file, {
      contentType: file.type, upsert: false,
    });
    if (upErr) throw upErr;
    return {
      id: crypto.randomUUID(),
      nome: file.name,
      tipo: file.type,
      tamanho: file.size,
      caminho: path,
      addedAt: new Date().toISOString(),
    };
  }
  async function urlAnexo(caminho) {
    if (!caminho) return null;
    const { data } = await client.storage.from('anexos').createSignedUrl(caminho, 3600);
    return data?.signedUrl || null;
  }
  async function deletarAnexo(caminho) {
    if (!caminho) return;
    await client.storage.from('anexos').remove([caminho]);
  }

  // === Compromissos ===
  function dbToCompromisso(r) {
    return {
      id: r.id, titulo: r.titulo, data: r.data, hora: r.hora || '',
      local: r.local || '', descricao: r.descricao || '',
      cor: r.cor || '#1E5BBA', eleitorId: r.eleitor_id || '',
      criadoEm: r.criado_em,
    };
  }
  function compromissoToDb(c) {
    return {
      id: c.id || undefined,
      titulo: c.titulo, data: c.data, hora: c.hora || null,
      local: c.local || null, descricao: c.descricao || null,
      cor: c.cor || '#1E5BBA',
      eleitor_id: c.eleitorId || null,
    };
  }
  async function listarCompromissos() {
    const { data, error } = await client.from('compromissos').select('*').order('data');
    if (error) throw error;
    return (data || []).map(dbToCompromisso);
  }
  async function salvarCompromisso(c) {
    const payload = compromissoToDb(c);
    if (c.id) {
      const { data, error } = await client.from('compromissos').update(payload).eq('id', c.id).select().single();
      if (error) throw error;
      return dbToCompromisso(data);
    } else {
      const { data, error } = await client.from('compromissos').insert(payload).select().single();
      if (error) throw error;
      return dbToCompromisso(data);
    }
  }
  async function deletarCompromisso(id) {
    const { error } = await client.from('compromissos').delete().eq('id', id);
    if (error) throw error;
  }

  // === Proposituras ===
  function dbToPropositura(r) {
    return {
      id: r.id, tipo: r.tipo, numero: r.numero || '', ano: r.ano,
      titulo: r.titulo, descricao: r.descricao || '', status: r.status,
      dataProtocolo: r.data_protocolo || '', dataAprovacao: r.data_aprovacao || '',
      coautores: r.coautores || '', linkPdf: r.link_pdf || '',
      observacoes: r.observacoes || '', criadoEm: r.criado_em,
    };
  }
  function proposituraToDb(p) {
    return {
      id: p.id || undefined, tipo: p.tipo, numero: p.numero || null, ano: p.ano,
      titulo: p.titulo, descricao: p.descricao || null, status: p.status,
      data_protocolo: p.dataProtocolo || null, data_aprovacao: p.dataAprovacao || null,
      coautores: p.coautores || null, link_pdf: p.linkPdf || null,
      observacoes: p.observacoes || null,
    };
  }
  async function listarProposituras() {
    const { data, error } = await client.from('proposituras').select('*').order('data_protocolo', { ascending: false });
    if (error) throw error;
    return (data || []).map(dbToPropositura);
  }
  async function salvarPropositura(p) {
    const payload = proposituraToDb(p);
    if (p.id) {
      const { data, error } = await client.from('proposituras').update(payload).eq('id', p.id).select().single();
      if (error) throw error;
      return dbToPropositura(data);
    } else {
      const { data, error } = await client.from('proposituras').insert(payload).select().single();
      if (error) throw error;
      return dbToPropositura(data);
    }
  }
  async function deletarPropositura(id) {
    const { error } = await client.from('proposituras').delete().eq('id', id);
    if (error) throw error;
  }

  // === Emendas ===
  function dbToEmenda(r) {
    return {
      id: r.id, numero: r.numero || '', ano: r.ano, tipo: r.tipo,
      titulo: r.titulo, descricao: r.descricao || '', area: r.area || '',
      valor: Number(r.valor) || 0, beneficiario: r.beneficiario || '',
      status: r.status, dataProtocolo: r.data_protocolo || '',
      proposturaId: r.propositura_id || '', observacoes: r.observacoes || '',
      criadoEm: r.criado_em,
    };
  }
  function emendaToDb(e) {
    return {
      id: e.id || undefined, numero: e.numero || null, ano: e.ano, tipo: e.tipo,
      titulo: e.titulo, descricao: e.descricao || null, area: e.area || null,
      valor: Number(e.valor) || 0, beneficiario: e.beneficiario || null,
      status: e.status, data_protocolo: e.dataProtocolo || null,
      propositura_id: e.proposturaId || null, observacoes: e.observacoes || null,
    };
  }
  async function listarEmendas() {
    const { data, error } = await client.from('emendas').select('*').order('data_protocolo', { ascending: false });
    if (error) throw error;
    return (data || []).map(dbToEmenda);
  }
  async function salvarEmenda(e) {
    const payload = emendaToDb(e);
    if (e.id) {
      const { data, error } = await client.from('emendas').update(payload).eq('id', e.id).select().single();
      if (error) throw error;
      return dbToEmenda(data);
    } else {
      const { data, error } = await client.from('emendas').insert(payload).select().single();
      if (error) throw error;
      return dbToEmenda(data);
    }
  }
  async function deletarEmenda(id) {
    const { error } = await client.from('emendas').delete().eq('id', id);
    if (error) throw error;
  }

  // === Disparos em massa ===
  function dbToDisparo(r) {
    return {
      id: r.id,
      criadoEm: r.criado_em,
      criadoPor: r.criado_por || '',
      templateId: r.template_id || null,
      conteudo: r.conteudo || '',
      filtros: r.filtros || {},
      intervaloMin: r.intervalo_min || 0,
      intervaloMax: r.intervalo_max || 0,
      totalAlvos: r.total_alvos || 0,
      totalEnviados: r.total_enviados || 0,
      totalFalhas: r.total_falhas || 0,
      status: r.status || 'concluido',
      finalizadoEm: r.finalizado_em || null,
      log: r.log || [],
    };
  }
  function disparoToDb(d) {
    return {
      id: d.id || undefined,
      criado_em: d.criadoEm,
      criado_por: d.criadoPor || null,
      template_id: d.templateId || null,
      conteudo: d.conteudo || '',
      filtros: d.filtros || {},
      intervalo_min: d.intervaloMin || 0,
      intervalo_max: d.intervaloMax || 0,
      total_alvos: d.totalAlvos || 0,
      total_enviados: d.totalEnviados || 0,
      total_falhas: d.totalFalhas || 0,
      status: d.status || 'concluido',
      finalizado_em: d.finalizadoEm || null,
      log: d.log || [],
    };
  }
  async function listarDisparos() {
    const { data, error } = await client.from('disparos').select('*').order('criado_em', { ascending: false }).limit(50);
    if (error) throw error;
    return (data || []).map(dbToDisparo);
  }
  async function salvarDisparo(d) {
    const payload = disparoToDb(d);
    const { data, error } = await client.from('disparos').upsert(payload, { onConflict: 'id' }).select().single();
    if (error) throw error;
    return dbToDisparo(data);
  }
  async function deletarDisparo(id) {
    const { error } = await client.from('disparos').delete().eq('id', id);
    if (error) throw error;
  }

  // === Diagnósticos do mandato (IA analisa) ===
  async function listarDiagnosticos() {
    const { data, error } = await client.from('diagnosticos').select('*').order('criado_em', { ascending: false }).limit(20);
    if (error) throw error;
    return data || [];
  }
  async function salvarDiagnostico(d) {
    const payload = {
      id: d.id || undefined,
      criado_em: d.criadoEm || new Date().toISOString(),
      criado_por: d.criadoPor || null,
      periodo: d.periodo || null,
      conteudo: d.conteudo || '',
      metricas: d.metricas || {},
    };
    const { data, error } = await client.from('diagnosticos').upsert(payload, { onConflict: 'id' }).select().single();
    if (error) throw error;
    return data;
  }
  async function deletarDiagnostico(id) {
    const { error } = await client.from('diagnosticos').delete().eq('id', id);
    if (error) throw error;
  }

  // === Posts (Posts automáticos) ===
  async function listarPosts() {
    const { data, error } = await client.from('posts').select('*').order('criado_em', { ascending: false }).limit(100);
    if (error) throw error;
    return data || [];
  }
  async function salvarPost(p) {
    const payload = {
      id: p.id || undefined,
      criado_em: p.criadoEm || new Date().toISOString(),
      criado_por: p.criadoPor || null,
      tema: p.tema || '',
      formato: p.formato || 'feed',
      legenda: p.legenda || '',
      hashtags: p.hashtags || '',
      slides: p.slides || [],
      status: p.status || 'rascunho',
      agendadoPara: p.agendadoPara || null,
    };
    const { data, error } = await client.from('posts').upsert(payload, { onConflict: 'id' }).select().single();
    if (error) throw error;
    return data;
  }
  async function deletarPost(id) {
    const { error } = await client.from('posts').delete().eq('id', id);
    if (error) throw error;
  }

  // === Automações ===
  function dbToAutomacao(r) {
    return {
      id: r.id, nome: r.nome, descricao: r.descricao || '', tipo: r.tipo,
      ativo: !!r.ativo, gatilho: r.gatilho || {}, acao: r.acao || {},
      ultimaExecucao: r.ultima_execucao,
      totalExecucoes: r.total_execucoes || 0,
      totalFalhas: r.total_falhas || 0,
      criadoEm: r.criado_em, atualizadoEm: r.atualizado_em,
    };
  }
  function automacaoToDb(a) {
    return {
      id: a.id || undefined, nome: a.nome, descricao: a.descricao || null,
      tipo: a.tipo, ativo: !!a.ativo, gatilho: a.gatilho || {}, acao: a.acao || {},
    };
  }
  async function listarAutomacoes() {
    const { data, error } = await client.from('automacoes').select('*').order('criado_em', { ascending: false });
    if (error) throw error;
    return (data || []).map(dbToAutomacao);
  }
  async function salvarAutomacao(a) {
    const payload = automacaoToDb(a);
    if (a.id) {
      const { data, error } = await client.from('automacoes').update(payload).eq('id', a.id).select().single();
      if (error) throw error;
      return dbToAutomacao(data);
    } else {
      const { data, error } = await client.from('automacoes').insert(payload).select().single();
      if (error) throw error;
      return dbToAutomacao(data);
    }
  }
  async function deletarAutomacao(id) {
    const { error } = await client.from('automacoes').delete().eq('id', id);
    if (error) throw error;
  }
  async function logsAutomacao(automacaoId, limit = 50) {
    const { data, error } = await client.from('automacao_log')
      .select('*')
      .eq('automacao_id', automacaoId)
      .order('executado_em', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  // === Config (key-value JSONB) ===
  async function getConfig(chave) {
    const { data, error } = await client.from('config').select('valor').eq('chave', chave).maybeSingle();
    if (error) throw error;
    return data?.valor ?? null;
  }
  async function setConfig(chave, valor) {
    const { data, error } = await client.from('config').upsert({ chave, valor }, { onConflict: 'chave' }).select().single();
    if (error) throw error;
    return data;
  }
  async function getAllConfig() {
    const { data, error } = await client.from('config').select('chave, valor');
    if (error) throw error;
    const obj = {};
    (data || []).forEach(r => { obj[r.chave] = r.valor; });
    return obj;
  }

  // === Admin (usa service_role) ===
  // Cuidado: essas funções usam service_role, ignoram RLS.
  // Frontend só deveria expor isso pra admin (verifica no app).
  let adminClient = null;
  function getAdminClient() {
    if (adminClient) return adminClient;
    if (!window.MX_SB_CONFIG?.serviceKey) return null;
    if (!window.supabase) return null;
    adminClient = window.supabase.createClient(window.MX_SB_CONFIG.url, window.MX_SB_CONFIG.serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    });
    return adminClient;
  }

  async function criarUsuario({ email, password, nome, papel = 'assessor' }) {
    const admin = getAdminClient();
    if (!admin) throw new Error('Service role não configurado');
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nome, papel },
    });
    if (error) throw error;
    // Garante que o perfil tem os valores certos (o trigger pode ter usado defaults)
    try {
      await client.from('perfis').upsert({
        id: data.user.id, nome, papel, ativo: true,
      }, { onConflict: 'id' });
    } catch (e) { console.warn('[criarUsuario] upsert perfil avisou:', e); }
    return data.user;
  }

  async function deletarUsuario(userId) {
    const admin = getAdminClient();
    if (!admin) throw new Error('Service role não configurado');
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) throw error;
  }

  async function resetarSenhaUsuario(userId, novaSenha) {
    const admin = getAdminClient();
    if (!admin) throw new Error('Service role não configurado');
    const { error } = await admin.auth.admin.updateUserById(userId, { password: novaSenha });
    if (error) throw error;
  }

  return {
    init, isReady, getClient, getSession, getUser,
    login, logout, onAuthChange,
    listarEleitores, salvarEleitor, deletarEleitor,
    listarSolicitacoes, criarSolicitacao, atualizarSolicitacao, ouvirSolicitacoes,
    listarPerfis, meuPerfil, souAdmin, atualizarPerfil, uploadAvatar,
    criarUsuario, deletarUsuario, resetarSenhaUsuario,
    listarDemandas, salvarDemanda, deletarDemanda,
    listarHistoricoDemanda, registrarVisualizacao,
    uploadAnexo, urlAnexo, deletarAnexo,
    listarCompromissos, salvarCompromisso, deletarCompromisso,
    listarProposituras, salvarPropositura, deletarPropositura,
    listarEmendas, salvarEmenda, deletarEmenda,
    listarDisparos, salvarDisparo, deletarDisparo,
    listarDiagnosticos, salvarDiagnostico, deletarDiagnostico,
    listarPosts, salvarPost, deletarPost,
    listarAutomacoes, salvarAutomacao, deletarAutomacao, logsAutomacao,
    getConfig, setConfig, getAllConfig,
    ouvirTabela, fecharCanal,
    ouvirEleitores, ouvirDemandas, ouvirCompromissos,
    ouvirProposituras, ouvirEmendas, ouvirPerfis, ouvirConfig,
  };
})();
