import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(57, 57, 57, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "90%",
    maxWidth: 400,
    height: 550,
    backgroundColor: "#111",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    alignSelf: "center",
  },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 5,
  },

  headerSideSpacer: {
    width: 30,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },

  closeButton: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    width: 18,
    height: 18,
    tintColor: "#fff",
  },

  listaPlaylist: {
    paddingBottom: 20,
  },

  cancionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  albumImage: {
    width: 55,
    height: 55,
    borderRadius: 4,
    marginRight: 12,
  },

  cancionInfo: {
    flex: 1,
  },
  cancionTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cancionDuracion: {
    fontSize: 13,
    color: "#cdcdcd",
    marginTop: 2,
  },
  botonAgregar: {
    width: 25,
    height: 25,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  botonAgregarIcono: {
    width: 12,
    height: 12,
    tintColor: "#fff",
  },
});
