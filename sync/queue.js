import { loadQueue, saveQueue } from "../storage/local";

export async function enqueue(opItem) {
  const q = await loadQueue();
  q.push({ 
    ...opItem, 
    status: "pending", 
    ts: Date.now(),
    attempt: 0
  });
  await saveQueue(q);
  return q;
}

export function applyLWW(local, incoming) {
  if (!local?.updatedAt && !incoming?.updatedAt) {
    return local; 
  }
  if (!local?.updatedAt) {
    return incoming;
  }
  if (!incoming?.updatedAt) {
    return local;
  }

  return new Date(local.updatedAt) >= new Date(incoming.updatedAt) ? local : incoming;
}