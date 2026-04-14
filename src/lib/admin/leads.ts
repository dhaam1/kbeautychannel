/**
 * 리드 데이터 처리 유틸리티 함수
 * 
 * @description
 * 리드 데이터의 필터링, 통계 계산 등을 담당합니다.
 */

import type { Consultation, ConsultationStatus } from '@/lib/firebase/types';

/**
 * 월별 필터링
 * 
 * @param leads - 리드 데이터 배열
 * @param year - 년도 (예: 2026)
 * @param month - 월 (1-12)
 * @returns 필터링된 리드 배열
 */
export function filterLeadsByMonth(
  leads: Consultation[],
  year: number,
  month: number
): Consultation[] {
  return leads.filter((lead) => {
    const date = lead.createdAt || lead.timestamp;
    if (!date) return false;
    const d = date instanceof Date ? date : new Date(date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
}

/**
 * 기간별 필터링
 * 
 * @param leads - 리드 데이터 배열
 * @param startMonth - 시작 월 (예: { year: 2025, month: 10 })
 * @param endMonth - 종료 월 (예: { year: 2026, month: 1 })
 * @returns 필터링된 리드 배열
 */
export function filterLeadsByDateRange(
  leads: Consultation[],
  startMonth: { year: number; month: number },
  endMonth: { year: number; month: number }
): Consultation[] {
  const startDate = new Date(startMonth.year, startMonth.month - 1, 1);
  const endDate = new Date(endMonth.year, endMonth.month, 0, 23, 59, 59);

  return leads.filter((lead) => {
    const date = lead.createdAt || lead.timestamp;
    if (!date) return false;
    const d = date instanceof Date ? date : new Date(date);
    return d >= startDate && d <= endDate;
  });
}

/**
 * 일자별 통계 계산
 * 
 * @param leads - 리드 데이터 배열
 * @param year - 년도
 * @param month - 월
 * @returns 일자별 통계 객체 배열
 */
export function calculateDailyStats(
  leads: Consultation[],
  year: number,
  month: number
): Array<{
  day: number;
  상담대기: number;
  상담완료: number;
  예약완료: number;
  부재: number;
  결번: number;
  취소: number;
  미내원: number;
  내원완료: number;
  total: number;
}> {
  const filtered = filterLeadsByMonth(leads, year, month);
  const daysInMonth = new Date(year, month, 0).getDate();
  const stats: Record<number, { 상담대기: number; 상담완료: number; 예약완료: number; 부재: number; 결번: number; 취소: number; 미내원: number; 내원완료: number }> = {};

  // 초기화
  for (let day = 1; day <= daysInMonth; day++) {
    stats[day] = { 상담대기: 0, 상담완료: 0, 예약완료: 0, 부재: 0, 결번: 0, 취소: 0, 미내원: 0, 내원완료: 0 };
  }

  // 통계 계산
  filtered.forEach((lead) => {
    const date = lead.createdAt || lead.timestamp;
    if (!date) return;
    const d = date instanceof Date ? date : new Date(date);
    const day = d.getDate();

    if (stats[day] && lead.status in stats[day]) {
      stats[day][lead.status as keyof typeof stats[number]]++;
    }
  });

  // 결과 배열로 변환
  return Object.entries(stats).map(([day, counts]) => ({
    day: parseInt(day, 10),
    ...counts,
    total: counts.상담대기 + counts.상담완료 + counts.예약완료 + counts.부재 + counts.결번 + counts.취소 + counts.미내원 + counts.내원완료,
  }));
}

/**
 * UTM 소스/매체별 통계 계산
 * 
 * @param leads - 리드 데이터 배열
 * @returns UTM별 통계 객체 배열
 */
export function calculateUTMStats(
  leads: Consultation[]
): Array<{
  utm: string;
  count: number;
  percentage: number;
}> {
  const utmMap: Record<string, number> = {};

  leads.forEach((lead) => {
    const utm = formatUTMString(lead.utmSource, lead.utmMedium) || 'direct / none';
    utmMap[utm] = (utmMap[utm] || 0) + 1;
  });

  const total = leads.length;
  return Object.entries(utmMap)
    .map(([utm, count]) => ({
      utm,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 월별 통계 계산
 * 
 * @param leads - 리드 데이터 배열
 * @param startMonth - 시작 월
 * @param endMonth - 종료 월
 * @returns 월별 통계 객체 배열
 */
export function calculateMonthlyStats(
  leads: Consultation[],
  startMonth: { year: number; month: number },
  endMonth: { year: number; month: number }
): Array<{
  year: number;
  month: number;
  label: string;
  total: number;
  statusCounts: Record<ConsultationStatus, number>;
}> {
  const filtered = filterLeadsByDateRange(leads, startMonth, endMonth);
  const statsMap: Record<string, { year: number; month: number; statusCounts: Record<string, number> }> = {};

  filtered.forEach((lead) => {
    const date = lead.createdAt || lead.timestamp;
    if (!date) return;
    const d = date instanceof Date ? date : new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const key = `${year}-${month}`;

    if (!statsMap[key]) {
      statsMap[key] = {
        year,
        month,
        statusCounts: {
          상담대기: 0,
          상담완료: 0,
          예약완료: 0,
          부재: 0,
          결번: 0,
          취소: 0,
          미내원: 0,
          내원완료: 0,
        },
      };
    }

    statsMap[key].statusCounts[lead.status] = (statsMap[key].statusCounts[lead.status] || 0) + 1;
  });

  // 결과 배열로 변환 및 정렬
  return Object.values(statsMap)
    .map((stat) => ({
      year: stat.year,
      month: stat.month,
      label: `${stat.year}.${String(stat.month).padStart(2, '0')}`,
      total: Object.values(stat.statusCounts).reduce((sum, count) => sum + count, 0),
      statusCounts: stat.statusCounts as Record<ConsultationStatus, number>,
    }))
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
}

/**
 * UTM 소스와 매체를 문자열로 포맷팅합니다
 * 
 * @param source - UTM 소스
 * @param medium - UTM 매체
 * @returns "source / medium" 형식의 문자열 또는 null
 * 
 * @example
 * formatUTMString("naver", "cpc") // "naver / cpc"
 * formatUTMString(null, null) // null
 */
export function formatUTMString(source?: string | null, medium?: string | null): string | null {
  if (!source && !medium) return null;
  const s = source || 'direct';
  const m = medium || 'none';
  return `${s} / ${m}`;
}

/**
 * UTM 소스, 매체, 캠페인, 콘텐츠를 모두 포함한 문자열로 포맷팅합니다
 * 
 * @param source - UTM 소스
 * @param medium - UTM 매체
 * @param campaign - UTM 캠페인 (선택)
 * @param content - UTM 콘텐츠 (선택)
 * @returns "source / medium (campaign / content)" 형식의 문자열 또는 null
 * 
 * @example
 * formatUTMFullString("naver", "cpc", "spring_sale", "banner") // "naver / cpc (spring_sale / banner)"
 * formatUTMFullString("blog", "web", null, "인비절라인_후기") // "blog / web (none / 인비절라인_후기)"
 */
export function formatUTMFullString(
  source?: string | null,
  medium?: string | null,
  campaign?: string | null,
  content?: string | null
): string | null {
  if (!source && !medium && !campaign && !content) return null;
  
  const s = source || 'direct';
  const m = medium || 'none';
  
  const parts: string[] = [];
  if (campaign) parts.push(campaign);
  if (content) parts.push(content);
  
  if (parts.length > 0) {
    return `${s} / ${m} (${parts.join(' / ')})`;
  }
  
  return `${s} / ${m}`;
}
