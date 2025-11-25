import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import bannerAzul from "../../../assets/images/fondo-banner-main.jpg";
import logoApp from "../../../assets/images/logos/logo-1.png";
import { getAlbumesPopulares, getArtistasPopulares, getCancionesPopulares } from '../../../services/mainService';
import { globalStyles } from "../../../styles/global-styles";
type Album = {
  id: number,
  title: string;
  cover_big: string;
  artist_name: string;
};

type Musica = {
  id: number,
  title: string;
  album_cover_big: string;
  artist_name: string;
};

type Artista = {
  id: number,
  name: string;
  picture_big: string;
};

export default function MainScreen() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [musica, setMusica] = useState<Musica[]>([]);
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDatosPrincipales();
  }, []);

  const fetchDatosPrincipales = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dataAlbum = await getAlbumesPopulares("ALBUM");
      const dataMusica = await getCancionesPopulares("MUSICA");
      const dataArtistas = await getArtistasPopulares("ARTISTAS");
      // Mapear el JSOn
      const nuevoArrayAlbum = dataAlbum.map((item: { id: number; title: any; cover_big: any; artist: { name: any; }; }) => ({
      id: item.id,
      title: item.title,
      cover_big: item.cover_big,
      artist_name: item.artist.name
    }));
    const nuevoArrayMusica = dataMusica.map((item: { id: number; title: any; album: { cover_big: any; }; artist: { name: any; }; }) => ({
      id: item.id,
      title: item.title,
      album_cover_big: item.album.cover_big,
      artist_name: item.artist.name
    }));
    const nuevoArrayArtistas = dataArtistas.map((item: { id: number; name: any; picture_big: any; }) => ({
      id: item.id,
      name: item.name,
      picture_big: item.picture_big
    }));
    setAlbums(nuevoArrayAlbum);
    setMusica(nuevoArrayMusica);
    setArtistas(nuevoArrayArtistas);
    } catch (err: any) {
      console.error("Error al cargar los datos:", err.message || err);
      Alert.alert("Error", "No se pudieron los datos");
      setError("Error al cargar grupos.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={globalStyles.centerMain}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }
  const handleVerAlbum =  (id?: number) => {
    router.push(`/(tabs)/main/ver-playlist?playlistId=${id}`);
  }
  const handleReproducirMusica =  (id?: number) => {

  }
  const handleVerArtista =  (id?: number) => {
    router.push(`/(tabs)/main/ver-artista?playlistId=${id}`);
  }
  const obtenerLabelHora = () => {
    const horaActual = new Date().getHours(); 
    if(horaActual <= 11 ) return "Buenos días";
    if(horaActual >= 12 && horaActual <= 19 ) return "Buenas tardes";
    return "Buenas noches";
  }

  return (
  <ScrollView
  style={globalStyles.containerMain} contentContainerStyle={{ paddingBottom: 20, paddingTop: 0 }} nestedScrollEnabled={true}>
    <ImageBackground source={bannerAzul} style={globalStyles.headerBackgroundMain} imageStyle={{ resizeMode: "cover" }}>

  <View style={globalStyles.headerRowContentMain}>
    <Text style={globalStyles.headerMain}>{obtenerLabelHora()}</Text>
    <Image
      source={logoApp}
      style={globalStyles.imageLogoAppMain}
      resizeMode="contain"
    />
  </View>
</ImageBackground>
    {error && <Text style={globalStyles.errorTextMain}>{error}</Text>}
    {albums.length > 0 ? (
      <>
      <Text style={globalStyles.headerFlatListMain}>Música Popular</Text>
      <FlatList
        data={musica}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={globalStyles.grupoCardMain}>
            <Pressable onPress={() => handleReproducirMusica(item.id)} style={globalStyles.botonCardMain}>
            <Image
              source={{ uri: item.album_cover_big }}
              style={globalStyles.bannerImageMain}
              resizeMode="contain"
            />
            </Pressable>
            <Text style={globalStyles.grupoTitleMain}>
              {item.title} - {item.artist_name}
            </Text>
          </View>
        )}
      />

      <Text style={globalStyles.headerFlatListMain}>Álbumes Populares</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={globalStyles.grupoCardMain}>
            <Pressable onPress={() => handleVerAlbum(item.id)} style={globalStyles.botonCardMain}>
            <Image
              source={{ uri: item.cover_big }}
              style={globalStyles.bannerImageMain}
              resizeMode="contain"
            />
            </Pressable>
            <Text style={globalStyles.grupoTitleMain}>
              {item.title} - {item.artist_name}
            </Text>
          </View>
        )}
      />

      <Text style={globalStyles.headerFlatListMain}>Artistas Populares</Text>
      <FlatList
        data={artistas}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={globalStyles.grupoCardMain}>
            <Pressable onPress={() => handleVerArtista(item.id)} style={globalStyles.botonCardMain}>
            <Image
              source={{ uri: item.picture_big }}
              style={globalStyles.bannerImageMain}
              resizeMode="contain"
            />
            </Pressable>
            <Text style={globalStyles.grupoTitleMain}>
              {item.name}
            </Text>
          </View>
        )}
      />
      </>
    ) : (
      <Text style={globalStyles.centerTextMain}>
        No se encontraron datos que mostrar.
      </Text>
    )}
  </ScrollView>
 );
}