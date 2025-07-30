# Diagramas Técnicos - Grana PDF
## Especificações Detalhadas e Fluxos de Implementação

### 1. Arquitetura de Sistema Completa

```mermaid
graph TB
    subgraph "Frontend (Next.js 14)"
        A[Landing Page] --> B[Niche Selector]
        B --> C[Content Generator]
        C --> D[PDF Preview]
        D --> E[Payment Form]
        E --> F[Success Page]
    end
    
    subgraph "Backend (API Routes)"
        G[/api/generate-content] --> H[OpenAI Integration]
        I[/api/create-pdf] --> J[PDF Generation]
        K[/api/create-payment] --> L[Stripe Integration]
        M[/api/webhook/stripe] --> N[Payment Processing]
    end
    
    subgraph "External Services"
        O[OpenAI API]
        P[Stripe API]
        Q[Supabase]
    end
    
    subgraph "Database (Supabase)"
        R[Users Table]
        S[Ebooks Table]
        T[Payments Table]
    end
    
    C --> G
    G --> H
    H --> O
    D --> I
    I --> J
    E --> K
    K --> L
    L --> P
    M --> N
    N --> T
    H --> S
    J --> S
```

### 2. Fluxo de Geração de Conteúdo Detalhado

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant O as OpenAI
    participant S as Supabase
    participant P as PDF Generator

    U->>F: 1. Seleciona nicho
    F->>F: 2. Valida seleção
    F->>B: 3. POST /api/generate-content
    Note over B: {niche: "fitness"}
    
    B->>B: 4. Valida nicho
    B->>O: 5. Chama OpenAI API
    Note over B,O: GPT-4 com prompt específico
    
    O->>B: 6. Retorna conteúdo
    Note over B: Markdown formatado
    
    B->>S: 7. Salva no banco
    Note over B,S: {id, niche, content, title}
    
    B->>F: 8. Retorna dados
    Note over F: {content, title, ebookId}
    
    F->>P: 9. Gera PDF
    Note over F,P: jsPDF no frontend
    
    F->>U: 10. Mostra preview
    Note over U: PDF pronto para download
```

### 3. Fluxo de Pagamento e Download

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant B as Backend
    participant S as Stripe
    participant DB as Database
    participant W as Webhook

    U->>F: 1. Clica "Comprar PDF"
    F->>B: 2. POST /api/create-payment
    Note over F,B: {ebookId, userId}
    
    B->>B: 3. Valida ebook
    B->>S: 4. Cria checkout session
    Note over B,S: {amount: 997, currency: "brl"}
    
    S->>B: 5. Retorna checkout URL
    B->>F: 6. Retorna URL
    F->>U: 7. Redireciona para Stripe
    
    U->>S: 8. Completa pagamento
    S->>W: 9. Webhook payment_intent.succeeded
    W->>B: 10. POST /api/webhook/stripe
    
    B->>B: 11. Valida webhook
    B->>DB: 12. Atualiza status do pagamento
    Note over B,DB: status: "completed"
    
    B->>U: 13. Redireciona para success
    U->>F: 14. Acessa página de sucesso
    F->>U: 15. Libera download do PDF
```

### 4. Estrutura de Banco de Dados (ERD)

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK
        varchar name
        timestamp created_at
        timestamp updated_at
    }
    
    EBOOKS {
        uuid id PK
        varchar niche
        varchar title
        text content
        varchar pdf_url
        uuid user_id FK
        varchar status
        timestamp created_at
    }
    
    PAYMENTS {
        uuid id PK
        varchar stripe_payment_intent_id UK
        decimal amount
        varchar currency
        varchar status
        uuid ebook_id FK
        uuid user_id FK
        timestamp created_at
        timestamp updated_at
    }
    
    USERS ||--o{ EBOOKS : "creates"
    USERS ||--o{ PAYMENTS : "makes"
    EBOOKS ||--|| PAYMENTS : "has"
```

### 5. Arquitetura de Deploy (Vercel)

```mermaid
graph LR
    subgraph "Development"
        A[Local Development] --> B[Git Push]
    end
    
    subgraph "Vercel Platform"
        B --> C[Vercel Build]
        C --> D[Edge Functions]
        C --> E[Static Assets]
        C --> F[API Routes]
    end
    
    subgraph "External Services"
        G[OpenAI API]
        H[Stripe API]
        I[Supabase]
    end
    
    D --> G
    F --> H
    F --> I
```

### 6. Estratégia de Cache e Performance

```mermaid
graph TB
    subgraph "Client Side"
        A[Browser Cache] --> B[Service Worker]
        B --> C[Local Storage]
    end
    
    subgraph "Edge Cache"
        D[Vercel Edge] --> E[CDN]
        E --> F[Static Assets]
    end
    
    subgraph "Server Side"
        G[API Cache] --> H[Database Cache]
        H --> I[Redis (Future)]
    end
    
    subgraph "External"
        J[OpenAI Cache] --> K[Content Templates]
    end
```

### 7. Fluxo de Erro e Fallbacks

```mermaid
flowchart TD
    A[Usuário faz requisição] --> B{API disponível?}
    B -->|Sim| C[Processa normalmente]
    B -->|Não| D[Retorna erro 503]
    
    C --> E{OpenAI responde?}
    E -->|Sim| F[Gera conteúdo]
    E -->|Não| G[Usa template local]
    
    F --> H{PDF gerado?}
    H -->|Sim| I[Download disponível]
    H -->|Não| J[Erro de geração]
    
    G --> K[Conteúdo básico]
    K --> I
    
    D --> L[Página de erro]
    J --> M[Retry automático]
```

### 8. Especificações de API Detalhadas

#### 8.1 API de Geração de Conteúdo

```typescript
// POST /api/generate-content
interface GenerateContentRequest {
  niche: string;
  userId?: string;
  customTopics?: string[];
}

interface GenerateContentResponse {
  success: boolean;
  content: string;
  title: string;
  ebookId: string;
  error?: string;
}

// Exemplo de uso:
const response = await fetch('/api/generate-content', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    niche: 'fitness',
    userId: 'optional-uuid'
  })
});
```

#### 8.2 API de Criação de PDF

```typescript
// POST /api/create-pdf
interface CreatePDFRequest {
  content: string;
  title: string;
  ebookId: string;
}

