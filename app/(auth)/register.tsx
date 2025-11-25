import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { register } from '../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async() => {
     if (!username || !password) {
      alert(`Error, Por favor, rellene todos los datos`);
      return;
    }
    if (!apellidoP || !apellidoM) {
      alert(`Error, Por favor, rellene todos los datos`);
      return;
    }
    if (!name) {
      alert(`Error, Por favor, rellene todos los datos`);
      return;
    }

    try{
      const authResponse = await register({
        NombreUsuario: username,
        PasswordUsuario: password,
        Nombre: name,
        ApellidoPaterno: apellidoP,
        ApellidoMaterno: apellidoM
      });
      console.log('authResponse:', authResponse);
       alert(`Inicio Exitoso: ${authResponse.mensaje}`);
        router.replace("/(auth)/login");
    } catch(err){
      console.error('Login error:', err);
      alert(`Error al registrar: No se pudo crear`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>
        Crear Cuenta
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Apellido Paterno</Text>
      <TextInput
        placeholder="Apellido Paterno"
        value={apellidoP}
        onChangeText={setApellidoP}
         style={styles.input}
      />
       <Text style={styles.label}>Apellido Materno</Text>
      <TextInput
        placeholder="Apellido Materno"
        value={apellidoM}
        onChangeText={setApellidoM}
        style={styles.input}
      />
      <Text style={styles.label}>Nombre de Usuario</Text>
      <TextInput
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
         style={styles.input}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
         style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
       <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 15 }}>
          
        <Text style={{ textAlign: "center", color: "blue" }}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#D8D8D8',
    fontSize: 14,
    marginTop: 5,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircleLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  logoCircleSmallLeft: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    position: 'absolute',
    left: -40,
    top: 30,
  },
  logoCircleSmallRight: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    position: 'absolute',
    right: -40,
    top: 30,
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
  },
  loader: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonregister: {
    backgroundColor: '#144779ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
