'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { submitConsultation } from '@/lib/firebase/consultations';
import { ConsultationFormData } from '@/lib/firebase/types';
import { enrichFormDataWithUTM } from '@/lib/utm';
import { ValidationDialog, SuccessDialog, ErrorDialog, PrivacyDialog } from '@/components/ui/Dialog';
import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';
import LineCTASection from '@/components/sections/line/LineCTASection';


const MAX_WIDTH = 1280;

export default function ConsultationForm() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isJp = locale === 'jp';

  // --- 상태 관리 ---
  const [submissionData, setSubmissionData] = useState({
    name: '',
    phone: '',
    department: ''
  });
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 다이얼로그 상태
  const [validationDialog, setValidationDialog] = useState<'name' | 'phoneEmpty' | 'phoneError' | 'dept' | null>(null);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [privacyDialog, setPrivacyDialog] = useState(false);

  // --- 핸들러 ---
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

    if (!submissionData.name.trim()) return setValidationDialog('name');
    const phoneDigits = submissionData.phone.replace(/[^0-9]/g, '');
    if (!submissionData.phone.trim()) return setValidationDialog('phoneEmpty');
    if (phoneDigits.length !== 11) return setValidationDialog('phoneError');
    if (!submissionData.department) return setValidationDialog('dept');
    if (!isPrivacyAgreed) return setPrivacyDialog(true);

    setIsSubmitting(true);
    try {
      const payload: ConsultationFormData = {
        name: submissionData.name.trim(),
        phone: submissionData.phone.trim(),
        department: submissionData.department
      };
      await submitConsultation(enrichFormDataWithUTM(payload));
      setSuccessDialog(true);
      setSubmissionData({ name: '', phone: '', department: '' });
      setIsPrivacyAgreed(false);
    } catch (error) {
      console.error(error);
      setErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 버튼 활성화 여부 확인 (이름이나 전화번호가 입력되면 활성화 색상 적용)
  const isFormActive = submissionData.name.trim().length > 0 || submissionData.phone.trim().length > 0;

  // 공통 폼 렌더링 함수 (스타일 통일)
  const renderForm = (HeadingTag: 'h1' | 'div' = 'div') => {
    if (locale === 'en') {
      return <WhatsAppCTASection />;
    }
    if (locale === 'jp') {
      return <LineCTASection />;
    }

    return (
    <div className="bg-white rounded-t-2xl shadow-[0_-4px_30px_0_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 w-full md:w-[460px]">
      {/* --- 카드 헤더 (민트색 + SVG 로고) --- */}
      <div className="bg-[#66CBC3] h-[120px] relative text-center">
        {/* SVG Logo Icon */}
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[110px] h-[24px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="110" height="24" viewBox="0 0 110 24" fill="none">
            <path d="M8.51613 20.4451C11.1117 20.4451 13.3286 19.2495 13.3286 16.9164C13.3286 14.4952 11.0242 13.2414 8.458 13.2414H3.12058V20.4451H8.51613ZM7.96238 10.4996C10.5867 10.4996 12.5992 9.304 12.5992 7.02903C12.5992 4.63781 10.3536 3.47095 7.87488 3.47095H3.12058V10.4996H7.96238ZM0 0.583496H8.77863C13.3573 0.583496 15.8948 3.26659 15.8948 6.50404C15.8948 8.66275 14.6698 10.9371 12.0161 11.6958V11.754C14.9617 12.3083 16.6529 14.3789 16.6529 17.1789C16.6529 21.3201 12.9198 23.3325 9.27425 23.3325H0V0.583496Z" fill="white" />
            <path d="M21.8402 0H18.8652V23.3322H21.8402V0Z" fill="white" />
            <path d="M41.877 7.14606H44.7932V9.91665H44.8519C46.0763 7.67106 48.06 6.6792 50.2475 6.6792C53.1637 6.6792 56.0218 8.4873 56.0218 13.1541V23.3327H53.0468V14.466C53.0468 11.3166 51.7056 9.47916 49.285 9.47916C46.6013 9.47916 44.8519 11.6666 44.8519 14.641V23.3327H41.877V7.14606Z" fill="white" />
            <path d="M70.999 11.2493C70.6692 9.17078 69.1847 6.72999 66.7103 6.72999C63.5763 6.72999 60.4092 9.76491 60.4092 14.8784C60.4092 20.0579 64.0046 23.0935 67.3705 23.0935C70.0426 23.0935 72.5501 21.7406 74.2658 18.7712L74.5619 18.9364C72.7477 21.8067 70.5046 23.4894 66.6773 23.4894C62.3231 23.4894 57.7695 20.2562 57.7695 14.8784C57.7695 9.56728 62.3231 6.3335 66.6773 6.3335C70.3394 6.3335 73.3088 9.03922 73.6386 11.2493H70.999Z" fill="white" />
            <path d="M75.8828 23.159V0.0654297H78.5225V14.2182C79.4788 9.86345 82.25 6.33352 85.9121 6.33352C88.2874 6.33352 90.6628 7.58726 90.6628 11.1172V23.159H88.0237V11.909C88.0237 8.1147 87.0667 6.7294 85.5168 6.7294C81.8211 6.7294 78.654 11.909 78.5225 16.9239V23.159H75.8828Z" fill="white" />
            <path d="M103.169 13.7899C105.049 13.6577 105.873 12.5361 105.873 11.1832C105.873 9.17078 104.059 6.72999 101.585 6.72999C98.4507 6.72999 95.2836 9.76491 95.2836 14.8784C95.2836 16.0991 95.4818 17.1876 95.8447 18.1776C96.1745 15.8684 98.1208 14.0866 103.169 13.7899ZM96.109 18.8372C97.3621 21.5754 99.869 23.0935 102.245 23.0935C104.918 23.0935 107.424 21.7406 109.14 18.7712L109.436 18.9364C107.622 21.8067 105.379 23.4894 101.552 23.4894C97.1975 23.4894 92.6445 20.2562 92.6445 14.8784C92.6445 9.56728 97.1975 6.3335 101.552 6.3335C105.214 6.3335 108.513 9.03922 108.513 11.2493C108.513 12.7344 106.863 14.0866 103.202 14.1857C98.9463 14.3179 96.2405 15.9014 96.109 18.8372Z" fill="white" />
            <path d="M36.5689 12.887C31.7968 13.0552 26.6216 15.0377 26.6216 20.0111C26.6216 21.3554 26.9575 23.2039 29.1419 23.2039C33.1748 23.2039 35.8634 19.3729 36.5689 15.2727V12.887ZM26.7562 11.9459C26.7562 7.57709 29.9484 6.13184 33.5107 6.13184C36.8381 6.13184 39.2575 7.40944 39.2575 11.0055V23.2712H36.5689V16.8526C35.6615 20.0111 33.2085 23.6071 28.6047 23.6071C25.4792 23.6071 23.9336 21.9605 23.9336 19.6085C23.9336 14.6009 31.5619 12.6857 36.5689 12.5511V11.8113C36.5689 7.94667 35.5942 6.53568 32.9729 6.53568C30.2512 6.53568 27.0921 7.94667 27.0921 11.9459H26.7562Z" fill="white" />
          </svg>
        </div>
        {/* Title Text */}
        <HeadingTag className="absolute top-[65px] left-1/2 -translate-x-1/2 text-white font-pretendard text-[20px] font-light tracking-[2px]">
          {isJp ? '無料相談予約' : locale === 'en' ? 'Book Consultation' : '상담 예약'}
        </HeadingTag>
      </div>

      <form onSubmit={onFormSubmit} className="p-6 md:p-8 flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder={isJp ? "お名前" : locale === 'en' ? "Name" : "성함"}
          value={submissionData.name}
          onChange={onFieldChange}
          className="w-full h-[60px] px-5 rounded-lg border border-[#2B2B2B] bg-[#F4F7FE] text-[18px] font-pretendard outline-none transition-colors focus:border-[#66CBC3]"
        />
        <input
          type="tel"
          name="phone"
          placeholder={isJp ? "電話番号" : locale === 'en' ? "Phone Number" : "전화번호"}
          value={submissionData.phone}
          onChange={onFieldChange}
          className="w-full h-[60px] px-5 rounded-lg border border-[#2B2B2B] bg-[#F4F7FE] text-[18px] font-pretendard outline-none transition-colors focus:border-[#66CBC3]"
        />
        <div className="relative">
          <select
            name="department"
            value={submissionData.department}
            onChange={onFieldChange}
            className={`w-full h-[60px] px-5 rounded-lg border border-[#2B2B2B] bg-[#F4F7FE] text-[18px] font-pretendard outline-none appearance-none cursor-pointer focus:border-[#66CBC3] ${!submissionData.department ? 'text-gray-400' : 'text-black'}`}
          >
            <option value="" disabled>{isJp ? "診療科目" : locale === 'en' ? "Treatment Options" : "진료과목"}</option>
            <option value="블랑쉬">{isJp ? "ブランシュ" : locale === 'en' ? "Blanche" : "블랑쉬"}</option>
            <option value="임플란트">{isJp ? "インプラント" : locale === 'en' ? "Implant" : "임플란트"}</option>
            <option value="교정">{isJp ? "歯列矯正" : locale === 'en' ? "Orthodontics" : "교정"}</option>
            <option value="기타진료">{isJp ? "その他" : locale === 'en' ? "Others" : "기타진료"}</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* 개인정보 동의 */}
        <div className="flex items-center gap-2 mt-2">
          <div
            onClick={() => setIsPrivacyAgreed(!isPrivacyAgreed)}
            className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${isPrivacyAgreed ? 'bg-black border-black' : 'bg-[#F4F7FE] border-[#2B2B2B]'}`}
          >
            {isPrivacyAgreed && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <label onClick={() => setIsPrivacyAgreed(!isPrivacyAgreed)} className="text-sm text-black font-pretendard cursor-pointer">
            {t('form.privacy')}
          </label>
          <Link href="/privacy" target="_blank" className="text-xs text-black underline ml-auto font-pretendard">
            {t('form.privacyLink')}
          </Link>
        </div>

        <button
          type="submit"
          id="cta_page"
          disabled={isSubmitting}
          className={`w-full h-[65px] mt-2 rounded-lg font-pretendard text-[20px] transition-all ${isFormActive
            ? 'bg-[#66CBC3] text-white' // 활성화 시 민트색
            : 'bg-[#A9A9A9]/40 text-white/80' // 비활성화 시 회색
            }`}
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </button>
      </form>
    </div>
    );
  };

  return (
    <div className="w-full h-full relative">

      {/* ================= [Desktop Layout] ================= */}
      <div
        className="hidden lg:block mx-auto h-[694px] relative w-full"
        style={{ maxWidth: MAX_WIDTH }}
      >
        {/* 좌측 텍스트 (하단 배치) */}
        <div className="absolute bottom-[67px] left-[80px] flex flex-col max-w-[600px]">
          <div className="flex flex-col items-start text-left">
            <p
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {t('subtitle.default')}
            </p>
            <div
              className="mb-[45px] text-[28px] tracking-[-0.28px] font-medium whitespace-pre-line text-black"
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {Array.isArray(t.raw('title.desktop'))
                ? (t.raw('title.desktop') as string[]).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))
                : t.raw('title.desktop')
              }
            </div>
          </div>

          <div
            className="mb-[84px]"
            style={{
              color: '#000',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '31px',
              letterSpacing: '-0.18px',
              whiteSpace: 'pre-line',
            }}
          >
            {Array.isArray(t.raw('description.desktop'))
              ? t.raw('description.desktop').map((line: string, i: number) => (
                <React.Fragment key={i}>{line}{i < t.raw('description.desktop').length - 1 && '\n'}</React.Fragment>
              ))
              : t('description.desktop')
            }
          </div>

          <div className="flex flex-row items-center gap-[15px]">
            <div
              className="flex items-center justify-center"
              style={{ width: '122px', height: '122px', border: '1px solid #A0A0A0', flexShrink: 0 }}
            >
              <p style={{ color: '#A0A0A0', textAlign: 'center', fontFamily: '"Song Myung"', fontSize: '30px', fontWeight: 400, lineHeight: '33px', whiteSpace: 'pre-line' }}>
                {t('boxText')}
              </p>
            </div>
            <p style={{ color: '#A0A0A0', fontSize: '20px', fontWeight: 400, lineHeight: '38px', letterSpacing: '-0.2px', whiteSpace: 'pre-line' }}>
              {Array.isArray(t.raw('footer.desktop')) ? t.raw('footer.desktop').join('\n') : t('footer.desktop')}
            </p>
          </div>
        </div>

        {/* ★ 우측 폼: bottom-0으로 바닥 고정 (Desktop) */}
        <div className={`absolute right-[80px] z-10 w-[460px] ${(locale === 'en' || locale === 'jp') ? 'top-1/2 -translate-y-[45%]' : 'bottom-0'}`}>
          {renderForm('div')}
        </div>
      </div>

      {/* ================= [Mobile Layout] ================= */}
      {/* ================= [Mobile Layout] ================= */}
      <div className="lg:hidden w-full px-[30px] md:px-[80px] pb-0 flex flex-col-reverse gap-10">
        <div className="flex justify-center w-full">
          {renderForm('h1')}
        </div>

        <div className="relative flex flex-col max-w-full pt-10">
          <div className="flex flex-col items-start text-left">
            <p
              className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
              style={{ lineHeight: '30px' }}
            >
              {t('subtitle.default')}
            </p>
            <h2
              className="mb-[50px] md:mb-[75px] text-[28px] tracking-[-0.28px] font-medium whitespace-pre-line text-black"
              style={{ fontStyle: 'normal', lineHeight: 'normal' }}
            >
              {Array.isArray(t.raw('title.mobile'))
                ? (t.raw('title.mobile') as string[]).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))
                : t.raw('title.mobile')
              }
            </h2>
          </div>
          <div className="text-[18px] leading-[31px] font-pretendard whitespace-pre-line">
            {Array.isArray(t.raw('description.desktop'))
              ? t.raw('description.desktop').join('\n')
              : t('description.desktop')}
          </div>
        </div>
      </div>

      {/* 다이얼로그 */}
      <ValidationDialog isOpen={!!validationDialog} onClose={() => setValidationDialog(null)} type={validationDialog} />
      <SuccessDialog isOpen={successDialog} onClose={() => setSuccessDialog(false)} title={isJp ? '相談申し込み完了' : locale === 'en' ? 'Consultation Request Completed' : '상담 신청 완료'} body={isJp ? '近いうちにご連絡いたします。' : locale === 'en' ? 'We will get back to you shortly.' : '빠른 시일 내에 연락드리겠습니다.'} />
      <ErrorDialog isOpen={errorDialog} onClose={() => setErrorDialog(false)} title={isJp ? 'エラー発生' : locale === 'en' ? 'Error' : '오류 발생'} body={isJp ? 'しばらくしてからもう一度お試しください。' : locale === 'en' ? 'Please try again later.' : '잠시 후 다시 시도해주세요.'} />
      <PrivacyDialog isOpen={privacyDialog} onClose={() => setPrivacyDialog(false)} />
    </div>
  );
}