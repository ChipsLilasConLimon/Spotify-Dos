import api from './apiClient';

export const getObtenerDatosDeUsuario = async () => {
    const response = await api.get(`usuario/datos-usuario`);
    return response.data.datos;
};
export const getObtenerDatosDeUsuarioRegistro = async () => {
  const response = await api.get(`usuario/usuario`);
  return response.data.datos;
};
export const postActualizarNombreUsuario = async (nombre) => {
  const response = await api.post(`usuario/actualizar-nombre?nombre=${nombre}`);
  return response.data.datos;
};
export const postActualizarApellidoUsuario = async (apellido) => {
  const response = await api.post(`usuario/actualizar-apellido?apellido=${apellido}`);
  return response.data.datos;
};
export const postActualizarDescripcioUsuario = async (descripcion) => {
  const response = await api.post(`usuario/actualizar-descripcion?descripcion=${descripcion}`);
  return response.data.datos;
};
export const postActualizarImagenUsuario = async (url) => {
  const response = await api.post(`usuario/actualizar-imagen?url=${url}`);
  return response.data.datos;
};
// ME GUSTAS DEL USUARIO
export const postAgregarCancionMeGusta = async (idCancion) => {
  const response = await api.post(`usuario/me-gusta-agregar?idCancion=${idCancion}`);
  return response.data.datos;
};
export const getVerCancionesMeGusta = async () => {
  const response = await api.get(`usuario/me-gusta-lista`);
  return response.data.datos;
};
export const deleteEliminarCancionMeGusta = async (idCancion) => {
  const response = await api.delete(`usuario/me-gusta-eliminar?idCancion=${idCancion}`);
  return response.data.datos;
};
export const getValidarCancionMeGusta = async (idCancion) => {
  const response = await api.get(`usuario/verificar-cancion-existente?idCancion=${idCancion}`);
  return response.data;
};
export const postAgregarDataCancionMeGusta = async (dto) => {
  const response = await api.post(`usuario/add-data-cancion`, dto);
  return response.data;
};