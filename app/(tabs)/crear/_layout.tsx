import { Stack } from "expo-router";
import React from 'react';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Crear" }} />
    </Stack>
  );
}