/**
 * 블로그 글 하단에서 '이전 글'과 '다음 글'로 쉽게 이동할 수 있게 도와주는 링크 버튼입니다.
 */
'use client';

import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export interface PostNavigationProps {
  previousPost?: {
    title: string;
    href: string;
  };
  nextPost?: {
    title: string;
    href: string;
  };
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  const params = useParams();
  const locale = params?.locale as string || 'kr';
  const isJp = locale === 'jp';

  const t = {
    prev: isJp ? '前の記事' : '이전 글',
    next: isJp ? '次の記事' : '다음 글',
    noPrevPost: isJp ? '前の記事はありません' : '이전 글이 없습니다',
    noNextPost: isJp ? '次の記事はありません' : '다음 글이 없습니다',
  };

  if (!previousPost && !nextPost) return null;

  return (
    <nav className="w-full max-w-[800px] mx-auto px-5 py-12 border-t border-gray-100 flex flex-row justify-between gap-4 font-['Pretendard']">
      {/* 이전 글 */}
      <div className="flex-1 min-w-0">
        {previousPost ? (
          <Link
            href={previousPost.href as any}
            className="group flex flex-col items-start gap-1.5 w-full"
          >
            <div className="flex items-center gap-1 text-black font-bold text-[14px] md:text-[15px]">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>{t.prev}</span>
            </div>
            <p className="w-full text-gray-500 text-[13px] md:text-[14px] leading-tight line-clamp-1 group-hover:text-black transition-colors">
              {previousPost.title}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-start gap-1.5 w-full opacity-40 select-none">
            <div className="flex items-center gap-1 text-black font-bold text-[14px] md:text-[15px]">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.prev}</span>
            </div>
            <p className="w-full text-gray-500 text-[13px] md:text-[14px] leading-tight">
              {t.noPrevPost}
            </p>
          </div>
        )}
      </div>

      {/* 중앙 구분선 (선택 사항 - 레퍼런스에 따라) */}
      <div className="w-[1px] h-auto bg-gray-100 self-stretch my-1" />

      {/* 다음 글 */}
      <div className="flex-1 min-w-0">
        {nextPost ? (
          <Link
            href={nextPost.href as any}
            className="group flex flex-col items-end gap-1.5 text-right w-full"
          >
            <div className="flex items-center gap-1 text-black font-bold text-[14px] md:text-[15px]">
              <span>{t.next}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="w-full text-gray-500 text-[13px] md:text-[14px] leading-tight line-clamp-1 group-hover:text-black transition-colors">
              {nextPost.title}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-end gap-1.5 text-right w-full opacity-40 select-none">
            <div className="flex items-center gap-1 text-black font-bold text-[14px] md:text-[15px]">
              <span>{t.next}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <p className="w-full text-gray-500 text-[13px] md:text-[14px] leading-tight">
              {t.noNextPost}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
