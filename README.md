# 🏥 MedAta - Sistema de Gerenciamento Médico

Um aplicativo moderno e intuitivo para gerenciamento de registros médicos e dados de pacientes, desenvolvido com React e Vite.

## 📋 Sobre o Projeto

MedAta é uma plataforma web desenvolvida para facilitar o gerenciamento de informações médicas e pacientes. O sistema permite que médicos façam login, registrem novos pacientes e acessem o histórico de atendimentos de forma segura e organizada.

### Funcionalidades Principais

- ✅ **Autenticação de Usuários**: Sistema de login seguro para médicos
- ✅ **Registro de Pacientes**: Interface intuitiva para cadastro de novos pacientes
- ✅ **Histórico de Atendimentos**: Visualização completa do histórico médico
- ✅ **Rotas Protegidas**: Acesso controlado aos dados sensíveis
- ✅ **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos
- ✅ **Navegação Segura**: Sistema de redirecionamento automático para login

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18.2.0 - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** 6.30.1 - Roteamento de aplicações SPA
- **Vite** 5.0.8 - Ferramenta de build rápida e moderna
- **CSS** - Estilização customizada com suporte a componentes

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para padronização de código
- **Vite** - Build tool com hot module replacement

## 📁 Estrutura do Projeto

```
mediata-main/
├── src/
│   ├── Componentes/           # Componentes principais da aplicação
│   │   ├── Cadastro.jsx       # Página de cadastro de médicos
│   │   ├── Entrar.jsx         # Página de login
│   │   ├── Historico.jsx      # Histórico de atendimentos
│   │   └── RegistroPaciente.jsx # Registro de novos pacientes
│   ├── Layout/                # Estilos dos componentes
│   │   ├── Cadastro.css
│   │   ├── Historico.css
│   │   ├── Home.css
│   │   ├── RegistroPaciente.css
│   │   └── Navbar.css
│   ├── assets/                # Recursos estáticos
│   ├── App.jsx                # Componente principal com rotas
│   ├── App.css                # Estilos globais
│   ├── Home.jsx               # Página inicial (landing page)
│   ├── NavBar.jsx             # Barra de navegação
│   ├── constants.js           # Constantes da aplicação
│   ├── index.css              # Estilos globais
│   └── main.jsx               # Ponto de entrada da aplicação
├── public/                    # Arquivos públicos estáticos
├── index.html                 # Arquivo HTML principal
├── package.json               # Dependências e scripts
├── vite.config.js             # Configuração do Vite
└── eslint.config.js           # Configuração do ESLint
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/mediata-main.git
cd mediata-main
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API**
   - Abra o arquivo `src/constants.js`
   - Atualize a `API_BASE` com a URL do seu backend:
```javascript
export const API_BASE = 'https://seu-backend.com/api';
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos compilados serão salvos no diretório `dist/`.

### Preview da Build

Para visualizar a build de produção localmente:

```bash
npm run preview
```

## 📝 Lint e Qualidade de Código

Para verificar a qualidade do código:

```bash
npm run lint
```

## 🔐 Autenticação e Autorização

O sistema utiliza **localStorage** para gerenciar a autenticação:

- **Login**: O ID do médico é armazenado em `localStorage` após autenticação bem-sucedida
- **Rotas Protegidas**: Componentes como `RegistroPaciente` e `Histórico` são protegidos
- **Redirecionamento Automático**: Usuários não autenticados são redirecionados para a página de login

### Fluxo de Autenticação

1. Usuário acessa `/entrar`
2. Realiza login com credenciais
3. Sistema armazena `medicoId` no localStorage
4. Usuário obtém acesso a rotas protegidas
5. Logout remove o `medicoId` do localStorage

## 📲 Rotas da Aplicação

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Pública | Página inicial (landing page) |
| `/cadastro` | Pública | Cadastro de novo médico |
| `/entrar` | Pública | Login de médico |
| `/registro-paciente` | Protegida | Registro de novo paciente |
| `/historico` | Protegida | Histórico de atendimentos |

## 🎯 Componentes Principais

### App.jsx
Componente raiz que gerencia as rotas da aplicação, implementa proteção de rotas e redirecionamentos.

### NavBar.jsx
Barra de navegação presente em todas as páginas com links para as principais seções.

### Home.jsx
Página inicial com informações sobre a plataforma.

### Componentes de Negócio
- **Cadastro.jsx** - Formulário para registrar novos médicos
- **Entrar.jsx** - Formulário de autenticação
- **RegistroPaciente.jsx** - Formulário para registrar pacientes
- **Historico.jsx** - Visualização de histórico médico

## 🌐 Backend Integration

A aplicação se conecta a um backend C# (.NET) através da API REST. 

**Configuração Padrão:**
- Base URL: `https://localhost:7027/api`
- Protocolo: HTTPS
- Formato: JSON

Para alterar a URL do backend, edite `src/constants.js`:

```javascript
export const API_BASE = 'https://seu-backend.com/api';
```

## 📦 Dependências Principais

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.30.1"
}
```

## 🐛 Conhecidos Problemas e Limitações

- O sistema utiliza localStorage para armazenamento local (não persistente entre navegadores)
- Recomenda-se usar HTTPS em produção para segurança de dados sensíveis
- CORS deve ser configurado corretamente no backend

## 🔮 Melhorias Futuras

- [ ] Implementar refresh token para autenticação
- [ ] Adicionar validação de formulários mais robusta
- [ ] Implementar testes unitários
- [ ] Adicionar dark mode
- [ ] Melhorar acessibilidade (A11y)
- [ ] Implementar notificações em tempo real
- [ ] Adicionar exportação de relatórios

## 👥 Contribuição

Contribuições são bem-vindas! Por favor, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de uso privado. Todos os direitos reservados.

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através de:
- Email: [seu-email@exemplo.com]
- Issues: Abra uma issue no repositório

## 📚 Referências

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [ESLint Documentation](https://eslint.org/)

---

**Versão**: 0.0.0  
**Última Atualização**: Dezembro 2025  
**Status**: Em Desenvolvimento 🚀
