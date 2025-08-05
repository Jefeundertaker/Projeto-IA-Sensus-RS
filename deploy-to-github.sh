#!/bin/bash

echo "🚀 Configurando Projeto Sensus RS para Deploy no GitHub e Vercel"
echo "============================================================"
echo ""

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Por favor, instale o Git primeiro."
    exit 1
fi

echo "✅ Git encontrado"

# Configurar repositório remoto
echo "📦 Configurando repositório remoto..."
git remote add origin https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS.git
git branch -M main

echo "✅ Repositório remoto configurado"

# Enviar código para o GitHub
echo "📤 Enviando código para o GitHub..."
echo ""
echo "🔐 Você precisará fazer login no GitHub quando solicitado"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Código enviado com sucesso para o GitHub!"
    echo ""
    echo "🔗 Seu repositório: https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS"
    echo ""
    echo "🚀 Próximos passos para o Vercel:"
    echo ""
    echo "1. Acesse: https://vercel.com"
    echo "2. Faça login com sua conta GitHub"
    echo "3. Clique em 'New Project'"
    echo "4. Selecione 'Projeto-IA-Sensus-RS' da lista"
    echo "5. Configure as variáveis de ambiente:"
    echo ""
    echo "   DATABASE_URL = file:./dev.db"
    echo "   NEXTAUTH_URL = https://seu-projeto.vercel.app"
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
    echo "🎉 Seu sistema estará no ar em alguns minutos!"
else
    echo ""
    echo "❌ Erro ao enviar código para o GitHub"
    echo "Por favor, verifique suas credenciais do GitHub e tente novamente"
    echo "Você pode tentar manualmente:"
    echo "git push -u origin main"
fi