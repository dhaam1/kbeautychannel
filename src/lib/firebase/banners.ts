/**
 * Firebase 배너 관리 함수
 * 
 * @description
 * Firestore의 'banners' 컬렉션에서 배너 이미지 메타데이터를 관리하는 함수들입니다
 * 
 * 컬렉션 구조:
 * - 컬렉션: 'banners'
 * - 문서 ID: 배너 ID (예: 'hero_banner_01', 'hero_banner_02')
 * - 문서 필드: BannerMetadata 인터페이스 참고
 */

import { BannerMetadata } from './types';
import type { Firestore, Timestamp } from 'firebase/firestore';

// 클라이언트 사이드에서만 Firebase를 동적으로 로드
async function getFirestore() {
  if (typeof window === 'undefined') {
    throw new Error('Firestore can only be used on the client side');
  }
  const {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    serverTimestamp,
    Timestamp
  } = await import('firebase/firestore');
  const { db } = await import('./config');
  if (!db) {
    const required = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID',
    ] as const;
    const missing = required.filter((key) => !process.env[key]);
    throw new Error(
      missing.length
        ? `Firestore is not initialized. Missing env: ${missing.join(', ')}`
        : 'Firestore is not initialized.'
    );
  }
  return {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    serverTimestamp,
    Timestamp,
    db: db as Firestore
  };
}

/**
 * 특정 배너의 메타데이터를 가져옵니다
 * 
 * @param {string} bannerId - 배너 ID (예: 'hero_banner_01')
 * @returns {Promise<BannerMetadata | null>} 배너 메타데이터 또는 null
 * @throws {Error} Firestore 조회 실패 시
 * 
 * @example
 * ```tsx
 * const banner = await getBanner('hero_banner_01');
 * if (banner) {
 *   console.log('배너 URL:', banner.downloadUrl);
 * }
 * ```
 */
export async function getBanner(bannerId: string): Promise<BannerMetadata | null> {
  try {
    const { doc, getDoc, db } = await getFirestore();

    const bannerRef = doc(db, 'banners', bannerId);
    const bannerSnap = await getDoc(bannerRef);

    if (!bannerSnap.exists()) {
      return null;
    }

    const data = bannerSnap.data();
    return {
      id: bannerSnap.id,
      storagePath: data.storagePath || '',
      downloadUrl: data.downloadUrl || '',
      uploadedAt: data.uploadedAt?.toDate?.() || new Date(),
      fileName: data.fileName || '',
      fileSize: data.fileSize || 0,
      linkUrl: data.linkUrl || '',
    };
  } catch (error: any) {
    // 권한 오류인 경우 null 반환 (배너가 아직 없을 수 있음)
    if (error.code === 'permission-denied' || error.message?.includes('permission')) {
      console.warn(`배너 ${bannerId} 조회 권한 오류 (배너가 없을 수 있음):`, error);
      return null;
    }
    console.error('배너 조회 오류:', error);
    throw new Error(error.message || '배너를 불러오는 중 오류가 발생했습니다');
  }
}

/**
 * 모든 배너의 메타데이터를 가져옵니다
 * 
 * @returns {Promise<BannerMetadata[]>} 배너 메타데이터 배열
 * @throws {Error} Firestore 조회 실패 시
 * 
 * @example
 * ```tsx
 * const banners = await getAllBanners();
 * console.log('총 배너 개수:', banners.length);
 * ```
 */
export async function getAllBanners(): Promise<BannerMetadata[]> {
  try {
    const { collection, getDocs, db } = await getFirestore();

    const bannersRef = collection(db, 'banners');
    const querySnapshot = await getDocs(bannersRef);

    const banners: BannerMetadata[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      banners.push({
        id: doc.id,
        storagePath: data.storagePath || '',
        downloadUrl: data.downloadUrl || '',
        uploadedAt: data.uploadedAt?.toDate?.() || new Date(),
        fileName: data.fileName || '',
        fileSize: data.fileSize || 0,
        linkUrl: data.linkUrl || '',
      });
    });

    return banners;
  } catch (error: any) {
    // 권한 오류인 경우 빈 배열 반환 (배너가 아직 없을 수 있음)
    if (error.code === 'permission-denied' || error.message?.includes('permission')) {
      console.warn('배너 목록 조회 권한 오류 (배너가 없을 수 있음):', error);
      return [];
    }
    console.error('배너 목록 조회 오류:', error);
    throw new Error(error.message || '배너 목록을 불러오는 중 오류가 발생했습니다');
  }
}

/**
 * 배너 메타데이터를 설정합니다 (문서가 없으면 생성, 있으면 덮어쓰기).
 * 
 * @param {string} bannerId - 배너 ID (예: 'hero_banner_01')
 * @param {Omit<BannerMetadata, 'id'>} metadata - 배너 메타데이터 (id 제외)
 * @returns {Promise<void>}
 * @throws {Error} Firestore 저장 실패 시
 * 
 * @example
 * ```tsx
 * await setBanner('hero_banner_01', {
 *   storagePath: 'banners/hero_banner_01.png',
 *   downloadUrl: 'https://...',
 *   uploadedAt: new Date(),
 *   fileName: 'banner.png',
 *   fileSize: 102400,
 * });
 * ```
 */
