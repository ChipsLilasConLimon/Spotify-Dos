import { StyleSheet } from "react-native";

export const meGustaStyles = StyleSheet.create({
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
fadeBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
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
    height: 10,
    width: '100%',
    backgroundColor: '#000000ff',
    marginBottom: 5,
  },
  centerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundPlaylist: {
    backgroundColor: '#000',
  },
  lineaSeparadoraPlaylist: {
    height: 1,
    width: '100%',
    backgroundColor: '#333',
    marginBottom: 15,
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
});