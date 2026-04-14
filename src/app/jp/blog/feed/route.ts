import { generateRssFeed } from '@/lib/rssFeed';

/**
 * 일본어 RSS 피드
 * /jp/blog/feed → 일본어 콘텐츠
 */
export async function GET() {
    return generateRssFeed('jp');
}
