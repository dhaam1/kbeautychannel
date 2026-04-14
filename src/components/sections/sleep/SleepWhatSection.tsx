'use client';

import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 수면 치료 첫 번째 섹션 컴포넌트
 * 검정색 배경, 흰색 텍스트, 3개 컬럼 구조
 */
export function SleepWhatSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const descriptionMotion = fadeUp({ delay: 0.2 });
  const columnMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

  return (
    <section className="hidden lg:block relative w-full h-full" style={{ backgroundColor: '#000' }}>
      <div className="relative w-full max-w-[1472px] h-full mx-auto px-[30px] md:px-[80px] py-[60px] md:py-[70px]">
        <div className="relative w-full h-full flex flex-col">
          {/* 상단 텍스트 영역 */}
          <div>
            <motion.p
              className="whitespace-pre-line"
              style={{
                color: 'rgb(255, 255, 255)',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
                marginBottom: 0,
              }}
              {...labelMotion}
            >
              치과 수면치료
            </motion.p>
            <motion.p
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: 'rgb(255, 255, 255)',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginTop: '17px',
                marginBottom: 0,
              }}
              {...titleMotion}
            >
              편안한 치과 수면치료.
            </motion.p>
            <motion.p
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: 'rgb(255, 255, 255)',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
              }}
              {...descriptionMotion}
            >
              치과치료가 무서워 미뤄오셨다면,{'\n'}
              수면치료가 답이 될 수 있습니다.
            </motion.p>
          </div>

          {/* 하단 3개 컬럼 영역 */}
          <div className="mt-[100px]">
            <div className="flex flex-col md:flex-row">
              {/* 컬럼 1: 의식하진정법 */}
              <motion.div className="flex-1 pr-0 md:pr-[30px]" {...columnMotion(0)}>
                <h3
                  style={{
                    color: '#FFF',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  의식하진정법
                </h3>
                <p
                  style={{
                    color: '#FFF',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  의식이 있는 상태에서 수면을 유도하는 치료로 몸에 무리가 가지 않습니다.
                </p>
              </motion.div>

              {/* 구분선 1 */}
              <div className="hidden md:block w-[1px] bg-white/30" />

              {/* 컬럼 2: 통증 완화 */}
              <motion.div className="flex-1 px-0 md:px-[30px] mt-[40px] md:mt-0" {...columnMotion(1)}>
                <h3
                  style={{
                    color: '#FFF',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  통증 완화
                </h3>
                <p
                  style={{
                    color: '#FFF',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  수면 중에 치료가 진행되어 통증에 대한 기억이 남지 않습니다.
                </p>
              </motion.div>

              {/* 구분선 2 */}
              <div className="hidden md:block w-[1px] bg-white/30" />

              {/* 컬럼 3: 다양한 치료 적용 */}
              <motion.div className="flex-1 pl-0 md:pl-[30px] mt-[40px] md:mt-0" {...columnMotion(2)}>
                <h3
                  style={{
                    color: '#FFF',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  다양한 치료 적용
                </h3>
                <p
                  style={{
                    color: '#FFF',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  임플란트, 사랑니, 신경치료 등 대부분의 진료에 적용 가능하고 동시에 많은 치료도 가능합니다.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <section className="lg:hidden relative w-full overflow-hidden bg-white pt-[60px] pb-[60px] px-[30px] md:pt-[70px] md:pb-[60px] md:px-20">
        <div className="flex flex-col">
          {/* 상단 텍스트 영역 */}
          <div>
            <p
              className="whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
                marginBottom: 0,
              }}
            >
              치과 수면치료
            </p>
            <p
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: '#000',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginTop: '17px',
                marginBottom: 0,
              }}
            >
              편안한 치과 수면치료.
            </p>
            <p
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
              }}
            >
              치과치료가 무서워 미뤄오셨다면,{'\n'}
              수면치료가 답이 될 수 있습니다.
            </p>
          </div>

          {/* 하단 3개 컬럼 영역 */}
          <div className="mt-[60px]">
            <div className="flex flex-col gap-[40px]">
              {/* 컬럼 1: 의식하진정법 */}
              <div>
                <h3
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  의식하진정법
                </h3>
                <p
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  의식이 있는 상태에서 수면을 유도하는 치료로 몸에 무리가 가지 않습니다.
                </p>
              </div>

              {/* 컬럼 2: 통증 완화 */}
              <div>
                <h3
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  통증 완화
                </h3>
                <p
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  수면 중에 치료가 진행되어 통증에 대한 기억이 남지 않습니다.
                </p>
              </div>

              {/* 컬럼 3: 다양한 치료 적용 */}
              <div>
                <h3
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                  }}
                >
                  다양한 치료 적용
                </h3>
                <p
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  임플란트, 사랑니, 신경치료 등 대부분의 진료에 적용 가능하고 동시에 많은 치료도 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
