'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { makeFadeUpResponsive, type DeviceType, type FadeUpOptions } from '@/lib/animationPresets';

/**
 * Responsive animation hook
 * 
 * Detects device type and provides responsive animation presets
 * - Desktop (>= 768px): Full animation with y transform
 * - Mobile (< 768px): Opacity only (no transform for performance)
 */
export function useResponsiveAnimation() {
  const reduced = useReducedMotion();
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const updateDevice = () => {
      setDeviceType(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };

    // Initial check
    updateDevice();

    // Listen for resize events
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  /**
   * Responsive FadeUp animation preset
   * Automatically adjusts for mobile (opacity only) vs desktop (y + opacity)
   */
  const fadeUp = (options?: FadeUpOptions) => {
    return makeFadeUpResponsive(!!reduced, deviceType, {
      y: 10, // Desktop default
      delay: 0,
      duration: 0.6,
      ...options,
    });
  };

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop',
    reducedMotion: !!reduced,
    fadeUp,
  };
}
