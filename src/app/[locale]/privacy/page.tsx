import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getWpPageById, rewriteWpHtml } from '@/lib/wordpress';
import { WpContentRenderer } from '@/components/blog/WpContentRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '개인정보 이용방침 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '강남 블랑쉬치과의 개인정보처리방침입니다. 수집 항목과 이용 목적, 보유 기간 등을 명확히 공지합니다. 안전한 서비스를 위해 규정된 내용을 확인해 보세요.'; const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/privacy`,
                    'ja': `${siteUrl}/jp/privacy`,
                    'x-default': `${siteUrl}/privacy`
                }
            },
            openGraph: {
                title,
                description,
                siteName: '블랑쉬치과 의원',
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
        const title = 'Privacy Policy | Blanche Dental Clinic';
        const description = 'Privacy Policy of Blanche Dental Clinic.';
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
    const title = '個人情報保護方針 | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニック입니다. ご来院いただく皆様へ真心を尽くす診療を目指합니다.'; const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/privacy`,
                'ja': `${siteUrl}/jp/privacy`,
                'x-default': `${siteUrl}/privacy`
            }
        },
        openGraph: {
            title,
            description,
            siteName: 'ブランシュ歯科医院',
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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    
    const siteUrl = getSiteUrl();

    // Hardcoded translations based on locale
    const isJp = locale === 'jp';
    const content = {
        title: isJp ? '個人情報保護方針' : '개인정보 처리방침',
        fallbackDescription: isJp ? 'ブランシュ歯科の個人情報保護方針입니다.' : '블랑쉬치과 개인정보 처리방침입니다.',
        home: isJp ? 'ホーム' : '홈'
    };

    // 워드프레스에서 개인정보 처리방침 페이지 가져오기 (KR: 3212, JP: 3271)
    const pageId = isJp ? 3271 : 3212;
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
                { label: content.title, href: '/privacy' }
            ]} />
        </>
    );
}
