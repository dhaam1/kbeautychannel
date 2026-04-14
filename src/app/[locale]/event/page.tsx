import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FloatingConsultationForm from '@/components/FloatingConsultationForm';
import { getWpPageById, rewriteWpHtml } from '@/lib/wordpress';
import { getSiteUrl } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';

    const title = locale === 'en' ? 'Events | Blanche Dental Clinic' : isJp ? 'イベント | ブランシュ歯科' : '이벤트 | 블랑쉬치과';
    const description = locale === 'en' ? 'Events page of Blanche Dental Clinic.' : isJp ? 'ブランシュ歯科医院のイベントページです。' : '블랑쉬치과 이벤트 페이지입니다';
    const ogImageUrl = `${siteUrl}/assets/og/default_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/event`,
                'ja': `${siteUrl}/jp/event`,
                'x-default': `${siteUrl}/event`
            }
        },
        openGraph: {
            title,
            description,
            siteName: isJp ? 'ブランシュ歯科' : '블랑쉬치과',
            locale: isJp ? 'ja_JP' : 'ko_KR',
            type: 'website',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
        robots: {
            index: false,
            follow: false,
        },
    };
}

/**
 * 이벤트 페이지 (WP Page ID: 3220)
 * 헤드리스 구조: Header/Footer 없이 콘텐츠 + 하단 CTA만 노출
 */
export default async function EventPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    
    const siteUrl = getSiteUrl();

    // 1. 고정된 ID(3220)로 워드프레스 페이지 조회
    const pageId = 3220;
    const page = await getWpPageById(pageId, locale);

    if (!page) {
        notFound();
    }

    // 2. HTML 콘텐츠 정규화 (보안, 링크, 이미지 경로 등)
    const contentHtml = rewriteWpHtml(page.content.rendered, siteUrl, locale);
    const titleHtml = rewriteWpHtml(page.title.rendered, siteUrl, locale);

    return (
        <>
            <main className="min-h-screen bg-white">
                <section className="py-20 px-4 md:px-6 lg:px-8">
                    <div className="max-w-[1200px] mx-auto">
                        {/* 페이지 제목 */}
                        <h1
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center font-serif"
                            dangerouslySetInnerHTML={{ __html: titleHtml }}
                        />

                        {/* 본문 콘텐츠 */}
                        <div
                            className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:shadow-sm prose-a:text-mint-dark prose-headings:font-serif"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </section>
            </main>

            <FloatingConsultationForm />
        </>
    );
}
