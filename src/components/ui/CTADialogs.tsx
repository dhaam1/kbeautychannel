'use client';

import { useTranslations } from 'next-intl';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import { ValidationDialogType } from '@/hooks/useCTAForm';

interface CTADialogsProps {
  validationDialog: ValidationDialogType;
  successDialog: boolean;
  errorDialog: boolean;
  privacyDialog: boolean;
  onCloseValidation: () => void;
  onCloseSuccess: () => void;
  onCloseError: () => void;
  onClosePrivacy: () => void;
  successTitle?: string;
  successBody?: string;
  errorTitle?: string;
  errorBody?: string;
}

/**
 * CTA 폼에서 사용되는 다이얼로그들을 일괄 렌더링하는 컴포넌트
 */
export function CTADialogs({
  validationDialog,
  successDialog,
  errorDialog,
  privacyDialog,
  onCloseValidation,
  onCloseSuccess,
  onCloseError,
  onClosePrivacy,
  successTitle,
  successBody,
  errorTitle,
  errorBody,
}: CTADialogsProps) {
  const translations = useTranslations('cta');

  const defaultSuccessTitle = translations('form.success')?.split('.').join('\n') || '상담 신청이\n완료되었습니다';
  const defaultSuccessBody = '빠른 시일 내에 연락드리겠습니다.';
  const defaultErrorTitle = translations('form.error')?.split('.').join('\n') || '오류가\n발생했습니다';
  const defaultErrorBody = '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

  return (
    <>
      <ValidationDialog
        isOpen={!!validationDialog}
        onClose={onCloseValidation}
        type={validationDialog}
      />

      <SuccessDialog
        isOpen={successDialog}
        onClose={onCloseSuccess}
        title={successTitle || defaultSuccessTitle}
        body={successBody || defaultSuccessBody}
      />

      <ErrorDialog
        isOpen={errorDialog}
        onClose={onCloseError}
        title={errorTitle || defaultErrorTitle}
        body={errorBody || defaultErrorBody}
      />

      <PrivacyDialog
        isOpen={privacyDialog}
        onClose={onClosePrivacy}
      />
    </>
  );
}
