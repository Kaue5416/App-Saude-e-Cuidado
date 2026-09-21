import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { DoctorInfo, ScreenName } from '../types';

interface Props {
  userName: string;
  setSelectedDoctor: (doctor: DoctorInfo) => void;
  setEditingId: (id: string | null) => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const HomeScreen: React.FC<Props> = ({ userName, setSelectedDoctor, setEditingId, setCurrentScreen }) => (
  <ScrollView style={styles.scrollContent}>
    <Text style={styles.welcomeText}>Olá, <Text style={styles.boldLink}>{userName}</Text> 👋</Text>
    <Text style={styles.pageTitle}>Agende suas consultas</Text>
    <TextInput style={styles.searchInput} placeholder="📍 Digite sua cidade ou bairro..." />

    <Text style={styles.sectionHeader}>Médicos e Clínicas Disponíveis</Text>

    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Clínica Santo Antônio</Text>
        <Text style={styles.badgeMedical}>Médico</Text>
      </View>
      <Text style={styles.cardDetail}>Dr. Pedro Souza (R$ 250,00)</Text>
      <Text style={styles.cardPhone}>Av. Boa Viagem, 1780 - Recife/PE</Text>
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => {
          setSelectedDoctor({ name: 'Dr. Pedro Souza', clinic: 'Clínica Santo Antônio', price: 'R$ 250,00', type: 'Médico' });
          setEditingId(null);
          setCurrentScreen('Agendamento');
        }}>
        <Text style={styles.cardButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Clínica AniVet</Text>
        <Text style={styles.badgeVet}>Veterinário</Text>
      </View>
      <Text style={styles.cardDetail}>Dra. Maria (R$ 170,00)</Text>
      <Text style={styles.cardPhone}>Av. Manoel Q. Tavares, 79 - Recife/PE</Text>
      <TouchableOpacity 
        style={styles.cardButton} 
        onPress={() => {
          setSelectedDoctor({ name: 'Dra. Maria', clinic: 'Clínica AniVet', price: 'R$ 170,00', type: 'Veterinário' });
          setEditingId(null);
          setCurrentScreen('Agendamento');
        }}>
        <Text style={styles.cardButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: { flex: 1, padding: 20 },
  welcomeText: { fontSize: 14, color: '#666' },
  boldLink: { color: '#00897B', fontWeight: 'bold' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 15 },
  searchInput: { backgroundColor: '#FFF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E0E0E0', marginTop: 8 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#424242', marginVertical: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#212121' },
  badgeMedical: { backgroundColor: '#E0F2F1', color: '#00796B', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  badgeVet: { backgroundColor: '#FFF3E0', color: '#E65100', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  cardDetail: { color: '#666', fontSize: 14, marginTop: 4 },
  cardPhone: { color: '#888', fontSize: 12, marginTop: 4 },
  cardButton: { backgroundColor: '#00897B', borderRadius: 8, padding: 10, marginTop: 12, alignItems: 'center' },
  cardButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});