import "axios";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, TextInput, View, } from "react-native";
import backgroundImage from "../../assets/images/background-login.jpg";
import discordImage from "../../assets/images/discord-logo.png";
import logoImage from "../../assets/images/logos/logo-3.png";
import { login } from "../../services/authService";
import { globalStyles } from "../../styles/global-styles";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectUri =
    "https://uncaptivated-nonflexibly-denzel.ngrok-free.dev/api/auth/discord";

  // LOGIN DISCORD
  const handleDiscordLogin = async () => {
    const clientId = "1441224661294907462";

    const authUrl =
      "https://discord.com/api/oauth2/authorize" +
      `?client_id=${clientId}` +
      "&response_type=code" +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      "&scope=identify%20email";

    console.log("URL enviada a Discord:", authUrl);

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      console.log("RESULTADO DEL OAUTH:", result);

      if (result.type === "success") {
        console.log("OAuth cerrado correctamente.");
      } else {
        console.log("OAuth cancelado.");
      }

    } catch (err) {
      console.error("Error en DiscordLogin:", err);
    } finally {
      try {
        await WebBrowser.dismissBrowser();
      } catch (e) {}
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, ingresa usuario y contraseña.");
      return;
    }
    const handleSignUp = async () => {
      router.push('/(auth)/register');
    }

    setIsLoading(true);
    setError("");

    try {
      const authResponse = await login(username, password);
      alert(`Inicio Exitoso: ${authResponse.mensaje}`);

      if (authResponse.rol === "USER") {
        router.replace(`/(tabs)/main`);
      } else {
        router.replace(`/(tabs)/main`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.containerLogin}>
      <Image source={backgroundImage} style={globalStyles.backgroundImageLogin} />

      <View style={globalStyles.headerLogin}>
        <Text style={globalStyles.headerTitleLogin}>Iniciar Sesión</Text>
        <Image source={logoImage} style={globalStyles.logoImageLogin} />
      </View>

      <View style={globalStyles.cardInputLogin}>
        {isLoading && (
          <ActivityIndicator
            style={globalStyles.loaderLogin}
            size="large"
            color="#0000ff"
          />
        )}

        <Text style={globalStyles.labelLogin}>Usuario o Correo electrónico</Text>
        <TextInput
          style={globalStyles.inputLogin}
          placeholder="Ingresar usuario"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={globalStyles.labelLogin}>Contraseña</Text>
        <TextInput
          style={globalStyles.inputLogin}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text style={globalStyles.errorTextLogin}>{error}</Text>
        ) : null}

        <Pressable
          style={globalStyles.buttonLogin}
          onPress={handleLogin}
          disabled={isLoading}
        >
        <Text style={globalStyles.buttonTextLogin}>Iniciar Sesión</Text>
        </Pressable>
         <Pressable
          style={globalStyles.buttonRegisterLogin}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={globalStyles.buttonTextLogin}>Registrarte</Text>
        </Pressable>

        <View style={globalStyles.dividerLogin} />
        <Text style={globalStyles.headerSubtitleLogin}>
          INICIA SESIÓN CON REDES SOCIALES
        </Text>

        {/* BOTÓN DISCORD */}
        <Pressable
          onPress={handleDiscordLogin}
          style={globalStyles.buttomDiscodLogin}
        >
          <Image
            source={discordImage}
            style={globalStyles.logoImageDiscordLogin}
          />
        </Pressable>
      </View>
    </View>
  );
}
