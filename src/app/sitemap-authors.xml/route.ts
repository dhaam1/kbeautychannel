import { getSiteUrl } from '@/lib/utils';
import { getWpAllAuthors } from '@/lib/wordpress';

/**
 * 블로그 저자 sitemap 생성
 *
 * WordPress API에서 모든 저자를 가져와서 sitemap 생성
 * - 한국어: /blog/author/[slug]
 * - 일본어: /jp/blog/author/[slug]
 */
export async function GET() {
    const siteUrl = getSiteUrl();

    try {
        // 모든 저자 가져오기
        const authors = await getWpAllAuthors();

        if (authors.length === 0) {
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

        for (const author of authors) {
            // 한국어 URL
            entries.push(`  <url>
    <loc>${siteUrl}/blog/author/${author.slug}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`);

            // 일본어 URL
            entries.push(`  <url>
    <loc>${siteUrl}/jp/blog/author/${author.slug}</loc>
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
        console.error('Error generating authors sitemap:', error);

        const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

        return new Response(errorXml, {
            headers: { 'Content-Type': 'application/xml' },
        });
    }
}
