#!/bin/bash

echo "=== Testando o Sistema Sensus RS ==="
echo

# Testar health check
echo "1. Testando Health Check..."
curl -s http://localhost:3000/api/health | jq .
echo

# Testar login admin
echo "2. Testando Login Admin..."
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sensustec.com.br", "password": "password123"}' | jq .
echo

# Testar login cliente
echo "3. Testando Login Cliente..."
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "cliente@sensustec.com.br", "password": "password123"}' | jq .
echo

# Testar registro novo usuário
echo "4. Testando Registro Novo Usuário..."
curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste Manual", "email": "teste@manual.com", "password": "password123", "role": "CLIENT"}' | jq .
echo

# Testar API admin users
echo "5. Testando API Admin Users..."
curl -s http://localhost:3000/api/admin/users | jq .
echo

# Testar API admin packages
echo "6. Testando API Admin Packages..."
curl -s http://localhost:3000/api/admin/packages | jq .
echo

# Testar API client packages
echo "7. Testando API Client Packages..."
curl -s "http://localhost:3000/api/client/packages?userId=cmdxz3lco0004x1kvwdtqzjuw" | jq .
echo

# Testar API client usage
echo "8. Testando API Client Usage..."
curl -s "http://localhost:3000/api/client/usage?userId=cmdxz3lco0004x1kvwdtqzjuw" | jq .
echo

echo "=== Testes Concluídos ==="