'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

interface CustomerContentProps {
  count: number;
}

/**
 * 홈 고객 섹션 콘텐츠 컴포넌트
 */
export function HomeCustomerContent({ count }: CustomerContentProps) {
  const t = useTranslations('homeCustomer');
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0 } };
  const numberMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.2 });
  const infoMotion = fadeUp({ delay: 0.3 });

  const achievements = t.raw('achievements') as string[];

  return (
    <div className="relative flex flex-col items-start w-full max-w-[480px] md:max-w-[420px]">
      {/* 라벨 */}
      <motion.div className="flex items-center gap-[6px] py-3" {...labelMotion}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none" className="flex-shrink-0">
          <g clipPath="url(#clip0_2246_279)">
            <path d="M5.61429 9.8241C3.41143 9.95796 1.62429 12.048 1.62429 14.2675V17.0052C1.62429 17.5796 1.16143 18.0459 0.591429 18.0459H0V18.8405H10.1314V14.1034C10.1314 11.6507 8.08286 9.67728 5.61429 9.8241Z" fill="black" />
            <path d="M15.1674 9.81543C12.8189 9.81543 10.916 11.7327 10.916 14.0991V18.8361H15.1674C17.516 18.8361 19.4189 16.9188 19.4189 14.5525V14.0991C19.4189 11.7327 17.516 9.81543 15.1674 9.81543Z" fill="black" />
            <path d="M1.62 1.83523V4.57295C1.62 6.79682 3.40714 8.88682 5.61 9.01636C8.07857 9.1675 10.1271 7.19409 10.1271 4.73705V0H0V0.794545H0.587143C1.15714 0.794545 1.62 1.26091 1.62 1.83523Z" fill="black" />
            <path d="M15.1674 0H10.916V4.73705C10.916 7.10341 12.8189 9.02068 15.1674 9.02068C17.516 9.02068 19.4189 7.10341 19.4189 4.73705V4.28364C19.4189 1.91727 17.516 0 15.1674 0Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_2246_279">
              <rect width="21" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2 className="text-[18px] font-normal leading-normal tracking-[-0.18px] text-black">
          {t('label')}
        </h2>
      </motion.div>

      {/* 숫자 + 날짜 */}
      <motion.div className="relative w-fit mt-2 pb-5" {...numberMotion}>
        <div
          className="prata-regular text-[80px] md:text-[100px] font-normal leading-none tracking-[-0.64px] md:tracking-[-0.96px]"
          style={{ color: '#262626' }}
        >
          {count.toLocaleString()}
        </div>
        <p
          className="absolute bottom-2 right-[-70] text-[12px] font-normal leading-normal tracking-[-0.12px] whitespace-nowrap"
          style={{ color: 'rgba(38, 38, 38, 0.80)' }}
        >
          {t('date')}
        </p>
      </motion.div>

      {/* 타이틀 */}
      <motion.p
        className="text-[20px] md:text-[20px] font-medium leading-[1.4] tracking-[-0.22px] md:tracking-[-0.28px] text-left mt-[30px] pb-[57px] md:pb-[54px] break-keep"
        style={{
          color: '#262626',
          whiteSpace: 'pre-line',
          wordBreak: 'keep-all',
        }}
        {...titleMotion}
      >
        {t('title')}
      </motion.p>

      {/* 성과 목록 */}
      <motion.div
        className="flex flex-col gap-3 md:gap-5 border-l border-black pl-6"
        {...infoMotion}
      >
        {achievements.map((item, index) => (
          <h3
            key={index}
            className="text-[14px] md:text-[16px] font-normal leading-normal tracking-[-0.14px] md:tracking-[-0.16px] whitespace-nowrap"
            style={{ color: '#262626' }}
          >
            {item}
          </h3>
        ))}
      </motion.div>
    </div>
  );
}
