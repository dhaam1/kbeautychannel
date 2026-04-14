'use client';

import { motion } from 'framer-motion';
import { useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

interface MotionFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'h2' | 'p' | 'section';
}

/**
 * 서버 컴포넌트에서 사용 가능한 공통 fadeUp 애니메이션 래퍼
 * framer-motion, useMotionEnabled, useResponsiveAnimation을 캡슐화
 */
export function MotionFadeUp({ children, delay = 0, className, style, as = 'div' }: MotionFadeUpProps) {
  const motionEnabled = useMotionEnabled();
  const { fadeUp } = useResponsiveAnimation();

  if (!motionEnabled) {
    const Tag = as;
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag className={className} style={style} {...fadeUp({ delay })}>
      {children}
    </MotionTag>
  );
}

interface MotionClipRevealProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * clipPath를 사용한 라인 reveal 애니메이션 (세로선 등)
 */
export function MotionClipReveal({ children, className, style }: MotionClipRevealProps) {
  const motionEnabled = useMotionEnabled();

  if (!motionEnabled) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

interface MotionImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 이미지 영역에 사용하는 y:100 → y:0 reveal 애니메이션
 */
export function MotionImageReveal({ children, delay = 0, className, style }: MotionImageRevealProps) {
  const motionEnabled = useMotionEnabled();

  if (!motionEnabled) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
