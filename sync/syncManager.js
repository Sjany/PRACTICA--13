import { createRemote, updateRemote, deleteRemote, fetchPostsPage } from "../services/api";
import { loadPosts, savePosts, loadQueue, saveQueue } from "../storage/local";
import { applyLWW } from "./queue";

const LIMIT = 15; 

export async function tryOnline() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function processQueue(setSyncState) {
  let queue = await loadQueue();
  if (!queue.length) {
    setSyncState?.("synced");
    return;
  }
  setSyncState?.("syncing");
  const posts = await loadPosts();
  const nextQueue = [];

  for (const item of queue) {
    try {
      if (item.op === "create") {
        const synced = await createRemote(item.post);
        const idx = posts.findIndex((p) => p.id === item.post.id);
        if (idx >= 0) posts[idx] = { ...synced, _status: "synced" };
      } else if (item.op === "update") {
        const synced = await updateRemote(item.post);
        const idx = posts.findIndex((p) => p.id === item.post.id);
        if (idx >= 0) posts[idx] = { ...applyLWW(posts[idx], synced), _status: "synced" };
      } else if (item.op === "delete") {
        await deleteRemote(item.id);
        const idx = posts.findIndex((p) => p.id === item.id);
        if (idx >= 0) posts.splice(idx, 1);
      }
    } catch (e) {
      console.error("Fallo de sincronización:", item.op, item.id, e);
      nextQueue.push({
        ...item,
        status: "error",
        attempt: (item.attempt ?? 0) + 1,
        error: String(e),
      });
    }
  }

  await savePosts(posts);
  await saveQueue(nextQueue);
  setSyncState?.(nextQueue.length ? "pending" : "synced");
}

export async function mergeRemoteFirstPage(remote, local) {
  
  const remotePosts = remote || (await fetchPostsPage(1, LIMIT));
  const localPosts = local || (await loadPosts()); 

  const map = new Map(localPosts.map((p) => [p.id, p]));
  const conflicts = [];

  for (const r of remotePosts) {
    if (map.has(r.id)) {
      const l = map.get(r.id);

      const isConflict = l._status === "pending";

      if (isConflict) {
        conflicts.push({ id: r.id, local: l, remote: r, winner: r });
      }
    }
    
    map.set(r.id, r);
  }
  
  await saveQueue([]);

  const merged = Array.from(map.values());
  await savePosts(merged);
  
  return { merged, conflicts };
}