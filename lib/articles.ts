import { ArticleBundle } from '@/types/article';
import path from 'path';

export async function getArticleBundles(): Promise<ArticleBundle[]> {
  const url = path.join(process.cwd(), 'public', '/articles.json');

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR for App Router
  });

  if (!res.ok) throw new Error('Failed to load article bundles');
  const data: ArticleBundle[] = await res.json();
  return data;
}