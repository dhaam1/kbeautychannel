'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getConsultations, updateConsultationStatus, updateLeadConsultNote, updateLeadMemo, updateLeadCategory, updateLeadPhone, updateLeadPrivacyAgreed, deleteConsultation } from '@/lib/firebase/admin';
import { Consultation, ConsultationStatus } from '@/lib/firebase/types';
import { CONSULTATION_STATUSES, CONSULTATION_DEPARTMENTS, STATUS_COLORS, STATUS_ICONS, getDepartmentLabel } from '@/lib/firebase/constants';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DailyLeadChart } from '@/components/admin/DailyLeadChart';
import { UTMDonutChart } from '@/components/admin/UTMDonutChart';
import { SummaryCard } from '@/components/admin/SummaryCard';
import { InlineEditor } from '@/components/admin/InlineEditor';
import { filterLeadsByMonth, calculateDailyStats, calculateUTMStats, filterLeadsByDateRange, formatUTMString, formatUTMFullString } from '@/lib/admin/leads';
import { exportLeadsToCSV } from '@/lib/admin/csvExport';
import { formatConsultNote } from '@/lib/admin/consultNotes';
import toast from 'react-hot-toast';

interface LeadsManagementProps {
  showLogoutButton?: boolean;
  showWpAdminLink?: boolean;
  hideHeader?: boolean;
}

/**
 * 리드 관리 시스템 컴포넌트
 * 
 * @description
 * 리드 관리 대시보드 컴포넌트로, 차트, 필터링, 테이블 관리를 포함합니다.
 * 스태프 및 마스터 대시보드에서 재사용 가능합니다.
 */
