import api from './apiClient';

export const getGruposDocente = async () => {
  const response = await api.get('Grupos/gruposdocente');
  return response.data.datos;
};

export const getGruposAlumnos = async () => {
  const response = await api.get('Grupos/gruposalumno');
  return response.data.datos;
};

// GET api/Grupos/alumnos/{id} -> lista de alumnos inscritos en el grupo
export const getAlumnosPorGrupo = async (idGrupo) => {
  const response = await api.get(`Grupos/alumnos/${idGrupo}`);
  // según el backend, puede devolver directamente el array o en data.datos
  return response.data.datos ?? response.data;
};

// GET api/Grupos/alumno-fuera?idGrupo=6&idAlumno=6 -> devuelve alumno si NO está en el grupo
export const getAlumnoPorMatriculaFuera = async (idGrupo, idAlumno) => {
  const response = await api.get(`Grupos/alumno-fuera?idGrupo=${idGrupo}&idAlumno=${idAlumno}`);
  return response.data.datos ?? response.data;
};

// POST api/Grupos/agregar-alumno  body: { idGrupo, idAlumno }
export const agregarAlumnoAGrupo = async (payload) => {
  const response = await api.post('Grupos/agregar-alumno', payload);
  return response.data;
};

// DELETE api/Grupos/eliminar-alumno  body: { idGrupo, idAlumno }
export const eliminarAlumnoDelGrupo = async (payload) => {
  // axios.delete supports passing body via data
  const response = await api.delete('Grupos/eliminar-alumno', { data: payload });
  return response.data;
};



