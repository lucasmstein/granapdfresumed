import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// Configuração dos produtos/preços
const PACKAGE_CONFIGS = {
  teste: {
    name: '🥉 TESTE - 1 PDF',
    credits: 1,
    price: 997, // em centavos
    price_id: 'price_1RqfWvBx8wluQBPkKtzYXF3q', // TESTE - 1 PDF
    description: 'Pacote teste com 1 PDF personalizado'
  },
  starter: {
    name: '🥈 STARTER - 3 PDFs',
    credits: 3,
    price: 2490, // em centavos
    price_id: 'price_1RqfXQBx8wluQBPkFLI9chJO', // 🥈 STARTER - 3 PDFs
    description: 'Pacote starter com 3 PDFs personalizados (Economize 17%)'
  },
  popular: {
    name: '🥇 POPULAR - 10 PDFs',
    credits: 10,
    price: 6990, // em centavos
    price_id: 'price_1RqfXlBx8wluQBPk9E164MZm', // POPULAR
    description: 'Pacote popular com 10 PDFs personalizados (Economize 30%)'
  },
  premium: {
    name: '💎 PREMIUM - 25 PDFs',
    credits: 25,
    price: 14990, // em centavos
    price_id: 'price_1RqfYCBx8wluQBPk4zv8M77a', // PREMIUM
    description: 'Pacote premium com 25 PDFs personalizados (Economize 40%)'
  },
  personalizado: {
    name: '⚡ PERSONALIZADO',
    credits: 0, // será calculado dinamicamente
    price: 0, // será calculado dinamicamente
    price_id: '', // Não tem price_id fixo
    description: 'Pacote personalizado com quantidade escolhida (R$ 5,99 por PDF)'
  }
};

export async function POST(request: NextRequest) {
  try {
    const { packageId, email, customQuantity } = await request.json();

    if (!packageId || !email) {
      return NextResponse.json(
        { error: 'Pacote e email são obrigatórios' },
        { status: 400 }
      );
    }

    const packageConfig = PACKAGE_CONFIGS[packageId as keyof typeof PACKAGE_CONFIGS];
    if (!packageConfig) {
      return NextResponse.json(
        { error: 'Pacote inválido' },
        { status: 400 }
      );
    }

    let finalPrice = packageConfig.price;
    let finalCredits = packageConfig.credits;
    let finalName = packageConfig.name;
    let finalDescription = packageConfig.description;

    // Para pacote personalizado, calcular preço e créditos
    if (packageId === 'personalizado') {
      if (!customQuantity || customQuantity < 25) {
        return NextResponse.json(
          { error: 'Quantidade mínima para pacote personalizado é 25' },
          { status: 400 }
        );
      }
      finalCredits = customQuantity;
      finalPrice = Math.round(customQuantity * 5.99 * 100); // em centavos
      finalName = `⚡ PERSONALIZADO - ${customQuantity} PDFs`;
      finalDescription = `Pacote personalizado com ${customQuantity} PDFs (R$ 5,99 cada)`;
    }

    // Criar sessão de checkout do Stripe
    let session;
    if (packageId === 'personalizado') {
      if (!customQuantity || customQuantity < 25) {
        return NextResponse.json(
          { error: 'Quantidade mínima para pacote personalizado é 25' },
          { status: 400 }
        );
      }
      finalCredits = customQuantity;
      finalPrice = Math.round(customQuantity * 5.99 * 100); // em centavos
      finalName = `⚡ PERSONALIZADO - ${customQuantity} PDFs`;
      finalDescription = `Pacote personalizado com ${customQuantity} PDFs (R$ 5,99 cada)`;
      // Cria price_data dinâmico
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: finalName,
                description: finalDescription,
                images: [],
              },
              unit_amount: finalPrice,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/`,
        customer_email: email,
        metadata: {
          package_id: packageId,
          email: email,
          credits: finalCredits.toString(),
          custom_quantity: customQuantity?.toString() || '',
        },
        payment_intent_data: {
          metadata: {
            package_id: packageId,
            email: email,
            credits: finalCredits.toString(),
          },
        },
        locale: 'pt-BR',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
      });
    } else {
      // Usar price_id do Stripe para os pacotes fixos
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'boleto'],
        line_items: [
          {
            price: packageConfig.price_id, // Usar price_id do Stripe
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/`,
        customer_email: email,
        metadata: {
          package_id: packageId,
          email: email,
          credits: finalCredits.toString(),
        },
        payment_intent_data: {
          metadata: {
            package_id: packageId,
            email: email,
            credits: finalCredits.toString(),
          },
        },
        locale: 'pt-BR',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
      });
    }

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}