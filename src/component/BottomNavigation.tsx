import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScreenName } from '../types';

interface Props {
  currentScreen: ScreenName;
  setCurrentScreen: (screen: ScreenName) => void;
  appointmentsCount: number;
  setEditingId: (id: string | null) => void;
}

export const BottomNavigation: React.FC<Props> = ({ currentScreen, setCurrentScreen, appointmentsCount, setEditingId }) => (
  <View style={styles.navBar}>
    <TouchableOpacity style={styles.navButton} onPress={() => { setEditingId(null); setCurrentScreen('Home'); }}>
      <Text style={[styles.navText, currentScreen === 'Home' && styles.navTextActive]}>🔍 Explorar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('MeusAgendamentos')}>
      <Text style={[styles.navText, currentScreen === 'MeusAgendamentos' && styles.navTextActive]}>📅 Consultas ({appointmentsCount})</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('Perfil')}>
      <Text style={[styles.navText, currentScreen === 'Perfil' && styles.navTextActive]}>👤 Perfil</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingVertical: 12 },
  navButton: { alignItems: 'center' },
  navText: { fontSize: 13, color: '#757575', fontWeight: '500' },
  navTextActive: { color: '#00897B', fontWeight: 'bold' },
});