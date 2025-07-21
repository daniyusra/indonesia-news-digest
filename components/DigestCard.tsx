import { ArticleBundle } from '../types/article';
import SummaryGroup from './SummaryGroup';

function splitSummaries(articles: ArticleBundle) {
    const summaries = articles.summaries
    const macros = summaries.filter((s) => articles.macro_topics.includes(s.topic));
    const fallbacks = summaries.filter((s) => articles.categories.includes(s.topic));
    return { macros, fallbacks };
}

type Props = {
  bundle: ArticleBundle;
};

export default function DigestCard({ bundle }: Props) {
  const { macros, fallbacks } = splitSummaries(bundle);

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '0.5rem' }}>
      <h2 style={{ fontSize: '1.25rem' }}>
        Digest for: {bundle.date}
      </h2>
      <SummaryGroup title="Highlighted Topics" summaries={macros} />
      <SummaryGroup title="Categorical Digest" summaries={fallbacks} />
    </div>
  );
}