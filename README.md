# Controle de Gastos - Frontend

Aplicação de controle de despesas baseada em React, com autenticação via JWT e cobertura abrangente de testes.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** – Sistema seguro de login e registro
- 👥 **Acesso baseado em papéis** – Papéis atribuídos com base na idade (16+ = Admin, <16 = Usuário)
- 🛡️ **Rotas protegidas** – Acesso ao dashboard restrito a usuários autenticados
- 🧪 **Testes abrangentes** – Testes unitários para todos os componentes e serviços
- 🎨 **Interface moderna** – Construída com Radix UI e TypeScript

## 🧰 Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, Vite
- **Componentes de UI:** Radix UI
- **Cliente HTTP:** Axios
- **Roteamento:** React Router
- **Testes:** Vitest, Testing Library
- **Gerenciamento de estado:** Hooks do React (`useState`, `useEffect`)

## 🚀 Primeiros Passos

### 📋 Pré-requisitos

- Node.js (recomendado 18+)
- Yarn ou npm
- API Backend rodando em `http://localhost:8080`

### 🔧 Instalação

```bash
# Clonar o repositório
git clone <url-do-repositório>
cd controle-gastos-frontend

# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn dev

```

# Desenvolvimento

yarn dev # Inicia o servidor de desenvolvimento

# Build

yarn build # Gera build para produção
yarn preview # Visualiza build de produção

# Testes

yarn test # Executa testes em modo watch
yarn test:run # Executa testes uma vez
yarn test:ui # Executa testes com interface gráfica
yarn test:coverage # Executa testes com relatório de cobertura

# Lint

yarn lint # Verifica estilo de código

# 🧪 Testes

Este projeto inclui testes unitários abrangentes para:

# Serviços

LoginService: Autenticação, gerenciamento de token, tratamento de erros

RegisterService: Registro de usuário, validações, cenários de erro

# Componentes

Login: Validação de formulário, fluxo de autenticação, navegação

Register: Atribuição de papel por idade, validação, tratamento de erros

Dashboard: Verificação de autenticação, funcionalidade de logout

ProtectedRoute: Proteção de rotas, redirecionamento de autenticação

PublicRoute: Redirecionamento de usuários autenticados

# Cobertura de Testes

✅ 42 testes com excelente cobertura

✅ Renderização de componentes e interações do usuário

✅ Validação de formulários e estados de erro

✅ Fluxos de autenticação e gerenciamento de tokens

✅ Proteção de rotas e navegação

✅ Tratamento de erros de rede e API

✅ Estados de carregamento e operações assíncronas

Executando os Testes

# Executar todos os testes

yarn test:run

# Executar testes com cobertura

yarn test:coverage

# Executar testes com interface gráfica

yarn test:ui

# Executar arquivo de teste específico

yarn test LoginService.test.ts

# 🔐 Sistema de Autenticação

Fluxo de Login
Usuário insere credenciais

Token JWT é recebido e armazenado no localStorage

Token é adicionado aos headers do Axios

Usuário é redirecionado para o dashboard

Fluxo de Registro
Usuário insere nome de usuário, idade e senha

Papel é atribuído automaticamente com base na idade:

Idade ≥ 16: papel ADMIN

Idade < 16: papel USER

Conta é criada e notificação de sucesso exibida

Usuário é redirecionado para a página de login

Proteção de Rotas
Rotas públicas (/, /register): redirecionam usuários autenticados para o dashboard

Rotas protegidas (/dashboard): redirecionam usuários não autenticados para o login

# 🗂️ Estrutura do Projeto

src/
├── components/ # Componentes reutilizáveis
│ ├── ProtectedRoute/ # Wrapper de rotas protegidas (com testes)
│ ├── PublicRoute/ # Wrapper de rotas públicas (com testes)
│ └── Toast/ # Notificações de sucesso
├── pages/ # Páginas
│ ├── Login/ # Formulário de login (com testes)
│ ├── Register/ # Formulário de registro (com testes)
│ └── Dashboard/ # Dashboard protegido (com testes)
├── services/ # Serviços de API
│ ├── LoginService.ts # Serviço de autenticação (com testes)
│ └── RegisterService.ts# Serviço de registro (com testes)
├── Api/ # Configuração do Axios
└── types/ # Definições de tipos TypeScript

# 🌐 Integração com API

O frontend se comunica com um backend em Spring Boot:

POST /auth/login – Autenticação de usuário

POST /auth/register – Registro de usuário

Todas as chamadas incluem tratamento de erros e estados de carregamento.

# 🛠️ Notas de Desenvolvimento

Gerenciamento de Estado
Estado local com hooks (useState, useEffect)

Persistência do token JWT no localStorage

Configuração global do Axios com headers de autenticação

Tratamento de Erros
Boundaries de erro abrangentes

Mensagens amigáveis para o usuário

Detecção e tratamento de erros de rede

Tipagem
Cobertura completa com TypeScript

Verificação estrita de tipos

Interfaces para todas as respostas da API
