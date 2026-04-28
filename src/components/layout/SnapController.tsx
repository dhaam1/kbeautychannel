'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SnapController() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    // 메인 페이지('/')가 아닌 모든 서브 페이지에서 no-snap 클래스 추가
    if (pathname !== '/') {
      html.classList.add('no-snap');
    } else {
      html.classList.remove('no-snap');
    }
  }, [pathname]);

  return null;
}
