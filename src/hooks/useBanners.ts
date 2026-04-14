'use client';

import { useState, useEffect } from 'react';
import { BannerMetadata } from '@/lib/firebase/types';
import { getAllBanners, getBanner } from '@/lib/firebase/banners';

/**
 * 배너 데이터 조회 훅
 * 
 * @description
 * Firestore에서 배너 메타데이터를 조회하는 훅입니다
 * 로딩 상태와 에러 상태를 관리합니다
 * 
 * @param {string[]} [bannerIds] - 조회할 배너 ID 배열 (없으면 전체 조회)
 * @returns {Object} 배너 데이터, 로딩 상태, 에러 상태
 * 
 * @example
 * ```tsx
 * const { banners, isLoading, error } = useBanners(['hero_banner_01', 'hero_banner_02']);
 * ```
 */
export function useBanners(bannerIds?: string[]) {
  const [banners, setBanners] = useState<BannerMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBanners() {
      try {
        setIsLoading(true);
        setError(null);

        if (bannerIds && bannerIds.length > 0) {
          // 특정 배너 ID들만 조회
          const bannerPromises = bannerIds.map(id => getBanner(id));
          const bannerResults = await Promise.all(bannerPromises);
          const validBanners = bannerResults.filter(
            (banner): banner is BannerMetadata => banner !== null
          );

          if (isMounted) {
            setBanners(validBanners);
          }
        } else {
          // 전체 배너 조회
          const allBanners = await getAllBanners();
          if (isMounted) {
            setBanners(allBanners);
          }
        }
      } catch (err: any) {
        console.error('배너 조회 오류:', err);
        if (isMounted) {
          setError(err.message || '배너를 불러오는 중 오류가 발생했습니다');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchBanners();

    return () => {
      isMounted = false;
    };
    // bannerIds 배열 참조가 매번 바뀌더라도 내용이 같으면 재실행하지 않도록
    // JSON.stringify 또는 join을 사용하여 의존성을 확인합니다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerIds ? bannerIds.join(',') : 'all']);

  return { banners, isLoading, error };
}

/**
 * 특정 배너 ID로 배너를 조회하는 헬퍼 함수
 * 
 * @param {string} bannerId - 배너 ID
 * @returns {BannerMetadata | null} 배너 메타데이터 또는 null
 */
export function useBanner(bannerId: string) {
  const { banners, isLoading, error } = useBanners([bannerId]);
  return {
    banner: banners.find(b => b.id === bannerId) || null,
    isLoading,
    error,
  };
}
