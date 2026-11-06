import 'server-only';
import type { PostDetails, PostsPage } from './types';

// Server-side only: the API key never reaches the browser bundle.
const API_URL = (process.env.COSMO_API_URL ?? 'http://localhost:8080').replace(/\/+$/, '');
const REVALIDATE_SECONDS = 60;

async function apiGet<T>(path: string): Promise<T | null> {
  const apiKey = process.env.COSMO_API_KEY;
  try {
    const response = await fetch(`${API_URL}/${path}`, {
      headers: apiKey ? { apiKey } : undefined,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Backend unreachable: render the page without API content.
    return null;
  }
}

export async function getPosts(page: number, size: number): Promise<PostsPage | null> {
  const data = await apiGet<PostsPage>(`api/posts?page=${page}&size=${size}`);
  return data && Array.isArray(data.content) ? data : null;
}

export async function getPost(id: string): Promise<PostDetails | null> {
  const data = await apiGet<PostDetails>(`api/posts/${encodeURIComponent(id)}`);
  return data && typeof data === 'object' && typeof data.description === 'string' ? data : null;
}
