
import api from './apiClient';

export const getidUsuario = async () => {
  const response = await api.get('Usuarios/idalumno');
  return response.data.datos;
};