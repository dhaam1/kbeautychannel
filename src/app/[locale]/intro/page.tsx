import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import { getBreadcrumbSchema } from '@/constants/schema';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Toaster } from 'react-hot-toast';
import {
  AboutHeroSection,
  AboutDirectorSection,
  AboutStrengthSection,
  AboutDoctorsSection,
  AboutHistorySection,
  AboutTechSection,
  AboutEquipmentSection,
  AboutFacilitySection,
  AboutMapSection,
  AboutOtherCompanySection,
} from '@/components/sections/about';

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * 블랑쉬치과 소개 페이지 메타데이터
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  // 한국어 메타데이터
  if (locale === 'kr') {
    const title = '블랑쉬치과 소개 | 블랑쉬치과의원 - 강남치과, 논현역치과, 무삭제 라미네이트';
    const description = '논현역 블랑쉬치과에서 자연스러운 미소를 찾으세요! 라미네이트·임플란트 전문의 협진과 자체 기공소로 정밀함을 더합니다.'; const ogImageUrl = `${siteUrl}/assets/og/about_og.webp`;

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      alternates: {
        languages: {
          'ko': '/intro',
          'ja': '/jp/concept',
          'x-default': '/intro'
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
      const title = 'About Us | Blanche Dental Clinic';
      const description = 'Learn about Blanche Dental Clinic and our expert team.';
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
  const title = 'ブランシュ歯科の紹介 | [韓国江南] ブランシュ歯科 │ Blanche Dental Clinic | 日本語可能';
  const description = 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。';
  const ogImageUrl = `${siteUrl}/assets/og/about_og.webp`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': '/intro',
        'ja': '/jp/concept',
        'x-default': '/intro'
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
 * 블랑쉬치과 소개 페이지 컴포넌트
 */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.intro' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  
  const siteUrl = getSiteUrl();

  const currentUrl = `${siteUrl}/${locale}/intro`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema(currentUrl, [
      { name: '홈', item: siteUrl },
      { name: '블랑쉬치과 소개', item: currentUrl },
    ]),
  };

  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${siteUrl}#organization`,
    "name": "블랑쉬치과의원",
    "url": siteUrl,
    "image": `${siteUrl}/assets/about/about-19.webp`,
    "description": t('description'),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "서초구 강남대로 531, 7층",
      "addressLocality": "서울특별시",
      "postalCode": "06122",
      "addressCountry": "KR"
    },
    "telephone": "1877-2882",
    "employee": [
      {
        "@type": "Person",
        "name": "김태형",
        "jobTitle": "대표원장",
        "image": `${siteUrl}/assets/laminate/laminate-1.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "서울대학교 치과대학" },
          { "@type": "CollegeOrUniversity", "name": "서울대학교 치의학대학원 석사" }
        ],
        "award": "대한민국 100대 명의 (임플란트 부문) 선정",
        "description": "치아를 넘어 삶을 디자인합니다. 무절개 수면임플란트 수술센터장."
      },
      {
        "@type": "Person",
        "name": "한건희",
        "jobTitle": "통합치의학과 전문의 원장",
        "image": `${siteUrl}/assets/about/about-2.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "원광대학교 치과대학" },
        "award": "대한민국 100대 명의 '임플란트 부문' 선정",
        "memberOf": [
          { "@type": "Organization", "name": "대한치과보철학회" },
          { "@type": "Organization", "name": "대한통합치의학회" },
          { "@type": "Organization", "name": "대한구강악안면임플란트학회" }
        ],
        "description": "아프지 않게, 편안하게 웃고 가실 수 있도록 기본에 충실한 양심 진료를 약속합니다."
      },
      {
        "@type": "Person",
        "name": "박경리",
        "jobTitle": "통합치의학과 전문의 원장",
        "image": `${siteUrl}/assets/about/about-3.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "미국 Stanford 대학교" },
          { "@type": "CollegeOrUniversity", "name": "서울대학교 치과대학" }
        ],
        "description": "구강 전체의 균형을 생각하며, 안전한 진료를 약속합니다."
      },
      {
        "@type": "Person",
        "name": "백주희",
        "jobTitle": "교정과 전문의 원장",
        "image": `${siteUrl}/assets/about/about-4.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "경희대학교 치과대학 (수석졸업)" },
        "description": "수많은 교정 케이스를 통해 축적된 노하우로 섬세하고 편안하게 치료해드리겠습니다."
      },
      {
        "@type": "Person",
        "name": "김민주",
        "jobTitle": "원장",
        "image": `${siteUrl}/assets/about/about-5.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "부산대학교 치과대학 및 치의학전문대학원" },
        "description": "당신의 미소가 곧 블랑쉬의 명함이 되도록 최선의 진료로 보답하겠습니다."
      },
      {
        "@type": "Person",
        "name": "김하영",
        "jobTitle": "원장",
        "image": `${siteUrl}/assets/about/about-6.webp`,
        "hasOccupation": {
          "@type": "Occupation",
          "name": "치과의사",
          "occupationalCategory": "29-1029.00"
        },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "경희대학교 치과대학 (수석 장학생)" },
        "memberOf": [
          { "@type": "Organization", "name": "대한심미치과학회" },
          { "@type": "Organization", "name": "대한치과보존학회" },
          { "@type": "Organization", "name": "대한치과보철학회" }
        ],
        "description": "오랜 시간 쌓아온 정교함으로 환자분께 최적의 답을 찾아드립니다."
      }
    ]
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": { "@id": `${siteUrl}#organization` }
  };

  const isJp = locale === 'jp';

  return (
    <>
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([aboutPageSchema, breadcrumbSchema, dentistSchema]),
          }}
        />
      )}

      <Header />
      <FloatingActionButton />
      <Toaster position="top-center" />

      <div className="relative overflow-visible">
        <AboutHeroSection />

        {/* 
          콘텐츠 섹션들 (Parallax Cover 효과)
          - z-index 30으로 Hero(z-0~20) 위를 덮음
          - 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
          - 모바일: -mt-[200svh] (300svh - 100svh), 데스크톱: -mt-[240svh] (340svh - 100svh)
        */}
        <div className="relative z-50 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-visible" style={{ backgroundColor: '#FEFEFE' }}>
          <AboutStrengthSection />
          <AboutDirectorSection />
          <AboutDoctorsSection />
          <AboutHistorySection />
          <AboutTechSection />
          <AboutEquipmentSection />
          <AboutFacilitySection />
          <AboutOtherCompanySection />
          <AboutMapSection />
          <Footer breadcrumbs={[
            { label: tc('home'), href: '/' },
            { label: tNav('intro'), href: '/intro' }
          ]} />
        </div>
      </div>
    </>
  );
}
