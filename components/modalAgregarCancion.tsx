// components/ModalPlaylistComponent.tsx
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, Text, View } from 'react-native';
import equisModal from "../assets/images/equismodal.png";
import meGusta from "../assets/images/me-gusta-banner.png";
import { useGlobalStore } from "../contexts/global-context";
import { getObtenerTodasPlaylistUsuario, getObtnerDatosPlaylistUsuario, getVerificarCancionPlaylist, postAgregarCancionPlaylist } from '../services/playlistService';
import { getValidarCancionMeGusta, getVerCancionesMeGusta, postAgregarCancionMeGusta, postAgregarDataCancionMeGusta } from '../services/usuariosdatosService';
import { modalStyles } from "../styles/modal-styles";

type Albumes = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: any;
}

type Props = {
  visible: boolean;
  onClose: () => void;
  idCancion: number;
  nombreCancion: string;
  imagenCancion: string;
  artistaCancion: string;
}

export default function ModalPlaylistComponent({ visible, onClose, idCancion, nombreCancion, imagenCancion, artistaCancion }: Props) {
  const [albumes, setAlbumes] = useState<Albumes[]>([]);
  const [isPressed, setIsPressed] = useState<Record<string, boolean>>({});
  const { playlists, setPlaylists, megusta, setMeGusta, setPlaylistDetalles, playlistDetalles } = useGlobalStore();

  useEffect(() => {
    if (visible) cargarPlaylists();
  }, [visible, playlists]);

  useEffect(() => {
    if (!visible) setIsPressed({});
  }, [visible]);

  const cargarPlaylists = async () => {
    try {
      let playlistsLocal = playlists;
      if (!playlistsLocal || playlistsLocal.length === 0) {
        const dataPlaylist = await getObtenerTodasPlaylistUsuario();
        const formato = dataPlaylist.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          imagen: item.imagen,
        }));
        setPlaylists(formato);
        playlistsLocal = formato;
      }

      const meGustaFake = {
        id: -1,
        nombre: "Me Gustas",
        descripcion: "Tus me gustas",
        imagen: meGusta
      };

      setAlbumes([meGustaFake, ...playlistsLocal]);
    } catch (err) {
      console.error("Error cargando playlists:", err);
    }
  };

  const handleAgregarAlbum = async (dto: any) => {
    const key = String(dto.idPlaylist);
    const estadoActual = isPressed[key] ?? false;
    if (estadoActual) {
      setIsPressed(prev => ({ ...prev, [key]: false }));
      return;
    }
    setIsPressed(prev => ({ ...prev, [key]: true }));

    try {
      if (dto.idPlaylist === -1) {
        const validacionResp = await getValidarCancionMeGusta(dto.idCancion);
        const existeEnBackend = (typeof validacionResp === 'boolean') ? validacionResp : !!(validacionResp && validacionResp.existe);

        if (existeEnBackend) {
          Alert.alert("Error", "La canción ya existe en Me Gustas.");
          setIsPressed(prev => ({ ...prev, [key]: false }));
          return;
        }
        const yaExisteLocal = megusta.some((c: any) => c.id_Cancion === dto.idCancion);
        if (yaExisteLocal) {
          Alert.alert("Error", "La canción ya está en Me Gustas.");
          setIsPressed(prev => ({ ...prev, [key]: false }));
          return;
        }

        await postAgregarDataCancionMeGusta({
          id_Cancion: dto.idCancion,
          nombre_Cancion: dto.nombre_Cancion,
          imagen_Cancion: dto.imagen_Cancion,
          artista_Cancion: dto.artista_Cancion
        });
        await postAgregarCancionMeGusta(dto.idCancion);
        const dataMeGusta = await getVerCancionesMeGusta();
        setMeGusta(dataMeGusta);

        Alert.alert("Éxito", "Se agregó la canción a Me Gustas.");
        setIsPressed(prev => ({ ...prev, [key]: false }));
        return;
      }

      const verificacion = await getVerificarCancionPlaylist(dto.idCancion, dto.idPlaylist);
      if (verificacion) {
        Alert.alert("Error", "La canción ya existe en la playlist.");
        setIsPressed(prev => ({ ...prev, [key]: false }));
        return;
      }
      const responseAgregar = await postAgregarCancionPlaylist(dto);
      if (!playlistDetalles[dto.idPlaylist]) {
        const dataCancionesAlbum = await getObtnerDatosPlaylistUsuario(dto.idPlaylist);
        setPlaylistDetalles((prev: any) => ({
          ...prev,
          [dto.idPlaylist]: [...dataCancionesAlbum, responseAgregar]
        }));
        Alert.alert("Éxito", "Se agregó la canción a la playlist.");
        setIsPressed(prev => ({ ...prev, [key]: false }));
        return;
      }

      setPlaylistDetalles((prev: { [x: string]: any; }) => ({
        ...prev,
        [dto.idPlaylist]: [...prev[dto.idPlaylist], responseAgregar]
      }));
      Alert.alert("Éxito", "Se agregó la canción a la playlist.");
      setIsPressed(prev => ({ ...prev, [key]: false }));
    } catch (error) {
      console.error("Error agregando canción:", error);
      setIsPressed(prev => ({ ...prev, [String(dto.idPlaylist)]: false }));
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.headerRow}>
            <View style={modalStyles.headerSideSpacer} />
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
                <Image source={item.id === -1 ? item.imagen : { uri: item.imagen }} style={modalStyles.albumImage} />
                <View style={modalStyles.cancionInfo}>
                  <Text style={modalStyles.cancionTitulo}>{item.nombre}</Text>
                  <Text style={modalStyles.cancionDuracion}>{item.descripcion}</Text>
                </View>

                <Pressable
                  onPress={() =>
                    handleAgregarAlbum({
                      idCancion,
                      idPlaylist: item.id,
                      nombre_Cancion: nombreCancion,
                      imagen_Cancion: imagenCancion,
                      artista_Cancion: artistaCancion
                    })
                  }
                  style={[
                    modalStyles.botonAgregar,
                    { backgroundColor: isPressed[String(item.id)] ? "#1ef19dff" : "#f2f3f2d1" },
                  ]}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
