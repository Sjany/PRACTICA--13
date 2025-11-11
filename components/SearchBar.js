import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import s from "../styles/widgets";
import C from "../styles/colors"; 

export default function SearchBar({ value, onChangeText, placeholder="Buscar por título o autor" }) {
  return (
    <View style={s.searchBox}>
      
      {/*2*/}
      
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={C.sub} 
        onChangeText={onChangeText}
        style={s.searchInput}
        autoCorrect={false}
      />
      {/*3*/}
      {value.length > 0 ? (
        <TouchableOpacity style={s.searchClear} onPress={() => onChangeText("")}>
          <Text style={s.searchClearText}>×</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}