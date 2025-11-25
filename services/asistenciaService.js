import api from './apiClient';


export const getTodasAsistencias = async (idGrupo) => {
  const response = await api.get(`asistencia/todasporgrupo?id=${idGrupo}`);
  return response.data.datos;
};
export const getTodasAsistenciasDeAlumno = async (idGrupo) => {
  const response = await api.get(`asistencia/todasporgrupoalumno?idGrupo=${idGrupo}`);
  return response.data.datos;
};

export const agregarAsistencia = async (nuevaAsitenciaDto) => {
  const response = await api.post('asistencia/crear', nuevaAsitenciaDto);
  return response.data.datos; 
};

export const eliminarAsistencia = async (idAsistencia) => {
  const response = await api.delete(`asistencia/eliminar?id=${idAsistencia}`);
  return response.data;
};

export const getAlumnosDeAsistencia = async (idAsistencia) => {
  const response = await api.get(`asistencia/listaalumnos?id=${idAsistencia}`);
  return response.data.datos;
};
export const actualizarAsistencia = async (id, estatus) => {
  const response = await api.put(`asistencia/registrar?id=${id}&estatus=${estatus}`);
  return response.data; 
};
export const actualizarAsistenciaQr = async (id, idAlumno) => {
  const response = await api.put(`asistencia/registrarqr?idAsistencia=${id}&idAlumno=${idAlumno}`);
  return response.data; 
};