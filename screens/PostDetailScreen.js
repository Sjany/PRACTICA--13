import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import s from "../styles/screens.detail";
import C from "../styles/colors"; 

export default function PostDetailScreen({ post, nav }) {
  if (!post) return null;

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

  const authorColor = C.sub; 

  return (
    <SafeAreaView style={s.container}>
      <View style={{ height: statusBarSpacer }} />

      {/*5*/}
      <View style={s.header}>
        <TouchableOpacity style={s.backButton} onPress={() => nav.goList()}>
          <Text style={s.backButtonText}>‹ Blog</Text>
        </TouchableOpacity>
      </View>

      {/*6*/}
      <ScrollView style={s.contentPadding}>
        <Text style={s.title}>{post.title}</Text>
        
        <View style={s.metaContainer}>
          <Text style={[s.authorBadge, { color: authorColor }]}>
            Autor: {post.author}
          </Text>
          <Text style={s.metaDate}>
            · {new Date(post.updatedAt).toLocaleString()}
          </Text>
        </View>

        <Text style={s.body}>{post.body}</Text>

        {/*7*/}
        {/*8*/}
        <View style={s.footer}>
          <View style={s.row}>
            <TouchableOpacity style={s.btn} onPress={() => nav.openEditor(post)}>
              <Text style={s.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.btnDanger]} onPress={() => nav.deletePost(post)}>
              <Text style={s.btnText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*9*/}

      </ScrollView>

      {/*10*/}

    </SafeAreaView>
  );
}