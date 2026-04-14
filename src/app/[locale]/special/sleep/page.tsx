import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getBreadcrumbSchema } from '@/constants/schema';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import {
    SleepHeroSection,
    SleepHeroSection_JP,
    SleepWhatSection,
    SleepRecommendationSection,
    SleepTechnologySection,
    SleepExpertiseSection,
    SleepProcessSection,
    SleepEquipmentSection,
    SleepCustomerSection,
    SleepFAQSection,
    SleepFAQSection_JP,
    SleepTreatmentSection,
    SleepCTASection,
    SleepCTASection_JP
} from '@/components/sections/sleep';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '수면치과, 치과수면치료 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '서울 강남 논현역 수면 치료 치과. 치과가 무서우셨나요? 수면 임플란트, 사랑니 발치, 신경 치료로 치과공포증 없이 아프지 않게 진료해 드립니다. 블랑쉬의 안전한 의식하 진정요법과 전문의 협진 시스템으로 편안하게 진료받으세요.'; const ogImageUrl = `${siteUrl}/assets/og/sleep_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/special/sleep`,
                    'ja': `${siteUrl}/jp/service/sleep`,
                    'x-default': `${siteUrl}/special/sleep`
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
        const title = 'Sleep Dentistry | Blanche Dental Clinic';
        const description = 'Comfortable and pain-free treatments while you sleep.';
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
    const title = '睡眠歯科治療 (セデーション) | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。';
    const ogImageUrl = `${siteUrl}/assets/og/sleep_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/special/sleep`,
                'ja': `${siteUrl}/jp/service/sleep`,
                'x-default': `${siteUrl}/special/sleep`
            }
        },
        openGraph: {
            title,
            description, siteName: 'ブランシュ歯科',
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



export default async function SleepPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('solution.sleep');
    const tc = await getTranslations('common');
    const tnav = await getTranslations('nav');
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';
    const currentUrl = `${siteUrl}${isJp ? '/jp' : ''}/special/sleep`;

    // SEO Schema.org JSON-LD
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        ...getBreadcrumbSchema(currentUrl, [
            { name: tc('home'), item: `${siteUrl}${isJp ? '/jp' : ''}` },
            { name: tnav('special'), item: `${siteUrl}${isJp ? '/jp' : ''}/special` },
            { name: tnav('specialMenu.sleep'), item: currentUrl },
        ]),
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t('hero.text'),
        "provider": getServiceProviderSchema(locale),
        "description": t('what.description')
    };

    // FAQ Schema Extraction
    const faqList = isJp ? [
        {
            question: "睡眠治療を受ける際に特別な準備は必要ですか？",
            answer: "歯科医院からは個別にご案内いたしますが、一般的には治療前6時間の絶食が必要です。ご来院の際は動きやすい服装でお越しください。施術後は眠気が残る場合がありますので、単独での運転や帰宅は避け、保護者の同伴をおすすめします。"
        },
        {
            question: "全身麻酔と睡眠治療は違う治療ですか？危険性はありませんか？",
            answer: "はい、異なります。ブランシュ歯科の睡眠治療は「意識下鎮静法」を用いており、自発呼吸が可能で、外部刺激にも反応できる浅い睡眠状態で行います。全身麻酔と比べて身体への負担は少なく、回復も早いのが特徴です。治療中はリアルタイムでモニタリングし、医療スタッフが患者様の状態を継続的に確認しながら、安全に治療を進めます。"
        },
        {
            question: "治療中に目が覚めることはありますか？",
            answer: "患者様の薬剤への反応によっては、治療中に一時的に意識が戻る場合があります。その際も、医療スタッフが薬剤量を迅速かつ安全に調整し、再び快適な状態を維持できるよう管理いたしますので、過度にご心配いただく必要はありません。"
        },
        {
            question: "睡眠治療中は全く痛みを感じませんか？",
            answer: "睡眠治療中はほとんど痛みを感じません。治療中は睡眠鎮静法と局所麻酔を併用し、痛みの負担を最小限に抑えます。ただし、施術後に麻酔が切れる際、痛みを感じることがあります。その際は処方されたお薬を服用し、十分に休息を取っていただければ、ほとんどの場合、日常生活に支障が出ない程度に抑えられます。"
        },
        {
            question: "睡眠治療後に副作用や後遺症が出ることはありますか？",
            answer: "施術直後は、一時的にめまい、眠気、吐き気が現れることがありますが、ほとんどの場合、数時間以内に自然に消えます。安全のため、施術当日は運転や機械操作、重要な契約・判断が必要な行動は避け、十分に休息を取ることをおすすめします。"
        },
        {
            question: "睡眠治療に使用する薬剤は安全ですか？",
            answer: "睡眠治療で使用するミダゾラムとケタミンの鎮静剤は、安全性が確認された薬剤です。ブランシュ歯科では、治療前・治療中・治療後に酸素飽和度、心拍数、血圧などの全てのバイタルサインをリアルタイムでモニタリングし、状況に応じた安全対策を行っています。"
        }
    ] : [
        {
            question: t('faq.items.q1.question'),
            answer: t('faq.items.q1.answer')
        },
        {
            question: t('faq.items.q2.question'),
            answer: t('faq.items.q2.answer')
        },
        {
            question: t('faq.items.q3.question'),
            answer: t('faq.items.q3.answer')
        },
        {
            question: t('faq.items.q4.question'),
            answer: t('faq.items.q4.answer')
        },
        {
            question: t('faq.items.q5.question'),
            answer: t('faq.items.q5.answer')
        },
        {
            question: t('faq.items.q6.question'),
            answer: t('faq.items.q6.answer')
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    // ItemList Schema for 수면치료 관련 페이지 목록
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": isJp ? "ブランシュ歯科 歯科睡眠治療" : `${tc('siteName')} ${t('what.title')}`,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "item": {
                    "@type": "Service",
                    "name": isJp ? "睡眠 インプラント" : t('treatments.items.implant.title'),
                    "image": `${siteUrl}/img/sleep1.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/special/implant`
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@type": "Service",
                    "name": isJp ? "睡眠 ラミネート" : "수면 라미네이트",
                    "image": `${siteUrl}/img/sleep2.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/special/laminate`
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@type": "Service",
                    "name": isJp ? "診療サービス" : "진료 서비스",
                    "image": `${siteUrl}/img/sleep3.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/special`
                }
            },
            {
                "@type": "ListItem",
                "position": 4,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "ブランシュ歯科 レビュー" : "블랑쉬치과 후기",
                    "image": `${siteUrl}/img/sleep4.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/review`
                }
            },
            {
                "@type": "ListItem",
                "position": 5,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "医療陣紹介" : "의료진 소개",
                    "image": `${siteUrl}/img/sleep5.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/intro`
                }
            },
            {
                "@type": "ListItem",
                "position": 6,
                "item": {
                    "@type": "WebPage",
                    "name": isJp ? "歯科医療情報" : "치과 의료정보",
                    "image": `${siteUrl}/img/sleep6.webp`,
                    "url": `${siteUrl}${isJp ? '/jp' : ''}/blog`
                }
            }
        ]
    };

    // Japanese version
    if (isJp) {
        return (
            <>
                <Header />
                <Toaster position="top-center" />

                <div className="relative">
                    <SleepHeroSection_JP />

                    <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
                        {/* Section 2: 歯科睡眠治療 */}
                        <section className="w-full bg-white">
                            <div className="relative w-full h-full flex flex-col mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[60px] md:pb-[100px]" style={{ maxWidth: '1472px' }}>
                                <div>
                                    <h2 className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', marginBottom: '0px', opacity: 1, transform: 'none' }}>歯科睡眠治療</h2>
                                    <p className="whitespace-pre-line mt-[17px] text-[28px] md:text-[28px] tracking-[-0.24px] md:tracking-[-0.28px]" style={{ color: 'rgb(0, 0, 0)', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', marginTop: '17px', marginBottom: '0px', opacity: 1, transform: 'none' }}>快適な歯科睡眠治療</p>
                                    <p
                                        className="whitespace-pre-line"
                                        style={{
                                            color: '#000',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.18px',
                                            marginTop: '17px',
                                            marginBottom: '0px',
                                            opacity: 1,
                                            transform: 'none'
                                        }}
                                    >
                                        歯科治療が怖くて、つい後回しにしてしまっている方へ。<br />
                                        睡眠治療なら、その不安を解消できるかもしれません。
                                    </p>
                                </div>
                                <div className="w-full h-[1px] bg-black my-[60px]"></div>
                                <div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="flex-1 pr-0 md:pr-[30px] mb-[40px] md:mb-0">
                                            <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>意識下鎮静法</h3>
                                            <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>意識を保ったまま睡眠を誘導する治療法で、患者様の体への負担が少ないのが特徴です。</p>
                                        </div>
                                        <div className="flex-1 px-0 md:px-[30px] mb-[40px] md:mb-0">
                                            <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>痛み緩和</h3>
                                            <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>睡眠中に治療が行われるため、治療中の痛みを感じた記憶が残りにくいのが特徴です。</p>
                                        </div>
                                        <div className="flex-1 pl-0 md:pl-[30px]">
                                            <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>幅広い治療に対応</h3>
                                            <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>インプラント、親知らず、神経治療など、幅広い診療に対応し、複数の治療を同時に受けられます。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: おすすめの方 */}
                        <section className="w-full" style={{ background: '#F7F8F8' }}>
                            <div className="relative w-full mx-auto" style={{ maxWidth: '1472px' }}>
                                <div className="w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[67px] pb-[60px] bg-[#F7F8F8]">
                                    <h2 className="pb-[15px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>おすすめの方</h2>
                                    <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>歯科恐怖症でお悩みの方は、<br />ブランシュ歯科へお越しください。</p>
                                </div>
                                <div className="w-full px-[30px] md:px-[80px] pb-[20px]" style={{ background: '#F7F8F8' }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                        <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>注射恐怖症</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>麻酔針を見ただけで、<br />心臓が跳ねる方</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>音・匂い恐怖</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>歯科特有の機械音や匂いが<br />耐えられない方</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>嘔吐反射</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>口内に器具が触れただけで<br />強い吐き気が起こる方</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>長時間の治療恐怖</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>長く口を開けているのが<br />つらすぎる方</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3.5: ソリューション */}
                        <section className="w-full" style={{ background: '#F7F8F8' }}>
                            <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[60px] md:pb-[100px]" style={{ background: '#F7F8F8' }}>
                                <p className="pb-[79px] relative z-10 whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>ブランシュ歯科の<br />睡眠治療ソリューションが<br />正解です。</p>
                                <div className="relative z-10" style={{ width: '148px', height: '27px', opacity: 1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="148" height="27" viewBox="0 0 148 27" fill="none">
                                        <path d="M8.10523 14.0788C4.92576 14.27 2.34345 17.2638 2.34345 20.4489V24.3691C2.34345 25.1933 1.67513 25.8616 0.850251 25.8616H0V26.9978H14.6263V20.2088C14.6263 16.6914 11.669 13.8647 8.10523 14.0788Z" fill="black"></path>
                                        <path d="M21.9029 14.0674C18.5124 14.0674 15.7637 16.8162 15.7637 20.2066V26.9981H21.9029C25.2934 26.9981 28.0422 24.2494 28.0422 20.8589V20.2066C28.0422 16.8162 25.2934 14.0674 21.9029 14.0674Z" fill="black"></path>
                                        <path d="M14.6263 0H0V1.13614H0.850251C1.67451 1.13614 2.34283 1.80446 2.34283 2.62873V6.54953C2.34283 9.73457 4.92576 12.7284 8.10461 12.919C11.669 13.1337 14.6263 10.307 14.6263 6.78902V0Z" fill="black"></path>
                                        <path d="M21.9029 0H15.7637V6.79149C15.7637 10.182 18.5124 12.9307 21.9029 12.9307C25.2934 12.9307 28.0422 10.182 28.0422 6.79149V6.13926C28.0422 2.74877 25.2934 0 21.9029 0Z" fill="black"></path>
                                        <path d="M45.9291 21.6707C48.5541 21.6707 50.796 20.4615 50.796 18.102C50.796 15.6534 48.4656 14.3854 45.8703 14.3854H40.4724V21.6707H45.9291ZM45.369 11.6125C48.0231 11.6125 50.0584 10.4033 50.0584 8.10258C50.0584 5.68425 47.7874 4.50417 45.2806 4.50417H40.4724V11.6125H45.369ZM37.3164 1.58398H46.1945C50.8251 1.58398 53.3914 4.29749 53.3914 7.57164C53.3914 9.75481 52.1525 12.0549 49.4687 12.8223V12.8811C52.4477 13.4417 54.1581 15.5358 54.1581 18.3675C54.1581 22.5556 50.3827 24.5909 46.6958 24.5909H37.3164V1.58398Z" fill="black"></path>
                                        <path d="M59.4091 0.994141H56.4004V24.5908H59.4091V0.994141Z" fill="black"></path>
                                        <path d="M79.6719 8.2202H82.6211V11.0222H82.6806C83.9188 8.75115 85.925 7.74805 88.1373 7.74805C91.0865 7.74805 93.977 9.57664 93.977 14.2963V24.5903H90.9683V15.6231C90.9683 12.438 89.6119 10.5797 87.1639 10.5797C84.4497 10.5797 82.6806 12.792 82.6806 15.8001V24.5903H79.6719V8.2202Z" fill="black"></path>
                                        <path d="M109.124 12.371C108.79 10.2689 107.289 7.80041 104.786 7.80041C101.617 7.80041 98.4137 10.8697 98.4137 16.0412C98.4137 21.2794 102.05 24.3494 105.454 24.3494C108.156 24.3494 110.692 22.9812 112.427 19.9781L112.727 20.1451C110.892 23.048 108.624 24.7497 104.753 24.7497C100.349 24.7497 95.7441 21.4799 95.7441 16.0412C95.7441 10.6698 100.349 7.39941 104.753 7.39941C108.456 7.39941 111.46 10.1358 111.793 12.371H109.124Z" fill="black"></path>
                                        <path d="M114.066 24.4149V1.05957H116.736V15.3728C117.703 10.9686 120.506 7.39871 124.209 7.39871C126.612 7.39871 129.014 8.66666 129.014 12.2366V24.4149H126.345V13.0373C126.345 9.20008 125.377 7.79908 123.81 7.79908C120.072 7.79908 116.869 13.0373 116.736 18.1091V24.4149H114.066Z" fill="black"></path>
                                        <path d="M141.657 14.9403C143.559 14.8066 144.392 13.6723 144.392 12.3041C144.392 10.2689 142.558 7.80041 140.055 7.80041C136.886 7.80041 133.683 10.8697 133.683 16.0412C133.683 17.2757 133.883 18.3766 134.25 19.3778C134.584 17.0424 136.552 15.2404 141.657 14.9403ZM134.517 20.0449C135.785 22.8141 138.32 24.3494 140.723 24.3494C143.426 24.3494 145.961 22.9812 147.696 19.9781L147.996 20.1451C146.161 23.048 143.892 24.7497 140.022 24.7497C135.618 24.7497 131.014 21.4799 131.014 16.0412C131.014 10.6698 135.618 7.39941 140.022 7.39941C143.725 7.39941 147.062 10.1358 147.062 12.371C147.062 13.8728 145.394 15.2404 141.691 15.3407C137.387 15.4743 134.65 17.0758 134.517 20.0449Z" fill="black"></path>
                                        <path d="M74.3039 14.027C69.4778 14.1972 64.2438 16.2022 64.2438 21.2319C64.2438 22.5914 64.5836 24.4609 66.7927 24.4609C70.8713 24.4609 73.5904 20.5865 74.3039 16.4398V14.027ZM64.38 13.0753C64.38 8.65695 67.6083 7.19531 71.2111 7.19531C74.5762 7.19531 77.023 8.4874 77.023 12.1242V24.5289H74.3039V18.0376C73.3862 21.2319 70.9054 24.8687 66.2494 24.8687C63.0885 24.8687 61.5254 23.2034 61.5254 20.8247C61.5254 15.7603 69.2402 13.8234 74.3039 13.6873V12.9392C74.3039 9.03072 73.3181 7.60373 70.6671 7.60373C67.9147 7.60373 64.7197 9.03072 64.7197 13.0753H64.38Z" fill="black"></path>
                                    </svg>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: 睡眠治療の安全性 */}
                        <section className="w-full bg-white">
                            <div className="mx-auto w-full h-auto px-[30px] md:px-[80px] xl-custom:px-0" style={{ maxWidth: '1472px' }}>
                                <div className="flex flex-col items-start text-left pt-[60px] md:pt-[70px] pb-[50px] md:pl-0 lg:pl-[80px]">
                                    <h2 className="text-[18px] md:text-[20px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-[10px] text-black" style={{ lineHeight: '30px', opacity: 1, transform: 'none' }}>睡眠治療の安全性</h2>
                                    <div className="md:hidden text-[28px] font-medium tracking-[-0.28px] whitespace-pre-line text-black" style={{ fontStyle: 'normal', lineHeight: 'normal', opacity: 1, transform: 'none' }}>ブランシュ歯科は<br />安全性の高い<br />睡眠治療を提供します。</div>
                                    <div className="hidden md:block text-[32px] font-medium tracking-[-0.32px] whitespace-pre-line text-black" style={{ fontStyle: 'normal', lineHeight: 'normal', opacity: 1, transform: 'none' }}>ブランシュ歯科は<br />安全性の高い睡眠治療を提供します。</div>
                                    <p className="whitespace-pre-line mt-[30px]" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>患者様の快適さと安全を何よりも大切に、<br />眠りにつく瞬間から回復までの全過程を、<br />細部にわたり安全に設計しています。</p>
                                </div>
                                <div className="relative pb-[60px] md:pb-[100px]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl-custom:flex xl-custom:flex-wrap xl-custom:justify-center gap-[34px] justify-items-center" style={{ position: 'relative', zIndex: 50 }}>
                                        <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                            <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                                <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                    <Image src="/assets/asset-9-1.webp" alt="睡眠診療の前に健康状態を確認する事前診断システム" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                                </div>
                                                <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                    <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>事前診断システム</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">睡眠診療前の精密な健康評価を通じて、既往歴・全身状態を詳細に確認した上で、安全性を最大限に考慮した個別化睡眠治療計画を構築します。</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                            <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                                <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                    <Image src="/assets/asset-10.webp" alt="睡眠治療中の生体信号をリアルタイムでモニタリング" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                                </div>
                                                <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                    <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>リアルタイムのモニタリング</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">酸素飽和度・心拍数・血圧をリアルタイムかつ精密にモニタリングし、常時全身の状態を的確に把握した上で、より安全な治療管理を行います。</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                            <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                                <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                    <Image src="/assets/asset-11.webp" alt="薬物の配合にこだわった安全な睡眠治療方式" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                                </div>
                                                <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                    <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>薬剤組み合わせの差別化</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">ミダゾラムとケタミンの併用により、必要最小限の投与量で高い鎮静効果を実現し、呼吸機能を維持しながら、依存性リスクの低減を図ります。</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                            <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                                <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                    <Image src="/assets/asset-12.webp" alt="全スタッフ心肺蘇生資格を保有した睡眠治療環境" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                                </div>
                                                <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                    <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>全職員が心肺蘇生法(CPR)の資格を保有</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">睡眠治療における安全性確保のため、全スタッフが緊急時対応可能な心肺蘇生法（CPR）の資格を保有し、いかなる状況にも迅速かつ適切に対応できる体制を整えています。</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-left pl-0 md:pl-0 lg:pl-[80px] pr-[30px] xl-custom:pr-0 pb-0 md:pb-20 xl-custom:pb-0 w-full whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.60)', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.14px' }}>*ブランシュ歯科は中毒性と呼吸抑制のリスクがあるプロポフォールを使用しません。</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 7: 分野別専門家の協診 */}
                        <section className="w-full" style={{ backgroundColor: '#F7F8F8' }}>
                            <div className="mx-auto w-full px-[30px] md:px-[80px] lg:px-[80px] max-w-[1472px]">
                                <div className="pt-[60px] md:pt-[70px] pb-0">
                                    <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[60px]">
                                        <div className="flex-1 flex flex-col self-start">
                                            <div style={{ opacity: 1, transform: 'none' }}>
                                                <h2 style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', marginBottom: '12px' }}>分野別専門家による連携</h2>
                                            </div>
                                            <p className="whitespace-pre-line mb-[24px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>一人の医師だけでなく、<br />各分野の専門医が連携して行う睡眠治療</p>
                                            <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>
                                                睡眠治療は鎮静と治療を同時に考慮すべき診療です。<br />
                                                ブランシュ歯科では各分野の医療スタッフが連携し、<br />
                                                患者様の状態に合った安全な治療計画を立案します。
                                            </p>
                                        </div>
                                        <div className="flex-1 relative w-full aspect-[4/3] self-end flex items-end" style={{ opacity: 1, transform: 'none' }}>
                                            <Image alt="ブランシュ歯科の医療陣" loading="lazy" fill className="object-contain object-bottom" sizes="(max-width: 1024px) 100vw, 50vw" src="/assets/asset-13.webp" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 7.5: 睡眠治療が可能な診療 */}
                        <section className="w-full bg-white">
                            <div className="relative w-full mx-auto" style={{ maxWidth: '1472px' }}>
                                <div className="w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[60px] md:pb-[90px] bg-white">
                                    <h2 className="pb-[15px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>睡眠治療が可能な診療</h2>
                                    <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>以下のような診療の際には、<br />睡眠治療をご提案しています。</p>
                                </div>
                                <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                        <div className="flex flex-col pt-0 md:pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>睡眠インプラント</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>長時間手術の負担軽減と、<br />複数埋入への高い適応性</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>ブランシュ・ラミネート</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>埋伏歯抜歯に伴う恐怖や、<br />痛みの記憶を軽減</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>親知らずの抜歯</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>過敏な神経刺激を<br />最小限に抑えるよう調整</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-[40px] pb-0 md:pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                                <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>虫歯・神経治療</h3>
                                                <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>嘔吐反射の軽減と、<br />長時間施術の快適性</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 7.6: 睡眠治療のプロセス */}
                        <section className="w-full" style={{ backgroundColor: '#F7F8F8' }}>
                            <div className="mx-auto w-full max-w-[1472px] px-[30px] md:px-[80px] lg:px-[80px]">
                                <div className="relative w-full">
                                    <div className="absolute top-0 left-0 z-10 flex flex-col pt-[60px] md:pt-[67px]">
                                        <div className="relative inline-block pb-1 mb-[8px]" style={{ opacity: 1, transform: 'none' }}>
                                            <h2 className="text-[18px] font-normal text-[#000] font-['Pretendard'] leading-[30px] tracking-[-0.18px] relative z-10">睡眠治療のプロセス</h2>
                                        </div>
                                        <p className="whitespace-pre-line mb-[50px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>システムは体系的に、<br />患者様には快適さを。</p>                                </div>
                                    <div className="w-full pt-[340px] pb-[60px] md:pb-[100px]">
                                        <div className="flex flex-col gap-0 md:gap-0 lg:gap-[154px]">
                                            {/* Row 1: Steps 01-04 */}
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">01</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">初診・ご相談</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">健康状態と治療計画を確認し、睡眠治療が適しているか検討します。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">02</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">レントゲン撮影</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">必要な検査を実施した上で、睡眠治療の適応可否を判断します。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">03</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">心電図検査</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">基本的な生体状態について、慎重に入念な確認を行います。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">04</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">睡眠下鎮静法</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">浅い意識を維持した状態で、緊張を可能な限り抑制します。</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Row 2: Steps 05-08 */}
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">05</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">入眠確認および局所麻酔</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">睡眠状態を確認した上で、必要な部位にのみ局所麻酔を行います。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">06</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">歯科治療</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">計画に基づき治療を実施し、治療中も生体信号を確認しながら、安全に診療します。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">07</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">治療後の安静</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">十分にお休みいただき、目覚められましたら、すべての治療が終了となります。</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                    <div className="flex flex-col">
                                                        <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                        <div className="flex items-center mb-4 md:mb-6">
                                                            <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">08</span>
                                                        </div>
                                                        <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">結果の説明後、ご帰宅</h3>
                                                        <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">施術結果をご説明し、安全にご帰宅いただける体制を整えています。</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <SleepFAQSection_JP />
                        <SleepCTASection_JP />

                        <Footer breadcrumbs={[
                            { label: tc('home'), href: `/${locale}` },
                            { label: tnav('special').replace('\n', ' '), href: `/${locale}/special` },
                            { label: tnav('specialMenu.sleep'), href: `/${locale}/special/sleep` }
                        ]} />
                    </div>
                </div>
            </>
        );
    }

    // Korean version (default)
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
            <Toaster position="top-center" />

            <div className="relative">
                {/* Section 1: Hero */}
                <SleepHeroSection />

                {/* Content Sections with Parallax Effect */}
                <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
                    {/* Section 2: Dental Sleep Treatment Section */}
                    <section className="w-full bg-white">
                        <div className="relative w-full h-full flex flex-col mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[60px] md:pb-[100px]" style={{ maxWidth: '1472px' }}>
                            <div>
                                <h2 className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', marginBottom: '0px', opacity: 1, transform: 'none' }}>{t('what.title')}</h2>
                                <p className="whitespace-pre-line mt-[17px] text-[28px] md:text-[28px] tracking-[-0.24px] md:tracking-[-0.28px]" style={{ color: 'rgb(0, 0, 0)', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', marginTop: '17px', marginBottom: '0px', opacity: 1, transform: 'none' }}>{t('what.subtitle')}</p>
                                <p
                                    className="whitespace-pre-line"
                                    style={{
                                        color: '#000',
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.18px',
                                        marginTop: '17px',
                                        marginBottom: '0px',
                                        opacity: 1,
                                        transform: 'none'
                                    }}
                                >
                                    {t('what.description')}
                                </p>                            </div>
                            <div className="w-full h-[1px] bg-black my-[60px]"></div>
                            <div>
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-1 pr-0 md:pr-[30px] mb-[40px] md:mb-0">
                                        <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>{t('what.items.sedation.title')}</h3>
                                        <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>{t('what.items.sedation.description')}</p>
                                    </div>
                                    <div className="flex-1 px-0 md:px-[30px] mb-[40px] md:mb-0">
                                        <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>{t('what.items.pain.title')}</h3>
                                        <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>{t('what.items.pain.description')}</p>
                                    </div>
                                    <div className="flex-1 pl-0 md:pl-[30px]">
                                        <h3 style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', marginBottom: '12px' }}>{t('what.items.various.title')}</h3>
                                        <p className="whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.17px' }}>{t('what.items.various.description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Recommendation Section */}
                    <section className="w-full" style={{ background: '#F7F8F8' }}>
                        <div className="relative w-full mx-auto" style={{ maxWidth: '1472px' }}>
                            <div className="w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[67px] pb-[60px] bg-[#F7F8F8]">
                                <h2 className="pb-[15px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>{t('recommendation.title')}</h2>
                                <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>{t('recommendation.subtitle')}</p>
                            </div>
                            <div className="w-full px-[30px] md:px-[80px] pb-[20px]" style={{ background: '#F7F8F8' }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('recommendation.items.injection.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('recommendation.items.injection.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('recommendation.items.noise.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('recommendation.items.noise.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('recommendation.items.gag.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('recommendation.items.gag.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('recommendation.items.time.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('recommendation.items.time.description')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3.5: CTA Section with Logo */}
                    <section className="w-full" style={{ background: '#F7F8F8' }}>
                        <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[60px] md:pb-[100px]" style={{ background: '#F7F8F8' }}>
                            <p className="pb-[79px] relative z-10 whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>{t('ctaLogo.title')}</p>
                            <div className="relative z-10" style={{ width: '148px', height: '27px', opacity: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="148" height="27" viewBox="0 0 148 27" fill="none">
                                    <path d="M8.10523 14.0788C4.92576 14.27 2.34345 17.2638 2.34345 20.4489V24.3691C2.34345 25.1933 1.67513 25.8616 0.850251 25.8616H0V26.9978H14.6263V20.2088C14.6263 16.6914 11.669 13.8647 8.10523 14.0788Z" fill="black"></path>
                                    <path d="M21.9029 14.0674C18.5124 14.0674 15.7637 16.8162 15.7637 20.2066V26.9981H21.9029C25.2934 26.9981 28.0422 24.2494 28.0422 20.8589V20.2066C28.0422 16.8162 25.2934 14.0674 21.9029 14.0674Z" fill="black"></path>
                                    <path d="M14.6263 0H0V1.13614H0.850251C1.67451 1.13614 2.34283 1.80446 2.34283 2.62873V6.54953C2.34283 9.73457 4.92576 12.7284 8.10461 12.919C11.669 13.1337 14.6263 10.307 14.6263 6.78902V0Z" fill="black"></path>
                                    <path d="M21.9029 0H15.7637V6.79149C15.7637 10.182 18.5124 12.9307 21.9029 12.9307C25.2934 12.9307 28.0422 10.182 28.0422 6.79149V6.13926C28.0422 2.74877 25.2934 0 21.9029 0Z" fill="black"></path>
                                    <path d="M45.9291 21.6707C48.5541 21.6707 50.796 20.4615 50.796 18.102C50.796 15.6534 48.4656 14.3854 45.8703 14.3854H40.4724V21.6707H45.9291ZM45.369 11.6125C48.0231 11.6125 50.0584 10.4033 50.0584 8.10258C50.0584 5.68425 47.7874 4.50417 45.2806 4.50417H40.4724V11.6125H45.369ZM37.3164 1.58398H46.1945C50.8251 1.58398 53.3914 4.29749 53.3914 7.57164C53.3914 9.75481 52.1525 12.0549 49.4687 12.8223V12.8811C52.4477 13.4417 54.1581 15.5358 54.1581 18.3675C54.1581 22.5556 50.3827 24.5909 46.6958 24.5909H37.3164V1.58398Z" fill="black"></path>
                                    <path d="M59.4091 0.994141H56.4004V24.5908H59.4091V0.994141Z" fill="black"></path>
                                    <path d="M79.6719 8.2202H82.6211V11.0222H82.6806C83.9188 8.75115 85.925 7.74805 88.1373 7.74805C91.0865 7.74805 93.977 9.57664 93.977 14.2963V24.5903H90.9683V15.6231C90.9683 12.438 89.6119 10.5797 87.1639 10.5797C84.4497 10.5797 82.6806 12.792 82.6806 15.8001V24.5903H79.6719V8.2202Z" fill="black"></path>
                                    <path d="M109.124 12.371C108.79 10.2689 107.289 7.80041 104.786 7.80041C101.617 7.80041 98.4137 10.8697 98.4137 16.0412C98.4137 21.2794 102.05 24.3494 105.454 24.3494C108.156 24.3494 110.692 22.9812 112.427 19.9781L112.727 20.1451C110.892 23.048 108.624 24.7497 104.753 24.7497C100.349 24.7497 95.7441 21.4799 95.7441 16.0412C95.7441 10.6698 100.349 7.39941 104.753 7.39941C108.456 7.39941 111.46 10.1358 111.793 12.371H109.124Z" fill="black"></path>
                                    <path d="M114.066 24.4149V1.05957H116.736V15.3728C117.703 10.9686 120.506 7.39871 124.209 7.39871C126.612 7.39871 129.014 8.66666 129.014 12.2366V24.4149H126.345V13.0373C126.345 9.20008 125.377 7.79908 123.81 7.79908C120.072 7.79908 116.869 13.0373 116.736 18.1091V24.4149H114.066Z" fill="black"></path>
                                    <path d="M141.657 14.9403C143.559 14.8066 144.392 13.6723 144.392 12.3041C144.392 10.2689 142.558 7.80041 140.055 7.80041C136.886 7.80041 133.683 10.8697 133.683 16.0412C133.683 17.2757 133.883 18.3766 134.25 19.3778C134.584 17.0424 136.552 15.2404 141.657 14.9403ZM134.517 20.0449C135.785 22.8141 138.32 24.3494 140.723 24.3494C143.426 24.3494 145.961 22.9812 147.696 19.9781L147.996 20.1451C146.161 23.048 143.892 24.7497 140.022 24.7497C135.618 24.7497 131.014 21.4799 131.014 16.0412C131.014 10.6698 135.618 7.39941 140.022 7.39941C143.725 7.39941 147.062 10.1358 147.062 12.371C147.062 13.8728 145.394 15.2404 141.691 15.3407C137.387 15.4743 134.65 17.0758 134.517 20.0449Z" fill="black"></path>
                                    <path d="M74.3039 14.027C69.4778 14.1972 64.2438 16.2022 64.2438 21.2319C64.2438 22.5914 64.5836 24.4609 66.7927 24.4609C70.8713 24.4609 73.5904 20.5865 74.3039 16.4398V14.027ZM64.38 13.0753C64.38 8.65695 67.6083 7.19531 71.2111 7.19531C74.5762 7.19531 77.023 8.4874 77.023 12.1242V24.5289H74.3039V18.0376C73.3862 21.2319 70.9054 24.8687 66.2494 24.8687C63.0885 24.8687 61.5254 23.2034 61.5254 20.8247C61.5254 15.7603 69.2402 13.8234 74.3039 13.6873V12.9392C74.3039 9.03072 73.3181 7.60373 70.6671 7.60373C67.9147 7.60373 64.7197 9.03072 64.7197 13.0753H64.38Z" fill="black"></path>
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Sleep Treatment Safety Section */}
                    <section className="w-full bg-white">
                        <div className="mx-auto w-full h-auto px-[30px] md:px-[80px] xl-custom:px-0" style={{ maxWidth: '1472px' }}>
                            <div className="flex flex-col items-start text-left pt-[60px] md:pt-[67px] pb-[50px] md:pl-0 lg:pl-[80px]">
                                <h2 className="text-[18px] md:text-[20px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-[10px] text-black" style={{ lineHeight: '30px', opacity: 1, transform: 'none' }}>{t('safety.title')}</h2>
                                <div className="md:hidden text-[28px] font-medium tracking-[-0.28px] whitespace-pre-line text-black" style={{ fontStyle: 'normal', lineHeight: 'normal', opacity: 1, transform: 'none' }}>{t('safety.subtitleMobile')}</div>
                                <div className="hidden md:block text-[32px] font-medium tracking-[-0.32px] whitespace-pre-line text-black" style={{ fontStyle: 'normal', lineHeight: 'normal', opacity: 1, transform: 'none' }}>{t('safety.subtitleDesktop')}</div>
                                <p className="whitespace-pre-line mt-[30px]" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>{t('safety.description')}</p>
                            </div>
                            <div className="relative pb-[60px] md:pb-[100px]">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl-custom:flex xl-custom:flex-wrap xl-custom:justify-center gap-[34px] justify-items-center" style={{ position: 'relative', zIndex: 50 }}>
                                    <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                        <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                            <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                <Image src="/assets/asset-9-1.webp" alt="사전 진단 시스템" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                            </div>
                                            <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('safety.items.checkup.title')}</h3>
                                                <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">{t('safety.items.checkup.description')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                        <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                            <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                <Image src="/assets/asset-10.webp" alt="실시간 모니터링" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                            </div>
                                            <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('safety.items.monitoring.title')}</h3>
                                                <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">{t('safety.items.monitoring.description')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                        <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                            <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                <Image src="/assets/asset-11.webp" alt="약물 조합 차별화" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                            </div>
                                            <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('safety.items.medication.title')}</h3>
                                                <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">{t('safety.items.medication.description')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                                        <div className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] xl-custom:w-[300px] min-h-[500px]" style={{ borderRadius: '0px' }}>
                                            <div className="relative flex-shrink-0 w-full h-[250px] bg-gray-100 overflow-hidden" style={{ borderRadius: '0px' }}>
                                                <Image src="/assets/asset-12.webp" alt="전원 심폐소생술" fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                                            </div>
                                            <div className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] bg-white w-full h-[250px]">
                                                <h3 className="mb-[12px] text-left" style={{ color: 'rgb(38, 38, 38)', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('safety.items.cpr.title')}</h3>
                                                <p className="text-[18px] font-normal text-[#262626] leading-normal tracking-[-0.18px] flex-grow overflow-y-auto text-left mb-12 md:mb-0 whitespace-pre-line">{t('safety.items.cpr.description')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-left pl-0 md:pl-0 lg:pl-[80px] pr-[30px] xl-custom:pr-0 pb-0 md:pb-20 xl-custom:pb-0 w-full whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.60)', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.14px' }}>{t('safety.footer')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Expert Collaboration Section */}
                    <section className="w-full" style={{ backgroundColor: '#F7F8F8' }}>
                        <div className="mx-auto w-full px-[30px] md:px-[80px] lg:px-[80px] max-w-[1472px]">
                            <div className="pt-[60px] md:pt-[70px] pb-0">
                                <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[60px]">
                                    <div className="flex-1 flex flex-col self-start">
                                        <div style={{ opacity: 1, transform: 'none' }}>
                                            <h2 style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', marginBottom: '12px' }}>{t('collaboration.title')}</h2>
                                        </div>
                                        <p className="whitespace-pre-line mb-[24px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>{t('collaboration.subtitle')}</p>
                                        <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>
                                            <span className="md:hidden">{t('collaboration.descriptionMobile')}</span>
                                            <span className="hidden md:inline">{t('collaboration.descriptionDesktop')}</span>
                                        </p>
                                    </div>
                                    <div className="flex-1 relative w-full aspect-[4/3] self-end flex items-end" style={{ opacity: 1, transform: 'none' }}>
                                        <Image alt="블랑쉬치과 의료진" loading="lazy" fill className="object-contain object-bottom" sizes="(max-width: 1024px) 100vw, 50vw" src="/assets/asset-13.webp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7.5: Recommended Treatments Section */}
                    <section className="w-full bg-white">
                        <div className="relative w-full mx-auto" style={{ maxWidth: '1472px' }}>
                            <div className="w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[60px] md:pb-[90px] bg-white">
                                <h2 className="pb-[15px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>{t('treatments.title')}</h2>
                                <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>{t('treatments.subtitle')}</p>
                            </div>
                            <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="flex flex-col pt-0 md:pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('treatments.items.implant.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('treatments.items.implant.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('treatments.items.laminate.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('treatments.items.laminate.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('treatments.items.wisdom.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('treatments.items.wisdom.description')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pt-[40px] pb-0 md:pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]">
                                        <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                                            <h3 className="mb-4" style={{ color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.2px' }}>{t('treatments.items.decay.title')}</h3>
                                            <p className="whitespace-pre-line" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.16px' }}>{t('treatments.items.decay.description')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7.6: Sleep Treatment Process Section */}
                    <section className="w-full" style={{ backgroundColor: '#F7F8F8' }}>
                        <div className="mx-auto w-full max-w-[1472px] px-[30px] md:px-[80px] lg:px-[80px]">
                            <div className="relative w-full">
                                <div className="absolute top-0 left-0 z-10 flex flex-col pt-[60px] md:pt-[67px]">
                                    <div className="relative inline-block pb-1 mb-[8px]" style={{ opacity: 1, transform: 'none' }}>
                                        <h2 className="text-[18px] font-normal text-[#000] font-['Pretendard'] leading-[30px] tracking-[-0.18px] relative z-10">{t('process.title')}</h2>
                                    </div>
                                    <p className="whitespace-pre-line mb-[50px]" style={{ color: 'rgb(0, 0, 0)', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>{t('process.subtitle')}</p>                                </div>
                                <div className="w-full pt-[340px] pb-[60px] md:pb-[100px]">
                                    <div className="flex flex-col gap-0 md:gap-0 lg:gap-[154px]">
                                        {/* Row 1: Steps 01-04 */}
                                        <div className="flex flex-col lg:flex-row gap-4">
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">01</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step1.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step1.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">02</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step2.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step2.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">03</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step3.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step3.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">04</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step4.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step4.description')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Row 2: Steps 05-08 */}
                                        <div className="flex flex-col lg:flex-row gap-4">
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">05</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step5.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step5.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">06</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step6.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step6.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">07</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step7.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step7.description')}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0" style={{ opacity: 1, transform: 'none' }}>
                                                <div className="flex flex-col">
                                                    <div className="w-full h-[1px] bg-black mb-4 md:mb-6"></div>
                                                    <div className="flex items-center mb-4 md:mb-6">
                                                        <span className="prata-regular text-[40px] font-normal text-[#000] leading-normal tracking-[-0.4px] mr-4">08</span>
                                                    </div>
                                                    <h3 className="text-[20px] font-medium text-[#000] font-['Pretendard'] leading-normal tracking-[-0.2px] mb-4 md:mb-6">{t('process.items.step8.title')}</h3>
                                                    <p className="text-[18px] font-normal text-[#262626] font-['Pretendard'] leading-normal tracking-[-0.18px] whitespace-pre-line">{t('process.items.step8.description')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 7.8: FAQ Section */}
                    <SleepFAQSection />

                    {/* Section 8: CTA Section */}
                    <SleepCTASection />

                    <Footer breadcrumbs={[
                        { label: tc('home'), href: '/' },
                        { label: tnav('special').replace('\n', ' '), href: '/special' },
                        { label: tnav('specialMenu.sleep'), href: '/special/sleep' }
                    ]} />
                </div>
            </div>
        </>
    );
}
