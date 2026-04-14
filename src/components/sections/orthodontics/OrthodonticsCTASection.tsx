'use client';
import LineCTASection from '@/components/sections/line/LineCTASection';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';

import { cn } from '@/lib/utils';
import CTAForm from '@/components/ui/CTAForm';
import CTAFormMobile from '@/components/ui/CTAFormMobile';
import { CTADialogs } from '@/components/ui/CTADialogs';
import { useCTAForm } from '@/hooks/useCTAForm';
import { useLocale } from 'next-intl';

export function OrthodonticsCTASection() {
  const locale = useLocale();
  const isEn = locale === 'en';
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
    <section className="relative w-full" style={{ backgroundColor: '#F7F8F8' }}>
      <div
        className="hidden cta-breakpoint:block mx-auto h-[694px] relative max-w-content"
      >
        <div className="absolute top-[67px] left-[80px] flex flex-col max-w-[600px]">
          <div className="flex flex-col items-start text-left">
            <p
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {isEn ? 'Book a Consultation' : '상담 예약 신청하기'}
            </p>
            <div
              className={cn(
                "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
                "mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
              )}
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {isEn ? <>A once-in-a-lifetime decision,<br />orthodontics changes your appearance and impression.<br />Make your choice after a thorough consultation</> : <>인생에 단 한 번,<br />외모와 인상을 바꾸는 치아교정<br />충분한 상담을 통해 선택하세요</>}
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
              whiteSpace: 'pre-line'
            }}
          >
            {isEn ? <>Blanche Dental Clinic analyzes your current teeth{'\n'}and gum condition to guide you towards the best{'\n'}direction and help you make an informed decision.{'\n'}{'\n'}Trust Blanche, where a specialist with over{'\n'}20 years of experience is ready to assist you.</> : <>블랑쉬치과는 현재 치아와 잇몸 상태에서{'\n'}최선의 방향을 알려드리고{'\n'}판단할 수 있도록 돕습니다.{'\n'}{'\n'}20년 이상 교정과 전문의가 있는{'\n'}블랑쉬치과에 맡겨주세요.</>}
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
                {isEn ? <>We craft{'\n'}smiles{'\n'}like art</> : <>미소가{'\n'}작품이{'\n'}되는곳</>}
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
              {isEn ? <>At Blanche,{'\n'}start your{'\n'}transformation</> : <>블랑쉬에서,{'\n'}당신의 변화를{'\n'}시작하세요</>}
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

      <div
        className="cta-breakpoint:hidden mx-auto h-auto relative flex flex-col pt-[60px] pb-0 px-[30px] md:px-[80px] max-w-content"
      >
        <div className="relative flex flex-col max-w-full mb-[66px]">
          <div className="flex flex-col items-start text-left">
            <h2
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {isEn ? 'Book a Consultation' : '상담 예약 신청하기'}
            </h2>
            <div
              className={cn(
                "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
                "mb-[60px] text-[24px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
              )}
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {isEn ? <>A once-in-a-lifetime decision,<br />orthodontics changes your appearance and impression.<br />Make your choice after a thorough consultation</> : <>인생에 단 한 번,<br />외모와 인상을 바꾸는 치아교정<br />충분한 상담을 통해 선택하세요</>}
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
              whiteSpace: 'pre-line'
            }}
          >
            {isEn ? <>Blanche Dental Clinic analyzes your current teeth{'\n'}and gum condition to guide you towards the best{'\n'}direction and help you make an informed decision.{'\n'}{'\n'}Trust Blanche, where a specialist with over{'\n'}20 years of experience is ready to assist you.</> : <>블랑쉬치과는 현재 치아와 잇몸 상태에서{'\n'}최선의 방향을 알려드리고{'\n'}판단할 수 있도록 돕습니다.{'\n'}{'\n'}20년 이상 교정과 전문의가 있는{'\n'}블랑쉬치과에 맡겨주세요.</>}
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
