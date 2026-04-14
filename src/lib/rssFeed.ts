import { getWpAllPostsForFeed, stripHtml } from '@/lib/wordpress';
import { getSiteUrl } from '@/lib/utils';
import { getBlogPostPath } from '@/lib/blogPathHelper';

/**
 * RSS 피드 XML 생성 함수
 *
 * @param locale - 'kr' 또는 'jp'
 * @returns RSS XML Response
 */
export async function generateRssFeed(locale: string = 'kr') {
    const siteUrl = getSiteUrl();
    const isJp = locale === 'jp';

    const feedTitle = isJp
        ? 'ブランシュ歯科医院 ブログ'
        : '블랑쉬치과의원 블로그- 강남치과, 논현역치과, 무삭제 라미네이트';
    const feedDescription = isJp
        ? '江南の歯科医院ブランシュのブログです。'
        : '강남 치과 블랑쉬치과의원의 블로그입니다.';
    const feedLink = isJp ? `${siteUrl}/jp/blog` : `${siteUrl}/blog`;
    const feedUrl = isJp ? `${siteUrl}/jp/blog/feed` : `${siteUrl}/blog/feed`;
    const feedLanguage = isJp ? 'ja' : 'ko-KR';

    try {
        // WordPress REST API로 해당 언어의 포스트 가져오기
        const posts = await getWpAllPostsForFeed(locale);

        // RSS XML 생성
        const rssItems = posts.map(post => {
            // 카테고리 slug 추출 (link에서)
            const linkMatch = post.link.match(/\/([^/]+)\/[^/]+\/?$/);
            const categorySlug = linkMatch ? linkMatch[1] : 'blog';

            // 포스트 URL 생성
            const postUrl = `${siteUrl}${getBlogPostPath(locale, categorySlug, post.slug)}`;

            // 썸네일 이미지 - RSS에서는 원본 WordPress URL 직접 사용 (프록시 경유 시 이미지 깨짐 방지)
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const imageUrl = featuredImage || '';

            // 이미지 MIME 타입 결정
            const getImageMimeType = (url: string): string => {
                const ext = url.split('.').pop()?.toLowerCase();
                switch (ext) {
                    case 'webp': return 'image/webp';
                    case 'png': return 'image/png';
                    case 'gif': return 'image/gif';
                    case 'svg': return 'image/svg+xml';
                    default: return 'image/jpeg';
                }
            };

            // 작성자
            const author = post._embedded?.author?.[0]?.name || (isJp ? 'ブランシュ歯科' : '블랑쉬치과');

            // 요약 (HTML 태그 제거)
            const description = stripHtml(post.excerpt?.rendered || '');

            return `
    <item>
        <title><![CDATA[${post.title.rendered}]]></title>
        <link>${postUrl}</link>
        <dc:creator><![CDATA[${author}]]></dc:creator>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid isPermaLink="true">${postUrl}</guid>
        <description><![CDATA[${description}]]></description>
        ${imageUrl ? `<enclosure url="${imageUrl}" length="0" type="${getImageMimeType(imageUrl)}" />` : ''}
    </item>`;
        }).join('');

        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
>
<channel>
    <title>${feedTitle}</title>
    <link>${feedLink}</link>
    <description>${feedDescription}</description>
    <language>${feedLanguage}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${rssItems}
</channel>
</rss>`;

        return new Response(rssXml, {
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('RSS feed generation error:', error);
        return new Response('Error generating RSS feed', { status: 500 });
    }
}
