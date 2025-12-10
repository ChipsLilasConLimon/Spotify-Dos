import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, Text, View } from 'react-native';
import { useGlobalStore } from ".././contexts/global-context";
import { getObtenerTodasPlaylistUsuario, getVerificarCancionPlaylist, postAgregarCancionPlaylist } from '.././services/playlistService';
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
      const [isPressed, setIsPressed] = useState<Record<string, boolean>>({});
      const { playlistDetalles, setPlaylistDetalles } = useGlobalStore();

     useEffect(() => {
               obtnerPlaylist();
              }, []);

    useEffect(() => {
      if (!visible) {
    setIsPressed({});
  }
}, [visible]);

     const obtnerPlaylist = async() =>{
        const dataPlaylist = await getObtenerTodasPlaylistUsuario();
        const nuevoDataAlbumes = dataPlaylist.map((item: { id: any; nombre: any; descripcion: any; imagen: any }) => ({
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                imagen: item.imagen
            }));
        setAlbumes(nuevoDataAlbumes);
     };
     const handleAgregarAlbum = async(dto: any) => {
      const estadoActual = isPressed[String(dto.idPlaylist)] ?? false;
      if(estadoActual){
        setIsPressed(prev => ({...prev,
        [String(dto.idPlaylist)]: !(prev[String(dto.idPlaylist)] ?? false)}));
        return
      }
      setIsPressed(prev => ({...prev,
        [String(dto.idPlaylist)]: !(prev[String(dto.idPlaylist)] ?? false)}));
      try{
        const verficacion = await getVerificarCancionPlaylist(idCancion, dto.idPlaylist)
        if (verficacion){
           Alert.alert("Error","La cancion ya existe en la playlist.");
           return
        }
        const responseAgregar = await postAgregarCancionPlaylist(dto);
        setPlaylistDetalles((prev: { [x: string]: any; }) => ({...prev,
          [dto.idPlaylist]: [...(prev[dto.idPlaylist] || []), responseAgregar]}));
         Alert.alert("Exito","Se agrego la cancion a la playlist.");
      } catch {
      }

     };
     return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={modalStyles.modalOverlay}>
      <View style={modalStyles.modalContent}>
        <View style={modalStyles.headerRow}>
          <View style={modalStyles.headerSideSpacer} />
          <Text style={modalStyles.modalTitle}>
            Agrega la canción a una playlist
          </Text>

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

              <Image
                source={{ uri: item.imagen }}
                style={modalStyles.albumImage}
              />

              <View style={modalStyles.cancionInfo}>
                <Text style={modalStyles.cancionTitulo}>{item.nombre}</Text>
                <Text style={modalStyles.cancionDuracion}>{item.descripcion}</Text>
              </View>
              <Pressable
                onPress={() =>
                  handleAgregarAlbum({
                    idCancion: idCancion,
                    idPlaylist: item.id,
                    nombre_Cancion: nombreCancion,
                    imagen_Cancion: imagenCancion,
                    artista_Cancion: artistaCancion
                  })
                }
                style={[modalStyles.botonAgregar,
                  {backgroundColor:isPressed[String(item.id)]? "#1ef19dff": "#f2f3f2d1",},]}/>
            </View>
          )}
        />
      </View>
    </View>
  </Modal>
);

}
