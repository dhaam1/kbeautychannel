'use client';
import type { MotionProps } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { EASING, VIEWPORT_CONFIG } from '@/lib/animationTiming';

type InViewMotionPreset = Pick<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'>;

export type FadeUpOptions = {
  y?: number;
  delay?: number;
  duration?: number;
  ease?: Transition['ease'];
  viewport?: typeof VIEWPORT_CONFIG;
};

const DEFAULT_DURATION = 0.6;

function makeFadeUp(
  reducedMotion: boolean,
  {
    y = 20,
    delay = 0,
    duration = DEFAULT_DURATION,
    ease = EASING.APPLE_SMOOTH,
    viewport = VIEWPORT_CONFIG,
  }: FadeUpOptions = {},
): InViewMotionPreset {
  return {
    initial: reducedMotion ? { opacity: 0 } : { y, opacity: 0 },
    whileInView: reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 },
    viewport,
    transition: { duration, ease, delay },
  };
}

/**
 * Responsive FadeUp animation preset
 * - Desktop: y: 10, opacity animation
 * - Mobile: opacity only (no transform for performance)
 */
export type DeviceType = 'mobile' | 'desktop';

export function makeFadeUpResponsive(
  reducedMotion: boolean,
  deviceType: DeviceType,
  {
    y = 10,
    delay = 0,
    duration = DEFAULT_DURATION,
    ease = EASING.APPLE_SMOOTH,
    viewport = VIEWPORT_CONFIG,
  }: FadeUpOptions = {},
): InViewMotionPreset {
  const isMobile = deviceType === 'mobile';
  
  // Mobile: opacity only (no transform for performance)
  // Desktop: y transform + opacity
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport,
      transition: { 
        duration: isMobile ? duration * 0.67 : duration, 
        ease, 
        delay: isMobile ? delay * 0.5 : delay 
      },
    };
  }

  if (isMobile) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport,
      transition: { 
        duration: duration * 0.67, // 0.6s -> 0.4s
        ease, 
        delay: delay * 0.5, // 50% reduction
      },
    };
  }

  // Desktop: full animation with y transform
  return {
    initial: { y, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport,
    transition: { duration, ease, delay },
  };
}

