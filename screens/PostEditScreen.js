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
} from "react-native";
import s from "../styles/screens.edit";
import C from "../styles/colors";

export default function PostEditScreen({ post, nav }) {
  const isEdit = !!post;
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [author, setAuthor] = useState(post?.author || "User 1"); 

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;


  const [error, setError] = useState("");

  const handleSave = () => {
   
    if (!title.trim() || !body.trim() || !author.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError(""); 

    const patch = {
      title,
      body,
      author,
      updatedAt: new Date().toISOString(),
    };

    if (isEdit) {
    } else {
      nav.savePost(patch);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      {/*11*/}
      <View style={{ height: statusBarSpacer }} />

      {/*12*/}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={s.contentPadding}> 
          <Text style={s.header}>{isEdit ? "Editar post" : "Nuevo post"}</Text>

          <TextInput
            style={s.input}
            placeholder="Título"
            placeholderTextColor={C.sub}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[s.input, s.area]}
            placeholder="Contenido"
            placeholderTextColor={C.sub}
            value={body}
            onChangeText={setBody}
            multiline
          />

          <TextInput
            style={s.input}
            placeholder="Autor"
            placeholderTextColor={C.sub}
            value={author}
            onChangeText={setAuthor}
          />

          {/*13*/}
          {error ? <Text style={s.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={s.btn}
            onPress={handleSave}
          >
            <Text style={s.btnText}>{isEdit ? "Guardar cambios" : "Crear post"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.secondary} onPress={() => nav.cancelEdit()}>
            <Text style={s.secondaryText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}