'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { useTranslations } from 'next-intl';

/**
 * 블로그 글 우측에 나타나는 '목차' 메뉴 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 본문에 있는 큰 제목(H2)과 중간 제목(H3)을 자동으로 찾아 목록을 만듭니다.
 * - 사용자가 목차 아이템을 클릭하면 해당 위치로 부드럽게 화면을 이동시켜 줍니다.
 * - 현재 사용자가 읽고 있는 부분의 목차 제목을 자동으로 강조(Highlight)해 줍니다.
 */
import { useParams } from 'next/navigation';

export interface Heading {
  /**
   * 본문 내 heading element의 id.
   *
   * @remarks
   * 서버 파싱 경로에서는 `rewriteWpHtml` 단계에서 id를 주입하므로, 클라이언트에서 안정적으로 찾을 수 있습니다.
   */
  id: string;
  /** heading 텍스트(목차에 표시될 문자열) */
  text: string;
  /** heading 레벨. 현재 구현은 2 또는 3(h2/h3)을 기대합니다. */
  level: number;
}

export interface TableOfContentsProps {
  /**
   * 본문 영역 CSS selector.
   *
   * @defaultValue `'.entry-content, .wp-block-post-content'`
   */
  contentSelector?: string;
  /**
   * 서버에서 파싱된 heading 데이터.
   *
   * @remarks
   * 제공되면 이 값을 단일 소스로 사용하며, DOM 스캔/MutationObserver 폴백 로직은 동작하지 않습니다.
   */
  headings?: Heading[];
  /**
   * 고정 헤더 높이(스크롤 오프셋).
   *
   * @defaultValue `100`
   */
  headerOffset?: number;
}

/**
 * 블로그 포스트 목차(Table of Contents) 컴포넌트.
 *
 * @remarks
 * - SSR에서 headings를 전달하는 것이 가장 안정적입니다(렌더된 HTML과 1:1로 일치).
 * - headings가 비어 있을 때만 클라이언트에서 본문을 스캔해 목차를 구성합니다(폴백).
 */
export function TableOfContents({
  contentSelector = '.entry-content, .wp-block-post-content',
  headings: providedHeadings = [],
  headerOffset = 100,
}: TableOfContentsProps) {
  const params = useParams();
  const locale = params?.locale as string || 'kr';
  const isJp = locale === 'jp';
  const t = {
    toc: isJp ? '目次' : '목차'
  };
  const [headings, setHeadings] = useState<Heading[]>(providedHeadings);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (providedHeadings.length > 0) {
      setHeadings(providedHeadings);
      if (providedHeadings.length > 0) {
        setActiveId(providedHeadings[0].id);
      }
      return;
    }

    /**
     * 본문 DOM에서 `h2/h3`를 찾아 headings 배열을 생성합니다.
     *
     * @remarks
     * - heading id가 없으면 index 기반으로 부여합니다.
     * - 이 경로는 폴백이며, 서버 파싱 + id 주입 방식이 더 안정적입니다.
     */
    const parseHeadings = () => {
      const contentElement = document.querySelector(contentSelector);
      if (!contentElement) return;

      const elements = contentElement.querySelectorAll('h2, h3');
      const parsed: Heading[] = Array.from(elements).map((el, index) => {
        if (!el.id) {
          el.id = `heading-${index}`;
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: parseInt(el.tagName.charAt(1)),
        };
      });

      setHeadings(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    };

    parseHeadings();

    const observer = new MutationObserver(parseHeadings);
    const contentElement = document.querySelector(contentSelector);
    if (contentElement) {
      observer.observe(contentElement, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, [contentSelector, providedHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${headerOffset}px 0px -40% 0px`,
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, headerOffset]);

  /**
   * 목차에서 제목을 클릭했을 때 해당 위치로 부드럽게 이동시켜주는 함수입니다.
   * 헤더(GNB) 높이를 고려하여 제목이 가려지지 않게 위치를 조절합니다.
   */
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="p-2 rounded-xl bg-[#f8fcfb] border border-[#cfe9e6]/50 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto">
      <p className="text-[14px] font-bold text-gray-500 mb-1 px-1 uppercase tracking-tighter">
        {t.toc}
      </p>
      <ul className="space-y-0">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`transition-colors duration-200 ${heading.level === 3 ? 'pl-2' : ''
              }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-0.5 px-1 text-[12px] tracking-tight leading-snug rounded transition-all ${activeId === heading.id
                ? 'text-mint-dark font-bold bg-mint/10'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
