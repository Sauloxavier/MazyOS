# MazyOS — Painel v2 (refatorado)

Painel do gabinete Marco Xavier reescrito em **React + TypeScript + Vite**, substituindo o monolito Alpine.js.

## Stack

- **Build:** Vite 7
- **Framework:** React 19
- **Routing:** TanStack Router (file-based, type-safe)
- **Server state:** TanStack Query v5
- **Client state:** Zustand
- **Persistência local (offline):** Dexie.js (IndexedDB) — _a implementar_
- **Listas grandes:** TanStack Virtual (renderiza só o visível, aguenta 10k+ itens)
- **Estilo:** Tailwind CSS v4 (CLI, sem CDN)
- **Forms:** React Hook Form + Zod
- **Ícones:** Lucide
- **Backend:** Supabase self-hosted (iamob-supabase.fqejv1.easypanel.host)

## Rodar localmente

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build pra produção

```bash
npm run build
```

Output em `dist/`.

## Deploy no Easypanel

1. Push o repo pro GitHub
2. Easypanel → New App → Source: GitHub → escolhe o repo
3. Build type: Dockerfile (usa o `Dockerfile` deste diretório)
4. Variáveis de ambiente:
   - `VITE_SUPABASE_URL=https://iamob-supabase.fqejv1.easypanel.host`
   - `VITE_SUPABASE_ANON_KEY=<a anon key do supabase>`
5. Deploy → expõe nas portas mapeadas pelo Easypanel
6. Aponta o domínio (ex: `painel.marcoxavier.com.br`) → Caddy do Easypanel gera SSL automático

## Migração progressiva

O painel antigo (Alpine.js, `../painel/index.html`) continua rodando em `localhost:8001` durante a migração. Conforme as páginas do v2 forem ficando prontas, vamos comparar as duas e só "virar a chave" quando tudo estiver migrado.
