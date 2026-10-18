const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { pool } = require('./db'); // Importa o pool do db.js

const app = express();
app.use(cors());
app.use(express.json()); //recebe o JSON no corpo da requisição

// =================================================================
// ROTAS / ENDPOINTS DA API
// =================================================================

// 1. UC01 - Cadastrar Usuário

app.post('/api/usuarios/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, telefone) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, telefone',
      [nome, email, senha, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// UC01 (Complemento) - Login de Utilizador
app.post('/api/usuarios/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const result = await pool.query(
      'SELECT id, nome, email, telefone FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// 2. UC02 & UC07 - Listar Médicos / Filtrar por Especialidade
app.get('/api/medicos', async (req, res) => {
  try {
    const { especialidade } = req.query;
    let query = 'SELECT * FROM medicos';
    let params = [];

    if (especialidade) {
      query += ' WHERE LOWER(especialidade) LIKE LOWER($1)';
      params.push(`%${especialidade}%`);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar médicos' });
  }
});

// 3. UC03 - Obter Horários Ocupados/Disponíveis de um Médico num dia
app.get('/api/medicos/:medico_id/horarios', async (req, res) => {
  try {
    const { medico_id } = req.params;
    const { data } = req.query; // Formato esperado: 'YYYY-MM-DD'
    
    const result = await pool.query(
      `SELECT data_hora FROM consultas 
       WHERE medico_id = $1 
       AND DATE(data_hora) = $2 
       AND status != 'CANCELADO'`,
      [medico_id, data]
    );
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar horários' });
  }
});

// 4. UC04 - Criar Novo Agendamento
app.post('/api/consultas', async (req, res) => {
  try {
    const { usuario_id, medico_id, data_hora, observacoes } = req.body;
    const result = await pool.query(
      'INSERT INTO consultas (usuario_id, medico_id, data_hora, observacoes) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, medico_id, data_hora, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao agendar consulta' });
  }
});

// 5. UC05 - Reagendar Consulta (Atualizar data/hora)
app.put('/api/consultas/:id/reagendar', async (req, res) => {
  try {
    const { id } = req.params;
    const { nova_data_hora } = req.body;
    const result = await pool.query(
      "UPDATE consultas SET data_hora = $1, status = 'REAGENDADO' WHERE id = $2 RETURNING *",
      [nova_data_hora, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao reagendar consulta' });
  }
});

// 6. UC06 - Cancelar Consulta
app.delete('/api/consultas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "UPDATE consultas SET status = 'CANCELADO' WHERE id = $1",
      [id]
    );
    res.json({ message: 'Consulta cancelada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cancelar consulta' });
  }
});

// 7. UC08 - Atualizar Perfil do Usuário
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    
    const result = await pool.query(
      `UPDATE usuarios 
       SET nome = COALESCE($1, nome), 
           telefone = COALESCE($2, telefone) 
       WHERE id = $3 
       RETURNING id, nome, email, telefone`,
      [nome, telefone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

// 8. UC09 - Listar Consultas do Usuário (Histórico e Ativas)
app.get('/api/consultas/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const result = await pool.query(
      `SELECT c.id, c.data_hora, c.status, c.observacoes, m.nome AS medico_nome, m.especialidade 
       FROM consultas c 
       JOIN medicos m ON c.medico_id = m.id 
       WHERE c.usuario_id = $1 
       ORDER BY c.data_hora DESC`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar consultas' });
  }
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Função para criar as tabelas automaticamente ao iniciar a API
async function criarTabelasAutomaticamente() {
  try {
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(sql); // Certifica-te de que 'pool' é a tua conexão do pg
      console.log('✅ Tabelas verificadas/criadas com sucesso na base de dados!');
    }
  } catch (err) {
    console.error('❌ Erro ao criar tabelas automaticamente:', err);
  }
}

// Chama a função assim que o servidor arranca
criarTabelasAutomaticamente();