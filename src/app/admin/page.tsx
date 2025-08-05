'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Users, Package, TrendingUp, LogOut, Settings, Plus, Edit, Trash2, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  purchases?: any[]
}

interface MessagePackage {
  id: string
  name: string
  description: string
  messageCount: number
  price: number
  isActive: boolean
  purchases?: any[]
}

interface SystemStats {
  totalUsers: number
  totalPurchases: number
  totalMessages: number
  activePackages: number
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [packages, setPackages] = useState<MessagePackage[]>([])
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalPurchases: 0,
    totalMessages: 0,
    activePackages: 0
  })
  const [loading, setLoading] = useState(true)
  const [showAddPackage, setShowAddPackage] = useState(false)
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    messageCount: 500,
    price: 49.90
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (!userData || !token) {
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'ADMIN') {
      window.location.href = '/dashboard'
      return
    }

    setUser(parsedUser)
    fetchAdminData(token)
  }, [])

  const fetchAdminData = async (token: string) => {
    try {
      // Fetch users
      const usersResponse = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      // Fetch packages
      const packagesResponse = await fetch('/api/admin/packages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData.users || [])
      }

      if (packagesResponse.ok) {
        const packagesData = await packagesResponse.json()
        setPackages(packagesData.packages || [])
        
        // Calculate stats
        const totalUsers = users.length
        const totalPurchases = users.reduce((sum, user) => sum + (user.purchases?.length || 0), 0)
        const totalMessages = packages.reduce((sum, pkg) => sum + (pkg.messageCount * (pkg.purchases?.length || 0)), 0)
        const activePackages = packages.filter(pkg => pkg.isActive).length

        setStats({
          totalUsers,
          totalPurchases,
          totalMessages,
          activePackages
        })
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
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

  const handleAddPackage = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPackage)
      })

      if (response.ok) {
        setShowAddPackage(false)
        setNewPackage({
          name: '',
          description: '',
          messageCount: 500,
          price: 49.90
        })
        fetchAdminData(token)
      }
    } catch (error) {
      console.error('Error adding package:', error)
    }
  }

  const handleTogglePackage = async (packageId: string, isActive: boolean) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch('/api/admin/packages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ packageId, isActive: !isActive })
      })

      if (response.ok) {
        fetchAdminData(token)
      }
    } catch (error) {
      console.error('Error toggling package:', error)
    }
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
              <span className="ml-4 text-sm text-gray-500">Painel Administrativo</span>
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
            Painel administrativo do Sensus RS
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Usuários cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPurchases}</div>
              <p className="text-xs text-muted-foreground">
                Compras realizadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Vendidas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground">
                Total de mensagens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacotes Ativos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePackages}</div>
              <p className="text-xs text-muted-foreground">
                Pacotes disponíveis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="packages">Pacotes</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>
                  Lista de todos os usuários cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                        </Badge>
                        <Badge variant="outline">
                          {user.purchases?.length || 0} compras
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {users.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum usuário cadastrado</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciar Pacotes</CardTitle>
                    <CardDescription>
                      Pacotes de mensagens disponíveis para compra
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddPackage(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Pacote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddPackage && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Novo Pacote</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="packageName">Nome do Pacote</Label>
                        <Input
                          id="packageName"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                          placeholder="Ex: Pacote Básico"
                        />
                      </div>
                      <div>
                        <Label htmlFor="packageDescription">Descrição</Label>
                        <Textarea
                          id="packageDescription"
                          value={newPackage.description}
                          onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                          placeholder="Descrição do pacote..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="messageCount">Quantidade de Mensagens</Label>
                          <Input
                            id="messageCount"
                            type="number"
                            value={newPackage.messageCount}
                            onChange={(e) => setNewPackage({...newPackage, messageCount: parseInt(e.target.value)})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Preço (R$)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={newPackage.price}
                            onChange={(e) => setNewPackage({...newPackage, price: parseFloat(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddPackage}>Adicionar Pacote</Button>
                        <Button variant="outline" onClick={() => setShowAddPackage(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Package className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <p className="text-sm text-gray-600">{pkg.description}</p>
                          <p className="text-xs text-gray-500">
                            {pkg.messageCount} mensagens • R$ {pkg.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={pkg.isActive ? 'default' : 'secondary'}>
                          {pkg.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePackage(pkg.id, pkg.isActive)}
                        >
                          {pkg.isActive ? 'Desativar' : 'Ativar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {packages.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Nenhum pacote cadastrado</p>
                      <Button onClick={() => setShowAddPackage(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Primeiro Pacote
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas do Sistema</CardTitle>
                <CardDescription>
                  Visão geral do desempenho do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Visão Geral</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total de Usuários:</span>
                        <span className="font-semibold">{stats.totalUsers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total de Compras:</span>
                        <span className="font-semibold">{stats.totalPurchases}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mensagens Vendidas:</span>
                        <span className="font-semibold">{stats.totalMessages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pacotes Ativos:</span>
                        <span className="font-semibold">{stats.activePackages}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Distribuição de Usuários</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Administradores:</span>
                        <span className="font-semibold">
                          {users.filter(u => u.role === 'ADMIN').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clientes:</span>
                        <span className="font-semibold">
                          {users.filter(u => u.role === 'CLIENT').length}
                        </span>
                      </div>
                    </div>
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