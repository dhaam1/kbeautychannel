import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getBreadcrumbSchema } from '@/constants/schema';
import {
    OrthodonticsHeroSection,
    OrthodonticsWhatSection,
    OrthodonticsProcessSection,
    OrthodonticsSpecialistSection,
    OrthodonticsEquipmentSection,
    OrthodonticsLocationSection,
    OrthodonticsBeforeAfterSection,
    OrthodonticsRecommendationSection,
    OrthodonticsTechnologySection,
    OrthodonticsBannerSection,
    OrthodonticsCustomerSection,
    OrthodonticsExpertiseSection,
    OrthodonticsFAQSection,
    OrthodonticsCTASection,
    OrthodonticsHeroSection_JP,
    OrthodonticsWhatSection_JP,
    OrthodonticsProcessSection_JP,
    OrthodonticsEquipmentSection_JP,
    OrthodonticsLocationSection_JP,
    OrthodonticsBeforeAfterSection_JP,
    OrthodonticsRecommendationSection_JP,
    OrthodonticsTechnologySection_JP,
    OrthodonticsExpertiseSection_JP,
    OrthodonticsCustomerSection_JP,
    OrthodonticsFAQSection_JP,
    OrthodonticsCTASection_JP,
} from '@/components/sections/orthodontics';

