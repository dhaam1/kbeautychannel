'use client';

import { useEffect } from 'react';
import { getStoredUTMParams } from '@/lib/utm';

/**
 * CTA 링크에 UTM 파라미터를 동적으로 추가하는 Hook
 * 
 * @description
 * 페이지 내의 모든 상담/예약 관련 링크를 찾아서
 * 저장된 UTM 파라미터를 href에 자동으로 추가합니다.
 * 
 * @param containerRef - 링크를 찾을 컨테이너 ref (선택사항)
 * 
 * @example
 * ```tsx
 * function BlogPost() {
 *   const contentRef = useRef<HTMLDivElement>(null);
 *   useEnhanceCTALinks(contentRef);
 *   return <div ref={contentRef}>...</div>;
 * }
 * ```
 */
export function useEnhanceCTALinks(
    containerRef?: React.RefObject<HTMLElement>
) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = containerRef?.current || document.body;

        // 상담/예약 관련 링크를 찾기 위한 선택자
        const selectors = [
            'a[href*="/consultation"]',
            'a[href*="상담"]',
            'a.consult-btn',
            'a.cta-button',
            'a[href*="/contact"]',
        ];

        const links = container.querySelectorAll<HTMLAnchorElement>(
            selectors.join(', ')
        );

        if (links.length === 0) return;

        // 저장된 UTM 파라미터 가져오기
        const utmParams = getStoredUTMParams();

        links.forEach((link) => {
            try {
                // 이미 처리된 링크는 스킵
                if (link.dataset.utmEnhanced === 'true') return;

                const url = new URL(link.href, window.location.origin);

                // UTM 파라미터가 이미 있으면 스킵 (수동 설정 우선)
                if (url.searchParams.has('utm_source')) return;

                // UTM 파라미터 추가
                Object.entries(utmParams).forEach(([key, value]) => {
                    if (value) {
                        url.searchParams.set(key, value);
                    }
                });

                link.href = url.toString();
                link.dataset.utmEnhanced = 'true';

                console.log('[UTM] Enhanced CTA link:', {
                    original: link.href.split('?')[0],
                    enhanced: url.search,
                });
            } catch (error) {
                console.warn('[UTM] Failed to enhance link:', link.href, error);
            }
        });
    }, [containerRef]);
}
