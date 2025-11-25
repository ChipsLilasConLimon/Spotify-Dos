import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { getBuscarArtistaPorNombre } from '.././services/searchService';
import { searchStyles } from ".././styles/search-styles";
type Props = {
  searchText: string;
};
type Artista = {
  id: number,
  name: string;
  picture_big: string;
};
export default function SearchArtista({ searchText }: Props) {
  const [text, setText] = useState('');
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const router = useRouter();

  useEffect(() => {
        setText(searchText);
        obtenerDatos();
       }, [searchText]);

       const obtenerDatos = async () => {
             try{
               const dataArtista = await getBuscarArtistaPorNombre(text);
               const nuevoArrayData = dataArtista.map((item: { id: number; name: any; picture_big: any; }) => ({
                 id: item.id,
                 name: item.name,
                 picture_big: item.picture_big
               }));
               setArtistas(nuevoArrayData);
             } catch {
             }
            }
            const handleIraArtista =  (id?: number) => {
              router.push(`/main/ver-artista?playlistId=${id}`);
            }
    
        return (
           <View style={{ flex: 1, backgroundColor: "#000" }}>
          <FlatList
                  data={artistas}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <>
                      <Pressable onPress={() => handleIraArtista(item.id)} style={searchStyles.cancionCard}>
                      <Image source={{ uri: item.picture_big }} style={searchStyles.albumImage}/>
                       <View style={searchStyles.cancionInfo}>
                          <Text style={searchStyles.cancionTitulo}>{item.name}</Text>
                       </View>
                      </Pressable>
                       <View style={searchStyles.divider} />
                    </>
                  )}
                />
        </View>
        );
}