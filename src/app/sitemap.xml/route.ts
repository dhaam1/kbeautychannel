import { getSiteUrl } from '@/lib/utils';

/**
 * Sitemap Index
 *
 * 모든 하위 sitemap을 참조하는 인덱스 파일
 * - sitemap-static.xml: 정적 페이지
 * - sitemap-blog.xml: 블로그 글
 * - sitemap-categories.xml: 블로그 카테고리
 * - sitemap-authors.xml: 블로그 저자
 */
export async function GET() {
    const siteUrl = getSiteUrl();
    const lastmod = new Date().toISOString();

    const sitemaps = [
        { loc: `${siteUrl}/sitemap-static.xml`, lastmod },
        { loc: `${siteUrl}/sitemap-blog.xml`, lastmod },
        { loc: `${siteUrl}/sitemap-categories.xml`, lastmod },
        { loc: `${siteUrl}/sitemap-authors.xml`, lastmod },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
