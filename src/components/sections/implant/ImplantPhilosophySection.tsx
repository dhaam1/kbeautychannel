'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ASSETS } from '@/constants/assets';
import dynamic from 'next/dynamic';
import { ANIMATION_DURATION, EASING, ANIMATION_DIRECTION, VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

const SparklesCore = dynamic(
    () => import('@/components/ui/sparkles').then((m) => m.SparklesCore),
    { ssr: false },
);

export function ImplantPhilosophySection() {
    const motionEnabled = useMotionEnabled();
    const MotionDiv = (motionEnabled ? motion.div : 'div') as typeof motion.div;
    const { fadeUp } = useResponsiveAnimation();

    const textRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState<number>(100);

    useEffect(() => {
        const updateHeight = () => {
            if (textRef.current) {
                setLineHeight(textRef.current.offsetHeight);
            }
        };

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const t = useTranslations('implant.philosophy');

    // Hardcoded text for Implant context
    const topTextLines = t.raw('topText') as string[];

    const bottomTextLinesMobile = t.raw('bottomText.mobile') as string[];

    const bottomTextLinesDesktop = t.raw('bottomText.desktop') as string[];

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ backgroundColor: '#FFF' }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/asset-93.webp"
                    alt="Section Background"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            {/* Main Content */}
            <div
                className="relative w-full mx-auto h-[739px] max-w-content"
            >

                {/* Sparkles Removed */}
                {/* <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[800px] h-[181px] aspect-[800/181]"
                    style={{
                        maskImage: 'radial-gradient(circle, white 0%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(circle, white 0%, transparent 90%)'
                    }}
                >
                    <SparklesCore
                        background="transparent"
                        particleColor="#ffffff"
                        particleDensity={160}
                        minSize={1.05}
                        maxSize={1.5}
                        speed={10.5}
                        className="absolute inset-0 opacity-50"
                    />
                </div> */}

                {/* Vertical Line */}
                <div
                    className="hidden md:block absolute z-30 w-[3px] top-[60px] md:top-[80px] lg:top-[96px] left-[30px] md:left-[80px]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.80)',
                        height: `${lineHeight}px`,
                        transition: 'height 0.3s ease-out'
                    }}
                />

                {/* Top Text Slide */}
                <div
                    className="absolute z-20 top-[60px] md:top-[80px] lg:top-[96px] left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0 w-[calc(100%-2rem)] md:w-auto pl-0 md:pl-6 lg:pl-[30px] overflow-hidden"
                >
                    {/* Mobile Text */}
                    <MotionDiv
                        className="block md:hidden text-center"
                        {...(motionEnabled ? {
                            initial: { opacity: 0 },
                            whileInView: { opacity: 1 },
                            viewport: VIEWPORT_CONFIG,
                            transition: { duration: 0.4, delay: 0 },
                        } : {})}
                        style={{
                            color: 'rgba(0, 0, 0, 0.7)',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 200,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                        }}
                    >
                        {topTextLines.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </MotionDiv>
                    {/* Desktop Text */}
                    <MotionDiv
                        ref={textRef}
                        className="hidden md:block text-left"
                        {...(motionEnabled ? {
                            initial: { x: ANIMATION_DIRECTION.TEXT_SLIDE_X * 2, opacity: 0 },
                            whileInView: { x: 0, opacity: 1 },
                            viewport: VIEWPORT_CONFIG,
                            transition: { duration: ANIMATION_DURATION.SLOW, ease: EASING.EASE_OUT },
                        } : {})}
                        style={{
                            color: 'rgba(255, 255, 255, 0.80)',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 200,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                        }}
                    >
                        {topTextLines.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </MotionDiv>
                </div>

                {/* Bottom Big Text */}
                <div
                    className="absolute z-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[30px] lg:right-[80px] bottom-[32px] md:bottom-[48px] lg:bottom-[64px] -translate-y-[20px] md:-translate-y-[30px] w-[calc(100%-2rem)] md:w-auto"
                >
                    {/* Mobile */}
                    <div
                        className="block md:hidden text-center"
                        style={{
                            color: '#FFFFFF',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                        }}
                    >
                        <p>
                            {bottomTextLinesMobile.map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < bottomTextLinesMobile.length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                    {/* Desktop */}
                    <div
                        className="hidden md:block text-left text-[38px]"
                        style={{
                            color: '#FFFFFF',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '46px',
                            letterSpacing: '-0.38px',
                        }}
                    >
                        {bottomTextLinesDesktop.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>

            </div>

            {/* Mobile Gradient */}
            <div
                className="block md:hidden absolute bottom-0 left-0 w-full h-[240px] z-15"
                style={{
                    background: 'linear-gradient(180deg, rgba(3, 29, 29, 0.00) 3.6%, rgba(3, 29, 29, 0.60) 66.86%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            />
        </section>
    );
}