export async function setBanner(
  bannerId: string,
  metadata: Omit<BannerMetadata, 'id'>
): Promise<void> {
  try {
    const { doc, setDoc, serverTimestamp, db } = await getFirestore();

    const bannerRef = doc(db, 'banners', bannerId);
    await setDoc(bannerRef, {
      storagePath: metadata.storagePath,
      downloadUrl: metadata.downloadUrl,
      uploadedAt: serverTimestamp(),
      fileName: metadata.fileName,
      fileSize: metadata.fileSize,
      ...(metadata.linkUrl !== undefined && { linkUrl: metadata.linkUrl }),
    });
  } catch (error: any) {
    console.error('배너 저장 오류:', error);
    throw new Error(error.message || '배너를 저장하는 중 오류가 발생했습니다');
  }
}

/**
 * 배너 메타데이터를 업데이트합니다 (부분 업데이트).
 * 
 * @param {string} bannerId - 배너 ID (예: 'hero_banner_01')
 * @param {Partial<Omit<BannerMetadata, 'id'>>} metadata - 업데이트할 메타데이터 (부분)
 * @returns {Promise<void>}
 * @throws {Error} Firestore 업데이트 실패 시
 * 
 * @example
 * ```tsx
 * await updateBanner('hero_banner_01', {
 *   downloadUrl: 'https://new-url.com/image.png',
 * });
 * ```
 */
export async function updateBanner(
  bannerId: string,
  metadata: Partial<Omit<BannerMetadata, 'id'>>
): Promise<void> {
  try {
    const { doc, updateDoc, serverTimestamp, db } = await getFirestore();

    const bannerRef = doc(db, 'banners', bannerId);
    const updateData: any = { ...metadata };

    // uploadedAt이 업데이트되면 서버 타임스탬프로 설정
    if (metadata.uploadedAt !== undefined) {
      updateData.uploadedAt = serverTimestamp();
    }

    await updateDoc(bannerRef, updateData);
  } catch (error: any) {
    console.error('배너 업데이트 오류:', error);
    throw new Error(error.message || '배너를 업데이트하는 중 오류가 발생했습니다');
  }
}

/**
 * 배너 이미지를 업로드하고 기존 파일을 삭제한 후 메타데이터를 업데이트합니다
 * 
 * @description
 * 1. 기존 배너 메타데이터 조회
 * 2. 기존 Storage 파일이 있으면 삭제
 * 3. 새 파일 업로드
 * 4. Firestore 메타데이터 업데이트
 * 5. 에러 발생 시 롤백 처리
 * 
 * @param {string} bannerId - 배너 ID (예: 'hero_banner_01')
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<BannerMetadata>} 업데이트된 배너 메타데이터
 * @throws {Error} 업로드 실패 시
 * 
 * @example
 * ```tsx
 * const banner = await uploadBannerWithCleanup('hero_banner_01', file);
 * console.log('업로드 완료:', banner.downloadUrl);
 * ```
 */
export async function uploadBannerWithCleanup(
  bannerId: string,
  file: File,
  linkUrl?: string
): Promise<BannerMetadata> {
  try {
    const { uploadBannerImage, deleteBannerImage } = await import('./storage');

    // 파일 검증
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('파일 크기는 5MB를 초과할 수 없습니다');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('지원하는 이미지 형식: PNG, JPG, WebP');
    }

    // 기존 배너 메타데이터 조회
    const existingBanner = await getBanner(bannerId);
    let uploadedUrl = '';
    let storagePath = '';

    try {
      // 새 파일 업로드
      uploadedUrl = await uploadBannerImage(bannerId, file);

      // 파일 확장자 추출
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
      storagePath = `banners/${bannerId}.${fileExt}`;

      // 기존 파일이 있으면 삭제 (새 파일 업로드 성공 후)
      if (existingBanner && existingBanner.storagePath && existingBanner.storagePath !== storagePath) {
        try {
          await deleteBannerImage(existingBanner.storagePath);
        } catch (deleteError) {
          // 삭제 실패는 로그만 남기고 계속 진행 (이미 새 파일이 업로드됨)
          console.warn('기존 파일 삭제 실패 (무시됨):', deleteError);
        }
      }

      // Firestore 메타데이터 업데이트
      const metadata: Omit<BannerMetadata, 'id'> = {
        storagePath,
        downloadUrl: uploadedUrl,
        uploadedAt: new Date(),
        fileName: file.name,
        fileSize: file.size,
        linkUrl: linkUrl || existingBanner?.linkUrl || '',
      };

      await setBanner(bannerId, metadata);

      return {
        id: bannerId,
        ...metadata,
      };
    } catch (uploadError: any) {
      // 업로드 실패 시 새로 업로드한 파일 삭제 시도
      if (storagePath) {
        try {
          await deleteBannerImage(storagePath);
        } catch (rollbackError) {
          console.error('롤백 실패:', rollbackError);
        }
      }
      throw uploadError;
    }
  } catch (error: any) {
    console.error('배너 업로드 오류:', error);
    throw new Error(error.message || '배너 업로드에 실패했습니다');
  }
}
