import { getSiteUrl } from '@/lib/utils';
import { getWpAllCategories } from '@/lib/wordpress';

/**
 * 블로그 카테고리 sitemap 생성
 *
 * WordPress API에서 모든 카테고리를 가져와서 sitemap 생성
 * - 한국어: /blog/[category]
 * - 일본어: /jp/blog/[category]
 */
export async function GET() {
    const siteUrl = getSiteUrl();

    try {
        // 모든 카테고리 가져오기
        const categories = await getWpAllCategories();

        if (categories.length === 0) {
            const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
            return new Response(emptyXml, {
                headers: { 'Content-Type': 'application/xml' },
            });
        }

        const lastmod = new Date().toISOString();
        const entries: string[] = [];

        for (const category of categories) {
            // 'uncategorized' 카테고리는 제외
            if (category.slug === 'uncategorized') continue;

            // 한국어 URL
            entries.push(`  <url>
    <loc>${siteUrl}/blog/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`);

            // 일본어 URL
            entries.push(`  <url>
    <loc>${siteUrl}/jp/blog/${category.slug}</loc>
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
    } catch (error) {
        console.error('Error generating categories sitemap:', error);

        const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

        return new Response(errorXml, {
            headers: { 'Content-Type': 'application/xml' },
        });
    }
}
