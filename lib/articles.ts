import fs from 'fs/promises';
import path from 'path';
import { ArticleBundle } from '@/types/article';

export async function getArticleBundles(): Promise<ArticleBundle[]> {
  const filePath = path.join(process.cwd(), 'public', 'articles.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as ArticleBundle[];
}