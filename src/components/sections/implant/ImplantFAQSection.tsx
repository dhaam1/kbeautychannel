'use client';

import { useTranslations } from 'next-intl';
import { FAQSection, FAQItem } from '@/components/sections/common';

/**
 * 임플란트 FAQ 섹션 컴포넌트
 */
export function ImplantFAQSection() {
  const t = useTranslations('implant.faq');
  const faqData = t.raw('items') as Array<{ question: string; answer: string }>;

  const FAQ_DATA: FAQItem[] = faqData.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <FAQSection
      items={FAQ_DATA}
      smallTitle={t('title')}
      mainTitle={t('mainTitle')}
      variant="highlighted"
      backgroundColor="white"
    />
  );
}
