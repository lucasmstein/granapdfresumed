# Especificação de Implementação - Grana PDF
## Guia Prático de Desenvolvimento

### 1. Setup Inicial do Projeto

#### 1.1 Criação do Projeto Next.js

```bash
# Criar projeto Next.js 14
npx create-next-app@latest grana-pdf --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navegar para o projeto
cd grana-pdf

# Instalar dependências principais
npm install openai jspdf @stripe/stripe-js stripe
npm install @supabase/supabase-js
npm install lucide-react clsx tailwind-merge
npm install @vercel/analytics
npm install @types/node @types/react @types/react-dom
```

#### 1.2 Configuração do Tailwind CSS

```javascript
// tailwind.config.js
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

### 2. Configuração de Serviços Externos

#### 2.1 Supabase Setup

```bash
# Instalar Supabase CLI (opcional)
npm install -g supabase

# Criar projeto no Supabase Dashboard
# https://supabase.com/dashboard
```

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 2.2 Stripe Setup

```typescript
// src/lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})
```

#### 2.3 OpenAI Setup

```typescript
// src/lib/openai.ts
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
```

### 3. Estrutura de Arquivos

```
grana-pdf/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-content/
│   │   │   │   └── route.ts
│   │   │   ├── create-pdf/
│   │   │   │   └── route.ts
│   │   │   ├── create-payment/
│   │   │   │   └── route.ts
│   │   │   └── webhook/
│   │   │       └── stripe/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── select-niche/
│   │   │   └── page.tsx
│   │   ├── generate/
│   │   │   └── page.tsx
│   │   ├── success/
│   │   │   └── page.tsx
│   │   └── cancel/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── progress.tsx
│   │   ├── NicheSelector.tsx
│   │   ├── ContentGenerator.tsx
│   │   └── PaymentForm.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── stripe.ts
│   │   ├── openai.ts
│   │   ├── pdf.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   └── constants/
│       ├── niches.ts
│       └── pricing.ts
├── public/
├── .env.local
├── .env.example
└── package.json
```

### 4. Implementação das APIs

#### 4.1 API de Geração de Conteúdo

```typescript
// src/app/api/generate-content/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { supabase } from '@/lib/supabase'
import { NICHE_OPTIONS } from '@/constants/niches'

export async function POST(request: NextRequest) {
  try {
    const { niche, userId } = await request.json()

    const nicheData = NICHE_OPTIONS.find(n => n.id === niche)
    if (!nicheData) {
      return NextResponse.json(
        { error: 'Nicho não encontrado' },
        { status: 400 }
      )
    }

    const prompt = `
      Crie um ebook completo sobre ${nicheData.name} com as seguintes especificações:
      
      - Título atrativo e profissional
      - 10-15 páginas de conteúdo
      - Estrutura: Introdução, 3-4 capítulos principais, conclusão
      - Tom profissional mas acessível
      - Incluir dicas práticas e exemplos
      - Foco nos tópicos: ${nicheData.topics.join(', ')}
      
      Formato de resposta:
      # TÍTULO DO EBOOK
      
      ## Introdução
      [conteúdo da introdução]
      
      ## Capítulo 1: [Título]
      [conteúdo do capítulo]
      
      ## Capítulo 2: [Título]
      [conteúdo do capítulo]
      
      ## Capítulo 3: [Título]
      [conteúdo do capítulo]
      
      ## Conclusão
      [conteúdo da conclusão]
      
      ## Recursos Adicionais
      [links e referências úteis]
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em criar conteúdo educacional e profissional para ebooks."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''
    const title = content.split('\n')[0].replace('# ', '')

    // Salvar no banco de dados
    const { data: ebook, error } = await supabase
      .from('ebooks')
      .insert({
        niche,
        title,
        content,
        user_id: userId || null,
        status: 'generated'
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao salvar ebook:', error)
      return NextResponse.json(
        { error: 'Erro ao salvar ebook' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      content,
      title,
      ebookId: ebook.id,
    })

  } catch (error) {
    console.error('Erro na geração de conteúdo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
```

#### 4.2 API de Criação de PDF

```typescript
// src/app/api/create-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generatePDF } from '@/lib/pdf'

export async function POST(request: NextRequest) {
  try {
    const { content, title, ebookId } = await request.json()

    const pdfBlob = generatePDF(content, title)

    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${title}-ebook.pdf"`,
      },
    })

  } catch (error) {
    console.error('Erro na geração de PDF:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar PDF' },
      { status: 500 }
    )
  }
}
```

#### 4.3 API de Pagamento

```typescript
// src/app/api/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { ebookId, userId } = await request.json()

    // Buscar dados do ebook
    const { data: ebook, error } = await supabase
      .from('ebooks')
      .select('*')
      .eq('id', ebookId)
      .single()

    if (error || !ebook) {
      return NextResponse.json(
        { error: 'Ebook não encontrado' },
        { status: 404 }
      )
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'pix'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: `Ebook - ${ebook.title}`,
            description: `Ebook sobre ${ebook.niche}`,
          },
          unit_amount: 997, // R$ 9,97
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        ebookId,
        userId: userId || '',
      },
    })

    // Salvar registro de pagamento
    await supabase
      .from('payments')
      .insert({
        stripe_payment_intent_id: session.payment_intent as string,
        amount: 9.97,
        currency: 'BRL',
        status: 'pending',
        ebook_id: ebookId,
        user_id: userId || null,
      })

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('Erro na criação do pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao criar pagamento' },
      { status: 500 }
    )
  }
}
```

#### 4.4 Webhook do Stripe

```typescript
// src/app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')!

    let event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Erro na verificação do webhook:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const { ebookId, userId } = paymentIntent.metadata

      // Atualizar status do pagamento
      await supabase
        .from('payments')
        .update({ status: 'completed' })
        .eq('stripe_payment_intent_id', paymentIntent.id)

      // Atualizar status do ebook
      await supabase
        .from('ebooks')
        .update({ status: 'paid' })
        .eq('id', ebookId)

      console.log('Pagamento processado com sucesso:', paymentIntent.id)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
