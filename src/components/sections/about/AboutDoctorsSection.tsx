import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getTranslations, getLocale } from 'next-intl/server';
import { MotionImageReveal } from '@/components/ui/MotionFadeUp';

/**
 * 의사 정보 인터페이스
 */
interface DoctorInfo {
  name: string;
  title: string;
  gradientText: string;
  description: (string | React.ReactNode)[];
  image: string;
  signature?: string;
  padding?: string; // 이미지 패딩 값 (인물의 정수리와 bottom 사이의 거리를 조정)
  alt: string
}

/**
 * 블랑쉬치과 의사 섹션 컴포넌트
 * * @description
 * 의료진 소개 섹션입니다.
 * 6개의 의사 정보를 2컬럼 그리드 레이아웃(이미지 + 텍스트)으로 세로로 쌓은 형태입니다.
 * * 변경사항:
 * - 텍스트 영역 컨테이너: md 화면에서 342px 고정 너비 (사용자 요청)
 * - 인용구 박스: 최소 너비(min-w) 보장하되 부모 크기에 맞춤
 */
export async function AboutDoctorsSection() {
  const t = await getTranslations('aboutDoctors');
  const locale = await getLocale();
  const isEn = locale === 'en';

  // 의사 정보 배열 - 번역 파일에서 가져오기
  const doctors: DoctorInfo[] = [
    {
      name: t('list.0.name'),
      title: t('list.0.title'),
      gradientText: t('list.0.quote'),
      description: Object.values(t.raw('list.0.description')),
      image: '/assets/about/about-2.webp',
      padding: '25% 0 0 0',
      alt: t('list.0.name')
    },
    {
      name: t('list.1.name'),
      title: t('list.1.title'),
      gradientText: t('list.1.quote'),
      description: Object.values(t.raw('list.1.description')),
      image: '/assets/about/about-3.webp',
      alt: t('list.1.name')
    },
    {
      name: t('list.2.name'),
      title: t('list.2.title'),
      gradientText: t('list.2.quote'),
      description: Object.values(t.raw('list.2.description')),
      image: '/assets/about/about-4.webp',
      padding: '24% 0 0 0',
      alt: t('list.2.name')
    },
    {
      name: t('list.3.name'),
      title: t('list.3.title'),
      gradientText: t('list.3.quote'),
      description: Object.values(t.raw('list.3.description')),
      image: '/assets/about/about-5.webp',
      padding: '17% 0 0 0',
      alt: t('list.3.name')
    },
    {
      name: t('list.4.name'),
      title: t('list.4.title'),
      gradientText: t('list.4.quote'),
      description: Object.values(t.raw('list.4.description')),
      image: '/assets/about/about-6.webp',
      alt: t('list.4.name')
    },
  ];

  return (
    <div className="relative z-10 w-full flex items-center justify-center overflow-hidden bg-[#F3F3F6]">
      <div className="flex flex-col w-full">
        {/* 섹션 헤더 */}
        <div
          className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[56px] pb-[78px] bg-[#F3F3F6] inline-flex flex-col items-start gap-2 border-b border-white"
          style={{ maxWidth: '1472px' }}
        >
          <h2
            className="font-['Pretendard'] whitespace-nowrap"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '-0.18px',
            }}
          >
            {t('category')}
          </h2>
          <div
            className="font-['Pretendard'] whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
            }}
          >
            {t('title')}
          </div>
        </div>

        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 md:grid-cols-2 w-full lg:mx-auto h-auto overflow-visible md:bg-white"
            style={{ maxWidth: '1472px' }}
          >
            {/* 텍스트 영역 */}
            <div
              className="relative z-20 md:z-auto flex items-start md:items-center justify-start lg:justify-center w-full bg-[rgb(243,243,246)] md:bg-white py-[60px] md:py-0 pl-[30px] md:pl-[80px] lg:pl-0 md:order-1 order-2"
              style={{
                borderBottom: '1px solid rgb(243, 243, 246)',
              }}
            >
              {/* [수정됨]
                - 언어에 따라 텍스트 가로 넓이 및 위치 조정
                - PC 레이아웃 절대 보존 원칙에 따라, 한국어/일본어는 342px 유지
              */}
              <div className={cn(
                "relative flex flex-col items-start w-full overflow-visible pr-[30px] md:pr-0",
                isEn ? "md:w-[420px]" : "md:w-[342px]"
              )}>
                {/* 아이콘 - SVG */}
                <div className="mb-4" style={{ width: '32px', height: '30.81px', paddingBottom: '6.19px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                    <path d="M9.24952 16.0662C5.62118 16.2845 2.6743 19.7009 2.6743 23.3356V27.8093C2.6743 28.7499 1.91162 29.5126 0.970288 29.5126H0V30.8091H16.6912V23.0616C16.6912 19.0477 13.3164 15.8219 9.24952 16.0662Z" fill="#61D5CA" />
                    <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="#61D5CA" />
                    <path d="M16.6912 0.000488281H0V1.29703H0.970289C1.91092 1.29703 2.67359 2.0597 2.67359 3.00033V7.47468C2.67359 11.1094 5.62118 14.5259 9.24881 14.7434C13.3164 14.9884 16.6912 11.7626 16.6912 7.74797V0.000488281Z" fill="#61D5CA" />
                    <path d="M24.9943 0.000488281H17.9883V7.75079C17.9883 11.6199 21.1251 14.7568 24.9943 14.7568C28.8634 14.7568 32.0003 11.6199 32.0003 7.75079V7.00648C32.0003 3.13733 28.8634 0.000488281 24.9943 0.000488281Z" fill="#61D5CA" />
                  </svg>
                </div>

                {/* 이름 */}
                <div className="mb-4">
                  <h3
                    className="font-['Pretendard'] mb-2"
                    style={{
                      color: '#000',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '28px',
                      letterSpacing: '-0.2px'
                    }}
                  >
                    {doctor.name}
                  </h3>
                  {/* 제목 (있을 때만 표시) */}
                  {doctor.title && (
                    <div
                      className="font-['Pretendard']"
                      style={{
                        color: 'rgba(0, 0, 0, 0.70)',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '28px',
                        letterSpacing: '-0.16px'
                      }}
                    >
                      {doctor.title}
                    </div>
                  )}
                </div>

                {/* 인용문 박스 */}
                {/* - 부모 내에서 유연하게 작동하도록 min-w 적용 */}
                <div
                  className={cn(
                    "mb-4 flex flex-col justify-between items-start w-full bg-[#F3F3F6] md:bg-white",
                    isEn ? "md:min-w-[360px]" : "md:min-w-[310px]"
                  )}
                  style={{
                    height: '70px',
                    borderTop: '1px solid #fff',
                    borderBottom: '1px solid #fff'
                  }}
                >
                  <div
                    className="text-center w-full flex items-center justify-center h-full whitespace-pre-line"
                    style={{
                      color: '#000',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '24px',
                      letterSpacing: '-0.16px'
                    }}
                  >
                    {doctor.gradientText}
                  </div>
                </div>

                {/* 설명 텍스트 */}
                <ul
                  className="text-left font-['Pretendard'] list-disc pl-4 overflow-visible"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '-0.16px'
                  }}
                >
                  {doctor.description.map((item, idx) => {
                    return (
                      <li key={idx} className="whitespace-pre-line">{item}</li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* 이미지 영역 */}
            <div
              className="relative overflow-hidden w-full bg-white h-[406px] md:h-[694px] md:order-2 order-1"
              style={{
                padding: doctor.padding || '15% 0 0 0',
                zIndex: doctor.image === '/assets/about/about-6.webp' ? 0 : 1,
              }}
            >
              <MotionImageReveal
                className="relative w-full h-full overflow-hidden"
                style={{ zIndex: 1 }}
                delay={index * 0.1}
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className={cn(
                    'object-contain origin-center',
                    doctor.image === '/assets/about/about-6.webp' && 'scale-[1.2]'
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </MotionImageReveal>
            </div>

            {/* 1px full-width divider */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-white z-30 pointer-events-none" />


          </div>
        ))}
      </div>
    </div>
  );
}
