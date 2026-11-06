import { NewsCard } from '@/components/news/NewsCard';
import { Pagination } from '@/components/news/Pagination';
import { getPosts } from '@/lib/api';
import { getTranslator } from '@/lib/i18n/server';

const PAGE_SIZE = 6;

interface NewsPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

/** Parses the 1-based `?page=` query param into a zero-based page index. */
function parsePage(value: string | string[] | undefined): number {
  const page = Number.parseInt(Array.isArray(value) ? (value[0] ?? '') : (value ?? ''), 10);
  return Number.isFinite(page) && page > 1 ? page - 1 : 0;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = parsePage((await searchParams).page);
  const [posts, t] = await Promise.all([getPosts(page, PAGE_SIZE), getTranslator()]);

  if (!posts) return null;

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] justify-center gap-[30px]">
        {posts.content.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </section>
      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        totalElements={posts.totalElements}
        totalPages={posts.totalPages}
        ofLabel={t('news.of')}
      />
    </>
  );
}
