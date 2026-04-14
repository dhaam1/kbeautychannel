'use client';

import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 수면치료가 가능한 진료 섹션 컴포넌트 (다섯 번째 섹션)
 * WhiteningLabSection 형식 참고
 */
export function SleepProcessSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

  const treatments = [
    {
      id: 1,
      title: '수면 임플란트',
      description: '장시간 수술의 피로도 제로,\n다수 식립에 유리',
    },
    {
      id: 2,
      title: '블랑쉬 라미네이트',
      description: '매복 치아 발치의\n공포와 통증 기억 차단',
    },
    {
      id: 3,
      title: '사랑니 발치',
      description: '예민한 신경 자극을\n느끼지 못하게 조절',
    },
    {
      id: 4,
      title: '충치·신경치료',
      description: '구역 반사 걱정 없이\n긴 시술 시간도 편안하게',
    },
  ];

  return (
    <div className="relative w-full bg-white">
      {/* 헤더 */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
        <div className="flex flex-col items-start w-full pt-[67px] pb-[77px] px-[30px] md:px-[80px] bg-white" style={{ maxWidth: '1472px', margin: '0 auto' }}>
          <motion.p className="pb-[15px] relative z-10" style={{ color: '#000', textAlign: 'left', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }} {...labelMotion}>
            수면치료가 가능한 진료
          </motion.p>
          <motion.p className="relative z-10 whitespace-pre-line" style={{ color: '#000', textAlign: 'left', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }} {...titleMotion}>
            이런 진료 시,{'\n'}
            수면 치료를 추천드립니다.
          </motion.p>
        </div>
      </div>

      {/* 4개 컬럼 */}
      <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]"
              {...cardMotion(index)}
            >
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {treatment.title}
                </h3>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {treatment.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
