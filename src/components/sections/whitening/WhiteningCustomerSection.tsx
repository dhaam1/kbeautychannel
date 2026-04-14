'use client';

import Image from 'next/image';
import { QuickLinkButton } from '@/components/ui/QuickLinkButton';
import { useTranslations } from 'next-intl';

const InfoLabelRow = ({ text, tag }: { text: string; tag: 'h2' | 'p' }) => {
  const Tag = tag;
  return (
    <div className="flex w-[211px] h-[38px] justify-center px-4 items-center gap-[5px] border border-white overflow-visible">
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

export function WhiteningCustomerSection() {
  const t = useTranslations('whitening.customer');

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-visible"
      style={{ backgroundColor: '#F7F8F8' }}
    >
      <div
        className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto h-auto overflow-visible max-w-content"
      >
        {/* 좌측: 이미지 (반전) */}
        <div
          className="flex items-center justify-center relative overflow-hidden w-full h-[406px] md:h-[694px] order-1"
          style={{ backgroundColor: '#F7F8F8' }}
        >
          <Image
            src="/assets/whitening/whitening-1.webp"
            alt="블랑쉬 화이트 홈케어 치아미백 제품, 치과 미백 후 효과를 집에서도 오래 유지하도록 설계된 미백 치약"
            fill
            className="object-cover"
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>


        {/* 우측: 홈케어 치아미백 콘텐츠 (반전) */}
        <div
          className="flex items-start md:items-center justify-center w-full h-auto md:h-[694px] pl-[30px] md:pl-[80px] lg:pl-0 py-[60px] md:py-0 order-2 overflow-visible"
          style={{ backgroundColor: '#F7F8F8' }}
        >
          <div className="relative flex flex-col items-start w-full max-w-[500px] overflow-visible whitespace-normal">
            {/* Header Box */}
            <div className="flex justify-start mb-[10px] overflow-visible">
              <InfoLabelRow text={t('label')} tag="h2" />
            </div>

            {/* Main Slogan */}
            <p
              className="text-left mb-[30px] whitespace-pre-line overflow-visible"
              style={{
                color: '#262626',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
              }}
            >
              {t.rich('title', { br: () => <span className="md:hidden"><br /></span> })}
            </p>

            {/* Introductory Paragraph */}
            <p
              className="text-[16px] md:text-[18px] font-normal leading-[26px] md:leading-[30px] tracking-[-0.16px] md:tracking-[-0.18px] text-left mb-[24px] whitespace-pre-line overflow-visible"
              style={{
                color: '#000',
              }}
            >
              {t('intro')}
            </p>

            {/* Bullet Point List */}
            <ul className="flex flex-col gap-[12px] md:gap-[16px] list-none pl-0 overflow-visible">
              <li className="flex items-start overflow-visible">
                <span className="mr-[8px] mt-[6px] text-black">•</span>
                <p
                  className="text-[14px] md:text-[16px] font-normal leading-[26px] tracking-[-0.14px] md:tracking-[-0.16px] text-left whitespace-pre-line overflow-visible"
                  style={{
                    color: '#000',
                  }}
                >
                  {t('list.0')}
                </p>
              </li>
              <li className="flex items-start overflow-visible">
                <span className="mr-[8px] mt-[6px] text-black">•</span>
                <p
                  className="text-[14px] md:text-[16px] font-normal leading-[26px] tracking-[-0.14px] md:tracking-[-0.16px] text-left whitespace-pre-line overflow-visible"
                  style={{
                    color: '#000',
                  }}
                >
                  {t('list.1')}
                </p>
              </li>
              <li className="flex items-start overflow-visible">
                <span className="mr-[8px] mt-[6px] text-black">•</span>
                <p
                  className="text-[14px] md:text-[16px] font-normal leading-[26px] tracking-[-0.14px] md:tracking-[-0.16px] text-left whitespace-pre-line overflow-visible"
                  style={{
                    color: '#000',
                  }}
                >
                  {t('list.2')}
                </p>
              </li>
            </ul>

            {/* 바로가기 버튼 (절대 위치: 오른쪽 30px, 아래 0px) */}
            <div className="absolute right-[30px] bottom-0">
              <QuickLinkButton
                onClick={() => window.open('https://blanche.co.kr/', '_blank', 'noopener,noreferrer')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
