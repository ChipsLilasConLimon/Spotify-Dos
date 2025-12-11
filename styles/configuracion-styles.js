import { StyleSheet } from "react-native";

export const configuracionStyles = StyleSheet.create({

  screenContainerConfiguracion: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    gap: 20,
  },

  tituloPrincipalConfiguracion: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  seccionTituloConfiguracion: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
  },

  labelConfiguracion: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 5,
    marginTop: 10,
  },

  inputConfiguracion: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#333",
  },

  inputDescripcionConfiguracion: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#333",
  },

  dividerConfiguracion: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 20,
  },

  emptyImageTextConfiguracion: {
    color: "#797979ff",
    fontSize: 16,
  },

  emptyImageBoxConfiguracion: {
    width: 180,
    height: 180,
    backgroundColor: "#111",
    borderRadius: 999,              // CÍRCULO
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    alignSelf: "center",
    marginTop: 10,
  },

  imagePreviewConfiguracion: {
    width: 180,
    height: 180,
    borderRadius: 999,              // CÍRCULO
    alignSelf: "center",
    marginTop: 10,
  },

  rowButtonsConfiguracion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,                          // Más juntos
    marginTop: 12,
  },

  pickImageButtonConfiguracion: {
    backgroundColor: "#222",
    paddingVertical: 8,             // Más pequeño
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },

  pickImageTextConfiguracion: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },

  eliminarButtonConfiguracion: {
    backgroundColor: "#330000",
    padding: 6,                     // Más pequeño
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#550000",
  },

  eliminarImagenButtonConfiguracion: {
    width: 18,                      // Más pequeño
    height: 18,
    tintColor: "#ff4444",
  },

  crearButtonConfiguracion: {
    backgroundColor: "#1c936dff",
    paddingVertical: 8,             // Más pequeño
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  crearButtonTextConfiguracion: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  buttonPressedConfiguracion: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
  },

  editProfileButton: {
    backgroundColor: "#424e5bff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  editProfileButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

});
