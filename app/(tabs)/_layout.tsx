import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'react-native';
import { MenuProvider } from "react-native-popup-menu";
import { GlobalProvider } from "../../contexts/global-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <MenuProvider>
      <GlobalProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      
      <Tabs.Screen
        name="main"
        options={{
          tabBarLabel: 'Inicio',
          title: 'Inicio',
          tabBarIcon: ({ color }) =>
            <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: 'Buscar',
          title: 'Buscar',
          tabBarIcon: () => (
        <Image
        source={require('../../assets/images/lupalogo.png')}
        style={{ width: 22, height: 22, resizeMode: 'contain', marginBottom: -4 }}
      />
    )
        }}
      />
      <Tabs.Screen
        name="crear"
        options={{
          tabBarLabel: 'Crear',
          title: 'Crear',
          tabBarIcon: () => (
        <Image
        source={require('../../assets/images/crear-logo.png')}
        style={{ width: 22, height: 22, resizeMode: 'contain', marginBottom: -4 }}
      />
    )
        }}
      />

      <Tabs.Screen
  name="cuenta"
  options={{
    tabBarLabel: 'Perfil',
    title: 'Perfil',
    tabBarIcon: () => (
      <Image
        source={require('../../assets/images/logo-user-tab.png')}
        style={{ width: 22, height: 22, resizeMode: 'contain', marginBottom: -4 }}
      />
    )
  }}
/>
    </Tabs>
    </GlobalProvider>
    </MenuProvider>
    </>
  );
}
