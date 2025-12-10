import { createContext, ReactNode, useContext, useState } from "react";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [userData, setUserData] = useState({
    id: null,
    id_Usuario: null,
    url_Perfil: null,
    descripcion: null,
    fecha_Creacion: null,
  });

  const [userRegister, setUserRegister] = useState({
    id: null,
    username: null,
    email: null,
    apellido_Usuario: null,
    nombre_Usuario: null,
    password_Usuario: null,
    rol: null,
  });

  const [playlists, setPlaylists] = useState([]);
  const [playlistDetalles, setPlaylistDetalles] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        userData, setUserData,
        userRegister, setUserRegister,
        playlists, setPlaylists,
        playlistDetalles, setPlaylistDetalles
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalContext);
