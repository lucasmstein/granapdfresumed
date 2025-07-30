export interface NicheTemplate {
  id: string;
  name: string;
  gradient: string;
  headerClass: string;
  icon: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const nicheTemplates: Record<string, NicheTemplate> = {
  "fitness-saude": {
    id: "fitness-saude",
    name: "Fitness e Saúde",
    gradient: "gradient-fitness",
    headerClass: "fitness",
    icon: "💪",
    colorScheme: {
      primary: "#ff6b6b",
      secondary: "#ffa726",
      accent: "#ff7043"
    }
  },
  "culinaria-gastronomia": {
    id: "culinaria-gastronomia",
    name: "Culinária e Gastronomia",
    gradient: "gradient-fashion",
    headerClass: "fashion",
    icon: "👨‍🍳",
    colorScheme: {
      primary: "#ec4899",
      secondary: "#f43f5e",
      accent: "#e11d48"
    }
  },
  "negocios-empreendedorismo": {
    id: "negocios-empreendedorismo",
    name: "Negócios e Empreendedorismo",
    gradient: "gradient-business",
    headerClass: "business",
    icon: "💼",
    colorScheme: {
      primary: "#667eea",
      secondary: "#764ba2",
      accent: "#5a67d8"
    }
  },
  "tecnologia": {
    id: "tecnologia",
    name: "Tecnologia",
    gradient: "gradient-tech",
    headerClass: "tech",
    icon: "🚀",
    colorScheme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      accent: "#8b5cf6"
    }
  },
  "marketing-digital": {
    id: "marketing-digital",
    name: "Marketing Digital",
    gradient: "gradient-marketing",
    headerClass: "marketing",
    icon: "📈",
    colorScheme: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#047857"
    }
  },
  "educacao": {
    id: "educacao",
    name: "Educação",
    gradient: "gradient-education",
    headerClass: "education",
    icon: "🎓",
    colorScheme: {
      primary: "#8b5cf6",
      secondary: "#6366f1",
      accent: "#4f46e5"
    }
  },
  "moda-beleza": {
    id: "moda-beleza",
    name: "Moda e Beleza",
    gradient: "gradient-fashion",
    headerClass: "fashion",
    icon: "👗",
    colorScheme: {
      primary: "#ec4899",
      secondary: "#f43f5e",
      accent: "#e11d48"
    }
  },
  "viagens": {
    id: "viagens",
    name: "Viagens",
    gradient: "gradient-travel",
    headerClass: "travel",
    icon: "✈️",
    colorScheme: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#0e7490"
    }
  },
  "financas-pessoais": {
    id: "financas-pessoais",
    name: "Finanças Pessoais",
    gradient: "gradient-finance",
    headerClass: "finance",
    icon: "💰",
    colorScheme: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#065f46"
    }
  },
  "produtividade": {
    id: "produtividade",
    name: "Produtividade",
    gradient: "gradient-productivity",
    headerClass: "productivity",
    icon: "⚡",
    colorScheme: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#b45309"
    }
  }
};

export function getNicheTemplate(nicheId: string): NicheTemplate | null {
  return nicheTemplates[nicheId] || null;
}

export function generateGammaContent(content: string, nicheId: string): string {
  const template = getNicheTemplate(nicheId);
  if (!template) return content;

  // Converter markdown para HTML com elementos Gamma
  let htmlContent = content
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-h1 space-lg">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-h2 space-md">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-h3 space-sm">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-h4 space-sm">$1</h4>')
    
    // Parágrafos
    .replace(/^(?!<[h|d|u|o])(.+)$/gim, '<p class="text-body space-sm">$1</p>')
    
    // Listas
    .replace(/^\* (.*$)/gim, '<li class="text-body">$1</li>')
    .replace(/^- (.*$)/gim, '<li class="text-body">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="text-body">$1</li>')
    
    // Callouts especiais
    .replace(/^💡 (.*$)/gim, '<div class="callout success"><p class="text-body"><strong>💡 Dica:</strong> $1</p></div>')
    .replace(/^⚠️ (.*$)/gim, '<div class="callout warning"><p class="text-body"><strong>⚠️ Atenção:</strong> $1</p></div>')
    .replace(/^❌ (.*$)/gim, '<div class="callout error"><p class="text-body"><strong>❌ Erro Comum:</strong> $1</p></div>')
    .replace(/^✅ (.*$)/gim, '<div class="callout success"><p class="text-body"><strong>✅ Sucesso:</strong> $1</p></div>')
    
    // Cards de destaque
    .replace(/^📌 (.*$)/gim, '<div class="card card-highlight"><p class="text-body"><strong>📌 Ponto Chave:</strong> $1</p></div>')
    .replace(/^🎯 (.*$)/gim, '<div class="card card-highlight"><p class="text-body"><strong>🎯 Objetivo:</strong> $1</p></div>')
    .replace(/^💪 (.*$)/gim, '<div class="card card-highlight"><p class="text-body"><strong>💪 Ação:</strong> $1</p></div>');

  // Adicionar seções com cards
  htmlContent = htmlContent.replace(
    /<h2 class="text-h2 space-md">(.*?)<\/h2>/g,
    '<div class="section"><h2 class="text-h2 space-md">$1</h2>'
  );

  // Adicionar grid para listas
  htmlContent = htmlContent.replace(
    /(<li class="text-body">.*?<\/li>)+/g,
    '<ul class="space-md">$&</ul>'
  );

  return htmlContent;
}

