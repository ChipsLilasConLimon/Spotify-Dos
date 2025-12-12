import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useGlobalStore } from "../../../contexts/global-context";
import { deleteEliminarCancionPlaylist, deleteEliminarPlaylist, getObtnerDatosPlaylistUsuario } from '../../../services/playlistService';
import { getVerCancionesMeGusta, postAgregarCancionMeGusta, postAgregarDataCancionMeGusta } from '../../../services/usuariosdatosService';
import { globalStyles } from "../../../styles/global-styles";
import { playlistUsuarioStyles } from "../../../styles/playlist-usuario-styles";

export default function PlaylistUsuarioDetalleScreen() {
  const { playlistId, nombre, descripcion, imagen } = useLocalSearchParams<{ playlistId: string; nombre: string; descripcion: string; imagen: string; }>();
  const [isLoading, setIsLoading] = useState(false);
  const { playlistDetalles, setPlaylistDetalles, setMeGusta, setPlaylists } = useGlobalStore();
  const router = useRouter();

  useEffect(() => {
    fetchDatosPlaylist();
  }, []);

  const fetchDatosPlaylist = async () => {
    setIsLoading(true);
    try {
      if (playlistDetalles[playlistId]) {
        setIsLoading(false);
        return;
      }
      const dataCancionesAlbum = await getObtnerDatosPlaylistUsuario(playlistId);
      setPlaylistDetalles((prev: any) => ({
        ...prev,
        [playlistId]: dataCancionesAlbum
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReproducirMusica = (id?: number) => {
  };

  const agregarCancionAmeGusta = async (item: any) => {
    try {
      // primero guardar data de la canción (por si hace falta)
      await postAgregarDataCancionMeGusta({
        id_Cancion: item.id_Cancion,
        nombre_Cancion: item.nombre_Cancion,
        imagen_Cancion: item.imagen_Cancion,
        artista_Cancion: item.artista_Cancion
      });
      await postAgregarCancionMeGusta(item.id_Cancion);
      const nuevasMeGusta = await getVerCancionesMeGusta();
      setMeGusta(nuevasMeGusta);

      Alert.alert("Éxito", "Se agregó la canción a Me Gustas.");
    } catch (err) {
      console.error("Error al agregar a me gusta:", err);
    }
  };

  const eliminarCancionPlaylist = async (idCancion: number, idPlaylist: string) => {
    try {
      const resultado = await deleteEliminarCancionPlaylist(idCancion, idPlaylist);
      setPlaylistDetalles((prev: { [x: string]: any[]; }) => ({
        ...prev,
        [idPlaylist]: prev[idPlaylist].filter((cancion: any) => cancion.id_Cancion !== idCancion)
      }));
      Alert.alert("Exito", "Se elimino la cancion a la playlist.");
    } catch (error) {
      console.log(error);
    }
  };
  const eliminarPlaylist = async (idPlaylist: any) => {
      try {
    const res = await deleteEliminarPlaylist(idPlaylist);
    if (!res) {
      Alert.alert("Error", "No se pudo eliminar la playlist.");
      return;
    }
    setPlaylists((prev: any[]) =>
      prev.filter((p: any) => p.id !== idPlaylist)
    );
    setPlaylistDetalles((prev: { [x: string]: any }) => {
      const copy = { ...prev };
      delete copy[idPlaylist];
      return copy;
    });
    Alert.alert("Éxito", "Se eliminó la playlist.");
    router.back();
  } catch (err) {
    console.error("Error al eliminar playlist:", err);
  }
    };

  const canciones = playlistDetalles[playlistId] || [];

  if (isLoading) {
    return (
      <View style={globalStyles.centerMain}>
        <ActivityIndicator size="large" color="#03b3d2ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={canciones}
      contentContainerStyle={{ paddingBottom: 20 }}
      style={globalStyles.backgroundPlaylist}
      ListHeaderComponent={
        <>
          <Image source={{ uri: imagen }} style={globalStyles.bannerImageMainPlaylist} resizeMode="contain" />
         <View style={globalStyles.menuHeaderContainer}>
          <View style={globalStyles.menuHeaderTextContainer}>
            <Text style={globalStyles.menuHeaderTextTitle}>{nombre}</Text>
            <Text style={globalStyles.menuHeaderTextDescription}>{descripcion}</Text>
            </View>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" size={22} color="white" />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => eliminarPlaylist(playlistId)}>
                    <Text style={{ color: "red", padding: 5 }}>Eliminar</Text>
                    </MenuOption>
                    </MenuOptions>
                    </Menu>
                    </View>
          <View style={globalStyles.lineaSeparadoraPlaylist} />
           
        </>
      }
      ListEmptyComponent={
        <Text style={{ color: "#e6e6e6ff", textAlign: "center", marginTop: 20 }}>
          No hay canciones en esta playlist.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={playlistUsuarioStyles.rowContainer}>
          <Pressable onPress={() => handleReproducirMusica(item.id_Cancion)} style={playlistUsuarioStyles.itemTouchable}>
            <View style={playlistUsuarioStyles.itemContainer}>
              <Image source={{ uri: item.imagen_Cancion }} style={playlistUsuarioStyles.albumImage} resizeMode="cover" />
              <View style={playlistUsuarioStyles.textContainer}>
                <Text style={globalStyles.cancionTituloPlaylist}>{item.nombre_Cancion}</Text>
                <Text style={globalStyles.cancionDuracionPlaylist}>{item.artista_Cancion}</Text>
              </View>
            </View>
          </Pressable>

          <View style={playlistUsuarioStyles.menuContainer}>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" size={18} color="white" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => agregarCancionAmeGusta(item)} text="Añadir a Me Gusta" />
                <MenuOption onSelect={() => eliminarCancionPlaylist(item.id_Cancion, playlistId)}>
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
