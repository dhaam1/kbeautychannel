/**
 * 특정 작성자(원장님 등)가 쓴 글들만 모아서 보여주는 페이지(`/blog/author/[authorSlug]`)입니다.
 * 
 * 주요 기능:
 * - 작성자의 이름과 소개글을 워드프레스에서 가져와 상단에 보여줍니다.
 * - 해당 작성자가 쓴 모든 글을 목록 형태로 나열합니다.
 * - 각 글들을 클릭하면 상세 페이지로 연결됩니다.
 */
import type { Metadata } from 'next';
import Image from 'next/image';
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
    getWpAuthorBySlug,
    getWpPostsByAuthorId,
    buildCategoryMapsFromEmbedded,
    stripHtml,
    rewriteWpResourceUrl,
    type WpPost
} from '@/lib/wordpress';
import { BlogCard } from '@/components/sections/blog/BlogCard';
import { getBlogBasePath, getBlogAuthorPath } from '@/lib/blogPathHelper';

type PostCard = {
    categories: { slug: string; label: string }[];
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    tags: string[];
    imageUrl?: string;
    author?: string;
};

function formatDate(iso: string) {
    return iso.slice(0, 10);
}

function wpToCard(post: WpPost, idToSlug: Map<number, string>, idToName: Map<number, string>, locale: string): PostCard {
    const imageUrl = rewriteWpResourceUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
    const author = post._embedded?.author?.[0]?.name;
    const uncategorizedLabel = locale === 'jp' ? '未分類' : '미분류';

    const categories = (post.categories ?? []).map((id) => ({
        slug: idToSlug.get(id) || 'uncategorized',
        label: idToName.get(id) || uncategorizedLabel,
    }));

    if (categories.length === 0) {
        categories.push({ slug: 'uncategorized', label: uncategorizedLabel });
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
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; authorSlug: string }>;
}): Promise<Metadata> {
    const { locale, authorSlug } = await params;
    const isJp = locale === 'jp';
    const siteUrl = getSiteUrl();

    const author = await getWpAuthorBySlug(authorSlug, locale);
    const defaultOgImage = `${siteUrl}${ASSETS.COMMON.DEFAULT_OG}`;
    const yoastOgImage = author?.yoast_head_json?.og_image?.[0];
    const ogImageUrl = yoastOgImage?.url
        ? (rewriteWpResourceUrl(yoastOgImage.url, { absolute: true }) || defaultOgImage)
        : defaultOgImage;
    const ogImageWidth = yoastOgImage?.width || 1200;
    const ogImageHeight = yoastOgImage?.height || 630;

    // 작성자별 하드코딩 (김태형 원장님 등)
    if (authorSlug === 'blanche_ms' || authorSlug === '김태형') {
        const title = locale === 'en' 
            ? 'Dr. Kim Tae-hyung | Blanche Dental Clinic Blog'
            : locale === 'jp'
            ? '歯科王キム・テヒョン | 江南ノンヒョン駅歯科、ブランシュ歯科の医療情報ブログ'
            : '치과왕 김태형 | 강남 논현역치과, 블랑쉬치과의 치과 의료 정보 블로그';
        const description = locale === 'en'
            ? 'Hello. I am Dr. Kim Tae-hyung, running Blanche Dental Clinic in Gangnam. I graduated from Seoul National University and create beautiful smiles through treatments like laminates, implants, and orthodontics.'
            : locale === 'jp'
            ? 'こんにちは。韓国江南でブランシュ歯科を運営している歯科医師キム・テヒョンです。ソウル大学歯学部を卒業し、ラミネート、インプラント、矯正などの診療で美しい笑顔を作り出しています。'
            : '안녕하세요. 서울 강남의 논현역에서 블랑쉬치과를 운영하는 치과의사 김태형입니다. 서울대학교 치과대학을 졸업했으며 블랑쉬, 임플란트, 교정 등의 진료를 통해 아름다운 미소를 만들고 자존감을 올려주는 일을 합니다.';

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/blog/author/${authorSlug}`,
                    'ja': `${siteUrl}/jp/blog/author/${authorSlug}`,
                    'x-default': `${siteUrl}/blog/author/${authorSlug}`
                }
            },
            openGraph: {
                title,
                description,
                url: `${siteUrl}${getBlogAuthorPath(locale, authorSlug)}`,
                type: 'website',
                images: [{ url: ogImageUrl, width: ogImageWidth, height: ogImageHeight, alt: title }],
            },
            robots: { index: true, follow: true },
        };
    }

    // 기본값 (다른 작성자 있을 경우)
    const content = locale === 'en' ? {
        blogTitle: 'Blanche Dental Clinic Blog',
        authorSuffix: "'s Posts"
    } : isJp ? {
        blogTitle: 'ブランシュ歯科ブログ',
        authorSuffix: 'の記事'
    } : {
        blogTitle: '블랑쉬치과 블로그',
        authorSuffix: '의 글'
    };

    const finalName = author?.name || 'Author';
    const finalDescription = author?.description || `${finalName}${content.authorSuffix}`;

    return {
        metadataBase: new URL(siteUrl),
        title: `${finalName} - ${content.blogTitle}`,
        description: finalDescription,
        alternates: {
            languages: {
                'ko': `${siteUrl}/blog/author/${authorSlug}`,
                'ja': `${siteUrl}/jp/blog/author/${authorSlug}`,
                'x-default': `${siteUrl}/blog/author/${authorSlug}`
            }
        },
        openGraph: {
            title: `${finalName} - ${content.blogTitle}`,
            description: finalDescription,
            url: `${siteUrl}${getBlogAuthorPath(locale, authorSlug)}`,
            type: 'website',
            images: [{ url: ogImageUrl, width: ogImageWidth, height: ogImageHeight, alt: finalName }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${finalName} - ${content.blogTitle}`,
            description: finalDescription,
            images: [ogImageUrl],
        },
        robots: { index: true, follow: true },
    };
}

