const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabaseIfNotExists = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    // Verifica se o banco de dados existe
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);

    if (databases.length === 0) {
      console.log(`Banco de dados "${process.env.DB_NAME}" não existe. Criando...`);
      await connection.query(`CREATE DATABASE \`${process.env.DB_NAME}\``);
      console.log(`Banco de dados "${process.env.DB_NAME}" criado com sucesso.`);
    } else {
      console.log(`Banco de dados "${process.env.DB_NAME}" já existe.`);
    }

    // Fecha a conexão
    await connection.end();
  } catch (error) {
    console.error('Erro ao verificar ou criar o banco de dados:', error.message);
    process.exit(1);
  }
};

module.exports = { createDatabaseIfNotExists };
