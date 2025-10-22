---

## Visão Geral do Projeto Daily

Sendo desenvolvido com uma **arquitetura cliente-servidor** 

* **Frontend (Mobile):** **React Native** com Expo

* **Backend:** **Node.js** com Express ou NestJS, para criação de APIs

* **Banco de Dados (Relacional):** **MySQL**

---

### 📦 Bibliotecas e Dependências Principais (Frontend - React Native)

```bash
npx expo start
```

* **Navegação:**
    <!-- * `@react-navigation/native`
    * `@react-navigation/native-stack` -->
    * `expo-router`
    * Essas são cruciais para gerenciar transições de tela e fluxos de navegação dentro da sua aplicação móvel.

* **UI e Gestos:**
    * `react-native-screens`
    * `react-native-safe-area-context`
    * `react-native-gesture-handler`
    * `react-native-reanimated`
    * `react-hook-form yup` para fazer formularios.

    * Essas bibliotecas aprimoram o desempenho da interface do usuário, gerenciam a renderização da tela, tratam áreas seguras e possibilitam interações complexas de gestos.

* **Ícones:**
    * `react-native-vector-icons`
    * Fornece uma vasta coleção de ícones personalizáveis para enriquecer o design visual do seu aplicativo.

* **Requisições HTTP:**
    * `axios`
    * Um popular cliente HTTP baseado em Promises para fazer requisições ao seu backend Node.js.

* **Armazenamento Local:**
    * `@react-native-async-storage/async-storage`
    * Essencial para o armazenamento persistente de dados localmente dentro da aplicação móvel.

* **Formulários e Validação:**
    * `react-hook-form`
    * `yup`
    * `react-hook-form` simplifica o gerenciamento de formulários, enquanto `yup` fornece validação de esquema poderosa para as entradas do seu formulário, garantindo a integridade dos dados.


### Bibliotecas e Dependências Principais (Backend - Node.js com Express)

- `express` - Framework para criação de APIs REST
- `cors` - Middleware para habilitar requisições cross-origin do app móvel
- `dotenv` - Para carregar variáveis de ambiente do arquivo `.env`
- `mysql2` - Driver para conexão com MySQL
- `prisma` -  Facilita bastante o mapeamento de dados e a manutenção do banco
    Inicar prisma *npx prisma init*
    Criar migration novo com o prisma *npx prisma migrate dev --name init*

## Configuração do `.env`

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=daily


## Como Rodar o Backend

```bash
npm run dev
```

## Rodar a migration do banco

```bash
npx prisma migrate dev