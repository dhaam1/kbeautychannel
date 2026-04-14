'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/layouts/Container';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 라미네이트 Doctor 섹션 컴포넌트
 * 
 * @description
 * 대표원장 소개 섹션입니다.
 * 서버 컴포넌트로 구현되었으며, CSS 기반 반응형을 사용합니다.
 * 
 * 레이아웃:
 * - 데스크톱: 절대 위치로 오른쪽에 정보 박스 배치
 * - 태블릿/모바일: 세로로 쌓기
 * 
 * @returns {JSX.Element} Doctor 섹션 컴포넌트
 */
export function LaminateDoctorSection() {
  const t = useTranslations('solution.laminate.doctor');
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.2 });
  const bodyMotion = fadeUp({ delay: 0.3 });
  const infoMotion = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0.2 } };

  const career = t.raw('career') as string[];

  return (
    <section
      className={cn(
        "relative w-full overflow-visible",
        "bg-[#FEFEFE]",
        "pt-[60px] pb-[60px] pl-[30px] pr-0 md:pt-[70px] md:pb-[60px] md:pl-20 md:pr-0 lg:py-0",
        "h-auto lg:h-[907px]",
        "lg:flex lg:items-center",
        "max-w-[1472px] mx-auto"
      )}
    >
      {/* 컨테이너 - 태블릿/모바일에서만 flex-col */}
      <div className="flex flex-col md:flex-col lg:block">
        {/* 위쪽 왼쪽 텍스트 블록 컨테이너 */}
        <div
          className={cn(
            "flex flex-col",
            "order-1 lg:order-none",
            "static lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[70px]",
            "mb-8 md:mb-8 lg:mb-0"
          )}
        >
          {/* 첫 번째 텍스트 */}
          <motion.h2
            className={cn(
              "text-left md:text-left lg:text-center",
              "text-[#000] font-['Pretendard']",
              "text-[18px]",
              "font-normal",
              "leading-[30px]",
              "tracking-[-0.18px]",
              "mb-2"
            )}
            {...labelMotion}
          >
            {t('label')}
          </motion.h2>

          {/* 두 번째 텍스트 */}
          <motion.div
            className={cn(
              "text-left md:text-left lg:text-center",
              "text-[#262626] lg:text-[#000] font-['Pretendard']",
              "text-[26px] md:text-[28px] lg:text-[28px]",
              "font-medium",
              "leading-[1.2] lg:leading-[40px]",
              "whitespace-pre-line"
            )}
            style={{ letterSpacing: '-1px' }}
            {...titleMotion}
          >
            {t('title')}
          </motion.div>
        </div>

        {/* 이미지 영역 - 모바일/태블릿에서는 중간에, PC에서는 절대 위치로 바닥에 붙음 */}
        <div className="mx-auto order-2 lg:order-none static lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
          <Image
            src="/assets/laminate/laminate-1.webp"
            alt="대표원장"
            width={411}
            height={658}
            className="object-cover w-[326px] h-[558px] aspect-[163/279] lg:w-[411px] lg:h-[658px] lg:aspect-[411/658]"
          />
        </div>

        {/* 오른쪽 정보 박스 컨테이너 - PC에서 절대 위치 */}
        <div
          className={cn(
            "flex flex-col",
            "items-center lg:items-start",
            "w-full lg:w-auto",
            "relative md:relative lg:absolute",
            "lg:right-[205px] lg:top-[438px]",
            "order-3 lg:order-none",
            "mb-0 md:mb-0 lg:mb-0",
            "z-10",
            "overflow-visible"
          )}
        >
          {/* 오른쪽 중간 정보 박스 - 아이콘과 설명 텍스트 */}
          <div className="flex flex-col items-start lg:items-start w-full lg:w-auto mb-[57px] md:mb-[57px] lg:mb-0 overflow-visible">
            {/* 아이콘 - SVG */}
            <div className="mb-4 lg:mb-0 lg:pb-5" style={{ width: '32px', height: '30.81px', paddingBottom: '6.19px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                <path d="M9.24952 16.0662C5.62118 16.2845 2.6743 19.7009 2.6743 23.3356V27.8093C2.6743 28.7499 1.91162 29.5126 0.970288 29.5126H0V30.8091H16.6912V23.0616C16.6912 19.0477 13.3164 15.8219 9.24952 16.0662Z" fill="#61D5CA" />
                <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="#61D5CA" />
                <path d="M16.6912 0.000488281H0V1.29703H0.970289C1.91092 1.29703 2.67359 2.0597 2.67359 3.00033V7.47468C2.67359 11.1094 5.62118 14.5259 9.24881 14.7434C13.3164 14.9884 16.6912 11.7626 16.6912 7.74797V0.000488281Z" fill="#61D5CA" />
                <path d="M24.9943 0.000488281H17.9883V7.75079C17.9883 11.6199 21.1251 14.7568 24.9943 14.7568C28.8634 14.7568 32.0003 11.6199 32.0003 7.75079V7.00648C32.0003 3.13733 28.8634 0.000488281 24.9943 0.000488281Z" fill="#61D5CA" />
              </svg>
            </div>

            {/* 설명 텍스트 */}
            <motion.div
              className={cn(
                "text-left md:text-left lg:text-left",
                "text-[#000] font-['Pretendard']",
                "text-[24px] md:text-[20px] lg:text-[24px]",
                "font-normal",
                "leading-normal",
                "tracking-[-0.3px] md:tracking-[-0.26px] lg:tracking-[-0.3px]",
                "lg:pb-[170px]",
                "overflow-visible",
                "whitespace-pre-line"
              )}
              {...bodyMotion}
            >
              {t('description')}
            </motion.div>
          </div>

          {/* 오른쪽 하단 정보 박스 - 학력 정보와 서명 */}
          <div className="flex flex-row items-end justify-start lg:justify-center gap-4 w-full lg:w-auto">
            {/* 텍스트 영역 */}
            <motion.div
              className="flex flex-col"
              {...infoMotion}
            >
              {/* 학력 정보 */}
              <ul
                className={cn(
                  "text-[rgba(0,0,0,0.60)] font-['Pretendard']",
                  "text-[15px] md:text-[14px] lg:text-[15px]",
                  "font-normal",
                  "leading-[24px] md:leading-[22px] lg:leading-[24px]",
                  "tracking-[-0.15px] md:tracking-[-0.14px] lg:tracking-[-0.15px]",
                  "list-disc pl-4"
                )}
              >
                {career.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              {/* 원장 이름 */}
              <div
                className={cn(
                  "text-[rgba(0,0,0,0.60)] font-['Pretendard']",
                  "text-[15px] md:text-[14px] lg:text-[15px]",
                  "font-semibold",
                  "leading-[24px] md:leading-[22px] lg:leading-[24px]",
                  "tracking-[-0.15px] md:tracking-[-0.14px] lg:tracking-[-0.15px]"
                )}
              >
                {t('name')}
              </div>
            </motion.div>
            {/* 서명 이미지 */}
            <Image
              src="/assets/asset-61.webp"
              alt="Signature"
              width={147}
              height={53}
              className="object-contain"
              style={{ width: '147px', height: '53px', aspectRatio: '147/53' }}
            />
          </div>
        </div>
      </div>

      {/* 하단 레이어 - 모바일/태블릿에서만 표시 */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 w-full h-[390px]",
          "bg-[#F7F8F8]",
          "z-0",
          "lg:hidden"
        )}
      />

    </section>
  );
}
