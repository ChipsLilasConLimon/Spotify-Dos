import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import background from '../../assets/images/fondo-signup.jpg';
import { register } from '../../services/authService';
import { globalStyles } from "../../styles/global-styles";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async() => {
    setIsLoading(true);
     if (!username || !password) {
      alert(`Error, rellene todos los datos`);
      setIsLoading(false);
      return;
    }
    if (!nombre || !apellido) {
      alert(`Error, rellene todos los datos`);
      setIsLoading(false);
      return;
    }
    if (!correo) {
      alert(`Error, rellene todos los datos`);
      setIsLoading(false);
      return;
    }

    try{
      const authResponse = await register({
        Username: username,
        Password: password,
        Nombres: nombre,
        Apellidos: apellido,
        Correo: correo
      });
      setIsLoading(false);
      alert(`Registro Exitoso: ${authResponse.mensaje}`);
        router.replace("/(auth)/login");
    } catch(err){
      setIsLoading(false);
      alert(`Error al registrar: No se pudo crear`);
    }
  };


  return (
  <ImageBackground
    source={background}
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.content}>

      <Text style={styles.title}>Crear Cuenta</Text>
       {isLoading && (
                <ActivityIndicator
                  style={globalStyles.loaderLogin}
                  size="large"
                  color="#15ccbaff"
                />
              )}

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        placeholderTextColor="#999"
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="#999"
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.loginText}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>

    </View>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },

  label: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    marginTop: 10,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderColor: "#fff",
    borderWidth: 1,
  },

  button: {
    backgroundColor: "#0f8880ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginText: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
});
