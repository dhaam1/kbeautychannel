import { useMemo } from 'react';
import type { MotionProps } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/**
 * Centralized switch for disabling motion without affecting layout/DOM structure.
 *
 * - Honors OS-level reduced motion
 * - Can be hard-disabled via NEXT_PUBLIC_DISABLE_MOTION=1
 */
export function useMotionEnabled(): boolean {
  const reduced = useReducedMotion();
  return useMemo(() => {
    return !(reduced || process.env.NEXT_PUBLIC_DISABLE_MOTION === '1');
  }, [reduced]);
}

/**
 * Only pass motion-specific props when motion is enabled.
 * This prevents React warnings when rendering plain DOM tags (e.g., 'div', 'p').
 */
export function motionProps<T extends Partial<MotionProps>>(
  enabled: boolean,
  props: T,
): T | Record<string, never> {
  return (enabled ? props : {}) as any;
}

