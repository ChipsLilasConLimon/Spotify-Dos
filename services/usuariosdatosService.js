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