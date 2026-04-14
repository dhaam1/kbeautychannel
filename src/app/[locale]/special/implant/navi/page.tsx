import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/utils';
import ImplantPage from '../page';

/**
 * 네비게이션 임플란트 페이지 (Tab: navigation)
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '네비게이션 임플란트 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '네비게이션임플란트, 오스템 임플란트와 3D 수술 가이드로 오차를 줄이고 안전하게 식립하세요! 당일 임시 치아 가능한 블랑쉬치과입니다.'; const ogImageUrl = `${siteUrl}/assets/asset-5.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/special/implant/navi`,
                    'ja': `${siteUrl}/jp/service/implant/navi`,
                    'x-default': `${siteUrl}/special/implant/navi`
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
        const title = 'Navigation Implant | Blanche Dental Clinic';
        const description = 'Precise and safe navigation implants by Blanche Dental Clinic.';
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

    // 일본어 메타데이터
    const title = 'ナビゲーションインプラント | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。'; const ogImageUrl = `${siteUrl}/assets/asset-5.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/special/implant/navi`,
                'ja': `${siteUrl}/jp/service/implant/navi`,
                'x-default': `${siteUrl}/special/implant/navi`
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

export default function NaviPage({ params }: { params: Promise<{ locale: string }> }) {
    return <ImplantPage params={params} activeTab="navi" />;
}
