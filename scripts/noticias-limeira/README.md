# Notícias de Limeira

Coletor de notícias da cidade pra alimentar pautas do mandato. Busca em **Google News RSS** (sem chave de API necessária) e opcionalmente salva em arquivo + Supabase.

## Setup

```bash
cd scripts/noticias-limeira
npm install
node index.js
```

## Uso

```bash
# Busca genérica de Limeira
node index.js

# Busca livre
node index.js "Câmara Municipal Limeira"

# Por tópico
node index.js --topico saude
node index.js --topico seguranca
node index.js --topico obras

# Filtrar últimos N dias
node index.js --dias 3

# Salvar resultado em JSON local + Supabase (precisa .env)
node index.js --topico saude --salvar
```

## Tópicos disponíveis

- `geral` — Limeira SP
- `saude` — saúde, UBS, hospital, posto
- `educacao` — educação, escola, creche
- `seguranca` — segurança, polícia, violência
- `obras` — obras, asfalto, buraco, iluminação
- `cultura` — cultura, turismo, esporte
- `camara` — Câmara Municipal
- `prefeitura` — Prefeitura

## Atalhos via npm

```bash
npm run saude
npm run seguranca
npm run obras
```

## Rodar todo dia

Use cron (linux) ou o `schedule` do MazyOS:

```cron
# Todo dia às 7h
0 7 * * * cd /caminho/scripts/noticias-limeira && node index.js --topico geral --salvar
```

Ou pm2 cron:

```bash
pm2 start index.js --name noticias-limeira --cron "0 7 * * *" --no-autorestart -- --topico geral --salvar
```

## Como reutilizar em outros scripts

```js
const { buscarNoticias, TOPICOS } = require('./scripts/noticias-limeira');

const itens = await buscarNoticias(TOPICOS.saude, { dias: 7 });
console.log(itens);
```

## Como usar no painel (opcional)

Quando o script roda com `--salvar`, salva os resultados na tabela `config` do Supabase com chave `noticias_<query>`. Você pode ler isso do painel:

```js
const v = await window.MX_SB.getConfig('noticias_limeira_sp');
// v.itens = lista de notícias
```

Pra ter uma seção "Pautas do dia" no painel, basta adicionar uma página que lê essas chaves.
