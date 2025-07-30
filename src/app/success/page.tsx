"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle, 
  ArrowRight, 
  BookOpen,
  CreditCard,
  Download,
  Sparkles
} from "lucide-react";

interface SessionData {
  metadata?: {
    credits?: string;
    package_id?: string;
  };
  amount_total?: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      // Buscar dados da sessão de checkout
      fetch(`/api/checkout/verify?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSessionData(data.session);
          } else {
            setError('Sessão inválida');
          }
        })
        .catch(err => {
          console.error('Erro ao verificar sessão:', err);
          setError('Erro ao verificar pagamento');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('ID da sessão não encontrado');
      setLoading(false);
    }
  }, [sessionId]);

  const handleStartGenerating = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erro na Verificação
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const credits = sessionData?.metadata?.credits || 0;
  const packageName = sessionData?.metadata?.package_id || '';
  const amountPaid = sessionData?.amount_total ? (sessionData.amount_total / 100).toFixed(2) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Grana PDF</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pagamento Confirmado! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seus créditos foram adicionados com sucesso e já estão disponíveis para uso.
          </p>
        </div>

        {/* Purchase Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Resumo da Compra
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Valor Pago</h3>
              <p className="text-2xl font-bold text-green-600">
                R$ {amountPaid.replace('.', ',')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Créditos Recebidos</h3>
              <p className="text-2xl font-bold text-blue-600">
                {credits} PDF{credits > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Download className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Pacote</h3>
              <p className="text-lg font-semibold text-purple-600 capitalize">
                {packageName.replace('-', ' ')}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <span className="font-semibold text-gray-900">Créditos Ativados</span>
            </div>
            <p className="text-center text-gray-600">
              Seus {credits} créditos já estão disponíveis na sua conta e podem ser usados imediatamente para gerar PDFs personalizados.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Próximos Passos
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Escolha seu Nicho</h3>
                <p className="text-gray-600">Selecione entre 10 nichos especializados disponíveis</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gere seus PDFs</h3>
                <p className="text-gray-600">Nossa IA criará conteúdo personalizado em menos de 2 minutos</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Download Imediato</h3>
                <p className="text-gray-600">Baixe seus ebooks em PDF profissional</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartGenerating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors flex items-center justify-center mx-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Começar a Gerar PDFs
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Precisa de ajuda? Entre em contato conosco em{' '}
            <a href="mailto:suporte@granapdf.com" className="text-blue-600 hover:text-blue-700 font-semibold">
              suporte@granapdf.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}