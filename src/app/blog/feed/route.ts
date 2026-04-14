import { generateRssFeed } from '@/lib/rssFeed';

/**
 * 한국어 RSS 피드
 * /blog/feed → 한국어 콘텐츠
 */
export async function GET() {
    return generateRssFeed('kr');
}
