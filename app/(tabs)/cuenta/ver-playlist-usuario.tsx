import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { getObtnerDatosPlaylistUsuario } from '../../../services/playlistService';
import { globalStyles } from "../../../styles/global-styles";

export default function PlaylistUsuarioDetalleScreen() {
type CancionPlaylist = {
  id: number;
  id_playlist: string;
  id_cancion: string;
  nombre_cancion: string;
  imagen_cancion: string;
  artista_cancion: string; 
};
     const { playlistId, nombre, descripcion, imagen } = useLocalSearchParams<{ playlistId: string; nombre: string; descripcion: string; imagen: string; }>();
      const [isLoading, setIsLoading] = useState(false);
      const [cancionesalbumes, setCancionesAlbumes] = useState<CancionPlaylist[]>([]);
      

     useEffect(() => {
         if (playlistId && nombre && descripcion && imagen) fetchDatosPlaylist();
       }, [playlistId, nombre, descripcion, imagen]);

       const fetchDatosPlaylist = async () => {
        setIsLoading(true);
         try {
            const dataCancionesAlbum = await getObtnerDatosPlaylistUsuario(playlistId);
            const nuevoDataCancionesAlbum = dataCancionesAlbum.map((item: { id: number; id_playlist: string; id_cancion: string; nombre_cancion: string; imagen_cancion: string; artista_cancion: string;}) => ({
              id: item.id,
              id_playlist: item.id_playlist,
              id_cancion: item.id_cancion,
              nombre_cancion: item.nombre_cancion,
              imagen_cancion: item.imagen_cancion,
              artista_cancion: item.artista_cancion,
            }));
            setCancionesAlbumes(nuevoDataCancionesAlbum);
            } catch (err) {
              console.error(err);
            } finally {
              setIsLoading(false);
            }
       }

       const handleReproducirMusica =  (id?: number) => {
   
       }

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
    data={cancionesalbumes}
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
    <View style={globalStyles.grupoCardMainPlaylist}>
      <Pressable
        onPress={() => handleReproducirMusica(item.id)}
        style={globalStyles.botonCardMainPlaylist}
      >
        <Text style={globalStyles.cancionTituloPlaylist}>{item.nombre_cancion}</Text>
        <Text style={globalStyles.cancionDuracionPlaylist}>{item.artista_cancion}</Text>
      </Pressable>
    </View>
  )}
/>
  );
}