export function LeadsManagement({
  showLogoutButton = true,
  showWpAdminLink = false,
  hideHeader = false
}: LeadsManagementProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const [viewMode, setViewMode] = useState<'monthly' | 'all'>('monthly');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // 데이터 로드
  const loadConsultations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getConsultations();
      setConsultations(data);
    } catch (err: any) {
      setError(err.message || '리드 데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('리드 데이터 로드 오류:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 자동 새로고침
  const { isRotating, lastRefreshTime, triggerRefresh } = useAutoRefresh({
    interval: 60000,
    rotationDuration: 2000,
    onRefresh: loadConsultations,
    enabled: true,
  });

  // 초기 데이터 로드
  useEffect(() => {
    loadConsultations();
  }, [loadConsultations]);

  // 필터링된 리드 (페이지네이션 적용 전 전체)
  const filteredLeads = useMemo(() => {
    let filtered = consultations;

    if (viewMode === 'monthly') {
      filtered = filterLeadsByMonth(consultations, selectedYear, selectedMonth);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((lead) => {
        const name = lead.name.toLowerCase();
        const phone = lead.phone.toLowerCase();
        return name.includes(query) || phone.includes(query);
      });
    }

    return filtered;
  }, [consultations, selectedYear, selectedMonth, searchQuery, viewMode]);

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / ITEMS_PER_PAGE));
  const showPagination = filteredLeads.length > ITEMS_PER_PAGE;

  // 페이지 변경 시 범위 보정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // 현재 페이지에 표시할 리드
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLeads, currentPage]);

  // 통계 계산
  const stats = useMemo(() => {
    const 전체 = filteredLeads.length;
    const 상담대기 = filteredLeads.filter((l) => l.status === '상담대기').length;
    const 상담완료 = filteredLeads.filter((l) => l.status === '상담완료').length;
    const 예약완료 = filteredLeads.filter((l) => l.status === '예약완료').length;
    return { 전체, 상담대기, 상담완료, 예약완료 };
  }, [filteredLeads]);

  // 일자별 통계 (Latest 모드일 때도 현재 보이는 데이터 기준으로 할지, 월별 기준일지? 
  // 보통 차트는 경향성을 보는 것이므로 월별 기준으로 유지하거나, 현재 뷰 데이터를 반영. 
  // 사용자 요청은 "리스트" 불러오기 버튼임. 차트는 월별 유지가 자연스러울 수 있으나, 
  // 리스트와 차트의 싱크가 맞지 않으면 혼란스러움.
  // 여기서는 'monthly' 모드일 때만 월 기준, 'latest'일 때는 현재 보여지는 데이터 기준 통계로 변경하거나,
  // 차트는 항상 '선택된 월'을 보여주도록 유지하는게 나을 수도 있음. 
  // 기존 코드: calculateDailyStats(consultations, selectedYear, selectedMonth) -> 항상 전체 데이터에서 해당 월 통계 뽑음.
  // 유지하면: 리스트는 최신 10개인데 차트는 1월달 전체... 
  // -> 사용자가 헷갈릴 수 있음. 하지만 "일자별 리드 처리 현황"은 보통 월별 추이를 보는 것.
  // "최신 10개"는 리스트 뷰의 편의 기능. 차트는 '월별' 컨텍스트를 유지하는게 낫다고 판단됨.)
  const dailyStats = useMemo(() => {
    return calculateDailyStats(consultations, selectedYear, selectedMonth);
  }, [consultations, selectedYear, selectedMonth]);

  // UTM 통계 (리스트에 보이는 것 기준이 좋을듯)
  const utmStats = useMemo(() => {
    // UTM은 현재 필터된 리스트 기준 (Latest 10개면 그 10개의 UTM 분포)
    return calculateUTMStats(filteredLeads);
  }, [filteredLeads]);


  // ... (핸들러들은 그대로) ...

  // UI 렌더링 부분 수정: 필터 영역에 버튼 추가
  // ...

  // (아래는 기존 코드의 return 문 직전까지의 로직들 복원 및 수정)
  // handleStatusChange, handleConsultNoteUpdate 등은 그대로 유지됨 (이전 코드 블록에 포함되지 않은 부분은 영향 없음)

  // 상태 변경 핸들러 등은 filteredLeads와 관계 없이 동작하므로 수정 불필요.

  // ...

  // 렌더링 부분의 year/month select 변경 핸들러 수정 필요
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setViewMode('monthly');
    setCurrentPage(1);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setViewMode('monthly');
    setCurrentPage(1);
  };

  // 전체 보기 핸들러
  const handleAllView = () => {
    setViewMode('all');
    setCurrentPage(1);
  };


  // 상태 변경 핸들러
  const handleStatusChange = async (leadId: string, newStatus: ConsultationStatus) => {
    try {
      await updateConsultationStatus(leadId, newStatus);
      await loadConsultations();
      toast.success(`상태가 "${newStatus}"로 변경되었습니다.`);
    } catch (err: any) {
      toast.error(err.message || '상태 변경 중 오류가 발생했습니다.');
    }
  };

  // 상담 메모 업데이트 핸들러
  const handleConsultNoteUpdate = async (leadId: string, consultNumber: 1 | 2 | 3 | 4, note: string) => {
    try {
      // 빈 값이면 빈 문자열 저장
      if (!note || note.trim() === '' || note === '입력...') {
        await updateLeadConsultNote(leadId, consultNumber, '');
      } else {
        // 날짜 자동 추가 (이미 날짜가 포함되어 있지 않은 경우만)
        const hasDate = /^\[\d{1,2}\.\d{1,2}\]/.test(note);
        const formattedNote = hasDate ? note : formatConsultNote(note, new Date());
        await updateLeadConsultNote(leadId, consultNumber, formattedNote);
      }
      await loadConsultations();
    } catch (err: any) {
      toast.error(err.message || '메모 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 비고 업데이트 핸들러
  const handleMemoUpdate = async (leadId: string, memo: string) => {
    try {
      await updateLeadMemo(leadId, memo);
      await loadConsultations();
    } catch (err: any) {
      toast.error(err.message || '비고 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 진료과목 업데이트 핸들러
  const handleCategoryUpdate = async (leadId: string, category: string) => {
    try {
      await updateLeadCategory(leadId, category);
      await loadConsultations();
      toast.success('진료과목이 변경되었습니다.');
    } catch (err: any) {
      toast.error(err.message || '진료과목 변경 중 오류가 발생했습니다.');
    }
  };



  // 연락처 업데이트 핸들러
  const handlePhoneUpdate = async (leadId: string, phone: string) => {
    try {
      await updateLeadPhone(leadId, phone);
      await loadConsultations();
      toast.success('연락처가 변경되었습니다.');
    } catch (err: any) {
      toast.error(err.message || '연락처 변경 중 오류가 발생했습니다.');
    }
  };

  // 개인정보 동의 여부 토글 핸들러 (더 이상 사용 안함, 드롭다운으로 대체됨)
  // const handlePrivacyAgreedToggle = ... 

  // 개인정보 동의 셀렉트 핸들러
  const handlePrivacyAgreedChange = async (leadId: string, value: string) => {
    try {
      let isAgreed: boolean | null = null;
      if (value === 'true') isAgreed = true;
      else if (value === 'false') isAgreed = false;

      await updateLeadPrivacyAgreed(leadId, isAgreed);
      await loadConsultations();

      const statusText = isAgreed === true ? '동의' : isAgreed === false ? '미동의' : '-';
      toast.success(`치료 진행 결과가 ${statusText}(으)로 변경되었습니다.`);
    } catch (err: any) {
      toast.error(err.message || '치료 진행 결과 변경 중 오류가 발생했습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = async (leadId: string) => {
    if (!window.confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      await deleteConsultation(leadId);
      await loadConsultations();
      toast.success('상담 데이터가 삭제되었습니다.');
    } catch (err: any) {
      toast.error(err.message || '삭제 중 오류가 발생했습니다.');
    }
  };

  // CSV 내보내기
  const handleCSVExport = () => {
    exportLeadsToCSV(filteredLeads, `leads-${selectedYear}-${String(selectedMonth).padStart(2, '0')}.csv`);
  };

  // 날짜 포맷팅
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    const d = date instanceof Date ? date : new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
  };

  // 년도/월 옵션 생성
  const yearOptions = [2024, 2025, 2026, 2027];
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  if (isLoading && consultations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#047e74] mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="w-full mx-auto space-y-6">
        {/* 헤더 */}
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">리드 관리 시스템</h1>
              <p className="text-gray-600 mt-1">리드 현황 및 상담 관리</p>
            </div>
            <div className="flex items-center gap-3">
              {showWpAdminLink && (
                <a
                  href="https://wp.blanche.kr/wp-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0073aa] text-white rounded-lg hover:bg-[#006799] transition-colors shadow-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .4C4.69.4.406 4.694.406 10c0 5.3 4.285 9.6 9.594 9.6 5.306 0 9.594-4.3 9.594-9.6S15.306.4 10 .4zM9.626 12.378c-.68 1.488-2.074 4.793-2.074 4.793s-.36.142-.236.212c-.516-.68-1.578-1.85-1.92-3.14-.142-.51-.255-1.048-.255-2.096 0-3.11 2.52-6.505 5.26-6.505.594 0 1.05.085 1.5.227-.396 1.33-1.077 3.326-2.275 6.508zM17.48 10c0 1.954-.736 3.737-1.954 5.105 0-.028.028-.227.028-.425 0-1.783-2.943-6.618-2.943-6.618.736-1.585 1.076-2.915 1.076-4.103 0-.482-.057-.935-.114-1.388 2.378 1.84 3.907 4.67 3.907 7.428zM2.385 10c0-2.32 1.077-4.414 2.773-5.83-.028.17-.028.312-.028.482 0 .934.396 3.79 3.03 6.957l-4.785 13.92C2.81 23.447 2.385 16.736 2.385 10zm7.188 7.37s1.33 3.99 1.557 4.98c-3.17.65-6.396-.537-8.35-3.056l6.793-1.924z" />
                  </svg>
                  WP 관리자
                </a>
              )}
              {showLogoutButton && (
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md"
                >
                  로그아웃
                </button>
              )}
            </div>
          </div>
        )}

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col gap-4">
            {/* 상단 필터 그룹: 기간 선택 vs 최신 보기 */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 pb-4">
              {/* 월 선택 */}
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${viewMode === 'monthly' ? 'text-gray-800' : 'text-gray-400'}`}>📅 월별 보기:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(Number(e.target.value))}
                  className={`px-3 py-1.5 border rounded-lg outline-none transition-colors ${viewMode === 'monthly' ? 'border-gray-300 focus:ring-2 focus:ring-[#047e74]' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(Number(e.target.value))}
                  className={`px-3 py-1.5 border rounded-lg outline-none transition-colors ${viewMode === 'monthly' ? 'border-gray-300 focus:ring-2 focus:ring-[#047e74]' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* 전체 보기 버튼 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAllView}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${viewMode === 'all'
                    ? 'bg-[#047e74] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
                >
                  전체 보기
                </button>
              </div>
            </div>

            {/* 검색 (하단) */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="이름, 전화번호 검색..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#047e74] focus:border-[#047e74] outline-none"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 테이블: 상담 관리 리스트 (상단 이동) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              <h3 className="font-bold text-gray-800">
                상담 관리 리스트 <span className="text-gray-400 font-normal ml-1">({filteredLeads.length}건)</span>
              </h3>
            </div>
            <button
              onClick={handleCSVExport}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00BA7C] hover:bg-[#00a86d] text-white rounded-lg text-sm font-bold transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              CSV 다운로드
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#047e74]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    날짜/시간
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    이름
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    연락처
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    진료과목
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    1차 상담
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    2차 상담
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    3차 상담
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    상태
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10 whitespace-nowrap">
                    치료 진행 결과
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    UTM 소스/매체
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-100/10">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-12 text-center text-gray-500">
                      리드 데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:brightness-95 transition-all ${STATUS_COLORS[lead.status].bg}`}
                    >
                      {/* 날짜/시간 */}
                      <td className={`px-4 py-3 whitespace-nowrap ${STATUS_COLORS[lead.status].bg}`}>
                        <div className="text-[13px] text-gray-500 font-medium">
                          {formatDate(lead.createdAt || lead.timestamp)}
                        </div>
                      </td>
                      {/* 이름 */}
                      <td className={`px-4 py-3 whitespace-nowrap ${STATUS_COLORS[lead.status].bg}`}>
                        <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                      </td>
                      {/* 연락처 */}
                      <td className={`px-4 py-3 whitespace-nowrap border-r border-gray-100 ${STATUS_COLORS[lead.status].bg}`}>
                        <div className="min-w-[120px]">
                          <InlineEditor
                            value={lead.phone}
                            onSave={(value) => {
                              if (lead.id) {
                                handlePhoneUpdate(lead.id, value);
                              }
                            }}
                            placeholder="연락처 입력..."
                          />
                        </div>
                      </td>
                      {/* 진료과목 */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={lead.department}
                          onChange={(e) => lead.id && handleCategoryUpdate(lead.id, e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#047e74] bg-white/50"
                        >
                          {CONSULTATION_DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* 1차~3차 상담 */}
                      {[1, 2, 3].map((num) => {
                        const consultKey = `consult${num}` as 'consult1' | 'consult2' | 'consult3';
                        const consultValue = lead[consultKey] || '';
                        return (
                          <td key={num} className="px-4 py-3 min-w-[180px]">
                            <InlineEditor
                              value={consultValue}
                              onSave={(value) => {
                                if (lead.id) {
                                  handleConsultNoteUpdate(lead.id, num as 1 | 2 | 3, value);
                                }
                              }}
                              placeholder="입력..."
                              multiline
                            />
                          </td>
                        );
                      })}
                      {/* 상태 */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value as ConsultationStatus)}
                          className={`px-3 py-1 rounded text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#047e74] ${STATUS_COLORS[lead.status].bg} ${STATUS_COLORS[lead.status].text} border border-current/20`}
                        >
                          {CONSULTATION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* 개인정보 동의 (드롭다운) */}
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <select
                          value={lead.privacyAgreed === true ? 'true' : lead.privacyAgreed === false ? 'false' : ''}
                          onChange={(e) => lead.id && handlePrivacyAgreedChange(lead.id, e.target.value)}
                          className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#047e74] bg-white/50 text-gray-700"
                        >
                          <option value="">-</option>
                          <option value="true">동의</option>
                          <option value="false">미동의</option>
                        </select>
                      </td>

                      {/* UTM 소스/매체 */}
                      <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-500">
                        {formatUTMString(lead.utmSource, lead.utmMedium) || '-'}
                      </td>

                      {/* 관리 (삭제 버튼) */}
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => lead.id && handleDelete(lead.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="삭제"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 테이블 하단 상태 색상 코드 가이드 */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">상태별 색상 코드</span>
              <div className="flex flex-wrap gap-4">
                {CONSULTATION_STATUSES.map(status => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[status].bg} border border-current/10`} />
                    <span className="text-xs text-gray-600 font-medium">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          {showPagination && (
            <div className="px-6 py-4 border-t border-gray-100 flex justify-center items-center gap-1">
              {/* 맨 처음 */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                &laquo;
              </button>
              {/* 이전 */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                &lsaquo;
              </button>
              {/* 페이지 번호 */}
              {(() => {
                const pages: number[] = [];
                const maxVisible = 5;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = Math.min(totalPages, start + maxVisible - 1);
                if (end - start + 1 < maxVisible) {
                  start = Math.max(1, end - maxVisible + 1);
                }
                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }
                return pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[32px] px-2 py-1.5 text-sm rounded-md transition-colors ${
                      page === currentPage
                        ? 'bg-[#047e74] text-white font-bold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ));
              })()}
              {/* 다음 */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                &rsaquo;
              </button>
              {/* 맨 끝 */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-2.5 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="전체" value={stats.전체} color="gray" />
          <SummaryCard title="상담대기" value={stats.상담대기} color="orange" />
          <SummaryCard title="상담완료" value={stats.상담완료} color="green" />
          <SummaryCard title="예약완료" value={stats.예약완료} color="blue" />
        </div>

        {/* 일자별 리드 처리 현황 (아코디언) */}
        <Accordion type="single" collapsible defaultValue="daily" className="bg-white rounded-lg shadow-md p-6">
          <AccordionItem value="daily">
            <AccordionTrigger className="text-lg font-semibold">일자별 리드 처리 현황</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-center gap-6 mt-4">
                <div className="w-full">
                  <DailyLeadChart data={dailyStats} year={selectedYear} month={selectedMonth} />
                </div>
                <div className="w-full">
                  <UTMDonutChart data={utmStats} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
