import { ReactNode } from 'react';
import Link from 'next/link';
import { getBlogCategoryPath, getBlogAuthorPath } from '@/lib/blogPathHelper';

export interface PostHeaderProps {
  title: string;
  date: string;
  author?: string;
  authorSlug?: string;
  category?: string;
  categoryLabel?: string;
  excerpt?: string;
  align?: 'left' | 'center';
  showSeparator?: boolean;
  locale?: string;
}

/**
 * 블로그 상세 페이지 상단에 나타나는 '제목 부분' 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 글의 제목을 크게 보여줍니다.
 * - 어떤 카테고리의 글인지, 누가 언제 썼는지를 한눈에 알 수 있게 표시합니다.
 * - 카테고리나 작성자 이름을 클릭하면 해당 목록 페이지로 바로 이동할 수 있습니다.
 */
export function PostHeader({
  title,
  date,
  author,
  authorSlug,
  category,
  categoryLabel,
  excerpt,
  align = 'left',
  showSeparator = true,
  locale = 'kr',
}: PostHeaderProps) {
  const isJp = locale === 'jp';
  const t = {
    authorLabel: isJp ? '著者:' : locale === 'en' ? 'Author:' : '작성자:',
    author: isJp ? 'ブランシュ歯科' : locale === 'en' ? 'Blanche Dental Clinic' : '블랑쉬치과',
  };

  const formattedDate = new Date(date).toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getCategoryLabel = (cat: string) => {
    if (categoryLabel) return categoryLabel;

    // WordPress 실제 카테고리명과 일치하도록 수정
    const categoryMap: Record<string, string> = isJp ? {
      laminate: 'ラミネートベニア',
      implant: 'インプラント',
      orthodontic: '歯列矯正',
      'tooth-whitening': 'ホワイトニング',
      scaling: 'スケーリング',
      'doctor-column': '院長コラム',
      sleep: '睡眠治療'
    } : locale === 'en' ? {
      laminate: 'Laminate',
      implant: 'Implant',
      orthodontic: 'Orthodontics',
      'tooth-whitening': 'Teeth Whitening',
      scaling: 'Scaling',
      'doctor-column': 'Specialist Column',
      sleep: 'Sleep Dentistry'
    } : {
      laminate: '라미네이트',
      implant: '임플란트',
      orthodontic: '치아교정',
      'tooth-whitening': '치아미백',
      scaling: '스케일링',
      'doctor-column': '원장님 칼럼',
      sleep: '수면치료'
    };

    return categoryMap[cat] || cat;
  };

  return (
    <header className="entry-header">
      {/* 카테고리 배지 (선택적) - 클릭 가능한 링크 */}
      {category && (
        <div className="mb-4">
          <Link
            href={getBlogCategoryPath(locale, category)}
            className="inline-flex items-center rounded-full border border-black/10 px-[10px] py-[6px] font-['Pretendard'] text-[12px] text-black/70 tracking-[-0.12px] hover:bg-black/5 transition-colors"
          >
            {categoryLabel || getCategoryLabel(category)}
          </Link>
        </div>
      )}

      {/* 제목 - WordPress 원본 디자인 반영 */}
      <h1
        className={`entry-title font-['Pretendard',sans-serif] text-[32px] md:text-[40px] font-bold leading-tight mb-4 text-black ${align === 'center' ? 'text-center' : 'text-left'
          }`}
      >
        {title}
      </h1>

      {/* 메타 정보: 작성자 및 날짜 - WordPress 원본 HTML 구조 반영 */}
      <div
        className={`entry-meta mb-8 font-['Pretendard',sans-serif] text-[14px] text-[#888888] ${align === 'center' ? 'text-center' : 'text-left'
          }`}
      >
        {t.authorLabel}{' '}
        <span className="posted-by">
          {authorSlug ? (
            <Link
              href={getBlogAuthorPath(locale, authorSlug)}
              className="author-name hover:text-black transition-colors"
            >
              {author || t.author}
            </Link>
          ) : (
            <span className="author-name">
              {author || t.author}
            </span>
          )}
        </span>{' '}
        /{' '}
        <span className="posted-on">
          <time dateTime={date} className="published">
            {formattedDate}
          </time>
        </span>
      </div>

      {/* 요약 (선택적) */}
      {/* {excerpt && (
        <p
          className={`mt-6 max-w-[860px] font-['Pretendard'] text-[16px] md:text-[18px] text-black/70 tracking-[-0.18px] ${align === 'center' ? 'mx-auto text-center' : 'text-left'
            }`}
          style={{ lineHeight: '28px' }}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      )} */}

      {/* 구분선 (선택적) */}
      {showSeparator && (
        <div className="mt-8 pt-8 border-t border-gray-200" />
      )}
    </header>
  );
}
