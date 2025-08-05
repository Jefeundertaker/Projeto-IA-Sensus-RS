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

    const { packageId, paymentMethod } = await request.json()

    if (!packageId || !paymentMethod) {
      return NextResponse.json(
        { message: 'Pacote e método de pagamento são obrigatórios' },
        { status: 400 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Get package
    const packageData = await db.messagePackage.findUnique({
      where: { id: packageId }
    })

    if (!packageData) {
      return NextResponse.json(
        { message: 'Pacote não encontrado' },
        { status: 404 }
      )
    }

    // Create purchase
    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        packageId: packageData.id,
        status: 'COMPLETED',
        paymentMethod,
        messagesRemaining: packageData.messageCount
      }
    })

    return NextResponse.json({
      message: 'Compra realizada com sucesso',
      purchase: {
        id: purchase.id,
        packageId: purchase.packageId,
        status: purchase.status,
        messagesRemaining: purchase.messagesRemaining,
        createdAt: purchase.createdAt
      }
    })

  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json(
      { message: 'Erro ao realizar compra' },
      { status: 500 }
    )
  }
}