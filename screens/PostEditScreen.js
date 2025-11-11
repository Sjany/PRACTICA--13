import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import s from "../styles/screens.edit";
import C from "../styles/colors";

export default function PostEditScreen({ post, nav }) {
  const isEdit = !!post;
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [author, setAuthor] = useState(post?.author || "User 1");
  const [error, setError] = useState(null);

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

 
  const handleSave = () => {
    if (!title.trim() || !body.trim() || !author.trim()) {
      setError("Todos los campos son obligatorios.");
    
      Alert.alert("Campos vacíos", "Todos los campos son obligatorios."); 
      return;
    }
    setError(null);

    const patch = {
      id: post?.id, 
      title: title.trim(),
      body: body.trim(),
      author: author.trim(),
    };

    nav.savePost(patch);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ height: statusBarSpacer }} />
      
      {/*11*/}
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => nav.cancelEdit()}>
          <Text style={s.backButtonText}>‹ Cancelar</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{isEdit ? "Editar post" : "Nuevo post"}</Text>
      </View>
      
      {/*12*/}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView style={s.contentPadding}>
          
          <Text style={s.label}>Título</Text>
          <TextInput
            style={s.input}
            placeholder="El título del post..."
            placeholderTextColor={C.sub}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={s.label}>Contenido</Text>
          <TextInput
            style={[s.input, s.area]}
            placeholder="Escribe aquí el contenido..."
            placeholderTextColor={C.sub}
            value={body}
            onChangeText={setBody}
            multiline
          />

          <Text style={s.label}>Autor</Text>
          <TextInput
            style={s.input}
            placeholder="Nombre del autor"
            placeholderTextColor={C.sub}
            value={author}
            onChangeText={setAuthor}
          />

          {/*13*/}
          {error ? (
            <Text style={s.errorText}>{error}</Text>
          ) : null}

          {/*14*/}
          <TouchableOpacity
            style={s.btn}
            onPress={handleSave}
          >
            <Text style={s.btnText}>{isEdit ? "Guardar Cambios" : "Crear Post"}</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}