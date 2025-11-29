import { useAlbumesDeatllesUsuarioStore, useAlbumesUsuarioStore } from "../store/userdata";
import api from './apiClient';

export const getObtenerTodasPlaylistUsuario = async () => {
  const state = useAlbumesUsuarioStore.getState();
  const { array } = state;
  if (Array.isArray(array) && array.length > 0) {
  return array; 
}
  const response = await api.get(`playlist/obtener-playlists`);
  state.sePlaylistUser(
    response.data.datos
  );
  return response.data.datos;
};
export const postPostearImagenAlbum = async (imagenBase64) => {
  const body = {
    imagen: imagenBase64,
  };
  const response = await api.post(`cloudinary/subir-imagen-album`, body);
  return response.data;
};
export const getCrearAlbum = async (dto) => {
  try{
    const state = useAlbumesUsuarioStore.getState();
    const response = await api.post(`playlist/crear`, dto);
    const data = response.data.datos;
    const nuevoAlbum = {
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: data.imagen
  };
    state.sePlaylistUser([
    ...(state.array || []),
    nuevoAlbum
  ]);
    return nuevoAlbum;
  }catch(error){
    console.log("Error al crear el álbum:", error.response?.data || error.message);
  }
};

export const getObtnerDatosPlaylistUsuario = async (idPlaylist) => {
    const store = useAlbumesDeatllesUsuarioStore.getState();
    const diccionario = store.diccionario;
    if(diccionario[idPlaylist]) {
      return diccionario[idPlaylist];
    }
    const response = await api.get(`playlist/obtener-canciones-playlist?id=${idPlaylist}`);
    const data = response.data.datos;
     store.setDatosDePlaylistsUsuario(idPlaylist, data);
     return data;
};
