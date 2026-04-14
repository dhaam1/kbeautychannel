import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import { Container } from '@/components/layouts/Container';
import { ASSETS } from '@/constants/assets';
import { getSiteUrl } from '@/lib/utils';
import { getBreadcrumbSchema } from '@/constants/schema';
import {
  getWpCategoryBySlug,
  getWpPostsByCategoryId,
  buildCategoryMapsFromEmbedded,
  stripHtml,
  rewriteWpResourceUrl,
  type WpPost
} from '@/lib/wordpress';
import { BlogCard } from '@/components/sections/blog/BlogCard';
import { getBlogBasePath, getBlogCategoryPath } from '@/lib/blogPathHelper';

type BlogPost = {
  categories: { slug: string; label: string }[];
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
  authorSlug?: string;
};



/**
 * ISO 날짜 문자열을 `YYYY-MM-DD`로 축약합니다
 *
 * @param iso - ISO 8601 문자열
 */
function formatDate(iso: string) {
  return iso.slice(0, 10);
}

/**
 * WordPress 포스트를 카테고리 목록 카드용 모델로 변환합니다
 *
 * @param post - WP 포스트
 * @param idToSlug - Category ID -> Slug Map
 * @param idToName - Category ID -> Name Map
 * @param fallbackCategorySlug - (Optional) 매핑 실패 시 사용할 기본 slug
 * @param fallbackCategoryName - (Optional) 매핑 실패 시 사용할 기본 name
 */
function wpToCard(
  post: WpPost,
  idToSlug: Map<number, string>,
  idToName: Map<number, string>,
  fallbackCategorySlug: string,
  fallbackCategoryName: string
): BlogPost {
  const imageUrl = rewriteWpResourceUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
  const author = post._embedded?.author?.[0]?.name;
  const authorSlug = post._embedded?.author?.[0]?.slug;

  const categories = (post.categories ?? []).map((id) => ({
    slug: idToSlug.get(id) || fallbackCategorySlug,
    label: idToName.get(id) || fallbackCategoryName,
  }));

  // 만약 카테고리가 없으면 기본값 하나 추가
  if (categories.length === 0) {
    categories.push({ slug: fallbackCategorySlug, label: fallbackCategoryName });
  }

  return {
    categories,
    slug: post.slug,
    title: post.title?.rendered ?? post.slug,
    excerpt: stripHtml(post.excerpt?.rendered ?? ''),
    publishedAt: formatDate(post.date),
    tags: [],
    imageUrl,
    author,
    authorSlug,
  };
}

/**
 * `/blog/[category]`의 동적 메타데이터를 생성합니다
 *
 * @remarks
 * - canonical은 현재 category 라우트로 고정합니다
 * - OG/Twitter 이미지는 고정 에셋을 사용합니다
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const siteUrl = getSiteUrl();
  const isJp = locale === 'jp';

  // WordPress에서 카테고리 정보 가져오기 (name, description 포함)
  let wpCategory = null;
  try {
    wpCategory = await getWpCategoryBySlug(category, locale);
  } catch (error) {
    console.error(`generateMetadata: WP category fetch failed for ${category}:`, error);
  }

  const categoryName = wpCategory?.name || category;
  const wpDescription = wpCategory?.description || '';

  // title: WP 카테고리명 활용, description: WP에서 가져오고 없으면 폴백
  const title = isJp
    ? `${categoryName} | [韓国江南] ブランシュ歯科`
    : locale === 'en'
    ? `${categoryName} | Blanche Dental Clinic Blog`
    : `${categoryName} - 블랑쉬치과의원 블로그 - 강남치과, 논현역치과, 무삭제 라미네이트`;

  const fallbackDescription = isJp
    ? 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。'
    : locale === 'en'
    ? 'Discover premium dental insights curated by specialists at Blanche Dental Clinic.'
    : '블랑쉬치과 전문의에 감수를 거쳐 치아에 관련된 정보를 알기 쉽게 전달합니다.';

  const description = wpDescription || fallbackDescription;
  const ogImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': `${siteUrl}/blog/${category}`,
        'ja': `${siteUrl}/jp/blog/${category}`,
        'x-default': `${siteUrl}/blog/${category}`
      }
    },
    openGraph: {
      title,
      description, type: 'website',
      siteName: isJp ? 'ブランシュ歯科医院' : locale === 'en' ? 'Blanche Dental Clinic' : '블랑쉬치과 의원',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true
    },
  };
}

/**
 * 블로그 카테고리 목록 페이지(Server Component).
 *
 * @param params - 라우트 파라미터(`category`)
 *
 * @remarks
 * 데이터 흐름:
 * - `getWpCategoryBySlug(category)`로 카테고리 id 확인
 * - `getWpPostsByCategoryId(id)`로 포스트를 받아 카드 모델로 변환
 * - 결과가 비어 있으면 `notFound()` 처리
 */
