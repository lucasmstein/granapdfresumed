"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dumbbell, 
  ChefHat, 
  Briefcase, 
  Smartphone, 
  Megaphone, 
  GraduationCap, 
  Scissors, 
  Plane, 
  PiggyBank, 
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import PackageSelector from "./PackageSelector";

interface Niche {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const niches: Niche[] = [
  {
    id: "fitness-saude",
    name: "Fitness e Saúde",
    description: "Conteúdo sobre exercícios, nutrição e bem-estar",
    icon: Dumbbell,
    color: "bg-red-500"
  },
  {
    id: "culinaria-gastronomia",
    name: "Culinária e Gastronomia",
    description: "Receitas, técnicas culinárias e dicas gastronômicas",
    icon: ChefHat,
    color: "bg-orange-500"
  },
  {
    id: "negocios-empreendedorismo",
    name: "Negócios e Empreendedorismo",
    description: "Estratégias de negócio e empreendedorismo",
    icon: Briefcase,
    color: "bg-blue-500"
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    description: "Tendências, inovações e dicas tecnológicas",
    icon: Smartphone,
    color: "bg-purple-500"
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital",
    description: "Estratégias de marketing online e redes sociais",
    icon: Megaphone,
    color: "bg-green-500"
  },
  {
    id: "educacao",
    name: "Educação",
    description: "Métodos de ensino e desenvolvimento pessoal",
    icon: GraduationCap,
    color: "bg-indigo-500"
  },
  {
    id: "moda-beleza",
    name: "Moda e Beleza",
    description: "Tendências de moda e dicas de beleza",
    icon: Scissors,
    color: "bg-pink-500"
  },
  {
    id: "viagens",
    name: "Viagens",
    description: "Destinos, dicas de viagem e turismo",
    icon: Plane,
    color: "bg-cyan-500"
  },
  {
    id: "financas-pessoais",
    name: "Finanças Pessoais",
    description: "Educação financeira e planejamento pessoal",
    icon: PiggyBank,
    color: "bg-emerald-500"
  },
  {
    id: "produtividade",
    name: "Produtividade",
    description: "Técnicas de produtividade e organização",
    icon: Clock,
    color: "bg-yellow-500"
  }
];

export default function NicheSelector() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (selectedNiche) {
      setIsLoading(true);
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mostrar seleção de pacotes
      setShowConfirmation(false);
      setShowPackageSelection(true);
      setIsLoading(false);
    }
  };

  const handlePackageSelect = async (packageId: string, customQuantity?: number) => {
    const selectedNicheData = niches.find(niche => niche.id === selectedNiche);
    if (!selectedNicheData) return;

    // Simular processo de checkout
    setIsLoading(true);
    
    // Aqui você faria a integração real com Stripe
    // Por enquanto, vamos simular um checkout
    console.log('Pacote selecionado:', packageId, 'Quantidade:', customQuantity);
    
    // Redirecionar para checkout ou geração
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push(`/checkout?niche=${selectedNiche}&package=${packageId}${customQuantity ? `&quantity=${customQuantity}` : ''}`);
  };

  const handleChangeSelection = () => {
    setSelectedNiche(null);
    setShowConfirmation(false);
    setShowPackageSelection(false);
  };

  const selectedNicheData = niches.find(niche => niche.id === selectedNiche);

  // Mostrar seleção de pacotes
  if (showPackageSelection && selectedNicheData) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={handleChangeSelection}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à Seleção de Nicho
          </button>
        </div>
        <PackageSelector 
          selectedNiche={selectedNicheData.name}
          onPackageSelect={handlePackageSelect}
        />
      </div>
    );
  }

  if (showConfirmation && selectedNicheData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className={`w-20 h-20 rounded-full ${selectedNicheData.color} flex items-center justify-center mx-auto mb-4`}>
              <selectedNicheData.icon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nicho Selecionado
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              {selectedNicheData.name}
            </p>
            <p className="text-gray-500">
              {selectedNicheData.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirmar e Gerar Ebook
                </>
              )}
            </button>
            <button
              onClick={handleChangeSelection}
              disabled={isLoading}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Alterar Seleção
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {niches.map((niche) => (
        <div
          key={niche.id}
          onClick={() => handleNicheSelect(niche.id)}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer p-6 border-2 border-transparent hover:border-blue-200 group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNicheSelect(niche.id);
            }
          }}
          aria-label={`Selecionar nicho: ${niche.name}`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-lg ${niche.color} flex items-center justify-center flex-shrink-0`}>
              <niche.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {niche.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {niche.description}
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Selecionar
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 