'use client';

import { useEffect } from 'react';
import { captureUTMParams } from '@/lib/utm';

/**
 * UTM 파라미터 자동 캡처 Hook
 * 
 * @description
 * 컴포넌트 마운트 시 URL의 UTM 파라미터를 localStorage에 저장합니다.
 * 최상위 레이아웃이나 페이지에서 한 번만 호출하면 됩니다.
 * 
 * @example
 * ```tsx
 * export default function RootLayout() {
 *   useUTMCapture();
 *   return <html>...</html>;
 * }
 * ```
 */
export function useUTMCapture() {
    useEffect(() => {
        captureUTMParams();
    }, []);
}
