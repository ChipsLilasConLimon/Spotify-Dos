import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import CerrarSesionButton from '../../../components/CerrarSesionPressable';
import { initialUserData, initialUserRegister, useGlobalStore } from "../../../contexts/global-context";
import { postPostearImagenAlbum } from '../../../services/playlistService';
import { postActualizarApellidoUsuario, postActualizarDescripcioUsuario, postActualizarImagenUsuario, postActualizarNombreUsuario } from "../../../services/usuariosdatosService";
import { useAuthStore } from "../../../store/authStore";
import { configuracionStyles } from "../../../styles/configuracion-styles";

export default function ConfiguracionScreen() {
  const { userData, setUserData,userRegister, setUserRegister,playlists, setPlaylists,playlistDetalles, setPlaylistDetalles} = useGlobalStore();
  const [cambiarnombre, setCambiarNombre] = useState(false);
  const [cambiarapellido, setCambiarApellido] = useState(false);
  const router = useRouter();
  const logoutStorage = useAuthStore((state: any) => state.logoutStorge);
  

  // ABRIR GALERIA
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Necesitas dar permiso a la galería");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      base64: true,
    });
    if (!result.canceled) {
      setUserData({ ...userData, url_Perfil: result.assets[0].base64! });
    }
  };

  const handleEliminarImagenSeleccionada = () => {
     setUserData({ ...userData, url_Perfil: "" });
  };

  const handleGuardarImagen = async() => {
    let urlImagen = "";
        if(userData.url_Perfil !== "") {
          urlImagen = await postPostearImagenAlbum(userData.url_Perfil);
          if(urlImagen === null){
            alert(`No se pudo subir la imagen`);
            return;
          }
          const respuesta = await postActualizarImagenUsuario(urlImagen);
          setUserData({ ...userData, url_Perfil: urlImagen });
          alert(`Se actualizó la imagen`);
        }
  };
  const handleGuardarNombre = async() => {
    if(cambiarnombre){
      try{
    const data = await postActualizarNombreUsuario(userRegister.nombre_Usuario);
    Alert.alert('Exito', 'Se actulizo el nombre correctamente');
    }catch(Error){
      Alert.alert('Error Inesperado');
    }
      setCambiarNombre(false);
      return
    }
    setCambiarNombre(true);
  };
  const handleGuardarApellido = async() => {
    if(cambiarapellido){
      try{
    const data = await postActualizarApellidoUsuario(userRegister.apellido_Usuario);
    Alert.alert('Exito', 'Se actulizo el apelldio correctamente');
    }catch(Error){
      Alert.alert('Error Inesperado');
    }
      setCambiarApellido(false);
      return
    }
    setCambiarApellido(true);

  }
   const handleGuardarDescripcion = async() => {
    if(userData.descripcion === ""){
      Alert.alert('Eror', 'Introduce un texto');
      return
    }
    try{
      const data = await postActualizarDescripcioUsuario(userData.descripcion)
      Alert.alert('Exito', 'Se actulizo la descripcion correctamente');
    } catch(Error){
      console.log("Error");
    }
   }
  const handleCerrarSesion = async  () => {
      try{
    setUserData(initialUserData);
    setUserRegister(initialUserRegister);
    setPlaylists([]);
    setPlaylistDetalles({});
    logoutStorage();
        
      Alert.alert('Cierre de Sesión', 'Se cerró sesión correctamente');
      router.replace('/(auth)/login');
      }catch{
        Alert.alert('Error', 'No se cerró sesión');
      }
    };

 return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#000" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text style={configuracionStyles.tituloPrincipalConfiguracion}>
        Configuración
      </Text>

      <View>
        <Text style={configuracionStyles.seccionTituloConfiguracion}>
          Datos Personales
        </Text>

        <Text style={configuracionStyles.labelConfiguracion}>Nombre(s):</Text>

        {cambiarnombre ? (
          <TextInput
          placeholder="Nombre"
          maxLength={30   }
          placeholderTextColor="#777"
          value={userRegister.nombre_Usuario || ""}
          onChangeText={(text) =>setUserRegister({ ...userRegister, nombre_Usuario: text })}
          style={configuracionStyles.inputConfiguracion}
        />
        ) : (
          <Text style={configuracionStyles.seccionTituloConfiguracion}>{userRegister.nombre_Usuario || ""}</Text>
        )}
        <View style={{ marginTop: 12 }}>
         <Pressable style={configuracionStyles.editProfileButton} onPress={handleGuardarNombre}>
           {cambiarnombre ? (
            <Text style={configuracionStyles.editProfileButtonText}>GUARDAR GUARDAR</Text>
          ) : (
             <Text style={configuracionStyles.editProfileButtonText}>EDITAR NOMBRE</Text>
          )}
          </Pressable>
        </View>
         <View style={{ marginTop: 18 }}></View>
       
        {cambiarapellido ? (
          <TextInput
          placeholder="Apellido"
          maxLength={50}
          placeholderTextColor="#777"
          value={userRegister.apellido_Usuario || ""}
          onChangeText={(text) =>setUserRegister({ ...userRegister, apellido_Usuario: text })}
          style={configuracionStyles.inputConfiguracion}
        />
        ) : (
          <Text style={configuracionStyles.seccionTituloConfiguracion}>{userRegister.apellido_Usuario || ""}</Text>
        )}
         <View style={{ marginTop: 12 }}>
         <Pressable style={configuracionStyles.editProfileButton} onPress={handleGuardarApellido}>
          {cambiarapellido ? (
            <Text style={configuracionStyles.editProfileButtonText}>GUARDAR APELLIDO</Text>
          ) : (
             <Text style={configuracionStyles.editProfileButtonText}>EDITAR APELLIDO</Text>
          )}
          
          </Pressable>
          </View>

        <View style={configuracionStyles.dividerConfiguracion} />

        <Text style={configuracionStyles.seccionTituloConfiguracion}>
          Información de la cuenta
        </Text>

        <Text style={configuracionStyles.labelConfiguracion}>Descripción:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={200}
          placeholder="Descripción aquí..."
          placeholderTextColor="#777"
          value={userData.descripcion || ""}
         onChangeText={(text) =>setUserData({ ...userData, descripcion: text })}
          style={configuracionStyles.inputDescripcionConfiguracion}
        />
         <View style={{ marginTop: 12 }}>
         <Pressable style={configuracionStyles.editProfileButton} onPress={handleGuardarDescripcion}>
          <Text style={configuracionStyles.editProfileButtonText}>GUARDAR DESCRIPCION</Text>
          </Pressable>
        </View>

         <View style={{ marginTop: 18 }}></View>
        <Text style={configuracionStyles.labelConfiguracion}>Imagen de Perfil</Text>

        {!userData.url_Perfil ? (
          <View style={configuracionStyles.emptyImageBoxConfiguracion}>
            <Text style={configuracionStyles.emptyImageTextConfiguracion}>Sin imagen</Text>
            </View>
            ) : (
            <Image source={{ uri: userData.url_Perfil.startsWith("http")? userData.url_Perfil : `data:image/jpg;base64,${userData.url_Perfil}`,}}
            style={configuracionStyles.imagePreviewConfiguracion}/>
            )}
        <View style={configuracionStyles.rowButtonsConfiguracion}>
          <Pressable
            style={configuracionStyles.pickImageButtonConfiguracion}
            onPress={pickImage}
          >
            <Text style={configuracionStyles.pickImageTextConfiguracion}>
              Seleccionar imagen
            </Text>
          </Pressable>

          {userData.url_Perfil !== "" && (
            <>
              <Pressable
                onPress={handleGuardarImagen}
                style={({ pressed }) => [
                  configuracionStyles.crearButtonConfiguracion,
                  pressed && configuracionStyles.buttonPressedConfiguracion,
                ]}
              >
                <Text style={configuracionStyles.crearButtonTextConfiguracion}>
                  Guardar Imagen
                </Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={configuracionStyles.dividerConfiguracion} />
         <Text style={configuracionStyles.seccionTituloConfiguracion}>
          Seguridad de la Cuenta
        </Text>
      <View style={{ marginTop: 20 }}>
        <CerrarSesionButton onPress={handleCerrarSesion} />
      </View>
      </View>
    </ScrollView>
  );
}
