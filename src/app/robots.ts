import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/utils';

/**
 * 검색 엔진 로봇(Googlebot 등)이 우리 사이트의 어떤 부분을 긁어갈 수 있는지 알려주는 설정 파일입니다.
 * 
 * 주요 기능:
 * - 모든 검색 로봇(*)에게 사이트 내용을 수집할 수 있도록 허용합니다.
 * - 보안이 필요한 경로나 검색 결과에 나올 필요가 없는 시스템 파일 경로 등은 수집을 금지(disallow)합니다.
 * - 검색 엔진이 우리가 만든 '사이트맵(sitemap.xml)'을 쉽게 찾을 수 있도록 주소를 알려주는 역할을 합니다.
 */
export default function robots(): MetadataRoute.Robots {
    const siteUrl = getSiteUrl();

    return {
        rules: {
            userAgent: '*', // 모든 검색 엔진 로봇에게 적용되는 규칙입니다.
            allow: '/',      // 사이트의 모든 페이지 수집을 허용합니다.
            disallow: [
                '/api/',       // 서버 API 경로는 검색 결과에 노출될 필요가 없습니다.
                '/admin/',     // 관리자 페이지는 보안을 위해 검색 대상에서 제외합니다.
                '/_next/',     // Next.js 시스템 내부 파일들은 제외합니다.
                '/blog/implant/test', // 테스트 페이지 - 인덱싱 제외
            ],
        },
        // 검색 엔진이 사이트의 전체 구조(Sitemap)를 한눈에 파악할 수 있도록 주소를 등록합니다.
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
