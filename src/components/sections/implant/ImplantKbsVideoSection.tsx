'use client';

import { HomeVimeoIframe } from '@/components/sections/home/HomeVimeoIframe';
import { buildVimeoUrl } from '@/lib/vimeoUtils';
import { useLocale } from 'next-intl';

const VIMEO_ID = '1166199422';

export function ImplantKbsVideoSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const isJp = locale === 'jp';
  return (
    <section className="relative w-full overflow-hidden bg-black md:bg-[#988b7e]">
      {/* ── 모바일: 텍스트 위 + 영상 아래 (세로 레이아웃) ── */}
      <div className="md:hidden flex flex-col">
        {/* 텍스트 영역 */}
        <div className="px-[30px] pt-[72px] pb-[40px]">
          <p
            style={{
              color: '#FFF',
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
            }}
          >
            {isEn ? 'KBS Documentary' : isJp ? 'KBSドキュメンタリー' : '생로병사의 비밀'}
          </p>
          <p
            className="mt-5"
            style={{
              color: '#FFF',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '1.7',
              letterSpacing: '-0.18px',
            }}
          >
            {isEn ? <><span style={{fontWeight: 700}}>Chief Director Kim Tae-hyung</span><br />featured on KBS Documentary<br />&lsquo;Secrets of Life and Death&rsquo;</> : isJp ? <>KBS ドキュメンタリー<br />「生老病死の秘密」に<br />キム・テヒョン代表院長が出演しました。</> : <>KBS &lt;생로병사의 비밀&gt;<br />&lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에<br />김태형 대표원장님이 함께하셨습니다.</>}
          </p>
        </div>

        {/* 영상 영역 */}
        <div className="relative w-full" style={{ aspectRatio: '390 / 217' }}>
          <HomeVimeoIframe
            src={buildVimeoUrl(VIMEO_ID)}
            className="absolute inset-0 w-full h-full pointer-events-none"
            title="KBS 생로병사의 비밀 - 블랑쉬치과 김태형 대표원장"
            rootMargin="300px"
          />
        </div>
      </div>

      {/* ── 데스크톱: 영상 풀 배경 + 텍스트 오버레이 ── */}
      <div className="hidden md:block relative h-[819px]">
        {/* 영상 배경 */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute left-0 top-0 w-2/5 h-full z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(270deg, rgba(3, 29, 29, 0.00) 7.69%, rgba(3, 29, 29, 0.60) 68.27%)',
            }}
          />
          <HomeVimeoIframe
            src={buildVimeoUrl(VIMEO_ID)}
            className="absolute top-1/2 left-1/2 pointer-events-none w-[177.78vh] h-full min-w-full min-h-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            title="KBS 생로병사의 비밀 - 블랑쉬치과 김태형 대표원장"
            rootMargin="300px"
          />
        </div>

        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 z-10 w-full pointer-events-none">
          <div className="relative w-full max-w-[1472px] h-full mx-auto">
            <div className="absolute left-[79px] top-1/2 -translate-y-1/2 flex flex-col pointer-events-auto">
              <p
                style={{
                  color: '#FFF',
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  letterSpacing: '-0.28px',
                }}
              >
                {isEn ? 'KBS Documentary' : isJp ? 'KBSドキュメンタリー' : '생로병사의 비밀'}
              </p>
              <p
                className="mt-5"
                style={{
                  color: '#FFF',
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '1.7',
                  letterSpacing: '-0.18px',
                }}
              >
                {isEn ? <><span style={{fontWeight: 700}}>Chief Director Kim Tae-hyung</span><br />featured on KBS Documentary<br />&lsquo;Secrets of Life and Death&rsquo;</> : isJp ? <>KBS ドキュメンタリー<br />「生老病死の秘密」に<br />キム・テヒョン代表院長が出演しました。</> : <>KBS &lt;생로병사의 비밀&gt;<br />&lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에<br />김태형 대표원장님이 함께하셨습니다.</>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
