/**
 * 구조화 데이터 (Schema.org JSON-LD) 관련 상수
 *
 * @description
 * Google 리치 검색결과에 필요한 Organization, LocalBusiness 등의
 * 공통 스키마 정보를 중앙에서 관리합니다.
 *
 * 주소, 연락처 등의 정보는 Footer.tsx의 FOOTER_TRANSLATIONS와 일치하도록 유지합니다.
 */

import { getSiteUrl } from '@/lib/utils';

/**
 * 블랑쉬치과 회사 정보 (Footer와 동일하게 유지)
 */
export const BLANCHE_INFO = {
  kr: {
    companyName: '블랑쉬치과의원',
    ceo: '대표원장 : 김태형',
    address: '서울특별시 서초구 강남대로 531, 7층',
    registration: '사업자등록번호 : 847-56-00935',
    phone: '1877-2882',
  },
  jp: {
    companyName: 'ブランシュ歯科医院',
    ceo: '代表院長：キム・テヒョン',
    address: 'ソウル特別市江南区ノンヒョンドン B722ビル 7階',
    registration: '事業者登録番号：847-56-00935',
    phone: '1877-2882',
  },
} as const;

/**
 * 블랑쉬치과 주소 정보 (Schema.org PostalAddress 형식)
 */
export const BLANCHE_ADDRESS = {
  kr: {
    streetAddress: '서울특별시 서초구 강남대로 531, 7층',
    addressLocality: '서초구',
    addressRegion: '서울특별시',
    postalCode: '06030',
    addressCountry: 'KR',
  },
  jp: {
    streetAddress: 'ソウル特別市江南区ノンヒョンドン B722ビル 7階',
    addressLocality: '江南区',
    addressRegion: 'ソウル特別市',
    postalCode: '06030',
    addressCountry: 'KR',
  },
} as const;

/**
 * 블랑쉬치과 연락처 정보
 */
export const BLANCHE_CONTACT = {
  telephone: '1877-2882',
  telephoneInternational: '+82-2-1877-2882',
  email: 'blanchedental@naver.com',
} as const;

/**
 * 블랑쉬치과 위치 좌표 (강남대로 531)
 */
export const BLANCHE_GEO = {
  latitude: 37.5103,
  longitude: 127.0225,
} as const;

/**
 * 블랑쉬치과 영업시간
 */
export const BLANCHE_OPENING_HOURS = [
  'Mo-Fr 10:00-19:00',
  'Sa 10:00-16:00',
] as const;

/**
 * Organization/Dentist 스키마 생성 함수
 *
 * @param locale - 현재 로케일 ('kr' | 'jp')
 * @returns Google 리치 검색결과에 사용되는 Dentist 스키마 객체
 */
