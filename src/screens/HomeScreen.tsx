import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { DoctorInfo, ScreenName } from '../types';
import { getMedicos } from '../services/api'; // Importa o serviço que criámos

interface Props {
  userName: string;
  setSelectedDoctor: (doctor: DoctorInfo) => void;
  setEditingId: (id: string | null) => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const HomeScreen: React.FC<Props> = ({ userName, setSelectedDoctor, setEditingId, setCurrentScreen }) => {
  const [medicos, setMedicos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  // Carrega os médicos da API ao abrir a tela ou ao filtrar
  const carregarDados = async (especialidadeFiltro?: string) => {
    setLoading(true);
    const dados = await getMedicos(especialidadeFiltro);
    setMedicos(dados);
    setLoading(false);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handlePesquisa = (texto: string) => {
    setBusca(texto);
    carregarDados(texto);
  };

  return (
    <ScrollView style={styles.scrollContent}>
      <Text style={styles.welcomeText}>Olá, <Text style={styles.boldLink}>{userName}</Text> 👋</Text>
      <Text style={styles.pageTitle}>Agende suas consultas</Text>
      
      {/* UC07 - Campo de busca por especialidade */}
      <TextInput 
        style={styles.searchInput} 
        placeholder="📍 Digite a especialidade (ex: Cardiologia)..." 
        value={busca}
        onChangeText={handlePesquisa}
      />

      <Text style={styles.sectionHeader}>Médicos e Clínicas Disponíveis</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00897B" style={{ marginTop: 20 }} />
      ) : (
        medicos.map((item) => (
          <View style={styles.card} key={item.id}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={item.especialidade === 'Veterinária' ? styles.badgeVet : styles.badgeMedical}>
                {item.especialidade}
              </Text>
            </View>
            <Text style={styles.cardDetail}>CRM: {item.crm} (R$ {Number(item.valor_consulta).toFixed(2)})</Text>
            <TouchableOpacity 
              style={styles.cardButton} 
              onPress={() => {
                setSelectedDoctor({ 
                  name: item.nome, 
                  clinic: item.especialidade, 
                  price: `R$ ${Number(item.valor_consulta).toFixed(2)}`, 
                  type: item.especialidade 
                });
                setEditingId(null);
                setCurrentScreen('Agendamento');
              }}>
              <Text style={styles.cardButtonText}>Agendar Consulta</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

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
  cardButton: { backgroundColor: '#00897B', borderRadius: 8, padding: 10, marginTop: 12, alignItems: 'center' },
  cardButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
});