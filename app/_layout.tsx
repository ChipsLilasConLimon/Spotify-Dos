import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'auth',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Aquí podrías leer AsyncStorage o contexto global
    // para saber si el usuario está logueado.
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Si está logueado, mostramos las tabs
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
        // Si no está logueado, mostramos login/registro
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      )}
    </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
