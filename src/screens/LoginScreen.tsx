import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScreenName } from '../types';

interface Props {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  handleLogin: () => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const LoginScreen: React.FC<Props> = ({ inputEmail, setInputEmail, handleLogin, setCurrentScreen }) => (
  <View style={styles.authContainer}>
    <Text style={styles.brandHeader}>S&C</Text>
    <Text style={styles.screenSubtitle}>Acesse sua conta para agendar</Text>
    <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={inputEmail} onChangeText={setInputEmail} />
    <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
      <Text style={styles.buttonText}>Entrar</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCurrentScreen('Cadastro')}>
      <Text style={styles.linkText}>Não tem conta? <Text style={styles.boldLink}>Cadastre-se</Text></Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  authContainer: { flex: 1, padding: 25, justifyContent: 'center' },
  brandHeader: { fontSize: 36, fontWeight: 'bold', color: '#00897B', textAlign: 'center' },
  screenSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 14, marginVertical: 8, fontSize: 15 },
  primaryButton: { backgroundColor: '#00897B', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#666', textAlign: 'center', marginTop: 20 },
  boldLink: { color: '#00897B', fontWeight: 'bold' },
});