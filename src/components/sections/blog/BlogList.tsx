import { BlogCard, type BlogCardProps } from './BlogCard';

export interface BlogListProps {
  posts: BlogCardProps[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

/**
 * 블로그 글들을 모아서 격자(Grid) 모양으로 보여주는 목록 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 여러 개의 블로그 카드(BlogCard)를 한눈에 보기 좋게 배치합니다.
 * - 하단에 페이지 번호를 표시하여 다른 페이지의 글들도 볼 수 있게 합니다.
 * - 페이지를 넘기면 화면을 맨 위로 자동으로 올려주어 읽기 편하게 돕습니다.
 */
export function BlogList({
  posts,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: BlogListProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
      // 스크롤을 목록 상단으로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7; // 최대 표시할 페이지 번호 수

    if (totalPages <= maxVisible) {
      // 페이지가 적으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 페이지가 많으면 현재 페이지 주변만 표시
      if (currentPage <= 3) {
        // 처음 부분
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 끝 부분
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 중간 부분
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return (
      <nav
        className="flex items-center justify-center gap-2 mt-12 md:mt-16"
        aria-label="페이지네이션"
      >
        {/* 이전 버튼 */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg font-['Pretendard'] text-sm text-gray-600 hover:text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="이전 페이지"
        >
          이전
        </button>

        {/* 페이지 번호 */}
        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 font-['Pretendard'] text-sm text-gray-400"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`min-w-[40px] px-3 py-2 rounded-lg font-['Pretendard'] text-sm font-medium transition-colors ${isActive
                  ? 'bg-[#81cac4] text-white'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                aria-label={`페이지 ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg font-['Pretendard'] text-sm text-gray-600 hover:text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="다음 페이지"
        >
          다음
        </button>
      </nav>
    );
  };

  return (
    <div>
      {/* 그리드 레이아웃: 모바일 1열, 데스크톱 3열 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {renderPagination()}
    </div>
  );
}
