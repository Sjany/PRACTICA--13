import React, { useEffect, useState, useCallback } from "react";
import { Alert, Platform, StatusBar } from "react-native";
import PostsListScreen from "./screens/PostsListScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
import PostEditScreen from "./screens/PostEditScreen";
import { loadPosts, savePosts, saveQueue } from "./storage/local";
import { enqueue } from "./sync/queue";
import { tryOnline, mergeRemoteFirstPage } from "./sync/syncManager";
import { fetchPostsPage } from "./services/api";

const LIMIT = 15;

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
}
StatusBar.setBarStyle("dark-content");

export default function App() {
  const [route, setRoute] = useState({ name: "list" });
  const [posts, setPosts] = useState([]);
  const [syncState, setSyncState] = useState("synced");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [online, setOnline] = useState(true);
  const [conflicts, setConflicts] = useState([]);
  const [conflictBanner, setConflictBanner] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const triggerSyncAndRevert = useCallback(async () => {
    const isOnline = await tryOnline();
    setOnline(isOnline);
    if (!isOnline) {
      setSyncState("pending");
      return; 
    }

    setSyncState("syncing");
    try {
      const localPosts = await loadPosts();
      const { merged, conflicts: found } = await mergeRemoteFirstPage(null, localPosts); 
      
      setPosts(merged);         
      setConflicts(found);      
      setConflictBanner(found.length > 0); 
      setPage(2);
      setSyncState("synced"); 
    } catch (e) {
      console.error("Fallo al sincronizar:", e);
      Alert.alert("Error de Red", "No se pudo sincronizar.");
      setSyncState("synced"); 
    }
  }, []); 

  useEffect(() => {
    (async () => {
      setLoading(true);
      const loc = await loadPosts();
      setPosts(loc);
      
      const isOnline = await tryOnline();
      setOnline(isOnline);

      if (isOnline) {
         await triggerSyncAndRevert(); 
      }
      
      setLoading(false);
      setInitialLoadComplete(true); 
    })();
  }, [triggerSyncAndRevert]); 

  const loadMore = useCallback(async () => {
    if (!initialLoadComplete || loading || refreshing || !online) return;
    setLoading(true);
    try {
      const next = await fetchPostsPage(page, LIMIT);
      if (next.length === 0) {
        setLoading(false); 
        return; 
      }
      const merged = [...posts];
      next.forEach((n) => {
        if (!merged.find((p) => p.id === n.id)) merged.push(n);
      });
      setPosts(merged);
      await savePosts(merged);
      setPage(page + 1); 
    } catch (e) {
       console.log("Error de red al cargar más, ignorando.");
    } finally {
      setLoading(false);
    }
  }, [initialLoadComplete, loading, page, posts, refreshing, online]); 

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await triggerSyncAndRevert(); 
    setRefreshing(false);
  }, [triggerSyncAndRevert]); 

  const nav = {
    openDetail: (post) => setRoute({ name: "detail", post }),
    openEditor: (post) => setRoute({ name: "edit", post }), 
    cancelEdit: () => {
      if (route.name === "edit" && route.post) {
        setRoute({ name: "detail", post: route.post });
      } else {
        setRoute({ name: "list" });
      }
    },
    goList: () => setRoute({ name: "list" }),

    async savePost(patch) {
      const isNew = !patch.id; 
      const now = new Date().toISOString();
      const finalPost = isNew 
        ? { ...patch, id: -Date.now(), updatedAt: now, _status: "pending" } 
        : { ...patch, updatedAt: now, _status: "pending" }; 

      const next = [...posts];
      const idx = next.findIndex(p => p.id === finalPost.id);
      if (idx >= 0) { 
        next[idx] = { ...next[idx], ...finalPost };
      } else { 
        next.unshift(finalPost);
      }
      setPosts(next); 
      await savePosts(next);
      await enqueue({ op: isNew ? "create" : "update", post: finalPost });
      setRoute(isNew ? { name: "list" } : { name: "detail", post: finalPost });

      if (online) {
        await triggerSyncAndRevert(); 
      } else {
        setSyncState("pending"); 
      }
    },

    async deletePost(post) {
      Alert.alert("Eliminar", "¿Seguro que deseas eliminar este post?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar", style: "destructive", onPress: async () => {
            const next = posts.filter(p => p.id !== post.id);
            setPosts(next); 
            await savePosts(next);
            await enqueue({ op: "delete", id: post.id });
            setRoute({ name: "list" }); 

            if (online) {
              await triggerSyncAndRevert(); 
            } else {
              setSyncState("pending"); 
            }
          }
        }
      ]);
    }
  };

  if (route.name === "detail") return <PostDetailScreen post={route.post} nav={nav} />;
  if (route.name === "edit")   return <PostEditScreen post={route.post} nav={nav} />;
  
  return (
    <PostsListScreen
      nav={nav}
      posts={posts}
      syncState={syncState}
      loading={loading}
      refreshing={refreshing}
      online={online}
      conflicts={conflicts}
      conflictBanner={conflictBanner}
      onRefresh={onRefresh}
      loadMore={loadMore} 
    />
  );
}