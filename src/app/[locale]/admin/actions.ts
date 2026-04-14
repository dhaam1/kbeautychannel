'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server Action: Revalidate Site Cache
 * 
 * @description
 * Next.js 캐시를 무효화하여 WordPress 콘텐츠를 다시 가져오도록 합니다
 * 블로그 페이지와 홈페이지의 캐시를 재검증합니다
 */
export async function revalidateSiteCache() {
  try {
    // 블로그 관련 경로 재검증
    revalidatePath('/blog', 'layout');
    revalidatePath('/blog/[category]', 'page');
    revalidatePath('/blog/[category]/[slug]', 'page');
    
    // 홈페이지 재검증
    revalidatePath('/', 'layout');
    
    return {
      success: true,
      message: '사이트 캐시가 성공적으로 재검증되었습니다',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('캐시 재검증 오류:', error);
    return {
      success: false,
      message: error.message || '캐시 재검증 중 오류가 발생했습니다',
      timestamp: new Date().toISOString(),
    };
  }
}
