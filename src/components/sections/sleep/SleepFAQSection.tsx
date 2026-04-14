'use client';

import { useTranslations } from 'next-intl';
import { FAQSection, FAQItem } from '@/components/sections/common';

/**
 * 수면 치료 FAQ 섹션 컴포넌트
 */
export function SleepFAQSection() {
  const t = useTranslations('solution.sleep.faq');

  const FAQ_DATA: FAQItem[] = [
    {
      question: t('items.q1.question'),
      questionMobile: t('items.q1.questionMobile'),
      answer: t('items.q1.answer'),
    },
    {
      question: t('items.q2.question'),
      questionMobile: t('items.q2.questionMobile'),
      answer: t('items.q2.answer'),
    },
    {
      question: t('items.q3.question'),
      questionMobile: t('items.q3.questionMobile'),
      answer: t('items.q3.answer'),
    },
    {
      question: t('items.q4.question'),
      questionMobile: t('items.q4.questionMobile'),
      answer: t('items.q4.answer'),
    },
    {
      question: t('items.q5.question'),
      questionMobile: t('items.q5.questionMobile'),
      answer: t('items.q5.answer'),
    },
    {
      question: t('items.q6.question'),
      questionMobile: t('items.q6.questionMobile'),
      answer: t('items.q6.answer'),
    },
  ];

  return (
    <FAQSection
      items={FAQ_DATA}
      smallTitle={t('smallTitle')}
      mainTitle={t('mainTitle')}
      backgroundColor="white"
    />
  );
}
