import api from './apiClient';

export const getCancionesPopulares = async (type) => {
  const response = await api.get(`deezer/popular?type=${type}`);
  return response.data.data;
};
export const getAlbumesPopulares = async (type) => {
  const response = await api.get(`deezer/popular?type=${type}`);
  return response.data.data;
};
export const getArtistasPopulares = async (type) => {
  const response = await api.get(`deezer/popular?type=${type}`);
  return response.data.data;
};
export const getDetallesAlbum = async (id) => {
  const response = await api.get(`deezer/id-album?id=${id}`);
  return response.data;
};
export const getCancionesDeAlbum = async (id) => {
  const response = await api.get(`deezer/canciones-album?id=${id}`);
  return response.data.data;
};
export const getCancionesPopularesDeArtista = async (id) => {
  const response = await api.get(`deezer/id-artista?id=${id}`);
  return response.data.data;
};
export const getInformacionDeArtista = async (id) => {
  const response = await api.get(`deezer/info-artista?id=${id}`);
  return response.data;
};