import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
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

    // Get user with purchases
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId },
      include: {
        purchases: {
          include: {
            package: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Dados de uso encontrados com sucesso',
      purchases: user.purchases
    })

  } catch (error) {
    console.error('Error fetching usage data:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar dados de uso' },
      { status: 500 }
    )
  }
}