import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenName } from '../types';

interface Props {
  userName: string;
  userEmail: string;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const PerfilScreen: React.FC<Props> = ({ userName, userEmail, setCurrentScreen }) => (
  <ScrollView style={styles.scrollContent}>
    <Text style={styles.pageTitle}>Meu Perfil</Text>

    <View style={styles.profileBox}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
      </View>
      
      <Text style={styles.profileLabel}>Nome:</Text>
      <Text style={styles.profileName}>{userName}</Text>

      <Text style={styles.profileLabel}>E-mail:</Text>
      <Text style={styles.profileEmail}>{userEmail}</Text>
    </View>

    <TouchableOpacity style={styles.dangerButton} onPress={() => setCurrentScreen('Login')}>
      <Text style={styles.buttonText}>Sair da Conta</Text>
    </TouchableOpacity>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 15 },
  profileBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#00897B', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  profileLabel: { fontSize: 12, color: '#888', marginTop: 10 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  profileEmail: { fontSize: 15, color: '#00897B', fontWeight: '500' },
  dangerButton: { backgroundColor: '#D32F2F', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});