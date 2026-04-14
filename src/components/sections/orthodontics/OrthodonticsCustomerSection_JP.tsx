'use client';

import { Compare } from '@/components/ui/compare';

/**
 * 교정 BeforeAfter 섹션 컴포넌트 (일본어)
 * LaminateBeforeAfterSection을 기반으로 복제 (의존성 제거)
 * 4행을 제거하고 3행과 동일하게 구성
 * 
 * @description
 * 4행 col 구조의 섹션입니다.
 * 
 * @returns {JSX.Element} BeforeAfter 섹션 컴포넌트
 */
export function OrthodonticsCustomerSection_JP() {
    return (
        <div className="relative w-full bg-[#F7F8F8] border-b border-white">
            {/* 1행: 헤더 */}
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-[#F7F8F8] border-b border-white">
                <div className="flex flex-col items-center text-center w-full pt-[67px] pb-[30px] bg-[#F7F8F8]">
                    <h2
                        className="relative z-10"
                        style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }}
                    >
                        矯正事例
                    </h2>
                    <p
                        className="pb-[60px] relative z-10"
                        style={{ color: '#000', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }}
                    >
                        ブランシュ歯科の矯正治療の結果をご確認ください
                    </p>
                    <p
                        className="relative z-10"
                        style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}
                    >
                        画面をドラッグして、治療前後の変化を比較してみてください。
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
                                firstImage="/assets/jp/go01a.webp"
                                secondImage="/assets/jp/go01b.webp"
                                firstAlt="20代男性の前歯矯正治療前の写真"
                                secondAlt="20代男性の前歯矯正治療後の写真"
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
                                    20代男性、前歯矯正
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
                                firstImage="/assets/jp/go02a.webp"
                                secondImage="/assets/jp/go02b.webp"
                                firstAlt="20代女性の歯列咬合矯正治療前の写真"
                                secondAlt="20代女性の歯列咬合矯正治療後の写真"
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
                                    20代女性、歯列咬合矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-20">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go03a.webp"
                                secondImage="/assets/jp/go03b.webp"
                                firstAlt="20代女性のインビザライン矯正治療前の写真"
                                secondAlt="20代女性のインビザライン矯正治療後の写真"
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
                                    20代女性、インビザライン矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-20">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go04a.webp"
                                secondImage="/assets/jp/go04b.webp"
                                firstAlt="30代女性の前歯矯正治療前"
                                secondAlt="30代女性の前歯矯正治療後"
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
                                    30代女性、前歯矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-30">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go05a.webp"
                                secondImage="/assets/jp/go05b.webp"
                                firstAlt="30代男性の前歯矯正治療前"
                                secondAlt="30代男性の前歯矯正治療後"
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
                                    30代男性、前歯矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-20">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go06a.webp"
                                secondImage="/assets/jp/go06b.webp"
                                firstAlt="30代男性の先天性欠損治療前"
                                secondAlt="30代男性の先天性欠損治療後"
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
                                    30代男性、先天性欠損
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-10">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go07a.webp"
                                secondImage="/assets/jp/go07b.webp"
                                firstAlt="40代女性のインビザライン矯正治療前"
                                secondAlt="40代女性のインビザライン矯正治療後"
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
                                    40代女性、インビザライン矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-30">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go08a.webp"
                                secondImage="/assets/jp/go08b.webp"
                                firstAlt="10代女性のインビザライン矯正治療前"
                                secondAlt="10代女性のインビザライン矯正治療後"
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
                                    10代女性、インビザライン矯正
                                </h3>
                            </div>
                        </div>
                        <div className="h-auto pt-0 pb-0 pl-[30px] md:pl-[80px] pr-0 flex items-center overflow-hidden md:mt-0">
                            <div className="relative z-20">
                                <p className="text-left whitespace-pre-line" style={{ color: 'rgba(0, 0, 0, 0.70)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                                </p>
                            </div>
                        </div>
                        {/* SVG アイコン - 絶対位置 */}
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
                        {/* イメージ領域 - タブレット/PCでflexレイアウト */}
                        <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                            <Compare
                                firstImage="/assets/jp/go09a.webp"
                                secondImage="/assets/jp/go09b.webp"
                                firstAlt="小児、不正咬合矯正治療前"
                                secondAlt="小児、不正咬合矯正治療後"
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
                                    小児、不正咬合矯正
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
