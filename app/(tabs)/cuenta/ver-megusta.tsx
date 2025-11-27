import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

export default function MeGustaScreen() {
  const [imagen, setImagen] = useState<string | null>(null);
  const [urlFinal, setUrlFinal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  // ABRIR GALERÍA
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Necesitas dar permiso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].base64!);
    }
  };


  //SUBIR A CLOUDINARY
  const subirCloudinary = async () => {
    if (!imagen) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", `data:image/jpg;base64,${imagen}`);
    data.append("upload_preset", "spotify-dos");
    data.append("cloud_name", "db7ilumql"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/db7ilumql/image/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      setUrlFinal(json.secure_url);
    } catch (error) {
      console.log("Error subiendo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      {/* BOTÓN: ELEGIR IMAGEN */}
      <Pressable
        onPress={pickImage}
        style={{
          backgroundColor: "#333",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Elegir imagen</Text>
      </Pressable>

      {/* PREVIEW */}
      {imagen && (
        <Image
          source={{ uri: `data:image/jpg;base64,${imagen}` }}
          style={{ width: 200, height: 200, alignSelf: "center", borderRadius: 10 }}
        />
      )}

      {/* BOTÓN: SUBIR A CLOUDINARY */}
      <Pressable
        onPress={subirCloudinary}
        style={{
          backgroundColor: "#1e88e5",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Subir a Cloudinary</Text>
      </Pressable>

      {/* LOADING */}
      {loading && <ActivityIndicator size="large" />}

      {/* URL FINAL */}
      {urlFinal && (
        <>
          <Text style={{ fontWeight: "bold" }}>URL enviada a BD:</Text>
          <Text style={{ color: "green" }}>{urlFinal}</Text>
        </>
      )}
    </View>
  );
}