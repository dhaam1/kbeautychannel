'use client';

import { useState, useCallback } from 'react';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import { enrichFormDataWithUTM } from '@/lib/utm';

/**
 * 폼 데이터 타입
 */
export interface CTAFormData {
  name: string;
  phone: string;
  department: string;
}

/**
 * 유효성 검사 다이얼로그 타입
 */
export type ValidationDialogType = 'name' | 'phoneEmpty' | 'phoneError' | 'dept' | null;

/**
 * useCTAForm 반환 타입
 */
export interface UseCTAFormReturn {
  // 상태
  formData: CTAFormData;
  isPrivacyAgreed: boolean;
  isSubmitting: boolean;
  validationDialog: ValidationDialogType;
  successDialog: boolean;
  errorDialog: boolean;
  privacyDialog: boolean;

  // 핸들러
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAgreementToggle: () => void;
  onFormSubmit: (e: React.FormEvent) => Promise<void>;

  // 다이얼로그 닫기
  closeValidationDialog: () => void;
  closeSuccessDialog: () => void;
  closeErrorDialog: () => void;
  closePrivacyDialog: () => void;
}

/**
 * useCTAForm 옵션 타입
 */
export interface UseCTAFormOptions {
  /** 초기 진료과목 값 (특정 페이지에서 미리 선택되어야 하는 경우) */
  initialDepartment?: string;
}

/**
 * CTA 폼 로직을 재사용 가능한 훅으로 추출
 *
 * @description
 * 상담 신청 폼의 공통 로직을 처리합니다:
 * - 폼 상태 관리 (이름, 전화번호, 진료과목)
 * - 전화번호 자동 포맷팅 (010-0000-0000)
 * - 유효성 검사
 * - Firebase 제출
 * - 다이얼로그 상태 관리
 *
 * @example
 * ```tsx
 * const {
 *   formData,
 *   isPrivacyAgreed,
 *   isSubmitting,
 *   onFieldChange,
 *   onAgreementToggle,
 *   onFormSubmit,
 *   ...dialogs
 * } = useCTAForm();
 *
 * // 또는 초기 진료과목 설정
 * const { ... } = useCTAForm({ initialDepartment: 'sleep' });
 * ```
 */
export function useCTAForm(options?: UseCTAFormOptions): UseCTAFormReturn {
  const { initialDepartment = '' } = options ?? {};

  // 폼 데이터 상태
  const [formData, setFormData] = useState<CTAFormData>({
    name: '',
    phone: '',
    department: initialDepartment
  });

  // 개인정보 동의 상태
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);

  // 제출 중 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 다이얼로그 상태들
  const [validationDialog, setValidationDialog] = useState<ValidationDialogType>(null);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [privacyDialog, setPrivacyDialog] = useState(false);

  /**
   * 전화번호 포맷팅 함수
   */
  const formatPhoneNumber = useCallback((value: string): string => {
    const digits = value.replace(/[^0-9]/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
    }
  }, []);

  /**
   * 입력 필드 변경 핸들러
   */
  const onFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, [formatPhoneNumber]);

  /**
   * 체크박스 변경 핸들러
   */
  const onAgreementToggle = useCallback(() => {
    setIsPrivacyAgreed(prev => !prev);
  }, []);

  /**
   * 폼 제출 핸들러
   */
  const onFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 중복 제출 방지
    if (isSubmitting) {
      return;
    }

    // 유효성 검사: 이름
    if (!formData.name.trim()) {
      setValidationDialog('name');
      return;
    }

    // 유효성 검사: 전화번호
    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      setValidationDialog('phoneEmpty');
      return;
    }

    if (phoneDigits.length !== 11) {
      setValidationDialog('phoneError');
      return;
    }

    // 유효성 검사: 진료과목
    if (!formData.department) {
      setValidationDialog('dept');
      return;
    }

    // 유효성 검사: 개인정보 동의
    if (!isPrivacyAgreed) {
      setPrivacyDialog(true);
      return;
    }

    // 제출 시작
    setIsSubmitting(true);
    try {
      const payload: ConsultationFormData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        department: formData.department,
        privacyAgreed: null
      };
      const payloadWithUTM = enrichFormDataWithUTM(payload);
      await submitConsultation(payloadWithUTM);

      // 성공 처리
      setSuccessDialog(true);
      setFormData({ name: '', phone: '', department: initialDepartment });
      setIsPrivacyAgreed(false);
    } catch (error) {
      console.error('상담 신청 제출 오류:', error);
      setErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isPrivacyAgreed, isSubmitting, initialDepartment]);

  // 다이얼로그 닫기 핸들러들
  const closeValidationDialog = useCallback(() => setValidationDialog(null), []);
  const closeSuccessDialog = useCallback(() => setSuccessDialog(false), []);
  const closeErrorDialog = useCallback(() => setErrorDialog(false), []);
  const closePrivacyDialog = useCallback(() => setPrivacyDialog(false), []);

  return {
    // 상태
    formData,
    isPrivacyAgreed,
    isSubmitting,
    validationDialog,
    successDialog,
    errorDialog,
    privacyDialog,

    // 핸들러
    onFieldChange,
    onAgreementToggle,
    onFormSubmit,

    // 다이얼로그 닫기
    closeValidationDialog,
    closeSuccessDialog,
    closeErrorDialog,
    closePrivacyDialog,
  };
}
