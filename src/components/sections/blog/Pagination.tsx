/**
 * 블로그 목록 페이지에서 페이지 번호를 넘길 수 있게 해주는 '페이지네이션' 컴포넌트입니다.
 *
 * 모바일 대응:
 * - 화면 폭이 좁아도 가로 스크롤이 발생하지 않도록 표시 페이지 수를 동적으로 줄입니다.
 * - 이전/다음 버튼은 아이콘만 표시하여 공간을 절약합니다.
 */
'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  locale?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl, locale = 'kr' }: PaginationProps) {
  if (totalPages <= 1) return null;

  /**
   * 표시할 페이지 번호 목록을 생성합니다.
   *
   * 규칙:
   * - 첫 페이지(1)와 마지막 페이지(totalPages)는 항상 표시
   * - 현재 페이지 전후 1페이지씩 표시 (sibling)
   * - 건너뛴 구간은 '...'으로 표시
   * - 총 렌더 아이템 수: 최대 7개 (1 + ... + sibling + current + sibling + ... + last)
   */
  const getPageItems = (): (number | 'dots')[] => {
    const items: (number | 'dots')[] = [];
    const sibling = 1;

    const leftSibling = Math.max(currentPage - sibling, 2);
    const rightSibling = Math.min(currentPage + sibling, totalPages - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    // 항상 첫 페이지
    items.push(1);

    if (showLeftDots) {
      items.push('dots');
    } else {
      // 1과 leftSibling 사이의 페이지들
      for (let i = 2; i < leftSibling; i++) {
        items.push(i);
      }
    }

    // 현재 페이지 주변
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        items.push(i);
      }
    }

    if (showRightDots) {
      items.push('dots');
    } else {
      // rightSibling과 totalPages 사이의 페이지들
      for (let i = rightSibling + 1; i < totalPages; i++) {
        items.push(i);
      }
    }

    // 항상 마지막 페이지 (totalPages > 1일 때)
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  const pageItems = getPageItems();

  return (
    <nav
      aria-label="pagination"
      className="flex items-center justify-center gap-1 mt-12 mb-20"
    >
      {/* 이전 버튼 */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}` as any}
          prefetch={false}
          className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={locale === 'jp' ? '前のページ' : locale === 'en' ? 'Previous Page' : '이전 페이지'}
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-gray-200">
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* 페이지 번호 */}
      {pageItems.map((item, idx) => {
        if (item === 'dots') {
          return (
            <span
              key={`dots-${idx}`}
              className="flex items-center justify-center w-7 h-9 md:w-9 md:h-10 text-gray-400 text-sm select-none"
            >
              ···
            </span>
          );
        }

        const isActive = item === currentPage;
        return (
          <Link
            key={item}
            href={`${baseUrl}?page=${item}` as any}
            prefetch={false}
            className={`flex items-center justify-center min-w-[36px] h-9 md:min-w-[40px] md:h-10 px-1 rounded-lg text-[14px] md:text-[15px] font-medium transition-colors ${
              isActive
                ? 'bg-[#047e74] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item}
          </Link>
        );
      })}

      {/* 다음 버튼 */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}` as any}
          prefetch={false}
          className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={locale === 'jp' ? '次のページ' : locale === 'en' ? 'Next Page' : '다음 페이지'}
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-gray-200">
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </nav>
  );
}
