'use client';

import Image from 'next/image';

/**
 * Before/After 섹션 컴포넌트 (일본어)
 * OrthodonticsEquipmentSection과 동일한 구조
 */
export function OrthodonticsBeforeAfterSection_JP() {
    return (
        <section
            className="relative w-full flex flex-col items-center justify-center overflow-visible"
            style={{ backgroundColor: '#F7F8F8' }}
        >
            {/* 상단 영역 (제목 및 설명) */}
            <div
                className="flex flex-col items-start w-full mx-auto px-[30px] md:px-[80px] pt-[70px] pb-[70px] overflow-visible"
                style={{ maxWidth: '1472px' }}
            >
                <h2
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                        marginBottom: '12px',
                    }}
                >
                    成人歯列矯正装置
                </h2>
                <p
                    className="whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-1px',
                        marginBottom: '24px',
                    }}
                >
                    ブランシュ歯科が提案する{'\n'}
                    成人オーダーメイド矯正装置
                </p>
                <p
                    className="whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    歯並びを超えて、{'\n'}
                    フェイスラインや咀嚼機能まで。{'\n'}
                    顔全体の調和を取り戻します。
                </p>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
                {/* 카드 컨테이너: 모바일/태블릿 세로, PC 가로 */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch w-full mx-auto overflow-visible gap-[30px] lg:gap-x-[30px] lg:gap-y-0" style={{ maxWidth: '1472px', background: '#F7F8F8' }}>
                    {/* 첫 번째 카드: 인비절라인 */}
                    <div className="flex flex-col w-full lg:h-full">
                        {/* 이미지 */}
                        <div
                            className="relative w-full h-[225px]"
                            style={{ backgroundColor: '#F2F2F2' }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '225px', height: '100%' }}>
                                <Image
                                    src="/assets/asset-95.webp"
                                    alt=""
                                    fill
                                    className="object-contain"
                                    quality={85}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        {/* 텍스트 */}
                        <div
                            className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] lg:flex-1"
                        >
                            <h3
                                style={{
                                    color: '#262626',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.2px',
                                    marginBottom: '16px',
                                }}
                            >
                                インビザライン矯正
                            </h3>
                            <p
                                className="whitespace-pre-line"
                                style={{
                                    color: 'rgba(0, 0, 0, 0.7)',
                                    fontSize: '17px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '28px',
                                    letterSpacing: '-0.17px',
                                }}
                            >
                                誰にも気づかれない透明な矯正。{'\n'}
                                個人に合わせて製作される{'\n'}
                                透明な素材の矯正装置で、{'\n'}
                                取り外しが可能で
                                <br className="md:hidden" />
                                <span className="hidden md:inline"> </span>
                                食事や歯磨きも不自由がありません。
                            </p>
                        </div>
                    </div>

                    {/* 두 번째 카드: 클리피씨 */}
                    <div className="flex flex-col w-full lg:h-full">
                        {/* 이미지 */}
                        <div
                            className="relative w-full h-[225px]"
                            style={{ backgroundColor: '#F2F2F2' }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '225px', height: '100%' }}>
                                <Image
                                    src="/assets/asset-96.webp"
                                    alt=""
                                    width={400}
                                    height={300}
                                    className="object-contain w-full h-full"
                                    quality={85}
                                />
                            </div>
                        </div>
                        {/* 텍스트 */}
                        <div
                            className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] lg:flex-1"
                        >
                            <h3
                                style={{
                                    color: '#262626',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.2px',
                                    marginBottom: '16px',
                                }}
                            >
                                クリッピーC矯正（第2世代）
                            </h3>
                            <p
                                className="whitespace-pre-line"
                                style={{
                                    color: 'rgba(0, 0, 0, 0.7)',
                                    fontSize: '17px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '28px',
                                    letterSpacing: '-0.17px',
                                }}
                            >
                                速くて快適なセラミック矯正。{'\n'}
                                スライディングドア方式の{'\n'}
                                セルフライゲーションシステムで痛みを最小限に抑え、{'\n'}
                                歯の色に近いセラミック素材で
                                <br className="md:hidden" />
                                <span className="hidden md:inline"> </span>
                                自然な見た目を実現します。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
