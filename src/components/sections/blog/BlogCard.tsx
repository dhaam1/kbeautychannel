
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostPath, getBlogCategoryPath, getBlogAuthorPath } from '@/lib/blogPathHelper';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  // 단일 카테고리 대신 다중 카테고리 배열 사용
  categories: { slug: string; label: string }[];
  currentCategorySlug?: string; // 현재 페이지 맥락 유지용
  imageUrl?: string;
  slug: string; // 포스트 slug
  author?: string;
  authorSlug?: string;
  locale?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  categories,
  currentCategorySlug,
  imageUrl,
  slug,
  author = '블랑쉬치과',
  authorSlug,
  locale = 'kr',
}: BlogCardProps) {
  // 메인 링크 생성 로직: 현재 카테고리 맥락이 있으면 유지, 없으면 첫 번째 카테고리 사용
  const mainCategorySlug = currentCategorySlug || categories[0]?.slug || 'uncategorized';
  const postUrl = getBlogPostPath(locale, mainCategorySlug, slug);

  return (
    <article className="group relative block bg-white rounded-[20px] border border-black/5 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {/* 카드 전체를 감싸는 단일 Link (prefetch 비활성화) */}
      <Link
        href={postUrl}
        prefetch={false}
        className="absolute inset-0 z-10"
        aria-label={title}
      />

      {/* 이미지 영역 - pointer-events-none으로 카드 Link에 클릭 전달 */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 pointer-events-none">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f0f9f8]">
            <span className="text-[#81cac4] font-medium text-sm">Blanche Dental</span>
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 - pointer-events-none으로 카드 Link에 클릭 전달 */}
      <div className="relative p-6 md:p-7 pointer-events-none">
        {/* 카테고리 배지 - pointer-events-auto로 독립 클릭 활성화 */}
        <div className="mb-3 flex flex-wrap gap-1 relative z-20 pointer-events-auto">
          {categories.map((cat, index) => (
            <span key={cat.slug} className="text-[14px] font-medium text-[#81cac4]">
              <Link
                href={getBlogCategoryPath(locale, cat.slug)}
                prefetch={false}
                className="hover:text-[#047e74] transition-colors"
              >
                {cat.label}
              </Link>
              {index < categories.length - 1 && ', '}
            </span>
          ))}
        </div>

        <h3 className="text-[20px] md:text-[22px] font-bold text-black mb-3 leading-[1.4] tracking-[-0.4px] group-hover:text-[#047e74] transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[13px] text-black/40">
            {categories.map((cat, index) => (
              <span key={cat.slug}>
                {cat.label}
                {index < categories.length - 1 && ', '}
              </span>
            ))}
            {' / '}
            {authorSlug ? (
              <Link
                href={getBlogAuthorPath(locale, authorSlug)}
                prefetch={false}
                className="hover:text-black/60 transition-colors relative z-20 pointer-events-auto"
              >
                {author}
              </Link>
            ) : (
              author
            )}
          </span>
        </div>

        <p
          className="text-[15px] text-black/60 leading-[1.6] line-clamp-3 tracking-[-0.2px]"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </article>
  );
}
