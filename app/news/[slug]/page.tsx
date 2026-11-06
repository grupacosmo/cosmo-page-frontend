import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { NewsSummary } from '@/components/news/NewsSummary';
import { LinkButton } from '@/components/ui/CustomButton';
import { Divider } from '@/components/ui/Divider';
import { getPost } from '@/lib/api';
import { formatDate, postImage } from '@/lib/format';
import { getTranslator } from '@/lib/i18n/server';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Long articles are split into two columns on wide screens. */
const TWO_COLUMN_THRESHOLD = 1000;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return { title: post?.title ? `${post.title} | Cosmo PK` : 'Cosmo PK' };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [{ slug }, t] = await Promise.all([params, getTranslator()]);
  const post = await getPost(slug);
  if (!post) redirect('/');

  const image = post.images?.[0];
  const { description } = post;
  const half = Math.floor(description.length / 2);
  const paragraphs =
    description.length > TWO_COLUMN_THRESHOLD ? [description.slice(0, half), description.slice(half)] : [description];

  return (
    <div className="xl:px-[50px]">
      <article className="flex flex-col justify-center gap-[1em] py-5 lg:px-10">
        <div>
          <LinkButton href="/news" text={t('news.goBack')} secondary back />
        </div>
        <h1 className="my-2.5 text-cosmo-xl">{post.title}</h1>
        <span>{formatDate(post.date, false)}</span>
        <Image
          src={postImage(image?.src)}
          alt={post.title ?? ''}
          width={image?.width ?? 500}
          height={image?.height ?? 350}
          sizes="(max-width: 1600px) 100vw, 1500px"
          unoptimized
          className="my-5 max-h-[500px] w-full max-w-full rounded-[15px] object-cover select-none"
        />
        <div className="flex flex-col xl:flex-row xl:gap-5">
          {paragraphs.map((text, index) => (
            <p key={index} className="text-left text-cosmo-m xl:flex-1">
              {text}
            </p>
          ))}
        </div>
      </article>

      <Divider />

      <NewsSummary t={t} />
    </div>
  );
}