// Next.js 15+에서는 params가 Promise입니다.
type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const siteUrl = getSiteUrl();

    // 한국어 메타데이터
    if (locale === 'kr') {
        const title = '치아교정 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
        const description = '20년 경력 교정 전문의 직접 진료! 인비절라인, 클리피씨로 통증 걱정 없는 맞춤 교정. 1만 건의 임상 경험을 보유한 블랑쉬치과의 치아교정입니다.'; const ogImageUrl = `${siteUrl}/assets/og/gyojung_og.webp`;

        return {
            metadataBase: new URL(siteUrl),
            title,
            description,
            alternates: {
                languages: {
                    'ko': `${siteUrl}/special/orthodontics`,
                    'ja': `${siteUrl}/jp/service/orthodontics`,
                    'x-default': `${siteUrl}/special/orthodontics`
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
        const title = 'Orthodontics | Blanche Dental Clinic';
        const description = 'Customized orthodontics tailored to your condition.';
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
    const title = 'インビザライン矯正 | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
    const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。'; const ogImageUrl = `${siteUrl}/assets/og/gyojung_og.webp`;

    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: {
            languages: {
                'ko': `${siteUrl}/special/orthodontics`,
                'ja': `${siteUrl}/jp/service/orthodontics`,
                'x-default': `${siteUrl}/special/orthodontics`
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

export default async function OrthodonticsPage({ params }: Props) {
    const { locale } = await params;
    const isJp = locale === 'jp';
    const isEn = locale === 'en';

    // next-intl 메시지 가져오기
    // setRequestLocale(locale); // 정적 렌더링 최적화를 위해 필요할 수 있음

    const t = await getTranslations({ locale, namespace: 'solution.orthodontics' });
    const tc = await getTranslations({ locale, namespace: 'common' });
    const tnav = await getTranslations({ locale, namespace: 'nav' });
    const siteUrl = getSiteUrl();
    const currentUrl = `${siteUrl}${isJp ? '/jp' : ''}/special/orthodontics`;

    // SEO Schema.org JSON-LD
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        ...getBreadcrumbSchema(currentUrl, [
            { name: tc('home'), item: `${siteUrl}${isJp ? '/jp' : ''}` },
            { name: tnav('special'), item: `${siteUrl}${isJp ? '/jp' : ''}/special` },
            { name: tnav('specialMenu.orthodontics'), item: currentUrl },
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
    const getFaqList = () => {
        if (isEn) {
            return [
                {
                    question: "Does orthodontic treatment hurt?",
                    answer: "Do not worry about the pain of poking wires. You may feel a tight sensation for about 2-3 days immediately after replacing the aligners, but this is a positive sign that your teeth are moving well to their planned positions. Blanche uses self-ligating brackets with reduced friction to carefully manage the discomfort patients may feel."
                },
                {
                    question: "Which is right for me, laminates or orthodontics?",
                    answer: "If the tooth itself is chipped or discolored and you want to change its shape, 'Blanche (Laminate)' is effective. If you want to correct crooked or uneven positioning, 'Invisalign (Orthodontics)' is the answer. As we provide both solutions, we objectively propose the best answer that provides the greatest benefit to the patient."
                },
                {
                    question: "How long should I wear the aligners each day?",
                    answer: "Teeth continuously try to return to their original places. You must wear them at all times including while sleeping, except during meals and brushing, for cell-level movement to proceed seamlessly according to plan. The longer you leave the aligners out, the longer the retention period may become."
                },
                {
                    question: "Will it affect my speech or daily life?",
                    answer: "When first wearing them, 's' sounds might feel slightly awkward, but after a 2-3 day adaptation period, your tongue gets used to the device and pronunciation becomes natural. In fact, announcers and flight attendants, whose clear delivery is vital, wear the devices while working without any disruption to their daily lives."
                },
                {
                    question: "How long will the treatment take?",
                    answer: "While it depends on your dental condition, partial orthodontics correcting only front teeth takes about 3-6 months. Full orthodontics takes on average 1.5 to 2 years, but Blanche Dental Clinic uses '2nd Gen Clippy-C' devices with reduced friction, shortening the duration by 2-6 months compared to conventional treatment."
                },
                {
                    question: "Why is there a cost difference between clinics?",
                    answer: "Orthodontics isn't simply straightening teeth; it's a highly advanced treatment balancing the TMJ and the entire face. At Blanche, a specialist with 20 years of experience and over 10,000 clinical cases personally oversees your treatment, using iTero 3D scanners and 100% genuine appliances. Getting it done perfectly the first time is the most economical approach."
                }
            ];
        } else if (isJp) {
            return [
                {
                    question: "矯正治療は痛いですか？",
                    answer: "ワイヤーによる刺さるような痛みはありませんので、ご安心ください。装置を新しく交換した直後は、2～3日間ほど歯がしっかり固定されている感覚を覚える場合がありますが、これは歯が計画通りに移動している良い兆候です。ブランシュ歯科では、摩擦力を低減した自己結紮装置を採用し、患者さまの不快感を最小限に抑えながら、精密な矯正治療を行います。"
                },
                {
                    question: "ラミネートと矯正、どちらが私に合っていますか？",
                    answer: "歯自体の欠けや変色があり、形を整えたい場合は、「ブランシュ(ラミネート)」が効果的です。歪んだ歯の位置を矯正したい場合は、「インビザライン(矯正)」が適しています。当院では両方のソリューションを備えており、一方に偏ることなく、患者さまに最も利益となる最善の治療プランをご提案します。"
                },
                {
                    question: "装置は1日どれくらい装着すればいいですか？",
                    answer: "歯は常に元の位置に戻ろうとする性質があります。食事や歯磨きの時間を除き、就寝時も含めて装置を常に装着することで、細胞レベルでの歯の移動が途切れず、計画通りに治療を進めることができます。装置を外す時間が長くなるほど、矯正期間が延びる可能性がありますのでご注意ください。"
                },
                {
                    question: "発音が不自然になり、日常生活に影響は出ませんか？",
                    answer: "装着初期は、「さ行」「タ行」の発音が少し不自然に感じられる場合がありますが、2〜3日程度で舌が装置に慣れ、自然に発音できるようになります。実際に、アナウンサーや客室乗務員など、発音が重要な職業の方も装置をつけたまま勤務できるほど、日常生活に支障はありません。"
                },
                {
                    question: "矯正期間はどれくらいかかりますか？",
                    answer: "歯の状態によって異なりますが、前歯だけを整える部分矯正は3〜6ヶ月で完了することが多く、全体矯正は平均1年6ヶ月〜2年程度かかります。ブランシュ歯科では、歯の移動を妨げる摩擦力を低減した「第2世代クリッピーC」装置を使用し、一般的な矯正治療より2〜6ヶ月短縮して効率的に治療を行います。"
                },
                {
                    question: "病院によって費用に差が出るのはなぜですか？",
                    answer: "矯正治療は単に歯を並べるだけではなく、顎関節や顔全体のバランスを整える高度な医療行為です。ブランシュ歯科では、10,000件以上の臨床症例を持つ20年の経験豊富な専門医が直接診療。さらに、アイテロ(iTero) 3Dスキャナーと100％正規品の装置のみを使用し、精密で安全な矯正を実現します。一度で確実に治療を完了させることが、最も経済的で効果的な矯正です。"
                }
            ];
        } else {
            return [
                {
                    question: "교정 치료, 많이 아픈가요?",
                    answer: "철사에 찔리는 통증은 걱정하지 마세요. 장치를 새로 교체한 직후 2~3일 정도 치아를 꽉 잡아주는 느낌이 들 수 있는데, 이는 치아가 계획된 위치로 잘 이동하고 있다는 긍정적인 신호입니다. 블랑쉬는 마찰력을 줄인 자가결찰 장치를 사용하여 환자분이 느끼는 불편함을 세심하게 관리합니다."
                },
                {
                    question: "라미네이트와 교정 중 저에게 맞는 건 무엇인가요?",
                    answer: "치아 자체가 깨지거나 변색되어 형태를 바꾸고 싶다면 '블랑쉬(라미네이트)'가 효과적이고, 삐뚤빼뚤한 위치를 바로잡고 싶으면 '인비절라인(교정)'이 정답입니다. 저희는 두 가지 솔루션을 모두 보유하고 있기에, 한쪽으로 치우치지 않고 환자분께 가장 이득이 되는 최선의 답을 제안해 드립니다."
                },
                {
                    question: "장치는 하루에 얼마나 끼고 있어야 하나요?",
                    answer: "치아는 끊임없이 원래 자리로 되돌아가려 합니다. 식사와 양치 시간을 제외한 잠잘 때를 포함해 항상 착용하셔야 세포 단위의 이동이 멈추지 않고 계획대로 진행됩니다. 장치를 빼놓는 시간이 길어질수록 고정 기간도 그만큼 늘어날 수 있습니다."
                },
                {
                    question: "발음이 새서 일상생활이 불편하진 않을까요?",
                    answer: "처음 착용 시 'ㅅ', 'ㅆ' 발음이 약간 어색할 수 있지만, 2~3일의 적응기만 지나면 혀가 장치에 익숙해져 자연스러워집니다. 실제로 정확한 전달력이 생명인 아나운서나 승무원분들도 장치를 착용한 채 근무할 만큼 일상생활에 지장이 없습니다."
                },
                {
                    question: "교정 기간은 얼마나 걸릴까요?",
                    answer: "치아 상태에 따라 다르지만, 앞니만 바로잡는 부분 교정은 3~6개월이면 충분합니다. 전체 교정은 평균 1년 6개월에서 2년 정도 소요되는데, 블랑쉬치과는 치아 이동을 방해하는 마찰력을 줄인 '2세대 클리피씨' 장치를 사용하여 일반 교정보다 기간을 2~6개월 더 단축해 드립니다."
                },
                {
                    question: "병원마다 비용 차이가 나는 이유가 궁금해요.",
                    answer: "교정은 단순히 치아를 펴는 것이 아니라 턱관절과 얼굴 전체의 균형을 맞추는 고난도 치료입니다. 블랑쉬치과는 10,000명 이상의 임상 케이스를 경험한 20년 경력의 전문의가 직접 진료하며, 아이테로(iTero) 3D 스캐너와 100% 정품 장치만을 사용합니다. 단 한 번에 제대로 끝내는 것이 가장 경제적인 교정입니다."
                }
            ];
        }
    };
    
    const faqList = getFaqList();

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

    const getItemListSchema = () => {
        let name = "블랑쉬치과 치아교정";
        let items = [
            { name: "치아교정 후기", url: `${siteUrl}/review` },
            { name: "인비절라인 치아교정", url: `${siteUrl}/blog/orthodontic/인비절라인-후기` },
            { name: "프리올소 어린이교정", url: `${siteUrl}/blog/orthodontic/프리올소-교정` },
            { name: "프랑켈 어린이교정", url: `${siteUrl}/blog/orthodontic/어린이-치아교정-프랑켈` },
            { name: "의료진 소개", url: `${siteUrl}/intro` },
            { name: "치아교정 의료 정보", url: `${siteUrl}/blog/orthodontic` }
        ];

        if (isEn) {
            name = "Blanche Dental Clinic Orthodontics";
            items = [
                { name: "Orthodontics Reviews", url: `${siteUrl}/review` },
                { name: "Invisalign Orthodontics", url: `${siteUrl}/blog/orthodontic/인비절라인-후기` },
                { name: "PreOrtho Pediatric Orthodontics", url: `${siteUrl}/blog/orthodontic/프리올소-교정` },
                { name: "Frankel Pediatric Orthodontics", url: `${siteUrl}/blog/orthodontic/어린이-치아교정-프랑켈` },
                { name: "Medical Team", url: `${siteUrl}/intro` },
                { name: "Orthodontics Medical Information", url: `${siteUrl}/blog/orthodontic` }
            ];
        } else if (isJp) {
            name = "ブランシュ歯科 矯正";
            items = [
                { name: "矯正 レビュー", url: `${siteUrl}/jp/review` },
                { name: "インビザライン矯正", url: `${siteUrl}/jp/blog/orthodontic/인비절라인-후기` },
                { name: "プレオルソ小児矯正", url: `${siteUrl}/jp/blog/orthodontic/프리올소-교정` },
                { name: "フランケル小児矯正", url: `${siteUrl}/jp/blog/orthodontic/어린이-치아교정-프랑켈` },
                { name: "医療陣紹介", url: `${siteUrl}/jp/intro` },
                { name: "矯正 医療情報", url: `${siteUrl}/jp/blog/orthodontic` }
            ];
        }

        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": name,
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "WebPage",
                    "name": item.name,
                    "image": `${siteUrl}/img/orth${index + 1}.webp`,
                    "url": item.url
                }
            }))
        };
    };

    const itemListSchema = getItemListSchema();

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
            <ClientOnlyComponents />
            <div className="relative">
                {/* Section 1: Hero */}
                {isJp ? <OrthodonticsHeroSection_JP /> : <OrthodonticsHeroSection />}

                {/* Content Sections with Parallax Effect */}
                <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
                    {/* What Section */}
                    {isJp ? <OrthodonticsWhatSection_JP /> : <OrthodonticsWhatSection />}

                    {/* Process Section */}
                    {isJp ? <OrthodonticsProcessSection_JP /> : <OrthodonticsProcessSection />}

                    {/* Equipment Section (Specialist Info) */}
                    {isJp ? <OrthodonticsEquipmentSection_JP /> : <OrthodonticsEquipmentSection />}

                    {/* Location Section */}
                    {isJp ? <OrthodonticsLocationSection_JP /> : <OrthodonticsLocationSection />}

                    {/* BeforeAfter Section */}
                    {isJp ? <OrthodonticsBeforeAfterSection_JP /> : <OrthodonticsBeforeAfterSection />}

                    {/* Recommendation Section */}
                    {isJp ? <OrthodonticsRecommendationSection_JP /> : <OrthodonticsRecommendationSection />}

                    {/* Technology Section */}
                    {isJp ? <OrthodonticsTechnologySection_JP /> : <OrthodonticsTechnologySection />}

                    {/* Expertise Section */}
                    {isJp ? <OrthodonticsExpertiseSection_JP /> : <OrthodonticsExpertiseSection />}

                    {/* Customer Section */}
                    {isJp ? <OrthodonticsCustomerSection_JP /> : <OrthodonticsCustomerSection />}

                    {/* FAQ Section */}
                    {isJp ? <OrthodonticsFAQSection_JP /> : <OrthodonticsFAQSection />}

                    {/* CTA Section */}
                    {isJp ? <OrthodonticsCTASection_JP /> : <OrthodonticsCTASection />}

                    <Footer breadcrumbs={[
                        { label: tc('home'), href: '/' },
                        { label: tnav('special').replace('\n', ' '), href: '/special' },
                        { label: tnav('specialMenu.orthodontics'), href: '/special/orthodontics' }
                    ]} />
                </div>
            </div>
        </>
    );
}
