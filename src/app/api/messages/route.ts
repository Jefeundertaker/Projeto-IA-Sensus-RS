import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    let decodedToken: any
    
    try {
      decodedToken = jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const { content, messageType = 'text' } = await request.json()

    if (!content) {
      return NextResponse.json(
        { message: 'Conteúdo da mensagem é obrigatório' },
        { status: 400 }
      )
    }

    // Get user with active purchases
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId },
      include: {
        purchases: {
          where: {
            status: 'COMPLETED',
            messagesRemaining: {
              gt: 0
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Check if user has available messages
    const availableMessages = user.purchases.reduce((sum, purchase) => sum + purchase.messagesRemaining, 0)
    if (availableMessages <= 0) {
      return NextResponse.json(
        { message: 'Você não tem mensagens disponíveis. Compre um pacote para continuar.' },
        { status: 403 }
      )
    }

    // Find the first purchase with available messages
    const purchaseWithMessages = user.purchases.find(p => p.messagesRemaining > 0)
    if (!purchaseWithMessages) {
      return NextResponse.json(
        { message: 'Nenhuma compra com mensagens disponíveis' },
        { status: 403 }
      )
    }

    // Record message usage
    await db.messageUsage.create({
      data: {
        userId: user.id,
        purchaseId: purchaseWithMessages.id,
        messageType,
        content
      }
    })

    // Decrement message count
    await db.purchase.update({
      where: { id: purchaseWithMessages.id },
      data: {
        messagesRemaining: {
          decrement: 1
        }
      }
    })

    return NextResponse.json({
      message: 'Mensagem registrada com sucesso',
      remainingMessages: availableMessages - 1
    })

  } catch (error) {
    console.error('Error recording message:', error)
    return NextResponse.json(
      { message: 'Erro ao registrar mensagem' },
      { status: 500 }
    )
  }
}