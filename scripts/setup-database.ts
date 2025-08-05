import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...')

    // Create admin user
    const adminPassword = await bcrypt.hash('password123', 10)
    const admin = await db.user.upsert({
      where: { email: 'admin@sensustec.com.br' },
      update: {},
      create: {
        name: 'Administrador Sensus',
        email: 'admin@sensustec.com.br',
        password: adminPassword,
        role: 'ADMIN'
      }
    })

    // Create client user
    const clientPassword = await bcrypt.hash('password123', 10)
    const client = await db.user.upsert({
      where: { email: 'cliente@sensustec.com.br' },
      update: {},
      create: {
        name: 'Cliente Sensus',
        email: 'cliente@sensustec.com.br',
        password: clientPassword,
        role: 'CLIENT'
      }
    })

    // Create message packages
    const packages = await Promise.all([
      db.messagePackage.upsert({
        where: { name: 'Pacote Básico' },
        update: {},
        create: {
          name: 'Pacote Básico',
          description: 'Ideal para testar o sistema',
          messageCount: 500,
          price: 49.90,
          isActive: true
        }
      }),
      db.messagePackage.upsert({
        where: { name: 'Pacote Intermediário' },
        update: {},
        create: {
          name: 'Pacote Intermediário',
          description: 'Perfeito para uso moderado',
          messageCount: 1000,
          price: 90.00,
          isActive: true
        }
      }),
      db.messagePackage.upsert({
        where: { name: 'Pacote Premium' },
        update: {},
        create: {
          name: 'Pacote Premium',
          description: 'Para uso intensivo e negócios',
          messageCount: 2000,
          price: 160.00,
          isActive: true
        }
      })
    ])

    // Create sample purchase for client
    const purchase = await db.purchase.create({
      data: {
        userId: client.id,
        packageId: packages[0].id,
        status: 'COMPLETED',
        paymentMethod: 'pix',
        messagesRemaining: 500
      }
    })

    console.log('✅ Database setup completed successfully!')
    console.log('👤 Admin user:', { email: admin.email, password: 'password123' })
    console.log('👤 Client user:', { email: client.email, password: 'password123' })
    console.log('📦 Packages created:', packages.length)
    console.log('💳 Sample purchase created for client')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

setupDatabase()