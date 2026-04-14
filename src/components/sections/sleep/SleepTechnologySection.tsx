'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { Container } from '@/components/layouts/Container';

/**
 * 수면 치료 안전성 섹션 컴포넌트 (세 번째 섹션)
 * LaminateStrengthSection을 기반으로 복제하되, 이미지 레이아웃에 맞춰 4개 컬럼으로 구성
 */
export function SleepTechnologySection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const bodyMotion = fadeUp({ delay: 0.2 });
  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

  const safetyFeatures = [
    {
      id: 1,
      title: '사전 진단 시스템',
      description: '수면 진료 전, 건강 상태를 꼼꼼히 확인해 맞춤 수면 치료 계획을 세웁니다.',
      image: '/assets/about/about-2.webp', // 임시 이미지
    },
    {
      id: 2,
      title: '실시간 모니터링',
      description: '산소포화도, 심박수, 혈압을 실시간 정밀 체크해 안전하게 치료를 이끌어갑니다.',
      image: '/assets/about/about-3.webp', // 임시 이미지
    },
    {
      id: 3,
      title: '약물 조합의 차별화',
      description: '미다졸람+케타민 조합의 최소 용량-최대 진정효과로 호흡 기능은 유지하고 중독성 문제를 차단합니다.',
      image: '/assets/about/about-4.webp', // 임시 이미지
    },
    {
      id: 4,
      title: '전직원 심폐소생술 자격증',
      description: '수면치료도 안심하도록, 전직원이 응급 시 대처 가능한 심폐소생술 자격증을 보유했습니다.',
      image: '/assets/about/about-5.webp', // 임시 이미지
    },
  ];

  return (
    <section className="w-full bg-white">
      <Container>
        <div className="py-[60px] md:py-[80px]">
          {/* 헤더 */}
          <motion.div className="mb-[40px] md:mb-[60px]" {...labelMotion}>
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
              수면 치료 안전성
            </p>
            <h2
              style={{
                color: '#000',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginBottom: '24px',
              }}
            >
              블랑쉬치과는 안전성 높은 수면 치료를 제공합니다.
            </h2>
            <p
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '28px',
                letterSpacing: '-0.18px',
              }}
            >
              환자분의 편안함과 안전을 늘 최우선으로, 잠드는 순간부터 회복까지 모든 과정을 안전하게 설계합니다.
            </p>
          </motion.div>

          {/* 4개 컬럼 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="flex flex-col"
                {...cardMotion(index)}
              >
                {/* 이미지 */}
                <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* 제목 */}
                <h3
                  style={{
                    color: '#000',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.22px',
                    marginBottom: '12px',
                  }}
                >
                  {feature.title}
                </h3>
                {/* 설명 */}
                <p
                  style={{
                    color: 'rgba(0, 0, 0, 0.70)',
                    fontSize: '17px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.17px',
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 하단 주의사항 */}
          <motion.p
            className="mt-[40px] md:mt-[60px]"
            style={{
              color: 'rgba(0, 0, 0, 0.60)',
              fontSize: '14px',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '-0.14px',
            }}
            {...bodyMotion}
          >
            *블랑쉬치과는 중독성과 호흡억제 위험이 있는 프로포폴을 사용하지 않습니다.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
