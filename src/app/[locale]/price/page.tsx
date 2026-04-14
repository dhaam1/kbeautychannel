import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getWpPageById, rewriteWpHtml } from '@/lib/wordpress';
import { WpContentRenderer } from '@/components/blog/WpContentRenderer';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

// 빌드 시점에 생성할 정적 경로 정의
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '비급여 수가표 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '블랑쉬치과 비급여 수가표 안내! 임플란트, 원데이 무삭제 라미네이트 등 투명한 가격을 확인하세요. 강남 주말 및 야간진료가 가능합니다.'; const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/price`,
                    'ja': `${siteUrl}/jp/menu`,
                    'x-default': `${siteUrl}/price`
                }
            },
            openGraph: {
                title,
                description, siteName: '블랑쉬치과 의원',
                locale: 'ko_KR',
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
                index: true,
                follow: true,
            },
        };
    }

    // English Metadata
    if (locale === 'en') {
        const title = 'Pricing | Blanche Dental Clinic';
        const description = 'Transparent pricing for self-pay treatments.';
        const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;
    
        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}`,
                    'ja': `${siteUrl}/jp`,
                    'x-default': `${siteUrl}`
                }
            },
            openGraph: {
                title,
                description,
                siteName: 'Blanche Dental Clinic',
                locale: 'en_US',
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
                index: true,
                follow: true,
            },
        };
    }

    // Japanese Metadata
    const title = '自費診療価格表 (料金表) | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです. ご来院いただく皆様へ真心を尽くす診療を目指します。'; const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/price`,
                'ja': `${siteUrl}/jp/menu`,
                'x-default': `${siteUrl}/price`
            }
        },
        openGraph: {
            title,
            description, siteName: 'ブランシュ歯科医院',
            locale: 'ja_JP',
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
            index: true,
            follow: true,
        },
    };
}

export default async function PricePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    
    const siteUrl = getSiteUrl();

    // Hardcoded translations based on locale
    const isJp = locale === 'jp';
    const isEn = locale === 'en';
    const content = {
        title: isEn ? 'Pricing' : (isJp ? '自費診療価格表 (料金表)' : '비급여 수가표'),
        fallbackDescription: isEn ? 'Pricing for Blanche Dental Clinic.' : (isJp ? 'ブランシュ歯科の自費診療価格表입니다.' : '블랑쉬치과 비급여 수가표 안내입니다.'),
        home: isEn ? 'Home' : (isJp ? 'ホーム' : '홈')
    };

    // 워드프레스에서 비급여 수가표 페이지 가져오기 (KR: 3214, JP: 3273, EN: 4663)
    let pageId = 3214; // Default (KR)
    if (isJp) pageId = 3273;
    if (isEn) pageId = 4663;
    
    const post = await getWpPageById(pageId, locale);
    const renderedContent = post ? rewriteWpHtml(post.content.rendered, siteUrl, locale) : '';

    return (
        <>
            <Header />
            <ClientOnlyComponents />
            <main className="min-h-screen bg-white pt-[140px] header-md:pt-[170px] pb-20 px-4 md:px-8 max-w-[1472px] mx-auto">
                <h1 className="text-3xl font-bold mb-8">{post?.title.rendered || content.title}</h1>
                <div className="prose max-w-none">
                    {renderedContent ? (
                        <WpContentRenderer content={renderedContent} />
                    ) : (
                        <p>{content.fallbackDescription}</p>
                    )}
                </div>
            </main>
            <Footer breadcrumbs={[
                { label: content.home, href: '/' },
                { label: content.title, href: '/price' }
            ]} />
        </>
    );
}
