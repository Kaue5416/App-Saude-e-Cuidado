-- Garante a extensão para gerar UUIDs (caso ainda não esteja ativa)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Tabela de Usuários (Pacientes)
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Médicos / Veterinários
CREATE TABLE IF NOT EXISTS medicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    crm VARCHAR(20) UNIQUE NOT NULL,
    valor_consulta DECIMAL(10, 2) NOT NULL
);

-- 3. Tabela de Consultas (Relaciona Usuário e Médico)
CREATE TABLE IF NOT EXISTS consultas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    medico_id UUID NOT NULL REFERENCES medicos(id) ON DELETE CASCADE,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'AGENDADO', -- AGENDADO, REAGENDADO, CANCELADO, CONCLUIDO
    observacoes TEXT
);

-- Dados Iniciais para Testes (Opcional)
INSERT INTO medicos (nome, especialidade, crm, valor_consulta) VALUES
('Dra. Ana Silva', 'Cardiologia', 'CRM/SP 123456', 250.00),
('Dr. Carlos Oliveira', 'Pediatria', 'CRM/SP 654321', 200.00),
('Dra. Mariana Costa', 'Veterinária', 'CRMV/SP 98765', 180.00)
ON CONFLICT (crm) DO NOTHING;