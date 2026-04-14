'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getStoredUTMParams } from '@/lib/utm';

/**
 * UTM URL 동기화 컴포넌트
 *
 * @description
 * 페이지 이동 시 sessionStorage에 저장된 UTM 파라미터가
 * 현재 URL에 없으면 자동으로 주소창에 복원합니다.
 *
 * - history.replaceState()를 사용하므로 브라우저 뒤로가기 히스토리에 영향 없음
 * - 이미 URL에 utm_source가 있으면 덮어쓰지 않음
 * - sessionStorage에 UTM이 없거나 'direct'이면 동작하지 않음
 */
export function UTMURLSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const utmParams = getStoredUTMParams();

    // UTM이 없거나 direct(직접 유입)이면 아무것도 하지 않음
    if (!utmParams.utm_source || utmParams.utm_source === 'direct') return;

    const url = new URL(window.location.href);

    // 이미 URL에 UTM이 있으면 중복 추가하지 않음
    if (url.searchParams.get('utm_source')) return;

    // sessionStorage의 UTM값을 URL에 복원
    if (utmParams.utm_source && utmParams.utm_source !== 'direct') {
      url.searchParams.set('utm_source', utmParams.utm_source);
    }
    if (utmParams.utm_medium && utmParams.utm_medium !== 'none') {
      url.searchParams.set('utm_medium', utmParams.utm_medium);
    }
    if (utmParams.utm_campaign) {
      url.searchParams.set('utm_campaign', utmParams.utm_campaign);
    }
    if (utmParams.utm_content) {
      url.searchParams.set('utm_content', utmParams.utm_content);
    }

    // 브라우저 히스토리 스택에 새 항목을 쌓지 않고 URL만 교체
    window.history.replaceState({}, '', url.toString());
  }, [pathname]); // pathname 변경(페이지 이동) 시마다 실행

  return null;
}
