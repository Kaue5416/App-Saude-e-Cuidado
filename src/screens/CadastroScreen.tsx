import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScreenName } from '../types';

interface Props {
  inputName: string;
  setInputName: (name: string) => void;
  inputEmail: string;
  setInputEmail: (email: string) => void;
  handleRegister: () => void;
  setCurrentScreen: (screen: ScreenName) => void;
}

export const CadastroScreen: React.FC<Props> = ({ inputName, setInputName, inputEmail, setInputEmail, handleRegister, setCurrentScreen }) => (
  <View style={styles.authContainer}>
    <Text style={styles.brandHeader}>Criar Conta</Text>
    <Text style={styles.screenSubtitle}>Preencha seus dados para começar</Text>
    <TextInput style={styles.input} placeholder="Nome Completo" value={inputName} onChangeText={setInputName} />
    <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={inputEmail} onChangeText={setInputEmail} />
    <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
    <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
      <Text style={styles.buttonText}>Finalizar Cadastro</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
      <Text style={styles.linkText}>Já tem conta? <Text style={styles.boldLink}>Fazer Login</Text></Text>
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