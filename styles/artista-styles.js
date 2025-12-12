import { StyleSheet } from "react-native";

export const artistaStyles = StyleSheet.create({
    // VER ARTISTA
  imageCancionesArtista: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 5,
  },
  bannerContainerPlaylist: {
  width: '100%',
  height: 265,            
  position: 'relative',
  marginBottom: 10,       
},

bannerImageMainPlaylist: {
  width: '100%',
  height: '100%',
},
bannerTextContainer: {
  position: 'absolute',
  bottom: 10,          
  left: 15,
  right: 15,
},
bannerTextPlaylist: {
  color: '#fff',       
  fontSize: 40,
  fontWeight: 'bold',
  flexWrap: 'wrap',       
},
separadorArtista: {
    height: 20,
    width: '100%',
    backgroundColor: '#000000ff',
    marginBottom: 10,
  },
  txtSubtitleArtista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
    paddingHorizontal: 7,
  },
  cancionCard: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 10,
  backgroundColor: '#0f0f0f',
},

albumImage: {
  width: 55,
  height: 55,
  borderRadius: 2,
  marginRight: 12,
},

cancionInfo: {
  flexDirection: 'column',
  flex: 1,
},

cancionTitulo: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
},

cancionDuracion: {
  fontSize: 13,
  color: '#b3b3b3',
  marginTop: 3,
},

divider: {
  width: '100%',
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.15)', 
},

listaContainer: {
  paddingHorizontal: 20,
  paddingBottom: 20,
},
fadeBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
  },
  addButton: {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
},
addIcon: {
  width: 24,
  height: 24,
  tintColor: "#fff",
},
});