# Exemplos de Implementação - Grana PDF

## 1. Página Principal (src/app/page.tsx)

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Grana PDF
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gere ebooks profissionais automaticamente com IA. 
            Escolha seu nicho e receba um PDF completo em minutos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/select-niche">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Ver Exemplos
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Escolha o Nicho</h3>
              <p className="text-gray-600">
                Selecione entre 10 nichos especializados
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-2">IA Gera Conteúdo</h3>
              <p className="text-gray-600">
                Conteúdo relevante e profissional
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-lg font-semibold mb-2">Download PDF</h3>
              <p className="text-gray-600">
                Ebook pronto para uso
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 2. Componente de Seleção de Nicho (src/components/NicheSelector.tsx)

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NICHE_OPTIONS } from '@/constants/niches';
import { Button } from '@/components/ui/button';

export default function NicheSelector() {
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const router = useRouter();

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId);
  };

  const handleContinue = () => {
    if (selectedNiche) {
      router.push(`/generate?niche=${selectedNiche}`);
    }
  };

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
  );
}
```

## 3. API de Geração de Conteúdo (src/app/api/generate-content/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { NICHE_OPTIONS } from '@/constants/niches';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { niche } = await request.json();

    const nicheData = NICHE_OPTIONS.find(n => n.id === niche);
    if (!nicheData) {
      return NextResponse.json(
        { error: 'Nicho não encontrado' },
        { status: 400 }
      );
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
    `;

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
    });

    const content = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      content,
      niche: nicheData.name,
    });

  } catch (error) {
    console.error('Erro na geração de conteúdo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

## 4. Utilitário de Geração de PDF (src/lib/pdf.ts)

```typescript
import jsPDF from 'jspdf';

export function generatePDF(content: string, title: string): Blob {
  const doc = new jsPDF();
  
  // Configurações da página
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  
  let yPosition = margin;
  
  // Título
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;
  
  // Conteúdo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.trim() === '') {
      yPosition += lineHeight;
      continue;
    }
    
    if (line.startsWith('#')) {
      // Títulos
      const titleText = line.replace(/^#+\s*/, '');
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(titleText, margin, yPosition);
      yPosition += lineHeight + 5;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
    } else {
      // Texto normal
      const words = line.split(' ');
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + word + ' ';
        const testWidth = doc.getTextWidth(testLine);
        
        if (testWidth > pageWidth - 2 * margin && currentLine !== '') {
          doc.text(currentLine, margin, yPosition);
          yPosition += lineHeight;
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        doc.text(currentLine, margin, yPosition);
        yPosition += lineHeight;
      }
    }
    
    // Nova página se necessário
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  }
  
  return doc.output('blob');
}
```

## 5. Componente de Geração (src/components/ContentGenerator.tsx)

```typescript
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { NICHE_OPTIONS } from '@/constants/niches';
import { Button } from '@/components/ui/button';

export default function ContentGenerator() {
  const searchParams = useSearchParams();
  const nicheId = searchParams.get('niche');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState('');

  const nicheData = NICHE_OPTIONS.find(n => n.id === nicheId);

  const generateContent = async () => {
    if (!nicheId) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ niche: nicheId }),
      });

      const data = await response.json();

      if (data.success) {
        setContent(data.content);
        setProgress(100);
      } else {
        throw new Error(data.error);
      }

      clearInterval(progressInterval);
    } catch (error) {
      console.error('Erro na geração:', error);
      alert('Erro ao gerar conteúdo. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    if (!content) return;

    try {
      const response = await fetch('/api/create-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title: nicheData?.name }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${nicheData?.name}-ebook.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro no download:', error);
      alert('Erro ao baixar PDF. Tente novamente.');
    }
  };

  if (!nicheData) {
    return <div>Nicho não encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Gerando Ebook: {nicheData.name}
        </h1>
        <p className="text-gray-600">
          {nicheData.description}
        </p>
      </div>

      {!content ? (
        <div className="max-w-md mx-auto text-center">
          <Button
            onClick={generateContent}
            disabled={isGenerating}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? 'Gerando...' : 'Gerar Ebook'}
          </Button>

          {isGenerating && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {progress}% concluído
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm">{content}</pre>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={downloadPDF}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              Baixar PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 6. Configuração do Layout (src/app/layout.tsx)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Grana PDF - Gere Ebooks com IA',
  description: 'Crie ebooks profissionais automaticamente com inteligência artificial. Escolha seu nicho e receba um PDF completo em minutos.',
  keywords: 'ebook, pdf, ia, inteligência artificial, conteúdo, nicho',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Grana PDF
              </h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a href="/" className="text-gray-600 hover:text-blue-600">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/select-niche" className="text-gray-600 hover:text-blue-600">
                      Criar Ebook
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="bg-gray-50 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Grana PDF. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

## 7. Componentes UI Básicos

### Button (src/components/ui/button.tsx)
```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

### Utils (src/lib/utils.ts)
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 8. Próximos Passos

1. **Implementar os componentes básicos**
2. **Configurar as APIs**
3. **Integrar sistema de pagamento**
4. **Testar funcionalidades**
5. **Deploy na Vercel**

Este é um exemplo inicial que pode ser expandido conforme necessário. O código está estruturado para ser escalável e manter boas práticas de desenvolvimento. 