import { getTranslations } from 'next-intl/server';
import { MotionFadeUp, MotionClipReveal } from '@/components/ui/MotionFadeUp';

/**
 * 연혁 항목 인터페이스
 */
interface HistoryItem {
  year: string;
  description: React.ReactNode;
}

/**
 * 숫자 SVG 컴포넌트
 */
function NumberSVG({ width, height, viewBox, paths }: { width: number; height: number; viewBox: string; paths: string[] }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {paths.map((path, index) => (
        <path key={index} d={path} fill="black" />
      ))}
    </svg>
  );
}

/**
 * 연혁 항목 컴포넌트
 */
function HistoryItemComponent({
  year,
  description,
}: {
  year: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-stretch">
      {/* 상단 가로선 (세로선) 컨테이너 */}
      <div className="w-[1px] mr-[20px] md:mr-[44px] shrink-0 relative">
        <MotionClipReveal
          className="absolute top-0 left-0 w-full h-full bg-[#FFF]"
        />
      </div>

      <div className="flex flex-col pt-10 md:pt-14 pb-0 justify-end h-auto md:h-[272px] overflow-visible">
        {/* 제목 (연도) */}
        <h3 className="text-[28px] font-normal text-[#FFF] bodoni-moda leading-normal tracking-[-0.28px] mb-[20px]">
          {year}
        </h3>

        {/* 설명 */}
        <div className="text-[18px] font-normal text-[#FFF] font-['Pretendard'] leading-[32px] tracking-[-0.18px]">
          {description}
        </div>
      </div>
    </div>
  );
}

/**
 * 블랑쉬치과 연혁 섹션 컴포넌트
 *
 * @description
 * 블랑쉬치과의 연혁을 보여주는 섹션입니다.
 *
 * 레이아웃:
 * - 왼쪽 상단: 절대 위치로 배치된 텍스트 블록
 * - 가로 구분선
 * - 연혁 항목들
 *   * 데스크톱: 가로 배치 (flex-row)
 *   * 모바일/태블릿: 세로 배치 (flex-col)
 */
export async function AboutHistorySection() {
  const t = await getTranslations('aboutHistory');

  const historyItems: HistoryItem[] = [
    {
      year: t('items.0.year'),
      description: (
        <ul className="list-disc list-outside pl-[1.2em] space-y-0">
          {(t.raw('items.0.description') as string[]).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      ),
    },
    {
      year: t('items.1.year'),
      description: (
        <ul className="list-disc list-outside pl-[1.2em] space-y-0">
          {(t.raw('items.1.description') as string[]).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      ),
    },
    {
      year: t('items.2.year'),
      description: (
        <ul className="list-disc list-outside pl-[1.2em] space-y-0">
          {(t.raw('items.2.description') as string[]).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      ),
    },
    {
      year: t('items.3.year'),
      description: (
        <ul className="list-disc list-outside pl-[1.2em] space-y-0">
          {(t.raw('items.3.description') as string[]).map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section
      className="relative w-full overflow-visible py-[60px] md:pt-[70px] md:pb-[100px] lg:pt-[70px] lg:pb-[100px] px-[30px] md:px-0"
    >
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[2px]"
        style={{ backgroundImage: "url('/assets/about/about-35.webp')" }}
      />
      <div className="absolute inset-0 bg-black/60 md:bg-black/40 z-0" /> {/* 오버레이: 모바일 60%, 데스크톱 40% */}

      <div className="relative w-full mx-auto z-10" style={{ maxWidth: '1472px' }}>
        {/* 왼쪽 상단 텍스트 블록 (절대 위치) */}
        <div className="absolute top-0 left-0 md:left-[80px] z-10 flex flex-col pl-0">
          {/* 카테고리 텍스트 */}
          <MotionFadeUp
            className="relative inline-block pb-1 mb-2 md:mb-3 lg:mb-4"
            delay={0.1}
          >
            <h2 className="text-[18px] font-normal text-[#FFF] font-['Pretendard'] leading-[30px] tracking-[-0.18px] relative z-10">
              {t('category')}
            </h2>
          </MotionFadeUp>

          {/* 메인 타이틀 */}
          <MotionFadeUp
            className="text-[28px] font-medium text-[#FFF] font-['Pretendard'] leading-[40px] tracking-[-0.28px] mb-[40px] md:mb-[68px] lg:mb-[43px] whitespace-pre-line"
            delay={0.2}
          >
            {t('title')}
          </MotionFadeUp>

        </div>

        {/* 연혁 항목들 컨테이너 */}
        <div className="w-full pt-[235px] md:pt-[160px] lg:pt-[160px] pb-0 md:pb-0 px-0 md:px-[80px]">
          {/* 항목 그리드 */}
          <div className="flex flex-col">
            {historyItems.map((item, index) => (
              <MotionFadeUp
                key={index}
                className="flex-1 min-w-0"
                delay={0.4 + index * 0.1}
              >
                <HistoryItemComponent
                  year={item.year}
                  description={item.description}
                />
              </MotionFadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
