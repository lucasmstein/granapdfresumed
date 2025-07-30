# 🚀 Guia de Deploy - Grana PDF

## **Deploy na Vercel (Recomendado)**

### **Passo 1: Preparar o Projeto**

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Fazer login:**
   ```bash
   vercel login
   ```

### **Passo 2: Configurar Variáveis de Ambiente**

Crie um arquivo `.env.local` na pasta `app/`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica_aqui
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret_aqui

# OpenAI Configuration
OPENAI_API_KEY=sk-sua_chave_openai_aqui

# Environment
NODE_ENV=production
```

### **Passo 3: Deploy na Vercel**

1. **Navegar para a pasta do projeto:**
   ```bash
   cd app
   ```

2. **Fazer deploy:**
   ```bash
   vercel --prod
   ```

3. **Seguir as instruções:**
   - Escolher "Link to existing project" ou criar novo
   - Confirmar configurações
   - Aguardar deploy

### **Passo 4: Configurar Variáveis no Vercel**

1. **Acessar Dashboard do Vercel**
2. **Ir em Settings → Environment Variables**
3. **Adicionar todas as variáveis:**
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `OPENAI_API_KEY`

### **Passo 5: Configurar Webhook Stripe**

1. **No Dashboard do Stripe:**
   - Webhooks → Add endpoint
   - URL: `https://SEU_DOMINIO.vercel.app/api/webhook/stripe`
   - Eventos: `checkout.session.completed`

2. **Copiar webhook secret** e adicionar na Vercel

### **Passo 6: Testar**

1. **Acessar o domínio** fornecido pela Vercel
2. **Testar checkout** com cartões de teste
3. **Verificar webhooks** no dashboard do Stripe
4. **Testar geração** de PDF

## **🔧 Comandos Úteis**

```bash
# Deploy
vercel --prod

# Deploy preview
vercel

# Ver logs
vercel logs

# Remover deploy
vercel --remove
```

## **📊 Monitoramento**

- **Logs:** Dashboard Vercel → Functions
- **Performance:** Analytics automático
- **Erros:** Error tracking integrado

## **🎯 Vantagens do Vercel**

✅ **Performance otimizada** para Next.js
✅ **Serverless Functions** sem timeout
✅ **Edge Functions** para baixa latência
✅ **Deploy automático** do GitHub
✅ **SSL gratuito** e CDN global
✅ **Região Brasil** disponível
✅ **Suporte SQLite** nativo

## **⚠️ Por que não Netlify?**

❌ **Timeout de 10s** nas functions
❌ **Sem suporte** para SQLite persistente
❌ **APIs instáveis** para webhooks
❌ **Performance inferior** para Next.js
❌ **Sem Edge Functions**

---

**Resultado:** Deploy mais rápido, estável e otimizado para o Grana PDF! 🚀 