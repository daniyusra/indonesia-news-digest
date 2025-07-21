import { ArticleBundle } from '@/types/article';

export async function getArticleBundles(): Promise<ArticleBundle[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/articles.json`, {
    next: { revalidate: 60 }, // ISR for App Router
  });

  if (!res.ok) throw new Error('Failed to load article bundles');
  const data: ArticleBundle[] = await res.json();
  return data;
}