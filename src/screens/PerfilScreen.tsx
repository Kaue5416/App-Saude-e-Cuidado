import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // usa o expo-image-picker para selecionar imagens da galeria
import { ScreenName } from '../types';

interface Props {
  userName: string;
  userEmail: string;
  setCurrentScreen: (screen: ScreenName) => void;
  profileImage: string | null;                     // Recebe a foto do pai
  setProfileImage: (uri: string | null) => void;   // Recebe a função para atualizar a foto
}

export const PerfilScreen: React.FC<Props> = ({ 
  userName, 
  userEmail, 
  setCurrentScreen, 
  profileImage, 
  setProfileImage 
}) => {

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Precisas de dar permissão para aceder à galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Atualiza no componente pai, garantindo que persiste ao mudar de ecrã
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.scrollContent}>
      <Text style={styles.pageTitle}>Meu Perfil</Text>

      <View style={styles.profileBox}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Clica no avatar para alterar a foto</Text>

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
};

const styles = StyleSheet.create({
  scrollContent: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#212121', marginBottom: 15 },
  profileBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#00897B', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  avatarImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 5 },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  helperText: { fontSize: 10, color: '#888', marginBottom: 15 },
  profileLabel: { fontSize: 12, color: '#888', marginTop: 10 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  profileEmail: { fontSize: 15, color: '#00897B', fontWeight: '500' },
  dangerButton: { backgroundColor: '#D32F2F', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});