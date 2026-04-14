'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsManagement } from '@/components/admin/LeadsManagement';

/**
 * 스태프 상담 관리 페이지
 * 
 * @description
 * LeadsManagement 컴포넌트를 사용한 스태프 전용 대시보드
 */
export default function ConsultationsPage() {
  const router = useRouter();

  // 인증 확인
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (!savedAuth) {
      router.push('/admin');
      return;
    }
    const { role } = JSON.parse(savedAuth);
    if (role !== 'staff' && role !== 'master') {
      router.push('/admin');
      return;
    }
  }, [router]);

  return <LeadsManagement showLogoutButton={true} />;
}
