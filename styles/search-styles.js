import { StyleSheet } from "react-native";

export const searchStyles = StyleSheet.create({
  containerInput: {
    width: "100%",
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 8,
  },
  input: {
  width: "100%",
  backgroundColor: "#f0eeeeff",
  height: 47,          
  borderRadius: 4,     
  paddingHorizontal: 16,
  fontSize: 15,        
  color: "#000",
},
screen: {
  flex: 1,
  backgroundColor: "#000",  
},
// PARA ELEMENTOS
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
  color: '#cdcdcdff',
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
  cancionRow: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 10,
  backgroundColor: "#0f0f0f",
},
cancionCard: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,  // ← Esto empuja el botón a la derecha
  paddingVertical: 12,
},
addButton: {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
},
addIcon: {
  width: 24,
  height: 24,
  tintColor: "#fff", // ← Hace la imagen blanca
},
});