import { Stack } from "expo-router";
import React from 'react';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
      <Stack.Screen name="configuracion" options={{ title: "Configuracion" }} />
      <Stack.Screen name="ver-megusta" options={{ title: "Me Gusta" }} />
      <Stack.Screen name="ver-playlist-usuario" options={{ title: "Playlist" }} />
    </Stack>
  );
}