import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { DoctorInfo, ScreenName } from '../types';

interface Props {
  editingId: string | null;
  selectedDoctor: DoctorInfo;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  handleConfirmBooking: () => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const AgendamentoScreen: React.FC<Props> = ({ editingId, selectedDoctor, selectedTime, setSelectedTime, handleConfirmBooking, setCurrentScreen }) => (
  <ScrollView style={styles.scrollContent}>
    <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
      <Text style={styles.backButton}>← Voltar para buscas</Text>
    </TouchableOpacity>

    <Text style={styles.pageTitle}>{editingId ? 'Reagendar Horário' : 'Novo Agendamento'}</Text>

    <View style={styles.summaryBox}>
      <Text style={styles.summaryTitle}>{selectedDoctor.name}</Text>
      <Text style={styles.cardDetail}>{selectedDoctor.clinic}</Text>
      <Text style={styles.summaryPrice}>{selectedDoctor.price}</Text>
    </View>

    <Text style={styles.sectionHeader}>Selecione um horário:</Text>
    <View style={styles.timeGrid}>
      {['13:30', '14:30', '15:00', '15:30', '16:00'].map((time) => (
        <TouchableOpacity 
          key={time} 
          style={[styles.timeSlot, selectedTime === time && styles.timeSlotSelected]}
          onPress={() => setSelectedTime(time)}>
          <Text style={[styles.timeText, selectedTime === time && styles.timeTextSelected]}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity style={styles.primaryButton} onPress={handleConfirmBooking}>
      <Text style={styles.buttonText}>{editingId ? 'Salvar Novo Horário' : 'Confirmar Agendamento'}</Text>
    </TouchableOpacity>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: { flex: 1, padding: 20 },
  backButton: { color: '#00897B', fontWeight: 'bold', marginBottom: 15 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 15 },
  summaryBox: { backgroundColor: '#E0F2F1', padding: 16, borderRadius: 10, alignItems: 'center' },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#004D40' },
  cardDetail: { color: '#666', fontSize: 14, marginTop: 4 },
  summaryPrice: { fontSize: 18, fontWeight: 'bold', color: '#00796B', marginTop: 4 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#424242', marginVertical: 15 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '30%', backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', marginBottom: 10 },
  timeSlotSelected: { backgroundColor: '#00897B', borderColor: '#00897B' },
  timeText: { color: '#333', fontWeight: 'bold' },
  timeTextSelected: { color: '#FFF' },
  primaryButton: { backgroundColor: '#00897B', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});