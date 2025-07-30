import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { env } from '../../../../env.config';
import { creditsDB } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { niche, email } = await request.json();

    // Validar parâmetros obrigatórios
    if (!niche || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nicho e email são obrigatórios' 
        },
        { status: 400 }
      );
    }

    // Validar créditos do usuário
    const userCredits = creditsDB.getCredits(email);
    if (!userCredits || userCredits.credits_remaining <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Você não possui créditos suficientes. Compre um pacote para continuar.',
          needsCredits: true
        },
        { status: 402 } // Payment Required
      );
    }

    // Validar se a API key está configurada
    if (!env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OpenAI API key não configurada' 
        },
        { status: 500 }
      );
    }

    // Inicializar cliente OpenAI apenas quando necessário
    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });

    // Prompt otimizado para geração de ebook com elementos Gamma
    const prompt = `Crie um ebook completo e profissional sobre "${niche}" com design system estilo Gamma. Use a seguinte estrutura:

TÍTULO: Crie um título atrativo e profissional

ESTRUTURA COM ELEMENTOS GAMMA:

1. INTRODUÇÃO (1 página)
   - Apresentação do tema
   - Importância do conhecimento
   - O que o leitor vai aprender
   - Use: 💡 para dicas importantes

2. CAPÍTULO 1: FUNDAMENTOS (3-4 páginas)
   - Conceitos básicos
   - Princípios fundamentais
   - Explicações claras e práticas
   - Use: 📌 para pontos chave
   - Use: ✅ para sucessos
   - Use: ❌ para erros comuns

3. CAPÍTULO 2: ESTRATÉGIAS PRÁTICAS (4-5 páginas)
   - Técnicas aplicáveis
   - Dicas práticas
   - Exemplos reais
   - Use: 🎯 para objetivos
   - Use: 💪 para ações
   - Use: ⚠️ para atenções

4. CAPÍTULO 3: FERRAMENTAS E RECURSOS (2-3 páginas)
   - Ferramentas essenciais
   - Recursos recomendados
   - Como implementar
   - Use: 📌 para pontos chave
   - Use: 💡 para dicas

5. CONCLUSÃO (1 página)
   - Resumo dos pontos principais
   - Próximos passos
   - Motivação para ação
   - Use: 🎯 para objetivos finais

FORMATO GAMMA:
- Use emojis estratégicos para destacar pontos importantes
- Estrutura clara com headers bem definidos
- Linguagem acessível e profissional
- Conteúdo prático e acionável
- Parágrafos bem estruturados
- Total: 10-15 páginas de conteúdo rico
- Use markdown com formatação adequada

ELEMENTOS ESPECIAIS:
- 💡 Dica: Para insights valiosos
- 📌 Ponto Chave: Para conceitos fundamentais
- ✅ Sucesso: Para práticas recomendadas
- ❌ Erro Comum: Para evitar problemas
- 🎯 Objetivo: Para metas claras
- 💪 Ação: Para passos práticos
- ⚠️ Atenção: Para pontos importantes

Gere o conteúdo em markdown com formatação adequada para conversão em PDF com design Gamma.`;

    // Chamada para OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modelo otimizado para custo/performance
      messages: [
        {
          role: "system",
          content: "Você é um especialista em criação de conteúdo educacional e ebooks profissionais com design system estilo Gamma. Crie conteúdo de alta qualidade, prático e acionável, usando elementos visuais e estrutura clara."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000, // Limite adequado para ebook
      temperature: 0.7, // Criatividade balanceada
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('Não foi possível gerar conteúdo');
    }

    // Processar o conteúdo gerado
    const lines = generatedContent.split('\n');
    let title = `Guia Completo de ${niche}`;
    let content = generatedContent;

    // Extrair título se presente no conteúdo
    for (const line of lines) {
      if (line.startsWith('# ') && !line.includes('CAPÍTULO')) {
        title = line.replace('# ', '').trim();
        content = content.replace(line, '').trim();
        break;
      }
    }

    // Adicionar metadados do ebook
    const ebookData = {
      title,
      content,
      pages: Math.ceil(content.split('\n').length / 30), // Estimativa de páginas
      estimatedTime: '2-3 minutos',
      niche,
      generatedAt: new Date().toISOString(),
      model: 'gpt-4o-mini',
      tokens: completion.usage?.total_tokens || 0,
    };

    // Decrementar crédito do usuário após geração bem-sucedida
    const creditUsed = creditsDB.useCredit(email, niche, title);
    if (!creditUsed) {
      console.error('Erro ao decrementar crédito para:', email);
      // Não falha a requisição, mas loga o erro
    }

    // Buscar créditos atualizados
    const updatedCredits = creditsDB.getCredits(email);

    return NextResponse.json({
      success: true,
      data: ebookData,
      creditsRemaining: updatedCredits ? updatedCredits.credits_remaining : 0
    });

  } catch (error) {
    console.error('Erro na geração com OpenAI:', error);
    
    // Tratamento específico de erros da OpenAI
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'API key da OpenAI inválida' 
          },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Limite de requisições excedido. Tente novamente em alguns minutos.' 
          },
          { status: 429 }
        );
      }
      if (error.status === 500) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Erro interno da OpenAI. Tente novamente.' 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente.' 
      },
      { status: 500 }
    );
  }
} 