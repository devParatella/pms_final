PMS Hoteleiro
Descrição
O PMS Hoteleiro é uma aplicação web destinada à gestão de acomodações em hotéis, pousadas e outros tipos de hospedagens, voltados tanto para o turismo de negócios quanto de lazer. O principal objetivo é facilitar a administração de reservas, controle de usuários, e cadastro de acomodações, oferecendo uma interface intuitiva e um backend robusto. O sistema visa proporcionar uma experiência eficiente e fluida para administradores e clientes.

Benefícios para Empresas
O PMS Hoteleiro oferece diversos benefícios para empresas que gerenciam hospedagens, incluindo:

Eficiência Operacional:

 Automatização dos processos de reserva, cadastro e gestão de acomodações, economizando tempo e minimizando erros.

Acesso Simplificado: 

Interface amigável e responsiva, permitindo fácil acesso e gerenciamento de reservas e informações.

Segurança:

 Uso de tecnologias avançadas como bcrypt para armazenamento seguro de senhas e dotenv para configuração segura de variáveis de ambiente.

Escalabilidade:

 Implementação com Node.js e MySQL, permitindo fácil escalabilidade conforme o crescimento do negócio.
Documentação Completa:

 Utilização do Swagger para a documentação da API, facilitando a manutenção e expansão futura do sistema.

Funcionalidades

Vista intuitiva geral de acomodações e seus estados
Cadastro de acomodações
Gerenciamento de reservas
Controle e manutenção de usuários
Upload de imagens das acomodações
Visualização de acomodações e reservas
Atualização e exclusão de acomodações
Cancelamento de reservas
Sistema de autenticação e autorização de usuários

Tecnologias Utilizadas

Frontend

React (Biblioteca para construção de interfaces)
Axios (Comunicação HTTP com o backend)
CSS (Estilização da interface)
React Router (Navegação entre páginas)
Bootstrap (Framework de design responsivo)
Moment.js (Manipulação de datas)

Backend

Node.js (Ambiente de execução JavaScript no servidor)
Express.js (Framework web para Node.js)
Sequelize (ORM para comunicação com o banco de dados MySQL)
MySQL (Sistema de gerenciamento de banco de dados relacional)
Swagger (Ferramenta de documentação de APIs)
PdfMake (Geração de PDFs para relatórios)
bcrypt (Hashing seguro de senhas)
dotenv (Carregamento de variáveis de ambiente)
jsonwebtoken (JWT) (Autenticação baseada em tokens)
Multer (Upload de arquivos, como imagens)
Requisitos
Node.js (versão mínima recomendada: 18.x)
MySQL (versão mínima recomendada: 8.x)
Instalação
Backend


Clone o repositório:

bash
Copiar código
git clone <url-do-repositorio>
cd ProjetoIntegrador
Instale as dependências:

bash
Copiar código
npm install
Configure o banco de dados MySQL e adicione as credenciais no arquivo .env:

plaintext
Copiar código
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
Rode as migrações do Sequelize para configurar o banco de dados:

bash
Copiar código
npx sequelize-cli db:migrate
Inicie o servidor:

bash
Copiar código
npm run start
Frontend
Navegue até a pasta do frontend:

bash
Copiar código
cd client
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Uso
Cadastro de acomodações
Acesse a página de cadastro de acomodações.
Preencha o formulário com os detalhes da acomodação.
Faça o upload da imagem da acomodação (opcional).
Clique em "Cadastrar".
Gerenciamento de reservas
Acesse a página de reservas.
Visualize, finalize ou cancele reservas existentes conforme necessário.
Manutenção de usuários
Acesse a página de usuários.
Visualize, edite ou exclua usuários conforme necessário.
Contribuição
Faça um fork do projeto.
Crie uma branch para a sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Envie para o repositório remoto (git push origin feature/nova-feature).
Abra um Pull Request.

