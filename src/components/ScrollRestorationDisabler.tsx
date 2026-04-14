'use client';

import { useEffect } from 'react';

/**
 * 스크롤 복원 비활성화 컴포넌트
 * 
 * @description
 * 카카오톡 브라우저의 스크롤 관리와 Next.js의 스크롤 복원 기능 충돌을 방지하기 위해
 * 브라우저의 스크롤 복원을 수동 모드로 설정합니다.
 * 
 * SEO 최적화:
 * - 크롤러/봇에서는 실행하지 않아 SEO에 영향 없음
 * - 카카오톡 브라우저에서만 실행하여 일반 브라우저의 기본 동작 유지
 * 
 * @returns {null} 렌더링하지 않음
 */
export function ScrollRestorationDisabler() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) {
      return;
    }

    // 크롤러/봇 감지
    const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);
    
    // 카카오톡 브라우저 감지
    const isKakaoTalk = /KAKAOTALK/i.test(navigator.userAgent);
    
    // 크롤러가 아니고, 카카오톡 브라우저인 경우에만 실행
    if (!isBot && isKakaoTalk) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
