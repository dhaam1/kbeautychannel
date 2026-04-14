'use client';
import LineCTASection from '@/components/sections/line/LineCTASection';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';

import React, { useState } from 'react';
import {  useTranslations , useLocale } from 'next-intl';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import CTAForm from '@/components/ui/CTAForm';
import CTAFormMobile from '@/components/ui/CTAFormMobile';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import { enrichFormDataWithUTM } from '@/lib/utm';

export function BlogCTA() {
  const locale = useLocale();
  const translations = useTranslations('cta');

  const [submissionData, setSubmissionData] = useState({
    name: '',
    phone: '',
    department: ''
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
      setSubmissionData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setSubmissionData(prev => ({ ...prev, [name]: value }));
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

    console.log('CTA Form Submit Clicked', submissionData);

    if (!submissionData.name.trim()) {
      console.log('Validation failed: name');
      setValidationDialog('name');
      return;
    }

    const phoneDigits = submissionData.phone.replace(/[^0-9]/g, '');
    if (!submissionData.phone.trim()) {
      setValidationDialog('phoneEmpty');
      return;
    }

    if (phoneDigits.length !== 11) {
      setValidationDialog('phoneError');
      return;
    }

    if (!submissionData.department) {
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
        name: submissionData.name.trim(),
        phone: submissionData.phone.trim(),
        department: submissionData.department,
        privacyAgreed: null
      };

      // UTM 파라미터 추가
      const payloadWithUTM = enrichFormDataWithUTM(payload);

      await submitConsultation(payloadWithUTM);

      setSuccessDialog(true);
      setSubmissionData({ name: '', phone: '', department: '' });
      setIsPrivacyAgreed(false);
    } catch (error) {
      console.error('상담 신청 제출 오류:', error);
      setErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#F7F8F8]">
      <div
        className="hidden cta-breakpoint:block mx-auto h-[694px] relative max-w-content"
      >
        <div className="absolute top-[67px] left-[80px] flex flex-col max-w-[600px]">
          <SectionHeading
            label="편안한 상담"
            title={[
              "블랑쉬치과는",
              "정확한 진단에서",
              "시작합니다."
            ]}
            align="left"
            titleClassName="mb-[45px] text-[28px] tracking-[-0.28px]"
          />

          <div
            className="mb-[84px]"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '31px',
              letterSpacing: '-0.18px',
              whiteSpace: 'pre-line',
            }}
          >
            현재 상태를 면밀히 분석하고,{'\n'}
            가장 적합한 치료 방향을 <br className="block md:hidden" />제안해드립니다.{'\n'}
            {'\n'}
            치아 고민, 편하게 상담해보세요.
          </div>

          <div className="flex flex-row items-center gap-[15px]">
            <div
              className="flex items-center justify-center"
              style={{
                width: '122px',
                height: '122px',
                border: '1px solid #A0A0A0',
                flexShrink: 0
              }}
            >
              <p
                style={{
                  color: '#A0A0A0',
                  textAlign: 'center',
                  fontFamily: '"Song Myung"',
                  fontSize: '30px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '33px',
                  whiteSpace: 'pre-line'
                }}
              >
                미소가{'\n'}
                작품이{'\n'}
                되는곳
              </p>
            </div>

            <p
              style={{
                color: '#A0A0A0',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '38px',
                letterSpacing: '-0.2px',
                whiteSpace: 'pre-line'
              }}
            >
              블랑쉬에서,{'\n'}
              당신의 변화를{'\n'}
              시작하세요
            </p>
          </div>
        </div>

        {locale === 'en' ? (
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 z-10 w-[460px]">
             <WhatsAppCTASection />
          </div>
        ) : locale === 'jp' ? (
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 z-10 w-[460px]">
             <LineCTASection />
          </div>
        ) : (
          <CTAForm
          formData={submissionData}
          isChecked={isPrivacyAgreed}
          isLoading={isSubmitting}
          onInputChange={onFieldChange}
          onCheckboxChange={onAgreementToggle}
          onSubmit={onFormSubmit}
          submitButtonId="cta_blog"
        />
        )}
      </div>

      <div
        className="cta-breakpoint:hidden mx-auto h-auto relative flex flex-col pt-[60px] pb-0 px-[30px] md:px-[80px] max-w-content"
      >
        <div className="relative flex flex-col max-w-full mb-[66px]">
          <SectionHeading
            label="편안한 상담"
            title={[
              "블랑쉬치과는",
              "정확한 진단에서",
              "시작합니다."
            ]}
            align="left"
            titleClassName="mb-[50px] md:mb-[75px] text-[28px] tracking-[-0.28px]"
          />

          <div
            className="mb-0 text-[18px]"
            style={{
              color: '#000',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '31px',
              letterSpacing: '-0.18px',
              whiteSpace: 'pre-line',
            }}
          >
            현재 상태를 면밀히 분석하고,{'\n'}
            가장 적합한 치료 방향을 <br className="block md:hidden" />제안해드립니다.{'\n'}
            {'\n'}
            치아 고민, 편하게 상담해보세요.
          </div>
        </div>

        {locale === 'en' ? (
           <div className="w-full flex justify-center mt-10">
               <WhatsAppCTASection />
           </div>
        ) : locale === 'jp' ? (
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 z-10 w-[460px]">
             <LineCTASection />
          </div>
        ) : locale === 'jp' ? (
           <div className="w-full flex justify-center mt-10">
               <LineCTASection />
           </div>
        ) : (
          <CTAFormMobile
          formData={submissionData}
          isChecked={isPrivacyAgreed}
          isLoading={isSubmitting}
          onInputChange={onFieldChange}
          onCheckboxChange={onAgreementToggle}
          onSubmit={onFormSubmit}
          submitButtonId="cta_blog"
        />
        )}
      </div>

      <ValidationDialog
        isOpen={!!validationDialog}
        onClose={() => setValidationDialog(null)}
        type={validationDialog}
      />

      <SuccessDialog
        isOpen={successDialog}
        onClose={() => setSuccessDialog(false)}
        title={translations('form.success')?.split('.').join('\n') || '상담 신청이\n완료되었습니다'}
        body="빠른 시일 내에 연락드리겠습니다."
      />

      <ErrorDialog
        isOpen={errorDialog}
        onClose={() => setErrorDialog(false)}
        title={translations('form.error')?.split('.').join('\n') || '오류가\n발생했습니다'}
        body="상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      />

      <PrivacyDialog
        isOpen={privacyDialog}
        onClose={() => setPrivacyDialog(false)}
      />
    </section>
  );
}
