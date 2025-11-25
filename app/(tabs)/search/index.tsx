import SearchTopTabs from "@/components/SearchTopTabs";
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { searchStyles } from "../../../styles/search-styles";
export default function SearchScreen() {
  const [text, setText] = useState('');
   return (
      <View style={searchStyles.screen}>
      <View style={searchStyles.containerInput}>
        <TextInput
          style={searchStyles.input}
          placeholder="Busca artistas, canciones o álbumes"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
        />
      </View>
      <SearchTopTabs searchText={text} />
    </View>
  );
}