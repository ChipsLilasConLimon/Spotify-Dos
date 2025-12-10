import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useGlobalStore } from "../../../contexts/global-context";
import { deleteEliminarCancionPlaylist, getObtnerDatosPlaylistUsuario } from '../../../services/playlistService';
import { globalStyles } from "../../../styles/global-styles";
import { playlistUsuarioStyles } from "../../../styles/playlist-usuario-styles";

export default function PlaylistUsuarioDetalleScreen() {
     const { playlistId, nombre, descripcion, imagen } = useLocalSearchParams<{ playlistId: string; nombre: string; descripcion: string; imagen: string; }>();
      const [isLoading, setIsLoading] = useState(false);
      const { playlistDetalles, setPlaylistDetalles } = useGlobalStore();
      
     useEffect(() => {
        fetchDatosPlaylist();
       }, []);

       const fetchDatosPlaylist = async () => {
        setIsLoading(true);
         try {
          if (playlistDetalles[playlistId]) {
              return;
            }
            const dataCancionesAlbum = await getObtnerDatosPlaylistUsuario(playlistId);
              setPlaylistDetalles((prev: any) => ({
              ...prev,
              [playlistId]: dataCancionesAlbum}));

            } catch (err) {
              console.error(err);
            } finally {
              setIsLoading(false);
            }
       };
       const handleReproducirMusica =  (id?: number) => {
   
       }
       const eliminarCancionPlaylist =  async(idCancion: number, idPlaylist:string ) => {
        try{
          const resultado = await deleteEliminarCancionPlaylist(idCancion, idPlaylist);
          setPlaylistDetalles((prev: { [x: string]: any[]; }) => ({...prev,
            [idPlaylist]: prev[idPlaylist].filter((cancion: any) => cancion.id_Cancion !== idCancion)
          }));
          Alert.alert("Exito","Se elimino la cancion a la playlist.");
        } catch (error){
          console.log(error);
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
      <Image
        source={{ uri: imagen }} style={globalStyles.bannerImageMainPlaylist} resizeMode="contain"
      />
      <Text style={globalStyles.headerAlbumTitlePlaylist}>{nombre}</Text>
      <Text style={globalStyles.headerAlbumFechaPlaylist}>{descripcion}</Text>
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
    <Pressable
      onPress={() => handleReproducirMusica(item.id_Cancion)}
      style={playlistUsuarioStyles.itemTouchable}
    >
      <View style={playlistUsuarioStyles.itemContainer}>
        <Image
          source={{ uri: item.imagen_Cancion }}
          style={playlistUsuarioStyles.albumImage}
          resizeMode="cover"
        />

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
          <MenuOption onSelect={() => console.log("Añadir a Me Gusta", item.id_Cancion)} text="Añadir a Me Gusta" />
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