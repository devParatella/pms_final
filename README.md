# PMS Hoteleiro

## Descrição

O PMS Hoteleiro é uma aplicação web para gerenciar acomodações para hoteis de turismo de negócios ou de lazer. O objetivo deste projeto é facilitar a gestão de acomodações de hotéis, pousadas, permitindo um controle eficiente de reservas, manutenção de usuários e cadastro de novas acomodações. Através de uma interface intuitiva e um backend robusto, pretendo proporcionar uma experiência fluida para administradores e usuários finais.

## Benefícios para Empresas

O PMS Hoteleiro pode trazer inúmeros benefícios para empresas que gerenciam acomodações:

- **Eficiência Operacional:** Automatização de processos de reserva e gestão de acomodações, economizando tempo e reduzindo erros.
- **Acesso Fácil:** Interface amigável para os usuários, facilitando o agendamento e gerenciamento de reservas.
- **Segurança:** Utilização de tecnologias como bcrypt para armazenamento seguro de senhas e dotenv para configuração segura do ambiente.
- **Escalabilidade:** Utilização de Node.js e MySQL permite fácil escalabilidade do sistema conforme o crescimento da empresa.
- **Documentação Completa:** Uso de Swagger para documentação da API facilita a manutenção e expansão do sistema.

## Funcionalidades

- Cadastro de acomodações
- Gerenciamento de Reservas
- Manutenção de Usuários
- Upload de Imagens para os acomodações 
- Visualização dos acomodações cadastrados e de Reservas realizadas
- Atualização e Exclusão de acomodações
- Cancelamento de Reservas
- Sistema de Autenticação de Usuários

## Tecnologias Utilizadas

### Frontend

- React
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Swagger (para documentação da API)
- PdfMake (para geração de PDFs)
- bcrypt (para armazenamento seguro de senhas)
- body-parser (middleware para interpretar requisições HTTP)
- dotenv (para configuração de ambiente)

## Requisitos

- Node.js
- MySQL

## Instalação

### Backend

1. Clone o repositório:

   ```bash
   git clone (url ou http do repositório)
   cd ProjetoIntegrador
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados MySQL e adicione as credenciais no arquivo `.env`:

   ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

4. Rode as migrações do Sequelize para configurar o banco de dados:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor:

   ```bash
   node server.js
   ```

### Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd client
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

## Uso

### Cadastro de acomodações

1. Navegue até a página de cadastro de acomodações.
2. Preencha o formulário com as informações da acomodação.
3. Faça o upload da imagem da acomodação (não obrigatório).
4. Clique em "Cadastrar".

### Gerenciamento de Reservas

1. Navegue até a página de reservas.
2. Visualize, finalize ou cancele reservas existentes.

### Manutenção de Usuários

1. Navegue até a página de usuários.
2. Visualize a lista de usuários com o auxílio das setas no menu.
3. Atualize as informações de um usuário.

## Contribuição

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Dê push na sua branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.