'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export const Dialog = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10001,
  }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        display: 'flex',
        width: '335px',
        height: '233px',
        maxWidth: '600px',
        padding: '32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: '12px',
        border: '1px solid #E6E6E6',
        background: '#FFFFFF',
        boxShadow: '0px 4px 8px -1px rgba(0, 0, 0, 0.1), 0px 1px 1px -1px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}
    >
      {children}
    </motion.div>
  </div>
);

export const DialogClose = ({ onPress }: { onPress: () => void }) => (
  null
);

export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  // 문자열인 경우 \n을 <br />로 변환
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line.trim()}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return children;
  };

  return (
    <p style={{
      alignSelf: 'stretch',
      color: '#000',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '-0.48px',
      margin: 0,
      paddingBottom: '12px'
    }}>
      {renderContent()}
    </p>
  );
};

export const DialogBody = ({ children }: { children: React.ReactNode }) => {
  // 문자열인 경우 \n을 <br />로 변환
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line.trim()}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return children;
  };

  return (
    <p style={{
      alignSelf: 'stretch',
      color: '#000',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '140%',
      margin: 0,
      flex: 1
    }}>
      {renderContent()}
    </p>
  );
};

export const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch'
  }}>
    {children}
  </div>
);

export const DialogButton = ({ children, onPress }: { children: React.ReactNode; onPress: () => void }) => (
  <button
    onClick={onPress}
    style={{
      display: 'flex',
      minWidth: '52px',
      width: 'auto',
      height: '40px',
      padding: '8px 16px',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '12px',
      border: '1px solid #2B2B2B',
      background: '#2B2B2B',
      color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
     
    }}
  >
    {children}
  </button>
);

export const ValidationDialog = ({
  isOpen,
  onClose,
  type
}: {
  isOpen: boolean;
  onClose: () => void;
  type: 'name' | 'phoneEmpty' | 'phoneError' | 'dept' | null
}) => {
  const t = useTranslations('cta.form');
  const commonT = useTranslations('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [isOpen]);

  const content = {
    name: {
      title: t('validation.nameRequired')?.split('.').join('\n') || '성함을\n입력해주세요',
      body: t('validation.nameDetail') || '원활한 상담을 위해\n성함을 입력해주세요.'
    },
    phoneEmpty: {
      title: t('validation.phoneEmpty') || '전화번호를\n입력해주세요',
      body: t('validation.phoneEmptyDetail') || '원활한 상담을 위해\n전화번호를 입력해주세요.'
    },
    phoneError: {
      title: t('validation.phoneError') || '연락처를\n확인해주세요',
      body: t('validation.phoneErrorDetail') || '올바른 휴대폰 번호를\n입력해주세요.'
    },
    dept: {
      title: t('validation.departmentRequired') || '진료과목을\n선택해주세요',
      body: t('validation.deptDetail') || '원활한 상담을 위해\n진료과목을 선택해주세요.'
    }
  };

  const activeContent = type ? content[type] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && activeContent && (
        <div key="validation-dialog-container" style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
          <Dialog>
            <DialogTitle>{activeContent.title}</DialogTitle>
            <DialogBody>{activeContent.body}</DialogBody>
            <ButtonGroup>
              <DialogButton onPress={onClose}>{commonT('confirm')}</DialogButton>
            </ButtonGroup>
          </Dialog>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};


export const SuccessDialog = ({
  isOpen,
  onClose,
  title,
  body
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
}) => {
  const t = useTranslations('cta.form');
  const commonT = useTranslations('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [isOpen]);

  const defaultContent = {
    title: t('success')?.split('.').join('\n') || '상담 신청이 완료되었습니다.',
    body: t('successDetail') || '빠른 시일 내에\n연락드리겠습니다.'
  };

  const content = {
    title: title || defaultContent.title,
    body: body || defaultContent.body
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="success-dialog-container" style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
          <Dialog>
            <DialogTitle>{content.title}</DialogTitle>
            <DialogBody>{content.body}</DialogBody>
            <ButtonGroup>
              <DialogButton onPress={onClose}>{commonT('confirm')}</DialogButton>
            </ButtonGroup>
          </Dialog>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ErrorDialog = ({
  isOpen,
  onClose,
  title,
  body
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
}) => {
  const t = useTranslations('cta.form');
  const commonT = useTranslations('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [isOpen]);

  const defaultContent = {
    title: t('error')?.split('.').join('\n') || '오류가\n발생했습니다',
    body: t('errorDetail') || '상담 신청 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'
  };

  const content = {
    title: title || defaultContent.title,
    body: body || defaultContent.body
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="error-dialog-container" style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
          <Dialog>
            <DialogTitle>{content.title}</DialogTitle>
            <DialogBody>{content.body}</DialogBody>
            <ButtonGroup>
              <DialogButton onPress={onClose}>{commonT('confirm')}</DialogButton>
            </ButtonGroup>
          </Dialog>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const PrivacyDialog = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const t = useTranslations('cta.form');
  const commonT = useTranslations('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [isOpen]);

  const content = {
    title: t('validation.privacyRequired')?.split('.').join('\n') || '개인정보\n동의가 필요합니다',
    body: t('validation.privacyDetail') || '상담 신청을 위해\n개인정보처리방침에 동의해주세요.'
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div key="privacy-dialog-container" style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
          <Dialog>
            <DialogTitle>{content.title}</DialogTitle>
            <DialogBody>{content.body}</DialogBody>
            <ButtonGroup>
              <DialogButton onPress={onClose}>{commonT('confirm')}</DialogButton>
            </ButtonGroup>
          </Dialog>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
