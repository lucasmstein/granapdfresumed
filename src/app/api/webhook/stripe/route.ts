import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { creditsDB } from '@/lib/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('Stripe-Signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const email = session.metadata?.email || session.customer_email;
        const packageId = session.metadata?.package_id;
        const credits = parseInt(session.metadata?.credits || '0');
        const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

        if (email && packageId && credits > 0) {
          try {
            // Adicionar créditos ao usuário
            creditsDB.addCredits(
              email,
              credits,
              packageId,
              amountPaid,
              session.payment_intent as string
            );

            console.log(`Créditos adicionados: ${credits} para ${email}`);
          } catch (dbError) {
            console.error('Erro ao adicionar créditos:', dbError);
            // Em caso de erro no banco, você pode implementar uma retry logic aqui
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed: ${paymentIntent.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}