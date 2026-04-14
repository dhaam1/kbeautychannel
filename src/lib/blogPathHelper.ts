/**
 * Blog Path Helper Utilities
 *
 * Provides locale-aware path generation for blog routes.
 *
 * URL 형식:
 * - 한국어: /blog/...
 * - 일본어: /jp/blog/...
 *
 * Note: 기존 /blog/ja/... 링크는 middleware에서 /jp/blog/...로 301 리다이렉트됩니다.
 */

/**
 * Get blog base path based on locale
 * @param locale - Current locale ('kr' or 'jp')
 * @returns Blog base path ('/blog' or '/jp/blog')
 */
export function getBlogBasePath(locale: string): string {
    if (locale === 'jp') return '/jp/blog';
    if (locale === 'en') return '/en/blog';
    return '/blog';
}

/**
 * Get blog category path
 * @param locale - Current locale
 * @param category - Category slug
 * @returns Category page path
 */
export function getBlogCategoryPath(locale: string, category: string): string {
    const basePath = getBlogBasePath(locale);
    return `${basePath}/${category}`;
}

/**
 * Get blog post path
 * @param locale - Current locale
 * @param category - Category slug
 * @param slug - Post slug
 * @returns Post detail page path
 */
export function getBlogPostPath(locale: string, category: string, slug: string): string {
    const basePath = getBlogBasePath(locale);
    return `${basePath}/${category}/${slug}`;
}

/**
 * Get blog author path
 * @param locale - Current locale
 * @param authorSlug - Author slug (optional)
 * @returns Author page path
 */
export function getBlogAuthorPath(locale: string, authorSlug?: string): string {
    const basePath = getBlogBasePath(locale);
    return authorSlug ? `${basePath}/author/${authorSlug}` : `${basePath}/author`;
}

/**
 * Get blog pagination path
 * @param locale - Current locale
 * @param page - Page number
 * @param category - Optional category slug for category pagination
 * @returns Pagination path
 */
export function getBlogPaginationPath(
    locale: string,
    page: number,
    category?: string
): string {
    const basePath = getBlogBasePath(locale);
    const categoryPath = category ? `/${category}` : '';

    // Using query parameter approach for simplicity
    return `${basePath}${categoryPath}${page > 1 ? `?page=${page}` : ''}`;
}

/**
 * WordPress post link 또는 Yoast canonical URL에서 primary category slug를 추출합니다.
 *
 * URL 형식:
 * - 한국어: https://wp.blanche.kr/[category]/[slug]/
 * - 일본어: https://wp.blanche.kr/ja/[category]/[slug]/
 *
 * @param url - WordPress post link 또는 Yoast canonical URL
 * @param locale - 현재 로케일 ('kr' 또는 'jp')
 * @returns primary category slug, 추출 실패 시 null
 */
export function extractPrimaryCategoryFromUrl(
    url: string,
    locale: string
): string | null {
    try {
        const parsed = new URL(url);
        const segments = parsed.pathname
            .replace(/^\/+|\/+$/g, '')
            .split('/')
            .filter(Boolean);

        let categoryIndex = 0;

        // 일본어 포스트는 WordPress에서 /ja/ prefix 사용
        if (locale === 'jp' && segments[0] === 'ja') {
            categoryIndex = 1;
        }
        
        // 영어 포스트는 WordPress에서 /en/ prefix 사용
        if (locale === 'en' && segments[0] === 'en') {
            categoryIndex = 1;
        }

        // category + slug 최소 2개 세그먼트 필요
        if (segments.length >= categoryIndex + 2) {
            return segments[categoryIndex];
        }

        return null;
    } catch {
        return null;
    }
}
