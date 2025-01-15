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
  const {
    tipo,
    setor,
    usuario,
    memoria_ram,
    armazenamento,
    id_teamviewer,
    sistema_operacional,
    versao,
  } = req.body;

  // Padronizar o tipo para minúsculas
  const tipoFormatado = tipo.toLowerCase();

  pool.query(
    'INSERT INTO equipamentos (tipo, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [tipoFormatado, setor, usuario, memoria_ram, armazenamento, id_teamviewer, sistema_operacional, versao],
    (error, results) => {
      if (error) {
        console.error('Erro ao adicionar equipamento:', error);
        return res.status(500).send('Erro ao adicionar o equipamento');
      }

      // Retorna o equipamento recém-adicionado
      res.status(201).json(results.rows[0]);
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

router.get('/equipamentos/contagem', (req, res) => {
  pool.query(
    `SELECT tipo, COUNT(*)::int as count
     FROM equipamentos
     WHERE tipo = 'notebook' OR tipo = 'desktop'
     GROUP BY tipo`,
    (err, result) => {
      if (err) {
        console.error('Erro ao consultar a contagem de equipamentos:', err);
        return res.status(500).json({ error: 'Erro ao obter a contagem.' });
      }

      // Inicializando os contadores
      const count = { notebooks: 0, desktops: 0 };

      // Percorrendo os resultados para preencher a contagem de notebooks e desktops
      result.rows.forEach(row => {
        if (row.tipo === 'notebook') {
          count.notebooks = row.count;
        }
        if (row.tipo === 'desktop') {
          count.desktops = row.count;
        }
      });

      // Retorna o total de notebooks e desktops
      res.json(count);
    }
  );
});


module.exports = router;
