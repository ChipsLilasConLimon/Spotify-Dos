import { useUserDataRegisterStore, useUserDataStore } from "../store/userdata";
import api from './apiClient';

export const getObtenerDatosDeUsuario = async () => {
  const state = useUserDataStore.getState();
  const { id, id_Usuario, url_Perfil, descripcion, fecha_Creacion } = state;
  const datosCompletos = id !== null && id_Usuario !== null && url_Perfil !== null && descripcion !== null && fecha_Creacion !== null;
  if(datosCompletos) {
    return state;
  } else {
    const response = await api.get(`usuario/datos-usuario`);
    state.setDatosUsuario(
    response.data.datos.id,
    response.data.datos.id_Usuario,
    response.data.datos.url_Perfil,
    response.data.datos.descripcion,
    response.data.datos.fecha_Creacion
  );
    return response.data.datos;
  }
};
export const getObtenerDatosDeUsuarioRegistro = async () => {
  const state = useUserDataRegisterStore.getState();
  const { id, username, email, apellido_Usuario, nombre_Usuario, password_Usuario, rol } = state;
  const datosCompletos = id !== null && username !== null && email !== null && apellido_Usuario !== null && nombre_Usuario !== null && password_Usuario !== null && rol !== null;
  if(datosCompletos){
    return state;
  } 
  const response = await api.get(`usuario/usuario`);
  state.setDatosUsuarioRegistro(
    response.data.datos.id,
    response.data.datos.username,
    response.data.datos.email,
    response.data.datos.apellido_Usuario,
    response.data.datos.nombre_Usuario,
    response.data.datos.password_Usuario,
    response.data.datos.rol
  );
  return response.data.datos;
};