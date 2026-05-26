# Deploy do painel-v2 no Easypanel

Guia completo pra subir o painel-v2 no mesmo Easypanel do n8n e Supabase.

## Pré-requisitos

- [x] n8n já rodando em `https://iamob-n8n.fqejv1.easypanel.host`
- [x] Supabase já rodando em `https://iamob-supabase.fqejv1.easypanel.host`
- [ ] Repositório Git no GitHub (privado ou público)
- [ ] Easypanel com acesso admin

## Passo 1: Criar repositório GitHub

No terminal:

```bash
cd "/Users/macbookair/gabinete online/mazyos"

# Se já tem GitHub CLI:
gh repo create mazyos --private --source=. --remote=origin
git push -u origin main

# Ou manualmente:
# 1. Cria repo em github.com/new com nome 'mazyos'
# 2. git remote add origin git@github.com:SEU_USUARIO/mazyos.git
# 3. git push -u origin main
```

## Passo 2: Criar app no Easypanel

1. **Easypanel** → projeto `iamob` → **+ Add Service** → **App**
2. **Source:** GitHub → autoriza acesso → escolhe `mazyos`
3. **Build Path:** `painel-v2` (subdiretório)
4. **Build Method:** Dockerfile (já tem o `painel-v2/Dockerfile`)
5. **Port:** 80 (interno do nginx)

## Passo 3: Build args (variáveis de ambiente do build)

No Easypanel → seu app → **Environment** → adiciona como **Build Args**:

```
VITE_SUPABASE_URL=https://iamob-supabase.fqejv1.easypanel.host
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE
```

> ⚠️ **São build args, não runtime env**. O Vite faz inline dessas vars no bundle JS no momento do build.

## Passo 4: Deploy

Clica **Deploy**. Easypanel vai:
1. Clonar o repo
2. Rodar `npm ci` + `npm run build` dentro do container
3. Servir o `dist/` via nginx na porta 80
4. Expor numa URL tipo `https://iamob-mazyos.fqejv1.easypanel.host`

Build leva ~2-3 min na primeira vez (cache acelera próximas).

## Passo 5: Domínio próprio (opcional)

Se você tem domínio `marcoxavier.com.br`:

1. **DNS** (Registro.br / Cloudflare): cria CNAME `painel.marcoxavier.com.br` → `iamob-mazyos.fqejv1.easypanel.host`
2. **Easypanel** → app → **Domains** → adiciona `painel.marcoxavier.com.br`
3. Caddy do Easypanel gera SSL Let's Encrypt automático

## Passo 6: CORS no Supabase

Garante que o Supabase aceita requests do novo domínio:

1. **Supabase Dashboard** → Settings → API
2. Em **CORS Allowed Origins** adiciona:
   ```
   https://iamob-mazyos.fqejv1.easypanel.host
   https://painel.marcoxavier.com.br  (se usar domínio próprio)
   http://localhost:5173  (pra desenvolvimento local)
   ```

## Atualizações automáticas

Cada `git push main` no GitHub:
- Easypanel detecta via webhook
- Faz rebuild + redeploy automaticamente
- ~1-2 min de downtime no rolling deploy

Pra desabilitar auto-deploy: Easypanel → app → **Source** → desliga auto-deploy.

## Troubleshooting

| Sintoma | Causa | Solução |
|---|---|---|
| Build falha em `npm ci` | `package-lock.json` desatualizado | Roda `npm install` local + commit |
| Página em branco depois do deploy | Variáveis não foram passadas como build args | Confere se VITE_SUPABASE_URL e ANON_KEY estão lá |
| Login falha | CORS do Supabase | Adiciona domínio do Easypanel nas allowed origins |
| 404 ao recarregar rota interna (`/eleitores`) | nginx não tem SPA fallback | Já está no `nginx.conf`, mas confere se foi copiado |
| Tela carrega mas API 500 | Anon key errada | Confere a anon key no Supabase dashboard |
