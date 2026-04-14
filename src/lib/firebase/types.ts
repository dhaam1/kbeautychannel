/**
 * Firebase 관련 TypeScript 타입 정의
 * 
 * @description
 * Firestore에 저장되는 상담 신청 데이터의 타입을 정의합니다.
 */

/**
 * 진료과목 타입
 */
export type ConsultationDepartment = '블랑쉬' | '임플란트' | '교정' | '기타진료';

/**
 * 상담 상태 타입
 */
export type ConsultationStatus = '상담대기' | '상담완료' | '부재' | '결번' | '예약완료' | '취소' | '미내원' | '내원완료';

/**
 * Firestore에 저장되는 상담 신청 문서 타입
 * 
 * @property {string} [id] - Firestore 문서 ID (자동 생성)
 * @property {string} name - 환자 이름
 * @property {string} phone - 전화번호
 * @property {ConsultationDepartment} department - 진료과목
 * @property {Date} timestamp - 클라이언트 타임스탬프
 * @property {ConsultationStatus} status - 처리 상태
 * @property {Date} [createdAt] - Firestore 서버 타임스탬프
 * @property {boolean} [privacyAgreed] - 개인정보처리방침 동의 여부
 * @property {string} [date] - "01-17" 형식의 날짜 필드
 * @property {string} [utmSource] - UTM 소스 (예: "naver", "google")
 * @property {string} [utmMedium] - UTM 매체 (예: "cpc", "organic")
 * @property {string} [consult1] - 1차 상담 메모 (예: "[1.17] 통화완료")
 * @property {string} [consult2] - 2차 상담 메모
 * @property {string} [consult3] - 3차 상담 메모
 * @property {string} [consult4] - 4차 상담 메모
 * @property {string} [memo] - 비고 필드
 */
export interface Consultation {
  id?: string;
  name: string;
  phone: string;
  department: ConsultationDepartment;
  timestamp: Date;
  status: ConsultationStatus;
  createdAt?: Date;
  privacyAgreed?: boolean | null;

  date?: string; // "01-17" 형식의 날짜 필드
  utmSource?: string; // UTM 소스 (예: "naver", "google")
  utmMedium?: string; // UTM 매체 (예: "cpc", "organic")
  utmCampaign?: string; // UTM ucea0ud398uc778 (uc608: "invisalign_review")
  utmContent?: string; // UTM ucf58ud150uce20 (uc608: "post_324", "uc778ube44uc808ub77cuc778_ud6c4uae30_30ub300")
  consult1?: string; // 1차 상담 메모 (예: "[1.17] 통화완료")
  consult2?: string; // 2차 상담 메모
  consult3?: string; // 3차 상담 메모
  consult4?: string; // 4차 상담 메모
  memo?: string; // 비고 필드
}

/**
 * 상담 신청 폼에서 제출되는 데이터 타입
 * 
 * @property {string} name - 환자 이름
 * @property {string} phone - 전화번호 (포맷팅된 형태: 010-1234-5678)
 * @property {string} department - 진료과목
 */
export interface ConsultationFormData {
  name: string;
  phone: string;
  department: string;
  /**
   * 개인정보처리방침 동의 여부
   * - 폼에서 체크박스로 수집될 수 있음
   */
  privacyAgreed?: boolean | null;

  // UTM Parameters
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

/**
 * 배너 이미지 메타데이터 타입
 */
export interface BannerMetadata {
  id: string;
  storagePath: string;
  downloadUrl: string;
  uploadedAt: Date;
  fileName: string;
  fileSize: number;
  linkUrl?: string;
}
