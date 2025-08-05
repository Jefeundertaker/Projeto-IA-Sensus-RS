import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`
    
    return NextResponse.json({
      status: 'healthy',
      message: 'System is running smoothly',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'unhealthy',
      message: 'System is experiencing issues',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    }, { status: 500 })
  }
}