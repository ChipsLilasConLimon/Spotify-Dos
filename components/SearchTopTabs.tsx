import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";

import SearchAlbum from "./buscarAlbum";
import SearchArtista from "./buscarArtista";
import SearchCancion from "./buscarCancion";

const Tab = createMaterialTopTabNavigator();
type Props = {
  searchText: string;
};

export default function TabSuperior({ searchText }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#08cc91ff" },
        tabBarStyle: { backgroundColor: "#141414ff" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
    >

      <Tab.Screen name="Musica">
        {() => <SearchCancion searchText={searchText} />}
      </Tab.Screen>

      <Tab.Screen name="Albumes">
        {() => <SearchAlbum searchText={searchText} />}
      </Tab.Screen>

      <Tab.Screen name="Artistas">
        {() => <SearchArtista searchText={searchText} />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}