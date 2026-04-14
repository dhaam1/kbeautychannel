'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

const BRAND_IMAGES = [
  '/assets/implant/implant-5.webp',
  '/assets/implant/implant-6.webp',
  '/assets/plus/megazen.webp',
];

export function ImplantRecommendationSection() {
  const t = useTranslations('implant.recommendation');
  const { fadeUp } = useResponsiveAnimation();

  const brandsDataRaw = t.raw('brands');
  const brandsData = Array.isArray(brandsDataRaw)
    ? (brandsDataRaw as Array<{
        name: string;
        description: string;
        features: string[];
        alt: string;
      }>)
    : [];

  if (brandsData.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="w-full bg-black">
        <div
          className="flex flex-col items-start w-full pt-[67px] pb-[77px] pl-[30px] md:pl-[80px]"
          style={{ maxWidth: '1472px', margin: '0 auto' }}
        >
          <motion.h2
            className="pb-[8px] text-left text-white text-[18px] font-normal leading-[38px] tracking-[-0.18px]"
            {...fadeUp({ delay: 0.1 })}
          >
            {t('label')}
          </motion.h2>
          <motion.p
            className="whitespace-pre-line text-left text-white text-[28px] font-medium leading-normal tracking-[-0.28px]"
            {...fadeUp({ delay: 0.15 })}
          >
            {t('title')}
          </motion.p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="w-full bg-white">
        <div
          className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 border border-black"
          style={{ maxWidth: '1472px' }}
        >
          {brandsData.map((brand, index) => (
            <div
              key={index}
              className="relative shrink-0 flex flex-col overflow-hidden bg-white lg:border-r lg:border-black lg:last:border-r-0"
            >
              {/* 이미지 */}
              <div className="relative w-full h-[200px] md:h-[314px] overflow-hidden bg-black">
                <Image
                  alt={brand.alt}
                  src={BRAND_IMAGES[index]}
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* 텍스트 */}
              <div className="w-full flex-1 pl-[30px] pr-6 pt-6 pb-[48px] md:pl-[80px] md:pr-8 md:pt-8 md:pb-[48px] flex flex-col justify-center bg-white">
                <motion.h3
                  className="text-left mb-4 text-black text-[22px] font-medium leading-normal tracking-[-0.22px]"
                  {...fadeUp({ delay: 0.2 + index * 0.15 })}
                >
                  {brand.name}
                </motion.h3>
                <motion.p
                  className="text-left whitespace-pre-line mb-4 text-black/70 text-[18px] font-normal leading-[28px] tracking-[-0.18px]"
                  {...fadeUp({ delay: 0.25 + index * 0.15 })}
                >
                  {brand.description}
                </motion.p>
                <motion.ul
                  className="space-y-2 text-black/70 text-[18px] font-normal leading-[28px] tracking-[-0.18px]"
                  {...fadeUp({ delay: 0.3 + index * 0.15 })}
                >
                  {brand.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-black/40">•</span>
                      {feature}
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
