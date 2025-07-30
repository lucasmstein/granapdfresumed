"use client";

import { useState } from "react";
import { 
  Crown, 
  Trophy, 
  Medal, 
  Settings,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface Package {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  pdfs: number;
  originalPrice: number;
  price: number;
  pricePerPdf: number;
  savings?: number;
  badge?: string;
  description: string;
  features: string[];
  popular?: boolean;
  customizable?: boolean;
}

const packages: Package[] = [
  {
    id: "teste",
    name: "TESTE",
    icon: Medal,
    emoji: "🥉",
    pdfs: 1,
    originalPrice: 9.97,
    price: 9.97,
    pricePerPdf: 9.97,
    description: "Ideal para testar nosso serviço",
    features: [
      "1 PDF personalizado",
      "Conteúdo especializado por IA",
      "Download imediato",
      "Suporte por email"
    ]
  },
  {
    id: "starter",
    name: "STARTER",
    icon: Trophy,
    emoji: "🥈",
    pdfs: 3,
    originalPrice: 29.91,
    price: 24.90,
    pricePerPdf: 8.30,
    savings: 17,
    description: "Perfeito para começar seu projeto",
    features: [
      "3 PDFs personalizados",
      "Economia de 17%",
      "Conteúdo especializado por IA",
      "Download imediato",
      "Suporte prioritário"
    ]
  },
  {
    id: "popular",
    name: "POPULAR",
    icon: Crown,
    emoji: "🥇",
    pdfs: 10,
    originalPrice: 99.70,
    price: 69.90,
    pricePerPdf: 6.99,
    savings: 30,
    badge: "MAIS ESCOLHIDO",
    popular: true,
    description: "A escolha favorita dos nossos clientes",
    features: [
      "10 PDFs personalizados",
      "Economia de 30%",
      "Conteúdo premium por IA",
      "Download imediato",
      "Suporte VIP",
      "Templates exclusivos"
    ]
  },
  {
    id: "premium",
    name: "PREMIUM",
    icon: Sparkles,
    emoji: "💎",
    pdfs: 25,
    originalPrice: 249.25,
    price: 149.90,
    pricePerPdf: 5.99,
    savings: 40,
    description: "Máximo valor para profissionais",
    features: [
      "25 PDFs personalizados",
      "Economia de 40%",
      "Conteúdo premium por IA",
      "Download imediato",
      "Suporte dedicado",
      "Templates exclusivos",
      "Consultoria gratuita"
    ]
  },
  {
    id: "personalizado",
    name: "PERSONALIZADO",
    icon: Settings,
    emoji: "⚡",
    pdfs: 25,
    originalPrice: 0,
    price: 0,
    pricePerPdf: 5.99,
    customizable: true,
    description: "Personalize conforme sua necessidade",
    features: [
      "Mínimo 25 PDFs",
      "R$ 5,99 por PDF",
      "Conteúdo premium por IA",
      "Download imediato",
      "Suporte dedicado",
      "Templates exclusivos",
      "Consultoria gratuita",
      "Desconto por volume"
    ]
  }
];

interface PackageSelectorProps {
  selectedNiche: string;
  onPackageSelect: (packageId: string, customQuantity?: number) => void;
}

export default function PackageSelector({ selectedNiche, onPackageSelect }: PackageSelectorProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [customQuantity, setCustomQuantity] = useState(25);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    if (packageId === 'personalizado') {
      onPackageSelect(packageId, customQuantity);
    } else {
      onPackageSelect(packageId);
    }
  };

  const getCustomPrice = () => {
    return customQuantity * 5.99;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Escolha seu Pacote de Créditos
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cada crédito permite gerar 1 PDF personalizado no nicho selecionado: <span className="font-semibold text-blue-600">{selectedNiche}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:-translate-y-1 ${
              pkg.popular 
                ? 'border-blue-500 ring-4 ring-blue-500/20' 
                : selectedPackage === pkg.id
                ? 'border-blue-500'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handlePackageSelect(pkg.id)}
          >
            {/* Badge para pacote popular */}
            {pkg.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  {pkg.badge}
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{pkg.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {pkg.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                {pkg.customizable ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade de PDFs (mín. 25)
                      </label>
                      <input
                        type="range"
                        min="25"
                        max="100"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>25</span>
                        <span>{customQuantity}</span>
                        <span>100</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      R$ {getCustomPrice().toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customQuantity} PDFs • R$ {pkg.pricePerPdf.toFixed(2).replace('.', ',')} cada
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {pkg.pdfs} PDF{pkg.pdfs > 1 ? 's' : ''} • R$ {pkg.pricePerPdf.toFixed(2).replace('.', ',')} cada
                    </div>
                    {pkg.savings && (
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Economize {pkg.savings}%
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                    : selectedPackage === pkg.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePackageSelect(pkg.id);
                }}
              >
                {selectedPackage === pkg.id ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Selecionado
                  </>
                ) : (
                  <>
                    Selecionar Pacote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Informações adicionais */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            ✨ Garantia de Qualidade
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">🤖 IA de Última Geração</strong><br />
              Conteúdo gerado com GPT-4o-mini para máxima qualidade
            </div>
            <div>
              <strong className="text-gray-900">📄 PDFs Profissionais</strong><br />
              Layout otimizado e formatação perfeita para qualquer dispositivo
            </div>
            <div>
              <strong className="text-gray-900">⚡ Entrega Instantânea</strong><br />
              Seus créditos ficam disponíveis imediatamente após o pagamento
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}