"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Download, 
  Zap, 
  Users, 
  CheckCircle, 
  Menu, 
  X,
  Crown,
  Sparkles,
  Star,
  ArrowRight,
  Clock,
  Shield,
  Globe
} from "lucide-react";
import NicheSelector from "@/components/NicheSelector";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleStartNow = () => {
    scrollToSection('nichos');
  };

  const handleViewNiches = () => {
    scrollToSection('nichos');
  };

  const handleChooseNiche = () => {
    scrollToSection('nichos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Grana PDF</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('nichos')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Nichos
              </button>
              <button 
                onClick={() => scrollToSection('precos')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Planos
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('como-funciona')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
                >
                  Como Funciona
                </button>
                <button 
                  onClick={() => scrollToSection('nichos')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
                >
                  Nichos
                </button>
                <button 
                  onClick={() => scrollToSection('precos')}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
                >
                  Planos
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Revolucionando a criação de ebooks
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Ebooks Personalizados por{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IA Avançada
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Transforme sua expertise em ebooks profissionais em minutos. 
            <span className="font-semibold text-gray-800"> Escolha seu nicho</span> e receba conteúdo 
            especializado em PDF com qualidade premium.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={handleStartNow}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-5 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Começar Agora - Grátis
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleViewNiches}
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-5 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Globe className="mr-3 h-6 w-6" />
              Ver Nichos Disponíveis
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Nichos Especializados</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">2min</div>
              <div className="text-gray-600">Tempo de Geração</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Conteúdo Original</div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Processo Simplificado
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Em apenas 3 passos simples, você terá seu ebook profissional pronto
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Escolha seu Nicho</h3>
              <p className="text-gray-600 text-lg">
                Selecione entre 10 nichos especializados e personalizados para seu público
              </p>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IA Gera Conteúdo</h3>
              <p className="text-gray-600 text-lg">
                Nossa IA avançada cria conteúdo personalizado em menos de 2 minutos
              </p>
            </div>
            
            <div className="group text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Download do PDF</h3>
              <p className="text-gray-600 text-lg">
                Receba seu ebook em PDF profissional pronto para uso imediato
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Vantagens Exclusivas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o Grana PDF?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia de ponta combinada com simplicidade para resultados extraordinários
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Geração Rápida</h3>
              <p className="text-gray-600 text-lg">
                Ebooks prontos em menos de 2 minutos com conteúdo especializado e de alta qualidade
              </p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">PDF Profissional</h3>
              <p className="text-gray-600 text-lg">
                Layout premium com formatação perfeita para qualquer dispositivo e impressão
              </p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">10 Nichos Especializados</h3>
              <p className="text-gray-600 text-lg">
                Conteúdo relevante e atualizado para diferentes áreas de atuação e públicos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seleção de Nicho */}
      <section id="nichos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
              <Globe className="w-4 h-4 mr-2" />
              Nichos Disponíveis
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Escolha seu Nicho
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecione o nicho que melhor se adequa ao seu público e objetivo de negócio
            </p>
          </div>
          
          <NicheSelector />
        </div>
      </section>

      {/* Planos Melhorados */}
      <section id="precos" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
              <Crown className="w-4 h-4 mr-2" />
              Planos Flexíveis
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Escolha seu Plano Ideal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planos transparentes sem surpresas. Escolha o que melhor se adapta às suas necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plano TESTE */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 p-8 relative">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🥉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">TESTE</h3>
                <p className="text-gray-600">Ideal para testar nosso serviço</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">R$ 9,97</div>
                <div className="text-gray-500">1 PDF • R$ 9,97 cada</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">1 PDF personalizado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Conteúdo especializado por IA</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Download imediato</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Suporte por email</span>
                </li>
              </ul>
              
              <button 
                onClick={handleChooseNiche}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Escolher Plano
              </button>
            </div>

            {/* Plano STARTER */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  ECONOMIA 17%
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🥈</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">STARTER</h3>
                <p className="text-gray-600">Perfeito para começar seu projeto</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">R$ 24,90</div>
                <div className="text-gray-500">3 PDFs • R$ 8,30 cada</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">3 PDFs personalizados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Economia de 17%</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Conteúdo especializado por IA</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Suporte prioritário</span>
                </li>
              </ul>
              
              <button 
                onClick={handleChooseNiche}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Escolher Plano
              </button>
            </div>

            {/* Plano POPULAR */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  MAIS ESCOLHIDO
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🥇</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">POPULAR</h3>
                <p className="text-gray-600">A escolha favorita dos nossos clientes</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">R$ 69,90</div>
                <div className="text-gray-500">10 PDFs • R$ 6,99 cada</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">10 PDFs personalizados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Economia de 30%</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Conteúdo premium por IA</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Suporte VIP</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Templates exclusivos</span>
                </li>
              </ul>
              
              <button 
                onClick={handleChooseNiche}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg"
              >
                Escolher Plano
              </button>
            </div>

            {/* Plano PREMIUM */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  ECONOMIA 40%
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">PREMIUM</h3>
                <p className="text-gray-600">Máximo valor para profissionais</p>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">R$ 149,90</div>
                <div className="text-gray-500">25 PDFs • R$ 5,99 cada</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">25 PDFs personalizados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Economia de 40%</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Conteúdo premium por IA</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Suporte dedicado</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Consultoria gratuita</span>
                </li>
              </ul>
              
              <button 
                onClick={handleChooseNiche}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Escolher Plano
              </button>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ✨ Garantia de Qualidade
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <strong className="text-gray-900 block">🤖 IA de Última Geração</strong>
                    Conteúdo gerado com GPT-4o-mini para máxima qualidade
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <strong className="text-gray-900 block">📄 PDFs Profissionais</strong>
                    Layout otimizado e formatação perfeita para qualquer dispositivo
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <strong className="text-gray-900 block">⚡ Entrega Instantânea</strong>
                    Seus créditos ficam disponíveis imediatamente após o pagamento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="ml-3 text-xl font-bold">Grana PDF</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Ebooks personalizados por inteligência artificial para seu nicho específico. 
                Transforme sua expertise em conteúdo profissional.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors text-left">Como Funciona</button></li>
                <li><button onClick={() => scrollToSection('nichos')} className="hover:text-white transition-colors text-left">Nichos</button></li>
                <li><button onClick={() => scrollToSection('precos')} className="hover:text-white transition-colors text-left">Planos</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Grana PDF. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
