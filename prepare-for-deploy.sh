#!/bin/bash

echo "🚀 Preparando projeto para deploy na nuvem..."
echo "========================================"

# Verificar se o Git está inicializado
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositório Git..."
    git init
fi

# Adicionar todos os arquivos
echo "📋 Adicionando arquivos ao Git..."
git add .

# Fazer commit
echo "💾 Fazendo commit..."
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

# Perguntar sobre o GitHub
echo ""
read -p "Você quer fazer push para o GitHub agora? (s/n): " push_to_github

if [ "$push_to_github" = "s" ]; then
    read -p "Digite a URL do seu repositório GitHub: " github_url
    
    if [ -z "$github_url" ]; then
        echo "❌ URL do GitHub não pode ser vazia"
        exit 1
    fi
    
    # Adicionar remote se não existir
    if ! git remote -v | grep -q "origin"; then
        git remote add origin $github_url
    fi
    
    # Fazer push
    echo "📤 Enviando código para o GitHub..."
    git push -u origin main
    
    echo "✅ Código enviado para o GitHub!"
    echo ""
    echo "🔗 Seu repositório: $github_url"
    echo ""
    echo "🚀 Agora você pode fazer o deploy em:"
    echo "   • Vercel: https://vercel.com/new/clone"
    echo "   • Railway: https://railway.app/new/template"
    echo "   • Render: https://render.com/deploy"
    echo ""
    echo "📱 Não se esqueça de configurar as variáveis de ambiente:"
    echo "   • DATABASE_URL"
    echo "   • NEXTAUTH_URL"
    echo "   • NEXTAUTH_SECRET"
else
    echo "✅ Commit feito localmente!"
    echo ""
    echo "📋 Para fazer o deploy manualmente:"
    echo "1. Crie um repositório no GitHub"
    echo "2. Adicione o remote: git remote add origin <URL>"
    echo "3. Envie o código: git push -u origin main"
    echo "4. Configure as variáveis de ambiente na sua plataforma de deploy"
fi

echo ""
echo "🎉 Projeto pronto para deploy na nuvem!"
echo "📖 Consulte o arquivo DEPLOY.md para instruções detalhadas"
echo "📖 Consulte o arquivo README.md para documentação completa"