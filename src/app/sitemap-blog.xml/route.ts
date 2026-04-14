import { getSiteUrl } from '@/lib/utils';
import { getWpAllPosts } from '@/lib/wordpress';
import { extractPrimaryCategoryFromUrl } from '@/lib/blogPathHelper';

/**
 * 블로그 글 sitemap 생성
 *
 * WordPress API에서 한국어/일본어 글을 각각 가져와서 sitemap 생성
 * - 한국어: /blog/[category]/[slug]
 * - 일본어: /jp/blog/[category]/[slug]
 */
export async function GET() {
    const siteUrl = getSiteUrl();

    try {
        // 한국어 글과 일본어 글을 각각 가져오기
        const [krPosts, jpPosts] = await Promise.all([
            getWpAllPosts('kr'),  // 한국어 글
            getWpAllPosts('jp'),  // 일본어 글
        ]);

        const allPosts = [...krPosts, ...jpPosts];

        if (allPosts.length === 0) {
            const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
            return new Response(emptyXml, {
                headers: { 'Content-Type': 'application/xml' },
            });
        }

        // URL 엔트리 생성
        const entries: string[] = [];

        // 한국어 글 처리 (post.link에서 Yoast primary category 추출)
        for (const post of krPosts) {
            const categorySlug = extractPrimaryCategoryFromUrl(post.link, 'kr') || 'uncategorized';

            const lastmod = post.modified
                ? new Date(post.modified).toISOString()
                : new Date(post.date).toISOString();

            entries.push(`  <url>
    <loc>${siteUrl}/blog/${categorySlug}/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`);
        }

        // 일본어 글 처리 (post.link에서 Yoast primary category 추출)
        for (const post of jpPosts) {
            const categorySlug = extractPrimaryCategoryFromUrl(post.link, 'jp') || 'uncategorized';

            const lastmod = post.modified
                ? new Date(post.modified).toISOString()
                : new Date(post.date).toISOString();

            entries.push(`  <url>
    <loc>${siteUrl}/jp/blog/${categorySlug}/${post.slug}</loc>
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
        console.error('Error generating blog sitemap:', error);

        const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

        return new Response(errorXml, {
            headers: { 'Content-Type': 'application/xml' },
        });
    }
}
