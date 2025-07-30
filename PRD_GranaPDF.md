# PRD - Grana PDF
## Product Requirements Document

### 1. Visão Geral do Produto

**Nome do Produto:** Grana PDF  
**Tipo:** Micro SaaS  
**Objetivo:** Plataforma que gera automaticamente ebooks personalizados por nicho usando IA e os disponibiliza para download em PDF.

### 2. Proposta de Valor

- **Para o usuário:** Acesso rápido a conteúdo especializado e profissional em formato ebook
- **Diferencial:** Geração automática de conteúdo relevante por nicho específico
- **Benefício:** Economia de tempo na criação de conteúdo, material pronto para uso

### 3. Personas e Jornada do Usuário

#### Persona Principal
- **Perfil:** Profissionais, empreendedores, criadores de conteúdo
- **Necessidade:** Conteúdo especializado para nichos específicos
- **Objetivo:** Obter material pronto para uso em formato profissional

#### Jornada do Usuário
1. **Descoberta:** Usuário acessa a plataforma
2. **Seleção:** Escolhe um nicho de interesse
3. **Geração:** Sistema cria o ebook automaticamente
4. **Download:** Usuário baixa o PDF
5. **Pagamento:** Processo de pagamento (R$ 9,97)

### 4. Funcionalidades Principais

#### 4.1 Seleção de Nicho
- Interface intuitiva para escolha de nicho
- Nichos disponíveis:
  - Fitness e Saúde
  - Culinária e Gastronomia
  - Negócios e Empreendedorismo
  - Tecnologia
  - Marketing Digital
  - Educação
  - Moda e Beleza
  - Viagens
  - Finanças Pessoais
  - Produtividade

#### 4.2 Geração de Conteúdo
- Integração com OpenAI API
- Geração automática de 10-15 páginas
- Estrutura consistente:
  - Capa profissional
  - Sumário
  - Conteúdo principal dividido em capítulos
  - Conclusão
  - Recursos adicionais

#### 4.3 Exportação PDF
- Conversão automática para PDF
- Layout profissional e responsivo
- Inclusão de elementos visuais (se aplicável)
- Otimização para diferentes dispositivos

#### 4.4 Sistema de Pagamento
- Integração com gateway de pagamento
- Preço fixo: R$ 9,97 por ebook
- Processamento seguro de transações

### 5. Especificações Técnicas

#### 5.1 Stack Tecnológica
- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **IA:** OpenAI API (GPT-4)
- **PDF:** jsPDF
- **Deploy:** Vercel
- **Banco de Dados:** Supabase ou similar
- **Pagamentos:** Stripe ou similar

#### 5.2 Arquitetura
```
Frontend (Next.js 14)
├── Páginas
│   ├── Home (/)
│   ├── Seleção de Nicho (/select-niche)
│   ├── Geração (/generate)
│   ├── Download (/download)
│   └── Pagamento (/payment)
├── Componentes
│   ├── NicheSelector
│   ├── ContentGenerator
│   ├── PDFExporter
│   └── PaymentForm
└── APIs
    ├── /api/generate-content
    ├── /api/create-pdf
    └── /api/process-payment
```

#### 5.3 Fluxo Técnico
1. Usuário seleciona nicho
2. Frontend chama API de geração
3. OpenAI gera conteúdo
4. Sistema formata conteúdo
5. jsPDF cria PDF
6. Usuário faz pagamento
7. PDF é disponibilizado para download

### 6. Design e UX

#### 6.1 Princípios de Design
- Interface limpa e moderna
- Foco na simplicidade
- Feedback visual durante geração
- Design responsivo

#### 6.2 Paleta de Cores
- **Primária:** #3B82F6 (Azul)
- **Secundária:** #10B981 (Verde)
- **Neutra:** #F3F4F6 (Cinza claro)
- **Texto:** #1F2937 (Cinza escuro)

#### 6.3 Componentes UI
- Cards para seleção de nicho
- Progress bar para geração
- Modal de preview
- Botões de ação claros

### 7. Modelo de Negócio

#### 7.1 Monetização
- **Preço:** R$ 9,97 por ebook
- **Modelo:** Pay-per-use
- **Margem estimada:** 70-80% após custos

#### 7.2 Custos Operacionais
- OpenAI API: ~R$ 0,50-1,00 por ebook
- Vercel hosting: ~R$ 20/mês
- Gateway de pagamento: ~3% da transação
- Domínio e SSL: ~R$ 50/ano

#### 7.3 Projeções
- **Meta inicial:** 100 ebooks/mês
- **Receita mensal:** R$ 997
- **Custos mensais:** ~R$ 200
- **Lucro mensal:** ~R$ 797

### 8. Roadmap de Desenvolvimento

#### Fase 1 (MVP) - 4 semanas
- [ ] Setup do projeto Next.js
- [ ] Interface básica de seleção de nicho
- [ ] Integração com OpenAI API
- [ ] Geração básica de PDF
- [ ] Sistema de pagamento
- [ ] Deploy na Vercel

#### Fase 2 (Melhorias) - 2 semanas
- [ ] Melhorias no design
- [ ] Otimização de performance
- [ ] Analytics e tracking
- [ ] Testes de usabilidade

#### Fase 3 (Expansão) - 4 semanas
- [ ] Novos nichos
- [ ] Templates personalizados
- [ ] Sistema de usuários
- [ ] Dashboard de analytics

### 9. Métricas de Sucesso

#### 9.1 KPIs Principais
- **Conversão:** Taxa de usuários que completam a compra
- **Receita:** Receita mensal recorrente
- **Satisfação:** NPS dos usuários
- **Performance:** Tempo de geração do PDF

#### 9.2 Metas Iniciais
- 100 ebooks vendidos no primeiro mês
- Taxa de conversão > 5%
- NPS > 50
- Tempo de geração < 30 segundos

### 10. Riscos e Mitigações

#### 10.1 Riscos Técnicos
- **Risco:** Limitações da OpenAI API
- **Mitigação:** Implementar fallbacks e cache

- **Risco:** Performance de geração de PDF
- **Mitigação:** Otimização e queue system

#### 10.2 Riscos de Negócio
- **Risco:** Baixa conversão
- **Mitigação:** A/B testing e otimização contínua

- **Risco:** Concorrência
- **Mitigação:** Diferenciação por nicho e qualidade

### 11. Próximos Passos

1. **Validação:** Pesquisa com potenciais usuários
2. **Prototipagem:** Criação de mockups
3. **Desenvolvimento:** Início do desenvolvimento MVP
4. **Testes:** Testes internos e com usuários
5. **Launch:** Lançamento beta

---

**Documento criado em:** [Data atual]  
**Versão:** 1.0  
**Próxima revisão:** Após validação inicial 