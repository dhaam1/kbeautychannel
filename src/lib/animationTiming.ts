/**
 * 애니메이션 타이밍 상수
 * 
 * @description
 * 프로젝트 전반에서 사용되는 애니메이션 타이밍 상수를 정의합니다.
 * Fibonacci/Golden Ratio 기반의 자연스러운 타이밍 시스템을 사용합니다.
 * 
 * 주요 상수:
 * - ANIMATION_DURATION: 애니메이션 지속 시간 (빠름, 표준, 느림)
 * - STAGGER_INTERVAL: 순차 애니메이션 간격
 * - EASING: 이징 함수 (애플 스타일, Material Design)
 * - ANIMATION_DIRECTION: 애니메이션 방향 (텍스트, 이미지, 카드 등)
 * - VIEWPORT_CONFIG: Intersection Observer 설정
 */

/** 기본 Duration (초) */
export const ANIMATION_DURATION = {
  /** 빠른 요소 (0.4초) - 버튼 호버, 작은 요소 */
  QUICK: 0.4,
  /** 표준 애니메이션 (0.6초) - 대부분의 요소 */
  BASE: 0.6,
  /** 중요한 요소 (0.8초) - 섹션 전환, 큰 요소 */
  SLOW: 0.8,
} as const;

/** Easing 함수 (애플 스타일) */
export const EASING = {
  /** Framer Motion 기본 easeOut */
  EASE_OUT: 'easeOut',
  /** 애플 스타일 부드러운 이징 (cubic-bezier) */
  APPLE_SMOOTH: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Material Design 이징 (cubic-bezier) */
  MATERIAL: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

/** 애니메이션 방향 (일관된 패턴) */
export const ANIMATION_DIRECTION = {
  /** 텍스트: 좌→우 슬라이드 */
  TEXT_SLIDE_X: -50,
  /** 이미지: 하→상 슬라이드 (표준) */
  IMAGE_SLIDE_Y: 30,
  /** 이미지: 하→상 슬라이드 (작은 요소) */
  IMAGE_SLIDE_Y_SMALL: 30,
  /** 이미지: 하→상 슬라이드 (큰 요소) */
  IMAGE_SLIDE_Y_LARGE: 50,
  /** 카드: 하→상 슬라이드 */
  CARD_SLIDE_Y: 80,
  /** 폼: 하→상 슬라이드 */
  FORM_SLIDE_Y: 50,
  /** 아이콘: scale 초기값 */
  ICON_SCALE_INITIAL: 0,
} as const;

/** Viewport 설정 (Intersection Observer) */
export const VIEWPORT_CONFIG = {
  /** 한 번만 트리거 (재진입 시 재실행 안 함) */
  once: true,
  /** 요소의 30%가 보이면 트리거 */
  amount: 0.3,
} as const;

