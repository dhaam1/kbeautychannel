import { NaverMap } from '@/components/ui/NaverMap';
import { getTranslations } from 'next-intl/server';
import { MotionFadeUp } from '@/components/ui/MotionFadeUp';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * 정보 레이블 행 컴포넌트
 *
 * @description
 * SVG 아이콘과 텍스트를 함께 표시하는 작은 레이블 컴포넌트입니다.
 *
 * 레이아웃:
 * - 너비: 211px, 높이: 38px
 * - SVG 아이콘 (21px × 19px) + 텍스트
 * - 검은색 테두리
 */
const InfoLabelRow = ({ text, tag }: { text: string; tag: 'h2' | 'p' }) => {
  const Tag = tag;
  return (
    <div className="flex w-[211px] h-[38px] justify-center px-4 items-center gap-[5px] border border-white">
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
      <Tag
        style={{
          color: '#000000',
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

/**
 * 블랑쉬치과 지도 섹션 컴포넌트
 *
 * @description
 * 블랑쉬치과의 위치를 지도로 보여주는 섹션입니다.
 *
 * 레이아웃 구조:
 * - 2단 그리드 레이아웃 (모바일: 세로, 데스크톱: 가로)
 *
 * 1. 좌측 영역: 지도 이미지
 *    - 높이: 406px (모바일), 694px (데스크톱)
 *
 * 2. 우측 영역: 위치 정보 및 텍스트 콘텐츠
 *    - 주소 및 연락처 정보
 *    - 높이: 406px (모바일), 694px (데스크톱)
 *
 * @returns {JSX.Element} 지도 섹션 컴포넌트
 */
export async function AboutMapSection() {
  const t = await getTranslations('aboutMap');

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-visible bg-white"
    >
      {/* 상단 영역 (col) */}
      <div
        className="flex flex-col items-start w-full mx-auto pl-[30px] md:pl-[80px] pr-0 pt-[60px] md:pt-[80px] pb-0 overflow-visible"
        style={{ maxWidth: '1472px' }}
      >
        <MotionFadeUp
          as="h2"
          delay={0.1}
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {t('category')}
        </MotionFadeUp>
        <MotionFadeUp
          as="p"
          className="overflow-visible whitespace-pre-line"
          delay={0.2}
          style={{
            color: '#000',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.35px',
            marginTop: '10px',
          }}
        >
          {t('title')}
        </MotionFadeUp>
        <MotionFadeUp
          as="p"
          className="mt-[24px] md:mt-[62px] whitespace-pre-line"
          delay={0.3}
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '26px',
            letterSpacing: '-0.18px',
          }}
        >
          {t('subtitle')}
        </MotionFadeUp>
      </div>

      {/* 그리드 컨테이너 */}
      <div className="w-full px-[30px] md:px-[80px] pt-[40px] md:pt-[50px] pb-[60px] md:pb-[100px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
        {/* 메인 그리드 */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto h-auto overflow-visible"
          style={{ maxWidth: '1472px', border: '1px solid #fff', background: '#FEFEFE' }}
        >
          <div
            className="flex items-start md:items-center justify-start md:justify-center w-full bg-white py-[60px] md:py-0 pl-0 md:pl-0 order-2 md:order-1 border-r-0 md:border-r border-white"
          >
            <div className="relative flex flex-col items-start w-full px-[30px] md:px-[60px]">
              {/* 진료 시간 타이틀 */}
              <h3
                style={{
                  color: '#000',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '26px',
                  letterSpacing: '-0.2px',
                }}
              >
                {t('hours.title')}
              </h3>

              {/* 진료 시간 테이블 */}
              <div className="w-full mt-[20px]">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow className="border-t border-b border-white bg-black">
                      <TableHead
                        className="h-[44px] px-0 text-center font-normal text-white border-r-0 bg-black"
                        style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}
                      >
                        {t('hours.day')}
                      </TableHead>
                      <TableHead
                        className="h-[44px] px-0 text-center font-normal text-white border-l-0 bg-black"
                        style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}
                      >
                        {t('hours.time')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#F3F3F6' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.mon')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:30-19:00</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#FEFEFE' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.tue')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:30-21:00({t('hours.night')})</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#F3F3F6' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.wed')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:30-21:00({t('hours.night')})</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#FEFEFE' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.thu')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:30-19:00</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#F3F3F6' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.fri')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:30-19:00</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#FEFEFE' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.sat')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:00-14:00({t('hours.noLunch')})</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-white" style={{ backgroundColor: '#F3F3F6' }}>
                      <TableCell className="py-[12px] px-0 text-center text-black border-b border-white" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>{t('hours.sun')}</TableCell>
                      <TableCell className="py-[12px] px-0 text-center text-black border-b border-white" style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.16px' }}>10:00-16:00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 점심 시간 타이틀 */}
              <p
                className="mt-[60px]"
                style={{
                  color: '#000',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '26px',
                  letterSpacing: '-0.14px',
                }}
              >
                {t('hours.lunchTitle')}
              </p>

              {/* 점심 시간 내용 */}
              <p
                className="whitespace-pre-line"
                style={{
                  color: '#000',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.14px',
                }}
              >
                {t('hours.lunchInfo')}
              </p>
            </div>
          </div>

          <div
            className="relative overflow-hidden w-full bg-white h-[406px] md:h-[694px] order-1 md:order-2"
          >
            {/* 네이버 지도 */}
            <NaverMap className="w-full h-full" />
          </div>
        </div>

        {/* 하단 그리드 */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto h-auto overflow-visible"
          style={{ maxWidth: '1472px', background: '#FEFEFE' }}
        >
          {/* 왼쪽 열 - 주소 */}
          <div
            className="flex flex-col items-start justify-start w-full bg-white pt-[60px] md:pt-[20px] pr-[30px] md:pr-[60px] pl-0 order-2 md:order-1"
          >
            <h3
              style={{
                color: '#000',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '26px',
                letterSpacing: '-0.2px',
                paddingLeft: '13px',
              }}
            >
              {t('addressLabel')}
            </h3>
            <div className="flex flex-row items-stretch gap-[12px] mt-[8px]">
              <div className="w-[1px] bg-white self-stretch" />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    color: '#fff',
                    backgroundColor: '#000',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.14px',
                    padding: '0 4px',
                  }}
                >
                  {t('addressValue')}
                </span>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.14px',
                    marginTop: '16px',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{t('parkingLabel')}</span><br />
                  {t('parking')}
                </p>
              </div>
            </div>
          </div>
          {/* 오른쪽 열 - 오시는 방법 */}
          <div
            className="flex flex-col items-start justify-start w-full bg-white pt-[60px] md:pt-[20px] pr-0 md:pr-[60px] pl-0 order-1 md:order-2"
          >
            <h3
              style={{
                color: '#000',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '26px',
                letterSpacing: '-0.2px',
                paddingLeft: '13px',
              }}
            >
              {t('directionsLabel')}
            </h3>
            <div className="flex flex-row items-stretch gap-[12px] mt-[8px]">
              <div className="w-[1px] bg-white self-stretch" />
              <p
                className="text-[14px] md:text-[16px] whitespace-pre-line"
                style={{
                  color: '#000',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.16px',
                }}
              >
                {t('directions')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
