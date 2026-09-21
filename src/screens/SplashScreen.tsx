import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScreenName } from '../types';

interface Props {
  setCurrentScreen: (screen: ScreenName) => void;
}

export const SplashScreen: React.FC<Props> = ({ setCurrentScreen }) => (
  <View style={styles.splashContent}>
    <View style={styles.logoBadge}><Text style={styles.logoIcon}>+</Text></View>
    <Text style={styles.logoTitle}>S&C</Text>
    <Text style={styles.splashSubtitle}>Saúde & Consulta na sua mão</Text>
    <TouchableOpacity style={styles.splashButton} onPress={() => setCurrentScreen('Login')}>
      <Text style={styles.splashButtonText}>Iniciar Atendimento</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  splashContent: { flex: 1, backgroundColor: '#00897B', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoBadge: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoIcon: { fontSize: 50, color: '#00897B', fontWeight: 'bold' },
  logoTitle: { fontSize: 42, fontWeight: 'bold', color: '#FFF' },
  splashSubtitle: { fontSize: 16, color: '#E0F2F1', marginBottom: 40 },
  splashButton: { backgroundColor: '#FFF', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 30 },
  splashButtonText: { color: '#00897B', fontWeight: 'bold', fontSize: 16 },
});