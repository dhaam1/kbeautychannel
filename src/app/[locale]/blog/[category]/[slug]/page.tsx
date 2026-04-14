import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import { Container } from '@/components/layouts/Container';
import { getSiteUrl } from '@/lib/utils';
import { ASSETS } from '@/constants/assets';
import { ConsultationForm } from '@/components/sections/blog/ConsultationForm';
import { PostHeader } from '@/components/sections/blog/PostHeader';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { WpContentRenderer } from '@/components/blog/WpContentRenderer';
import { PostNavigation } from '@/components/sections/blog/PostNavigation';
import {
  rewriteWpHtml as rewriteWpHtmlWithRules,
  extractJsonLdScripts,
  getWpPostBySlugWithSeo,
  getWpAdjacentPosts,
  getWpCategoryBySlug,
  stripHtml,
  rewriteWpResourceUrl,
} from '@/lib/wordpress';
import { processYoastGraph, getSchemaType, normalizeSchemaUrls, WP_HOSTS } from '@/lib/schemaProcessor';
import { getDentistSchema, getBreadcrumbSchema } from '@/constants/schema';
import { parseHeadingsFromHtml } from '@/lib/parseHeadings';
import { getBlogBasePath, getBlogPostPath, getBlogCategoryPath, extractPrimaryCategoryFromUrl } from '@/lib/blogPathHelper';

import { BlogUTMTracker } from '@/components/BlogUTMTracker';

function rewriteWpHtml(html: string, siteUrl: string, locale?: string) {
  return rewriteWpHtmlWithRules(html, siteUrl, locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug, category } = await params;
  const isJp = locale === 'jp';
  const siteUrl = getSiteUrl();
  const ogImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;

  const t = {
    metadata: {
      title: isJp ? 'ブランシュ歯科ブログ' : locale === 'en' ? 'Blanche Dental Clinic Blog' : '블랑쉬치과 블로그',
      ogAlt: isJp ? 'ブランシュ歯科ブログの画像' : locale === 'en' ? 'Image of Blanche Dental Clinic Blog' : '블랑쉬치과 블로그 이미지'
    }
  };
  const tcommon = {
    author: isJp ? 'ブランシュ歯科' : locale === 'en' ? 'Blanche Dental Clinic' : '블랑쉬치과'
  };

  const normalizeUrl = (raw: string | undefined, fallbackBase: string) => {
    if (!raw) return undefined;
    if (raw.startsWith('/')) return `${fallbackBase}${raw}`;
    try {
      const u = new URL(raw);

      const metadataWpHosts = ['localhost', '127.0.0.1', ...WP_HOSTS];
      if (metadataWpHosts.some(host => u.hostname === host || u.hostname.includes(host))) {
        // 경로에 /blog prefix 추가 (이미 있으면 추가 안함)
        let path = u.pathname;

        // 일본어 경로(/ja)는 /jp/blog로 변환
        if (path.startsWith('/ja/') || path === '/ja') {
          path = path.replace(/^\/ja/, '/jp/blog');
        }
        // 그 외 경로 중 /blog 로 시작하지 않으면 추가
        else if (!path.startsWith('/blog')) {
          path = `/blog${path}`;
        }
        return `${fallbackBase}${path}${u.search}${u.hash}`.replace(/\/$/, '');
      }
      return raw;
    } catch {
      return raw;
    }
  };

  const post = await getWpPostBySlugWithSeo(slug, locale);

  if (!post) {
    return {
      metadataBase: new URL(siteUrl),
      title: t.metadata.title,
      robots: { index: true, follow: true },
    };
  }

  const yoast = post.yoast_head_json;
  const defaultTitle = `${tcommon.author} | ${post.title.rendered}`;
  const defaultDescription = stripHtml(post.excerpt?.rendered || '');

  // Construct default URLs
  const basePath = getBlogBasePath(locale);
  const defaultUrl = `${siteUrl}${basePath}/${category}/${slug}`;
  const canonical = (normalizeUrl(yoast?.canonical, siteUrl) || defaultUrl).replace(/\/$/, "");
  const ogUrl = (normalizeUrl(yoast?.og_url, siteUrl) || defaultUrl).replace(/\/$/, "");

  // Yoast og_image 우선 사용, 없으면 fallback 이미지
  const yoastOgImageUrl = yoast?.og_image?.[0]?.url;
  const finalOgImageUrl = yoastOgImageUrl
    ? rewriteWpResourceUrl(yoastOgImageUrl, { absolute: true }) || ogImage
    : ogImage;

  const authorName = post._embedded?.author?.[0]?.name || tcommon.author;

  return {
    metadataBase: new URL(siteUrl),
    title: yoast?.title || defaultTitle,
    description: yoast?.description || defaultDescription,
    authors: [{ name: authorName }],
    alternates: {
      canonical: canonical,  // Yoast canonical 우선 사용
      // NOTE: languages(hreflang) 제거 - 개별 블로그 글은 번역본이 없어 대체 페이지가 존재하지 않음
    },
    openGraph: {
      title: yoast?.og_title || post.title.rendered,
      description: yoast?.og_description || defaultDescription,
      url: ogUrl,
      type: (yoast?.og_type as 'article' | 'website') || 'article',
      images: [{ url: finalOgImageUrl, width: 1200, height: 630, alt: t.metadata.ogAlt }],
    },
    twitter: {
      card: (yoast?.twitter_card as 'summary' | 'summary_large_image' | 'app' | 'player') || 'summary_large_image',
      title: yoast?.twitter_title || post.title.rendered,
      description: yoast?.twitter_description || defaultDescription,
      images: [finalOgImageUrl],
    },
    robots: {
      index: true,  // 항상 인덱싱 허용 (Yoast noindex 무시)
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
      },
    },
  };
}

