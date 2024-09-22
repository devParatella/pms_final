const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('./config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log("DB_HOST:", dbConfig.host);
console.log("DB_USER:", dbConfig.username);
console.log("DB_PASSWORD:", dbConfig.password);
console.log("DB_NAME:", dbConfig.database);
console.log("DB_PORT:", dbConfig.port);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  timezone: 'America/Sao_Paulo',
  logging: console.log,  // Habilitar logging para depuração
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });  // Sincronizar modelos
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
