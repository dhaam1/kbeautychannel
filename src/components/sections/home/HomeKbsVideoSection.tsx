'use client';

import { HomeVimeoIframe } from './HomeVimeoIframe';

const VIMEO_ID = '1166199422';

function buildPlayerUrl(videoId: string): string {
  const params = new URLSearchParams({
    dnt: '1',
    playsinline: '1',
    autopause: '0',
    pip: '0',
    badge: '0',
    portrait: '0',
    byline: '0',
    title: '0',
  });

  return `https://player.vimeo.com/video/${videoId}?${params}`;
}

export function HomeKbsVideoSection() {
  return (
    <section className="w-full bg-white">
      <div className="w-full mx-auto max-w-content">
        {/* 텍스트 영역 */}
        <div className="px-[30px] md:px-[80px] pt-[60px] md:pt-[80px] pb-[30px] md:pb-[40px]">
          <h2
            className="text-[24px] md:text-[28px]"
            style={{
              color: '#000',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
            }}
          >
            생로병사의 비밀 출현
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[17px]"
            style={{
              color: 'rgba(0, 0, 0, 0.70)',
              fontWeight: 400,
              lineHeight: '1.6',
              letterSpacing: '-0.17px',
            }}
          >
            KBS「생로병사의 비밀」100세 시대, 구강 건강의 모든 것〉 편에
            <br className="hidden md:inline" />{' '}
            김태형 대표원장님이 함께하셨습니다.
          </p>
        </div>

        {/* 비디오 영역 */}
        <div className="px-[30px] md:px-[80px] pb-[60px] md:pb-[80px]">
          <HomeVimeoIframe
            src={buildPlayerUrl(VIMEO_ID)}
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: '16/9' }}
            title="KBS 생로병사의 비밀 - 블랑쉬치과 김태형 대표원장"
            rootMargin="300px"
          />
        </div>
      </div>
    </section>
  );
}
