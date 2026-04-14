'use client';
import LineCTASection from '@/components/sections/line/LineCTASection';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';

import React from 'react';
import {  useTranslations , useLocale } from 'next-intl';
import CTAForm from '@/components/ui/CTAForm';
import CTAFormMobile from '@/components/ui/CTAFormMobile';
import { CTADialogs } from '@/components/ui/CTADialogs';
import { useCTAForm } from '@/hooks/useCTAForm';

export function HomeCTASection() {
  const locale = useLocale();
  const translations = useTranslations('cta');

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
      <div className="hidden cta-breakpoint:block mx-auto h-[694px] relative max-w-content">
        <div className="absolute top-[67px] left-[80px] flex flex-col max-w-[600px]">
          <div className="flex flex-col items-start text-left">
            <h2
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {translations('subtitle.default')}
            </h2>
            <div
              className="text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black mb-[45px] text-[28px] tracking-[-0.28px]"
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {translations.raw('title.desktop').map((line: string, index: number) => (
                <React.Fragment key={index}>
                  {line.split('<br />').map((subLine: string, subIndex: number, subArray: string[]) => (
                    <React.Fragment key={subIndex}>
                      {subLine}
                      {subIndex < subArray.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  {index < translations.raw('title.desktop').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>

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
            {translations.raw('description.desktop').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < translations.raw('description.desktop').length - 1 && '\n'}
              </React.Fragment>
            ))}
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
                {translations('boxText')}
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
              {translations.raw('footer.desktop').map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line}
                  {i < translations.raw('footer.desktop').length - 1 && '\n'}
                </React.Fragment>
              ))}
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

      <div className="cta-breakpoint:hidden mx-auto h-auto relative flex flex-col pt-[60px] pb-0 px-[30px] md:px-[80px] max-w-content">
        <div className="relative flex flex-col max-w-full mb-[66px]">
          <div className="flex flex-col items-start text-left">
            <p
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {translations('subtitle.default')}
            </p>
            <div
              className="text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black mb-[50px] md:mb-[75px] text-[28px] tracking-[-0.28px]"
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {translations.raw('title.mobile').map((line: string, index: number) => (
                <React.Fragment key={index}>
                  {line.split('<br />').map((subLine: string, subIndex: number, subArray: string[]) => (
                    <React.Fragment key={subIndex}>
                      {subLine}
                      {subIndex < subArray.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                  {index < translations.raw('title.mobile').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>

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
            {translations.raw('description.desktop').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < translations.raw('description.desktop').length - 1 && '\n'}
              </React.Fragment>
            ))}
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
