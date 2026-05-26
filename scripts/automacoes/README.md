# Worker de Automações — Marco Xavier

Roda 24/7 na VM, lê as regras configuradas no painel (em **Recursos Pro → Automações**) e executa.

## Como funciona

A cada `CICLO_MS` (default 5min):

1. Busca todas as automações com `ativo = true` no Supabase.
2. Pra cada uma, executa o tipo correspondente:
   - `boas_vindas` — eleitor cadastrado há X minutos
   - `fup` — atendimento parado em status Y há X dias
   - `reativacao` — eleitor sem contato há X dias
   - `aniversario` — eleitor faz aniversário hoje (ou em X dias)
3. Pra cada disparo, registra em `automacao_log` (sucesso/falha/pulado) e atualiza contadores.
4. **Anti-duplicação**: nunca dispara a mesma regra pro mesmo eleitor 2x dentro da janela (aniversário: 1x/ano, boas-vindas: 1x/vida, FUP/reativação: ciclo do gatilho).

## Setup

```bash
cd scripts/automacoes
cp .env.example .env
npm install
node index.js
```

## Produção (24/7)

```bash
pm2 start index.js --name automacoes
pm2 save
pm2 logs automacoes
```

## Janela de horário

Cada ação `enviar_whatsapp` aceita um campo `so_horario: { de: 9, ate: 18 }`. Se o ciclo do worker rodar fora dessa janela, a execução é **pulada** (não falha) — o eleitor recebe quando a janela abrir. Importante pra não mandar mensagem às 3 da manhã.

## O que o worker NÃO faz

- **`resposta_keyword`** roda no `scripts/atendimento-ia/` (porque é gatilhado por mensagem recebida, não por cron).
- Não envia post no Instagram nem cria anúncio — isso é manual.

## Como alterar uma automação

Tudo pelo **painel** → Recursos Pro → Automações. O worker lê as regras a cada ciclo, então mudanças propagam em até 5min sem precisar reiniciar.
