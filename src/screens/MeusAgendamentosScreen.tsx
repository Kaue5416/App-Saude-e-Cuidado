import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Appointment, ScreenName } from '../types';

interface Props {
  appointments: Appointment[];
  handleStartReschedule: (item: Appointment) => void;
  handleDeleteAppointment: (id: string) => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const MeusAgendamentosScreen: React.FC<Props> = ({ appointments, handleStartReschedule, handleDeleteAppointment, setCurrentScreen }) => (
  <ScrollView style={styles.scrollContent}>
    <Text style={styles.pageTitle}>Minhas Consultas ({appointments.length})</Text>

    {appointments.length === 0 ? (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Você não tem nenhuma consulta agendada.</Text>
        <TouchableOpacity style={styles.cardButton} onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.cardButtonText}>Buscar Médicos</Text>
        </TouchableOpacity>
      </View>
    ) : (
      appointments.map(item => (
        <View key={item.id} style={styles.appointmentCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.appointmentStatus}>🟢 Confirmado</Text>
            <Text style={item.type === 'Médico' ? styles.badgeMedical : styles.badgeVet}>{item.type}</Text>
          </View>
          
          <Text style={styles.cardTitle}>{item.doctor}</Text>
          <Text style={styles.cardDetail}>📍 {item.clinic}</Text>
          <Text style={styles.cardDetail}>📅 {item.date} às <Text style={styles.boldText}>{item.time}</Text></Text>
          <Text style={styles.cardPrice}>Valor: {item.price}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={() => handleStartReschedule(item)}>
              <Text style={styles.actionTextOutline}>🔄 Reagendar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnDanger} onPress={() => handleDeleteAppointment(item.id)}>
              <Text style={styles.actionTextDanger}>🗑️ Apagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 15 },
  emptyBox: { alignItems: 'center', padding: 30 },
  emptyText: { color: '#888', fontSize: 16, marginBottom: 15 },
  cardButton: { backgroundColor: '#00897B', borderRadius: 8, padding: 10, marginTop: 12, alignItems: 'center' },
  cardButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  appointmentCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appointmentStatus: { fontSize: 12, fontWeight: 'bold', color: '#2E7D32' },
  badgeMedical: { backgroundColor: '#E0F2F1', color: '#00796B', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  badgeVet: { backgroundColor: '#FFF3E0', color: '#E65100', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#212121', marginTop: 8 },
  cardDetail: { color: '#666', fontSize: 14, marginTop: 4 },
  boldText: { fontWeight: 'bold', color: '#00897B' },
  cardPrice: { color: '#00897B', fontWeight: 'bold', marginTop: 6 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  actionBtnOutline: { flex: 1, borderWidth: 1, borderColor: '#00897B', padding: 10, borderRadius: 8, alignItems: 'center', marginRight: 6 },
  actionTextOutline: { color: '#00897B', fontWeight: 'bold', fontSize: 13 },
  actionBtnDanger: { flex: 1, borderWidth: 1, borderColor: '#D32F2F', padding: 10, borderRadius: 8, alignItems: 'center', marginLeft: 6 },
  actionTextDanger: { color: '#D32F2F', fontWeight: 'bold', fontSize: 13 },
});