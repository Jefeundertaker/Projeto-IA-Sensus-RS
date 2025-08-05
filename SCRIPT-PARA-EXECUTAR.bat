@echo off
echo 🚀 ENVIANDO PROJETO SENSUS RS PARA O GITHUB
echo ==============================================
echo.

REM Verificar se o Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado. Por favor, instale o Git primeiro.
    echo    Download: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git encontrado!

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo ❌ Este script deve ser executado no diretório raiz do projeto.
    echo    Navegue até a pasta C:\Projeto-IA-Sensus-RS
    pause
    exit /b 1
)

echo ✅ Diretório do projeto verificado!

REM Inicializar repositório Git se necessário
if not exist ".git" (
    echo 🔧 Inicializando repositório Git...
    git init
)

REM Configurar usuário Git
echo 🔧 Configurando usuário Git...
git config user.name "Jeferson Consulting"
git config user.email "jefersonconsulting@gmail.com"

REM Adicionar todos os arquivos
echo 📦 Adicionando arquivos ao Git...
git add .

REM Fazer commit
echo 💾 Fazendo commit...
git commit -m "feat: Implement complete Sensus RS ChatBot System

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

REM Renomear branch para main
git branch -M main

echo ✅ Branch configurada para main!

REM Enviar para GitHub
echo 📤 Enviando código para o GitHub...
echo ⚠️  ATENÇÃO: Você precisará fazer login no GitHub!
echo.
echo    Username: Jefeundertaker
echo    Password: [Sua senha do GitHub]
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
echo 🎉 PARABÉNS! Seu projeto está no GitHub!
echo.
echo 🚀 PRÓXIMOS PASSOS:
echo 1. Acesse: https://vercel.com
echo 2. Faça login com GitHub
echo 3. Clique em "New Project"
echo 4. Selecione "Projeto-IA-Sensus-RS"
echo 5. Configure as variáveis de ambiente:
echo    DATABASE_URL = file:./dev.db
echo    NEXTAUTH_URL = https://projeto-ia-sensus-rs.vercel.app
echo    NEXTAUTH_SECRET = sua-chave-secreta-aqui
echo 6. Clique em "Deploy"
echo.
echo 📱 Seu sistema ficará no ar em: https://projeto-ia-sensus-rs.vercel.app
echo.
echo 🔐 Credenciais de teste:
echo    Admin: admin@sensustec.com.br / password123
echo    Cliente: cliente@sensustec.com.br / password123
echo.
echo 📞 Se tiver problemas, me contate: jefersonconsulting@gmail.com
echo.
echo ==============================================
echo 🤖 FIM DO SCRIPT - PROJETO NO GITHUB
echo ==============================================
echo.
pause