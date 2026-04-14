'use client';

import React from 'react';
import { FAQSection, FAQItem } from '@/components/sections/common';

/**
 * FAQ 데이터 (일본어)
 */
const FAQ_DATA: FAQItem[] = [
  {
    question: <>ホワイトニングの効果は<br className="md:hidden" />どのくらい持続しますか？</>,
    answer: '個人の食習慣や管理によって異なりますが、通常は6ヶ月から1年程度持続します。着色しやすい食品の摂取を控え、丁寧な歯磨きを並行することで持続期間が延びます。',
  },
  {
    question: <>施術後、また以前のように<br className="md:hidden" />黄色くなりますか？</>,
    answer: '歯は生きている組織ですので、時間が経つにつれて徐々に色が戻ることがあります。しかし、施術前ほど完全に暗くなることはなく、定期的なホワイトニングで明るさを維持することができます。',
  },
  {
    question: <>施術は<br className="md:hidden" />何回受ける必要がありますか？</>,
    answer: 'ブランシュ歯科のホワイトニングは、通常1回のご来院（2〜3回の連続施術）でも目に見える効果を実感いただけます。より明るい段階をご希望の場合や着色が強い場合は、1週間間隔での追加施術をお勧めしております。',
  },
  {
    question: <>ホワイトニングの効果がない<br className="md:hidden" />場合もありますか？</>,
    answer: (
      <>
        以下のような場合は、通常のホワイトニングではなく他の治療が必要になることがあります。
        <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
          <li>エナメル質が薄すぎる場合</li>
          <li>神経治療を受けた歯</li>
          <li>レジンや補綴物がある歯</li>
        </ul>
        ブランシュ歯科では施術前の精密診断で、ホワイトニングが適しているか先に確認いたします。
      </>
    ),
  },
  {
    question: <>施術中に<br className="md:hidden" />痛みを感じることはありますか？</>,
    answer: '個人差はありますが、ブランシュ歯科では歯茎保護剤を丁寧に塗布し、患者様の歯の敏感度に合わせて薬剤の濃度と時間を調整します。しみるのを最小限に抑えながら効果を最大化することが、ブランシュのホワイトニングの核心です。',
  },
];

/**
 * 치아미백 FAQ 섹션 컴포넌트 (일본어)
 */
export function WhiteningFAQSection_JP() {
  return (
    <FAQSection
      items={FAQ_DATA}
      smallTitle="よくある質問"
      mainTitle={`ホワイトニングについて、\nよくある質問にお答えします。`}
      backgroundColor="#F7F8F8"
      showQuestionNumber={true}
    />
  );
}
