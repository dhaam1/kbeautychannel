'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ASSETS } from '@/constants/assets';
import { HomeVimeoIframe } from '@/components/sections/home/HomeVimeoIframe';
import { buildVimeoUrl } from '@/lib/vimeoUtils';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
export function HomeTechSection() {
  const translations = useTranslations('tech');
  const { fadeUp } = useResponsiveAnimation();

  const mainTitleLines = translations.raw('mainText.desktop') as string[] || [];
  const topDescriptionLines = translations.raw('description1.default') as string[] || [];
  const bottomDescriptionLines = translations.raw('description2.default') as string[] || [];

  const mobileContentContainerRef = useRef<HTMLDivElement>(null);
  const [mobileContentHeight, setMobileContentHeight] = useState(0);

  const badgeMotion = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0 } };
  const titleMotion = fadeUp({ delay: 0.1 });
  const topDescMotion = fadeUp({ delay: 0.2 });
  const bottomDescMotion = fadeUp({ delay: 0.3 });

  /** 모바일 화면에서 콘텐츠 영역의 높이를 측정하여 하단 블러 레이어 크기 조절 */
  useEffect(() => {
    const updateContentHeight = () => {
      if (mobileContentContainerRef.current) {
        setMobileContentHeight(mobileContentContainerRef.current.offsetHeight);
      }
    };

    // 초기 높이 측정
    updateContentHeight();
    const measurementTimer = setTimeout(updateContentHeight, 100);

    // ResizeObserver로 요소 크기 변경만 감지
    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });

    if (mobileContentContainerRef.current) {
      observer.observe(mobileContentContainerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(measurementTimer);
    };
  }, []);

  const labBadgeTag = (
    <motion.div className="flex justify-start mb-6 md:mb-[13px]" {...badgeMotion}>
      <div className="flex w-fit h-[38px] justify-center items-center gap-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none" className="flex-shrink-0">
          <g clipPath="url(#clip0_tech_tag)">
            <path d="M5.61429 9.8241C3.41143 9.95796 1.62429 12.048 1.62429 14.2675V17.0052C1.62429 17.5796 1.16143 18.0459 0.591429 18.0459H0V18.8405H10.1314V14.1034C10.1314 11.6507 8.08286 9.67728 5.61429 9.8241Z" fill="white" />
            <path d="M15.1674 9.81543C12.8189 9.81543 10.916 11.7327 10.916 14.0991V18.8361H15.1674C17.516 18.8361 19.4189 16.9188 19.4189 14.5525V14.0991C19.4189 11.7327 17.516 9.81543 15.1674 9.81543Z" fill="white" />
            <path d="M1.62 1.83523V4.57295C1.62 6.79682 3.40714 8.88682 5.61 9.01636C8.07857 9.1675 10.1271 7.19409 10.1271 4.73705V0H0V0.794545H0.587143C1.15714 0.794545 1.62 1.26091 1.62 1.83523Z" fill="white" />
            <path d="M15.1674 0H10.916V4.73705C10.916 7.10341 12.8189 9.02068 15.1674 9.02068C17.516 9.02068 19.4189 7.10341 19.4189 4.73705V4.28364C19.4189 1.91727 17.516 0 15.1674 0Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_tech_tag">
              <rect width="21" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2 style={{
          color: '#FFF',
          textAlign: 'center',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          letterSpacing: '-0.18px'
        }}>Blanche Lab</h2>
      </div>
    </motion.div>
  );

  const mainTitleContent = (
    <motion.p
      className="flex flex-col items-start gap-[5px] pb-[39px]"
      style={{
        color: '#FFF',
        fontSize: '28px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        letterSpacing: '-0.28px',
      }}
      {...titleMotion}
    >
      {mainTitleLines.map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.p>
  );

  const topDescriptionContent = (
    <motion.p
      className="max-w-2xl"
      style={{
        color: '#FFF',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '26px',
        letterSpacing: '-0.18px'
      }}
      {...topDescMotion}
    >
      {topDescriptionLines.map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.p>
  );

  const bottomDescriptionContent = (
    <motion.p
      className="max-w-2xl"
      style={{
        color: '#FFF',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '26px',
        letterSpacing: '-0.18px'
      }}
      {...bottomDescMotion}
    >
      {bottomDescriptionLines.map((line, index, array) => (
        <React.Fragment key={index}>
          {line.split('<br />').map((subLine, subIndex, subArray) => (
            <React.Fragment key={subIndex}>
              {subLine}
              {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
            </React.Fragment>
          ))}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.p>
  );

  return (
    <section
      className="relative w-full overflow-hidden text-white h-[calc(100svh-86px)] lg:h-[819px]"
      style={{ background: 'linear-gradient(90deg, #000000 0%, #031D1D 15%, #031D1D 85%, #000000 100%)' }}
    >
      <div
        className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
        style={{
          height: `${mobileContentHeight + 90}px`,
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />

      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full z-0 overflow-hidden"
      >
        <div
          className="hidden md:block absolute left-0 top-0 w-2/5 h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(270deg, rgba(3, 29, 29, 0.00) 7.69%, rgba(3, 29, 29, 0.60) 68.27%)'
          }}
        />
        <HomeVimeoIframe
          src={buildVimeoUrl('1152128812')}
          className="hidden md:block absolute top-1/2 left-1/2 pointer-events-none w-[100vw] h-[56.25vw] min-h-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          title="Tech Section Video - Desktop/Tablet"
          poster={ASSETS.TECH.VIDEO_POSTER}
          rootMargin="300px"
        />
        <HomeVimeoIframe
          src={buildVimeoUrl('1152146678')}
          className="block md:hidden absolute top-1/2 left-1/2 pointer-events-none min-w-full min-h-full w-full h-[213.32%]"
          style={{ transform: 'translate(-50%, -50%) scale(1.2)' }}
          title="Tech Section Video - Mobile"
          poster={ASSETS.TECH.VIDEO_POSTER}
          rootMargin="300px"
        />
      </div>

      <div
        className="absolute inset-0 z-10 w-full pointer-events-none"
      >
        <div className="relative w-full max-w-[1472px] h-full mx-auto">
          <div className="absolute left-[30px] md:left-[81px] top-[60px] md:top-1/2 md:-translate-y-1/2 flex flex-col pointer-events-auto">
            {labBadgeTag}
            {mainTitleContent}
            <div className="hidden md:flex flex-col">
              {topDescriptionContent}
              {bottomDescriptionContent}
            </div>
          </div>
        </div>

        <div
          ref={mobileContentContainerRef}
          className="md:hidden absolute left-[30px] bottom-[60px] flex flex-col pointer-events-auto"
        >
          {topDescriptionContent}
          {bottomDescriptionContent}
        </div>
      </div>
    </section>
  );
}
