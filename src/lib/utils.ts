import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스명 병합 유틸리티 함수
 * 
 * @description
 * clsx와 tailwind-merge를 결합하여 Tailwind CSS 클래스명을 안전하게 병합합니다.
 * tailwind-merge는 충돌하는 클래스명을 자동으로 해결합니다.
 * 
 * 사용 예시:
 * ```tsx
 * cn('px-4', 'py-2', isActive && 'bg-blue-500', 'px-6') 
 * // 결과: 'py-2 bg-blue-500 px-6' (px-4는 px-6에 의해 덮어씌워짐)
 * ```
 * 
 * @param {...ClassValue} inputs - 병합할 클래스명들 (문자열, 객체, 배열, 조건부 등)
 * @returns {string} 병합된 클래스명 문자열
 * 
 * @see https://github.com/dcastil/tailwind-merge
 * @see https://github.com/lukeed/clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 사이트 URL을 가져오는 유틸리티 함수
 * 
 * @description
 * 환경에 따라 적절한 사이트 URL을 반환합니다.
 * 우선순위:
 * 1. NEXT_PUBLIC_SITE_URL 환경 변수
 * 2. Firebase 호스팅 URL (FIREBASE_HOSTING_URL)
 * 3. 로컬 개발 환경 (localhost:3000)
 * 
 * @returns {string} 사이트 URL
 */
export function getSiteUrl(): string {
  // 1. 환경 변수로 명시적으로 설정된 경우 (가장 권장)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 2. Firebase 호스팅 URL (배포 환경에서 자동 주입되는 경우)
  if (process.env.FIREBASE_HOSTING_URL) {
    return process.env.FIREBASE_HOSTING_URL;
  }

  // 3. 로컬 개발 환경
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // 4. 기본값: 공식 도메인 (www.blanche.kr)
  return 'https://www.blanche.kr';
}

/**
 * 쓰로틀 함수
 * 
 * @description
 * 카카오톡 인앱 브라우저에서 resize 이벤트가 과도하게 발생하는 것을 방지하기 위한 쓰로틀 함수입니다.
 * 지정된 시간 간격 동안 함수 호출을 제한합니다.
 * 
 * @param func - 실행할 함수
 * @param delay - 쓰로틀 지연 시간 (ms)
 * @returns 쓰로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

