import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, Text, View } from 'react-native';
import { getObtenerTodasPlaylistUsuario, postAgregarCancionPlaylist } from '.././services/playlistService';
import { modalStyles } from ".././styles/modal-styles";
import equisModal from "../assets/images/equismodal.png";

type Albumes = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}
type Props = {
visible: boolean;
onClose: () => void;
idCancion: number;
nombreCancion: string;
imagenCancion: string;
artistaCancion: string;
}
export default function ModalPlaylistCommponent({visible, onClose, idCancion,nombreCancion,imagenCancion,artistaCancion}: Props) {
     const [albumes, setAlbumes] = useState<Albumes[]>([]);
      const [isPressed, setIsPressed] = useState(false);

     useEffect(() => {
               obtnerPlaylist();
              }, []);

     const obtnerPlaylist = async() =>{
        const dataPlaylist = await getObtenerTodasPlaylistUsuario();
        const nuevoDataAlbumes = dataPlaylist.map((item: { id: any; nombre: any; descripcion: any; imagen: any }) => ({
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                imagen: item.imagen
            }));
        setAlbumes(nuevoDataAlbumes);
     }
     const handleAgregarAlbum = async(dto: any) => {
      setIsPressed(!isPressed);
      try{
        const responseAgregar = await postAgregarCancionPlaylist(dto);
         Alert.alert("Exito","Se agrego la cancion a la playlist.");
        return responseAgregar.data.datos;
      } catch {
      }

     }
     return (
        <Modal animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={modalStyles.modalOverlay}>
                  <View style={modalStyles.modalContent}>
    
    <View style={modalStyles.headerRow}>
        <Text style={modalStyles.modalTitle}>Agrega la canción a una playlist</Text>

        <Pressable style={modalStyles.closeButton} onPress={onClose}>
            <Image source={equisModal} style={modalStyles.closeIcon} />
        </Pressable>
    </View>

    <FlatList
        data={albumes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={modalStyles.listaPlaylist}
        renderItem={({ item }) => (
            <View style={modalStyles.cancionRow}>
                <Image source={{ uri: item.imagen }} style={modalStyles.albumImage} />
                <View style={modalStyles.cancionInfo}>
                    <Text style={modalStyles.cancionTitulo}>{item.nombre}</Text>
                    <Text style={modalStyles.cancionDuracion}>{item.descripcion}</Text>
                </View>
                <Pressable
                onPress={() =>handleAgregarAlbum({idCancion: idCancion,idPlaylist: item.id,nombre_Cancion: nombreCancion,
                  imagen_Cancion: imagenCancion,artista_Cancion: artistaCancion})}
               style={[modalStyles.botonAgregar,{ backgroundColor: isPressed ? '#1ef19dff' : '#f2f3f2d1' }]}
    ></Pressable>
            </View>
        )}
        />
        </View>
        </View>
        </Modal>
     );
}
