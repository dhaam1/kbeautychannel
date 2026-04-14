'use client';

import { useTranslations } from 'next-intl';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 임플란트 대표원장 섹션 (AboutDirectorSection base)
 */
/**
 * 임플란트 대표원장 섹션 (AboutDirectorSection base)
 */
export function ImplantDirectorSection() {
    const t = useTranslations('implant.director');
    const motionEnabled = useMotionEnabled();
    const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
    const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
    const H3 = (motionEnabled ? motion.h3 : 'h3') as typeof motion.h3;
    const Ul = (motionEnabled ? motion.ul : 'ul') as typeof motion.ul;
    const { fadeUp } = useResponsiveAnimation();

    const infoBoxRef = useRef<HTMLDivElement>(null);
    const [layerHeight, setLayerHeight] = useState<number>(0);

    const achievements = t.raw('achievements') as string[];

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
                    "bg-[#FEFEFE]",
                    "pt-[60px] pb-[60px] px-[30px] lg:pt-[70px] lg:pb-[60px] lg:px-20 lg:py-0",
                    "h-auto lg:h-[907px]",
                    "lg:flex lg:items-center",
                    "max-w-[1472px] mx-auto"
                )}
            >
                {/* Container */}
                <div className="flex flex-col lg:block">
                    {/* Left Text Block */}
                    <div
                        className={cn(
                            "flex flex-col",
                            "order-1 lg:order-none",
                            "static lg:absolute lg:left-[80px] lg:top-[70px]",
                            "mb-8 lg:mb-0"
                        )}
                    >
                        {/* Label */}
                        <H2
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[18px] lg:text-[18px]", "font-normal", "leading-[30px]", "tracking-[-0.24px]", "mb-[20px]"
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                        >
                            {t('label')}
                        </H2>

                        {/* Title */}
                        <H3
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[24px] md:text-[28px]", // font-size: 28px (모바일/데스크톱 통일)
                                "font-medium", // font-weight: 500
                                "leading-[40px]", // line-height: 40px
                                "tracking-[-0.28px]", // letter-spacing: -0.28px
                                "italic-none", // font-style: normal
                                "whitespace-pre-line" // <br /> 태그와 함께 줄바꿈 보장
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                        >
                            {t('title')}
                        </H3>

                        {/* Description */}
                        <Div
                            className={cn(
                                "text-left",
                                "text-[#000] font-['Pretendard']",
                                "text-[18px]", // font-size: 18px
                                "font-normal", // font-weight: 400
                                "leading-[26px]", // line-height: 26px
                                "tracking-[-0.18px]", // letter-spacing: -0.18px
                                "italic-none", // font-style: normal (기본값이므로 생략 가능)
                                "mt-[50px]",
                                "whitespace-pre-line",
                                "relative z-20"
                            )}
                            {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
                        >
                            <span className="lg:hidden">{t('description.mobile')}</span>
                            <span className="hidden lg:block">{t('description.desktop')}</span>
                        </Div>
                    </div>

                    {/* Doctor Image */}
                    <div className="mx-auto order-2 lg:order-none static lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
                        <Image
                            src="/assets/laminate/laminate-1.webp" // Reuse Generic Doctor Image
                            alt={t('doctorAlt')}
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
                            "items-start lg:items-start",
                            "w-full lg:w-auto",
                            "relative lg:absolute",
                            "lg:bottom-[50px] lg:right-[80px]",
                            "order-3 lg:order-none",
                            "mb-0 lg:mb-0",
                            "z-10"
                        )}
                    >
                        <div className="flex flex-col items-start lg:items-start w-full lg:w-auto mb-[30px] lg:mb-0">
                            {/* Icon */}
                            <div className="mb-4 lg:mb-0 lg:pb-5" style={{ width: '32px', height: '30.81px', paddingBottom: '6.19px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                                    <path d="M9.24952 16.0662C5.62118 16.2845 2.6743 19.7009 2.6743 23.3356V27.8093C2.6743 28.7499 1.91162 29.5126 0.970288 29.5126H0V30.8091H16.6912V23.0616C16.6912 19.0477 13.3164 15.8219 9.24952 16.0662Z" fill="#61D5CA" />
                                    <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="#61D5CA" />
                                    <path d="M16.6912 0.000488281H0V1.29703H0.970289C1.91092 1.29703 2.67359 2.0597 2.67359 3.00033V7.47468C2.67359 11.1094 5.62118 14.5259 9.24881 14.7434C13.3164 14.9884 16.6912 11.7626 16.6912 7.74797V0.000488281Z" fill="#61D5CA" />
                                    <path d="M24.9943 0.000488281H17.9883V7.75079C17.9883 11.6199 21.1251 14.7568 24.9943 14.7568C28.8634 14.7568 32.0003 11.6199 32.0003 7.75079V7.00648C32.0003 3.13733 28.8634 0.000488281 24.9943 0.000488281Z" fill="#61D5CA" />
                                </svg>
                            </div>

                            {/* Description Text */}
                            <Div
                                className={cn("text-left", "whitespace-pre-line", "font-['Pretendard']")}
                                style={{ color: '#000', fontStyle: 'normal', fontWeight: 500, lineHeight: '28px', letterSpacing: '-0.14px' }}
                                {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
                            >
                                <span className="text-[28px] font-medium block mb-4 pt-[10px]">{t('slogan')}</span>
                                <span className="text-[18px] lg:text-[18px] font-bold block mb-4"><H3>{t('award')}</H3></span>
                                <Ul className="text-[16px] md:text-[16px] space-y-2 list-disc list-inside">
                                    {achievements.slice(1).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </Ul>
                            </Div>
                        </div>

                        {/* Signature Block */}
                        <div className="flex flex-row items-end justify-start w-full lg:w-auto gap-4 lg:gap-[10px] mt-8">
                            {/* Doctor Info */}
                            <div className="text-left font-['Pretendard'] text-[15px] text-gray-500 leading-tight">
                                <span className="whitespace-pre-line">{t('doctorInfo')}</span>
                                <span className="text-black font-semibold mt-1 block h-[20px] flex items-center">{t('doctorName')}</span>
                            </div>

                            {/* Signature Image */}
                            <Image
                                src="/assets/asset-61.webp"
                                alt={t('signatureAlt')}
                                width={147}
                                height={53}
                                className="object-contain"
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