export default async function AuthorPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; authorSlug: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { locale, authorSlug } = await params;
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1', 10);
    const isJp = locale === 'jp';

    // 하드코딩된 컨텐츠
    const content = isJp ? {
        home: 'ホーム',
        blog: 'ブログ',
        blogHome: 'ブログホーム',
        authorLabel: '著者',
        postsCount: (count: number) => `全 ${count} 件の投稿を作成しました。`
    } : {
        home: '홈',
        blog: '블로그',
        blogHome: '블로그 홈',
        authorLabel: '작성자',
        postsCount: (count: number) => `총 ${count}개의 포스트를 작성했습니다.`
    };

    const author = await getWpAuthorBySlug(authorSlug, locale);
    const siteUrl = getSiteUrl();

    const Pagination = (await import('@/components/sections/blog/Pagination')).Pagination;

    if (!author) notFound();

    const wpResponse = await getWpPostsByAuthorId(author.id, currentPage, 12, locale);
    const wpPosts = wpResponse.data;
    const totalPages = wpResponse.totalPages;
    const totalPosts = wpResponse.totalPosts;

    // _embedded['wp:term']에서 카테고리 정보를 추출 (별도 API 호출 불필요)
    const { idToSlug, idToName } = buildCategoryMapsFromEmbedded(wpPosts);

    const posts: PostCard[] = wpPosts.map((p) => {
        return wpToCard(p, idToSlug, idToName, locale);
    });

    const authorName = author.name;
    const authorDescription = author.description;
    const authorAvatarUrl = rewriteWpResourceUrl(
        (author.simple_local_avatar?.full as string | undefined)
        || (author.simple_local_avatar?.['192'] as string | undefined)
        || author.avatar_urls?.['96']
    );

    const basePath = getBlogBasePath(locale);
    const authorPath = getBlogAuthorPath(locale, authorSlug);
    const currentUrl = `${siteUrl}${authorPath}`;

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        ...getBreadcrumbSchema(currentUrl, [
            { name: content.home, item: `${siteUrl}${isJp ? '/jp' : ''}` },
            { name: content.blog, item: `${siteUrl}${basePath}` },
            { name: authorName, item: currentUrl },
        ]),
    };

    return (
        <>
            {!isJp && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

                        <div className="mt-8 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-[24px] md:gap-[40px]">
                            {authorAvatarUrl && (
                                <div className="shrink-0 md:order-last">
                                    <Image
                                        src={authorAvatarUrl}
                                        alt={authorName}
                                        width={164}
                                        height={164}
                                        className="size-[120px] md:size-[164px] rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="text-center md:text-left">
                                <h2 className="font-['Pretendard'] text-[18px] font-semibold text-[#81cac4] mb-3 tracking-wide uppercase">
                                    {content.authorLabel}
                                </h2>
                                <h1 className="font-['Pretendard'] text-[28px] md:text-[34px] font-medium text-black mb-4 leading-tight tracking-[-0.02em]">
                                    {authorName}
                                </h1>
                                {authorDescription && (
                                    <p className="font-['Pretendard'] text-[16px] md:text-[17px] text-black/60 leading-relaxed max-w-[600px]">
                                        {authorDescription}
                                    </p>
                                )}
                                <p className="mt-[12px] font-['Pretendard'] text-[14px] text-black/40">
                                    {content.postsCount(totalPosts)}
                                </p>
                            </div>
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
                                slug={post.slug}
                                imageUrl={post.imageUrl}
                                author={post.author}
                                locale={locale}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={authorPath} locale={locale} />
                    )}
                </Container>

                <Footer
                    breadcrumbs={[
                        { label: content.home, href: `/` },
                        { label: content.blog, href: `/blog` },
                        { label: authorName, href: `/blog/author/${authorSlug}` },
                    ]}
                />
            </main>
        </>
    );
}
