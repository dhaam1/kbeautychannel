'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface MonthRangePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (start: { year: number; month: number }, end: { year: number; month: number }) => void;
}

const YEARS = [2025, 2026];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function MonthRangePicker({ open, onOpenChange, onSelect }: MonthRangePickerProps) {
  const [startMonth, setStartMonth] = useState<{ year: number; month: number } | null>(null);
  const [endMonth, setEndMonth] = useState<{ year: number; month: number } | null>(null);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');

  const handleMonthClick = (year: number, month: number) => {
    if (selectionMode === 'start') {
      setStartMonth({ year, month });
      setSelectionMode('end');
    } else {
      // 시작월보다 이전 월을 선택하면 시작월로 설정
      if (startMonth) {
        const startDate = new Date(startMonth.year, startMonth.month - 1);
        const endDate = new Date(year, month - 1);
        if (endDate < startDate) {
          setEndMonth(startMonth);
          setStartMonth({ year, month });
        } else {
          setEndMonth({ year, month });
        }
      } else {
        setEndMonth({ year, month });
      }
      setSelectionMode('start');
    }
  };

  const handleApply = () => {
    if (startMonth && endMonth) {
      onSelect(startMonth, endMonth);
      onOpenChange(false);
      // Reset
      setStartMonth(null);
      setEndMonth(null);
      setSelectionMode('start');
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setStartMonth(null);
    setEndMonth(null);
    setSelectionMode('start');
  };

  const isMonthSelected = (year: number, month: number) => {
    if (!startMonth || !endMonth) return false;
    const date = new Date(year, month - 1);
    const startDate = new Date(startMonth.year, startMonth.month - 1);
    const endDate = new Date(endMonth.year, endMonth.month - 1);
    return date >= startDate && date <= endDate;
  };

  const isMonthStart = (year: number, month: number) => {
    return startMonth?.year === year && startMonth?.month === month;
  };

  const isMonthEnd = (year: number, month: number) => {
    return endMonth?.year === year && endMonth?.month === month;
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">기간 선택</h2>
            <p className="text-sm text-gray-500 mt-2">
              시작 월을 클릭한 후, 종료 월을 클릭하세요.
              {startMonth && (
                <span className="ml-2">
                  시작: {startMonth.year}년 {startMonth.month}월
                </span>
              )}
              {endMonth && (
                <span className="ml-2">
                  종료: {endMonth.year}년 {endMonth.month}월
                </span>
              )}
            </p>
          </div>

        <div className="space-y-6 mt-4">
          {YEARS.map((year) => (
            <div key={year}>
              <h3 className="text-lg font-semibold mb-3">{year}년</h3>
              <div className="grid grid-cols-6 gap-2">
                {MONTHS.map((month) => {
                  const selected = isMonthSelected(year, month);
                  const isStart = isMonthStart(year, month);
                  const isEnd = isMonthEnd(year, month);
                  
                  return (
                    <button
                      key={month}
                      onClick={() => handleMonthClick(year, month)}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all
                        ${selected
                          ? 'bg-blue-100 border-blue-500 text-blue-900 font-semibold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }
                        ${isStart ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${isEnd ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                      `}
                    >
                      <div className="text-sm">{month}월</div>
                      {isStart && <div className="text-xs text-blue-600">시작</div>}
                      {isEnd && <div className="text-xs text-blue-600">종료</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleApply}
              disabled={!startMonth || !endMonth}
              className="px-4 py-2 bg-[#047e74] hover:bg-[#036b63] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
