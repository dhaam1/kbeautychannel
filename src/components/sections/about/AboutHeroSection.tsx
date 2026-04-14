import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AboutHeroSparkles } from '@/components/sections/about/AboutHeroSparkles';
import { getTranslations } from 'next-intl/server';
import { HeroConsultationButton } from '@/components/ui/ConsultationButton';
import { H1 } from '@/components/ui/Typography';

/**
 * 블랑쉬치과 소개 히어로 섹션 컴포넌트
 *
 * @description
 * 블랑쉬치과 소개 페이지의 최상단 히어로 섹션입니다.
 * 배경 이미지와 텍스트를 표시합니다.
 *
 * 레이아웃 구조:
 * - 전체 높이: 300svh (모바일), 340svh (데스크톱)
 * - Sticky 컨테이너: 화면 상단에 고정 (h-screen)
 *
 * @returns {JSX.Element} 히어로 섹션 컴포넌트
 */
export async function AboutHeroSection() {
  const t = await getTranslations('aboutHero');

  return (
    <section className="relative w-full h-[300svh] md:h-[340svh]">
      {/* Sticky Container: 화면 상단에 고정되는 히어로 영역 */}
      <div
        className="sticky top-0 h-screen-safe w-full overflow-hidden"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          {/* 모바일 배경 이미지 */}
          <Image
            src="/assets/about/about-34.webp"
            alt=""
            fill
            className="object-cover md:hidden"
            priority
            sizes="100vw"
          />
          {/* 데스크톱 배경 이미지 */}
          <Image
            src="/assets/about/about-34.webp"
            alt=""
            fill
            className="hidden md:block object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* ✅ 추가됨: 전체 배경 그라데이션 오버레이 (블랙 그라데이션) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 56.25%, rgba(0, 0, 0, 0.00) 56.26%, rgba(0, 0, 0, 0.44) 100%)'
          }}
        />

        {/* 모바일 SparklesCore */}
        {/* <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full md:hidden h-[362px]"
          style={{
            maskImage: 'radial-gradient(circle, white 0%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle, white 0%, transparent 90%)'
          }}
        >
          <AboutHeroSparkles
            background="transparent"
            particleColor="#ffffff"
            particleDensity={160}
            minSize={0.8}
            maxSize={1.2}
            speed={5.0}
            className="absolute inset-0 opacity-50"
          />
        </div> */}

        {/* 데스크톱 SparklesCore */}
        {/* <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 hidden md:block w-[50%] h-[362px]"
          style={{
            maskImage: 'radial-gradient(circle, white 0%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle, white 0%, transparent 90%)'
          }}
        >
          <AboutHeroSparkles
            background="transparent"
            particleColor="#ffffff"
            particleDensity={160}
            minSize={1.05}
            maxSize={1.5}
            speed={7.35}
            className="absolute inset-0 opacity-50"
          />
        </div> */}

        {/* 모바일 전용 레이어 */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full md:hidden z-[5]"
          style={{
            height: '320px',
            background: 'rgba(0, 105, 119, 0.30)',
            backdropFilter: 'blur(20px)',
          }}
        />

        {/* 텍스트 레이아웃 및 버튼 - Container 인라인화 */}
        <div className={cn(
          "mx-auto w-full",
          "px-[30px] md:px-[80px] lg:px-[80px]",
          "max-w-[1472px]",
          "relative h-full"
        )}>
          <div className="relative h-full flex flex-col md:flex-row items-center md:items-end justify-end md:justify-between pb-[30px] md:pb-[114px] gap-[40px] md:gap-[27px]">
            {/* TextLayout 인라인화 */}
            <div className={cn("flex flex-col", "z-10")}>
              {/* 1행: Row - SVG + 텍스트 */}
              <div className="flex flex-row items-center justify-center gap-3 pb-5 md:justify-start">
                {/* SVG 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14.999"
                  height="14.442"
                  viewBox="0 0 15 15"
                  fill="none"
                  style={{ aspectRatio: '15.00/14.44' }}
                >
                  <path
                    d="M4.33613 7.53069C2.63518 7.63298 1.2537 9.23439 1.2537 10.9381V13.035C1.2537 13.4759 0.89616 13.8334 0.454867 13.8334H0V14.4412H7.82477V10.8097C7.82477 8.92821 6.24267 7.41616 4.33613 7.53069Z"
                    fill="white"
                  />
                  <path
                    d="M11.715 7.52473C9.9012 7.52473 8.43066 8.99507 8.43066 10.8087V14.4415H11.715C13.5289 14.4415 14.9994 12.9711 14.9994 11.1576V10.8087C14.9994 8.99507 13.5289 7.52473 11.715 7.52473Z"
                    fill="white"
                  />
                  <path
                    d="M7.82697 0H0.00219727V0.607731H0.457064C0.898027 0.607731 1.25556 0.965221 1.25556 1.40612V3.50339C1.25556 5.20709 2.63738 6.80851 4.338 6.91046C6.24486 7.02532 7.82697 5.51327 7.82697 3.63149V0Z"
                    fill="white"
                  />
                  <path
                    d="M11.715 4.57764e-05H8.43066V3.63286C8.43066 5.44646 9.9012 6.9168 11.715 6.9168C13.5289 6.9168 14.9994 5.44646 14.9994 3.63286V3.28398C14.9994 1.47038 13.5289 4.57764e-05 11.715 4.57764e-05Z"
                    fill="white"
                  />
                </svg>
                {/* 텍스트 */}
                <h1
                  className="text-[16px] tracking-[-0.16px]"
                  style={{
                    color: "#FFF",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "16px",
                    letterSpacing: "-0.16px",
                  }}
                >
                  {t('label')}
                </h1>
              </div>

              {/* 2행: 서브텍스트 */}
              <p
                className="whitespace-pre-line text-center md:text-left text-[24px] tracking-[-0.32px] font-semibold md:text-[38px] md:font-normal md:tracking-[-0.38px] subtitle-hero pb-[41px] md:pb-[30px]"
                style={{
                  color: "#FFF",
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                {t('title')}
              </p>

              {/* 3행: 추가 설명 텍스트 */}
              <p
                className="whitespace-pre-line text-center md:text-left text-[13px] tracking-[-0.16px] font-light text-white md:text-white/80 md:text-[14px] md:font-normal md:tracking-[-0.14px]"
                style={{
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                }}
              >
                {t('description')}
              </p>
            </div>
            {/* HeroConsultationButton 인라인화 */}
            <div className="z-20">
              <HeroConsultationButton label={t('consultationBtn')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}