export function generateGammaHTML(
  title: string,
  content: string,
  nicheId: string,
  subtitle?: string
): string {
  const template = getNicheTemplate(nicheId);
  const nicheName = template?.name || "Geral";
  const headerClass = template?.headerClass || "business";
  
  const processedContent = generateGammaContent(content, nicheId);
  const generatedAt = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            /* Reset e Base */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: #ffffff;
                font-size: 16px;
            }

            /* Typography System */
            .text-display {
                font-family: 'Poppins', sans-serif;
                font-size: 3.5rem;
                font-weight: 700;
                line-height: 1.1;
                letter-spacing: -0.02em;
            }

            .text-h1 {
                font-family: 'Poppins', sans-serif;
                font-size: 2.5rem;
                font-weight: 700;
                line-height: 1.2;
                letter-spacing: -0.01em;
            }

            .text-h2 {
                font-family: 'Poppins', sans-serif;
                font-size: 2rem;
                font-weight: 600;
                line-height: 1.3;
            }

            .text-h3 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.5rem;
                font-weight: 600;
                line-height: 1.4;
            }

            .text-h4 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.25rem;
                font-weight: 500;
                line-height: 1.4;
            }

            .text-body {
                font-size: 1rem;
                line-height: 1.6;
                color: #4a5568;
            }

            .text-caption {
                font-size: 0.875rem;
                line-height: 1.5;
                color: #718096;
            }

            /* Layout System */
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .page {
                min-height: 100vh;
                padding: 3rem 0;
            }

            .section {
                margin: 4rem 0;
            }

            .section-sm {
                margin: 2rem 0;
            }

            /* Gradient System */
            .gradient-fitness {
                background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 50%, #ff7043 100%);
            }

            .gradient-business {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
            }

            .gradient-health {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%);
            }

            .gradient-tech {
                background: linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%);
            }

            .gradient-marketing {
                background: linear-gradient(135deg, #10b981 0%, #059669 50%, #10b981 100%);
            }

            .gradient-education {
                background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #8b5cf6 100%);
            }

            .gradient-fashion {
                background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%);
            }

            .gradient-travel {
                background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #06b6d4 100%);
            }

            .gradient-finance {
                background: linear-gradient(135deg, #059669 0%, #047857 50%, #059669 100%);
            }

            .gradient-productivity {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%);
            }

            /* Component System */
            .header {
                text-align: center;
                padding: 4rem 0;
                position: relative;
                overflow: hidden;
            }

            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.1;
                z-index: -1;
            }

            .header.fitness::before { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
            .header.business::before { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .header.health::before { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
            .header.tech::before { background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); }
            .header.marketing::before { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
            .header.education::before { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); }
            .header.fashion::before { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); }
            .header.travel::before { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }
            .header.finance::before { background: linear-gradient(135deg, #059669 0%, #047857 100%); }
            .header.productivity::before { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }

            .card {
                background: #ffffff;
                border-radius: 16px;
                padding: 2rem;
                margin: 1.5rem 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                border: 1px solid #f1f5f9;
            }

            .card-highlight {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border: 2px solid #e2e8f0;
            }

            .callout {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border-left: 4px solid #0ea5e9;
                padding: 1.5rem;
                margin: 2rem 0;
                border-radius: 8px;
            }

            .callout.success {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border-left-color: #10b981;
            }

            .callout.warning {
                background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
                border-left-color: #f59e0b;
            }

            .callout.error {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                border-left-color: #ef4444;
            }

            /* Grid System */
            .grid {
                display: grid;
                gap: 2rem;
            }

            .grid-2 {
                grid-template-columns: repeat(2, 1fr);
            }

            .grid-3 {
                grid-template-columns: repeat(3, 1fr);
            }

            /* Spacing System */
            .space-xs { margin: 0.5rem 0; }
            .space-sm { margin: 1rem 0; }
            .space-md { margin: 1.5rem 0; }
            .space-lg { margin: 2rem 0; }
            .space-xl { margin: 3rem 0; }

            /* Utilities */
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }

            .text-white { color: #ffffff; }
            .text-gray-600 { color: #4a5568; }
            .text-gray-500 { color: #718096; }

            .bg-white { background-color: #ffffff; }
            .bg-gray-50 { background-color: #f9fafb; }

            .rounded-lg { border-radius: 8px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-2xl { border-radius: 16px; }

            .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
            .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }

            /* Page Break */
            .page-break {
                page-break-before: always;
            }

            /* Print Optimizations */
            @media print {
                body {
                    font-size: 12px;
                }
                
                .text-display { font-size: 2.5rem; }
                .text-h1 { font-size: 2rem; }
                .text-h2 { font-size: 1.5rem; }
                .text-h3 { font-size: 1.25rem; }
                
                .page {
                    padding: 1rem 0;
                }
                
                .section {
                    margin: 2rem 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header ${headerClass}">
                <h1 class="text-display text-white">${title}</h1>
                <p class="text-body text-white" style="margin-top: 1rem; opacity: 0.9;">
                    ${subtitle || `Guia completo sobre ${nicheName}`}
                </p>
            </div>

            <!-- Content -->
            <div class="content">
                ${processedContent}
            </div>

            <!-- Footer -->
            <div class="section text-center">
                <div class="card">
                    <p class="text-caption">
                        Gerado por Grana PDF - Conteúdo personalizado por IA<br>
                        ${generatedAt}
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
} 