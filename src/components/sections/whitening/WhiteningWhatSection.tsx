'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

const InfoLabelRow = ({ text, tag }: { text: string; tag: 'h2' | 'p' }) => {
  const Tag = tag;
  return (
    <div className="flex w-[211px] h-[38px] justify-center px-4 items-center gap-[5px] border border-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none" className="flex-shrink-0">
        <g clipPath="url(#clip0_2246_279)">
          <path d="M5.61429 9.8241C3.41143 9.95796 1.62429 12.048 1.62429 14.2675V17.0052C1.62429 17.5796 1.16143 18.0459 0.591429 18.0459H0V18.8405H10.1314V14.1034C10.1314 11.6507 8.08286 9.67728 5.61429 9.8241Z" fill="black"/>
          <path d="M15.1674 9.81543C12.8189 9.81543 10.916 11.7327 10.916 14.0991V18.8361H15.1674C17.516 18.8361 19.4189 16.9188 19.4189 14.5525V14.0991C19.4189 11.7327 17.516 9.81543 15.1674 9.81543Z" fill="black"/>
          <path d="M1.62 1.83523V4.57295C1.62 6.79682 3.40714 8.88682 5.61 9.01636C8.07857 9.1675 10.1271 7.19409 10.1271 4.73705V0H0V0.794545H0.587143C1.15714 0.794545 1.62 1.26091 1.62 1.83523Z" fill="black"/>
          <path d="M15.1674 0H10.916V4.73705C10.916 7.10341 12.8189 9.02068 15.1674 9.02068C17.516 9.02068 19.4189 7.10341 19.4189 4.73705V4.28364C19.4189 1.91727 17.516 0 15.1674 0Z" fill="black"/>
        </g>
        <defs>
          <clipPath id="clip0_2246_279">
            <rect width="21" height="19" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <Tag
        style={{
          color: '#000',
          textAlign: 'left',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
          letterSpacing: '-0.18px',
        }}
      >
        {text}
      </Tag>
    </div>
  );
};

export function WhiteningWhatSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0.05 } };
  const titleMotion = fadeUp({ delay: 0.2 });
  const bodyMotion = fadeUp({ delay: 0.3 });

  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden bg-white"
    >
      <div
        className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto h-auto max-w-content"
      >
        <div 
          className="flex items-center justify-center relative overflow-hidden w-full bg-white h-[406px] md:h-[694px]"
        >
          <Image
            src="/assets/laminate_model.webp"
            alt="Whitening What Section Image"
            fill
            className="object-cover"
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div 
          className="flex items-start md:items-center justify-start md:justify-center w-full bg-white py-[60px] md:py-0 pl-[30px] md:pl-0"
        >
          <div className="relative flex flex-col items-start w-[300px] md:w-[342px]">
            <motion.div 
              className="flex justify-start pb-[10px]" 
              style={{ width: 150 }}
              {...labelMotion}
            >
              <InfoLabelRow text="치아미백이란" tag="h2" />
            </motion.div>

            <motion.p
              className="text-[28px] font-medium leading-normal tracking-[-0.28px] text-left pb-[86px]"
              style={{
                color: '#262626',
              }}
              {...titleMotion}
            >
              착색의 원인을 지우고,<br />
              투명함을 되찾는 시술입니다
            </motion.p>

            <motion.p
              className="text-left whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
              }}
              {...bodyMotion}
            >
              우리 치아는 커피, 차, 음식물의 색소가
치아 표면의 미세한 구멍(상아세관)으로 스며들어
누렇게 변색됩니다.
노화로 인해 내부 상아질이 짙어지기도 합니다.

블랑쉬치과의 미백은 미백제의 특수 성분이
산소 작용을 일으켜 치아 구조는 손상시키지 않고
착색된 유기물질만 선택적으로 분해합니다.
빛의 투과율을 높여 치아 속부터
맑고 깨끗한 색조를 되찾아줍니다.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
