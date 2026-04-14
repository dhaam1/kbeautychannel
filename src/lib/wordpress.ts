import { decodeHtmlEntities } from '@/lib/htmlEntities';
import { getSiteUrl } from '@/lib/utils';

/**
 * 워드프레스(WordPress)와 우리 사이트를 연결해주는 핵심 도구들입니다.
 * 
 * 주요 역할:
 * - 워드프레스에 저장된 글들을 우리 사이트로 가져옵니다.
 * - 워드프레스에서 온 데이터들 중 깨진 링크나 이미 주소들을 우리 사이트에 맞게 고쳐줍니다.
 * - 검색 엔진이 글을 더 잘 찾을 수 있도록 돕는 기능(SEO)을 처리합니다.
 * - 글의 본문 내용을 분석해서 자동으로 '목차'를 만들 수 있게 준비해줍니다.
 */
const DEFAULT_WP_BASE_URL = 'https://wp.blanche.kr'; // https 도메인 사용
// HMR Trigger: Added to ensure the new export getWpPageBySlug is recognized.

/**
 * 워드프레스 서버의 기본 주소를 알려주는 함수입니다.
 */
export function getWpBaseUrl() {
  return process.env.NEXT_PUBLIC_WP_BASE_URL || DEFAULT_WP_BASE_URL;
}

/**
 * 프로젝트 내 locale(kr, jp, en)을 워드프레스 lang 코드(ko, ja, en)로 변환합니다.
 */
export function localeToWpLang(locale?: string): string {
  if (!locale) return 'ko';
  if (locale === 'kr') return 'ko';
  if (locale === 'ja' || locale === 'jp') return 'ja';
  return locale;
}

/**
 * 이미지나 첨부파일 주소를 변환합니다.
 *
 * @param url - 원본 WordPress 이미지 URL (예: https://wp.blanche.kr/wp-content/uploads/...)
 * @param options.absolute - true면 사이트 도메인(www.blanche.kr) 절대 URL 반환 (OG 이미지용), false면 자체 도메인 절대 URL 반환 (기본값)
 */
export function rewriteWpResourceUrl(
  url?: string | null,
  options?: { absolute?: boolean }
): string | undefined {
  if (!url) return undefined;

  const { absolute = false } = options || {};
  const siteUrl = getSiteUrl();

  try {
    // 1. URL 객체를 사용하여 안전하게 파싱
    const urlObj = new URL(url);
    const pathWithSearch = urlObj.pathname + urlObj.search + urlObj.hash;

    // 2. /wp-content/ 경로가 포함되어 있는지 확인
    const wpContentIndex = pathWithSearch.indexOf('/wp-content/');
    if (wpContentIndex !== -1) {
      const resourcePath = pathWithSearch.substring(wpContentIndex);
      // absolute가 true면 사이트 도메인 사용 (OG 이미지, JSON-LD 등 외부용)
      // /blog 프리픽스를 추가하여 rewrites를 통해 wp.blanche.kr로 프록시
      if (absolute) {
        return `${siteUrl}/blog${resourcePath}`;
      }

      // 기본: 자체 도메인 + /blog 프리픽스 사용 (rewrites를 통해 내부 프록시 처리)
      // 예: siteUrl/blog/wp-content/uploads/...
      return `${siteUrl}/blog${resourcePath}`;
    }

    // 3. /wp-content/가 없더라도 구형 도메인/IP인 경우 호스트만 교체
    const legacyHosts = [
      'www.blanche.kr',
      'blanche.kr',
      '112.175.247.177',
      '34.80.127.237',
      '34.154.15.109',
      '34.81.150.207',
      'wp.blanche.kr'
    ];

    if (legacyHosts.some(host => urlObj.hostname.includes(host))) {
      // pathWithSearch에 /wp-content가 없더라도 혹시 모르니 /blog 추가 (단, 정말 없는 경우엔 404 날 수 있음)
      // 하지만 레거시 도메인 이미지라면 대부분 /wp-content일 것임
      if (pathWithSearch.includes('/wp-content/')) {
        return `${siteUrl}/blog${pathWithSearch}`;
      }
      return `${siteUrl}${pathWithSearch}`;
    }

    return url;
  } catch (e) {
    // URL 파싱 실패 시 (상대 경로 등)
    if (url.startsWith('/wp-content/')) {
      return `${siteUrl}/blog${url}`;
    }
    return url;
  }
}

export type WpRendered = { rendered: string };

export type WpCategory = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

export type WpPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: WpRendered;
  content: WpRendered;
  excerpt: WpRendered;
  categories: number[];
  tags: number[];
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      slug: string;
      name: string;
      taxonomy: string;
    }>>;
  };
};

