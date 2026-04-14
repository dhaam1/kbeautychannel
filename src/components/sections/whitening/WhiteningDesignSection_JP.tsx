'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 치아미백 설계 섹션 컴포넌트 (일본어)
 */
export function WhiteningDesignSection_JP() {
    const motionEnabled = useMotionEnabled();
    const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
    const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
    const { fadeUp } = useResponsiveAnimation();

    // 공통 텍스트 상수
    const PERSONAL_COLOR = {
        title: "1:1 パーソナルカラーマッチング",
        desc: "無理に白く不自然な歯にするのではなく、患者様の肌色やイメージに合わせて、最適な歯の色をデザインします。"
    };

    const MINIMIZE_STINGING = {
        title: "知覚過敏を最小限に",
        desc: "知覚過敏を引き起こす高濃度は避け、特殊光線を用いて痛みを抑えつつ、ホワイトニング効果を最大限に引き出します。"
    };

    const PROVEN_SAFETY = {
        title: "検証された安全性",
        desc: "食品医薬品安全処承認の安全な薬剤と専門機器、そしてホワイトニングを研究した専門家が最良の結果を生み出します。"
    };

    return (
        <div className="relative w-full bg-white">
            <div className="relative w-full h-auto" style={{ backgroundColor: '#F7F8F8' }}>
                <div className="w-full max-w-[1472px] mx-auto px-[30px] md:px-[80px] pt-[60px] pb-[60px] md:pb-[100px]">
                    {/* Header Text */}
                    <div className="mb-[40px] md:mb-[60px]">
                        <H2
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '30px',
                                letterSpacing: '-0.18px',
                                marginBottom: 0,
                            }}
                            {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                        >
                            歯のホワイトニングもブランシュ歯科で
                        </H2>
                        <P
                            className="whitespace-pre-line mt-[17px]"
                            style={{
                                color: '#000',
                                fontSize: '28px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '-0.28px',
                                marginBottom: 0,
                            }}
                            {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                        >
                            効果は確実に、<br />
                            刺激は最小限に抑えた<br />
                            ブランシュ歯科のホワイトニング
                        </P>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-black mb-[40px] md:mb-[60px]" />

                    {/* Columns */}
                    <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-0">
                        {/* Item 1 */}
                        <div className="flex-1 lg:pr-[30px]">
                            <h3
                                className="whitespace-nowrap"
                                style={{
                                    color: '#000',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.22px',
                                    marginBottom: '12px',
                                }}
                            >
                                {PERSONAL_COLOR.title}
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
                                {PERSONAL_COLOR.desc}
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div className="flex-1 lg:px-[30px] lg:border-l lg:border-r border-transparent">
                            <h3
                                style={{
                                    color: '#000',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.22px',
                                    marginBottom: '12px',
                                }}
                            >
                                {MINIMIZE_STINGING.title}
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
                                {MINIMIZE_STINGING.desc}
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div className="flex-1 lg:pl-[30px]">
                            <h3
                                style={{
                                    color: '#000',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.22px',
                                    marginBottom: '12px',
                                }}
                            >
                                {PROVEN_SAFETY.title}
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
                                {PROVEN_SAFETY.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
