import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getBreadcrumbSchema } from '@/constants/schema';
import {
    WhiteningHeroSection,
    WhiteningProcedureProcessTextSection,
    WhiteningProcedureProcessSection,
    WhiteningLabSection,
    WhiteningDesignSection,
    WhiteningDirectorSection,
    WhiteningLocationSection,
    WhiteningCustomerSection,
    WhiteningRecommendationSection,
    WhiteningFAQSection,
    WhiteningCTASection,
    WhiteningHeroSection_JP,
    WhiteningProcedureProcessTextSection_JP,
    WhiteningLabSection_JP,
    WhiteningDesignSection_JP,
    WhiteningDirectorSection_JP,
    WhiteningLocationSection_JP,
    WhiteningProcedureProcessSection_JP,
    WhiteningCustomerSection_JP,
    WhiteningRecommendationSection_JP,
    WhiteningFAQSection_JP,
    WhiteningCTASection_JP
} from '@/components/sections/whitening';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '치아미백 | 블랑쉬치과의원';
        const description = '서울 강남 논현역 치아 미백 전문 치과. 누런 치아 고민, 블랑쉬치과에서 해결하세요. 합리적인 단가의 1:1 맞춤 미백으로 시림 없이 효과는 확실하게. 정품 고농도 미백제와 특수 광선으로 환한 미소를 만들어 드립니다.'; const ogImageUrl = `${siteUrl}/assets/og/mibac_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/special/whitening`,
                    'ja': `${siteUrl}/jp/service/whitening`,
                    'x-default': `${siteUrl}/special/whitening`
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
        const title = 'Teeth Whitening | Blanche Dental Clinic';
        const description = 'Brighten your smile safely and effectively at Blanche Dental Clinic.';
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
    const title = 'ホワイトニング | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。';
    const ogImageUrl = `${siteUrl}/assets/og/mibac_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/special/whitening`,
                'ja': `${siteUrl}/jp/service/whitening`,
                'x-default': `${siteUrl}/special/whitening`
            }
        },
        openGraph: {
            title,
            description, siteName: 'ブランシュ歯科',
            locale: 'ja_JP',
            type: 'website',
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
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

export default async function WhiteningPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('whitening');
    const tc = await getTranslations('common');
    const tnav = await getTranslations('nav');
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';
    const currentUrl = `${siteUrl}${isJp ? '/jp' : ''}/special/whitening`;

    // SEO Schema.org JSON-LD
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        ...getBreadcrumbSchema(currentUrl, [
            { name: tc('home'), item: `${siteUrl}${isJp ? '/jp' : ''}` },
            { name: tnav('special'), item: `${siteUrl}${isJp ? '/jp' : ''}/special` },
            { name: tnav('specialMenu.whitening'), item: currentUrl },
        ]),
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('hero.title'),
        "provider": getServiceProviderSchema(locale),
        "description": t('hero.subtitle').replace(/\n/g, ' ')
    };

    // FAQ Schema Extraction
    const faqList = isJp ? [
        {
            question: "ホワイトニング効果はどのくらい持続しますか？",
            answer: "個人の食習慣やケア方法によって差はありますが、ホワイトニングの効果は通常6か月～1年程度持続します。着色を促す食品の摂取を控え、丁寧な歯磨きを併用すると、さらに長持ちさせることが可能です。"
        },
        {
            question: "施術後に以前のように黄ばんでしまうことはありますか？",
            answer: "歯は生きた組織のため、時間の経過とともに少しずつ色が戻ることがあります。ただし、施術前ほど暗くなることはなく、定期的なホワイトニングで明るさを維持できます。"
        },
        {
            question: "ホワイトニングの施術は何回行うのが目安ですか？",
            answer: "ブランシュ歯科のホワイトニングは、通常1日1回の来院で2～3回連続施術を行うだけでも、目に見える効果が得られます。より明るさを希望される場合や、着色が強い場合は、1週間程度の間隔で追加施術をおすすめします。"
        },
        {
            question: "ホワイトニングが思ったほど効果を感じられないことはありますか？",
            answer: "以下の場合は、一般的なホワイトニングではなく、別の治療が必要になることがあります。\n\n- エナメル質が極端に薄い場合\n- 神経治療を受けた歯\n- レジンや補綴物がある歯\n\nブランシュ歯科では、施術前に精密な診断を行い、ホワイトニングが適しているかを確認いたします。"
        },
        {
            question: "施術中に歯が痛むことはありますか？",
            answer: "個人差はありますが、ブランシュ歯科では歯茎保護剤を丁寧に塗布し、患者様の歯の知覚過敏の程度に応じて、薬剤の濃度や照射時間を調整します。知覚過敏を最小限に抑えながら、ホワイトニング効果を最大限に引き出すことが、ブランシュホワイトニングの特徴です。"
        }
    ] : [
        {
            question: "치아미백을 하면 치아가 깎이거나 손상되나요?",
            answer: "아니요, 치아미백은 치아를 깎아내는 것이 아니라 치아 표면의 미세한 구멍에 쌓인 착색 물질을 특수 미백제로 분해하는 원리입니다. 치아 자체를 손상시키지 않고 본래의 색을 되찾아주는 안전한 시술입니다."
        },
        {
            question: "시술 중이나 후에 이가 많이 시린가요?",
            answer: "블랑쉬는 식품의약품안전처(KFDA)의 승인을 받은 정품 미백제만을 사용하며, 잇몸 보호제를 꼼꼼히 도포하여 자극을 최소화합니다. 사람에 따라 일시적으로 약간의 시림 현상이 있을 수 있으나, 보통 하루 이내에 사라집니다."
        },
        {
            question: "치료 효과는 얼마나 지속되나요?",
            answer: "개인의 식습관과 관리 상태에 따라 다르지만 보통 1~2년 정도 유지됩니다. 커피, 녹차, 카레 등 색소가 강한 음식을 피하고 정기적으로 스케일링을 받으시면 더 오래 백색을 유지하실 수 있습니다."
        },
        {
            question: "미백 후 바로 식사가 가능한가요?",
            answer: "시술 후 약 1~2시간 동안은 치아 표면이 착색에 취약한 상태이므로 음식 섭취를 피하시는 것이 좋습니다. 특히 초기 24시간 동안은 김치, 커피, 콜라 등 색소가 있는 음식은 피해주셔야 효과가 극대화됩니다."
        },
        {
            question: "전문가 미백과 자가 미백의 차이가 무엇인가요?",
            answer: "전문가 미백은 높은 농도의 미백제와 특수 광선을 사용하여 단기간에 확실한 효과를 냅니다. 자가 미백은 집에서 낮은 농도의 미백제를 사용하여 유지 기간을 늘리는 데 도움을 줍니다. 블랑쉬는 빠른 효과를 위해 전문가 미백을 우선 권장해 드립니다."
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <>
            {!isJp && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema]),
                    }}
                />
            )}
            <Header />
            <ClientOnlyComponents />
            <div className="relative">
                {/* Section 1: Hero */}
                {isJp ? <WhiteningHeroSection_JP /> : <WhiteningHeroSection />}

                {/* Content Sections with Parallax Effect */}
                <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
                    {/* ... */}
                    {isJp ? (
                        <>
                            <WhiteningProcedureProcessTextSection_JP />
                            <WhiteningLabSection_JP />
                            <WhiteningDesignSection_JP />
                            <WhiteningDirectorSection_JP />
                            <WhiteningLocationSection_JP />
                            <WhiteningProcedureProcessSection_JP />
                            <WhiteningCustomerSection_JP />
                            <WhiteningRecommendationSection_JP />
                            <WhiteningFAQSection_JP />
                            <WhiteningCTASection_JP />
                        </>
                    ) : (
                        <>
                            <WhiteningProcedureProcessTextSection />
                            <WhiteningLabSection />
                            <WhiteningDesignSection />
                            <WhiteningDirectorSection />
                            <WhiteningLocationSection />
                            <WhiteningProcedureProcessSection />
                            <WhiteningCustomerSection />
                            <WhiteningRecommendationSection />
                            <WhiteningFAQSection />
                            <WhiteningCTASection />
                        </>
                    )}

                    <Footer breadcrumbs={[
                        { label: tc('home'), href: '/' },
                        { label: tnav('special').replace('\n', ' '), href: '/special' },
                        { label: tnav('specialMenu.whitening'), href: '/special/whitening' }
                    ]} />
                </div>
            </div>
        </>
    );
}
