import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { getBuscarAlbumPorNombre } from '.././services/searchService';
import { searchStyles } from ".././styles/search-styles";
type Props = {
  searchText: string;
};
type Album = {
  id: number,
  title: string;
  cover_big: string;
  artist_name: string;
};
export default function SearchAlbum({ searchText }: Props) {
  const [text, setText] = useState('');
  const [albumes, setAlbumes] = useState<Album[]>([]);
  const router = useRouter();

  useEffect(() => {
        setText(searchText);
        obtenerDatos();
       }, [searchText]);

       const obtenerDatos = async () => {
             try{
               const dataMusica = await getBuscarAlbumPorNombre(text);
               const nuevoArrayData = dataMusica.map((item: { id: number; title: any; cover_big: any; artist: { name: any; }; }) => ({
                 id: item.id,
                 title: item.title,
                 cover_big: item.cover_big,
                 artist_name: item.artist.name
               }));
               setAlbumes(nuevoArrayData);
             } catch {
             }
            }
            const handleIraAlbum =  (id?: number) => {
              router.push(`/main/ver-playlist?playlistId=${id}`);
            }
    return(
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <FlatList
                  data={albumes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <>
                      <Pressable onPress={() => handleIraAlbum(item.id)} style={searchStyles.cancionCard}>
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