interface CreatePDFResponse {
  success: boolean;
  pdfUrl?: string;
  pdfBlob?: Blob;
  error?: string;
}
```

#### 8.3 API de Pagamento

```typescript
// POST /api/create-payment
interface CreatePaymentRequest {
  ebookId: string;
  userId?: string;
}

interface CreatePaymentResponse {
  success: boolean;
  checkoutUrl: string;
  sessionId: string;
  error?: string;
}
```

### 9. Configuração de Ambiente

#### 9.1 Desenvolvimento Local

```bash
# .env.local
OPENAI_API_KEY=sk-your-openai-key
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
```

#### 9.2 Produção (Vercel)

```bash
# Variáveis de ambiente no Vercel
OPENAI_API_KEY=sk-prod-openai-key
STRIPE_SECRET_KEY=sk_live_stripe-key
STRIPE_PUBLISHABLE_KEY=pk_live_stripe-key
STRIPE_WEBHOOK_SECRET=whsec_live-webhook-secret
SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key
NEXT_PUBLIC_APP_URL=https://grana-pdf.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_stripe-key
```

### 10. Estratégia de Monitoramento

```mermaid
graph TB
    subgraph "Application Monitoring"
        A[Vercel Analytics] --> B[Performance Metrics]
        C[Error Tracking] --> D[Sentry]
        E[User Behavior] --> F[Google Analytics]
    end
    
    subgraph "Business Metrics"
        G[Conversion Rate] --> H[Revenue Tracking]
        I[User Journey] --> J[Funnel Analysis]
        K[Content Quality] --> L[User Feedback]
    end
    
    subgraph "Technical Metrics"
        M[API Response Time] --> N[OpenAI Usage]
        O[PDF Generation Time] --> P[Error Rates]
        Q[Database Performance] --> R[Stripe Webhooks]
    end
```

### 11. Plano de Escalabilidade

#### 11.1 Fase 1: MVP (0-100 usuários/mês)
- **Infraestrutura:** Vercel + Supabase Free
- **Custos:** ~$50-100/mês
- **Foco:** Funcionalidade básica

#### 11.2 Fase 2: Crescimento (100-1000 usuários/mês)
- **Infraestrutura:** Vercel Pro + Supabase Pro
- **Custos:** ~$150-300/mês
- **Foco:** Performance e UX

#### 11.3 Fase 3: Escala (1000+ usuários/mês)
- **Infraestrutura:** Microservices + CDN
- **Custos:** ~$500-1000/mês
- **Foco:** Automação e analytics

### 12. Checklist de Implementação

#### 12.1 Setup Inicial
- [ ] Criar projeto Next.js 14
- [ ] Configurar Tailwind CSS
- [ ] Setup Supabase
- [ ] Configurar Stripe
- [ ] Configurar OpenAI

#### 12.2 Desenvolvimento Core
- [ ] Implementar seleção de nicho
- [ ] Integrar OpenAI API
- [ ] Implementar geração de PDF
- [ ] Integrar Stripe checkout
- [ ] Implementar webhooks

#### 12.3 Deploy e Testes
- [ ] Deploy na Vercel
- [ ] Configurar domínio
- [ ] Testes de funcionalidade
- [ ] Testes de pagamento
- [ ] Monitoramento inicial

---

**Documento criado em:** Dezembro 2024  
**Versão:** 1.0  
**Próxima revisão:** Durante implementação 