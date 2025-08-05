'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Package, User, Settings, LogOut, CreditCard } from 'lucide-react'
import Link from 'next/link'

interface MessagePackage {
  id: string
  name: string
  description: string
  messageCount: number
  price: number
  isActive: boolean
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'ADMIN' | 'CLIENT' | null>(null)
  const [packages, setPackages] = useState<MessagePackage[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token && role) {
      setIsLoggedIn(true)
      setUserRole(role as 'ADMIN' | 'CLIENT')
    }

    // Fetch packages
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/client/packages')
      if (response.ok) {
        const data = await response.json()
        setPackages(data.packages || [])
      }
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  const handlePurchase = async () => {
    if (!selectedPackage) {
      alert('Selecione um pacote')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/client/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          packageId: selectedPackage,
          paymentMethod
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert('Compra realizada com sucesso!')
        // Refresh packages or redirect
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao realizar compra')
      }
    } catch (error) {
      console.error('Error purchasing package:', error)
      alert('Erro ao realizar compra')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserRole(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Sensus RS</h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link href={userRole === 'ADMIN' ? '/admin' : '/dashboard'}>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Painel
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">
                      Cadastrar
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ChatBot Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  ChatBot Sensus RS
                </CardTitle>
                <CardDescription>
                  Converse com nosso assistente de IA inteligente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Nosso ChatBot está integrado com a tecnologia GPTMaker.ai para fornecer 
                      respostas inteligentes e personalizadas para suas necessidades.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <iframe
                      src="https://gptmaker.ai/iframe/bot/6732c8e7c5e1b5000b1c4b6d/6732c8e7c5e1b5000b1c4b6e"
                      width="100%"
                      height="500"
                      frameBorder="0"
                      allow="microphone; camera"
                      className="w-full"
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Packages Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-600" />
                  Pacotes de Mensagens
                </CardTitle>
                <CardDescription>
                  Escolha o pacote ideal para suas necessidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="packages" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="packages">Pacotes</TabsTrigger>
                    <TabsTrigger value="purchase">Comprar</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="packages" className="space-y-4">
                    <div className="grid gap-4">
                      {packages.map((pkg) => (
                        <Card key={pkg.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                                <CardDescription>{pkg.description}</CardDescription>
                              </div>
                              <Badge variant="secondary">
                                {pkg.messageCount} mensagens
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="text-2xl font-bold text-green-600">
                                R$ {pkg.price.toFixed(2)}
                              </div>
                              <Button 
                                onClick={() => setSelectedPackage(pkg.id)}
                                variant={selectedPackage === pkg.id ? "default" : "outline"}
                              >
                                Selecionar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="purchase" className="space-y-4">
                    {selectedPackage ? (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-900">Pacote Selecionado</h3>
                          <p className="text-blue-700">
                            {packages.find(p => p.id === selectedPackage)?.name} - 
                            R$ {packages.find(p => p.id === selectedPackage)?.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="payment">Forma de Pagamento</Label>
                          <select 
                            id="payment"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="pix">PIX</option>
                            <option value="credit_card">Cartão de Crédito</option>
                            <option value="bank_transfer">Transferência Bancária</option>
                          </select>
                        </div>
                        
                        <Button 
                          onClick={handlePurchase} 
                          disabled={loading || !isLoggedIn}
                          className="w-full"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          {loading ? 'Processando...' : 'Finalizar Compra'}
                        </Button>
                        
                        {!isLoggedIn && (
                          <p className="text-sm text-red-600 text-center">
                            Você precisa estar logado para comprar pacotes
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Selecione um pacote na aba "Pacotes"</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}