'use client';
import LineCTASection from '@/components/sections/line/LineCTASection';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';

import React from 'react';
import { cn } from '@/lib/utils';
import CTAForm from '@/components/ui/CTAForm';
import CTAFormMobile from '@/components/ui/CTAFormMobile';
import { CTADialogs } from '@/components/ui/CTADialogs';
import { useCTAForm } from '@/hooks/useCTAForm';
import {  useTranslations , useLocale } from 'next-intl';

export function SleepCTASection() {
  const locale = useLocale();
  const t = useTranslations('solution.sleep.cta');
  const {
    formData,
    isPrivacyAgreed,
    isSubmitting,
    validationDialog,
    successDialog,
    errorDialog,
    privacyDialog,
    onFieldChange,
    onAgreementToggle,
    onFormSubmit,
    closeValidationDialog,
    closeSuccessDialog,
    closeErrorDialog,
    closePrivacyDialog,
  } = useCTAForm();

  return (
    <section className="relative w-full bg-[#F7F8F8]">
      <div
        className="mx-auto relative pt-[60px] md:pt-[67px] pb-0 md:pb-[100px] px-[30px] md:px-[80px] max-w-content"
      >
        <div className="flex flex-col cta-breakpoint:flex-row md:items-start cta-breakpoint:justify-between">
          {/* 텍스트 영역 */}
          <div className="flex flex-col max-w-full cta-breakpoint:max-w-[600px] mb-[66px] cta-breakpoint:mb-0">
            <div className="flex flex-col items-start text-left">
              <h2
                className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
                style={{ lineHeight: '30px' }}
              >
                {t('title')}
              </h2>
              <div
                className={cn(
                  "hidden md:block text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
                  "mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
                )}
                style={{ fontStyle: 'normal', lineHeight: 'normal' }}
              >
                {t('subtitleDesktop')}
              </div>
              <div
                className={cn(
                  "md:hidden text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
                  "mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
                )}
                style={{ fontStyle: 'normal', lineHeight: 'normal' }}
              >
                {t('subtitleMobile')}
              </div>
            </div>

            <div
              className="mb-0 cta-breakpoint:mb-[84px] text-[18px]"
              style={{
                color: '#000',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '31px',
                letterSpacing: '-0.18px',
                whiteSpace: 'pre-line'
              }}
            >
              {t('description')}
            </div>

            {/* 데스크톱 전용 장식 요소 */}
            <div className="hidden cta-breakpoint:flex flex-row items-center gap-[15px]">
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
                  {t('designElements.box')}
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
                {t('designElements.text')}
              </p>
            </div>
          </div>

          {/* 폼 영역 */}
          <div className="hidden cta-breakpoint:block w-full max-w-[500px]">
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
              formData={formData}
              isChecked={isPrivacyAgreed}
              isLoading={isSubmitting}
              onInputChange={onFieldChange}
              onCheckboxChange={onAgreementToggle}
              onSubmit={onFormSubmit}
              submitButtonId="cta_reservation_bottom"
            />
        )}
          </div>

          <div className="cta-breakpoint:hidden w-full">
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
              formData={formData}
              isChecked={isPrivacyAgreed}
              isLoading={isSubmitting}
              onInputChange={onFieldChange}
              onCheckboxChange={onAgreementToggle}
              onSubmit={onFormSubmit}
              submitButtonId="cta_reservation_bottom"
            />
        )}
          </div>
        </div>
      </div>

      <CTADialogs
        validationDialog={validationDialog}
        successDialog={successDialog}
        errorDialog={errorDialog}
        privacyDialog={privacyDialog}
        onCloseValidation={closeValidationDialog}
        onCloseSuccess={closeSuccessDialog}
        onCloseError={closeErrorDialog}
        onClosePrivacy={closePrivacyDialog}
      />
    </section>
  );
}
