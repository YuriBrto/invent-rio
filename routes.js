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

// Rota para buscar um equipamento específico (GET)
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
    res.json(result.rows[0]);  // Retorna o equipamento encontrado
  });
});

// Rota POST para adicionar um novo equipamento
router.post('/equipamentos', (req, res) => {
  const { tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao } = req.body;
  pool.query(
    'INSERT INTO equipamentos (tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).json(results.rows[0]);  // Retorna o equipamento recém-adicionado
    }
  );
});

// Rota PUT para editar um equipamento existente
router.put('/equipamentos/:id', (req, res) => {
  const id = req.params.id;
  const { tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao } = req.body;

  // Verifica se todos os dados necessários foram fornecidos
  if (!tipo || !setor || !usuario || !memoria_ram || !armazenamento || !id_teamviewer || !sistema_operacional || !versao) {
    return res.status(400).json({ error: 'Todos os campos são necessários' });
  }

  // Atualiza o equipamento no banco de dados
  pool.query(
    'UPDATE equipamentos SET tipo = $1, setor = $2, usuario = $3, memoria_ram = $4, armazenamento = $5, id_teamviewer = $6, sistema_operacional = $7, versao = $8 WHERE id = $9 RETURNING *',
    [tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o equipamento' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Equipamento não encontrado' });
      }
      res.json(results.rows[0]);  // Retorna o equipamento atualizado
    }
  );
});

// Rota para excluir um equipamento
router.delete('/equipamentos/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM equipamentos WHERE id = $1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir equipamento:', err);
      return res.status(500).json({ error: 'Erro ao excluir equipamento' });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    res.json({ message: 'Equipamento excluído com sucesso', equipamento: result.rows[0] });
  });
});

module.exports = router;
