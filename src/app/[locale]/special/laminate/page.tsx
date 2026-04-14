import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ASSETS } from '@/constants/assets';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getBreadcrumbSchema } from '@/constants/schema';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import {
  LaminateHeroSection,
  LaminateWhatSection,
  LaminateHighlightSection,
  LaminateProcessSection,
  LaminateRecommendationSection,
  LaminateHighlight2Section,
  LaminateStrengthSection,
  LaminateDoctorSection,
  LaminateProcedureProcessSection,
  LaminateBeforeAfterSection,
  LaminateFAQSection,
  LaminateCTASection,
} from '@/components/sections/laminate';

/**
 * 라미네이트 페이지 메타데이터
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  // 한국어 메타데이터
  if (locale === 'kr') {
    const title = '블랑쉬 무삭제 라미네이트 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
    const description = '서울 강남 논현역 무삭제 라미네이트 전문 치과. 블랙 트라이앵글, 왜소치, 토끼이빨, 누런 치아 고민은 블랑쉬에서 해결하세요. 시림 없는 무삭제, 최소 삭제, 원데이 라미네이트로 건강하고 오래 쓰는 치아를 만들어 드립니다.'; const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        languages: {
          'ko': `${siteUrl}/special/laminate`,
          'ja': `${siteUrl}/jp/service/laminate`,
          'x-default': `${siteUrl}/special/laminate`
        }
      },
      openGraph: {
        title,
        description, siteName: '블랑쉬치과 의원',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'ko_KR',
        type: 'website',
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
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }

  // English Metadata
  if (locale === 'en') {
      const title = 'No-prep Laminate | Blanche Dental Clinic';
      const description = 'Perfect your smile without damaging your natural teeth.';
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
  const title = 'ブランシュ・ラミネート | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
  const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。';
  const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': `${siteUrl}/special/laminate`,
        'ja': `${siteUrl}/jp/service/laminate`,
        'x-default': `${siteUrl}/special/laminate`
      }
    },
    openGraph: {
      title,
      description, siteName: 'ブランシュ歯科医院',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * 라미네이트 페이지 컴포넌트
 * 
 * @description
 * 블랑쉬 라미네이트 솔루션 상세 페이지입니다
 * 레이아웃 구조:
 * 1. Header: 상단 고정 네비게이션 바
 * 2. LaminateHeroSection: 스티키(sticky)로 고정되는 히어로 영역 (300svh 모바일, 340svh 데스크톱)
 *    - 스크롤 시 카드가 왼쪽에서 슬라이드되어 나타남
 * 3. Content Sections: z-index 30으로 Hero 위를 덮으며 올라오는 콘텐츠 섹션들
 *    - 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
 *    - 모바일: -mt-[200svh] (300svh - 100svh), 데스크톱: -mt-[240svh] (340svh - 100svh)
 * 
 * @returns {Promise<JSX.Element>} Next.js 서버 컴포넌트로 렌더링되는 페이지
 */
