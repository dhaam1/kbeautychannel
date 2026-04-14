'use client';

import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQSectionProps {
  /**
   * FAQ 항목 배열
   */
  items: FAQItem[];
  /**
   * 섹션 제목 (기본: "자주하는 질문")
   */
  title?: string;
  /**
   * 기본적으로 열려있는 항목의 인덱스 (선택적)
   */
  defaultOpenIndex?: number;
  /**
   * 여러 항목을 동시에 열 수 있는지 여부 (기본: false, 하나만 열림)
   */
  allowMultiple?: boolean;
}

/**
 * 블로그 글 하단에 위치하는 '자주하는 질문(FAQ)' 섹션입니다.
 * 
 * 주요 기능:
 * - 질문 제목을 클릭하면 답변 내용이 아래로 부드럽게 펼쳐집니다 (아코디언 기능).
 * - 한 번에 하나의 질문만 열리게 하거나, 여러 질문을 동시에 열어둘 수도 있습니다.
 * - 사용자들이 궁금해할 만한 내용을 깔끔하게 정리해 보여줍니다.
 */
export function FAQSection({
  items,
  title = '자주하는 질문',
  defaultOpenIndex,
  allowMultiple = false,
}: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    defaultOpenIndex !== undefined ? new Set([defaultOpenIndex]) : new Set()
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="mt-12 md:mt-16">
      {/* 섹션 제목 */}
      {title && (
        <h2 className="font-['Pretendard'] text-[24px] md:text-[28px] font-bold text-black mb-6 md:mb-8">
          {title}
        </h2>
      )}

      {/* FAQ 항목 목록 */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndexes.has(index);

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* 질문 버튼 */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#81cac4] focus:ring-offset-2 rounded-xl"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                {/* 질문 텍스트 */}
                <span className="flex-1 font-['Pretendard'] text-[16px] md:text-[18px] font-bold text-black pr-4">
                  {item.question}
                </span>

                {/* Plus/Minus 아이콘 */}
                <div
                  className="flex-shrink-0"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* 답변 패널 (아코디언) */}
              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="pt-4 border-t border-gray-100">
                      <div className="font-['Pretendard'] text-[15px] md:text-[16px] text-gray-700 leading-relaxed">
                        {typeof item.answer === 'string' ? (
                          <p style={{ lineHeight: '1.8' }}>{item.answer}</p>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
