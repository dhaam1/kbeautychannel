import { getSiteUrl } from '@/lib/utils';

export async function fetchAndRewriteSitemap(path: string) {
    // 워드프레스 주소 (가져올 곳)
    const WORDPRESS_URL = 'https://wp.blanche.kr';

    // 블랑쉬치과 주소 (보여줄 곳) - www.blanche.kr로 통일
    const FRONTEND_URL = getSiteUrl();

    try {
        // 1. 워드프레스에서 내용 가져오기
        const res = await fetch(`${WORDPRESS_URL}${path}`, {
            cache: 'no-store' // 실시간 반영을 위해 캐시 끔
        });

        if (!res.ok) throw new Error(`Failed to fetch ${path}`);

        const xmlData = await res.text();

        // 2. wp.blanche.kr 을 -> www.blanche.kr 로 모두 교체
        let cleanXml = xmlData.replaceAll(WORDPRESS_URL, FRONTEND_URL);

        // 3. 블로그 카테고리 경로에 /blog prefix 추가
        // WordPress에서는 /category/slug 형태이지만, Next.js에서는 /blog/category/slug 형태
        const blogCategories = [
            'doctor-column',
            'cavity',
            'implant',
            'laminate',
            'orthodontic',
            'scaling',
            'tooth-whitening',
            'notice',
            'case'
        ];

        for (const category of blogCategories) {
            // URL 경로 변환: /category/ → /blog/category/
            cleanXml = cleanXml.replaceAll(
                `${FRONTEND_URL}/${category}/`,
                `${FRONTEND_URL}/blog/${category}/`
            );
            // 일본어 버전: /ja/category/ → /jp/blog/category/
            cleanXml = cleanXml.replaceAll(
                `${FRONTEND_URL}/jp/${category}/`,
                `${FRONTEND_URL}/jp/blog/${category}/`
            );
        }

        // 4. URL 끝의 trailing slash 제거 (RSS 피드 <link> 태그 등)
        // 예: /blog/cavity/충치-냄새/ → /blog/cavity/충치-냄새
        cleanXml = cleanXml.replace(
            /(<link>https?:\/\/[^<]+)\/(<\/link>)/g,
            '$1$2'
        );

        // 5. guid를 실제 글 URL로 변경 (WordPress의 ?p=ID 형식 제거)
        cleanXml = cleanXml.replace(
            /<link>([^<]+)<\/link>([\s\S]*?)<guid isPermaLink="false">[^<]+<\/guid>/g,
            '<link>$1</link>$2<guid isPermaLink="true">$1</guid>'
        );

        // 6. XML 형식으로 내보내기
        return new Response(cleanXml, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Error', { status: 500 });
    }
}
