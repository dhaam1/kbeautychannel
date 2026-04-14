/**
 * 프로젝트 전반에서 사용되는 에셋(이미지, 아이콘 등) 경로 상수
 * 
 * @description
 * 모든 정적 에셋 경로를 중앙에서 관리하여 유지보수성을 높입니다.
 * 섹션별로 그룹화되어 있어 쉽게 찾을 수 있습니다.
 */
export const ASSETS = {
  /** 공통 에셋 (로고, OG 이미지 등) */
  COMMON: {
    /** 메인 로고 SVG */
    LOGO: '/assets/common/logo.svg',
    /** Open Graph 메타 이미지 */
    OG_IMAGE: '/assets/common/og-image.webp',
    /** 기본 OG 이미지 (누락된 페이지용) */
    DEFAULT_OG: '/assets/og/default_og.webp',
  },
  /** 블로그 에셋 */
  BLOG: {
    /** 블로그 Open Graph 메타 이미지 */
    OG_IMAGE: '/assets/og-image.webp',
  },
  /** 히어로 섹션 에셋 */
  HERO: {
    /** 히어로 배경 이미지 */
    BG_MAIN: '/assets/hero/video-poster.webp',
    /** 히어로 비디오 포스터 이미지 */
    VIDEO_POSTER: '/assets/hero/video-poster.webp',
    /** 히어로 배너 이미지 1 */
    BANNER_01: '/assets/hero/banner-01.webp',
    /** 히어로 배너 이미지 2 */
    BANNER_02: '/assets/hero/banner-02.webp',
  },
  /** 모델 섹션 에셋 */
  MODEL: {
    /** 모델 섹션 배경 이미지 */
    BG_MAIN: '/assets/model/bg-main-v2.webp',
    BG_MAIN_MOBILE: '/assets/model/bg-main-mobile.webp',
  },
  /** 브랜드 섹션 에셋 */
  BRAND: {
    /** 브랜드 아이템 이미지 1 (Natural) */
    ITEM_01: '/assets/brand/item-1.png',
    /** 브랜드 아이템 이미지 2 (Masterpieces) */
    ITEM_02: '/assets/brand/item-2.png',
    /** 브랜드 아이템 이미지 3 (Trust) */
    ITEM_03: '/assets/brand/item-3.png',
  },
  /** 매거진 섹션 에셋 */
  MAGAZINE: {
    /** 매거진 포스트 이미지 1 */
    POST_01: '/assets/magazine/post-01.webp',
    /** 매거진 포스트 이미지 2 */
    POST_02: '/assets/magazine/post-02.webp',
    /** 매거진 포스트 이미지 3 */
    POST_03: '/assets/magazine/post-03.webp',
    /** 매거진 포스트 이미지 4 */
    POST_04: '/assets/magazine/post-04.webp',
  },
  /** 치료 전후 섹션 에셋 */
  BEFOREAFTER: {
    /** 치료 전후 사례 이미지 1 */
    CASE_01: '/assets/beforeafter/case-01.webp',
    /** 치료 전후 사례 이미지 2 */
    CASE_02: '/assets/beforeafter/case-02.webp',
    /** 치료 전후 사례 이미지 3 */
    CASE_03: '/assets/beforeafter/case-03.webp',
    /** 치료 전후 사례 이미지 4 */
    CASE_04: '/assets/beforeafter/case-04.webp',
  },
  /** 솔루션 섹션 에셋 */
  SOLUTION: {
    /** 솔루션 아이템 이미지 1 (블랑쉬 라미네이트) */
    ITEM_01: '/assets/solution/item-01.webp',
    /** 솔루션 아이템 이미지 2 (임플란트) */
    ITEM_02: '/assets/solution/item-02.webp',
    /** 솔루션 아이템 이미지 3 (인비절라인 치아교정) */
    ITEM_03: '/assets/solution/item-03.webp',
    /** 솔루션 아이템 이미지 4 (치아미백) */
    ITEM_04: '/assets/solution/item-04.webp',
    /** 솔루션 아이템 이미지 5 (수면마취 치료) */
    ITEM_05: '/assets/solution/item-05.webp',
  },
  /** 헤더 에셋 */
  HEADER: {
    /** 헤더 네비게이션 모델 이미지 */
    NAV_MODEL: '/assets/header/nav-model.webp',
  },
  /** 고객 섹션 에셋 */
  CUSTOMER: {
    /** 고객 섹션 비디오 포스터 이미지 */
    VIDEO_POSTER: '/assets/customer/video-poster.webp',
  },
  /** 테크 섹션 에셋 */
  TECH: {
    /** 테크 섹션 비디오 포스터 이미지 */
    VIDEO_POSTER: '/assets/tech/video-poster.webp',
  },
  /** 푸터 에셋 */
  FOOTER: {
    /** 푸터 아이콘 이미지 */
    ICON: '/assets/footer/icon.webp',
  },
  /** 라미네이트 페이지 에셋 */
  LAMINATE: {
    /** 히어로 배경 이미지 (데스크톱) */
    HERO_BG: '/assets/laminate/hero-bg.webp',
    /** 히어로 배경 이미지 (모바일) */
    HERO_BG_MOBILE: '/assets/laminate/hero-bg-mobile.webp',
    /** What 섹션 이미지 */
    WHAT_IMAGE: '/assets/laminate/laminate-1.webp',
    /** Highlight 섹션 이미지 */
    HIGHLIGHT_IMAGE: '/assets/laminate/laminate-2.webp',
    /** Highlight2 섹션 이미지 */
    HIGHLIGHT2_IMAGE: '/assets/laminate/laminate-3.webp',
    /** Before/After 이미지들 */
    BEFORE_AFTER_IMAGE_01: '/assets/laminate/laminate-4.webp',
    AFTER_IMAGE_01: '/assets/laminate/laminate-5.webp',
  },
  /** 후기 섹션 에셋 */
  REVIEW: {
    CARD_01: '/assets/plus/review01.webp',
    CARD_02: '/assets/plus/review02.webp',
    CARD_03: '/assets/plus/review03.webp',
    CARD_04: '/assets/plus/review04.webp',
    CARD_05: '/assets/plus/review05.webp',
    CARD_06: '/assets/plus/review06.webp',
    CARD_07: '/assets/plus/review07.webp',
    CARD_08: '/assets/plus/review08.webp',
    CARD_09: '/assets/plus/review09.webp',
    CARD_10: '/assets/plus/review10.webp',
    CARD_11: '/assets/plus/review11.webp',
  },
  /** 기타 공통 에셋 */
  MISC: {
    BLOG_OG: '/assets/common/og-image.webp',
  },
} as const;