/**
 * 블로그 게시글 상세 페이지 컴포넌트입니다.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;

  // 하드코딩된 번역 데이터 (MISSING_MESSAGE 에러 방지 및 로케일 고정)
  const isJp = locale === 'jp';
  const content = isJp ? {
    author: 'ブランシュ歯科',
    home: 'ホーム',
    blog: 'ブログ',
    metadataTitle: 'ブランシュ歯科ブログ',
    ogAlt: 'ブランシュ歯科ブログの画像',
    consultationTitle: '相談予約',
  } : locale === 'en' ? {
    author: 'Blanche Dental Clinic',
    home: 'Home',
    blog: 'Blog',
    metadataTitle: 'Blanche Dental Clinic Blog',
    ogAlt: 'Image of Blanche Dental Clinic Blog',
    consultationTitle: 'Book Consultation',
  } : {
    author: '블랑쉬치과',
    home: '홈',
    blog: '블로그',
    metadataTitle: '블랑쉬치과 블로그',
    ogAlt: '블랑쉬치과 블로그 이미지',
    consultationTitle: '상담 예약',
  };

  // 2. 워드프레스 포스트 데이터 조회 (에러 핸들링 포함)
  let wpPost = null;
  try {
    wpPost = await getWpPostBySlugWithSeo(slug, locale);
  } catch (error) {
    console.error(`BlogPostPage WP fetch failed for slug ${slug}:`, error);
  }
  // 카테고리 검증 및 Primary category 리다이렉트 (3-tier 로직)
  // 1) 존재하지 않는 카테고리 → 404
  // 2) 존재하는 카테고리지만 primary가 아님 → 308 리다이렉트
  // 3) Primary 카테고리 → 정상 렌더링
  if (wpPost) {
    const canonicalUrl = wpPost.yoast_head_json?.canonical || wpPost.link;
    if (canonicalUrl) {
      const primaryCategory = extractPrimaryCategoryFromUrl(canonicalUrl, locale);
      if (primaryCategory && primaryCategory !== category) {
        // URL의 카테고리가 primary가 아닌 경우: 실존 카테고리인지 확인
        const urlCategory = await getWpCategoryBySlug(category, locale);
        if (!urlCategory) {
          // 존재하지 않는 카테고리 → 404
          notFound();
        }
        // 존재하는 카테고리지만 primary가 아님 → 308 리다이렉트
        permanentRedirect(getBlogPostPath(locale, primaryCategory, slug));
      }
    }
  }

  const siteUrl = getSiteUrl();

  if (!wpPost) notFound();

  const title = wpPost.title.rendered;
  const excerpt = wpPost.excerpt?.rendered
    ? rewriteWpHtml(wpPost.excerpt.rendered, siteUrl, locale).replaceAll(/<[^>]*>/g, '').trim()
    : '';

  const authorName = wpPost._embedded?.author?.[0]?.name ?? content.author;
  const authorSlug = wpPost._embedded?.author?.[0]?.slug;

  const publishedDate = new Date(wpPost.date).toISOString();


  // 본문 HTML에서 JSON-LD <script> 태그를 제거 (렌더링 시 중복 방지)
  // Yoast에 없는 스키마(FAQPage, ItemList 등)는 본문에서 추출하여 병합
  let wpContentForRendering = wpPost?.content?.rendered || '';
  let contentJsonLdBlocks: string[] = [];

  if (wpPost?.content?.rendered) {
    const { cleanHtml, jsonLdBlocks } = extractJsonLdScripts(wpPost.content.rendered);
    wpContentForRendering = cleanHtml;
    contentJsonLdBlocks = jsonLdBlocks;
  }

  const renderedHtml = wpContentForRendering ? rewriteWpHtml(wpContentForRendering, siteUrl, locale) : '';
  const headings = renderedHtml
    ? parseHeadingsFromHtml(renderedHtml, 2, 3)
    : [];

  let previousPost, nextPost;

  // 카테고리 라벨 하드코딩
  const categoryMap: Record<string, string> = isJp ? {
    laminate: 'ラミネート',
    implant: 'インプラント',
    orthodontics: '歯列矯正',
    whitening: 'ホワイトニング',
    sleep: '睡眠治療'
  } : locale === 'en' ? {
    laminate: 'Laminate',
    implant: 'Implant',
    orthodontics: 'Orthodontics',
    whitening: 'Teeth Whitening',
    sleep: 'Sleep Dentistry'
  } : {
    laminate: '라미네이트',
    implant: '임플란트',
    orthodontics: '치아교정',
    whitening: '치아미백',
    sleep: '수면치료'
  };

  let categoryLabel = categoryMap[category] || category;

  if (wpPost) {
    try {
      const wpCategory = await getWpCategoryBySlug(category, locale);
      if (wpCategory) {
        categoryLabel = wpCategory.name;
      }
      const adjacent = await getWpAdjacentPosts(wpPost.date, wpCategory?.id, locale);
      // 방어: WP가 다른 언어의 slug를 반환할 수 있으므로, 현재 글과 동일한 slug는 제외
      previousPost = adjacent.previous?.slug !== slug ? adjacent.previous : undefined;
      nextPost = adjacent.next?.slug !== slug ? adjacent.next : undefined;
    } catch (error) {
      console.error('Adjacent posts fetch failed:', error);
    }
  }

  // URL: 슬래시 있는 URL로 통일
  const basePath = getBlogBasePath(locale);
  const currentUrl = `${siteUrl}${getBlogPostPath(locale, category, slug)}`;

  // BreadcrumbList (Next.js 경로 기준)
  const breadcrumbSchema = getBreadcrumbSchema(currentUrl, [
    { name: content.home, item: `${siteUrl}${locale === 'jp' ? '/jp' : ''}` },
    { name: content.blog, item: `${siteUrl}${basePath}` },
    { name: categoryLabel, item: `${siteUrl}${getBlogCategoryPath(locale, category)}` },
    { name: title, item: currentUrl },
  ]);

  // Yoast 스키마 처리: BreadcrumbList 제거, 빈 FAQPage 제거, URL 정규화
  const yoastGraphItems = wpPost?.yoast_head_json?.schema
    ? processYoastGraph(
      (wpPost.yoast_head_json.schema as Record<string, unknown>)['@graph'] as unknown[] || [],
      siteUrl,
      locale
    )
    : [];

  yoastGraphItems.push(breadcrumbSchema);

  // 본문 HTML에서 추출한 JSON-LD 중 Yoast @graph에 없는 타입(FAQPage, ItemList 등)을 병합
  const yoastTypes = new Set(yoastGraphItems.map(item => getSchemaType(item)).filter(Boolean));

  const mergeSchemaItem = (item: unknown) => {
    const type = getSchemaType(item);
    if (type && !yoastTypes.has(type)) {
      yoastGraphItems.push(normalizeSchemaUrls(item, siteUrl, locale) as Record<string, unknown>);
      yoastTypes.add(type);
    }
  };

  for (const block of contentJsonLdBlocks) {
    try {
      const parsed = JSON.parse(block);
      if (Array.isArray(parsed)) {
        // JSON 배열 (예: [FAQPage, ItemList])
        for (const item of parsed) {
          mergeSchemaItem(item);
        }
      } else if (Array.isArray(parsed['@graph'])) {
        // @graph 래퍼
        for (const graphItem of parsed['@graph'] as unknown[]) {
          mergeSchemaItem(graphItem);
        }
      } else {
        // 단일 스키마 객체
        mergeSchemaItem(parsed);
      }
    } catch {
      // 파싱 실패 시 무시
    }
  }

  // Dentist 스키마 (Yoast에 Organization이 없을 때만)
  const hasOrgType = yoastGraphItems.some(item => {
    const t = getSchemaType(item);
    return t === 'Dentist' || t === 'Organization';
  });
  if (!hasOrgType) {
    yoastGraphItems.push(getDentistSchema(locale));
  }

  const consolidatedSchema = {
    '@context': 'https://schema.org',
    '@graph': yoastGraphItems,
  };

  return (
    <>
      <BlogUTMTracker title={title} />
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }}
        />
      )}

      <Header />
      <FloatingActionButton />
      <Toaster position="top-center" />

      <main className="min-h-screen bg-[#FEFEFE] pt-[140px] header-md:pt-[170px]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-[140px]">
                <TableOfContents
                  headings={headings}
                  headerOffset={140}
                />
              </div>
            </aside>

            <article
              className="post-template-default col-span-1 lg:col-span-8 lg:col-start-3"
            >
              <PostHeader
                title={title}
                date={publishedDate}
                author={authorName}
                authorSlug={authorSlug}
                category={category}
                categoryLabel={categoryLabel}
                excerpt={excerpt}
                align="left"
                showSeparator={false}
                locale={locale}
              />

              <div className="lg:hidden my-8">
                <TableOfContents
                  headings={headings}
                  headerOffset={140}
                />
              </div>

              <WpContentRenderer content={renderedHtml} />
            </article>

            <div className="hidden lg:block lg:col-span-2"></div>
          </div>
        </Container>

        <ConsultationForm />

        <PostNavigation
          previousPost={previousPost ? {
            title: previousPost.title.rendered,
            href: `/blog/${category}/${previousPost.slug}`
          } : undefined}
          nextPost={nextPost ? {
            title: nextPost.title.rendered,
            href: `/blog/${category}/${nextPost.slug}`
          } : undefined}
        />

        <Footer
          breadcrumbs={[
            { label: content.home, href: `/` },
            { label: content.blog, href: `/blog` },
            { label: categoryLabel, href: `/blog/${category}` },
            { label: title, href: `/blog/${category}/${slug}` },
          ]}
        />
      </main>
    </>
  );
}

