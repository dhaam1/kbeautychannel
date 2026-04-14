'use client';

import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string | React.ReactNode;
  questionMobile?: string;
  answer: string | React.ReactNode;
}

/**
 * FAQ 섹션 Props
 */
export interface FAQSectionProps {
  // 필수
  items: FAQItem[];
  smallTitle: string;
  mainTitle: string | React.ReactNode;

  // 스타일 옵션
  variant?: 'default' | 'highlighted'; // highlighted = 회색 배경 + 큰 padding
  backgroundColor?: string;
  showQuestionNumber?: boolean; // true면 Q1., Q2. / false면 Q.
  answerTextOpacity?: 'full' | 'muted'; // muted = 70%
}

/**
 * 질문 렌더링 헬퍼
 */
function renderQuestion(faq: FAQItem): React.ReactNode {
  // questionMobile이 있는 경우 (string 기반 줄바꿈)
  if (faq.questionMobile) {
    const parts = faq.questionMobile.split('\n');
    return (
      <span className="flex-1 text-left whitespace-pre-line">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <>
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
              </>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // question이 ReactNode인 경우 (이미 br 태그 포함)
  if (typeof faq.question !== 'string') {
    return (
      <span className="flex-1 text-left whitespace-pre-line">
        {faq.question}
      </span>
    );
  }

  // 일반 string
  return (
    <span className="flex-1 text-left whitespace-pre-line">
      {faq.question}
    </span>
  );
}

/**
 * FAQ 공통 섹션 컴포넌트
 */
export function FAQSection({
  items,
  smallTitle,
  mainTitle,
  variant = 'default',
  backgroundColor = 'white',
  showQuestionNumber = false,
  answerTextOpacity = 'full',
}: FAQSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // variant에 따른 Content 스타일
  const contentStyles = variant === 'highlighted'
    ? 'px-6 py-[50px] bg-[#F3F3F3] text-[18px] leading-[28px] tracking-[-0.18px]'
    : 'px-6 py-5 text-[16px] leading-[26px] tracking-[-0.16px]';

  // answerTextOpacity에 따른 텍스트 색상
  const answerTextColor = answerTextOpacity === 'muted'
    ? 'text-black/70'
    : 'text-[#000]';

  // Q 라벨 생성
  const getQLabel = (index: number) => {
    return showQuestionNumber ? `Q${index + 1}.` : 'Q.';
  };

  // SSR 상태 (hydration 전)
  const FAQContent = !isMounted ? (
    <div className="w-full">
      {items.map((faq, index) => (
        <div
          key={index}
          className={cn(
            'border-[1px] rounded-none mb-4 last:mb-0',
            'border-[#fff]',
            'px-6 py-5'
          )}
        >
          <div
            className={cn(
              'text-[#000]',
              'font-["Pretendard"]',
              'text-[18px]',
              'font-[400]',
              'flex items-start'
            )}
          >
            <span className={cn(
              'pr-4 shrink-0',
              !showQuestionNumber && 'block md:inline'
            )}>
              {getQLabel(index)}
              {!showQuestionNumber && <br className="md:hidden" />}
            </span>
            <h3 className="flex-1 text-left whitespace-pre-line font-normal text-[18px]">
              {renderQuestion(faq)}
            </h3>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className={cn(
            'border-[1px] rounded-none mb-4 last:mb-0',
            'border-[#fff]',
            '[&[data-state=open]]:border-[#fff] [&[data-state=open]]:border-2'
          )}
        >
          <AccordionTrigger
            className={cn(
              'w-full px-6 py-5 text-left hover:no-underline',
              'flex items-start justify-between gap-4',
              'text-[#000] font-["Pretendard"]',
              'text-[18px] font-[400]',
              'leading-[28px]',
              '[&>svg]:text-[#000] [&>svg]:w-5 [&>svg]:h-5',
              '[&>svg]:shrink-0 [&>svg]:mt-[6px]'
            )}
            style={{ fontStyle: 'normal' }}
          >
            <div className="flex items-start flex-1">
              <span
                className={cn(
                  "pr-4 text-[#000] font-['Pretendard'] text-[18px] font-[400] leading-[28px] shrink-0",
                  !showQuestionNumber && 'block md:inline'
                )}
              >
                {getQLabel(index)}
                {!showQuestionNumber && <br className="md:hidden" />}
              </span>
              <span className="text-left whitespace-pre-line">
                {renderQuestion(faq)}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              contentStyles,
              answerTextColor,
              'font-["Pretendard"] font-normal',
              typeof faq.answer === 'string' ? 'whitespace-pre-line' : ''
            )}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section
      className={cn(
        'relative w-full',
        '',
        'pt-[60px] md:pt-[70px]',
        'pb-[60px] md:pb-[100px]',
        'min-h-[600px] md:min-h-[700px]'
      )}
      style={{ backgroundColor }}
    >
      <div
        className={cn(
          'mx-auto w-full relative max-w-content',
          'px-[30px] md:px-[80px]'
        )}
      >
        <div className="flex flex-col md:flex-row relative w-full md:min-h-[600px]">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex flex-col flex-shrink-0 mb-8 md:mb-0 text-left">
            {/* 작은 제목 */}
            <h2
              className={cn(
                'text-[#000] font-["Pretendard"]',
                'font-normal',
                'text-[16px] md:text-[18px]',
                'leading-[24px] md:leading-[30px]',
                'tracking-[-0.16px] md:tracking-[-0.18px]',
                'mb-4 md:mb-8'
              )}
            >
              {smallTitle}
            </h2>

            {/* 큰 제목 */}
            <div
              className={cn(
                'text-[#000] font-["Pretendard"]',
                'text-[28px] font-[500]',
                'leading-normal tracking-[-0.28px]',
                'whitespace-pre-line',
                'pb-[30px] md:pb-0'
              )}
              style={{ fontStyle: 'normal' }}
            >
              {mainTitle}
            </div>
          </div>

          {/* 오른쪽 FAQ 영역 */}
          <div className="w-full md:ml-auto md:w-[600px] md:max-w-[50%] flex-shrink-0">
            {FAQContent}
          </div>
        </div>
      </div>
    </section>
  );
}
