const { pool } = require('./db'); // Certifica-te de que o caminho aponta para o teu ficheiro de conexão (ex: ./db ou ./server)

async function testarConexao() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexão bem-sucedida com o Neon!');
    console.log('📅 Hora atual do servidor da base de dados:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao conectar à base de dados:', err);
    process.exit(1);
  }
}

testarConexao();