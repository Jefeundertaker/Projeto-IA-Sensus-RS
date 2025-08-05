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
    
    try {
      jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    // Get all active packages
    const packages = await db.messagePackage.findMany({
      where: { isActive: true },
      orderBy: { messageCount: 'asc' }
    })

    return NextResponse.json({
      message: 'Pacotes encontrados com sucesso',
      packages
    })

  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar pacotes' },
      { status: 500 }
    )
  }
}