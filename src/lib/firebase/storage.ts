/**
 * Firebase Storage 설정 및 유틸리티 함수
 * 
 * @description
 * Firebase Storage를 초기화하고 배너 이미지 업로드/다운로드/삭제 기능을 제공합니다
 * 
 * 클라이언트 사이드에서만 동작하도록 보호합니다
 * 
 * @see https://firebase.google.com/docs/storage/web/start
 */

import type { FirebaseStorage } from 'firebase/storage';

// 클라이언트 사이드에서만 Firebase Storage를 동적으로 로드
async function getStorageInstance() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Storage can only be used on the client side');
  }

  const { getStorage } = await import('firebase/storage');
  const app = await import('./config').then(m => m.default);
  
  if (!app) {
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
        ? `Firebase Storage is not initialized. Missing env: ${missing.join(', ')}`
        : 'Firebase Storage is not initialized.'
    );
  }

  return getStorage(app);
}

/**
 * 배너 이미지를 Firebase Storage에 업로드합니다
 * 
 * @param {string} bannerId - 배너 ID (예: 'hero_banner_01')
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<string>} 다운로드 URL
 * @throws {Error} 업로드 실패 시
 * 
 * @example
 * ```tsx
 * const url = await uploadBannerImage('hero_banner_01', file);
 * console.log('업로드된 이미지 URL:', url);
 * ```
 */
export async function uploadBannerImage(
  bannerId: string,
  file: File
): Promise<string> {
  try {
    const storage = await getStorageInstance();
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

    // 파일 확장자 추출
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const storagePath = `banners/${bannerId}.${fileExt}`;
    const storageRef = ref(storage, storagePath);

    // 파일 업로드
    await uploadBytes(storageRef, file);

    // 다운로드 URL 가져오기
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error: any) {
    console.error('배너 이미지 업로드 오류:', error);
    throw new Error(error.message || '배너 이미지 업로드에 실패했습니다');
  }
}

/**
 * Firebase Storage에서 배너 이미지를 삭제합니다
 * 
 * @param {string} storagePath - Storage 경로 (예: 'banners/hero_banner_01.png')
 * @returns {Promise<void>}
 * @throws {Error} 삭제 실패 시
 * 
 * @example
 * ```tsx
 * await deleteBannerImage('banners/hero_banner_01.png');
 * ```
 */
export async function deleteBannerImage(storagePath: string): Promise<void> {
  try {
    const storage = await getStorageInstance();
    const { ref, deleteObject } = await import('firebase/storage');

    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error: any) {
    // 파일이 존재하지 않는 경우는 무시 (이미 삭제된 경우)
    if (error.code === 'storage/object-not-found') {
      console.warn(`파일이 존재하지 않습니다: ${storagePath}`);
      return;
    }
    console.error('배너 이미지 삭제 오류:', error);
    throw new Error(error.message || '배너 이미지 삭제에 실패했습니다');
  }
}

/**
 * Firebase Storage에서 배너 이미지의 다운로드 URL을 가져옵니다
 * 
 * @param {string} storagePath - Storage 경로 (예: 'banners/hero_banner_01.png')
 * @returns {Promise<string>} 다운로드 URL
 * @throws {Error} URL 조회 실패 시
 * 
 * @example
 * ```tsx
 * const url = await getBannerDownloadUrl('banners/hero_banner_01.png');
 * ```
 */
export async function getBannerDownloadUrl(storagePath: string): Promise<string> {
  try {
    const storage = await getStorageInstance();
    const { ref, getDownloadURL } = await import('firebase/storage');

    const storageRef = ref(storage, storagePath);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error: any) {
    console.error('배너 이미지 URL 조회 오류:', error);
    throw new Error(error.message || '배너 이미지 URL을 가져오는데 실패했습니다');
  }
}
