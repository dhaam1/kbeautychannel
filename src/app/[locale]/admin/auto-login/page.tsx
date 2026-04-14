'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoLogin() {
  const router = useRouter();

  useEffect(() => {
    // 마스터 권한으로 세션스토리지에 인증 정보 저장 (Next.js 로컬 환경 테스트용 자동 접속)
    const authData = {
      role: 'master',
      accessKey: 'developer-bypass',
      timestamp: Date.now(),
    };
    sessionStorage.setItem('admin_auth', JSON.stringify(authData));
    
    // 마스터 대시보드 페이지로 리다이렉트
    router.push('/admin/master');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 font-medium">관리자(마스터) 권한으로 자동 로그인 중입니다...</p>
    </div>
  );
}
