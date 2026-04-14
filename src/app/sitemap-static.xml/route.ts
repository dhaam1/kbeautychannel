import { getSiteUrl } from '@/lib/utils';

/**
 * 정적 페이지 sitemap 생성
 *
 * 포함되는 페이지:
 * - 홈, 소개, 진료 서비스, 치료 사례, 블로그, 수가표, 개인정보처리방침
 * - 한국어(kr)와 일본어(jp) 모두 포함
 */
export async function GET() {
    const siteUrl = getSiteUrl();

    // 정적 페이지 정의 (한국어 경로, 일본어 경로)
    const staticPages: Array<{ kr: string; jp: string }> = [
        // 홈
        { kr: '/', jp: '/jp' },

        // 병원 소개
        { kr: '/intro', jp: '/jp/concept' },

        // 진료 서비스
        { kr: '/special', jp: '/jp/service' },
        { kr: '/special/implant', jp: '/jp/service/implant' },
        { kr: '/special/implant/fullarch', jp: '/jp/service/implant/fullarch' },
        { kr: '/special/implant/all', jp: '/jp/service/implant/all' },
        { kr: '/special/implant/incisionless', jp: '/jp/service/implant/incisionless' },
        { kr: '/special/implant/navi', jp: '/jp/service/implant/navi' },
        { kr: '/special/laminate', jp: '/jp/service/laminate' },
        { kr: '/special/orthodontics', jp: '/jp/service/orthodontics' },
        { kr: '/special/whitening', jp: '/jp/service/whitening' },
        { kr: '/special/sleep', jp: '/jp/service/sleep' },

        // 치료 사례
        { kr: '/review', jp: '/jp/before-after' },

        // 블로그 메인
        { kr: '/blog', jp: '/jp/blog' },

        // 수가표
        { kr: '/price', jp: '/jp/menu' },

        // 개인정보처리방침
        { kr: '/privacy', jp: '/jp/privacy' },
    ];

    const lastmod = new Date().toISOString();

    // URL 엔트리 생성
    const entries: string[] = [];

    for (const page of staticPages) {
        // 한국어 URL
        entries.push(`  <url>
    <loc>${siteUrl}${page.kr === '/' ? '' : page.kr}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`);

        // 일본어 URL
        entries.push(`  <url>
    <loc>${siteUrl}${page.jp}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
