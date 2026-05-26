# Marco Xavier — Mandato Vereador Limeira — MazyOS

> Workspace do mandato. Gabinete com Marco + 2 assessores. Aqui rodam
> comunicação, atendimento ao eleitor, cadastro de demandas, projetos
> de lei, atuação em comissões e gestão do dia a dia.

## O que é esse workspace

Operação do mandato do vereador Marco Xavier (Limeira-SP, 46ª Legislatura, 2026–2028). Tudo que o gabinete produz — texto, post, ofício, projeto, planilha de atendimento, relatório de comissão — passa por aqui.

**Estrutura de pastas:**
- `_memoria/` — quem é o Marco, como ele fala, foco atual
- `identidade/` — marca aplicada em tudo que o sistema gera
- `marketing/` — posts, carrosséis, conteúdo de redes
- `atendimentos/` — cadastro de demandas e eleitores atendidos
- `parlamentar/` — projetos de lei, requerimentos, ofícios, indicações
- `comissoes/` — material das comissões de Esporte/Cultura/Turismo e Educação
- `saidas/` — documentos pontuais
- `dados/` — arquivos a analisar (CSV, PDF, planilha)
- `scripts/` — utilitários
- `tarefas.md` — o que tá em jogo agora

*(Pastas faltantes podem ser criadas pelas skills conforme o uso.)*

## Sobre o mandato

Marco Xavier é vereador em Limeira-SP pelo PP (Progressistas). Mandato focado em **ajudar quem mais precisa** — pautas de saúde, educação, esporte, cultura, turismo e atendimento direto ao eleitor da comunidade.

Comissões em curso: Esporte/Cultura/Turismo (secretário) e Educação e Ciências (secretário).

Base eleitoral: classe baixa e média baixa 30+, com núcleos fortes na Paróquia Santa Luzia (católicos), atendidos pelo gabinete, atiradores TG 94, romeiros, e bairros Vista Alegre / Novo Horizonte / Nova Suíça.

## Equipe

- **Marco** — vereador, cara do mandato, decisões finais, presença pública
- **Assessor 1 e Assessor 2** — atendimento ao público (presencial, telefone, WhatsApp)

## O que mais fazemos aqui

- Posts e textos pra Instagram (@marcoxavier.mx) e demais redes
- Cadastro e acompanhamento de demandas dos eleitores
- Redação de projetos de lei, requerimentos e ofícios
- Acompanhamento das pautas das comissões
- Comunicação de entregas, obras e ações do mandato

## Tom de voz

Próximo, emotivo, popular, direto. "Comigo", "com você", "juntos". Apela aos valores de fé, família, união e luta por quem mais precisa. Detalhes em `_memoria/preferencias.md`.

Evitar: palavrão, gírias, excesso de emoji, textos engessados, jargão de guru, tratamento distante ("caros eleitores").

**Importante:** o número eleitoral **11200** NÃO entra em material de mandato. Só em peças declaradamente de campanha.

## Regras do sistema

- Posts e carrosséis salvar em `marketing/<tipo>-<tema>-<data>/`
- Demandas de eleitor entram em `atendimentos/` com identificação clara (eleitor, pedido, status, data)
- Projetos de lei e ofícios salvam em `parlamentar/<tipo>/<numero-ou-tema>-<data>/`
- Material de comissão fica em `comissoes/<esporte|educacao>/`
- Nunca inventar nome de eleitor, número de projeto, data de obra ou dado factual — só registrar o que vier do Marco ou da equipe

## Ferramentas conectadas

- [ ] Instagram (@marcoxavier.mx)
- [ ] WhatsApp Business
- [ ] Email (marcoxavier@limeira.sp.leg.br)
- [ ] Google Drive
- [ ] Planilha de atendimentos
- [ ] Site institucional da Câmara de Limeira

*(Marcar conforme for instalando os MCPs e integrações.)*

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o Marco, o mandato, base, equipe
2. `_memoria/preferencias.md` — tom de voz, estilo, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, peça), consultar
`identidade/design-guide.md`.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível,
perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples.

---

## Aprender com correções

Quando o Marco ou a equipe corrigir algo ou der instrução que parece
permanente ("na verdade é assim", "não faz mais isso", "prefiro assim",
"sempre que..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o mandato / Marco** → `_memoria/empresa.md`
- **Sobre tom e estilo** → `_memoria/preferencias.md`
- **Sobre prioridades e foco** → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (nova pauta de comissão,
novo bairro de atuação, nova ferramenta, mudança de assessor, novo
projeto de lei prioritário), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

**Quando NÃO perguntar:**
- Posts pontuais sem mudança de contexto
- Atendimentos individuais já cadastrados em `atendimentos/`
- Perguntas simples sem ação

**Dica:** rode `/atualizar` pra varredura completa.

---

## Criação de skills

Quando o Marco pedir skill nova:

1. Verificar se existe template em `templates/skills/`
2. Perguntar se é específica do mandato ou útil em qualquer projeto:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
4. Seguir o fluxo da skill-creator nativa do Claude Code
