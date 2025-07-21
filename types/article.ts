export type TopicSummary = {
  topic: string;
  summary: string;
  trends: string | null;
};

export type ArticleBundle = {
  id: string;
  date: string;
  summaries: TopicSummary[];
  macro_topics: string;
  categories: string;
};