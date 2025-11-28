import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import logoEliminar from "../../../assets/images/equis.png";
import { getCrearAlbum, postPostearImagenAlbum } from '../../../services/playlistService';
import { crearStyles } from "../../../styles/crearStyles";

export default function PerfilUsuarioScreen() {
  const [nombreplaylist, setNombrePlaylist] = useState('');
  const [descripcionplaylist, setDescripcionPlaylist] = useState('');
  const [imagen, setImagen] = useState('');

  const router = useRouter();
  // ABRIR GALERÍA
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
        base64: true,
      });
      if (!result.canceled) {
        setImagen(result.assets[0].base64!);
      }
    };

  const handleCrearPlaylist = async () => {
    if(nombreplaylist === ""){
      alert(`Por lo menos selecciona un nombre para la playlist`);
      return;
    }
    let urlImagen = "";
    if(imagen !== "") {
      urlImagen = await postPostearImagenAlbum(imagen);
      if(urlImagen === null){
        alert(`No se pudo subir la imagen`);
        return;
      }
    }
    const resulatdos = await getCrearAlbum({
      Nombre: nombreplaylist,
      Descripcion: descripcionplaylist,
      Imagen: urlImagen,
    });
     alert(`Se registro la playlist`);
  }

  const handleEliminarImagenSeleccionada = () => {
    setImagen('');
  }

  return (
  <ScrollView style={crearStyles.container}
  contentContainerStyle={{ paddingBottom: 50 }}>
  <Text style={crearStyles.headerTitle}>Crea una nueva playlist</Text>

  <Text style={crearStyles.label}>Nombre de la Playlist</Text>
  <TextInput
    style={crearStyles.input}
    placeholder="Ingresa un nombre..."
    placeholderTextColor="#888"
    value={nombreplaylist}
    onChangeText={setNombrePlaylist}
  />

  <Text style={crearStyles.label}>Descripción</Text>
  <TextInput
    style={crearStyles.input}
    placeholder="Ingresa una descripción..."
    placeholderTextColor="#888"
    value={descripcionplaylist}
    onChangeText={setDescripcionPlaylist}
  />

 <Text style={crearStyles.labelElegirImagen}>Elegir imagen de playlist</Text>
  <View style={crearStyles.divider} />
  {imagen === "" ? (
    <View style={crearStyles.emptyImageBox}>
      <Text style={crearStyles.emptyImageText}>Sin imagen</Text>
    </View>
  ) : (
    <Image
      source={{ uri: `data:image/jpg;base64,${imagen}` }}
      style={crearStyles.imagePreview}
    />
  )}

 <View style={crearStyles.rowButtons}>
  <Pressable style={crearStyles.pickImageButton} onPress={pickImage}>
    <Text style={crearStyles.pickImageText}>Seleccionar imagen</Text>
  </Pressable>
 {imagen !== "" && (
    <Pressable onPress={handleEliminarImagenSeleccionada} style={crearStyles.eliminarButton}>
      <Image source={logoEliminar} style={crearStyles.eliminarImagenButton}/>
    </Pressable>
  )}
    </View>

  <View style={crearStyles.divider} />

  <Pressable onPress={handleCrearPlaylist} style={crearStyles.crearButton}>
    <Text style={crearStyles.crearButtonText}>Crear</Text>
  </Pressable>

</ScrollView>
  );
}