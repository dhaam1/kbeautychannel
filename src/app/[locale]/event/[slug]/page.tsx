import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getWpPageBySlug, rewriteWpHtml, stripHtml, rewriteWpResourceUrl } from '@/lib/wordpress';
import { WpContentRenderer } from '@/components/blog/WpContentRenderer';
import FloatingConsultationForm from '@/components/FloatingConsultationForm';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const page = await getWpPageBySlug(slug, locale);
    if (!page) return {};

    const siteUrl = getSiteUrl();
    const title = page.title.rendered;
    const description = stripHtml(page.excerpt?.rendered || '').substring(0, 160);    // Yoast SEO 데이터가 있으면 활용 (WpPostWithSeo 타입으로 가져오지 않았지만 API 응답에는 포함되어 있을 수 있음)
    const yoast = (page as any).yoast_head_json;
    const defaultOgImage = `${siteUrl}/assets/og/default_og.webp`;
    const ogImage = yoast?.og_image?.[0]?.url
        ? rewriteWpResourceUrl(yoast.og_image[0].url, { absolute: true }) || defaultOgImage
        : defaultOgImage;

    const siteName = locale === 'en' ? 'Blanche Dental Clinic' : locale === 'jp' ? 'ブランシュ歯科' : '블랑쉬치과';
    return {
        metadataBase: new URL(siteUrl),
        title: yoast?.title || `${title} | ${siteName}`,
        description: yoast?.description || description,
        openGraph: {
            title: yoast?.og_title || title,
            description: yoast?.og_description || description,
            url: yoast?.og_url || `${siteUrl}/event/${slug}`,
            siteName: siteName,
            locale: locale === 'kr' ? 'ko_KR' : locale === 'jp' ? 'ja_JP' : 'en_US',
            type: 'article',
            images: [
                {
                    url: ogImage || '',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: yoast?.twitter_title || title,
            description: yoast?.twitter_description || description,
            images: [ogImage || ''],
        },
        robots: {
            index: false,
            follow: false,
        },
    };
}

/**
 * 이벤트 상세 페이지
 * 헤드리스 구조: Header/Footer 없이 콘텐츠 + 하단 CTA만 노출
 */
export default async function DynamicEventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    
    const siteUrl = getSiteUrl();

    // 워드프레스에서 페이지(Page) 가져오기
    const page = await getWpPageBySlug(slug, locale);

    if (!page) {
        notFound();
    }

    const content = rewriteWpHtml(page.content.rendered, siteUrl, locale);
    const title = page.title.rendered;

    return (
        <>
            <main className="min-h-screen bg-white pt-10 pb-20 px-4 md:px-8 max-w-[1472px] mx-auto">
                <h1
                    className="text-3xl md:text-4xl font-bold mb-12 text-center"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className="prose max-w-none prose-img:rounded-xl prose-img:shadow-md">
                    <WpContentRenderer content={content} />
                </div>
            </main>

            <FloatingConsultationForm />
        </>
    );
}
