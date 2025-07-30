# 🚀 Grana PDF - Ebooks Personalizados por IA

## 📖 Sobre o Projeto

O **Grana PDF** é uma plataforma completa que gera automaticamente ebooks personalizados por nicho usando inteligência artificial e os disponibiliza para download em PDF.

### ✨ Funcionalidades Principais

- **🎯 10 Nichos Especializados** - Fitness, Culinária, Negócios, Tecnologia, Marketing, Educação, Moda, Viagens, Finanças, Produtividade
- **🤖 IA Avançada** - Conteúdo gerado com GPT-4o-mini
- **💳 Pagamento Integrado** - Stripe com 4 planos de créditos
- **📄 PDF Profissional** - Layout otimizado e formatação perfeita
- **⚡ Geração Rápida** - Ebooks prontos em menos de 2 minutos
- **🎨 Interface Moderna** - Design responsivo e UX otimizada

## 🛠️ Stack Tecnológica

- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Ícones:** Lucide React
- **IA:** OpenAI API (GPT-4o-mini)
- **PDF:** jsPDF + Puppeteer
- **Pagamentos:** Stripe
- **Banco:** SQLite (local)
- **Deploy:** Vercel

## 📦 Planos Disponíveis

| Plano | PDFs | Preço | Economia |
|-------|------|-------|----------|
| 🥉 **TESTE** | 1 | R$ 9,97 | - |
| 🥈 **STARTER** | 3 | R$ 24,90 | 17% |
| 🥇 **POPULAR** | 10 | R$ 69,90 | 30% |
| 💎 **PREMIUM** | 25 | R$ 149,90 | 40% |
| ⚡ **PERSONALIZADO** | 25+ | R$ 5,99/cada | - |

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Stripe
- Chave da OpenAI

### 1. Clone o repositório
```bash
git clone https://github.com/SEU_USUARIO/grana-pdf-app.git
cd grana-pdf-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local`:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica_aqui
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret_aqui

# OpenAI Configuration
OPENAI_API_KEY=sk-sua_chave_openai_aqui

# Environment
NODE_ENV=development
```

### 4. Execute em desenvolvimento
```bash
npm run dev
```

### 5. Build para produção
```bash
npm run build
npm start
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── api/                    # APIs do backend
│   │   ├── checkout/          # Integração Stripe
│   │   ├── generate/          # Geração de PDFs
│   │   └── webhook/           # Webhooks Stripe
│   ├── checkout/              # Página de checkout
│   ├── generate/              # Página de geração
│   ├── success/               # Página de sucesso
│   ├── page.tsx              # Landing page
│   └── layout.tsx            # Layout principal
├── components/
│   ├── NicheSelector.tsx     # Seleção de nichos
│   └── PackageSelector.tsx   # Seleção de planos
└── lib/
    ├── database.ts           # Banco SQLite
    └── templates/            # Templates HTML
```

## 🔧 Configuração do Stripe

### 1. Criar Produtos no Stripe
- Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/products)
- Crie produtos para cada plano com os preços corretos
- Copie os `price_id` gerados

### 2. Atualizar Price IDs
No arquivo `src/app/api/checkout/route.ts`, substitua os placeholders:
```javascript
const PACKAGE_CONFIGS = {
  teste: {
    price_id: 'price_1RqfWvBx8wluQBPkKtzYXF3q',
  },
  // ... outros planos
};
```

### 3. Configurar Webhook
- Dashboard Stripe → Webhooks → Add endpoint
- URL: `https://SEU_DOMINIO/api/webhook/stripe`
- Eventos: `checkout.session.completed`

## 🚀 Deploy na Vercel

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Fazer login
```bash
vercel login
```

### 3. Deploy
```bash
vercel --prod
```

### 4. Configurar variáveis no Vercel
- Dashboard Vercel → Settings → Environment Variables
- Adicionar todas as variáveis do `.env.local`

## 🧪 Testes

### Cartões de Teste do Stripe
```
Número: 4242 4242 4242 4242
Data: Qualquer data futura
CVC: Qualquer 3 dígitos
```

### Fluxo de Teste
1. Acesse a landing page
2. Escolha um nicho
3. Selecione um plano
4. Complete o checkout
5. Verifique se os créditos foram adicionados
6. Teste a geração de PDF

## 📊 Monitoramento

- **Logs:** Dashboard Vercel → Functions
- **Pagamentos:** Dashboard Stripe → Payments
- **Webhooks:** Dashboard Stripe → Webhooks
- **Banco:** Arquivo `credits.db` (local)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email:** suporte@granapdf.com
- **Issues:** [GitHub Issues](https://github.com/SEU_USUARIO/grana-pdf-app/issues)
- **Documentação:** [Wiki do Projeto](https://github.com/SEU_USUARIO/grana-pdf-app/wiki)

---

**Desenvolvido com ❤️ usando Next.js 15 e Tailwind CSS**

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
