'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface CTAFormProps {
  formData: {
    name: string;
    phone: string;
    department: string;
  };
  isChecked: boolean;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonId?: string;
}

export default function CTAForm({
  formData,
  isChecked,
  isLoading,
  onInputChange,
  onCheckboxChange,
  onSubmit,
  submitButtonId
}: CTAFormProps) {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isEn = locale === 'en';
  const isJp = locale === 'jp';

  return (
    <div className="absolute top-[67px] bottom-0 right-[80px] w-full max-w-[528px] bg-white rounded-t-[8px] shadow-[0_-4px_30px_0_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
      <div
        className="relative flex-shrink-0 w-[528px]"
        style={{
          height: '106px',
          background: 'rgba(37, 37, 37, 0.90)',
          borderRadius: '8px 8px 0 0'
        }}
      >
        <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[110px] h-[24px]">
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
        <p
          className={cn(
            "absolute left-1/2 -translate-x-1/2 text-center font-light",
            isEn ? "w-[380px] top-[58px] text-[22px] tracking-[2px]" : 
            isJp ? "w-[300px] top-[56px] text-[24px] tracking-[4px]" : 
            "w-[246px] top-[56px] text-[26px] tracking-[7.02px]"
          )}
          style={{
            height: '38px',
            color: '#FFF',
          }}
        >
          {t('form.title')}
        </p>
      </div>

      <form onSubmit={onSubmit} className="pt-[53px] pb-[30px] px-[40px] flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder={t('form.namePlaceholder')}
              value={formData.name}
              onChange={onInputChange}
              className="w-full h-[60px] px-5 outline-none transition-colors"
              style={{
                borderRadius: '8px',
                border: '1px solid #2B2B2B',
                background: '#F4F7FE',
                fontSize: '18px'
              }}
            />
          </div>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder={t('form.phonePlaceholder')}
              value={formData.phone}
              onChange={onInputChange}
              className="w-full h-[60px] px-5 outline-none transition-colors"
              style={{
                borderRadius: '8px',
                border: '1px solid #2B2B2B',
                background: '#F4F7FE',
                fontSize: '18px'
              }}
            />
          </div>
          <div className="relative">
            <select
              name="department"
              value={formData.department}
              onChange={onInputChange}
              className="w-full h-[60px] px-5 outline-none appearance-none cursor-pointer"
              style={{
                borderRadius: '8px',
                border: '1px solid #2B2B2B',
                background: '#F4F7FE',
                fontSize: '18px'
              }}
            >
              <option value="" disabled>{t('form.departmentPlaceholder')}</option>
              <option value="블랑쉬">{t('form.departmentOptions.blanche')}</option>
              <option value="임플란트">{t('form.departmentOptions.implant')}</option>
              <option value="교정">{t('form.departmentOptions.orthodontic')}</option>
              <option value="기타진료">{t('form.departmentOptions.other')}</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={onCheckboxChange}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-black border-black' : 'bg-[#F4F7FE] border-[#2B2B2B]'
                  }`}
              >
                {isChecked && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                style={{
                  color: '#000',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  letterSpacing: '-0.14px'
                }}
              >
                {t('form.privacy')}
              </span>
            </label>
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#000',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                letterSpacing: '-0.14px',
                textDecorationLine: 'underline'
              }}
            >
              {t('form.privacyLink')}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          id={submitButtonId}
          disabled={isLoading}
          className={`w-full h-[65px] transition-all ${isLoading
            ? 'bg-[#A9A9A9]/40 opacity-70 cursor-not-allowed'
            : (formData.name.trim() || formData.phone.trim())
              ? 'bg-[#252525]/90 text-white'
              : 'bg-[#A9A9A9]/40 hover:bg-[#252525]/90'
            }`}
          style={{
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.80)',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '28px'
          }}
        >
          {isLoading ? t('form.submitting') : t('form.submit')}
        </button>
      </form>
    </div>
  );
}
