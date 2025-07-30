# Configuração da OpenAI API - Grana PDF

## 🔑 Configuração da API Key

### 1. Obter API Key da OpenAI

1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Faça login ou crie uma conta
3. Vá para "API Keys" no menu lateral
4. Clique em "Create new secret key"
5. Copie a chave gerada (formato: `sk-...`)

### 2. Configurar Variável de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
OPENAI_API_KEY=sk-sua_chave_aqui
NODE_ENV=development
```

### 3. Verificar Configuração

Após configurar a API key, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🚀 Funcionalidades Implementadas

### ✅ Integração OpenAI Real
- **Modelo:** GPT-4o-mini (otimizado para custo/performance)
- **Tokens:** Máximo 4000 tokens por geração
- **Temperatura:** 0.7 (criatividade balanceada)
- **Prompt:** Otimizado para ebooks profissionais

### ✅ Geração de PDF Real
- **Biblioteca:** jsPDF
- **Formatação:** Markdown para PDF
- **Layout:** Profissional com headers, parágrafos e rodapé
- **Páginas:** Múltiplas páginas automáticas

### ✅ Tratamento de Erros
- **API Key inválida:** Erro 401
- **Rate limit:** Erro 429
- **Erro interno OpenAI:** Erro 500
- **Fallback:** PDF básico se conteúdo não disponível

## 📊 Estatísticas de Geração

### Métricas Capturadas
- **Título:** Extraído automaticamente do conteúdo
- **Páginas:** Estimativa baseada no conteúdo
- **Tokens:** Consumo real da API
- **Modelo:** GPT-4o-mini
- **Tempo:** 2-3 minutos estimados

### Exemplo de Resposta
```json
{
  "success": true,
  "data": {
    "title": "Guia Completo de Marketing Digital",
    "content": "# Guia Completo de Marketing Digital\n\n## Introdução\n\n...",
    "pages": 12,
    "estimatedTime": "2-3 minutos",
    "niche": "Marketing Digital",
    "generatedAt": "2024-07-30T16:00:00.000Z",
    "model": "gpt-4o-mini",
    "tokens": 2847
  }
}
```

## 🔧 Configurações Avançadas

### Prompt Otimizado
O prompt foi otimizado para gerar ebooks profissionais com:
- Estrutura clara (Introdução, Capítulos, Conclusão)
- Linguagem acessível
- Conteúdo prático e acionável
- Formatação markdown adequada

### Parâmetros da API
```javascript
{
  model: "gpt-4o-mini",
  max_tokens: 4000,
  temperature: 0.7,
  top_p: 0.9,
  frequency_penalty: 0.1,
  presence_penalty: 0.1
}
```

## 🛠️ Troubleshooting

### Erro: "OpenAI API key não configurada"
**Solução:** Verifique se o arquivo `.env.local` existe e contém a API key correta.

### Erro: "API key da OpenAI inválida"
**Solução:** Verifique se a API key está correta e ativa na plataforma OpenAI.

### Erro: "Limite de requisições excedido"
**Solução:** Aguarde alguns minutos antes de tentar novamente.

### Erro: "Erro interno da OpenAI"
**Solução:** Tente novamente em alguns minutos. Se persistir, verifique o status da API.

## 💰 Custos Estimados

### GPT-4o-mini
- **Input:** $0.15 por 1M tokens
- **Output:** $0.60 por 1M tokens
- **Ebook típico:** ~$0.01-0.03 por geração

### Monitoramento
- Tokens utilizados são exibidos na interface
- Logs detalhados no console do servidor
- Métricas de uso disponíveis

## 🔒 Segurança

### Boas Práticas
- ✅ API key em variáveis de ambiente
- ✅ Nunca commitar `.env.local`
- ✅ Validação de entrada
- ✅ Tratamento de erros robusto
- ✅ Rate limiting implementado

### Arquivos Sensíveis
```
.env.local          # API keys (não commitar)
.env.example        # Exemplo de configuração
```

## 📈 Próximos Passos

### Melhorias Planejadas
1. **Cache de conteúdo:** Evitar regeneração
2. **Templates personalizados:** Diferentes estilos
3. **Análise de qualidade:** Score do conteúdo
4. **Integração com banco:** Histórico de gerações

### Monitoramento
- Implementar analytics de uso
- Dashboard de métricas
- Alertas de custo
- Logs estruturados

---

**Status:** ✅ **INTEGRAÇÃO COMPLETA**  
**Última atualização:** 30/07/2024 