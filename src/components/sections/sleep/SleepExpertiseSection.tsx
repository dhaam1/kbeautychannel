'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { Container } from '@/components/layouts/Container';

/**
 * 분야별 전문가 협업 섹션 컴포넌트 (네 번째 섹션)
 * 이미지 레이아웃에 맞춰 좌우 2컬럼 구조로 구성
 */
export function SleepExpertiseSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const bodyMotion = fadeUp({ delay: 0.2 });
  const imageMotion = fadeUp({ delay: 0.25 });

  return (
    <section className="w-full bg-white">
      <Container>
        <div className="py-[60px] md:py-[70px]">
          <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[60px] items-center">
            {/* 왼쪽: 텍스트 영역 */}
            <div className="flex-1 flex flex-col">
              <motion.div {...labelMotion}>
                <p
                  style={{
                    color: '#000',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '30px',
                    letterSpacing: '-0.18px',
                    marginBottom: '12px',
                  }}
                >
                  분야별 전문가 협업
                </p>
              </motion.div>
              
              <motion.h2
                className="whitespace-pre-line mb-[24px]"
                style={{
                  color: '#000',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.28px',
                }}
                {...titleMotion}
              >
                한 명의 판단이 아닌,{'\n'}
                분야별 전문의 협업으로{'\n'}
                완성되는 수면치료.
              </motion.h2>
              
              <motion.p
                className="whitespace-pre-line"
                style={{
                  color: '#000',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.18px',
                }}
                {...bodyMotion}
              >
                수면치료는 진정과 치료를{'\n'}
                동시에 고려해야 하는 진료입니다.{'\n'}
                블랑쉬치과는 각 분야 의료진이 협진하여{'\n'}
                환자 상태에 맞는 안전한 치료 계획을 세웁니다.
              </motion.p>
            </div>

            {/* 오른쪽: 의료진 사진 */}
            <motion.div
              className="flex-1 relative w-full aspect-[4/3]"
              {...imageMotion}
            >
              <Image
                src="/assets/about/about-2.webp" // 임시 이미지 - 실제 의료진 사진으로 교체 필요
                alt="블랑쉬치과 의료진"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
