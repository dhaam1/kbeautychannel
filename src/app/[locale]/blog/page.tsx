import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import { Container } from '@/components/layouts/Container';
import { ASSETS } from '@/constants/assets';
import { getSiteUrl } from '@/lib/utils';
import { getBreadcrumbSchema } from '@/constants/schema';
import { buildCategoryMapsFromEmbedded, getWpPostsPaged, rewriteWpResourceUrl, stripHtml, type WpPost } from '@/lib/wordpress';
import { getBlogBasePath, getBlogPaginationPath } from '@/lib/blogPathHelper';
import { BlogCard } from '@/components/sections/blog/BlogCard';
import { Pagination } from '@/components/sections/blog/Pagination';

/**
 * 블로그 목록 페이지(`/blog`) 구현 파일입니다.
 * 
 * 주요 기능:
 * - 워드프레스(WordPress) API를 통해 블로그 글 목록을 가져옵니다.
 * - 가져온 데이터를 카드 형태의 UI(BlogCard)로 보여줍니다.
 * - 하단에 페이지 번호를 넘길 수 있는 페이지네이션(Pagination) 기능을 포함합니다.
 * - 검색 엔진 최적화(SEO)를 위한 메타데이터와 구조화 데이터(JSON-LD)를 생성합니다.
 */

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
 * 날짜 형식을 'YYYY-MM-DD' 형태로 예쁘게 잘라주는 함수입니다.
 */
function formatDate(iso: string) {
  return iso.slice(0, 10);
}

/**
 * 워드프레스에서 가져온 원본 데이터를 우리 사이트의 카드 UI에 맞는 데이터로 변환합니다.
 * - 썸네일 이미지 주소를 가져와 안전한 주소로 바꿉니다.
 * - 글쓴이와 작성일 정보를 정리합니다.
 * - 본문 내용을 요약 텍스트로 만듭니다.
 *
 * @param post - WP 포스트
 * @param idToSlug - Category ID -> Slug Map
 * @param idToName - Category ID -> Name Map
 */
function wpToCard(post: WpPost, idToSlug: Map<number, string>, idToName: Map<number, string>): BlogPost {
  const imageUrl = rewriteWpResourceUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
  const author = post._embedded?.author?.[0]?.name;
  const authorSlug = post._embedded?.author?.[0]?.slug;

  const categories = (post.categories ?? []).map((id) => ({
    slug: idToSlug.get(id) || 'uncategorized',
    label: idToName.get(id) || '미분류',
  }));

  if (categories.length === 0) {
    categories.push({ slug: 'uncategorized', label: '미분류' });
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
 * 검색 엔진(Google 등)에 노출될 페이지의 제목과 설명을 설정합니다.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  // 한국어 메타데이터
  if (locale === 'kr') {
    const title = '블랑쉬치과의원 블로그 | 강남치과, 논현역치과, 무삭제 라미네이트';
    const description = '서울대 출신 치과 전문의 전하는 치아 정보. 라미네이트, 임플란트, 치아교정, 치아미백 등 궁금했던 정보를 쉽고 유익하게 알려드립니다';
    const ogImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        languages: {
          'ko': `${siteUrl}/blog`,
          'ja': `${siteUrl}/jp/blog`,
          'x-default': `${siteUrl}/blog`
        }
      },
      openGraph: {
        title,
        description, type: 'website',
        siteName: '블랑쉬치과 의원',
        locale: 'ko_KR',
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
        follow: true,
      },
    };
  }

  if (locale === 'en') {
    const title = 'Blanche Dental Clinic Blog | Gangnam Dentistry, Nonhyeon, No-Prep Laminate';
    const description = 'Discover premium dental insights and the latest news delivered directly by our expert specialists.';
    const ogImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        languages: {
          'ko': `${siteUrl}/blog`,
          'ja': `${siteUrl}/jp/blog`,
          'x-default': `${siteUrl}/blog`
        }
      },
      openGraph: {
        title,
        description, type: 'website',
        siteName: 'Blanche Dental Clinic',
        locale: 'en_US',
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
        follow: true,
      },
    };
  }

  // Japanese Metadata
  const title = '公式ブログ | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
  const description = 'ブランシュ歯科医院は, 韓国江南にあるデンタルクリニック입니다. ご来院いただく皆様へ真心を尽くす診療を目指합니다.';
  const ogImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': `${siteUrl}/blog`,
        'ja': `${siteUrl}/jp/blog`,
        'x-default': `${siteUrl}/blog`
      }
    },
    openGraph: {
      title,
      description, type: 'website',
      siteName: 'ブランシュ歯科医院',
      locale: 'ja_JP',
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
      follow: true,
    },
  };
}

