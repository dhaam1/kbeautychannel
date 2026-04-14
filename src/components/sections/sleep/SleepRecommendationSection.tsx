'use client';

import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 추천 대상 섹션 컴포넌트 (두 번째 섹션)
 * WhiteningLabSection 형식 참고
 */
export function SleepRecommendationSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });
  const footerMotion = fadeUp({ delay: 0.7 });
  const logoSymbolMotion = fadeUp({ delay: 0.8 });

  return (
    <div className="relative w-full bg-white">
      {/* 상단: 추천 대상 헤더 */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
        <div className="flex flex-col items-start w-full pt-[67px] pb-[77px] px-[30px] md:px-[80px] bg-white" style={{ maxWidth: '1472px', margin: '0 auto' }}>
          <motion.p className="pb-[15px] relative z-10" style={{ color: '#000', textAlign: 'left', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }} {...labelMotion}>
            추천 대상
          </motion.p>
          <motion.p className="relative z-10 whitespace-pre-line" style={{ color: '#000', textAlign: 'left', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }} {...titleMotion}>
            치과 공포증이 있다면,<br />
            블랑쉬 치과를 찾아주세요.
          </motion.p>
        </div>
      </div>

      {/* 4개 컬럼: 공포증 종류 */}
      <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* 컬럼 1: 주사 공포 */}
          <motion.div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]" {...cardMotion(0)}>
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
                주사 공포
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
                마취 바늘만 봐도 심장이 두근거린다면
              </p>
            </div>
          </motion.div>

          {/* 컬럼 2: 소리, 냄새 공포 */}
          <motion.div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]" {...cardMotion(1)}>
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
                소리, 냄새 공포
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
                치과 특유의 기계음과 냄새가 견디기 힘들다면
              </p>
            </div>
          </motion.div>

          {/* 컬럼 3: 구역 반사 */}
          <motion.div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]" {...cardMotion(2)}>
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
                구역 반사
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
                입 안에 기구가 닿을 때 심한 구역질이 올라온다면
              </p>
            </div>
          </motion.div>

          {/* 컬럼 4: 장시간 치료 공포 */}
          <motion.div className="flex flex-col pt-[40px] pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]" {...cardMotion(3)}>
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
                장시간 치료 공포
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
                오래 입 벌리고 있는 게 너무 힘들다면
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 하단: 결론 문구 + 로고 */}
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
        <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[100px] bg-white">
          <motion.p 
            className="pb-[79px] relative z-10 whitespace-pre-line" 
            style={{ color: '#000', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.28px' }}
            {...footerMotion}
          >
            블랑쉬치과의 수면 치료 솔루션이 정답입니다.
          </motion.p>
          <motion.div 
            className="relative z-10" 
            style={{ width: '148px', height: '27px' }}
            {...logoSymbolMotion}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="148" height="27" viewBox="0 0 148 27" fill="none">
              <path d="M8.10523 14.0788C4.92576 14.27 2.34345 17.2638 2.34345 20.4489V24.3691C2.34345 25.1933 1.67513 25.8616 0.850251 25.8616H0V26.9978H14.6263V20.2088C14.6263 16.6914 11.669 13.8647 8.10523 14.0788Z" fill="black" />
              <path d="M21.9029 14.0674C18.5124 14.0674 15.7637 16.8162 15.7637 20.2066V26.9981H21.9029C25.2934 26.9981 28.0422 24.2494 28.0422 20.8589V20.2066C28.0422 16.8162 25.2934 14.0674 21.9029 14.0674Z" fill="black" />
              <path d="M14.6263 0H0V1.13614H0.850251C1.67451 1.13614 2.34283 1.80446 2.34283 2.62873V6.54953C2.34283 9.73457 4.92576 12.7284 8.10461 12.919C11.669 13.1337 14.6263 10.307 14.6263 6.78902V0Z" fill="black" />
              <path d="M21.9029 0H15.7637V6.79149C15.7637 10.182 18.5124 12.9307 21.9029 12.9307C25.2934 12.9307 28.0422 10.182 28.0422 6.79149V6.13926C28.0422 2.74877 25.2934 0 21.9029 0Z" fill="black" />
              <path d="M45.9291 21.6707C48.5541 21.6707 50.796 20.4615 50.796 18.102C50.796 15.6534 48.4656 14.3854 45.8703 14.3854H40.4724V21.6707H45.9291ZM45.369 11.6125C48.0231 11.6125 50.0584 10.4033 50.0584 8.10258C50.0584 5.68425 47.7874 4.50417 45.2806 4.50417H40.4724V11.6125H45.369ZM37.3164 1.58398H46.1945C50.8251 1.58398 53.3914 4.29749 53.3914 7.57164C53.3914 9.75481 52.1525 12.0549 49.4687 12.8223V12.8811C52.4477 13.4417 54.1581 15.5358 54.1581 18.3675C54.1581 22.5556 50.3827 24.5909 46.6958 24.5909H37.3164V1.58398Z" fill="black" />
              <path d="M59.4091 0.994141H56.4004V24.5908H59.4091V0.994141Z" fill="black" />
              <path d="M79.6719 8.2202H82.6211V11.0222H82.6806C83.9188 8.75115 85.925 7.74805 88.1373 7.74805C91.0865 7.74805 93.977 9.57664 93.977 14.2963V24.5903H90.9683V15.6231C90.9683 12.438 89.6119 10.5797 87.1639 10.5797C84.4497 10.5797 82.6806 12.792 82.6806 15.8001V24.5903H79.6719V8.2202Z" fill="black" />
              <path d="M109.124 12.371C108.79 10.2689 107.289 7.80041 104.786 7.80041C101.617 7.80041 98.4137 10.8697 98.4137 16.0412C98.4137 21.2794 102.05 24.3494 105.454 24.3494C108.156 24.3494 110.692 22.9812 112.427 19.9781L112.727 20.1451C110.892 23.048 108.624 24.7497 104.753 24.7497C100.349 24.7497 95.7441 21.4799 95.7441 16.0412C95.7441 10.6698 100.349 7.39941 104.753 7.39941C108.456 7.39941 111.46 10.1358 111.793 12.371H109.124Z" fill="black" />
              <path d="M114.066 24.4149V1.05957H116.736V15.3728C117.703 10.9686 120.506 7.39871 124.209 7.39871C126.612 7.39871 129.014 8.66666 129.014 12.2366V24.4149H126.345V13.0373C126.345 9.20008 125.377 7.79908 123.81 7.79908C120.072 7.79908 116.869 13.0373 116.736 18.1091V24.4149H114.066Z" fill="black" />
              <path d="M141.657 14.9403C143.559 14.8066 144.392 13.6723 144.392 12.3041C144.392 10.2689 142.558 7.80041 140.055 7.80041C136.886 7.80041 133.683 10.8697 133.683 16.0412C133.683 17.2757 133.883 18.3766 134.25 19.3778C134.584 17.0424 136.552 15.2404 141.657 14.9403ZM134.517 20.0449C135.785 22.8141 138.32 24.3494 140.723 24.3494C143.426 24.3494 145.961 22.9812 147.696 19.9781L147.996 20.1451C146.161 23.048 143.892 24.7497 140.022 24.7497C135.618 24.7497 131.014 21.4799 131.014 16.0412C131.014 10.6698 135.618 7.39941 140.022 7.39941C143.725 7.39941 147.062 10.1358 147.062 12.371C147.062 13.8728 145.394 15.2404 141.691 15.3407C137.387 15.4743 134.65 17.0758 134.517 20.0449Z" fill="black" />
              <path d="M74.3039 14.027C69.4778 14.1972 64.2438 16.2022 64.2438 21.2319C64.2438 22.5914 64.5836 24.4609 66.7927 24.4609C70.8713 24.4609 73.5904 20.5865 74.3039 16.4398V14.027ZM64.38 13.0753C64.38 8.65695 67.6083 7.19531 71.2111 7.19531C74.5762 7.19531 77.023 8.4874 77.023 12.1242V24.5289H74.3039V18.0376C73.3862 21.2319 70.9054 24.8687 66.2494 24.8687C63.0885 24.8687 61.5254 23.2034 61.5254 20.8247C61.5254 15.7603 69.2402 13.8234 74.3039 13.6873V12.9392C74.3039 9.03072 73.3181 7.60373 70.6671 7.60373C67.9147 7.60373 64.7197 9.03072 64.7197 13.0753H64.38Z" fill="black" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
