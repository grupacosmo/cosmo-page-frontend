import Link from 'next/link';
import { LinkButton } from '@/components/ui/CustomButton';
import { getPosts } from '@/lib/api';
import { cssUrl, postImage } from '@/lib/format';
import type { Translate } from '@/lib/i18n/server';

const TILE_AREAS = ['[grid-area:news-1]', '[grid-area:news-2]', '[grid-area:news-3]', '[grid-area:news-4]'];

/** Mosaic of the four latest posts; renders only the header if the API is unavailable. */
export async function NewsSummary({ t }: { t: Translate }) {
  const posts = await getPosts(0, TILE_AREAS.length);

  return (
    <>
      <header className="flex justify-between p-[15px]">
        <h2 className="m-0">{t('navigation.news')}</h2>
        <LinkButton href="/news" text={t('common.readMore')} secondary />
      </header>
      {posts && posts.content.length > 0 && (
        <section className="news-grid">
          {posts.content.slice(0, TILE_AREAS.length).map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${encodeURIComponent(post.id)}`}
              style={{ backgroundImage: cssUrl(postImage(post.backgroundPhoto?.src)) }}
              className={`relative min-h-[120px] cursor-pointer overflow-hidden rounded-[10px] bg-cover bg-center text-white transition duration-500 hover:z-[2] hover:scale-105 hover:shadow-elevation-3 ${TILE_AREAS[index]}`}
            >
              <div className="flex h-full w-full flex-col justify-end bg-linear-to-b from-[rgba(31,36,44,0)] from-33% to-[rgb(39,44,53)] p-2.5">
                <span className="text-cosmo-xs">{post.date}</span>
                <h3 className="m-0">{post.title}</h3>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}
