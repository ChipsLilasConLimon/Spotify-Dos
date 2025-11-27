import { StyleSheet } from "react-native";

export const perfilStyles = StyleSheet.create({
    containerPerfil: {
    flex: 1,
    backgroundColor: "#1a1a1a", 
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // === HEADER DEL PERFIL ===
  perfilHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  perfilImagen: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 20,
    backgroundColor: "#333",
  },

  usernameText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  nombreText: {
    color: "#d1d0d0ff",
    fontSize: 19,
    marginTop: 3,
    fontWeight: "bold",
  },

  // === DIVIDER ===
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#3a3a3a",
    marginVertical: 15,
  },

  // === BOTÓN RECTANGULAR ===
  botonRectangulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: "#2a2a2a",
  },

  botonRectanguloText: {
    color: "#fff",
    fontSize: 16,
  },

  iconoDerecha: {
    width: 22,
    height: 22,
    tintColor: "#fff",
  },

  // === TÍTULOS DE SECCIONES ===
  tituloSeccion: {
    color: "#e3e3e3",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  nombreTextFecha: {
    color: "#b5b5b5",
    fontSize: 12,
    marginTop: 3,
  },
});