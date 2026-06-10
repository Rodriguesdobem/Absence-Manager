# Deploy no Vercel - Frontend React

## 📋 Pré-requisitos

- Conta no Vercel (https://vercel.com)
- Repositório conectado no GitHub
- URL do backend no Render

## 🚀 Passo 1: Preparar o repositório frontend

```bash
cd Absence-Manager
git add .env.example .env.production vite.config.js
git commit -m "Add environment configuration for Vercel deployment"
git push origin main
```

## 🚀 Passo 2: Deploy no Vercel

### Opção A: Vercel CLI (recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Opção B: GitHub Integration
1. Acesse https://vercel.com/new
2. Selecione o repositório `Ligação`
3. Selecione "Root Directory": `Absence-Manager`
4. Clique em "Deploy"

## 🚀 Passo 3: Configurar variáveis de ambiente no Vercel

1. Após o deploy, vá para o projeto no Vercel
2. Settings → Environment Variables
3. Adicione:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://absence-manager-api.onrender.com`
   - **Environments**: Production, Preview, Development

4. Clique em "Save"
5. Redeploy para aplicar as mudanças

## ✅ Verificar conexão

Após o deploy:

1. Acesse https://absence-manager.vercel.app
2. Tente fazer login
3. Verifique se a requisição vai para o backend no Render (F12 → Network)

## 🔄 Atualizar backend URL

Se precisar mudar a URL do backend:

1. Atualize `.env.production`:
```env
VITE_API_BASE_URL=https://sua-nova-url.onrender.com
```

2. Commit e push:
```bash
git commit -am "Update backend URL"
git push origin main
```

3. Vercel redeploy automaticamente (ou faça manualmente em Deployments)

## 📝 Desenvolvimento Local

Para testar localmente com o backend no Render:

```bash
# Use a URL do Render em desenvolvimento
VITE_API_BASE_URL=https://absence-manager-api.onrender.com npm run dev
```

Ou atualize `.env.local`:
```env
VITE_API_BASE_URL=https://absence-manager-api.onrender.com
```

## 🧪 Debugging

Se as requisições falharem:

1. **Verificar Console (F12)**: Ver erros de CORS ou conexão
2. **Verificar Network (F12)**: Confirmar URL e status da requisição
3. **Backend logs no Render**: Acessar "Logs" no painel do Render
4. **Testar manualmente**:
```bash
curl -X GET https://absence-manager-api.onrender.com/usuarios
```

## 🔗 URLs importantes

- **Frontend**: https://absence-manager.vercel.app
- **Backend**: https://absence-manager-api.onrender.com
- **GitHub Repo**: https://github.com/seu-usuario/Ligação
