'use client';

import { useUTMCapture } from '@/hooks/useUTMCapture';

/**
 * UTM 추적 초기화 컴포넌트
 * 
 * @description
 * 페이지 로드 시 URL의 UTM 파라미터를 localStorage에 저장합니다.
 * 이 컴포넌트는 루트 레이아웃에 한 번만 추가하면 됩니다.
 */
export function UTMTracker() {
    useUTMCapture();
    return null;
}
