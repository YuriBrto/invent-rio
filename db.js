const { Pool } = require('pg');  // Usando o pacote 'pg' para PostgreSQL
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const pool = new Pool({
  user: process.env.PG_USER,             // Usuário do banco (deve estar no .env)
  host: process.env.PG_HOST || 'localhost',  // Host onde o banco está (localhost por padrão)
  database: process.env.PG_DATABASE,     // Nome do banco (deve estar no .env)
  password: process.env.PG_PASSWORD,     // Senha do banco (deve estar no .env)
  port: process.env.PG_PORT || 5432,      // Porta do PostgreSQL (5432 por padrão)
});

// Verifica a conexão assim que o pool é inicializado
pool.connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch((err) => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = pool;  // Exporte a configuração de conexão
