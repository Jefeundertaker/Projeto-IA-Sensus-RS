#!/bin/bash

# =============================================================================
# 🚀 SCRIPT AUTOMÁTICO - PROJETO SENSUS RS
# Autor: Claude AI para Jeferson Consulting
# Email: jefersonconsulting@gmail.com
# =============================================================================

echo "🤖 SENSUS RS - DEPLOY AUTOMÁTICO"
echo "======================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar pré-requisitos
print_info "Verificando pré-requisitos..."

if ! command -v git &> /dev/null; then
    print_error "Git não está instalado. Por favor, instale o Git primeiro."
    exit 1
fi

if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

print_success "Todos os pré-requisitos estão instalados!"

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "Este script deve ser executado no diretório raiz do projeto."
    exit 1
fi

print_success "Diretório do projeto verificado!"

# Limpar repositório Git existente se necessário
print_info "Configurando repositório Git..."

if [ -d ".git" ]; then
    print_warning "Repositório Git já existe. Limpando..."
    rm -rf .git
fi

# Inicializar repositório Git
git init
print_success "Repositório Git inicializado!"

# Configurar usuário Git
print_info "Configurando usuário Git..."
git config user.name "Jeferson Consulting"
git config user.email "jefersonconsulting@gmail.com"
print_success "Usuário Git configurado!"

# Adicionar todos os arquivos
print_info "Adicionando arquivos ao Git..."
git add .
print_success "Arquivos adicionados!"

# Fazer commit inicial
print_info "Fazendo commit inicial..."
git commit -m "feat: Implement Sensus RS ChatBot System complete

- Add authentication system with admin/client roles
- Add chatbot integration with GPTMaker iframe
- Add message packages system (500/1000/2000 messages)
- Add admin dashboard for user and package management
- Add client dashboard with package purchasing and usage tracking
- Add responsive design with Tailwind CSS and shadcn/ui
- Add API routes for all functionality
- Add database schema with Prisma
- Add deployment configuration and documentation

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

if [ $? -eq 0 ]; then
    print_success "Commit realizado com sucesso!"
else
    print_error "Erro ao fazer commit"
    exit 1
fi

# Adicionar repositório remoto
print_info "Configurando repositório remoto..."
git remote add origin https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS.git
print_success "Repositório remoto configurado!"

# Renomear branch para main
git branch -M main
print_success "Branch renomeada para main!"

# Enviar para GitHub
print_info "Enviando código para o GitHub..."
print_warning "Você precisará fazer login no GitHub!"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    print_success "✅ Código enviado com sucesso para o GitHub!"
    echo ""
    echo "🔗 Seu repositório: https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS"
    echo ""
    
    # Instalar dependências
    print_info "Instalando dependências..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependências instaladas com sucesso!"
    else
        print_error "Erro ao instalar dependências"
        exit 1
    fi
    
    # Build do projeto
    print_info "Fazendo build do projeto..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build realizado com sucesso!"
    else
        print_error "Erro ao fazer build"
        exit 1
    fi
    
    echo ""
    echo "🎉 PARABÉNS! Seu projeto está pronto para o deploy!"
    echo ""
    echo "🚀 PRÓXIMOS PASSOS PARA O VERCEL:"
    echo ""
    echo "1. Acesse: https://vercel.com"
    echo "2. Faça login com sua conta GitHub"
    echo "3. Clique em 'New Project'"
    echo "4. Selecione 'Projeto-IA-Sensus-RS' da lista"
    echo "5. Configure as variáveis de ambiente:"
    echo ""
    echo "   DATABASE_URL = file:./dev.db"
    echo "   NEXTAUTH_URL = https://projeto-ia-sensus-rs.vercel.app"
    echo "   NEXTAUTH_SECRET = sua-chave-secreta-aqui"
    echo ""
    echo "6. Clique em 'Deploy'"
    echo ""
    echo "📱 Após o deploy, seu sistema estará acessível em:"
    echo "   https://projeto-ia-sensus-rs.vercel.app"
    echo ""
    echo "🔐 Credenciais de teste:"
    echo "   Admin: admin@sensustec.com.br / password123"
    echo "   Cliente: cliente@sensustec.com.br / password123"
    echo ""
    echo "🧪 Teste estas funcionalidades após o deploy:"
    echo "   ✅ ChatBot com GPTMaker"
    echo "   ✅ Sistema de pacotes de mensagens"
    echo "   ✅ Login e cadastro de usuários"
    echo "   ✅ Painel administrativo"
    echo "   ✅ Painel do cliente"
    echo "   ✅ Design responsivo"
    echo ""
    echo "📞 Se tiver problemas, me contate: jefersonconsulting@gmail.com"
    echo ""
    echo "🎉 Seu sistema Sensus RS estará no ar em minutos!"
    
else
    print_error "❌ Erro ao enviar código para o GitHub"
    echo ""
    echo "🔍 Possíveis soluções:"
    echo "1. Verifique suas credenciais do GitHub"
    echo "2. Verifique se o repositório existe: https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS"
    echo "3. Tente manualmente:"
    echo "   git push -u origin main"
    echo ""
    echo "📞 Se precisar de ajuda: jefersonconsulting@gmail.com"
    exit 1
fi

echo ""
echo "======================================"
echo "🤖 FIM DO SCRIPT - SENSUS RS"
echo "======================================"