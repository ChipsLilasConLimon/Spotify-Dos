import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  // CONTENEDOR PRINCIPAL
  containerLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#2c2c2cff',
  },

  // FONDO
  backgroundImageLogin: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // HEADER
  headerLogin: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  headerTitleLogin: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    paddingTop: 80,
    textAlign: "center",
  },

  headerSubtitleLogin: {
    color: '#e6e3e3ff',
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  logoImageLogin: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
  logoImageDiscordLogin: {
    width: 30,
    height: 25,
    marginTop: 1,
    marginBottom: 1,
  },

  // CARD DE INPUTS
  cardInputLogin: {
    width: "95%",
    backgroundColor: "#141414ff",
    borderRadius: 20,
    padding: 25,
    marginBottom: 0,
    elevation: 5,
    height: "60%",

    // CENTRAR TODO
    justifyContent: "flex-start"
  },

  loaderLogin: {
    alignSelf: 'center',
    marginBottom: 15,
  },

  labelLogin: {
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
    marginTop: 10,
  },

  inputLogin: {
    borderWidth: 1,
    borderColor: '#c2bfbfff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,

    // INPUT BLANCO TEXTO NEGRO
    backgroundColor: '#fff',
    color: '#000',
  },

  errorTextLogin: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },

  buttonLogin: {
    backgroundColor: '#14c08cff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonRegisterLogin: {
    backgroundColor: '#11626dff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },

  buttonTextLogin: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerLogin: {
  height: 0.5,
  width: "100%",
  backgroundColor: "#D3D3D3",
  marginVertical: 4,
  marginBottom: 10,
  marginTop: 30,
},
buttomDiscodLogin: {
  backgroundColor: "#5865F2",
  width: 50,          
  height: 50,         
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
  marginTop: 20,
},
//MAIN
containerMain: { 
  flex: 1, 
  backgroundColor: '#000000ff' 
},
centerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerTextMain: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },

  headerMain: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 6,
    textAlign: 'left',
    borderRadius: 5,
  },
  headerFlatListMain: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 8,
    textAlign: 'left',
  },

  grupoCardMain: {
  backgroundColor: 'transparent',
  padding: 5,
  borderRadius: 8,
  marginBottom: 60,
  elevation: 2,
  width: 180,
  marginRight: 10,
  height: 150,
  },
  botonCardMain: {
  backgroundColor: 'transparent',
  width: 160,
  height: 150,
  },

  grupoTitleMain: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fdfdfdff',
  },

  errorTextMain: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },

  bottomButtonsMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },

  bannerImageMain: {
    width: '100%',
    height: 150,
    borderRadius: 2,
    marginBottom: 2,
    alignSelf: 'center',
  },
  imageLogoAppMain: {
    width: 50,
    height: 50,
    borderRadius: 2,
    marginBottom: 2,
  },
  bannerLogoAppMain: {
    width: "100%",
    height: 90,
    borderRadius: 2,
    marginBottom: 2,
  },
headerBackgroundMain: {
  width: "100%",
  height: 55, 
  justifyContent: "center",
  marginBottom: 20,
},

headerRowContentMain: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 0,
},

// PLAYLIST
 containerMainPlaylist: { 
    flex: 1,
    backgroundColor: '#000', 
    paddingHorizontal: 15,
  },

  bannerImageMainPlaylist: {
    width: '100%',
    height: 230,
    alignSelf: 'center',
    marginTop: 10,
  },

  headerAlbumTitlePlaylist: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'left',
  },

  headerAlbumFechaPlaylist: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'left',
  },

  lineaSeparadoraPlaylist: {
    height: 1,
    width: '100%',
    backgroundColor: '#333',
    marginBottom: 15,
  },

  grupoCardMainPlaylist: {
    width: '100%',
    marginBottom: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },

  botonCardMainPlaylist: {
    width: '100%',
    backgroundColor: '#222222ff',
    padding: 10,
  },
  cancionTituloPlaylist: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  cancionDuracionPlaylist: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  centerMainPlaylist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backgroundPlaylist: {
    backgroundColor: '#000',
  },
});
