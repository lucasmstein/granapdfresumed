import { NextRequest, NextResponse } from 'next/server';
import { creditsDB } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const userCredits = creditsDB.getCredits(email);
    
    if (!userCredits || userCredits.credits_remaining <= 0) {
      return NextResponse.json({
        success: false,
        hasCredits: false,
        credits: 0,
        message: 'Você não possui créditos suficientes. Compre um pacote para continuar.'
      });
    }

    return NextResponse.json({
      success: true,
      hasCredits: true,
      credits: userCredits.credits_remaining,
      message: `Você possui ${userCredits.credits_remaining} crédito${userCredits.credits_remaining > 1 ? 's' : ''} disponível${userCredits.credits_remaining > 1 ? 'eis' : ''}.`
    });

  } catch (error) {
    console.error('Erro ao validar créditos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const userCredits = creditsDB.getCredits(email);
    const purchaseHistory = creditsDB.getPurchaseHistory(email);
    const generationHistory = creditsDB.getGenerationHistory(email);

    return NextResponse.json({
      success: true,
      credits: userCredits ? userCredits.credits_remaining : 0,
      totalPurchased: userCredits ? userCredits.total_purchased : 0,
      purchaseHistory,
      generationHistory
    });

  } catch (error) {
    console.error('Erro ao buscar dados dos créditos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}