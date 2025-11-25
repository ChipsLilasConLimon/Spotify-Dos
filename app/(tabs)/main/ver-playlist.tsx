import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { getCancionesDeAlbum, getDetallesAlbum } from '../../../services/mainService';
import { globalStyles } from "../../../styles/global-styles";

export default function PlaylistDetalleScreen() {

type Album = {
  id: number;
  title: string;
  cover_big: string;
  release_date: string;
  explicit_lyrics: boolean;
  artist: { name: string };
};
type AlbumCanciones = {
  id: number,
  title: string;
  duration: string;
};
     const { playlistId } = useLocalSearchParams<{ playlistId: string; }>();
      const [isLoading, setIsLoading] = useState(false);
      const [album, setAlbum] = useState<Album>();
      const [cancionesalbumes, setCancionesAlbumes] = useState<AlbumCanciones[]>([]);
      

     useEffect(() => {
         if (playlistId) fetchDatosPlaylist();
       }, [playlistId]);

       const fetchDatosPlaylist = async () => {
        setIsLoading(true);
         try {
            const dataAlbum = await getDetallesAlbum(playlistId);
            const dataCancionesAlbum = await getCancionesDeAlbum(playlistId);
            const albumData: Album = {
                id: dataAlbum.id,
                title: dataAlbum.title,
                cover_big: dataAlbum.cover_big,
                release_date: dataAlbum.release_date,
                explicit_lyrics: dataAlbum.explicit_lyrics,
                artist: { name: dataAlbum.artist.name }
            };
            const nuevoDataCancionesAlbum = dataCancionesAlbum.map((item: { id: number; title: any; duration: any; }) => ({
              id: item.id,
              title: item.title,
              duration: item.duration
            }));
            setAlbum(albumData);
            setCancionesAlbumes(nuevoDataCancionesAlbum);
            } catch (err) {
              console.error(err);
            } finally {
              setIsLoading(false);
            }
       }

       const handleReproducirMusica =  (id?: number) => {
   
       }
       const handleFormatearSegundos =  (segundos: string) => {
        let segundosFormateados: number = +segundos;
         const minutes = Math.floor(segundosFormateados / 60);
         const seconds = segundosFormateados % 60;
         const formattedMinutes = String(minutes).padStart(2, '0');
         const formattedSeconds = String(seconds).padStart(2, '0');
         return `${formattedMinutes}:${formattedSeconds}`;
       }
       const handleFormatearFecha =  (fecha: string) => {
        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          const [year, month, day] = fecha.split("-");
          const nombreMes = meses[parseInt(month) - 1];
          return `${parseInt(day)} de ${nombreMes} de ${year}`;
        
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
        source={{ uri: album?.cover_big }}
        style={globalStyles.bannerImageMainPlaylist}
        resizeMode="contain"
      />

      <Text style={globalStyles.headerAlbumTitlePlaylist}>
        {album?.title} - {album?.artist.name}
      </Text>

      <Text style={globalStyles.headerAlbumFechaPlaylist}>
        Fecha de lanzamiento: {handleFormatearFecha(album?.release_date || "")}
      </Text>

      <View style={globalStyles.lineaSeparadoraPlaylist} />
    </>
  }

  renderItem={({ item }) => (
    <View style={globalStyles.grupoCardMainPlaylist}>
      <Pressable
        onPress={() => handleReproducirMusica(item.id)}
        style={globalStyles.botonCardMainPlaylist}
      >
        <Text style={globalStyles.cancionTituloPlaylist}>{item.title}</Text>
        <Text style={globalStyles.cancionDuracionPlaylist}>Duración: {handleFormatearSegundos(item.duration)}</Text>
      </Pressable>
    </View>
  )}
/>
  );
}