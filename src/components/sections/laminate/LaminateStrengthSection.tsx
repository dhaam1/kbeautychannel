'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

import Image from 'next/image';

interface LaminateStrengthCase {
  id: number;
  treatmentType: string;
  treatmentPeriod: string;
  quote: string;
  patientName: string;
  image: string;
  reviewTitle: string;
  reviewContent: string;
}

interface LaminateStrengthCardProps {
  caseItem: LaminateStrengthCase;
  labelTreatmentPeriod: string;
}
function LaminateStrengthCard({ caseItem, labelTreatmentPeriod }: LaminateStrengthCardProps) {
  return (
    <div
      className="relative flex flex-col flex-shrink-0 w-full md:w-[320px] xl-custom:w-[300px] md:h-[535px] xl-custom:h-[485px]"
      style={{
        borderRadius: '0px',
      }}
    >
      <div
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] border border-white border-b-0 bg-gray-100 overflow-hidden"
        style={{
          borderRadius: '0px',
        }}
      >
        <Image
          src={caseItem.image}
          alt={caseItem.treatmentType}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #005F7A 0%, #005F7A 100%), radial-gradient(105.45% 105.45% at 50% 105.45%, #D1E9FF 22.12%, #6A97C2 49.52%, #074787 65.38%, #000 100%)',
            mixBlendMode: 'overlay',
            opacity: 0.1,
          }}
        />
      </div>

      <div
        className="relative flex flex-col px-[20px] pt-[20px] pb-[60px] border border-white bg-white w-full md:h-[285px] xl-custom:h-[265px]"
       
      >
        <h3
          style={{
            color: '#262626',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.2px'
          }}
          className="mb-[32px] whitespace-pre-line"
        >
          {caseItem.treatmentType}
        </h3>
        {caseItem.treatmentPeriod && (
          <div
            style={{
              color: '#7D7D7D',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.16px'
            }}
            className="flex items-center gap-2 mb-4"
          >
            <span>{labelTreatmentPeriod}</span>
            <span className="text-[#999999]">|</span>
            <span>{caseItem.treatmentPeriod}</span>
          </div>
        )}
        <p
          style={{
            color: '#262626',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.18px'
          }}
          className="flex-grow whitespace-pre-line"
        >
          {caseItem.quote}
        </p>
        {caseItem.patientName && (
          <p
            style={{
              color: '#262626',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.18px'
            }}
          >
            {caseItem.patientName}
          </p>
        )}
      </div>
    </div>
  );
}

export function LaminateStrengthSection() {
  const translations = useTranslations('solution.laminate.strength');
  const { fadeUp } = useResponsiveAnimation();
  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

  let rawCases;
  try {
    rawCases = translations.raw('cases');
  } catch (error) {
    rawCases = [];
  }
  const cases = Array.isArray(rawCases) ? (rawCases as LaminateStrengthCase[]) : [];
  const sectionTitle = translations('header.title.default');
  const sectionSubtitleLines = translations.raw('header.subtitle.desktop') as string[] || [];
  const periodLabel = translations('labels.treatmentPeriod');

  return (
    <section className="w-full bg-black">
      <div
        className="mx-auto w-full px-[30px] md:px-[80px] max-w-content"
      >
        <div>
          <SectionHeading
            label={sectionTitle}
            title={sectionSubtitleLines}
            align="left"
            dark={true}
            className="pt-[60px] md:pt-[67px] pb-[70px]"
            labelClassName="text-[18px] font-normal tracking-[-0.18px]"
            titleClassName="text-[28px] md:text-[28px] font-medium tracking-[-0.28px]"
          />
        </div>

        <div className="relative pb-20 xl-custom:pb-[100px]">
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl-custom:grid-cols-4 gap-[30px] justify-items-stretch md:justify-items-stretch xl-custom:justify-items-center"
            style={{ position: 'relative', zIndex: 50 }}
          >
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                className="w-full"
                {...cardMotion(index)}
              >
                <LaminateStrengthCard
                  caseItem={caseItem}
                  labelTreatmentPeriod={periodLabel}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
