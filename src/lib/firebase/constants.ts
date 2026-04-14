/**
 * 상담 관련 상수 정의
 * 
 * @description
 * 진료과목, 상태 등의 옵션과 라벨/색상 매핑을 정의합니다.
 */

import type { ConsultationDepartment, ConsultationStatus } from './types';

/**
 * 진료과목 옵션 목록
 */
export const CONSULTATION_DEPARTMENTS: ConsultationDepartment[] = [
  '블랑쉬',
  '임플란트',
  '교정',
  '기타진료',
];

/**
 * 상담 상태 옵션 목록
 */
export const CONSULTATION_STATUSES: ConsultationStatus[] = [
  '상담대기',
  '상담완료',
  '부재',
  '결번',
  '예약완료',
  '취소',
  '미내원',
  '내원완료',
];

/**
 * 상태별 색상 매핑
 */
export const STATUS_COLORS: Record<ConsultationStatus, { bg: string; text: string; border?: string }> = {
  '상담대기': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-400' }, // 주황
  '상담완료': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' }, // 초록
  '부재': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-400' }, // 회색
  '결번': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' }, // 빨강
  '예약완료': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' }, // 파랑
  '취소': { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-400' }, // 슬레이트
  '미내원': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' }, // 노랑
  '내원완료': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-400' }, // 에메랄드
};

/**
 * 상태별 아이콘/이모지 매핑
 */
export const STATUS_ICONS: Record<ConsultationStatus, string> = {
  '상담대기': '⏳',
  '상담완료': '✅',
  '부재': '📞',
  '결번': '❌',
  '예약완료': '📅',
  '취소': '🚫',
  '미내원': '⚠️',
  '내원완료': '🏥',
};

/**
 * 진료과목 라벨 (저장값이 이미 한글이므로 그대로 반환)
 */
export function getDepartmentLabel(dept: string): ConsultationDepartment {
  if (CONSULTATION_DEPARTMENTS.includes(dept as ConsultationDepartment)) {
    return dept as ConsultationDepartment;
  }
  // 알 수 없는 값은 기타진료로 fallback
  return '기타진료';
}
