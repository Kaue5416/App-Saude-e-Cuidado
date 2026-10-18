import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appointment, DoctorInfo, ScreenName } from './src/types';
import { BottomNavigation } from './src/component/BottomNavigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { AgendamentoScreen } from './src/screens/AgendamentoScreen';
import { MeusAgendamentosScreen } from './src/screens/MeusAgendamentosScreen';
import { PerfilScreen } from './src/screens/PerfilScreen';
import { criarConsulta } from './src/services/api'; // Importa a função criarConsulta do serviço de API

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Splash');

  // Estado para guardar a foto de perfil globalmente no App
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Estados dinâmicos
  const [userId, setUserId] = useState('123e4567-e89b-12d3-a456-426614174000');
  const [userName, setUserName] = useState('Marcelo Ferreira');
  const [userEmail, setUserEmail] = useState('Marc99@yahoo.com.br');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Pedro Souza',
      type: 'Médico',
      clinic: 'Clínica Santo Antônio',
      date: '25/09/2026',
      time: '14:30',
      price: 'R$ 250,00'
    },
    {
      id: '2',
      doctor: 'Dra. Maria',
      type: 'Veterinário',
      clinic: 'Clínica AniVet',
      date: '16/10/2026',
      time: '15:30',
      price: 'R$ 170,00'
    }
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo>({
    name: 'Dr. Pedro Souza',
    clinic: 'Clínica Santo Antônio',
    price: 'R$ 250,00',
    type: 'Médico'
  });
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Ações
  const handleLogin = () => {
    if (inputEmail) setUserEmail(inputEmail);
    setCurrentScreen('Home');
  };

  const handleRegister = () => {
    if (inputName) setUserName(inputName);
    if (inputEmail) setUserEmail(inputEmail);
    setCurrentScreen('Home');
  };

  const handleConfirmBooking = async () => {
    if (!selectedTime) {
      Alert.alert('Atenção', 'Selecione um horário antes de confirmar.');
      return;
    }

    try {
      if (editingId) {
        setAppointments(prev => prev.map(item => item.id === editingId ? { ...item, time: selectedTime } : item));
        setEditingId(null);
      } else {
        await criarConsulta({
          usuario_id: userId,
          medico_id: (selectedDoctor as any).id || userId,
          data_hora: `2026-10-28T${selectedTime}:00`,
          observacoes: 'Agendamento feito via App React Native'
        });

        const newApp: Appointment = {
          id: Date.now().toString(),
          doctor: selectedDoctor.name,
          type: selectedDoctor.type,
          clinic: selectedDoctor.clinic,
          date: '28/10/2026',
          time: selectedTime,
          price: selectedDoctor.price
        };
        setAppointments(prev => [newApp, ...prev]);
        Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
      }
      setCurrentScreen('MeusAgendamentos');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível concluir o agendamento no servidor.');
    }
  };

  const handleStartReschedule = (item: Appointment) => {
    setEditingId(item.id);
    setSelectedDoctor({ name: item.doctor, clinic: item.clinic, price: item.price, type: item.type });
    setSelectedTime(item.time);
    setCurrentScreen('Agendamento');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(item => item.id !== id));
  };

  const showBottomNav = ['Home', 'Agendamento', 'MeusAgendamentos', 'Perfil'].includes(currentScreen);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainWrapper}>
          {currentScreen === 'Splash' && <SplashScreen setCurrentScreen={setCurrentScreen} />}
          {currentScreen === 'Login' && <LoginScreen inputEmail={inputEmail} setInputEmail={setInputEmail} handleLogin={handleLogin} setCurrentScreen={setCurrentScreen} />}
          {currentScreen === 'Cadastro' && <CadastroScreen inputName={inputName} setInputName={setInputName} inputEmail={inputEmail} setInputEmail={setInputEmail} handleRegister={handleRegister} setCurrentScreen={setCurrentScreen} />}
          {currentScreen === 'Home' && <HomeScreen userName={userName} setSelectedDoctor={setSelectedDoctor} setEditingId={setEditingId} setCurrentScreen={setCurrentScreen} />}
          {currentScreen === 'Agendamento' && <AgendamentoScreen editingId={editingId} selectedDoctor={selectedDoctor} selectedTime={selectedTime} setSelectedTime={setSelectedTime} handleConfirmBooking={handleConfirmBooking} setCurrentScreen={setCurrentScreen} />}
          {currentScreen === 'MeusAgendamentos' && <MeusAgendamentosScreen appointments={appointments} handleStartReschedule={handleStartReschedule} handleDeleteAppointment={handleDeleteAppointment} setCurrentScreen={setCurrentScreen} />}
          
          {/* PerfilScreen atualizada com as props da imagem */}
          {currentScreen === 'Perfil' && (
            <PerfilScreen 
              userName={userName} 
              userEmail={userEmail} 
              setCurrentScreen={setCurrentScreen} 
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
          )}
        </View>

        {showBottomNav && (
          <BottomNavigation 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
            appointmentsCount={appointments.length} 
            setEditingId={setEditingId} 
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  mainWrapper: { flex: 1 },
});