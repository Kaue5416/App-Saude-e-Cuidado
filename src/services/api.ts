const API_URL = 'http://192.168.1.108:3000/api';

// Serviço para buscar médicos (UC02 / UC07)
export async function getMedicos(especialidade?: string){
    try{
        let url = `${API_URL}/medicos`;
        if (especialidade) {
            url += `?especialidade=${encodeURIComponent(especialidade)}`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error ao buscar medicos:", error);
        return [];
    }
}

// Serviço para listar consultas do usuário (UC09)
export async function getConsultas(usuarioId: string) {
    try {
        const response = await fetch(`${API_URL}/consultas/usuario/${usuarioId}`);
        return await response.json();
    } catch (error) {
        console.error("Error ao buscar consultas:", error);
        return [];
    }
}

// Serviço para criar agendamento (UC04)
export async function criarConsulta(dados: { 
  usuario_id: string; 
  medico_id: string; 
  data_hora: string; 
  observacoes?: string 
}) {
  try {
    const response = await fetch(`${API_URL}/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
}

