'use client';

import React from 'react';
import { FAQSection, FAQItem } from '@/components/sections/common';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 FAQ 섹션 컴포넌트
 */
export function WhiteningFAQSection() {
  const t = useTranslations('whitening.faq');

  const items: FAQItem[] = [0, 1, 2, 3, 4].map((index) => ({
    question: t.rich(`items.${index}.question`, {
      br: () => <br className="md:hidden" />
    }) as any, // Cast to any because the generic structure might mismatch ReactNode vs strict types, but it's safe for children
    answer: index === 3 ? t.rich(`items.${index}.answer`, {
      ul: (chunks: any) => <ul className="list-disc list-inside mt-4 space-y-2 ml-4">{chunks}</ul>,
      li: (chunks: any) => <li>{chunks}</li>
    }) as any : t(`items.${index}.answer`)
  }));
  return (
    <FAQSection
      items={items}
      smallTitle={t('label')}
      mainTitle={t.raw('title')}
      backgroundColor="#F7F8F8"
      showQuestionNumber={true}
    />
  );
}
