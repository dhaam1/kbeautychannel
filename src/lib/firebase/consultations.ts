import { Consultation, ConsultationFormData, ConsultationDepartment } from './types';
import type { Firestore } from 'firebase/firestore';

// 클라이언트 사이드에서만 Firebase를 동적으로 로드
async function getFirestore() {
  if (typeof window === 'undefined') {
    throw new Error('Firestore can only be used on the client side');
  }
  const { collection, addDoc, serverTimestamp, FirestoreError } = await import('firebase/firestore');
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
    const missing = [
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 'NEXT_PUBLIC_FIREBASE_API_KEY',
      !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN && 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET && 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      !process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID && 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      !process.env.NEXT_PUBLIC_FIREBASE_APP_ID && 'NEXT_PUBLIC_FIREBASE_APP_ID',
    ].filter(Boolean) as string[];
    throw new Error(
      missing.length
        ? `Firestore is not initialized. Missing env: ${missing.join(', ')}`
        : 'Firestore is not initialized.'
    );
  }
  return { collection, addDoc, serverTimestamp, FirestoreError, db: db as Firestore };
}

/**
 * 상담 신청 데이터를 Firestore에 저장합니다.
 * 
 * @description
 * CTA 섹션의 상담 신청 폼에서 제출된 데이터를 Firestore에 저장합니다.
 * 
 * 저장되는 데이터:
 * - name: 이름
 * - phone: 전화번호
 * - department: 진료과목
 * - timestamp: 클라이언트 타임스탬프
 * - createdAt: 서버 타임스탬프 (Firestore serverTimestamp)
 * - status: 'pending' (처리 대기 상태)
 * 
 * 컬렉션: 'consultations'
 * 
 * @param {ConsultationFormData} formData - 상담 신청 폼 데이터
 * @returns {Promise<string>} 저장된 문서 ID
 * @throws {FirestoreError} Firestore 저장 실패 시
 * @throws {Error} 기타 오류 발생 시
 * 
 * @example
 * ```tsx
 * try {
 *   const docId = await submitConsultation({
 *     name: '홍길동',
 *     phone: '010-1234-5678',
 *     department: 'implant'
 *   });
 *   console.log('저장된 문서 ID:', docId);
 * } catch (error) {
 *   console.error('저장 실패:', error);
 * }
 * ```
 */
export async function submitConsultation(
  formData: ConsultationFormData
): Promise<string> {
  try {
    const { collection, addDoc, serverTimestamp, FirestoreError, db } = await getFirestore();

    // Firestore는 undefined 값을 필드로 저장할 수 없음:
    // privacyAgreed가 폼에서 전달되지 않는 경우(undefined) 기본값을 부여해 저장 오류를 방지합니다.
    const consultationData: Omit<Consultation, 'id'> = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      department: formData.department as ConsultationDepartment,
      timestamp: new Date(),
      status: '상담대기',
      createdAt: undefined,
      privacyAgreed: formData.privacyAgreed ?? null,
      ...(formData.utmSource && { utmSource: formData.utmSource }),
      ...(formData.utmMedium && { utmMedium: formData.utmMedium }),
      ...(formData.utmCampaign && { utmCampaign: formData.utmCampaign }),
      ...(formData.utmContent && { utmContent: formData.utmContent }),
    };

    // 네트워크/규칙 문제 등으로 Promise가 장시간 pending 되는 경우가 있어
    // UI가 "제출 중..."에서 멈추지 않도록 타임아웃을 둡니다.
    const TIMEOUT_MS = 15_000;
    const addDocPromise = addDoc(collection(db, 'consultations'), {
      ...consultationData,
      createdAt: serverTimestamp(),
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('상담 신청 저장이 지연되고 있습니다. 네트워크 상태를 확인 후 다시 시도해주세요.')), TIMEOUT_MS);
    });

    const docRef = await Promise.race([addDocPromise, timeoutPromise]);

    return docRef.id;
  } catch (error: unknown) {
    // 원인 파악이 가능하도록 원본 에러를 최대한 보존해서 전달합니다.
    console.error('submitConsultation error:', error);

    if (error instanceof Error) {
      throw error;
    }

    const maybeError = error as { code?: unknown; message?: unknown };
    const code = typeof maybeError?.code === 'string' ? maybeError.code : undefined;
    const message = typeof maybeError?.message === 'string' ? maybeError.message : undefined;
    if (code || message) {
      throw new Error([code, message].filter(Boolean).join(': '));
    }

    throw new Error('상담 신청 저장 중 알 수 없는 오류가 발생했습니다.');
  }
}
