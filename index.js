const express = require('express');
const cors = require('cors'); // Importa o pacote CORS
const pool = require('./db'); // Conexão com o banco de dados
const router = require('./routes'); // Suas rotas

const app = express();
const port = 3000;

// Configura o CORS
app.use(cors()); // Permite todas as origens, mas pode ser configurado de outra forma
app.use(express.json()); // Para aceitar JSON no corpo das requisições

// Roteia as requisições para o arquivo routes
app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
