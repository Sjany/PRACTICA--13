import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";

import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import SyncBadge from "../components/SyncBadge";
import ws from "../styles/screens.list";

export default function PostsListScreen({
  nav,
  posts,
  syncState,
  loading,
  refreshing,
  online,
  conflicts,
  conflictBanner, 
  onRefresh,
  loadMore,
}) {
  const [query, setQuery] = useState("");
  const [conflictsVisible, setConflictsVisible] = useState(false);
  
  const [isScrolling, setIsScrolling] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.author || "").toLowerCase().includes(q)
    );
  }, [query, posts]);

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

  return (
    <SafeAreaView style={ws.container}>
      <View style={{ height: statusBarSpacer }} />

      <View style={ws.topBar}>
        <Text style={ws.title}>Blog</Text>
        
        <View style={ws.rightHeader}>
          
          {/*14*/}
          {/*15*/}
          <TouchableOpacity 
            style={ws.conflictBtn} 
            onPress={() => setConflictsVisible(true)}
          >
            <Text style={ws.conflictBtnText}>⚠️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ws.newPostBtn} onPress={() => nav.openEditor()}>
            <Text style={ws.newPostBtnText}>+</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={ws.controls}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <View style={ws.syncBadgeContainer}>
        <SyncBadge state={syncState} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <PostCard item={item} onPress={(p) => nav.openDetail(p)} />
        )}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => setIsScrolling(true)}
        onEndReached={() => {
          if (isScrolling) {
            loadMore();
          }
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={
          loading ? <ActivityIndicator style={{ marginVertical: 16, height: 60 }} size="large" /> : null
        }
        ListEmptyComponent={
          !loading ? <Text style={ws.empty}>No hay posts</Text> : null
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {!online ? (
        <Text style={ws.offline}>Estás offline. Los cambios se sincronizarán luego.</Text>
      ) : null}

      {/*16*/}
      <Modal
        visible={conflictsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConflictsVisible(false)}
      >
        <View style={ws.modalBackdrop}>
          <View style={ws.modalCard}>
            <Text style={ws.modalTitle}>Conflictos resueltos (LWW)</Text>
            <FlatList
              data={conflicts}
              keyExtractor={(c) => String(c.id)}
              renderItem={({ item }) => (
                <View style={ws.conflictItem}>
                  <Text style={ws.conflictId}>ID {item.id}</Text>
                  <Text style={ws.conflictLabel}>Local (Descartado)</Text>
                  <Text style={ws.conflictText} numberOfLines={2}>
                    {item.local?.title}
                  </Text>
                  <Text style={ws.conflictLabel}>Servidor (Ganador)</Text>
                  <Text style={ws.conflictWinner} numberOfLines={2}>
                    {item.winner?.title}
                  </Text>
                </View>
              )}

              ListEmptyComponent={<Text style={ws.empty}>No hay conflictos que mostrar.</Text>}
            />
            <TouchableOpacity style={ws.modalBtn} onPress={() => setConflictsVisible(false)}>
              <Text style={ws.modalBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}