/**
 * Yoast SEO가 `yoast_head_json`으로 제공하는 데이터 스키마(부분 타입).
 *
 * @remarks
 * 실제 Yoast 응답은 더 많은 필드를 가질 수 있으며, 여기서는 현재 사용 중인 필드만 모델링합니다.
 */
export type YoastHeadJson = {
  title?: string;
  description?: string;
  robots?: {
    index?: string;
    follow?: string;
    'max-snippet'?: string;
    'max-image-preview'?: string;
    'max-video-preview'?: string;
  };
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: Array<{ url: string }>;
  og_url?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: {
    '@context'?: string;
    '@graph'?: unknown[];
  };
};

/**
 * WordPress 포스트 타입에 Yoast 관련 필드를 합친 확장 타입.
 *
 * @remarks
 * - `yoast_head_json`: 메타데이터/로봇/오픈그래프 등 구조화된 JSON
 * - `yoast_head`: Yoast가 생성한 `<head>` HTML 문자열(일부 사이트는 JSON-LD를 여기에만 넣기도 함)
 */
export type WpPostWithSeo = WpPost & {
  yoast_head_json?: YoastHeadJson;
  yoast_head?: string;
};

/**
 * HTML 태그들을 없애고 순수한 글자(Text)만 남겨줍니다.
 * 글 목록에서 '요약 내용'을 보여줄 때 주로 사용합니다.
 */
