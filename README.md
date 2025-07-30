# Grana PDF - Ebooks Personalizados por IA

## Sobre o Projeto

O Grana PDF é uma plataforma que gera automaticamente ebooks personalizados por nicho usando inteligência artificial e os disponibiliza para download em PDF por R$ 9,97.

## Funcionalidades Implementadas

### ✅ User Story 1.1: Landing Page Principal
- **Status:** Implementado
- **Descrição:** Landing page atrativa com apresentação do produto
- **Critérios de Aceitação:**
  - ✅ Página carrega em menos de 3 segundos
  - ✅ Exibe título, subtítulo e call-to-action claro
  - ✅ Mostra lista de nichos disponíveis
  - ✅ Botão "Começar Agora" leva para seleção de nicho
  - ✅ Design responsivo para mobile e desktop
  - ✅ Inclui seção de benefícios e preço

### ✅ User Story 2.1: Interface de Seleção de Nicho
- **Status:** Implementado
- **Descrição:** Interface intuitiva para seleção de nicho
- **Critérios de Aceitação:**
  - ✅ Lista visual de nichos com ícones
  - ✅ Descrição breve de cada nicho
  - ✅ Seleção por clique/tap
  - ✅ Validação de seleção obrigatória
  - ✅ Botão "Continuar" só ativa após seleção
  - ✅ Feedback visual da seleção

## Nichos Disponíveis

1. **Fitness e Saúde** - Conteúdo sobre exercícios, nutrição e bem-estar
2. **Culinária e Gastronomia** - Receitas, técnicas culinárias e dicas gastronômicas
3. **Negócios e Empreendedorismo** - Estratégias de negócio e empreendedorismo
4. **Tecnologia** - Tendências, inovações e dicas tecnológicas
5. **Marketing Digital** - Estratégias de marketing online e redes sociais
6. **Educação** - Métodos de ensino e desenvolvimento pessoal
7. **Moda e Beleza** - Tendências de moda e dicas de beleza
8. **Viagens** - Destinos, dicas de viagem e turismo
9. **Finanças Pessoais** - Educação financeira e planejamento pessoal
10. **Produtividade** - Técnicas de produtividade e organização

## Stack Tecnológica

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Ícones:** Lucide React
- **IA:** OpenAI API (preparado para integração)
- **PDF:** jsPDF (preparado para integração)
- **Pagamentos:** Stripe (preparado para integração)

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

4. **Executar em produção:**
   ```bash
   npm start
   ```

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com metadata
│   ├── page.tsx            # Landing page principal
│   └── globals.css         # Estilos globais
├── components/
│   └── NicheSelector.tsx   # Componente de seleção de nicho
```

## Próximos Passos

### Sprint 1 (MVP Core)
- [ ] Integração com OpenAI API
- [ ] Tela de geração com progresso
- [ ] Integração com Stripe
- [ ] Conversão para PDF
- [ ] Sistema de pagamento
- [ ] Deploy na Vercel

### Sprint 2 (Refinamentos)
- [ ] Header e navegação melhorados
- [ ] Validação e feedback aprimorados
- [ ] Página de pagamento
- [ ] Página de sucesso
- [ ] Monitoramento e analytics

## Design System

### Cores
- **Primária:** #3B82F6 (Azul)
- **Secundária:** #10B981 (Verde)
- **Neutra:** #F3F4F6 (Cinza claro)
- **Texto:** #1F2937 (Cinza escuro)

### Componentes
- Cards para seleção de nicho
- Botões com estados hover
- Gradientes para destaque
- Ícones coloridos por nicho

## Performance

- ✅ Build otimizado
- ✅ Linting e TypeScript configurados
- ✅ Responsivo para mobile e desktop
- ✅ Carregamento rápido (< 3s)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste localmente
5. Faça commit e push
6. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando Next.js 14 e Tailwind CSS**
