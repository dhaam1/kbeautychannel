'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/routing';

interface Solution {
  id: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
  image: string;
  featureKeys: string[];
}

const solutions: Solution[] = [
  {
    id: 'laminate',
    titleKey: 'solution.laminate.title',
    descriptionKey: 'solution.laminate.description',
    href: '/special/laminate',
    image: '/assets/laminate/hero-bg.webp',
    featureKeys: ['자연스러운 색상', '내구성 우수', '최소 칼라'] // These could also be translated if needed
  },
  {
    id: 'orthodontics',
    titleKey: 'solution.orthodontics.title',
    descriptionKey: 'solution.orthodontics.description',
    href: '/special/orthodontics',
    image: '/assets/orthodontics/orthodontics_hero.webp',
    featureKeys: ['투명 교정장치', '편안한 착용감', '정확한 치료']
  },
  {
    id: 'whitening',
    titleKey: 'solution.whitening.title',
    descriptionKey: 'solution.whitening.description',
    href: '/special/whitening',
    image: '/assets/whitening/whitening_hero_bg.webp',
    featureKeys: ['안전한 시술', '빠른 효과', '지속성']
  },
  {
    id: 'sleep',
    titleKey: 'solution.sleep.title',
    descriptionKey: 'solution.sleep.description',
    href: '/special/sleep',
    image: '/assets/sleep/sleep_hero.webp',
    featureKeys: ['안전한 마취', '편안한 치료', '전문 의료진']
  },
  {
    id: 'implant',
    titleKey: 'solution.implant.title',
    descriptionKey: 'solution.implant.description',
    href: '/special/implant',
    image: '/assets/implant/implant_hero.webp',
    featureKeys: ['디지털 설계', '정밀 시술', '오래 지속']
  }
];

/**
 * 솔루션 그리드 섹션 컴포넌트
 * 
 * @description
 * 모든 솔루션을 카드 형태로 보여주는 그리드 섹션입니다.
 */
export function SolutionGridSection() {
  const { fadeUp } = useResponsiveAnimation();
  const t = useTranslations();
  const commonT = useTranslations('common');

  return (
    <section className="relative w-full py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          className="text-center mb-16"
          {...fadeUp({ delay: 0.1 })}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            {t('nav.menu.solution')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              {...fadeUp({ delay: 0.2 + index * 0.1 })}
            >
              <I18nLink
                href={solution.href as any}
                className="group block h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <Image
                    src={solution.image}
                    alt={t(solution.titleKey)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-primary transition-colors">
                    {t(solution.titleKey)}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {t(solution.descriptionKey)}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {solution.featureKeys.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    {commonT('ariaLabels.viewDetails')}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </I18nLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
