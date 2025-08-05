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

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Acesso negado' },
        { status: 403 }
      )
    }

    // Get all packages with their purchases
    const packages = await db.messagePackage.findMany({
      include: {
        purchases: {
          select: {
            id: true,
            status: true,
            createdAt: true
          }
        }
      },
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

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Acesso negado' },
        { status: 403 }
      )
    }

    const { name, description, messageCount, price } = await request.json()

    if (!name || !description || !messageCount || !price) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Create package
    const packageData = await db.messagePackage.create({
      data: {
        name,
        description,
        messageCount,
        price,
        isActive: true
      }
    })

    return NextResponse.json({
      message: 'Pacote criado com sucesso',
      package: packageData
    })

  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { message: 'Erro ao criar pacote' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: decodedToken.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Acesso negado' },
        { status: 403 }
      )
    }

    const { packageId, isActive } = await request.json()

    if (!packageId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'packageId e isActive são obrigatórios' },
        { status: 400 }
      )
    }

    // Update package
    const packageData = await db.messagePackage.update({
      where: { id: packageId },
      data: { isActive }
    })

    return NextResponse.json({
      message: 'Pacote atualizado com sucesso',
      package: packageData
    })

  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar pacote' },
      { status: 500 }
    )
  }
}