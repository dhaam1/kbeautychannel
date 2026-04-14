'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as I18nLink } from '@/i18n/routing';
import { useParams, usePathname } from 'next/navigation';
import { ASSETS } from '@/constants/assets';
import { NaverMap } from '@/components/ui/NaverMap';

/**
 * 브레드크럼 아이템 인터페이스
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * 푸터 컴포넌트 Props
 */
interface FooterProps {
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * 푸터 컴포넌트
 * 
 * @description
 * 페이지 하단에 표시되는 푸터 영역입니다.
 * 
 * 레이아웃 구조:
 * - 좌측: 블랑쉬 로고 (다크 모드용 인버트 처리)
 * - 우측: 사업자 정보 (회사명, 대표, 주소, 전화번호, 등록번호, 저작권)
 * - 우측 끝: 네이버 지도 API (grayscale 효과, hover 시 컬러 전환)
 * 
 * @param {FooterProps} props - 컴포넌트 props
 * @param {BreadcrumbItem[]} props.breadcrumbs - 브레드크럼 아이템 배열 (optional)
 * @returns {JSX.Element} 푸터 컴포넌트
 */
const FOOTER_TRANSLATIONS = {
  kr: {
    feeList: "비급여 수가표",
    companyName: "블랑쉬치과의원",
    ceo: "대표원장 : 김태형",
    address: "서울 서초구 강남대로 531 B722빌딩 7층",
    registration: "사업자등록번호 : 847-56-00935",
    phone: "연락처 : 1877-2882",
    copyright: "COPYRIGHT © BLANCHE DENTAL CLINIC."
  },
  jp: {
    feeList: "非保険診療料金表",
    companyName: "ブランシュ歯科医院",
    ceo: "代表院長：キム・テヒョン",
    address: "ソウル特別市江南区ノンヒョンドン B722ビル 7階",
    registration: "事業者登録番号：847-56-00935",
    phone: "連絡先：1877-2882",
    copyright: "COPYRIGHT © BLANCHE DENTAL CLINIC"
  },
  en: {
    feeList: "Non-covered Price List",
    companyName: "Blanche Dental Clinic",
    ceo: "Chief Director: Kim Tae-hyung",
    address: "7F, B722 Bldg, 531 Gangnam-daero, Seocho-gu, Seoul",
    registration: "Business Registration: 847-56-00935",
    phone: "Contact: +82-1877-2882",
    copyright: "COPYRIGHT © BLANCHE DENTAL CLINIC."
  }
};

export function Footer({ breadcrumbs }: FooterProps = {}) {
  const params = useParams();
  const rawPathname = usePathname();

  // Detect locale from URL path
  const detectLocale = (): 'kr' | 'jp' | 'en' => {
    if ((rawPathname as string)?.startsWith('/jp')) {
      return 'jp';
    }
    if ((rawPathname as string)?.startsWith('/en')) {
      return 'en';
    }
    const paramsLocale = params?.locale as string;
    if (paramsLocale === 'jp' || paramsLocale === 'en') {
        return paramsLocale as 'jp' | 'en';
    }
    return 'kr';
  };

  const locale = detectLocale();
  const t = FOOTER_TRANSLATIONS[locale];

  return (
    <footer className="relative bg-[#171717] w-full pt-[60px] lg:pt-[80px] pb-[80px] text-white">
      <div
        className="mx-auto px-[30px] md:px-[80px] lg:px-[80px]"
        style={{ maxWidth: '1472px' }}
      >
        {/* 모바일 레이아웃 */}
        <div className="flex flex-col lg:hidden gap-0">
          {/* 브레드크럼 */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex flex-row items-center gap-[8px]" style={{ paddingBottom: '35px' }}>
              <div className="relative shrink-0" style={{ width: '12.463px', height: '12px', paddingTop: '2px' }}>
                <Image
                  src={ASSETS.FOOTER.ICON}
                  alt=""
                  fill
                  className={(rawPathname as string) === '/' ? "brightness-0 object-contain object-center" : "object-contain object-center"}
                  sizes="12.463px"
                />
              </div>
              <div
                className="flex flex-row items-center gap-[8px] mt-0.5 overflow-hidden"
                style={{
                  color: (rawPathname as string) === '/' ? '#171717' : '#F4F7FE',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  letterSpacing: '-0.16px'
                }}
              >
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={`${item.href}-${index}`}>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="truncate max-w-[120px]" style={{ fontWeight: 'bold' }}>{item.label}</span>
                    ) : (
                      <>
                        <I18nLink
                          href={item.href as any}
                          className="hover:underline truncate max-w-[80px]"
                        >
                          {item.label}
                        </I18nLink>
                        <span className="shrink-0"> &gt; </span>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* 지도 */}
          <div className="flex justify-center" style={{ paddingTop: '35px', paddingBottom: '110px' }}>
            <div className="relative bg-white/5 overflow-hidden border border-white/10 rounded-lg w-full aspect-[330/259]">
              <NaverMap
                lat={37.509425461631}
                lng={127.02177777742}
                address="블랑쉬치과 의원"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* 비급여수가표 및 사업자 정보 */}
          <div className="flex flex-col text-left lg:text-right">
            <I18nLink
              href="/price"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline self-start lg:self-end"
              style={{
                color: '#F4F7FE',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '46px',
                letterSpacing: '-0.16px'
              }}
            >
              {t.feeList}
            </I18nLink>
            <p style={{
              color: '#F4F7FE',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.companyName}
            </p>
            <p style={{
              color: '#F4F7FE',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.ceo}
            </p>
            <p style={{
              color: '#F4F7FE',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.address}
            </p>
            <p style={{
              color: '#F4F7FE',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.phone}
            </p>
            <p style={{
              color: '#BABABA',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.registration}
            </p>
            <p style={{
              color: '#BABABA',
              fontSize: '13px',
              fontWeight: 200,
              lineHeight: '20px',
              letterSpacing: '-0.13px'
            }}>
              {t.copyright}
            </p>
          </div>

          {/* 블랑쉬 로고 */}
          <div className="flex justify-center" style={{ paddingTop: '80px' }}>
            <div className="relative w-full aspect-[4/1]">
              <Image
                src={ASSETS.COMMON.LOGO}
                alt="Blanche Dental Clinic"
                fill
                className="brightness-0 invert object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
          </div>
        </div>

        {/* 데스크톱 레이아웃 */}
        <div className="hidden lg:flex flex-row justify-between items-stretch">
          <div className="flex flex-col self-stretch justify-between">
            <div className="flex flex-row items-center shrink-0 gap-[8px] pb-2">
              <div className="relative" style={{ width: '12.463px', height: '12px', paddingTop: '2px' }}>
                <Image
                  src={ASSETS.FOOTER.ICON}
                  alt=""
                  fill
                  className={(rawPathname as string) === '/' ? "brightness-0 object-contain object-center" : "object-contain object-center"}
                  sizes="12.463px"
                />
              </div>
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div
                  className="flex flex-row items-center gap-[8px] mt-0.5 overflow-hidden"
                  style={{
                    color: (rawPathname as string) === '/' ? '#171717' : '#F4F7FE',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    letterSpacing: '-0.16px'
                  }}
                >
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={`${item.href}-${index}`}>
                      {index === breadcrumbs.length - 1 ? (
                        <span className="truncate max-w-[200px]" style={{ fontWeight: 'bold' }}>{item.label}</span>
                      ) : (
                        <>
                          <I18nLink
                            href={item.href as any}
                            className="hover:underline truncate max-w-[100px]"
                          >
                            {item.label}
                          </I18nLink>
                          <span className="shrink-0"> &gt; </span>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div className="relative w-[240px] h-[60px] md:w-[320px] md:h-[80px]">
              <Image
                src={ASSETS.COMMON.LOGO}
                alt="Blanche Dental Clinic"
                fill
                className="brightness-0 invert object-contain object-left"
                sizes="320px"
              />
            </div>
          </div>

          <div className="flex flex-row items-end gap-[14px]">
            <div className="flex flex-col h-full text-right">
              <I18nLink
                href="/price"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline self-end -mt-[10px]"
                style={{
                  color: '#F4F7FE',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '46px',
                  letterSpacing: '-0.16px'
                }}
              >
                {t.feeList}
              </I18nLink>
              <div className="mt-auto text-right" style={{
                color: '#F4F7FE',
                fontSize: '13px',
                fontWeight: 200,
                lineHeight: '20px',
                letterSpacing: '-0.13px'
              }}>
                <p>{t.companyName}</p>
                <p>{t.ceo}</p>
                <p>{t.address}</p>
                <p>{t.phone}</p>
                <p>{t.registration}</p>
                <p>{t.copyright}</p>
              </div>
            </div>

            <div className="relative w-full max-w-[320px] aspect-[4/3] md:w-[280px] lg:w-[340px] bg-white/5 overflow-hidden border border-white/10 rounded-lg">
              <NaverMap
                lat={37.509425461631}
                lng={127.02177777742}
                address="블랑쉬치과 의원"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
