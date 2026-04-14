'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { Link } from '@/i18n/routing';
import { useBanners } from '@/hooks/useBanners';
import { ASSETS } from '@/constants/assets';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { BannerMetadata } from '@/lib/firebase/types';

/** 렌더 함수 외부에 정의 — 리렌더 시 컴포넌트 identity 유지 */
function BannerItem({
  banner,
  fallbackSrc,
  alt,
  style,
  className,
}: {
  banner?: BannerMetadata;
  fallbackSrc: string;
  alt: string;
  style: any;
  className?: string;
}) {
  const isLink = !!banner?.linkUrl;

  const content = (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <Image
        src={banner?.downloadUrl || fallbackSrc}
        alt={alt}
        width={260}
        height={214}
        className="object-cover w-full h-full transition-transform hover:scale-110 duration-500"
        unoptimized={!!banner?.downloadUrl}
      />
    </div>
  );

  return (
    <motion.div
      className={cn('absolute', isLink && 'cursor-pointer', className)}
      style={{ ...style, zIndex: 11 }}
      whileHover={isLink ? { y: -5 } : {}}
    >
      {isLink && banner?.linkUrl ? (
        banner.linkUrl.startsWith('http') ? (
          <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer nofollow" className="block w-full h-full">
            {content}
          </a>
        ) : (
          <Link href={banner.linkUrl as any} className="block w-full h-full">
            {content}
          </Link>
        )
      ) : (
        content
      )}
    </motion.div>
  );
}

export function HeroBannerImages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const locale = useLocale();
  const id01 = locale === 'kr' ? 'hero_banner_01' : `hero_banner_01_${locale}`;
  const id02 = locale === 'kr' ? 'hero_banner_02' : `hero_banner_02_${locale}`;

  const { banners } = useBanners([id01, id02]);

  useEffect(() => {
    if (containerRef.current) {
      const section = containerRef.current.closest('section');
      if (section) {
        sectionRef.current = section;
        requestAnimationFrame(() => setIsReady(true));
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: isReady ? (sectionRef as RefObject<HTMLElement>) : undefined,
    offset: ['start start', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
  const x2 = useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const banner01 = banners.find((b: BannerMetadata) => b.id === id01);
  const banner02 = banners.find((b: BannerMetadata) => b.id === id02);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10">
      <div className="relative w-full h-full mx-auto max-w-content">
        {/* 데스크톱: 왼쪽 세로 2장 */}
        <BannerItem
          banner={banner01}
          fallbackSrc={ASSETS.HERO.BANNER_01}
          alt="Hero Banner 01"
          className="hidden md:block"
          style={{
            width: '260px',
            height: '214px',
            top: '234px',
            left: '80px',
            x: isReady ? x1 : -100,
            opacity: isReady ? opacity1 : 0,
          }}
        />
        <BannerItem
          banner={banner02}
          fallbackSrc={ASSETS.HERO.BANNER_02}
          alt="Hero Banner 02"
          className="hidden md:block"
          style={{
            width: '260px',
            height: '214px',
            top: '476px',
            left: '80px',
            x: isReady ? x2 : -100,
            opacity: isReady ? opacity2 : 0,
          }}
        />

        {/* 모바일: 왼쪽 세로 1컬럼 (30% 아래로) */}
        <BannerItem
          banner={banner01}
          fallbackSrc={ASSETS.HERO.BANNER_01}
          alt="Hero Banner 01"
          className="block md:hidden"
          style={{
            width: '165px',
            height: '136px',
            top: '104px',
            left: '12px',
            x: isReady ? x1 : -100,
            opacity: isReady ? opacity1 : 0,
          }}
        />
        <BannerItem
          banner={banner02}
          fallbackSrc={ASSETS.HERO.BANNER_02}
          alt="Hero Banner 02"
          className="block md:hidden"
          style={{
            width: '165px',
            height: '136px',
            top: '252px',
            left: '12px',
            x: isReady ? x2 : -100,
            opacity: isReady ? opacity2 : 0,
          }}
        />
      </div>
    </div>
  );
}
