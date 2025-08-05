#!/bin/bash

echo "🚀 Sensus RS ChatBot - Setup e Deploy"
echo "======================================"

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Por favor, instale o Git primeiro."
    exit 1
fi

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Git, Node.js e npm estão instalados"

# Perguntar qual plataforma de deploy
echo ""
echo "Escolha sua plataforma de deploy:"
echo "1) Vercel (Recomendado)"
echo "2) Railway"
echo "3) Render"
echo "4) Netlify"
read -p "Digite o número da opção (1-4): " platform_choice

case $platform_choice in
    1)
        PLATFORM="Vercel"
        DEPLOY_URL="https://vercel.com/new/clone"
        ;;
    2)
        PLATFORM="Railway"
        DEPLOY_URL="https://railway.app/new/template"
        ;;
    3)
        PLATFORM="Render"
        DEPLOY_URL="https://render.com/deploy"
        ;;
    4)
        PLATFORM="Netlify"
        DEPLOY_URL="https://app.netlify.com/start"
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo "✅ Plataforma escolhida: $PLATFORM"

# Perguntar sobre o repositório GitHub
echo ""
read -p "Você já tem um repositório GitHub? (s/n): " has_github

if [ "$has_github" = "n" ]; then
    echo ""
    echo "Vamos criar um repositório GitHub:"
    echo "1. Acesse https://github.com"
    echo "2. Clique em 'New repository'"
    echo "3. Nome do repositório: sensus-rs-chatbot"
    echo "4. Deixe público ou privado como preferir"
    echo "5. Clique em 'Create repository'"
    echo ""
    read -p "Pressione Enter após criar o repositório..."
    
    read -p "Digite a URL do seu repositório GitHub (ex: https://github.com/seu-usuario/sensus-rs-chatbot): " github_url
    
    # Inicializar Git
    git init
    git add .
    git commit -m "Initial commit - Sensus RS ChatBot System"
    
    # Adicionar remote
    git remote add origin $github_url
    git branch -M main
    git push -u origin main
    
    echo "✅ Código enviado para o GitHub"
else
    read -p "Digite a URL do seu repositório GitHub existente: " github_url
    
    # Inicializar Git se necessário
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit - Sensus RS ChatBot System"
    fi
    
    # Adicionar remote se não existir
    if ! git remote -v | grep -q "origin"; then
        git remote add origin $github_url
    fi
    
    git push -u origin main
    
    echo "✅ Código enviado para o GitHub"
fi

# Criar arquivo .env.example
echo ""
echo "Criando arquivo .env.example..."
cat > .env.example << EOL
# Banco de Dados
DATABASE_URL="file:./dev.db"

# Configurações do NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua_chave_secreta_aqui"

# Configurações do App
NODE_ENV="development"
EOL

echo "✅ Arquivo .env.example criado"

# Criar arquivo .env para desenvolvimento
echo "Criando arquivo .env para desenvolvimento..."
cp .env.example .env
echo "✅ Arquivo .env criado"

# Instalar dependências
echo ""
echo "Instalando dependências..."
npm install
echo "✅ Dependências instaladas"

# Build do projeto
echo ""
echo "Fazendo build do projeto..."
npm run build
echo "✅ Build concluído"

# Instruções finais
echo ""
echo "🎉 Setup concluído!"
echo ""
echo "Próximos passos:"
echo "1. Acesse $DEPLOY_URL"
echo "2. Conecte seu repositório GitHub: $github_url"
echo "3. Configure as variáveis de ambiente:"
echo "   - DATABASE_URL: Use uma URL de banco de dados real para produção"
echo "4. Faça o deploy"
echo ""
echo "Após o deploy, seu sistema estará acessível de qualquer lugar!"
echo ""
echo "📱 Credenciais de teste:"
echo "   Admin: admin@sensustec.com.br / password123"
echo "   Cliente: cliente@sensustec.com.br / password123"
echo ""
echo "🔗 Links úteis:"
echo "   - GitHub: $github_url"
echo "   - Deploy: $DEPLOY_URL"
echo "   - Documentação: Ver DEPLOY.md"
echo ""
echo "Boa sorte! 🚀"