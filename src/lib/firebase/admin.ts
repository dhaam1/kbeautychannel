/**
 * Firebase Admin Functions
 * 
 * @description
 * Admin portal에서 사용하는 Firebase Firestore 조회 함수들
 */

import { Consultation, ConsultationStatus } from './types';
import { getDepartmentLabel } from './constants';
import type { Firestore } from 'firebase/firestore';

// 클라이언트 사이드에서만 Firebase를 동적으로 로드
async function getFirestore() {
  if (typeof window === 'undefined') {
    throw new Error('Firestore can only be used on the client side');
  }
  const { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc, deleteDoc } = await import('firebase/firestore');
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
  return { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc, deleteDoc, db: db as Firestore };
}

/**
 * 모든 상담 신청 데이터를 가져옵니다 (날짜순 정렬, 최신순)
 * 
 * @description
 * Firestore의 'consultations' 컬렉션에서 모든 문서를 가져와
 * createdAt 필드를 기준으로 내림차순 정렬합니다.
 * 
 * @returns {Promise<Consultation[]>} 상담 신청 데이터 배열
 * @throws {Error} Firestore 조회 실패 시
 * 
 * @example
 * ```tsx
 * const consultations = await getConsultations();
 * console.log('총 상담 건수:', consultations.length);
 * ```
 */
