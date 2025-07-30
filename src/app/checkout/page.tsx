"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Mail,
  Loader2,
  Sparkles,
  Shield
} from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const niche = searchParams.get('niche');
  const packageId = searchParams.get('package');
  const quantity = searchParams.get('quantity');
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Configuração dos pacotes
  const packageConfigs = {
    teste: { name: '🥉 TESTE', credits: 1, price: 9.97 },
    starter: { name: '🥈 STARTER', credits: 3, price: 24.90 },
    popular: { name: '🥇 POPULAR', credits: 10, price: 69.90 },
    premium: { name: '💎 PREMIUM', credits: 25, price: 149.90 },
    personalizado: { name: '⚡ PERSONALIZADO', credits: parseInt(quantity || '25'), price: parseFloat(quantity || '25') * 5.99 }
  };

  const currentPackage = packageConfigs[packageId as keyof typeof packageConfigs];

  useEffect(() => {
    if (!niche || !packageId || !currentPackage) {
      router.push('/');
    }
  }, [niche, packageId, currentPackage, router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email é obrigatório');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          email,
          customQuantity: quantity ? parseInt(quantity) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar checkout');
      }

      // Redirecionar para o Stripe Checkout
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          throw new Error(error.message);
        }
      }

    } catch (err) {
      console.error('Erro no checkout:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPackage) {
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
            Finalizar Compra
          </h1>
          <p className="text-xl text-gray-600">
            Nicho selecionado: <span className="font-semibold text-blue-600">{niche}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Pacote</span>
                <span className="text-gray-600">{currentPackage.name}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Créditos</span>
                <span className="text-gray-600">{currentPackage.credits} PDF{currentPackage.credits > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Preço por PDF</span>
                <span className="text-gray-600">R$ {(currentPackage.price / currentPackage.credits).toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">R$ {currentPackage.price.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Incluído no pacote:</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {currentPackage.credits} PDF{currentPackage.credits > 1 ? 's' : ''} personalizado{currentPackage.credits > 1 ? 's' : ''}</li>
                <li>• Conteúdo gerado por IA avançada</li>
                <li>• Download imediato</li>
                <li>• Suporte por email</li>
                <li>• Sem mensalidade</li>
              </ul>
            </div>
          </div>

          {/* Formulário de Checkout */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informações de Pagamento
            </h2>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Seus créditos serão vinculados a este email
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pagar R$ {currentPackage.price.toFixed(2).replace('.', ',')}
                  </>
                )}
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2" />
                  Pagamento seguro via Stripe
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Aceitamos cartão de crédito e boleto bancário
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Garantias */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            ✨ Nossas Garantias
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Qualidade Garantida</h4>
              <p className="text-sm text-gray-600">
                Conteúdo profissional gerado por IA de última geração
              </p>
            </div>
            <div>
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Entrega Imediata</h4>
              <p className="text-sm text-gray-600">
                Seus créditos ficam disponíveis logo após o pagamento
              </p>
            </div>
            <div>
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Pagamento Seguro</h4>
              <p className="text-sm text-gray-600">
                Processamento seguro via Stripe com criptografia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}