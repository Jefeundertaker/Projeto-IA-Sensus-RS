@echo off
echo 🤖 SENSUS RS - DEPLOY AUTOMATICO
echo ======================================
echo.

REM Verificar se o Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado. Por favor, instale o Git primeiro.
    pause
    exit /b 1
)

echo ✅ Git encontrado!

REM Verificar se o Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não está instalado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!

REM Verificar se o npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não está instalado. Por favor, instale o npm primeiro.
    pause
    exit /b 1
)

echo ✅ npm encontrado!

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo ❌ Este script deve ser executado no diretório raiz do projeto.
    pause
    exit /b 1
)

echo ✅ Diretório do projeto verificado!

REM Limpar repositório Git existente se necessário
echo 🔧 Configurando repositório Git...
if exist ".git" (
    echo ⚠️  Repositório Git já existe. Limpando...
    rmdir /s /q .git
)

REM Inicializar repositório Git
git init
echo ✅ Repositório Git inicializado!

REM Configurar usuário Git
echo 🔧 Configurando usuário Git...
git config user.name "Jeferson Consulting"
git config user.email "jefersonconsulting@gmail.com"
echo ✅ Usuário Git configurado!

REM Adicionar todos os arquivos
echo 📦 Adicionando arquivos ao Git...
git add .
echo ✅ Arquivos adicionados!

REM Fazer commit inicial
echo 💾 Fazendo commit inicial...
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

if %errorlevel% neq 0 (
    echo ❌ Erro ao fazer commit
    pause
    exit /b 1
)

echo ✅ Commit realizado com sucesso!

REM Adicionar repositório remoto
echo 🔗 Configurando repositório remoto...
git remote add origin https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS.git
echo ✅ Repositório remoto configurado!

REM Renomear branch para main
git branch -M main
echo ✅ Branch renomeada para main!

REM Enviar para GitHub
echo 📤 Enviando código para o GitHub...
echo ⚠️  Você precisará fazer login no GitHub!
echo.

git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Erro ao enviar código para o GitHub
    echo.
    echo 🔍 Possíveis soluções:
    echo 1. Verifique suas credenciais do GitHub
    echo 2. Verifique se o repositório existe: https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS
    echo 3. Tente manualmente:
    echo    git push -u origin main
    echo.
    echo 📞 Se precisar de ajuda: jefersonconsulting@gmail.com
    pause
    exit /b 1
)

echo ✅ Código enviado com sucesso para o GitHub!
echo.
echo 🔗 Seu repositório: https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS
echo.

REM Instalar dependências
echo 📦 Instalando dependências...
npm install

if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo ✅ Dependências instaladas com sucesso!

REM Build do projeto
echo 🔨 Fazendo build do projeto...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Erro ao fazer build
    pause
    exit /b 1
)

echo ✅ Build realizado com sucesso!
echo.
echo 🎉 PARABÉNS! Seu projeto está pronto para o deploy!
echo.
echo 🚀 PRÓXIMOS PASSOS PARA O VERCEL:
echo.
echo 1. Acesse: https://vercel.com
echo 2. Faça login com sua conta GitHub
echo 3. Clique em "New Project"
echo 4. Selecione "Projeto-IA-Sensus-RS" da lista
echo 5. Configure as variáveis de ambiente:
echo.
echo    DATABASE_URL = file:./dev.db
echo    NEXTAUTH_URL = https://projeto-ia-sensus-rs.vercel.app
echo    NEXTAUTH_SECRET = sua-chave-secreta-aqui
echo.
echo 6. Clique em "Deploy"
echo.
echo 📱 Após o deploy, seu sistema estará acessível em:
echo    https://projeto-ia-sensus-rs.vercel.app
echo.
echo 🔐 Credenciais de teste:
echo    Admin: admin@sensustec.com.br / password123
echo    Cliente: cliente@sensustec.com.br / password123
echo.
echo 🧪 Teste estas funcionalidades após o deploy:
echo    ✅ ChatBot com GPTMaker
echo    ✅ Sistema de pacotes de mensagens
echo    ✅ Login e cadastro de usuários
echo    ✅ Painel administrativo
echo    ✅ Painel do cliente
echo    ✅ Design responsivo
echo.
echo 📞 Se tiver problemas, me contate: jefersonconsulting@gmail.com
echo.
echo 🎉 Seu sistema Sensus RS estará no ar em minutos!
echo.
echo ======================================
echo 🤖 FIM DO SCRIPT - SENSUS RS
echo ======================================
echo.
pause