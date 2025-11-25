import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function DiscordRedirectScreen() {
  const { token, rol } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    console.log("TOKEN:", token);
    console.log("ROL:", rol);

    if (token) {
      // Aquí decides a dónde mandarlo
      router.replace("/(auth)/login");
    }
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Procesando login con Discord...</Text>
    </View>
  );
}
