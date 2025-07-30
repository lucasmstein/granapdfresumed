# Estrutura do Projeto - Grana PDF

## Setup Inicial

### 1. Comandos de Instalação

```bash
# Criar projeto Next.js 14
npx create-next-app@latest grana-pdf --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navegar para o projeto
cd grana-pdf

# Instalar dependências adicionais
npm install openai jspdf @stripe/stripe-js stripe
npm install @types/node @types/react @types/react-dom
npm install lucide-react clsx tailwind-merge
npm install @vercel/analytics
```

### 2. Estrutura de Pastas

```
grana-pdf/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/
│   │   │   ├── generate-content/
│   │   │   ├── create-pdf/
│   │   │   └── process-payment/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── select-niche/
│   │   │   └── page.tsx
│   │   ├── generate/
│   │   │   └── page.tsx
│   │   ├── download/
│   │   │   └── page.tsx
│   │   └── payment/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── progress.tsx
│   │   ├── NicheSelector.tsx
│   │   ├── ContentGenerator.tsx
│   │   ├── PDFExporter.tsx
│   │   ├── PaymentForm.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   ├── openai.ts
│   │   ├── pdf.ts
│   │   ├── stripe.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       ├── niches.ts
│       └── pricing.ts
├── public/
│   ├── images/
│   └── icons/
├── .env.local
├── .env.example
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md
```

### 3. Variáveis de Ambiente (.env.local)

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Vercel
NEXT_PUBLIC_VERCEL_URL=your_vercel_url_here

# Database (opcional)
DATABASE_URL=your_database_url_here
```

### 4. Configuração do Tailwind (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 5. Nichos Disponíveis (src/constants/niches.ts)

```typescript
export interface Niche {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: string[];
}

export const NICHE_OPTIONS: Niche[] = [
  {
    id: 'fitness',
    name: 'Fitness e Saúde',
    description: 'Guias completos sobre exercícios, nutrição e bem-estar',
    icon: '💪',
    color: 'bg-red-500',
    topics: ['Treinos', 'Nutrição', 'Bem-estar', 'Suplementação']
  },
  {
    id: 'culinary',
    name: 'Culinária e Gastronomia',
    description: 'Receitas, técnicas culinárias e dicas gastronômicas',
    icon: '👨‍🍳',
    color: 'bg-orange-500',
    topics: ['Receitas', 'Técnicas', 'Ingredientes', 'Cultura gastronômica']
  },
  {
    id: 'business',
    name: 'Negócios e Empreendedorismo',
    description: 'Estratégias para empreendedores e gestão de negócios',
    icon: '💼',
    color: 'bg-blue-500',
    topics: ['Planejamento', 'Marketing', 'Finanças', 'Gestão']
  },
  {
    id: 'technology',
    name: 'Tecnologia',
    description: 'Tendências e inovações no mundo da tecnologia',
    icon: '💻',
    color: 'bg-purple-500',
    topics: ['Programação', 'IA', 'Startups', 'Inovação']
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    description: 'Estratégias de marketing online e crescimento digital',
    icon: '📈',
    color: 'bg-green-500',
    topics: ['SEO', 'Redes Sociais', 'Email Marketing', 'Analytics']
  },
  {
    id: 'education',
    name: 'Educação',
    description: 'Métodos de ensino e aprendizagem eficazes',
    icon: '📚',
    color: 'bg-indigo-500',
    topics: ['Metodologias', 'Tecnologia educacional', 'Avaliação', 'Desenvolvimento']
  },
  {
    id: 'fashion',
    name: 'Moda e Beleza',
    description: 'Tendências de moda, beleza e estilo pessoal',
    icon: '👗',
    color: 'bg-pink-500',
    topics: ['Tendências', 'Estilo', 'Beleza', 'Sustentabilidade']
  },
  {
    id: 'travel',
    name: 'Viagens',
    description: 'Dicas de viagem, destinos e experiências únicas',
    icon: '✈️',
    color: 'bg-cyan-500',
    topics: ['Destinos', 'Planejamento', 'Cultura', 'Aventura']
  },
  {
    id: 'finance',
    name: 'Finanças Pessoais',
    description: 'Educação financeira e planejamento econômico',
    icon: '💰',
    color: 'bg-yellow-500',
    topics: ['Investimentos', 'Orçamento', 'Poupança', 'Planejamento']
  },
  {
    id: 'productivity',
    name: 'Produtividade',
    description: 'Técnicas para aumentar eficiência e organização',
    icon: '⚡',
    color: 'bg-gray-500',
    topics: ['Gestão de tempo', 'Organização', 'Foco', 'Hábitos']
  }
];
```

### 6. Configuração de Preços (src/constants/pricing.ts)

```typescript
export const PRICING = {
  EBOOK_PRICE: 9.97,
  CURRENCY: 'BRL',
  STRIPE_CURRENCY: 'brl',
  TAX_RATE: 0.00, // 0% para ebooks digitais
};

export const PAYMENT_METHODS = [
  'credit_card',
  'pix',
  'boleto'
];
```

### 7. Tipos TypeScript (src/types/index.ts)

```typescript
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Ebook {
  id: string;
  niche: string;
  title: string;
  content: string;
  pdfUrl: string;
  createdAt: Date;
  userId: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  ebookId: string;
  userId: string;
  createdAt: Date;
}

export interface GenerationRequest {
  niche: string;
  userId?: string;
  customTopics?: string[];
}

export interface GenerationResponse {
  success: boolean;
  ebook?: Ebook;
  error?: string;
}
```

### 8. Próximos Passos de Desenvolvimento

1. **Setup Inicial**
   - Executar comandos de instalação
   - Configurar variáveis de ambiente
   - Testar ambiente de desenvolvimento

2. **Desenvolvimento de Componentes**
   - Criar componentes UI básicos
   - Implementar NicheSelector
   - Desenvolver ContentGenerator

3. **Integração com APIs**
   - Configurar OpenAI
   - Implementar geração de PDF
   - Integrar Stripe

4. **Testes e Deploy**
   - Testes de funcionalidade
   - Deploy na Vercel
   - Monitoramento inicial

### 9. Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy na Vercel
vercel --prod

# Testes
npm run test

# Linting
npm run lint
```

### 10. Checklist de Lançamento

- [ ] Setup do projeto Next.js
- [ ] Configuração do Tailwind CSS
- [ ] Implementação dos componentes principais
- [ ] Integração com OpenAI API
- [ ] Sistema de geração de PDF
- [ ] Integração com Stripe
- [ ] Testes de funcionalidade
- [ ] Deploy na Vercel
- [ ] Configuração de domínio
- [ ] Monitoramento e analytics 