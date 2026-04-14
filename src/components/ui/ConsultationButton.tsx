'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type ButtonVariant = 'small' | 'hero' | 'heroLarge' | 'mobile';

interface ConsultationButtonProps {
  onClick?: () => void;
  label?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, { minWidth: string; height: string; fontSize: string; borderRadius: string }> = {
  small: { minWidth: '85px', height: '31px', fontSize: '16px', borderRadius: '50px' },
  hero: { minWidth: '176px', height: '37px', fontSize: '16px', borderRadius: '30px' },
  heroLarge: { minWidth: '176px', height: '37px', fontSize: '18px', borderRadius: '30px' },
  mobile: { minWidth: '290px', height: '54px', fontSize: '20px', borderRadius: '30px' },
};

export function ConsultationButton({
  onClick,
  label,
  variant = 'small',
  fullWidth = false,
  className,
}: ConsultationButtonProps) {
  const router = useRouter();
  const t = useTranslations('nav');
  const displayLabel = label ?? (variant === 'small' ? '상담 예약' : t('mobileConsultationBtn'));
  const styles = VARIANT_STYLES[variant];

  const handleClick = () => {
    onClick?.();
    router.push('/consultation');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer bg-primary',
        className
      )}
      style={{
        minWidth: fullWidth ? '100%' : styles.minWidth,
        width: fullWidth ? '100%' : 'fit-content',
        height: fullWidth ? '56px' : styles.height,
        padding: '15px 20px',
        gap: '10px',
        borderRadius: styles.borderRadius,
      }}
    >
      <span
        style={{
          color: '#000',
          textAlign: 'center',
          fontSize: styles.fontSize,
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {displayLabel}
      </span>
    </button>
  );
}

// Legacy exports for backward compatibility
export const HeroConsultationButton = (props: Omit<ConsultationButtonProps, 'variant'>) => (
  <ConsultationButton {...props} variant="hero" />
);

export const MobileConsultationButton = (props: Omit<ConsultationButtonProps, 'variant'>) => (
  <ConsultationButton {...props} variant="mobile" />
);

export const ImplantHeroConsultationButton = (props: Omit<ConsultationButtonProps, 'variant'>) => (
  <ConsultationButton {...props} variant="heroLarge" />
);
