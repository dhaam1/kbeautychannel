import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { IntlErrorCode } from 'next-intl';

/**
 * 다국어(i18n) 설정 파일
 * 
 * @description
 * next-intl을 사용한 다국어 지원 설정입니다.
 * 
 * 지원 언어:
 * - kr: 한국어 (기본)
 * - en: 영어
 * - jp: 일본어
 * 
 * 주요 기능:
 * - 지원하지 않는 언어 요청 시 기본 언어(kr)로 폴백
 * - 메시지 파일 자동 로드 (messages/{locale}.json)
 * - 오류 처리 (MISSING_MESSAGE 시 빈 문자열 반환)
 * 
 * 메시지 파일 위치:
 * - src/messages/kr.json (한국어)
 * - src/messages/en.json (영어, 미구현)
 * - src/messages/jp.json (일본어, 미구현)
 * 
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router
 */

/** 지원하는 언어 목록 */
export const locales = ['kr', 'jp', 'en'] as const;
export type Locale = (typeof locales)[number];

/** 기본 언어 */
export const defaultLocale: Locale = 'kr';

/**
 * next-intl 요청 설정
 * 
 * @description
 * 서버 컴포넌트에서 다국어 메시지를 로드하는 설정입니다.
 * 
 * @param {Object} params - 설정 파라미터
 * @param {string} params.locale - 요청된 언어 코드
 * @returns {Object} 다국어 설정 객체
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4+ 대응: requestLocale은 Promise이므로 await 필요
  let locale = await requestLocale;

  // 지원하지 않는 언어인 경우 기본 언어 사용
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    onError(error) {
      // 오류를 완전히 무시 (콘솔에 출력하지 않음)
      // 개발 환경에서도 경고를 출력하지 않음
    },
    getMessageFallback({ namespace, key, error }) {
      // 키가 없을 때 기본값 반환
      if (error?.code === IntlErrorCode.MISSING_MESSAGE) {
        return '';
      }
      return '';
    }
  };
});
