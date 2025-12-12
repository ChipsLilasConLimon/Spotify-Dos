// screens/MeGustaScreen.tsx
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import bannerBackground from "../../../assets/images/background-me-gusta.png";
import { useGlobalStore } from "../../../contexts/global-context";
import { deleteEliminarCancionMeGusta, getVerCancionesMeGusta } from '../../../services/usuariosdatosService';
import { meGustaStyles } from "../../../styles/me-gusta-styles";
import { playlistUsuarioStyles } from "../../../styles/playlist-usuario-styles";

export default function MeGustaScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { megusta, setMeGusta } = useGlobalStore();

  useEffect(() => {
    fetchDatosMeGusta();
  }, []);

  const fetchDatosMeGusta = async () => {
    setIsLoading(true);
    try {
      // Cargamos SIEMPRE del backend para evitar estados inconsistentes
      const data = await getVerCancionesMeGusta();
      setMeGusta(data || []);
    } catch (err) {
      console.error("Error cargando me gustas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReproducirMusica = (id?: number) => {
    // implementar reproducción
  };

  const eliminarCancionMeGusta = async (idCancion: number) => {
    try {
      await deleteEliminarCancionMeGusta(idCancion);
      // Filtramos por la propiedad que usa el listado: id_Cancion
      setMeGusta((prev: any[]) => prev.filter(c => c.id_Cancion !== idCancion));
    } catch (err) {
      console.error("Error al eliminar canción:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={meGustaStyles.centerMain}>
        <ActivityIndicator size="large" color="#03b3d2ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={megusta}
      contentContainerStyle={{ paddingBottom: 20 }}
      style={meGustaStyles.backgroundPlaylist}
      ListHeaderComponent={
        <>
          <View style={meGustaStyles.bannerContainerPlaylist}>
            <Image source={bannerBackground} style={meGustaStyles.bannerImageMainPlaylist} resizeMode="contain" />
            <LinearGradient colors={['transparent', 'black']} style={meGustaStyles.fadeBottom} />
            <View style={meGustaStyles.bannerTextContainer}>
              <Text style={meGustaStyles.bannerTextPlaylist}>Me Gustas</Text>
            </View>
          </View>
          <View style={meGustaStyles.separadorArtista} />
          <View style={meGustaStyles.lineaSeparadoraPlaylist} />
        </>
      }
      ListEmptyComponent={
        <Text style={{ color: "#e6e6e6ff", textAlign: "center", marginTop: 20 }}>
          No hay canciones en Me Gustas.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={playlistUsuarioStyles.rowContainer}>
          <Pressable onPress={() => handleReproducirMusica(item.id_Cancion)} style={playlistUsuarioStyles.itemTouchable}>
            <View style={playlistUsuarioStyles.itemContainer}>
              <Image source={{ uri: item.imagen_Cancion }} style={playlistUsuarioStyles.albumImage} resizeMode="cover" />
              <View style={playlistUsuarioStyles.textContainer}>
                <Text style={meGustaStyles.cancionTituloPlaylist}>{item.nombre_Cancion}</Text>
                <Text style={meGustaStyles.cancionDuracionPlaylist}>{item.artista_Cancion}</Text>
              </View>
            </View>
          </Pressable>

          <View style={playlistUsuarioStyles.menuContainer}>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" size={18} color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => eliminarCancionMeGusta(item.id_Cancion)}>
                  <Text style={{ color: "red" }}>Eliminar</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      )}
    />
  );
}
