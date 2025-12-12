import { createContext, ReactNode, useContext, useState } from "react";

export const initialUserData = {
  id: null,
  id_Usuario: null,
  url_Perfil: null,
  descripcion: null,
  fecha_Creacion: null,
};

export const initialUserRegister = {
  id: null,
  username: null,
  email: null,
  apellido_Usuario: null,
  nombre_Usuario: null,
  password_Usuario: null,
  rol: null,
};

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [userData, setUserData] = useState(initialUserData);

  const [userRegister, setUserRegister] = useState(initialUserRegister);

  const [playlists, setPlaylists] = useState([]);
  const [megusta, setMeGusta] = useState([]);
  const [playlistDetalles, setPlaylistDetalles] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        userData, setUserData,
        userRegister, setUserRegister,
        playlists, setPlaylists,
        playlistDetalles, setPlaylistDetalles,
        megusta, setMeGusta
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalContext);
