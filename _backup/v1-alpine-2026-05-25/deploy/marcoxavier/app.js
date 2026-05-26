function painel() {
  return {
    view: 'inicio',
    menuOpen: false,
    sidebarCollapsed: false,
    openGroup: null,
    buscaGlobal: '',

    nav: [
      { id: 'inicio',       label: 'Início',       icon: 'home' },
      { id: 'envolvimento', label: 'Envolvimento', icon: 'spark' },
      { id: 'painel',       label: 'Painel Geral', icon: 'grid' },
      { id: 'inbox',         label: 'Caixa de Entrada', icon: 'inbox' },
      { id: 'notificacoes',  label: 'Notificações',    icon: 'bell' },
      { id: 'agenda',        label: 'Agenda',           icon: 'cal' },
      { group: 'cadastro', label: 'Cadastro', icon: 'users', items: [
        { id: 'eleitores',  label: 'Eleitores' },
        { id: 'demandas',   label: 'Atendimentos' },
        { id: 'importar',   label: 'Importar CSV' },
      ]},
      { group: 'comunicacao', label: 'Comunicação', icon: 'chat', items: [
        { id: 'conversas',       label: 'Conversas' },
        { id: 'whatsapp',        label: 'Conexão WhatsApp' },
        { id: 'aniversariantes', label: 'Aniversariantes' },
      ]},
      { group: 'parlamentar', label: 'Parlamentar', icon: 'doc', items: [
        { id: 'proposituras', label: 'Processos legislativos' },
        { id: 'emendas',      label: 'Emendas' },
      ]},
      { group: 'relatorios', label: 'Relatórios', icon: 'chart', items: [
        { id: 'relatorios', label: 'Geral & Tabs' },
        { id: 'ranking',    label: 'Ranking de lideranças' },
      ]},
      { group: 'pro', label: 'Recursos Pro', icon: 'lock', items: [
        { id: 'pro-disparo',    label: 'Disparo em massa',     pro: true },
        { id: 'pro-ia',         label: 'Atendimento por IA',   pro: true },
        { id: 'pro-posts',      label: 'Posts automáticos',    pro: true },
        { id: 'pro-trafego',    label: 'Tráfego pago com IA',  pro: true },
        { id: 'pro-site',       label: 'Site institucional',   pro: true },
        { id: 'pro-analise-ia', label: 'IA analisa mandato',   pro: true },
      ]},
      { id: 'usuarios', label: 'Usuários', icon: 'shield', adminOnly: true },
      { id: 'config', label: 'Configurações', icon: 'cog' },
    ],

    compromissos: [],
    formCompromisso: emptyCompromisso(),
    modalCompromisso: false,

    proposituras: [],
    emendas: [],
    formPropositura: emptyPropositura(),
    formEmenda: emptyEmenda(),
    modalPropositura: false,
    modalEmenda: false,
    filtroProp: { tipo: '', status: '', busca: '' },
    tiposPropositura: ['Projeto de Lei', 'Requerimento', 'Moção', 'Ofício', 'Indicação', 'Projeto de Resolução', 'Projeto de Decreto Legislativo'],
    statusPropositura: ['Em elaboração', 'Protocolado', 'Em tramitação', 'Aprovado', 'Rejeitado', 'Arquivado'],
    tiposEmenda: ['Emenda Aditiva', 'Emenda Modificativa', 'Emenda Supressiva', 'Emenda Substitutiva', 'Emenda Impositiva'],
    mesAtual: new Date().toISOString().slice(0, 7), // YYYY-MM
    diaSelecionado: new Date().toISOString().slice(0, 10),
    dropdownNotif: false,
    diasSemContato: 15, // alerta padrão
    historicoDemanda: [], // lista pra modal de demanda
    carregandoHistorico: false,

    statusEnvolvimento: [
      { id: 'Não trabalhado', cor: 'bg-blue-500',   bar: '#3b82f6' },
      { id: 'Em prospecção',  cor: 'bg-emerald-500',bar: '#10b981' },
      { id: 'Conquistado',    cor: 'bg-purple-500', bar: '#a855f7' },
      { id: 'Perdido',        cor: 'bg-rose-500',   bar: '#f43f5e' },
    ],

    novoMarcador: '',
    novoNicho: '',
    // Defaults usados na primeira carga (depois ficam em config.marcadores / config.nichos)
    marcadoresPadrao: ['Liderança', 'Pai', 'Mãe', 'Cônjuge', 'Voluntário', 'Doador'],
    nichosPadrao: [
      'Católico Sta Luzia',
      'Atendido pelo gabinete',
      'Tiro de Guerra 94',
      'Romeiro',
      'Vista Alegre',
      'Novo Horizonte',
      'Nova Suíça',
      'Família',
      'Voluntariado',
    ],

    // getters acessam config (reativos)
    get marcadores() { return this.config.marcadores || []; },
    get nichos() { return this.config.nichos || []; },

    tiposDemanda: [
      'Saúde', 'Educação', 'Infraestrutura', 'Iluminação', 'Asfalto / Buraco',
      'Limpeza pública', 'Transporte', 'Segurança', 'Esporte / Cultura',
      'Assistência social', 'Documentação', 'Outro'
    ],

    orgaosResponsaveis: [
      'Secretaria de Saúde',
      'Secretaria de Educação',
      'Secretaria de Obras',
      'Secretaria de Meio Ambiente',
      'Secretaria de Esporte, Cultura e Turismo',
      'Secretaria de Assistência Social',
      'Secretaria de Trânsito',
      'Câmara Municipal de Limeira',
      'Prefeitura — Gabinete',
      'Concessionária (água/luz)',
      'Outro / não definido',
    ],

    origensAtendimento: ['Presencial', 'WhatsApp', 'Telefone', 'Email', 'Visita do gabinete', 'Indicação', 'Redes sociais'],
    classificacoesAtendimento: ['Demanda do bairro', 'Pessoal', 'Coletiva', 'Emergência', 'Acompanhamento'],
    setores: ['Saúde', 'Educação', 'Infraestrutura', 'Social', 'Esporte/Cultura', 'Jurídico', 'Comunicação', 'Outro'],

    eleitores: [],
    demandas: [],
    solicitacoes: [],
    notif: {
      permissao: 'default', // 'granted' | 'denied' | 'default'
      som: true,
      bc: null,
      pollTimer: null,
    },
    waha: {
      status: 'unknown',  // unknown | starting | SCAN_QR_CODE | WORKING | FAILED | STOPPED
      qrDataUrl: null,
      me: null,            // { id, pushName }
      pollTimer: null,
      ultimoErro: null,
      testando: false,
      testNumero: '',
      testMsg: 'Teste enviado pelo painel do gabinete. Tudo certo!',
    },
    zap: {
      chats: [],
      chatAtivo: null,
      mensagens: [],
      carregandoChats: false,
      carregandoMsgs: false,
      enviando: false,
      inputMsg: '',
      buscaChat: '',
      pollTimer: null,
      filtroChat: 'todos', // todos | naolido | cadastrados
      fotos: {},           // cache de fotos por chatId
      midiaCache: {},      // cache de blobURL por URL original (autenticado)
      painelContato: true, // mostra painel direito com dados do contato
    },
    sb: {
      ready: false,
      user: null,
      perfil: null,
      perfis: [],
      loginOpen: true,
      loginEmail: '',
      loginPassword: '',
      loginErro: '',
      loginCarregando: false,
      ultimoErro: null,
      sincronizando: false,
      realtimeChannel: null,
      modalNovoUser: false,
      formNovoUser: { nome: '', email: '', senha: '', papel: 'assessor' },
      criandoUser: false,
      erroNovoUser: '',
    },
    config: {
      proximaEleicao: '2028-10-01',
      nomeVereador: 'Marco Xavier',
      wahaUrl: '',         // ex: https://waha.seudominio.com  ou  http://195.35.17.16:3001
      wahaApiKey: '',      // header X-Api-Key (se configurado no WAHA)
      wahaSession: 'default',
      mensagensPadrao: [
        { id: 'aniversario',  nome: 'Aniversário',           categoria: 'Aniversário', conteudo: 'Olá {{nome}}! Hoje é seu dia! 🎉\nQue Deus abençoe sua vida e sua família. Conta comigo aqui no gabinete pra o que precisar.\n— Marco Xavier' },
        { id: 'agradecimento', nome: 'Agradecimento',         categoria: 'Geral',       conteudo: 'Olá {{nome}}, tudo bem? Passando pra agradecer o seu contato. Conta comigo sempre que precisar.\n— Marco Xavier' },
        { id: 'demanda-rec',   nome: 'Demanda recebida',      categoria: 'Atendimento', conteudo: 'Olá {{nome}}! Recebemos sua solicitação aqui no gabinete. Já estamos encaminhando e te aviso assim que tiver retorno.\n— Equipe Marco Xavier' },
        { id: 'demanda-res',   nome: 'Demanda resolvida',     categoria: 'Atendimento', conteudo: 'Olá {{nome}}! Boa notícia: sua solicitação foi atendida. Qualquer coisa, conta comigo.\n— Marco Xavier' },
        { id: 'convite-igreja',nome: 'Convite — Sta Luzia',  categoria: 'Comunidade',  conteudo: 'Oi {{nome}}! Tem celebração na nossa Paróquia Santa Luzia esta semana. Conto com você! 🙏\n— Marco Xavier' },
      ],
    },
    templateAnivId: 'aniversario',
    modalTemplate: false,
    formTemplate: { id: null, nome: '', categoria: '', conteudo: '' },

    filtroEleitor: { busca: '', bairro: '', nicho: '', envolvimento: '' },
    filtroDemanda: { busca: '', tipo: '', status: '', orgao: '' },
    filtroAniv: { de: '', ate: '', bairro: '' },
    cartasMes: 0, // 0 = este mês, 1 = próximo, etc.
    cartasTextoBase: 'Querido(a) {{nome}},\n\nO Vereador Marco Xavier e toda a equipe do gabinete desejam a você um feliz aniversário cheio de saúde, paz e alegria ao lado da sua família.\n\nQue Deus continue iluminando seus passos e fortalecendo seus sonhos.\n\nReceba um forte abraço,\n\nMarco Xavier\nVereador de Limeira',
    tabRelatorio: 'geral',
    modoDemanda: 'lista', // 'lista' | 'kanban'
    dragId: null,
    statusKanban: ['Aberta', 'Em andamento', 'Resolvida', 'Cancelada'],
    statusKanbanCores: {
      'Aberta':       { bg: 'bg-amber-50',   border: 'border-amber-300',   dot: 'bg-amber-500',   chip: 'bg-amber-100 text-amber-700' },
      'Em andamento': { bg: 'bg-blue-50',    border: 'border-blue-300',    dot: 'bg-blue-500',    chip: 'bg-blue-100 text-blue-700' },
      'Resolvida':    { bg: 'bg-emerald-50', border: 'border-emerald-300', dot: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-700' },
      'Cancelada':    { bg: 'bg-slate-100',  border: 'border-slate-300',   dot: 'bg-slate-400',   chip: 'bg-slate-200 text-slate-600' },
    },

    modal: { eleitor: false, demanda: false },
    formEleitor: emptyEleitor(),
    formDemanda: emptyDemanda(),

    toast: { show: false, msg: '' },

    // === Init ===
    init() {
      this.carregar();
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          document.getElementById('busca-global')?.focus();
        }
      });
      // 1ª checagem do WAHA pra topbar
      if (this.wahaConfigurado()) this.wahaStatusCheck();
      // Caixa de entrada: notificações + sincronia
      this.initNotificacoes();
      // Supabase: inicializa se configurado
      this.sbInit();
      // PWA: escuta evento de instalação
      this.podeInstalar = !!window.MX_INSTALL_PROMPT;
      document.addEventListener('mx-install-available', () => this.podeInstalar = true);
      document.addEventListener('mx-install-done', () => { this.podeInstalar = false; this.showToast('App instalado!'); });
    },

    podeInstalar: false,
    async instalarApp() {
      if (!window.MX_INSTALL_PROMPT) {
        alert('Pra instalar:\n\n• Android/Chrome: menu ⋮ → "Instalar app"\n• iPhone/Safari: compartilhar → "Adicionar à Tela de Início"\n• Desktop: ícone de instalar na barra de endereço');
        return;
      }
      window.MX_INSTALL_PROMPT.prompt();
      const result = await window.MX_INSTALL_PROMPT.userChoice;
      if (result.outcome === 'accepted') this.showToast('Instalando…');
      window.MX_INSTALL_PROMPT = null;
      this.podeInstalar = false;
    },

    // === Navegação ===
    goTo(id) {
      this.view = id;
      this.menuOpen = false;
      window.scrollTo({ top: 0 });
      // Polling do WAHA só roda enquanto a tela do WhatsApp está aberta
      if (id === 'whatsapp' && this.wahaConfigurado()) this.wahaIniciarPolling();
      else this.wahaPararPolling();
      // Conversas: carrega chats ao entrar; polling de mensagens só com chat aberto
      if (id === 'conversas') {
        if (this.waha.status === 'WORKING') this.zapCarregarChats();
      } else {
        this.zapPararPolling();
      }
    },
    toggleGroup(g) {
      this.openGroup = this.openGroup === g ? null : g;
    },

    // === Persistência ===
    carregar() {
      try {
        const data = JSON.parse(localStorage.getItem('mx_painel') || '{}');
        this.eleitores = data.eleitores || [];
        this.demandas = data.demandas || [];
        this.compromissos = data.compromissos || [];
        this.proposituras = data.proposituras || [];
        this.emendas = data.emendas || [];
        this.solicitacoes = JSON.parse(localStorage.getItem('mx_solicitacoes') || '[]');
        if (data.config) this.config = { ...this.config, ...data.config };
        // Migração: se ainda existir mensagemAniversario antiga, converte
        if (data.config?.mensagemAniversario && !Array.isArray(this.config.mensagensPadrao)) {
          this.config.mensagensPadrao = [
            { id: 'aniversario', nome: 'Aniversário', categoria: 'Aniversário', conteudo: data.config.mensagemAniversario }
          ];
        }
        if (!Array.isArray(this.config.mensagensPadrao)) this.config.mensagensPadrao = [];
        // Marcadores e nichos: usar default se ainda não houver
        if (!Array.isArray(this.config.marcadores) || this.config.marcadores.length === 0) {
          this.config.marcadores = [...this.marcadoresPadrao];
        }
        if (!Array.isArray(this.config.nichos) || this.config.nichos.length === 0) {
          this.config.nichos = [...this.nichosPadrao];
        }
      } catch (e) { console.error(e); }
    },
    salvar() {
      localStorage.setItem('mx_painel', JSON.stringify({
        eleitores: this.eleitores,
        demandas: this.demandas,
        compromissos: this.compromissos,
        proposituras: this.proposituras,
        emendas: this.emendas,
        config: this.config,
      }));
    },
    salvarSolicitacoes() {
      localStorage.setItem('mx_solicitacoes', JSON.stringify(this.solicitacoes));
    },
    async salvarConfig() {
      this.salvar();
      // Quando logado no Supabase, sincroniza tudo que é compartilhado
      if (this.sb.ready && this.sb.user) {
        try {
          await Promise.all([
            window.MX_SB.setConfig('nome_vereador',   this.config.nomeVereador),
            window.MX_SB.setConfig('proxima_eleicao', this.config.proximaEleicao),
            window.MX_SB.setConfig('marcadores',      this.config.marcadores || []),
            window.MX_SB.setConfig('nichos',          this.config.nichos || []),
            window.MX_SB.setConfig('mensagens_padrao',this.config.mensagensPadrao || []),
            window.MX_SB.setConfig('waha_url',        this.config.wahaUrl || ''),
            window.MX_SB.setConfig('waha_api_key',    this.config.wahaApiKey || ''),
            window.MX_SB.setConfig('waha_session',    this.config.wahaSession || 'default'),
            window.MX_SB.setConfig('dias_sem_contato',this.diasSemContato || 60),
            window.MX_SB.setConfig('cartas_texto_base', this.cartasTextoBase || ''),
          ]);
        } catch (err) { console.warn('[config sync]', err); }
      }
      this.showToast('Configurações salvas');
    },
    async syncConfigSupabase(chave, valor) {
      if (this.sb.ready && this.sb.user) {
        try { await window.MX_SB.setConfig(chave, valor); } catch (e) { console.warn('[config]', e); }
      }
    },

    // === Ícones SVG do sidebar ===
    icone(name) { return (window.iconesSvg || {})[name] || ''; },

    // === Saudação ===
    saudacao() {
      const h = new Date().getHours();
      if (h < 12) return 'Bom dia';
      if (h < 18) return 'Boa tarde';
      return 'Boa noite';
    },
    hoje() {
      return new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    },
    hojeCurto() {
      return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    },

    // === Countdown eleição ===
    diasParaEleicao() {
      if (!this.config.proximaEleicao) return null;
      const alvo = new Date(this.config.proximaEleicao);
      const hoje = new Date();
      hoje.setHours(0,0,0,0);
      const diff = Math.ceil((alvo - hoje) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    },

    // === Eleitor ===
    abrirEleitor(e) {
      this.formEleitor = e
        ? { ...emptyEleitor(), ...JSON.parse(JSON.stringify(e)) }
        : emptyEleitor();
      this.modal.eleitor = true;
    },
    toggleNicho(n) {
      if (!this.formEleitor.nichos) this.formEleitor.nichos = [];
      const i = this.formEleitor.nichos.indexOf(n);
      if (i >= 0) this.formEleitor.nichos.splice(i, 1);
      else this.formEleitor.nichos.push(n);
    },
    toggleMarcador(m) {
      if (!this.formEleitor.marcadores) this.formEleitor.marcadores = [];
      const i = this.formEleitor.marcadores.indexOf(m);
      if (i >= 0) this.formEleitor.marcadores.splice(i, 1);
      else this.formEleitor.marcadores.push(m);
    },
    async salvarEleitor() {
      if (!this.formEleitor.nome?.trim()) { this.showToast('Informe o nome'); return; }
      try {
        if (this.sb.ready && this.sb.user) {
          // Modo Supabase
          const salvo = await window.MX_SB.salvarEleitor(this.formEleitor);
          if (this.formEleitor.id) {
            const idx = this.eleitores.findIndex(e => e.id === this.formEleitor.id);
            if (idx >= 0) this.eleitores[idx] = salvo;
          } else {
            this.eleitores.push(salvo);
          }
        } else {
          // Modo localStorage
          if (this.formEleitor.id) {
            const idx = this.eleitores.findIndex(e => e.id === this.formEleitor.id);
            if (idx >= 0) this.eleitores[idx] = { ...this.formEleitor };
          } else {
            this.formEleitor.id = uid();
            this.formEleitor.criadoEm = new Date().toISOString();
            this.eleitores.push({ ...this.formEleitor });
          }
        }
        this.salvar();
        this.modal.eleitor = false;
        this.showToast('Eleitor salvo');
      } catch (err) {
        alert('Erro ao salvar: ' + err.message);
      }
    },
    async removerEleitor() {
      if (!confirm('Excluir esse eleitor e todas as suas demandas?')) return;
      try {
        if (this.sb.ready && this.sb.user && this.formEleitor.id) {
          await window.MX_SB.deletarEleitor(this.formEleitor.id);
        }
        this.eleitores = this.eleitores.filter(e => e.id !== this.formEleitor.id);
        this.demandas = this.demandas.filter(d => d.eleitorId !== this.formEleitor.id);
        this.salvar();
        this.modal.eleitor = false;
        this.showToast('Eleitor removido');
      } catch (err) {
        alert('Erro ao excluir: ' + err.message);
      }
    },

    // === Demanda ===
    async abrirDemanda(d) {
      this.historicoDemanda = [];
      if (d && d.id) {
        this.formDemanda = { ...emptyDemanda(), ...JSON.parse(JSON.stringify(d)) };
        // Carrega histórico + registra visualização
        if (this.sb.ready && this.sb.user) {
          this.carregandoHistorico = true;
          try {
            this.historicoDemanda = await window.MX_SB.listarHistoricoDemanda(d.id);
            window.MX_SB.registrarVisualizacao(d.id);
            // atualiza ultima_visualizacao local
            const idx = this.demandas.findIndex(x => x.id === d.id);
            if (idx >= 0) this.demandas[idx].ultimaVisualizacao = new Date().toISOString();
            this.formDemanda.ultimaVisualizacao = new Date().toISOString();
          } catch (err) {
            console.warn('[historico]', err);
          } finally {
            this.carregandoHistorico = false;
          }
        }
      } else {
        this.formDemanda = emptyDemanda();
        if (d && d.eleitorId) this.formDemanda.eleitorId = d.eleitorId;
        if (d && d.status) this.formDemanda.status = d.status;
        if (d && d.chatId) this.formDemanda.chatId = d.chatId;
      }
      this.modal.demanda = true;
    },
    formatTimestamp(t) {
      if (!t) return '';
      return new Date(t).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    },
    historicoLabel(h) {
      const acoes = {
        'criada': '📝 Atendimento criado',
        'atualizada': '✏️ Atualizado: ' + (h.campo || ''),
        'status': '🔄 Status mudou de "' + (h.valor_antigo || '?') + '" para "' + h.valor_novo + '"',
        'nota': '📒 Nota atualizada',
        'anexo': '📎 Anexo adicionado',
        'visualizada': '👁️ Visualizado',
      };
      return acoes[h.acao] || h.acao;
    },
    nomeDoUsuario(uid) {
      if (!uid) return 'Sistema';
      const p = (this.sb.perfis || []).find(p => p.id === uid);
      return p?.nome || 'Usuário';
    },

    // Demandas sem visualização há mais de N dias
    demandasSemVisualizacao(diasMin = null) {
      const limite = diasMin || this.diasSemContato;
      const limiteData = Date.now() - limite * 24 * 60 * 60 * 1000;
      return this.demandas.filter(d => {
        if (['Resolvida','Cancelada'].includes(d.status)) return false;
        const ult = d.ultimaVisualizacao ? new Date(d.ultimaVisualizacao).getTime() : new Date(d.data).getTime();
        return ult < limiteData;
      }).map(d => ({
        ...d,
        diasSemVer: Math.floor((Date.now() - (d.ultimaVisualizacao ? new Date(d.ultimaVisualizacao).getTime() : new Date(d.data).getTime())) / (24*60*60*1000)),
      })).sort((a, b) => b.diasSemVer - a.diasSemVer);
    },

    // Abre conversa WhatsApp vinculada ao atendimento (se tiver chatId, ou tenta pelo telefone do eleitor)
    abrirConversaDaDemanda(d) {
      const chatId = d.chatId || this.chatIdDoEleitor(d.eleitorId);
      if (!chatId) {
        this.showToast('Sem WhatsApp vinculado');
        return;
      }
      // Encontra o chat na lista
      const chat = this.zap.chats.find(c => c.id === chatId);
      if (chat) {
        this.modal.demanda = false;
        this.goTo('conversas');
        this.$nextTick(() => this.abrirChat(chat));
      } else {
        // Cria um stub e abre
        this.modal.demanda = false;
        this.goTo('conversas');
        this.$nextTick(() => this.abrirChat({ id: chatId, name: this.nomeEleitor(d.eleitorId) }));
      }
    },
    chatIdDoEleitor(eleitorId) {
      const e = this.eleitores.find(x => x.id === eleitorId);
      if (!e?.telefone) return null;
      const num = (e.telefone || '').replace(/\D/g, '');
      const numero = num.startsWith('55') ? num : '55' + num;
      return numero + '@c.us';
    },
    async salvarDemanda() {
      if (!this.formDemanda.eleitorId) { this.showToast('Selecione o eleitor'); return; }
      if (!this.formDemanda.tipo) { this.showToast('Selecione o tipo'); return; }
      if (!this.formDemanda.descricao?.trim()) { this.showToast('Descreva a demanda'); return; }
      try {
        if (this.sb.ready && this.sb.user) {
          const salvo = await window.MX_SB.salvarDemanda(this.formDemanda);
          if (this.formDemanda.id) {
            const idx = this.demandas.findIndex(d => d.id === this.formDemanda.id);
            if (idx >= 0) this.demandas[idx] = salvo;
          } else {
            this.demandas.push(salvo);
          }
        } else {
          if (this.formDemanda.id) {
            const idx = this.demandas.findIndex(d => d.id === this.formDemanda.id);
            if (idx >= 0) this.demandas[idx] = { ...this.formDemanda };
          } else {
            this.formDemanda.id = uid();
            this.demandas.push({ ...this.formDemanda });
          }
        }
        this.salvar();
        this.modal.demanda = false;
        this.showToast('Atendimento salvo');
      } catch (err) {
        alert('Erro ao salvar: ' + err.message);
      }
    },
    async removerDemanda() {
      if (!confirm('Excluir esse atendimento?')) return;
      try {
        if (this.sb.ready && this.sb.user && this.formDemanda.id) {
          // limpa anexos no Storage também
          for (const a of (this.formDemanda.anexos || [])) {
            if (a.caminho) { try { await window.MX_SB.deletarAnexo(a.caminho); } catch {} }
          }
          await window.MX_SB.deletarDemanda(this.formDemanda.id);
        }
        this.demandas = this.demandas.filter(d => d.id !== this.formDemanda.id);
        this.salvar();
        this.modal.demanda = false;
        this.showToast('Atendimento removido');
      } catch (err) {
        alert('Erro ao excluir: ' + err.message);
      }
    },

    // === Anexos da demanda ===
    async handleAnexoUpload(ev) {
      const files = Array.from(ev.target.files || []);
      if (!this.formDemanda.anexos) this.formDemanda.anexos = [];
      const LIMITE_SB = 50 * 1024 * 1024; // 50MB no Storage
      const LIMITE_LOCAL = 2 * 1024 * 1024;
      const usandoSB = this.sb.ready && this.sb.user;
      const limite = usandoSB ? LIMITE_SB : LIMITE_LOCAL;
      // Garante que a demanda já tem id (cria provisório se ainda não)
      if (!this.formDemanda.id) {
        this.formDemanda.id = uid();
      }
      for (const file of files) {
        if (file.size > limite) {
          alert(`"${file.name}" tem ${(file.size/1024/1024).toFixed(1)}MB — máximo ${limite/1024/1024}MB.`);
          continue;
        }
        try {
          if (usandoSB) {
            const meta = await window.MX_SB.uploadAnexo(this.formDemanda.id, file);
            this.formDemanda.anexos.push(meta);
          } else {
            // fallback localStorage: base64 inline
            await new Promise(resolve => {
              const reader = new FileReader();
              reader.onload = e => {
                this.formDemanda.anexos.push({
                  id: uid(), nome: file.name, tipo: file.type || 'application/octet-stream',
                  tamanho: file.size, dataUrl: e.target.result, addedAt: new Date().toISOString(),
                });
                resolve();
              };
              reader.readAsDataURL(file);
            });
          }
        } catch (err) {
          alert('Erro ao subir ' + file.name + ': ' + err.message);
        }
      }
      ev.target.value = '';
    },
    async removerAnexo(id) {
      if (!confirm('Remover esse anexo?')) return;
      const anexo = (this.formDemanda.anexos || []).find(a => a.id === id);
      if (anexo?.caminho && this.sb.ready && this.sb.user) {
        try { await window.MX_SB.deletarAnexo(anexo.caminho); } catch {}
      }
      this.formDemanda.anexos = (this.formDemanda.anexos || []).filter(a => a.id !== id);
    },
    async baixarAnexo(a) {
      // Storage: gera signed URL e abre. Local: usa dataUrl.
      let href = a.dataUrl;
      if (!href && a.caminho && this.sb.ready) {
        href = await window.MX_SB.urlAnexo(a.caminho);
      }
      if (!href) { alert('Anexo indisponível'); return; }
      const link = document.createElement('a');
      link.href = href;
      link.download = a.nome;
      link.target = '_blank';
      link.click();
    },
    iconeAnexo(tipo) {
      if (!tipo) return '📎';
      if (tipo.startsWith('image/')) return '🖼️';
      if (tipo.includes('pdf')) return '📕';
      if (tipo.includes('word') || tipo.includes('document')) return '📄';
      if (tipo.includes('sheet') || tipo.includes('excel') || tipo.includes('csv')) return '📊';
      if (tipo.includes('zip') || tipo.includes('rar')) return '🗜️';
      return '📎';
    },
    formatBytes(bytes) {
      if (!bytes) return '';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    },

    // === Kanban ===
    demandasPorColuna(status) {
      return this.demandasFiltradas().filter(d => (d.status || 'Aberta') === status);
    },
    onDragStart(id) { this.dragId = id; },
    onDragEnd() { this.dragId = null; },
    onDropStatus(status) {
      if (!this.dragId) return;
      const idx = this.demandas.findIndex(d => d.id === this.dragId);
      if (idx >= 0 && this.demandas[idx].status !== status) {
        this.demandas[idx].status = status;
        this.salvar();
        this.showToast(`Movido para "${status}"`);
      }
      this.dragId = null;
    },
    mudarStatusRapido(d, novoStatus) {
      const idx = this.demandas.findIndex(x => x.id === d.id);
      if (idx >= 0) {
        this.demandas[idx].status = novoStatus;
        this.salvar();
      }
    },

    // === Filtros ===
    eleitoresFiltrados() {
      const f = this.filtroEleitor;
      const busca = (this.buscaGlobal || f.busca).toLowerCase().trim();
      return this.eleitores
        .filter(e => !busca || e.nome.toLowerCase().includes(busca) || (e.telefone || '').includes(busca) || (e.cpf || '').includes(busca))
        .filter(e => !f.bairro || e.bairro === f.bairro)
        .filter(e => !f.nicho || (e.nichos || []).includes(f.nicho))
        .filter(e => !f.envolvimento || e.envolvimento === f.envolvimento)
        .sort((a, b) => a.nome.localeCompare(b.nome));
    },
    demandasFiltradas() {
      const f = this.filtroDemanda;
      const busca = f.busca.toLowerCase().trim();
      return this.demandas
        .filter(d => !busca || d.descricao.toLowerCase().includes(busca) || this.nomeEleitor(d.eleitorId).toLowerCase().includes(busca))
        .filter(d => !f.tipo || d.tipo === f.tipo)
        .filter(d => !f.status || d.status === f.status)
        .filter(d => !f.orgao || d.orgaoResponsavel === f.orgao)
        .sort((a, b) => (b.data || '').localeCompare(a.data || ''));
    },
    bairrosUnicos() {
      return [...new Set(this.eleitores.map(e => e.bairro).filter(Boolean))].sort();
    },
    demandasDoEleitor(id) {
      return this.demandas
        .filter(d => d.eleitorId === id)
        .sort((a, b) => (b.data || '').localeCompare(a.data || ''));
    },

    // === Counters ===
    get counters() {
      const hoje = new Date().toISOString().slice(0,10);
      const trintaDias = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return {
        eleitores: this.eleitores.length,
        atendimentosHoje: this.demandas.filter(d => (d.data || '').slice(0,10) === hoje).length,
        demandasAbertas: this.demandas.filter(d => d.status === 'Aberta' || d.status === 'Em andamento').length,
        demandasResolvidasMes: this.demandas.filter(d => d.status === 'Resolvida' && new Date(d.data || 0).getTime() >= trintaDias).length,
        aniversariantesHoje: this.aniversariantesHoje().length,
        aniversariantesSemana: this.aniversariantes(7).length,
        lideranca: this.eleitores.filter(e => (e.marcadores || []).includes('Liderança')).length,
        conquistados: this.eleitores.filter(e => e.envolvimento === 'Conquistado').length,
      };
    },

    // === Termômetro envolvimento ===
    envolvimentoPipeline() {
      const total = this.eleitores.length || 1;
      return this.statusEnvolvimento.map(s => {
        const count = this.eleitores.filter(e => (e.envolvimento || 'Não trabalhado') === s.id).length;
        return { ...s, count, pct: (count / total) * 100 };
      });
    },
    metaConquistados() {
      const target = Math.max(1, Math.round(this.eleitores.length * 0.30));
      const atual = this.counters.conquistados;
      return { target, atual, pct: Math.min(100, (atual / target) * 100) };
    },

    // === Cadastros por mês (ano atual) ===
    cadastrosPorMes() {
      const ano = new Date().getFullYear();
      const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
      const counts = Array(12).fill(0);
      this.eleitores.forEach(e => {
        if (!e.criadoEm) return;
        const d = new Date(e.criadoEm);
        if (d.getFullYear() === ano) counts[d.getMonth()]++;
      });
      const max = Math.max(...counts, 1);
      return meses.map((m, i) => ({ mes: m, count: counts[i], pct: (counts[i] / max) * 100 }));
    },

    // === Relatórios ===
    demandasPorBairro() {
      const map = {};
      this.demandas.forEach(d => {
        const e = this.eleitores.find(x => x.id === d.eleitorId);
        const bairro = e?.bairro || 'Sem bairro';
        map[bairro] = (map[bairro] || 0) + 1;
      });
      return rankBars(map);
    },
    demandasPorTipo() {
      const map = {};
      this.demandas.forEach(d => { map[d.tipo] = (map[d.tipo] || 0) + 1; });
      return rankBars(map);
    },
    demandasPorOrgao() {
      const map = {};
      this.demandas.forEach(d => {
        const o = d.orgaoResponsavel || 'Não definido';
        map[o] = (map[o] || 0) + 1;
      });
      return rankBars(map);
    },
    demandasPorMes() {
      const ano = new Date().getFullYear();
      const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
      const counts = Array(12).fill(0);
      this.demandas.forEach(d => {
        if (!d.data) return;
        const dt = new Date(d.data);
        if (dt.getFullYear() === ano) counts[dt.getMonth()]++;
      });
      const max = Math.max(...counts, 1);
      return meses.map((m, i) => ({ mes: m, count: counts[i], pct: (counts[i] / max) * 100 }));
    },
    demandasPorStatus() {
      const map = { 'Aberta': 0, 'Em andamento': 0, 'Resolvida': 0, 'Cancelada': 0 };
      this.demandas.forEach(d => { if (d.status in map) map[d.status]++; });
      return rankBars(map);
    },

    // === Aniversariantes ===
    aniversariantes(dias = 30, ignoraFiltro = false) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const limite = new Date(hoje);
      limite.setDate(hoje.getDate() + dias);
      let base = this.eleitores
        .filter(e => e.nascimento)
        .map(e => {
          const [, m, d] = e.nascimento.split('-').map(Number);
          let prox = new Date(hoje.getFullYear(), m - 1, d);
          if (prox < hoje) prox.setFullYear(hoje.getFullYear() + 1);
          return { ...e, proximoAniv: prox };
        })
        .filter(e => e.proximoAniv <= limite);
      if (!ignoraFiltro) {
        const f = this.filtroAniv;
        if (f.bairro) base = base.filter(e => e.bairro === f.bairro);
        if (f.de) base = base.filter(e => e.proximoAniv >= new Date(f.de));
        if (f.ate) base = base.filter(e => e.proximoAniv <= new Date(f.ate));
      }
      return base.sort((a, b) => a.proximoAniv - b.proximoAniv);
    },
    aniversariantesDoMes(offsetMeses = 0) {
      const hoje = new Date();
      const alvo = new Date(hoje.getFullYear(), hoje.getMonth() + offsetMeses, 1);
      const mes = alvo.getMonth() + 1;
      const ano = alvo.getFullYear();
      return this.eleitores
        .filter(e => e.nascimento)
        .map(e => {
          const [, m, d] = e.nascimento.split('-').map(Number);
          return { ...e, _aniMes: m, _aniDia: d, _aniProximo: new Date(ano, m - 1, d) };
        })
        .filter(e => e._aniMes === mes)
        .sort((a, b) => a._aniDia - b._aniDia);
    },
    labelMesOffset(o) {
      const d = new Date();
      d.setMonth(d.getMonth() + o);
      const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
      return meses[d.getMonth()] + ' de ' + d.getFullYear();
    },
    imprimirCartas() {
      const aniv = this.aniversariantesDoMes(this.cartasMes);
      if (aniv.length === 0) {
        this.showToast('Nenhum aniversariante no período');
        return;
      }
      // Constrói HTML separado pra impressão (uma carta por página)
      const w = window.open('', '_blank');
      const logoUrl = location.href.replace(/index\.html.*/, '') + 'assets/logo-azul.png';
      const cartas = aniv.map(e => {
        const corpo = this.aplicarTemplate(this.cartasTextoBase, e);
        const dataAniv = this.formatBirthday(e.nascimento);
        return `
          <section class="carta">
            <header>
              <img src="${logoUrl}" alt="Marco Xavier"/>
            </header>
            <main>
              <p class="data">${dataAniv}</p>
              <h1>Feliz Aniversário, ${e.nome.split(' ')[0]}!</h1>
              <pre>${this._escape(corpo)}</pre>
              ${e.endereco ? `<footer class="end"><strong>Para:</strong> ${this._escape(e.nome)}<br/>${this._escape(e.endereco)}${e.bairro ? ' — ' + this._escape(e.bairro) : ''}</footer>` : ''}
            </main>
          </section>
        `;
      }).join('');
      w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
        <title>Cartas de Aniversário — ${this.labelMesOffset(this.cartasMes)}</title>
        <style>
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; }
          body { font-family: 'Inter', system-ui, sans-serif; margin: 0; color: #1f2937; }
          .carta { width: 210mm; height: 297mm; padding: 25mm 20mm; page-break-after: always; display: flex; flex-direction: column; gap: 12mm; }
          .carta:last-child { page-break-after: auto; }
          header { display: flex; justify-content: center; }
          header img { height: 100px; }
          .data { color: #1E5BBA; font-size: 13pt; font-weight: 700; margin: 0; }
          h1 { color: #0E3A8A; font-size: 32pt; margin: 0 0 8mm; font-weight: 900; line-height: 1.1; }
          pre { font-family: 'Inter', system-ui, sans-serif; font-size: 14pt; line-height: 1.6; white-space: pre-wrap; margin: 0; flex: 1; }
          .end { margin-top: 20mm; padding-top: 8mm; border-top: 2px solid #1E5BBA; font-size: 11pt; color: #475569; }
          @media print { body { margin: 0; } }
        </style></head><body>${cartas}<script>window.onload = () => setTimeout(() => window.print(), 400);<\/script></body></html>`);
      w.document.close();
    },
    _escape(s) {
      return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    aniversariantesHoje() {
      const hoje = new Date();
      const mm = hoje.getMonth() + 1;
      const dd = hoje.getDate();
      return this.eleitores.filter(e => {
        if (!e.nascimento) return false;
        const [, m, d] = e.nascimento.split('-').map(Number);
        return m === mm && d === dd;
      });
    },
    whatsappLink(e, templateId = null) {
      const num = (e.telefone || '').replace(/\D/g, '');
      const numero = num.startsWith('55') ? num : '55' + num;
      const primeiroNome = (e.nome || '').split(' ')[0];
      const t = this.getTemplate(templateId || this.templateAnivId);
      const conteudo = t?.conteudo || '';
      const msg = this.aplicarTemplate(conteudo, e);
      return `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    },
    getTemplate(id) {
      return (this.config.mensagensPadrao || []).find(t => t.id === id);
    },
    aplicarTemplate(conteudo, eleitor) {
      const primeiroNome = (eleitor?.nome || '').split(' ')[0];
      return (conteudo || '')
        .replace(/\{\{nome\}\}/g, primeiroNome)
        .replace(/\{\{nome_completo\}\}/g, eleitor?.nome || '')
        .replace(/\{\{bairro\}\}/g, eleitor?.bairro || '')
        .replace(/\{\{vereador\}\}/g, this.config.nomeVereador || '');
    },

    // === Templates / Mensagens padrão ===
    abrirTemplate(t) {
      this.formTemplate = t
        ? JSON.parse(JSON.stringify(t))
        : { id: null, nome: '', categoria: 'Geral', conteudo: '' };
      this.modalTemplate = true;
    },
    salvarTemplate() {
      if (!this.formTemplate.nome?.trim()) { this.showToast('Informe o nome'); return; }
      if (!this.formTemplate.conteudo?.trim()) { this.showToast('Informe o conteúdo'); return; }
      if (!Array.isArray(this.config.mensagensPadrao)) this.config.mensagensPadrao = [];
      if (this.formTemplate.id) {
        const idx = this.config.mensagensPadrao.findIndex(t => t.id === this.formTemplate.id);
        if (idx >= 0) this.config.mensagensPadrao[idx] = { ...this.formTemplate };
      } else {
        this.formTemplate.id = uid();
        this.config.mensagensPadrao.push({ ...this.formTemplate });
      }
      this.salvar();
      this.syncConfigSupabase('mensagens_padrao', this.config.mensagensPadrao);
      this.modalTemplate = false;
      this.showToast('Mensagem salva');
    },
    removerTemplate(id) {
      if (!confirm('Excluir essa mensagem padrão?')) return;
      this.config.mensagensPadrao = (this.config.mensagensPadrao || []).filter(t => t.id !== id);
      if (this.templateAnivId === id) this.templateAnivId = this.config.mensagensPadrao[0]?.id || null;
      this.salvar();
      this.syncConfigSupabase('mensagens_padrao', this.config.mensagensPadrao);
      this.showToast('Removida');
    },
    duplicarTemplate(t) {
      const novo = { ...JSON.parse(JSON.stringify(t)), id: uid(), nome: t.nome + ' (cópia)' };
      this.config.mensagensPadrao.push(novo);
      this.salvar();
      this.syncConfigSupabase('mensagens_padrao', this.config.mensagensPadrao);
      this.showToast('Duplicada');
    },

    // === Marcadores ===
    adicionarMarcador() {
      const v = (this.novoMarcador || '').trim();
      if (!v) return;
      if (this.config.marcadores.includes(v)) { this.showToast('Já existe'); return; }
      this.config.marcadores.push(v);
      this.novoMarcador = '';
      this.salvar();
      this.syncConfigSupabase('marcadores', this.config.marcadores);
      this.showToast('Marcador adicionado');
    },
    removerMarcador(m) {
      const usados = this.eleitores.filter(e => (e.marcadores || []).includes(m)).length;
      const msg = usados > 0
        ? `Remover "${m}"? Esse marcador está usado em ${usados} eleitor(es) e vai ser tirado deles também.`
        : `Remover "${m}"?`;
      if (!confirm(msg)) return;
      this.config.marcadores = this.config.marcadores.filter(x => x !== m);
      this.eleitores.forEach(e => {
        if (Array.isArray(e.marcadores)) e.marcadores = e.marcadores.filter(x => x !== m);
      });
      this.salvar();
      this.syncConfigSupabase('marcadores', this.config.marcadores);
      this.showToast('Marcador removido');
    },
    renomearMarcador(m) {
      const novo = prompt(`Renomear marcador "${m}" para:`, m);
      if (!novo || novo.trim() === '' || novo === m) return;
      const novoTrim = novo.trim();
      if (this.config.marcadores.includes(novoTrim)) { this.showToast('Já existe outro com esse nome'); return; }
      const idx = this.config.marcadores.indexOf(m);
      if (idx >= 0) this.config.marcadores[idx] = novoTrim;
      this.eleitores.forEach(e => {
        if (Array.isArray(e.marcadores)) {
          e.marcadores = e.marcadores.map(x => x === m ? novoTrim : x);
        }
      });
      this.salvar();
      this.syncConfigSupabase('marcadores', this.config.marcadores);
      this.showToast('Renomeado');
    },

    // === Nichos / categorias ===
    adicionarNicho() {
      const v = (this.novoNicho || '').trim();
      if (!v) return;
      if (this.config.nichos.includes(v)) { this.showToast('Já existe'); return; }
      this.config.nichos.push(v);
      this.novoNicho = '';
      this.salvar();
      this.syncConfigSupabase('nichos', this.config.nichos);
      this.showToast('Nicho adicionado');
    },
    removerNicho(n) {
      const usados = this.eleitores.filter(e => (e.nichos || []).includes(n)).length;
      const msg = usados > 0
        ? `Remover "${n}"? Esse nicho está usado em ${usados} eleitor(es) e vai ser tirado deles também.`
        : `Remover "${n}"?`;
      if (!confirm(msg)) return;
      this.config.nichos = this.config.nichos.filter(x => x !== n);
      this.eleitores.forEach(e => {
        if (Array.isArray(e.nichos)) e.nichos = e.nichos.filter(x => x !== n);
      });
      this.salvar();
      this.syncConfigSupabase('nichos', this.config.nichos);
      this.showToast('Nicho removido');
    },
    renomearNicho(n) {
      const novo = prompt(`Renomear nicho "${n}" para:`, n);
      if (!novo || novo.trim() === '' || novo === n) return;
      const novoTrim = novo.trim();
      if (this.config.nichos.includes(novoTrim)) { this.showToast('Já existe outro com esse nome'); return; }
      const idx = this.config.nichos.indexOf(n);
      if (idx >= 0) this.config.nichos[idx] = novoTrim;
      this.eleitores.forEach(e => {
        if (Array.isArray(e.nichos)) {
          e.nichos = e.nichos.map(x => x === n ? novoTrim : x);
        }
      });
      this.salvar();
      this.syncConfigSupabase('nichos', this.config.nichos);
      this.showToast('Renomeado');
    },
    contagemMarcador(m) {
      return this.eleitores.filter(e => (e.marcadores || []).includes(m)).length;
    },
    contagemNicho(n) {
      return this.eleitores.filter(e => (e.nichos || []).includes(n)).length;
    },

    // ============================================================
    // CAIXA DE ENTRADA — solicitações do site público
    // ============================================================
    solicitacoesPendentes() {
      return this.solicitacoes
        .filter(s => s.status === 'pendente')
        .sort((a, b) => (b.enviadoEm || '').localeCompare(a.enviadoEm || ''));
    },
    solicitacoesProcessadas() {
      return this.solicitacoes
        .filter(s => s.status !== 'pendente')
        .sort((a, b) => (b.processadoEm || b.enviadoEm || '').localeCompare(a.processadoEm || a.enviadoEm || ''));
    },
    get totalInbox() { return this.solicitacoesPendentes().length; },

    sincronizarSolicitacoes() {
      try {
        const lista = JSON.parse(localStorage.getItem('mx_solicitacoes') || '[]');
        this.solicitacoes = lista;
      } catch {}
    },

    async aceitarSolicitacao(s) {
      // 1. Procura eleitor por telefone (limpo) ou CPF
      const telDigits = (s.telefone || '').replace(/\D/g, '');
      let eleitor = this.eleitores.find(e => {
        const eTel = (e.telefone || '').replace(/\D/g, '');
        if (telDigits && eTel && (eTel === telDigits || eTel.endsWith(telDigits) || telDigits.endsWith(eTel))) return true;
        if (s.cpf && e.cpf && s.cpf === e.cpf) return true;
        return false;
      });

      // 2. Se não achou, cria
      if (!eleitor) {
        const novo = {
          ...emptyEleitor(),
          nome: s.nome,
          telefone: s.telefone,
          nascimento: s.nascimento || '',
          email: s.email || '',
          redeSocial: s.redeSocial || '',
          bairro: s.bairro || '',
          endereco: s.endereco || '',
          envolvimento: 'Em prospecção',
          nichos: ['Site público'],
          obs: 'Cadastrado automaticamente via Caixa de Entrada — protocolo ' + s.protocolo,
        };
        if (this.sb.ready && this.sb.user) {
          eleitor = await window.MX_SB.salvarEleitor(novo);
        } else {
          eleitor = { ...novo, id: uid(), criadoEm: new Date().toISOString() };
        }
        this.eleitores.push(eleitor);
      } else {
        // Se eleitor já existe, completa campos vazios com o que veio do site
        let mudou = false;
        if (!eleitor.nascimento && s.nascimento) { eleitor.nascimento = s.nascimento; mudou = true; }
        if (!eleitor.email && s.email) { eleitor.email = s.email; mudou = true; }
        if (!eleitor.redeSocial && s.redeSocial) { eleitor.redeSocial = s.redeSocial; mudou = true; }
        if (mudou && this.sb.ready && this.sb.user) {
          await window.MX_SB.salvarEleitor(eleitor);
        }
      }

      // 3. Cria a demanda vinculada
      const demanda = {
        ...emptyDemanda(),
        id: uid(),
        eleitorId: eleitor.id,
        tipo: s.tipo || 'Outro',
        status: 'Aberta',
        origem: 'Site público',
        descricao: s.descricao,
        data: (s.enviadoEm || new Date().toISOString()).slice(0, 10),
        notas: `Protocolo: ${s.protocolo}\nBairro informado: ${s.bairro}\n${s.endereco ? 'Endereço: ' + s.endereco + '\n' : ''}${s.email ? 'Email: ' + s.email + '\n' : ''}Telefone: ${s.telefone}`,
      };
      this.demandas.push(demanda);

      // 4. Marca solicitação como processada
      const patch = {
        status: 'aceito',
        processadoEm: new Date().toISOString(),
        eleitorId: eleitor.id,
        demandaId: demanda.id,
      };
      const idx = this.solicitacoes.findIndex(x => x.id === s.id);
      if (idx >= 0) Object.assign(this.solicitacoes[idx], patch);
      if (this.sb.ready && this.sb.user) {
        try { await window.MX_SB.atualizarSolicitacao(s.id, patch); } catch (e) { console.warn(e); }
      }

      this.salvar();
      this.salvarSolicitacoes();
      this.showToast(`Aceito — atendimento aberto pra ${eleitor.nome.split(' ')[0]}`);
    },

    async ignorarSolicitacao(s) {
      if (!confirm('Marcar essa solicitação como ignorada? Ela some da caixa de entrada.')) return;
      const patch = { status: 'ignorado', processadoEm: new Date().toISOString() };
      const idx = this.solicitacoes.findIndex(x => x.id === s.id);
      if (idx >= 0) Object.assign(this.solicitacoes[idx], patch);
      if (this.sb.ready && this.sb.user) {
        try { await window.MX_SB.atualizarSolicitacao(s.id, patch); } catch (e) { console.warn(e); }
      }
      this.salvarSolicitacoes();
      this.showToast('Ignorada');
    },

    async reabrirSolicitacao(s) {
      const patch = { status: 'pendente', processadoEm: null };
      const idx = this.solicitacoes.findIndex(x => x.id === s.id);
      if (idx >= 0) Object.assign(this.solicitacoes[idx], patch);
      if (this.sb.ready && this.sb.user) {
        try { await window.MX_SB.atualizarSolicitacao(s.id, patch); } catch (e) { console.warn(e); }
      }
      this.salvarSolicitacoes();
      this.showToast('Voltou pra caixa de entrada');
    },

    abrirEleitorDaSolicitacao(s) {
      if (!s.eleitorId) return;
      const e = this.eleitores.find(x => x.id === s.eleitorId);
      if (e) this.abrirEleitor(e);
    },

    // ============================================================
    // NOTIFICAÇÕES
    // ============================================================
    initNotificacoes() {
      this.notif.permissao = typeof Notification !== 'undefined' ? Notification.permission : 'denied';

      // BroadcastChannel: recebe novas solicitações em tempo real (mesma origem)
      try {
        this.notif.bc = new BroadcastChannel('mx-painel');
        this.notif.bc.onmessage = (ev) => {
          if (ev.data?.tipo === 'nova-solicitacao') {
            this.sincronizarSolicitacoes();
            this.notificarNova(ev.data.payload);
          }
        };
      } catch {}

      // storage event: outras abas (mesmo origin) escrevendo no localStorage
      window.addEventListener('storage', (ev) => {
        if (ev.key === 'mx_solicitacoes') {
          const antigas = this.solicitacoes.length;
          this.sincronizarSolicitacoes();
          if (this.solicitacoes.length > antigas) {
            const nova = this.solicitacoes[this.solicitacoes.length - 1];
            this.notificarNova(nova);
          }
        }
      });

      // Polling de fallback (caso BC/storage não funcionem em file://) — checa a cada 5s
      this.notif.pollTimer = setInterval(() => {
        const antes = this.solicitacoes.length;
        this.sincronizarSolicitacoes();
        if (this.solicitacoes.length > antes) {
          const nova = this.solicitacoes[this.solicitacoes.length - 1];
          this.notificarNova(nova);
        }
      }, 5000);
    },

    async pedirPermissaoNotif() {
      if (typeof Notification === 'undefined') {
        alert('Esse navegador não suporta notificações.');
        return;
      }
      const r = await Notification.requestPermission();
      this.notif.permissao = r;
      if (r === 'granted') {
        new Notification('Painel Marco Xavier', {
          body: 'Notificações ativadas. Você vai receber alerta de novas solicitações.',
          icon: 'assets/logo-azul.png',
        });
      }
    },

    notificarNova(s) {
      // 1. Toast
      this.showToast(`Nova solicitação: ${s.nome?.split(' ')[0]} — ${s.tipo}`);
      // 2. Som
      if (this.notif.som) this.tocarBeep();
      // 3. Notificação nativa
      if (this.notif.permissao === 'granted') {
        try {
          const n = new Notification(`Nova solicitação · ${s.tipo}`, {
            body: `${s.nome} (${s.bairro || 'sem bairro'})\n${(s.descricao || '').slice(0, 90)}...`,
            icon: 'assets/logo-azul.png',
            tag: 'mx-' + s.id,
            requireInteraction: false,
          });
          n.onclick = () => { window.focus(); this.goTo('inbox'); n.close(); };
        } catch {}
      }
    },

    tocarBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880;
        g.gain.value = 0.08;
        o.connect(g); g.connect(ctx.destination);
        o.start();
        o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        o.stop(ctx.currentTime + 0.3);
      } catch {}
    },

    // ============================================================
    // ELEITORES SEM CONTATO (cobrança)
    // ============================================================
    ultimoContatoEleitor(e) {
      // Maior valor entre: e.ultimoContato (manual) e a última demanda
      const dem = this.demandas
        .filter(d => d.eleitorId === e.id)
        .map(d => d.data || '')
        .sort()
        .reverse();
      const datas = [e.ultimoContato, dem[0], e.criadoEm?.slice(0, 10)].filter(Boolean);
      return datas.sort().reverse()[0] || null;
    },
    diasDesdeContato(e) {
      const ult = this.ultimoContatoEleitor(e);
      if (!ult) return null;
      const d = new Date(ult);
      const hoje = new Date();
      return Math.floor((hoje - d) / (1000 * 60 * 60 * 24));
    },
    eleitoresSemContato(diasMin = null) {
      const limite = diasMin || this.diasSemContato;
      return this.eleitores
        .filter(e => {
          // Foca em quem importa: Em prospecção ou Conquistado
          if (!['Em prospecção', 'Conquistado'].includes(e.envolvimento)) return false;
          const dias = this.diasDesdeContato(e);
          return dias !== null && dias >= limite;
        })
        .map(e => ({ ...e, diasSemContato: this.diasDesdeContato(e) }))
        .sort((a, b) => b.diasSemContato - a.diasSemContato);
    },
    marcarContatoFeito(eleitor) {
      const idx = this.eleitores.findIndex(e => e.id === eleitor.id);
      if (idx >= 0) {
        this.eleitores[idx].ultimoContato = new Date().toISOString().slice(0, 10);
        this.salvar();
      }
    },

    // ============================================================
    // NOTIFICAÇÕES UNIFICADAS
    // ============================================================
    notificacoesAtivas() {
      const arr = [];

      // 1. Solicitações pendentes do site
      this.solicitacoesPendentes().forEach(s => arr.push({
        id: 'sol-' + s.id,
        kind: 'solicitacao',
        prioridade: 1,
        icone: '📥',
        cor: 'bg-rose-100 text-rose-700',
        titulo: 'Nova solicitação',
        desc: `${s.nome} — ${s.tipo}`,
        timestamp: s.enviadoEm,
        view: 'inbox',
      }));

      // 2. Atendimentos com prazo estourado
      const hoje = new Date().toISOString().slice(0, 10);
      this.demandas
        .filter(d => d.prazo && d.prazo < hoje && !['Resolvida', 'Cancelada'].includes(d.status))
        .forEach(d => arr.push({
          id: 'prazo-' + d.id,
          kind: 'prazo',
          prioridade: 1,
          icone: '⏰',
          cor: 'bg-amber-100 text-amber-700',
          titulo: 'Prazo estourado',
          desc: `${this.nomeEleitor(d.eleitorId)} — ${d.tipo}`,
          timestamp: d.prazo,
          view: 'demandas',
        }));

      // 2b. Atendimentos sem visualização há mais de 15 dias
      this.demandasSemVisualizacao().slice(0, 10).forEach(d => arr.push({
        id: 'semver-' + d.id,
        kind: 'sem-visualizacao',
        prioridade: 1,
        icone: '🕒',
        cor: 'bg-orange-100 text-orange-700',
        titulo: `${d.diasSemVer} dias sem ver`,
        desc: `${this.nomeEleitor(d.eleitorId)} — ${d.tipo}: ${(d.descricao || '').slice(0, 60)}`,
        timestamp: d.ultimaVisualizacao || d.data,
        demandaId: d.id,
        acao: 'abrir-demanda',
      }));

      // 3. Eleitores sem contato há muito tempo
      this.eleitoresSemContato().slice(0, 8).forEach(e => arr.push({
        id: 'frio-' + e.id,
        kind: 'sem-contato',
        prioridade: 2,
        icone: '🥶',
        cor: 'bg-blue-100 text-blue-700',
        titulo: `${e.diasSemContato} dias sem contato`,
        desc: `${e.nome} — ${e.envolvimento}. Manda um oi, post novo, mensagem.`,
        timestamp: this.ultimoContatoEleitor(e),
        eleitorId: e.id,
        acao: 'abrir-eleitor',
      }));

      // 4. Aniversariantes hoje
      this.aniversariantesHoje().forEach(e => arr.push({
        id: 'aniv-' + e.id,
        kind: 'aniversario',
        prioridade: 1,
        icone: '🎂',
        cor: 'bg-purple-100 text-purple-700',
        titulo: 'Aniversário hoje',
        desc: `${e.nome} — manda um parabéns`,
        timestamp: new Date().toISOString(),
        eleitorId: e.id,
        acao: 'abrir-eleitor',
      }));

      // 5. Compromissos do dia
      const compHoje = this.compromissos.filter(c => c.data === hoje);
      compHoje.forEach(c => arr.push({
        id: 'comp-' + c.id,
        kind: 'compromisso',
        prioridade: 1,
        icone: '📅',
        cor: 'bg-emerald-100 text-emerald-700',
        titulo: 'Compromisso hoje' + (c.hora ? ` às ${c.hora}` : ''),
        desc: c.titulo + (c.local ? ' — ' + c.local : ''),
        timestamp: c.data + 'T' + (c.hora || '00:00'),
        view: 'agenda',
      }));

      return arr.sort((a, b) => {
        if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade;
        return (b.timestamp || '').localeCompare(a.timestamp || '');
      });
    },
    get totalNotif() { return this.notificacoesAtivas().length; },

    onNotifClick(n) {
      if (n.acao === 'abrir-eleitor' && n.eleitorId) {
        const e = this.eleitores.find(x => x.id === n.eleitorId);
        if (e) this.abrirEleitor(e);
      } else if (n.acao === 'abrir-demanda' && n.demandaId) {
        const d = this.demandas.find(x => x.id === n.demandaId);
        if (d) this.abrirDemanda(d);
      } else if (n.view) {
        this.goTo(n.view);
      }
      this.dropdownNotif = false;
    },

    // ============================================================
    // AGENDA / COMPROMISSOS
    // ============================================================
    nomesMeses: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    nomesDiasSemana: ['D','S','T','Q','Q','S','S'],

    mudarMes(delta) {
      const [y, m] = this.mesAtual.split('-').map(Number);
      const d = new Date(y, m - 1 + delta, 1);
      this.mesAtual = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    },
    mesAtualLabel() {
      const [y, m] = this.mesAtual.split('-').map(Number);
      return `${this.nomesMeses[m - 1]} de ${y}`;
    },
    irHojeAgenda() {
      this.mesAtual = new Date().toISOString().slice(0, 7);
      this.diaSelecionado = new Date().toISOString().slice(0, 10);
    },

    gradeMes() {
      const [y, m] = this.mesAtual.split('-').map(Number);
      const primeiroDia = new Date(y, m - 1, 1);
      const ultimoDia = new Date(y, m, 0);
      const diasNoMes = ultimoDia.getDate();
      const diaSemanaInicio = primeiroDia.getDay();
      const cells = [];
      // dias do mês anterior pra preencher
      for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const d = new Date(y, m - 1, -i);
        cells.push({ data: d.toISOString().slice(0,10), dia: d.getDate(), outro: true });
      }
      for (let d = 1; d <= diasNoMes; d++) {
        const dt = new Date(y, m - 1, d);
        cells.push({ data: dt.toISOString().slice(0,10), dia: d, outro: false });
      }
      // dias do próximo mês pra completar grade (até múltiplo de 7)
      while (cells.length % 7 !== 0) {
        const last = new Date(cells[cells.length - 1].data);
        last.setDate(last.getDate() + 1);
        cells.push({ data: last.toISOString().slice(0,10), dia: last.getDate(), outro: true });
      }
      return cells;
    },
    eventosNoDia(dataYMD) {
      const eventos = [];
      // Compromissos
      this.compromissos.filter(c => c.data === dataYMD).forEach(c => {
        eventos.push({ tipo: 'compromisso', cor: 'bg-marco-azul', titulo: c.titulo, hora: c.hora, obj: c });
      });
      // Aniversariantes (recorrente — match mês-dia)
      const [, mm, dd] = dataYMD.split('-');
      this.eleitores.filter(e => {
        if (!e.nascimento) return false;
        const [, em, ed] = e.nascimento.split('-');
        return em === mm && ed === dd;
      }).forEach(e => {
        eventos.push({ tipo: 'aniversario', cor: 'bg-purple-500', titulo: '🎂 ' + e.nome.split(' ')[0], obj: e });
      });
      // Prazos de atendimento
      this.demandas.filter(d => d.prazo === dataYMD && !['Resolvida','Cancelada'].includes(d.status)).forEach(d => {
        eventos.push({ tipo: 'prazo', cor: 'bg-amber-500', titulo: '⏰ ' + d.tipo, obj: d });
      });
      return eventos;
    },
    abrirCompromisso(c) {
      if (c && c.id) {
        this.formCompromisso = { ...emptyCompromisso(), ...JSON.parse(JSON.stringify(c)) };
      } else {
        this.formCompromisso = emptyCompromisso();
        if (c?.data) this.formCompromisso.data = c.data;
      }
      this.modalCompromisso = true;
    },
    async salvarCompromisso() {
      if (!this.formCompromisso.titulo?.trim()) { this.showToast('Informe o título'); return; }
      if (!this.formCompromisso.data) { this.showToast('Informe a data'); return; }
      try {
        if (this.sb.ready && this.sb.user) {
          const salvo = await window.MX_SB.salvarCompromisso(this.formCompromisso);
          if (this.formCompromisso.id) {
            const idx = this.compromissos.findIndex(c => c.id === this.formCompromisso.id);
            if (idx >= 0) this.compromissos[idx] = salvo;
          } else {
            this.compromissos.push(salvo);
          }
        } else {
          if (this.formCompromisso.id) {
            const idx = this.compromissos.findIndex(c => c.id === this.formCompromisso.id);
            if (idx >= 0) this.compromissos[idx] = { ...this.formCompromisso };
          } else {
            this.formCompromisso.id = uid();
            this.compromissos.push({ ...this.formCompromisso });
          }
        }
        this.salvar();
        this.modalCompromisso = false;
        this.showToast('Compromisso salvo');
      } catch (err) { alert('Erro: ' + err.message); }
    },
    async removerCompromisso() {
      if (!confirm('Excluir esse compromisso?')) return;
      try {
        if (this.sb.ready && this.sb.user && this.formCompromisso.id) {
          await window.MX_SB.deletarCompromisso(this.formCompromisso.id);
        }
        this.compromissos = this.compromissos.filter(c => c.id !== this.formCompromisso.id);
        this.salvar();
        this.modalCompromisso = false;
        this.showToast('Compromisso removido');
      } catch (err) { alert('Erro: ' + err.message); }
    },

    // ============================================================
    // PROPOSITURAS (processos legislativos)
    // ============================================================
    abrirPropositura(p) {
      this.formPropositura = p ? { ...emptyPropositura(), ...JSON.parse(JSON.stringify(p)) } : emptyPropositura();
      this.modalPropositura = true;
    },
    async salvarPropositura() {
      if (!this.formPropositura.titulo?.trim()) { this.showToast('Informe o título'); return; }
      if (!this.formPropositura.tipo) { this.showToast('Selecione o tipo'); return; }
      try {
        if (this.sb.ready && this.sb.user) {
          const salvo = await window.MX_SB.salvarPropositura(this.formPropositura);
          if (this.formPropositura.id) {
            const idx = this.proposituras.findIndex(p => p.id === this.formPropositura.id);
            if (idx >= 0) this.proposituras[idx] = salvo;
          } else {
            this.proposituras.push(salvo);
          }
        } else {
          if (this.formPropositura.id) {
            const idx = this.proposituras.findIndex(p => p.id === this.formPropositura.id);
            if (idx >= 0) this.proposituras[idx] = { ...this.formPropositura };
          } else {
            this.formPropositura.id = uid();
            this.formPropositura.criadoEm = new Date().toISOString();
            this.proposituras.push({ ...this.formPropositura });
          }
        }
        this.salvar();
        this.modalPropositura = false;
        this.showToast('Processo salvo');
      } catch (err) { alert('Erro: ' + err.message); }
    },
    async removerPropositura() {
      if (!confirm('Excluir esse processo?')) return;
      try {
        if (this.sb.ready && this.sb.user && this.formPropositura.id) {
          await window.MX_SB.deletarPropositura(this.formPropositura.id);
        }
        this.proposituras = this.proposituras.filter(p => p.id !== this.formPropositura.id);
        this.salvar();
        this.modalPropositura = false;
        this.showToast('Processo removido');
      } catch (err) { alert('Erro: ' + err.message); }
    },
    proposturasFiltradas() {
      const f = this.filtroProp;
      const busca = (f.busca || '').toLowerCase().trim();
      return this.proposituras
        .filter(p => !busca || p.titulo.toLowerCase().includes(busca) || (p.numero || '').includes(busca))
        .filter(p => !f.tipo || p.tipo === f.tipo)
        .filter(p => !f.status || p.status === f.status)
        .sort((a, b) => (b.dataProtocolo || '').localeCompare(a.dataProtocolo || ''));
    },
    propStatusClass(s) {
      return {
        'Em elaboração': 'bg-slate-100 text-slate-700',
        'Protocolado':   'bg-blue-100 text-blue-700',
        'Em tramitação': 'bg-amber-100 text-amber-700',
        'Aprovado':      'bg-emerald-100 text-emerald-700',
        'Rejeitado':     'bg-rose-100 text-rose-700',
        'Arquivado':     'bg-slate-200 text-slate-600',
      }[s] || 'bg-slate-100 text-slate-700';
    },

    // ============================================================
    // EMENDAS
    // ============================================================
    abrirEmenda(e) {
      this.formEmenda = e ? { ...emptyEmenda(), ...JSON.parse(JSON.stringify(e)) } : emptyEmenda();
      this.modalEmenda = true;
    },
    async salvarEmenda() {
      if (!this.formEmenda.titulo?.trim()) { this.showToast('Informe o título'); return; }
      try {
        if (this.sb.ready && this.sb.user) {
          const salvo = await window.MX_SB.salvarEmenda(this.formEmenda);
          if (this.formEmenda.id) {
            const idx = this.emendas.findIndex(e => e.id === this.formEmenda.id);
            if (idx >= 0) this.emendas[idx] = salvo;
          } else {
            this.emendas.push(salvo);
          }
        } else {
          if (this.formEmenda.id) {
            const idx = this.emendas.findIndex(e => e.id === this.formEmenda.id);
            if (idx >= 0) this.emendas[idx] = { ...this.formEmenda };
          } else {
            this.formEmenda.id = uid();
            this.formEmenda.criadoEm = new Date().toISOString();
            this.emendas.push({ ...this.formEmenda });
          }
        }
        this.salvar();
        this.modalEmenda = false;
        this.showToast('Emenda salva');
      } catch (err) { alert('Erro: ' + err.message); }
    },
    async removerEmenda() {
      if (!confirm('Excluir essa emenda?')) return;
      try {
        if (this.sb.ready && this.sb.user && this.formEmenda.id) {
          await window.MX_SB.deletarEmenda(this.formEmenda.id);
        }
        this.emendas = this.emendas.filter(e => e.id !== this.formEmenda.id);
        this.salvar();
        this.modalEmenda = false;
        this.showToast('Emenda removida');
      } catch (err) { alert('Erro: ' + err.message); }
    },
    formatMoeda(v) {
      const n = Number(v) || 0;
      return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    totalEmendas() {
      return this.emendas.reduce((s, e) => s + (Number(e.valor) || 0), 0);
    },

    // ============================================================
    // RANKING DE LIDERANÇAS
    // ============================================================
    rankingLiderancas() {
      const liderancas = this.eleitores.filter(e => (e.marcadores || []).includes('Liderança'));
      return liderancas.map(l => {
        const demandas = this.demandas.filter(d => d.eleitorId === l.id);
        const resolvidas = demandas.filter(d => d.status === 'Resolvida').length;
        const abertas = demandas.filter(d => d.status === 'Aberta' || d.status === 'Em andamento').length;
        const indicacoes = this.eleitores.filter(e => (e.obs || '').toLowerCase().includes(l.nome.split(' ')[0].toLowerCase())).length;
        const diasContato = this.diasDesdeContato(l);
        // Score: 10 pontos por resolvida, 3 por demanda total, 5 por indicação, -1 por dia sem contato (cap 30)
        const score = (resolvidas * 10) + (demandas.length * 3) + (indicacoes * 5) - Math.min(diasContato || 0, 30);
        return {
          ...l,
          totalDemandas: demandas.length,
          resolvidas,
          abertas,
          indicacoes,
          diasContato: diasContato || 0,
          score: Math.max(0, score),
        };
      }).sort((a, b) => b.score - a.score);
    },

    // ============================================================
    // RECURSOS PRO (locked)
    // ============================================================
    recursosPro: {
      'pro-disparo': {
        nome: 'Disparo em massa',
        emoji: '📢',
        cor: 'from-sky-500 to-cyan-600',
        desc: 'Dispara WhatsApp ou SMS pra listas filtradas (por bairro, nicho, marcador, envolvimento) com template + variáveis. Anti-bloqueio com intervalos aleatórios entre envios.',
        beneficios: [
          'Filtros poderosos: bairro × nicho × envolvimento × marcador',
          'Templates personalizados com variáveis ({{nome}}, {{bairro}}…)',
          'Envio com intervalo aleatório pra não bloquear o número',
          'Relatório de entregas, leituras e respostas',
        ],
      },
      'pro-ia': {
        nome: 'Atendimentos por IA',
        emoji: '🤖',
        cor: 'from-purple-500 to-fuchsia-500',
        desc: 'IA que responde mensagens dos eleitores no WhatsApp automaticamente — categoriza, prioriza e abre atendimento no painel. Aprende com o histórico do mandato e mantém o tom de voz do Marco.',
        beneficios: [
          'Atendimento 24/7 sem assessor parado no celular',
          'Triagem automática das demandas urgentes',
          'Histórico completo de cada conversa',
          'Aprende as respostas certas com o tempo',
        ],
      },
      'pro-posts': {
        nome: 'Posts automáticos',
        emoji: '✨',
        cor: 'from-sky-500 to-blue-600',
        desc: 'IA cria carrosséis, posts e legendas com a identidade visual e o tom de voz do gabinete. Você só aprova e publica.',
        beneficios: [
          'Pauta semanal automática alinhada à agenda',
          'Carrosséis 1080×1350 com identidade da marca',
          'Variações por nicho (Sta Luzia, TG 94, romeiros…)',
          'Fila de agendamento pra Instagram e Facebook',
        ],
      },
      'pro-trafego': {
        nome: 'Tráfego pago com IA',
        emoji: '🎯',
        cor: 'from-emerald-500 to-teal-600',
        desc: 'Campanhas em Meta Ads geradas e otimizadas por IA — segmentação dos seus nichos e bairros, criativos e copy prontos, budget gerenciado automaticamente.',
        beneficios: [
          'Públicos custom dos seus eleitores conquistados',
          'Criativos gerados com fotos do mandato',
          'Otimização automática de budget',
          'Relatório semanal de ROI por bairro',
        ],
      },
      'pro-site': {
        nome: 'Site institucional',
        emoji: '🌐',
        cor: 'from-amber-500 to-orange-500',
        desc: 'Site profissional do mandato — biografia, projetos de lei, atendimentos, notícias e formulário público integrado ao painel.',
        beneficios: [
          'Domínio próprio + hospedagem inclusos',
          'Página de transparência (atendimentos resolvidos)',
          'Notícias e prestação de contas',
          'Formulário do eleitor já integrado',
        ],
      },
      'pro-analise-ia': {
        nome: 'IA analisa o mandato',
        emoji: '🧠',
        cor: 'from-violet-500 to-indigo-600',
        desc: 'Exporta dados consolidados (eleitores, atendimentos, processos, redes, comissões) e a IA gera um diagnóstico completo do mandato: o que está indo bem, gargalos, oportunidades, alertas e recomendações estratégicas — atualizado mensalmente.',
        beneficios: [
          'Diagnóstico mensal estratégico em PDF',
          'Identifica bairros e nichos com baixo engajamento',
          'Sugere pautas de comissão alinhadas ao território',
          'Compara desempenho ao longo do mandato',
          'Alertas pré-eleitorais: o que ajustar antes do período crítico',
        ],
      },
    },

    seedSolicitacoesTeste() {
      const seed = [
        { nome: 'Maria Aparecida Lima', telefone: '(19) 9 9988-7766', email: '', bairro: 'Vista Alegre', tipo: 'Saúde', descricao: 'Minha mãe (78 anos) está sem conseguir marcar consulta no posto há 2 meses. Precisa de retorno do clínico.', endereco: 'Rua das Flores, 123' },
        { nome: 'José Roberto', telefone: '(19) 9 7766-5544', email: 'jr@email.com', bairro: 'Novo Horizonte', tipo: 'Iluminação', descricao: 'Três postes apagados na Rua dos Pinheiros há mais de 20 dias. A rua tá perigosa à noite.', endereco: 'Rua dos Pinheiros, próximo ao nº 400' },
      ];
      seed.forEach(s => {
        this.solicitacoes.push({
          ...s,
          id: uid(),
          protocolo: 'MX-TESTE-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
          enviadoEm: new Date().toISOString(),
          status: 'pendente',
          origem: 'Site público',
          consentimento: true,
        });
      });
      this.salvarSolicitacoes();
      this.showToast(seed.length + ' solicitações de teste adicionadas');
    },

    // ============================================================
    // WAHA — WhatsApp HTTP API
    // ============================================================
    wahaConfigurado() {
      return !!(this.config.wahaUrl && this.config.wahaSession);
    },
    wahaBase() {
      return (this.config.wahaUrl || '').replace(/\/+$/, '');
    },
    async wahaFetch(path, opts = {}) {
      const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
      if (this.config.wahaApiKey) headers['X-Api-Key'] = this.config.wahaApiKey;
      const url = this.wahaBase() + path;
      try {
        const resp = await fetch(url, { ...opts, headers });
        const text = await resp.text();
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = text; }
        if (!resp.ok) {
          const msg = (data && data.message) || (data && data.error) || resp.status + ' ' + resp.statusText;
          throw new Error(msg);
        }
        return data;
      } catch (err) {
        if (err.name === 'TypeError' && /failed to fetch/i.test(err.message)) {
          throw new Error('Não consegui falar com o WAHA. Verifica a URL, se está online, e se o CORS permite esse domínio.');
        }
        throw err;
      }
    },

    async wahaStatusCheck() {
      if (!this.wahaConfigurado()) { this.waha.status = 'unknown'; return; }
      try {
        const session = await this.wahaFetch(`/api/sessions/${encodeURIComponent(this.config.wahaSession)}`);
        const status = session?.status || 'unknown';
        this.waha.status = status;
        this.waha.ultimoErro = null;
        if (status === 'WORKING') {
          this.waha.qrDataUrl = null;
          if (!this.waha.me) {
            try {
              const me = await this.wahaFetch(`/api/sessions/${encodeURIComponent(this.config.wahaSession)}/me`);
              this.waha.me = me;
            } catch {}
          }
        } else if (status === 'SCAN_QR_CODE') {
          await this.wahaCarregarQR();
        } else {
          this.waha.qrDataUrl = null;
          this.waha.me = null;
        }
      } catch (err) {
        // Se a sessão não existe, status STOPPED
        if (/not found|404/i.test(err.message)) {
          this.waha.status = 'STOPPED';
        } else {
          this.waha.ultimoErro = err.message;
        }
      }
    },

    async wahaCarregarQR() {
      const session = encodeURIComponent(this.config.wahaSession);
      const headers = {};
      if (this.config.wahaApiKey) headers['X-Api-Key'] = this.config.wahaApiKey;

      // WAHA pode retornar JSON {mimetype,data}, imagem direta (PNG), ou texto raw (data string)
      try {
        const resp = await fetch(`${this.wahaBase()}/api/${session}/auth/qr?format=image`, { headers });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const ct = (resp.headers.get('content-type') || '').toLowerCase();

        if (ct.includes('application/json')) {
          const data = await resp.json();
          if (data && data.data) {
            this.waha.qrDataUrl = data.data.startsWith('data:')
              ? data.data
              : `data:${data.mimetype || 'image/png'};base64,${data.data}`;
          }
        } else if (ct.includes('image/')) {
          const blob = await resp.blob();
          // libera URL antiga se houver
          if (this.waha.qrDataUrl?.startsWith('blob:')) URL.revokeObjectURL(this.waha.qrDataUrl);
          this.waha.qrDataUrl = URL.createObjectURL(blob);
        } else {
          // texto raw — gera QR via serviço externo (lê string e renderiza)
          const text = (await resp.text()).trim();
          if (text) {
            this.waha.qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=${encodeURIComponent(text)}`;
          }
        }
        this.waha.ultimoErro = null;
      } catch (err) {
        this.waha.ultimoErro = 'QR não disponível: ' + err.message;
      }
    },

    async wahaConectar() {
      if (!this.wahaConfigurado()) { this.showToast('Configure a URL do WAHA antes'); this.goTo('config'); return; }
      const session = encodeURIComponent(this.config.wahaSession);
      this.waha.status = 'starting';
      this.waha.ultimoErro = null;
      try {
        // 1) Garante que a sessão existe (POST /api/sessions {name})
        try {
          await this.wahaFetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({ name: this.config.wahaSession, start: true })
          });
        } catch (err) {
          // já existe? tudo bem, segue
          if (!/already|exists|409|conflict/i.test(err.message)) {
            // tenta fallback legacy /api/sessions/start
            try {
              await this.wahaFetch('/api/sessions/start', {
                method: 'POST',
                body: JSON.stringify({ name: this.config.wahaSession })
              });
            } catch {}
          }
        }
        // 2) Inicia a sessão (POST /api/sessions/{session}/start)
        try {
          await this.wahaFetch(`/api/sessions/${session}/start`, { method: 'POST' });
        } catch (err) {
          // se já estiver rodando, ignora
          if (!/already|running|409|conflict/i.test(err.message)) {
            console.warn('[waha] start avisou:', err.message);
          }
        }
      } catch (err) {
        this.waha.ultimoErro = err.message;
      }
      this.wahaIniciarPolling();
    },

    async wahaParar() {
      if (!confirm('Desconectar o WhatsApp? Será necessário escanear o QR de novo pra reconectar.')) return;
      const session = encodeURIComponent(this.config.wahaSession);
      try {
        await this.wahaFetch(`/api/sessions/${session}/logout`, { method: 'POST' });
      } catch (err) {
        try { await this.wahaFetch(`/api/sessions/${session}/stop`, { method: 'POST' }); } catch {}
      }
      this.waha.status = 'STOPPED';
      this.waha.qrDataUrl = null;
      this.waha.me = null;
      this.showToast('WhatsApp desconectado');
    },

    wahaIniciarPolling() {
      this.wahaPararPolling();
      this.wahaStatusCheck();
      this.waha.pollTimer = setInterval(() => this.wahaStatusCheck(), 2500);
    },
    wahaPararPolling() {
      if (this.waha.pollTimer) {
        clearInterval(this.waha.pollTimer);
        this.waha.pollTimer = null;
      }
    },

    async wahaEnviarTexto(telefone, texto) {
      const num = (telefone || '').replace(/\D/g, '');
      const numero = num.startsWith('55') ? num : '55' + num;
      const chatId = numero + '@c.us';
      return await this.wahaFetch('/api/sendText', {
        method: 'POST',
        body: JSON.stringify({
          session: this.config.wahaSession,
          chatId,
          text: texto,
        })
      });
    },

    async wahaTesteEnvio() {
      if (!this.waha.testNumero?.trim()) { this.showToast('Informe o número de teste'); return; }
      this.waha.testando = true;
      try {
        await this.wahaEnviarTexto(this.waha.testNumero, this.waha.testMsg);
        this.showToast('Mensagem enviada!');
      } catch (err) {
        alert('Erro ao enviar: ' + err.message);
      } finally {
        this.waha.testando = false;
      }
    },

    // ============================================================
    // ZAP — Chat estilo Kommo (lista de conversas + thread)
    // ============================================================
    async zapCarregarChats() {
      if (this.waha.status !== 'WORKING') {
        this.showToast('Conecta o WhatsApp primeiro');
        this.goTo('whatsapp');
        return;
      }
      this.zap.carregandoChats = true;
      try {
        const session = encodeURIComponent(this.config.wahaSession);
        const data = await this.wahaFetch(`/api/${session}/chats/overview?limit=100`);
        this.zap.chats = Array.isArray(data) ? data : [];
        // Pré-carrega fotos em background pros 20 primeiros
        this.zap.chats.slice(0, 20).forEach(c => this.zapCarregarFoto(c.id));
      } catch (err) {
        this.showToast('Erro ao carregar conversas: ' + err.message);
        this.zap.chats = [];
      } finally {
        this.zap.carregandoChats = false;
      }
    },

    async zapCarregarFoto(chatId) {
      if (!chatId || this.zap.fotos[chatId] !== undefined) return;
      // Marca como "em carregamento" pra evitar requisições duplicadas
      this.zap.fotos[chatId] = null;
      const session = this.config.wahaSession;
      // Tenta 2 formatos: endpoint novo /api/contacts/profile-picture?session=...&contactId=...
      // e endpoint antigo /api/{session}/contacts/profile-picture?contactId=...
      const tentativas = [
        `/api/contacts/profile-picture?session=${encodeURIComponent(session)}&contactId=${encodeURIComponent(chatId)}`,
        `/api/${encodeURIComponent(session)}/contacts/profile-picture?contactId=${encodeURIComponent(chatId)}`,
      ];
      for (const path of tentativas) {
        try {
          const resp = await this.wahaFetch(path);
          const url = resp?.profilePictureURL || resp?.url || resp?.picture || resp?.profilePictureUrl;
          if (url) {
            this.zap.fotos[chatId] = url;
            return;
          }
        } catch (err) {
          // tenta próximo
        }
      }
      // sem foto encontrada — fica null e o UI cai pra avatar com iniciais
    },

    chatsFiltrados() {
      let arr = this.zap.chats;
      const busca = (this.zap.buscaChat || '').toLowerCase().trim();
      if (busca) {
        arr = arr.filter(c => {
          const nome = (c.name || c.id || '').toLowerCase();
          const lastMsg = (c.lastMessage?.body || '').toLowerCase();
          return nome.includes(busca) || lastMsg.includes(busca);
        });
      }
      if (this.zap.filtroChat === 'naolido') {
        arr = arr.filter(c => (c.unreadCount || 0) > 0);
      } else if (this.zap.filtroChat === 'cadastrados') {
        arr = arr.filter(c => this.eleitorPorChat(c));
      }
      return arr;
    },

    eleitorPorChat(chat) {
      const num = (chat?.id || '').replace(/\D/g, '');
      if (!num) return null;
      return this.eleitores.find(e => {
        const t = (e.telefone || '').replace(/\D/g, '');
        if (!t) return false;
        return t === num || num.endsWith(t) || t.endsWith(num);
      });
    },

    async abrirChat(chat) {
      this.zap.chatAtivo = chat;
      this.zap.mensagens = [];
      await this.zapCarregarMensagens();
      // marca como lido
      try {
        const session = encodeURIComponent(this.config.wahaSession);
        await this.wahaFetch(`/api/${session}/chats/${encodeURIComponent(chat.id)}/messages/read`, { method: 'POST' });
        const idx = this.zap.chats.findIndex(c => c.id === chat.id);
        if (idx >= 0) this.zap.chats[idx].unreadCount = 0;
      } catch {}
      // ativa polling de novas mensagens
      this.zapIniciarPollMensagens();
    },

    async zapCarregarMensagens() {
      if (!this.zap.chatAtivo) return;
      this.zap.carregandoMsgs = true;
      try {
        const session = encodeURIComponent(this.config.wahaSession);
        const chatId = encodeURIComponent(this.zap.chatAtivo.id);
        // downloadMedia=true → WAHA inclui URL da mídia no campo `media`
        const data = await this.wahaFetch(`/api/${session}/chats/${chatId}/messages?limit=50&downloadMedia=true`);
        this.zap.mensagens = (Array.isArray(data) ? data : []).reverse();
        setTimeout(() => {
          const el = document.getElementById('zap-thread');
          if (el) el.scrollTop = el.scrollHeight;
        }, 50);
      } catch (err) {
        this.showToast('Erro ao carregar mensagens: ' + err.message);
      } finally {
        this.zap.carregandoMsgs = false;
      }
    },

    // Tipo de mídia simplificado pra UI
    midiaTipo(m) {
      const mime = (m?.media?.mimetype || m?.mimetype || '').toLowerCase();
      if (!mime && !m?.hasMedia) return null;
      if (mime.startsWith('image/')) return 'image';
      if (mime.startsWith('video/')) return 'video';
      if (mime.startsWith('audio/') || mime.startsWith('ptt') || mime === 'audio/ogg; codecs=opus') return 'audio';
      if (mime) return 'file';
      return m?.hasMedia ? 'file' : null;
    },
    midiaUrlOriginal(m) {
      const u = m?.media?.url || m?.url || m?.mediaUrl || null;
      if (!u) return null;
      // Se for relativa, prefixa com a base do WAHA
      if (u.startsWith('/')) return this.wahaBase() + u;
      return u;
    },
    midiaUrl(m) {
      const orig = this.midiaUrlOriginal(m);
      if (!orig) return null;
      // Se já carregamos como blob, retorna o blob URL (autenticado)
      if (this.zap.midiaCache[orig]) return this.zap.midiaCache[orig];
      // Senão dispara fetch em background e retorna null por enquanto
      this.carregarMidiaBlob(orig);
      return null;
    },
    midiaNome(m) {
      return m?.media?.filename || m?.filename || m?.body || 'arquivo';
    },
    async carregarMidiaBlob(url) {
      if (!url || this.zap.midiaCache[url] || this.zap._midiaCarregando?.[url]) return;
      if (!this.zap._midiaCarregando) this.zap._midiaCarregando = {};
      this.zap._midiaCarregando[url] = true;
      try {
        const headers = {};
        if (this.config.wahaApiKey) headers['X-Api-Key'] = this.config.wahaApiKey;
        const resp = await fetch(url, { headers });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        this.zap.midiaCache[url] = blobUrl;
      } catch (err) {
        // marca como "falhou" pra não tentar de novo infinitamente
        this.zap.midiaCache[url] = '';
      } finally {
        delete this.zap._midiaCarregando[url];
      }
    },

    zapIniciarPollMensagens() {
      this.zapPararPolling();
      this.zap.pollTimer = setInterval(() => {
        if (this.view === 'conversas' && this.zap.chatAtivo) {
          this.zapCarregarMensagens();
        }
      }, 8000);
    },
    zapPararPolling() {
      if (this.zap.pollTimer) {
        clearInterval(this.zap.pollTimer);
        this.zap.pollTimer = null;
      }
    },

    async zapEnviarMsg() {
      const texto = (this.zap.inputMsg || '').trim();
      if (!texto || !this.zap.chatAtivo) return;
      this.zap.enviando = true;
      const tmp = texto;
      this.zap.inputMsg = '';
      try {
        await this.wahaFetch('/api/sendText', {
          method: 'POST',
          body: JSON.stringify({
            session: this.config.wahaSession,
            chatId: this.zap.chatAtivo.id,
            text: tmp,
          })
        });
        // adiciona localmente já pra UI parecer rápida
        this.zap.mensagens.push({
          id: { fromMe: true, id: 'tmp-' + Date.now() },
          body: tmp,
          fromMe: true,
          timestamp: Math.floor(Date.now() / 1000),
          local: true,
        });
        setTimeout(() => {
          const el = document.getElementById('zap-thread');
          if (el) el.scrollTop = el.scrollHeight;
        }, 50);
        // recarrega de verdade depois de 1s pra trazer o ID real
        setTimeout(() => this.zapCarregarMensagens(), 1500);
        // marca contato feito se for eleitor cadastrado
        const e = this.eleitorPorChat(this.zap.chatAtivo);
        if (e) this.marcarContatoFeito(e);
      } catch (err) {
        this.zap.inputMsg = tmp; // restaura se falhou
        alert('Falha ao enviar: ' + err.message);
      } finally {
        this.zap.enviando = false;
      }
    },

    formatHoraMsg(ts) {
      if (!ts) return '';
      const d = new Date(ts * 1000);
      const hoje = new Date();
      const ontem = new Date(); ontem.setDate(hoje.getDate() - 1);
      const ymdMsg = d.toISOString().slice(0, 10);
      const ymdHoje = hoje.toISOString().slice(0, 10);
      const ymdOntem = ontem.toISOString().slice(0, 10);
      const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      if (ymdMsg === ymdHoje) return hora;
      if (ymdMsg === ymdOntem) return 'ontem ' + hora;
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' + hora;
    },

    async enviarWhatsApp(eleitor, templateId = null) {
      // Se WAHA conectado, manda direto. Senão, abre wa.me como fallback.
      const t = this.getTemplate(templateId || this.templateAnivId);
      const msg = this.aplicarTemplate(t?.conteudo || '', eleitor);
      if (this.waha.status === 'WORKING') {
        try {
          await this.wahaEnviarTexto(eleitor.telefone, msg);
          this.showToast(`Mensagem enviada pra ${eleitor.nome.split(' ')[0]}`);
          this.marcarContatoFeito(eleitor);
        } catch (err) {
          alert('Falhou via WAHA: ' + err.message + '\n\nAbrindo no wa.me como fallback.');
          window.open(this.whatsappLink(eleitor, templateId), '_blank');
          this.marcarContatoFeito(eleitor);
        }
      } else {
        window.open(this.whatsappLink(eleitor, templateId), '_blank');
        this.marcarContatoFeito(eleitor);
      }
    },

    statusWAHALabel() {
      return {
        'unknown':      { label: 'Desconhecido', cor: 'bg-slate-100 text-slate-600',   dot: 'bg-slate-400' },
        'STOPPED':      { label: 'Desconectado', cor: 'bg-slate-200 text-slate-700',   dot: 'bg-slate-400' },
        'starting':     { label: 'Iniciando…',   cor: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500 animate-pulse' },
        'STARTING':     { label: 'Iniciando…',   cor: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500 animate-pulse' },
        'SCAN_QR_CODE': { label: 'Aguardando QR',cor: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500 animate-pulse' },
        'WORKING':      { label: 'Conectado',    cor: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
        'FAILED':       { label: 'Falhou',       cor: 'bg-rose-100 text-rose-700',     dot: 'bg-rose-500' },
      }[this.waha.status] || { label: this.waha.status, cor: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' };
    },

    // ============================================================
    // SUPABASE — banco compartilhado
    // ============================================================
    sbConfigurado() {
      return !!(window.MX_SB_CONFIG?.url && window.MX_SB_CONFIG?.anonKey);
    },
    async sbInit() {
      if (!this.sbConfigurado()) return;
      try {
        await window.MX_SB.init(window.MX_SB_CONFIG.url, window.MX_SB_CONFIG.anonKey);
        this.sb.ready = true;
        this.sb.user = window.MX_SB.getUser();

        // Escuta mudanças de autenticação
        window.MX_SB.onAuthChange((session) => {
          this.sb.user = session?.user || null;
          this.sb.loginOpen = !this.sb.user;
          if (this.sb.user) {
            this.sbSincronizar();
            this.sbAtivarRealtime();
          } else {
            this.sbDesativarRealtime();
          }
        });

        if (this.sb.user) {
          // já logado → fecha modal
          this.sb.loginOpen = false;
          await this.sbSincronizar();
          this.sbAtivarRealtime();
        } else {
          // sem sessão → mantém modal aberto (já tá true por padrão)
          this.sb.loginOpen = true;
        }
      } catch (err) {
        this.sb.ultimoErro = err.message;
        console.error('[supabase] init falhou:', err);
      }
    },
    async sbReconectar() {
      await this.sbInit();
      this.showToast('Tentando reconectar...');
    },
    async sbLogin() {
      this.sb.loginErro = '';
      if (!this.sb.loginEmail || !this.sb.loginPassword) {
        this.sb.loginErro = 'Preencha email e senha';
        return;
      }
      this.sb.loginCarregando = true;
      try {
        // Garante que o cliente está inicializado antes do login
        if (!window.MX_SB.isReady()) {
          await window.MX_SB.init(window.MX_SB_CONFIG.url, window.MX_SB_CONFIG.anonKey);
        }
        await window.MX_SB.login(this.sb.loginEmail.trim(), this.sb.loginPassword);
        this.sb.loginEmail = '';
        this.sb.loginPassword = '';
        this.sb.loginOpen = false;
        this.showToast('Login feito');
      } catch (err) {
        this.sb.loginErro = this.traduzirErroLogin(err);
      } finally {
        this.sb.loginCarregando = false;
      }
    },
    traduzirErroLogin(err) {
      const msg = (err?.message || '').toLowerCase();
      const code = err?.code || err?.status;
      if (msg.includes('invalid login') || msg.includes('invalid_credentials') || code === 'invalid_credentials') {
        return 'Email ou senha incorretos';
      }
      if (msg.includes('email not confirmed') || msg.includes('email_not_confirmed')) {
        return 'Conta ainda não foi confirmada. No Studio, marque "Auto Confirm" no usuário.';
      }
      if (msg.includes('user not found') || msg.includes('user_not_found')) {
        return 'Conta não existe. Crie o usuário no Studio Auth primeiro.';
      }
      if (msg.includes('rate limit') || code === 429) {
        return 'Muitas tentativas. Aguarde 1 minuto e tente de novo.';
      }
      if (msg.includes('failed to fetch') || msg.includes('network')) {
        return 'Não consegui conectar ao Supabase. Verifica se ele está no ar.';
      }
      if (msg.includes('supabase não inicializado')) {
        return 'Cliente carregando — tenta de novo em 1 segundo.';
      }
      return err?.message || 'Falha no login';
    },
    async sbLogout() {
      if (!confirm('Sair da conta?')) return;
      await window.MX_SB.logout();
      this.sb.user = null;
      this.sb.loginOpen = true;
      this.sbDesativarRealtime();
    },
    async sbSincronizar() {
      if (!window.MX_SB.isReady() || !this.sb.user) return;
      this.sb.sincronizando = true;
      try {
        // Roda tudo em paralelo
        const [
          eleitoresRemote,
          demandasRemote,
          compromissosRemote,
          proposiRemote,
          emendasRemote,
          solicRemote,
          perfis,
          perfilProprio,
          configRemote,
        ] = await Promise.all([
          window.MX_SB.listarEleitores(),
          window.MX_SB.listarDemandas(),
          window.MX_SB.listarCompromissos(),
          window.MX_SB.listarProposituras(),
          window.MX_SB.listarEmendas(),
          window.MX_SB.listarSolicitacoes(),
          window.MX_SB.listarPerfis().catch(() => []),
          window.MX_SB.meuPerfil(),
          window.MX_SB.getAllConfig(),
        ]);
        this.eleitores = eleitoresRemote;
        this.demandas = demandasRemote;
        this.compromissos = compromissosRemote;
        this.proposituras = proposiRemote;
        this.emendas = emendasRemote;
        this.solicitacoes = solicRemote;
        this.sb.perfis = perfis;
        this.sb.perfil = perfilProprio;
        // Config: aplica todos os valores que existem no banco
        if (configRemote.nome_vereador !== undefined) this.config.nomeVereador = configRemote.nome_vereador;
        if (configRemote.proxima_eleicao !== undefined) this.config.proximaEleicao = configRemote.proxima_eleicao;
        if (Array.isArray(configRemote.marcadores)) this.config.marcadores = configRemote.marcadores;
        if (Array.isArray(configRemote.nichos))     this.config.nichos = configRemote.nichos;
        if (Array.isArray(configRemote.mensagens_padrao)) this.config.mensagensPadrao = configRemote.mensagens_padrao;
        if (configRemote.waha_url !== undefined)        this.config.wahaUrl = configRemote.waha_url;
        if (configRemote.waha_api_key !== undefined)    this.config.wahaApiKey = configRemote.waha_api_key;
        if (configRemote.waha_session !== undefined)    this.config.wahaSession = configRemote.waha_session;
        if (configRemote.dias_sem_contato !== undefined) this.diasSemContato = configRemote.dias_sem_contato;
        if (configRemote.cartas_texto_base !== undefined) this.cartasTextoBase = configRemote.cartas_texto_base;
        // Reinicia status do WAHA com a nova URL/key
        if (this.config.wahaUrl) this.wahaStatusCheck();
        // Cache local pra modo offline
        this.salvar();
        this.salvarSolicitacoes();
        this.sb.ultimoErro = null;
      } catch (err) {
        this.sb.ultimoErro = err.message;
        console.error('[supabase] sync falhou:', err);
      } finally {
        this.sb.sincronizando = false;
      }
    },
    souAdmin() {
      return this.sb.perfil?.papel === 'admin' && this.sb.perfil?.ativo;
    },
    async salvarPerfil(perfilLocal) {
      try {
        const patch = { nome: perfilLocal.nome, papel: perfilLocal.papel, ativo: perfilLocal.ativo };
        const atualizado = await window.MX_SB.atualizarPerfil(perfilLocal.id, patch);
        const idx = this.sb.perfis.findIndex(p => p.id === perfilLocal.id);
        if (idx >= 0) this.sb.perfis[idx] = atualizado;
        // Se atualizou o próprio
        if (perfilLocal.id === this.sb.user?.id) this.sb.perfil = atualizado;
        this.showToast('Perfil atualizado');
      } catch (err) {
        alert('Erro: ' + err.message);
      }
    },
    async toggleAdmin(perfil) {
      const novoPapel = perfil.papel === 'admin' ? 'assessor' : 'admin';
      if (!confirm(`${novoPapel === 'admin' ? 'Promover' : 'Rebaixar'} ${perfil.nome} para ${novoPapel}?`)) return;
      perfil.papel = novoPapel;
      await this.salvarPerfil(perfil);
    },
    async toggleAtivo(perfil) {
      perfil.ativo = !perfil.ativo;
      await this.salvarPerfil(perfil);
    },

    // Criar / deletar usuário direto do painel (admin only)
    abrirNovoUser() {
      this.sb.formNovoUser = { nome: '', email: '', senha: '', papel: 'assessor' };
      this.sb.erroNovoUser = '';
      this.sb.modalNovoUser = true;
    },
    async criarNovoUser() {
      const f = this.sb.formNovoUser;
      this.sb.erroNovoUser = '';
      if (!f.nome?.trim()) { this.sb.erroNovoUser = 'Informe o nome'; return; }
      if (!f.email?.trim()) { this.sb.erroNovoUser = 'Informe o email'; return; }
      if (!f.senha || f.senha.length < 6) { this.sb.erroNovoUser = 'Senha precisa ter pelo menos 6 caracteres'; return; }
      this.sb.criandoUser = true;
      try {
        await window.MX_SB.criarUsuario({
          email: f.email.trim().toLowerCase(),
          password: f.senha,
          nome: f.nome.trim(),
          papel: f.papel,
        });
        this.sb.modalNovoUser = false;
        await this.sbSincronizar();
        this.showToast(`Usuário ${f.nome} criado`);
      } catch (err) {
        const msg = (err?.message || '').toLowerCase();
        if (msg.includes('already') || msg.includes('exists') || msg.includes('duplicate')) {
          this.sb.erroNovoUser = 'Já existe usuário com esse email';
        } else if (msg.includes('invalid email')) {
          this.sb.erroNovoUser = 'Email inválido';
        } else if (msg.includes('password')) {
          this.sb.erroNovoUser = 'Senha não atende requisitos: ' + err.message;
        } else {
          this.sb.erroNovoUser = err.message || 'Falha ao criar';
        }
      } finally {
        this.sb.criandoUser = false;
      }
    },
    async deletarUsuario(perfil) {
      if (perfil.id === this.sb.user?.id) { this.showToast('Não dá pra excluir sua própria conta'); return; }
      if (!confirm(`Excluir ${perfil.nome} permanentemente? Não dá pra desfazer.`)) return;
      try {
        await window.MX_SB.deletarUsuario(perfil.id);
        this.sb.perfis = this.sb.perfis.filter(p => p.id !== perfil.id);
        this.showToast('Usuário excluído');
      } catch (err) {
        alert('Erro: ' + err.message);
      }
    },
    async resetarSenha(perfil) {
      const nova = prompt(`Nova senha para ${perfil.nome} (mínimo 6 caracteres):`);
      if (!nova || nova.length < 6) { if (nova !== null) alert('Senha muito curta'); return; }
      try {
        await window.MX_SB.resetarSenhaUsuario(perfil.id, nova);
        this.showToast('Senha trocada');
      } catch (err) {
        alert('Erro: ' + err.message);
      }
    },
    sbAtivarRealtime() {
      this.sbDesativarRealtime();
      this.sb.realtimeChannel = window.MX_SB.ouvirSolicitacoes((nova) => {
        // adiciona se ainda não existe
        if (!this.solicitacoes.find(s => s.id === nova.id)) {
          this.solicitacoes.unshift(nova);
          this.salvarSolicitacoes();
          this.notificarNova(nova);
        }
      });
    },
    sbDesativarRealtime() {
      if (this.sb.realtimeChannel) {
        try { window.MX_SB.getClient()?.removeChannel(this.sb.realtimeChannel); } catch {}
        this.sb.realtimeChannel = null;
      }
    },
    sbStatusLabel() {
      if (!this.sbConfigurado()) return { label: 'Não configurado', cor: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' };
      if (!this.sb.ready) return { label: 'Conectando…', cor: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500 animate-pulse' };
      if (!this.sb.user) return { label: 'Não logado', cor: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' };
      return { label: 'Conectado', cor: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' };
    },

    // === Exportação CSV ===
    exportarEleitoresCSV() {
      const rows = this.eleitoresFiltrados();
      const cols = ['nome','telefone','cpf','sexo','nascimento','bairro','endereco','email','redeSocial','envolvimento','marcadores','nichos','obs'];
      this.downloadCSV('eleitores', cols, rows.map(r => ({
        ...r,
        marcadores: (r.marcadores || []).join('; '),
        nichos: (r.nichos || []).join('; '),
      })));
    },
    exportarDemandasCSV() {
      const rows = this.demandasFiltradas();
      const cols = ['data','tipo','status','orgaoResponsavel','origem','classificacao','setor','descricao','prazo','notas'];
      this.downloadCSV('atendimentos', ['eleitor', ...cols], rows.map(r => ({
        eleitor: this.nomeEleitor(r.eleitorId),
        ...r,
      })));
    },
    exportarAniversariantesCSV() {
      const rows = this.aniversariantes(30);
      const cols = ['nome','telefone','bairro','nascimento'];
      this.downloadCSV('aniversariantes', cols, rows);
    },
    downloadCSV(nome, cols, rows) {
      const escape = v => {
        if (v === null || v === undefined) return '';
        const s = String(v).replace(/"/g, '""');
        return /[",\n;]/.test(s) ? `"${s}"` : s;
      };
      const header = cols.join(';');
      const body = rows.map(r => cols.map(c => escape(r[c])).join(';')).join('\n');
      const blob = new Blob(['﻿' + header + '\n' + body], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${nome}-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },

    // === Importação CSV ===
    importarCSV(ev) {
      const file = ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const text = e.target.result;
          const lines = text.replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
          const sep = lines[0].includes(';') ? ';' : ',';
          const header = lines[0].split(sep).map(h => h.trim().toLowerCase());
          const rows = lines.slice(1).map(l => {
            const cols = parseCSVLine(l, sep);
            const obj = {};
            header.forEach((h, i) => obj[h] = cols[i] || '');
            return obj;
          });
          if (!confirm(`Importar ${rows.length} eleitores? Serão adicionados aos existentes.`)) return;
          rows.forEach(r => {
            this.eleitores.push({
              id: uid(),
              nome: r.nome || r.name || '',
              telefone: r.telefone || r.whatsapp || r.celular || '',
              cpf: r.cpf || '',
              sexo: r.sexo || '',
              nascimento: this.parseDataBr(r.nascimento || r.aniversario || r['data de nascimento'] || ''),
              bairro: r.bairro || '',
              endereco: r.endereco || r['endereço'] || '',
              email: r.email || '',
              redeSocial: r.redesocial || r['rede social'] || r.instagram || '',
              envolvimento: r.envolvimento || 'Não trabalhado',
              marcadores: (r.marcadores || '').split(/[,;]/).map(s => s.trim()).filter(Boolean),
              nichos: (r.nichos || r.categorias || '').split(/[,;]/).map(s => s.trim()).filter(Boolean),
              obs: r.obs || r.observacoes || '',
              criadoEm: new Date().toISOString(),
            });
          });
          this.salvar();
          this.showToast(`${rows.length} eleitores importados`);
        } catch (err) {
          console.error(err);
          alert('Erro ao importar CSV. Verifique o formato.');
        }
      };
      reader.readAsText(file, 'utf-8');
      ev.target.value = '';
    },
    parseDataBr(s) {
      if (!s) return '';
      s = s.trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
      const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
      if (!m) return '';
      const [_, d, mo, y] = m;
      const yy = y.length === 2 ? (parseInt(y) > 30 ? '19' + y : '20' + y) : y;
      return `${yy}-${mo.padStart(2,'0')}-${d.padStart(2,'0')}`;
    },

    // === Helpers ===
    primeiroNome() {
      return (this.config.nomeVereador || '').split(' ')[0].toUpperCase();
    },
    nomeEleitor(id) {
      return this.eleitores.find(e => e.id === id)?.nome || '(eleitor removido)';
    },
    iniciais(nome) {
      const partes = (nome || '').trim().split(/\s+/);
      return ((partes[0]?.[0] || '') + (partes[partes.length - 1]?.[0] || '')).toUpperCase() || '?';
    },
    formatDate(s) {
      if (!s) return '—';
      const [y, m, d] = s.split('-');
      return `${d}/${m}/${y}`;
    },
    formatBirthday(s) {
      if (!s) return '';
      const [, m, d] = s.split('-');
      const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
      return `${parseInt(d)} de ${meses[parseInt(m)-1]}`;
    },
    statusClass(s) {
      return {
        'Aberta':       'bg-amber-100 text-amber-700',
        'Em andamento': 'bg-blue-100 text-blue-700',
        'Resolvida':    'bg-emerald-100 text-emerald-700',
        'Cancelada':    'bg-slate-200 text-slate-600',
      }[s] || 'bg-slate-200 text-slate-700';
    },
    envolvimentoClass(s) {
      return {
        'Não trabalhado': 'bg-blue-100 text-blue-700',
        'Em prospecção':  'bg-emerald-100 text-emerald-700',
        'Conquistado':    'bg-purple-100 text-purple-700',
        'Perdido':        'bg-rose-100 text-rose-700',
      }[s] || 'bg-slate-200 text-slate-700';
    },
    showToast(msg) {
      this.toast = { show: true, msg };
      setTimeout(() => this.toast.show = false, 2200);
    },

    // === Backup ===
    exportar() {
      const data = { eleitores: this.eleitores, demandas: this.demandas, config: this.config, exportadoEm: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `painel-marco-xavier-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    importar(ev) {
      const file = ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          if (!confirm(`Importar ${data.eleitores?.length || 0} eleitores e ${data.demandas?.length || 0} atendimentos? Substitui dados atuais.`)) return;
          this.eleitores = data.eleitores || [];
          this.demandas = data.demandas || [];
          if (data.config) this.config = { ...this.config, ...data.config };
          this.salvar();
          this.showToast('Backup importado');
        } catch (err) {
          alert('Arquivo inválido.');
        }
      };
      reader.readAsText(file);
      ev.target.value = '';
    },
    limparTudo() {
      if (!confirm('Apagar TODOS os eleitores e atendimentos? Não pode ser desfeito.')) return;
      if (!confirm('Tem certeza mesmo? Faça backup antes.')) return;
      this.eleitores = [];
      this.demandas = [];
      this.salvar();
      this.showToast('Tudo limpo');
    },
    seedDados() {
      if (this.eleitores.length > 0 && !confirm('Já existem dados. Adicionar exemplos por cima?')) return;
      const seed = [
        { nome: 'Dona Maria das Graças', telefone: '19999990001', cpf: '111.111.111-11', sexo: 'F', bairro: 'Vista Alegre', nascimento: dataProxima(3), nichos: ['Católico Sta Luzia','Atendido pelo gabinete'], marcadores: ['Liderança','Mãe'], envolvimento: 'Conquistado', obs: 'Pediu ajuda com remédio de pressão.' },
        { nome: 'Seu João Batista', telefone: '19999990002', cpf: '222.222.222-22', sexo: 'M', bairro: 'Novo Horizonte', nascimento: dataProxima(10), nichos: ['Tiro de Guerra 94'], marcadores: ['Liderança'], envolvimento: 'Em prospecção', obs: 'Liderança comunitária do bairro.' },
        { nome: 'Cleusa Aparecida', telefone: '19999990003', cpf: '', sexo: 'F', bairro: 'Nova Suíça', nascimento: dataProxima(20), nichos: ['Católico Sta Luzia','Família'], marcadores: [], envolvimento: 'Não trabalhado', obs: '' },
        { nome: 'Roberto Carlos Silva', telefone: '19999990004', cpf: '', sexo: 'M', bairro: 'Vista Alegre', nascimento: dataProxima(45), nichos: ['Atendido pelo gabinete'], marcadores: [], envolvimento: 'Conquistado', obs: 'Atendido em 2025 — iluminação resolvida.' },
        { nome: 'Pedro Henrique', telefone: '19999990005', cpf: '', sexo: 'M', bairro: 'Novo Horizonte', nascimento: dataProxima(2), nichos: ['Romeiro','Voluntariado'], marcadores: ['Voluntário'], envolvimento: 'Em prospecção', obs: '' },
        { nome: 'Joana Aparecida Lima', telefone: '19999990006', cpf: '', sexo: 'F', bairro: 'Nova Suíça', nascimento: dataProxima(35), nichos: ['Família'], marcadores: ['Mãe'], envolvimento: 'Não trabalhado', obs: '' },
        { nome: 'Antônio Carlos', telefone: '19999990007', cpf: '', sexo: 'M', bairro: 'Vista Alegre', nascimento: dataProxima(8), nichos: ['Tiro de Guerra 94','Liderança'], marcadores: ['Liderança','Pai'], envolvimento: 'Conquistado', obs: '' },
        { nome: 'Solange Rocha', telefone: '19999990008', cpf: '', sexo: 'F', bairro: 'Novo Horizonte', nascimento: dataProxima(60), nichos: ['Voluntariado'], marcadores: [], envolvimento: 'Perdido', obs: 'Mudou de partido em 2024.' },
      ];
      seed.forEach(s => { s.id = uid(); s.criadoEm = new Date(Date.now() - Math.random() * 200 * 24 * 60 * 60 * 1000).toISOString(); this.eleitores.push(s); });

      const tipos = ['Saúde','Iluminação','Asfalto / Buraco','Educação','Assistência social','Saúde','Limpeza pública'];
      const statuses = ['Aberta','Em andamento','Resolvida','Resolvida','Aberta','Em andamento','Resolvida'];
      const orgaos = ['Secretaria de Saúde','Secretaria de Obras','Secretaria de Obras','Secretaria de Educação','Secretaria de Assistência Social','Secretaria de Saúde','Secretaria de Meio Ambiente'];
      const origens = ['Presencial','WhatsApp','Telefone','Presencial','WhatsApp','Visita do gabinete','Telefone'];
      const descs = ['Solicita visita do médico de família','Lâmpada queimada na rua há 15 dias','Buraco grande perto da escola','Vaga em creche pra neto','Cesta básica de emergência','Marcação de consulta SUS atrasada','Acúmulo de lixo na praça'];
      this.eleitores.slice(-7).forEach((e, i) => {
        this.demandas.push({
          id: uid(),
          eleitorId: e.id,
          tipo: tipos[i],
          status: statuses[i],
          orgaoResponsavel: orgaos[i],
          origem: origens[i],
          classificacao: i % 2 === 0 ? 'Pessoal' : 'Demanda do bairro',
          setor: tipos[i].includes('Saúde') ? 'Saúde' : tipos[i].includes('Educação') ? 'Educação' : 'Infraestrutura',
          descricao: descs[i],
          data: new Date(Date.now() - (i * 5 + 1) * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
          prazo: '',
          notas: '',
        });
      });
      this.salvar();
      this.showToast('Dados de exemplo carregados');
    },
  };
}

function emptyEleitor() {
  return {
    id: null, nome: '', telefone: '', telefoneRes: '', cpf: '', sexo: '',
    nascimento: '', bairro: '', endereco: '', cidade: 'Limeira', uf: 'SP',
    nichos: [], marcadores: [], envolvimento: 'Não trabalhado',
    tituloEleitor: '', localVotacao: '', email: '', redeSocial: '', obs: ''
  };
}
function emptyDemanda() {
  return {
    id: null, eleitorId: '', tipo: '', status: 'Aberta',
    orgaoResponsavel: '', origem: 'Presencial', classificacao: '', setor: '',
    descricao: '', data: new Date().toISOString().slice(0,10),
    prazo: '', notas: '', anexos: [], chatId: '', ultimaVisualizacao: null,
  };
}
function emptyCompromisso() {
  return {
    id: null, titulo: '', data: new Date().toISOString().slice(0, 10), hora: '',
    local: '', descricao: '', cor: '#1E5BBA', eleitorId: ''
  };
}
function emptyPropositura() {
  const ano = new Date().getFullYear();
  return {
    id: null, tipo: '', numero: '', ano,
    titulo: '', descricao: '', status: 'Em elaboração',
    dataProtocolo: '', dataAprovacao: '',
    coautores: '', linkPdf: '', observacoes: '',
  };
}
function emptyEmenda() {
  const ano = new Date().getFullYear();
  return {
    id: null, numero: '', ano, tipo: 'Emenda Impositiva',
    titulo: '', descricao: '', area: '',
    valor: 0, beneficiario: '',
    status: 'Em elaboração', dataProtocolo: '',
    proposturaId: '', observacoes: '',
  };
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function dataProxima(diasAfrente) {
  const d = new Date();
  d.setDate(d.getDate() + diasAfrente);
  return `1975-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function rankBars(map) {
  const arr = Object.entries(map).map(([k, total]) => ({ key: k, total }));
  const max = Math.max(...arr.map(r => r.total), 1);
  return arr.map(r => ({ ...r, pct: (r.total / max) * 100 })).sort((a, b) => b.total - a.total);
}
function parseCSVLine(line, sep) {
  const out = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i+1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === sep) { out.push(cur); cur = ''; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}