export function stripHtml(html: string) {
  return html
    .replaceAll(/<[^>]*>/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

/**
 * WordPress HTML에서 JSON-LD `<script type="application/ld+json">`를 추출합니다.
 *
 * @param html - WordPress가 반환한 원본 HTML(본문/헤드 모두 가능)
 * @returns `cleanHtml`: JSON-LD script를 제거한 HTML, `jsonLdBlocks`: JSON 문자열 배열
 *
 * @remarks
 * - 본문을 `dangerouslySetInnerHTML`로 렌더할 때 `<script>`가 섞여 있으면 SSR/CSR 파싱 차이로
 *   hydration mismatch가 발생하기 쉬워 별도로 분리합니다.
 * - 반환되는 JSON 문자열은 기본적인 `JSON.parse` 검증을 통과한 것만 포함합니다.
 */
export function extractJsonLdScripts(html: string): { cleanHtml: string; jsonLdBlocks: string[] } {
  const jsonLdBlocks: string[] = [];
  let cleanHtml = html;

  const jsonLdPattern = /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json(?:;[^"']*)?["'][^>]*>([\s\S]*?)<\/script>/gi;

  cleanHtml = cleanHtml.replace(jsonLdPattern, (_match, jsonContent) => {
    const trimmed = jsonContent.trim();
    if (trimmed) {
      try {
        JSON.parse(trimmed);
        jsonLdBlocks.push(trimmed);
      } catch (e) {
        console.warn('Skipping invalid JSON-LD block:', trimmed.substring(0, 100));
      }
    }
    return '';
  });

  return { cleanHtml, jsonLdBlocks };
}

/**
 * WordPress HTML을 Next.js 렌더링에 적합하도록 정규화합니다.
 *
 * @param html - WordPress 원본 HTML(일반적으로 `post.content.rendered`)
 * @param siteUrl - 현재 Next.js 사이트의 절대 URL(내부 링크를 이 도메인으로 유도할 때 사용)
 * @returns 정규화된 HTML 문자열
 *
 * @remarks
 * 수행하는 변환은 크게 다음 5가지입니다.
 * - **스크립트 제거**: 본문에 남아 있는 모든 `<script>` 제거
 * - **WP TOC 제거**: Easy Table of Contents(ez-toc) 플러그인이 생성한 목차 DOM 제거
 * - **이미지 URL 정규화**: `src/srcset`의 도메인/상대경로를 `getWpBaseUrl()` 기준으로 수정
 * - **링크 URL 정규화**: `<a href>`를 `siteUrl` 기준으로 바꿔 사용자가 Next.js 도메인에 머물게 함
 * - **헤딩 ID 주입**: `h2/h3`에 id가 없으면 결정적으로 생성해 TOC/앵커를 안정화
 *
 * @structuralRisk
 * - HTML을 문자열/정규식으로 조작하기 때문에, WP 마크업이 바뀌면 누락/오작동 가능성이 있습니다.
 * - 이 함수는 sanitize가 아니며(허용 태그/속성 제한 없음), 보안은 별도의 정책이 필요합니다.
 */
export function rewriteWpHtml(html: string, siteUrl: string, _locale?: string) {
  const wpBaseUrl = getWpBaseUrl();
  const escapeRegex = (s: string) => s.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wpBaseUrlRe = escapeRegex(wpBaseUrl);

  let out = html;

  // 스크립트 태그 제거
  out = out.replaceAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

  // 메타 태그 제거 (SEO 중복 방지 - Next.js generateMetadata가 처리)
  // WordPress 본문에 포함된 <meta> 태그를 제거하여 중복 메타데이터 방지
  out = out.replaceAll(/<meta\b[^>]*>/gi, '');

  // WordPress lazy-load 플러그인(LazySizes, WP Rocket, Smush 등) 복원
  // WP 플러그인이 src를 placeholder SVG로 바꾸고 실제 URL을 data-src/data-srcset/srcset에 넣는데,
  // Next.js에서는 해당 JS가 로드되지 않으므로 서버에서 직접 복원 (iframe + img 모두 처리)
  //
  // 케이스 1: data-src 존재 → data-src 값을 src로 복원 (LazySizes, WP Rocket)
  // 케이스 2: data-src 없음, srcset에 실제 URL → srcset 첫 번째 URL을 src로 복원 (Smush)
  const SVG_PLACEHOLDER = 'data:image/svg+xml;base64,';
  out = out.replace(
    /<(iframe|img)\b([^>]*?)>/gi,
    (_match, tag: string, attrs: string) => {
      let result = attrs;

      // ⚠️ \bsrc는 data-src의 src도 매칭하므로 (?<!data-) lookbehind 필수

      // 케이스 1: data-src가 있으면 src를 교체
      const dataSrcMatch = result.match(/\bdata-src\s*=\s*(["'])([^"']+)\1/i);
      if (dataSrcMatch) {
        const realSrc = dataSrcMatch[2];
        result = result.replace(/(?<!data-)src\s*=\s*(["'])[^"']*\1/i, `src="${realSrc}"`);
        result = result.replace(/\bdata-src\s*=\s*(["'])[^"']*\1/i, '');
      }

      // 케이스 2: data-src 없이 src가 placeholder이고 srcset에 실제 URL이 있는 경우 (Smush 등)
      // srcset의 첫 번째 URL을 src 폴백으로 사용
      if (!dataSrcMatch) {
        const srcVal = result.match(/(?<!data-)src\s*=\s*(["'])([^"']*)\1/i);
        if (srcVal && srcVal[2].startsWith(SVG_PLACEHOLDER)) {
          const srcsetVal = result.match(/(?<!data-)srcset\s*=\s*(["'])([^"']+)\1/i);
          if (srcsetVal) {
            // srcset에서 가장 큰 이미지 URL 추출 (예: "url 1024w, url 300w" → 원본 = 마지막)
            const candidates = srcsetVal[2].split(',').map(s => s.trim());
            const lastUrl = candidates[candidates.length - 1].split(/\s+/)[0];
            result = result.replace(/(?<!data-)src\s*=\s*(["'])[^"']*\1/i, `src="${lastUrl}"`);
          }
        }
      }

      // data-srcset이 있으면 srcset을 교체 (img 전용)
      const dataSrcsetMatch = result.match(/\bdata-srcset\s*=\s*(["'])([^"']+)\1/i);
      if (dataSrcsetMatch) {
        const realSrcset = dataSrcsetMatch[2];
        result = result.replace(/(?<!data-)srcset\s*=\s*(["'])[^"']*\1/i, '');
        result += ` srcset="${realSrcset}"`;
        result = result.replace(/\bdata-srcset\s*=\s*(["'])[^"']*\1/i, '');
      }

      // lazyload 클래스 제거
      result = result.replace(/\blazyload\b/g, '');
      // Smush placeholder 스타일 속성 제거
      result = result.replace(/--smush-placeholder-width:\s*[^;]+;\s*/gi, '');
      result = result.replace(/--smush-placeholder-aspect-ratio:\s*[^;]+;\s*/gi, '');
      // data-sizes 속성 제거 (lazysizes 전용)
      result = result.replace(/(?<!data-)sizes\s*=\s*(["'])[^"']*\1/i, '');
      result = result.replace(/\bdata-sizes\s*=\s*(["'])[^"']*\1/i, '');
      // data-load-mode 속성 제거 (WP Rocket 전용)
      result = result.replace(/\bdata-load-mode\s*=\s*(["'])[^"']*\1/i, '');
      // 빈 data-="" 속성 제거 (Smush 부산물)
      result = result.replace(/\bdata-=""\s*/gi, '');
      // 빈 class 속성 정리
      result = result.replace(/\bclass\s*=\s*["']\s*["']/i, '');
      // 빈 style 속성 정리
      result = result.replace(/\bstyle\s*=\s*["']\s*["']/i, '');
      // 연속 공백 정리
      result = result.replace(/\s{2,}/g, ' ').trim();

      return `<${tag} ${result}>`;
    }
  );

  /**
   * `h2/h3`에 id가 없는 경우 id를 주입합니다.
   *
   * @remarks
   * - WP TOC 플러그인이 heading 내부에 `ez-toc-section` span/id를 심는 케이스가 있어 이를 우선 사용합니다.
   * - 그렇지 않으면 heading 텍스트를 기반으로 slug를 만들고, 중복을 제거합니다(생성된 id에 한해서).
   */
  const injectHeadingIds = (input: string) => {
    const seenGenerated = new Set<string>();
    let idx = 0;

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w가-힣-]/g, '')
        .substring(0, 50);

    return input.replace(
      /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
      (full, level: string, attrs: string, inner: string) => {
        const hasId = /id\s*=\s*["'][^"']+["']/i.test(attrs);
        if (hasId) return full;

        const ezMatch = inner.match(
          /<span[^>]*class=["'][^"']*ez-toc-section[^"']*["'][^>]*id=["']([^"']+)["'][^>]*>/i
        );
        let id = ezMatch?.[1] || '';

        const text = decodeHtmlEntities(inner)
          .replace(/<[^>]*>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replaceAll(/\s+/g, ' ')
          .trim();

        if (!id) {
          id = `heading-${idx}-${slugify(text)}`;
        }

        let finalId = id;
        if (!ezMatch) {
          let c = 1;
          while (seenGenerated.has(finalId)) {
            finalId = `${id}-${c}`;
            c += 1;
          }
          seenGenerated.add(finalId);
          idx += 1;
        }

        const spacer = attrs && attrs.startsWith(' ') ? '' : ' ';
        return `<h${level}${spacer}${attrs} id="${finalId}">${inner}</h${level}>`;
      }
    );
  };

  out = out.replaceAll(
    /<div[^>]*id=["']ez-toc-container["'][^>]*>[\s\S]*?<\/div>/gi,
    ''
  );
  out = out.replaceAll(
    /<nav[^>]*>[\s\S]*?<ul[^>]*class=["'][^"']*ez-toc-list[^"']*["'][^>]*>[\s\S]*?<\/ul>[\s\S]*?<\/nav>/gi,
    ''
  );
  out = out.replaceAll(
    /<ul[^>]*class=["'][^"']*ez-toc-list[^"']*["'][^>]*>[\s\S]*?<\/ul>/gi,
    ''
  );

  // 비디오 파일은 프록시를 거치지 않고 wp.blanche.kr에서 직접 서빙
  // (모바일 브라우저는 <video>에 Range Request가 필수인데, Next.js 프록시가 이를 지원하지 않음)
  const VIDEO_EXTS = /\.(mp4|webm|mov|ogg|ogv)(?:\?[^"']*)?$/i;
  out = out.replace(
    /<video\b([^>]*?)>/gi,
    (_match, attrs: string) => {
      const newAttrs = attrs.replace(
        /\bsrc\s*=\s*(["'])(https?:\/\/[^"']+)\1/i,
        (_m: string, q: string, url: string) => {
          if (!VIDEO_EXTS.test(url)) return _m;
          // 이미 wp.blanche.kr이면 그대로 유지
          if (/^https?:\/\/wp\.blanche\.kr\//i.test(url)) return _m;
          // 프록시 경로나 다른 도메인의 wp-content URL을 wp.blanche.kr로 변환
          const wpPath = url.match(/\/wp-content\/.+/i);
          if (wpPath) return `src=${q}https://wp.blanche.kr${wpPath[0]}${q}`;
          return _m;
        }
      );
      return `<video${newAttrs}>`;
    }
  );
  // <source> 태그 안의 비디오 URL도 동일하게 처리
  out = out.replace(
    /<source\b([^>]*?)>/gi,
    (_match, attrs: string) => {
      const newAttrs = attrs.replace(
        /\bsrc\s*=\s*(["'])(https?:\/\/[^"']+)\1/i,
        (_m: string, q: string, url: string) => {
          if (!VIDEO_EXTS.test(url)) return _m;
          if (/^https?:\/\/wp\.blanche\.kr\//i.test(url)) return _m;
          const wpPath = url.match(/\/wp-content\/.+/i);
          if (wpPath) return `src=${q}https://wp.blanche.kr${wpPath[0]}${q}`;
          return _m;
        }
      );
      return `<source${newAttrs}>`;
    }
  );

  // wp-content 관련 모든 도메인을 현재 사이트의 절대 URL + /blog 경로로 변환
  // (예: https://wp.blanche.kr/wp-content -> https://blanche.kr/blog/wp-content)
  // 비디오 파일은 위에서 이미 wp.blanche.kr로 처리했으므로 여기서 제외
  out = out.replaceAll(
    /https?:\/\/(?:(?:www\.)?blanche\.kr(?:\/blog)?|wp\.blanche\.kr|112\.175\.247\.177|34\.80\.127\.237|34\.154\.15\.109)(\/wp-content\/[^"'\s)]*)/gi,
    (_match, wpContentPath: string) => {
      if (VIDEO_EXTS.test(wpContentPath)) {
        return `https://wp.blanche.kr${wpContentPath}`;
      }
      return `${siteUrl}/blog${wpContentPath}`;
    }
  );

  const blogCategorySlugs = ['laminate', 'scaling', 'implant', 'doctor-column', 'cavity', 'orthodontic', 'tooth-whitening'];
  const addBlogPrefix = (path: string) => {
    if (!path) return path;

    if (path.startsWith('/ja/') || path === '/ja') {
      const restPath = path.replace(/^\/ja/, '');
      return `/jp/blog${restPath}`;
    }

    if (path.startsWith('/en/') || path === '/en') {
      const restPath = path.replace(/^\/en/, '');
      return `/en/blog${restPath}`;
    }

    const firstSegment = path.replace(/^\//, '').split('/')[0];
    if (blogCategorySlugs.includes(firstSegment)) {
      return `/blog${path}`;
    }
    return path;
  };

  out = out.replaceAll(
    new RegExp(`(\\<a\\b[^\\>]*?\\bhref\\s*=\\s*)(['\"])https?:\\/\\/(?:(?:www\\.)?blanche\.kr(?:\\/blog)?|wp\.blanche\.kr|112\.175\.247\.177|34\.80\.127\.237|34\.154\.15\.109)(\\/[^'"]*)?(\\2)`, 'gi'),
    (_m, prefix, quote, path = '', suffixQuote) => `${prefix}${quote}${siteUrl}${addBlogPrefix(path)}${suffixQuote}`
  );

  out = out.replaceAll(
    new RegExp(`(<a\\b[^>]*?\\bhref\\s*=\\s*)(['"])(${wpBaseUrlRe})(\\/[^'"]*)?(\\2)`, 'gi'),
    (_m, prefix, quote, _wp, path = '', suffixQuote) => `${prefix}${quote}${siteUrl}${addBlogPrefix(path)}${suffixQuote}`
  );

  out = out.replaceAll(
    new RegExp(`(<a\\b[^>]*?\\bhref\\s*=\\s*)(['"])https?:\\/\\/(?:localhost|127\\.0\\.0\\.1)(?::\\d+)?(\\/[^'"]*)?(\\2)`, 'gi'),
    (_m, prefix, quote, path = '', suffixQuote) => `${prefix}${quote}${siteUrl}${addBlogPrefix(path)}${suffixQuote}`
  );

  out = out.replace(/\n{3,}/g, '\n\n');

  out = injectHeadingIds(out);

  return out;
}

const WP_FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

/**
 * WordPress REST API에 JSON 요청을 보내고 응답을 파싱합니다.
 *
 * @typeParam T - 응답 JSON 타입
 * @param path - `/wp-json/...` 형태의 경로(슬래시 유무 무관)
 * @param init - fetch 옵션
 * @param revalidateSeconds - Next.js Data Cache revalidate 주기(초)
 * @param locale - 현재 사이트 로케일 (kr, jp, en)
 *
 * @throws 응답이 2xx가 아니면 예외를 던집니다.
 */
async function fetchWpJson<T>(
  path: string,
  init?: RequestInit,
  revalidateSeconds = 300,
  locale?: string
): Promise<T> {
  const wpBaseUrl = getWpBaseUrl();
  const lang = localeToWpLang(locale);

  // /wp-json/wp/v2/posts?per_page=12 형태를 
  // ?rest_route=/wp/v2/posts&per_page=12 형태로 변환
  let url: string;
  if (path.startsWith('/wp-json/')) {
    // /wp-json/ 제거
    const restPath = path.replace('/wp-json', '');
    // 쿼리 파라미터 분리
    const [route, queryString] = restPath.split('?');
    // ?rest_route= 형식으로 변환하되, 언어 파라미터(lang) 추가
    url = `${wpBaseUrl}/?rest_route=${encodeURIComponent(route)}${queryString ? '&' + queryString : ''}&lang=${lang}`;
  } else {
    // 이미 올바른 형식이면 그대로 사용하되 lang 추가
    const separator = path.includes('?') ? '&' : '?';
    url = `${wpBaseUrl}${path.startsWith('/') ? path : `/${path}`}${separator}lang=${lang}`;
  }

  const headers = {
    ...WP_FETCH_HEADERS,
    ...init?.headers,
  };

  const res = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) {
    throw new Error(`WP fetch failed: ${res.status} ${res.statusText} (${url})`);
  }
  return (await res.json()) as T;
}

/**
 * slug로 단일 포스트를 조회합니다.
 *
 * @param slug - WP 포스트 slug
 * @param locale - 현재 사이트 로케일
 * @returns 포스트가 없으면 null
 */
export async function getWpPostBySlug(slug: string, locale?: string): Promise<WpPost | null> {
  const posts = await fetchWpJson<WpPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    undefined,
    300,
    locale
  );
  if (!Array.isArray(posts) || posts.length === 0) return null;
  return posts[0];
}

/**
 * WP의 페이지네이션 메타데이터를 포함한 응답 타입.
 *
 * @typeParam T - 실제 JSON 본문 타입
 */
export type WpResponse<T> = {
  data: T;
  totalPages: number;
  totalPosts: number;
};

/**
 * WP REST API 호출 시 페이지네이션 관련 헤더(`x-wp-total`, `x-wp-totalpages`)를 함께 읽습니다.
 *
 * @typeParam T - 응답 JSON 타입
 * @param path - `/wp-json/...` 경로
 * @param init - fetch 옵션
 * @param revalidateSeconds - Next.js Data Cache revalidate 주기(초)
 * @param locale - 현재 사이트 로케일
 */
async function fetchWpWithMeta<T>(
  path: string,
  init?: RequestInit,
  revalidateSeconds = 300,
  locale?: string
): Promise<WpResponse<T>> {
  const wpBaseUrl = getWpBaseUrl();
  const lang = localeToWpLang(locale);

  // /wp-json/wp/v2/posts?per_page=12 형태를 
  // ?rest_route=/wp/v2/posts&per_page=12 형태로 변환
  let url: string;
  if (path.startsWith('/wp-json/')) {
    // /wp-json/ 제거
    const restPath = path.replace('/wp-json', '');
    // 쿼리 파라미터 분리
    const [route, queryString] = restPath.split('?');
    // ?rest_route= 형식으로 변환하되, 언어 파라미터(lang) 추가
    url = `${wpBaseUrl}/?rest_route=${encodeURIComponent(route)}${queryString ? '&' + queryString : ''}&lang=${lang}`;
  } else {
    // 이미 올바른 형식이면 그대로 사용하되 lang 추가
    const separator = path.includes('?') ? '&' : '?';
    url = `${wpBaseUrl}${path.startsWith('/') ? path : `/${path}`}${separator}lang=${lang}`;
  }

  const headers = {
    ...WP_FETCH_HEADERS,
    ...init?.headers,
  };

  const res = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) {
    throw new Error(`WP fetch failed: ${res.status} ${res.statusText} (${url})`);
  }

  const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
  const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10);
  const data = (await res.json()) as T;

  return { data, totalPages, totalPosts };
}

/**
 * 전체 포스트 목록을 페이지 단위로 조회합니다.
 *
 * @param page - 1부터 시작하는 페이지 번호
 * @param perPage - 페이지 당 항목 수
 * @param locale - 현재 사이트 로케일
 */
export async function getWpPostsPaged(page = 1, perPage = 12, locale?: string): Promise<WpResponse<WpPost[]>> {
  return await fetchWpWithMeta<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1&_fields=id,slug,link,date,title,excerpt,categories,featured_media,_links,_embedded`,
    undefined,
    300,
    locale
  );
}

/**
 * category slug로 WP 카테고리를 조회합니다.
 *
 * @param slug - 카테고리 slug
 * @param locale - 현재 사이트 로케일
 * @returns 없으면 null
 */
export async function getWpCategoryBySlug(slug: string, locale?: string): Promise<WpCategory | null> {
  const categories = await fetchWpJson<WpCategory[]>(
    `/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}&per_page=1`,
    undefined,
    300,
    locale
  );
  if (!Array.isArray(categories) || categories.length === 0) return null;
  return categories[0];
}

/**
 * category id로 해당 카테고리의 포스트 목록을 조회합니다.
 *
 * @param categoryId - WP 카테고리 id
 * @param perPage - 페이지 당 항목 수
 * @param locale - 현재 사이트 로케일
 */
export async function getWpPostsByCategoryId(categoryId: number, page = 1, perPage = 12, locale?: string): Promise<WpResponse<WpPost[]>> {
  return await fetchWpWithMeta<WpPost[]>(
    `/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_embed=1&_fields=id,slug,link,date,title,excerpt,categories,featured_media,_links,_embedded`,
    undefined,
    300,
    locale
  );
}

/**
 * 포스트에 포함된 category id들을 일괄 조회합니다.
 *
 * @remarks
 * - 중복 id를 제거하고 최대 100개까지만 요청합니다(WP API 제한 고려).
 */
export async function getWpCategoriesByIds(ids: number[], locale?: string): Promise<WpCategory[]> {
  const unique = Array.from(new Set(ids)).filter((n) => Number.isFinite(n));
  if (unique.length === 0) return [];
  return await fetchWpJson<WpCategory[]>(
    `/wp-json/wp/v2/categories?include=${unique.join(',')}&per_page=${Math.min(unique.length, 100)}`,
    undefined,
    300,
    locale
  );
}

/**
 * _embedded['wp:term']에서 카테고리 정보를 추출하여 ID→slug, ID→name 맵을 생성합니다.
 * _embed=1로 조회된 포스트 목록에서 별도의 categories API 호출 없이 카테고리 매핑이 가능합니다.
 *
 * @param posts - _embed=1로 조회된 WpPost 배열
 * @returns { idToSlug, idToName } 맵 쌍
 */
export function buildCategoryMapsFromEmbedded(
  posts: WpPost[]
): { idToSlug: Map<number, string>; idToName: Map<number, string> } {
  const idToSlug = new Map<number, string>();
  const idToName = new Map<number, string>();

  for (const post of posts) {
    const termGroups = post._embedded?.['wp:term'];
    if (!termGroups) continue;
    for (const group of termGroups) {
      for (const term of group) {
        if (term.taxonomy === 'category' && !idToSlug.has(term.id)) {
          idToSlug.set(term.id, term.slug);
          idToName.set(term.id, term.name);
        }
      }
    }
  }

  return { idToSlug, idToName };
}

/**
 * slug로 단일 포스트를 조회하되 Yoast SEO 필드(`yoast_head_json`, `yoast_head`)를 함께 사용하도록 타입을 확장합니다.
 *
 * @remarks
 * 실제 REST 엔드포인트는 동일하지만, 응답에 Yoast 필드가 포함되는 WP 설정(플러그인/테마)에 맞춰 소비합니다.
 *
 * @param slug - WP 포스트 slug
 * @param locale - 현재 사이트 로케일
 */
export async function getWpPostBySlugWithSeo(slug: string, locale?: string): Promise<WpPostWithSeo | null> {
  const posts = await fetchWpJson<WpPostWithSeo[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    undefined,
    300,
    locale
  );
  if (!Array.isArray(posts) || posts.length === 0) return null;
  return posts[0];
}

/**
 * 최신 포스트 목록을 Yoast SEO 확장 타입으로 조회합니다.
 *
 * @param perPage - 페이지 당 항목 수
 * @param locale - 현재 사이트 로케일
 */
export async function getWpPostsLatestWithSeo(perPage = 12, locale?: string): Promise<WpPostWithSeo[]> {
  return await fetchWpJson<WpPostWithSeo[]>(
    `/wp-json/wp/v2/posts?per_page=${perPage}&_embed=1`,
    undefined,
    300,
    locale
  );
}

/**
 * 날짜 기준으로 이전/다음 포스트를 조회합니다.
 *
 * @param currentDate - 기준 포스트의 date(ISO 문자열)
 * @param categoryId - 제공하면 동일 카테고리 안에서만 탐색합니다.
 * @param locale - 현재 사이트 로케일
 *
 * @remarks
 * - previous: `before=<date>&order=desc` 로 "기준보다 과거 글 중 가장 최신"
 * - next: `after=<date>&order=asc` 로 "기준보다 미래 글 중 가장 오래된"
 */
export async function getWpAdjacentPosts(
  currentDate: string,
  categoryId?: number,
  locale?: string
): Promise<{ previous?: WpPost; next?: WpPost }> {
  const categoryFilter = categoryId ? `&categories=${categoryId}` : '';
  const encodedDate = encodeURIComponent(currentDate);

  const prevPosts = await fetchWpJson<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=1&before=${encodedDate}&order=desc${categoryFilter}`,
    undefined,
    300,
    locale
  );

  const nextPosts = await fetchWpJson<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=1&after=${encodedDate}&order=asc${categoryFilter}`,
    undefined,
    300,
    locale
  );

  return {
    previous: prevPosts.length > 0 ? prevPosts[0] : undefined,
    next: nextPosts.length > 0 ? nextPosts[0] : undefined,
  };
}

/**
 * ID로 단일 페이지(Page)를 조회합니다.
 *
 * @param id - WP 페이지 ID
 * @param locale - 현재 사이트 로케일
 * @returns 페이지가 없거나 오류 발생 시 null
 */
export async function getWpPageById(id: number, locale?: string): Promise<WpPost | null> {
  try {
    return await fetchWpJson<WpPost>(`/wp-json/wp/v2/pages/${id}?_embed=1`, undefined, 300, locale);
  } catch (error) {
    console.error(`Error fetching WP page by ID ${id}:`, error);
    return null;
  }
}

/**
 * slug로 단일 페이지(Page)를 조회합니다.
 *
 * @param slug - WP 페이지 slug
 * @param locale - 현재 사이트 로케일
 * @returns 페이지가 없으면 null
 */
export async function getWpPageBySlug(slug: string, locale?: string): Promise<WpPost | null> {
  try {
    const pages = await fetchWpJson<WpPost[]>(
      `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=1`,
      undefined,
      300,
      locale
    );
    if (!Array.isArray(pages) || pages.length === 0) return null;
    return pages[0];
  } catch (error) {
    console.error(`Error fetching WP page by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Author 타입 정의
 */
export type WpAuthor = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: Record<string, string>;
  simple_local_avatar?: {
    media_id?: number;
    full?: string;
    blog_id?: number;
    [size: string]: string | number | undefined;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
      width?: number;
      height?: number;
      type?: string;
    }>;
  };
};

/**
 * slug로 Author 정보를 조회합니다.
 * 
 * @param slug - Author slug
 * @param locale - 현재 사이트 로케일
 */
export async function getWpAuthorBySlug(slug: string, locale?: string): Promise<WpAuthor | null> {
  try {
    const authors = await fetchWpJson<WpAuthor[]>(
      `/wp-json/wp/v2/users?slug=${encodeURIComponent(slug)}`,
      undefined,
      300,
      locale
    );
    if (!Array.isArray(authors) || authors.length === 0) return null;
    return authors[0];
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

/**
 * Author ID로 해당 저자의 포스트 목록을 조회합니다.
 * 
 * @param authorId - WP Author ID
 * @param page - 페이지 번호
 * @param perPage - 페이지 당 항목 수
 * @param locale - 현재 사이트 로케일
 */
export async function getWpPostsByAuthorId(authorId: number, page = 1, perPage = 12, locale?: string): Promise<WpResponse<WpPost[]>> {
  try {
    return await fetchWpWithMeta<WpPost[]>(
      `/wp-json/wp/v2/posts?author=${authorId}&per_page=${perPage}&page=${page}&_embed=1&_fields=id,slug,link,date,title,excerpt,categories,featured_media,_links,_embedded`,
      undefined,
      300,
      locale
    );
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    return { data: [], totalPages: 0, totalPosts: 0 };
  }
}

// ============================================
// Sitemap용 전체 조회 API 함수들
// ============================================

/**
 * 모든 카테고리를 조회합니다 (sitemap 생성용).
 * 필요한 필드(id, slug, name)만 요청하여 응답 크기를 최소화합니다.
 *
 * @param locale - 현재 사이트 로케일
 */
export async function getWpAllCategories(locale?: string): Promise<WpCategory[]> {
  try {
    return await fetchWpJson<WpCategory[]>(
      `/wp-json/wp/v2/categories?per_page=100&hide_empty=true&_fields=id,slug,name`,
      undefined,
      300,
      locale
    );
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

/**
 * 모든 저자를 조회합니다 (sitemap 생성용).
 * 필요한 필드(id, slug, name)만 요청하여 응답 크기를 최소화합니다.
 *
 * @param locale - 현재 사이트 로케일
 */
export async function getWpAllAuthors(locale?: string): Promise<WpAuthor[]> {
  try {
    return await fetchWpJson<WpAuthor[]>(
      `/wp-json/wp/v2/users?per_page=100&_fields=id,slug,name`,
      undefined,
      300,
      locale
    );
  } catch (error) {
    console.error('Error fetching all authors:', error);
    return [];
  }
}

/**
 * 모든 블로그 글을 조회합니다 (sitemap 생성용).
 * 페이지네이션을 자동으로 처리하여 전체 글 목록을 반환합니다.
 * _embed를 제거하고 필요한 필드(slug, link, date, modified)만 요청하여 응답 속도를 크게 개선합니다.
 *
 * @param locale - 현재 사이트 로케일
 */
export async function getWpAllPosts(locale?: string): Promise<WpPost[]> {
  const allPosts: WpPost[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await fetchWpWithMeta<WpPost[]>(
        `/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=slug,link,date,modified`,
        undefined,
        300,
        locale
      );

      allPosts.push(...response.data);

      // 더 이상 가져올 글이 없으면 종료
      if (response.data.length < perPage || page >= response.totalPages) {
        break;
      }

      page++;
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return allPosts; // 지금까지 가져온 것이라도 반환
  }
}

/**
 * 모든 블로그 글을 조회합니다 (RSS 피드 생성용).
 * title, excerpt, _embedded(작성자, 썸네일) 등 RSS에 필요한 필드를 포함하여 요청합니다.
 *
 * @param locale - 현재 사이트 로케일
 */
export async function getWpAllPostsForFeed(locale?: string): Promise<WpPost[]> {
  const allPosts: WpPost[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await fetchWpWithMeta<WpPost[]>(
        `/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=author,wp:featuredmedia&_fields=slug,link,date,title,excerpt,_embedded,_links`,
        undefined,
        300,
        locale
      );

      allPosts.push(...response.data);

      if (response.data.length < perPage || page >= response.totalPages) {
        break;
      }

      page++;
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts for feed:', error);
    return allPosts;
  }
}
