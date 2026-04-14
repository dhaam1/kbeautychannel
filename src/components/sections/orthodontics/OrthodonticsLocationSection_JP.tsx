'use client';

import Image from 'next/image';
import { OrthodonticsBannerSection_JP } from './OrthodonticsBannerSection_JP';

/**
 * 위치 섹션 컴포넌트 (일본어)
 * OrthodonticsLocationSection을 기반으로 복제 (의존성 제거)
 */
export function OrthodonticsLocationSection_JP() {

    const orthodonticTypes = [
        {
            id: 1,
            name: '成人矯正',
            image: '/assets/asset-122.webp',
            description: '歯並びだけでなく、フェイスライン、\n咀嚼機能まで改善します。',
            features: [
                'クリッピーC、インビザラインで痛みを最小化',
                '一般矯正に比べ2〜6ヶ月期間短縮',
                'フェイスラインまでバランスよく改善'
            ],
            alt: ""
        },
        {
            id: 2,
            name: '小児矯正',
            image: '/assets/asset-123.webp',
            description: '顎の骨と顔の形が形成される時期、\n細やかな矯正が必要です。',
            features: [
                '永久歯の正常な萌出を誘導',
                'バランスの取れた顔立ちと輪郭',
                'インビザライン・ファースト対応可能'
            ],
            alt: ""
        },
        {
            id: 3,
            name: '部分矯正（前歯矯正）',
            image: '/assets/asset-124.webp',
            description: '全体矯正が負担な場合、\n必要な部分だけを集中矯正できます。',
            features: [
                '3ヶ月からの短期矯正可能',
                '最小限の装置で負担を軽減',
                '裏側（舌側）矯正で目立たず治療可能'
            ],
            alt: ""
        }
    ];

    return (
        <div className="relative w-full bg-white">
            {/* 첫 번째 섹션: 블랑쉬치과 차별점 - 상위 래퍼 */}
            <div className="relative w-full" style={{ backgroundColor: '#F7F8F8' }}>
                {/* 컬럼 래퍼 */}
                <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                    <div className="relative w-full" style={{ backgroundColor: '#F7F8F8' }}>
                        {/* 1행: Header */}
                        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F7F8F8' }}>
                            <div className="flex flex-col items-start w-full pt-[60px] md:pt-[67px] pb-[67px] pl-[30px] md:pl-[80px]" style={{ backgroundColor: '#F7F8F8' }}>
                                <h2
                                    className="pb-[15px] relative z-10"
                                    style={{ color: '#000', textAlign: 'left', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }}
                                >
                                    ブランシュ歯科の差別化ポイント
                                </h2>
                                <p
                                    className="relative z-10 whitespace-pre-line"
                                    style={{ color: '#000', textAlign: 'left', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }}
                                >
                                    ブランシュ歯科の矯正は、{'\n'}
                                    歯の健康も、仕上がりの美しさも、{'\n'}
                                    どちらも見逃しません
                                </p>
                            </div>
                        </div>

                        {/* 2행: 2컬럼 차별점 섹션 */}
                        <div className="w-full px-[30px] md:px-[80px]">
                            <div className="w-full h-[1px] bg-white"></div>
                        </div>
                        <div className="w-full px-[30px] md:px-[80px] pt-[60px] pb-[60px] md:pb-[100px]" style={{ backgroundColor: '#F7F8F8' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
                                {/* 왼쪽 컬럼 */}
                                <div className="flex flex-col">
                                    <h3
                                        style={{
                                            color: '#000',
                                            fontSize: '22px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.22px',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        歯の健康を第一に考えた、オーダーメイド矯正
                                    </h3>
                                    <p
                                        className="whitespace-pre-line"
                                        style={{
                                            color: 'rgba(0, 0, 0, 0.70)',
                                            fontSize: '17px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: '28px',
                                            letterSpacing: '-0.17px',
                                        }}
                                    >
                                        歯列の乱れや骨格の不調和を改善し、{'\n'}
                                        審美性と健康を同時に高めます。
                                    </p>
                                </div>

                                {/* 오른쪽 컬럼 */}
                                <div className="flex flex-col">
                                    <h3
                                        style={{
                                            color: '#000',
                                            fontSize: '22px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.22px',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        正規品の装置のみ使用
                                    </h3>
                                    <p
                                        className="whitespace-pre-line"
                                        style={{
                                            color: 'rgba(0, 0, 0, 0.70)',
                                            fontSize: '17px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: '28px',
                                            letterSpacing: '-0.17px',
                                        }}
                                    >
                                        「正規品」のインビザラインと第2世代クリッピーC、{'\n'}
                                        高価なインビザライン専用スキャナーを{'\n'}
                                        使用しています。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 두 번째 섹션: 상황별 치아교정 - Fullwidth */}
            <div className="relative w-full" style={{ backgroundColor: '#FEFEFE' }}>
                {/* 1행: Header */}
                <div className="relative w-full overflow-hidden flex-shrink-0 bg-[#FEFEFE]">
                    <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                        <div className="flex flex-col items-start w-full pt-[60px] md:pt-[67px] pb-[77px] pl-[30px] md:pl-[80px] bg-[#FEFEFE]">
                            <h2
                                className="pb-[15px] relative z-10"
                                style={{ color: 'rgb(0, 0, 0)', textAlign: 'left', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}
                            >
                                状況別 歯列矯正
                            </h2>
                            <p
                                className="relative z-10 whitespace-pre-line"
                                style={{ color: 'rgb(0, 0, 0)', textAlign: 'left', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}
                            >
                                状況、年齢に合わせた{'\n'}
                                最適な矯正を設計します
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2행: Brands Grid (배경은 full-width 흰색, 내용만 max-width) */}
                <div className="w-full bg-white">
                    <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 bg-white border-l border-r border-white">
                            {/* 교정 유형 1: 성인교정 */}
                            <div className="relative shrink-0 flex flex-col overflow-hidden bg-black border-b border-white lg:border-b-0 lg:border-r lg:border-white" style={{ height: 'auto', minHeight: '400px' }}>
                                <div className="relative w-full flex flex-col h-full">
                                    {/* 이미지 영역 */}
                                    <div className="relative w-full h-[314px] overflow-hidden bg-black">
                                        <Image
                                            alt={`${orthodonticTypes[0].alt}`}
                                            src={orthodonticTypes[0].image}
                                            fill
                                            className="object-cover min-[1472px]:object-contain"
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    {/* 텍스트 영역 */}
                                    <div className="relative w-full h-[320px] pt-6 pl-[30px] pr-6 pb-[48px] md:pl-[80px] md:pt-8 md:pr-8 md:pb-8 flex flex-col justify-start bg-white">
                                        <h3
                                            className="text-left mb-4 font-['Pretendard']"
                                            style={{ color: 'rgb(0, 0, 0)', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[0].name}
                                        </h3>
                                        <p
                                            className="text-left whitespace-pre-line mb-4 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[0].description}
                                        </p>
                                        <ul
                                            className="space-y-2 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[0].features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="mr-2" style={{ color: 'rgba(0, 0, 0, 0.40)' }}>•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 교정 유형 2: 어린이 교정 */}
                            <div className="relative shrink-0 flex flex-col overflow-hidden bg-white border-b border-white lg:border-b-0 lg:border-r lg:border-white" style={{ height: 'auto', minHeight: '400px' }}>
                                <div className="relative w-full flex flex-col h-full">
                                    {/* 이미지 영역 */}
                                    <div className="relative w-full h-[314px] overflow-hidden bg-black">
                                        <Image
                                            alt={`${orthodonticTypes[1].alt}`}
                                            src={orthodonticTypes[1].image}
                                            fill
                                            className="object-cover min-[1472px]:object-contain"
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    {/* 텍스트 영역 */}
                                    <div className="relative w-full h-[320px] pt-6 pl-[30px] pr-6 pb-[48px] md:pl-[80px] md:pt-8 md:pr-8 md:pb-8 flex flex-col justify-start bg-white">
                                        <h3
                                            className="text-left mb-4 font-['Pretendard']"
                                            style={{ color: 'rgb(0, 0, 0)', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[1].name}
                                        </h3>
                                        <p
                                            className="text-left whitespace-pre-line mb-4 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[1].description}
                                        </p>
                                        <ul
                                            className="space-y-2 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[1].features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="mr-2" style={{ color: 'rgba(0, 0, 0, 0.40)' }}>•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 교정 유형 3: 부분교정(앞니교정) */}
                            <div className="relative shrink-0 flex flex-col overflow-hidden bg-white" style={{ height: 'auto', minHeight: '400px' }}>
                                <div className="relative w-full flex flex-col h-full">
                                    {/* 이미지 영역 */}
                                    <div className="relative w-full h-[314px] overflow-hidden bg-black">
                                        <Image
                                            alt={`${orthodonticTypes[2].alt}`}
                                            src={orthodonticTypes[2].image}
                                            fill
                                            className="object-cover min-[1472px]:object-contain"
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    {/* 텍스트 영역 */}
                                    <div className="relative w-full h-[320px] pt-6 pl-[30px] pr-6 pb-[48px] md:pl-[80px] md:pt-8 md:pr-8 md:pb-8 flex flex-col justify-start bg-white">
                                        <h3
                                            className="text-left mb-4 font-['Pretendard']"
                                            style={{ color: 'rgb(0, 0, 0)', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[2].name}
                                        </h3>
                                        <p
                                            className="text-left whitespace-pre-line mb-4 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[2].description}
                                        </p>
                                        <ul
                                            className="space-y-2 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.17px', opacity: 1, transform: 'none' }}
                                        >
                                            {orthodonticTypes[2].features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="mr-2" style={{ color: 'rgba(0, 0, 0, 0.40)' }}>•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Section (inside this section, at bottom) */}
            <OrthodonticsBannerSection_JP />
        </div>
    );
}
