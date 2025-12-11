import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import logoLike from "../../../assets/images/me-gusta-logo.png";
import logoTuerca from "../../../assets/images/tuerca.png";
import logoSinUsuario from "../../../assets/images/usuario-sin-foto.png";
import { useGlobalStore } from "../../../contexts/global-context";
import { getObtenerTodasPlaylistUsuario } from '../../../services/playlistService';
import { getObtenerDatosDeUsuario, getObtenerDatosDeUsuarioRegistro } from '../../../services/usuariosdatosService';
import { perfilStyles } from "../../../styles/perfil-styles";

export default function PerfilUsuarioScreen() {
  const [refresh, setRefresh] = useState(false);

  const {playlists, setPlaylists, userData, setUserData, userRegister, setUserRegister,} = useGlobalStore();

  const router = useRouter();

   useEffect(() => {
          obtenerDatos();
         }, []);

  const onRefreshData = async () => {
  setRefresh(true);
  await obtenerDatos();
  setRefresh(false);
};

  const obtenerDatos = async () => {
    if (!userData.id) {
       const dataUsuario = await getObtenerDatosDeUsuario();
       setUserData(dataUsuario);
    }
     if (!userRegister.id) {
       const dataUsuario = await getObtenerDatosDeUsuarioRegistro();
       setUserRegister(dataUsuario);
    }
    if (playlists.length === 0) {
    const dataPlaylist = await getObtenerTodasPlaylistUsuario();
    setPlaylists(dataPlaylist); // ← GUARDADO GLOBAL
  };
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
        {userData?.url_Perfil === null || userData?.url_Perfil === "" ? (
          <Image source={logoSinUsuario} style={perfilStyles.perfilImagen} />
        ) : (
          <Image source={{ uri: userData?.url_Perfil }} style={perfilStyles.perfilImagen} />
        )}

        <View>
          <Text style={perfilStyles.usernameText}>
            {userRegister?.username}
          </Text>

          <Text style={perfilStyles.nombreText}>
            {userRegister?.nombre_Usuario} {userRegister?.apellido_Usuario}
          </Text>

          <Text style={perfilStyles.nombreTextFecha}>
            Usuario desde:{" "}
            {userData?.fecha_Creacion
              ? handleFormatearFecha(userData.fecha_Creacion)
              : ""}
          </Text>
        </View>
      </View>
     <Text style={perfilStyles.descripcionText}>{userData?.descripcion ?? ""}</Text>

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
    </View>
  </ScrollView>
);

}