export function getDentistSchema(locale: string = 'kr') {
  const siteUrl = getSiteUrl();
  const isJp = locale === 'jp';
  const address = isJp ? BLANCHE_ADDRESS.jp : BLANCHE_ADDRESS.kr;
  const info = isJp ? BLANCHE_INFO.jp : BLANCHE_INFO.kr;

  return {
    '@type': 'Dentist',
    '@id': `${siteUrl}#organization`,
    name: info.companyName,
    url: siteUrl,
    telephone: BLANCHE_CONTACT.telephone,
    email: BLANCHE_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BLANCHE_GEO.latitude,
      longitude: BLANCHE_GEO.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/assets/common/common_logo.png`,
    },
    image: `${siteUrl}/assets/common/og-image.webp`,
    priceRange: '$$',
  };
}

/**
 * 홈페이지용 Dentist 스키마 (getDentistSchema 기반 + 홈페이지 전용 확장 필드)
 *
 * @param locale - 현재 로케일 ('kr' | 'jp')
 * @returns 홈페이지에 사용되는 확장 Dentist 스키마 객체
 */
export function getHomeDentistSchema(locale: string = 'kr') {
  const base = getDentistSchema(locale);
  const siteUrl = getSiteUrl();

  return {
    ...base,
    alternateName: ['Blanche Dental Clinic', 'ブランシュ歯科', '布朗徐牙科'],
    description: locale === 'jp'
      ? 'ブランシュ歯科医院は、韓国江南にあるデンタルクリニックです。ご来院いただく皆様へ真心を尽くす診療を目指します。'
      : '강남 논현의 블랑쉬치과는 무삭제 라미네이트, 임플란트, 교정 등 전문 의료진의 협진 시스템으로 1:1 맞춤 진료를 제공합니다.',
    medicalSpecialty: 'http://schema.org/Dentistry',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '85',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Thursday', 'Friday'],
        opens: '10:30',
        closes: '13:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Thursday', 'Friday'],
        opens: '14:30',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday'],
        opens: '10:30',
        closes: '13:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday'],
        opens: '14:30',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '14:00',
        closes: '16:00',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: '예약', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '남/녀 화장실 구분', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '대기공간', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '무선 인터넷', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '반려동물 동반', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '휠체어 이용가능', value: 'True' },
      { '@type': 'LocationFeatureSpecification', name: '주차가능 (슈퍼카 가능)', value: 'True' },
    ],
    sameAs: [
      'https://blog.naver.com/blanche_clinic',
      'https://blog.naver.com/chika_wang',
      'https://www.threads.com/@dr.chikawang',
      'https://maps.app.goo.gl/2x3TZhQvERn1kRU37?g_st=ipc',
      'https://naver.me/xBwHxjJO',
      'https://booking.naver.com/booking/13/bizes/944957',
      'https://www.youtube.com/@blancheclinic',
      'https://www.youtube.com/@chikawang',
      'https://www.instagram.com/blanche__dental',
      'https://pf.kakao.com/_ggchG/chat',
    ],
  };
}

/**
 * 서비스 ItemList 스키마 (여러 페이지에서 공통 사용)
 *
 * @returns 주요 진료 서비스 ItemList 스키마 객체
 */
export function getServiceItemListSchema() {
  const siteUrl = getSiteUrl();

  return {
    '@type': 'ItemList',
    name: '블랑쉬치과 주요 진료 서비스',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: '무삭제 라미네이트',
          image: `${siteUrl}/img/seo1.webp`,
          url: `${siteUrl}/blanche`,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: '풀아치 임플란트',
          image: `${siteUrl}/img/seo3.webp`,
          url: `${siteUrl}/special/implant/fullarch`,
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: '인비절라인 치아교정',
          image: `${siteUrl}/img/seo4.webp`,
          url: `${siteUrl}/special/orthodontics`,
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: '치아미백',
          image: `${siteUrl}/img/seo5.webp`,
          url: `${siteUrl}/special/whitening`,
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'Service',
          name: '치과 수면 치료',
          image: `${siteUrl}/img/seo6.webp`,
          url: `${siteUrl}/special/sleep`,
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'WebPage',
          name: '의료진 소개',
          image: `${siteUrl}/img/seo7.webp`,
          url: `${siteUrl}/intro`,
        },
      },
    ],
  };
}

/**
 * BreadcrumbList 스키마 생성 헬퍼
 *
 * @param currentUrl - 현재 페이지 URL (@id에 사용)
 * @param items - 브레드크럼 아이템 배열 [{name, item}]
 * @returns BreadcrumbList 스키마 객체
 */
export function getBreadcrumbSchema(
  currentUrl: string,
  items: Array<{ name: string; item: string }>,
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * Service 스키마의 provider로 사용할 간소화된 Dentist 스키마
 *
 * @param locale - 현재 로케일 ('kr' | 'jp')
 * @returns Service provider에 사용되는 Dentist 스키마 객체
 */
export function getServiceProviderSchema(locale: string = 'kr') {
  const siteUrl = getSiteUrl();
  const isJp = locale === 'jp';
  const address = isJp ? BLANCHE_ADDRESS.jp : BLANCHE_ADDRESS.kr;
  const info = isJp ? BLANCHE_INFO.jp : BLANCHE_INFO.kr;

  return {
    '@type': 'Dentist',
    name: info.companyName,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
  };
}
