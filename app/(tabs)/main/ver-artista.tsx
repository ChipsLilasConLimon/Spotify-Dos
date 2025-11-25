import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { getCancionesPopularesDeArtista, getInformacionDeArtista } from '../../../services/mainService';
import { artistaStyles } from "../../../styles/artista-styles";
import { globalStyles } from "../../../styles/global-styles";

export default function ArtistasDetalleScreen() {

type Artista = {
id: number;
name: string;
picture_xl: string;
};
type ArtistaCanciones = {
  id: number,
  title: string;
  duration: string;
  album_poster: string;
};
     const { playlistId } = useLocalSearchParams<{ playlistId: string; }>();
      const [isLoading, setIsLoading] = useState(false);
      const [artista, setArtista] = useState<Artista>();
      const [cancionesartista, setCancionesArtista] = useState<ArtistaCanciones[]>([]);
      

     useEffect(() => {
         if (playlistId) fetchDatosPlaylist();
       }, [playlistId]);

       const fetchDatosPlaylist = async () => {
        setIsLoading(true);
         try {
            const dataCancionesArtistas = await getCancionesPopularesDeArtista(playlistId);
            const dataArtista = await getInformacionDeArtista(playlistId);
            const artistaMapeado: Artista = {
                id: dataArtista.id,
                name: dataArtista.name,
                picture_xl: dataArtista.picture_xl,
            };
            const nuevoDataCancionesAlbum = dataCancionesArtistas.map((item: { id: any; title: any; duration: any; album: { cover_big: any; }; }) => ({
                id: item.id,
                title: item.title,
                duration: item.duration,
                album_poster: item.album.cover_big
            }));
            setCancionesArtista(nuevoDataCancionesAlbum);
            setArtista(artistaMapeado);
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
    data={cancionesartista}
    contentContainerStyle={{ paddingBottom: 20 }}
    style={globalStyles.backgroundPlaylist}
    ListHeaderComponent={
    <>
    <View style={artistaStyles.bannerContainerPlaylist}>
    <Image source={{ uri: artista?.picture_xl }} style={artistaStyles.bannerImageMainPlaylist}
    resizeMode="cover"
    />
    <LinearGradient
        colors={['transparent', 'black']}
        style={artistaStyles.fadeBottom}
      />
  <View style={artistaStyles.bannerTextContainer}>
    <Text style={artistaStyles.bannerTextPlaylist}>{artista?.name}</Text>
  </View>
</View>
 <View style={artistaStyles.separadorArtista} />
 <Text style={artistaStyles.txtSubtitleArtista}> Canciones Populares</Text>
    </>
  }
  renderItem={({ item }) => (
    <>
      <Pressable onPress={() => handleReproducirMusica(item.id)} style={artistaStyles.cancionCard}>
        <Image source={{ uri: item.album_poster }} style={artistaStyles.albumImage}/>
        <View style={artistaStyles.cancionInfo}>
          <Text style={artistaStyles.cancionTitulo}>{item.title}</Text>
          <Text style={artistaStyles.cancionDuracion}>
            Duración: {handleFormatearSegundos(item.duration)}
          </Text>
        </View>
      </Pressable>
      <View style={artistaStyles.divider} />
    </>
  )}
/>
  );
}