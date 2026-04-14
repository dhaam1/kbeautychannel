'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsManagement } from '@/components/admin/LeadsManagement';
import { BannerManagement } from '@/components/admin/BannerManagement';

/**
 * 마스터 대시보드 페이지
 * 
 * @description
 * 탭 구조를 사용하여 리드 관리와 배너/컨텐츠 관리를 분리한 대시보드
 */
export default function MasterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'leads' | 'banner'>('leads');

  // 인증 확인
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (!savedAuth) {
      router.push('/admin');
      return;
    }
    const { role } = JSON.parse(savedAuth);
    if (role !== 'master') {
      router.push('/admin');
      return;
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 상단 헤더 & 탭 네비게이션 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 툴바 */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-serif font-bold text-gray-900 tracking-wide">BLANCHE MASTER</h1>
              <span className="px-2 py-0.5 bg-mint-dark/10 text-mint-dark text-[11px] rounded uppercase tracking-wider font-bold">Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://wp.blanche.kr/wp-admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-mint-dark transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                WordPress
              </a>
              <div className="h-4 w-px bg-gray-200"></div>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex space-x-8 -mb-px">
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-4 text-sm font-medium border-b-2 transition-all ${activeTab === 'leads'
                ? 'border-mint-dark text-mint-dark'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              상담 리드 관리
            </button>
            <button
              onClick={() => setActiveTab('banner')}
              className={`pb-4 text-sm font-medium border-b-2 transition-all ${activeTab === 'banner'
                ? 'border-mint-dark text-mint-dark'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              배너 이미지 관리
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 영역 */}
      <div className="bg-gray-50 min-h-[calc(100vh-120px)]">
        {activeTab === 'leads' ? (
          /* 리드 관리 컴포넌트 (헤더 숨김 모드) */
          <div className="-mt-8"> {/* LeadsManagement의 기본 상단 패딩 상쇄 */}
            <LeadsManagement
              showLogoutButton={false}
              showWpAdminLink={false}
              hideHeader={true}
            />
          </div>
        ) : (
          /* 배너 관리 컴포넌트 */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <BannerManagement />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
