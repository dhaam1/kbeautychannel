'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 대표원장 섹션
 */
export function WhiteningDirectorSection() {
    const motionEnabled = useMotionEnabled();
    const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
    const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
    const { fadeUp } = useResponsiveAnimation();
    const t = useTranslations('whitening.director');

    const infoBoxRef = useRef<HTMLDivElement>(null);
    const [layerHeight, setLayerHeight] = useState<number>(0);

    useEffect(() => {
        const updateHeight = () => {
            if (infoBoxRef.current) {
                const height = infoBoxRef.current.offsetHeight;
                setLayerHeight(height + 92);
            }
        };
        updateHeight();
        const observer = new ResizeObserver(() => { updateHeight(); });
        if (infoBoxRef.current) observer.observe(infoBoxRef.current);
        return () => { observer.disconnect(); };
    }, []);

    const VIEWPORT_CONFIG = { once: true, amount: 0.3 };

    return (
        <div className="w-full bg-white">
            <section
                className={cn(
                    "relative w-full overflow-hidden",
                    "bg-white",
                    "pt-[60px] pb-[60px] px-[30px] md:pt-[70px] md:pb-[60px] md:px-20 lg:py-0",
                    "h-auto lg:h-[907px]",
                    "lg:flex lg:items-center",
                    "max-w-[1472px] mx-auto"
                )}
            >
                {/* Container */}
                <div className="flex flex-col md:flex-col lg:block">
                    {/* Left Text Block */}
                    <div
                        className={cn(
                            "flex flex-col",
                            "order-1 lg:order-none",
                            "static md:absolute lg:absolute md:left-[80px] lg:left-[80px] lg:top-[70px]",
                            "mb-8 md:mb-8 lg:mb-0"
                        )}
                    >
                        {/* Label */}
                        <H2
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[18px]", "font-normal", "leading-[30px]", "tracking-[-0.18px]", "mb-2"
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                        >
                            {t('label')}
                        </H2>

                        {/* Title */}
                        <Div
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[28px]", "font-medium", "leading-[40px]", "tracking-[-0.28px]", "whitespace-pre-line"
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                        >
                            {t.rich('title', { mobilebr: () => <br className="block md:hidden" /> })}
                        </Div>

                        {/* Description */}
                        <Div
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[18px]", "font-normal", "leading-[26px]", "tracking-[-0.18px]",
                                "mt-[50px]", "whitespace-pre-line"
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
                        >
                            {t('description')}
                        </Div>
                    </div>

                    {/* Doctor Image */}
                    <div className="mx-auto order-2 lg:order-none static lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
                        <Image
                            src="/assets/laminate/laminate-1.webp"
                            alt="대표원장"
                            width={411}
                            height={658}
                            className="object-cover w-[326px] h-[558px] aspect-[163/279] lg:w-[411px] lg:h-[658px] lg:aspect-[411/658]"
                        />
                    </div>

                    {/* Right Info Box */}
                    <div
                        ref={infoBoxRef}
                        className={cn(
                            "flex flex-col",
                            "items-center lg:items-end",
                            "w-full lg:w-auto",
                            "relative md:relative lg:absolute",
                            "lg:bottom-[50px] lg:right-[200px]",
                            "order-3 lg:order-none",
                            "mb-0 md:mb-0 lg:mb-0",
                            "z-10"
                        )}
                    >

                        {/* Signature Block */}
                        <div className="flex flex-row items-end justify-start w-full lg:w-auto gap-0 mt-8 flex-nowrap">
                            {/* Doctor Info */}
                            <div className="text-left font-['Pretendard'] text-[14px] text-gray-500 leading-tight whitespace-pre-line flex-shrink-0">
                                {t('doctorInfo')}
                                <span className="text-black font-semibold mt-1 block h-[20px] flex items-center">김태형 원장</span>
                            </div>

                            {/* Signature Image */}
                            <Image
                                src="/assets/asset-61.webp"
                                alt="김태형 원장 서명"
                                width={147}
                                height={53}
                                className="object-contain flex-shrink-0"
                                style={{ width: '100px', height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Layer */}
                {layerHeight > 0 && (
                    <div
                        className={cn("absolute bottom-0 left-0 right-0 w-full", "z-0", "lg:hidden")}
                        style={{ backgroundColor: '#F3F3F6', height: `${layerHeight}px` }}
                    />
                )}
            </section>
        </div>
    );
}
