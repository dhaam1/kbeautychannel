/**
 * 상담 신청 폼에서 사용되는 '진료과목 선택' 박스 컴포넌트입니다.
 * 클릭하면 아래로 선택 목록이 펼쳐지는 드롭다운 형식입니다.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface ConsultationSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export function ConsultationSelect({
  value,
  onChange,
  options,
  placeholder = '선택해주세요',
  className = '',
}: ConsultationSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[60px] px-5 rounded-xl border border-gray-300 bg-white outline-none flex items-center justify-between transition-colors font-['Noto_Sans_KR',sans-serif] text-base ${isOpen ? 'border-[#7ECEC0] ring-2 ring-[#7ECEC0]/20' : ''
          }`}
      >
        <span className={value ? 'text-black' : 'text-gray-400'}>
          {value ? selectedLabel : placeholder}
        </span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl border border-gray-200 z-50 overflow-hidden max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-5 py-4 hover:bg-[#f0f9f8] transition-colors font-['Noto_Sans_KR',sans-serif] text-base ${value === option.value ? 'text-[#047e74] font-medium bg-[#f0f9f8]' : 'text-gray-700'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
