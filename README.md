# 🤖 Sensus RS ChatBot System

Sistema completo de ChatBot com gerenciamento de pacotes de mensagens, painel administrativo e integração com GPTMaker.ai.

## 🌟 Funcionalidades

### ✅ ChatBot Inteligente
- Integração com GPTMaker.ai via iframe
- Interface responsiva e moderna
- Controle de uso de mensagens

### ✅ Sistema de Autenticação
- Login e registro de usuários
- Dois tipos de usuários: Admin e Cliente
- JWT para segurança

### ✅ Pacotes de Mensagens
- 3 pacotes disponíveis: 500, 1000 e 2000 mensagens
- Preços diferenciados: R$ 49,90, R$ 90,00 e R$ 160,00
- Sistema de compra e controle de uso

### ✅ Painel Administrativo
- Gestão de usuários
- Gestão de pacotes de mensagens
- Estatísticas do sistema
- Controle total sobre o funcionamento

### ✅ Painel do Cliente
- Visualização de pacotes comprados
- Controle de mensagens restantes
- Estatísticas de uso
- Compra de novos pacotes

## 🚀 Instalação Rápida

### Pré-requisitos
- Node.js 18+
- Git
- Conta no GitHub
- Conta no Vercel

### Passo 1: Executar Script Automático
**Windows:**
```bash
# Dê duplo clique no arquivo
deploy-automatico.bat
```

**Linux/Mac:**
```bash
bash deploy-automatico.sh
```

### Passo 2: Configurar Vercel
1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Projeto-IA-Sensus-RS"
5. Configure as variáveis de ambiente:
   ```
   DATABASE_URL = file:./dev.db
   NEXTAUTH_URL = https://projeto-ia-sensus-rs.vercel.app
   NEXTAUTH_SECRET = sua-chave-secreta-aqui
   ```
6. Clique em "Deploy"

## 🔐 Credenciais de Teste

### Administrador
- **Email:** admin@sensustec.com.br
- **Senha:** password123
- **Acesso:** Painel administrativo completo

### Cliente
- **Email:** cliente@sensustec.com.br
- **Senha:** password123
- **Acesso:** Painel do cliente e compra de pacotes

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/                 # Rotas da API
│   │   ├── auth/           # Autenticação
│   │   ├── client/         # Rotas do cliente
│   │   ├── admin/          # Rotas do admin
│   │   └── health/         # Health check
│   ├── page.tsx           # Página principal com ChatBot
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   ├── dashboard/         # Painel do cliente
│   ├── admin/             # Painel administrativo
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Estilos globais
├── components/
│   └── ui/                # Componentes UI
├── lib/
│   ├── db.ts             # Configuração do banco
│   └── utils.ts          # Utilitários
└── hooks/                # Hooks personalizados
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem segura
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

### Backend
- **Next.js API Routes** - API serverless
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados leve
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

### Deploy
- **Vercel** - Plataforma de deploy
- **GitHub** - Controle de versão

## 🎯 Funcionalidades Detalhadas

### Sistema de Pacotes
- **Pacote Básico:** 500 mensagens por R$ 49,90
- **Pacote Intermediário:** 1000 mensagens por R$ 90,00
- **Pacote Premium:** 2000 mensagens por R$ 160,00

### Controle de Mensagens
- Sistema de contagem de mensagens usadas
- Bloqueio automático quando mensagens acabam
- Relatório de uso por pacote

### Gestão de Usuários
- Cadastro de novos usuários
- Controle de acesso por níveis
- Visualização de compras e uso

### Painel Administrativo
- Gerenciamento completo de usuários
- Criação e edição de pacotes
- Estatísticas em tempo real
- Controle de ativação/desativação

## 🌐 URLs Importantes

- **Sistema Produção:** https://projeto-ia-sensus-rs.vercel.app
- **Repositório GitHub:** https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS
- **Vercel:** https://vercel.com
- **GPTMaker:** https://gptmaker.ai

## 📞 Suporte

Para qualquer dúvida ou problema, entre em contato:

- **Email:** jefersonconsulting@gmail.com
- **GitHub:** https://github.com/Jefeundertaker/Projeto-IA-Sensus-RS/issues

## 🔄 Atualizações

O sistema está em constante desenvolvimento. Para atualizar:

1. Faça pull das alterações do GitHub
2. Execute `npm install` para novas dependências
3. Execute `npm run build` para verificar build
4. O Vercel fará deploy automático

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ por Jeferson Consulting para Sensus RS**