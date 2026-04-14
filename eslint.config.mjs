import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint 설정 파일
 * 
 * @description
 * 프로젝트의 코드 품질 및 스타일 검사를 위한 ESLint 구성을 정의합니다.
 * 
 * 주요 설정:
 * - Next.js Core Web Vitals 규칙: Next.js 성능 최적화 규칙
 * - Next.js TypeScript 규칙: TypeScript 관련 규칙
 * 
 * 무시할 파일/디렉토리:
 * - .next/**: Next.js 빌드 출력 디렉토리
 * - out/**: Next.js 정적 내보내기 출력 디렉토리
 * - build/**: 빌드 출력 디렉토리
 * - next-env.d.ts: Next.js 타입 정의 파일
 * 
 * @see https://nextjs.org/docs/app/building-your-application/configuring/eslint
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // 프로젝트 전반에 `any` 사용이 남아있는 상태라 에러 대신 경고로 전환
      "@typescript-eslint/no-explicit-any": "warn",
      // 일부 컴포넌트에서 hydration/DOM 파싱 등의 이유로 effect 내 setState 패턴이 필요함
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
