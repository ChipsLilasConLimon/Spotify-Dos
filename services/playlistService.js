import { useAlbumesUsuarioStore } from "../store/userdata";
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
    state.sePlaylistUser([
      ...(state.array || []),
      response.data.datos
    ]);
    return response.data.datos;
  }catch(error){
    console.log("Error al crear el álbum:", error.response?.data || error.message);
  }
};