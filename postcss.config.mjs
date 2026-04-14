/**
 * PostCSS 설정 파일
 * 
 * @description
 * PostCSS는 CSS 후처리 도구로, Tailwind CSS와 Autoprefixer를 사용합니다.
 * 
 * 플러그인:
 * - tailwindcss: Tailwind CSS 유틸리티 클래스 처리
 * - autoprefixer: 브라우저 호환성을 위한 CSS 벤더 프리픽스 자동 추가
 * - cssnano: 프로덕션 빌드에서 CSS 미니파이 (주석 제거, 공백 정규화)
 * 
 * @see https://tailwindcss.com/docs/using-with-preprocessors
 * @see https://cssnano.co/
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 프로덕션에서만 CSS 미니파이
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        }],
      },
    } : {}),
  },
};
