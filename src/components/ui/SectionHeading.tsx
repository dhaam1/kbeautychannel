'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';

interface SectionHeadingProps {
  /** 섹션 성격을 나타내는 작은 레이블 (예: "편안한 상담") */
  label: string;
  /** 메인 타이틀 (문자열 또는 문자열 배열) */
  title: string | string[];
  /** 정렬 방향 (기본값: 'center') */
  align?: 'left' | 'center';
  /** 다크 모드 여부 (배경이 어두울 때 텍스트를 흰색으로 변경) */
  dark?: boolean;
  /** 컨테이너 추가 클래스 */
  className?: string;
  /** 레이블 추가 스타일 */
  labelClassName?: string;
  /** 타이틀 추가 스타일 */
  titleClassName?: string;
  /** 애니메이션 적용 여부 (기본: false, 옵트인) */
  animate?: boolean;
  /** 리듬 프리셋 (기본: default) */
  rhythm?: 'default' | 'soft';
  /** 레이블 태그 오버라이드 (중복 h2 방지용, 기본: 'h2') */
  labelAs?: 'h2' | 'p' | 'div';
}

/**
 * 섹션 상단에 공통으로 사용되는 헤더 컴포넌트
 * h2(레이블)와 p(타이틀)의 조합으로 구성됩니다.
 */
export function SectionHeading({
  label,
  title,
  align = 'center',
  dark = false,
  className,
  labelClassName,
  titleClassName,
  animate = false,
  rhythm = 'default',
  labelAs = 'h2',
}: SectionHeadingProps) {
  const isLeft = align === 'left';
  const textColor = dark ? 'text-white' : 'text-black';
  const { fadeUp } = useResponsiveAnimation();
  const y = rhythm === 'soft' ? 14 : 20;

  const labelMotion = fadeUp({
    y,
    delay: 0,
    viewport: VIEWPORT_CONFIG,
  });
  const titleMotion = fadeUp({
    y,
    delay: 0.1,
    viewport: VIEWPORT_CONFIG,
  });

  return (
    <div className={cn(
      "flex flex-col",
      isLeft ? "items-start text-left" : "items-center text-center",
      className
    )}>
      {/* 작은 레이블 영역 */}
      {animate ? (
        <motion.p
          {...labelMotion}
          className={cn(
            "text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2",
            textColor,
            labelClassName
          )}
          style={{
            lineHeight: '30px',
            ...(dark && { color: '#FFF' })
          }}
        >
          {label}
        </motion.p>
      ) : (
        React.createElement(
          labelAs,
          {
            className: cn(
              "text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2",
              textColor,
              labelClassName
            ),
            style: {
              lineHeight: '30px',
              ...(dark && { color: '#FFF' })
            },
          },
          label
        )
      )}

      {/* 큰 타이틀 영역 */}
      {animate ? (
        <motion.div
          {...titleMotion}
          className={cn(
            "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line",
            textColor,
            titleClassName
          )}
          style={{
            fontStyle: 'normal',
            lineHeight: 'normal',
            ...(dark && { color: '#FFF' })
          }}
        >
          {Array.isArray(title) ? (
            title.map((line, index, array) => {
              const nextLine = array[index + 1];
              const isNextLineVariation = nextLine && nextLine.trim().startsWith('변화');

              return (
                <React.Fragment key={index}>
                  {line.split('<br />').map((subLine, subIndex, subArray) => {
                    if (subLine.includes('되찾은')) {
                      const parts = subLine.split('되찾은');
                      return (
                        <React.Fragment key={subIndex}>
                          {parts[0]}
                          되찾은
                          <br className="hidden md:block" />
                          {parts[1]}
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    if (subLine.includes('10년 뒤에도 건강한 치아를 목표로 합니다')) {
                      return (
                        <React.Fragment key={subIndex}>
                          10년 뒤에도 건강한 치아를{' '}
                          <br className="block md:hidden" />
                          목표로 합니다
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    if (subLine.includes('블랑쉬치과가 치과 공포증 극복, 도와드립니다')) {
                      return (
                        <React.Fragment key={subIndex}>
                          블랑쉬치과가 치과 공포증{' '}
                          <br className="block md:hidden" />
                          극복, 도와드립니다
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    return (
                      <React.Fragment key={subIndex}>
                        {subLine}
                        {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                      </React.Fragment>
                    );
                  })}
                  {index < array.length - 1 && (
                    isNextLineVariation ? (
                      <br className="block md:hidden" />
                    ) : line.includes('건강한 치아를') ? (
                      <br className="block md:hidden" />
                    ) : (
                      <br />
                    )
                  )}
                </React.Fragment>
              );
            })
          ) : (
            title
          )}
        </motion.div>
      ) : (
        <div
          className={cn(
            "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line",
            textColor,
            titleClassName
          )}
          style={{
            fontStyle: 'normal',
            lineHeight: 'normal',
            ...(dark && { color: '#FFF' })
          }}
        >
          {Array.isArray(title) ? (
            title.map((line, index, array) => {
              const nextLine = array[index + 1];
              const isNextLineVariation = nextLine && nextLine.trim().startsWith('변화');

              return (
                <React.Fragment key={index}>
                  {line.split('<br />').map((subLine, subIndex, subArray) => {
                    if (subLine.includes('되찾은')) {
                      const parts = subLine.split('되찾은');
                      return (
                        <React.Fragment key={subIndex}>
                          {parts[0]}
                          되찾은
                          <br className="hidden md:block" />
                          {parts[1]}
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    if (subLine.includes('10년 뒤에도 건강한 치아를 목표로 합니다')) {
                      return (
                        <React.Fragment key={subIndex}>
                          10년 뒤에도 건강한 치아를{' '}
                          <br className="block md:hidden" />
                          목표로 합니다
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    if (subLine.includes('블랑쉬치과가 치과 공포증 극복, 도와드립니다')) {
                      return (
                        <React.Fragment key={subIndex}>
                          블랑쉬치과가 치과 공포증{' '}
                          <br className="block md:hidden" />
                          극복, 도와드립니다
                          {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                        </React.Fragment>
                      );
                    }
                    return (
                      <React.Fragment key={subIndex}>
                        {subLine}
                        {subIndex < subArray.length - 1 && <br className="block md:hidden" />}
                      </React.Fragment>
                    );
                  })}
                  {index < array.length - 1 && (
                    isNextLineVariation ? (
                      <br className="block md:hidden" />
                    ) : line.includes('건강한 치아를') ? (
                      <br className="block md:hidden" />
                    ) : (
                      <br />
                    )
                  )}
                </React.Fragment>
              );
            })
          ) : (
            title
          )}
        </div>
      )}
    </div>
  );
}
