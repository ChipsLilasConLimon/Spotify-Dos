import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from "react-native";
import CerrarSesionButton from '../../../components/CerrarSesionPressable';
import { removeAuthToken } from '../../../services/apiClient';

export default function PerfilUsuario() {
  const router = useRouter();

  const handleCerrarSesion = async  () => {
    try{
    await removeAuthToken();
    Alert.alert('Cierre de Sesión', 'Se cerró sesión correctamente');
    router.push('/(auth)/login');
    }catch{
      Alert.alert('Error', 'No se cerró sesión');
    }
  };

  return (
    <>
    <View style= {styles.container}>
       <Text> Esta es el perfil del usuario</Text>
       <CerrarSesionButton onPress={handleCerrarSesion}></CerrarSesionButton>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
});