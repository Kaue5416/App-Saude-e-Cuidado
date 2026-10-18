// Exemplo de configuração do endereço base
const API_URL = 'http://192.168.1.108:3000/api'; // Ajusta para o teu IP local ou emulador

// Exemplo 1: Fazer Login (UC01)
async function fazerLogin(email, senha) {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login');
    }

    console.log('Login bem-sucedido:', data);
    return data; // Aqui tens os dados do utilizador (id, nome, etc.)
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    alert(error.message);
  }
}

// Exemplo 2: Listar Médicos (UC02)
async function buscarMedicos() {
  try {
    const response = await fetch(`${API_URL}/medicos`);
    const data = await response.json();
    
    console.log('Lista de médicos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
  }
}