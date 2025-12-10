import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import logoLike from "../../../assets/images/me-gusta-logo.png";
import logoTuerca from "../../../assets/images/tuerca.png";
import logoSinUsuario from "../../../assets/images/usuario-sin-foto.png";
import CerrarSesionButton from '../../../components/CerrarSesionPressable';
import { useGlobalStore } from "../../../contexts/global-context";
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
  const [refresh, setRefresh] = useState(false);
  const [datosusuario, setDatosUsuario] = useState<DataUsuarios>();
  const [datosusuarioregistro, setDatosUsuarioRegistro] = useState<Usuario>();
  const { playlists, setPlaylists } = useGlobalStore();

  const router = useRouter();

   useEffect(() => {
          obtenerDatos();
         }, []);

  const onRefreshData = async () => {
     setRefresh(true);
    obtenerDatos();
    setRefresh(false);
  }

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
    if (playlists.length === 0) {
    const dataPlaylist = await getObtenerTodasPlaylistUsuario();
    setPlaylists(dataPlaylist); // ← GUARDADO GLOBAL
  }
   setDatosUsuario(datosUsuarioMapeado);
   setDatosUsuarioRegistro(dataUsuarioRegistro);
    
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

  const handleVerAlbum = (playlistId: number, nombre: string, descripcion: string, imagen: string) => {
    router.push(`/(tabs)/cuenta/ver-playlist-usuario?playlistId=${playlistId}&nombre=${nombre}&descripcion=${descripcion}&imagen=${imagen}`);
  }
  return (
  <ScrollView 
    style={{ flex: 1, backgroundColor: "#1a1a1a" }}
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
    refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefreshData} // METOOD  A EJECUTAR
          tintColor="#0cad87ff"    
          colors={["#09a77fff"]}      
        />
      }
  >
    <View style={perfilStyles.containerPerfil}>
      <View style={perfilStyles.perfilHeader}>
        {datosusuario?.url_Perfil === null || datosusuario?.url_Perfil === "" ? (
          <Image source={logoSinUsuario} style={perfilStyles.perfilImagen} />
        ) : (
          <Image source={{ uri: datosusuario?.url_Perfil }} style={perfilStyles.perfilImagen} />
        )}

        <View>
          <Text style={perfilStyles.usernameText}>
            {datosusuarioregistro?.username}
          </Text>

          <Text style={perfilStyles.nombreText}>
            {datosusuarioregistro?.nombre_Usuario} {datosusuarioregistro?.apellido_Usuario}
          </Text>

          <Text style={perfilStyles.nombreTextFecha}>
            Usuario desde:{" "}
            {datosusuario?.fecha_Creacion
              ? handleFormatearFecha(datosusuario.fecha_Creacion)
              : ""}
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={perfilStyles.divider} />

      {/* Botón ME GUSTAS */}
      <Pressable onPress={handleVerMeGustasScreen} style={perfilStyles.botonRectangulo}>
        <Text style={perfilStyles.botonRectanguloText}>Ver Me Gustas</Text>
        <Image source={logoLike} style={perfilStyles.iconoDerecha} />
      </Pressable>

      {/* DIVIDER */}
      <View style={perfilStyles.divider} />

      {/* PLAYLISTS */}
      <Text style={perfilStyles.tituloSeccion}>Playlists Creadas por Ti</Text>

      <FlatList
        data={playlists}
        numColumns={2}
        scrollEnabled={false} // ← CLAVE: para que sea parte del ScrollView
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={perfilStyles.flatListContainer}
        columnWrapperStyle={perfilStyles.fila}
        renderItem={({ item }) => (
          <View style={perfilStyles.itemContainer}>
            <Pressable
              onPress={() => handleVerAlbum(item.id, item.nombre, item.descripcion, item.imagen)}
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

      {/* CONFIGURACIÓN */}
      <Pressable onPress={handleIrConfiguracion} style={perfilStyles.botonRectangulo}>
        <Text style={perfilStyles.botonRectanguloText}>Ir a Configuración</Text>
        <Image source={logoTuerca} style={perfilStyles.iconoDerechaConfig} />
      </Pressable>

      {/* CERRAR SESIÓN */}
      <View style={{ marginTop: 20 }}>
        <CerrarSesionButton onPress={handleCerrarSesion} />
      </View>

    </View>
  </ScrollView>
);

}