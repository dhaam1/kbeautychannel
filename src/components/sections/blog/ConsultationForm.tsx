'use client';

import React, { useState } from 'react';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import { enrichFormDataWithUTM } from '@/lib/utm';
import { ConsultationSelect } from './ConsultationSelect';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';
import LineCTASection from '@/components/sections/line/LineCTASection';

import { useParams } from 'next/navigation';

/**
 * 블로그 포스트 본문 바로 아래에 위치하는 상담 신청 양식입니다.
 * 
 * 주요 기능:
 * - 방문자들이 글을 읽고 바로 궁금한 점을 물어볼 수 있도록 성함, 연락처 등을 입력받습니다.
 * - 입력된 정보가 올바른지 확인하고, 이상이 없다면 안전하게 저장합니다.
 * - 상담 신청이 끝나면 감사 인사가 담긴 팝업창을 보여줍니다.
 */
export function ConsultationForm() {
  const params = useParams();
  const locale = params?.locale as string || 'kr';
  const isJp = locale === 'jp';
  const isEn = locale === 'en';

  const t = {
    consultationHeader: isJp ? 'ブランシュ歯科 相談申請' : isEn ? 'Blanche Dental Consultation Booking' : '블랑쉬치과 상담신청',
    name: isJp ? 'お名前' : isEn ? 'Name' : '성함',
    phone: isJp ? '連絡처' : isEn ? 'Phone Number' : '연락처',
    choice: isJp ? '選択してください' : isEn ? 'Select Option' : '선택해주세요',
    privacyLink: isJp ? '個人情報保護方針' : isEn ? 'Privacy Policy' : '개인정보처리방침',
    privacy: isJp ? 'に同意します' : isEn ? 'I agree to the' : '에 동의합니다',
    submit: isJp ? '相談予約' : isEn ? 'Book Consultation' : '상담 신청하기',
    submitting: isJp ? '送信中...' : isEn ? 'Submitting...' : '제출 중...',
    departments: {
      blanche: isJp ? 'ブランシュ' : isEn ? 'Blanche' : '블랑쉬',
      implant: isJp ? 'インプラント' : isEn ? 'Implant' : '임플란트',
      orthodontic: isJp ? '矯正' : isEn ? 'Orthodontics' : '교정',
      etc: isJp ? 'その他' : isEn ? 'Others' : '기타진료'
    },
    success: isJp ? '相談予約이\n완료되었습니다' : isEn ? 'Consultation Request\nCompleted' : '상담 신청이\n완료되었습니다',
    successBody: isJp ? '近日中に\nご連絡いたします' : isEn ? 'We will get back to you shortly.' : '빠른 시일 내에 연락드리겠습니다.',
    error: isJp ? 'エラーが\n발생했습니다' : isEn ? 'An error\noccurred' : '오류가\n발생했습니다',
    errorBody: isJp ? 'しばらくしてからもう一度お試しください' : isEn ? 'Please try again later' : '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  };


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
  });
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationDialog, setValidationDialog] = useState<'name' | 'phoneEmpty' | 'phoneError' | 'dept' | null>(null);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [privacyDialog, setPrivacyDialog] = useState(false);

  /** 입력 필드 변경 핸들러 */
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digits = value.replace(/[^0-9]/g, '');
      let formatted = '';
      if (digits.length <= 3) {
        formatted = digits;
      } else if (digits.length <= 7) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  /** 체크박스 변경 핸들러 */
  const onAgreementToggle = () => {
    setIsPrivacyAgreed(!isPrivacyAgreed);
  };

  /** 폼 제출 핸들러 */
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 중복 제출 방지
    if (isSubmitting) {
      return;
    }

    if (!formData.name.trim()) {
      setValidationDialog('name');
      return;
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      setValidationDialog('phoneEmpty');
      return;
    }

    if (phoneDigits.length !== 11) {
      setValidationDialog('phoneError');
      return;
    }

    if (!formData.department) {
      setValidationDialog('dept');
      return;
    }

    if (!isPrivacyAgreed) {
      setPrivacyDialog(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: ConsultationFormData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        department: formData.department,
        privacyAgreed: null,
      };
      const payloadWithUTM = enrichFormDataWithUTM(payload);
      await submitConsultation(payloadWithUTM);

      setSuccessDialog(true);
      setFormData({ name: '', phone: '', department: '' });
      setIsPrivacyAgreed(false);
    } catch (error) {
      console.error('상담 신청 제출 오류:', error);
      setErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEn) {
    return (
      <div className="w-full py-16 flex justify-center items-center">
        <WhatsAppCTASection />
      </div>
    );
  }
  if (isJp) {
    return (
      <div className="w-full py-16 flex justify-center items-center">
        <LineCTASection />
      </div>
    );
  }

  return (
    <div className="bf-wrap w-full max-w-[800px] mx-auto px-5 my-16">
      {/* Form Header - Dark Background */}
      <div className="bg-[#1a1a1a] rounded-t-xl px-10 py-10">
        <p className="text-white text-center font-['Noto_Sans_KR',sans-serif] text-lg leading-relaxed whitespace-pre-wrap">
          {t.consultationHeader}
        </p>
      </div>

      {/* Form Body */}
      <form onSubmit={onFormSubmit} className="bg-[#e8e8e8] border border-gray-200 border-t-0 rounded-b-xl px-10 py-10">
        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder={t.name}
              value={formData.name}
              onChange={onFieldChange}
              className="w-full h-[60px] px-5 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#7ECEC0] focus:ring-2 focus:ring-[#7ECEC0]/20 transition-colors font-['Noto_Sans_KR',sans-serif] text-base"
            />
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder={t.phone}
              value={formData.phone}
              onChange={onFieldChange}
              className="w-full h-[60px] px-5 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#7ECEC0] focus:ring-2 focus:ring-[#7ECEC0]/20 transition-colors font-['Noto_Sans_KR',sans-serif] text-base"
            />
          </div>

          {/* Department Select */}
          <ConsultationSelect
            value={formData.department}
            onChange={(val) => setFormData(prev => ({ ...prev, department: val }))}
            options={[
              { value: '블랑쉬', label: t.departments.blanche },
              { value: '임플란트', label: t.departments.implant },
              { value: '교정', label: t.departments.orthodontic },
              { value: '기타진료', label: t.departments.etc },
            ]}
            placeholder={t.choice}
          />

          {/* Privacy Agreement */}
          <div className="flex items-center gap-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isPrivacyAgreed}
                onChange={onAgreementToggle}
                className="w-5 h-5 rounded border-gray-300 text-[#7ECEC0] focus:ring-[#7ECEC0] focus:ring-2"
              />
              <span className="font-['Noto_Sans_KR',sans-serif] text-sm text-gray-700">
                {isEn && <span className="mr-1">{t.privacy}</span>}
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open('/privacy', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-[#7ECEC0] underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  {t.privacyLink}
                </span>
                {!isEn && t.privacy}
              </span>
            </label>
          </div>

          {/* Submit Button - Mint Color & Hover Effect Applied */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[60px] rounded-full bg-[#7ECEC0] text-[#1a1a1a] font-['Noto_Sans_KR',sans-serif] font-bold text-lg transition-opacity hover:opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>
      </form>

      {/* Dialog Popups */}
      <ValidationDialog
        isOpen={!!validationDialog}
        onClose={() => setValidationDialog(null)}
        type={validationDialog}
      />

      <SuccessDialog
        isOpen={successDialog}
        onClose={() => setSuccessDialog(false)}
        title={t.success}
        body={t.successBody}
      />

      <ErrorDialog
        isOpen={errorDialog}
        onClose={() => setErrorDialog(false)}
        title={t.error}
        body={t.errorBody}
      />

      <PrivacyDialog
        isOpen={privacyDialog}
        onClose={() => setPrivacyDialog(false)}
      />
    </div >
  );
}