'use client';

import { useState } from 'react';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import { enrichFormDataWithUTM } from '@/lib/utm';
import CTAForm from '@/components/ui/CTAForm';
import CTAFormMobile from '@/components/ui/CTAFormMobile';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import { useTranslations, useLocale } from 'next-intl';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';
import LineCTASection from '@/components/sections/line/LineCTASection';

export default function CasesCTASection() {
    const locale = useLocale();
    const translations = useTranslations('cta');
    const t = useTranslations('casesCTA');
    const [submissionData, setSubmissionData] = useState({
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

    // CTA 입력 필드 변경 핸들러
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
            setSubmissionData((prev) => ({ ...prev, [name]: formatted }));
        } else {
            setSubmissionData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // CTA 체크박스 변경 핸들러
    const onAgreementToggle = () => {
        setIsPrivacyAgreed(!isPrivacyAgreed);
    };

    // CTA 폼 제출 핸들러
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
            };
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
                    <div className="flex flex-col items-start text-left">
                        <h2
                            className="text-[18px] md:text-[20px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
                            style={{ lineHeight: '30px', whiteSpace: 'pre-line' }}
                        >
                            {t('category')}
                        </h2>
                        <div
                            className="whitespace-pre-line text-black mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
                            style={{ fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                            {t('title')}
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
                        {t('description')}
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
                        submitButtonId="cta_reservation_bottom"
                    />
                )}
            </div>

            <div
                className="cta-breakpoint:hidden mx-auto h-auto relative flex flex-col pt-[60px] pb-0 px-[30px] md:px-[80px] max-w-content"
            >
                <div className="relative flex flex-col max-w-full mb-[66px]">
                    <div className="flex flex-col items-start text-left">
                        <p
                            className="text-[18px] md:text-[20px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
                            style={{ lineHeight: '30px' }}
                        >
                            {t('category')}
                        </p>
                        <div
                            className="whitespace-pre-line text-black mb-[60px] text-[28px] md:text-[28px] font-[500] tracking-[-0.28px] md:tracking-[-0.28px]"
                            style={{ fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                            {t('title')}
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
                        {t('description')}
                    </div>
                </div>

                {locale === 'en' ? (
                   <div className="w-full flex justify-center mt-10">
                       <WhatsAppCTASection />
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
                        submitButtonId="cta_reservation_bottom"
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
                title={translations('form.success')?.split('.').join('\n') || '상담 신청이 \n완료되었습니다'}
                body={translations('form.successDetail') || '빠른 시일 내에 연락드리겠습니다'}
            />

            <ErrorDialog
                isOpen={errorDialog}
                onClose={() => setErrorDialog(false)}
                title={translations('form.error')?.split('.').join('\n') || '오류가 \n발생했습니다'}
                body={translations('form.errorDetail') || '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요'}
            />

            <PrivacyDialog
                isOpen={privacyDialog}
                onClose={() => setPrivacyDialog(false)}
            />
        </section>
    );
}
