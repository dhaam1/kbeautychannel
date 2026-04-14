'use client';

import { Compare } from '@/components/ui/compare';
import { useLocale } from 'next-intl';

/**
 * 교정 BeforeAfter 섹션 컴포넌트
 * LaminateBeforeAfterSection을 기반으로 복제 (의존성 제거)
 * 4행을 제거하고 3행과 동일하게 구성
 * 
 * @description
 * 4행 col 구조의 섹션입니다.
 * 
 * @returns {JSX.Element} BeforeAfter 섹션 컴포넌트
 */
export function OrthodonticsCustomerSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <div className="relative w-full bg-[#F7F8F8] border-b border-white">
      {/* 1행: 헤더 */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-[#F7F8F8] border-b border-white">
        <div className="flex flex-col items-center text-center w-full pt-[67px] pb-[30px] bg-[#F7F8F8]">
          <h2
            className="relative z-10"
            style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }}
          >
            {isEn ? 'Orthodontics Cases' : '치아교정 사례'}
          </h2>
          <p
            className="pb-[60px] relative z-10"
            style={{ color: '#000', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }}
          >
            {isEn ? 'Blanche Dental Clinic Orthodontics Results' : '블랑쉬치과 교정 치료 결과입니다'}
          </p>
          <p
            className="relative z-10"
            style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}
          >
            {isEn ? 'Drag the slider to compare before and after' : '화면을 드래그하여 전/후를 비교해 보세요'}
          </p>
        </div>
      </div>

      {/* 2-4행: Brand items (하나의 그리드로 통합) */}
      <div
        className="h-auto w-full mx-auto bg-[#F7F8F8] border border-white divide-y divide-white"
        style={{ maxWidth: '1472px' }}
      >
        {/* 2행 */}
        <div className="flex flex-col md:flex-row divide-x divide-white">
          <div className="relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-97.webp"
                secondImage="/assets/asset-98.webp"
                firstAlt="20대 남성 앞니 교정 치료 전 사진, 앞니 배열 불균형 상태"
                secondAlt="20대 남성 앞니 교정 치료 후 사진, 앞니 배열 개선 결과"
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
              <div className="relative z-30">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Male in his 20s, Front Teeth Orthodontics' : '20대 남성, 앞니 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-30">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-99.webp"
                secondImage="/assets/asset-100.webp"
                firstAlt="20대 여성 치아 교합 교정 치료 전 사진, 치열 및 교합 불균형 상태"
                secondAlt="20대 여성 치아 교합 교정 치료 후 사진, 치열과 교합 개선 결과"
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
              <div className="relative z-20">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Female in her 20s, Occlusion Orthodontics' : '20대 여성, 치아 교합 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-20">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-101.webp"
                secondImage="/assets/asset-102.webp"
                firstAlt="20대 여성 인비절라인 교정 치료 전 사진, 투명교정 전 치열 상태"
                secondAlt="20대 여성 인비절라인 교정 치료 후 사진, 투명교정으로 치열 개선"
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
                  {isEn ? 'Female in her 20s, Invisalign' : '20대 여성, 인비절라인 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-10">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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

        {/* 3행 */}
        <div className="flex flex-col md:flex-row divide-x divide-white">
          <div className="relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-103.webp"
                secondImage="/assets/asset-104.webp"
                firstAlt="30대 여성 앞니 교정 치료 전, 앞니 배열 불균형과 겹침이 보이는 상태"
                secondAlt="30대 여성 앞니 교정 치료 후, 앞니 배열이 고르게 정돈된 모습"
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
              <div className="relative z-30">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Female in her 30s, Front Teeth Orthodontics' : '30대 여성, 앞니 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-30">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-105.webp"
                secondImage="/assets/asset-106.webp"
                firstAlt="30대 남성 앞니 교정 치료 전, 앞니 틀어짐과 교합 불균형 상태"
                secondAlt="30대 남성 앞니 교정 치료 후, 앞니 교합과 배열이 안정된 상태"
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
              <div className="relative z-20">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Male in his 30s, Front Teeth Orthodontics' : '30대 남성, 앞니 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-20">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-107.webp"
                secondImage="/assets/asset-108.webp"
                firstAlt="30대 남성 선천성 결손 치료 전, 앞니 결손으로 공간이 남아 있는 상태"
                secondAlt="30대 남성 선천성 결손 치료 후, 공간이 보완되어 자연스러운 치열"
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
                  {isEn ? 'Male in his 30s, Congenitally Missing Teeth' : '30대 남성, 선천성결손'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-10">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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

        {/* 4행 */}
        <div className="flex flex-col md:flex-row divide-x divide-white">
          <div className="relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-109.webp"
                secondImage="/assets/asset-110.webp"
                firstAlt="40대 여성 인비절라인 교정 치료 전 치열 상태와 앞니 배열 모습"
                secondAlt="40대 여성 인비절라인 교정 치료 후 고르게 정돈된 치열과 교합"
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
              <div className="relative z-30">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Female in her 40s, Invisalign' : '40대 여성, 인비절라인 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-30">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-111.webp"
                secondImage="/assets/asset-112.webp"
                firstAlt="10대 여성 인비절라인 교정 치료 전 치아 배열 불균형 상태"
                secondAlt="10대 여성 인비절라인 교정 치료 후 안정된 치열과 교합 모습"
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
              <div className="relative z-20">
                <h3 className="text-left" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                  {isEn ? 'Female in her teens, Invisalign' : '10대 여성, 인비절라인 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-20">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
          <div className="relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden">
            {/* 이미지 영역 - 태블릿/PC에서 flex 레이아웃 */}
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
              <Compare
                firstImage="/assets/asset-113.webp"
                secondImage="/assets/asset-114.webp"
                firstAlt="어린이 부정교합 교정 치료 전 치아 맞물림 이상 상태"
                secondAlt="어린이 부정교합 교정 치료 후 개선된 교합과 치열 모습"
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
                  {isEn ? 'Child, Malocclusion Orthodontics' : '어린이, 부정교합 교정'}
                </h3>
              </div>
            </div>
            <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
              <div className="relative z-10">
                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                </p>
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
      </div>
    </div>
  );
}
