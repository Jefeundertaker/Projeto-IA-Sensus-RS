@echo off
echo 🔧 CORRIGINDO ERRO DE DEPLOY NO VERCEL
echo =========================================
echo.

REM Verificar se o Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado. Por favor, instale o Git primeiro.
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

REM Verificar status do Git
echo 🔍 Verificando status do Git...
git status

if %errorlevel% neq 0 (
    echo ❌ Erro ao verificar status do Git
    pause
    exit /b 1
)

echo ✅ Status verificado!

REM Enviar para GitHub
echo 📤 Enviando correções para o GitHub...
echo ⚠️  ATENÇÃO: Você precisará fazer login no GitHub!
echo.
echo    Username: Jefeundertaker
echo    Password: [Sua senha do GitHub]
echo.

git push origin main

if %errorlevel% neq 0 (
    echo ❌ Erro ao enviar código para o GitHub
    echo.
    echo 🔍 Possíveis soluções:
    echo 1. Verifique suas credenciais do GitHub
    echo 2. Verifique sua conexão com a internet
    echo 3. Tente manualmente:
    echo    git push origin main
    echo.
    echo 📞 Se precisar de ajuda: jefersonconsulting@gmail.com
    pause
    exit /b 1
)

echo ✅ Código enviado com sucesso para o GitHub!
echo.
echo 🎉 PARABÉNS! As correções foram enviadas!
echo.
echo 🚀 PRÓXIMOS PASSOS:
echo 1. Aguarde o deploy automático no Vercel
echo 2. Acesse: https://vercel.com para verificar o status
echo 3. Se necessário, clique em "Redeploy"
echo.
echo 📱 Seu sistema ficará no ar em: https://projeto-ia-sensus-rs.vercel.app
echo.
echo 🔐 Credenciais de teste:
echo    Admin: admin@sensustec.com.br / password123
echo    Cliente: cliente@sensustec.com.br / password123
echo.
echo 📞 Se tiver problemas, me contate: jefersonconsulting@gmail.com
echo.
echo =========================================
echo 🤖 FIM DO SCRIPT - DEPLOY CORRIGIDO
echo =========================================
echo.
pause