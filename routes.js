const express = require('express');
const pool = require('./db');
const router = express.Router();

// Rota de boas-vindas
router.get('/', (req, res) => {
  res.send('Bem-vindo à API de Equipamentos');
});

// Rota para listar equipamentos
router.get('/equipamentos', (req, res) => {
  pool.query('SELECT * FROM equipamentos', (err, result) => {
    if (err) {
      console.error('Erro ao consultar equipamentos:', err);
      return res.status(500).json({ error: 'Erro ao consultar equipamentos' });
    }
    res.json(result.rows);
  });
});

// Rota para buscar um equipamento específico
router.get('/equipamentos/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM equipamentos WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Erro ao consultar equipamento:', err);
      return res.status(500).json({ error: 'Erro ao consultar equipamento' });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    res.json(result.rows[0]);
  });
});

// Rota POST para adicionar um novo equipamento
router.post('/equipamentos', (req, res) => {
  const { tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao } = req.body;

  pool.query(
    'INSERT INTO equipamentos (tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao],
    (err, result) => {
      if (err) {
        console.error('Erro ao adicionar equipamento:', err);
        return res.status(500).json({ error: 'Erro ao adicionar equipamento' });
      }
      res.status(201).json({ message: 'Equipamento adicionado com sucesso' });
    }
  );
});

// Rota PUT para editar um equipamento existente
router.put('/equipamentos/:id', (req, res) => {
  const id = req.params.id;
  const { tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao } = req.body;

  pool.query(
    'UPDATE equipamentos SET tipo = $1, setor = $2, usuario = $3, memoria_ram = $4, armazenamento = $5, id_teamviewer = $6, sistema_operacional = $7, versao = $8 WHERE id = $9',
    [tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao editar equipamento:', err);
        return res.status(500).json({ error: 'Erro ao editar equipamento' });
      }
      res.json({ message: 'Equipamento atualizado com sucesso' });
    }
  );
});

// Rota DELETE para excluir um equipamento
router.delete('/equipamentos/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM equipamentos WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir equipamento:', err);
      return res.status(500).json({ error: 'Erro ao excluir equipamento' });
    }
    res.json({ message: 'Equipamento excluído com sucesso' });
  });
});

// Rota para contar equipamentos
router.get('/equipamentos/contagem', (req, res) => {
  const query = `
    SELECT
      COUNT(*) FILTER (WHERE LOWER(tipo) = 'notebook') AS notebooks,
      COUNT(*) FILTER (WHERE LOWER(tipo) = 'desktop') AS desktops
    FROM equipamentos;
  `;

  pool.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao contar equipamentos:', err);
      return res.status(500).json({ error: 'Erro ao contar equipamentos' });
    }
    res.json(result.rows[0]); // Retorna a contagem de notebooks e desktops
  });
});

// Rota para atualizar contagem após a adição (opcional)
router.post('/equipamentos/atualizar-contagem', (req, res) => {
  const { tipo } = req.body;
  res.json({ message: `Contagem de ${tipo} atualizada` });
});

module.exports = router;