export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, category } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const isJp = locale === 'jp';

  // 하드코딩된 컨텐츠
  const content = isJp ? {
    home: 'ホーム',
    blog: 'ブログ',
    siteName: 'ブランシュ歯科医院',
    blogTitle: 'ブランシュ歯科ブログ',
    blogHome: 'ブログホーム',
    categoryHeader: 'カテゴリー'
  } : locale === 'en' ? {
    home: 'Home',
    blog: 'Blog',
    siteName: 'Blanche Dental Clinic',
    blogTitle: 'Blanche Dental Clinic Blog',
    blogHome: 'Blog Home',
    categoryHeader: 'CATEGORY'
  } : {
    home: '홈',
    blog: '블로그',
    siteName: '블랑쉬치과의원',
    blogTitle: '블랑쉬치과 블로그',
    blogHome: '블로그 홈',
    categoryHeader: 'CATEGORY'
  };

  const categoryMap: Record<string, string> = isJp ? {
    laminate: 'ラミネート',
    implant: 'インプラント',
    orthodontics: '歯列矯正',
    whitening: 'ホワイトニング',
    sleep: '睡眠歯科治療',
    notice: 'お知らせ',
    case: '治療事例'
  } : locale === 'en' ? {
    laminate: 'Laminate',
    implant: 'Implant',
    orthodontics: 'Orthodontics',
    whitening: 'Teeth Whitening',
    sleep: 'Sleep Dentistry',
    notice: 'Notice',
    case: 'Treatment Cases'
  } : {
    laminate: '라미네이트',
    implant: '임플란트',
    orthodontics: '치아교정',
    whitening: '치아미백',
    sleep: '수면치료',
    notice: '공지',
    case: '치료사례'
  };

  // 워드프레스 카테고리 정보 조회 (에러 핸들링 포함)
  let wpCategory = null;
  try {
    wpCategory = await getWpCategoryBySlug(category, locale);
  } catch (error) {
    console.error(`BlogCategoryPage WP fetch failed for category ${category}:`, error);
  }

  // Use WP name if available, otherwise hardcoded map
  const categoryLabel = wpCategory?.name || categoryMap[category] || category;

  const fallbackDescription = `${categoryLabel} ${isJp ? 'に関する有益な歯科情報と治療事例をご確認ください。' : locale === 'en' ? 'related premium cases and information.' : '관련 정보를 확인하세요.'}`;
  const description = wpCategory?.description || fallbackDescription;

  const Pagination = (await import('@/components/sections/blog/Pagination')).Pagination;

  let posts: BlogPost[] = [];
  let totalPages = 1;

  try {
    if (wpCategory) {
      const wpResponse = await getWpPostsByCategoryId(wpCategory.id, currentPage, 12, locale);
      const wpPosts = wpResponse.data;
      totalPages = wpResponse.totalPages;

      if (wpPosts.length > 0) {
        // _embedded['wp:term']에서 카테고리 정보를 추출 (별도 API 호출 불필요)
        const { idToSlug, idToName } = buildCategoryMapsFromEmbedded(wpPosts);

        posts = wpPosts.map((p) => {
          return wpToCard(p, idToSlug, idToName, category, categoryLabel);
        });
      }
    }
  } catch (error) {
    console.error('WP Fetch Error:', error);
  }

  if (posts.length === 0 && currentPage === 1) notFound();

  const siteUrl = getSiteUrl();
  const basePath = getBlogBasePath(locale);
  const categoryPath = getBlogCategoryPath(locale, category);
  const currentUrl = `${siteUrl}${categoryPath}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema(currentUrl, [
      { name: content.home, item: `${siteUrl}${isJp ? '/jp' : ''}` },
      { name: content.blog, item: `${siteUrl}${basePath}` },
      { name: categoryLabel, item: currentUrl },
    ]),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${content.blogTitle} · ${categoryLabel}`,
    description: description,
    url: currentUrl,
    inLanguage: isJp ? 'ja-JP' : 'ko-KR',
    isPartOf: { '@type': 'WebSite', name: content.siteName, url: `${siteUrl}${isJp ? '/jp' : ''}` },
  };

  return (
    <>
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webPageSchema]) }}
        />
      )}

      <Header />
      <FloatingActionButton />
      <Toaster position="top-center" />

      <main className="min-h-screen bg-[#FEFEFE] pt-[140px] header-md:pt-[170px]">
        <Container>
          <div className="pb-[40px] md:pb-[60px]">
            <Link
              href={basePath}
              className="inline-flex items-center gap-[8px] rounded-full border border-black/10 bg-white px-[12px] py-[8px] font-['Pretendard'] text-[13px] text-black/70 hover:text-black transition-colors"
            >
              <span aria-hidden>←</span>
              {content.blogHome}
            </Link>

            <div className="mt-8 text-left">
              <h2 className="font-['Pretendard'] text-[18px] font-semibold text-[#81cac4] mb-3 tracking-wide uppercase">
                {content.categoryHeader}
              </h2>
              <h1 className="font-['Pretendard'] text-[28px] md:text-[34px] font-medium text-black mb-4 leading-tight tracking-[-0.02em]">
                {categoryLabel}
              </h1>
              <p className="font-['Pretendard'] text-[16px] md:text-[17px] text-black/60 leading-relaxed max-w-[600px]">
                {description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px] pb-[80px]">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt}
                categories={post.categories}
                currentCategorySlug={category} // 현재 페이지 카테고리 전달
                slug={post.slug}
                imageUrl={post.imageUrl}
                author={post.author}
                authorSlug={post.authorSlug}
                locale={locale}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={categoryPath} locale={locale} />
          )}
        </Container>

        <Footer
          breadcrumbs={[
            { label: content.home, href: `/` },
            { label: content.blog, href: `/blog` },
            { label: categoryLabel, href: `/blog/${category}` },
          ]}
        />
      </main>
    </>
  );
}

