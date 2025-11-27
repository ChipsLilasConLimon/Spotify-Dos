import { create } from "zustand";

export const useUserDataStore = create((set) => ({
    id: null,
    id_Usuario: null,
    url_Perfil: null,
    descripcion: null,
    fecha_Creacion: null,

    setDatosUsuario: (id: number,  id_Usuario: number, url_Perfil: string, descripcion: string, fecha_Creacion: string) => set({id, id_Usuario, url_Perfil, descripcion, fecha_Creacion}),
    setImagenPerfil: (url_Perfil: string) => set({url_Perfil}),
    deleteDatosUsuario: () =>set({ id: null, id_Usuario: null, url_Perfil: null, descripcion: null, fecha_Creacion: null }),
}));

export const useUserDataRegisterStore = create((set) => ({
    id: null,
    username: null,
    email: null,
    apellido_Usuario: null,
    nombre_Usuario: null,
    password_Usuario: null,
    rol: null,
    setDatosUsuarioRegistro: (id: number,  username: string, email: string, apellido_Usuario: string, nombre_Usuario: string, password_Usuario: string, rol: string,) => set({id, username, email, apellido_Usuario, nombre_Usuario, password_Usuario, rol}),
    deleteDatosUsuarioRegistro: () =>set({ id: null, username: null, email: null, apellido_Usuario: null, nombre_Usuario: null, password_Usuario: null, rol: null }),
}));