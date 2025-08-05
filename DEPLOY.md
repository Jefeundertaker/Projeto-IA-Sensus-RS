# Sensus RS ChatBot System

Sistema completo de ChatBot IA para a Sensus RS com gerenciamento de usuários, pacotes de mensagens e painéis administrativos.

## 🚀 Deploy Automático na Nuvem

Este projeto está configurado para deploy automático em plataformas de hospedagem gratuita. Siga as instruções abaixo para colocar seu sistema no ar.

### Opções de Hospedagem Gratuita

#### 1. Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/sensus-rs-chatbot)

**Passos:**
1. Clique no botão acima ou acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `DATABASE_URL`: URL do seu banco de dados SQLite
4. Clique em Deploy

#### 2. Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/seu-usuario/sensus-rs-chatbot)

**Passos:**
1. Clique no botão acima ou acesse [railway.app](https://railway.app)
2. Conecte seu repositório GitHub
3. Railway detectará automaticamente que é um projeto Next.js
4. Configure as variáveis de ambiente
5. Clique em Deploy

#### 3. Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/seu-usuario/sensus-rs-chatbot)

**Passos:**
1. Clique no botão acima ou acesse [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Configure como Web Service
4. Build Command: `npm run build`
5. Start Command: `npm start`
6. Configure as variáveis de ambiente

### Configuração do Banco de Dados

Para produção, você precisará configurar um banco de dados. Aqui estão algumas opções gratuitas:

#### SQLite (Simples)
Para desenvolvimento e testes, você pode usar SQLite localmente:
```bash
# No seu ambiente local
DATABASE_URL="file:./dev.db"
```

#### PostgreSQL (Produção)
Opções gratuitas de PostgreSQL:
- [ElephantSQL](https://www.elephantsql.com/) - Plano gratuito com 20MB
- [Supabase](https://supabase.com/) - Banco de dados PostgreSQL gratuito
- [Railway](https://railway.app/) - PostgreSQL incluído no plano gratuito

Exemplo de URL:
```
DATABASE_URL="postgresql://usuario:senha@host:porta/database"
```

### Variáveis de Ambiente Necessárias

Configure estas variáveis no seu serviço de hospedagem:

```bash
# Banco de dados
DATABASE_URL="sua_url_de_banco_de_dados"

# Opcional: Configurações adicionais
NEXTAUTH_URL="https://seu-dominio.vercel.app"
NEXTAUTH_SECRET="sua_chave_secreta"
```

### Deploy Manual

Se preferir fazer o deploy manualmente:

#### 1. Prepare seu repositório
```bash
git init
git add .
git commit -m "Initial commit - Sensus RS ChatBot System"
```

#### 2. Crie um repositório no GitHub
- Acesse [github.com](https://github.com)
- Crie um novo repositório chamado `sensus-rs-chatbot`
- Siga as instruções para conectar seu repositório local

#### 3. Configure sua plataforma de hospedagem
- Escolha uma das opções acima
- Conecte seu repositório GitHub
- Configure as variáveis de ambiente
- Faça o deploy

#### 4. Acesse seu sistema
Após o deploy, seu sistema estará disponível em:
- Vercel: `https://sensus-rs-chatbot.vercel.app`
- Railway: `https://sensus-rs-chatbot.railway.app`
- Render: `https://sensus-rs-chatbot.onrender.com`

### Testes Pós-Deploy

Após o deploy, verifique se tudo está funcionando:

1. **Acesse a página principal**
   - Verifique se o layout carrega corretamente
   - Teste o ChatBot iframe

2. **Teste o cadastro**
   - Crie uma nova conta de cliente
   - Verifique se o registro funciona

3. **Teste o login**
   - Faça login com a conta criada
   - Verifique se o painel do cliente funciona

4. **Teste o painel administrativo**
   - Use as credenciais de admin
   - Verifique se consegue gerenciar usuários e pacotes

### Solução de Problemas

#### Problemas Comuns

1. **Erro de banco de dados**
   - Verifique se a variável `DATABASE_URL` está correta
   - Certifique-se de que o banco de dados está acessível

2. **Erro de build**
   - Verifique se todas as dependências estão instaladas
   - Limpe o cache: `rm -rf .next node_modules package-lock.json && npm install`

3. **Erro de rotas**
   - Verifique se todas as rotas de API estão funcionando
   - Teste `/api/health` primeiro

#### Logs e Monitoramento

- **Vercel**: Verifique os logs no dashboard do Vercel
- **Railway**: Acesse os logs no console do Railway
- **Render**: Verifique os logs na seção de serviços

### Domínio Personalizado

Se você quiser usar um domínio personalizado:

1. **Configure seu domínio**
   - No painel da sua plataforma de hospedagem
   - Adicione seu domínio (ex: `chat.sensustec.com.br`)

2. **Configure o DNS**
   - Adicione um registro CNAME apontando para a plataforma
   - Ex: `chat CNAME cname.vercel-dns.com`

3. **Configure SSL**
   - A maioria das plataformas gera certificado SSL automaticamente

### Segurança

Para produção, considere estas medidas de segurança:

1. **Variáveis de ambiente**
   - Nunca commit credenciais no código
   - Use variáveis de ambiente para dados sensíveis

2. **HTTPS**
   - Todas as plataformas recomendadas oferecem HTTPS gratuito
   - Certifique-se de que está habilitado

3. **Rate limiting**
   - Considere implementar limitação de taxa nas APIs
   - Proteja contra ataques de força bruta

### Backup e Manutenção

1. **Backup do banco de dados**
   - Configure backups automáticos se usar PostgreSQL
   - Para SQLite, faça backup regular do arquivo

2. **Monitoramento**
   - Monitore o uso do sistema
   - Verifique os logs regularmente

3. **Atualizações**
   - Mantenha as dependências atualizadas
   - Teste atualizações em ambiente de desenvolvimento

---

## 🎉 Seu Sistema está Pronto!

Após seguir estes passos, seu sistema Sensus RS ChatBot estará:
- ✅ Acessível de qualquer lugar
- ✅ Com SSL/HTTPS
- ✅ Com domínio personalizado (opcional)
- ✅ Monitorado e com logs
- ✅ Pronto para produção

Qualquer dúvida, consulte a documentação da sua plataforma de hospedagem escolhida.