import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import crearLogo from ".././assets/images/crear-simbolo-redondo.png";
import { getBuscarCancionPorNombre } from '.././services/searchService';
import { searchStyles } from ".././styles/search-styles";
import ModalPlaylistCommponent from "../components/modalAgregarCancion";

type Props = {
  searchText: string;
};
 type Musica = {
  id: number,
  title: string;
  cover_big: string;
  artist_name: string;
};
export default function SearchCancion({ searchText }: Props) {
   const [text, setText] = useState('');
   const [musica, setMusica] = useState<Musica[]>([]);
   const [modalVisibilidad, setModalVisibilidad] = useState(false);
   const [cancionseleccionada, setCancionSeleccioanda] = useState<Musica | null>(null);

    useEffect(() => {
      setText(searchText);
      obtenerDatos();
     }, [searchText]);

     useEffect(() => {
  if (cancionseleccionada) {
    setModalVisibilidad(true);
  }
}, [cancionseleccionada]);

     const obtenerDatos = async () => {
      try{
        const dataMusica = await getBuscarCancionPorNombre(text);
        const nuevoArrayData = dataMusica.map((item: { id: number; title: any; artist: { name: any; }; album: { cover_big: any; }; }) => ({
          id: item.id,
          title: item.title,
          cover_big: item.album.cover_big,
          artist_name: item.artist.name
        }));
        setMusica(nuevoArrayData);
      } catch {
      }
     }
     const handleReproducirMusica =  (id?: number) => {

     }
     
     const handleAgregarCancionPlaylist = (item: Musica) => {
      setCancionSeleccioanda(item);
    };
    return(
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
      data={musica}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <>
      <View style={searchStyles.cancionRow}>
      <Pressable onPress={() => handleReproducirMusica(item.id)} style={searchStyles.cancionCard}>
        <Image source={{ uri: item.cover_big }} style={searchStyles.albumImage} />

        <View style={searchStyles.cancionInfo}>
          <Text style={searchStyles.cancionTitulo}>{item.title}</Text>
          <Text style={searchStyles.cancionDuracion}>{item.artist_name}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => handleAgregarCancionPlaylist(item)} style={searchStyles.addButton}>
        <Image 
          source={crearLogo} 
          style={searchStyles.addIcon} 
        />
      </Pressable>
    </View>
    <View style={searchStyles.divider} />
                </>
              )}
            />
            {cancionseleccionada && (
    <ModalPlaylistCommponent 
      visible={modalVisibilidad}
      onClose={() => setModalVisibilidad(false)}
      idCancion={cancionseleccionada.id}
      nombreCancion={cancionseleccionada.title}
      imagenCancion={cancionseleccionada.cover_big}
      artistaCancion={cancionseleccionada.artist_name}
    />
    )}
    </View>
    );
}