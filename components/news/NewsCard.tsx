import Link from 'next/link';
import { cssUrl, formatDate, postImage, truncate } from '@/lib/format';
import type { PostItem } from '@/lib/types';

const EXCERPT_LENGTH = 150;

/** News tile that reveals an excerpt on hover. */
export function NewsCard({ post }: { post: PostItem }) {
  return (
    <Link
      href={`/news/${encodeURIComponent(post.id)}`}
      style={{ backgroundImage: cssUrl(postImage(post.backgroundPhoto?.src)) }}
      className="group relative aspect-[4/3] min-h-[120px] w-full cursor-pointer overflow-hidden rounded-[10px] bg-cover bg-center text-white transition duration-500 before:absolute before:inset-0 before:bg-linear-to-b before:from-[rgba(31,36,44,0.3)] before:from-33% before:to-[rgb(39,44,53)] before:opacity-0 before:transition before:duration-500 hover:scale-[1.005] hover:shadow-elevation-3 hover:before:opacity-100"
    >
      <div className="flex h-full w-full flex-col justify-end bg-linear-to-b from-[rgba(31,36,44,0)] from-33% to-[rgb(39,44,53)] p-5">
        <div className="relative z-[1] translate-y-[70px] transition duration-500 group-hover:translate-y-0">
          <span className="text-cosmo-s">{formatDate(post.date, true)}</span>
          <h3 className="m-0 text-cosmo-l">{post.title}</h3>
          <p className="mt-2.5 translate-y-[50px] text-justify text-cosmo-m opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {truncate(post.description, EXCERPT_LENGTH)}
          </p>
        </div>
      </div>
    </Link>
  );
}
