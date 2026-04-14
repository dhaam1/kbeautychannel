'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Admin Portal Login Page
 * 
 * @description
 * 간단한 Access Key 기반 인증 페이지
 * - STAFF_KEY: /admin/consultations로 리다이렉트
 * - MASTER_KEY: /admin/master로 리다이렉트
 */
export default function AdminLoginPage() {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 페이지 로드 시 저장된 인증 상태 확인
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth) {
      const { role, timestamp } = JSON.parse(savedAuth);
      // 24시간 이내의 인증만 유효
      const now = Date.now();
      const authTime = timestamp;
      const hoursSinceAuth = (now - authTime) / (1000 * 60 * 60);

      if (hoursSinceAuth < 24) {
        if (role === 'staff') {
          router.push('/admin/consultations');
        } else if (role === 'master') {
          router.push('/admin/master');
        }
      } else {
        // 만료된 인증 정보 삭제
        sessionStorage.removeItem('admin_auth');
      }
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const staffKey = process.env.NEXT_PUBLIC_STAFF_KEY;
    const masterKey = process.env.NEXT_PUBLIC_MASTER_KEY;

    if (!staffKey || !masterKey) {
      setError('서버 설정 오류: Access Key가 설정되지 않았습니다');
      setIsLoading(false);
      return;
    }

    // 약간의 지연을 추가하여 로딩 상태를 보여줌
    setTimeout(() => {
      if (accessKey === masterKey) {
        // Master 권한
        const authData = {
          role: 'master',
          accessKey: accessKey, // API 호출을 위해 accessKey도 저장
          timestamp: Date.now(),
        };
        sessionStorage.setItem('admin_auth', JSON.stringify(authData));
        router.push('/admin/master');
      } else if (accessKey === staffKey) {
        // Staff 권한
        const authData = {
          role: 'staff',
          accessKey: accessKey, // API 호출을 위해 accessKey도 저장
          timestamp: Date.now(),
        };
        sessionStorage.setItem('admin_auth', JSON.stringify(authData));
        router.push('/admin/consultations');
      } else {
        setError('Invalid Key');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
            BLANCHE MASTER
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-medium">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="accessKey"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
            >
              Access Key
            </label>
            <input
              id="accessKey"
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-mint-dark focus:border-mint-dark outline-none transition-all placeholder-gray-400"
              placeholder="Enter your access key"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-mint-dark text-white py-3 px-4 rounded-lg font-bold hover:bg-[#036b63] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:transform active:scale-[0.98]"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
