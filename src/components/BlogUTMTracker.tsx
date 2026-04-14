'use client';

import { useBlogUTMContent } from '@/hooks/useBlogUTMContent';

interface BlogUTMTrackerProps {
    title: string;
}

/**
 * 블로그 포스트 UTM 추적 컴포넌트
 * 
 * @description
 * 블로그 포스트 제목을 받아서 utm_content를 생성하고 localStorage에 저장합니다.
 */
export function BlogUTMTracker({ title }: BlogUTMTrackerProps) {
    useBlogUTMContent(title);
    return null;
}
