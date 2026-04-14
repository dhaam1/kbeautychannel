'use client';

import { useEffect } from 'react';
import { generateUTMContentFromTitle } from '@/lib/utm';
import { useEnhanceCTALinks } from './useEnhanceCTALinks';

/**
 * 블로그 포스트 UTM Content 생성기
 * 
 * @description
 * 블로그 포스트 페이지에서 H1 제목을 읽어서 utm_content를 생성하고
 * localStorage에 저장합니다. CTA 버튼 클릭 시 이 값이 사용됩니다.
 * 
 * @param title - 블로그 포스트 제목 (H1)
 */
export function useBlogUTMContent(title: string) {
    // CTA 링크에 UTM 파라미터 자동 추가
    useEnhanceCTALinks();

    useEffect(() => {
        if (!title || typeof window === 'undefined') return;

        // H1 제목에서 utm_content 생성
        const utmContent = generateUTMContentFromTitle(title);

        // localStorage에 저장 (기존 값이 없을 때만)
        const existingSource = localStorage.getItem('utm_utm_source');
        if (!existingSource || existingSource === 'direct') {
            localStorage.setItem('utm_utm_source', 'blog');
            localStorage.setItem('utm_utm_medium', 'web');
        }

        // utm_content는 페이지마다 다르므로 항상 업데이트
        localStorage.setItem('utm_utm_content', utmContent);

        console.log('[UTM] Blog UTM Content:', {
            title,
            utm_content: utmContent,
            utm_source: localStorage.getItem('utm_utm_source'),
            utm_medium: localStorage.getItem('utm_utm_medium'),
        });
    }, [title]);
}
