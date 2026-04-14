import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';

import { Toaster } from 'react-hot-toast';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import dynamic from 'next/dynamic';

// 클라이언트 컴포넌트를 동적 import
const CasesPageClient = dynamic(() => import('./CasesPageClient').then(mod => ({ default: mod.default })), { ssr: true });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '치료사례 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '블랑쉬치과 실제 치료 사례와 후기를 확인하세요. 무삭제 라미네이트와 합리적인 단가의 임플란트로 환한 미소와 일상을 되찾아드립니다.'; const ogImageUrl = `${siteUrl}/assets/og/review_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/review`,
                    'ja': `${siteUrl}/jp/before-after`,
                    'x-default': `${siteUrl}/review`
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
        const title = 'Before & After | Blanche Dental Clinic';
        const description = 'Authentic reviews and treatment cases from our patients.';
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
    const title = '治療事例・症例写真 | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです. ご来院いただく皆様へ真心を尽くす診療を目指します。'; const ogImageUrl = `${siteUrl}/assets/og/review_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/review`,
                'ja': `${siteUrl}/jp/before-after`,
                'x-default': `${siteUrl}/review`
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

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isJp = locale === 'jp';
    const tc = await getTranslations({ locale, namespace: 'common' });
    const tnav = await getTranslations({ locale, namespace: 'nav' });
    

    return (
        <>
            <Header />
            <FloatingActionButton />
            <Toaster position="top-center" />
            <CasesPageClient />
            <Footer breadcrumbs={[
                { label: tc('home'), href: '/' },
                { label: tnav('review'), href: '/review' }
            ]} />
        </>
    );
}
