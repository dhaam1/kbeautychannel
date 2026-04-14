'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Compare } from '@/components/ui/compare';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 라미네이트 BeforeAfter 섹션 컴포넌트
 * 
 * @description
 * 4행 col 구조의 섹션입니다.
 * 
 * @returns {JSX.Element} BeforeAfter 섹션 컴포넌트
 */
export function LaminateBeforeAfterSection() {
  const t = useTranslations('solution.laminate.beforeAfter');
  const locale = useLocale();

  const cases = t.raw('cases') as Array<{
    id: number;
    title: string;
    description: string;
  }>;

  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.2 });
  const bodyMotion = fadeUp({ delay: 0.3 });
  const cardTitleMotion = (index: number) => fadeUp({ delay: 0.2 + index * 0.1 });
  const footerMotion = fadeUp({ delay: 0.5 });
  const logoSymbolMotion = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0.7 } };

  const getImagePath = (_index: number, defaultFirst: string, defaultSecond: string) => {
    if (locale === 'jp') {
      return {
        first: defaultFirst.replace('.webp', '-jp.webp'),
        second: defaultSecond.replace('.webp', '-jp.webp'),
      };
    }
    return { first: defaultFirst, second: defaultSecond };
  };

  return (
    <div className="relative w-full bg-white">
      {/* 1행: Aurora 효과 제거한 div */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-black">
        <div className="w-full mx-auto max-w-[1472px] flex flex-col items-center text-center pt-[67px] pb-[77px] bg-black">
          <motion.h2
            className="relative z-10 pb-[10px]"
            style={{ color: '#FFF', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }}
            {...labelMotion}
          >
            {t('label')}
          </motion.h2>
          <motion.p
            className="pb-[50px] relative z-10"
            style={{ color: '#FFF', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }}
            {...titleMotion}
          >
            {t('title')}
          </motion.p>
          <motion.p
            className="relative z-10"
            style={{ color: 'rgba(255, 255, 255, 0.70)', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}
            {...bodyMotion}
          >
            {t('description')}
          </motion.p>
        </div>
      </div>

      {/* 2행: Brand items */}
      <div className="w-full h-[1px] bg-white"></div>
      <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-white bg-white" style={{ maxWidth: '1472px' }}>
        <div className="relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col border-b-[1px] md:border-b-0 md:border-l-[1px] md:border-r-[1px] border-white overflow-hidden">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(0, "/assets/asset-80.webp", "/assets/asset-81.webp").first}
              secondImage={getImagePath(0, "/assets/asset-80.webp", "/assets/asset-81.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <motion.div
              className="relative z-30"
              {...cardTitleMotion(0)}
            >
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[0]?.title}
              </h3>
            </motion.div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
        <div className="relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col border-b-[1px] md:border-b-0 md:border-r-[1px] border-white overflow-hidden">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(1, "/assets/asset-82.webp", "/assets/asset-83.webp").first}
              secondImage={getImagePath(1, "/assets/asset-82.webp", "/assets/asset-83.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <motion.div
              className="relative z-20"
              {...cardTitleMotion(1)}
            >
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[1]?.title}
              </h3>
            </motion.div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
        <div className="relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden border-r border-white">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(2, "/assets/asset-84.webp", "/assets/asset-85.webp").first}
              secondImage={getImagePath(2, "/assets/asset-84.webp", "/assets/asset-85.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[2]?.title}
              </h3>
            </div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white"></div>

      {/* 3행: Brand items (2행과 동일) */}
      <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-white bg-white" style={{ maxWidth: '1472px' }}>
        <div className="relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col border-b-[1px] md:border-b-0 md:border-l-[1px] md:border-r-[1px] border-white overflow-hidden">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(3, "/assets/asset-66.webp", "/assets/asset-67.webp").first}
              secondImage={getImagePath(3, "/assets/asset-66.webp", "/assets/asset-67.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <motion.div
              className="relative z-30"
              {...cardTitleMotion(0)}
            >
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[3]?.title}
              </h3>
            </motion.div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
        <div className="relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col border-b-[1px] md:border-b-0 md:border-r-[1px] border-white overflow-hidden">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(4, "/assets/asset-64.webp", "/assets/asset-65.webp").first}
              secondImage={getImagePath(4, "/assets/asset-64.webp", "/assets/asset-65.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <motion.div
              className="relative z-20"
              {...cardTitleMotion(1)}
            >
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[4]?.title}
              </h3>
            </motion.div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
        <div className="relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden border-r border-white">
          {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <Compare
              firstImage={getImagePath(5, "/assets/asset-62.webp", "/assets/asset-63.webp").first}
              secondImage={getImagePath(5, "/assets/asset-62.webp", "/assets/asset-63.webp").second}
              className="w-full h-full"
              firstImageClassName="object-cover md:object-cover"
              secondImageClassname="object-cover md:object-cover"
              slideMode="drag"
              showHandlebar={true}
              autoplay={false}
            />
          </div>
          {/* 텍스트 영역 - 태블릿/PC에서 flex 레이아웃 */}
          <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
            <motion.div
              className="relative z-10"
              {...cardTitleMotion(2)}
            >
              <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                {cases[5]?.title}
              </h3>
            </motion.div>
          </div>

          {/* SVG 아이콘 - 절대 위치 */}
          <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
              <path d="M9.24952 16.0653C5.62118 16.2835 2.6743 19.7 2.6743 23.3347V27.8083C2.6743 28.7489 1.91162 29.5116 0.970288 29.5116H0V30.8081H16.6912V23.0607C16.6912 19.0468 13.3164 15.8209 9.24952 16.0653Z" fill="black" />
              <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="black" />
              <path d="M16.6912 0H0V1.29654H0.970289C1.91092 1.29654 2.67359 2.05922 2.67359 2.99984V7.47419C2.67359 11.1089 5.62118 14.5254 9.24881 14.7429C13.3164 14.9879 16.6912 11.7621 16.6912 7.74748V0Z" fill="black" />
              <path d="M24.9943 0H17.9883V7.7503C17.9883 11.6195 21.1251 14.7563 24.9943 14.7563C28.8634 14.7563 32.0003 11.6195 32.0003 7.7503V7.00599C32.0003 3.13684 28.8634 0 24.9943 0Z" fill="black" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white"></div>

      {/* 4행: Aurora 효과 제거한 div */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-black">
        <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[97px] bg-black">
          <motion.p
            className="pb-[97px] relative z-10 whitespace-pre-line"
            style={{ color: '#FFF', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.28px' }}
            {...footerMotion}
          >
            {t('footer')}
          </motion.p>
          <motion.div
            className="relative z-10"
            style={{ width: '148px', height: '27px' }}
            {...logoSymbolMotion}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="148" height="27" viewBox="0 0 148 27" fill="none">
              <path d="M8.10523 14.0788C4.92576 14.27 2.34345 17.2638 2.34345 20.4489V24.3691C2.34345 25.1933 1.67513 25.8616 0.850251 25.8616H0V26.9978H14.6263V20.2088C14.6263 16.6914 11.669 13.8647 8.10523 14.0788Z" fill="white" />
              <path d="M21.9029 14.0674C18.5124 14.0674 15.7637 16.8162 15.7637 20.2066V26.9981H21.9029C25.2934 26.9981 28.0422 24.2494 28.0422 20.8589V20.2066C28.0422 16.8162 25.2934 14.0674 21.9029 14.0674Z" fill="white" />
              <path d="M14.6263 0H0V1.13614H0.850251C1.67451 1.13614 2.34283 1.80446 2.34283 2.62873V6.54953C2.34283 9.73457 4.92576 12.7284 8.10461 12.919C11.669 13.1337 14.6263 10.307 14.6263 6.78902V0Z" fill="white" />
              <path d="M21.9029 0H15.7637V6.79149C15.7637 10.182 18.5124 12.9307 21.9029 12.9307C25.2934 12.9307 28.0422 10.182 28.0422 6.79149V6.13926C28.0422 2.74877 25.2934 0 21.9029 0Z" fill="white" />
              <path d="M45.9291 21.6707C48.5541 21.6707 50.796 20.4615 50.796 18.102C50.796 15.6534 48.4656 14.3854 45.8703 14.3854H40.4724V21.6707H45.9291ZM45.369 11.6125C48.0231 11.6125 50.0584 10.4033 50.0584 8.10258C50.0584 5.68425 47.7874 4.50417 45.2806 4.50417H40.4724V11.6125H45.369ZM37.3164 1.58398H46.1945C50.8251 1.58398 53.3914 4.29749 53.3914 7.57164C53.3914 9.75481 52.1525 12.0549 49.4687 12.8223V12.8811C52.4477 13.4417 54.1581 15.5358 54.1581 18.3675C54.1581 22.5556 50.3827 24.5909 46.6958 24.5909H37.3164V1.58398Z" fill="white" />
              <path d="M59.4091 0.994141H56.4004V24.5908H59.4091V0.994141Z" fill="white" />
              <path d="M79.6719 8.2202H82.6211V11.0222H82.6806C83.9188 8.75115 85.925 7.74805 88.1373 7.74805C91.0865 7.74805 93.977 9.57664 93.977 14.2963V24.5903H90.9683V15.6231C90.9683 12.438 89.6119 10.5797 87.1639 10.5797C84.4497 10.5797 82.6806 12.792 82.6806 15.8001V24.5903H79.6719V8.2202Z" fill="white" />
              <path d="M109.124 12.371C108.79 10.2689 107.289 7.80041 104.786 7.80041C101.617 7.80041 98.4137 10.8697 98.4137 16.0412C98.4137 21.2794 102.05 24.3494 105.454 24.3494C108.156 24.3494 110.692 22.9812 112.427 19.9781L112.727 20.1451C110.892 23.048 108.624 24.7497 104.753 24.7497C100.349 24.7497 95.7441 21.4799 95.7441 16.0412C95.7441 10.6698 100.349 7.39941 104.753 7.39941C108.456 7.39941 111.46 10.1358 111.793 12.371H109.124Z" fill="white" />
              <path d="M114.066 24.4149V1.05957H116.736V15.3728C117.703 10.9686 120.506 7.39871 124.209 7.39871C126.612 7.39871 129.014 8.66666 129.014 12.2366V24.4149H126.345V13.0373C126.345 9.20008 125.377 7.79908 123.81 7.79908C120.072 7.79908 116.869 13.0373 116.736 18.1091V24.4149H114.066Z" fill="white" />
              <path d="M141.657 14.9403C143.559 14.8066 144.392 13.6723 144.392 12.3041C144.392 10.2689 142.558 7.80041 140.055 7.80041C136.886 7.80041 133.683 10.8697 133.683 16.0412C133.683 17.2757 133.883 18.3766 134.25 19.3778C134.584 17.0424 136.552 15.2404 141.657 14.9403ZM134.517 20.0449C135.785 22.8141 138.32 24.3494 140.723 24.3494C143.426 24.3494 145.961 22.9812 147.696 19.9781L147.996 20.1451C146.161 23.048 143.892 24.7497 140.022 24.7497C135.618 24.7497 131.014 21.4799 131.014 16.0412C131.014 10.6698 135.618 7.39941 140.022 7.39941C143.725 7.39941 147.062 10.1358 147.062 12.371C147.062 13.8728 145.394 15.2404 141.691 15.3407C137.387 15.4743 134.65 17.0758 134.517 20.0449Z" fill="white" />
              <path d="M74.3039 14.027C69.4778 14.1972 64.2438 16.2022 64.2438 21.2319C64.2438 22.5914 64.5836 24.4609 66.7927 24.4609C70.8713 24.4609 73.5904 20.5865 74.3039 16.4398V14.027ZM64.38 13.0753C64.38 8.65695 67.6083 7.19531 71.2111 7.19531C74.5762 7.19531 77.023 8.4874 77.023 12.1242V24.5289H74.3039V18.0376C73.3862 21.2319 70.9054 24.8687 66.2494 24.8687C63.0885 24.8687 61.5254 23.2034 61.5254 20.8247C61.5254 15.7603 69.2402 13.8234 74.3039 13.6873V12.9392C74.3039 9.03072 73.3181 7.60373 70.6671 7.60373C67.9147 7.60373 64.7197 9.03072 64.7197 13.0753H64.38Z" fill="white" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
