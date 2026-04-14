/**
 * WordPress HTML에서 헤딩을 파싱하는 유틸리티 함수
 * 
 * @description
 * WordPress 포스트의 HTML 문자열에서 h2, h3 태그를 추출하여
 * 목차(Table of Contents) 생성을 위한 데이터를 만듭니다.
 */

export interface ParsedHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * HTML 문자열에서 헤딩(h2, h3)을 파싱합니다.
 * 
 * @param html - WordPress 포스트의 HTML 문자열
 * @param minLevel - 최소 헤딩 레벨 (기본: 2)
 * @param maxLevel - 최대 헤딩 레벨 (기본: 3)
 * @returns 파싱된 헤딩 배열
 * 
 * @example
 * ```ts
 * const html = '<h2 id="section-1">제목 1</h2><h3>서브제목</h3>';
 * const headings = parseHeadingsFromHtml(html);
 * // [{ id: 'section-1', text: '제목 1', level: 2 }, ...]
 * ```
 */
export function parseHeadingsFromHtml(
  html: string,
  minLevel: number = 2,
  maxLevel: number = 3
): ParsedHeading[] {
  const headings: ParsedHeading[] = [];
  
  // h2, h3 태그를 찾는 정규식
  // <h2>, <h3> 태그와 그 안의 내용, 그리고 id 속성을 추출
  const headingRegex = new RegExp(
    `<h([${minLevel}-${maxLevel}])([^>]*)>(.*?)</h[${minLevel}-${maxLevel}]>`,
    'gis'
  );

  let match;
  let index = 0;
  const seenIds = new Set<string>(); // 중복 ID 방지

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const attributes = match[2] || '';
    const textContent = match[3] || '';

    // HTML 태그 제거 (텍스트만 추출)
    const text = textContent
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // &nbsp;를 공백으로
      .replace(/&amp;/g, '&') // &amp;를 &로
      .replace(/&lt;/g, '<') // &lt;를 <로
      .replace(/&gt;/g, '>') // &gt;를 >로
      .replace(/&quot;/g, '"') // &quot;를 "로
      .replace(/&#39;/g, "'") // &#39;를 '로
      .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10))) // 숫자 엔티티 처리 (예: &#8216;)
      .replace(/&[^;]+;/g, '') // 나머지 모든 HTML 엔티티 제거
      .trim();

    if (!text) continue;

    // ID 추출 (id="..." 또는 id='...')
    let id = '';
    const idMatch = attributes.match(/id=["']([^"']+)["']/i);
    if (idMatch) {
      id = idMatch[1];
    } else {
      // ID가 없으면 텍스트 기반으로 생성
      id = `heading-${index}-${text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w가-힣-]/g, '')
        .substring(0, 50)}`;
    }

    // ez-toc-section span 안의 id도 확인
    // WordPress ez-toc 플러그인이 생성하는 id를 우선 사용
    // 헤딩 태그 바로 앞에 있는 ez-toc-section의 id를 찾음
    const beforeHeading = html.substring(Math.max(0, (match.index || 0) - 500), match.index || 0);
    const ezTocIdMatches = Array.from(
      beforeHeading.matchAll(/<span[^>]*class=["'][^"']*ez-toc-section[^"']*["'][^>]*id=["']([^"']+)["']/gi)
    );
    if (ezTocIdMatches.length > 0) {
      // 가장 최근에 찾은 id 사용 (헤딩에 가장 가까운 것)
      const recentEzTocId = ezTocIdMatches[ezTocIdMatches.length - 1][1];
      if (recentEzTocId) {
        id = recentEzTocId;
      }
    }

    // 중복 ID 방지: 이미 본 ID면 인덱스를 추가하여 고유하게 만듦
    let uniqueId = id;
    let suffix = 0;
    while (seenIds.has(uniqueId)) {
      suffix++;
      uniqueId = `${id}-${suffix}`;
    }
    seenIds.add(uniqueId);

    headings.push({
      id: uniqueId,
      text,
      level,
    });

    index++;
  }

  return headings;
}
