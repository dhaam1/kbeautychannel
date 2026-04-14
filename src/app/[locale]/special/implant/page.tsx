import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getBreadcrumbSchema } from '@/constants/schema';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';

// New Implant Section Imports
import { ImplantHeroSection } from '@/components/sections/implant/ImplantHeroSection';
import { ImplantPhilosophySection } from '@/components/sections/implant/ImplantPhilosophySection';
import { ImplantDirectorSection } from '@/components/sections/implant/ImplantDirectorSection';
import { ImplantLocationSection } from '@/components/sections/implant/ImplantLocationSection';
import { ImplantTabSection } from '@/components/sections/implant/ImplantTabSection';
import { ImplantRecommendationSection } from '@/components/sections/implant/ImplantRecommendationSection';
import { ImplantSleepSection } from '@/components/sections/implant/ImplantSleepSection';
import { ImplantEquipmentSection } from '@/components/sections/implant/ImplantEquipmentSection';
import { ImplantProcessSection } from '@/components/sections/implant/ImplantProcessSection';
import { ImplantDesignSection } from '@/components/sections/implant/ImplantDesignSection';
import { ImplantExpertiseSection } from '@/components/sections/implant/ImplantExpertiseSection';
import { ImplantCTASection } from '@/components/sections/implant/ImplantCTASection';
import { ImplantFAQSection } from '@/components/sections/implant/ImplantFAQSection';
import { ImplantCTASectionForm } from '@/components/sections/implant/ImplantCTASectionForm';
import { ImplantKbsVideoSection } from '@/components/sections/implant/ImplantKbsVideoSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = "블랑쉬 임플란트 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트";
        const description = "3만 건 식립 노하우 강남 블랑쉬치과. 서울대 출신 의료진의 무절개 수면 임플란트로 통증 걱정 없이 안전하게 시술하세요."; const ogImageUrl = `${siteUrl}/assets/og/implant_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/special/implant`,
                    'ja': `${siteUrl}/jp/service/implant`,
                    'x-default': `${siteUrl}/special/implant`
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
        const title = 'Implant | Blanche Dental Clinic';
        const description = 'Blanche Dental Clinic provides advanced implant solutions.';
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
    const title = "インプラント | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能";
    const description = "ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。"; const ogImageUrl = `${siteUrl}/assets/og/implant_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/special/implant`,
                'ja': `${siteUrl}/jp/service/implant`,
                'x-default': `${siteUrl}/special/implant`
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

interface ImplantPageProps {
    activeTab?: string;
}