```

### 5. Componentes React

#### 5.1 Componente de Seleção de Nicho

```typescript
// src/components/NicheSelector.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NICHE_OPTIONS } from '@/constants/niches'
import { Button } from '@/components/ui/button'

export default function NicheSelector() {
  const [selectedNiche, setSelectedNiche] = useState<string>('')
  const router = useRouter()

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId)
  }

  const handleContinue = () => {
    if (selectedNiche) {
      router.push(`/generate?niche=${selectedNiche}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Escolha seu Nicho
        </h1>
        <p className="text-gray-600">
          Selecione o tema do seu ebook
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NICHE_OPTIONS.map((niche) => (
          <div
            key={niche.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedNiche === niche.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleNicheSelect(niche.id)}
          >
            <div className="text-4xl mb-4">{niche.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{niche.name}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {niche.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {niche.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className={`px-2 py-1 text-xs rounded-full ${
                    niche.color.replace('bg-', 'bg-').replace('-500', '-100')
                  } text-gray-700`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedNiche}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
```

### 6. Configuração de Ambiente

#### 6.1 Variáveis de Ambiente (.env.local)

```env
# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

### 7. Deploy na Vercel

#### 7.1 Configuração do Vercel

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai-api-key",
    "STRIPE_SECRET_KEY": "@stripe-secret-key",
    "STRIPE_WEBHOOK_SECRET": "@stripe-webhook-secret",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  }
}
```

#### 7.2 Comandos de Deploy

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel --prod

# Ou usar GitHub integration
# Push para main branch = deploy automático
```

### 8. Testes e Validação

#### 8.1 Testes de Funcionalidade

```bash
# Testar geração de conteúdo
curl -X POST http://localhost:3000/api/generate-content \
  -H "Content-Type: application/json" \
  -d '{"niche": "fitness"}'

# Testar criação de PDF
curl -X POST http://localhost:3000/api/create-pdf \
  -H "Content-Type: application/json" \
  -d '{"content": "# Teste\n\nConteúdo de teste", "title": "Teste"}'

# Testar pagamento (Stripe test mode)
curl -X POST http://localhost:3000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{"ebookId": "test-uuid"}'
```

#### 8.2 Checklist de Validação

- [ ] Geração de conteúdo funciona
- [ ] PDF é gerado corretamente
- [ ] Pagamento é processado
- [ ] Webhook atualiza status
- [ ] Download é liberado após pagamento
- [ ] Interface é responsiva
- [ ] Performance está adequada

### 9. Monitoramento e Analytics

#### 9.1 Vercel Analytics

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### 9.2 Logs e Debugging

```typescript
// src/lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data)
  }
}
```

---

**Documento criado em:** Dezembro 2024  
**Versão:** 1.0  
**Próxima revisão:** Durante implementação 