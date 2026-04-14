'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { FAQSection, FAQItem } from '@/components/sections/common';

/**
 * 비교 표 컴포넌트
 */
function ComparisonTable() {
  const t = useTranslations('solution.laminate.faq.comparison');
  const headers = t.raw('headers') as string[];
  const rows = t.raw('rows') as string[][];

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <Table className="w-full border-collapse bg-white">
        <TableHeader>
          <TableRow className="border-b border-[#E0E0E0] hover:bg-transparent">
            {headers.map((header, index) => (
              <TableHead key={index} className={cn(
                "px-4 py-3 text-[#000] font-['Pretendard'] text-[16px] font-normal leading-[28px] tracking-[-0.16px] bg-white",
                index === 0 ? "w-[100px] md:w-[120px]" : ""
              )}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-[#E0E0E0] hover:bg-transparent">
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="px-4 py-3 text-[#000] font-['Pretendard'] text-[16px] font-normal leading-[28px] tracking-[-0.16px] bg-white">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * 라미네이트 FAQ 섹션 컴포넌트
 */
export function LaminateFAQSection() {
  const t = useTranslations('solution.laminate.faq');

  const items = t.raw('items') as Array<{
    question: string;
    answer: string;
    answer_p1?: string;
    answer_p2?: string;
  }>;

  const FAQ_DATA: FAQItem[] = items.map((item) => {
    if (item.answer === 'answer_rich_handled_in_component') {
      return {
        question: item.question,
        answer: (
          <div className="flex flex-col gap-[20px]">
            <p className="pt-[15px] text-[18px] font-['Pretendard'] leading-[28px] tracking-[-0.18px]">{item.answer_p1}</p>
            <ComparisonTable />
            <p className="pb-[40px] text-[18px] font-['Pretendard'] leading-[28px] tracking-[-0.18px]">{item.answer_p2}</p>
          </div>
        ),
      };
    }
    return {
      question: item.question,
      answer: item.answer,
    };
  });

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