export default async function ImplantPage({ params, activeTab = 'digital' }: { params: Promise<{ locale: string }>, activeTab?: string }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'implant' });
    const tc = await getTranslations({ locale, namespace: 'common' });
    const tnav = await getTranslations({ locale, namespace: 'nav' });
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';

    // SEO Schema.org JSON-LD
    const currentUrl = `${siteUrl}${isJp ? '/jp' : ''}/special/implant`;
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        ...getBreadcrumbSchema(currentUrl, [
            { name: tc('home'), item: `${siteUrl}${isJp ? '/jp' : ''}` },
            { name: tnav('special'), item: `${siteUrl}${isJp ? '/jp' : ''}/special` },
            { name: tnav('specialMenu.implant'), item: currentUrl },
        ]),
    };

    const philosophyText = t.raw('philosophy.bottomText.desktop');
    const serviceName = Array.isArray(philosophyText) ? philosophyText.join(' ') : t('title');

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceName,
        "provider": getServiceProviderSchema(locale),
        "description": t('description')
    };

    // FAQ Schema Extraction
    const faqList = isJp ? [
        {
            question: "インプラント手術は痛いですか？",
            answer: "手術は局所麻酔下で行われるため、痛みはほとんど感じません。手術後に麻酔が切れると多少の不快感があるかもしれませんが、処方された鎮痛剤で十分に管理できます。ほとんどの場合、1〜2日以内に日常生活への復帰が可能です。"
        },
        {
            question: "インプラントの寿命はどのくらいですか？",
            answer: "適切な管理が行われれば、半永久的に使用することができます。寿命は口腔衛生管理、全身の健康状態、定期検診の有無によって異なります。インプラント周囲炎の予防のために、定期的なスケーリングと検診が必須です。"
        },
        {
            question: "インプラントは何本まで受けることができますか？",
            answer: "骨の状態により、最大28本まで受けることができます。単独歯の喪失から全歯喪失まで様々なケースに適用可能で、無歯顎患者の場合、All-on-4またはAll-on-6方式により、少ない本数のインプラントでも全体の歯列を復元することができます。"
        },
        {
            question: "インプラントの費用はいくらですか？",
            answer: "使用される材料、手術の複雑さ、歯科医師の経験などによって異なります。65歳以上の高齢者の場合、健康保険の適用を受けることができます。正確な費用はカウンセリングを通じてご案内いたします。"
        },
        {
            question: "インプラントを受ける前に禁煙しなければなりませんか？",
            answer: "はい、禁煙をお勧めします。喫煙は歯茎と骨の血流を減少させ、回復を遅らせ、インプラント周囲炎のリスクを増加させます。手術前後の禁煙を維持することが、インプラントの成功に非常に重要です。"
        },
        {
            question: "インプラント周囲炎とは何ですか？",
            answer: "インプラント周囲の歯茎と骨に炎症が生じる疾患です。口腔衛生管理が適切に行われないと発生する可能性があり、治療しないと骨の損失が発生し、インプラントが脱落する可能性があります。予防のために定期的な検診と口腔衛生管理が必須です。"
        }
    ] : [
        {
            question: "임플란트 시술은 아픈가요?",
            answer: "수술은 국소 마취 하에 진행되어 통증을 거의 느끼지 않습니다.\n수술 후 마취가 풀리면서 약간의 불편함이 있을 수 있지만,\n처방된 진통제로 충분히 관리됩니다.\n대부분 1~2일 내에 일상 복귀가 가능합니다."
        },
        {
            question: "임플란트 수명은 얼마나 되나요?",
            answer: "적절한 관리가 이루어진다면 평생 사용할 수 있습니다. \n수명은 구강 위생 관리, 전신 건강 상태, 정기 검진 여부에 따라 달라집니다. \n임플란트 주위염 예방을 위해 정기적인 스케일링과 검진이 필수입니다."
        },
        {
            question: "임플란트를 몇 개까지 받을 수 있나요?",
            answer: "뼈 상태에 따라 최대 28개까지 받을 수 있습니다.\n단일 치아 상실부터 전체 치아 상실까지 다양한 경우에 적용 가능하며,\n 무치악 환자의 경우 All-on-4나 All-on-6 방식으로\n적은 수의 임플란트로도 전체 치열을 복원할 수 있습니다."
        },
        {
            question: "임플란트 비용은 얼마인가요?",
            answer: "사용되는 재료, 시술의 복잡성, 치과의사의 경험 등에 따라 달라집니다.\n65세 이상 고령자의 경우 건강보험 혜택을 받을 수 있습니다.\n정확한 비용은 상담을 통해 안내드립니다."
        },
        {
            question: "임플란트를 받기 전에 금연해야 하나요?",
            answer: "네, 금연을 권장합니다.\n흡연은 잇몸과 뼈의 혈류를 감소시켜 회복을 더디게 하고\n임플란트 주위염의 위험을 증가시킵니다.\n시술 전후 금연을 유지하는 것이 임플란트 성공에 매우 중요합니다."
        },
        {
            question: "임플란트 주위염은 무엇인가요?",
            answer: "임플란트 주위의 잇몸과 뼈에 염증이 생기는 질환입니다.\n구강 위생 관리가 제대로 이루어지지 않으면 발생할 수 있으며,\n치료하지 않으면 뼈 손실이 발생해 임플란트가 탈락할 수 있습니다.\n예방을 위해 정기적인 검진과 구강 위생 관리가 필수입니다."
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

    // ItemList Schema for 임플란트 관련 페이지 목록
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": isJp ? "ブランシュ歯科 インプラント" : "블랑쉬치과 임플란트",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "インプラント レビュー" : "임플란트 후기",
                    "image": `${siteUrl}/img/implant1.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/review`
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "睡眠 インプラント" : "수면 임플란트",
                    "image": `${siteUrl}/img/implant2.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/special/sleep`
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "インプラント ブランド" : "임플란트 브랜드",
                    "image": `${siteUrl}/img/implant3.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/blog/implant/임플란트-브랜드-추천`
                }
            },
            {
                "@type": "ListItem",
                "position": 4,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "診療サービス" : "진료 서비스",
                    "image": `${siteUrl}/img/implant4.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/special`
                }
            },
            {
                "@type": "ListItem",
                "position": 5,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "医療陣紹介" : "의료진 소개",
                    "image": `${siteUrl}/img/implant5.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/intro`
                }
            },
            {
                "@type": "ListItem",
                "position": 6,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "インプラント 医療情報" : "임플란트 의료 정보",
                    "image": `${siteUrl}/img/implant6.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/blog/implant`
                }
            }
        ]
    };

    return (
        <>
            {!isJp && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema, itemListSchema]),
                    }}
                />
            )}
            <Header />
            <FloatingActionButton />
            <Toaster position="top-center" />

            <div className="relative">

                {/* Section 1: Hero */}
                <ImplantHeroSection />

                {/* Content Sections with Parallax Effect */}
                <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">

                    {/* Section 2: Philosophy (Model) */}
                    <ImplantPhilosophySection />

                    {/* Section 3: Director */}
                    <ImplantDirectorSection />

                    {/* Section 3.5: KBS Video */}
                    <ImplantKbsVideoSection />

                    {/* Section 4: Location (Map) + Banner */}
                    <ImplantLocationSection />

                    {/* Section 5: Tab Section */}
                    <ImplantTabSection activeTab={activeTab} />

                    {/* Section 7: Recommendation (Full Recommendation) */}
                    <ImplantRecommendationSection />

                    {/* Section 8: Sleep Implant */}
                    <ImplantSleepSection />

                    {/* Section 9: Equipment */}
                    <ImplantEquipmentSection />

                    {/* Section 10: Process */}
                    <ImplantProcessSection />

                    {/* Section 11: Design */}
                    <ImplantDesignSection />

                    {/* Section 12: Expertise */}
                    <ImplantExpertiseSection />

                    {/* Section 13: CTA */}
                    <ImplantCTASection />

                    {/* Section 14: FAQ */}
                    <ImplantFAQSection />

                    {/* Section 15: CTA Form */}
                    <ImplantCTASectionForm />

                    <Footer breadcrumbs={[
                        { label: tc('home'), href: '/' },
                        { label: tnav('special').replace('\n', ' '), href: '/special' },
                        { label: tnav('specialMenu.implant'), href: '/special/implant' }
                    ]} />
                </div>
            </div>
        </>
    );
}
