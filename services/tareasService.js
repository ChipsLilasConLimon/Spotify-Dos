// Archivo: services/tareasService.js
import api from './apiClient';

// GET api/tarea?id={idGrupo}
export const getTodasTareas = async (idGrupo) => {
  const response = await api.get(`Tarea?id=${idGrupo}`);
  return response.data.datos;
};

// GET api/tarea/tareasalumnos?id={idTarea}
export const getTareasDeAlumnos = async (idTarea) => {
  const response = await api.get(`Tarea/tareasalumnos?id=${idTarea}`);
  return response.data.datos;
};

// POST api/tarea
export const agregarTarea = async (nuevaTareaDto) => {
  const response = await api.post('Tarea', nuevaTareaDto);
  return response.data; // Retorna string o mensaje del backend
};

// PUT api/Tarea/calificar
export const calificarTarea = async (calificarTareaDto) => {
  const response = await api.put('Tarea/calificar', calificarTareaDto);
  return response.data;
};

// PUT api/Tarea/update
export const actualizarTarea = async (tareaUpdateDto) => {
  const response = await api.put('Tarea/update', tareaUpdateDto);
  return response.data;
};

// DELETE api/Tarea/delete?id={idTarea}
export const eliminarTarea = async (idTarea) => {
  const response = await api.delete(`Tarea/delete?id=${idTarea}`);
  return response.data;
};

// POST api/Tarea/subirtarea (Para alumnos)
export const crearEntregarTareaAlumno = async (subirTareaAlumnoDto) => {
  const response = await api.post('Tarea/subirtarea', subirTareaAlumnoDto);
  return response.data;
};

// PUT api/Tarea/calificar (alias calificar)
export const calificar = async (calificarTareaDto) => {
  const response = await api.put('Tarea/calificar', calificarTareaDto);
  return response.data;
};

export const calificarQr = async (calificarTareaDto) => {
  const response = await api.put('Tarea/calificarqr', calificarTareaDto);
  return response.data;
};