export async function getConsultations(): Promise<Consultation[]> {
  try {
    const { collection, getDocs, query, orderBy, Timestamp, db } = await getFirestore();

    // consultations 컬렉션에서 createdAt 기준 내림차순 정렬
    const consultationsRef = collection(db, 'consultations');
    const q = query(consultationsRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    const consultations: Consultation[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Firestore Timestamp를 Date로 변환
      let createdAt: Date | undefined;
      if (data.createdAt) {
        if (data.createdAt.toDate) {
          // Firestore Timestamp 객체인 경우
          createdAt = data.createdAt.toDate();
        } else if (data.createdAt instanceof Date) {
          // 이미 Date 객체인 경우
          createdAt = data.createdAt;
        }
      }

      // 기존 데이터 호환성: 이전 status 값들을 새 값으로 변환
      let status: ConsultationStatus = '상담대기';
      if (data.status) {
        if (data.status === 'pending' || data.status === 'processed') {
          status = '상담대기';
        } else if (data.status === 'completed') {
          status = '상담완료';
        } else if (['상담대기', '상담완료', '부재', '결번', '예약완료', '취소', '미내원', '내원완료'].includes(data.status)) {
          status = data.status as ConsultationStatus;
        }
      }

      consultations.push({
        id: doc.id,
        name: data.name || '',
        phone: data.phone || '',
        department: getDepartmentLabel(data.department || '기타진료'),
        timestamp: data.timestamp?.toDate?.() || data.timestamp || new Date(),
        status,
        createdAt,
        date: data.date,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        consult1: data.consult1,
        consult2: data.consult2,
        consult3: data.consult3,
        consult4: data.consult4,
        memo: data.memo,
        privacyAgreed: data.privacyAgreed,
      });
    });

    return consultations;
  } catch (error: any) {
    console.error('상담 데이터 조회 오류:', error);
    throw new Error('상담 데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

/**
 * 상담 신청의 상태를 업데이트합니다
 * 
 * @description
 * Firestore의 'consultations' 컬렉션에서 특정 문서의 상태(status) 필드를 업데이트합니다.
 * 
 * @param {string} consultationId - 업데이트할 상담 신청 문서 ID
 * @param {ConsultationStatus} status - 새로운 상태 값
 * @returns {Promise<void>}
 * @throws {Error} Firestore 업데이트 실패 시
 * 
 * @example
 * ```tsx
 * await updateConsultationStatus('doc-id-123', '상담완료');
 * ```
 */
export async function updateConsultationStatus(
  consultationId: string,
  status: ConsultationStatus
): Promise<void> {
  try {
    const { collection, doc, updateDoc, db } = await getFirestore();

    if (!consultationId) {
      throw new Error('상담 신청 ID가 필요합니다.');
    }

    const validStatuses: ConsultationStatus[] = ['상담대기', '상담완료', '부재', '결번', '예약완료', '취소', '미내원', '내원완료'];
    if (!validStatuses.includes(status)) {
      throw new Error('유효하지 않은 상태 값입니다.');
    }

    const consultationRef = doc(db, 'consultations', consultationId);
    await updateDoc(consultationRef, {
      status,
    });
  } catch (error: any) {
    console.error('상담 상태 업데이트 오류:', error);
    throw new Error(error.message || '상담 상태를 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 상담 메모를 업데이트합니다
 * 
 * @param leadId - 리드 ID
 * @param consultNumber - 상담 회차 (1, 2, 3, 4)
 * @param note - 상담 메모 내용
 */
export async function updateLeadConsultNote(
  leadId: string,
  consultNumber: 1 | 2 | 3 | 4,
  note: string
): Promise<void> {
  try {
    const { doc, updateDoc, db } = await getFirestore();

    if (!leadId) {
      throw new Error('리드 ID가 필요합니다.');
    }

    const fieldName = `consult${consultNumber}` as 'consult1' | 'consult2' | 'consult3' | 'consult4';
    const consultationRef = doc(db, 'consultations', leadId);
    await updateDoc(consultationRef, {
      [fieldName]: note,
    });
  } catch (error: any) {
    console.error('상담 메모 업데이트 오류:', error);
    throw new Error(error.message || '상담 메모를 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 비고 메모를 업데이트합니다
 * 
 * @param leadId - 리드 ID
 * @param memo - 비고 내용
 */
export async function updateLeadMemo(leadId: string, memo: string): Promise<void> {
  try {
    const { doc, updateDoc, db } = await getFirestore();

    if (!leadId) {
      throw new Error('리드 ID가 필요합니다.');
    }

    const consultationRef = doc(db, 'consultations', leadId);
    await updateDoc(consultationRef, {
      memo,
    });
  } catch (error: any) {
    console.error('비고 업데이트 오류:', error);
    throw new Error(error.message || '비고를 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 진료과목을 업데이트합니다
 * 
 * @param leadId - 리드 ID
 * @param category - 진료과목
 */
export async function updateLeadCategory(
  leadId: string,
  category: string
): Promise<void> {
  try {
    const { doc, updateDoc, db } = await getFirestore();

    if (!leadId) {
      throw new Error('리드 ID가 필요합니다.');
    }

    const consultationRef = doc(db, 'consultations', leadId);
    await updateDoc(consultationRef, {
      department: category,
    });
  } catch (error: any) {
    console.error('진료과목 업데이트 오류:', error);
    throw new Error(error.message || '진료과목을 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 연락처를 업데이트합니다
 * 
 * @param leadId - 리드 ID
 * @param phone - 연락처
 */
export async function updateLeadPhone(leadId: string, phone: string): Promise<void> {
  try {
    const { doc, updateDoc, db } = await getFirestore();

    if (!leadId) {
      throw new Error('리드 ID가 필요합니다.');
    }

    const consultationRef = doc(db, 'consultations', leadId);
    await updateDoc(consultationRef, {
      phone,
    });
  } catch (error: any) {
    console.error('연락처 업데이트 오류:', error);
    throw new Error(error.message || '연락처를 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 개인정보 동의 여부를 업데이트합니다
 * 
 * @param leadId - 리드 ID
 * @param privacyAgreed - 개인정보 동의 여부
 */
export async function updateLeadPrivacyAgreed(
  leadId: string,
  privacyAgreed: boolean | null
): Promise<void> {
  try {
    const { doc, updateDoc, db } = await getFirestore();

    if (!leadId) {
      throw new Error('리드 ID가 필요합니다.');
    }

    const consultationRef = doc(db, 'consultations', leadId);
    await updateDoc(consultationRef, {
      privacyAgreed,
    });
  } catch (error: any) {
    throw new Error(error.message || '개인정보 동의 여부를 업데이트하는 중 오류가 발생했습니다.');
  }
}

/**
 * 상담 신청 데이터를 삭제합니다
 * 
 * @param consultationId - 삭제할 상담 신청 문서 ID
 */
export async function deleteConsultation(consultationId: string): Promise<void> {
  try {
    const { doc, deleteDoc, db } = await getFirestore();

    if (!consultationId) {
      throw new Error('상담 신청 ID가 필요합니다.');
    }

    const consultationRef = doc(db, 'consultations', consultationId);
    await deleteDoc(consultationRef);
  } catch (error: any) {
    console.error('상담 삭제 오류:', error);
    throw new Error(error.message || '상담 데이터를 삭제하는 중 오류가 발생했습니다.');
  }
}
