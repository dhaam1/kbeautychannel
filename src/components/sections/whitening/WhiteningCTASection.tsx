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

export function WhiteningCTASection() {
  const locale = useLocale();
  const t = useTranslations('whitening.cta');
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
    <section className="relative w-full bg-[#FEFEFE]">
      {/* Main Container */}
      <div
        className="relative mx-auto w-full max-w-content"
      >
        {/* Shared Text Section */}
        <div
          className="flex flex-col px-[30px] pt-[60px] md:p-0 md:absolute md:top-[67px] md:left-[80px] z-10 max-w-full md:max-w-[600px] mb-[66px] md:mb-0"
        >
          <div className="flex flex-col items-start text-left">
            <h2
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {t('label')}
            </h2>
            <div
              className={cn(
                "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
                "mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
              )}
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {t.rich('title', { br: () => <br /> })}
            </div>
          </div>

          <div
            className="mb-[0px] md:mb-[84px] whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '31px',
              letterSpacing: '-0.18px',
              whiteSpace: 'pre-line'
            }}
          >
            {t('description')}
          </div>

          {/* Signature Block (Desktop Only) */}
          <div className="hidden md:flex flex-row items-center gap-[15px]">
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
              }}
            >
              {t.rich('designElements.box', { br: () => <br /> })}
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
              {t.rich('designElements.text', { br: () => <br /> })}
            </p>
          </div>
        </div>

        {/* Desktop Form Container */}
        <div className="hidden cta-breakpoint:block h-[694px] relative">
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
          />
        )}
        </div>

        {/* Mobile Form Container */}
        <div className="cta-breakpoint:hidden w-full px-[30px] pb-0">
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
          />
        )}
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
