import api from './apiClient';

export const getBuscarCancionPorNombre = async (titulo) => {
  const response = await api.get(`deezer/busqueda-cancion?title=${titulo}`);
  return response.data.data;
};
export const getBuscarAlbumPorNombre = async (titulo) => {
  const response = await api.get(`deezer/busqueda-album?title=${titulo}`);
  return response.data.data;
};
export const getBuscarArtistaPorNombre = async (titulo) => {
  const response = await api.get(`deezer/busqueda-artista?title=${titulo}`);
  return response.data.data;
};