import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
       <Stack.Screen name="ver-playlist" options={{ title: "Playlist" }} />
       <Stack.Screen name="ver-artista" options={{ title: "Artista" }} />
    </Stack>
  );
}