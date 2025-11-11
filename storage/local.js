import AsyncStorage from "@react-native-async-storage/async-storage";

const POSTS_STORAGE_KEY = "@OfflineBlog:Posts:v1";
const QUEUE_STORAGE_KEY = "@OfflineBlog:Queue:v1";


export async function loadPosts() {
  try {
    const raw = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error al cargar posts desde AsyncStorage", e);
    return []; 
  }
}

export async function savePosts(posts) {
  try {
    const data = JSON.stringify(posts);
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, data);
  } catch (e) {
    console.error("Error al guardar posts en AsyncStorage", e);
  }
}

export async function loadQueue() {
  try {
    const raw = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error al cargar la cola (queue) desde AsyncStorage", e);
    return []; 
  }
}

export async function saveQueue(q) {
  try {
    const data = JSON.stringify(q);
    await AsyncStorage.setItem(QUEUE_STORAGE_KEY, data);
  } catch (e) {
    console.error("Error al guardar la cola (queue) en AsyncStorage", e);
  }
}