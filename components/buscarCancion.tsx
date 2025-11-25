import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { getBuscarCancionPorNombre } from '.././services/searchService';
import { searchStyles } from ".././styles/search-styles";

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


    useEffect(() => {
      setText(searchText);
      obtenerDatos();
     }, [searchText]);

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
    return(
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
              data={musica}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <>
                  <Pressable onPress={() => handleReproducirMusica(item.id)} style={searchStyles.cancionCard}>
                  <Image source={{ uri: item.cover_big }} style={searchStyles.albumImage}/>
                   <View style={searchStyles.cancionInfo}>
                      <Text style={searchStyles.cancionTitulo}>{item.title}</Text>
                       <Text style={searchStyles.cancionDuracion}> {item.artist_name}</Text>
                   </View>
                  </Pressable>
                   <View style={searchStyles.divider} />
                </>
              )}
            />
    </View>
    );
}