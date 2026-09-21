export interface Appointment {
  id: string;
  doctor: string;
  type: 'Médico' | 'Veterinário';
  clinic: string;
  date: string;
  time: string;
  price: string;
}

export type ScreenName = 'Splash' | 'Login' | 'Cadastro' | 'Home' | 'Agendamento' | 'MeusAgendamentos' | 'Perfil';

export interface DoctorInfo {
  name: string;
  clinic: string;
  price: string;
  type: 'Médico' | 'Veterinário';
}