export default async function LaminatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isJp = locale === 'jp';
  const t = await getTranslations('solution.laminate');
  const tc = await getTranslations('common');
  const tnav = await getTranslations('nav');
  const siteUrl = getSiteUrl();
  const currentUrl = `${siteUrl}${isJp ? '/jp' : ''}/special/laminate`;

  // SEO Schema.org JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema(currentUrl, [
      { name: tc('home'), item: `${siteUrl}${isJp ? '/jp' : ''}` },
      { name: tnav('special').replace('\n', ' '), item: `${siteUrl}${isJp ? '/jp' : ''}/special` },
      { name: tnav('specialMenu.laminate'), item: currentUrl },
    ]),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": tnav('specialMenu.laminate'),
    "provider": getServiceProviderSchema(locale),
    "description": t('description')
  };

  // FAQ Schema Extraction
  const faqList = isJp ? [
    {
      question: "ブランシュと一般的なラミネートはどう違いますか？",
      answer: "ブランシュは単に歯を覆う補綴物ではなく、あなただけの美しさを引き出すオーダーメイド・デザインです。ブランシュは専門のセラミストが、カウンセリングから製作、最終的な装着まで全過程を直接担当します。"
    },
    {
      question: "薄いと割れやすくないですか？ どのくらい持ちますか？",
      answer: "ブランシュ・ラミネートは薄いですが、高強度のセラミック素材を使用しているため耐久性に優れています。適切なケアと定期的な検診により10年以上使用可能で、日常的な食事には全く問題ありません。"
    },
    {
      question: "施術後に歯茎が腫れたり、臭いがしたりしませんか？",
      answer: "ブランシュ・ラミネートは無削除または最小限の削合で行われるため、歯茎への刺激が最小限に抑えられます。また、精密なオーダーメイド製作により歯茎との接触面が最適化されるため、副作用はほとんどありません。"
    },
    {
      question: "他院で行ったラミネートをブランシュに変えることはできますか？",
      answer: "はい、可能です。既存のラミネートを除去した後、ブランシュ・ラミネートに交換できます。まずはカウンセリングで現在の状態を確認し、最適な交換プランをご提案します。"
    },
    {
      question: "施術後のケアはどうすればいいですか？",
      answer: "一般的なブラッシングとデンタルフロスの使用で十分です. ただし、極端に硬い食べ物や氷などを噛むことは避け、定期的な検診を受けることをお勧めします。"
    },
    {
      question: "製作期間はどのくらいかかりますか？",
      answer: "ブランシュ・ラミネートは精密なオーダーメイド製作のため、約2〜3週間ほどかかります. 施術前のカウンセリングと設計を含めると、合計3〜4週間程度の期間が必要です。"
    }
  ] : [
    {
      question: "블랑쉬와 일반 라미네이트는 어떻게 다른가요?",
      answer: "블랑쉬는 단순히 치아를 가리는 보철물이 아니라, 당신만의 아름다움을 끌어내는 맞춤 디자인입니다. 블랑쉬는 전문 세라미스트가 상담부터 제작, 최종 부착까지 전 과정을 직접 진행합니다."
    },
    {
      question: "얇으면 쉽게 깨지지 않나요? 얼마나 오래 쓸 수 있나요?",
      answer: "블랑쉬 라미네이트는 얇지만 고강도 세라믹 소재를 사용하여 내구성이 뛰어납니다. 적절한 관리와 정기적인 검진을 통해 10년 이상 사용할 수 있으며, 일상적인 음식 섭취에는 문제가 없습니다."
    },
    {
      question: "시술 후 잇몸이 붓거나 냄새가 나지 않나요?",
      answer: "블랑쉬 라미네이트는 무삭제 또는 최소삭제 방식으로 진행되어 잇몸 자극이 최소화됩니다. 또한 정밀한 맞춤 제작으로 잇몸과의 접촉면이 최적화되어 부작용이 거의 없습니다."
    },
    {
      question: "다른 곳에서 한 라미네이트를 블랑쉬로 바꿀 수 있나요?",
      answer: "네, 가능합니다. 기존 라미네이트를 제거한 후 블랑쉬 라미네이트로 교체할 수 있습니다. 먼저 상담을 통해 현재 상태를 확인하고, 최적의 교체 방안을 제안해드립니다."
    },
    {
      question: "시술 후 관리는 어떻게 하나요?",
      answer: "일반적인 칫솔질과 치실 사용으로 충분합니다. 다만, 너무 딱딱한 음식이나 얼음 등을 씹는 것은 피해주시고, 정기적인 검진을 받으시는 것을 권장합니다."
    },
    {
      question: "제작 기간은 얼마나 걸리나요?",
      answer: "블랑쉬 라미네이트는 정밀한 맞춤 제작을 위해 약 2-3주 정도 소요됩니다. 시술 전 상담과 설계를 포함하면 총 3-4주 정도의 기간이 필요합니다."
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

  // ItemList Schema for 라미네이트 관련 페이지 목록
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isJp ? "ブランシュ歯科 ラミネート" : "블랑쉬치과 라미네이트",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "ラミネート レビュー" : "라미네이트 후기",
          "image": `${siteUrl}/img/laminate1.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/review`
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "睡眠 ラミネート" : "수면 라미네이트",
          "image": `${siteUrl}/img/laminate2.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/special/laminate`
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "ラミネート 価格" : "라미네이트 가격",
          "image": `${siteUrl}/img/laminate3.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/blog/laminate/치아-블랑쉬`
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "診療サービス" : "진료 서비스",
          "image": `${siteUrl}/img/laminate4.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/special`
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "医療陣紹介" : "의료진 소개",
          "image": `${siteUrl}/img/laminate5.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/intro`
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "WebPage",
          "name": isJp ? "ラミネート 医療コラム" : "라미네이트 의료 칼럼",
          "image": `${siteUrl}/img/laminate6.webp`,
          "url": `${siteUrl}${isJp ? '/jp' : ''}/blog/laminate`
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
        <LaminateHeroSection />

        {/* 
          콘텐츠 섹션들 (Parallax Cover 효과)
          - z-index 30으로 Hero(z-0~20) 위를 덮음
          - 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
          - 모바일: -mt-[200svh] (300svh - 100svh), 데스크톱: -mt-[240svh] (340svh - 100svh)
        */}
        <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <div style={{ backgroundColor: '#080B16' }}>
            <LaminateWhatSection />
            <LaminateHighlightSection />
          </div>
          <LaminateProcessSection />
          <LaminateRecommendationSection />
          <LaminateHighlight2Section />
          <LaminateStrengthSection />
          <LaminateDoctorSection />
          <LaminateProcedureProcessSection />
          <LaminateBeforeAfterSection />
          <LaminateFAQSection />
          <LaminateCTASection />
          <Footer breadcrumbs={[
            { label: tc('home'), href: '/' },
            { label: tnav('special'), href: '/special' },
            { label: tnav('specialMenu.laminate'), href: '/special/laminate' }
          ]} />
        </div>
      </div>
    </>
  );
}
