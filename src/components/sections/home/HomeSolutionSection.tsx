'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 홈 솔루션 섹션 컴포넌트
 * 
 * @description
 * 블랑쉬 치과의 주요 진료 프로그램을 소개하는 섹션입니다.
 * StickyScroll 컴포넌트를 사용하여 스크롤에 따라 콘텐츠가 변경됩니다.
 * 데스크톱 전용 (모바일에서 숨김).
 * 
 * @returns {JSX.Element} 솔루션 섹션 컴포넌트
 */
export function HomeSolutionSection() {
  const t = useTranslations('solution');
  const locale = useLocale();
  const isJp = locale === 'jp';
  const { fadeUp } = useResponsiveAnimation();
  const programs = t.raw('programs') as Array<{
    id: number;
    title: string;
    description: string[];
    image: string;
    backgroundColor: string;
    alt: string;
  }>;

  const titleDesktop = t.raw('header.title.desktop') as string[];
  const subtitle = t('header.subtitle.default');

  const content = programs.map((program) => ({
    title: program.title,
    description: program.description.join('\n'),
    content: (
      <div className="relative h-full w-full bg-black">
        <Image
          src={program.image}
          alt={program.alt || program.title}
          fill
          className="object-cover"
          // Right pane is `w-1/2` on `lg`, hidden on smaller breakpoints.
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    ),
  }));

  return (
    <>
      {/* 데스크톱 레이아웃 */}
      <section className="relative w-full bg-black hidden lg:block">
        <div className="relative mx-auto w-full max-w-[1472px]">
          <StickyScroll
            content={content}
            heading={
              <SectionHeading
                label={subtitle}
                title={titleDesktop}
                align="left"
                dark={true}
                titleClassName={isJp ? "!text-[20px] md:!text-[24px]" : undefined}
                labelAs="p"
              />
            }
          />
        </div>
      </section>

      {/* 모바일 레이아웃 */}
      <section className="relative w-full bg-black lg:hidden">
        <div className="relative mx-auto w-full">
          {/* 헤더 */}
          <div className="pt-[60px] pb-[63px] px-[30px] md:px-[80px] lg:px-[30px]">
            <div className="flex flex-col items-start text-left">
              <h2
                className="text-[18px] md:text-[20px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-white"
                style={{ lineHeight: '30px' }}
              >
                {subtitle}
              </h2>
              <div
                className={cn(
                  "font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-white",
                  isJp ? "text-[20px] md:text-[24px]" : "text-[28px] md:text-[32px]"
                )}
                style={{
                  lineHeight: 'normal'
                }}
              >
                {titleDesktop.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < titleDesktop.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* 헤더 하단 구분선 (제거됨) */}

          {/* 프로그램 리스트 */}
          <div className="flex flex-col gap-0 pb-0 md:pb-[80px]">
            {programs.map((program, index) => {
              const descMotion = fadeUp({ delay: 0.2 + index * 0.1 });
              const titleMotion = fadeUp({ delay: 0.25 + index * 0.1 });
              const imageMotion = fadeUp({ delay: 0.3 + index * 0.1 });

              return (
                <div key={program.id} className="flex flex-col">
                  {/* 상단 구분선 (제거됨) */}

                  {/* 설명 텍스트 */}
                  <motion.p
                    className="text-white pt-[60px] px-[30px] md:px-[80px] lg:px-[30px] whitespace-pre-line text-left"
                    style={{
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '30px',
                      letterSpacing: '-0.18px',
                    }}
                    {...descMotion}
                  >
                    {program.description.join('\n')}
                  </motion.p>

                  {/* 제목 + 아이콘 */}
                  <motion.div
                    className="flex flex-row items-center justify-start gap-[6px] px-[30px] md:px-[80px] lg:px-[30px] pb-[30px]"
                    {...titleMotion}
                  >
                    <h3
                      className="text-white"
                      style={{
                        fontSize: '23px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '30px',
                        letterSpacing: '-0.23px',
                      }}
                    >
                      {program.title}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                    >
                      <g clipPath={`clip0_2054_16767_mobile_${index}`}>
                        <path
                          d="M5.88163 10.3411C3.57388 10.482 1.70163 12.682 1.70163 15.0184V17.9002C1.70163 18.5047 1.21673 18.9957 0.619592 18.9957H0V19.832H10.6139V14.8457C10.6139 12.2638 8.46776 10.1866 5.88163 10.3411Z"
                          fill="white"
                        />
                        <path
                          d="M15.8894 10.332C13.429 10.332 11.4355 12.3502 11.4355 14.8411V19.8275H15.8894C18.3498 19.8275 20.3433 17.8093 20.3433 15.3184V14.8411C20.3433 12.3502 18.3498 10.332 15.8894 10.332Z"
                          fill="white"
                        />
                        <path
                          d="M1.69714 1.93182V4.81364C1.69714 7.15454 3.56939 9.35454 5.87714 9.49091C8.46327 9.65 10.6094 7.57273 10.6094 4.98636V0H0V0.836364H0.615102C1.21224 0.836364 1.69714 1.32727 1.69714 1.93182Z"
                          fill="white"
                        />
                        <path
                          d="M15.8894 0H11.4355V4.98636C11.4355 7.47727 13.429 9.49545 15.8894 9.49545C18.3498 9.49545 20.3433 7.47727 20.3433 4.98636V4.50909C20.3433 2.01818 18.3498 0 15.8894 0Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id={`clip0_2054_16767_mobile_${index}`}>
                          <rect width="22" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* 이미지 */}
                  <motion.div
                    className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-black"
                    {...imageMotion}
                  >
                    <Image
                      src={program.image}
                      alt={program.title || program.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>

                  {/* 하단 구분선 */}
                  <div className="w-full h-[1px] bg-white hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