/**
 * 블로그 메인 페이지 컴포넌트입니다. (서버 사이드 렌더링)
 */
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const [searchParamsValue] = await Promise.all([searchParams]);
  const currentPage = parseInt(searchParamsValue.page || '1', 10);

  // Hardcoded content based on locale
  const content = locale === 'jp' ? {
    home: 'ホーム',
    blog: 'ブランシュ歯科医院ブログ',
    siteName: 'ブランシュ歯科医院',
    metadataTitle: 'ブランシュ歯科ブログ',
    description: '専門医療陣が伝える歯科健康情報とブランシュ歯科の様々なニュースをお届けします。',
    blogLabel: 'BLOG'
  } : locale === 'en' ? {
    home: 'Home',
    blog: 'Blanche Dental Clinic Blog',
    siteName: 'Blanche Dental Clinic',
    metadataTitle: 'Blanche Dental Clinic Blog',
    description: 'Discover premium dental insights and the latest news delivered directly by our expert specialists.',
    blogLabel: 'BLOG'
  } : {
    home: '홈',
    blog: '블랑쉬치과의원 블로그',
    siteName: '블랑쉬치과의원',
    metadataTitle: '블랑쉬치과 블로그',
    description: '전문 의료진이 전하는 치과 건강 정보와 블랑쉬치과의 다양한 소식을 전해드립니다.',
    blogLabel: 'BLOG'
  };

  // 2. 워드프레스 데이터 조회 (실패 가능성 대비 try-catch)
  let wpResponse = { data: [] as WpPost[], totalPages: 0, totalPosts: 0 };
  try {
    wpResponse = await getWpPostsPaged(currentPage, 12, locale);
  } catch (error) {
    console.error('BlogPage initial WP fetch failed:', error);
    // 실패하더라도 페이지가 깨지지 않도록 기본값 유지
  }

  const siteUrl = getSiteUrl();
  const isJp = locale === 'jp';
  const basePath = getBlogBasePath(locale);
  const currentUrl = `${siteUrl}${basePath}`;

  let posts: BlogPost[] = [];
  let totalPages = wpResponse.totalPages || 0;

  try {
    const wpPosts = wpResponse.data;

    if (wpPosts.length > 0) {
      const { idToSlug, idToName } = buildCategoryMapsFromEmbedded(wpPosts);

      posts = wpPosts.map((p) => {
        return wpToCard(p, idToSlug, idToName);
      });
    }
  } catch (error) {
    console.error('WP Fetch Error:', error);
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema(currentUrl, [
      { name: content.home, item: `${siteUrl}${locale === 'jp' ? '/jp' : ''}` },
      { name: content.blog, item: currentUrl },
    ]),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.metadataTitle,
    description: content.description,
    url: currentUrl,
    inLanguage: isJp ? 'ja-JP' : 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: content.siteName,
      url: `${siteUrl}${locale === 'jp' ? '/jp' : ''}`,
    },
  };

  return (
    <>
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, webPageSchema]),
          }}
        />
      )}

      <Header />
      <FloatingActionButton />
      <Toaster position="top-center" />

      <main className="min-h-screen bg-[#FEFEFE] pt-[140px] header-md:pt-[170px]">
        <Container>
          <div className="pb-[40px] md:pb-[60px] text-left">
            <h1 className="font-['Pretendard'] text-[28px] md:text-[34px] font-medium text-black mb-4 leading-tight tracking-[-0.02em]">
              {content.blog}
            </h1>
            <h2 className="font-['Pretendard'] text-[16px] md:text-[17px] text-black/60 leading-relaxed max-w-[650px]">
              {content.description}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px] pb-[80px]">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt}
                categories={post.categories}
                slug={post.slug}
                imageUrl={post.imageUrl}
                author={post.author}
                authorSlug={post.authorSlug}
                locale={locale}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={basePath}
              locale={locale}
            />
          )}
        </Container>

        <Footer
          breadcrumbs={[
            { label: content.home, href: `/` },
            { label: content.blog, href: `/blog` },
          ]}
        />
      </main>
    </>
  );
}
