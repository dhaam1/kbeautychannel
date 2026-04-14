'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 치아미백 진료 장비 섹션 컴포넌트 (일본어)
 */
export function WhiteningLocationSection_JP() {
    const motionEnabled = useMotionEnabled();
    const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
    const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
    const { fadeUp } = useResponsiveAnimation();

    const VIEWPORT_CONFIG = {
        once: true,
        amount: 0.3,
    };

    return (
        <section
            className="relative w-full flex flex-col items-center justify-center overflow-visible"
            style={{ backgroundColor: '#F7F8F8' }}
        >
            {/* 상단 영역 (제목 및 설명) */}
            <div
                className="flex flex-col items-start w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[70px] overflow-visible"
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
                    {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                >
                    施術機器
                </h2>
                <P
                    className="whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.28px',
                        marginBottom: '24px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                >
                    食品医薬品安全処承認済みの、<br />
                    専門家用正規ホワイトニングシステムを使用しています。
                </P>
                <P
                    className="whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '28px',
                        letterSpacing: '-0.18px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
                >
                    ブランシュ歯科では、<br />
                    食品医薬品安全処（KFDA）承認済みの<br />
                    正規プロ用高濃度ホワイトニング剤と、<br />
                    最新の特殊光線照射器のみを使用しています。
                </P>
            </div>

            {/* 그리드 컨테이너 */}
            <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
                {/* 메인 그리드 - 이미지+텍스트 쌍 구조 */}
                <div
                    className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto overflow-visible gap-[30px]"
                    style={{ maxWidth: '1472px', background: '#F7F8F8' }}
                >
                    {/* 카드 1: 전문가용 정품 치아미백제 */}
                    <div className="relative flex flex-col w-full bg-white" style={{ height: '600px' }}>
                        {/* 이미지 */}
                        <div className="relative w-full h-[50%] bg-white">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src="/assets/whitening/whitening-2.webp"
                                    alt="KFDA承認 専門家用正規品ホワイトニング剤、高濃度薬剤で歯の深い着色まで改善"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-full"
                                    quality={85}
                                />
                            </div>
                        </div>
                        {/* 텍스트 */}
                        <div
                            className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] h-[50%]"
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
                                専門家用正規品のホワイトニング剤
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
                                歯科専用の高濃度ホワイトニング剤で、自宅では届きにくい歯の深層にある頑固な着色まで効果的に除去します。
                            </p>
                        </div>
                    </div>

                    {/* カード 2: 특수 광선 조사기 */}
                    <div className="relative flex flex-col w-full bg-white" style={{ height: '600px' }}>
                        {/* 이미지 */}
                        <div className="relative w-full h-[50%] bg-white">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src="/assets/whitening/whitening-3.webp"
                                    alt="歯科ホワイトニング専用特殊光照射器、薬剤の活性度を高め手術時間を短縮する装備"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-full"
                                    quality={85}
                                />
                            </div>
                        </div>
                        {/* 텍스트 */}
                        <div
                            className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] h-[50%]"
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
                                特殊光線照射器
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
                                ホワイトニング剤の活性を高め、施術時間を短縮するとともに、薬剤が歯の奥深くまで浸透するのをサポートします。（安全装置を内蔵した最新機器です）
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
