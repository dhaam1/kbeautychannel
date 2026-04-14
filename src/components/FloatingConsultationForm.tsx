'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import { enrichFormDataWithUTM } from '@/lib/utm';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import { Link } from '@/i18n/routing';

/**
 * 플로팅 상담 예약 폼 컴포넌트
 */
export default function FloatingConsultationForm() {
    const t = useTranslations('cta');
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=821023132883&text=blanche_dentalclinic&type=phone_number&app_absent=0";
    const LINE_LINK = "https://page.line.me/blanche.dental";

    // 폼 상태 관리
    const [submissionData, setSubmissionData] = useState({
        name: '',
        phone: '',
        department: ''
    });
    const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormActive = submissionData.name.trim().length > 0 || submissionData.phone.trim().length > 0;

    // 다이얼로그 상태 관리
    const [validationDialog, setValidationDialog] = useState<'name' | 'phoneEmpty' | 'phoneError' | 'dept' | null>(null);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [privacyDialog, setPrivacyDialog] = useState(false);

    const toggleForm = () => setIsOpen(!isOpen);

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const digits = value.replace(/[^0-9]/g, '');
            let formatted = '';
            if (digits.length <= 3) formatted = digits;
            else if (digits.length <= 7) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
            else formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
            setSubmissionData(prev => ({ ...prev, [name]: formatted }));
        } else {
            setSubmissionData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        // 유효성 검사
        if (!submissionData.name.trim()) return setValidationDialog('name');
        if (!submissionData.phone.trim()) return setValidationDialog('phoneEmpty');
        if (submissionData.phone.replace(/[^0-9]/g, '').length !== 11) return setValidationDialog('phoneError');
        if (!submissionData.department) return setValidationDialog('dept');

        // 동의 안 했을 때만 PrivacyDialog(경고 팝업) 노출
        if (!isPrivacyAgreed) return setPrivacyDialog(true);

        setIsSubmitting(true);
        try {
            const payload: ConsultationFormData = {
                name: submissionData.name.trim(),
                phone: submissionData.phone.trim(),
                department: submissionData.department,
                privacyAgreed: null
            };
            const payloadWithUTM = enrichFormDataWithUTM(payload);
            await submitConsultation(payloadWithUTM);
            setSuccessDialog(true);
            setSubmissionData({ name: '', phone: '', department: '' });
            setIsPrivacyAgreed(false);
            setTimeout(() => setIsOpen(false), 2000);
        } catch (error) {
            console.error('제출 오류:', error);
            setErrorDialog(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (locale === 'en') {
        return (
            <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-[30px] right-[30px] md:bottom-[40px] md:right-[40px] z-[9999] bg-[#25D366] text-white w-[60px] h-[60px] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center cursor-pointer pointer-events-auto"
                aria-label="Chat on WhatsApp"
            >
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
            </a>
        );
    }

    if (locale === 'jp') {
        return (
            <a 
                href={LINE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-[30px] right-[30px] md:bottom-[40px] md:right-[40px] z-[9999] bg-[#06C755] text-white w-[60px] h-[60px] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center cursor-pointer pointer-events-auto"
                aria-label=" LINEで相談する"
            >
                <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.967C23.141 14.542 24 12.529 24 10.304z"/>
                    <text x="12" y="11.5" fill="#06C755" fontSize="7.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.3" textAnchor="middle" dominantBaseline="middle">LINE</text>
                </svg>
            </a>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col items-center w-full pointer-events-none pb-0">
            <div className="flex flex-col items-center">
                {/* 상단 탭 */}
                <motion.div
                    layout
                    onClick={toggleForm}
                    className={cn(
                        "pointer-events-auto cursor-pointer relative z-20",
                        "flex items-center justify-center gap-[4px]",
                        "w-[162px] p-[8px_9px_14px_16px]",
                        "bg-[#CBC8C5]/50 backdrop-blur-[25px]",
                        "rounded-t-[8px] antialiased"
                    )}
                >
                    <span className="text-[16px] font-normal text-[#000] tracking-[-0.16px] leading-normal font-sans">
                        {t('form.submit')}
                    </span>
                    <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* 메인 폼 바디 */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 468 }}
                            exit={{ height: 0 }}
                            className={cn(
                                "pointer-events-auto overflow-hidden",
                                "w-[330px] bg-[#CBC8C5]/50 backdrop-blur-[25px]",
                                "rounded-t-[8px] -mt-[1px] relative z-10 antialiased"
                            )}
                        >
                            <form onSubmit={onFormSubmit} className="flex flex-col items-center h-full p-[33px_26px_31px_26px]">
                                <div className="mb-[5px]">
                                    {/* Blanche 로고 SVG 생략 (기존 코드와 동일) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="21" viewBox="0 0 96 21" fill="none"><path d="M7.47049 17.9351C9.74739 17.9351 11.692 16.8863 11.692 14.8397C11.692 12.7158 9.67063 11.616 7.4195 11.616H2.73743V17.9351H7.47049ZM6.98473 9.21078C9.28686 9.21078 11.0522 8.16197 11.0522 6.16633C11.0522 4.06871 9.08235 3.04513 6.90798 3.04513H2.73743V9.21078H6.98473ZM0 0.512207H7.70076C11.7173 0.512207 13.9432 2.86586 13.9432 5.7058C13.9432 7.59946 12.8686 9.59456 10.5407 10.2601V10.3111C13.1246 10.7974 14.6082 12.6138 14.6082 15.0699C14.6082 18.7027 11.3335 20.468 8.13553 20.468H0V0.512207Z" fill="black" /><path d="M19.1605 0H16.5508V20.4674H19.1605V0Z" fill="black" /><path d="M36.7344 6.26892H39.2925V8.69932H39.3441C40.4181 6.72945 42.1582 5.85938 44.0771 5.85938C46.6353 5.85938 49.1424 7.44547 49.1424 11.5393V20.4681H46.5328V12.6901C46.5328 9.92741 45.3562 8.31554 43.2328 8.31554C40.8786 8.31554 39.3441 10.2344 39.3441 12.8436V20.4681H36.7344V6.26892Z" fill="black" /><path d="M62.2809 9.86791C61.9916 8.04457 60.6894 5.90348 58.5188 5.90348C55.7695 5.90348 52.9913 8.56576 52.9913 13.0514C52.9913 17.595 56.1453 20.2578 59.0979 20.2578C61.4419 20.2578 63.6415 19.071 65.1466 16.4662L65.4064 16.6111C63.8149 19.129 61.8472 20.6051 58.4898 20.6051C54.6703 20.6051 50.6758 17.7689 50.6758 13.0514C50.6758 8.39239 54.6703 5.55566 58.4898 5.55566C61.7022 5.55566 64.3071 7.92917 64.5964 9.86791H62.2809Z" fill="black" /><path d="M66.5664 20.3152V0.0571289H68.8819V12.4722C69.7209 8.65211 72.1518 5.5556 75.3643 5.5556C77.4479 5.5556 79.5316 6.6554 79.5316 9.75191V20.3152H77.2166V10.4465C77.2166 7.11808 76.3771 5.90288 75.0175 5.90288C71.7756 5.90288 68.9973 10.4465 68.8819 14.8457V20.3152H66.5664Z" fill="black" /><path d="M90.5016 12.0965C92.1511 11.9806 92.8741 10.9967 92.8741 9.80995C92.8741 8.04457 91.2826 5.90348 89.112 5.90348C86.3628 5.90348 83.5845 8.56576 83.5845 13.0514C83.5845 14.1222 83.7584 15.0771 84.0767 15.9455C84.366 13.9198 86.0734 12.3568 90.5016 12.0965ZM84.3086 16.5242C85.4079 18.9261 87.6069 20.2578 89.6911 20.2578C92.0357 20.2578 94.2347 19.071 95.7398 16.4662L95.9996 16.6111C94.4081 19.129 92.4404 20.6051 89.0835 20.6051C85.2635 20.6051 81.2695 17.7689 81.2695 13.0514C81.2695 8.39239 85.2635 5.55566 89.0835 5.55566C92.2955 5.55566 95.1896 7.92917 95.1896 9.86792C95.1896 11.1706 93.7425 12.3568 90.5306 12.4438C86.7975 12.5597 84.424 13.9488 84.3086 16.5242Z" fill="black" /><path d="M32.078 11.3046C27.8919 11.4522 23.3521 13.1913 23.3521 17.554C23.3521 18.7333 23.6468 20.3548 25.563 20.3548C29.1007 20.3548 31.4592 16.9942 32.078 13.3974V11.3046ZM23.4702 10.4791C23.4702 6.64671 26.2704 5.37891 29.3954 5.37891C32.3142 5.37891 34.4365 6.49964 34.4365 9.65412V20.4138H32.078V14.7833C31.282 17.554 29.1302 20.7085 25.0917 20.7085C22.35 20.7085 20.9941 19.2641 20.9941 17.2008C20.9941 12.8081 27.6858 11.128 32.078 11.01V10.361C32.078 6.97091 31.223 5.73316 28.9236 5.73316C26.5361 5.73316 23.7648 6.97091 23.7648 10.4791H23.4702Z" fill="black" /></svg>
                                </div>
                                <h2 className={cn(
                                    "font-[200] leading-normal text-[#000] mb-[15px] font-sans text-center px-1 whitespace-nowrap",
                                    locale === 'en' ? "text-[18px] tracking-[1.5px]" : 
                                    locale === 'jp' ? "text-[20px] tracking-[3px]" : 
                                    "text-[24px] tracking-[6.48px]"
                                )}>
                                    {t('form.title')}
                                </h2>

                                <div className="w-[278px] space-y-[10px]">
                                    <input
                                        type="text"
                                        name="name"
                                        value={submissionData.name}
                                        onChange={onFieldChange}
                                        className="w-full h-[50px] px-[25px] py-[10px] bg-[#F4F7FE] border border-[#2B2B2B] rounded-[8px] focus:outline-none text-[18px] text-[#1a1a1a] placeholder:text-[rgba(0,0,0,0.60)] font-sans leading-[28px]"
                                        placeholder={t('form.namePlaceholder')}
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={submissionData.phone}
                                        onChange={onFieldChange}
                                        className="w-full h-[50px] px-[25px] py-[10px] bg-[#F4F7FE] border border-[#2B2B2B] rounded-[8px] focus:outline-none text-[18px] text-[#1a1a1a] placeholder:text-[rgba(0,0,0,0.60)] font-sans leading-[28px]"
                                        placeholder={t('form.phonePlaceholder')}
                                    />

                                    <div className="relative w-full h-[50px]">
                                        <select
                                            name="department"
                                            value={submissionData.department}
                                            onChange={onFieldChange}
                                            className="w-full h-[50px] px-[25px] py-[10px] bg-[#F4F7FE] border border-[#2B2B2B] rounded-[8px] appearance-none focus:outline-none text-[18px] text-[#1a1a1a] font-sans leading-[28px]"
                                        >
                                            <option value="" disabled className="text-[rgba(0,0,0,0.60)]">{t('form.departmentPlaceholder')}</option>
                                            <option value="블랑쉬">{t('form.departmentOptions.blanche')}</option>
                                            <option value="임플란트">{t('form.departmentOptions.implant')}</option>
                                            <option value="교정">{t('form.departmentOptions.orthodontic')}</option>
                                            <option value="기타진료">{t('form.departmentOptions.other')}</option>
                                        </select>
                                        <div className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none rotate-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M6 9L12 15L18 9" stroke="#5A5A5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* 체크박스 영역: Link로 교체하여 팝업 간섭 차단 */}
                                    <div className="flex items-start gap-[6px] py-[5px]">
                                        <div
                                            onClick={() => setIsPrivacyAgreed(!isPrivacyAgreed)}
                                            className={cn(
                                                "w-[25px] h-[25px] flex-shrink-0 border border-[#2B2B2B] rounded-[8px] cursor-pointer flex items-center justify-center transition-all",
                                                isPrivacyAgreed ? "bg-[#2B2B2B]" : "bg-[#F4F7FE]"
                                            )}
                                        >
                                            {isPrivacyAgreed && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-start gap-[0px] font-sans text-[#000] text-[14px] tracking-[-0.14px] leading-normal">
                                            <span>{t('form.privacy')}</span>
                                            <Link
                                                href={"/privacy" as any}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="underline decoration-solid underline-offset-2 hover:opacity-70 transition-opacity pointer-events-auto"
                                            >
                                                {t('form.privacyLink')}
                                            </Link>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        id="cta_floating"
                                        disabled={isSubmitting}
                                        className={cn(
                                            "w-[278px] h-[48px] p-[8px_25px] flex justify-center items-center gap-[10px] rounded-[8px]",
                                            "font-pretendard text-[18px] leading-[28px] transition-all",
                                            isSubmitting
                                                ? "bg-gray-400 cursor-not-allowed text-[rgba(255,255,255,0.80)]"
                                                : isFormActive
                                                    ? "bg-[#131313] text-white active:scale-[0.98]"
                                                    : "bg-[rgba(169,169,169,0.40)] text-[rgba(255,255,255,0.80)] active:scale-[0.98]"
                                        )}
                                    >
                                        {isSubmitting ? t('form.submitting') : t('form.submit')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 다이얼로그 컴포넌트 */}
            <ValidationDialog isOpen={!!validationDialog} onClose={() => setValidationDialog(null)} type={validationDialog} />
            <SuccessDialog
                isOpen={successDialog}
                onClose={() => setSuccessDialog(false)}
                title={t('form.success')?.split('.').join('\n') || '상담 신청이\n완료되었습니다'}
                body={t('form.successDetail') || '빠른 시일 내에 연락드리겠습니다.'}
            />
            <ErrorDialog
                isOpen={errorDialog}
                onClose={() => setErrorDialog(false)}
                title={t('form.error')?.split('.').join('\n') || '오류가\n발생했습니다'}
                body={t('form.errorDetail') || '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
            />
            {/* 폼 제출 시 동의 안 하면 뜨는 경고 팝업 */}
            <PrivacyDialog isOpen={privacyDialog} onClose={() => setPrivacyDialog(false)} />
        </div>
    );
}