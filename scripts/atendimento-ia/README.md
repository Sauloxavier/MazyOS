# Atendimento IA — Marco Xavier

Script Node.js que faz polling no **WAHA** (WhatsApp HTTP API), classifica mensagens novas com **ChatGPT** e responde automaticamente quando o flag `atendimento_ia_ativo` está ligado no Supabase do painel.

## Como funciona

1. A cada `POLL_INTERVAL_MS` ms (default: 15s), lê os últimos chats do WAHA.
2. Filtra apenas mensagens recebidas (não dos grupos, não as do próprio Marco).
3. Cria/atualiza o eleitor no banco automaticamente (busca por telefone).
4. Manda histórico recente pro ChatGPT com o prompt configurado no painel.
5. Envia a resposta da IA pelo WAHA.
6. Cria/atualiza uma `demanda` do tipo "Atendimento" com o log da conversa.
7. Atualiza o status (`config.atendimento_ia_status`) pro painel mostrar.

## Setup

```bash
cd scripts/atendimento-ia
cp .env.example .env   # preencha as variáveis
npm install
node index.js
```

## Rodar em produção (na VM, 24/7)

```bash
npm install -g pm2
pm2 start index.js --name atendimento-ia
pm2 save
pm2 startup   # gera o comando pra iniciar com o boot
```

## Logs

```bash
pm2 logs atendimento-ia
```

## Como ligar / desligar

Pelo **painel** (Recursos Pro → Atendimento por IA) — alterar o flag _Ativar atendimento automático_ e salvar. O script lê esse flag a cada ciclo e pausa quando ele está desligado.

## Variáveis do .env

| variável | descrição |
| --- | --- |
| `WAHA_URL` | URL do WAHA self-hosted |
| `WAHA_API_KEY` | header `X-Api-Key` |
| `WAHA_SESSION` | sessão do WAHA (default: `default`) |
| `SUPABASE_URL` | URL do Supabase self-hosted |
| `SUPABASE_SERVICE_KEY` | **service_role** (não anon — o script precisa pra escrever em qualquer linha) |
| `OPENAI_API_KEY` | `sk-proj-...` da OpenAI |
| `OPENAI_MODEL` | default `gpt-4o-mini` |
| `POLL_INTERVAL_MS` | intervalo entre checagens (ms). Default 15000. |
| `MAX_RESPOSTAS_POR_CHAT` | anti-loop: max respostas por chat por sessão do script. Default 5. |

## Segurança

- Use uma chave Anthropic dedicada (não a mesma do navegador).
- Service role: rode esse script só na VM, nunca exponha em browser.
- Anti-loop: o `MAX_RESPOSTAS_POR_CHAT` evita que um bug fique mandando mensagem infinitamente.
- O prompt está no Supabase (`config.atendimento_ia_prompt`) — você muda no painel sem mexer no script.
