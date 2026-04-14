/**
 * CSV 내보내기 유틸리티 함수
 * 
 * @description
 * 리드 데이터를 CSV 파일로 내보내는 기능을 제공합니다.
 */

import type { Consultation } from '@/lib/firebase/types';
import { formatUTMString } from './leads';

/**
 * 리드 데이터를 CSV 파일로 내보냅니다
 * 
 * @param leads - 내보낼 리드 데이터 배열
 * @param filename - 파일명 (기본값: "leads-YYYY-MM-DD.csv")
 * 
 * @example
 * exportLeadsToCSV(leads, "2026-01-leads.csv")
 */
export function exportLeadsToCSV(leads: Consultation[], filename?: string): void {
  if (leads.length === 0) {
    alert('내보낼 데이터가 없습니다.');
    return;
  }

  // 파일명 생성
  if (!filename) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    filename = `leads-${dateStr}.csv`;
  }

  // CSV 헤더
  const headers = [
    '날짜',
    '이름',
    '연락처',
    '진료과목',
    '1차 상담',
    '2차 상담',
    '3차 상담',
    '4차 상담',
    '상태',
    '동의',
    '비고',
    'UTM 소스/매체',
    'UTM 캠페인',
    'UTM 콘텐츠',
  ];

  // CSV 데이터 행 생성
  const rows = leads.map((lead) => {
    const date = lead.date || (lead.createdAt 
      ? `${String(lead.createdAt.getMonth() + 1).padStart(2, '0')}-${String(lead.createdAt.getDate()).padStart(2, '0')}`
      : '');
    const consent = lead.privacyAgreed !== false ? '동의' : '미동의';
    const utm = formatUTMString(lead.utmSource, lead.utmMedium);

    // CSV에서 쉼표와 따옴표를 이스케이프 처리
    const escapeCSV = (value: string | undefined | null) => {
      if (!value) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    return [
      escapeCSV(date),
      escapeCSV(lead.name),
      escapeCSV(lead.phone),
      escapeCSV(lead.department),
      escapeCSV(lead.consult1),
      escapeCSV(lead.consult2),
      escapeCSV(lead.consult3),
      escapeCSV(lead.consult4),
      escapeCSV(lead.status),
      escapeCSV(consent),
      escapeCSV(lead.memo),
      escapeCSV(utm),
      escapeCSV(lead.utmCampaign),
      escapeCSV(lead.utmContent),
    ].join(',');
  });

  // CSV 내용 생성
  const csvContent = [headers.join(','), ...rows].join('\n');

  // BOM 추가 (Excel에서 한글 깨짐 방지)
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // 다운로드
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
