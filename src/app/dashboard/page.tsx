'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Package, TrendingUp, Users, CreditCard, LogOut, Settings, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Purchase {
  id: string
  packageId: string
  status: string
  messagesRemaining: number
  createdAt: string
  package: {
    name: string
    messageCount: number
    price: number
  }
}

interface UsageStats {
  totalMessages: number
  remainingMessages: number
  totalPurchases: number
  lastPurchase: string | null
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [stats, setStats] = useState<UsageStats>({
    totalMessages: 0,
    remainingMessages: 0,
    totalPurchases: 0,
    lastPurchase: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (!userData || !token) {
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    fetchDashboardData(token)
  }, [])

  const fetchDashboardData = async (token: string) => {
    try {
      // Fetch purchases
      const purchasesResponse = await fetch('/api/client/usage', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (purchasesResponse.ok) {
        const purchasesData = await purchasesResponse.json()
        setPurchases(purchasesData.purchases || [])
        
        // Calculate stats
        const totalMessages = purchasesData.purchases?.reduce((sum: number, p: Purchase) => sum + p.package.messageCount, 0) || 0
        const remainingMessages = purchasesData.purchases?.reduce((sum: number, p: Purchase) => sum + p.messagesRemaining, 0) || 0
        const totalPurchases = purchasesData.purchases?.length || 0
        const lastPurchase = purchasesData.purchases?.[0]?.createdAt || null

        setStats({
          totalMessages,
          remainingMessages,
          totalPurchases,
          lastPurchase
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Sensus RS</h1>
              <span className="ml-4 text-sm text-gray-500">Painel do Cliente</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  ChatBot
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Aqui você pode gerenciar seus pacotes de mensagens e acompanhar seu uso.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground">
                Mensagens compradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Restantes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.remainingMessages}</div>
              <p className="text-xs text-muted-foreground">
                Disponíveis para uso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacotes Comprados</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPurchases}</div>
              <p className="text-xs text-muted-foreground">
                Total de compras
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Compra</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.lastPurchase ? new Date(stats.lastPurchase).toLocaleDateString('pt-BR') : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Data da última compra
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="purchases" className="space-y-4">
          <TabsList>
            <TabsTrigger value="purchases">Meus Pacotes</TabsTrigger>
            <TabsTrigger value="usage">Uso de Mensagens</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meus Pacotes de Mensagens</CardTitle>
                <CardDescription>
                  Gerencie seus pacotes de mensagens comprados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.length > 0 ? (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Package className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{purchase.package.name}</h3>
                            <p className="text-sm text-gray-600">
                              {purchase.package.messageCount} mensagens • R$ {purchase.package.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={purchase.status === 'COMPLETED' ? 'default' : 'secondary'}>
                            {purchase.status === 'COMPLETED' ? 'Ativo' : purchase.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {purchase.messagesRemaining} restantes
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Você não tem nenhum pacote de mensagens</p>
                    <Link href="/">
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Comprar Pacotes
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Uso de Mensagens</CardTitle>
                <CardDescription>
                  Acompanhe seu consumo de mensagens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Total Comprado</h3>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalMessages}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Disponível</h3>
                      <p className="text-2xl font-bold text-green-600">{stats.remainingMessages}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Consumo</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${((stats.totalMessages - stats.remainingMessages) / stats.totalMessages) * 100 || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {stats.totalMessages - stats.remainingMessages} de {stats.totalMessages} mensagens usadas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>
                  Informações da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tipo de Conta</Label>
                      <p className="text-gray-900">{user?.role === 'CLIENT' ? 'Cliente' : 'Administrador'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Membro desde</Label>
                      <p className="text-gray-900">{new Date(user?.createdAt || '').toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Link href="/">
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Voltar para o ChatBot
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}