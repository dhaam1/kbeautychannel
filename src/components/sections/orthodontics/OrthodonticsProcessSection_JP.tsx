'use client';

import Image from 'next/image';
import { Container } from '@/components/layouts/Container';

/**
 * 교정 과정 섹션 컴포넌트 (일본어)
 */
export function OrthodonticsProcessSection_JP() {
    return (
        <section className="relative w-full" style={{ backgroundColor: '#EAEEF1' }}>
            {/* 이미지는 Container 밖에 */}
            <div className="hidden md:block">
                <Image
                    src="/assets/asset-125.webp" // 데스크톱 경로
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                />
            </div>

            {/* 2. 모바일용 이미지 (데스크톱에서 숨김) */}
            <div className="block md:hidden">
                <Image
                    src="/assets/asset-125-mobile.webp" // 모바일용 이미지 경로
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                />
            </div>

            {/* 나머지 요소들은 Container 안에 */}
            <Container className="px-0 md:px-0 lg:px-0">
                <div className="relative w-full h-[692px] mx-auto" style={{ maxWidth: '1472px' }}>
                    <div
                        className="absolute left-[30px] bottom-[40px] md:left-[81px] md:top-[67px] md:bottom-auto z-[20]"
                    >
                        <h2
                            className={`
    whitespace-pre-line 
    /* 모바일 스타일 (기본) */
    text-[#000] text-[28px] tracking-[-0.28px] pb-[430px]
    /* PC 스타일 (md 이상) */
    md:text-[#FFF] md:text-[20px] md:tracking-[-0.2px] md:pb-[30px]
  `}
                            style={{
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                margin: 0,
                            }}
                        >
                            人生で一度きり、{'\n'}
                            しっかり終わらせるべき矯正
                        </h2>
                        <p
                            className={`
    whitespace-pre-line
    /* 모바일 스타일 (기본) */
    text-[#000]
    /* PC 스타일 (md 이상) */
    md:text-[#FFF]
  `}
                            style={{
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '26px',
                                letterSpacing: '-0.18px',
                                margin: 0,
                            }}
                        >
                            矯正は、単に歯を動かすだけではありません。{'\n'}
                            骨格や顎関節、顔全体のバランスまで考慮した、精密な設計が必要です。{'\n'}
                            だからこそ、矯正は矯正歯科専門医に任せるべきなのです。
                        </p>
                    </div>
                    {/* 모바일 블러 레이어 */}
                    {/* 모바일 블러 레이어 (상단 & 하단) */}
                    <div className="md:hidden">
                        {/* 1. 상단 블러: 텍스트 가독성 확보용 */}
                        <div
                            className="absolute top-0 left-0 w-full z-[5]"
                            style={{
                                height: '158px', // 상단 블러 높이 조절
                                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.20), transparent)',
                                backdropFilter: 'blur(15px)',
                            }}
                        />

                        {/* 2. 하단 블러: 기존 레이아웃 유지 */}
                        <div
                            className="absolute bottom-0 left-0 w-full z-[5]"
                            style={{
                                height: '158px',
                                background: 'rgba(255, 255, 255, 0.20)',
                                backdropFilter: 'blur(20px)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
