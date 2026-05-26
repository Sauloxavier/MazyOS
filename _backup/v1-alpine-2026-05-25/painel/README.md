# Painel Gabinete Marco Xavier — v1

Painel de gestão do mandato. Inspirado no gabineteonline.com.br, adaptado pra realidade do gabinete em Limeira.

## Como usar

Abre o `index.html` direto no navegador (Chrome, Edge, Safari). Sem instalação, sem servidor.

Em macOS, na pasta:
```
open painel/index.html
```

## O que tem

- **Visão geral** — números do mandato, demandas por bairro e por tipo, últimas demandas
- **Eleitores** — cadastro completo (nome, telefone, nascimento, bairro, nichos, observações), busca e filtros
- **Demandas** — vinculadas ao eleitor, com tipo, status, descrição, prazo e notas de acompanhamento
- **Aniversariantes** — próximos 30 dias, com botão direto pro WhatsApp e mensagem personalizada
- **Configurações** — mensagem padrão de aniversário, exportar/importar backup JSON, dados de exemplo

## Onde os dados ficam

Tudo salvo no `localStorage` do navegador. Significa: rápido, offline, privado — **mas vinculado àquele navegador específico naquele computador**.

Faça **backup periódico** (Configurações → Exportar backup). O JSON gerado pode ser guardado no Drive, GitHub, ou importado em outro navegador.

## Limitações conhecidas (resolvidas na v2)

- Dados não compartilhados entre os 2 assessores — cada navegador tem sua base
- Sem mapa interativo por bairro
- Sem importação em lote via CSV
- Sem integração com Google Calendar
- Sem disparo automático de mensagem de aniversário

Quando o uso firmar, a gente migra pra Supabase (banco compartilhado) e libera essas features. ~1h de trabalho.

## Stack

HTML + Tailwind CSS (via CDN) + Alpine.js (via CDN) + localStorage. Zero build, zero dependência instalada.

## Identidade visual aplicada

- Azul royal (#0E3A8A) — fundo de sidebar, botões primários, números grandes
- Amarelo (#FACC15) — destaques, badges, ícones na nav
- Tipografia Inter bold/black — alta presença em mobile
- Cards de cantos arredondados, alto contraste, otimizado pra leitura rápida
