import { rewriteWpResourceUrl } from '@/lib/wordpress';
import { getSiteUrl } from '@/lib/utils';

/**
 * WordPress/Yoast 호스트 목록 — URL 정규화에 사용
 */
export const WP_HOSTS = [
  'wp.blanche.kr',
  '34.81.150.207',
  '34.80.127.237',
  '34.154.15.109',
  '112.175.247.177',
] as const;

/** JSON-LD에서 URL 값을 가지는 필드 */
const URL_FIELDS = new Set([
  'url', '@id', 'item', 'identifier',
  'mainEntityOfPage', 'image', 'logo', 'sameAs',
  'target', 'contentUrl', 'urlTemplate',
]);

/**
 * 단일 URL 문자열을 정규화합니다.
 * - percent-encoding 디코딩
 * - WP 도메인/IP → 사이트 도메인 치환
 * - /blog prefix 추가 (wp-content 제외)
 */
export function normalizeSchemaUrl(url: string, siteUrl: string, _locale?: string): string {
  try {
    const decoded = decodeURI(url);
    const urlObj = new URL(decoded);

    if (WP_HOSTS.some(host => urlObj.hostname === host || urlObj.hostname.includes(host))) {
      let path = urlObj.pathname.replace(/\/$/, '');

      if (path.startsWith('/ja/') || path === '/ja') {
        path = `/jp/blog${path.replace(/^\/ja/, '')}`;
      } else if (path.startsWith('/en/') || path === '/en') {
        path = `/en/blog${path.replace(/^\/en/, '')}`;
      } else if (!path.startsWith('/blog') && !path.startsWith('/wp-content')) {
        path = `/blog${path}`;
      }
      return `${siteUrl}${path}${urlObj.search}${urlObj.hash}`;
    }

    const rewritten = rewriteWpResourceUrl(decoded, { absolute: true });
    return rewritten || decoded;
  } catch {
    const rewritten = rewriteWpResourceUrl(url, { absolute: true });
    return rewritten || url;
  }
}

/**
 * JSON-LD 객체를 재귀적으로 순회하며 모든 URL 필드를 정규화합니다.
 */
export function normalizeSchemaUrls(obj: unknown, siteUrl: string, locale?: string): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeSchemaUrls(item, siteUrl, locale));
  }

  const result = {} as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (URL_FIELDS.has(key) && typeof value === 'string') {
      result[key] = normalizeSchemaUrl(value, siteUrl, locale);
    } else if (URL_FIELDS.has(key) && Array.isArray(value)) {
      // URL 필드가 배열인 경우 (예: target: ["https://..."], sameAs: [...])
      result[key] = value.map((item: unknown) => {
        if (typeof item === 'string') return normalizeSchemaUrl(item, siteUrl, locale);
        return normalizeSchemaUrls(item, siteUrl, locale);
      });
    } else if (URL_FIELDS.has(key) && typeof value === 'object' && value !== null) {
      // @id를 가진 참조 객체 (예: mainEntityOfPage: { "@id": "..." })
      result[key] = normalizeSchemaUrls(value, siteUrl, locale);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = normalizeSchemaUrls(value, siteUrl, locale);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * 스키마 아이템에서 @type을 추출합니다.
 */
export function getSchemaType(item: unknown): string | null {
  if (typeof item !== 'object' || item === null) return null;
  const obj = item as Record<string, unknown>;
  if (typeof obj['@type'] === 'string') return obj['@type'];
  if (Array.isArray(obj['@type']) && obj['@type'].length > 0) {
    return String(obj['@type'][0]);
  }
  return null;
}

/**
 * Yoast @graph 배열을 처리합니다:
 * - BreadcrumbList 제거 (Next.js 경로 기준으로 별도 생성)
 * - 빈 FAQPage 제거
 * - 모든 URL 필드 정규화
 */
export function processYoastGraph(graph: unknown[], siteUrl: string, locale?: string): unknown[] {
  return graph
    .filter(item => {
      const type = getSchemaType(item);
      if (type === 'BreadcrumbList') return false;
      if (type === 'FAQPage') {
        const obj = item as Record<string, unknown>;
        const mainEntity = Array.isArray(obj.mainEntity) ? obj.mainEntity : [];
        return mainEntity.length > 0;
      }
      return true;
    })
    .map(item => normalizeSchemaUrls(item, siteUrl, locale));
}
