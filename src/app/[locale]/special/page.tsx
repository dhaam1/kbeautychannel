import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getServiceProviderSchema, getServiceItemListSchema, getBreadcrumbSchema } from '@/constants/schema';
import { Toaster } from 'react-hot-toast';
import {
  SolutionHeroSection,
  SolutionCardSection,
  SolutionGridSection1,
  SolutionGridSection2,
  SolutionBannerSection,
  SolutionIntroductionSection,
  SolutionCTASection,
} from '@/components/sections/solution';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  // 한국어 메타데이터
  if (locale === 'kr') {
    const title = '진료 서비스 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
    const description = '6인 전문의 협진으로 임플란트부터 무삭제 라미네이트 등 모든 치과 진료를 수준 높게 진행합니다. 블랑쉬 치과 서비스를 확인하세요.'; const ogImageUrl = `${siteUrl}/assets/og/special_og.webp`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        languages: {
          'ko': `${siteUrl}/special`,
          'ja': `${siteUrl}/jp/service`,
          'x-default': `${siteUrl}/special`
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
      const title = 'Treatments | Blanche Dental Clinic';
      const description = "Every dental need, perfected by Blanche's signature mastery.";
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
  const title = '診療メニュー | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
  const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。'; const ogImageUrl = `${siteUrl}/assets/og/special_og.webp`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': `${siteUrl}/special`,
        'ja': `${siteUrl}/jp/service`,
        'x-default': `${siteUrl}/special`
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

/**
 * 솔루션 페이지 컴포넌트
 * 
 * @description
 * 블랑쉬 치과 솔루션 소개 페이지입니다
 * 레이아웃 구조:
 * 1. Header: 상단 고정 네비게이션 바
 * 2. SolutionHeroSection: 스티키(sticky)로 고정되는 히어로 영역 (300svh 높이)
 * 3. Content Sections: z-index 30으로 Hero 위를 덮으며 올라오는 콘텐츠 섹션들
 *    - -mt-[200svh] 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
 * 
 * @returns {Promise<JSX.Element>} Next.js 서버 컴포넌트로 렌더링되는 페이지
 */
export default async function SolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isJp = locale === 'jp';
  const t = await getTranslations({ locale, namespace: 'solution' });
  const tnav = await getTranslations({ locale, namespace: 'nav' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const siteUrl = getSiteUrl();

  let jsonLd;

  if (locale === 'kr') {
    jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Dentist",
        "name": "블랑쉬치과 진료 서비스",
        "description": "6인 전문의 협진으로 임플란트부터 무삭제 라미네이트 등 모든 치과 진료를 수준 높게 진행합니다. 블랑쉬 치과 서비스를 확인하세요.",
        "provider": getServiceProviderSchema('kr'),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "진료 카테고리",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "시그니처 솔루션",
              "itemListElement": [
                { "@type": "Service", "name": "정밀 임플란트" },
                { "@type": "Service", "name": "블랑쉬 무삭제 라미네이트" },
                { "@type": "Service", "name": "인비절라인 치아교정" },
                { "@type": "Service", "name": "치아미백" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "심미 보완 시술",
              "itemListElement": [
                { "@type": "Service", "name": "거미스마일 보톡스" },
                { "@type": "Service", "name": "구강전정술" },
                { "@type": "Service", "name": "입술 필러" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "치과 진료",
              "itemListElement": [
                { "@type": "Service", "name": "구강 검진" },
                { "@type": "Service", "name": "스케일링" },
                { "@type": "Service", "name": "충치 및 염증 치료" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "수면 치료 솔루션",
              "itemListElement": [
                { "@type": "Service", "name": "수면 임플란트" },
                { "@type": "Service", "name": "수면 사랑니 발치" },
                { "@type": "Service", "name": "수면 신경치료" }
              ]
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        ...getBreadcrumbSchema(`${siteUrl}/special`, [
          { name: "홈", item: siteUrl },
          { name: "진료 서비스", item: `${siteUrl}/special` },
        ]),
      }
    ];
  } else if (locale === 'jp') {
    jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Dentist",
        "name": "ブランシュ歯科 診療サービス",
        "description": "ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。",
        "provider": getServiceProviderSchema('jp'),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "診療カテゴリー",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "シグネチャーソリューション",
              "itemListElement": [
                { "@type": "Service", "name": "インプラント" },
                { "@type": "Service", "name": "ブランシュ・ラミネート" },
                { "@type": "Service", "name": "インビザライン歯列矯正" },
                { "@type": "Service", "name": "歯のホワイトニング" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "審美補完施術",
              "itemListElement": [
                { "@type": "Service", "name": "ガミースマイルボトックス" },
                { "@type": "Service", "name": "口腔前庭形成術" },
                { "@type": "Service", "name": "リップフィラー" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "歯科診療",
              "itemListElement": [
                { "@type": "Service", "name": "口腔検診" },
                { "@type": "Service", "name": "スケーリング" },
                { "@type": "Service", "name": "虫歯＆炎症治療" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "睡眠治療ソリューション",
              "itemListElement": [
                { "@type": "Service", "name": "睡眠インプラント" },
                { "@type": "Service", "name": "睡眠親知らず抜歯" },
                { "@type": "Service", "name": "睡眠神経治療" }
              ]
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        ...getBreadcrumbSchema(`${siteUrl}/jp/service`, [
          { name: "ホーム", item: `${siteUrl}/jp` },
          { name: "診療サービス", item: `${siteUrl}/jp/service` },
        ]),
      }
    ];
  } else {
    // Default (English)
    jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Dentist",
        "name": "Blanche Dental Clinic Services",
        "description": "We perform all dental treatments at a high level, from implants to non-prep veneers, with the collaboration of 6 specialists. Check out Blanche Dental Service.",
        "provider": getServiceProviderSchema('en'),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Treatment Categories",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Signature Solution",
              "itemListElement": [
                { "@type": "Service", "name": "Precision Implant" },
                { "@type": "Service", "name": "Blanche No-Cut Laminate" },
                { "@type": "Service", "name": "Invisalign Orthodontics" },
                { "@type": "Service", "name": "Teeth Whitening" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Aesthetic Supplement Procedures",
              "itemListElement": [
                { "@type": "Service", "name": "Gummy Smile Botox" },
                { "@type": "Service", "name": "Vestibuloplasty" },
                { "@type": "Service", "name": "Lip Filler" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Dental Treatment",
              "itemListElement": [
                { "@type": "Service", "name": "Oral Examination" },
                { "@type": "Service", "name": "Scaling" },
                { "@type": "Service", "name": "Caries & Inflammation Treatment" }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Sleep Treatment Solution",
              "itemListElement": [
                { "@type": "Service", "name": "Sleep Implant" },
                { "@type": "Service", "name": "Sleep Wisdom Tooth Extraction" },
                { "@type": "Service", "name": "Sleep Root Canal" }
              ]
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        ...getBreadcrumbSchema(`${siteUrl}/en/special`, [
          { name: "Home", item: `${siteUrl}/en` },
          { name: "Services", item: `${siteUrl}/en/special` },
        ]),
      }
    ];
  }

  if (Array.isArray(jsonLd)) {
    (jsonLd as any[]).push({
      "@context": "https://schema.org",
      ...getServiceItemListSchema(),
    });
  }

  return (
    <>
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />
      <Toaster position="top-center" />

      <div className="relative w-full" style={{ overflowX: 'clip' }}>
        {/* Section 1: Hero */}
        <SolutionHeroSection />

        {/* 
          콘텐츠 섹션들 (Parallax Cover 효과)
          - z-index 30으로 Hero(z-0~20) 위를 덮음
          - -mt-[200svh] 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
        */}
        <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
          {/* Section 2: Card Section */}
          <SolutionCardSection />

          {/* Section 3: Grid Section 1 */}
          <SolutionGridSection1 />

          {/* Section 4: Grid Section 2 */}
          <SolutionGridSection2 />

          {/* Section 5: Banner Section */}
          <SolutionBannerSection />

          {/* Section 6: Introduction Section */}
          <SolutionIntroductionSection />

          {/* Section 7: CTA Section */}
          <SolutionCTASection />

          <Footer breadcrumbs={[
            { label: tc('home'), href: '/' },
            { label: tnav('special').replace('\n', ' '), href: '/special' }
          ]} />
        </div>
      </div>
    </>
  );
}
