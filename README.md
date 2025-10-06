# Sistema de Autenticação com React, Firebase e Vercel

Este projeto é uma aplicação web de exemplo que demonstra um sistema de autenticação de usuários com cadastro e login, utilizando React para o frontend, Firebase para autenticação e banco de dados (Firestore), e Vercel para deploy.

## Funcionalidades

-   **Cadastro de Usuários**: Permite que novos usuários se registrem com nome, e-mail e senha.
-   **Login de Usuários**: Permite que usuários existentes façam login com suas credenciais.
-   **Dashboard**: Página protegida que exibe informações do usuário logado.
-   **Estilização Moderna**: Interface de usuário intuitiva e responsiva.

## Estrutura do Projeto

O projeto foi criado com `manus-create-react-app` e possui a seguinte estrutura principal:

```
auth-app/
├── public/
├── src/
│   ├── assets/  # Ativos estáticos como imagens
│   ├── components/
│   │   ├── Auth.css      # Estilos CSS para autenticação
│   │   ├── Dashboard.css # Estilos CSS para o dashboard
│   │   ├── Dashboard.jsx # Componente do dashboard
│   │   ├── Login.jsx     # Componente da página de login
│   │   └── Register.jsx  # Componente da página de cadastro
│   ├── lib/
│   │   └── firebase.js   # Configuração do Firebase
│   ├── App.css           # Estilos globais da aplicação
│   ├── App.jsx           # Componente principal da aplicação (gerenciamento de rotas e autenticação)
│   └── main.jsx          # Ponto de entrada da aplicação
├── index.html            # Arquivo HTML principal
├── package.json          # Dependências e scripts do projeto
└── vite.config.js        # Configuração do Vite
```

## Configuração do Firebase

Para que a aplicação funcione corretamente, você precisa configurar seu projeto no Firebase. Siga os passos abaixo:

1.  **Crie um Projeto Firebase**: Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto.

2.  **Registre seu Aplicativo Web**: No seu projeto Firebase, clique em "Adicionar aplicativo" e selecione a opção "Web" (o ícone `</>`). Siga as instruções para registrar seu aplicativo e copie o objeto de configuração do Firebase ( `firebaseConfig`).

3.  **Habilite a Autenticação por E-mail/Senha**: No Firebase Console, vá em "Authentication" (Autenticação) > "Sign-in method" (Método de login) e habilite "Email/Password" (E-mail/Senha).

4.  **Habilite o Firestore Database**: No Firebase Console, vá em "Firestore Database" e crie um novo banco de dados. Escolha o modo "Start in production mode" (Iniciar no modo de produção) e selecione a localização do seu servidor.

5.  **Atualize as Credenciais no Projeto**: Abra o arquivo `src/lib/firebase.js` no seu projeto e substitua os placeholders `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, etc., pelos valores do objeto `firebaseConfig` que você copiou no passo 2.

    ```javascript
    // src/lib/firebase.js
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_AUTH_DOMAIN",
      projectId: "SEU_PROJECT_ID",
      storageBucket: "SEU_STORAGE_BUCKET",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID"
    };
    ```

## Deploy no Vercel

Para fazer o deploy da sua aplicação no Vercel, siga estes passos:

1.  **Crie uma Conta Vercel**: Se você ainda não tem uma, crie uma conta gratuita no [Vercel](https://vercel.com/).

2.  **Importe o Projeto Git**: No painel do Vercel, clique em "Add New..." (Adicionar Novo...) > "Project" (Projeto). Selecione a opção para importar um projeto Git e conecte sua conta GitHub (se ainda não estiver conectada). Escolha o repositório `auth-app` que foi criado.

3.  **Configurações de Deploy**: O Vercel detectará automaticamente que é um projeto React/Vite. Você pode deixar as configurações de build e output padrão.

4.  **Variáveis de Ambiente**: Para manter suas chaves do Firebase seguras, adicione-as como variáveis de ambiente no Vercel. No painel do seu projeto Vercel, vá em "Settings" (Configurações) > "Environment Variables" (Variáveis de Ambiente) e adicione cada chave do `firebaseConfig` como uma variável de ambiente. Por exemplo:

    -   `VITE_FIREBASE_API_KEY` = `SUA_API_KEY`
    -   `VITE_FIREBASE_AUTH_DOMAIN` = `SEU_AUTH_DOMAIN`
    -   `VITE_FIREBASE_PROJECT_ID` = `SEU_PROJECT_ID`
    -   `VITE_FIREBASE_STORAGE_BUCKET` = `SEU_STORAGE_BUCKET`
    -   `VITE_FIREBASE_MESSAGING_SENDER_ID` = `SEU_MESSAGING_SENDER_ID`
    -   `VITE_FIREBASE_APP_ID` = `SEU_APP_ID`

    **Importante**: No seu código `src/lib/firebase.js`, você precisará alterar a forma como as variáveis são acessadas para usar `import.meta.env` (específico do Vite) ou `process.env` (se você estiver usando um bundler diferente ou configurando de outra forma). Para Vite, o código ficaria assim:

    ```javascript
    // src/lib/firebase.js
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
    ```

5.  **Deploy**: Clique em "Deploy" (Fazer Deploy). O Vercel fará o build e o deploy da sua aplicação, fornecendo um URL público.

## Uso da Aplicação

1.  **Cadastro**: Na página de login, clique em "Cadastre-se aqui" para ir para a página de cadastro. Preencha seu nome, e-mail e crie uma senha. O usuário será cadastrado no Firebase Authentication e suas informações (nome e e-mail) serão salvas no Firestore. A senha é gerenciada de forma segura pelo Firebase Authentication e não é armazenada em texto plano no Firestore.
2.  **Login**: Após o cadastro, você pode voltar para a página de login e usar o e-mail e a senha que você criou para fazer login.
3.  **Dashboard**: Após o login, você será redirecionado para o dashboard, onde poderá ver suas informações de usuário e fazer logout.

## Repositório GitHub

O código-fonte completo deste projeto está disponível no GitHub:

[https://github.com/YanPalmer/auth-app](https://github.com/YanPalmer/auth-app)

---

**Autor**: Manus AI
**Data**: 06 de Outubro de 2025

