import { getArticleBundles } from '../lib/articles';
import DigestCard from '../components/DigestCard';

export default async function HomePage() {
  const bundles = await getArticleBundles();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Daily News Digests
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {bundles.map((bundle) => (
          <DigestCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </main>
  );
}