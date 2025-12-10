import { StyleSheet } from "react-native";

export const playlistUsuarioStyles = StyleSheet.create({
rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  itemTouchable: {
    flex: 1, 
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  albumImage: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },

  textContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    flexShrink: 1,
  },

  menuContainer: {
    marginLeft: 10,
    padding: 5,
  },
});