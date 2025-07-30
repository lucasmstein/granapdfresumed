"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  Download, 
  CheckCircle, 
  ArrowLeft,
  Loader2,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";

interface NicheData {
  id: string;
  name: string;
  description: string;
  color: string;
}

const nichesData: Record<string, NicheData> = {
  "fitness-saude": {
    id: "fitness-saude",
    name: "Fitness e Saúde",
    description: "Conteúdo sobre exercícios, nutrição e bem-estar",
    color: "bg-red-500"
  },
  "culinaria-gastronomia": {
    id: "culinaria-gastronomia",
    name: "Culinária e Gastronomia",
    description: "Receitas, técnicas culinárias e dicas gastronômicas",
    color: "bg-orange-500"
  },
  "negocios-empreendedorismo": {
    id: "negocios-empreendedorismo",
    name: "Negócios e Empreendedorismo",
    description: "Estratégias de negócio e empreendedorismo",
    color: "bg-blue-500"
  },
  "tecnologia": {
    id: "tecnologia",
    name: "Tecnologia",
    description: "Tendências, inovações e dicas tecnológicas",
    color: "bg-purple-500"
  },
  "marketing-digital": {
    id: "marketing-digital",
    name: "Marketing Digital",
    description: "Estratégias de marketing online e redes sociais",
    color: "bg-green-500"
  },
  "educacao": {
    id: "educacao",
    name: "Educação",
    description: "Métodos de ensino e desenvolvimento pessoal",
    color: "bg-indigo-500"
  },
  "moda-beleza": {
    id: "moda-beleza",
    name: "Moda e Beleza",
    description: "Tendências de moda e dicas de beleza",
    color: "bg-pink-500"
  },
  "viagens": {
    id: "viagens",
    name: "Viagens",
    description: "Destinos, dicas de viagem e turismo",
    color: "bg-cyan-500"
  },
  "financas-pessoais": {
    id: "financas-pessoais",
    name: "Finanças Pessoais",
    description: "Educação financeira e planejamento pessoal",
    color: "bg-emerald-500"
  },
  "produtividade": {
    id: "produtividade",
    name: "Produtividade",
    description: "Técnicas de produtividade e organização",
    color: "bg-yellow-500"
  }
};

type GenerationStatus = 'preparing' | 'generating' | 'creating-pdf' | 'completed' | 'error';

function GenerateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nicheId = searchParams.get('niche');
  
  const [status, setStatus] = useState<GenerationStatus>('preparing');
  const [progress, setProgress] = useState(0);
  const [ebookTitle, setEbookTitle] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [generationStats, setGenerationStats] = useState({
    pages: 0,
    tokens: 0,
    model: '',
    estimatedTime: ''
  });

  const nicheData = nicheId ? nichesData[nicheId] : null;

  useEffect(() => {
    if (!nicheId || !nicheData) {
      router.push('/');
      return;
    }

    // Processo de geração real
    const generateEbook = async () => {
      try {
        // Fase 1: Preparando (0-20%)
        setStatus('preparing');
        for (let i = 0; i <= 20; i += 5) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Fase 2: Gerando conteúdo via API (20-70%)
        setStatus('generating');
        
        // Chamada para API de geração
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ niche: nicheData.name }),
        });

        if (!response.ok) {
          throw new Error('Erro na geração de conteúdo');
        }

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Erro na geração');
        }

        // Atualizar progresso durante geração
        for (let i = 20; i <= 70; i += 5) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Fase 3: Criando PDF (70-100%)
        setStatus('creating-pdf');
        for (let i = 70; i <= 100; i += 5) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Concluído
        setStatus('completed');
        setEbookTitle(result.data.title);
        setGenerationStats({
          pages: result.data.pages,
          tokens: result.data.tokens,
          model: result.data.model,
          estimatedTime: result.data.estimatedTime
        });

        // Preparar URL de download com conteúdo e nicho
        const downloadParams = new URLSearchParams({
          filename: `${result.data.title}.pdf`,
          title: result.data.title,
          content: result.data.content,
          niche: nicheId,
          subtitle: `Guia completo sobre ${nicheData.name}`
        });
        setDownloadUrl(`/api/download?${downloadParams.toString()}`);

      } catch (err) {
        console.error('Erro na geração:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Erro ao gerar ebook. Tente novamente.');
      }
    };

    generateEbook();
  }, [nicheId, nicheData, router]);

  const getStatusMessage = () => {
    switch (status) {
      case 'preparing':
        return 'Preparando ambiente de geração...';
      case 'generating':
        return 'Gerando conteúdo personalizado...';
      case 'creating-pdf':
        return 'Criando PDF profissional...';
      case 'completed':
        return 'Ebook gerado com sucesso!';
      case 'error':
        return 'Erro na geração';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'preparing':
      case 'generating':
      case 'creating-pdf':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <FileText className="h-8 w-8 text-red-600" />;
      default:
        return null;
    }
  };

  const handleDownload = () => {
    // Download via API com conteúdo real
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${ebookTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateNew = () => {
    router.push('/');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (!nicheData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </button>
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Grana PDF</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gerando seu Ebook
          </h1>
          <p className="text-xl text-gray-600">
            Nicho selecionado: <span className="font-semibold text-blue-600">{nicheData.name}</span>
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            {getStatusIcon()}
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
              {getStatusMessage()}
            </h2>
            <p className="text-gray-600">
              {status === 'completed' 
                ? 'Seu ebook está pronto para download!'
                : 'Aguarde enquanto nossa IA cria conteúdo personalizado...'
              }
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status Details */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Conteúdo IA</h3>
              <p className="text-sm text-gray-600">
                {status === 'completed' ? `${generationStats.pages} páginas` : '10-15 páginas'}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Tempo Estimado</h3>
              <p className="text-sm text-gray-600">
                {status === 'completed' ? generationStats.estimatedTime : '~2-3 minutos'}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Modelo IA</h3>
              <p className="text-sm text-gray-600">
                {status === 'completed' ? generationStats.model : 'GPT-4o-mini'}
              </p>
            </div>
          </div>

          {/* Stats quando completado */}
          {status === 'completed' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-blue-600">
                  <strong>Estatísticas da Geração:</strong> {generationStats.tokens} tokens utilizados
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Download Section */}
        {status === 'completed' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ebook Gerado com Sucesso!
              </h2>
              <p className="text-gray-600 mb-4">
                {ebookTitle}
              </p>
              <p className="text-sm text-gray-500">
                Conteúdo personalizado para {nicheData.name}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors flex items-center justify-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar PDF
              </button>
              <button
                onClick={handleGenerateNew}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Gerar Novo Ebook
              </button>
            </div>
          </div>
        )}

        {/* Error Section */}
        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Erro na Geração
              </h2>
              <p className="text-gray-600 mb-6">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Tentar Novamente
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
} 