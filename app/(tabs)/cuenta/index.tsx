import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import logoLike from "../../../assets/images/me-gusta-logo.png";
import logoSinUsuario from "../../../assets/images/usuario-sin-foto.png";
import CerrarSesionButton from '../../../components/CerrarSesionPressable';
import { getObtenerTodasPlaylistUsuario } from '../../../services/playlistService';
import { getObtenerDatosDeUsuario, getObtenerDatosDeUsuarioRegistro } from '../../../services/usuariosdatosService';
import { perfilStyles } from "../../../styles/perfil-styles";

type DataUsuarios = {
  id: number;
  id_Usuario: number;
  url_Perfil: string | null;
  descripcion: string | null;
  fecha_Creacion: string;
};
type Usuario = {
  id: number;
  username: string;
  email: string;
  apellido_Usuario: string | null;
  nombre_Usuario: string | null;
  password_Usuario: string | null;
  rol: string;
};
type Albumes = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}
export default function PerfilUsuarioScreen() {
  const [datosusuario, setDatosUsuario] = useState<DataUsuarios>();
  const [datosusuarioregistro, setDatosUsuarioRegistro] = useState<Usuario>();
  const [albumes, setAlbumes] = useState<Albumes[]>([]);
  const router = useRouter();

   useEffect(() => {
          obtenerDatos();
         }, []);

  const obtenerDatos = async () => {
    const dataUsuario = await getObtenerDatosDeUsuario();
    const datosUsuarioMapeado: DataUsuarios = {
                id: dataUsuario.id,
                id_Usuario: dataUsuario.id_Usuario,
                url_Perfil: dataUsuario.url_Perfil,
                descripcion: dataUsuario.descripcion,
                fecha_Creacion: dataUsuario.fecha_Creacion
            };
    const dataUsuarioRegistro = await getObtenerDatosDeUsuarioRegistro();
    const dataPlaylist = await getObtenerTodasPlaylistUsuario();
     const nuevoDataAlbumes = dataPlaylist.map((item: { id: any; nombre: any; descripcion: any; imagen: any }) => ({
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                imagen: item.imagen
            }));
    setDatosUsuario(datosUsuarioMapeado);
    setDatosUsuarioRegistro(dataUsuarioRegistro);
    setAlbumes(nuevoDataAlbumes);
  };

  const handleCerrarSesion = async  () => {
    try{
      
    Alert.alert('Cierre de Sesión', 'Se cerró sesión correctamente');
    router.push('/(auth)/login');
    }catch{
      Alert.alert('Error', 'No se cerró sesión');
    }
  };
  const handleIrConfiguracion = () => {
     router.push(`/(tabs)/cuenta/configuracion`);
  }
  const handleVerMeGustasScreen = () => {
     router.push(`/(tabs)/cuenta/ver-megusta`);
  }
  const handleFormatearFecha =  (fecha: string) => {
        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          const [year, month, day] = fecha.split("-");
          const nombreMes = meses[parseInt(month) - 1];
          return `${parseInt(day)} de ${nombreMes} de ${year}`;
       }

  const handleVerAlbum = (id: number) => {

  }

  return (
  <View style={perfilStyles.containerPerfil}>
  <View style={perfilStyles.perfilHeader}>
    {datosusuario?.url_Perfil === null || datosusuario?.url_Perfil === "" ? (
      <Image source={logoSinUsuario} style={perfilStyles.perfilImagen}/>
    ): (
      <Image source={{ uri: datosusuario?.url_Perfil }} style={perfilStyles.perfilImagen}/>
    )}
    <View>
      <Text style={perfilStyles.usernameText}>{datosusuarioregistro?.username}
      </Text>
      <Text style={perfilStyles.nombreText}>{datosusuarioregistro?.nombre_Usuario} {datosusuarioregistro?.apellido_Usuario}
      </Text>
      <Text style={perfilStyles.nombreTextFecha}> Usuario desde: {datosusuario?.fecha_Creacion
    ? handleFormatearFecha(datosusuario.fecha_Creacion)
    : ""}
     </Text>
    </View>
  </View>

  {/* DIVIDER */}
  <View style={perfilStyles.divider} />

  {/* BOTÓN ME GUSTAS */}
  <Pressable onPress={handleVerMeGustasScreen} style={perfilStyles.botonRectangulo}>
    <Text style={perfilStyles.botonRectanguloText}>Ver Me Gustas</Text>
    <Image source={logoLike} style={perfilStyles.iconoDerecha}/>
  </Pressable>

  {/* DIVIDER */}
  <View style={perfilStyles.divider} />

  {/* SECCIÓN PLAYLIST */}
  <Text style={perfilStyles.tituloSeccion}>Playlists Creadas por Ti</Text>

  <FlatList
      data={albumes}
      numColumns={2} 
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={perfilStyles.flatListContainer}
      columnWrapperStyle={perfilStyles.fila}
      renderItem={({ item }) => (
        <View style={perfilStyles.itemContainer}>
          <Pressable
            onPress={() => handleVerAlbum(item.id)}
            style={({ pressed }) => [
              perfilStyles.pressable,
              pressed && perfilStyles.hover, 
            ]}
          >
            <Image
              source={{ uri: item.imagen }}
              resizeMode="cover"
              style={perfilStyles.imagen}
            />
          </Pressable>
          <Text numberOfLines={1} style={perfilStyles.nombre}>
            {item.nombre}
          </Text>
        </View>
      )}
    />
  <Pressable onPress={handleIrConfiguracion} style={perfilStyles.botonRectangulo}>
    <Text style={perfilStyles.botonRectanguloText}>Ir a Configuración</Text>
  </Pressable>
  <View style={{ marginTop: 20 }}>
    <CerrarSesionButton onPress={handleCerrarSesion} />
  </View>
</View>
  );
}