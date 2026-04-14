import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // 지원하는 언어 목록
    locales: ['kr', 'jp', 'en'],

    // 기본 언어: 한국어
    defaultLocale: 'kr',

    // 한국어는 URL 프리픽스 없음 (예: /intro), 일본어는 /ja 붙음 (예: /ja/concept)
    localePrefix: 'as-needed',

    // 브라우저 언어 감지 비활성화 (미들웨어에서 커스텀 처리)
    localeDetection: false,

    alternateLinks: false,

    // URL 경로 매핑 (한국어 <-> 일본어)
    pathnames: {
        // 1. 홈
        '/': '/',

        // 2. 병원 소개
        '/intro': {
            kr: '/intro',
            jp: '/concept',
            en: '/about'
        },

        // 3. 진료 서비스 (상위)
        '/special': {
            kr: '/special',
            jp: '/service',
            en: '/treatments'
        },

        // 4. 임플란트 및 하위 메뉴
        '/special/implant': {
            kr: '/special/implant',
            jp: '/service/implant',
            en: '/treatments/implant'
        },
        '/special/implant/fullarch': {
            kr: '/special/implant/fullarch',
            jp: '/service/implant/fullarch',
            en: '/treatments/implant/fullarch'
        },
        '/special/implant/all': {
            kr: '/special/implant/all',
            jp: '/service/implant/all',
            en: '/treatments/implant/all'
        },
        '/special/implant/incisionless': {
            kr: '/special/implant/incisionless',
            jp: '/service/implant/incisionless',
            en: '/treatments/implant/incisionless'
        },
        '/special/implant/navi': {
            kr: '/special/implant/navi',
            jp: '/service/implant/navi', // navi로 약어 사용 요청 반영
            en: '/treatments/implant/navi'
        },

        // 5. 기타 진료 과목
        '/special/laminate': {
            kr: '/special/laminate',
            jp: '/service/laminate',
            en: '/treatments/laminate'
        },
        '/special/orthodontics': {
            kr: '/special/orthodontics',
            jp: '/service/orthodontics',
            en: '/treatments/orthodontics'
        },
        '/special/whitening': {
            kr: '/special/whitening',
            jp: '/service/whitening',
            en: '/treatments/whitening'
        },
        '/special/sleep': {
            kr: '/special/sleep',
            jp: '/service/sleep',
            en: '/treatments/sleep'
        },

        // 6. 치료 사례
        '/review': {
            kr: '/review',
            jp: '/before-after',
            en: '/cases'
        },

        // 7. 블로그 (WordPress 서브디렉토리 방식: /blog, /blog/ja, /blog/en)
        '/blog': '/blog',

        // 8. 수가표
        '/price': {
            kr: '/price',
            jp: '/menu',
            en: '/pricing'
        },

        // 9. 개인정보처리방침
        '/privacy': {
            kr: '/privacy',
            jp: '/privacy',
            en: '/privacy'
        },
        '/consultation': {
            kr: '/consultation',
            jp: '/consultation',
            en: '/consultation'
        }
    }
});

// Navigation wrappers (useRouter, usePathname, Link 등을 이 설정 기반으로 생성)
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
