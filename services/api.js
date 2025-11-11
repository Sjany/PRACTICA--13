const API = "https://jsonplaceholder.typicode.com";

export async function fetchPostsPage(page = 1, limit = 20) {
  const res = await fetch(`${API}/posts?_page=${page}&_limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
  const postsArray = await res.json();

  const data = (postsArray ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    author: `User ${p.userId ?? 1}`, 
    updatedAt: new Date().toISOString(), 
  }));
  return data;
}

export async function fetchPostById(id) {
  const res = await fetch(`${API}/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const p = await res.json();
  
  return {
    id: p.id,
    title: p.title,
    body: p.body,
    author: `User ${p.userId ?? 1}`,
    updatedAt: new Date().toISOString(),
  };
}

export async function createRemote(post) {
  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  
  return { ...post, id: data.id ?? post.id, updatedAt: new Date().toISOString() };
}

export async function updateRemote(post) {
  const res = await fetch(`${API}/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { ...post, updatedAt: new Date().toISOString() };
}

export async function deleteRemote(id) {
  const res = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return true;
}