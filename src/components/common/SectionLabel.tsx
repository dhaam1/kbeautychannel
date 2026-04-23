import React from 'react';

interface SectionLabelProps {
  number: string;
  title: string;
  dark?: boolean;
}

/**
 * 섹션 식별을 위한 프리미엄 라벨 컴포넌트
 * @param number 섹션 번호 (예: "01")
 * @param title 섹션 이름 (예: "HERO")
 * @param dark 배경이 어두울 경우 대비를 위해 사용
 */
export default function SectionLabel({ number, title, dark = false }: SectionLabelProps) {
  return (
    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-[100] pointer-events-none select-none">
      <div className={`
        flex items-center gap-3 px-4 py-2 rounded-full border shadow-sm transition-all duration-300
        ${dark 
          ? 'bg-black/10 backdrop-blur-xl border-white/10 hover:bg-black/20' 
          : 'bg-white/30 backdrop-blur-xl border-white/40 hover:bg-white/40'
        }
      `}>
        <div className="flex items-center gap-1.5">
          <span className={`
            font-mono text-[16px] font-bold uppercase tracking-tighter
            ${dark ? 'text-white/40' : 'text-gray-400'}
          `}>
            NO.
          </span>
          <span className={`
            font-sans text-[16px] font-bold tracking-widest
            ${dark ? 'text-white' : 'text-gray-900'}
          `}>
            {number}
          </span>
        </div>
        
        <div className={`w-[1px] h-3 ${dark ? 'bg-white/20' : 'bg-gray-200'}`}></div>
        
        <span className={`
          font-sans text-[16px] font-bold uppercase tracking-[0.2em]
          ${dark ? 'text-white/80' : 'text-gray-900/80'}
        `}>
          {title}
        </span>
      </div>
    </div>
  );
}
