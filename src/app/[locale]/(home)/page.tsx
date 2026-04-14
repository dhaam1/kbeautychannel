import { HomeHeroSection } from "@/components/sections/home/HomeHeroSection";
import { Header } from "@/components/layouts/Header";
import { ClientOnlyComponents } from "@/components/layouts/ClientOnlyComponents";
import dynamic from 'next/dynamic';

import { ASSETS } from "@/constants/assets";
import { getHomeDentistSchema, getServiceItemListSchema } from "@/constants/schema";

// 비필수 컴포넌트 동적 import (코드 스플리팅)
const HomeModelSection = dynamic(() => import("@/components/sections/home/HomeModelSection").then(mod => ({ default: mod.HomeModelSection })), { ssr: true });
const HomeBrandSection = dynamic(() => import("@/components/sections/home/HomeBrandSection").then(mod => ({ default: mod.HomeBrandSection })), { ssr: true });
const HomeCustomerSection = dynamic(() => import("@/components/sections/home/HomeCustomerSection").then(mod => ({ default: mod.HomeCustomerSection })), { ssr: true });
const HomeSolutionSection = dynamic(() => import("@/components/sections/home/HomeSolutionSection").then(mod => ({ default: mod.HomeSolutionSection })), { ssr: true });
const HomeTechSection = dynamic(() => import("@/components/sections/home/HomeTechSection").then(mod => ({ default: mod.HomeTechSection })), { ssr: true });
const HomeBeforeAfterSection = dynamic(() => import("@/components/sections/home/HomeBeforeAfterSection").then(mod => ({ default: mod.HomeBeforeAfterSection })), { ssr: true });
const HomeMagazineSection = dynamic(() => import("@/components/sections/home/HomeMagazineSection").then(mod => ({ default: mod.HomeMagazineSection })), { ssr: true });
const HomeCTASection = dynamic(() => import("@/components/sections/home/HomeCTASection").then(mod => ({ default: mod.HomeCTASection })), { ssr: true });
const Footer = dynamic(() => import("@/components/layouts/Footer").then(mod => ({ default: mod.Footer })), { ssr: true });



/**
 * 메인 홈 페이지 컴포넌트
 *
 * @description
 * 블랑쉬 치과 랜딩 페이지의 최상위 컴포넌트입니다
 * 레이아웃 구조:
 * 1. Header: 상단 고정 네비게이션 바
 * 2. HomeHeroSection: 스티키(sticky)로 고정되는 히어로 영역 (300svh 높이)
 *    - 스크롤 시 카드가 왼쪽에서 슬라이드되어 나타남
 * 3. Content Sections: z-index 30으로 Hero 위를 덮으며 올라오는 콘텐츠 섹션들
 *    - -mt-[100svh] 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
 *
 * @returns {Promise<JSX.Element>} Next.js 서버 컴포넌트로 렌더링되는 페이지
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const isJp = locale === 'jp';

  const jsonLd = [
    {
      "@context": "https://schema.org",
      ...getHomeDentistSchema(locale),
    },
    {
      "@context": "https://schema.org",
      ...getServiceItemListSchema(),
    }
  ];

  return (
    <>
      {!isJp && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Header />

      <div className="relative w-full" style={{ overflowX: 'clip' }}>
        <HomeHeroSection />

        {/* 
          콘텐츠 섹션들 (Parallax Cover 효과)
          - z-index 30으로 Hero(z-0~20) 위를 덮음
          - -mt-[100svh] 음수 마진으로 Hero의 sticky 범위 안으로 진입하여 겹침 효과 생성
        */}
        <div className="relative z-30 -mt-[100svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <HomeModelSection />
          <HomeBrandSection />
          <HomeCustomerSection />
          <HomeSolutionSection />
          <HomeTechSection />
          <HomeBeforeAfterSection />
          <HomeMagazineSection />
          <HomeCTASection />
          <Footer />
        </div>
      </div>
    </>
  );
}
