import api from './apiClient';

export const getObtenerTodasPlaylistUsuario = async () => {
  const response = await api.get("playlist/obtener-playlists");
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
    const response = await api.post(`playlist/crear`, dto);
    return response.data.datos;
};

export const getObtnerDatosPlaylistUsuario = async (idPlaylist) => {
      const response = await api.get(`playlist/obtener-canciones-playlist?id=${idPlaylist}`);
      return response.data.datos;
};
export const postAgregarCancionPlaylist = async (dto) => {
  const response = await api.post(
    "playlist/add-cancion-playlist", dto );
  return response.data.datos;
};
export const deleteEliminarCancionPlaylist = async (idCancion, idPlaylist) => {
  const response = await api.delete(`playlist/eliminar-cancion?idCancion=${idCancion}&idPlaylist=${idPlaylist}`);
  return response.data.datos;
};
export const getVerificarCancionPlaylist = async (idCancion, idPlaylist) => {
      const response = await api.get(`playlist/verificar-cancion-existente?idCancion=${idCancion}&idPlaylist=${idPlaylist}`);
      return response.data;
};
export const deleteEliminarPlaylist = async (idPlaylist) => {
      const response = await api.delete(`playlist/eliminar?id=${idPlaylist}`);
      return response.data;
};