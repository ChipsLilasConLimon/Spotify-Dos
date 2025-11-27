import api from './apiClient';

export const getObtenerTodasPlaylistUsuario = async () => {
  const response = await api.get(`playlist/obtener-playlists`);
  return response.data.datos;
};