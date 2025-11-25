import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";

import SearchAlbum from "./buscarAlbum";
import SearchCancion from "./buscarCancion";

const Tab = createMaterialTopTabNavigator();

export default function TabSuperior() {

    return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#00ff84" }, // linea verde
        tabBarStyle: { backgroundColor: "#000" },             // fondo negro
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
      >
     <Tab.Screen name="Musica" component={SearchCancion} />
     <Tab.Screen name="Albumes" component={SearchAlbum} />
    </Tab.Navigator>
    );
}
