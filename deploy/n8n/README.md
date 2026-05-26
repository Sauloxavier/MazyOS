# Workflows n8n — MazyOS / Gabinete Marco Xavier

Workflows prontos pra importar no n8n self-hosted e conectar aos Recursos Pro do painel.

**n8n usado:** `https://iamob-n8n.fqejv1.easypanel.host`
**Painel:** Configurações › 🔗 Integração n8n (já vem pré-configurado com a URL e os slugs)

---

## 1. Importar os workflows

Pra cada arquivo JSON dessa pasta:

1. Entra no n8n → **Workflows** → botão **⋯** no topo → **Import from File**
2. Sobe o arquivo `.json`
3. Salva (Ctrl+S) e **Active** no canto superior direito

| Arquivo | Slug do webhook | Pra que serve |
|---|---|---|
| `01-disparo-em-massa.json` | `mx-disparo` | Envia mensagem pra lista de contatos com atraso humano (8-20s) |
| `02-atendimento-ia.json` | `mx-atendimento-ia` | Recebe mensagem → OpenAI → responde via WhatsApp |
| `03-aniversariantes.json` | `mx-aniversario` | Mensagem de aniversário em lote (atraso 6s entre cada) |
| `04-boas-vindas.json` | `mx-boas-vindas` | Saudação automática ao cadastrar novo eleitor |
| `05-analise-mandato.json` | `mx-analise-ia` | Recebe métricas do gabinete → IA produz diagnóstico |
| `06-eventos.json` | `mx-nova-demanda` + `mx-nova-solicitacao` | Notifica grupo do gabinete via WhatsApp quando chega nova demanda/solicitação |

---

## 2. Conferir as URLs

Depois de importar, cada workflow vai gerar uma URL tipo:

```
https://iamob-n8n.fqejv1.easypanel.host/webhook/mx-disparo
```

O painel **monta essa URL automaticamente** a partir do slug — então não precisa colar URL completa, basta deixar o slug em `Configurações › Integração n8n`.

> Se mudar o slug no n8n, atualiza o campo correspondente no painel.

---

## 3. Payload que o painel envia

Todos os workflows recebem POST com este envelope:

```json
{
  "origem": "mazyos-painel",
  "vereador": "Marco Xavier",
  "usuario": "saulo.lsystem@gmail.com",
  "workflow": "disparo",
  "wahaUrl": "https://wahaXXX.host",
  "wahaApiKey": "...",
  "wahaSession": "default",
  "...campos específicos do recurso..."
}
```

Os workflows leem os campos `body.wahaUrl` / `body.wahaApiKey` / `body.wahaSession` pra falar com o WAHA. **Não precisa colar credencial WAHA no n8n** — o painel manda em cada chamada.

### Campos específicos por workflow

**Disparo em massa** (`mx-disparo`):
```json
{
  "mensagem": "Olá {{nome}}, ...",
  "contatos": [
    { "nome": "Maria", "telefone": "19999999999", "bairro": "Vista Alegre", "chatId": "19...@c.us" }
  ]
}
```

**Atendimento IA** (`mx-atendimento-ia`):
```json
{
  "mensagem": "texto recebido do eleitor",
  "nome": "Maria",
  "chatId": "19...@c.us",
  "openaiKey": "sk-...",
  "openaiModel": "gpt-4o-mini",
  "prompt": "Você é Marco Xavier..."
}
```

**Aniversariantes** (`mx-aniversario`):
```json
{
  "mensagem": "Feliz aniversário, {{nome}}! 🎂",
  "aniversariantes": [{ "nome": "...", "telefone": "...", "bairro": "..." }]
}
```

**Boas-vindas** (`mx-boas-vindas`):
```json
{
  "mensagem": "Bem-vindo {{primeiro_nome}}...",
  "nome": "Maria",
  "telefone": "19...",
  "bairro": "..."
}
```

**Análise mandato** (`mx-analise-ia`):
```json
{
  "openaiKey": "sk-...",
  "openaiModel": "gpt-4o-mini",
  "prompt": "instrução custom (opcional)",
  "dados": {
    "totalEleitores": 132,
    "demandasAbertas": 14,
    "demandasResolvidas": 87,
    "topBairros": ["Vista Alegre", "Novo Horizonte"],
    "topTipos": ["Saúde", "Infraestrutura"],
    "conquistados": 40,
    "metaConquistados": 40
  }
}
```

**Eventos** (`mx-nova-demanda` / `mx-nova-solicitacao`):
```json
{
  "nome": "...", "telefone": "...", "descricao": "...",
  "protocolo": "PROT-2026-001",
  "bairro": "...",
  "grupoEquipe": "120363@g.us"
}
```

---

## 4. Testar

No painel: **Configurações › Integração n8n** → botão **Testar** ao lado de cada slug.

Vai disparar `{ teste: true, mensagem: "Ping do painel MazyOS" }` pro webhook. Se voltar 200, tá conectado.

Histórico das chamadas: também aparece em `Configurações › Integração n8n` (campo "Última execução") e armazenado em `config.n8nLogs` (últimas 30).

---

## 5. Próximos passos

Quando esses 6 workflows estiverem ativos e testados, o próximo passo é o painel chamar `n8nCall(...)` em cada tela Pro:

- [ ] Disparo em massa: trocar loop WAHA direto por `n8nCall('disparo', { contatos, mensagem, ... })`
- [ ] Aniversariantes: botão "Disparar agora" chama `n8nCall('aniversario', ...)`
- [ ] Cadastro de eleitor: ao salvar, dispara `n8nCall('boasVindas', ...)`
- [ ] Atendimento IA: já é a tela de configuração, mas o disparo passa a ser via n8n
- [ ] Análise mandato: botão "Pedir análise" → `n8nCall('analiseIA', { dados })` → exibe resposta
- [ ] Nova demanda/solicitação: fire-and-forget em background quando criar
