'use client';

import dynamic from 'next/dynamic';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import FloatingConsultationForm from '@/components/FloatingConsultationForm';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

// 클라이언트 전용 컴포넌트를 동적 import로 로드
const DynamicFloatingActionButton = dynamic(
  () => Promise.resolve({ default: FloatingActionButton }),
  { ssr: false }
);

const DynamicFloatingConsultationForm = dynamic(
  () => Promise.resolve({ default: FloatingConsultationForm }),
  { ssr: false }
);

const DynamicToaster = dynamic(
  () => Promise.resolve({ default: Toaster }),
  { ssr: false }
);

/**
 * 클라이언트 전용 컴포넌트 래퍼
 * 
 * @description
 * 서버 컴포넌트에서 클라이언트 전용 컴포넌트를 사용하기 위한 래퍼입니다.
 * ssr: false 옵션을 사용하여 클라이언트에서만 렌더링됩니다.
 */
export function ClientOnlyComponents() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');
  const shouldShowFloatingForm = !pathname?.includes('/blog') && !pathname?.includes('/consultation') && !isAdminPage;

  // admin 페이지에서는 플로팅 버튼 숨김
  if (isAdminPage) {
    return <DynamicToaster position="top-center" />;
  }

  return (
    <>
      <DynamicFloatingActionButton />
      {shouldShowFloatingForm && <DynamicFloatingConsultationForm />}
      <DynamicToaster position="top-center" />
    </>
  );
}
