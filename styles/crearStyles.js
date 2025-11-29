import { StyleSheet } from "react-native";
export const crearStyles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#000",
  },

  headerTitle: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },

  label: {
    fontSize: 17,
    color: "#ffffffcc",
    marginBottom: 6,
    marginTop: 15,
  },

  input: {
    width: "100%",
    backgroundColor: "#1c1c1e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginVertical: 18,
  },

  // Imagen vacía
  emptyImageBox: {
    width: 280,
    height: 280,
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "#1c1c1e",
    borderWidth: 1,
    borderColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  emptyImageText: {
    color: "#666",
    fontSize: 16,
  },

  // Imagen cargada
  imagePreview: {
    width: 280,
    height: 280,
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 10,
  },

  pickImageButton: {
    backgroundColor: "#333",
    borderRadius: 3,
    width: "60%",
    height: 45,         
    alignItems: "center",
    justifyContent: "center",
  },

  pickImageText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  //  BOTÓN ELIMINAR
  eliminarButton: {
    backgroundColor: "#333",
    width: 45,
    height: 45,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  eliminarImagenButton: {
    width: 22,
    height: 22,
    tintColor: "#9b0606ff",
  },

  crearButton: {
    backgroundColor: "#1db98fff",
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },

  crearButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  labelElegirImagen: {
    fontSize: 17,
    color: "#ffffffcc",
    marginBottom: 2,
    marginTop: 25,
  },
  buttonHover: {
    backgroundColor: "#119270ff",
  },
  buttonPressed: {
    backgroundColor: "#1e9575ff",
  },
    // ===== MODAL DE CARGA =====
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: 275,
    height: 130,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
});